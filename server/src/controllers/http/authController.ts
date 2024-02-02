import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { getCustomColor } from "../../constants/colors";
import config from "../../config/config";
import usersService from "../../services/users";
import token from "../../services/token";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, password } = req.body;

    let user: User | null;

    // Find user
    user = await usersService.findUserByName(name);

    // If not exists with such name -> Register new user
    if (!user) {
      let isAdmin = false;

      // First user will be admin
      const countOfUsers = await usersService.getUsersCount();
      if (countOfUsers === 0) {
        isAdmin = true;
      }

      const hashedPassword = await bcrypt.hash(password, config.password.salt);

      user = await usersService.createUser({
        name,
        nameColor: getCustomColor(),
        isAdmin,
        isBan: false,
        isMute: false,
        password: hashedPassword,
      });
    }

    // Check passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        detail: "Invalid username or password",
      });
    }

    // Check user banned or not
    if (user.isBan) {
      return res.status(401).json({
        detail: "User is banned",
      });
    }

    const createToken = token.generateAccessToken(
      user.id,
      config.token.secret,
      config.token.expirationTime
    );

    res.status(200).send({ token: createToken });
  } catch (error) {
    next(error);
  }
};

export { login };

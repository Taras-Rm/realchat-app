import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { getCustomColor } from "../constants/colors";
import config from "../config/config";
import { generateAccessToken } from "../utils/auth";
import users from "../services/users";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, password } = req.body;

    let user: User | null;

    // Find user
    user = await users.findUserByName(name);

    // If not exists with such name -> Register new user
    if (!user) {
      let isAdmin = false;

      // First user will be admin
      const countOfUsers = await users.getUsersCount();
      if (countOfUsers === 0) {
        isAdmin = true;
      }

      const hashedPassword = await bcrypt.hash(password, config.password.salt);

      user = await users.createUser({
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

    const token = generateAccessToken(
      user.id,
      config.token.secret,
      config.token.expirationTime
    );

    res.status(200).send({ token });
  } catch (error) {
    next(error);
  }
};

export { login };

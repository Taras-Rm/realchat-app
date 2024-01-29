import { Request, Response, NextFunction } from "express";
import { prisma } from "..";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { getCustomColor } from "../constants/colors";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, password } = req.body;

    let user: User | null;

    // Find user
    user = await prisma.user.findUnique({
      where: {
        name,
      },
    });

    // If not exists with such name -> Register new user
    if (!user) {
      let isAdmin = false;

      // First user will be admin
      const countOfUsers = await prisma.user.count();
      if (countOfUsers === 0) {
        isAdmin = true;
      }

      const hashedPassword = await bcrypt.hash(password, 5);

      user = await prisma.user.create({
        data: {
          name,
          nameColor: getCustomColor(),
          isAdmin,
          isBan: false,
          isMute: false,
          password: hashedPassword,
        },
      });
    }

    // Check passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        detail: "Invalid username or password",
      });
    }

    const token = generateAccessToken(user.id);

    res.status(200).send({ token });
  } catch (error) {
    next(error);
  }
};

function generateAccessToken(id: number) {
  return jwt.sign({ id }, "secret", { expiresIn: "24h" });
}

export { login };

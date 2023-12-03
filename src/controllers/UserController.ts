import "dotenv/config";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import userServices from "../services/UserServices";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getUsers();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userServices.getUserById(Number(req.params.userId));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const createNewUser = async (req: Request, res: Response) => {
//   const { name, password, document, birthDate } = req.body;
//   try {
//     const newUser = await userServices.createNewUser({
//       name,
//       document,
//       password,
//       birthDate: new Date(birthDate),
//     });
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const register = async (req: Request, res: Response) => {
  const { name, password, document, birthDate } = req.body;
  try {
    const hashedPassword: string = await bcrypt.hash(password, 8);
    const newUser = await userServices.createNewUser({
      name,
      document,
      password: hashedPassword,
      birthDate: new Date(birthDate),
    });
    res.status(201).json({
      message: "User successfully registered",
      user: { id: newUser.id, name: newUser.name },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  try {
    const user = await userServices.getUserByName(name);
    if (!user)
      return res.status(401).json({ message: "Invalid name or password" });

    const match: boolean = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid name or password" });

    const token: string = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "",
      { expiresIn: "1h" }
    );

    res.cookie("authToken", token, {
      maxAge: 3600000, // 1 hour in milliseconds
      httpOnly: true,
    });

    res.status(200).json({
      message: "User successfully logged in",
      user: { id: user.id, name: user.name },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "User logged out successfully" });
};

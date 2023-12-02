import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
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
      data: { id: newUser.id, userName: newUser.name },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const login = async (req: Request, res: Response) => {
//   try {
//     const user = await userServices.getUserById(Number(req.params.userId));
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

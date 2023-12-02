import { Request, Response } from "express";
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

export const createNewUser = async (req: Request, res: Response) => {
  const { name, document, birthDate } = req.body;
  try {
    const newUser = await userServices.createNewUser({
      name,
      document,
      birthDate: new Date(birthDate),
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

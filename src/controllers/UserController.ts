import { Request, Response } from "express";
import userServices from "../services/userServices";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userServices.getUserById(Number(req.params.personId));
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
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
    res.status(500).json({ error });
  }
};

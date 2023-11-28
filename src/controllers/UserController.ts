import { AppDataSource } from "../db";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

// import personServices from "../services/persons";

export const getUserById = async (req: Request, res: Response) => {
  try {
    // const person = await personServices.getPersonById(
    //   Number(req.params.personId)
    // );
    // console.log("Person--", person);
    // if (!person) {
    //   return res.status(404).json({ error: "person not found" });
    // }
    // res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createNewUser = async (req: Request, res: Response) => {
  const { name, document, birthDate } = req.body;
  try {
    // const person = await personServices.createNewPerson({
    //   name,
    //   document,
    //   birthDate: new Date(birthDate),
    // });
    // res.status(201).json(person);
  } catch (error) {
    res.status(500).json({ error });
  }
};

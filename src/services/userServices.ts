import { AppDataSource } from "../db";
import { User } from "../entity/User";

interface NewUserData {
  name: string;
  document: string;
  birthDate: Date;
}

const getUserById = async (id: number): Promise<User | null> => {
  return await AppDataSource.getRepository(User).findOneBy({
    id,
  });
};

const createNewUser = async (userData: NewUserData): Promise<User> => {
  const newPerson = AppDataSource.getRepository(User).create(userData);
  return await AppDataSource.getRepository(User).save(newPerson);
};

export default {
  getUserById,
  createNewUser,
};

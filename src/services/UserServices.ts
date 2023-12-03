import { AppDataSource } from "../db";
import { User } from "../entities/User";

interface NewUserData {
  name: string;
  password: string;
  document: string;
  birthDate: Date;
}

const userRepository = AppDataSource.getRepository(User);

const createNewUser = async (userData: NewUserData): Promise<User> => {
  const newPerson = userRepository.create(userData);
  return await userRepository.save(newPerson);
};

const getUserByName = async (name: string): Promise<User | null> => {
  return await userRepository.findOneBy({
    name,
  });
};

export default {
  createNewUser,
  getUserByName,
};

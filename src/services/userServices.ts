import { AppDataSource } from "../db";
import { User } from "../entities/User";

interface NewUserData {
  name: string;
  document: string;
  birthDate: Date;
}

const userRepository = AppDataSource.getRepository(User);

const getUsers = async (): Promise<User[]> => {
  return await userRepository.find({});
};

const getUserById = async (id: number): Promise<User | null> => {
  return await userRepository.findOneBy({
    id,
  });
};

const createNewUser = async (userData: NewUserData): Promise<User> => {
  const newPerson = userRepository.create(userData);
  return await userRepository.save(newPerson);
};

export default {
  getUsers,
  getUserById,
  createNewUser,
};

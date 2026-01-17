import { userRepository } from "../repository/user.repository";

const getUserByIdService = async (user_id: string) => {
    const user = await userRepository.findUserById(user_id);
    return user;
}

const getAllUserService = async () => {
    const users = await userRepository.findAllUsers();
    return users;
}

const updateUserService = async (user_id: string, data: Partial<{ user_name: string; user_email: string; user_password: string; role_id: number;}>) => {
    const updatedUser = await userRepository.updateUser(user_id, data);
    return updatedUser;
}

const createUserService = async (data: {user_name: string; user_email: string; user_password: string, role_id: number}) => {
    const newUser = await userRepository.createUser(data);
    return newUser;
}

const deleteUserService = async (user_id: string) => {
    await userRepository.deleteUser(user_id);
}
const findUserByEmailService = async (email: string) => {
    const user = await userRepository.findUserByEmail(email);
    return user;
}

export { getUserByIdService,getAllUserService, updateUserService, deleteUserService, findUserByEmailService, createUserService };    
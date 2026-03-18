import { userRepository } from "../repository/user.repository";
import { redis } from "../../../shared/redis/redis.service";
import { bufferCheck } from "../../../shared/utils/cache.util";
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
    await redis.del(`user_profile:${user_id}`);
    return updatedUser;
}

const createUserService = async (data: {user_name: string; user_email: string; user_password: string, role_id: number}) => {
    const newUser = await userRepository.createUser(data);
    return newUser;
}

const getUserProfileService = async (user_id: string) => {
    if(!user_id){
        throw new Error('User ID is required to get profile');
    }
    let cacheUserProfile = await redis.get(`user_profile:${user_id}`);
    if(cacheUserProfile){
        cacheUserProfile = bufferCheck(cacheUserProfile);
        return JSON.parse(cacheUserProfile);
    }
    const user = await userRepository.getUserProfile(user_id);
    await redis.setEx(`user_profile:${user_id}`, 300, JSON.stringify(user)); 
    return user;
}

const deleteUserService = async (user_id: string) => {
    await userRepository.deleteUser(user_id);
    await redis.del(`user_profile:${user_id}`);
}

const findUserByEmailService = async (email: string) => {
    const user = await userRepository.findUserByEmail(email);
    return user;
}

export { getUserByIdService,getUserProfileService,getAllUserService, updateUserService, deleteUserService, findUserByEmailService, createUserService };    
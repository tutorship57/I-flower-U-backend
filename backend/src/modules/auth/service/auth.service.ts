
import { hashPassword, verifyPassword } from "../../../shared/utils/auth.util";
import { AppError } from "../../../shared/utils/appErrorCustomize.util";
import { findUserByEmailService ,createUserService, getUserProfileService} from "../../user/service/user.service";
import {createCartService} from "../../cart/service/cart.service";
import { getRoleByIdService } from "../../user/service/role.service";
const loginService = async (user_email: string,user_password: string) => {
    // Implement login logic here
    const user = await findUserByEmailService(user_email);
    if (!user) {
        console.log('User not found');
        throw new AppError('Login failed',400);
    }
    const isPasswordValid = await verifyPassword(user.user_password , user_password);
    if (!isPasswordValid) {
        console.log('Invalid password');
        throw new AppError('Login failed',400);
    }

    const role = await getRoleByIdService(user.role_id);
    const userProfile = await getUserProfileService(user.user_id)
    if (!role) {
        console.log('User role not found');
        throw new AppError('Login failed',400);
    }
    return userProfile;
}

const registerService = async (username: string, email: string, password: string) => {
    // Implement registration logic here
    const existingUser = await findUserByEmailService(email);
    if (existingUser) {
        console.log('User with this email already exists');
        throw new AppError('Registration failed',400);
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await createUserService({
        user_name: username,
        user_email: email,
        user_password: hashedPassword,
        role_id: 1, // Assuming 1 is the default role_id for regular users
    });

    const {user_password, ...userInfo} = newUser;
    
    const newCart = await createCartService({user_id: newUser.user_id});

    return  userInfo;
}



export {loginService, registerService}
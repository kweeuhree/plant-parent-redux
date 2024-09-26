import type { UserInput } from "./SignUpLoginForm";
import type { User } from "./userSlice";

export const reqUserSignUp = (data: UserInput) => {
    console.log('Attempting to sign up user:', data.email);
    try {
        const newUser = {
            Flash: "Sign up successful!"
        }
        return newUser;    
    } catch (error) {
        throw new Error('Sign up failed');
    }
}

export const reqUserLogin = (data: UserInput): User => {
    console.log(`Attempting to log in user: ${data.email} and ${data.password}`);
    try {
        const newUser = {
            userId: Math.floor(Math.random() * 1000),
            dateCreated: new Date().toLocaleString(),
            isAuthenticated: true,
            email: data.email,
            hashedPassword: data.password, 
            Flash: "Log in successful!"
        }
        console.log(newUser);
        return newUser;    
    } catch (error) {
        throw new Error('Login failed');
    }
}

export const reqDeleteUser = async (userId: number) => {
    console.log(`Attempting to delete a user with id ${userId}`);
    return true;
    // try {
    //     return true;

    // } catch (error) {
    //     throw new Error('Failed to delete user');
    // }
}


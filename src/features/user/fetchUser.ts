import type { UserInput } from "./SignUpLoginForm";
import type { User } from "./userSlice";

export const reqUserSignUp = (data: UserInput) => {
    console.log('Attempting to sign up user:', data);
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
    console.log(`Attempting to log in user: ${data}`);
    try {
        const newUser = {
            userId: Math.floor(Math.random() * 1000),
            dateCreated: new Date(),
            isAuthenticated: true,
            email: data.email,
            hashedPassword: data.password, 
            Flash: "Log in successful!"
        }
        return newUser;    
    } catch (error) {
        throw new Error('Login failed');
    }
}


import { useAppDispatch, useFormData } from '../../app/hooks';
import { updateMessage } from '../message/messageSlice';
import { userLogin } from './userSlice';
import type { User } from './userSlice';
import { reqUserLogin, reqUserSignUp } from './fetchUser';
import SubmitButton from '../../components/SubmitButton';

export type UserInput = {
    email: string,
    password: string,
}

export const initialState: UserInput = {email: '', password: ''};

type Props = {
    formType: string,
}

const inputOptions: UserInput = {
    email: 'Enter email',
    password: 'Enter password'
}

const SignUpLoginForm = ({ formType }: Props) => {
    // useFormData hook takes initialState and a callback function as arguments
    const dispatch = useAppDispatch();
    const { formData, handleChange, handleSubmit } = useFormData(
        initialState, 
        (data) => formType === 'SIGNUP' ? 
        handleSignUp(data) : 
        handleLogin(data)
    );
    
    const handleSignUp = (data: UserInput) => {
        const signedUpUser = reqUserSignUp(data);
        signedUpUser &&
            dispatch(updateMessage(signedUpUser.Flash));
    }

    const handleLogin = (data: UserInput) => {
        const loggedInUser: User = reqUserLogin(data);
        loggedInUser ? (
            dispatch(userLogin({
                id: loggedInUser.userId, 
                email: loggedInUser.email, 
                password: loggedInUser.hashedPassword}))
            ) : (
            dispatch(updateMessage(loggedInUser.Flash))
            );
    }

  return (
    <form onSubmit={handleSubmit}>
        {
            Object.entries(inputOptions).map(([key, value]) => (
                <>
                <label htmlFor={key}>{key.toUpperCase()}</label>
                <input 
                    type={key} 
                    id={key} 
                    value={formData[key as keyof UserInput]} 
                    placeholder={value} 
                    onChange={handleChange}
                    required
                />
                </>
            ))
        }

        <SubmitButton />
    </form>
  )
}

export default SignUpLoginForm;
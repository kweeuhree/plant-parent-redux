import { useAppDispatch, useFormData } from '../../app/hooks';
import { Fragment } from 'react/jsx-runtime';
import { updateMessage } from '../message/messageSlice';
import { userLogin } from './userSlice';
import type { User } from './userSlice';
import { reqUserLogin, reqUserSignUp } from './fetchUser';
import SubmitButton from '../../components/SubmitButton';
import RedirectBox from './RedirectBox';

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

const redirectOptions = {
    SIGNUP: {
        redirectPath: '/login',
        content: "Already have an account?",
        buttonText: "Login"
    },
    LOGIN: {
        redirectPath:'/signup',
        content: "Don't have an account?",
        buttonText: "Sign up"
    },
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
    console.log(`Current form type: ${formType}`);
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
    <>
    <form onSubmit={handleSubmit}>
        {
            Object.entries(inputOptions).map(([key, value]) => {
                return (
                    <Fragment key={key}>
                    <label htmlFor={key}>{key.toUpperCase()}</label>
                    <input 
                        type={key} 
                        id={key} 
                        name={key}
                        value={formData[key as keyof UserInput]}
                        placeholder={value} 
                        onChange={handleChange}
                        required
                    />
                    </Fragment>
                )
            })
        }

        <SubmitButton />
    </form>

     <RedirectBox redirect={formType === 'SIGNUP' ? redirectOptions.SIGNUP : redirectOptions.LOGIN} />
    </>
  )
}

export default SignUpLoginForm;
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { useAppDispatch, useAppSelector, useInputData } from '../../app/hooks';
// message slice imports
import { setMessageWithTimeout } from '../message/messageSlice';
import Message from '../message/Message';
// plant slice imports
import { selectPlantsExist } from '../plant/plantSlice';
// user slice imports
import { userLogin } from './userSlice';
import type { User } from './userSlice';
import { reqUserLogin, reqUserSignUp } from './fetchUser';
import RedirectBox from './RedirectBox';
// components
import SubmitButton from '../../components/SubmitButton';




export type UserInput = {
    email: string,
    password: string,
}

export const initialState: UserInput = {email: '', password: ''};

type Props = {
    formMode: string,
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

const SignUpLoginForm = ({ formMode }: Props) => {
    useEffect(() => {
        console.log(`Current form type: ${formMode}`);
    }, []);
    // useInputData hook takes initialState and a callback function as arguments
    const dispatch = useAppDispatch();
    const hasPlants = useAppSelector(selectPlantsExist);
    const { inputData, handleChange, handleSubmit } = useInputData(
        initialState, 
        (data) => formMode === 'SIGNUP' ? 
        signUpWrapper(data) : 
        loginWrapper(data)
    );
    const navigate = useNavigate();
    

    const signUpWrapper = (data: UserInput) => {
        const newUser = reqUserSignUp(data);
        newUser &&
            dispatch(setMessageWithTimeout(newUser.Flash));
    }

    const loginWrapper = (data: UserInput) => {
        const authenticatedUser: User = reqUserLogin(data);
        authenticatedUser && (
            dispatch(userLogin({
                id: authenticatedUser.userId, 
                email: authenticatedUser.email, 
                password: authenticatedUser.hashedPassword}))
            ) 

            dispatch(setMessageWithTimeout(authenticatedUser.Flash));
            // when user logs in check plants length, navigate to all-plants 
            // if plants exist, else navigate to add new plant
            setTimeout(() => {
                hasPlants ? navigate('/all-plants') : navigate('/add-new-plant');
            }, 1000);

    }

  return (
    <>
    <Message />
    <h2>{formMode === 'SIGNUP' ? "Sign up" : "Login"}</h2>
    <form id='user-form' onSubmit={handleSubmit}>
        {
            Object.entries(inputOptions).map(([key, value]) => {
                return (
                    <Fragment key={key}>
                    <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    <input 
                        type={key} 
                        id={key} 
                        name={key}
                        value={inputData[key as keyof UserInput]}
                        placeholder={value} 
                        onChange={handleChange}
                        required
                    />
                    <br />
                    </Fragment>
                )
            })
        }

        <SubmitButton />
    </form>

     <RedirectBox redirect={formMode === 'SIGNUP' ? redirectOptions.SIGNUP : redirectOptions.LOGIN} />
    </>
  )
}

export default SignUpLoginForm;
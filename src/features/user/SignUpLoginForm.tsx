import { Fragment } from "react/jsx-runtime";

import {
  useAppDispatch,
  useAppSelector,
  useInputData,
  useMessageWithTimeOut,
  useNavigateToPath,
} from "../../app/hooks";
import { selectPlantsExist } from "../plant";
import { Message } from "../message";
import {
  reqUserLogin,
  reqUserSignUp,
  RedirectBox,
  userLogin,
  type User,
  type UserInput,
} from "./";
import { Button, LabeledInput } from "../../components";

const initialState: UserInput = { email: "", password: "" };

type Props = {
  formMode: string;
};

const inputOptions: UserInput = {
  email: "Enter email",
  password: "Enter password",
};

const redirectOptions = {
  SIGNUP: {
    redirectPath: "/login",
    content: "Already have an account?",
    buttonText: "Login",
  },
  LOGIN: {
    redirectPath: "/signup",
    content: "Don't have an account?",
    buttonText: "Sign up",
  },
};

const SignUpLoginForm = ({ formMode }: Props) => {
  const dispatch = useAppDispatch();
  const hasPlants = useAppSelector(selectPlantsExist);
  const loginRedirectPath = hasPlants ? "/all-plants" : "/add-new-plant";
  const setMessage = useMessageWithTimeOut();
  const navigate = useNavigateToPath();
  // useInputData hook takes initialState and a callback function as arguments
  const { inputData, handleChange, handleSubmit } = useInputData(
    initialState,
    data => (formMode === "SIGNUP" ? signUpWrapper(data) : loginWrapper(data)),
  );

  const signUpWrapper = (data: UserInput) => {
    const newUser = reqUserSignUp(data);
    newUser && setMessage(newUser.Flash);
  };

  const loginWrapper = (data: UserInput) => {
    const authenticatedUser: User = reqUserLogin(data);
    authenticatedUser &&
      dispatch(
        userLogin({
          id: authenticatedUser.userId,
          email: authenticatedUser.email,
          password: authenticatedUser.hashedPassword,
          dateCreated: authenticatedUser.dateCreated,
        }),
      );

    setMessage(authenticatedUser.Flash);
    // when user logs in check plants length, navigate to all-plants
    // if plants exist, else navigate to add new plant
    navigate(loginRedirectPath, 1000);
  };

  return (
    <>
      <Message />
      <h2>{formMode === "SIGNUP" ? "Sign up" : "Login"}</h2>
      <form id="user-form" onSubmit={handleSubmit}>
        {Object.entries(inputOptions).map(([type, label]) => {
          return (
            <Fragment key={type}>
              <LabeledInput
                label={label.charAt(0).toUpperCase() + label.slice(1)}
                id={type}
                name={type}
                type={type}
                onChange={handleChange}
                value={inputData[type as keyof UserInput]}
              />
              <br />
            </Fragment>
          );
        })}

        <Button type="submit" />
      </form>

      <RedirectBox
        redirect={
          formMode === "SIGNUP" ? redirectOptions.SIGNUP : redirectOptions.LOGIN
        }
      />
    </>
  );
};

export default SignUpLoginForm;

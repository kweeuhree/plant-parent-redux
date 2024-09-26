import { useState } from 'react';
import { useAppDispatch, useAppSelector, useInputData, useMessageWithTimeOut } from '../../app/hooks';
// user slice imports
import { selectUser, getAccountDays, userLogout, changePassword } from './userSlice';
// components
import DefaultLayout from '../../layouts/DefaultLayout';
import Button from '../../components/Button';
import LabeledInput from '../../components/LabeledInput';

type ButtonOption = {
  [key: string]: React.MouseEventHandler<HTMLButtonElement>;
}

const Profile = () => {
  const [inputMode, setInputMode] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const setMessage = useMessageWithTimeOut();
  const days = getAccountDays(user.dateCreated);

  const initialState = '';
  const {handleChange, handleSubmit} = useInputData(
    initialState, 
    (newPasswordData) => updateHashedPassword(newPasswordData['change-password'])
  );

  const handleLogout = () => {
    console.log('log out');
    setMessage('See you soon!');
    try {
      dispatch(userLogout());
    } catch (error) {
      throw new Error(`${error instanceof Error && error}`);
    } 

  }

  const handleChangePassword = () => {
    console.log('change password');
    setInputMode(true);
  }

  const updateHashedPassword = (newPassword: string) => {
    try {
      dispatch(changePassword({newPassword}));
      setMessage('Password changed');
      setInputMode(false);
    } catch (error) {
      throw new Error(`${error instanceof Error && error}`);
    }
  }

  const handleDeleteAccount = () => {
    console.log('delete account');
  }

  const buttonBoxOptions: ButtonOption = {
    "Log out": handleLogout,
    "Change password": handleChangePassword,
    "Delete account": handleDeleteAccount,
  }

  const buttonBox = Object.entries(buttonBoxOptions).map(([buttonText, handlerFunc]) => (
    <Button key={buttonText} text={buttonText} onClick={handlerFunc} />
   )) 


  return (
    <DefaultLayout>
      
      {/* main of the profile */}
      <main className='profile-page'>
        <h3>Hello!</h3>
        <div>Days since account created: {days}</div>

      {/* profile buttons */}
        <div className='button-box'>
         {!inputMode 
         ? buttonBox
         : (
          <form onSubmit={handleSubmit}>
            <LabeledInput 
                label="New password:"
                id="change-password" 
                name="change-password"
                type="password"
                onChange={handleChange}
                />
            <br />
            <Button type="submit"/>
            <Button type="button" text="Cancel" onClick={() => setInputMode(false)} />
          </form>         
         )}
        </div>
      </main>

    </DefaultLayout>
  )
}

export default Profile;
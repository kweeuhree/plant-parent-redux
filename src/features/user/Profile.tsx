import { useAppDispatch, useAppSelector, useMessageWithTimeOut } from '../../app/hooks';
// user slice imports
import { selectUser, getAccountDays, userLogout } from './userSlice';
// components
import DefaultLayout from '../../layouts/DefaultLayout';
import Button from '../../components/Button';

type ButtonOption = {
  [key: string]: React.MouseEventHandler<HTMLButtonElement>;
}

const Profile = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const setMessage = useMessageWithTimeOut();
  const days = getAccountDays(user.dateCreated);

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
         {buttonBox}
        </div>
      </main>

    </DefaultLayout>
  )
}

export default Profile;
import { useAppSelector, useNavigateToPath } from '../../app/hooks';
// user slice imports
import { selectUser, getAccountDays } from './userSlice';
// components
import Button from '../../components/Button';

type ButtonOption = {
  [key: string]: React.MouseEventHandler<HTMLButtonElement>;
}

const Profile = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigateToPath();
  const days = getAccountDays(user.dateCreated);

  const handleLogout = () => {
    console.log('log out');
  }

  const handleChangePassword = () => {
    console.log('change password');
  }

  const handleDeleteAccount = () => {
    console.log('delete account');
  }

  const buttonBox: ButtonOption = {
    "Log out": handleLogout,
    "Change password": handleChangePassword,
    "Delete account": handleDeleteAccount,
  }

  return (
    <div className='profile-page'>

      {/* main of the profile */}
      <main>
        <h3>Hello!</h3>
        <div>Days since account created: {days}</div>

      {/* profile buttons */}
        <div className='button-box'>
         {Object.entries(buttonBox).map(([buttonText, handlerFunc]) => (
          <Button key={buttonText} text={buttonText} onClick={handlerFunc} />
         ))}
        </div>
      </main>

      {/* sidebar */}
      <div className='sidebar'>
        <Button text="All plants" onClick={() => navigate('/all-plants')} />
        <Button text="Add new plant" onClick={() => navigate('/add-new-plant')} />
      </div>

    </div>
  )
}

export default Profile;
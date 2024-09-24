import { useNavigateToPath } from "../app/hooks"
import Button from './Button';

const NavigateToProfileButton = () => {
    
  const navigate = useNavigateToPath();

  return (
    <Button onClick={() => navigate('/profile')} text="Profile" />
  )
}

export default NavigateToProfileButton;
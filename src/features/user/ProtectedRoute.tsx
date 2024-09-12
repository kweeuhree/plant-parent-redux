import { useAppSelector } from '../../app/hooks';
import { selectAuthStatus } from './userSlice';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
    element: React.ComponentType<any>; // The component that will be rendered
    [key: string]: any; // Any additional props
  };
  
  const ProtectedRoute: React.FC<ProtectedRouteProps> = (
      { element: Element, ...props }) => {
    const isUserAuthorized = useAppSelector(selectAuthStatus);
  
    return isUserAuthorized ? <Element {...props} /> : <Navigate to="/" />;
  };  
  export default ProtectedRoute;
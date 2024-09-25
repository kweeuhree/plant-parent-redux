import '../App.css';
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useNavigateToPath } from "../app/hooks";
// components
import Button from "../components/Button";

type Options = {
    [key: string]: {
        text : string,
        redirectPath: string,
    }
}

const topButtonOptions: Options = {
    'All plants': {text: 'All plants', redirectPath: '/all-plants'},
    'Profile': {text: 'Profile', redirectPath: '/profile'},
}

type Props = {
    children: ReactNode,
}

const DefaultLayout = ({children}: Props) => {
    const navigate = useNavigateToPath();
    const location = useLocation();

    const topButton = location.pathname === '/profile' 
    ? topButtonOptions['All plants'] 
    : topButtonOptions['Profile'];


  return (
    <div className="default-layout">
        <main className="default-main">
            {children}
        </main>
        <nav className="sidebar">
            <Button text={topButton.text} onClick={() => navigate(topButton.redirectPath)} /> 
            <Button text="Add new plant" onClick={() => navigate('/add-new-plant')} />
        </nav>
    </div>
  )
}

export default DefaultLayout;
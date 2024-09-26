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

const buttonOptions: Options = {
    all: {text: 'All plants', redirectPath: '/all-plants'},
    profile: {text: 'Profile', redirectPath: '/profile'},
    add: {text: 'Add new plant', redirectPath: '/add-new-plant'},
}

type Props = {
    children: ReactNode,
}

const DefaultLayout = ({children}: Props) => {
    const navigate = useNavigateToPath();
    const location = useLocation();

    const topButton = location.pathname === '/profile' 
    ? buttonOptions.all 
    : buttonOptions.profile;

    const bottomButton = location.pathname === '/add-new-plant'
    ? buttonOptions.all 
    : buttonOptions.add;


  return (
    <div className="default-layout">
        <main className="default-main">
            {children}
        </main>
        <nav className="sidebar">
            <Button text={topButton.text} onClick={() => navigate(topButton.redirectPath)} /> 
            <Button text={bottomButton.text} onClick={() => navigate(bottomButton.redirectPath)} />
        </nav>
    </div>
  )
}

export default DefaultLayout;
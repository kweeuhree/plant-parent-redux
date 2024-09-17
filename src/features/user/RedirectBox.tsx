import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
    redirect: {
        redirectPath: string;
        content: string;
        buttonText: string;
    };
};

const RedirectBox = ({redirect}: Props) => {
    const navigate = useNavigate();
    const { redirectPath, content, buttonText } = redirect;

    const handleClick = () => {
        console.log(`Redirecting to ${redirectPath}`);
        navigate(redirectPath);
    }

  return (
    <div className="redirect-box">
        <p>{content}</p>
        <button onClick={handleClick}>{buttonText}</button>
    </div>
  )
}

export default RedirectBox;
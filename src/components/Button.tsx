import type { MouseEventHandler } from "react";

type Props = {
  text?: string,
  type?: "submit" | "button",
  onClick?: MouseEventHandler<HTMLButtonElement>,
}

const Button = ({text = 'Submit', type, onClick}: Props) => {
  return (
    <button type={type} onClick={onClick}>{text}</button>
  );
}

export default Button;
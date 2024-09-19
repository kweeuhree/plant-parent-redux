import type { MouseEventHandler } from "react";

type Props = {
  text?: string,
  onClick?: MouseEventHandler<HTMLButtonElement>,
}

const SubmitButton = ({text = 'Submit', onClick}: Props) => {
  return (
    <button type="submit" onClick={onClick}>{text}</button>
  );
}

export default SubmitButton;
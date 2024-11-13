import { useAppSelector } from "../../app/hooks";
import { selectMessage } from "./";

export const Message = () => {
  const { message } = useAppSelector(selectMessage);
  return <div>{message}</div>;
};

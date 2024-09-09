import { useAppSelector } from '../../app/hooks';
import { selectMessage } from './messageSlice';

const Message = () => {
    const message = useAppSelector(selectMessage);
  return (
    <div>{message}</div>
  )
}

export default Message;
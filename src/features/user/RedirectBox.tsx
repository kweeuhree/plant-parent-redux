import { useNavigateToPath } from "../../app/hooks";
import { Button } from "../../components";

type Props = {
  redirect: {
    redirectPath: string;
    content: string;
    buttonText: string;
  };
};

const RedirectBox = ({ redirect }: Props) => {
  const navigate = useNavigateToPath();
  const { redirectPath, content, buttonText } = redirect;

  return (
    <div className="redirect-box">
      <p>{content}</p>

      <Button
        type="submit"
        onClick={() => navigate(redirectPath)}
        text={buttonText}
      />
    </div>
  );
};

export default RedirectBox;

import { selectUser } from "@/features/traveler(user)/auth/redux/authSelectors";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const usePrivacySettings = () => {
  const user = useSelector(selectUser);
  const email = user?.email;

  const navigate = useNavigate();

  const onChangeEmail = () => {
    navigate("/change-email");
  };

  const onChangePassword = () => {
    navigate("/change-password");
  };

  return {
    email,
    onChangeEmail,
    onChangePassword,
  };
};

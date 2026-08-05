import { useCallback } from "react";

export const usePrivacySettings = () => {
  // Replace with Redux selector/API response
  const email = "arjun.malhotra@travelmail.com";

  const onChangeEmail = useCallback(() => {
    // navigate("/settings/change-email");
    console.log("Change Email");
  }, []);

  const onChangePassword = useCallback(() => {
    // navigate("/settings/change-password");
    console.log("Change Password");
  }, []);

  return {
    email,
    onChangeEmail,
    onChangePassword,
  };
};

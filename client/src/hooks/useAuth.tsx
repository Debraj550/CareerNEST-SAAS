import { useState } from "react";

const useAuth = () => {
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  return isLoggedin;
};

export default useAuth;

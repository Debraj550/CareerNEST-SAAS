import { useState } from "react";

const useAuth = () => {
  const [isLoggedin, setIsLoggedin] = useState<boolean>(true);
  return [isLoggedin, setIsLoggedin];
};

export default useAuth;

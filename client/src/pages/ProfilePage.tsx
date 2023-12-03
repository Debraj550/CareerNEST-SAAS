import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type Props = {};

const ProfilePage = (props: Props) => {
  const authContext = useContext(AuthContext);
  console.log(authContext?.user);
  return <div>ProfilePage</div>;
};

export default ProfilePage;

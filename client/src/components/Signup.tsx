import React from "react";

type Props = {};

const Signup = (props: Props) => {
  return (
    <div className="bg-slate-100 w-fit p-4 rounded-lg">
      <div>Signup form</div>
      <div>
        <h1>Name</h1>
        <input type="text"></input>
      </div>
    </div>
  );
};

export default Signup;

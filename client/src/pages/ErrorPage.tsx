import React from "react";

type Props = {};

const ErrorPage = (props: Props) => {
  return (
    <div className="p-4 bg-red-600 my-4">
      <h1 className="font-bold text-white text-3xl text-center p-4 ">
        Cannot the page you are looking for. 🙁
      </h1>
    </div>
  );
};

export default ErrorPage;

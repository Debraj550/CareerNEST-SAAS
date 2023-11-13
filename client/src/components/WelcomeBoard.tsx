import React from "react";
import wbanimation from "../static/welcomeboardanimation.json";
import Lottie from "lottie-react";

type Props = {};

const WelcomeBoard = (props: Props) => {
  return (
    <div className="p-4 border-2 rounded-xl h-fit flex bg-slate-100">
      <Lottie className="w-5/12" animationData={wbanimation} />
      <div className="w-5/12 flex flex-col justify-center gap-6">
        <h1 className="font-bold text-4xl ">
          Welcome to Career<span className="text-blue-600">NEST</span>
        </h1>
        <p className="text-lg">
          Let your career aspirations take flight! We're thrilled to have you on
          board, and we believe that your journey to professional success begins
          right here.
        </p>
      </div>
    </div>
  );
};

export default WelcomeBoard;

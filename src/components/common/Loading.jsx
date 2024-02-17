import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loading = ({ height, width }) => {
  return (
    <div>
      <ThreeCircles
        visible={true}
        height={height}
        width={width}
        color="#3b4ba1"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;

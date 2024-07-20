import React from "react";
import Unicomplogo from "../assets/unicomp-logo.png";
const UnicompLogo = (props: React.HTMLAttributes<HTMLImageElement>) => {
  return <img src={Unicomplogo} alt="Unicomp logo" {...props} />;
};

export default UnicompLogo;

import topreLogoPng from "./topre-logo.png";

const TopreLogo = (props: React.HTMLAttributes<HTMLImageElement>) => {
  return <img src={topreLogoPng} alt="topre logo" {...props} />;
};

export default TopreLogo;

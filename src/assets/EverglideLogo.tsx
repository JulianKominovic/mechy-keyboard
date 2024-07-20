import EverglideLogoAvif from "./everglide-logo.avif";
const EverglideLogo = (props: React.HTMLAttributes<HTMLImageElement>) => {
  return <img src={EverglideLogoAvif} alt="Everglide logo" {...props} />;
};

export default EverglideLogo;

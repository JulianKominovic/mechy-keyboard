import clsx from "clsx";
import { Keys } from "../utils/keymaps";
type Props = {
  keys: (typeof Keys | JSX.Element | string)[];
} & React.HTMLAttributes<HTMLElement>;

const Shortcut = ({ keys, ...rest }: Props) => {
  return (
    <kbd
      {...rest}
      className={clsx(
        "flex items-center leading-none font-semibold text-sm",
        rest.className
      )}
    >
      {keys.map((k) => (
        <span className="w-[14px]">{k as any}</span>
      ))}
    </kbd>
  );
};

export default Shortcut;

import clsx from "clsx";
import { Keys } from "../utils/keymaps";
import { useId } from "react";
type Props = {
  keys: (typeof Keys | JSX.Element | string)[];
} & React.HTMLAttributes<HTMLElement>;

const Shortcut = ({ keys, ...rest }: Props) => {
  const id = useId();
  return (
    <kbd
      {...rest}
      className={clsx(
        "flex items-center gap-0.5 leading-none font-semibold font-sans text-sm tabular-nums",
        rest.className
      )}
    >
      {keys.map((k, i) => (
        <span key={id + i}>{k as any}</span>
      ))}
    </kbd>
  );
};

export default Shortcut;

import clsx from "clsx";
import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

const Separator = ({ children, className, ...rest }: Props) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-3 text-[10px] font-medium after:inline-block after:bg-neutral-300 after:w-full after:h-px text-neutral-400 after:rounded-full",
        className
      )}
      {...rest}
    >
      {children && <span className="whitespace-nowrap">{children}</span>}
    </div>
  );
};

export default Separator;

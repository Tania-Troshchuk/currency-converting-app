import classNames from "classnames";
import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLButtonElement> {}

export const ChangeBtn = (props: IProps) => {
  const { className, ...rest } = props
  return (
    <button
      className={classNames(
        "absolute top-1/2 left-1/2 -translate-y-[30%] -translate-x-1/2 p-1 text-4xl bg-emerald-50 rounded-sm rotate-90 text-emerald-700 font-black box-border",
        "hover:bg-emerald-100",
        "md:-translate-y-[50%] md:rotate-0",
        className
      )}
      {...rest}
    >
      &#8644;
    </button>
  );
}

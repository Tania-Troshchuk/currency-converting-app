import classNames from "classnames";
import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLInputElement> {
  value: string;
  title: string;
  handleInput: (value: string) => void;
  error?: string;
}

export const LineInput = (props: IProps) => {
  const { value, title, handleInput, error, ...rest } = props;

  return (
    <div className="grow">
      <label
        htmlFor={title}
        className="block text-white text-2xl tracking-wide"
      >
        {title}
      </label>

      <input
        id={title}
        type="string"
        autoComplete="off"
        className={classNames(
          "mt-4 w-full bg-[inherit] border-b-2 outline-none text-xl font-bold tracking-wide text-white leading-8",
          `${error ? "border-red-600" : "border-white"}`
        )}
        value={value}
        onChange={(e) =>
          handleInput(
            e.target.value
              .replace(/^(0+)/, "0")
              .replace(/^(\.)/, "")
              .replace(/[^\d.]+/g, "")
              .replace(/([^.]*\.[^.]*)\./, "$1")
          )
        }
        {...rest}
      />

      <p className="text-sm font-semibold text-red-600">{error}</p>
    </div>
  );
};

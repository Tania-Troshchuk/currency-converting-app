import { InputHTMLAttributes, forwardRef } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  title: string;
  handleInput: (value: string) => void;
}

export const LineInput = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { value, title, handleInput, ...rest } = props;

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
        ref={ref}
        autoComplete="off"
        className={
          "mt-4 w-full bg-[inherit] border-b-2 outline-none text-xl font-bold tracking-wide text-white leading-8 border-white"
        }
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
    </div>
  );
});

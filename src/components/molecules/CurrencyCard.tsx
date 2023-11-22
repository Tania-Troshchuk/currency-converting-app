import classNames from "classnames";
import { CustomSelect, LineInput } from "..";
import { ForwardedRef, HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  inputTitle: string;
  selectList: string[];
  handleInput: (value: string) => void;
  handleSelect: (value: string) => void;
  inputValue?: string | null;
  selectedItem?: string | null;
  inputRef?: ForwardedRef<HTMLInputElement>;
}

export const CurrencyCard = (props: IProps) => {
  const {
    className,
    inputTitle,
    inputValue,
    handleInput,
    selectList,
    selectedItem,
    handleSelect,
    inputRef,
  } = props;

  return (
    <div
      data-testid="currency-card"
      className={classNames("w-full flex p-8 gap-3", className)}
    >
      <LineInput
        title={inputTitle}
        value={inputValue ?? "0"}
        handleInput={handleInput}
        ref={inputRef}
      />

      <CustomSelect
        list={selectList}
        selected={selectedItem}
        handleSelect={handleSelect}
      />
    </div>
  );
};

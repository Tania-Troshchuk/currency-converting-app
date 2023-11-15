import { HTMLAttributes } from "react";
interface IProps extends HTMLAttributes<HTMLDivElement> {
  list: string[]
}

export const CustomSelect = (props: IProps) => {
  const { list } = props

  return (
    <select className="bg-[inherit] outline-none text-xl font-semibold text-white self-end">
      {list.map((el) => (
        <option value={el} key={el}>
          {el}
        </option>
      ))}
    </select>
  );
}


const items = ["USD", "EUR", "UA"]
interface IProps extends HTMLDivElement {
  
}

export const CustomSelect = () => {
  return (
    <select className="bg-[inherit] outline-none text-xl font-semibold text-white self-end">
      {items.map((el) => (
        <option value={el} key={el}>
          {el}
        </option>
      ))}
    </select>
  );
}

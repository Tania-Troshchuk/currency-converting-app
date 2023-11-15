import classNames from "classnames";
import {
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
interface IProps extends HTMLAttributes<HTMLDivElement> {
  list: string[];
  handleSelect: (value: string) => void
  selected?: string | null;
}

export const CustomSelect = (props: IProps) => {
  const { selected, list, handleSelect } = props;
  const listRef = useRef<HTMLUListElement>(null);
  const [isListOpened, setIsListOpened] = useState(false);

  const onClickOutside = useCallback((event: MouseEvent) => {
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setIsListOpened(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [onClickOutside]);

  return (
    <div
      className="relative w-[60px] box-border bg-[inherit] outline-none font-semibold text-white self-end cursor-pointer"
      onClick={() => setIsListOpened(!isListOpened)}
    >
      <div className="text-xl">
        <span>{selected ?? '---'}</span>
        <span className="pl-2 ">&#x2193;</span>
      </div>

      {isListOpened && (
        <ul
          ref={listRef}
          className="absolute w-[70px] max-h-[400px] overflow-scroll box-border top-0 left-0 bg-white z-10 text-emerald-600 rounded-sm text-center"
        >
          {list.map((el) => (
            <li
              className={classNames("px-2 hover:bg-emerald-100", {
                "bg-emerald-300": selected === el,
              })}
              key={el}
              onClick={() => handleSelect(el)}
            >
              {el}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

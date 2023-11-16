import { IConverter } from "../../types/converter";

interface IProps extends Pick<IConverter, "baseCurrency" | "quoteCurrency"> {
  quoteRate: string;
  date: string
}

export const Note = (props: IProps) => {
  const { baseCurrency, quoteCurrency, quoteRate, date } = props;

  return (
    <div className="my-8 self-start text-emerald-700 font-bold md:text-lg">
      <span>{`1 ${baseCurrency} = `}</span>
      <b>{`${quoteRate} ${quoteCurrency}`}</b>
      <p>{`The market exchange rate on ${date}`}</p>
    </div>
  );
};

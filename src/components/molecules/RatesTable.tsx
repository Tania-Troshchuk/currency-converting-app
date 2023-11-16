import { Fragment } from "react";
import { IRateTable } from "../../types/converter";

export const RatesTable = ({ list }: { list: IRateTable []}) => {
  return (
    <div className="my-8 w-full">
      <div className="rates-grid bg-emerald-600 text-white border-b-0 rounded-t-lg md:text-xl">
        <div className="cell border-r-2">Currency:</div>
        <div className="cell border-r-2">1 Unit:</div>
        <div className="cell">Amount:</div>
      </div>

      <div className="rates-grid bg-emerald-100 text-emerald-900 border-t-0 rounded-b-lg">
        {list.map((el) => (
          <Fragment key={el.currency}>
            <div className="cell border-t-2 border-r-2">{el.currency}</div>
            <div className="cell border-t-2 border-r-2">{el.oneUnit}</div>
            <div className="cell border-t-2">{el.amount}</div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

import { IRate } from "../../types/converter";
import { convertCurrency } from "../../utils/convertCurrency";

describe("convertCurrency", () => {
  const mockRates: IRate[] = [
    {
      cc: "USD",
      exchangedate: "2023-01-01",
      r030: 840,
      rate: 1.0,
      txt: "United States Dollar",
    },
    {
      cc: "EUR",
      exchangedate: "2023-01-01",
      r030: 978,
      rate: 0.82,
      txt: "Euro",
    },
  ];

  it("converts currency correctly", () => {
    const result = convertCurrency("100", "USD", "EUR", mockRates);
    expect(result).toBe("121.95");
  });

  it("returns 0 if rates do not founded", () => {
    const result = convertCurrency("100", "GBP", "EUR", mockRates);
    expect(result).toBe("0");

    const result2 = convertCurrency("100", "USD", "GBP", mockRates);
    expect(result2).toBe("0");
  });

  it("sets 2 decimals by default", () => {
    const result = convertCurrency("100", "USD", "EUR", mockRates);
    expect(result).toBe("121.95");
  });

  it("sets the pass decimals id its pass", () => {
    const result = convertCurrency("100", "USD", "EUR", mockRates, 4);
    expect(result).toBe("121.9512");
  });
});

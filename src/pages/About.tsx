export const About = () => {
  return (
    <>
      <h2 className="main-header">About</h2>

      <div className="flex flex-col gap-6 text-emerald-900 text-xl text-justify font-medium">
        <section>
          Welcome to the <strong className="font-black tracking-wide">Currency Converter App</strong>, where you can easily
          convert currencies and stay updated with the latest exchange rates.
        </section>

        <section>
          <h3 className="header">Currency Rates</h3>

          <p>
            Our app covers exchange rates for more than 50 countries, ensuring
            that you have access to accurate and up-to-date information for a
            wide range of currencies.
          </p>
        </section>

        <section>
          <h3 className="header">Contact Us</h3>

          <div>
            <p>
              If you have any questions, feedback, or suggestions, feel free to
              reach out to us.
            </p>

            <ul className="my-6 text-base">
              <li>
                Email:{" "}
                <a href="mailto:support@currencyconverterapp.com">
                  support@currencyconverterapp.com
                </a>
              </li>
              <li>
                Phone: <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </li>
              <li>
                Address:{" "}
                <a href="https://maps.example.com/city" target="_blank">
                  123 Main Street, City, Country
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

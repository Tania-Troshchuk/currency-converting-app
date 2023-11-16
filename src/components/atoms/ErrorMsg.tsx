export const ErrorMsg = ({ isError }: { isError: boolean }) => {
  return (
    isError && (
      <div className="my-8 px-4 py-2 self-start bg-red-100 rounded-xl text-red-600 text-xl font-medium">
        <p>Oops! Looks like something went wrong 🥺</p>
        <p>Please try again later, and thanks for your patience 😊 !</p>
      </div>
    )
  );
};

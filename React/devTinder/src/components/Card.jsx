const Card = ({children}) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm flex mt-4 left-[50%] translate-x-[-50%]">
      {children}
    </div>
  );
};

export default Card;

const Spinner = () => {
  return (
    <svg
      className="animate-spin h-12 w-12 text-white" // Changed size to h-12 and w-12 for a larger spinner
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className="fill-current animate-bounce"
        x="1.5"
        y="1.5"
        rx="1"
        width="9"
        height="9"
      />
      <rect
        className="fill-current animate-bounce delay-150"
        x="13.5"
        y="1.5"
        rx="1"
        width="9"
        height="9"
      />
      <rect
        className="fill-current animate-bounce delay-300"
        x="13.5"
        y="13.5"
        rx="1"
        width="9"
        height="9"
      />
      <rect
        className="fill-current animate-bounce delay-450"
        x="1.5"
        y="13.5"
        rx="1"
        width="9"
        height="9"
      />
    </svg>
  );
};

export default Spinner;

interface LogoutButtonProps {
  handleClick: () => void
}

function LogoutButton({handleClick}: LogoutButtonProps) {
  return (
    <button type="button" className="text-baseGreyDark" onClick={handleClick}>
      <svg
        className="w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </button>
  );
}

export default LogoutButton;

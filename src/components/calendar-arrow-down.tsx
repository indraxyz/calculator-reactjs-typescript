const CalendarArrowDown = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m14 18 4 4 4-4" />
      <path d="M16 2v4" />
      <path d="M18 14v8" />
      <path d="M21 11.354V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.343" />
      <path d="M3 10h18" />
      <path d="M8 2v4" />
    </svg>
  );
};

export default CalendarArrowDown;

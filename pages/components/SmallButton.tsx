interface Props {
  label: string;
  onClick?: React.MouseEventHandler;
  isLoading?: boolean;
}

const Button: React.FC<Props> = ({ label, onClick, isLoading }) => {
  return (
    <button className="px-6 bg-rb-red-inactive text-white text-sm font-medium py-3.5 rounded-md hover:bg-rb-red-active hover:duration-100 sm:px-8" onClick={onClick}> 
      <div className="w-full h-full flex justify-center items-center">
        {!isLoading && label}
        {isLoading && <div className="flex w-2 h-2 relative rounded bg-[#E2E3E5] animate-dot-flashing delay-500 before:left-[-15px] before:w-2 before:h-2 before:rounded before-bg[#E2E3E5] before:animate-dot-flashing before:delay-500 after:left-[15px] after:w-2 after:h-2 after:rounded after:bg-[#E2E3E5] after:animate-dot-flashing after:delay-500"></div>} 
      </div>
    </button>
  );
};

export default Button;

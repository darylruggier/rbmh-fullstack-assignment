interface Props {
  label: string;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  isLoading?: boolean;
}

const LargeButton: React.FC<Props> = ({ label, onClick, disabled, isLoading}) => {
  return (
    <button disabled={disabled || isLoading} className="w-full h-14 rounded-md mt-6 bg-rb-red-inactive text-white disabled:bg-[#E2E3E5] transition duration-200 hover:bg-rb-red-active" onClick={onClick}>
      <div className="w-full h-full flex justify-center items-center">
        {!isLoading && label}
        {isLoading && <div className="flex w-2 h-2 relative rounded bg-[#E2E3E5] animate-dot-flashing delay-500 before:left-[-15px] before:w-2 before:h-2 before:rounded before-bg[#E2E3E5] before:animate-dot-flashing before:delay-500 after:left-[15px] after:w-2 after:h-2 after:rounded after:bg-[#E2E3E5] after:animate-dot-flashing after:delay-500"></div>} 
      </div>
    </button>
  );
};

export default LargeButton;

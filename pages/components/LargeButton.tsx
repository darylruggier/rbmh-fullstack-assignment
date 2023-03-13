interface Props {
  label: string;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
}

const LargeButton: React.FC<Props> = ({ label, onClick, disabled }) => {
  return (
    <button disabled={disabled} className="w-full h-12 rounded-md mt-6 bg-rb-red-inactive text-white disabled:bg-[#E2E3E5] transition duration-200 hover:bg-rb-red-active" onClick={onClick}>{label}</button>
  );
};

export default LargeButton;

interface Props {
  label: string;
  onClick?: React.MouseEventHandler;
}

const Button: React.FC<Props> = ({ label, onClick }) => {
  return (
    <button className="px-6 bg-rb-red-inactive text-white text-sm font-medium py-3.5 rounded-md hover:bg-rb-red-active hover:duration-100 sm:px-8" onClick={onClick}> 
      {label}
    </button>
  );
};

export default Button;

interface NavButtonProps {
  currentStep: number;
  step: number;
}

const NavButton: React.FC<NavButtonProps> = ({ currentStep, step }) => {
  return (
    <button
      className={`w-10 h-10 transition-colors duration-150 rounded-full pointer-events-none ${
        currentStep === step
          ? "text-white bg-cyan-400"
          : "text-cyan-400 hover:bg-indigo-100"
      }`}
    >
      {step + 1}
    </button>
  );
};

export default NavButton;

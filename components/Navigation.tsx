import React from "react";
import NavButton from "@/components/NavButton";

interface NavProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  prev: () => void;
  next: () => void;
}

const Navigation: React.FC<NavProps> = ({
  currentStep,
  setCurrentStep,
  prev,
  next,
}) => {
  return (
    <div className="pl-10 sm:pl-0 mx-auto">
      <nav aria-label="Page navigation">
        <ul className="inline-flex space-x-2">
          <li>
            <button
              onClick={prev}
              className="flex items-center justify-center w-10 h-10 text-cyan-400 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          {[0, 1, 2].map((step) => (
            <li key={step}>
              <NavButton currentStep={currentStep} step={step} />
            </li>
          ))}
          <li>
            <button
              onClick={next}
              className="flex items-center justify-center w-10 h-10 text-cyan-400 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-indigo-100"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;

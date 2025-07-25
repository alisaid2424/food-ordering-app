"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-gray-200 rounded-lg w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-3 font-medium text-left text-gray-700 bg-gray-50 hover:bg-gray-100"
      >
        <span>{title}</span>
        <FiChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-3 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300">
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;

import React from "react";

interface SortDropdownProps {
  headers: string[];
  onSortSelect: (sortField: string) => void;
  onClose: () => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  headers,
  onSortSelect,
  onClose,
}) => {
  return (
    <div className="absolute mt-2 bg-white shadow-lg rounded p-2 w-20 z-10 sm:top-44 md:top-36 right-12">
      <ul>
        {headers.map((header) => (
          <li
            key={header}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded"
            onClick={() => {
              onSortSelect(header);
              onClose();
            }}
          >
            {header}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortDropdown;

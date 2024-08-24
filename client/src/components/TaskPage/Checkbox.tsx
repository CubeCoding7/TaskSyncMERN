import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/pro-solid-svg-icons";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  const handleCheckboxChange = () => {
    onChange(!checked);
  };

  return (
    <div
      onClick={handleCheckboxChange}
      style={{
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          border: "1px solid #ccc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {checked && <FontAwesomeIcon icon={faCheck} />}
      </div>
    </div>
  );
};

export default Checkbox;

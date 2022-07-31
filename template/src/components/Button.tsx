import React, { memo } from "react";

interface props {
  loading?: boolean;
  onClick: () => void;
  isDisabled?: boolean;
  placeholder: string;
  className?: string;
  icon?: string;
  submit?: boolean;
}
const Button: React.FC<props> = ({
  loading,
  onClick,
  isDisabled,
  placeholder,
  className,
  icon,
  submit,
}) => {
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={() => onClick()}
      disabled={isDisabled}
      className={`btn-primary flex items-center justify-center ${className} ${
        isDisabled && "opacity-75 cursor-not-allowed"
      }`}
    >
      {loading ? (
        <i className="bx bx-loader-alt bx-spin text-xl"></i>
      ) : (
        <>
          <span className="ml-1">{placeholder}</span>
          <i className={`bx ${icon}`}></i>
        </>
      )}
    </button>
  );
};

export default memo(Button);

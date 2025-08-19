import React, { useState } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled: "bg-gray-100 border border-transparent",
  outlined: "border border-gray-400",
  ghost: "border-none bg-transparent",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-full">
      {label && <label className="mb-1 font-medium">{label}</label>}
      <div className="relative">
        <input
          type={label?.toLowerCase().includes("password") && !showPassword ? "password" : "text"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`rounded-md w-full ${sizeClasses[size]} ${variantClasses[variant]} ${
            invalid ? "border-red-500" : ""
          } ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
          aria-invalid={invalid}
          aria-disabled={disabled}
        />
        {label?.toLowerCase().includes("password") && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-xs"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {invalid && errorMessage ? (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      ) : (
        helperText && <p className="text-gray-500 text-sm">{helperText}</p>
      )}
    </div>
  );
};

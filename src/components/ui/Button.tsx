import React, { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm',
    secondary: 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 shadow-sm',
    accent: 'bg-accent-600 text-white hover:bg-accent-700 shadow-sm',
    outline: 'bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50',
    text: 'bg-transparent text-primary-600 hover:bg-gray-100',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-3 py-2 space-x-1.5',
    md: 'text-sm px-4 py-2.5 space-x-2',
    lg: 'text-base px-5 py-3 space-x-2.5',
  };
  
  const disabledClasses = props.disabled
    ? 'opacity-60 cursor-not-allowed'
    : 'cursor-pointer';
  
  const loadingClasses = isLoading
    ? 'cursor-wait'
    : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${loadingClasses} ${className}`;
  
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      className={classes}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </div>
      ) : (
        <>
          {leftIcon && <span>{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};

export default Button;
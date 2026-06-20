import React, { useState } from "react";
import { Loader2 } from "lucide-react";

interface InteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loadingDuration?: number; // simulated loading duration in ms
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  children,
  loadingDuration = 900,
  className = "",
  disabled,
  onClick,
  type = "button",
  ...props
}) => {
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // For form submit buttons, let the default behavior (submitting/firing onSubmit) take place if not customized.
    // But since we want to show a simulated loading before triggering the actual action:
    if (isLocalLoading || disabled) return;

    if (type === "submit") {
      // For form submissions, let it pass through directly or use the parent's handler
      if (onClick) {
        onClick(e);
      }
      return;
    }

    setIsLocalLoading(true);
    
    // Simulate action process
    await new Promise((resolve) => setTimeout(resolve, loadingDuration));
    
    try {
      if (onClick) {
        onClick(e);
      }
    } finally {
      setIsLocalLoading(false);
    }
  };

  return (
    <button
      {...props}
      type={type}
      disabled={disabled || isLocalLoading}
      onClick={handleClick}
      className={`relative flex items-center justify-center gap-2 transition-all ${className} ${
        isLocalLoading ? "opacity-85 pointer-events-none" : ""
      }`}
    >
      {isLocalLoading && (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-current shrink-0" />
      )}
      {children}
    </button>
  );
};

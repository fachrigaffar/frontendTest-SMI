import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { LoaderCircle } from 'lucide-react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  children: ReactNode;
};

export function Button({ variant = 'primary', loading = false, children, className = '', disabled, ...props }: ButtonProps) {
  return (
    <button className={`button button-${variant} ${className}`} disabled={disabled || loading} {...props}>
      {loading && <LoaderCircle className="spin" size={16} aria-hidden="true" />}
      {children}
    </button>
  );
}

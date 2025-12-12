// ============================================
// FORM FIELD COMPONENT (MOLECULE)
// ============================================

import React from 'react';
import { Label } from '../atoms/Label';
import { Input, type InputProps } from '../atoms/Input';
import { cn } from '@/utils/cn';

interface FormFieldProps extends InputProps {
  label: string;
  required?: boolean;
  helperText?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  error,
  helperText,
  id,
  className,
  ...props
}) => {
  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={fieldId} required={required}>
        {label}
      </Label>
      <Input id={fieldId} error={error} {...props} />
      {helperText && !error && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};

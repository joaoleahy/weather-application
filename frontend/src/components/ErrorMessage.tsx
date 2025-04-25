
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4 flex items-center gap-3 text-red-700">
      <AlertCircle className="h-5 w-5 flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;

"use client"

import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of your context
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Provide a default value matching the context shape
export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {}, // Empty function as a placeholder
});

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

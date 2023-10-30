"use client";

import { PinnedContextProvider } from "@/hooks/usePinned";

 interface PinnedProviderProps {
    children: React.ReactNode
 }

 const PinnedProvider: React.FC<PinnedProviderProps> = ({ children }) => {
   return (
     <PinnedContextProvider>
        {children}
     </PinnedContextProvider>
   )
 }
 
 export default PinnedProvider;
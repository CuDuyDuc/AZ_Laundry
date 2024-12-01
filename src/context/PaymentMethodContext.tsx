import React, { createContext, useState, useContext, ReactNode } from 'react';

interface PaymentMethodContextProps {
    selectedPaymentMethod: string;
    setSelectedPaymentMethod: (data:string) => void;
}

const PaymentMethodContext = createContext<PaymentMethodContextProps | undefined>(undefined);

// Provider
export const PaymentMethodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD');

    return (
        <PaymentMethodContext.Provider value={{selectedPaymentMethod, setSelectedPaymentMethod }}>
            {children}
        </PaymentMethodContext.Provider>
    );
};

export const usePaymentMethod = (): PaymentMethodContextProps => {
    const context = useContext(PaymentMethodContext);
    if (!context) {
        throw new Error("usePaymentMethod must be used within a PaymentMethodProvider");
    }
    return context;
};

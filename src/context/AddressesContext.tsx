import moment from 'moment';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AddressesContextProps {
    dataInfoUser: any;
    setDataInfoUser: (ob: any) => void;
    
}

const AddressesContext = createContext<AddressesContextProps | undefined>(undefined);

// Provider
export const AddressesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dataInfoUser, setDataInfoUser] = useState();

    return (
        <AddressesContext.Provider value={{ dataInfoUser, setDataInfoUser }}>
            {children}
        </AddressesContext.Provider>
    );
};

export const useAddresses = (): AddressesContextProps => {
    const context = useContext(AddressesContext);
    if (!context) {
        throw new Error("useAddresses must be used within a AddressesProvider");
    }
    return context;
};

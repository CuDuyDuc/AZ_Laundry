import moment from 'moment';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface DateTimeContextProps {
    receiveTime: Date;
    setReceiveTime: (date: Date) => void;
    sendTime: Date;
    setSendTime: (date: Date) => void;
    sendValue: Date;
    setSendValue: (date: Date) => void;
    receiveValue: Date;
    setReceiveValue: (date: Date) => void;
}

const DateTimeContext = createContext<DateTimeContextProps | undefined>(undefined);

// Provider
export const DateTimeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [receiveTime, setReceiveTime] = useState(new Date());
    const [sendTime, setSendTime] = useState(new Date());
    const [sendValue, setSendValue] = useState(moment().add(1, 'days').toDate()); 
    const [receiveValue, setReceiveValue] = useState(moment(sendValue).add(1, 'days').toDate(),);
    return (
        <DateTimeContext.Provider value={{ receiveTime, setReceiveTime,sendTime, setSendTime,sendValue, setSendValue,receiveValue, setReceiveValue }}>
            {children}
        </DateTimeContext.Provider>
    );
};

// Hook sử dụng context
export const useDateTime = (): DateTimeContextProps => {
    const context = useContext(DateTimeContext);
    if (!context) {
        throw new Error("useDateTime must be used within a DateTimeProvider");
    }
    return context;
};

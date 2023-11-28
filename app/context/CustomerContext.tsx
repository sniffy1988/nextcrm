import React, { createContext, useContext, useState, ReactNode } from "react";

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  country: string;
  city: string;
  state: string;
  postCode: string;
  street: string;
  streetNumber: string;
}

interface CustomerContextProps {
  selectedCustomer: Customer | null;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
}

const CustomerContext = createContext<CustomerContextProps | undefined>(
  undefined
);

export const CustomerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  return (
    <CustomerContext.Provider value={{ selectedCustomer, setSelectedCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error(
      "useCustomerContext must be used within a CustomerProvider"
    );
  }
  return context;
};

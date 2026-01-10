import { createContext, useContext, useState, useEffect } from "react";

const PayslipContext = createContext();

export const PayslipProvider = ({ children }) => {
  const [payslipData, setPayslipData] = useState(null);

  // Restore from localStorage on app load
  useEffect(() => {
    const storedPayslip = localStorage.getItem("payslipData");
    if (storedPayslip) {
      setPayslipData(JSON.parse(storedPayslip));
    }
  }, []);

  // Save to localStorage whenever payslip changes
  useEffect(() => {
    if (payslipData) {
      localStorage.setItem("payslipData", JSON.stringify(payslipData));
    }
  }, [payslipData]);

  return (
    <PayslipContext.Provider value={{ payslipData, setPayslipData }}>
      {children}
    </PayslipContext.Provider>
  );
};

export const usePayslip = () => useContext(PayslipContext);

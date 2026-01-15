import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePayslip } from "../context/PayslipContext";
import { numberToWords } from "../utils/numberToWords";
import logo from "../assets/VIS-LOGO.png";

const Generator = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { setPayslipData } = usePayslip();

  const [form, setForm] = useState({
    employeeName: "",
    employeeId: "",
    payPeriod: "",
    paidDays: "",
    lopDays: "",
    paymentDate: "",
    basic: "",
    incentive: "",
    tax: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const grossEarnings =
    Number(form.basic || 0) + Number(form.incentive || 0);
  const totalDeduction = Number(form.tax || 0);
  const netPay = grossEarnings - totalDeduction;

  const handleGenerate = () => {
    if (!form.employeeName || !form.employeeId || !form.payPeriod) {
      alert("Please fill required fields");
      return;
    }

    setPayslipData({
      ...form,
      grossEarnings,
      totalDeduction,
      netPay,
    });

    navigate("/payslip");
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="top-nav">
        <div className="nav-left">
          <h2>VETRI IT SYSTEMS</h2>
          <span>- Employee Payslip -</span>
        </div>

        <div className="nav-right">
          <span className="nav-link active">Generate Payslip</span>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {/* ================= PAGE ================= */}
      <div className="generator-bg">
        <h1 className="page-title">EMPLOYEE PAYSLIP GENERATOR</h1>

        <div className="generator-card">
          {/* COMPANY HEADER */}
          <div className="company-row">
            <div className="company-left">
              <img src={logo} alt="Vetri IT Systems Logo" />
              <div className="company-info">
                <h4>VETRI IT SYSTEMS PVT LTD.,</h4>
                <p>
                  Shanthi Complex, Second Floor,<br />
                  Surandai, Tenkasi - 627 859
                </p>
              </div>
            </div>

            {/* PAY PERIOD */}
            <div className="month-box">
              <span>Payslip for the Month</span>
              <input
                type="month"
                name="payPeriod"
                value={form.payPeriod}
                onChange={handleChange}
              />
            </div>
          </div>

          <hr className="light-hr" />

          {/* EMPLOYEE SUMMARY */}
          <h3 className="section-title">
            Employee Pay Summary<span className="required">*</span>
          </h3>

          <div className="pay-summary-grid">
            <div className="row">
              <span className="label">Employee Name</span>
              <span className="colon">:</span>
              <input
                type="text"
                name="employeeName"
                value={form.employeeName}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <span className="label">Paid Days</span>
              <span className="colon">:</span>
              <input
                type="number"
                min="0"
                max="31"
                name="paidDays"
                value={form.paidDays}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <span className="label">Employee ID</span>
              <span className="colon">:</span>
              <input
                type="text"
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <span className="label">Loss of Pay Days</span>
              <span className="colon">:</span>
              <input
                type="number"
                min="0"
                max="31"
                name="lopDays"
                value={form.lopDays}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <span className="label">Payment Date</span>
              <span className="colon">:</span>
              <input
                type="date"
                name="paymentDate"
                value={form.paymentDate}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* INCOME DETAILS */}
          <h3 className="section-title">Income Details</h3>

          <div className="income-grid">
            <div className="income-box">
              <h4>Earnings</h4>

              <div className="row">
                <span>Basic</span>
                <input
                  type="number"
                  name="basic"
                  value={form.basic}
                  onChange={handleChange}
                />
              </div>

              <div className="row">
                <span>Incentive</span>
                <input
                  type="number"
                  name="incentive"
                  value={form.incentive}
                  onChange={handleChange}
                />
              </div>

              <div className="total purple">
                Gross Earnings <b>₹ {grossEarnings}</b>
              </div>
            </div>

            <div className="income-box">
              <h4>Deductions</h4>

              <div className="row">
                <span>Income Tax</span>
                <input
                  type="number"
                  name="tax"
                  value={form.tax}
                  onChange={handleChange}
                />
              </div>

              <div className="total purple">
                Total Deduction <b>₹ {totalDeduction}</b>
              </div>
            </div>
          </div>

          {/* NET PAY */}
          <div className="netpay-box">
            <div>
              <h4>TOTAL NET PAYABLE</h4>
              <span>Gross Earnings − Total Deduction</span>
            </div>
            <div className="net-amount">₹ {netPay}</div>
          </div>

          {/* AMOUNT IN WORDS */}
          <p className="amount-words">
            Amount in words : {numberToWords(netPay)}
          </p>

          <hr className="light-hr" />

          <button className="generate-btn" onClick={handleGenerate}>
            Generate Payslip
          </button>
        </div>
      </div>
    </>
  );
};

export default Generator;

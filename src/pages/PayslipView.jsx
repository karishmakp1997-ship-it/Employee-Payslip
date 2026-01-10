import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePayslip } from "../context/PayslipContext";
import { useAuth } from "../context/AuthContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { numberToWords } from "../utils/numberToWords";
import logo from "../assets/VIS-LOGO.png";

const PayslipView = () => {
  const navigate = useNavigate();
  const { payslipData } = usePayslip();
  const { logout } = useAuth();
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!payslipData) navigate("/generator");
  }, [payslipData, navigate]);

  if (!payslipData) return null;

  const {
    employeeName,
    employeeId,
    payPeriod,
    paidDays,
    lopDays,
    paymentDate,
    basic,
    incentive,
    tax,
    grossEarnings,
    totalDeduction,
    netPay,
  } = payslipData;

  const handlePrint = () => window.print();

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);

    const element = document.querySelector(".payslip-card");
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Payslip_${employeeName}.pdf`);

    setDownloading(false);
  };

  return (
    <>
      {/* ================= TOP NAV ================= */}
      <header className="top-nav no-print">
        <div className="nav-left">
          <h2>VETRI IT SYSTEMS</h2>
          <span>-Employee Payslip-</span>
        </div>

        <div className="nav-right">
          <Link to="/generator" className="nav-link">
            Generate Payslip
          </Link>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

      </header>

      <div className="generator-bg">
        <h2 className="page-title">EMPLOYEE PAYSLIP</h2>

        {/* PRINT / DOWNLOAD */}
        <div className="action-row no-print">
          <button className="secondary" onClick={handlePrint}> <i className="bx bx-printer"></i>  Print</button>
          <button className="primary" onClick={handleDownload}>     <i className="bx bx-download"></i> 
            {downloading ? "Downloading..." : "  Download"}
          </button>
        </div>

        {/* ================= PAYSLIP CARD ================= */}
        <div className="payslip-card">

          {/* COMPANY HEADER */}
          <div className="company-row">
            <div className="company-left">
              <img src={logo} alt="Logo" />
              <h4>VETRI IT SYSTEMS PVT LTD.,</h4>
              <p>
                Shanthi complex, Second floor,<br />
                Surandai, Tenkasi - 627 859<br />
                India
              </p>
            </div>

            <div className="employee-statement">
              <h4 className="statement-title">Employee Statement</h4>

              <div className="statement-grid">
                <div className="row">
                  <span>Employee Name</span>
                  <span>:</span>
                  <span>{employeeName}</span>
                </div>

                <div className="row">
                  <span>Employee ID</span>
                  <span>:</span>
                  <span>{employeeId}</span>
                </div>

                <div className="row">
                  <span>Pay Period</span>
                  <span>:</span>
                  <span>{payPeriod}</span>
                </div>

                <div className="row">
                  <span>Paid Days</span>
                  <span>:</span>
                  <span>{paidDays}</span>
                </div>

                <div className="row">
                  <span>Loss of Pay Days</span>
                  <span>:</span>
                  <span>{lopDays}</span>
                </div>

                <div className="row">
                  <span>Payment Date</span>
                  <span>:</span>
                  <span>{paymentDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* EARNINGS / DEDUCTION */}
          <div className="income-grid">
            <div className="income-box">
              <h4>Earnings</h4>
              <div className="row"><span>Basic</span><span>₹ {basic}</span></div>
              <div className="row"><span>Incentive</span><span>₹ {incentive}</span></div>
              <div className="total purple">
                <span>Gross Earnings</span>
                <span>₹ {grossEarnings}</span>
              </div>
            </div>

            <div className="income-box">
              <h4>Deduction</h4>
              <div className="row"><span>Income Tax</span><span>₹ {tax}</span></div>
              <div className="total purple">
                <span>Total Deduction</span>
                <span>₹ {totalDeduction}</span>
              </div>
            </div>
          </div>

          {/* NET PAY */}
          <div className="netpay-box">
            <div>
              <h4>TOTAL NET PAYABLE</h4>
              <span>Gross Earnings - Total Deduction</span>
            </div>
            <div className="net-amount">₹ {netPay}</div>
          </div>

          <p className="amount-words">
            Amount in words : Indian Rupee {numberToWords(netPay)} Only
          </p> <hr />
          <div className="ack-wrapper">
            <h3 className="ack">ACKNOWLEDGED BY</h3>
          </div>


          {/* SIGNATURES */}
          <div className="signatures">
            <div>
              <div className="sign-line" />
              <p><b>{employeeName}</b></p>
              <small>Employee, VETRI IT SYSTEMS PVT LTD.,</small>
            </div>

            <div>
              <div className="sign-line" />
              <p><b>AUTHORISED NAME</b></p>
              <small>Managing Director, VETRI IT SYSTEMS PVT LTD.,</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayslipView;

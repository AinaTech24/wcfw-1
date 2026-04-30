import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaPercentage,
  FaTrophy,
  FaLightbulb,
  FaCalculator,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { Line, Doughnut } from "react-chartjs-2";
import SliderInput from "../../components/SliderInput";
import StickyResultBar from "../../components/StickyResultBar";
import ResultCard from "../../components/ResultCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [currency, setCurrency] = useState("INR");
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) setShowSticky(true);
      else setShowSticky(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currencySymbols = {
    INR: "₹",
    USD: "$",
    EUR: "€",
  };

  // Calculate EMI
  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure * 12;

    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalAmount = emi * months;
    const totalInterest = totalAmount - loanAmount;

    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: loanAmount,
      interestPercentage: ((totalInterest / totalAmount) * 100).toFixed(1),
    };
  };

  const results = calculateEMI();

  // Generate year-wise breakdown
  const generateYearWiseData = () => {
    const data = [];
    const monthlyRate = interestRate / 12 / 100;
    let balance = loanAmount;

    for (let year = 1; year <= loanTenure; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;

      for (let month = 1; month <= 12; month++) {
        const interest = balance * monthlyRate;
        const principal = results.emi - interest;

        yearlyPrincipal += principal;
        yearlyInterest += interest;
        balance -= principal;
      }

      data.push({
        year,
        principal: Math.round(yearlyPrincipal),
        interest: Math.round(yearlyInterest),
        balance: Math.round(Math.max(0, balance)),
      });
    }
    return data;
  };

  const yearWiseData = generateYearWiseData();

  // Chart Data
  const lineChartData = {
    labels: Array.from({ length: loanTenure + 1 }, (_, i) => `Year ${i}`),
    datasets: [
      {
        label: "Outstanding Exposure",
        data: [loanAmount, ...yearWiseData.map((d) => d.balance)],
        borderColor: "rgb(249, 115, 22)",
        backgroundColor: "rgba(249, 115, 22, 0.05)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgb(249, 115, 22)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        padding: 12,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        callbacks: {
          label: (context) =>
            `Balance: ${currencySymbols[currency]}${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        grid: { color: "rgba(0,0,0,0.05)" },
        ticks: {
          callback: (value) =>
            `${currencySymbols[currency]}${(value / 100000).toFixed(1)}L`,
          font: { size: 11, weight: "600" },
        },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 11, weight: "600" } },
      },
    },
  };

  const doughnutData = {
    labels: ["Principal Component", "Interest Obligation"],
    datasets: [
      {
        data: [results.principal, results.totalInterest],
        backgroundColor: ["#0f172a", "#f97316"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 4,
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="calculator-container bg-[#f8fafc]">
      {/* Cinematic Light Header */}
      <section
        className="relative min-h-[50vh] calculator-header-height lg:h-[55vh] flex items-center overflow-hidden pt-20 sm:pt-16"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #ffe5bd 0%, #fffdf7 35%, #c7f1ff 100%)",
        }}
      >
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10 w-full px-4 py-12 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 sm:py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center px-4 py-2 mb-8 space-x-3 border rounded-full bg-white/60 backdrop-blur-md border-white/40"
            >
              <FaCalculator className="text-orange-600 text-[10px] sm:text-xs" />
              <span className="text-orange-900 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                Liability Assessment
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-7xl font-black text-slate-900 leading-[1.1] mb-6 sm:mb-8 uppercase tracking-tighter">
              Loan <br />
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Optimizer.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-base font-medium leading-relaxed sm:text-xl text-slate-700">
              Deconstruct your debt structure with institutional-grade
              amortization modeling and interest optimization tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
<section className="relative z-20 py-12 -mt-10 sm:py-24">
  <div className="px-4 mx-auto max-w-7xl">
    {/* Main Wrapper */}
    <div className="bg-white border border-slate-100 shadow-xl rounded-[3rem] p-5 sm:p-8">
      {/* Header */}
      <div className="flex flex-col gap-5 mb-8 lg:flex-row lg:items-start lg:justify-between">
        <h2 className="text-2xl font-black text-slate-900">
          Loan Inputs
        </h2>

        {/* Currency */}
        <div>
          <p className="mb-3 text-[10px] font-black tracking-widest uppercase text-slate-400 lg:text-right">
            Currency
          </p>

          <div className="flex gap-2">
            {["INR", "USD", "EUR"].map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`w-12 h-12 rounded-2xl text-sm font-black transition-all ${
                  currency === curr
                    ? "bg-slate-900 text-white shadow-lg"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top Grid */}
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,auto)]">
        {/* Inputs */}
        <div className="grid min-w-0 gap-6 md:grid-cols-2">
          <SliderInput
            label="Loan Amount"
            value={loanAmount}
            min={100000}
            max={50000000}
            step={100000}
            onChange={setLoanAmount}
            prefix={currencySymbols[currency]}
          />

          <SliderInput
            label="Interest Rate (%)"
            value={interestRate}
            min={1}
            max={20}
            step={0.1}
            onChange={setInterestRate}
            suffix="%"
          />

          <SliderInput
            label="Loan Tenure"
            value={loanTenure}
            min={1}
            max={30}
            step={1}
            onChange={setLoanTenure}
            suffix=" Years"
          />
        </div>

        {/* Result Cards */}
        <div className="order-3 w-full max-w-full min-w-0 space-y-4 xl:order-2 xl:max-w-max">
          <ResultCard
            icon={FaHome}
            label="Loan Principal"
            value={`${currencySymbols[currency]}${(
              results.principal / 100000
            ).toFixed(1)}L`}
            subtext="Borrowed Capital"
          />

          <ResultCard
            icon={FaPercentage}
            label="Interest Cost"
            value={`${currencySymbols[currency]}${(
              results.totalInterest / 100000
            ).toFixed(1)}L`}
            subtext="Total Interest"
            color="text-orange-600"
          />

          <ResultCard
            icon={FaTrophy}
            label="Monthly EMI"
            value={`${currencySymbols[currency]}${(
              results.emi / 1000
            ).toFixed(1)}K`}
            subtext="Monthly Payment"
            featured
          />
        </div>
      </div>

      {/* Insight */}
      <div className="mt-8 bg-orange-50 rounded-[2rem] p-5 border border-orange-100">
        <div className="flex gap-3">
          <FaLightbulb className="mt-1 text-orange-500" />

          <p className="text-sm leading-relaxed text-slate-600">
            Lower tenure significantly reduces total interest outflow. Small
            prepayments can accelerate debt freedom.
          </p>
        </div>
      </div>
    </div>

    {/* Second Grid */}
    <div className="grid gap-8 mt-8 lg:grid-cols-12">
      {/* Yearly Table */}
      <div className="lg:col-span-8 bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 text-center text-white bg-slate-900">
          <h3 className="text-lg font-black tracking-widest uppercase">
            EMI Ledger
          </h3>
        </div>

        <div className="max-h-[620px] overflow-y-auto custom-scrollbar">
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-slate-50">
              <tr>
                <th className="px-8 py-4 text-left text-[10px] uppercase tracking-widest text-slate-400">
                  Year
                </th>

                <th className="px-8 py-4 text-right text-[10px] uppercase tracking-widest text-slate-400">
                  Principal
                </th>

                <th className="px-8 py-4 text-right text-[10px] uppercase tracking-widest text-slate-400">
                  Balance
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {yearWiseData.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50">
                  <td className="px-8 py-4 text-xs font-black text-slate-600">
                    Y{row.year}
                  </td>

                  <td className="px-8 py-4 text-xs font-bold text-right text-slate-600">
                    {currencySymbols[currency]}
                    {(row.principal / 100000).toFixed(2)}L
                  </td>

                  <td className="px-8 py-4 text-xs font-black text-right text-orange-600">
                    {currencySymbols[currency]}
                    {(row.balance / 100000).toFixed(2)}L
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Side */}
      <div className="space-y-8 lg:col-span-4">
        {/* Doughnut */}
        <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 p-8 text-center">
          <h3 className="mb-8 text-lg font-black tracking-tight uppercase text-slate-900">
            Payment Anatomy
          </h3>

          <div className="relative h-64">
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Interest Ratio
              </span>

              <span className="text-2xl font-black text-orange-600">
                {results.interestPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Strategy */}
        <div className="bg-slate-900 rounded-[3rem] shadow-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-600/20 blur-3xl"></div>

          <h4 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-8">
            Debt Strategy
          </h4>

          <div className="space-y-5">
            <BenefitItem text="Tenure Optimization" />
            <BenefitItem text="Interest Reduction" />
            <BenefitItem text="Cashflow Control" />
          </div>

          <Link
            to="/contact"
            className="flex items-center justify-center py-4 mt-10 text-xs font-black tracking-widest uppercase transition-all bg-orange-600 hover:bg-white hover:text-orange-600 rounded-2xl"
          >
            Speak to Advisor
            <FaArrowRight className="ml-3" />
          </Link>
        </div>
      </div>
    </div>

    {/* Bottom Chart */}
    <div className="mt-8 bg-white rounded-[3rem] shadow-xl border border-slate-100 p-6 sm:p-8">
      <h3 className="mb-8 text-xl font-black tracking-tight uppercase text-slate-900">
        Amortization Curve
      </h3>

      <div className="h-[380px] sm:h-[520px]">
        <Line data={lineChartData} options={lineChartOptions} />
      </div>
    </div>
  </div>
</section>
      <StickyResultBar
        label="Monthly EMI"
        value={(results.emi / 1000).toFixed(1) + "K"}
        subLabel="Loan Amount"
        subValue={(results.principal / 100000).toFixed(1) + "L"}
        currencySymbol={currencySymbols[currency]}
        isVisible={showSticky}
      />
    </div>
  );
};

const BenefitItem = ({ text }) => (
  <div className="flex items-center space-x-3">
    <FaCheckCircle className="text-sm text-orange-500" />
    <span className="text-xs font-black tracking-widest uppercase text-slate-300">
      {text}
    </span>
  </div>
);

export default EMICalculator;

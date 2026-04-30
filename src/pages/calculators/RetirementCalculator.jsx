import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUmbrella,
  FaUser,
  FaChartLine,
  FaTrophy,
  FaLightbulb,
  FaPiggyBank,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { Line, Doughnut } from "react-chartjs-2";
import SliderInput from "../../components/SliderInput";
import StickyResultBar from "../../components/StickyResultBar";
import ResultCard from "../../components/ResultCard";
import { useEffect } from "react";
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

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpense, setMonthlyExpense] = useState(50000);
  const [inflationRate, setInflationRate] = useState(6);
  const expectedReturn = 12;
  const [currentSavings, setCurrentSavings] = useState(500000);
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

  const currencySymbols = { INR: "₹", USD: "$", EUR: "€" };

  const calculateRetirement = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = 25; // Assuming 25 years post-retirement
    const futureMonthlyExpense =
      monthlyExpense * Math.pow(1 + inflationRate / 100, yearsToRetirement);
    const futureYearlyExpense = futureMonthlyExpense * 12;

    let corpusNeeded = 0;
    for (let i = 0; i < yearsInRetirement; i++) {
      const yearExpense =
        futureYearlyExpense * Math.pow(1 + inflationRate / 100, i);
      const presentValue = yearExpense / Math.pow(1 + expectedReturn / 100, i);
      corpusNeeded += presentValue;
    }

    const futureValueOfSavings =
      currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);
    const corpusGap = corpusNeeded - futureValueOfSavings;

    const monthlyRate = expectedReturn / 12 / 100;
    const months = yearsToRetirement * 12;
    const monthlySIP =
      corpusGap > 0
        ? (corpusGap * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1)
        : 0;

    return {
      corpusNeeded: Math.round(corpusNeeded),
      futureValueOfSavings: Math.round(futureValueOfSavings),
      corpusGap: Math.round(Math.max(0, corpusGap)),
      monthlySIP: Math.round(monthlySIP),
      futureMonthlyExpense: Math.round(futureMonthlyExpense),
      yearsToRetirement,
      totalInvestment: Math.round(monthlySIP * months),
    };
  };

  const results = calculateRetirement();

  const generateYearWiseData = () => {
    const data = [];
    const monthlyRate = expectedReturn / 12 / 100;
    let savingsValue = currentSavings;
    let sipValue = 0;

    for (let year = 1; year <= results.yearsToRetirement; year++) {
      savingsValue = savingsValue * (1 + expectedReturn / 100);
      const months = year * 12;
      sipValue =
        results.monthlySIP > 0
          ? results.monthlySIP *
            ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
            (1 + monthlyRate)
          : 0;
      const totalValue = savingsValue + sipValue;
      const invested = currentSavings + results.monthlySIP * months;
      const returns = totalValue - invested;

      data.push({
        year,
        invested: Math.round(invested),
        returns: Math.round(returns),
        value: Math.round(totalValue),
      });
    }
    return data;
  };

  const yearWiseData = generateYearWiseData();

  const lineChartData = {
    labels: Array.from(
      { length: results.yearsToRetirement + 1 },
      (_, i) => `Year ${i}`,
    ),
    datasets: [
      {
        label: "Corpus Accrual",
        data: [currentSavings, ...yearWiseData.map((d) => d.value)],
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
            `Corpus: ${currencySymbols[currency]}${(context.parsed.y / 10000000).toFixed(2)}Cr`,
        },
      },
    },
    scales: {
      y: {
        grid: { color: "rgba(0,0,0,0.05)" },
        ticks: {
          callback: (value) =>
            `${currencySymbols[currency]}${(value / 10000000).toFixed(1)}Cr`,
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
    labels: ["Legacy Assets", "Strategic Allocation", "Compound Growth"],
    datasets: [
      {
        data: [
          currentSavings,
          results.totalInvestment,
          results.corpusGap > 0
            ? results.corpusNeeded - currentSavings - results.totalInvestment
            : 0,
        ],
        backgroundColor: ["#0f172a", "#f97316", "#fbbf24"],
        borderColor: ["#fff", "#fff", "#fff"],
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
              <FaUmbrella className="text-orange-600 text-[10px] sm:text-xs" />
              <span className="text-orange-900 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                Legacy Architecture
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-7xl font-black text-slate-900 leading-[1.1] mb-6 sm:mb-8 uppercase tracking-tighter">
              Golden <br />
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Horizon.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-base font-medium leading-relaxed sm:text-xl text-slate-700">
              Engineer your independence with actuarial precision and clinical
              corpus modeling for a life of institutional freedom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative z-20 px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-24 sm:-mt-20">
        {/* Top Wrapper */}
        <div className="bg-white border border-slate-100 shadow-xl rounded-[3rem] p-5 sm:p-8">
          {/* Header */}
          <div className="flex flex-col gap-5 mb-8 lg:flex-row lg:items-start lg:justify-between">
            <h2 className="flex items-center text-2xl font-black text-slate-900">
              <FaUser className="mr-3 text-orange-500 shrink-0" />
              Investment Inputs
            </h2>

            <div className="w-full lg:w-auto">
              <p className="mb-3 text-[10px] font-black tracking-widest uppercase text-slate-400 lg:text-right">
                Currency
              </p>

              <div className="flex gap-2 lg:justify-end">
                {["INR", "USD", "EUR"].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`h-12 min-w-[48px] px-3 rounded-2xl text-sm font-black transition-all ${
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

          {/* Input and Result Grid */}
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.75fr)_320px] items-start">
            {/* Input Columns */}
            <div className="grid min-w-0 gap-6 sm:grid-cols-2">
              <SliderInput
                label="Current Age"
                value={currentAge}
                onChange={setCurrentAge}
                min={20}
                max={60}
                step={1}
              />

              <SliderInput
                label="Retirement Age"
                value={retirementAge}
                onChange={setRetirementAge}
                min={45}
                max={70}
                step={1}
              />

              <SliderInput
                label="Monthly Lifestyle Cost"
                value={monthlyExpense}
                onChange={setMonthlyExpense}
                min={10000}
                max={500000}
                step={5000}
                prefix={currencySymbols[currency]}
              />

              <SliderInput
                label="Inflation Hedge (%)"
                value={inflationRate}
                onChange={setInflationRate}
                min={3}
                max={15}
                step={0.5}
                suffix="%"
              />

              <div className="sm:col-span-2">
                <SliderInput
                  label="Current Liquidity"
                  value={currentSavings}
                  onChange={setCurrentSavings}
                  min={0}
                  max={10000000}
                  step={100000}
                  prefix={currencySymbols[currency]}
                />
              </div>
            </div>

            {/* Result Cards */}
            <div className="flex flex-col gap-4 w-full min-w-0 xl:w-[320px] xl:flex-shrink-0">
              <ResultCard
                className="w-full"
                icon={FaPiggyBank}
                label="Target Corpus"
                value={`${currencySymbols[currency]}${(
                  results.corpusNeeded / 10000000
                ).toFixed(2)}Cr`}
                subtext="Capital Requirement"
              />

              <ResultCard
                className="w-full"
                icon={FaChartLine}
                label="Growth Factor"
                value={`${currencySymbols[currency]}${(
                  (results.corpusNeeded -
                    currentSavings -
                    results.totalInvestment) /
                  10000000
                ).toFixed(2)}Cr`}
                subtext="Projected Appreciation"
                color="text-orange-600"
              />

              <ResultCard
                className="w-full"
                icon={FaTrophy}
                label="Servicing SIP"
                value={`${currencySymbols[currency]}${(
                  results.monthlySIP / 1000
                ).toFixed(1)}K`}
                subtext="Monthly Deployment"
                featured
              />
            </div>
          </div>

          {/* Insight */}
          <div className="mt-8 bg-orange-50 rounded-[2rem] p-5 border border-orange-100">
            <div className="flex gap-3">
              <FaLightbulb className="mt-1 text-orange-500 shrink-0" />
              <p className="text-sm leading-relaxed text-slate-600">
                Time is your strongest asset. Delaying retirement planning can
                sharply increase monthly investment requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Yearly Amortization */}
        <div className="grid gap-8 mt-8 lg:grid-cols-12">
          {/* Yearly Amortization Table */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-slate-100">
              <div className="px-8 py-6 text-center text-white bg-slate-900">
                <h3 className="text-xs font-black uppercase tracking-[0.3em]">
                  Yearly Amortization
                </h3>
              </div>

              <div className="h-[640px] overflow-y-auto custom-scrollbar">
                <table className="w-full text-left">
                  <thead className="sticky top-0 z-10 bg-slate-50">
                    <tr>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Year
                      </th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                        Target Value
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {yearWiseData.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-50">
                        <td className="px-8 py-4 text-xs font-black text-slate-700">
                          Y{row.year}
                        </td>

                        <td className="px-8 py-4 text-xs font-bold text-right text-orange-600">
                          {currencySymbols[currency]}
                          {(row.value / 10000000).toFixed(2)}Cr
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Capital Origin */}
          <div className="space-y-8 lg:col-span-4">
            {/* Doughnut Chart */}
            <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 p-8 text-center">
              <h3 className="mb-8 text-lg font-black tracking-tight uppercase text-slate-900">
                Capital Origin
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
                    Yield Contribution
                  </span>

                  <span className="text-2xl font-black text-orange-600">
                    {(
                      ((results.corpusNeeded -
                        currentSavings -
                        results.totalInvestment) /
                        results.corpusNeeded) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Security Protocol */}
            <div className="bg-slate-900 rounded-[3rem] shadow-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-600/20 blur-3xl"></div>

              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-8">
                Security Protocol
              </h4>

              <div className="space-y-5">
                <BenefitItem text="Inflation Hedged" />
                <BenefitItem text="Longevity Verified" />
                <BenefitItem text="Asset Rebalancing" />
              </div>

              <Link
                to="/contact"
                className="flex items-center justify-center py-4 mt-10 text-xs font-black tracking-widest uppercase transition-all bg-orange-600 hover:bg-white hover:text-orange-600 rounded-2xl"
              >
                Consult Architect
                <FaArrowRight className="ml-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Accrual Trajectory */}
        <div className="mt-8 bg-white rounded-[3rem] shadow-xl border border-slate-100 p-6 sm:p-8">
          <h3 className="mb-8 text-xl font-black tracking-tight uppercase text-slate-900">
            Accrual Trajectory
          </h3>

          <div className="h-[380px] sm:h-[520px]">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
      </div>
      <StickyResultBar
        label="Target Corpus"
        value={(results.corpusNeeded / 10000000).toFixed(2) + "Cr"}
        subLabel="Monthly SIP"
        subValue={results.monthlySIP.toLocaleString("en-IN")}
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

export default RetirementCalculator;

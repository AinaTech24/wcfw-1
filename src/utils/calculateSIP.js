// SIP calculation utility functions
export const calculateSIP = (monthlyAmount, annualRate, years) => {
  const monthlyRate = annualRate / (12 * 100);
  const totalMonths = years * 12;

  // Future Value of SIP formula: PMT * (((1 + r)^n - 1) / r) * (1 + r)
  const futureValue = monthlyAmount *
    (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));

  const totalInvestment = monthlyAmount * totalMonths;
  const wealthGained = futureValue - totalInvestment;

  // Generate chart data for visualization
  const chartData = generateChartData(monthlyAmount, annualRate, years);

  return {
    maturityAmount: Math.round(futureValue),
    totalInvestment: Math.round(totalInvestment),
    wealthGained: Math.round(wealthGained),
    chartData
  };
};

// Generate data for investment growth chart
const generateChartData = (monthlyAmount, annualRate, years) => {
  const data = {
    labels: [],
    datasets: [
      {
        label: 'Total Investment',
        data: [],
        borderColor: '#0A1A4F',
        backgroundColor: 'rgba(10, 26, 79, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Investment Value',
        data: [],
        borderColor: '#2ECC71',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const monthlyRate = annualRate / (12 * 100);

  for (let year = 1; year <= years; year++) {
    const months = year * 12;
    const totalInvested = monthlyAmount * months;

    // Calculate SIP value at this point
    const sipValue = monthlyAmount *
      (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

    data.labels.push(`Year ${year}`);
    data.datasets[0].data.push(totalInvested);
    data.datasets[1].data.push(Math.round(sipValue));
  }

  return data;
};

// Calculate compound annual growth rate (CAGR)
export const calculateCAGR = (initialValue, finalValue, years) => {
  const cagr = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
  return Math.round(cagr * 100) / 100;
};

// Calculate lump sum investment
export const calculateLumpSum = (principal, annualRate, years) => {
  const rate = annualRate / 100;
  const amount = principal * Math.pow(1 + rate, years);
  const gains = amount - principal;

  return {
    maturityAmount: Math.round(amount),
    totalInvestment: principal,
    wealthGained: Math.round(gains)
  };
};

// SIP vs Lump Sum comparison
export const compareSIPvsLumpSum = (monthlyAmount, lumpSum, annualRate, years) => {
  const sipResult = calculateSIP(monthlyAmount, annualRate, years);
  const lumpSumResult = calculateLumpSum(lumpSum, annualRate, years);

  return {
    sip: sipResult,
    lumpSum: lumpSumResult,
    difference: sipResult.maturityAmount - lumpSumResult.maturityAmount,
    betterOption: sipResult.maturityAmount > lumpSumResult.maturityAmount ? 'SIP' : 'Lump Sum'
  };
};

// Calculate required SIP for a target amount
export const calculateRequiredSIP = (targetAmount, annualRate, years) => {
  const monthlyRate = annualRate / (12 * 100);
  const totalMonths = years * 12;

  // PMT = FV / (((1 + r)^n - 1) / r) * (1 + r))
  const requiredSIP = targetAmount /
    (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));

  return Math.round(requiredSIP);
};

// Calculate how long it takes to reach a target with current SIP
export const calculateTimeToTarget = (monthlyAmount, targetAmount, annualRate) => {
  const monthlyRate = annualRate / (12 * 100);

  // Solve for n in SIP formula
  // This is an approximation using iterative method
  let months = 1;
  let currentValue = 0;

  while (currentValue < targetAmount && months <= 600) { // Max 50 years
    currentValue = monthlyAmount *
      (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    months++;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  return {
    totalMonths: months - 1,
    years,
    months: remainingMonths
  };
};

// Step-up SIP calculation
export const calculateStepUpSIP = (initialAmount, annualIncrease, annualRate, years) => {
  const monthlyRate = annualRate / (12 * 100);
  let totalValue = 0;
  let totalInvestment = 0;
  let currentMonthlyAmount = initialAmount;

  for (let year = 1; year <= years; year++) {
    // Calculate SIP value for this year
    for (let month = 1; month <= 12; month++) {
      const monthsRemaining = (years - year) * 12 + (12 - month);
      const futureValue = currentMonthlyAmount * Math.pow(1 + monthlyRate, monthsRemaining);
      totalValue += futureValue;
      totalInvestment += currentMonthlyAmount;
    }

    // Increase amount for next year
    currentMonthlyAmount = currentMonthlyAmount * (1 + annualIncrease / 100);
  }

  return {
    maturityAmount: Math.round(totalValue),
    totalInvestment: Math.round(totalInvestment),
    wealthGained: Math.round(totalValue - totalInvestment)
  };
};

// Tax calculation on SIP gains (LTCG)
export const calculateTaxOnSIPGains = (gains, holdingPeriod) => {
  // Long term capital gains (>1 year): 10% on gains above ₹1 lakh
  // Short term capital gains (≤1 year): 15%

  if (holdingPeriod > 1) {
    const exemptAmount = 100000; // ₹1 lakh exemption
    const taxableGains = gains > exemptAmount ? gains - exemptAmount : 0;
    const tax = taxableGains * 0.10; // 10% LTCG
    return {
      type: 'Long Term',
      taxableGains: Math.round(taxableGains),
      tax: Math.round(tax),
      netGains: Math.round(gains - tax)
    };
  } else {
    const tax = gains * 0.15; // 15% STCG
    return {
      type: 'Short Term',
      taxableGains: Math.round(gains),
      tax: Math.round(tax),
      netGains: Math.round(gains - tax)
    };
  }
};

// Inflation-adjusted returns
export const calculateInflationAdjustedReturns = (amount, inflationRate, years) => {
  const realValue = amount / Math.pow(1 + inflationRate / 100, years);
  return Math.round(realValue);
};

// Goal-based SIP solution
export const SolutionGoalBasedSIP = (goals) => {
  return goals.map(goal => {
    const { targetAmount, timeframe, priority } = goal;
    const assumedReturn = priority === 'high' ? 8 : priority === 'medium' ? 10 : 12;

    const requiredSIP = calculateRequiredSIP(targetAmount, assumedReturn, timeframe);
    const sipResult = calculateSIP(requiredSIP, assumedReturn, timeframe);

    return {
      ...goal,
      requiredSIP,
      expectedReturns: assumedReturn,
      projectedValue: sipResult.maturityAmount,
      totalInvestment: sipResult.totalInvestment
    };
  });
};

// Risk assessment based on SIP parameters
export const assessSIPRisk = (monthlyAmount, income, timeframe) => {
  const investmentRatio = (monthlyAmount * 12) / income;

  let riskLevel, recommendation;

  if (investmentRatio > 0.3) {
    riskLevel = 'High';
    recommendation = 'Consider reducing SIP amount to maintain emergency funds';
  } else if (investmentRatio > 0.2) {
    riskLevel = 'Moderate';
    recommendation = 'Good investment ratio, ensure you have adequate emergency funds';
  } else {
    riskLevel = 'Low';
    recommendation = timeframe > 10 ? 'Consider increasing SIP amount for better wealth creation' : 'Conservative approach suitable for short-term goals';
  }

  return {
    riskLevel,
    investmentRatio: Math.round(investmentRatio * 100),
    recommendation
  };
};

const sipUtils = {
  calculateSIP,
  calculateCAGR,
  calculateLumpSum,
  compareSIPvsLumpSum,
  calculateRequiredSIP,
  calculateTimeToTarget,
  calculateStepUpSIP,
  calculateTaxOnSIPGains,
  calculateInflationAdjustedReturns,
  SolutionGoalBasedSIP,
  assessSIPRisk
};

export default sipUtils;

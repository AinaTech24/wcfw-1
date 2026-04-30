import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const MarketTicker = () => {
    const [lastUpdate, setLastUpdate] = useState(null);
    const [tickerData, setTickerData] = useState([]);
    const [isLive, setIsLive] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    // ✅ Define fallback first so it's usable everywhere
    const fallbackData = useMemo(
        () => [
            { name: "NIFTY 50", symbol: "^NSEI", price: "23250.10", change: "-85.45", changePercent: "-0.37", isPositive: false },
            { name: "NIFTY BANK", symbol: "^NSEBANK", price: "50125.75", change: "+245.30", changePercent: "+0.49", isPositive: true },
            { name: "SENSEX", symbol: "^BSESN", price: "76850.80", change: "-125.45", changePercent: "-0.16", isPositive: false },
            { name: "RELIANCE", symbol: "RELIANCE.NS", price: "1285.50", change: "-8.25", changePercent: "-0.64", isPositive: false },
            { name: "TCS", symbol: "TCS.NS", price: "3950.25", change: "+18.50", changePercent: "+0.47", isPositive: true },
            { name: "INFOSYS", symbol: "INFY.NS", price: "1825.40", change: "+12.65", changePercent: "+0.70", isPositive: true },
            { name: "HDFC BANK", symbol: "HDFCBANK.NS", price: "1685.90", change: "-7.20", changePercent: "-0.43", isPositive: false },
            { name: "ICICI BANK", symbol: "ICICIBANK.NS", price: "1145.60", change: "+5.80", changePercent: "+0.51", isPositive: true },
            { name: "SBI", symbol: "SBIN.NS", price: "825.30", change: "+3.45", changePercent: "+0.42", isPositive: true },
            { name: "BAJAJ FINANCE", symbol: "BAJFINANCE.NS", price: "6850.75", change: "-25.50", changePercent: "-0.37", isPositive: false },
        ],
        []
    );

    // Market symbols configuration
    const symbols = useMemo(
        () => [
            { symbol: "^NSEI", name: "NIFTY 50", exchange: "NSE" },
            { symbol: "^NSEBANK", name: "NIFTY BANK", exchange: "NSE" },
            { symbol: "^BSESN", name: "SENSEX", exchange: "BSE" },
            { symbol: "RELIANCE.NS", name: "RELIANCE", exchange: "NSE" },
            { symbol: "TCS.NS", name: "TCS", exchange: "NSE" },
            { symbol: "INFY.NS", name: "INFOSYS", exchange: "NSE" },
            { symbol: "HDFCBANK.NS", name: "HDFC BANK", exchange: "NSE" },
            { symbol: "ICICIBANK.NS", name: "ICICI BANK", exchange: "NSE" },
            { symbol: "SBIN.NS", name: "SBI", exchange: "NSE" },
            { symbol: "BAJFINANCE.NS", name: "BAJAJ FINANCE", exchange: "NSE" },
        ],
        []
    );



    useEffect(() => {
        const fetchAllData = async () => {
            if (isSyncing) return;
            setIsSyncing(true);

            try {
                const results = await Promise.all(
                    symbols.map(async (sym) => {
                        try {
                            const targetUrl = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(sym.symbol)}`;
                            // Using a more stable proxy or direct if possible, but swallowing all errors
                            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}&t=${Date.now()}`);
                            if (!response.ok) return null;

                            const data = await response.json();
                            const quote = JSON.parse(data.contents)?.quoteResponse?.result?.[0];

                            if (!quote) return null;

                            const currentPrice = quote.regularMarketPrice ?? quote.currentPrice;
                            const previousClose = quote.regularMarketPreviousClose ?? quote.previousClose;

                            if (typeof currentPrice !== "number") return null;

                            const change = currentPrice - (previousClose || currentPrice);
                            const changePercent = previousClose ? (change / previousClose) * 100 : 0;

                            return {
                                name: sym.name,
                                symbol: sym.symbol,
                                price: currentPrice.toFixed(2),
                                change: change.toFixed(2),
                                changePercent: changePercent.toFixed(2),
                                isPositive: change >= 0,
                                exchange: sym.exchange
                            };
                        } catch (e) {
                            return null;
                        }
                    })
                );

                const valid = results.filter(Boolean);
                if (valid.length > 0) {
                    setTickerData(valid);
                    setLastUpdate(new Date());
                    setIsLive(true);
                }
            } catch (err) {
                // Silent fail
            } finally {
                setIsSyncing(false);
            }
        };

        // Initial fetch
        fetchAllData();

        // 30 minute interval as requested
        const interval = setInterval(fetchAllData, 1800000);

        return () => clearInterval(interval);
    }, [symbols, isSyncing]);

    const displayData = tickerData.length > 0 ? tickerData : fallbackData;

    return (
        <div className="w-full fixed top-0 left-0 right-0 bg-black overflow-hidden z-[150] h-[36px] sm:h-[40px]">
            <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-black to-transparent z-10" />

            <div className="relative overflow-hidden py-1.5 sm:py-2">
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: "-50%" }}
                    transition={{ repeat: Infinity, repeatType: "loop", duration: 45, ease: "linear" }}
                >
                    {[...displayData, ...displayData].map((item, index) => (
                        <div key={index} className="inline-flex items-center px-4 sm:px-6 border-r border-gray-700">
                            <span className="text-white font-semibold text-[10px] sm:text-sm mr-2 sm:mr-3">{item.name}</span>
                            <span className="text-white text-[10px] sm:text-sm mr-1.5 sm:mr-2">
                                {item.symbol?.includes('NSEI') || item.symbol?.includes('BSESN') || item.symbol?.includes('NSEBANK') ? '' : '₹'}
                                {Number(item.price).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                            </span>
                            <span className={`text-[10px] sm:text-sm font-medium ${item.isPositive ? "text-green-400" : "text-red-400"}`}>
                                {item.isPositive ? "▲" : "▼"} {Math.abs(Number(item.change)).toFixed(0)} ({Number(item.changePercent).toFixed(2)}%)
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="absolute top-2 sm:top-2.5 right-2 sm:right-4 flex items-center z-20">
                <div className="relative">
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse ${isLive ? "bg-green-500" : "bg-red-500"}`} />
                    <div className={`absolute inset-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-ping ${isLive ? "bg-green-500" : "bg-red-500"}`} />
                </div>
                <span className="ml-1.5 sm:ml-2 text-[8px] sm:text-xs text-gray-400 font-medium whitespace-nowrap">
                    {isLive ? "LIVE" : "DELAYED"}
                    {lastUpdate && (
                        <span className="ml-1 opacity-70 hidden xs:inline">
                            • {lastUpdate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                        </span>
                    )}
                </span>
            </div>
        </div>
    );
};

export default MarketTicker;

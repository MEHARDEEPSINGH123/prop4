"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { financingPrograms, FinancingProgramEnriched, formatNumber } from "@/data/dataset";
import {
  Calculator,
  DollarSign,
  Calendar,
  Percent,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react";

export default function FinancingStudio() {
  const [propertyPrice, setPropertyPrice] = useState(1250000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [selectedProgramId, setSelectedProgramId] = useState("FIN005"); // default 25Y
  const [interestRate, setInterestRate] = useState(2.65);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const activeProgram =
    financingPrograms.find((f) => f.id === selectedProgramId) || financingPrograms[0];

  const tenureYears = activeProgram.tenure_years;

  // Real-time calculations
  const downPaymentAmount = Math.round(propertyPrice * (downPaymentPercent / 100));
  const principalLoan = Math.max(0, propertyPrice - downPaymentAmount);

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = tenureYears * 12;

  const monthlyPayment = useMemo(() => {
    if (principalLoan <= 0 || monthlyRate <= 0) return 0;
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    return Math.round((principalLoan * (monthlyRate * factor)) / (factor - 1));
  }, [principalLoan, monthlyRate, totalMonths]);

  const totalRepayment = monthlyPayment * totalMonths;
  const totalInterest = Math.max(0, totalRepayment - principalLoan);

  // Generate 10-year amortization schedule
  const scheduleRows = useMemo(() => {
    const rows = [];
    let balance = principalLoan;
    for (let yr = 1; yr <= Math.min(10, tenureYears); yr++) {
      let annualInterest = 0;
      let annualPrincipal = 0;
      for (let m = 0; m < 12; m++) {
        const interestM = balance * monthlyRate;
        const principalM = monthlyPayment - interestM;
        annualInterest += interestM;
        annualPrincipal += principalM;
        balance = Math.max(0, balance - principalM);
      }
      rows.push({
        year: yr,
        principalPaid: Math.round(annualPrincipal),
        interestPaid: Math.round(annualInterest),
        remainingBalance: Math.round(balance),
      });
    }
    return rows;
  }, [principalLoan, monthlyRate, monthlyPayment, tenureYears]);

  return (
    <section
      id="financing"
      className="relative w-full min-h-screen bg-[#F7F4EF] text-primary py-24 px-6 sm:px-12 border-t border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-xs font-sans tracking-wide text-accent font-medium mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>Private Wealth Capital Facility</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-primary">
              Financing Studio
            </h2>
            <p className="font-editorial italic text-xl text-secondary mt-1">
              Interactive mortgage modeling powered by 25 bespoke financing programs
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-sans text-secondary">
              Active Plan: <strong className="text-primary font-semibold">{tenureYears} Years</strong> ({activeProgram.rateType})
            </span>
          </div>
        </div>

        {/* Master Financing Grid: Left Inputs, Right Dynamic Calculations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-card space-y-6">
            <div className="border-b border-border pb-4">
              <h3 className="font-heading text-xl font-bold text-primary">
                Capital Architecture Inputs
              </h3>
              <p className="text-xs text-secondary mt-0.5">
                Adjust sliders or enter specific valuations to model your personalized financing structure
              </p>
            </div>

            {/* Input 1: Property Price */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-mono uppercase text-secondary">Property Price</label>
                <span className="font-heading text-lg font-bold text-primary">
                  SGD ${formatNumber(propertyPrice)}
                </span>
              </div>
              <input
                type="range"
                min={800000}
                max={3000000}
                step={25000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                data-interactive
                className="w-full accent-accent cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-muted">
                <span>SGD $800K</span>
                <span>SGD $1.9M</span>
                <span>SGD $3.0M</span>
              </div>
            </div>

            {/* Input 2: Down Payment (%) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-mono uppercase text-secondary">Down Payment</label>
                <div className="text-right">
                  <span className="font-heading text-lg font-bold text-accent">
                    {downPaymentPercent}%
                  </span>
                  <span className="text-xs text-secondary ml-2">
                    (SGD ${formatNumber(downPaymentAmount)})
                  </span>
                </div>
              </div>
              <input
                type="range"
                min={15}
                max={50}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                data-interactive
                className="w-full accent-accent cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-muted">
                <span>15% (Min ESG)</span>
                <span>25% (Standard)</span>
                <span>50% (Private Wealth)</span>
              </div>
            </div>

            {/* Input 3: Loan Period & Program Selector (from 25 Financing Programs) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-mono uppercase text-secondary">
                  Loan Tenure & Program (25 Dataset Programs)
                </label>
                <span className="font-heading text-lg font-bold text-primary">
                  {tenureYears} Years ({tenureYears * 12} Months)
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {financingPrograms.slice(0, 6).map((prog) => {
                  const isSelected = prog.id === selectedProgramId;
                  return (
                    <button
                      key={prog.id}
                      onClick={() => {
                        setSelectedProgramId(prog.id);
                        setInterestRate(prog.baseRate);
                      }}
                      data-interactive
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-[#FAF8F5] hover:bg-stone-100 text-secondary border-border"
                      }`}
                    >
                      <span className="text-[10px] font-sans text-accent block font-medium">
                        {prog.rateType.split(" ")[0]} Facility
                      </span>
                      <span className="font-heading text-sm font-bold block">{prog.tenure_years} Years</span>
                      <span className="text-[10px] block opacity-75">{prog.baseRate}% Fixed</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input 4: Interest Rate (%) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-mono uppercase text-secondary">Interest Rate</label>
                <span className="font-heading text-lg font-bold text-primary">
                  {interestRate.toFixed(2)}% p.a.
                </span>
              </div>
              <input
                type="range"
                min={2.0}
                max={4.8}
                step={0.05}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                data-interactive
                className="w-full accent-accent cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-muted">
                <span>2.00% (Subsidized ESG)</span>
                <span>2.65% (Prime)</span>
                <span>4.80% (Stress Test)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Dynamic Calculations & Breakdown */}
          <div className="lg:col-span-5 bg-primary text-parchment rounded-3xl p-6 sm:p-8 border border-white/10 shadow-luxury space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-mono text-accent uppercase tracking-widest block">
                Executive Output
              </span>
              <h3 className="font-heading text-2xl font-bold text-white mt-1">
                Estimated Capital Commitment
              </h3>
            </div>

            {/* Highlighted Monthly Payment */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-stone-400 font-mono uppercase block">
                Estimated Monthly Installment
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  SGD ${formatNumber(monthlyPayment)}
                </span>
                <span className="text-xs text-stone-400 font-mono">/ month</span>
              </div>
              <span className="text-[11px] text-stone-400 block mt-2">
                Based on {activeProgram.rateType} structure over {tenureYears} years
              </span>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-stone-400 font-mono uppercase block text-[10px]">
                  Loan Principal
                </span>
                <span className="font-heading text-xl font-bold text-white mt-1 block">
                  SGD ${formatNumber(principalLoan)}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-stone-400 font-mono uppercase block text-[10px]">
                  Total Interest Paid
                </span>
                <span className="font-heading text-xl font-bold text-accent mt-1 block">
                  SGD ${formatNumber(totalInterest)}
                </span>
              </div>
            </div>

            {/* Principal vs Interest Proportional Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-[11px] font-mono text-stone-300">
                <span>Principal: {Math.round((principalLoan / totalRepayment) * 100)}%</span>
                <span>Interest: {Math.round((totalInterest / totalRepayment) * 100)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden flex">
                <div
                  className="bg-white h-full"
                  style={{ width: `${(principalLoan / totalRepayment) * 100}%` }}
                />
                <div
                  className="bg-accent h-full"
                  style={{ width: `${(totalInterest / totalRepayment) * 100}%` }}
                />
              </div>
            </div>

            {/* Payment Schedule Button & Modal Trigger */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => setScheduleModalOpen(true)}
                data-interactive
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-semibold tracking-wide border border-white/15 transition-all"
              >
                <FileSpreadsheet className="w-4 h-4 text-accent" />
                <span>View 10-Year Amortization Schedule</span>
              </button>

              <a
                href="#book-tour"
                data-interactive
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-semibold tracking-wide transition-all shadow-luxury"
              >
                <span>Request Bespoke Wealth Financing</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 25 Financing Programs Selector Strip */}
        <div className="bg-white rounded-3xl p-6 border border-border shadow-card">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-sans uppercase tracking-widest text-secondary font-medium">
              Available Amortization Facilities (25 Master Programs)
            </span>
            <span className="text-xs font-sans text-accent">
              Selected: {tenureYears}-Year Facility
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
            {financingPrograms.map((prog) => {
              const isSelected = prog.id === selectedProgramId;
              return (
                <button
                  key={prog.id}
                  onClick={() => {
                    setSelectedProgramId(prog.id);
                    setInterestRate(prog.baseRate);
                  }}
                  data-interactive
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-sans transition-all ${
                    isSelected
                      ? "bg-accent text-white font-bold shadow-md"
                      : "bg-[#FAF8F5] hover:bg-stone-100 text-secondary border border-border"
                  }`}
                >
                  {prog.tenure_years}-Year Plan
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Payment Schedule Modal */}
      <AnimatePresence>
        {scheduleModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
            onClick={() => setScheduleModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-stone-900 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-stone-200 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-xs font-mono text-accent uppercase tracking-widest">
                    Amortization Ledger
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-white">
                    10-Year Payment Trajectory
                  </h3>
                </div>
                <button
                  onClick={() => setScheduleModalOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-stone-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono text-left">
                  <thead>
                    <tr className="border-b border-white/15 text-stone-400 uppercase text-[11px]">
                      <th className="py-2.5">Year</th>
                      <th className="py-2.5">Principal Paid</th>
                      <th className="py-2.5">Interest Paid</th>
                      <th className="py-2.5 text-right">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {scheduleRows.map((row) => (
                      <tr key={row.year} className="hover:bg-white/5">
                        <td className="py-3 font-semibold text-white">Year {row.year}</td>
                        <td className="py-3 text-emerald-400">
                          SGD ${formatNumber(row.principalPaid)}
                        </td>
                        <td className="py-3 text-accent">
                          SGD ${formatNumber(row.interestPaid)}
                        </td>
                        <td className="py-3 text-right font-bold text-white">
                          SGD ${formatNumber(row.remainingBalance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-6 border-t border-white/10 mt-6">
                <button
                  onClick={() => setScheduleModalOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-accent hover:bg-accent-hover text-white text-xs font-semibold"
                >
                  Close Schedule
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

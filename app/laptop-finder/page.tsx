"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const steps = ["Budget", "Usage", "Screen size", "Results"];
const budgets = ["Up to 40,000৳", "Up to 50,000৳", "Up to 60,000৳", "Up to 80,000৳", "Up to 100,000৳", "Up to 150,000৳", "Above 150,000৳"];
const usages = ["Study & everyday use", "Office & business", "Programming", "Graphics & design", "Gaming"];
const screenSizes = ["Compact — up to 14 inch", "Balanced — 15.6 inch", "Large — 16 inch and above", "No preference"];

export default function LaptopFinderPage() {
  const [step, setStep] = useState(0);
  const [budget, setBudget] = useState("");
  const [usage, setUsage] = useState("");
  const [screenSize, setScreenSize] = useState("");

  const choices = [budget, usage, screenSize];
  const options = [budgets, usages, screenSizes][step] ?? [];
  const currentChoice = choices[step] ?? "";
  const results = useMemo(() => 18 + [budget, usage, screenSize].filter(Boolean).length * 24, [budget, usage, screenSize]);

  const selectOption = (option: string) => {
    if (step === 0) setBudget(option);
    if (step === 1) setUsage(option);
    if (step === 2) setScreenSize(option);
  };

  const nextStep = () => {
    if (step < steps.length - 1 && currentChoice) setStep((current) => current + 1);
  };

  return (
    <>
      <Header breadcrumbs={[{ label: "Home", href: "/" }, { label: "Laptop Finder" }]} />
      <main className="laptop-finder-page">
        <section className="laptop-finder" aria-labelledby="laptop-finder-title">
          <span className="laptop-finder__eyebrow">Nexora Tech Assistant</span>
          <h1 id="laptop-finder-title">Find your ideal laptop</h1>
          <p className="laptop-finder__intro">Answer a few quick questions and we’ll guide you to laptops that fit your needs.</p>

          <ol className="laptop-finder__steps" aria-label="Laptop finder progress">
            {steps.map((label, index) => (
              <li className={index <= step ? "is-active" : ""} key={label}>
                <span>{index + 1}</span>{label}
              </li>
            ))}
          </ol>

          {step < 3 ? (
            <div className="laptop-finder__question">
              <h2>What’s your <em>{steps[step].toLowerCase()}</em>?</h2>
              <div className="laptop-finder__options">
                {options.map((option) => (
                  <button className={currentChoice === option ? "is-selected" : ""} key={option} onClick={() => selectOption(option)} type="button">
                    <span className="laptop-finder__radio" aria-hidden="true" />
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="laptop-finder__result">
              <span className="laptop-finder__result-icon" aria-hidden="true">✓</span>
              <h2>Your laptop matches are ready</h2>
              <p>We found <strong>{results} laptops</strong> based on your budget, usage, and preferred screen size.</p>
              <dl>
                <div><dt>Budget</dt><dd>{budget}</dd></div>
                <div><dt>Usage</dt><dd>{usage}</dd></div>
                <div><dt>Screen</dt><dd>{screenSize}</dd></div>
              </dl>
              <Link href="/category/laptop" className="laptop-finder__show-results">Show matched laptops ({results})</Link>
            </div>
          )}

          <div className="laptop-finder__actions">
            <button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}>← Previous</button>
            {step < 3 ? <button type="button" className="laptop-finder__next" onClick={nextStep} disabled={!currentChoice}>Next →</button> : <button type="button" className="laptop-finder__next" onClick={() => setStep(0)}>Start again</button>}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

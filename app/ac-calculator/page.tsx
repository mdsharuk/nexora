"use client";

import { useState } from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const questions = [
  { key: "size", label: "What’s your room size?", bangla: "আপনার রুমের সাইজ কত?", options: ["100–143 sq ft", "144–180 sq ft", "181–225 sq ft", "226–300 sq ft"], values: [1, 1.5, 2, 2.5] },
  { key: "floor", label: "Room position in the building?", bangla: "বিল্ডিংয়ে রুমের অবস্থান কোথায়?", options: ["Top floor", "Other floor"], values: [0.25, 0] },
  { key: "sunlight", label: "Exposure to sunlight?", bangla: "রুমে সূর্যের আলোর পরিমাণ কেমন?", options: ["Low", "Medium", "High"], values: [0, 0.15, 0.3] },
  { key: "wall", label: "Room wall type?", bangla: "রুমের দেয়ালের ধরন?", options: ["Facebrick", "Single layer glass", "Double layer glass"], values: [0, 0.15, 0.25] },
  { key: "windows", label: "Windows & doors?", bangla: "রুমে জানালা ও দরজার সংখ্যা?", options: ["1 door, no window", "1 door, 1 window", "1 door, 2 windows", "2 doors, 2 windows"], values: [0, 0.1, 0.2, 0.3] },
  { key: "occupants", label: "Number of occupants?", bangla: "রুমে থাকা মানুষের সংখ্যা কত?", options: ["1", "2", "3", "4+"], values: [0, 0.05, 0.1, 0.15] },
] as const;

type ChoiceState = Record<string, number>;

export default function AcCalculatorPage() {
  const [choices, setChoices] = useState<ChoiceState>({ size: 1, floor: 1, sunlight: 1, wall: 0, windows: 1, occupants: 1 });
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const total = questions.reduce((sum, question) => sum + question.values[choices[question.key]], 0);
    setResult(total <= 1.25 ? 1 : total <= 1.75 ? 1.5 : total <= 2.25 ? 2 : 2.5);
  };

  return (
    <>
      <Header breadcrumbs={[{ label: "Home", href: "/" }, { label: "AC Ton Calculator" }]} />
      <main className="ac-calculator-page">
        <section className="ac-calculator" aria-labelledby="ac-calculator-title">
          <header>
            <span>Smart Cooling Guide</span>
            <h1 id="ac-calculator-title">AC Ton Calculator</h1>
            <p>Calculate BTU and find the right AC capacity for your room.</p>
          </header>

          <div className="ac-calculator__questions">
            {questions.map((question) => (
              <fieldset key={question.key}>
                <legend>{question.label} <small>({question.bangla})</small></legend>
                <div className={`ac-calculator__options ac-calculator__options--${question.options.length}`}>
                  {question.options.map((option, index) => (
                    <button
                      className={choices[question.key] === index ? "is-selected" : ""}
                      key={option}
                      type="button"
                      onClick={() => setChoices((current) => ({ ...current, [question.key]: index }))}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <button type="button" className="ac-calculator__calculate" onClick={calculate}>Calculate recommended capacity</button>
          {result && <div className="ac-calculator__result" role="status"><strong>{result} Ton AC</strong><span>is recommended for your selected room conditions.</span></div>}
        </section>
      </main>
      <Footer />
    </>
  );
}

"use client";

import { FormEvent, useState } from "react";

export default function ComplaintPage() {
  const [submitted, setSubmitted] = useState(false);

  const submitComplaint = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="complaint-page">
      <section className="complaint-card" aria-labelledby="complaint-title">
        <header className="complaint-card__header">
          <span className="complaint-card__mark">N</span>
          <h1 id="complaint-title">Complaint &amp; Feedback</h1>
          <p>Please fill out the following form with details.<br />We will review your request and follow up with you as soon as possible.</p>
        </header>

        {submitted ? (
          <div className="complaint-success" role="status">
            <span>✓</span>
            <h2>Thank you for your feedback</h2>
            <p>Your request has been received. Our support team will contact you soon.</p>
            <button type="button" onClick={() => setSubmitted(false)}>Submit another request</button>
          </div>
        ) : (
          <form className="complaint-form" onSubmit={submitComplaint}>
            <div className="complaint-form__split">
              <label>Full Name<span>*</span><input name="name" placeholder="Type your full name" required /></label>
              <label>Phone No.<span>*</span><input name="phone" type="tel" placeholder="Type your mobile number" required /></label>
            </div>
            <label>Email Address<input name="email" type="email" placeholder="Type your email address" /></label>
            <label>Subject<span>*</span><input name="subject" placeholder="Type your problem subject" required /></label>
            <label>Details<span>*</span><textarea name="details" placeholder="Write your problem in details" rows={5} required /></label>
            <button className="complaint-form__submit" type="submit">Submit Your Request</button>
          </form>
        )}

        <footer className="complaint-card__footer">
          <strong>Nexora<span>Tech</span></strong>
          <small>© {new Date().getFullYear()} Nexora Tech. All rights reserved.</small>
        </footer>
      </section>
    </main>
  );
}

"use client";

import { SITE } from "@/lib/site";
import { useAnalytics } from "@/components/Analytics";
import { useState } from "react";

export default function ContactPage(){
  const { trackContact } = useAnalytics();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackContact('form');
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your message! I\'ll get back to you soon.');
    }, 1000);
  };

  return (
    <section className="py-10">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="text-neutral-600 dark:text-neutral-300 mt-2">
        For work, collabs, or speaking: <a className="link" href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
      <form className="card p-6 mt-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">Name
            <input 
              className="rounded-xl bg-neutral-100 dark:bg-neutral-800 px-3 py-2 border border-neutral-200 dark:border-neutral-700" 
              name="name" 
              required
            />
          </label>
          <label className="grid gap-2">Email
            <input 
              type="email" 
              className="rounded-xl bg-neutral-100 dark:bg-neutral-800 px-3 py-2 border border-neutral-200 dark:border-neutral-700" 
              name="email" 
              required
            />
          </label>
        </div>
        <label className="grid gap-2 mt-4">Message
          <textarea 
            className="rounded-xl bg-neutral-100 dark:bg-neutral-800 px-3 py-2 min-h-32 border border-neutral-200 dark:border-neutral-700" 
            name="message" 
            required
          />
        </label>
        <button 
          className="btn mt-4" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    </section>
  );
}

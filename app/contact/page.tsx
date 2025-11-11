"use client";

import { SITE } from "@/lib/site";
import { useAnalytics } from "@/components/Analytics";
import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'success' | 'error';
  message: string;
}

export default function ContactPage(){
  const { trackContact } = useAnalytics();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });
    
    try {
      trackContact('form');
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: 'Thank you for your message! I\'ll get back to you soon.' 
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ 
          type: 'error', 
          message: result.error || 'Failed to send message. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Get In <span className="text-brand">Touch</span>
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? I'd love to hear from you. 
          Send me a message and I'll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-brand" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Email</h3>
                  <a 
                    href={`mailto:${SITE.email}`}
                    className="text-neutral-600 dark:text-neutral-300 hover:text-brand transition-colors"
                  >
                    {SITE.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-brand" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Phone</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">Available upon request</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-brand" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Location</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">Remote • Global</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6 bg-gradient-to-r from-brand/10 to-brand-light/10 border-brand/20">
            <h3 className="text-lg font-semibold mb-3 text-brand">Response Time</h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm">
              I typically respond to messages within 24 hours. For urgent matters, 
              please mention it in your message and I'll prioritize your request.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
          
          {/* Status Messages */}
          {status.type === 'success' && (
            <div 
              className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3"
              role="alert"
              aria-live="polite"
            >
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" aria-hidden="true" />
              <p className="text-green-800 dark:text-green-200">{status.message}</p>
            </div>
          )}

          {status.type === 'error' && (
            <div 
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3"
              role="alert"
              aria-live="assertive"
            >
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" aria-hidden="true" />
              <p className="text-red-800 dark:text-red-200">{status.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-800 px-4 py-3 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  autoComplete="email"
                  className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-800 px-4 py-3 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                aria-required="true"
                rows={6}
                className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-800 px-4 py-3 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors resize-none focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
                placeholder="Tell me about your project, collaboration idea, or just say hello..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
              className="w-full btn hover-glow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

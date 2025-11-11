"use client";

import { useState, useEffect } from 'react';

interface ClientDateProps {
  date?: Date | number | string;
  format?: 'date' | 'datetime' | 'time';
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
  fallback?: string;
}

/**
 * Client-side date formatting component to avoid hydration mismatches
 * Only formats dates on the client side after hydration
 */
export default function ClientDate({ 
  date, 
  format = 'date',
  locale = 'en-US',
  options,
  fallback = ''
}: ClientDateProps) {
  const [formattedDate, setFormattedDate] = useState<string>(fallback);

  useEffect(() => {
    // Only format on client side to avoid hydration mismatch
    if (typeof window === 'undefined') {
      return;
    }

    if (!date) {
      setFormattedDate(fallback);
      return;
    }

    const dateObj = typeof date === 'string' || typeof date === 'number' 
      ? new Date(date) 
      : date;

    const defaultOptions: Intl.DateTimeFormatOptions = 
      format === 'datetime' 
        ? { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
        : format === 'time'
        ? { hour: '2-digit', minute: '2-digit' }
        : { year: 'numeric', month: 'long', day: 'numeric' };

    const formatOptions = options || defaultOptions;
    setFormattedDate(dateObj.toLocaleDateString(locale, formatOptions));
  }, [date, format, locale, options, fallback]);

  return <>{formattedDate}</>;
}


"use client";

/**
 * SkipLink Component
 * 
 * Provides keyboard navigation skip link for accessibility.
 * Allows users to skip to main content.
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
}


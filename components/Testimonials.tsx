"use client";
import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  project: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  maxItems?: number;
  showAll?: boolean;
}

export default function Testimonials({ testimonials, maxItems = 3, showAll = false }: TestimonialsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const displayTestimonials = showAll ? testimonials : testimonials.slice(0, maxItems);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  if (displayTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">
          What People <span className="text-brand">Say</span>
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Feedback from colleagues, clients, and collaborators who have worked with me.
        </p>
      </div>

      {showAll ? (
        // Grid layout for all testimonials
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      ) : (
        // Carousel layout for limited testimonials
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {displayTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard testimonial={testimonial} featured />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          {displayTestimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="badge p-2 hover:bg-brand/10 hover:text-brand transition-colors focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
                aria-label="Previous testimonial"
                type="button"
              >
                ←
              </button>
              <div className="flex gap-2">
                {displayTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-brand' : 'bg-neutral-300 dark:bg-neutral-600'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="badge p-2 hover:bg-brand/10 hover:text-brand transition-colors focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
                aria-label="Next testimonial"
                type="button"
              >
                →
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function TestimonialCard({ testimonial, featured = false }: { testimonial: Testimonial; featured?: boolean }) {
  return (
    <article className={`card p-6 hover-glow hover-scale group ${featured ? 'text-center' : ''}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0">
          <Image
            src={testimonial.avatar}
            alt={`${testimonial.name}'s avatar`}
            width={48}
            height={48}
            loading="lazy"
            className="rounded-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
            {testimonial.name}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {testimonial.role} at {testimonial.company}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
        <Quote className="h-6 w-6 text-brand/20 flex-shrink-0" />
      </div>

      <blockquote className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
        "{testimonial.content}"
      </blockquote>

      <div className="text-sm text-neutral-500 dark:text-neutral-400">
        <span className="font-medium">Project:</span> {testimonial.project}
      </div>
    </article>
  );
}

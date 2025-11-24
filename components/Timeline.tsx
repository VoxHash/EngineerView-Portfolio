"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, MapPin, Award, Code, Briefcase, GraduationCap } from "lucide-react";
import { timelineData, type TimelineItem } from "@/data/timeline";

const getIcon = (type: TimelineItem['type']) => {
  switch (type) {
    case 'work':
      return <Briefcase className="h-5 w-5" />;
    case 'education':
      return <GraduationCap className="h-5 w-5" />;
    case 'achievement':
      return <Award className="h-5 w-5" />;
    case 'project':
      return <Code className="h-5 w-5" />;
    default:
      return <Calendar className="h-5 w-5" />;
  }
};

const getTypeColor = (type: TimelineItem['type']) => {
  switch (type) {
    case 'work':
      return 'bg-blue-500';
    case 'education':
      return 'bg-green-500';
    case 'achievement':
      return 'bg-yellow-500';
    case 'project':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};

export default function Timeline() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div ref={ref} className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand via-brand/50 to-transparent" />
      
      <div className="space-y-12">
        {timelineData.map((item, index) => (
          <motion.div
            key={item.id}
            className="relative flex items-start gap-6"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            {/* Timeline dot */}
            <div className="relative z-10 flex-shrink-0">
              <div className={`w-16 h-16 rounded-full ${getTypeColor(item.type)} flex items-center justify-center text-white shadow-lg`}>
                {getIcon(item.type)}
              </div>
            </div>

            {/* Content */}
            <motion.div 
              className="flex-1 card p-6 hover-glow"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <h3 className="text-xl font-semibold text-brand">{item.title}</h3>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {item.date}
                </span>
              </div>
              
              {item.company && (
                <div className="flex items-center gap-4 mb-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="font-medium">{item.company}</span>
                  {item.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {item.location}
                    </span>
                  )}
                </div>
              )}
              
              <p className="text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed">
                {item.description}
              </p>
              
              {item.skills && (
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="badge bg-brand/20 text-brand border-brand/30 backdrop-blur-md text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

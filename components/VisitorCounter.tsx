"use client";
import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

interface VisitorStats {
  visitors: number;
  pageviews: number;
}

export default function VisitorCounter() {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, you would fetch this from Plausible API
    // For now, we'll simulate with localStorage for demo purposes
    const fetchStats = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get stored stats or use defaults
        const storedStats = localStorage.getItem('visitor-stats');
        if (storedStats) {
          setStats(JSON.parse(storedStats));
        } else {
          // Default stats for demo
          const defaultStats = {
            visitors: Math.floor(Math.random() * 1000) + 500,
            pageviews: Math.floor(Math.random() * 2000) + 1000
          };
          setStats(defaultStats);
          localStorage.setItem('visitor-stats', JSON.stringify(defaultStats));
        }
      } catch (error) {
        console.error('Error fetching visitor stats:', error);
        setStats({ visitors: 0, pageviews: 0 });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
        <Eye className="h-4 w-4 animate-pulse" />
        <span>Loading stats...</span>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
      <Eye className="h-4 w-4" />
      <span>
        {stats.visitors.toLocaleString()} visitors
      </span>
    </div>
  );
}

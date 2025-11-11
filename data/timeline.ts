export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  company?: string;
  location?: string;
  description: string;
  type: 'work' | 'education' | 'achievement' | 'project';
  skills?: string[];
}

export const timelineData: TimelineItem[] = [
  {
    id: '1',
    date: '2018 - Present',
    title: 'CEO',
    company: 'VoxHash Technologies',
    location: 'Remote',
    description: 'Leading technical strategy and architecture for scalable web applications and AI-powered products. Designing end-to-end systems from infrastructure to user experience. Mentoring engineering teams and establishing technical best practices. Driving innovation in AI integration and modern web technologies.',
    type: 'work',
    skills: ['Next.js', 'TypeScript', 'Python', 'AWS', 'AI/ML']
  },
  {
    id: '2',
    date: '2024 - Present',
    title: 'Co-Founder & CTO',
    company: 'LicenseChain',
    location: 'Remote',
    description: 'Architected and developed blockchain-based licensing platform with smart contract infrastructure. Built decentralized applications for intellectual property management. Led technical team in Web3 development, implementing secure smart contracts and scalable blockchain solutions.',
    type: 'work',
    skills: ['Blockchain', 'Smart Contracts', 'Web3', 'Solidity', 'React', 'Node.js']
  },
  {
    id: '3',
    date: '2022 - Present',
    title: 'Senior Software Consultant',
    company: 'Olyren Consulting',
    location: 'Remote',
    description: 'Delivered technical consulting to enterprise clients, designing and implementing custom software solutions. Optimized system performance and scalability for high-traffic applications. Led cross-functional technical teams and established architecture patterns for distributed systems.',
    type: 'work',
    skills: ['Consulting', 'Enterprise Solutions', 'System Architecture', 'Performance Optimization', 'Team Leadership']
  },
  {
    id: '4',
    date: '2018 - Present',
    title: 'Co-Founder & Game Developer',
    company: 'Glytherra Studio',
    location: 'Remote',
    description: 'Developed game engines and interactive experiences with focus on real-time multiplayer systems. Architected scalable backend infrastructure for game services, implementing low-latency synchronization and state management. Built tools and pipelines for game development workflows.',
    type: 'work',
    skills: ['Game Development', 'Unity', 'C#', 'Multiplayer', 'Backend Systems', 'Real-time']
  }
].sort((a, b) => {
  // Extract start year from date string
  const getStartYear = (dateStr: string): number => {
    const match = dateStr.match(/^(\d{4})/);
    return match ? parseInt(match[1], 10) : 0;
  };
  
  const yearA = getStartYear(a.date);
  const yearB = getStartYear(b.date);
  
  // Sort by start year descending (newest first), then by type priority
  if (yearB !== yearA) {
    return yearB - yearA;
  }
  
  // If same year, prioritize work > achievement > project > education
  const typePriority: Record<TimelineItem['type'], number> = {
    'work': 4,
    'achievement': 3,
    'project': 2,
    'education': 1
  };
  
  const priorityA = typePriority[a.type] || 0;
  const priorityB = typePriority[b.type] || 0;
  
  return priorityB - priorityA;
});


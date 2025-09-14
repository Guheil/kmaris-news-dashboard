import { NewsArticle } from './interface';

export const sampleNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Revolutionary AI Technology Transforms Healthcare Industry',
    author: 'Dr. Sarah Johnson',
    date: '2024-01-15',
    newsImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
    category: 'Technology',
    description: 'A groundbreaking artificial intelligence system has been developed that can diagnose diseases with 95% accuracy, faster than traditional methods. This revolutionary technology is set to transform patient care across hospitals worldwide. The AI system uses advanced machine learning algorithms to analyze medical images, patient data, and symptoms to provide rapid, accurate diagnoses. Medical professionals are calling this a game-changer for early disease detection and treatment planning.',
    views: 15420
  },
  {
    id: '2',
    title: 'Global Climate Summit Reaches Historic Agreement',
    author: 'Michael Chen',
    date: '2024-01-14',
    newsImage: 'https://images.unsplash.com/photo-1569163139394-de44aa2b7c85?w=400&h=300&fit=crop',
    category: 'Environment',
    description: 'World leaders from 195 countries have reached a historic agreement at the Global Climate Summit, committing to ambitious carbon reduction targets. The agreement includes a pledge to reduce global emissions by 50% by 2030 and achieve net-zero emissions by 2050. This landmark deal also establishes a $100 billion fund to help developing nations transition to renewable energy sources. Environmental activists are calling this the most significant climate action in decades.',
    views: 23150
  },
  {
    id: '3',
    title: 'Stock Market Surges to Record High Following Fed Announcement',
    author: 'Jennifer Williams',
    date: '2024-01-13',
    newsImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
    category: 'Finance',
    description: 'Major stock indices reached record highs today following the Federal Reserve\'s announcement of potential interest rate cuts in the coming months. The Dow Jones Industrial Average gained 2.5%, while the S&P 500 rose 2.8% and the Nasdaq climbed 3.2%. Investors are optimistic about the Fed\'s dovish stance on monetary policy, which is expected to boost economic growth and corporate earnings. Financial analysts predict continued market momentum through the remainder of the quarter.',
    views: 18750
  },
  {
    id: '4',
    title: 'New Space Mission to Mars Launches Successfully',
    author: 'Dr. Robert Martinez',
    date: '2024-01-12',
    newsVideo: 'https://example.com/mars-launch-video.mp4',
    category: 'Science',
    description: 'NASA\'s latest Mars rover mission launched successfully from Kennedy Space Center, beginning a seven-month journey to the Red Planet. The rover, equipped with advanced scientific instruments, will search for signs of ancient microbial life and collect rock samples for future return to Earth. This mission represents the most ambitious attempt yet to understand Mars\' geological history and potential for past life. The rover is expected to land in Jezero Crater in August 2024.',
    views: 12340
  },
  {
    id: '5',
    title: 'Breakthrough in Renewable Energy Storage Technology',
    author: 'Dr. Lisa Thompson',
    date: '2024-01-11',
    newsImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop',
    category: 'Technology',
    description: 'Scientists at Stanford University have developed a revolutionary battery technology that can store renewable energy for up to six weeks without significant power loss. This breakthrough addresses one of the biggest challenges in renewable energy adoption - storage capacity during periods of low wind or solar generation. The new lithium-metal batteries use a novel electrolyte that prevents degradation and maintains 90% efficiency over extended storage periods. This technology could accelerate the global transition to renewable energy.',
    views: 9876
  },
];
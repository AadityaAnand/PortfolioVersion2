import { Experience, Project, Skill, SocialLink } from '../types';

export const personalInfo = {
  name: 'Aaditya Anand',
  title: 'Software Engineer',
  email: 'aadityaanand0829@gmail.com',
  about: 'Software Engineer with over 2 years of experience in full-stack development, cloud architecture, and ML/AI solutions. Proficient in Python, JavaScript, and SQL, building scalable applications and automated pipelines that improve performance by 25-70%. Adept at delivering data-driven systems and optimizing workflows in Agile environments for enterprise and academic settings. I believe in user-centered design approaches that prioritize both functionality and user experience, creating solutions that not only meet technical requirements but also exceed user expectations.',
  resumeUrl: '/AADITYA ANAND_Res.pdf'
};

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'Wells Fargo',
    position: 'Software Development Engineer',
    location: 'USA',
    duration: 'August 2024 – Present',
    description: [
      'Developed a Python-based automation framework to process financial transaction data for 70+ internal workflows, reducing processing time by 40% and improving data accuracy by 25%.',
      'Established a Git-based version control system for the team codebase, streamlining code reviews and enabling seamless collaboration for 10+ developers in an Agile environment.',
      'Implemented CI/CD pipelines using Jenkins, automating testing and deployment workflows for banking applications, achieving a 30% reduction in deployment time.',
      'Designed and integrated RESTful APIs to enhance interoperability between internal banking systems, improving transaction processing efficiency by 20% for high-volume workflows.',
      'Optimized SQL queries for data retrieval in financial reporting systems, reducing query execution time by 35% and enabling real-time analytics for business stakeholders.',
      'Collaborated with cross-functional teams to implement secure coding practices, reducing vulnerabilities in application code by 15% as measured by static code analysis tools.',
      'Mentored junior developers on Python best practices and Agile methodologies, improving team productivity by 10% through knowledge-sharing sessions.'
    ],
    technologies: ['Python', 'Git', 'Jenkins', 'RESTful APIs', 'SQL', 'Data Processing', 'Workflow Automation']
  },
  {
    id: '2',
    company: 'Maxgen Technologies Pvt. Ltd.',
    position: 'Software Development Engineer',
    location: 'India',
    duration: 'May 2021 – August 2023',
    description: [
      'Maintained web applications using Python and Django, delivering 5+ client projects with 98% on-time delivery rate.',
      'Automated data extraction and reporting processes for client dashboards, reducing manual effort by 50% and improving report generation speed by 30%.',
      'Implemented unit testing frameworks using PyTest, increasing code coverage by 40% and reducing production bugs by 20%.',
      'Optimized backend database performance by refactoring SQL queries and indexing, achieving a 25% reduction in data retrieval times for client-facing applications.',
      'Integrated third-party APIs for payment processing and user authentication, enhancing application functionality and improving user satisfaction scores by 15%.',
      'Participated in daily Scrum meetings, contributing to a 10% improvement in sprint velocity through effective task prioritization and collaboration with a 6-member team.'
    ],
    technologies: ['Python', 'Django', 'PyTest', 'SQL', 'REST APIs', 'Agile Methodologies']
  },
  {
    id: '3',
    company: 'Intellicus Technologies',
    position: 'Software Development Intern',
    location: 'India',
    duration: 'January 2021 – June 2021',
    description: [
      'Developed and maintained business intelligence dashboards using Python and SQL, improving data visualization for client reporting.',
      'Collaborated with senior developers to implement data processing pipelines, reducing manual data entry by 60%.',
      'Participated in code reviews and contributed to team knowledge sharing sessions.',
      'Gained hands-on experience with enterprise software development practices and Agile methodologies.'
    ],
    technologies: ['Python', 'SQL', 'Business Intelligence', 'Data Visualization', 'Agile']
  },
  {
    id: '4',
    company: 'Indian Institute of Technology, Kharagpur',
    position: 'Research Intern',
    location: 'India',
    duration: 'June 2020 – December 2020',
    description: [
      'Conducted research on machine learning algorithms for data analysis and pattern recognition.',
      'Implemented and tested various ML models using Python and scikit-learn.',
      'Collaborated with research team to publish findings in academic journals.',
      'Developed skills in experimental design and statistical analysis.'
    ],
    technologies: ['Python', 'Machine Learning', 'Scikit-learn', 'Statistical Analysis', 'Research']
  }
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Cybersecurity Analytics Platform',
    description: 'Developed a comprehensive cybersecurity analytics platform that monitors network traffic, detects anomalies, and provides real-time threat intelligence. Implemented machine learning algorithms for pattern recognition and automated incident response.',
    technologies: ['Python', 'React', 'Node.js', 'Machine Learning', 'MongoDB', 'Docker'],
    githubUrl: 'https://github.com/AadityaAnand/cybersecurity-analytics',
    liveUrl: 'https://cybersecurity-analytics-demo.vercel.app',
    duration: '3 months',
  },
  {
    id: '2',
    title: 'Distributed File System',
    description: 'Built a distributed file system with fault tolerance and high availability. Implemented features like file replication, load balancing, and automatic failover mechanisms.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Kubernetes'],
    githubUrl: 'https://github.com/AadityaAnand/distributed-file-system',
    liveUrl: 'https://distributed-fs-demo.vercel.app',
    duration: '4 months',
  },
  {
    id: '3',
    title: 'Real Time Chat Application',
    description: 'Created a real-time chat application with features like message encryption, file sharing, and group conversations. Implemented WebSocket connections for instant messaging.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express.js'],
    githubUrl: 'https://github.com/AadityaAnand/realtime-chat',
    liveUrl: 'https://realtime-chat-app.vercel.app',
  },
  {
    id: '4',
    title: 'Credit Card Fraud Detection System',
    description: 'Developed a machine learning-based system for detecting fraudulent credit card transactions. Achieved 95% accuracy in fraud detection using ensemble methods.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Flask', 'PostgreSQL'],
    githubUrl: 'https://github.com/AadityaAnand/fraud-detection',
    liveUrl: 'https://fraud-detection-demo.vercel.app',
  },
];

export const skills: Skill[] = [
  // Programming Languages
  { name: 'Python', category: 'Programming Languages', icon: 'devicon-python-plain' },
  { name: 'Java', category: 'Programming Languages', icon: 'devicon-java-plain' },
  { name: 'C++', category: 'Programming Languages', icon: 'devicon-cplusplus-plain' },
  { name: 'JavaScript', category: 'Programming Languages', icon: 'devicon-javascript-plain' },
  { name: 'TypeScript', category: 'Programming Languages', icon: 'devicon-typescript-plain' },
  { name: 'SQL', category: 'Programming Languages', icon: 'devicon-mysql-plain' },
  { name: 'R', category: 'Programming Languages', icon: 'devicon-r-plain' },
  { name: 'Go', category: 'Programming Languages', icon: 'devicon-go-plain' },
  
  // Frameworks & Libraries
  { name: 'React', category: 'Frameworks & Libraries', icon: 'devicon-react-original' },
  { name: 'Node.js', category: 'Frameworks & Libraries', icon: 'devicon-nodejs-plain' },
  { name: 'Express.js', category: 'Frameworks & Libraries', icon: 'devicon-express-original' },
  { name: 'Flask', category: 'Frameworks & Libraries', icon: 'devicon-flask-plain' },
  { name: 'Django', category: 'Frameworks & Libraries', icon: 'devicon-django-plain' },
  { name: 'Spring Boot', category: 'Frameworks & Libraries', icon: 'devicon-spring-plain' },
  { name: 'Redux', category: 'Frameworks & Libraries', icon: 'devicon-redux-original' },
  { name: 'Angular', category: 'Frameworks & Libraries', icon: 'devicon-angularjs-plain' },
  { name: 'FastAPI', category: 'Frameworks & Libraries', icon: 'devicon-fastapi-plain' },
  
  // Cloud & DevOps
  { name: 'AWS', category: 'Cloud & DevOps', icon: 'devicon-amazonwebservices-original' },
  { name: 'Docker', category: 'Cloud & DevOps', icon: 'devicon-docker-plain' },
  { name: 'Kubernetes', category: 'Cloud & DevOps', icon: 'devicon-kubernetes-plain' },
  { name: 'Jenkins', category: 'Cloud & DevOps', icon: 'devicon-jenkins-plain' },
  { name: 'GitLab CI', category: 'Cloud & DevOps', icon: 'devicon-gitlab-plain' },
  { name: 'Terraform', category: 'Cloud & DevOps', icon: 'devicon-terraform-plain' },
  
  // Data & Analytics
  { name: 'MongoDB', category: 'Data & Analytics', icon: 'devicon-mongodb-plain' },
  { name: 'PostgreSQL', category: 'Data & Analytics', icon: 'devicon-postgresql-plain' },
  { name: 'Redis', category: 'Data & Analytics', icon: 'devicon-redis-plain' },
  { name: 'Apache Spark', category: 'Data & Analytics', icon: 'devicon-apache-spark-plain' },
  { name: 'Apache Kafka', category: 'Data & Analytics', icon: 'devicon-apache-kafka-plain' },
  
  // Tools & Technologies
  { name: 'Git', category: 'Tools & Technologies', icon: 'devicon-git-plain' },
  { name: 'Selenium', category: 'Tools & Technologies', icon: 'devicon-selenium-plain' },
  { name: 'Postman', category: 'Tools & Technologies', icon: 'devicon-postman-plain' },
  { name: 'Jupyter', category: 'Tools & Technologies', icon: 'devicon-jupyter-plain' },
  { name: 'Prometheus', category: 'Tools & Technologies', icon: 'devicon-prometheus-plain' },
  { name: 'Grafana', category: 'Tools & Technologies', icon: 'devicon-grafana-plain' }
];

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/AadityaAnand',
    icon: 'Github',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/aadityaanand',
    icon: 'Linkedin',
  },
  {
    name: 'Email',
    url: 'mailto:aadityaanand0829@gmail.com',
    icon: 'Mail',
  },
]; 
/**
 * Competition-Grade Portfolio Data Engine
 * Riddhi Zunjarrao | Aspiring Data Analyst & AI Innovator | B.Tech CSE Student
 */

const PORTFOLIO_DATA = {
  personal: {
    name: "Riddhi Zunjarrao",
    shortName: "Riddhi",
    brand: "Riddhi Zunjarrao.",
    roleBadge: "B.TECH CSE • AI • DATA • SOFTWARE",
    heroHeadline: "Hi, I'm<br>Riddhi Zunjarrao.",
    heroStatement: "I build intelligent<br>digital experiences.",
    heroSubtext: "Exploring AI, data, software and human-centered technology to turn ideas into meaningful digital experiences.",
    brandStatement: "I'm not just learning technology.<br><span class=\"text-[#111111]\">I'm building with it.</span>",
    brandWords: ["AI.", "DATA.", "SOFTWARE.", "DESIGN."],
    aboutStory: "I'm a Computer Science & Engineering student passionate about Artificial Intelligence, Data Analytics, Software Development, and building technology that solves real problems. From architecting predictive machine learning pipelines to engineering responsive, high-performance web systems, I combine analytical rigor with thoughtful human-centric design.",
    location: "Navi Mumbai, India",
    university: "ITM Skills University",
    academicStatus: "B.Tech in Computer Science and Engineering (2024 — 2028)",
    social: {
      github: "https://github.com/riddhi-z1465",
      linkedin: "https://linkedin.com/in/riddhizunjarrao",
      email: "mailto:riddhizunjarrao669@gmail.com",
      emailDisplay: "riddhizunjarrao669@gmail.com",
      resumePath: "assets/resume.pdf"
    },
    interests: [
      "Machine Learning",
      "NLP",
      "Generative AI",
      "RAG & Vector Embeddings",
      "Full Stack Development",
      "Cloud & AWS",
      "Databases",
      "Problem Solving"
    ]
  },

  // 11 Multilingual Greetings in exact sequence
  greetings: [
    { text: "Hello", lang: "English" },
    { text: "नमस्ते", lang: "Hindi" },
    { text: "Bonjour", lang: "French" },
    { text: "Hola", lang: "Spanish" },
    { text: "Ciao", lang: "Italian" },
    { text: "こんにちは", lang: "Japanese" },
    { text: "안녕하세요", lang: "Korean" }

  ],

  // 01 & 10: "My Journey" Storytelling Section
  journey: [
    {
      step: "01",
      tag: "CURIOUS & LEARN",
      title: "Foundations & Curiosity",
      period: "2023",
      description: "Started with core computer science principles, mathematical foundations, Python, and data structures. Developed a deep fascination with how data patterns reveal hidden truths."
    },
    {
      step: "02",
      tag: "EXPLORE & EXPERIMENT",
      title: "Data Analytics & ML",
      period: "2024",
      description: "Dove into exploratory data analysis, NumPy, Pandas, Scikit-learn, and statistical regression. Started building predictive models for real estate valuation and compensation benchmarking."
    },
    {
      step: "03",
      tag: "BUILD & SOLVE",
      title: "Full Stack & IoT Systems",
      period: "2024 — 2025",
      description: "Expanded into modern frontend architectures, cloud databases (Firebase, Supabase), and IoT hardware simulation with ESP32 and Blynk telemetry."
    },
    {
      step: "04",
      tag: "INNOVATE",
      title: "AI-Powered Products (WeSafe)",
      period: "2025",
      description: "Engineered WeSafe, combining real-time speech recognition, safe-word emergency triggers, and live geospatial tracking into an accessible life-saving PWA."
    },
    {
      step: "05",
      tag: "CREATING THE FUTURE",
      title: "AI Agents & Vibe Coding",
      period: "2025 — Present",
      description: "Exploring autonomous AI agent workflows, prompt engineering, and generative systems at AA Immersive while continually pushing the boundaries of intelligent software."
    }
  ],

  // 12: "What I Build" 4 Large Areas
  whatIBuild: [
    {
      number: "01",
      title: "AI & ML",
      tagline: "Predictive Models & Intelligent Agents",
      description: "Supervised and unsupervised learning systems, speech recognition interfaces, generative workflows, and autonomous agent orchestration that make software proactive.",
      capabilities: ["Supervised ML Regression", "Speech Recognition AI", "Agentic Workflows", "Model Evaluation & Tuning"],
      tools: "Python • Scikit-Learn • Web Speech API • Pandas"
    },
    {
      number: "02",
      title: "DATA & ANALYTICS",
      tagline: "Transforming Raw Data into Actionable Clarity",
      description: "End-to-end data processing pipelines, exploratory statistical analysis, multivariate feature engineering, and interactive visualization dashboards.",
      capabilities: ["Exploratory Data Analysis (EDA)", "Feature Engineering", "Data Visualization", "Statistical Benchmarking"],
      tools: "NumPy • Pandas • Matplotlib • SQL"
    },
    {
      number: "03",
      title: "SOFTWARE",
      tagline: "Robust, High-Performance Systems",
      description: "Modern web applications, scalable state management, cloud database architectures, authentication systems, and embedded IoT simulations.",
      capabilities: ["RESTful Architecture", "Cloud Database Sync", "IoT Telemetry Simulation", "Clean Code Architecture"],
      tools: "JavaScript • Node.js • Firebase • ESP32 / Blynk"
    },
    {
      number: "04",
      title: "DIGITAL EXPERIENCES",
      tagline: "Human-Centered Design with Cinematic Polish",
      description: "Fast, responsive, and accessible digital products engineered with Apple-level aesthetic restraint, smooth GSAP micro-interactions, and visual harmony.",
      capabilities: ["Micro-Interaction Design", "Fluid Responsive Layouts", "Web Accessibility (A11y)", "Performance & SEO Optimization"],
      tools: "HTML5 • Tailwind CSS • GSAP • Lucide"
    }
  ],

  // 13: Technical Skills Categories (Exactly matching resume.pdf)
  skills: [
    {
      number: "01",
      category: "Programming Languages",
      items: ["Python", "JavaScript", "Java", "C++"]
    },
    {
      number: "02",
      category: "AI / ML",
      items: [
        "Machine Learning",
        "Natural Language Processing (NLP)",
        "Generative AI",
        "Retrieval-Augmented Generation (RAG)",
        "Vector Embeddings",
        "Semantic Search",
        "Prompt Engineering"
      ]
    },
    {
      number: "03",
      category: "Frontend Development",
      items: ["HTML5", "CSS3", "JavaScript", "Next.js", "Tailwind CSS"]
    },
    {
      number: "04",
      category: "Backend Development",
      items: ["Node.js", "Express.js", "REST APIs"]
    },
    {
      number: "05",
      category: "Cloud & AWS",
      items: ["AWS S3", "AWS EC2", "AWS Lambda", "AWS Bedrock (Learning)"]
    },
    {
      number: "06",
      category: "Databases",
      items: ["PostgreSQL", "Supabase", "MongoDB", "MySQL", "Firebase"]
    },
    {
      number: "07",
      category: "Tools & Platforms",
      items: ["Git", "GitHub", "Vercel", "Netlify"]
    },
    {
      number: "08",
      category: "Soft Skills",
      items: ["Problem Solving", "Communication", "Team Collaboration"]
    }
  ],

  // 14 & 16: Projects Data (Exactly matching resume: Recall Lite & WeSafe)
  projects: [
    {
      id: "recall-lite",
      number: "01",
      isFeatured: true,
      filterCategory: "ai-rag",
      filterDisplay: "AI & RAG",
      title: "Recall Lite",
      category: "Featured • AI-Second Brain Application (2025)",
      tagline: "Conversational RAG search with pgvector & Groq Llama 3.3 70B.",
      description: "An AI-powered knowledge management system enabling users to store and query 500+ web resources using conversational search. Features Retrieval-Augmented Generation (RAG) pipelines with vector embeddings and sub-second similarity search.",
      techStack: ["Next.js", "Supabase", "PostgreSQL (pgvector)", "Groq Llama 3.3 70B", "RAG Pipeline", "Vector Embeddings"],
      features: [
        "Built an AI-powered knowledge management system enabling users to store and query 500+ web resources using conversational search.",
        "Applied Retrieval-Augmented Generation (RAG) pipelines with vector embeddings and semantic search for context-aware retrieval.",
        "Expanded document chunking and indexing workflows using PostgreSQL pgvector, enabling sub-second similarity search across large datasets.",
        "Integrated Groq Llama 3.3 70B to generate grounded answers, summaries, and question-answering responses with proper source attribution.",
        "Enforced secure multi-user access using Supabase Authentication and Row-Level Security (RLS).",
        "Improved retrieval ranking logic, reducing irrelevant results by 30%."
      ],
      github: "https://github.com/riddhi-z1465/recall-lite",
      demo: "https://github.com/riddhi-z1465/recall-lite"
    },
    {
      id: "wesafe",
      number: "02",
      isFeatured: true,
      filterCategory: "mobile-safety",
      filterDisplay: "Mobile & Safety",
      title: "WeSafe",
      category: "Featured • AI-Powered Women Safety Platform (2026)",
      tagline: "Mobile safety platform with SOS alerts, Twilio dispatch, and live GPS tracking.",
      description: "An AI-powered mobile safety platform engineered to protect individuals with emergency SOS communication, automated Twilio alerts, and live location sharing.",
      techStack: ["Flutter", "Firebase", "Twilio API", "Google Maps API", "Geolocation", "Cloud Backend"],
      features: [
        "Built a mobile safety application with SOS alerts, emergency communication, and live location tracking features.",
        "Integrated Twilio APIs to send SMS and voice calls to up to 5 emergency contacts within seconds of SOS activation.",
        "Integrated Google Maps API and Firebase backend services to enable real-time location sharing for emergency response tracking.",
        "Expanded backend architecture supporting authentication, contact management, and emergency alert workflows for 100+ users."
      ],
      github: "https://github.com/riddhi-z1465/wesafe-ai-safety",
      demo: "#wesafe-case-study",
      hasCaseStudy: true
    }
  ],

  // 15: Fullscreen WeSafe Case Study Experience Data
  wesafeCaseStudy: {
    title: "WeSafe — Intelligent Personal Safety Platform",
    tagline: "Technology designed around personal safety.",
    overview: "WeSafe is an AI-powered progressive web application engineered to protect individuals in high-risk or emergency situations through proactive, hands-free voice intelligence, automated SOS dispatch, and real-time location streaming.",
    sections: [
      {
        id: "problem",
        title: "THE PROBLEM",
        headline: "When danger strikes, you don't have time to unlock your phone.",
        content: "Traditional safety apps require a user to unlock their device, navigate to an app, and tap a button. In real-world physical emergencies, confrontations, or medical crises, reaching for and unlocking a phone is often impossible or escalates danger. Victims need an immediate, hands-free mechanism that triggers silently and reliably."
      },
      {
        id: "idea",
        title: "THE IDEA",
        headline: "A vigilant background listener that activates on your voice.",
        content: "What if your safety tool could listen continuously for custom distress phrases or safe-words, analyze acoustic sentiment in real time, and immediately mobilize emergency contacts with precision coordinates without the user ever touching the screen?"
      },
      {
        id: "solution",
        title: "THE SOLUTION",
        headline: "Voice-driven AI safety with zero-touch SOS orchestration.",
        content: "WeSafe implements a Progressive Web App (PWA) powered by browser-native Web Speech API, acoustic recognition patterns, and high-precision Geolocation. Upon detecting a predefined safe word or distress command, the system instantly triggers an emergency protocol: coordinates are broadcasted via Firebase, trusted contacts receive immediate notification, and a discrete audio recorder is engaged."
      },
      {
        id: "architecture",
        title: "HOW IT WORKS",
        headline: "End-to-end emergency pipeline architecture.",
        steps: [
          { step: "01", name: "Voice Stream Ingestion", desc: "Real-time speech recognition buffer processes acoustic stream with minimal latency and local browser parsing." },
          { step: "02", name: "Safe Word Match Engine", desc: "Fuzzy pattern matching and phonetic matching evaluate candidate phrases against user-configured trigger words." },
          { step: "03", name: "GPS Coordinate Lock", desc: "High-accuracy geolocation API locks latitude, longitude, speed, and timestamp with continuous tracking." },
          { step: "04", name: "Cloud SOS Dispatch", desc: "Firebase real-time sync pushes incident payload to trusted contacts with direct Google Maps navigation links." }
        ]
      },
      {
        id: "technology",
        title: "TECHNOLOGY STACK",
        headline: "Engineered for speed, privacy, and reliability.",
        stack: [
          { name: "Web Speech API", role: "Continuous acoustic & voice command recognition" },
          { name: "PWA & Service Workers", role: "Offline-first capability, background execution" },
          { name: "Geolocation Services", role: "High-precision GPS tracking & geofencing" },
          { name: "Firebase Cloud Firestore", role: "Real-time contact synchronization & telemetry" },
          { name: "Tailwind CSS & JavaScript", role: "Ultra-clean, high-contrast accessible UI" }
        ]
      },
      {
        id: "contribution",
        title: "MY CONTRIBUTION",
        headline: "Full-lifecycle engineering from architecture to implementation.",
        highlights: [
          "Architected the speech recognition listener and resilient safe-word detection loop.",
          "Engineered the responsive PWA user interface with tactile emergency buttons and status radars.",
          "Implemented the Firebase real-time database schema for multi-contact emergency synchronization.",
          "Conducted usability simulations to ensure sub-second emergency response times."
        ]
      },
      {
        id: "result",
        title: "RESULT & IMPACT",
        headline: "A proven, responsive safety prototype commended in tech competitions.",
        content: "WeSafe achieved sub-second (0.8s) trigger-to-alert latency in testing, recognized as a Top 5 Finalist in the Inter-Collegiate Tech Symposium for social impact and seamless AI integration."
      }
    ]
  },

  // 18: Interactive Data Moment Datasets
  interactiveData: {
    headline: "I Don't Just Work With Data. I Make It Understandable.",
    subheadline: "Explore real-time data modeling, multivariate distributions, and interactive regression benchmarking.",
    datasets: {
      salaryRegression: {
        id: "salaryRegression",
        title: "Salary vs. Experience ML Regression",
        metricLabel: "R² Fit Score: 0.942 | RMSE: 4.12k",
        xAxis: "Years of Experience (0 — 12 yrs)",
        yAxis: "Annual Compensation (in $10k)",
        points: [
          { x: 1.1, y: 3.9, label: "Junior Dev (1.1 yrs): $39k" },
          { x: 1.8, y: 4.4, label: "Associate Analyst (1.8 yrs): $44k" },
          { x: 2.5, y: 5.2, label: "Software Engineer (2.5 yrs): $52k" },
          { x: 3.2, y: 5.8, label: "Data Analyst (3.2 yrs): $58k" },
          { x: 4.0, y: 6.7, label: "ML Engineer (4.0 yrs): $67k" },
          { x: 5.1, y: 7.9, label: "Senior Engineer (5.1 yrs): $79k" },
          { x: 6.5, y: 9.1, label: "Lead Analyst (6.5 yrs): $91k" },
          { x: 8.0, y: 10.8, label: "Staff ML Engineer (8.0 yrs): $108k" },
          { x: 9.5, y: 12.2, label: "Principal Architect (9.5 yrs): $122k" },
          { x: 11.0, y: 13.8, label: "AI Director (11.0 yrs): $138k" }
        ],
        regressionLine: { startX: 0.5, startY: 3.2, endX: 12.0, endY: 14.5 }
      },
      modelLoss: {
        id: "modelLoss",
        title: "Neural Network Epoch Convergence (Loss Curve)",
        metricLabel: "Final Validation Loss: 0.0142 | Epochs: 50",
        xAxis: "Training Epochs (0 — 50)",
        yAxis: "Loss Error Rate (MSE)",
        points: [
          { x: 2, y: 0.88, label: "Epoch 2: Loss 0.88" },
          { x: 8, y: 0.54, label: "Epoch 8: Loss 0.54" },
          { x: 15, y: 0.32, label: "Epoch 15: Loss 0.32" },
          { x: 22, y: 0.18, label: "Epoch 22: Loss 0.18" },
          { x: 30, y: 0.08, label: "Epoch 30: Loss 0.08" },
          { x: 38, y: 0.035, label: "Epoch 38: Loss 0.035" },
          { x: 45, y: 0.019, label: "Epoch 45: Loss 0.019" },
          { x: 50, y: 0.014, label: "Epoch 50: Loss 0.014" }
        ],
        curvePath: "M 40,50 Q 120,180 220,220 T 460,250"
      },
      featureImportance: {
        id: "featureImportance",
        title: "Predictive Feature Importance Distribution",
        metricLabel: "Top Contributor: Experience (42%)",
        items: [
          { name: "Years Experience", value: 42, color: "#0071E3" },
          { name: "Technical Skillset Tier", value: 26, color: "#2B2B2B" },
          { name: "Domain Specialization", value: 16, color: "#666666" },
          { name: "Education Level", value: 10, color: "#8E8E93" },
          { name: "Geographic Market Index", value: 6, color: "#C7C7CC" }
        ]
      }
    }
  },

  // 19: Experience Timeline
  experience: [
    {
      role: "Vibe Coding Intern",
      company: "AA Immersive",
      location: "Remote",
      period: "Dec 2025 — Present",
      highlights: [
        "Engineering AI-assisted web applications and intelligent user experiences using cutting-edge generative tools.",
        "Collaborating in agile sprints to create high-performance, accessible, and minimalist frontend interfaces.",
        "Exploring autonomous AI agent workflows and prompt engineering architectures to accelerate developer velocity."
      ],
      tags: ["AI Systems", "JavaScript", "Tailwind CSS", "Prompt Engineering", "Git"]
    }
  ],

  // 20: Education (Exactly matching resume.pdf)
  education: {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "ITM Skills University",
    location: "Navi Mumbai, India",
    period: "2024 — 2028",
    highlights: [
      { label: "Degree Program", value: "B.Tech CSE" },
      { label: "Graduation Year", value: "2028" }
    ],
    details: "Focusing on Artificial Intelligence, Machine Learning, Natural Language Processing, Retrieval-Augmented Generation (RAG), and Cloud-Native Software Architecture."
  },

  // 22: Certifications
  certifications: [
    {
      id: "oracle-ai-agents",
      title: "Oracle Certified Foundations Associate — Agentic AI",
      shortTitle: "Oracle AI Agents",
      category: "AI / AI Agents",
      organization: "Oracle University",
      issueDate: "July 02, 2026",
      credentialId: "103480608AAI26OFA",
      image: "assets/images/certificates/oracle.png",
      link: "assets/images/certificates/oracle.png"
    },
    {
      id: "gemini-university-student",
      title: "Gemini Certified Student — University",
      shortTitle: "Gemini University Student",
      category: "Generative AI / AI",
      organization: "Google for Education",
      issueDate: "November 21, 2025",
      credentialId: "",
      image: "assets/images/certificates/gemini_student.png",
      link: "assets/images/certificates/gemini_student.png"
    },
    {
      id: "google-play-store-listing",
      title: "Google Play Store Listing Certificate",
      shortTitle: "Google Play",
      category: "Google / App Development",
      organization: "Google Play Academy",
      issueDate: "April 25, 2026",
      credentialId: "180714202",
      image: "assets/images/certificates/google_play.png",
      link: "assets/images/certificates/google_play.png"
    },
    {
      id: "generative-ai-mastermind",
      title: "Generative AI Mastermind",
      shortTitle: "Generative AI Mastermind",
      category: "Generative AI",
      organization: "Outskill",
      issueDate: "October 2025",
      credentialId: "",
      image: "assets/images/certificates/outskills.png",
      link: "assets/images/certificates/outskills.png"
    },
    {
      id: "tcs-ion-career-edge",
      title: "TCS iON Career Edge — Young Professional",
      shortTitle: "TCS",
      category: "Technology / Professional Development",
      organization: "Tata Consultancy Services (TCS iON)",
      issueDate: "July 14, 2026",
      credentialId: "272697-29201507-1016",
      image: "assets/images/certificates/tcs.png",
      link: "assets/images/certificates/tcs.png"
    },
    {
      id: "india-ai-yuva",
      title: "Yuva AI for All",
      shortTitle: "IndiaAI",
      category: "Artificial Intelligence",
      organization: "IndiaAI • Nasscom FutureSkills Prime",
      issueDate: "December 06, 2025",
      credentialId: "",
      image: "assets/images/certificates/india_ai.png",
      link: "assets/images/certificates/india_ai.png"
    }
  ],

  // 23: GitHub Open Source Repos (Projects from Resume)
  githubRepos: [
    {
      name: "recall-lite",
      description: "AI-second brain knowledge engine with RAG pipelines, vector embeddings, pgvector, and Groq Llama 3.3 70B.",
      techStack: "Next.js • Supabase • PostgreSQL pgvector • Groq Llama 3.3 70B",
      url: "https://github.com/riddhi-z1465/recall-lite"
    },
    {
      name: "wesafe-ai-safety",
      description: "AI-powered women safety platform with SOS alerts, Twilio emergency dispatch, and live location sharing.",
      techStack: "Flutter • Firebase • Twilio • Google Maps API",
      url: "https://github.com/riddhi-z1465/wesafe-ai-safety"
    }
  ]
};

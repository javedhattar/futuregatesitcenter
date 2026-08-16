/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlogPost, Course, Service, StudentResult, Testimonial } from './types';

export const COURSES: Course[] = [
  // 1. CORE COMPUTER & OFFICE
  {
    id: 'computer-basics',
    title: 'Computer Basics & Digital Literacy',
    duration: '3 Months',
    category: 'Computer & Office',
    description: 'Learn essential computer operations, Windows OS administration, touch typing, file management, and internet productivity tools.',
    longDescription: 'This foundational digital literacy program is designed to guide beginners into professional computer operation. Perfect for students, office staff, and individuals looking to build essential computer proficiency, it covers hardware fundamentals, typing speed, file directories, and cloud productivity tools.',
    fee: 'PKR 8,000',
    skillsGained: [
      'Touch Typing Speed (WPM optimization)',
      'Secure File Management & Directories',
      'Standard Google Drive & Cloud Syncing',
      'Windows OS Administration & Shortcuts',
      'Online Safety & Phishing Protection',
      'Hardware & Troubleshooting Basics'
    ],
    syllabus: [
      'Introduction to Computer Hardware & Peripherals',
      'Windows OS Settings, Control Panel & Shortcuts',
      'Rigorous Touch Typing Drills (40+ WPM Target)',
      'Organizing Files, Folder Structures & Backups',
      'Internet Browsing, Smart Search & Email Etiquette',
      'Google Workspace & Cloud Document Sharing',
      'Cyber Safety, Password Security & Antivirus Defaults'
    ],
    featured: true,
    status: 'Available Now',
    order: 0
  },
  {
    id: 'ms-office',
    title: 'MS Office Automation',
    duration: '3 Months',
    category: 'Computer & Office',
    description: 'Master Word, Excel, PowerPoint, Outlook, and professional office productivity skills.',
    longDescription: 'An industry-standard office automation course that transforms you into an efficient executive assistant, coordinator, or office administrator. Master document formatting in Word, mathematical formulas in Excel, presentations in PowerPoint, and email management in Outlook.',
    fee: 'PKR 10,000',
    skillsGained: [
      'Advanced MS Word Document Layouts',
      'MS Excel Formulas & Data Pivot Tables',
      'MS PowerPoint Dynamic Master Presentations',
      'MS Outlook Inbox Rules & Meetings',
      'Multi-sheet Spreadsheet Auditing',
      'Professional Reports & Invoicing'
    ],
    syllabus: [
      'MS Word: Advanced Formatting, Tables, Headers, Footers & Mail Merge',
      'MS Excel: Cell Referencing, Mathematical Formulas & Formatting',
      'MS Excel Advanced: VLOOKUP, HLOOKUP, Pivot Tables & Logic Gates',
      'MS PowerPoint: Slide Masters, Custom Transitions & Visual Decks',
      'MS Outlook: Email Organization, Calendar Scheduling & Tasks',
      'Document Conversion & Export Standards (PDF to Word/Excel)'
    ],
    featured: true,
    status: 'Available Now',
    order: 1
  },
  {
    id: 'advanced-excel',
    title: 'Advanced MS Excel',
    duration: '2 Months',
    category: 'Computer & Office',
    description: 'Master complex Excel formulas, nested functions, dynamic Pivot Tables, data modeling, Power Query, and automated business dashboards.',
    longDescription: 'Elevate your spreadsheet capabilities to advanced corporate levels. Designed for accountants, managers, and data professionals who need to clean messy datasets, build interactive dynamic KPI dashboards, perform advanced financial modeling, and automate repetitive calculations using Power Query and macros.',
    fee: 'PKR 12,000',
    skillsGained: [
      'Advanced Lookup & Reference Functions (XLOOKUP, INDEX/MATCH)',
      'Dynamic Pivot Tables & Multi-source Slicers',
      'Power Query ETL Data Transformations',
      'Conditional Logic & Data Validation Rules',
      'Interactive Business KPI Dashboards',
      'Automated Spreadsheet Financial Modeling'
    ],
    syllabus: [
      'Advanced Formula Mastery: XLOOKUP, INDEX/MATCH, Dynamic Arrays & Nested Conditions',
      'Data Cleaning & Transformation with Power Query',
      'Interactive Reporting: Multi-source Pivot Tables, Calculated Fields & Slicers',
      'What-If Analysis: Goal Seek, Scenario Manager & Data Tables',
      'Financial & Statistical Modeling in Spreadsheets',
      'Automated Summary Dashboards with Dynamic Charts & Controls'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 2
  },
  {
    id: 'powerpoint',
    title: 'PowerPoint & Professional Presentation Design',
    duration: '1 Month',
    category: 'Computer & Office',
    description: 'Design high-impact corporate pitch decks, animated slide decks, visual infographics, and executive presentations.',
    longDescription: 'Transform boring bullet points into visually compelling slide decks that capture attention. Learn the principles of slide hierarchy, typography, data visualization, custom motion animation, master layouts, and executive presentation delivery.',
    fee: 'PKR 6,000',
    skillsGained: [
      'Executive Slide Layout & Visual Hierarchy',
      'Slide Master Templates Creation',
      'Infographic & Data Visualization Design',
      'Custom Morph Transitions & Timed Animations',
      'Corporate Pitch Deck Storyboarding',
      'Exporting Formats (Interactive PDF, Video & Slideshow)'
    ],
    syllabus: [
      'Foundations of Slide Composition & Visual Storytelling',
      'Building Custom Slide Masters, Grids & Color Palettes',
      'Designing Infographics, Charts & Icon-driven Concepts',
      'Advanced Morph Transitions & Professional Kinetic Animations',
      'Pitch Deck Structures: Problem-Solution-Market-Financials',
      'Presenter Mode, Rehearsal Timings & High-Resolution Exports'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 3
  },

  // 2. DESIGN & MEDIA
  {
    id: 'graphic-designing',
    title: 'Graphic Designing with Adobe Photoshop',
    duration: '3 Months',
    category: 'Design & Media',
    description: 'Master Adobe Photoshop, layered photo manipulation, branding assets, social media banners, retouches, and commercial graphics.',
    longDescription: 'Master commercial image editing and visual design using Adobe Photoshop. Learn professional layer masks, frequency separation retouching, commercial product compositing, social media graphics creation, and print-ready banner formatting.',
    fee: 'PKR 15,000',
    skillsGained: [
      'Adobe Photoshop Layer Masks & Smart Objects',
      'Photo Retouching & Color Grading',
      'Commercial Product Mockups',
      'Social Media Ad Creative Design',
      'Print Media Layouts & CMYK Calibration',
      'Typography & Visual Composition'
    ],
    syllabus: [
      'Photoshop Interface, Selection Tools & Layer Hierarchy',
      'Non-destructive Editing with Layer Masks & Adjustment Layers',
      'Portrait Retouching, Frequency Separation & Lighting Corrections',
      'Product Manipulation & High-End Advertising Composites',
      'Social Media Post Banners & YouTube Thumbnail Design',
      'Preparing Print Files: CMYK, Resolution, Bleeds & Exporting'
    ],
    featured: true,
    status: 'Available Now',
    order: 4
  },
  {
    id: 'adobe-illustrator',
    title: 'Adobe Illustrator',
    duration: '2 Months',
    category: 'Design & Media',
    description: 'Master vector graphics, logo design, typography, brand identity kits, vector illustrations, and commercial print assets.',
    longDescription: 'Master Adobe Illustrator to build scalable vector graphics from scratch. Focus on pen tool precision, corporate logo drafting, custom iconography, typographic manipulation, packaging design, and commercial brand identity development.',
    fee: 'PKR 12,000',
    skillsGained: [
      'Pen Tool & Shape Builder Vector Precision',
      'Corporate Logo Design & Guidelines',
      'Custom Iconography & Vector Illustration',
      'Brand Identity Kits & Style Guides',
      'Packaging & Print Die-lines',
      'Vector Export Optimization (SVG, EPS, PDF)'
    ],
    syllabus: [
      'Vector Mechanics: Pen Tool, Anchor Points & Shape Builder',
      'Color Theory, Gradients, Mesh & Swatch Management',
      'Corporate Logo Brainstorming, Grid Systems & Vectorization',
      'Custom Typography, Glyphs & Lettering Modifications',
      'Packaging Design, Die-lines & Label Layouts',
      'Brand Identity Style Guides & Vector Production Workflow'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 5
  },
  {
    id: 'video-editing',
    title: 'Video Editing with Adobe Premiere Pro',
    duration: '3 Months',
    category: 'Design & Media',
    description: 'Professional video editing using Adobe Premiere Pro, timeline trimming, audio enhancement, transitions, and cinematic color grading.',
    longDescription: 'Master professional timeline video editing for YouTube, commercial ads, podcasts, and documentaries. Learn multi-camera editing, speed ramping, audio cleanup, LUT color grading, and broadcast export encoding.',
    fee: 'PKR 15,000',
    skillsGained: [
      'Adobe Premiere Pro Timeline Trimming',
      'Audio Equalization & Noise Filtering',
      'Cinematic Color Correction & LUTs',
      'Speed Ramping & Dynamic Transitions',
      'Subtitle Captions & Lower Thirds',
      'Multi-platform Video Encoding'
    ],
    syllabus: [
      'Premiere Pro Interface, Ingest & Project Organization',
      'Timeline Cutting, Ripple Edits & Pacing Techniques',
      'Audio Mixing, Denoising & Sound Effects Synchronization',
      'Color Correction, Curves & Cinematic LUT Grading',
      'Text Animation, Titles & Lower Thirds Design',
      'Exporting for YouTube, Reels, TV & Client Revisions'
    ],
    featured: true,
    status: 'Available Now',
    order: 6
  },
  {
    id: 'after-effects',
    title: 'Motion Graphics & Adobe After Effects',
    duration: '3 Months',
    category: 'Design & Media',
    description: 'Create animated logos, kinetic typography, visual effects, motion titles, and explainer animations using Adobe After Effects.',
    longDescription: 'Bring still graphics to life with Adobe After Effects. Master keyframing, graph editor easing, shape animations, kinetic typography, 3D layer space, masking, tracking, and motion graphics for broadcast and digital campaigns.',
    fee: 'PKR 18,000',
    skillsGained: [
      'Keyframe Animation & Graph Editor Easing',
      'Kinetic Typography & Title Sequences',
      'Logo Reveal Animations & Intros',
      'Masking, Track Mattes & Rotoscoping',
      '3D Layers & Camera Movements',
      'Render Queue & Media Encoder Optimization'
    ],
    syllabus: [
      'After Effects Interface, Compositions & Spatial Properties',
      'Keyframe Interpolation, Velocity Curves & Graph Editor',
      'Kinetic Typography, Text Animators & Title Sequences',
      'Logo Animation, Shape Layer Morphing & Visual Accents',
      'Masking, Rotoscoping, Green Screen & Camera Tracking',
      'Exporting Motion Assets & Dynamic Link with Premiere Pro'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 7
  },
  {
    id: 'short-form-video',
    title: 'Short-Form Video & Reels Creation',
    duration: '1 Month',
    category: 'Design & Media',
    description: 'Master viral short-form video editing for TikTok, Instagram Reels, and YouTube Shorts using CapCut and mobile/desktop tools.',
    longDescription: 'Learn the high-retention frameworks behind viral short-form vertical videos. Master hook structuring, dynamic auto-captions, trending audio synchronization, sound design effects, kinetic zooms, and rapid editing workflows in CapCut.',
    fee: 'PKR 8,000',
    skillsGained: [
      '3-Second Hook Video Structure',
      'CapCut Desktop & Mobile Editing',
      'Dynamic Animated Text Captions',
      'Sound Design & SFX Placement',
      'Kinetic Zooms & Pacing Rhythms',
      'Vertical Video Formatting & Safe Zones'
    ],
    syllabus: [
      'Short-Form Psychology: Retention Curves & Viral Hooks',
      'CapCut Desktop Workflow: Trimming, Speeds & Rhythms',
      'Dynamic Captions: Animations, Highlights & Emojis',
      'Sound Design: Layering SFX, Whooshes & Trending Music',
      'Visual Effects: Overlays, Transitions & Green Screens',
      'Publishing Strategy for TikTok, IG Reels & YouTube Shorts'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 8
  },

  // 3. WEB & FREELANCING
  {
    id: 'wordpress',
    title: 'WordPress Website Designing',
    duration: '3 Months',
    category: 'Web & Freelancing',
    description: 'Build professional business websites, blogs, corporate portals, and portfolio sites on WordPress without coding.',
    longDescription: 'Command the world\'s most popular CMS. Learn how to install WordPress, configure themes, organize navigation menus, set up custom forms, optimize page loading speed, and manage website backups and security.',
    fee: 'PKR 12,500',
    skillsGained: [
      'WordPress Core CMS Architecture',
      'Theme Customization & Child Themes',
      'Plugin Setup & Configuration',
      'Contact Forms & Lead Capture Integration',
      'WordPress Speed & Caching Setup',
      'Site Migration & Backup Procedures'
    ],
    syllabus: [
      'WordPress Architecture, Domain, DNS & Local Sandbox Setup',
      'Theme Selection, Customizer & Page Layouts',
      'Essential Plugins: Forms, SEO, Security & Speed',
      'Creating Business Pages: Home, About, Services, Contact',
      'WordPress Security Practices & Anti-Spam Measures',
      'Migrating from Localhost to Live Web Hosting Servers'
    ],
    featured: true,
    status: 'Available Now',
    order: 9
  },
  {
    id: 'elementor',
    title: 'Elementor Pro & WordPress Business Websites',
    duration: '2 Months',
    category: 'Web & Freelancing',
    description: 'Design custom responsive landing pages, dynamic headers, footers, popups, and advanced web layouts with Elementor Pro.',
    longDescription: 'Take WordPress website building to the next level with Elementor Pro. Learn visual container layouts (Flexbox/Grid), theme builder for dynamic headers and footers, interactive popups, scroll animations, and dynamic custom post types.',
    fee: 'PKR 12,000',
    skillsGained: [
      'Elementor Flexbox Container Layouts',
      'Theme Builder (Headers, Footers, Single Posts)',
      'Custom Form Integrations & Webhooks',
      'Interactive Popups & Slide-in Banners',
      'Motion Effects & Responsive Breakpoints',
      'Dynamic Content with ACF & Custom Fields'
    ],
    syllabus: [
      'Elementor Pro Interface & Flexbox Container Fundamentals',
      'Building Global Design Systems: Fonts, Colors & Global Widgets',
      'Theme Builder: Dynamic Headers, Footers & 404 Pages',
      'Creating High-Converting Sales Landing Pages & Lead Forms',
      'Motion Effects, Entrance Animations & Sticky Navbars',
      'Advanced Dynamic Content Integration & Performance Tuning'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 10
  },
  {
    id: 'freelancing',
    title: 'Freelancing & Online Earning',
    duration: '3 Months',
    category: 'Web & Freelancing',
    description: 'Learn profile building, proposal writing, client communication, and international payment withdrawals on Upwork, Fiverr, and freelance marketplaces.',
    longDescription: 'Bridge the gap between digital skills and international freelancing income. Learn how to craft winning Upwork proposals, optimize Fiverr gigs, negotiate with global clients, handle milestone deliveries, and securely withdraw foreign earnings.',
    fee: 'PKR 10,000',
    skillsGained: [
      'Upwork 100% Profile Optimization',
      'Fiverr Gig SEO & Ranking Strategy',
      'High-Conversion Bid Proposal Writing',
      'Client Negotiation & Project Milestones',
      'Payoneer & Local Bank Account Integration',
      'Building a Verifiable Freelance Portfolio'
    ],
    syllabus: [
      'Freelance Marketplaces Overview: Upwork, Fiverr, Guru & Direct Clients',
      'Creating Standout Profiles with Portfolio Showcases',
      'Fiverr Gigs Setup: Search Keywords, Video Pitch & Pricing Tiers',
      'Crafting Custom Winning Proposals on Upwork',
      'Client Communication, Dealing with Revisions & Review Management',
      'Financial Setup: Payoneer, Wire Transfers & Safe Foreign Remittances'
    ],
    featured: true,
    status: 'Available Now',
    order: 11
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Website Development',
    duration: '3 Months',
    category: 'Web & Freelancing',
    description: 'Build complete online stores with WooCommerce and Shopify, configure product catalogs, shopping carts, and cash on delivery checkout.',
    longDescription: 'Master the complete pipeline of building online shopping stores. Learn WooCommerce setup, product attributes, inventory management, shipping fee rules, payment gateway integrations, Cash On Delivery (COD) workflows, and cart optimization.',
    fee: 'PKR 15,000',
    skillsGained: [
      'WooCommerce Online Store Architecture',
      'Product Cataloging (Simple, Variable, Digital)',
      'Shopping Cart & Checkout Customization',
      'Cash-on-Delivery (COD) & Payment Gateways',
      'Shipping Zones & Order Tracking Rules',
      'Store Speed & Conversion Rate Optimization'
    ],
    syllabus: [
      'E-Commerce Fundamentals: Business Models & Platform Selection',
      'Setting Up WooCommerce: Store Settings, Currencies & Taxes',
      'Product Management: Categories, Attributes, Stock & Images',
      'Designing Custom Store Pages: Shop, Cart, Checkout & Account',
      'Integrating Payment Methods & Cash on Delivery Systems',
      'Order Management, Invoice Generation & Customer Email Templates'
    ],
    featured: true,
    status: 'Available Now',
    order: 12
  },
  {
    id: 'web-design-dev',
    title: 'Web Design & Development',
    duration: '6 Months',
    category: 'Web & Freelancing',
    description: 'Comprehensive web development covering HTML5, CSS3, JavaScript, Bootstrap, responsive design, and full site deployment.',
    longDescription: 'Our premier coding bootcamp for web development. Learn semantic HTML5, modern CSS3 styling, responsive grid frameworks, DOM manipulation in JavaScript, and live site deployment.',
    fee: 'PKR 25,000',
    skillsGained: [
      'Semantic HTML5 & Responsive CSS3',
      'Bootstrap 5 Grid System & Utilities',
      'Vanilla JavaScript DOM & Event Handlers',
      'Form Validation & Client-side Logic',
      'Cross-browser Compatibility & Responsive Layouts',
      'Domain, DNS, FTP & SSL Live Deployment'
    ],
    syllabus: [
      'Semantic HTML5 Document Structure & Semantic Tags',
      'CSS3 Styling, Box Model, Flexbox & Grid Layouts',
      'Responsive Web Design with Media Queries & Bootstrap 5',
      'JavaScript Basics: Variables, Functions, Loops & Arrays',
      'DOM Manipulation, Form Validations & Event Listeners',
      'Building Interactive Real-world Web Pages & Hosting Deployment'
    ],
    featured: true,
    status: 'Available Now',
    order: 13
  },

  // 4. ARTIFICIAL INTELLIGENCE
  {
    id: 'artificial-intelligence',
    title: 'AI for Beginners',
    duration: '3 Months',
    category: 'Artificial Intelligence',
    description: 'Practical introduction to modern AI tools, ChatGPT, Gemini, prompt engineering, content automation, and productivity workflows.',
    longDescription: 'Gain practical digital literacy in artificial intelligence. Learn how to use ChatGPT, Google Gemini, Copilot, and productivity AI tools for copywriting, data research, document summarization, and daily workflow automation.',
    fee: 'PKR 18,000',
    skillsGained: [
      'AI Literacy & Prompt Engineering Basics',
      'Research & Document Summarization with AI',
      'Productivity Automation with Gemini & ChatGPT',
      'AI-Powered Data Cleaning & Excel Formulas',
      'Creating Visuals & Presentations with AI',
      'Ethical AI Usage & Fact-checking'
    ],
    syllabus: [
      'Introduction to AI, LLMs & Real-World Use Cases',
      'Crafting Effective Prompts: Context, Persona & Constraints',
      'Using AI for Writing, Proofreading & Business Communication',
      'Spreadsheet Assistance & Formula Generation with AI',
      'AI Presentation & Visual Generation Overview',
      'Workplace Productivity Frameworks with AI Assistants'
    ],
    featured: true,
    status: 'Available Now',
    order: 14
  },
  {
    id: 'generative-ai',
    title: 'Generative AI & Prompt Engineering',
    duration: '2 Months',
    category: 'Artificial Intelligence',
    description: 'Master advanced prompt engineering techniques, zero-shot/few-shot prompts, chain-of-thought, LLM system instructions, and structured outputs.',
    longDescription: 'Master the art and science of prompt engineering. Learn advanced prompting architectures like Chain-of-Thought, few-shot prompting, system message constraints, JSON output formatting, and building custom GPTs and AI workflows.',
    fee: 'PKR 15,000',
    skillsGained: [
      'Advanced Prompt Engineering Architectures',
      'Chain-of-Thought & Tree-of-Thought Reasoning',
      'Custom GPTs & System Instruction Design',
      'Structured Output Formatting (JSON, Tables, Markdown)',
      'Prompt Auditing, Guardrails & Hallucination Reduction',
      'Multi-modal Prompting (Text + Image Analysis)'
    ],
    syllabus: [
      'Foundations of Large Language Model Behavior & Token Limits',
      'Zero-Shot, Few-Shot & Role-Based Prompt Engineering',
      'Chain-of-Thought & Step-by-Step Reasoning Frameworks',
      'Designing Custom System Instructions & Knowledge Bases',
      'Building Structured Outputs for Business Automation',
      'Multi-modal Analysis & Real-world Prompting Case Studies'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 15
  },
  {
    id: 'ai-content-creation',
    title: 'AI Content Creation',
    duration: '1 Month',
    category: 'Artificial Intelligence',
    description: 'Produce SEO articles, social media captions, video scripts, ad copy, and email newsletters using AI writing workflows.',
    longDescription: 'Learn how to combine AI speed with human creativity to produce high-quality written content. Master AI-assisted SEO blog writing, YouTube video scriptwriting, social media content matrices, email sales copy, and tone matching.',
    fee: 'PKR 10,000',
    skillsGained: [
      'AI-Assisted SEO Article Generation',
      'YouTube & Short-form Video Scriptwriting',
      'Social Media Caption & Hook Creation',
      'Sales Copywriting & Email Marketing Templates',
      'Brand Voice & Tone Matching with AI',
      'Humanizing AI Content & Editorial Review'
    ],
    syllabus: [
      'The AI Content Workflow: Research, Outline, Draft & Edit',
      'SEO Blog Generation: Keywords, Headings & Content Depth',
      'Scriptwriting for YouTube, Reels & TikTok Videos',
      'Social Media Content Planning & Bulk Text Generation',
      'Drafting High-Converting Email Newsletters & Sales Pitches',
      'Fact-Checking, Editorial Polishing & Avoiding AI Redundancies'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 16
  },
  {
    id: 'ai-image-video',
    title: 'AI Image & Video Generation',
    duration: '2 Months',
    category: 'Artificial Intelligence',
    description: 'Generate commercial quality visual art, product mockups, illustrations, and AI video animations using Midjourney, Stable Diffusion, and AI video tools.',
    longDescription: 'Explore the frontier of synthetic media. Learn visual prompt engineering in Midjourney and Leonardo AI, photorealistic product rendering, custom avatar generation, AI voice synthesis, and generative video clips.',
    fee: 'PKR 14,000',
    skillsGained: [
      'Midjourney & Leonardo AI Visual Prompting',
      'Aspect Ratios, Camera Angles & Lighting Prompts',
      'AI Product Mockup & Commercial Rendering',
      'AI Voiceover Synthesis & Audio Cloning Tools',
      'Generative Video Clips & Motion Inpainting',
      'Commercial Usage Rights & Visual Upscaling'
    ],
    syllabus: [
      'Generative Art Foundations: Diffusion Models & Image Prompts',
      'Mastering Midjourney: Parameters, Styles, Weights & Seeds',
      'Creating Commercial Product Photos & Marketing Assets',
      'AI Character Consistency & Custom Avatar Design',
      'AI Voice Synthesis, Text-to-Speech & Syncing',
      'Text-to-Video Generation & Video Upscaling Workflows'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 17
  },
  {
    id: 'ai-automation',
    title: 'AI Automation & AI Agents',
    duration: '2 Months',
    category: 'Artificial Intelligence',
    description: 'Build automated business workflows, AI-powered chatbots, webhook integrations, and multi-step agentic pipelines using no-code/low-code tools.',
    longDescription: 'Learn how to automate repetitive business tasks by combining AI with automation platforms like Make.com, Zapier, and webhook integrations. Build autonomous AI workflows for customer inquiry handling, lead sorting, and automated reporting.',
    fee: 'PKR 18,000',
    skillsGained: [
      'No-Code Workflow Automation (Make.com / Zapier)',
      'AI Chatbot Setup & Custom Knowledge Bases',
      'Webhook & API Integration Fundamentals',
      'Automated Lead Capture & Email Dispatch',
      'Agentic Task Execution Pipelines',
      'Business Process Automation Auditing'
    ],
    syllabus: [
      'Automation Foundations: Triggers, Actions & Webhooks',
      'Connecting LLM APIs with Google Sheets & CRM Systems',
      'Building Customer Support Chatbots with Knowledge Bases',
      'Automated Social Media & Email Marketing Pipelines',
      'Multi-Step AI Agent Pipelines & Conditional Routing',
      'Deploying & Monitoring Real-World Automation Workflows'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 18
  },

  // 5. PROGRAMMING & DATA
  {
    id: 'python',
    title: 'Python Programming',
    duration: '3 Months',
    category: 'Programming & Data',
    description: 'Learn foundational computer programming using Python, data structures, algorithms, object-oriented concepts, and practical scripts.',
    longDescription: 'Start your software engineering journey with Python, the world\'s most versatile language. Master Python syntax, functions, object-oriented programming (OOP), file I/O operations, error handling, and building real-world terminal scripts.',
    fee: 'PKR 15,000',
    skillsGained: [
      'Python Syntax, Variables & Data Types',
      'Control Flow (Conditionals & Loops)',
      'Functions & Modular Code Architecture',
      'Object-Oriented Programming (Classes & Objects)',
      'File Handling & JSON Data Manipulation',
      'Debugging, Testing & Clean Code Standards'
    ],
    syllabus: [
      'Python Environment Setup & VS Code Workflow',
      'Variables, Data Types, Strings & Mathematical Operations',
      'Lists, Tuples, Dictionaries & Sets Manipulation',
      'Control Structures: If/Else Statements & For/While Loops',
      'Functions, Parameters, Lambda & Modular Scripting',
      'Object-Oriented Python: Classes, Inheritance & Methods',
      'File I/O, Error Handling with Try/Except & Mini Projects'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 19
  },
  {
    id: 'python-ai-data',
    title: 'Python for AI & Data Science',
    duration: '3 Months',
    category: 'Programming & Data',
    description: 'Master NumPy, Pandas, Matplotlib, Seaborn, exploratory data analysis, and introductory machine learning algorithms.',
    longDescription: 'Level up Python programming for data science and AI applications. Learn data manipulation with Pandas, numerical array computing with NumPy, statistical visualization, exploratory data analysis (EDA), and machine learning foundations.',
    fee: 'PKR 20,000',
    skillsGained: [
      'Numerical Computing with NumPy Arrays',
      'Data Wrangling & Cleaning with Pandas',
      'Statistical Visualization (Matplotlib & Seaborn)',
      'Exploratory Data Analysis (EDA) Techniques',
      'Feature Engineering & Data Preprocessing',
      'Introductory Scikit-Learn Machine Learning Models'
    ],
    syllabus: [
      'NumPy Fundamentals: Multi-dimensional Arrays & Vectorization',
      'Pandas DataFrames: Reading CSV/Excel, Filtering & Grouping',
      'Data Cleaning: Handling Nulls, Duplicates & Outliers',
      'Data Visualization: Line Charts, Histograms, Heatmaps & Boxplots',
      'Exploratory Data Analysis Case Studies on Real Datasets',
      'Introduction to Machine Learning: Linear Regression & Classification'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 20
  },
  {
    id: 'data-analytics-power-bi',
    title: 'Data Analytics with Excel & Power BI',
    duration: '3 Months',
    category: 'Programming & Data',
    description: 'Transform raw business data into actionable visual insights, interactive dashboards, DAX measures, and Power BI reports.',
    longDescription: 'Bridge the gap between raw data and business intelligence. Master data modeling, Power Query transformations, DAX formula calculations, interactive Power BI visualizations, and corporate KPI dashboard deployment.',
    fee: 'PKR 16,000',
    skillsGained: [
      'Power BI Desktop Report Authoring',
      'Data Modeling (Star Schema & Relationships)',
      'DAX Measures & Calculated Columns',
      'Interactive Slicers, Cross-filtering & Drill-downs',
      'Power Query ETL Data Transformations',
      'Executive Business Dashboard Design'
    ],
    syllabus: [
      'Data Analytics Core: Business Questions & KPI Metrics',
      'Importing & Transforming Data in Power Query',
      'Data Modeling: Star Schema, Tables & Relationships',
      'DAX Essentials: SUM, CALCULATE, RELATED & Time Intelligence',
      'Building Visual Reports: Cards, Charts, Tables & Maps',
      'Publishing, Sharing & Scheduling Automated Data Refreshes'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 21
  },
  {
    id: 'sql',
    title: 'SQL & Database Fundamentals',
    duration: '2 Months',
    category: 'Programming & Data',
    description: 'Master relational database concepts, SQL queries, table joins, aggregations, data normalization, and MySQL/PostgreSQL.',
    longDescription: 'Master Structured Query Language (SQL) to store, query, and manage relational business data. Learn table schemas, CRUD operations, multi-table JOINs, subqueries, group aggregations, indexes, and database normalization.',
    fee: 'PKR 12,000',
    skillsGained: [
      'Relational Database Design & Normalization',
      'SQL CRUD Operations (SELECT, INSERT, UPDATE, DELETE)',
      'Multi-Table JOINs (INNER, LEFT, RIGHT)',
      'Aggregate Functions (GROUP BY, HAVING, ORDER BY)',
      'Subqueries & Common Table Expressions (CTEs)',
      'Database Indexing & Query Performance Basics'
    ],
    syllabus: [
      'Relational Database Concepts & Schema Architecture',
      'SQL Syntax Basics: SELECT, WHERE, Operators & Sorting',
      'Aggregate Functions: COUNT, SUM, AVG & Grouping Data',
      'Joining Tables: Relational Keys & Multi-Table Queries',
      'Subqueries, Nested Expressions & String Operations',
      'Data Definition Language (DDL): CREATE, ALTER, Constraints & Backups'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 22
  },

  // 6. DIGITAL BUSINESS
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    duration: '3 Months',
    category: 'Digital Business',
    description: 'Master digital marketing strategy, conversion funnels, Google Ads, Meta advertising, email campaigns, and analytics tracking.',
    longDescription: 'Learn comprehensive digital marketing strategies to acquire customers and scale sales. Master lead generation funnels, paid advertising campaigns on Google and Meta, email marketing automation, conversion tracking, and campaign ROI reporting.',
    fee: 'PKR 15,000',
    skillsGained: [
      'Digital Marketing Funnel Strategy',
      'Meta Ads Manager Campaign Setup',
      'Google Search Ads & Bidding Strategies',
      'Email Marketing Automation & Lead Magnets',
      'Pixel Tracking, Conversion Events & Analytics',
      'Client Marketing Audits & ROI Reporting'
    ],
    syllabus: [
      'Digital Marketing Core: Funnels, Target Personas & Customer Journeys',
      'Meta Ads: Campaign Objectives, Ad Sets, Creatives & Targeting',
      'Google Ads: Search Keywords, Match Types & Quality Score',
      'Email Marketing: Building Subscriber Lists & Automated Sequences',
      'Analytics & Pixel Tracking: Measuring Conversion Rates',
      'Agency Client Reporting: KPI Presentations & Campaign Scaling'
    ],
    featured: true,
    status: 'Available Now',
    order: 23
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    duration: '3 Months',
    category: 'Digital Business',
    description: 'Grow brands and engage audiences across Facebook, Instagram, TikTok, LinkedIn, and YouTube with organic and paid marketing.',
    longDescription: 'Master audience growth and engagement across modern social networks. Learn content calendar planning, organic community management, brand voice development, influencer collaborations, and performance analytics.',
    fee: 'PKR 12,000',
    skillsGained: [
      'Platform-Specific Content Strategy (FB, IG, TikTok, LinkedIn)',
      'Content Calendar Planning & Scheduling',
      'Community Management & Comment Moderation',
      'Influencer Marketing & Brand Partnerships',
      'Social Media Metrics & Engagement Analysis',
      'Building Organic Brand Authority'
    ],
    syllabus: [
      'Deconstructing Social Algorithms: Engagement Signals & Reach',
      'Planning Monthly Content Calendars & Visual Assets',
      'Short-form Video & Stories Content Strategy',
      'Community Building: Comments, DMs & Customer Care',
      'Paid Boosting vs Organic Growth Strategies',
      'Social Media Auditing & Monthly Reporting for Clients'
    ],
    featured: true,
    status: 'Available Now',
    order: 24
  },
  {
    id: 'seo',
    title: 'Search Engine Optimization (SEO)',
    duration: '3 Months',
    category: 'Digital Business',
    description: 'Rank websites on Google Search with keyword research, technical SEO, on-page optimization, content strategy, and link building.',
    longDescription: 'Learn proven white-hat SEO techniques to drive targeted organic traffic from Google Search. Master keyword research, technical site audits, on-page HTML tags, structured data, high-quality backlink building, and Google Search Console.',
    fee: 'PKR 15,000',
    skillsGained: [
      'Targeted Keyword Research & Search Intent',
      'On-Page SEO (Meta Tags, Headings, Internal Links)',
      'Technical SEO (Core Web Vitals, Sitemaps, Robots.txt)',
      'White-Hat Backlink Building & Outreach',
      'Google Search Console & Analytics Audits',
      'Competitor SEO Analysis with Industry Tools'
    ],
    syllabus: [
      'Search Engine Fundamentals: Crawling, Indexing & Ranking Algorithms',
      'Keyword Research: Search Volume, Intent, Keyword Difficulty',
      'On-Page Optimization: Title Tags, URLs, Headings & Content Structuring',
      'Technical SEO: Site Speed, Sitemaps, Canonicalization & Mobile Optimization',
      'Off-Page SEO: Digital PR, Guest Articles & Authority Building',
      'Google Search Console Audits & Performance Reporting'
    ],
    featured: true,
    status: 'Available Now',
    order: 25
  },
  {
    id: 'accounting',
    title: 'Accounting & Bookkeeping',
    duration: '3 Months',
    category: 'Digital Business',
    description: 'Master bookkeeping principles, double-entry accounting, financial statements, bank reconciliations, and practical accounting in Excel.',
    longDescription: 'A practical business accounting program covering bookkeeping rules, financial ledgers, balance sheets, profit and loss statements, payroll registers, and spreadsheet accounting for small to medium businesses.',
    fee: 'PKR 10,000',
    skillsGained: [
      'Double-Entry Bookkeeping Principles',
      'General Ledger & Journal Entries Management',
      'Income Statements & Balance Sheet Preparation',
      'Bank Reconciliation & Petty Cash Controls',
      'Payroll Management & Tax Deduction Tracking',
      'Computerized Accounting Workflows in Excel'
    ],
    syllabus: [
      'Foundations of Accounting: Assets, Liabilities, Equity & Equations',
      'Recording Transactions: Journal Entries, Ledgers & Trial Balance',
      'Preparing Financial Statements: Profit & Loss, Balance Sheets',
      'Cash Management: Bank Reconciliation Statements & Petty Cash',
      'Payroll Registers, Invoicing & Accounts Receivable/Payable',
      'Practical Excel Templates for Financial Audits & Record Keeping'
    ],
    featured: false,
    status: 'Available Now',
    order: 26
  },

  // 7. ADVANCED IT
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Fundamentals',
    duration: '3 Months',
    category: 'Advanced IT',
    description: 'Learn essential information security principles, threat analysis, network defense, password security, vulnerability scanning, and safe computing practices.',
    longDescription: 'An introductory program into information and cyber defense. Learn core cybersecurity concepts including the CIA triad, malware taxonomy, phishing attack mechanics, vulnerability assessments, firewall basics, and security hygiene.',
    fee: 'Inquire at Campus',
    skillsGained: [
      'Information Security Core Concepts (CIA Triad)',
      'Threat Analysis (Malware, Ransomware, Phishing)',
      'Vulnerability Assessment & Port Scanning Basics',
      'Password Security, 2FA & Identity Management',
      'Network Defense & Basic Firewall Configuration',
      'Security Incident Response Protocols'
    ],
    syllabus: [
      'Introduction to Cybersecurity Landscape & Threat Vectors',
      'Authentication, Authorization & Access Control Principles',
      'Malware Analysis & Social Engineering Defense',
      'Network Security Basics: Ports, Protocols & Firewalls',
      'Vulnerability Scanning Fundamentals & Security Audits',
      'Incident Response, Data Backup & Security Compliance Basics'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 27
  },
  {
    id: 'networking',
    title: 'Networking Fundamentals',
    duration: '2 Months',
    category: 'Advanced IT',
    description: 'Understand computer network architectures, TCP/IP, OSI model, IP addressing, subnetting, routers, switches, and LAN/WLAN setup.',
    longDescription: 'Master the foundational protocols and hardware that connect the internet. Learn OSI model layers, IPv4/IPv6 addressing, subnet calculations, router and switch configuration basics, wireless networks, and network troubleshooting.',
    fee: 'Inquire at Campus',
    skillsGained: [
      'OSI Model & TCP/IP Protocol Suite',
      'IPv4 Addressing & Subnetting Calculations',
      'Routers, Switches & Network Topologies',
      'LAN & Wireless WLAN Setup & Security',
      'Network Diagnostic Tools (Ping, Traceroute, Wireshark)',
      'DNS, DHCP & Gateway Troubleshooting'
    ],
    syllabus: [
      'Introduction to Computer Networks & Topologies',
      'The OSI 7-Layer Model & TCP/IP Stack Explained',
      'IP Addressing: IPv4 Classes, Subnetting & IPv6 Basics',
      'Network Hardware: Ethernet Cables, Switches & Routers',
      'Configuring Local Area Networks (LAN) & Wi-Fi Security',
      'Network Troubleshooting with Diagnostic Command Line Tools'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 28
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing Fundamentals',
    duration: '2 Months',
    category: 'Advanced IT',
    description: 'Explore cloud architectures, IaaS, PaaS, SaaS, virtualization, storage, compute instances, and modern cloud deployment models.',
    longDescription: 'Understand modern cloud infrastructure that powers global software. Learn cloud service models (IaaS, PaaS, SaaS), public vs private clouds, virtual machines, cloud object storage, serverless concepts, and basic cloud security.',
    fee: 'Inquire at Campus',
    skillsGained: [
      'Cloud Service Models (IaaS, PaaS, SaaS)',
      'Virtualization & Cloud Compute Instances',
      'Cloud Storage Types (Block, Object, File Storage)',
      'Cloud Networking & Content Delivery Networks (CDNs)',
      'Identity & Access Management (IAM) Basics',
      'Cost Estimation & Cloud Deployment Architecture'
    ],
    syllabus: [
      'Introduction to Cloud Computing & Historical Evolution',
      'Cloud Models: Public, Private, Hybrid & Multi-Cloud',
      'Compute Services: Virtual Machines & Container Concepts',
      'Cloud Storage Solutions & Database Management',
      'Cloud Security Fundamentals & IAM Access Controls',
      'Deploying Simple Web Applications to Cloud Hosting'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 29
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design with Figma',
    duration: '2 Months',
    category: 'Advanced IT',
    description: 'Design intuitive web and mobile app user interfaces, wireframes, interactive prototypes, and design systems using Figma.',
    longDescription: 'Master user experience and user interface design in Figma. Learn user research, information architecture, wireframing, typography, color styles, auto layout, component variants, interactive prototyping, and developer handoff.',
    fee: 'PKR 15,000',
    skillsGained: [
      'User Experience (UX) Research & User Journeys',
      'Wireframing & Information Architecture',
      'Figma Auto Layout & Responsive UI Design',
      'Component Libraries, Variants & Design Systems',
      'Interactive Clickable Prototyping',
      'Design Specifications & Developer Handoff'
    ],
    syllabus: [
      'Foundations of UX: User Personas, User Flows & Problem Statements',
      'Figma Workspace: Frames, Grids, Shapes & Vector Networks',
      'Wireframing: Low-Fidelity to High-Fidelity App Layouts',
      'Auto Layout, Constraints & Responsive Component Variants',
      'Building Design Systems: Color Tokens, Typography & Buttons',
      'Interactive Prototyping, Micro-Interactions & Developer Handoff'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 30
  },
  {
    id: 'odoo-erp',
    title: 'Odoo / ERP Fundamentals',
    duration: '2 Months',
    category: 'Advanced IT',
    description: 'Learn Enterprise Resource Planning (ERP) concepts, inventory, sales, invoicing, purchasing, and business workflow management using Odoo.',
    longDescription: 'Discover how modern enterprises manage end-to-end operations using ERP systems like Odoo. Learn sales pipelines, purchase orders, inventory tracking, warehouse management, invoicing workflows, and reporting.',
    fee: 'Inquire at Campus',
    skillsGained: [
      'Enterprise Resource Planning (ERP) Core Concepts',
      'Odoo CRM & Sales Order Processing',
      'Purchasing & Vendor Management Workflows',
      'Inventory Control & Warehouse Stock Tracking',
      'Automated Invoicing & Customer Billing Modules',
      'Business Performance Analytics & ERP Reporting'
    ],
    syllabus: [
      'Introduction to ERP Architecture & Business Process Integration',
      'Odoo Platform Navigation & User Role Permissions',
      'Sales & CRM: Managing Leads, Quotations & Sales Orders',
      'Purchase Management: Vendor Quotations & Purchase Orders',
      'Inventory & Warehouse: Stock Adjustments, Barcodes & Tracking',
      'Invoicing & Financial Reporting: Generating Statements & Analytics'
    ],
    featured: false,
    status: 'Coming Soon',
    order: 31
  }
];

export const SERVICES: Service[] = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Services',
    description: 'We help businesses increase visibility, generate leads, and achieve measurable growth online.',
    iconName: 'Megaphone',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    features: [
      'Targeted social media lead generation funnels',
      'High-conversion copywriting & text pitches',
      'Active content planning & monthly scheduling',
      'Data tracking, analysis & client reports setup',
      'Optimized digital advertising strategies'
    ],
    techStack: ['Meta Pixel', 'TikTok Ads Manager', 'Mailchimp', 'Google Analytics'],
    category: 'agency'
  },
  {
    id: 'seo-services',
    title: 'Search Engine Optimization (SEO)',
    description: 'Improve search rankings and attract targeted organic traffic.',
    iconName: 'Search',
    imageUrl: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&w=900&q=80',
    features: [
      'Comprehensive keyword research & strategy setups',
      'Technical SEO audit & speed improvements',
      'On-Page HTML & content optimization',
      'White-Hat backlink building & authority metrics',
      'Google Search Console setup & crawl reports'
    ],
    techStack: ['Google Search Console', 'Ahrefs', 'SEMrush', 'Moz', 'Screaming Frog'],
    category: 'agency'
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    description: 'Professional management of Facebook, Instagram, LinkedIn, TikTok, and other social platforms.',
    iconName: 'Users',
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=900&q=80',
    features: [
      'Custom visual content designing & brand kits',
      'Algorithmic content calendar schedules preparation',
      'Responsive comment moderation and customer queries handling',
      'Kinetic social Reels captioning & video edits',
      'Multiplatform performance reports & insight metrics'
    ],
    techStack: ['Buffer', 'Meta Business Suite', 'Canva Pro', 'CapCut Desktop'],
    category: 'agency'
  },
  {
    id: 'fb-ig-ads',
    title: 'Facebook & Instagram Advertising',
    description: 'Targeted advertising campaigns designed to generate leads and sales.',
    iconName: 'Target',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80',
    features: [
      'Custom demographic segment targeting lists',
      'Highly engaging Carousel & Slide Ads designing',
      'Data-driven Custom Audience retargeting setups',
      'Dynamic budget allocations & bidding optimization',
      'A/B Campaign testing & transparent ROI stats'
    ],
    techStack: ['Meta Ads Manager', 'Lookalike Audiences', 'Dynamic Ads', 'Facebook SDK'],
    category: 'agency'
  },
  {
    id: 'google-ads-management',
    title: 'Google Ads Management',
    description: 'Reach potential customers through highly optimized Google advertising campaigns.',
    iconName: 'TrendingUp',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    features: [
      'Targeted search keyword bid configurations',
      'Stunning display ad vector banner assets design',
      'Smart Google Merchant e-commerce setup',
      'YouTube video ads sequence setup & scripting',
      'Detailed cost-per-acquisition metric tracking logs'
    ],
    techStack: ['Google Ads', 'Keyword Planner', 'Google Tag Manager', 'Performance Max'],
    category: 'agency'
  },
  {
    id: 'website-development',
    title: 'Website Design & Development',
    description: 'Professional, responsive, and SEO-friendly websites tailored to your business needs.',
    iconName: 'Laptop',
    imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80',
    features: [
      'Stunning layouts built with modern responsive frameworks',
      'Lightning-fast page rendering & code compliance',
      'Integrated Contact Forms & Live Map widgets',
      'Secure CMS database backings setup',
      'Complete domain direction setup with free SSL security'
    ],
    techStack: ['HTML5/CSS3', 'Bootstrap 5', 'React', 'Tailwind CSS', 'WordPress'],
    category: 'agency'
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    description: 'High-quality graphics, videos, blogs, and marketing content that engages audiences.',
    iconName: 'Video',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
    features: [
      'Kinetic Reels drafting, sound integration & transitions',
      'Aesthetic social post vectors & catalog graphics',
      'Search optimized commercial blogs & descriptive writing',
      'Custom infographics designing for maximum online distribution',
      'High-impact visual story structures'
    ],
    techStack: ['Adobe Premiere Pro', 'CapCut Pro', 'Adobe Photoshop', 'AI Copywriting'],
    category: 'agency'
  },
  {
    id: 'branding-identity',
    title: 'Branding & Identity Design',
    description: 'Logo design, business branding, and visual identity development.',
    iconName: 'Palette',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=80',
    features: [
      'Exquisite, scalable high-definition business logos',
      'Clean typography & brand rules specification books',
      'Corporate assets style guidelines (Business cards, headers)',
      'Interactive wireframes mockups for presentation pitches',
      'Complete vectorized files delivered (AI, SVG, PDF)'
    ],
    techStack: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Brand Tokens'],
    category: 'agency'
  },
  {
    id: 'ecommerce-solutions',
    title: 'E-Commerce Solutions',
    description: 'Complete setup and management of online stores and digital sales systems.',
    iconName: 'ShoppingCart',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=900&q=80',
    features: [
      'Responsive Shopify & WooCommerce stores construction',
      'Dynamic inventory, SKU counts & prices logging',
      'Secure checks & local shipping configurations setup',
      'COD payment partner integrations systems',
      'Smart exit-intent & promotional discount triggers'
    ],
    techStack: ['Shopify', 'WooCommerce', 'Stripe API', 'COD Couriers APIs', 'Inventory Logs'],
    category: 'agency'
  },
  {
    id: 'stamps-seals',
    title: 'Custom Stamps & Official Seals Maker',
    description: 'Design and manufacturing of custom official stamps, self-inking seals, signatures, and company stamps.',
    iconName: 'Award',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=900&q=80',
    features: [
      'Premium durable self-inking mechanisms & dater stamps',
      'Precision laser-engraved rubber text paths & logo seals',
      'Multiple custom colors and dimensions options',
      'Express in-shop assembly & manufacturing under 1 hour',
      'Corporate signature replicas & bulk department batches'
    ],
    techStack: ['Shiny Stamp Systems', 'Trodat Seals', 'Vector Silhouettes', 'Laser Engraving'],
    category: 'local-hub'
  },
  {
    id: 'wedding-invitations',
    title: 'Wedding & Event Invitation Cards',
    description: 'Stunning graphic design layouts and custom printing for wedding cards, family events, and formal invitations.',
    iconName: 'Heart',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    features: [
      'Elegant traditional calligraphy & modern English scripts',
      'Custom design layouts paired with high-quality card stock',
      'Custom luxury envelopes, wax sealing, and fold patterns',
      'Complete color theme mockups and customer revisions',
      'Express bulk printing & shipping packs ready under 3 days'
    ],
    techStack: ['CorelDraw Templates', 'CMYK Printing Plates', 'Silk Screen Print', 'Art Card Stocks'],
    category: 'local-hub'
  },
  {
    id: 'memos-billbooks',
    title: 'Bill Books & Cash Memos',
    description: 'Bespoke corporate bookkeeping bills, receipts books, transaction logs, and cash memos layouts.',
    iconName: 'Receipt',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=80',
    features: [
      'Carbonless (NCR) self-copy duplicates & triplicates sheets',
      'Custom logo watermarks, sequential numbering & company credentials',
      'High-quality binding with durable perforation splits',
      'Personalized ledger grids and column outlines',
      'Wholesale bulk packages for local retail shops & agencies'
    ],
    techStack: ['NCR Copier Sheet', 'Perfora Bindings', 'Adobe InDesign', 'Offset Plate Lines'],
    category: 'local-hub'
  },
  {
    id: 'resume-cv-design',
    title: 'Professional CV & Resume Design',
    description: 'Modern, high-impact resume and CV writing to highlight your skillsets and fast-track job hirings.',
    iconName: 'FileText',
    imageUrl: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&w=900&q=80',
    features: [
      'ATS-compliant clean grid layouts & section pairings',
      'Professional executive summary writing & keywords injection',
      'Editable custom source files delivered alongside PDF prints',
      'Tailored portfolios & cover letter templates drafting',
      'Interactive QR-code resume linkage integrations options'
    ],
    techStack: ['Canva Pro Editors', 'ATS Schema Standard', 'LaTeX Resume Templates', 'MS Word Docs'],
    category: 'local-hub'
  },
  {
    id: 'visiting-cards',
    title: 'Business & Visiting Cards',
    description: 'Make a powerful first impression with high-grade, custom-designed commercial corporate business cards.',
    iconName: 'CreditCard',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80',
    features: [
      'Matte, glossy, and velvet lamination textures available',
      'Spot UV coating, elegant rounded corners, and gold foil borders',
      'Modern, uncluttered layouts with clear visual text hierarchy',
      'Double-sided printing setups with custom color matching',
      'Low minimum order counts with quick 48-hour delivery'
    ],
    techStack: ['Vector Outlines', '350 GSM Art Card', 'Offset CMYK Press', 'Lamination Films'],
    category: 'local-hub'
  },
  {
    id: 'online-admissions-jobs',
    title: 'Online Admissions & Job Applications Portal Support',
    description: 'Expert guidance for university online admissions, scholarship portal filings, and government job registrations.',
    iconName: 'FileSpreadsheet',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80',
    features: [
      'A-to-Z profile setup on PPSC, FPSC, NTS, OTS, and HEC portals',
      'Precise formatting of digital documents (sizing, compressions)',
      'Direct online invoice challan deposits & printable confirmations',
      'Real-time sms and portal application tracking assistance',
      'Complete school board examination and registration file preparation'
    ],
    techStack: ['Government Job Hubs', 'FPSC & PPSC Portals', 'HEC Equivalence System', 'BISE Board'],
    category: 'local-hub'
  },
  {
    id: 'composing-exam-papers',
    title: 'Multilingual Composing & Exam Papers Publishing',
    description: 'Professional multilingual text typing, book composing, translation scripts, and school terminal examination sheets.',
    iconName: 'Type',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
    features: [
      'Flawless layout typography on specialized editors & MS Word',
      'School examination papers designing with custom marks tally matrices',
      'Mathematical formulas, scientific equation sets, and chart inserts',
      'Calligraphic font alignments for formal manuscripts',
      'Proofreading services with 100% grammar and spelling corrections'
    ],
    techStack: ['Word Processing Pro', 'MathType Equation Editor', 'Microsoft Word Pro', 'Adobe Acrobat'],
    category: 'local-hub'
  },
  {
    id: 'stamp-papers-bform',
    title: 'Legal Drafting, Stamp Papers & Form Support',
    description: 'Official stamp papers legal drafting, computerized Nadra B-Form form completions, and BISE board files prep.',
    iconName: 'Scale',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=900&q=80',
    features: [
      'Legal drafting for land affidavits, lease terms, and agreements',
      'Nadra computerized B-Form verification and entry processing helpers',
      'Matric and Intermediate boards examination enrollment filings',
      'Domicile application setups & local government certificate drafts',
      'Attested document packaging services matching official rules'
    ],
    techStack: ['NADRA Software Support', 'PLD Legal Frameworks', 'BISE Board Registrars', 'Affidavit Formats'],
    category: 'local-hub'
  },
  {
    id: 'remittance-billpayments',
    title: 'Digital Financial Services & Bill Payments',
    description: 'Secure money transfers, mobile wallet transactions, utility bill payments, cash deposits, withdrawals, and branchless banking services.',
    iconName: 'Wallet',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=900&q=80',
    features: [
      'Instant money transfers through mobile wallets and branchless banking networks',
      'Electricity, gas, water, internet, education, and utility bill payments',
      'Cash deposits, withdrawals, and account financial services',
      'Digital receipts, transaction verification, and SMS confirmations',
      'Secure transactions with real-time records and official receipts'
    ],
    techStack: [
      'Mobile Wallet Services',
      'Branchless Banking Networks',
      'Digital Payment Platforms',
      'Fintech Solutions'
    ],
    category: 'local-hub'
  },
  {
    id: 'video-production-management',
    title: 'Video Editing & YouTube Channel Management',
    description: 'Professional video editing, short-form content creation, and YouTube channel management services for creators and brands.',
    iconName: 'Video',
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80',
    features: [
      'Professional editing for YouTube videos, podcasts, and promo content',
      'Creation of engaging Shorts, Reels, and TikTok vertical videos',
      'Custom thumbnails, transitions, motion graphics, and audio mix',
      'YouTube channel setup, optimization, and content publishing',
      'SEO-friendly titles, descriptions, tags, and playlist organization'
    ],
    techStack: [
      'Adobe Premiere Pro',
      'After Effects',
      'CapCut',
      'YouTube Studio'
    ],
    category: 'local-hub'
  },
  {
    id: 'ebook-services',
    title: 'E-Book Writing & Publishing',
    description: 'Professional e-book writing, design, formatting, and publishing services for authors and educators.',
    iconName: 'BookOpen',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80',
    features: [
      'Professional e-book writing & ghostwriting',
      'Custom cover design & visual branding',
      'EPUB, PDF & Kindle formatting services',
      'Publishing assistance on major platforms',
      'Editing, proofreading & content optimization'
    ],
    techStack: ['Kindle Direct Publishing', 'Adobe InDesign', 'Canva Pro', 'EPUB Editor'],
    category: 'agency'
  },
  {
    id: 'offset-printing',
    title: 'Offset Printing Services',
    description: 'High-quality offset, digital, packaging, and specialty printing solutions for businesses and brands.',
    iconName: 'Printer',
    imageUrl: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=900&q=80',
    features: [
      'Offset printing for books, brochures, forms & bulk orders',
      'Digital printing for personalized and short-run projects',
      'Flexible packaging printing for boxes, labels & product packaging',
      'Specialized printing including flexographic solutions',
      'Premium print quality with fast turnaround times'
    ],
    techStack: ['Offset Printing', 'Digital Printing', 'Flexographic Printing'],
    category: 'agency'
  },
  {
    id: 'excel-templates-projects',
    title: 'Excel Templates & Automation Projects',
    description: 'Custom Excel solutions, automated spreadsheets, dashboards, and business templates to improve productivity.',
    iconName: 'Sheet',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    features: [
      'Custom Excel templates for business and personal use',
      'Automated spreadsheets with formulas and calculations',
      'Interactive dashboards, reports & data visualization',
      'Inventory, finance, payroll & project tracking systems',
      'Excel data cleaning, analysis & workflow optimization'
    ],
    techStack: ['Microsoft Excel', 'Power Query', 'Pivot Tables', 'VBA Automation'],
    category: 'agency'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Muhammad Farhan',
    role: 'Full Stack Engineer at TechSoft',
    courseOrService: 'Web & App Development',
    feedback: 'Trained from Future Gates IT Center and verifiable on their official online system. My career transformed completely! The instructors are real-world engineers, and the certification check helped me clear technical job interviews immediately.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Zainab Rehman',
    role: 'Lead UI/UX Designer at DevStudio',
    courseOrService: 'Graphic Design & UI/UX',
    feedback: 'The curriculum is super practical! We designed actual client wireframes, brand vectors, and interactive Figma prototypes. The institute verified my certificate online, and employers trusted it right away.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Hamza Bilal',
    role: 'AI Automation Consultant & Top-Rated Freelancer',
    courseOrService: 'Artificial Intelligence & Tools',
    feedback: 'The AI & Tools masterclass under Sir Javed Hattar opened huge opportunities for me. I learned prompt engineering, workflow automations, and landed international clients on Upwork earning in USD within weeks!',
    rating: 5
  },
  {
    id: 't4',
    name: 'Asma Bibi',
    role: 'Operations Coordinator at Global Logistics',
    courseOrService: 'Computer Information Technology (CIT)',
    feedback: 'The CIT diploma gave me immense confidence. Advanced Excel modeling, document design, and office automation are practical. I landed a high-paying administrative coordinator role right after completion!',
    rating: 5
  },
  {
    id: 't5',
    name: 'Usman Ghani',
    role: 'WordPress Developer & Agency Owner',
    courseOrService: 'WordPress Development',
    feedback: 'From knowing zero coding to building custom e-commerce websites and WooCommerce portals. Future Gates IT Center gave me hands-on project labs and step-by-step freelancing mentorship.',
    rating: 5
  },
  {
    id: 't6',
    name: 'Fatima Noor',
    role: 'Content Creator & Commercial Video Editor',
    courseOrService: 'Video Editing & YouTube Automation',
    feedback: 'The video editing lab equipped me with Premiere Pro and CapCut desktop mastery. I now manage 3 YouTube channels and edit viral reels for international digital marketing agencies.',
    rating: 5
  },
  {
    id: 't7',
    name: 'Tariq Mahmood',
    role: 'CTO, RetailHub Pakistan',
    courseOrService: 'E-Commerce Software Solutions',
    feedback: 'We outsourced our e-commerce platform to Future Gates IT Center agency unit. They engineered a blazing-fast web portal with secure administrative dashboards. Exceptional coding quality and prompt support!',
    rating: 5
  },
  {
    id: 't8',
    name: 'Bilal Ahmed',
    role: 'Digital Marketing Specialist',
    courseOrService: 'Digital Marketing & SEO',
    feedback: 'Real ad budget execution and live SEO ranking audits! I learned Meta Ads, TikTok ads, and Google Ads management from scratch. Best technical institute in Khushab and Punjab.',
    rating: 5
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: 'blog-freelance-pakistan',
    slug: 'how-to-start-freelancing-in-pakistan-step-by-step',
    title: 'How to Start Freelancing in Pakistan: Step-by-Step Career Blueprint',
    excerpt: 'A practical, actionable roadmap for Pakistani students and professionals to launch successful freelance careers on Upwork, Fiverr, and LinkedIn with direct payment withdrawal via Payoneer and local banks.',
    category: 'Freelancing',
    author: 'Javed Hattar',
    publishedAt: 'August 2026',
    readTime: '6 min read',
    tags: ['Freelancing', 'Upwork', 'Fiverr', 'Payoneer', 'Career'],
    highlight: 'Turn high-demand IT skills into sustainable international foreign exchange income.',
    content: [
      'Freelancing offers Pakistani youths and professionals a direct pathway to global career independence and international foreign exchange earnings. However, succeeding as a freelancer requires a strategic combination of a marketable technical skill, a polished portfolio, and a client-focused communication style.',
      'The first fundamental step is mastering a specific, high-demand technical skill rather than trying to offer everything at once. Whether you specialize in WordPress website design, Adobe Photoshop graphic design, Premiere Pro video editing, or Microsoft Excel financial modeling, narrow your focus to solve specific client problems efficiently.',
      'Next, construct a 100% complete profile on platforms like Upwork and Fiverr. Avoid generic bios. Instead, clearly articulate what business problem you solve, who your ideal client is, and include verifiable work samples or live project links demonstrating your capabilities.',
      'When submitting proposals or bidding on projects, avoid copy-pasting template text. Read the client’s job description thoroughly, reference their specific requirements in the first two sentences, and propose a concise implementation plan with realistic turnaround times.',
      'Finally, establish a reliable financial remittance pipeline. Link your freelance platform earnings to a verified Payoneer or international banking account connected to local Pakistani commercial banks for secure, low-fee foreign currency withdrawals.'
    ]
  },
  {
    id: 'blog-ai-prompt-engineering',
    slug: 'practical-ai-tools-and-prompt-engineering-guide',
    title: 'Practical AI Tools & Prompt Engineering Guide for 2026',
    excerpt: 'Master practical generative AI workflows, large language model prompt engineering techniques, and automation tools that double workplace productivity.',
    category: 'Artificial Intelligence',
    author: 'Ayesha Khan',
    publishedAt: 'July 2026',
    readTime: '5 min read',
    tags: ['AI', 'Prompt Engineering', 'Automation', 'Productivity'],
    highlight: 'AI does not replace professionals; professionals using AI replace those who do not.',
    content: [
      'Generative Artificial Intelligence has shifted from an experimental novelty into an essential productivity driver across modern office workplaces, marketing agencies, and software development teams.',
      'Effective prompt engineering relies on structured instruction frameworks. Rather than asking vague questions, provide the AI model with a clear role, explicit context, step-by-step task requirements, and desired output formatting (such as tables, markdown bullets, or code snippets).',
      'For content creators and marketers, tools like Gemini and ChatGPT allow rapid drafting of marketing funnels, email sequences, and SEO outlines. However, human editorial oversight, fact-checking, and brand voice alignment remain critical to producing credible, high-ranking content.',
      'In administrative and business environments, AI tools can automate spreadsheet formula generation, synthesize complex meeting transcripts, and draft professional bilingual correspondence in minutes.',
      'At Future Gates IT Center, our practical AI curriculum teaches students how to combine AI prompts with real-world design, development, and administrative workflows for maximum commercial impact.'
    ]
  },
  {
    id: 'blog-graphic-design-guide',
    slug: 'graphic-design-fundamentals-and-tools-guide',
    title: 'Graphic Design Fundamentals: Tools, Typography & Commercial Branding',
    excerpt: 'An industry overview of visual design principles, Adobe Illustrator vectors, Photoshop raster manipulation, and Canva branding for commercial marketing assets.',
    category: 'Design',
    author: 'Zainab Rehman',
    publishedAt: 'July 2026',
    readTime: '5 min read',
    tags: ['Graphic Design', 'Photoshop', 'Illustrator', 'Branding'],
    highlight: 'Great design is clear visual communication that guides user action and builds brand trust.',
    content: [
      'Graphic design is the visual cornerstone of every modern business, from local retail storefronts to global software enterprises. Understanding core design principles is what distinguishes professional designers from casual software users.',
      'Mastering color harmony, visual hierarchy, optical alignment, and contrast ensures that marketing banners, social media posts, and billboards immediately capture and direct the viewer’s attention.',
      'Adobe Illustrator serves as the gold standard for vector graphics, logo creation, and print-ready branding assets that scale infinitely without pixelation. Complementing this, Adobe Photoshop provides deep pixel manipulation, photo retouching, and mock-up rendering.',
      'For rapid digital agency turnarounds, tools like Canva and CorelDraw allow designers to quickly adapt brand assets into social media carousels, business cards, letterheads, and wedding invitation layouts.',
      'Building a strong commercial portfolio featuring 4 to 6 diverse, realistic client projects—such as complete corporate brand identities or product packaging—is the most effective way to win high-paying freelance contracts.'
    ]
  },
  {
    id: 'blog-video-editing-workflow',
    slug: 'video-editing-workflow-premiere-capcut-guide',
    title: 'Professional Video Editing Workflow: Premiere Pro, CapCut & YouTube Growth',
    excerpt: 'Learn the modern video editing pipeline for producing high-retention YouTube long-form content, viral TikTok reels, and commercial promotional videos.',
    category: 'Video Production',
    author: 'Fatima Noor',
    publishedAt: 'June 2026',
    readTime: '5 min read',
    tags: ['Video Editing', 'Premiere Pro', 'CapCut', 'YouTube', 'Reels'],
    highlight: 'Pacing, audio clarity, and visual hooks are the three pillars of high-retention video content.',
    content: [
      'Short-form and long-form video content currently dominates digital media consumption. Content creators, marketing agencies, and corporate brands constantly seek skilled video editors to turn raw footage into compelling narratives.',
      'A professional editing workflow begins with efficient file organization, timeline bin structuring, and rough cut assembly. Trimming dead air and maintaining tight narrative pacing within the first 3 seconds is crucial for viewer retention.',
      'Audio quality often matters more than visual resolution. Professional editors use multi-band compressors, parametric equalizers, noise reduction filters, and balanced background music ducking to ensure spoken dialogue is crisp and intelligible.',
      'While Adobe Premiere Pro and After Effects handle advanced multi-camera workflows, motion graphics, and color grading, tools like CapCut Desktop enable rapid kinetic captioning, sound effect layering, and vertical aspect ratio exports.',
      'Students learning video production at Future Gates IT Center gain hands-on practice editing real client podcasts, promo commercials, and social reels with verifiable project certification.'
    ]
  },
  {
    id: 'blog-wordpress-web-design',
    slug: 'building-fast-wordpress-websites-in-2026',
    title: 'Building Fast, Secure WordPress Websites in 2026',
    excerpt: 'A comprehensive guide to developing professional WordPress and WooCommerce websites with responsive page builders, optimized speed, and robust security.',
    category: 'Web Development',
    author: 'Usman Ghani',
    publishedAt: 'June 2026',
    readTime: '5 min read',
    tags: ['WordPress', 'Web Development', 'WooCommerce', 'Elementor', 'SEO'],
    highlight: 'Powering over 40% of the web, WordPress is the fastest way to launch functional client portals and stores.',
    content: [
      'WordPress remains the dominant content management system globally, powering everything from local business websites to high-volume e-commerce catalogs.',
      'Modern WordPress development focuses on responsive page building using clean block builders or Elementor Pro, structured custom post types, and lightweight child themes that ensure fast load times.',
      'For e-commerce, WooCommerce provides an extensible foundation. Integrating local Pakistani payment gateways, Cash-on-Delivery (COD) checkout flows, and automated SMS order notifications creates seamless customer shopping experiences.',
      'Website performance directly impacts search engine rankings and conversions. Implementing server-level caching (such as LiteSpeed or Redis), next-generation WebP image compression, and minimal plugin bloat keeps page load times under 2 seconds.',
      'Security is paramount: always enforce strong administrative passwords, install trusted security plugins, configure automated cloud backups, and keep WordPress core and plugin updates synchronized.'
    ]
  },
  {
    id: 'blog-office-productivity',
    slug: 'office-productivity-with-ms-office-and-ai',
    title: 'Office Productivity with Microsoft Office & AI Automation',
    excerpt: 'From automated Excel formulas and dynamic pivot tables to AI-assisted Word documentation, discover how to streamline daily office administration.',
    category: 'Productivity',
    author: 'Bilal Ahmed',
    publishedAt: 'May 2026',
    readTime: '4 min read',
    tags: ['MS Office', 'Excel', 'Word', 'Productivity', 'Office Skills'],
    highlight: 'Commanding advanced Excel and Word automation makes you an indispensable corporate asset.',
    content: [
      'Microsoft Office remains the foundational software standard for administrative coordinators, accountants, data analysts, and executive assistants worldwide.',
      'In Microsoft Excel, moving beyond basic arithmetic to master lookup functions (XLOOKUP, VLOOKUP), logical conditional formulas (IF, AND, OR), and dynamic Pivot Tables enables swift processing of large financial and inventory datasets.',
      'Microsoft Word formatting skills—including automated table of contents, style sheet consistency, multi-column layouts, and mail merges—ensure that business proposals, official letters, and legal notices look impeccably professional.',
      'Pairing Microsoft Office with modern AI tools accelerates draft generation for memos, spreadsheet data cleaning, and PowerPoint slide presentation scripting.',
      'Our Microsoft Office Professional course at Future Gates IT Center provides comprehensive hands-on practice, preparing candidates for both private sector corporate jobs and government administrative postings.'
    ]
  },
  {
    id: 'blog-computer-fundamentals',
    slug: 'essential-computer-skills-for-modern-workplace',
    title: 'Essential Computer & CIT Skills Every Beginner Must Master',
    excerpt: 'A foundational overview of computer operating systems, touch typing speed optimization, cloud storage management, and internet security for career starters.',
    category: 'Computer Skills',
    author: 'Javed Hattar',
    publishedAt: 'May 2026',
    readTime: '4 min read',
    tags: ['Computer Skills', 'CIT', 'Typing', 'Internet Safety', 'Basics'],
    highlight: 'Solid digital fundamentals are the prerequisite for every advanced IT specialization.',
    content: [
      'Before diving into advanced coding or graphic design, every student and professional must build rock-solid foundational computer literacy.',
      'Touch typing proficiency is one of the highest-leverage digital habits. Increasing typing speed from 20 to 45+ Words Per Minute (WPM) directly saves hundreds of working hours every year while reducing transcription errors.',
      'Systematic file management—including logical directory nesting, file naming conventions, cloud backup synchronization via Google Drive, and zip archive compression—prevents catastrophic data loss and improves workplace collaboration.',
      'Understanding internet safety practices—such as identifying phishing emails, configuring two-factor authentication (2FA), and maintaining active antivirus protections—safeguards personal and organizational data.',
      'The Certificate in Information Technology (CIT) and Computer Fundamentals programs at Future Gates IT Center guide absolute beginners into confident, digitally empowered professionals.'
    ]
  },
  {
    id: 'blog-digital-marketing-growth',
    slug: 'digital-marketing-growth-strategies-2026',
    title: 'Digital Marketing & Paid Ad Strategies for Local and Global Businesses',
    excerpt: 'How businesses and freelancers use Meta Ads Manager, Google Search Ads, and organic content funnels to scale customer acquisition and revenue.',
    category: 'Digital Marketing',
    author: 'Faisal Khan',
    publishedAt: 'April 2026',
    readTime: '5 min read',
    tags: ['Digital Marketing', 'Meta Ads', 'Google Ads', 'SEO', 'Lead Gen'],
    highlight: 'Data-driven marketing turns advertising spend from an expense into a predictable revenue engine.',
    content: [
      'Digital marketing has replaced traditional billboard and print advertising as the most cost-effective method for acquiring qualified leads and customer sales.',
      'A successful marketing strategy starts with a clear understanding of the customer journey: Awareness, Consideration, and Conversion. Creating targeted top-of-funnel educational content builds trust before presenting sales offers.',
      'Meta Ads (Facebook & Instagram) excel at interest and demographic targeting. By designing eye-catching visual creatives, writing benefit-driven ad copy, and setting up the Meta Pixel for conversion tracking, advertisers can achieve predictable Return on Ad Spend (ROAS).',
      'Google Search Ads capture high-intent buyers who are actively searching for specific solutions, while organic Search Engine Optimization (SEO) provides long-term, free search visibility.',
      'Students in our Digital Marketing course gain practical experience managing real ad budgets, analyzing conversion metrics, and delivering transparent monthly client performance reports.'
    ]
  },
  {
    id: 'blog-seo-essentials',
    slug: 'seo-essentials-for-small-business-websites',
    title: 'SEO Essentials for Small Business Websites: Local Ranking Guide',
    excerpt: 'A practical, white-hat search engine optimization checklist to help local businesses and websites achieve organic top rankings on Google Search and Maps.',
    category: 'Marketing',
    author: 'Faisal Khan',
    publishedAt: 'April 2026',
    readTime: '4 min read',
    tags: ['SEO', 'Local SEO', 'Google Search', 'Web Traffic'],
    highlight: 'Organic search rankings deliver continuous, compounding visibility without paying for every click.',
    content: [
      'Search Engine Optimization (SEO) ensures that when prospective clients search for products, services, or training in their region, your website appears at the top of Google search results.',
      'On-Page SEO begins with search intent keyword research. Every page should feature a unique H1 title, descriptive meta descriptions, clean URL slugs, and semantic headings that comprehensively answer user queries.',
      'Technical SEO ensures that search engine crawlers can efficiently index your site. This includes generating XML sitemaps, maintaining an accurate robots.txt file, enforcing HTTPS encryption, and optimizing Core Web Vitals for mobile speed.',
      'For local businesses, maintaining consistent Name, Address, and Phone (NAP) data, embedding a genuine Google Map, and building verified Google Business Profile credentials establishes local geographical authority.',
      'Future Gates IT Center offers both hands-on SEO training courses for students and professional SEO ranking audit services for business clients.'
    ]
  },
  {
    id: 'blog-verifiable-certificates',
    slug: 'why-verifiable-it-certificates-matter',
    title: 'Why Online Verifiable IT Certificates Matter for Your Career',
    excerpt: 'How online verifiable credentials, transparent transcripts, and practical project portfolios help students pass employer background checks and secure jobs.',
    category: 'Career',
    author: 'Javed Hattar',
    publishedAt: 'March 2026',
    readTime: '4 min read',
    tags: ['Certification', 'Career', 'Verification', 'IT Diploma'],
    highlight: 'Employers value verified credentials backed by demonstrable real-world project portfolios.',
    content: [
      'In today’s competitive job market, an unverified paper certificate is no longer enough. Employers, freelancing clients, and academic institutions demand instant, verifiable proof of technical competence.',
      'An online verifiable certificate system allows recruiters to enter a student’s Roll Number or Certificate ID into an institutional database to confirm course completion, session dates, and academic grades instantly.',
      'Future Gates IT Center provides every graduate with an official transcript indexed 24/7 on our public verification portal. This transparency builds trust and eliminates credentials fraud.',
      'Equally important is the student’s project portfolio. When job candidates can present both an online verifiable certificate and live project URLs demonstrating their code, design, or marketing execution, hiring decisions become simple.',
      'Whether applying for local corporate positions in Pakistan or bidding on international freelance contracts, verified education provides a significant competitive advantage.'
    ]
  }
];

export const STUDENT_RESULTS: StudentResult[] = [
  {
    rollNo: 'FG-2026-101',
    name: 'Muhammad Farhan',
    fatherName: 'Muhammad Siddique',
    enrollmentNo: 'ENR-2101-0925',
    courseName: 'Full-Stack Web Development',
    duration: '6 Months',
    session: 'Jan 2026 - Jun 2026',
    grade: 'A+',
    percentage: 92,
    theoryMarks: 185,
    practicalMarks: 245,
    vivaMarks: 32,
    totalMarks: 462,
    maxMarks: 500,
    issueDate: '2026-06-01',
    certificateNo: 'CER-2026-50912',
    verificationStatus: 'Verified',
    remarks: 'Outstanding software prototyping capability and problem solving skill. Recommended for Full-Stack development positions.'
  },
  {
    rollNo: 'FG-2026-102',
    name: 'Zainab Rehman',
    fatherName: 'Abdul Rehman',
    enrollmentNo: 'ENR-2102-0926',
    courseName: 'Professional Graphic Design & UI/UX Expert',
    duration: '3 Months',
    session: 'Jan 2026 - Mar 2026',
    grade: 'A',
    percentage: 86,
    theoryMarks: 172,
    practicalMarks: 218,
    vivaMarks: 40,
    totalMarks: 430,
    maxMarks: 500,
    issueDate: '2026-04-10',
    certificateNo: 'CER-2026-30219',
    verificationStatus: 'Verified',
    remarks: 'Demonstrated precise aesthetic alignment and excellent typography systems understanding. Highly creative.'
  },
  {
    rollNo: 'FG-2026-103',
    name: 'Ahmed Ali',
    fatherName: 'Bashir Ahmed',
    enrollmentNo: 'ENR-2103-0927',
    courseName: 'Mobile App Development (React Native & Flutter)',
    duration: '6 Months',
    session: 'Jan 2026 - Jun 2026',
    grade: 'B',
    percentage: 77,
    theoryMarks: 154,
    practicalMarks: 195,
    vivaMarks: 36,
    totalMarks: 385,
    maxMarks: 500,
    issueDate: '2026-06-01',
    certificateNo: 'CER-2026-50981',
    verificationStatus: 'Verified',
    remarks: 'Good structural design integration. Showed high dedication in responsive multi-screen rendering tasks.'
  },
  {
    rollNo: 'FG-2026-104',
    name: 'Fatima Noor',
    fatherName: 'Tariq Mahmood',
    enrollmentNo: 'ENR-2104-0928',
    courseName: 'Computer Information Technology (CIT)',
    duration: '3 Months',
    session: 'Jan 2026 - Mar 2026',
    grade: 'A+',
    percentage: 95,
    theoryMarks: 190,
    practicalMarks: 247,
    vivaMarks: 38,
    totalMarks: 475,
    maxMarks: 500,
    issueDate: '2026-04-10',
    certificateNo: 'CER-2026-30114',
    verificationStatus: 'Verified',
    remarks: 'Exceptional typing performance (65 WPM) and brilliant automation data reporting structures.'
  }
];

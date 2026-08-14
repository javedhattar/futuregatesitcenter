/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlogPost, Course, Service, StudentResult, Testimonial } from './types';

export const COURSES: Course[] = [
  {
    id: 'computer-fundamentals',
    title: 'Computer Fundamentals',
    duration: '3 Months',
    category: 'Technical',
    description: 'Learn essential computer operations, internet usage, typing, file management, and productivity tools.',
    longDescription: 'This foundational digital skills program is designed to guide beginners into professional computer operation. Perfect for students, office helpers, and individuals looking to start an online career, it covers everything from physical hardware mechanics to secure file structures, typing efficiency, and modern cloud collaboration suites.',
    fee: 'PKR 8,000',
    skillsGained: [
      'Touch Typing Speed (WPM optimization)',
      'Secure File Management & Directories',
      'Standard Google Drive & Cloud syncing',
      'Smart Google Workspace tools',
      'Antivirus & online browsing safety rules',
      'System installation & troubleshooting'
    ],
    syllabus: [
      'Introduction to Computer System Interfaces & Peripherals',
      'Windows OS Administration, Control Panels & Shortcuts',
      'Rigorous Touch Typing Practice (Aims for 40+ WPM)',
      'Organizing data: Folder nesting, compression and backups',
      'Web Browsing dynamics, smart searching, and bookmarking',
      'Google Workspace: Docs formatting & Drive folders sharing',
      'Internet safety: Secure passwords, Email phishing audits, and Antivirus defaults'
    ],
    featured: true
  },
  {
    id: 'ms-office',
    title: 'Microsoft Office Professional',
    duration: '3 Months',
    category: 'Technical',
    description: 'Master Word, Excel, PowerPoint, Outlook, and professional office productivity skills.',
    longDescription: 'An industry-standard office automation course that transforms you into a highly efficient executive assistant, coordinator, or data analyst. You will master detailed document layouts in Word, advanced mathematical models in Excel, stunning animated pitches in PowerPoint, and automated incoming email workflows in Outlook.',
    fee: 'PKR 10,000',
    skillsGained: [
      'Advanced MS Word template creation',
      'In-depth MS Excel Formulas & Data Pivot Filters',
      'MS PowerPoint Dynamic templates and presentations',
      'MS Outlook Meeting dispatch & Inbox rules',
      'Multi-currency spreadsheet auditing',
      'Professional CV & Business Invoice printing'
    ],
    syllabus: [
      'MS Word: Custom newsletters layout, Table designs, Page dimensions & Mail Merges',
      'MS Excel Basics: Formulas, Cells referencing, formatting, Custom styling',
      'MS Excel Advanced: VLOOKUP, HLOOKUP, Dynamic Pivot Tables, Logic gates IF/AND/OR',
      'MS PowerPoint: Creating customized master cards, animations, slides transition',
      'MS Outlook: Contacts logging, task sheets, filters, out-of-office setup',
      'Document conversion formats (Converting PDF to Word/Excel without losing styles)'
    ],
    featured: true
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    duration: '3 Months',
    category: 'Design',
    description: 'Learn Adobe Photoshop, Illustrator, Canva, branding, logo design, social media design, and print media.',
    longDescription: 'Master the elements of visual balance, typography pairing, contrast, and color psychology to engineer professional commercial brand vectors, custom logos, stunning social media ad carousels, and high-impact physical print billboards using the industry\'s best platforms.',
    fee: 'PKR 15,000',
    skillsGained: [
      'Adobe Illustrator vector trace & paths',
      'Adobe Photoshop layered masking & retouches',
      'Canva team kit administration',
      'Logo identity design execution',
      'Bespoke social media carousel grids',
      'Print-ready business assets rendering'
    ],
    syllabus: [
      'Design Theory Core: Alignment, Proximity, Golden ratio, and hex structures',
      'Adobe Illustrator: Mastering paths, shape builders, pen tool and SVG vectors',
      'Adobe Photoshop: Color grading, smart objects, crop layers, background remove',
      'Canva platforms: Editing templates, organizing assets, and scheduling content',
      'Corporate Identity: Logo brainstorming, brand cards, and commercial labels design',
      'Social Graphics: Sizing layouts for FB, Instagram banners, stories & TikTok covers',
      'Prep for Print: CMYK parameters, safe bleed boundaries, PDF vector export guidelines'
    ],
    featured: true
  },
  {
    id: 'web-design-dev',
    title: 'Web Design & Development',
    duration: '6 Months',
    category: 'Development',
    description: 'Build modern responsive websites using HTML, CSS, JavaScript, Bootstrap, WordPress, and modern web technologies.',
    longDescription: 'Our hallmark technical training course for aspiring web engineers. Go from zero layout expertise to designing premium mobile-responsive templates, writing client-side dynamic validation codes, styling grids with robust utility classes, and structuring complete dynamic e-commerce catalogs on WordPress.',
    fee: 'PKR 25,000',
    skillsGained: [
      'Semantic HTML5 & responsive CSS3 stylesheets',
      'Bootstrap grid and container utilities',
      'Standard client-side JavaScript DOM logic',
      'WordPress setup with full custom settings',
      'XAMPP installation & active local sandbox stage',
      'Modern web hosting (FTP, Domains, DNS, SSL)'
    ],
    syllabus: [
      'Semantic HTML5 Layout nesting & form parameters',
      'CSS3: Styling properties, borders, spacing models, and keyframe animations',
      'Responsive design guidelines: CSS Media queries and Bootstrap grid utilities',
      'JavaScript fundamentals: Var declarations, Conditionals, Loops, Event listeners',
      'WordPress setup: Local database configs, themes mounting & general setup',
      'E-commerce Integration: WooCommerce catalogs, billing, and cart page creations',
      'Site Launch: SSL certificate activation, redirect mappings, and live deployment'
    ],
    featured: true
  },
  {
    id: 'wordpress-dev',
    title: 'WordPress Development',
    duration: '3 Months',
    category: 'Development',
    description: 'Create professional business websites, blogs, e-commerce stores, and portfolio websites.',
    longDescription: 'Command 43%+ of the entire web. This specialized backend course empowers students to quickly engineer state-of-the-art websites for corporate companies and clients. Learn premium theme setups, master Elementor Pro grid builders, manage active WooCommerce portals, and optimize site speed.',
    fee: 'PKR 12,500',
    skillsGained: [
      'Elementor Pro page builder layouts',
      'WooCommerce online cart architectures',
      'Custom plugin integration & settings',
      'WordPress security patches installation',
      'Caching and speed performance audits',
      'Database migration & backup procedures'
    ],
    syllabus: [
      'Understanding WordPress File Structuring & Hosting Servers',
      'Direct Elementor Pro Grid designing: Creating Headers, Footers & Loops templates',
      'Building professional service landing pages & contact forms with Recaptcha',
      'Setting up WooCommerce: Creating products categories, stock counts & tax rates',
      'Speed optimization: Asset compression, Lazy loading & Caching setups (LiteSpeed)',
      'Database backings: Migrating from local sandbox to live hosting dashboard'
    ],
    featured: false
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    duration: '3 Months',
    category: 'Short Courses',
    description: 'Learn SEO, Social Media Marketing, Google Ads, Content Marketing, Email Marketing, and Marketing Strategy.',
    longDescription: 'Master the high-income mechanisms used to attract targeted customers, scale sales conversions, write hyper-converting ad copy, configure pixel tracking scripts, and manage daily client advertising budget metrics.',
    fee: 'PKR 15,000',
    skillsGained: [
      'Marketing Funnel layout and metrics',
      'Converting copy development skills',
      'Setup analytics metrics and track outcomes',
      'Highly targeted digital audience segmentation',
      'Paid advertising strategy configurations',
      'Campaign performance auditing and reporting'
    ],
    syllabus: [
      'Understanding Customer Lifecycles: Lead generation, Nurture & Conversion',
      'Content Marketing: Blogging, scheduling calendars & dynamic lead magnets',
      'Constructing professional email automation campaigns on Mailchimp',
      'Data parameters: Adding pixel codes & setting custom conversion scopes',
      'Calculating Budgeting metrics, ROI targets, and Cost-Per-Click averages',
      'Drafting and presenting executive agency client marketing files'
    ],
    featured: true
  },
  {
    id: 'seo',
    title: 'Search Engine Optimization (SEO)',
    duration: '3 Months',
    category: 'Short Courses',
    description: 'Master keyword research, on-page SEO, off-page SEO, technical SEO, and ranking strategies.',
    longDescription: 'Get discovered at the top of Google Search Page Results. Learn how to audit, optimize, and rank websites naturally. Understand key metrics like search intent, optimize crawl configurations, identify slow page speeds, and construct authority backlink profiles.',
    fee: 'PKR 15,000',
    skillsGained: [
      'Targeted Keyword research metrics',
      'On-Page HTML Tags Optimization',
      'XML Sitemaps & robots directory logs',
      'Link Building & backlink analysis',
      'Ahrefs, SEMrush & Moz diagnostics',
      'Google Search Console setup'
    ],
    syllabus: [
      'How Search Engine Crawlers index web pages',
      'Targeting Search Queries: Volume, Cost-per-click, Competition analysis',
      'On-Page: Layout title tags, Meta outlines, slug formats & media alt targets',
      'Technical SEO: Canonical URL logs, schema markup codes & fast core vitals',
      'Off-Page: Secure outreach guest blog posts, index directories, and link audits',
      'Auditing: Competitor crawling failures & fixing console index warnings'
    ],
    featured: false
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    duration: '3 Months',
    category: 'Short Courses',
    description: 'Learn Facebook, Instagram, TikTok, LinkedIn, and YouTube marketing techniques.',
    longDescription: 'Unlock viral audience growth and transaction scale across social channels. Master organic content creation, reel video pacing, community comment handling, social page branding, and detailed client reports configurations.',
    fee: 'PKR 12,000',
    skillsGained: [
      'Social Platform Algorithmic parameters',
      'Kinetic social content generation script writing',
      'Managing community engagement profiles',
      'Creating structured brand guidelines',
      'Audience demographic clustering tactics',
      'Monthly performance dashboard design'
    ],
    syllabus: [
      'Deconstructing major social platforms: FB, Insta, TikTok, LinkedIn & YT',
      'Drafting clean social sheets: Formulating content topics & visual prompts',
      'Video Reels scheduling: Audio sync, title captions & hashtag tools',
      'Fostering organic growth: Moderation rules, direct messaging setups',
      'Designing and presenting standard monthly social reports to clients'
    ],
    featured: false
  },
  {
    id: 'ecommerce-management',
    title: 'E-Commerce Management',
    duration: '3 Months',
    category: 'Short Courses',
    description: 'Manage online stores, product listings, customer handling, and online sales strategies.',
    longDescription: 'Learn exactly how to set up, operate, and optimize e-commerce stores, catalog listings, inventory sheets, checkouts, local Cash-On-Delivery partners, and support operations.',
    fee: 'PKR 15,000',
    skillsGained: [
      'Product listing and catalog copywriting',
      'Inventory sheets data tracking',
      'Courier portals integration (COD)',
      'Customer support ticket systems',
      'Checkout conversions optimization',
      'Supplier outsourcing protocols'
    ],
    syllabus: [
      'E-commerce Roadmaps: Standalone Shopify vs Multiprovider WooCommerce',
      'Adding Products: Sizing, configurations, descriptions, search optimizing titles',
      'Order Processings: Fulfilling tickets, packing checks, and printing labels',
      'Logistics: Partnering with leading local couriers (TCS, Leopard, BlueEx)',
      'Constructing responsive customer responses for complaints and query resolutions',
      'Conversion strategies: Installing exit intents, coupons, and upsell packages'
    ],
    featured: false
  },
  {
    id: 'freelancing',
    title: 'Freelancing Training',
    duration: '3 Months',
    category: 'Short Courses',
    description: 'Learn how to build a professional profile, acquire clients, and work on global freelancing platforms.',
    longDescription: 'Build a bridge from technical skills to international foreign currency earnings. Learn how to curate world-class profiles on Upwork, Fiverr, and Guru, compile high-conversion proposals, handle clients smoothly, and withdraw secure remittances to Pakistan.',
    fee: 'PKR 10,000',
    skillsGained: [
      '100% complete Upwork Profile setup',
      'Fiverr gig SEO optimizations',
      'High-Conversion proposal drafting',
      'Hourly tracker verification measures',
      'Payoneer & Local Bank payout linkages',
      'Professional client dispute management'
    ],
    syllabus: [
      'Ecosystem of freelance platforms: Direct jobs, fixed milestones, hourly rates',
      'Writing bespoke bid proposals that bypass global filters and win calls',
      'Designing beautiful responsive PDF project portfolios matching target niches',
      'How to safely log hours, verify payments and negotiate premium retainers',
      'Creating fully verified financial remittance accounts (Payoneer, Wise, Local Banks)'
    ],
    featured: true
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    duration: '3 Months',
    category: 'Design',
    description: 'Professional video editing using Adobe Premiere Pro, CapCut, After Effects, and content creation tools.',
    longDescription: 'An immersive digital video production and editing blueprint. Master video timeline management, audio noise filtering, transitions, color lookup profiles, and kinetic captions to launch a career creating viral shorts.',
    fee: 'PKR 15,000',
    skillsGained: [
      'Adobe Premiere Pro timeline cutting',
      'After Effects keyframe tracking styles',
      'CapCut desktop dynamic captions presets',
      'Audio leveling & noise filter controls',
      'Aspect ratio responsive layouts rendering',
      'Advanced LUT color grade configurations'
    ],
    syllabus: [
      'Foundations of Audio/Video formats, resolutions and bitrates',
      'Premiere Pro essentials: Cutting clips, assembling drafts',
      'Sound editing: Layering SFX, audio enhancements & ambient soundtrack syncing',
      'Pacing hooks: Cutting with speed charts and smooth slides transitions',
      'Motion graphics: Designing headers, lower-thirds and callout assets',
      'CapCut workflow: Mass-producing high-retention video stories and shorts'
    ],
    featured: false
  },
  {
    id: 'accounting-courses',
    title: 'Accounting Courses',
    duration: '3 Months',
    category: 'Short Courses',
    description: 'Learn bookkeeping, accounting fundamentals, financial statements, and Excel techniques for accountants.',
    longDescription: 'A practical accounting program covering core bookkeeping practices, financial reporting, reconciliation, and Excel skills tailored for accounting workflows. Ideal for beginners and office staff aiming to handle day-to-day financial tasks.',
    fee: 'PKR 10,000',
    skillsGained: [
      'Basic bookkeeping and ledger management',
      'Preparing income statements and balance sheets',
      'Bank reconciliation and petty cash handling',
      'Excel for accounting: formulas, pivot tables, and reporting'
    ],
    syllabus: [
      'Introduction to accounting principles and terminology',
      'Recording transactions: Journals and ledgers',
      'Financial statements: Preparation and analysis',
      'Practical Excel for accounting and reporting'
    ],
    featured: false
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence & Tools',
    duration: '3 Months',
    category: 'Artificial Intelligence',
    description: 'Gain practical AI skills in machine learning workflows, automation, generative tools, and business intelligence.',
    longDescription: 'Learn the fundamentals of modern artificial intelligence from model selection to deployment. This course prepares you for data-driven automation, AI-powered business tools, and practical prompt engineering in real-world workflows.',
    fee: 'PKR 18,000',
    skillsGained: [
      'Aesthetic Prompt Engineering layouts',
      'Fine-tuning custom agent assistants',
      'AI Voicing & cloning setup options',
      'Automated spreadsheet formulas script writing',
      'Midjourney & Canva AI artwork design',
      'Bulk campaigns auto-scheduling systems',
      'Prompt engineering for large language models',
      'Business automation with AI workflows',
      'Dataset preparation and evaluation',
      'AI image generation and content automation',
      'Model deployment basics and performance tuning'
    ],
    syllabus: [
      'Core LLM architectures & prompt parameters',
      'Mastering prompt techniques: Zero-shot, Few-shot & Chain-of-Thought formulas',
      'AI Copywriting: Drafting sales copies, SEO blogs, and captions with Gemini/GPT',
      'Visuals: Generating hyper-realistic illustrations in Midjourney & Stable Diffusion',
      'Automating workflows: Bulk writing content matrices to bulk schedule posts in minutes',
      'Ethics of Artificial Intelligence: Copyright checks and editing outputs',
      'Introduction to AI concepts and practical use cases',
      'Overview of machine learning, neural networks, and model training',
      'Dataset selection, cleaning, and validation techniques',
      'Generative AI tools for copywriting, design, and process automation',
      'Deploying AI workflows and building smart productivity assistants',
      'Ethics, safety, and responsible AI for business applications'
    ],
    featured: true
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
      'Complete school board files and affiliation paper assemblies'
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
    id: 'blog-ai-tips',
    slug: 'artificial-intelligence-for-small-businesses',
    title: 'Artificial Intelligence for Small Businesses',
    excerpt: 'Explore practical AI applications that help local teams automate workflows, improve customer service, and accelerate sales without heavy technical overhead.',
    category: 'Artificial Intelligence',
    author: 'Ayesha Khan',
    publishedAt: 'June 2026',
    readTime: '4 min read',
    tags: ['AI', 'Business', 'Automation'],
    highlight: 'Simple AI tools for faster business results.',
    content: [
      'Small businesses can use AI to automate customer replies, schedule appointments, and analyze sales without hiring a full technical team. Tools like chatbots and automated email flows save time and reduce repetitive work.',
      'Start by identifying the repetitive tasks that take the most time. Common candidates include lead follow-up, quote requests, and invoice reminders. Then pick a simple AI tool that integrates with your current workflow, such as WhatsApp automation or email automation via a business platform.',
      'AI does not have to be expensive. Use browser-based tools for drafting marketing copy, answering customer questions, and producing proposal templates. You can also leverage spreadsheet automation to summarize sales data and highlight trends without manual formulas.',
      'Protect your business by using AI tools that respect privacy and do not expose customer data. Keep your prompts simple, validate outputs manually, and build a culture of learning around the new workflow so your team adopts the tools confidently.'
    ]
  },
  {
    id: 'blog-digital-skills',
    slug: 'top-5-digital-skills-employers-want-now',
    title: 'Top 5 Digital Skills Employers Want Now',
    excerpt: 'A quick guide to the most in-demand IT and design skills, including web development, digital marketing, and certification-ready tools.',
    category: 'Career',
    author: 'Ali Raza',
    publishedAt: 'May 2026',
    readTime: '3 min read',
    tags: ['Career', 'Skills', 'Training'],
    content: [
      'Employers are looking for candidates who can deliver results quickly. The top digital skills right now are web development, graphic design, social media marketing, search engine optimization, and AI-assisted content creation.',
      'Web development remains strong because every business needs a modern website. Learn basic HTML, CSS, and JavaScript, then build a portfolio project that shows a real landing page or store.',
      'Digital marketing skills are also in demand. Understanding how to create campaigns on Facebook, Instagram, and Google, combined with an ability to analyze performance, makes a candidate very attractive.',
      'Finally, being able to work with AI tools to generate copy, design social graphics, or automate tasks is a differentiator. Show employers that you can blend technical skills with productivity tools to create more value.'
    ]
  },
  {
    id: 'blog-web-design-trends',
    slug: 'web-design-trends-that-convert-in-2026',
    title: 'Web Design Trends That Convert in 2026',
    excerpt: 'Learn which website design patterns, accessibility choices, and conversion-led layouts are winning customers this year.',
    category: 'Design',
    author: 'Sara Malik',
    publishedAt: 'April 2026',
    readTime: '5 min read',
    tags: ['Web Design', 'UX', 'Conversion'],
    content: [
      'Web visitors prefer clear, fast pages with strong visual hierarchy. Use large headlines, clear call-to-action buttons, and concise sections so people can scan quickly and convert faster.',
      'Accessibility is not optional. Provide good color contrast, readable fonts, and keyboard-friendly navigation. This not only helps all visitors, it also improves search engine trust.',
      'Use real images or clean illustrations to build trust. A well-designed hero section with a headline, supporting paragraph, and an action button is one of the most effective conversion patterns.',
      'Keep mobile design a priority. More than half of users browse on phones, so layouts should work on narrow screens with easy touch targets and short text blocks.'
    ]
  },
  {
    id: 'blog-office-automation',
    slug: 'office-productivity-with-ms-office-and-ai',
    title: 'Office Productivity with MS Office & AI',
    excerpt: 'From automated Excel dashboards to AI-assisted document workflows, discover how to save hours every week with practical office tools.',
    category: 'Productivity',
    author: 'Bilal Ahmed',
    publishedAt: 'March 2026',
    readTime: '4 min read',
    tags: ['MS Office', 'AI', 'Automation'],
    content: [
      'MS Office is still one of the best platforms for office automation. Using Excel formulas, templates, and a few built-in shortcuts can improve accuracy and productivity significantly.',
      'Combine Excel with AI-assisted writing tools to create better reports faster. For example, draft the first version of a summary in the AI assistant, then paste it into Word and format it as a professional document.',
      'Automate common tasks such as generating invoices, tracking attendance, and preparing monthly summaries. Templates and named ranges in Excel reduce manual work and help maintain a consistent standard.',
      'As the next step, explore AI tools that can summarize a spreadsheet, generate meeting notes, or draft email replies. This makes your office practice more agile without adding extra headcount.'
    ]
  },
  {
    id: 'blog-freelance-launch',
    slug: 'start-freelancing-with-a-strong-portfolio',
    title: 'Start Freelancing with a Strong Portfolio',
    excerpt: 'Step-by-step guidance for building a freelancer profile, pitching clients, and winning projects with practical sample work.',
    category: 'Freelancing',
    author: 'Mariam Shah',
    publishedAt: 'February 2026',
    readTime: '4 min read',
    tags: ['Freelance', 'Portfolio', 'Clients'],
    content: [
      'A strong portfolio is the best way to attract freelance clients. Show real examples of work, even if those are practice projects or mockups, and explain the impact you delivered.',
      'Choose a clear niche for your profile. For example, website landing pages for local shops, graphic assets for social media, or complete resume packages for job seekers.',
      'Write a professional profile description that highlights what you do, who you help, and the results clients can expect. Keep the language simple and client-focused.',
      'Use client-friendly samples and testimonials whenever possible. Even a few well-presented case studies are better than a long list of generic skills.'
    ]
  },
  {
    id: 'blog-seo-basics',
    slug: 'seo-essentials-for-small-business-websites',
    title: 'SEO Essentials for Small Business Websites',
    excerpt: 'A beginner-friendly SEO checklist that helps local businesses rank faster and show up in search results without paid ads.',
    category: 'Marketing',
    author: 'Faisal Khan',
    publishedAt: 'January 2026',
    readTime: '3 min read',
    tags: ['SEO', 'Marketing', 'Organic Traffic'],
    content: [
      'SEO begins with a strong website structure and clear headings. Use descriptive page titles, clean URLs, and relevant headings to make your content easier for search engines to index.',
      'Focus on the customer’s intent. Write short, useful content that answers common questions and solves problems. This improves user experience and helps your pages rank more reliably.',
      'Add local business information clearly. Include your address, phone number, and operating hours so search engines can match your site to local search queries.',
      'Use fresh, regular updates when possible. Simple blog posts or news updates help search engines see that your site is active and relevant.'
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

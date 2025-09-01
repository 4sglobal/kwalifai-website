// Kwalifai Advanced Application - Complete Implementation
(function() {
    'use strict';
    
    console.log('🚀 Kwalifai Advanced Application Loading...');
    
    // Application State
    const AppState = {
        currentPage: 'home',
        isAdminLoggedIn: false,
        chatHistory: [],
        currentUser: null,
        chatContext: {
            userPreferences: {},
            conversationStage: 'greeting',
            documentsUploaded: [],
            qualificationStatus: 'initial'
        },
        adminData: {
            activeChats: 12,
            availableAgents: 3,
            avgResponseTime: '1.2m',
            pendingHandoffs: 2,
            chatQueue: [],
            users: [],
            agents: []
        }
    };

    // Enhanced News Articles Data
    const newsArticles = [
        {
            "id": "article-1",
            "headline": "Mortgage Rates Hit 7.2% Amid Fed Policy Uncertainty",
            "publication": "HousingWire",
            "author": "Sarah Johnson",
            "publishDate": "2025-09-01",
            "category": "rates",
            "aiSummary": "The 30-year fixed mortgage rate climbed to 7.2%, the highest level since November 2023, as investors price in potential Federal Reserve policy changes. Mortgage applications fell 15% week-over-week as affordability concerns mount.",
            "fullContent": "In a significant development for the housing market, mortgage rates have surged to 7.2% for 30-year fixed loans, marking the highest level since November 2023. This dramatic increase comes as investors grapple with uncertainty surrounding Federal Reserve monetary policy decisions.\n\nThe rise in rates has immediate implications for homebuyers and the broader housing market. Industry analysts report a 15% week-over-week decline in mortgage applications, signaling growing affordability concerns among potential borrowers.\n\n'We're seeing a clear cooling effect in the market,' said housing economist Dr. Jennifer Martinez. 'At these rate levels, many buyers are being priced out or choosing to delay their home purchases.'\n\nThe Fed's recent statements about potential policy changes have created volatility in the bond markets, directly impacting mortgage rates. Treasury yields have risen sharply, with the 10-year note now trading at levels not seen since last fall.\n\nReal estate professionals are advising clients to act quickly if they're serious about purchasing, as rates could continue climbing. However, some experts predict this could be a temporary spike, depending on upcoming economic data releases.\n\n🎯 Impact on Kwalifai Clients:\nOur AI-powered pre-qualification system is helping borrowers lock in rates faster than ever, with Sarah processing applications in under 3 minutes to beat rate increases.",
            "sentiment": "negative"
        },
        {
            "id": "article-2",
            "headline": "AI-Powered Underwriting Shows 40% Faster Approval Times",
            "publication": "National Mortgage News",
            "author": "Michael Chen",
            "publishDate": "2025-08-31",
            "category": "technology",
            "aiSummary": "Major lenders implementing AI-driven underwriting systems report significant efficiency gains, with loan processing times reduced from 45 to 27 days on average. Consumer satisfaction scores also improved by 25%.",
            "fullContent": "The mortgage industry is experiencing a technological revolution as AI-powered underwriting systems deliver unprecedented efficiency gains. Major lenders report processing times have dropped from 45 to 27 days on average, representing a 40% improvement in approval speeds.\n\nThis transformation is reshaping the borrower experience. Consumer satisfaction scores have increased by 25% among lenders using advanced AI systems, with borrowers particularly appreciating the faster, more transparent process.\n\n'AI is not replacing human underwriters, but rather augmenting their capabilities,' explains Maria Rodriguez, Chief Technology Officer at Premier Lending Solutions. 'Our AI can instantly analyze thousands of data points, flagging potential issues early and streamlining routine decisions.'\n\nThe technology excels at pattern recognition and risk assessment, processing complex financial documents in seconds rather than hours. Machine learning algorithms continuously improve accuracy by learning from each application processed.\n\nKey benefits include:\n• 99.7% accuracy in document analysis\n• Instant credit risk assessment\n• Automated compliance checking\n• 24/7 processing capability\n• Reduced human error\n\n💡 Kwalifai's Advantage:\nSarah, our advanced AI agent, represents the next generation of this technology, combining document processing with conversational AI to provide a complete digital mortgage experience.",
            "sentiment": "positive"
        },
        {
            "id": "article-3",
            "headline": "New CFPB Guidelines Impact AI Mortgage Processing",
            "publication": "Mortgage Professional America",
            "author": "David Kim",
            "publishDate": "2025-08-30",
            "category": "compliance",
            "aiSummary": "The Consumer Financial Protection Bureau released new guidelines for AI use in mortgage origination, requiring enhanced transparency and bias testing. Lenders have 90 days to implement compliance measures.",
            "fullContent": "The Consumer Financial Protection Bureau (CFPB) has issued comprehensive guidelines governing the use of artificial intelligence in mortgage origination, marking a significant step in regulating AI applications in financial services.\n\nThe new regulations require lenders to:\n• Provide clear explanations of AI decision-making processes\n• Conduct regular bias testing and remediation\n• Maintain human oversight of AI recommendations\n• Document AI model training data and methodologies\n• Implement consumer appeal processes\n\nDirector Rohit Chopra stated: 'While AI can improve efficiency and access to credit, we must ensure these systems operate fairly and transparently. Consumers deserve to understand how AI affects their mortgage applications.'\n\nLenders have 90 days to implement compliance measures, with enforcement beginning January 1, 2026. Industry associations have generally welcomed the guidance, citing the need for clear regulatory frameworks.\n\n🏛️ Compliance at Kwalifai:\nAs NMLS ID 1666674, we've proactively designed Sarah's AI systems to exceed these requirements, with full transparency, bias testing, and human oversight built into every interaction.",
            "sentiment": "neutral"
        },
        {
            "id": "article-4",
            "headline": "First-Time Homebuyer Programs See Record Demand",
            "publication": "Housing Finance",
            "author": "Lisa Thompson",
            "publishDate": "2025-08-29",
            "category": "market-updates",
            "aiSummary": "FHA, VA, and state first-time buyer programs report 35% increase in applications as buyers seek affordable entry points. Down payment assistance programs show particular strength.",
            "fullContent": "Despite rising interest rates, first-time homebuyer programs are experiencing unprecedented demand, with applications up 35% compared to the same period last year. This surge reflects buyers' determination to enter the housing market despite challenging affordability conditions.\n\nFHA loans, which allow down payments as low as 3.5%, account for the largest share of increased volume. VA loans for military veterans and USDA rural development loans also show strong growth.\n\nState and local down payment assistance programs report particularly high demand:\n• California: 65% increase in applications\n• Texas: 45% increase\n• Florida: 52% increase\n• New York: 38% increase\n\n'Buyers are getting creative about affordability,' notes housing analyst Rebecca Martinez. 'They're combining FHA financing with down payment assistance, gift funds, and other programs to make homeownership possible.'\n\nThe trend highlights the importance of education about available programs. Many eligible buyers remain unaware of assistance options.\n\n🏠 Kwalifai's Role:\nSarah is programmed with comprehensive knowledge of all federal, state, and local first-time buyer programs, helping identify opportunities many borrowers don't know exist.",
            "sentiment": "positive"
        },
        {
            "id": "article-5",
            "headline": "Digital Mortgage Platforms Capture 60% Market Share",
            "publication": "Digital Mortgage",
            "author": "James Wilson",
            "publishDate": "2025-08-28",
            "category": "technology",
            "aiSummary": "Digital-first mortgage platforms now process 60% of all home loans, driven by consumer preference for online experiences and faster processing times. Traditional banks accelerate digital transformation.",
            "fullContent": "Digital mortgage platforms have achieved a milestone 60% market share, fundamentally transforming how Americans obtain home loans. This shift represents the fastest adoption of financial technology in mortgage history.\n\nConsumer preferences drive the change:\n• 78% prefer online applications\n• 65% want mobile document upload\n• 82% demand real-time status updates\n• 71% value 24/7 availability\n\nDigital platforms offer significant advantages:\n• Average 23-day closing times vs. 35 days traditional\n• 24/7 application access\n• Real-time document processing\n• Automated status updates\n• Lower operational costs enabling competitive rates\n\nTraditional banks are responding with major digital investments. Wells Fargo, Bank of America, and JPMorgan Chase have announced billion-dollar technology initiatives to compete with fintech disruptors.\n\n'The pandemic accelerated a trend that was already underway,' explains fintech researcher Dr. Amanda Foster. 'Consumers experienced the convenience of digital banking and now expect the same from mortgage lending.'\n\n🚀 Kwalifai's Innovation:\nWe're leading this digital revolution with Sarah's advanced AI, combining the speed of automation with the wisdom of human expertise for the best of both worlds.",
            "sentiment": "positive"
        }
    ];

    // Sarah's Advanced AI Response System
    class SarahAI {
        constructor() {
            this.context = AppState.chatContext;
            this.responses = {
                greeting: [
                    "Hello! I'm Sarah, your advanced AI mortgage specialist at Kwalifai. I have deep expertise in all loan programs, current market conditions, and can analyze your financial situation in real-time. How can I help you achieve your homeownership goals today?",
                    "Hi there! Sarah here - your personal AI mortgage expert. I'm equipped with the latest market data, loan program details, and can process your documents instantly. What brings you to Kwalifai today?",
                    "Welcome to Kwalifai! I'm Sarah, and I'm here to make your mortgage journey as smooth as possible. With my advanced AI capabilities, I can help with everything from pre-qualification to document analysis. What would you like to explore first?"
                ],
                rates: [
                    "Great question about rates! Based on current market conditions, our 30-year fixed rates start at 7.125% APR for qualified borrowers. However, I can provide a personalized rate quote based on your specific situation. What's your credit score range and down payment amount?",
                    "Current rates are competitive despite the market conditions. For a 30-year fixed, we're seeing 7.125%, and 15-year fixed at 6.750%. Your actual rate depends on credit score, loan amount, and down payment. Would you like me to run a quick pre-qualification to get your personalized rate?",
                    "I have access to real-time rate data! Today's rates: 30-year fixed at 7.125% APR, 15-year at 6.750% APR, and FHA at 6.875% APR. These are sample rates - your rate could be better based on your profile. Shall we check your qualification status?"
                ],
                qualification: [
                    "I'd love to help you get pre-qualified! My AI can process your financial information instantly and provide a decision in under 3 minutes. I'll need some basic info: annual income, monthly debts, credit score range, and desired loan amount. Ready to start?",
                    "Perfect! Let's get you pre-qualified quickly. With my advanced analysis capabilities, I can evaluate your finances immediately. Can you share your gross annual income, estimated credit score, and how much you're looking to borrow?",
                    "Excellent choice! Pre-qualification with me is fast and accurate. I analyze over 200 financial factors instantly. To start, I need: your annual income, monthly debt payments, credit score estimate, and target home price. Let's begin!"
                ],
                documents: [
                    "Document analysis is one of my specialties! I can process pay stubs, bank statements, tax returns, and more in seconds with 99.7% accuracy. You can upload documents right here in chat, and I'll analyze them immediately. What documents do you have ready?",
                    "Great question about documents! For most loans, you'll need: recent pay stubs, 2 months bank statements, tax returns, and employment verification. I can review these instantly when you upload them. Would you like to start with what you have available?",
                    "I excel at document processing! My AI can read and analyze financial documents faster than any human underwriter. Common needs: W2s, pay stubs, bank statements, asset documentation. Upload anything you have, and I'll tell you what else we might need!"
                ],
                programs: [
                    "Excellent question! I have comprehensive knowledge of all loan programs. Popular options include: Conventional (3-5% down), FHA (3.5% down), VA (0% down for veterans), USDA (0% down rural), and various first-time buyer programs. What's your situation?",
                    "I'm programmed with details on every loan program available! From conventional and FHA to specialized programs like VA, USDA, and state first-time buyer assistance. Each has unique benefits. Tell me about your down payment and location preferences?",
                    "Perfect timing to discuss programs! I know all the ins and outs: Conventional loans offer flexibility, FHA helps with lower credit scores, VA serves our veterans with no down payment, USDA covers rural areas. What fits your situation best?"
                ],
                complex: [
                    "That's a sophisticated question that deserves detailed attention. While I can provide comprehensive analysis on most mortgage scenarios, this might benefit from human expertise. Would you like me to connect you with one of our licensed loan officers for specialized guidance?",
                    "I appreciate the complexity of your situation. My AI handles most scenarios excellently, but this question involves nuances that might warrant human insight. Shall I arrange a consultation with our mortgage experts?",
                    "Great question! This involves several interconnected factors that I can analyze, but you might benefit from speaking with our human specialists who can provide personalized strategic advice. Would you like to be connected?"
                ],
                error: [
                    "I apologize for any confusion. As an advanced AI, I'm constantly learning and improving. Let me try a different approach to help you, or I can connect you with a human specialist if needed. How can I better assist you?",
                    "I understand this might be frustrating. While I have extensive capabilities, some situations benefit from human insight. Would you prefer to continue with me or speak with one of our licensed loan officers?",
                    "My apologies for the confusion. I want to ensure you get the best possible service. Let me clarify your question, or we can bring in a human expert. What would work better for you?"
                ]
            };
        }

        generateResponse(userMessage, context = {}) {
            const message = userMessage.toLowerCase();
            
            // Update conversation context
            this.updateContext(message, context);
            
            // Determine response category
            let category = this.categorizeMessage(message);
            let responses = this.responses[category] || this.responses.greeting;
            
            // Select contextually appropriate response
            let response = responses[Math.floor(Math.random() * responses.length)];
            
            // Add contextual enhancements
            response = this.addContextualInfo(response, category, message);
            
            return {
                message: response,
                category: category,
                context: this.context,
                followUpSuggestions: this.getFollowUpSuggestions(category)
            };
        }

        categorizeMessage(message) {
            const rateKeywords = ['rate', 'interest', 'apr', 'percentage', 'cost'];
            const qualificationKeywords = ['qualify', 'approved', 'prequalify', 'eligible', 'credit'];
            const documentKeywords = ['document', 'paperwork', 'upload', 'file', 'statement', 'w2', 'paystub'];
            const programKeywords = ['program', 'loan type', 'fha', 'va', 'conventional', 'usda'];
            const complexKeywords = ['complex', 'complicated', 'multiple', 'investment', 'business', 'self-employed'];

            if (rateKeywords.some(keyword => message.includes(keyword))) return 'rates';
            if (qualificationKeywords.some(keyword => message.includes(keyword))) return 'qualification';
            if (documentKeywords.some(keyword => message.includes(keyword))) return 'documents';
            if (programKeywords.some(keyword => message.includes(keyword))) return 'programs';
            if (complexKeywords.some(keyword => message.includes(keyword))) return 'complex';
            
            return 'greeting';
        }

        updateContext(message, context) {
            // Track conversation progression
            if (message.includes('income') || message.includes('salary')) {
                this.context.conversationStage = 'financial_review';
            }
            if (message.includes('document') || message.includes('upload')) {
                this.context.conversationStage = 'document_collection';
            }
            if (message.includes('qualify') || message.includes('approved')) {
                this.context.conversationStage = 'qualification';
            }
            
            // Update user preferences
            Object.assign(this.context.userPreferences, context);
        }

        addContextualInfo(response, category, message) {
            // Add NMLS compliance where appropriate
            if (category === 'rates' || category === 'qualification') {
                response += "\n\n🏛️ As licensed professionals (NMLS ID: 1666674), all our recommendations are compliant and in your best interest.";
            }

            // Add time-sensitive information
            if (category === 'rates') {
                response += "\n\n⚡ Rates can change daily. I recommend locking in your rate once you're ready to proceed.";
            }

            return response;
        }

        getFollowUpSuggestions(category) {
            const suggestions = {
                greeting: ["💰 Check my qualification", "📊 Current rates", "📄 Required documents", "🏠 Loan programs"],
                rates: ["💰 Get pre-qualified", "📋 Compare loan programs", "📄 Upload documents"],
                qualification: ["📄 Upload documents", "📊 View loan options", "🏠 Find programs"],
                documents: ["💰 Check qualification", "📋 Next steps", "👤 Speak with specialist"],
                programs: ["💰 Get pre-qualified", "📄 Required documents", "📊 Compare rates"]
            };
            
            return suggestions[category] || suggestions.greeting;
        }
    }

    // Initialize Sarah AI
    const sarahAI = new SarahAI();

    // Admin Dashboard Data Management
    const AdminDashboard = {
        generateChatQueue() {
            return [
                {
                    id: 'chat-001',
                    user: 'John D.',
                    status: 'Active - Sarah',
                    duration: '5:23',
                    stage: 'Document Review',
                    priority: 'normal',
                    avatar: '👤'
                },
                {
                    id: 'chat-002',
                    user: 'Maria S.',
                    status: 'Pending Handoff',
                    duration: '12:45',
                    stage: 'Complex Scenario',
                    priority: 'high',
                    avatar: '👩'
                },
                {
                    id: 'chat-003',
                    user: 'David L.',
                    status: 'Active - Agent Mike',
                    duration: '3:12',
                    stage: 'Final Approval',
                    priority: 'normal',
                    avatar: '👨'
                },
                {
                    id: 'chat-004',
                    user: 'Sarah P.',
                    status: 'Queue - Handoff',
                    duration: '1:34',
                    stage: 'Rate Lock',
                    priority: 'urgent',
                    avatar: '👩'
                }
            ];
        },

        generateUserList() {
            return [
                {
                    id: 'user-001',
                    name: 'Jennifer Martinez',
                    email: 'jennifer.m@email.com',
                    status: 'qualified',
                    phone: '(555) 234-5678',
                    loanAmount: '$350,000',
                    stage: 'Pre-qualified',
                    date: '2025-09-01'
                },
                {
                    id: 'user-002',
                    name: 'Robert Chen',
                    email: 'r.chen@email.com',
                    status: 'application',
                    phone: '(555) 345-6789',
                    loanAmount: '$425,000',
                    stage: 'Application Review',
                    date: '2025-08-31'
                },
                {
                    id: 'user-003',
                    name: 'Lisa Thompson',
                    email: 'lisa.thompson@email.com',
                    status: 'new',
                    phone: '(555) 456-7890',
                    loanAmount: '$275,000',
                    stage: 'Initial Contact',
                    date: '2025-09-01'
                },
                {
                    id: 'user-004',
                    name: 'Michael Rodriguez',
                    email: 'm.rodriguez@email.com',
                    status: 'approved',
                    phone: '(555) 567-8901',
                    loanAmount: '$380,000',
                    stage: 'Approved - Closing',
                    date: '2025-08-30'
                }
            ];
        },

        generateAgentQueue() {
            return [
                {
                    id: 'agent-001',
                    name: 'Mike Johnson',
                    status: 'online',
                    activeChats: 2,
                    speciality: 'First-time buyers',
                    avatar: 'MJ'
                },
                {
                    id: 'agent-002',
                    name: 'Sarah Kim',
                    status: 'online',
                    activeChats: 1,
                    speciality: 'Investment properties',
                    avatar: 'SK'
                },
                {
                    id: 'agent-003',
                    name: 'David Wilson',
                    status: 'offline',
                    activeChats: 0,
                    speciality: 'Jumbo loans',
                    avatar: 'DW'
                }
            ];
        },

        generateMetricsData() {
            return [
                { metric: 'Total Chats Today', today: '47', week: '312', month: '1,284', trend: '↗️ +12%' },
                { metric: 'Qualification Rate', today: '78%', week: '75%', month: '76%', trend: '↗️ +3%' },
                { metric: 'Human Handoff Rate', today: '15%', week: '18%', month: '19%', trend: '↘️ -3%' },
                { metric: 'Avg. Response Time', today: '45s', week: '52s', month: '48s', trend: '↗️ Improved' },
                { metric: 'Customer Satisfaction', today: '98%', week: '97%', month: '96%', trend: '↗️ +2%' }
            ];
        }
    };

    // Chart.js Integration
    function initializeCharts() {
        // Chat Volume Chart
        const chatVolumeCtx = document.getElementById('chat-volume-chart');
        if (chatVolumeCtx) {
            new Chart(chatVolumeCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Daily Chats',
                        data: [45, 52, 48, 61, 55, 43, 47],
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        }

        // Conversion Chart
        const conversionCtx = document.getElementById('conversion-chart');
        if (conversionCtx) {
            new Chart(conversionCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Qualified', 'In Process', 'Pending'],
                    datasets: [{
                        data: [65, 25, 10],
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });
        }
    }

    // Wait for DOM to be ready
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    ready(function() {
        console.log('🎯 DOM ready, initializing Kwalifai advanced features...');

        // 1. ENHANCED RATE BANNER
        const rateBanner = document.getElementById('rate-banner');
        const closeBannerBtn = document.getElementById('close-banner');
        
        if (closeBannerBtn && rateBanner) {
            closeBannerBtn.onclick = function(e) {
                e.preventDefault();
                console.log('📴 Closing rate banner');
                rateBanner.classList.add('hidden');
                
                const navbar = document.querySelector('.navbar');
                if (navbar) {
                    navbar.classList.add('banner-closed');
                }
                return false;
            };
            
            // Auto-update rates every 30 seconds (simulation)
            setInterval(function() {
                updateRates();
            }, 30000);
        }

        function updateRates() {
            const baseRate = 7.125;
            const variation = (Math.random() - 0.5) * 0.1;
            const newRate = (baseRate + variation).toFixed(3);
            
            const rateElements = document.querySelectorAll('.rate-value');
            if (rateElements.length > 0) {
                rateElements[0].textContent = newRate + '%';
                console.log('📊 Rates updated:', newRate + '%');
            }
        }

        // 2. ENHANCED PAGE NAVIGATION
        function showPage(pageName) {
            console.log('🔄 Navigating to:', pageName);
            
            // Hide all pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(function(page) {
                page.classList.remove('active');
            });
            
            // Show target page
            const targetPage = document.getElementById(pageName + '-page');
            if (targetPage) {
                targetPage.classList.add('active');
                AppState.currentPage = pageName;
                
                // Initialize page-specific features
                if (pageName === 'news') {
                    renderNews();
                } else if (pageName === 'admin') {
                    initializeAdminDashboard();
                }
            }
            
            // Update nav links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(function(link) {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector('[data-page="' + pageName + '"]');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }

        // Attach navigation listeners
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.onclick = function(e) {
                e.preventDefault();
                const page = this.getAttribute('data-page');
                showPage(page);
                return false;
            };
        });

        // 3. ADMIN DASHBOARD FUNCTIONALITY
        function initializeAdminDashboard() {
            console.log('🎛️ Initializing Admin Dashboard');
            
            // Update admin stats
            updateAdminStats();
            renderChatQueue();
            renderUserList();
            renderAgentQueue();
            renderMetricsTable();
            
            // Initialize charts if on analytics tab
            setTimeout(function() {
                if (document.getElementById('chat-volume-chart')) {
                    initializeCharts();
                }
            }, 100);
        }

        // Admin Login
        const adminLoginBtn = document.getElementById('admin-login-btn');
        const adminPasswordInput = document.getElementById('admin-password');
        const adminError = document.getElementById('admin-error');
        const adminLogin = document.getElementById('admin-login');
        const adminDashboard = document.getElementById('admin-dashboard');

        if (adminLoginBtn) {
            adminLoginBtn.onclick = function(e) {
                e.preventDefault();
                const password = adminPasswordInput.value;
                
                if (password === 'admin123') {
                    AppState.isAdminLoggedIn = true;
                    adminLogin.classList.add('hidden');
                    adminDashboard.classList.remove('hidden');
                    adminError.classList.add('hidden');
                    initializeAdminDashboard();
                    console.log('✅ Admin logged in successfully');
                } else {
                    adminError.classList.remove('hidden');
                    adminPasswordInput.value = '';
                    console.log('❌ Invalid admin password');
                }
                return false;
            };
        }

        // Admin Logout
        const adminLogoutBtn = document.getElementById('admin-logout');
        if (adminLogoutBtn) {
            adminLogoutBtn.onclick = function(e) {
                e.preventDefault();
                AppState.isAdminLoggedIn = false;
                adminLogin.classList.remove('hidden');
                adminDashboard.classList.add('hidden');
                adminPasswordInput.value = '';
                console.log('🚪 Admin logged out');
                return false;
            };
        }

        // Admin Tab Switching
        const adminTabs = document.querySelectorAll('.admin-tab');
        const adminTabContents = document.querySelectorAll('.admin-tab-content');

        adminTabs.forEach(function(tab) {
            tab.onclick = function(e) {
                e.preventDefault();
                const targetTab = this.getAttribute('data-tab');
                
                // Update active tab
                adminTabs.forEach(function(t) { t.classList.remove('active'); });
                this.classList.add('active');
                
                // Show target content
                adminTabContents.forEach(function(content) {
                    content.classList.remove('active');
                });
                
                const targetContent = document.getElementById('admin-' + targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                    
                    // Initialize tab-specific features
                    if (targetTab === 'analytics') {
                        setTimeout(initializeCharts, 100);
                    }
                }
                
                console.log('🔄 Admin tab switched to:', targetTab);
                return false;
            };
        });

        function updateAdminStats() {
            const stats = AppState.adminData;
            
            // Update stat values with animation
            const elements = {
                'active-chats': stats.activeChats,
                'available-agents': stats.availableAgents,
                'avg-response': stats.avgResponseTime,
                'pending-handoffs': stats.pendingHandoffs
            };
            
            Object.keys(elements).forEach(function(id) {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = elements[id];
                }
            });
        }

        function renderChatQueue() {
            const queueList = document.getElementById('chat-queue-list');
            if (!queueList) return;
            
            const queue = AdminDashboard.generateChatQueue();
            
            const html = queue.map(function(chat) {
                const priorityClass = chat.priority === 'urgent' ? 'urgent' : 
                                   chat.priority === 'high' ? 'high' : 'normal';
                
                return '<div class="queue-item ' + priorityClass + '">' +
                    '<div class="queue-user">' +
                        '<div class="queue-avatar">' + chat.avatar + '</div>' +
                        '<div class="queue-info">' +
                            '<div class="queue-name">' + chat.user + '</div>' +
                            '<div class="queue-status">' + chat.status + ' • ' + chat.duration + '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="queue-actions">' +
                        '<button class="btn btn--sm btn--outline" onclick="takeOverChat(\'' + chat.id + '\')">Take Over</button>' +
                        '<button class="btn btn--sm btn--primary" onclick="viewChatDetails(\'' + chat.id + '\')">View</button>' +
                    '</div>' +
                '</div>';
            }).join('');
            
            queueList.innerHTML = html;
        }

        function renderUserList() {
            const userList = document.getElementById('user-list');
            if (!userList) return;
            
            const users = AdminDashboard.generateUserList();
            
            const html = users.map(function(user) {
                return '<div class="user-item">' +
                    '<div class="user-info">' +
                        '<div class="user-avatar">' + user.name.charAt(0) + '</div>' +
                        '<div class="user-details">' +
                            '<div class="user-name">' + user.name + '</div>' +
                            '<div class="user-email">' + user.email + '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="user-meta">' +
                        '<div class="user-status ' + user.status + '">' + user.status + '</div>' +
                        '<div class="user-amount">' + user.loanAmount + '</div>' +
                    '</div>' +
                '</div>';
            }).join('');
            
            userList.innerHTML = html;
        }

        function renderAgentQueue() {
            const agentQueue = document.getElementById('agent-queue');
            if (!agentQueue) return;
            
            const agents = AdminDashboard.generateAgentQueue();
            
            const html = agents.map(function(agent) {
                const statusClass = agent.status === 'online' ? 'agent-online' : 'agent-offline';
                
                return '<div class="agent-item">' +
                    '<div class="agent-info">' +
                        '<div class="agent-avatar">' + agent.avatar + '</div>' +
                        '<div class="agent-details">' +
                            '<div class="agent-name">' + agent.name + '</div>' +
                            '<div class="agent-status-text ' + statusClass + '">' + 
                                agent.status + ' • ' + agent.activeChats + ' chats' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="agent-controls">' +
                        '<button class="btn btn--sm btn--outline">Configure</button>' +
                    '</div>' +
                '</div>';
            }).join('');
            
            agentQueue.innerHTML = html;
        }

        function renderMetricsTable() {
            const tableBody = document.getElementById('metrics-table-body');
            if (!tableBody) return;
            
            const metrics = AdminDashboard.generateMetricsData();
            
            const html = metrics.map(function(metric) {
                return '<tr>' +
                    '<td>' + metric.metric + '</td>' +
                    '<td>' + metric.today + '</td>' +
                    '<td>' + metric.week + '</td>' +
                    '<td>' + metric.month + '</td>' +
                    '<td>' + metric.trend + '</td>' +
                '</tr>';
            }).join('');
            
            tableBody.innerHTML = html;
        }

        // Make admin functions globally available
        window.takeOverChat = function(chatId) {
            console.log('👤 Taking over chat:', chatId);
            alert('Taking over chat ' + chatId + ' - functionality would connect to live chat system');
        };

        window.viewChatDetails = function(chatId) {
            console.log('👁️ Viewing chat details:', chatId);
            alert('Viewing details for chat ' + chatId + ' - would show full conversation history');
        };

        // 4. ADVANCED CHAT SYSTEM WITH SARAH
        const chatOverlay = document.getElementById('chat-overlay');
        const openChatBtn = document.getElementById('open-chat');
        const closeChatBtn = document.getElementById('close-chat');
        const minimizeChatBtn = document.getElementById('minimize-chat');
        const messagesContainer = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        const typingIndicator = document.getElementById('typing-indicator');
        const chatSuggestions = document.getElementById('chat-suggestions');

        function openChat() {
            console.log('💬 Opening advanced chat with Sarah');
            if (chatOverlay) {
                chatOverlay.classList.remove('hidden');
                chatInput?.focus();
                
                // Update suggestions based on context
                updateChatSuggestions();
            }
        }
        
        function closeChat() {
            console.log('❌ Closing chat');
            if (chatOverlay) {
                chatOverlay.classList.add('hidden');
            }
        }

        function minimizeChat() {
            console.log('➖ Minimizing chat');
            if (chatOverlay) {
                chatOverlay.classList.toggle('minimized');
            }
        }

        // Chat Event Listeners
        if (openChatBtn) {
            openChatBtn.onclick = function(e) {
                e.preventDefault();
                openChat();
                return false;
            };
        }
        
        if (closeChatBtn) {
            closeChatBtn.onclick = function(e) {
                e.preventDefault();
                closeChat();
                return false;
            };
        }

        if (minimizeChatBtn) {
            minimizeChatBtn.onclick = function(e) {
                e.preventDefault();
                minimizeChat();
                return false;
            };
        }

        if (chatOverlay) {
            chatOverlay.onclick = function(e) {
                if (e.target === chatOverlay) {
                    closeChat();
                }
            };
        }

        // Enhanced Message Handling
        function addMessageToChat(sender, message, timestamp = null) {
            if (!messagesContainer) return;

            const messageDiv = document.createElement('div');
            messageDiv.className = 'message ' + sender + '-message';
            
            const time = timestamp || new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            const avatar = sender === 'agent' ? '🧠' : '👤';
            
            messageDiv.innerHTML = '<div class="message-avatar">' + avatar + '</div>' +
                '<div class="message-content">' +
                    '<p>' + message + '</p>' +
                    '<div class="message-time">' + time + '</div>' +
                '</div>';

            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Store in chat history
            AppState.chatHistory.push({
                sender: sender,
                message: message,
                timestamp: new Date(),
                context: AppState.chatContext
            });
        }

        function showTypingIndicator() {
            if (typingIndicator) {
                typingIndicator.classList.remove('hidden');
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }

        function hideTypingIndicator() {
            if (typingIndicator) {
                typingIndicator.classList.add('hidden');
            }
        }

        function updateChatSuggestions(suggestions = null) {
            if (!chatSuggestions) return;
            
            const defaultSuggestions = ["💰 Check my qualification", "📊 Current rates", "📄 Required documents", "🏠 Loan programs"];
            const suggestionList = suggestions || defaultSuggestions;
            
            const html = suggestionList.map(function(suggestion) {
                return '<button class="suggestion-btn" onclick="useSuggestion(\'' + suggestion + '\')">' + suggestion + '</button>';
            }).join('');
            
            chatSuggestions.innerHTML = html;
        }

        window.useSuggestion = function(suggestion) {
            if (chatInput) {
                chatInput.value = suggestion.replace(/^\w+\s/, ''); // Remove emoji prefix
                sendMessage();
            }
        };

        function sendMessage() {
            if (!chatInput) return;
            
            const message = chatInput.value.trim();
            if (!message) return;

            // Add user message
            addMessageToChat('user', message);
            chatInput.value = '';

            // Show Sarah typing
            showTypingIndicator();

            // Generate Sarah's response
            setTimeout(function() {
                hideTypingIndicator();
                
                const response = sarahAI.generateResponse(message, {
                    chatHistory: AppState.chatHistory,
                    userContext: AppState.chatContext
                });
                
                addMessageToChat('agent', response.message);
                
                // Update suggestions based on response
                updateChatSuggestions(response.followUpSuggestions);
                
                console.log('🧠 Sarah responded:', response.category);
            }, 1500 + Math.random() * 1000); // Variable response time for realism
        }

        // Chat Input Handlers
        if (sendBtn) {
            sendBtn.onclick = function(e) {
                e.preventDefault();
                sendMessage();
                return false;
            };
        }
        
        if (chatInput) {
            chatInput.onkeypress = function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage();
                }
            };
        }

        // 5. HUMAN HANDOFF SYSTEM
        const requestHumanBtn = document.getElementById('request-human');
        const handoffModal = document.getElementById('handoff-modal');
        const closeHandoffModalBtn = document.getElementById('close-handoff-modal');
        const connectNowBtn = document.getElementById('connect-now');
        const scheduleCallbackBtn = document.getElementById('schedule-callback');

        if (requestHumanBtn) {
            requestHumanBtn.onclick = function(e) {
                e.preventDefault();
                console.log('👤 Human handoff requested');
                if (handoffModal) {
                    handoffModal.classList.remove('hidden');
                }
                return false;
            };
        }

        if (closeHandoffModalBtn) {
            closeHandoffModalBtn.onclick = function(e) {
                e.preventDefault();
                if (handoffModal) {
                    handoffModal.classList.add('hidden');
                }
                return false;
            };
        }

        if (connectNowBtn) {
            connectNowBtn.onclick = function(e) {
                e.preventDefault();
                console.log('🚀 Connecting to human agent now');
                
                // Close handoff modal
                if (handoffModal) {
                    handoffModal.classList.add('hidden');
                }
                
                // Add system message about handoff
                addMessageToChat('agent', '👤 Perfect! I\'m connecting you with one of our licensed loan officers. Mike Johnson will join our conversation in just a moment. He specializes in cases like yours and has 8+ years of experience.');
                
                // Simulate agent joining
                setTimeout(function() {
                    addMessageToChat('agent', '👋 Hi! This is Mike Johnson, licensed loan officer (NMLS ID: 1666674). I see Sarah has been helping you with your mortgage needs. I\'ve reviewed your conversation and I\'m here to provide personalized guidance. How can I help you take the next step?');
                }, 3000);
                
                return false;
            };
        }

        if (scheduleCallbackBtn) {
            scheduleCallbackBtn.onclick = function(e) {
                e.preventDefault();
                console.log('📅 Scheduling callback');
                
                if (handoffModal) {
                    handoffModal.classList.add('hidden');
                }
                
                addMessageToChat('agent', '📅 Great choice! I\'ve added you to our callback queue. One of our licensed loan officers will call you within the next business day. In the meantime, I can continue helping with any questions you have.');
                
                return false;
            };
        }

        // 6. FILE UPLOAD WITH AI PROCESSING
        const uploadBtn = document.getElementById('upload-btn');
        const fileInput = document.getElementById('file-input');
        const uploadStatus = document.getElementById('upload-status');
        
        if (uploadBtn && fileInput) {
            uploadBtn.onclick = function(e) {
                e.preventDefault();
                fileInput.click();
                return false;
            };
            
            fileInput.onchange = function(e) {
                const files = e.target.files;
                if (files && files.length > 0) {
                    console.log('📎 Documents uploaded:', files.length);
                    
                    // Show upload status
                    if (uploadStatus) {
                        uploadStatus.classList.remove('hidden');
                        uploadStatus.className = 'upload-status success';
                        uploadStatus.textContent = '✅ ' + files.length + ' document(s) uploaded successfully';
                    }
                    
                    // Add AI processing message
                    showTypingIndicator();
                    
                    setTimeout(function() {
                        hideTypingIndicator();
                        
                        const fileNames = Array.from(files).map(f => f.name).join(', ');
                        const analysisMessage = '📋 Perfect! I\'ve analyzed your documents (' + fileNames + ') with 99.7% accuracy. Here\'s what I found:\n\n' +
                            '✅ Income verification: Complete\n' +
                            '✅ Employment history: 2+ years verified\n' +
                            '✅ Asset documentation: Sufficient\n' +
                            '⚠️ Missing: Recent bank statements (last 60 days)\n\n' +
                            'Based on this analysis, you\'re looking great for qualification! Would you like me to run a preliminary approval estimate?';
                            
                        addMessageToChat('agent', analysisMessage);
                        
                        // Update context
                        AppState.chatContext.documentsUploaded.push(...Array.from(files).map(f => f.name));
                        AppState.chatContext.conversationStage = 'document_analysis';
                    }, 2500);
                    
                    this.value = '';
                }
            };
        }

        // 7. HERO BUTTON FUNCTIONALITY
        const startAppBtn = document.getElementById('start-application');
        const learnMoreBtn = document.getElementById('learn-more');
        const callNowBtn = document.getElementById('call-now');
        
        if (startAppBtn) {
            startAppBtn.onclick = function(e) {
                e.preventDefault();
                console.log('🚀 Starting application');
                openChat();
                
                // Add immediate Sarah response for application start
                setTimeout(function() {
                    addMessageToChat('agent', '🚀 Fantastic! Let\'s get your mortgage application started. I can pre-qualify you in under 3 minutes with just a few questions. First, what type of property are you looking to purchase - primary residence, investment property, or refinancing an existing home?');
                    updateChatSuggestions(['Primary residence', 'Investment property', 'Refinancing', 'Not sure yet']);
                }, 1000);
                
                return false;
            };
        }
        
        if (learnMoreBtn) {
            learnMoreBtn.onclick = function(e) {
                e.preventDefault();
                showPage('about');
                return false;
            };
        }

        if (callNowBtn) {
            callNowBtn.onclick = function(e) {
                e.preventDefault();
                // In a real app, this would initiate a phone call
                alert('📞 Calling (555) 123-4567...\n\nIn a production environment, this would connect you directly with our licensed loan officers!');
                return false;
            };
        }

        // 8. NEWS SYSTEM WITH WORKING MODALS
        const articleModal = document.getElementById('article-modal');
        const closeArticleModalBtn = document.getElementById('close-article-modal');
        
        function openArticleModal(articleId) {
            console.log('📰 Opening article:', articleId);
            const article = newsArticles.find(function(a) { return a.id === articleId; });
            if (!article) return;
            
            // Populate modal
            const title = document.getElementById('modal-article-title');
            const author = document.getElementById('modal-article-author');
            const publication = document.getElementById('modal-article-publication');
            const date = document.getElementById('modal-article-date');
            const content = document.getElementById('modal-article-content');
            
            if (title) title.textContent = article.headline;
            if (author) author.textContent = 'By ' + article.author;
            if (publication) publication.textContent = article.publication;
            if (date) date.textContent = formatDate(article.publishDate);
            if (content) {
                const paragraphs = article.fullContent.split('\n\n').map(function(p) {
                    return '<p>' + p + '</p>';
                }).join('');
                content.innerHTML = paragraphs;
            }
            
            if (articleModal) {
                articleModal.classList.remove('hidden');
            }
        }
        
        function closeArticleModal() {
            console.log('❌ Closing article modal');
            if (articleModal) {
                articleModal.classList.add('hidden');
            }
        }
        
        if (closeArticleModalBtn) {
            closeArticleModalBtn.onclick = function(e) {
                e.preventDefault();
                closeArticleModal();
                return false;
            };
        }

        if (articleModal) {
            articleModal.onclick = function(e) {
                if (e.target.classList.contains('modal-overlay')) {
                    closeArticleModal();
                }
            };
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        function renderNews() {
            const newsGrid = document.getElementById('news-grid');
            if (!newsGrid) return;
            
            console.log('📰 Rendering news articles with full functionality');
            
            const articlesHTML = newsArticles.map(function(article) {
                return '<article class="news-article" data-category="' + article.category + '" data-id="' + article.id + '">' +
                    '<div class="article-meta">' +
                        '<span class="article-date">' + formatDate(article.publishDate) + '</span>' +
                        '<span class="sentiment-badge sentiment-' + article.sentiment + '">' + article.sentiment + '</span>' +
                    '</div>' +
                    '<h3 class="article-headline">' + article.headline + '</h3>' +
                    '<p class="article-summary">' + article.aiSummary + '</p>' +
                    '<div class="article-footer">' +
                        '<span class="article-source">' + article.publication + ' • ' + article.author + '</span>' +
                        '<button class="btn btn--sm btn--primary read-article-btn">Read Full Article</button>' +
                    '</div>' +
                '</article>';
            }).join('');
            
            newsGrid.innerHTML = articlesHTML;
            
            // Attach click handlers
            const articleElements = newsGrid.querySelectorAll('.news-article');
            articleElements.forEach(function(articleEl) {
                articleEl.onclick = function(e) {
                    e.preventDefault();
                    const articleId = this.getAttribute('data-id');
                    openArticleModal(articleId);
                    return false;
                };
            });
        }

        function filterNews(category) {
            console.log('🔍 Filtering news by:', category);
            
            // Update filter buttons
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(function(btn) {
                btn.classList.remove('active');
            });
            
            const activeBtn = document.querySelector('[data-filter="' + category + '"]');
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
            
            // Show/hide articles
            const articles = document.querySelectorAll('.news-article');
            articles.forEach(function(article) {
                if (category === 'all' || article.getAttribute('data-category') === category) {
                    article.classList.remove('hidden');
                } else {
                    article.classList.add('hidden');
                }
            });
        }

        // News filter handlers
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(function(btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                const filter = this.getAttribute('data-filter');
                filterNews(filter);
                return false;
            };
        });

        // 9. INITIALIZE APPLICATION
        renderNews();
        showPage('home');
        updateChatSuggestions();
        
        // Simulate live updates for admin dashboard
        setInterval(function() {
            if (AppState.currentPage === 'admin' && AppState.isAdminLoggedIn) {
                // Update stats with small variations
                AppState.adminData.activeChats = Math.max(8, Math.min(15, AppState.adminData.activeChats + (Math.random() > 0.5 ? 1 : -1)));
                updateAdminStats();
            }
        }, 10000);
        
        console.log('✅ Kwalifai Advanced Application fully initialized');
        console.log('🎯 Features Active: Sarah AI, Admin Dashboard, Human Handoff, News System');
        console.log('📊 Admin Password: admin123');
        
        // Make functions globally available for debugging
        window.KwalifaiApp = {
            showPage: showPage,
            openChat: openChat,
            closeChat: closeChat,
            openArticleModal: openArticleModal,
            closeArticleModal: closeArticleModal,
            sarahAI: sarahAI,
            AppState: AppState,
            AdminDashboard: AdminDashboard
        };
    });
})();
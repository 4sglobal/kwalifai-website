// Advanced Sarah AI System - Enterprise Mortgage Platform - FIXED
(function() {
    'use strict';
    
    // Global app instance
    let app;

    class AdvancedSarahApp {
        constructor() {
            this.config = {
                brandConfig: {
                    companyName: "Kwalifai",
                    tagline: "AI Powered-Human Backed",
                    primaryTagline: "Qualify Fast. AI Powered.",
                    aiAgentName: "Sarah",
                    nmlsId: "1666674",
                    phone: "(555) 123-4567",
                    version: "2.0.0-enterprise"
                },
                // Advanced news with AI analysis
                newsArticles: [
                    {
                        "id": "1",
                        "headline": "Mortgage Rates Hit 7.2% Amid Fed Policy Uncertainty",
                        "publication": "HousingWire",
                        "author": "Sarah Johnson",
                        "publishDate": "2025-09-01",
                        "category": "market-updates",
                        "aiSummary": "The 30-year fixed mortgage rate climbed to 7.2%, the highest level since November 2023, as investors price in potential Federal Reserve policy changes. Mortgage applications fell 15% week-over-week as affordability concerns mount. Industry experts suggest borrowers may want to consider rate locks if they're in the process of purchasing. First-time homebuyers are particularly impacted by the higher rates, with many delaying purchases until conditions improve.",
                        "sentiment": "negative",
                        "tags": ["mortgage rates", "fed policy", "housing market", "first-time buyers"],
                        "originalUrl": "https://housingwire.com/articles/mortgage-rates-hit-7-2-percent/",
                        "aiConfidence": 95,
                        "marketImpact": "high"
                    },
                    {
                        "id": "2",
                        "headline": "AI-Powered Underwriting Shows 40% Faster Approval Times",
                        "publication": "National Mortgage News",
                        "author": "Michael Chen",
                        "publishDate": "2025-08-31",
                        "category": "technology",
                        "aiSummary": "Major lenders implementing AI-driven underwriting systems report significant efficiency gains, with loan processing times reduced from 45 to 27 days on average. Consumer satisfaction scores also improved by 25% as borrowers experience fewer delays and more transparent communication throughout the process. The technology analyzes credit profiles, income verification, and asset documentation simultaneously, identifying potential issues early in the process.",
                        "sentiment": "positive",
                        "tags": ["AI", "underwriting", "loan processing", "efficiency"],
                        "originalUrl": "https://nationalmortgagenews.com/ai-underwriting-efficiency/",
                        "aiConfidence": 92,
                        "marketImpact": "medium"
                    },
                    {
                        "id": "3",
                        "headline": "Housing Inventory Increases 12% Year-Over-Year",
                        "publication": "Realtor.com",
                        "author": "Jennifer Martinez",
                        "publishDate": "2025-08-30",
                        "category": "market-updates",
                        "aiSummary": "National housing inventory has grown significantly, providing more options for homebuyers after years of limited supply. The increase is particularly notable in suburban markets, where new construction has ramped up to meet demand. However, prices remain elevated in many metro areas, and buyers still face competition for well-priced homes in desirable locations.",
                        "sentiment": "positive",
                        "tags": ["housing inventory", "real estate market", "home prices"],
                        "originalUrl": "https://realtor.com/housing-inventory-report/",
                        "aiConfidence": 88,
                        "marketImpact": "medium"
                    },
                    {
                        "id": "4",
                        "headline": "New CFPB Rules Target Mortgage Servicing Practices",
                        "publication": "American Banker",
                        "author": "Robert Kim",
                        "publishDate": "2025-08-29",
                        "category": "rates",
                        "aiSummary": "The Consumer Financial Protection Bureau announced new guidelines for mortgage servicers, focusing on improved communication with borrowers and faster resolution of payment issues. The rules are designed to reduce foreclosure rates and ensure borrowers receive adequate support during financial hardships. Lenders will need to update their processes to comply with the new requirements by early 2026.",
                        "sentiment": "neutral",
                        "tags": ["CFPB", "mortgage servicing", "regulations", "compliance"],
                        "originalUrl": "https://americanbanker.com/cfpb-mortgage-rules/",
                        "aiConfidence": 96,
                        "marketImpact": "high"
                    }
                ],
                // Admin system configuration
                adminConfig: {
                    maxConcurrentChats: 50,
                    queueTimeoutMinutes: 15,
                    autoHandoffTriggers: ['complex', 'human', 'escalate', 'loan officer'],
                    analyticsRefreshRate: 30000
                }
            };

            // Advanced chat session management
            this.chatSessions = new Map();
            this.activeSession = null;
            this.adminUsers = new Set(['admin', 'supervisor', 'manager']);
            this.currentUser = null;
            
            // Human handoff queue
            this.handoffQueue = [];
            this.liveAgents = new Map();
            
            // Analytics data
            this.analytics = {
                totalUsers: 247,
                activeToday: 89,
                totalApplications: 156,
                satisfactionRate: 92,
                averageResponseTime: 1.2,
                activeChatCount: 3,
                queueCount: 2
            };

            this.currentPage = 'home';
            this.bannerVisible = false;
            this.bannerTimer = null;
        }

        init() {
            console.log('🚀 Initializing Advanced Sarah Enterprise System v' + this.config.brandConfig.version);
            
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    setTimeout(() => this.setupApp(), 100);
                });
            } else {
                setTimeout(() => this.setupApp(), 100);
            }
        }

        setupApp() {
            try {
                console.log('🔧 Setting up advanced components...');
                this.initializeBannerSystem();
                this.renderRates();
                this.renderNews();
                this.setupEventListeners();
                this.initializeAdminDashboard();
                this.startAnalyticsUpdates();
                this.showPage('home');
                console.log('✅ Advanced Sarah System initialized successfully');
            } catch (error) {
                console.error('❌ Error setting up app:', error);
            }
        }

        // FIXED banner system with content push
        initializeBannerSystem() {
            console.log('🎌 Initializing banner system...');
            
            // Set initial state - banner hidden above viewport
            const banner = document.getElementById('rate-banner');
            const body = document.body;
            
            if (banner) {
                banner.classList.add('rate-banner--hidden');
                body.classList.remove('banner-visible');
                
                // Show banner after 2 seconds
                this.bannerTimer = setTimeout(() => {
                    this.showBanner();
                }, 2000);
                
                console.log('✅ Banner system initialized - will appear in 2 seconds');
            }
        }

        showBanner() {
            console.log('📢 Showing banner and pushing content down...');
            const banner = document.getElementById('rate-banner');
            const body = document.body;
            
            if (banner && body) {
                // Remove hidden class and add visible class for smooth transition
                banner.classList.remove('rate-banner--hidden');
                banner.classList.add('rate-banner--visible');
                
                // Add padding to body to push content down
                body.classList.add('banner-visible');
                
                this.bannerVisible = true;
                console.log('✅ Banner shown, content pushed down smoothly');
            }
        }

        closeBanner() {
            console.log('🚫 Closing banner and removing content padding...');
            const banner = document.getElementById('rate-banner');
            const body = document.body;
            
            if (banner && body) {
                // Hide banner
                banner.classList.remove('rate-banner--visible');
                banner.classList.add('rate-banner--hidden');
                
                // Remove body padding
                body.classList.remove('banner-visible');
                
                this.bannerVisible = false;
                console.log('✅ Banner closed, content padding removed');
            }
        }

        // FIXED event listeners setup
        setupEventListeners() {
            console.log('🔗 Setting up advanced event listeners...');

            // Use event delegation for better reliability
            document.addEventListener('click', (e) => {
                try {
                    // Navigation - FIXED
                    if (e.target.classList.contains('nav-link')) {
                        e.preventDefault();
                        const page = e.target.getAttribute('data-page');
                        console.log('🧭 Navigation clicked:', page);
                        if (page) {
                            this.showPage(page);
                        }
                        return;
                    }

                    // Banner controls - FIXED
                    if (e.target.id === 'close-banner') {
                        e.preventDefault();
                        console.log('🚫 Banner close clicked');
                        this.closeBanner();
                        return;
                    }

                    // Chat controls - FIXED Sarah
                    if (e.target.id === 'open-chat') {
                        e.preventDefault();
                        console.log('💬 Chat open clicked');
                        this.openAdvancedChat();
                        return;
                    }

                    if (e.target.id === 'close-chat') {
                        e.preventDefault();
                        console.log('❌ Chat close clicked');
                        this.closeChat();
                        return;
                    }

                    if (e.target.id === 'send-btn') {
                        e.preventDefault();
                        this.sendAdvancedMessage();
                        return;
                    }

                    // Human handoff request - FIXED
                    if (e.target.id === 'handoff-btn') {
                        e.preventDefault();
                        this.requestHumanHandoff();
                        return;
                    }

                    // Quick actions - FIXED
                    if (e.target.id === 'start-application') {
                        e.preventDefault();
                        console.log('🚀 Start application clicked');
                        this.openAdvancedChat();
                        return;
                    }

                    if (e.target.id === 'learn-more') {
                        e.preventDefault();
                        console.log('📚 Learn more clicked');
                        this.showPage('about');
                        return;
                    }

                    // File upload - FIXED
                    if (e.target.id === 'upload-btn') {
                        e.preventDefault();
                        const fileInput = document.getElementById('file-input');
                        if (fileInput) {
                            fileInput.click();
                        }
                        return;
                    }

                    // News system - FIXED
                    if (e.target.classList.contains('filter-btn')) {
                        e.preventDefault();
                        const filter = e.target.getAttribute('data-filter');
                        console.log('🔍 Filter clicked:', filter);
                        if (filter) {
                            this.filterNews(filter);
                        }
                        return;
                    }

                    if (e.target.closest('.news-article')) {
                        const article = e.target.closest('.news-article');
                        const articleId = article.getAttribute('data-article-id');
                        console.log('📰 Article clicked:', articleId);
                        if (articleId) {
                            this.openNewsModal(articleId);
                        }
                        return;
                    }

                    // Modal controls - FIXED
                    if (e.target.id === 'modal-backdrop' || e.target.id === 'modal-close' || e.target.id === 'modal-close-btn') {
                        this.closeModal();
                        return;
                    }

                    // Chat overlay close - FIXED
                    if (e.target.id === 'chat-overlay') {
                        this.closeChat();
                        return;
                    }

                    // Admin queue actions - FIXED
                    if (e.target.textContent === 'Accept' && e.target.classList.contains('btn--primary')) {
                        this.acceptHandoffRequest(e.target.closest('.queue-item'));
                        return;
                    }

                } catch (error) {
                    console.error('❌ Click handler error:', error);
                }
            });

            // Advanced chat input - FIXED
            document.addEventListener('keypress', (e) => {
                try {
                    if (e.target.id === 'chat-input' && e.key === 'Enter') {
                        e.preventDefault();
                        this.sendAdvancedMessage();
                    }
                } catch (error) {
                    console.error('❌ Keypress handler error:', error);
                }
            });

            // File handling - FIXED
            const fileInput = document.getElementById('file-input');
            if (fileInput) {
                fileInput.addEventListener('change', (e) => {
                    try {
                        this.handleAdvancedFileUpload(e.target.files);
                    } catch (error) {
                        console.error('❌ File handler error:', error);
                    }
                });
            }

            console.log('✅ Advanced event listeners configured');
        }

        generateAdvancedSessionId() {
            return 'adv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 12);
        }

        showPage(pageName) {
            console.log('📄 Navigating to:', pageName);
            
            try {
                // Hide all pages
                const pages = document.querySelectorAll('.page');
                pages.forEach(page => {
                    page.classList.remove('active');
                });

                // Show target page
                const targetPage = document.getElementById(pageName + '-page');
                if (targetPage) {
                    targetPage.classList.add('active');
                    console.log('✅ Page shown:', pageName);
                } else {
                    console.error('❌ Page not found:', pageName);
                    return;
                }

                // Update navigation
                const navLinks = document.querySelectorAll('.nav-link');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                const activeLink = document.querySelector('[data-page="' + pageName + '"]');
                if (activeLink) {
                    activeLink.classList.add('active');
                    console.log('✅ Navigation updated for:', pageName);
                }

                this.currentPage = pageName;

                // Page-specific initializations
                if (pageName === 'admin') {
                    this.updateAdminDashboard();
                    this.renderAnalyticsChart();
                } else if (pageName === 'news') {
                    this.renderNews();
                }

                console.log('✅ Page displayed:', pageName);
            } catch (error) {
                console.error('❌ Error showing page:', error);
            }
        }

        renderRates() {
            try {
                const rateDisplay = document.getElementById('rate-display');
                if (!rateDisplay) {
                    console.warn('⚠️ Rate display element not found');
                    return;
                }

                const rates = [
                    {"product": "30-Year Fixed", "rate": "7.125%"},
                    {"product": "15-Year Fixed", "rate": "6.750%"}
                ];
                
                rateDisplay.innerHTML = rates.map(rate => 
                    `<div class="rate-item">
                        <span class="rate-product">${rate.product}</span>
                        <span class="rate-value">${rate.rate}</span>
                    </div>`
                ).join('');

                console.log('✅ Rates rendered');
            } catch (error) {
                console.error('❌ Error rendering rates:', error);
            }
        }

        renderNews() {
            try {
                const newsGrid = document.getElementById('news-grid');
                if (!newsGrid) {
                    console.warn('⚠️ News grid element not found');
                    return;
                }

                newsGrid.innerHTML = this.config.newsArticles.map(article => 
                    `<article class="news-article" data-category="${article.category}" data-article-id="${article.id}">
                        <div class="article-meta">
                            <span class="article-date">${this.formatDate(article.publishDate)}</span>
                            <span class="sentiment-badge sentiment-${article.sentiment}">${article.sentiment}</span>
                        </div>
                        <h3 class="article-headline">${article.headline}</h3>
                        <p class="article-summary">${article.aiSummary.substring(0, 150)}...</p>
                        <div class="article-footer">
                            <span class="article-source">${article.publication} • ${article.author}</span>
                            <span class="ai-confidence">AI: ${article.aiConfidence}%</span>
                        </div>
                    </article>`
                ).join('');

                console.log('✅ News rendered with AI analysis');
            } catch (error) {
                console.error('❌ Error rendering news:', error);
            }
        }

        openNewsModal(articleId) {
            try {
                const article = this.config.newsArticles.find(a => a.id === articleId);
                if (!article) {
                    console.error('❌ Article not found:', articleId);
                    return;
                }

                const modal = document.getElementById('news-modal');
                if (!modal) {
                    console.error('❌ Modal element not found');
                    return;
                }

                // Populate modal with enhanced data
                const headline = document.getElementById('modal-headline');
                const publication = document.getElementById('modal-publication');
                const author = document.getElementById('modal-author');
                const date = document.getElementById('modal-date');
                const summary = document.getElementById('modal-summary');
                const externalLink = document.getElementById('modal-external-link');

                if (headline) headline.textContent = article.headline;
                if (publication) publication.textContent = article.publication;
                if (author) author.textContent = article.author;
                if (date) date.textContent = this.formatDate(article.publishDate);
                if (summary) summary.textContent = article.aiSummary;
                if (externalLink) externalLink.href = article.originalUrl;

                // Enhanced tags with AI confidence
                const tagsContainer = document.getElementById('modal-tags');
                if (tagsContainer) {
                    tagsContainer.innerHTML = article.tags.map(tag => 
                        `<span class="tag">${tag}</span>`
                    ).join('') + 
                    `<span class="tag">AI Confidence: ${article.aiConfidence}%</span>
                     <span class="tag">Market Impact: ${article.marketImpact}</span>`;
                }

                modal.classList.remove('hidden');
                console.log('✅ Enhanced modal opened for:', article.headline);
            } catch (error) {
                console.error('❌ Error opening modal:', error);
            }
        }

        closeModal() {
            try {
                const modal = document.getElementById('news-modal');
                if (modal) {
                    modal.classList.add('hidden');
                    console.log('✅ Modal closed');
                }
            } catch (error) {
                console.error('❌ Error closing modal:', error);
            }
        }

        filterNews(category) {
            try {
                console.log('🔍 Filtering news by category:', category);
                
                // Update filter buttons
                const filterBtns = document.querySelectorAll('.filter-btn');
                filterBtns.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                const activeBtn = document.querySelector(`[data-filter="${category}"]`);
                if (activeBtn) {
                    activeBtn.classList.add('active');
                }

                // Filter articles
                const articles = document.querySelectorAll('.news-article');
                articles.forEach(article => {
                    const articleCategory = article.getAttribute('data-category');
                    if (category === 'all' || articleCategory === category) {
                        article.classList.remove('hidden');
                    } else {
                        article.classList.add('hidden');
                    }
                });

                console.log('✅ News filtered to category:', category);
            } catch (error) {
                console.error('❌ Error filtering news:', error);
            }
        }

        formatDate(dateString) {
            try {
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            } catch (error) {
                console.error('❌ Date formatting error:', error);
                return dateString;
            }
        }

        // ADVANCED CHAT SYSTEM WITH SARAH - FIXED
        openAdvancedChat() {
            try {
                console.log('🤖 Opening Advanced Sarah Chat System...');
                const chatOverlay = document.getElementById('chat-overlay');
                if (!chatOverlay) {
                    console.error('❌ Chat overlay not found');
                    return;
                }

                // Create or retrieve session
                if (!this.activeSession) {
                    this.activeSession = this.createAdvancedSession();
                }

                chatOverlay.classList.remove('hidden');
                
                // Update session display
                const sessionDisplay = document.getElementById('session-display');
                const sessionStatus = document.getElementById('session-status');
                
                if (sessionDisplay) sessionDisplay.textContent = this.activeSession.shortId;
                if (sessionStatus) sessionStatus.textContent = 'AI Mode - Advanced';
                
                // Initialize with Sarah's advanced greeting
                if (this.activeSession.messages.length === 0) {
                    this.addAdvancedMessage('agent', 
                        `Hello! I'm Sarah, your sophisticated AI mortgage assistant with enterprise-grade capabilities. I offer multi-session support, advanced document analysis, and seamless handoffs to our licensed loan officers when needed.\n\nSession ID: ${this.activeSession.shortId}\nNMLS ID: ${this.config.brandConfig.nmlsId}\n\nHow can I assist you today?`
                    );
                }

                // Focus input
                setTimeout(() => {
                    const chatInput = document.getElementById('chat-input');
                    if (chatInput) {
                        chatInput.focus();
                    }
                }, 200);

                console.log('✅ Advanced Sarah chat opened with session:', this.activeSession.shortId);
            } catch (error) {
                console.error('❌ Error opening chat:', error);
            }
        }

        createAdvancedSession() {
            const sessionId = this.generateAdvancedSessionId();
            const shortId = sessionId.split('_')[2].substring(0, 6).toUpperCase();
            
            const session = {
                id: sessionId,
                shortId: shortId,
                userId: 'user_' + Date.now(),
                messages: [],
                status: 'ai_active',
                capabilities: ['document_analysis', 'multi_session', 'human_handoff', 'advanced_ai'],
                created: new Date().toISOString(),
                lastActivity: new Date().toISOString(),
                humanAgent: null,
                metadata: {
                    userAgent: navigator.userAgent,
                    referrer: document.referrer,
                    timestamp: Date.now()
                }
            };

            this.chatSessions.set(sessionId, session);
            console.log('✅ Advanced session created:', shortId);
            return session;
        }

        closeChat() {
            try {
                const chatOverlay = document.getElementById('chat-overlay');
                if (chatOverlay) {
                    chatOverlay.classList.add('hidden');
                    console.log('✅ Chat closed');
                }
            } catch (error) {
                console.error('❌ Error closing chat:', error);
            }
        }

        sendAdvancedMessage() {
            try {
                const input = document.getElementById('chat-input');
                const message = input ? input.value.trim() : '';
                
                if (!message) {
                    console.log('⚠️ Empty message, not sending');
                    return;
                }

                console.log('📤 Sending advanced message:', message);
                
                this.addAdvancedMessage('user', message);
                if (input) input.value = '';

                // Check for handoff triggers
                if (this.shouldTriggerHandoff(message)) {
                    this.addAdvancedMessage('agent', 
                        'I understand you need specialized assistance. I\'m adding you to our human handoff queue for one of our licensed loan officers. Expected wait time: 2-3 minutes.'
                    );
                    this.addToHandoffQueue(this.activeSession, 'User requested human assistance');
                    return;
                }

                this.showAdvancedTypingIndicator();

                // Simulate advanced AI processing
                setTimeout(() => {
                    this.hideTypingIndicator();
                    const response = this.getAdvancedSarahResponse(message);
                    this.addAdvancedMessage('agent', response);
                }, 1500 + Math.random() * 1000);
            } catch (error) {
                console.error('❌ Error sending message:', error);
            }
        }

        addAdvancedMessage(sender, message) {
            try {
                const messagesContainer = document.getElementById('chat-messages');
                if (!messagesContainer) {
                    console.error('❌ Messages container not found');
                    return;
                }

                const messageElement = document.createElement('div');
                messageElement.className = `message ${sender}-message`;
                
                const avatar = sender === 'agent' ? '🧠' : '👤';
                
                messageElement.innerHTML = 
                    `<div class="message-avatar">${avatar}</div>
                     <div class="message-content">
                         <p>${message}</p>
                     </div>`;

                messagesContainer.appendChild(messageElement);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;

                // Update session
                if (this.activeSession) {
                    this.activeSession.messages.push({
                        sender: sender,
                        message: message,
                        timestamp: new Date().toISOString(),
                        messageId: 'msg_' + Date.now()
                    });
                    this.activeSession.lastActivity = new Date().toISOString();
                }

                console.log('✅ Advanced message added:', sender);
            } catch (error) {
                console.error('❌ Error adding message:', error);
            }
        }

        shouldTriggerHandoff(message) {
            const triggers = this.config.adminConfig.autoHandoffTriggers;
            return triggers.some(trigger => 
                message.toLowerCase().includes(trigger.toLowerCase())
            );
        }

        requestHumanHandoff() {
            console.log('👥 Human handoff requested');
            this.addAdvancedMessage('agent', 
                'I\'m connecting you with a licensed loan officer who can provide specialized assistance. You\'re being added to our priority queue.'
            );
            this.addToHandoffQueue(this.activeSession, 'Manual handoff request');
            
            // Update UI
            const sessionStatus = document.getElementById('session-status');
            if (sessionStatus) {
                sessionStatus.textContent = 'Requesting Human Agent...';
            }
        }

        addToHandoffQueue(session, reason) {
            const queueItem = {
                sessionId: session.id,
                shortId: session.shortId,
                userId: session.userId,
                reason: reason,
                timestamp: Date.now(),
                waitTime: 0
            };
            
            this.handoffQueue.push(queueItem);
            this.updateHandoffQueueDisplay();
            console.log('✅ Added to handoff queue:', session.shortId);
        }

        showAdvancedTypingIndicator() {
            try {
                const indicator = document.getElementById('typing-indicator');
                if (indicator) {
                    indicator.classList.remove('hidden');
                    const messagesContainer = document.getElementById('chat-messages');
                    if (messagesContainer) {
                        messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    }
                }
            } catch (error) {
                console.error('❌ Error showing typing indicator:', error);
            }
        }

        hideTypingIndicator() {
            try {
                const indicator = document.getElementById('typing-indicator');
                if (indicator) {
                    indicator.classList.add('hidden');
                }
            } catch (error) {
                console.error('❌ Error hiding typing indicator:', error);
            }
        }

        getAdvancedSarahResponse(message) {
            const advancedResponses = [
                `Thank you for your inquiry! As your advanced AI assistant with enterprise capabilities, I can analyze complex mortgage scenarios and provide detailed pre-qualification guidance. Our system processes applications 40% faster while maintaining full NMLS ID ${this.config.brandConfig.nmlsId} compliance. What specific aspect of your mortgage needs would you like to explore?`,
                
                `Excellent question! With my multi-session support, I maintain context across all our interactions. I can handle sophisticated document analysis, rate comparisons, and loan program recommendations. Our platform integrates directly with our licensed loan officers for seamless transitions when specialized human expertise is needed. How can I dive deeper into your requirements?`,
                
                `I appreciate your trust in our advanced system! My capabilities include real-time rate analysis, comprehensive document processing, and intelligent risk assessment. I work in conjunction with our admin dashboard that monitors all interactions for quality assurance. Whether you're looking at conventional, FHA, VA, or investment property financing, I can guide you through the entire process. What's your timeline and property type?`,
                
                `Great to connect with you! As Sarah, I represent the latest in mortgage AI technology with human-backed support. I maintain session history, provide detailed analytics on your application progress, and can instantly connect you with our licensed professionals when needed. Our enterprise-grade system ensures your data security and regulatory compliance throughout the process. How can I start helping you achieve your homeownership goals?`
            ];
            
            return advancedResponses[Math.floor(Math.random() * advancedResponses.length)];
        }

        handleAdvancedFileUpload(files) {
            try {
                if (!files || files.length === 0) return;

                console.log('📁 Processing', files.length, 'files with advanced AI...');
                const uploadStatus = document.getElementById('upload-status');
                
                if (uploadStatus) {
                    uploadStatus.classList.remove('hidden', 'success', 'error');
                    uploadStatus.textContent = 'Advanced AI processing documents...';
                }

                // Simulate advanced processing
                setTimeout(() => {
                    if (uploadStatus) {
                        uploadStatus.classList.add('success');
                        uploadStatus.textContent = `✅ Advanced analysis complete for ${files.length} document(s)`;
                    }
                    
                    this.addAdvancedMessage('agent', 
                        `I've received and analyzed your ${files.length} document(s) using our enterprise AI system. I can process pay stubs, bank statements, tax returns, W2s, and other mortgage documentation with 95% accuracy. All files are encrypted and handled in full compliance with our NMLS ID: ${this.config.brandConfig.nmlsId} requirements.\n\nDocument analysis reveals: Ready for underwriting review. Would you like me to connect you with a loan officer to discuss next steps?`
                    );
                    
                    const fileInput = document.getElementById('file-input');
                    if (fileInput) fileInput.value = '';

                    setTimeout(() => {
                        if (uploadStatus) uploadStatus.classList.add('hidden');
                    }, 5000);
                }, 2500);
            } catch (error) {
                console.error('❌ Error handling file upload:', error);
            }
        }

        // ADMIN DASHBOARD SYSTEM
        initializeAdminDashboard() {
            console.log('👨‍💼 Initializing Admin Dashboard...');
            this.updateAdminTime();
            setInterval(() => this.updateAdminTime(), 1000);
            
            // Initialize mock admin data
            this.initializeMockAdminData();
            console.log('✅ Admin dashboard initialized');
        }

        initializeMockAdminData() {
            // Mock active sessions
            this.mockActiveSessions = [
                { id: 'ADV_ABC123', user: 'John D.', status: 'active', duration: '5m 23s', lastMessage: 'Reviewing documents...' },
                { id: 'ADV_DEF456', user: 'Sarah M.', status: 'ai_mode', duration: '2m 15s', lastMessage: 'Rate inquiry' },
                { id: 'ADV_GHI789', user: 'Mike R.', status: 'human_queue', duration: '7m 45s', lastMessage: 'Complex refinance question' }
            ];
        }

        updateAdminTime() {
            const timeElement = document.getElementById('admin-time');
            if (timeElement) {
                timeElement.textContent = new Date().toLocaleTimeString();
            }
        }

        startAnalyticsUpdates() {
            // Update analytics every 30 seconds
            setInterval(() => {
                this.updateAnalytics();
                if (this.currentPage === 'admin') {
                    this.updateAdminDashboard();
                }
            }, this.config.adminConfig.analyticsRefreshRate);
        }

        updateAnalytics() {
            // Simulate real-time analytics updates
            this.analytics.activeToday += Math.floor(Math.random() * 3);
            this.analytics.averageResponseTime = (Math.random() * 2 + 0.5).toFixed(1);
            
            // Update queue counts
            this.analytics.queueCount = this.handoffQueue.length;
            this.analytics.activeChatCount = this.chatSessions.size;
        }

        updateAdminDashboard() {
            try {
                // Update stats
                const activeChatEl = document.getElementById('active-chats');
                const queueCountEl = document.getElementById('queue-count');
                const responseTimeEl = document.getElementById('response-time');

                if (activeChatEl) activeChatEl.textContent = this.analytics.activeChatCount;
                if (queueCountEl) queueCountEl.textContent = this.analytics.queueCount;
                if (responseTimeEl) responseTimeEl.textContent = this.analytics.averageResponseTime + 's';

                this.updateHandoffQueueDisplay();
                console.log('📊 Admin dashboard updated');
            } catch (error) {
                console.error('❌ Error updating admin dashboard:', error);
            }
        }

        updateHandoffQueueDisplay() {
            const queueContainer = document.getElementById('handoff-queue');
            if (!queueContainer) return;

            if (this.handoffQueue.length === 0) {
                queueContainer.innerHTML = '<p class="queue-empty">No requests in queue</p>';
                return;
            }

            queueContainer.innerHTML = this.handoffQueue.map(item => {
                const waitMinutes = Math.floor((Date.now() - item.timestamp) / 60000);
                const waitSeconds = Math.floor(((Date.now() - item.timestamp) % 60000) / 1000);
                
                return `
                    <div class="queue-item" data-session="${item.sessionId}">
                        <div class="queue-user">
                            <span class="user-name">User ${item.shortId}</span>
                            <span class="user-id">#${item.userId}</span>
                        </div>
                        <div class="queue-reason">${item.reason}</div>
                        <div class="queue-wait">Waiting ${waitMinutes}m ${waitSeconds}s</div>
                        <button class="btn btn--sm btn--primary">Accept</button>
                    </div>`;
            }).join('');
        }

        acceptHandoffRequest(queueItem) {
            const sessionId = queueItem.getAttribute('data-session');
            const queueIndex = this.handoffQueue.findIndex(item => item.sessionId === sessionId);
            
            if (queueIndex !== -1) {
                this.handoffQueue.splice(queueIndex, 1);
                this.updateHandoffQueueDisplay();
                console.log('✅ Handoff request accepted:', sessionId);
            }
        }

        renderAnalyticsChart() {
            const canvas = document.getElementById('analytics-chart');
            if (!canvas) {
                console.warn('⚠️ Analytics chart canvas not found');
                return;
            }

            try {
                const ctx = canvas.getContext('2d');
                
                // Destroy existing chart if it exists
                if (window.analyticsChart) {
                    window.analyticsChart.destroy();
                }

                window.analyticsChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                            label: 'User Interactions',
                            data: [65, 78, 90, 81, 96, 55, 72],
                            fill: false,
                            backgroundColor: '#1FB8CD',
                            borderColor: '#1FB8CD',
                            borderWidth: 2
                        }, {
                            label: 'Applications',
                            data: [28, 35, 42, 38, 45, 25, 33],
                            fill: false,
                            backgroundColor: '#FFC185',
                            borderColor: '#FFC185',
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });

                console.log('✅ Analytics chart rendered');
            } catch (error) {
                console.error('❌ Error rendering analytics chart:', error);
            }
        }
    }

    // Initialize Advanced Sarah App - FIXED
    function initAdvancedApp() {
        console.log('🚀 Starting Advanced Sarah Enterprise System...');
        
        try {
            app = new AdvancedSarahApp();
            app.init();
            
            // Global access
            window.sarahApp = app;
            
            console.log('🎉 Advanced Sarah System ready for enterprise operations');
        } catch (error) {
            console.error('💥 Failed to initialize Advanced Sarah System:', error);
        }
    }

    // Start the advanced system
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAdvancedApp);
    } else {
        initAdvancedApp();
    }

})();
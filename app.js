// Kwalifai Complete Website Application with Real AI Integration
class KwalifaiApp {
    constructor() {
        this.currentPage = 'home';
        this.chatState = {
            isOpen: false,
            currentAgent: 'ai',
            conversationHistory: [],
            userInfo: {},
            pendingHumanHandoff: false,
            messageCount: 0,
            uploadedFiles: [],
            documentsProcessed: 0
        };
        
        // AI Integration Settings
        this.sessionId = null;
        this.isAiTyping = false;
        this.backendUrl = 'http://localhost:5000'; // Change this for production deployment
        this.maxRetries = 3;
        this.retryCount = 0;
        
        // Rate banner configuration
        this.rateBannerConfig = {
            displayDelay: 2500,
            isDismissible: true,
            autoRefresh: 300000
        };
        
        // News data
        this.newsArticles = [
            {
                id: '1',
                headline: 'Mortgage Rates Hit 7.2% Amid Fed Policy Uncertainty',
                publication: 'HousingWire',
                author: 'Sarah Johnson',
                publishDate: '2025-09-01',
                category: 'market-updates',
                aiSummary: 'The 30-year fixed mortgage rate climbed to 7.2%, the highest level since November 2023, as investors price in potential Federal Reserve policy changes. Mortgage applications fell 15% week-over-week as affordability concerns mount.',
                sentiment: 'negative',
                tags: ['mortgage rates', 'fed policy', 'housing market'],
                originalUrl: 'https://housingwire.com/articles/mortgage-rates-hit-7-2-percent/',
                featured: true
            },
            {
                id: '2',
                headline: 'AI-Powered Underwriting Shows 40% Faster Approval Times',
                publication: 'National Mortgage News',
                author: 'Michael Chen',
                publishDate: '2025-08-31',
                category: 'technology',
                aiSummary: 'Major lenders implementing AI-driven underwriting systems report significant efficiency gains, with loan processing times reduced from 45 to 27 days on average. Consumer satisfaction scores also improved by 25%.',
                sentiment: 'positive',
                tags: ['AI', 'underwriting', 'loan processing'],
                originalUrl: 'https://nationalmortgagenews.com/ai-underwriting-efficiency/'
            },
            {
                id: '3',
                headline: 'New CFPB Guidelines Target Digital Mortgage Platforms',
                publication: 'American Banker',
                author: 'Jessica Rodriguez',
                publishDate: '2025-08-30',
                category: 'regulatory',
                aiSummary: 'The Consumer Financial Protection Bureau released new guidance for digital mortgage platforms, emphasizing fair lending practices and data privacy requirements. Compliance deadlines set for early 2026.',
                sentiment: 'neutral',
                tags: ['CFPB', 'regulation', 'digital lending'],
                originalUrl: 'https://americanbanker.com/cfpb-digital-mortgage-guidelines/'
            },
            {
                id: '4',
                headline: 'First-Time Homebuyer Programs See Record Demand',
                publication: 'Mortgage Banking Magazine',
                author: 'David Kim',
                publishDate: '2025-08-29',
                category: 'consumer-trends',
                aiSummary: 'Government-backed first-time homebuyer assistance programs experienced 45% increase in applications compared to last year, driven by innovative down payment assistance and educational initiatives.',
                sentiment: 'positive',
                tags: ['first-time buyers', 'government programs', 'down payment assistance'],
                originalUrl: 'https://mortgagebanking.com/first-time-buyer-demand/'
            },
            {
                id: '5',
                headline: 'Jumbo Loan Limits Increase 5% for 2026',
                publication: 'HousingWire',
                author: 'Amanda Torres',
                publishDate: '2025-08-28',
                category: 'regulatory',
                aiSummary: 'Federal Housing Finance Agency announces conforming loan limits will rise to $827,300 for most areas in 2026, reflecting continued home price appreciation. High-cost areas may see limits up to $1.24 million.',
                sentiment: 'neutral',
                tags: ['loan limits', 'FHFA', 'jumbo loans'],
                originalUrl: 'https://housingwire.com/jumbo-loan-limits-2026/'
            },
            {
                id: '6',
                headline: 'Blockchain Technology Enters Mortgage Settlement Process',
                publication: 'National Mortgage News',
                author: 'Robert Chang',
                publishDate: '2025-08-27',
                category: 'technology',
                aiSummary: 'Three major title companies pilot blockchain-based settlement platform, promising to reduce closing times from 45 to 15 days while improving transparency and reducing errors in document management.',
                sentiment: 'positive',
                tags: ['blockchain', 'settlement', 'title companies'],
                originalUrl: 'https://nationalmortgagenews.com/blockchain-settlements/'
            }
        ];
        
        this.filteredArticles = [...this.newsArticles];
        this.currentNewsFilter = 'all';
        this.newsSearchQuery = '';
        
        this.init();
    }
    
    init() {
        this.initializeNavigation();
        this.initializeRateBanner();
        this.initializeChat();
        this.initializeNews();
        this.initializeEventListeners();
        
        // Show rate banner after delay
        setTimeout(() => {
            this.showRateBanner();
        }, this.rateBannerConfig.displayDelay);
        
        console.log('🚀 Kwalifai website initialized with AI integration');
    }
    
    initializeNavigation() {
        this.updateActiveNavLink();
    }
    
    initializeRateBanner() {
        const closeBanner = document.getElementById('closeBanner');
        if (closeBanner) {
            closeBanner.addEventListener('click', () => {
                this.hideRateBanner();
            });
        }
        
        const rateQuoteBtn = document.getElementById('rateQuoteBtn');
        if (rateQuoteBtn) {
            rateQuoteBtn.addEventListener('click', () => {
                this.openChat('rate_quote');
            });
        }
        
        const rateChatBtn = document.getElementById('rateChatBtn');
        if (rateChatBtn) {
            rateChatBtn.addEventListener('click', () => {
                this.openChat();
            });
        }
    }
    
    initializeChat() {
        const chatModal = document.getElementById('chat-modal');
        const chatBackdrop = document.getElementById('chat-backdrop');
        const chatClose = document.getElementById('chat-close');
        const chatSend = document.getElementById('chat-send');
        const chatInput = document.getElementById('chat-input');
        const fileUploadBtn = document.getElementById('file-upload-btn');
        const fileInput = document.getElementById('file-input');
        
        // Chat modal triggers
        const chatButtons = [
            document.getElementById('header-chat-btn'),
            document.getElementById('get-qualified-btn'),
            document.getElementById('about-chat-btn')
        ];
        
        chatButtons.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => {
                    this.openChat();
                });
            }
        });
        
        // Close chat handlers
        if (chatClose) {
            chatClose.addEventListener('click', () => {
                this.closeChat();
            });
        }
        
        if (chatBackdrop) {
            chatBackdrop.addEventListener('click', () => {
                this.closeChat();
            });
        }
        
        // Send message handlers
        if (chatSend) {
            chatSend.addEventListener('click', () => {
                this.sendChatMessage();
            });
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendChatMessage();
                }
            });
        }
        
        // File upload handlers
        if (fileUploadBtn) {
            fileUploadBtn.addEventListener('click', () => {
                if (fileInput) {
                    fileInput.click();
                }
            });
        }
        
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileUpload(e.target.files);
            });
        }
    }
    
    initializeNews() {
        if (this.currentPage === 'news') {
            this.renderNews();
        }
        
        // News search
        const newsSearch = document.getElementById('news-search');
        if (newsSearch) {
            newsSearch.addEventListener('input', (e) => {
                this.newsSearchQuery = e.target.value.toLowerCase();
                this.applyNewsFilters();
            });
        }
        
        // News filter tabs
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all tabs
                filterTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Update current filter
                this.currentNewsFilter = tab.dataset.category || 'all';
                this.applyNewsFilters();
            });
        });
        
        // Load more news button
        const loadMoreBtn = document.getElementById('load-more-news');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreNews();
            });
        }
    }
    
    initializeEventListeners() {
        // Learn more button
        const learnMoreBtn = document.getElementById('learn-more-btn');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', () => {
                this.scrollToSection('process');
            });
        }
    }
    
    // Navigation methods
    navigateToPage(page) {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(p => p.classList.remove('active'));
        
        // Show target page
        let targetPage;
        switch(page) {
            case '/':
                targetPage = 'home';
                break;
            case '/news':
                targetPage = 'news';
                break;
            case '/about':
                targetPage = 'about';
                break;
            default:
                targetPage = 'home';
        }
        
        const pageElement = document.getElementById(`page-${targetPage}`);
        if (pageElement) {
            pageElement.classList.add('active');
            this.currentPage = targetPage;
            
            // Initialize page-specific functionality
            if (targetPage === 'news') {
                this.renderNews();
            }
            
            // Update active nav link
            this.updateActiveNavLink();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    updateActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const page = link.dataset.page;
            if (
                (page === 'home' && this.currentPage === 'home') ||
                (page === 'news' && this.currentPage === 'news') ||
                (page === 'about' && this.currentPage === 'about')
            ) {
                link.classList.add('active');
            }
        });
    }
    
    // Rate banner methods
    showRateBanner() {
        const rateBanner = document.getElementById('rateBanner');
        if (rateBanner) {
            rateBanner.classList.remove('hidden');
            rateBanner.classList.add('show');
            document.body.classList.add('rate-banner-visible');
        }
    }
    
    hideRateBanner() {
        const rateBanner = document.getElementById('rateBanner');
        if (rateBanner) {
            rateBanner.classList.remove('show');
            rateBanner.classList.add('hidden');
            document.body.classList.remove('rate-banner-visible');
        }
    }
    
    // ENHANCED AI CHAT METHODS
    openChat(context = 'general') {
        const chatModal = document.getElementById('chat-modal');
        if (chatModal) {
            chatModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Initialize chat with context-specific greeting
            this.initializeChatContext(context);
            
            // Focus input
            const chatInput = document.getElementById('chat-input');
            if (chatInput) {
                setTimeout(() => {
                    chatInput.focus();
                }, 300);
            }
        }
    }
    
    closeChat() {
        const chatModal = document.getElementById('chat-modal');
        if (chatModal) {
            chatModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
    
    initializeChatContext(context) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        
        // Clear previous messages
        chatMessages.innerHTML = '';
        
        // Reset session for new conversation
        this.sessionId = null;
        this.retryCount = 0;
        
        let greeting;
        switch (context) {
            case 'rate_quote':
                greeting = "Hi! I'm Kira from Kwalifai. I see you're interested in our current rates. I'll help you get qualified quickly using AI technology, then connect you with licensed loan officers who can provide personalized rate quotes. What type of loan are you considering?";
                break;
            case 'qualification':
                greeting = "Hi! I'm Kira from Kwalifai. Let's get you qualified fast! I'll use AI to analyze your information quickly, then connect you with licensed loan officers for personalized rates. Are you looking to purchase or refinance?";
                break;
            default:
                greeting = "Hi! I'm Kira from Kwalifai. I help you get qualified for a mortgage quickly using AI technology, then connect you with licensed loan officers who can provide personalized rate quotes. Are you looking to purchase or refinance?";
        }
        
        this.addChatMessage('ai', greeting);
    }
    
    sendChatMessage() {
        const chatInput = document.getElementById('chat-input');
        if (!chatInput || !chatInput.value.trim()) return;
        
        const message = chatInput.value.trim();
        this.addChatMessage('user', message);
        chatInput.value = '';
        
        // Reset retry count for new message
        this.retryCount = 0;
        
        // Call AI response handler
        this.handleAIResponse(message);
    }
    
    // REAL AI INTEGRATION - This replaces the old hardcoded responses
    async handleAIResponse(userMessage) {
        // Prevent multiple simultaneous requests
        if (this.isAiTyping) {
            console.log('AI is already processing a message');
            return;
        }
        
        this.isAiTyping = true;
        
        // Show typing indicator
        const typingMessage = this.addChatMessage('ai', '🤖 Kira is thinking...');
        typingMessage.classList.add('typing-message');
        
        try {
            // Ensure we have a session ID
            if (!this.sessionId) {
                this.sessionId = this.generateSessionId();
            }
            
            console.log('💬 Sending message to AI:', userMessage);
            console.log('🔗 Backend URL:', this.backendUrl);
            
            // Call your AI backend
            const response = await fetch(`${this.backendUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    message: userMessage.trim(),
                    sessionId: this.sessionId
                }),
                // Add timeout to prevent hanging
                signal: AbortSignal.timeout(30000) // 30 second timeout
            });
            
            console.log('📡 AI Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('✅ AI Response data:', data);
            
            // Remove typing indicator
            this.removeChatMessage(typingMessage);
            
            // Add AI response
            this.addChatMessage('ai', data.reply);
            
            // Update session ID if provided
            if (data.sessionId) {
                this.sessionId = data.sessionId;
            }
            
            // Reset retry count on success
            this.retryCount = 0;
            
        } catch (error) {
            console.error('❌ AI Backend Error:', error);
            
            // Remove typing indicator
            this.removeChatMessage(typingMessage);
            
            // Determine error type and provide appropriate fallback
            let fallbackMessage = this.getFallbackMessage(error);
            
            // Add fallback message
            this.addChatMessage('ai', fallbackMessage);
            
            // Add retry functionality for network errors
            if (this.shouldRetry(error)) {
                this.addRetryButton(userMessage);
            }
            
        } finally {
            this.isAiTyping = false;
        }
    }
    
    // Helper method to generate session IDs
    generateSessionId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        const sessionId = `kwalifai_${timestamp}_${random}`;
        
        console.log('🆔 Generated new session ID:', sessionId);
        return sessionId;
    }
    
    // Helper method to safely remove chat messages
    removeChatMessage(messageElement) {
        if (messageElement && messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
        }
    }
    
    // Enhanced addChatMessage that returns the message element
    addChatMessage(sender, text) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return null;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = text;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Return the message element so it can be removed later if needed
        return messageDiv;
    }
    
    // Get appropriate fallback message based on error type
    getFallbackMessage(error) {
        if (error.name === 'TimeoutError') {
            return "I'm taking a bit longer to respond than usual. This might be due to high demand. Please try again, or I can connect you with one of our licensed loan officers for immediate assistance at (555) 123-4567.";
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            return "I'm having trouble connecting to my AI services right now. This could be a temporary network issue. Please try refreshing the page and chatting again, or contact our loan officers directly at (555) 123-4567 for immediate assistance.";
        } else if (error.message.includes('500')) {
            return "I'm experiencing some technical difficulties at the moment. Our licensed loan officers are standing by to help with all your mortgage questions! Call (555) 123-4567 or try chatting again in a few minutes.";
        } else if (error.message.includes('401') || error.message.includes('403')) {
            return "There seems to be an authentication issue with my AI services. Please contact our technical support or speak directly with our licensed loan officers at (555) 123-4567.";
        } else {
            return "I apologize, but I'm having technical difficulties right now. Let me connect you with one of our licensed loan officers who can provide immediate assistance with your mortgage needs. Call (555) 123-4567 or try chatting again in a moment.";
        }
    }
    
    // Determine if we should offer retry functionality
    shouldRetry(error) {
        const retryableErrors = ['Failed to fetch', 'NetworkError', 'TimeoutError', '500', '502', '503', '504'];
        return retryableErrors.some(errorType => 
            error.message.includes(errorType) || error.name === errorType
        ) && this.retryCount < this.maxRetries;
    }
    
    // Add retry button for failed messages
    addRetryButton(originalMessage) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        
        const retryContainer = document.createElement('div');
        retryContainer.className = 'chat-message ai retry-container';
        retryContainer.innerHTML = `
            <div class="message-content">
                <button class="retry-button" onclick="window.kwalifaiApp.retryMessage('${originalMessage.replace(/'/g, "\\'")}')">
                    🔄 Try Again
                </button>
                <button class="contact-button" onclick="window.location.href='tel:5551234567'">
                    📞 Call Now: (555) 123-4567
                </button>
            </div>
        `;
        
        chatMessages.appendChild(retryContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Retry failed message
    async retryMessage(message) {
        // Remove retry button
        const retryContainer = document.querySelector('.retry-container');
        if (retryContainer) {
            retryContainer.remove();
        }
        
        // Increment retry count
        this.retryCount++;
        
        console.log(`🔄 Retrying message (attempt ${this.retryCount}):`, message);
        
        // Retry the AI response
        await this.handleAIResponse(message);
    }
    
    // File upload handling with AI integration
    handleFileUpload(files) {
        if (!files || files.length === 0) return;
        
        Array.from(files).forEach(file => {
            // Validate file type and size
            const allowedTypes = [
                'application/pdf', 
                'image/jpeg', 
                'image/png', 
                'application/msword', 
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ];
            const maxSize = 10 * 1024 * 1024; // 10MB
            
            if (!allowedTypes.includes(file.type)) {
                this.addChatMessage('ai', `I'm sorry, but I can't process ${file.type} files. Please upload PDF, JPG, PNG, DOC, DOCX, XLS, or XLSX files.`);
                return;
            }
            
            if (file.size > maxSize) {
                this.addChatMessage('ai', `The file "${file.name}" is too large. Please upload files under 10MB.`);
                return;
            }
            
            // Simulate file processing
            this.addChatMessage('user', `📎 Uploaded: ${file.name}`);
            
            setTimeout(() => {
                const documentType = this.identifyDocumentType(file.name);
                const responseMessage = `Great! I've received your ${documentType}. I'm analyzing it now using AI. This will help speed up your qualification process. Based on this document, let me ask you a few follow-up questions to ensure we have everything needed for your qualification.`;
                
                this.addChatMessage('ai', responseMessage);
                
                // Trigger AI response with document context
                setTimeout(() => {
                    this.handleAIResponse(`I uploaded a ${documentType} file named ${file.name}. What questions do you have about this document?`);
                }, 1000);
            }, 1500);
        });
    }
    
    // Identify document type from filename
    identifyDocumentType(filename) {
        const lower = filename.toLowerCase();
        if (lower.includes('w2') || lower.includes('w-2')) {
            return 'W-2 form';
        } else if (lower.includes('paystub') || lower.includes('pay_stub') || lower.includes('payroll')) {
            return 'pay stub';
        } else if (lower.includes('bank') || lower.includes('statement')) {
            return 'bank statement';
        } else if (lower.includes('tax') || lower.includes('1040')) {
            return 'tax return';
        } else if (lower.includes('credit') || lower.includes('score')) {
            return 'credit report';
        } else {
            return 'document';
        }
    }
    
    // News methods (unchanged from original)
    renderNews() {
        this.renderFeaturedArticle();
        this.renderArticlesGrid();
    }
    
    renderFeaturedArticle() {
        const featuredContainer = document.getElementById('featured-article');
        if (!featuredContainer) return;
        
        const featuredArticle = this.filteredArticles.find(article => article.featured) || this.filteredArticles[0];
        if (!featuredArticle) return;
        
        featuredContainer.innerHTML = `
            <div class="featured-article__content">
                <div class="article-card__meta">
                    <span class="article-card__source">${featuredArticle.publication}</span>
                    <span class="article-card__date">${this.formatDate(featuredArticle.publishDate)}</span>
                </div>
                <h2 class="article-card__title">${featuredArticle.headline}</h2>
                <p class="article-card__summary">${featuredArticle.aiSummary}</p>
                <div class="article-card__footer">
                    <div class="article-card__tags">
                        ${featuredArticle.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="sentiment-indicator ${featuredArticle.sentiment}">
                        <span class="sentiment-dot"></span>
                        ${featuredArticle.sentiment}
                    </div>
                </div>
                <a href="${featuredArticle.originalUrl}" class="btn btn--primary" target="_blank" rel="noopener">
                    Read Full Article
                </a>
            </div>
        `;
    }
    
    renderArticlesGrid() {
        const gridContainer = document.getElementById('articles-grid');
        if (!gridContainer) return;
        
        const regularArticles = this.filteredArticles.filter(article => !article.featured);
        
        if (regularArticles.length === 0) {
            gridContainer.innerHTML = `
                <div class="no-results">
                    <h3>No articles found</h3>
                    <p>Try adjusting your search terms or filters.</p>
                </div>
            `;
            return;
        }
        
        gridContainer.innerHTML = regularArticles.map(article => `
            <div class="article-card">
                <div class="article-card__meta">
                    <span class="article-card__source">${article.publication}</span>
                    <span class="article-card__date">${this.formatDate(article.publishDate)}</span>
                </div>
                <h3 class="article-card__title">${article.headline}</h3>
                <p class="article-card__summary">${article.aiSummary}</p>
                <div class="article-card__footer">
                    <div class="article-card__tags">
                        ${article.tags.slice(0, 2).map(tag => `<span class="article-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="article-card__actions">
                        <span class="sentiment-indicator ${article.sentiment}">
                            <span class="sentiment-dot"></span>
                            ${article.sentiment}
                        </span>
                        <a href="${article.originalUrl}" class="btn btn--outline" target="_blank" rel="noopener">
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    applyNewsFilters() {
        let filtered = [...this.newsArticles];
        
        // Apply category filter
        if (this.currentNewsFilter !== 'all') {
            filtered = filtered.filter(article => article.category === this.currentNewsFilter);
        }
        
        // Apply search filter
        if (this.newsSearchQuery) {
            filtered = filtered.filter(article =>
                article.headline.toLowerCase().includes(this.newsSearchQuery) ||
                article.aiSummary.toLowerCase().includes(this.newsSearchQuery) ||
                article.tags.some(tag => tag.toLowerCase().includes(this.newsSearchQuery)) ||
                article.author.toLowerCase().includes(this.newsSearchQuery) ||
                article.publication.toLowerCase().includes(this.newsSearchQuery)
            );
        }
        
        this.filteredArticles = filtered;
        
        if (this.currentPage === 'news') {
            this.renderNews();
        }
    }
    
    loadMoreNews() {
        console.log('Loading more articles...');
        
        const loadMoreBtn = document.getElementById('load-more-news');
        if (loadMoreBtn) {
            loadMoreBtn.textContent = 'Loading...';
            
            setTimeout(() => {
                loadMoreBtn.textContent = 'Load More Articles';
            }, 1500);
        }
    }
    
    // Utility methods
    formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
            });
        }
    }
    
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerOffset = document.querySelector('.rate-banner.show') ? 140 : 80;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Global navigation function for onclick handlers
function navigateToPage(page) {
    if (window.kwalifaiApp) {
        window.kwalifaiApp.navigateToPage(page);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.kwalifaiApp = new KwalifaiApp();
    console.log('🤖 Kwalifai AI-powered website ready!');
});

// Enhanced error handling for the entire application
window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
    // Don't break the app on errors
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // Don't break the app on promise rejections
});

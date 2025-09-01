// Application State
let currentPage = 'home';
let currentFilter = 'all';
let articlesDisplayed = 6;
let searchResults = [];
let allArticles = [];
let isSearchMode = false;
let chatMessages = [];

// Sample article data based on provided data
const sampleArticles = [
    {
        id: "1",
        headline: "Mortgage Rates Hit 7.2% Amid Fed Policy Uncertainty",
        publication: "HousingWire",
        author: "Sarah Johnson",
        publishDate: "2025-09-01",
        category: "market-updates",
        aiSummary: "The 30-year fixed mortgage rate climbed to 7.2%, the highest level since November 2023, as investors price in potential Federal Reserve policy changes. Mortgage applications fell 15% week-over-week as affordability concerns mount.",
        sentiment: "negative",
        tags: ["mortgage rates", "fed policy", "housing market"],
        originalUrl: "https://housingwire.com/articles/mortgage-rates-hit-7-2-percent/"
    },
    {
        id: "2", 
        headline: "AI-Powered Underwriting Shows 40% Faster Approval Times",
        publication: "National Mortgage News",
        author: "Michael Chen",
        publishDate: "2025-08-31",
        category: "technology",
        aiSummary: "Major lenders implementing AI-driven underwriting systems report significant efficiency gains, with loan processing times reduced from 45 to 27 days on average. Consumer satisfaction scores also improved by 25%.",
        sentiment: "positive", 
        tags: ["AI", "underwriting", "loan processing"],
        originalUrl: "https://nationalmortgagenews.com/ai-underwriting-efficiency/"
    },
    {
        id: "3",
        headline: "New CFPB Guidelines Target Digital Mortgage Platforms",
        publication: "American Banker",
        author: "Jessica Rodriguez",
        publishDate: "2025-08-30",
        category: "regulatory",
        aiSummary: "The Consumer Financial Protection Bureau released new guidance for digital mortgage platforms, emphasizing fair lending practices and data privacy requirements. Compliance deadlines set for early 2026.",
        sentiment: "neutral",
        tags: ["CFPB", "regulation", "digital lending"],
        originalUrl: "https://americanbanker.com/cfpb-digital-mortgage-guidelines/"
    },
    {
        id: "4",
        headline: "Housing Inventory Shortage Drives Competition Among Lenders",
        publication: "Mortgage Banking Magazine",
        author: "David Park",
        publishDate: "2025-08-29",
        category: "industry-analysis",
        aiSummary: "With housing inventory at historic lows, mortgage lenders are intensifying competition for qualified borrowers through enhanced digital experiences and streamlined approval processes.",
        sentiment: "neutral",
        tags: ["housing inventory", "competition", "lenders"],
        originalUrl: "https://mortgagebanking.com/housing-inventory-competition/"
    },
    {
        id: "5",
        headline: "FHA Announces Updates to Loan Limits for 2026",
        publication: "HousingWire",
        author: "Maria Gonzalez",
        publishDate: "2025-08-28",
        category: "regulatory",
        aiSummary: "The Federal Housing Administration released preliminary 2026 loan limit adjustments, with increases expected in high-cost areas to reflect continued home price appreciation.",
        sentiment: "neutral",
        tags: ["FHA", "loan limits", "2026"],
        originalUrl: "https://housingwire.com/fha-loan-limits-2026/"
    },
    {
        id: "6",
        headline: "First-Time Homebuyers Face Unprecedented Affordability Crisis",
        publication: "National Mortgage News",
        author: "Lisa Chang",
        publishDate: "2025-08-27",
        category: "market-updates",
        aiSummary: "Rising mortgage rates combined with high home prices have pushed homeownership out of reach for many first-time buyers, with affordability indexes hitting 40-year lows in major metropolitan areas.",
        sentiment: "negative",
        tags: ["first-time buyers", "affordability", "housing crisis"],
        originalUrl: "https://nationalmortgagenews.com/first-time-buyer-affordability/"
    }
];

// Kira's conversation flow
const kiraFlows = {
    greeting: {
        message: "Hi! I'm Kira from Kwalifai. I help you get qualified for a mortgage quickly using AI technology, then connect you with licensed loan officers who can provide personalized rate quotes. Are you looking to purchase or refinance?",
        options: ["Purchase", "Refinance", "I'm just exploring"]
    },
    purchase: {
        message: "Great! I'll help you get pre-qualified for a purchase. What's your approximate annual household income?",
        options: ["Under $50k", "$50k-$75k", "$75k-$100k", "$100k-$150k", "Over $150k"]
    },
    refinance: {
        message: "Perfect! For refinancing, what's your current mortgage balance approximately?",
        options: ["Under $200k", "$200k-$400k", "$400k-$600k", "Over $600k"]
    },
    exploring: {
        message: "No problem! I can help you understand the mortgage process. Would you like to learn about qualification requirements or current market rates?",
        options: ["Qualification Requirements", "Current Rates", "How Kwalifai Works"]
    },
    income_next: {
        message: "Thanks! What's your estimated credit score?",
        options: ["Excellent (750+)", "Good (700-749)", "Fair (650-699)", "Needs improvement (<650)", "I don't know"]
    },
    qualification_complete: {
        message: "Based on your information, you appear to be a strong candidate for mortgage qualification! Our licensed loan officers can provide personalized rate quotes and guide you through the next steps. Would you like me to connect you with one of our professionals?",
        options: ["Yes, connect me", "Send me information", "I'll think about it"]
    },
    handoff: {
        message: "Perfect! I'm connecting you with one of our licensed loan officers who will contact you within the next business day with personalized rate quotes and next steps. Remember, NMLS ID: 1666674. Is there anything else I can help you with today?",
        options: ["Upload documents", "Schedule a call", "That's all, thanks!"]
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    allArticles = [...sampleArticles];
    initializeApp();
});

function initializeApp() {
    console.log('Initializing Kwalifai Application...');
    setupEventListeners();
    updateRateBanner();
    navigateToPage('home');
    console.log('Kwalifai Application Ready - NMLS ID: 1666674');
}

// Event Listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Navigation
    setupNavigation();
    
    // Rate banner
    setupRateBanner();
    
    // Home page interactions
    setupHomePageEvents();
    
    // News page interactions
    setupNewsPageEvents();
    
    // Chat functionality
    setupChatEvents();
    
    // Global events
    setupGlobalEvents();
    
    console.log('Event listeners setup complete');
}

function setupNavigation() {
    console.log('Setting up navigation...');
    
    // Logo click
    const homeLink = document.getElementById('homeLink');
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Logo clicked - navigating to home');
            navigateToPage('home');
        });
        console.log('Logo navigation setup');
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav__link');
    console.log('Found navigation links:', navLinks.length);
    
    navLinks.forEach(function(link, index) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            console.log('Navigation link clicked:', page);
            navigateToPage(page);
        });
        console.log('Setup nav link', index, link.getAttribute('data-page'));
    });
    
    // Footer navigation links
    const footerLinks = document.querySelectorAll('.footer__column a[data-page]');
    footerLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            console.log('Footer link clicked:', page);
            navigateToPage(page);
        });
    });
}

function setupRateBanner() {
    const closeBanner = document.getElementById('closeBanner');
    const getRateBtn = document.getElementById('getRateBtn');
    
    if (closeBanner) {
        closeBanner.addEventListener('click', function(e) {
            e.preventDefault();
            hideRateBanner();
        });
    }
    
    if (getRateBtn) {
        getRateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Get Rate button clicked');
            openKiraChat();
        });
    }
    
    // Auto-hide banner after 15 seconds
    setTimeout(function() {
        const rateBanner = document.getElementById('rateBanner');
        if (rateBanner && !rateBanner.classList.contains('hidden')) {
            hideRateBanner();
        }
    }, 15000);
}

function setupHomePageEvents() {
    console.log('Setting up home page events...');
    
    // Hero buttons
    const startQualificationBtn = document.getElementById('startQualification');
    const learnMoreBtn = document.getElementById('learnMore');
    const chatWithKiraBtn = document.getElementById('chatWithKira');
    
    if (startQualificationBtn) {
        startQualificationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Start Qualification clicked');
            openKiraChat();
        });
        console.log('Start Qualification button setup');
    }
    
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Learn More clicked');
            navigateToPage('about');
        });
        console.log('Learn More button setup');
    }
    
    if (chatWithKiraBtn) {
        chatWithKiraBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Chat with Kira clicked');
            openKiraChat();
        });
        console.log('Chat with Kira button setup');
    }
}

function setupNewsPageEvents() {
    console.log('Setting up news page events...');
    
    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const closeSearch = document.getElementById('closeSearch');
    const searchOverlay = document.getElementById('searchOverlay');
    const performSearch = document.getElementById('performSearch');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openSearchModal();
        });
    }
    
    if (closeSearch) {
        closeSearch.addEventListener('click', function(e) {
            e.preventDefault();
            closeSearchModal();
        });
    }
    
    if (searchOverlay) {
        searchOverlay.addEventListener('click', function(e) {
            e.preventDefault();
            closeSearchModal();
        });
    }
    
    if (performSearch) {
        performSearch.addEventListener('click', function(e) {
            e.preventDefault();
            handleSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
            }
        });
    }
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            setActiveFilter(filter);
            filterArticles(filter);
        });
    });
    
    // Category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            setActiveFilter(category);
            filterArticles(category);
            scrollToNewsSection();
        });
    });
    
    // Topic tags
    const topicTags = document.querySelectorAll('.topic-tag');
    topicTags.forEach(function(tag) {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const topic = this.getAttribute('data-topic');
            searchArticlesByTopic(topic);
        });
    });
    
    // Load more button
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loadMoreArticles();
        });
    }
}

function setupChatEvents() {
    console.log('Setting up chat events...');
    
    const closeKira = document.getElementById('closeKira');
    const kiraOverlay = document.getElementById('kiraOverlay');
    const sendMessage = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatInput');
    const uploadDocs = document.getElementById('uploadDocs');
    const scheduleCall = document.getElementById('scheduleCall');
    
    if (closeKira) {
        closeKira.addEventListener('click', function(e) {
            e.preventDefault();
            closeKiraChat();
        });
    }
    
    if (kiraOverlay) {
        kiraOverlay.addEventListener('click', function(e) {
            e.preventDefault();
            closeKiraChat();
        });
    }
    
    if (sendMessage) {
        sendMessage.addEventListener('click', function(e) {
            e.preventDefault();
            handleChatMessage();
        });
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleChatMessage();
            }
        });
    }
    
    if (uploadDocs) {
        uploadDocs.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Document upload feature would open secure file upload interface. NMLS ID: 1666674');
        });
    }
    
    if (scheduleCall) {
        scheduleCall.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Schedule call feature would open calendar booking system with licensed loan officers.');
        });
    }
}

function setupGlobalEvents() {
    // Escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSearchModal();
            closeKiraChat();
        }
    });
    
    // Update rates periodically
    setInterval(updateRateBanner, 5 * 60 * 1000); // Every 5 minutes
}

// Navigation Functions
function navigateToPage(page) {
    console.log('Navigating to page:', page);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(function(p) {
        p.classList.add('hidden');
    });
    
    // Show target page
    const targetPage = document.getElementById(page + 'Page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
        console.log('Showing page:', page);
    } else {
        console.error('Page not found:', page + 'Page');
    }
    
    // Update nav links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(function(link) {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    currentPage = page;
    
    // Initialize page-specific functionality
    if (page === 'news') {
        displayArticles();
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Rate Banner Functions
function updateRateBanner() {
    // Simulate real-time rate updates with base rates from data
    const rates = {
        '30-year': (7.125 + Math.random() * 0.1 - 0.05).toFixed(3),
        '15-year': (6.750 + Math.random() * 0.1 - 0.05).toFixed(3),
        '5-1-arm': (6.375 + Math.random() * 0.1 - 0.05).toFixed(3)
    };
    
    const rateElements = document.querySelectorAll('.rate-value');
    if (rateElements.length >= 3) {
        rateElements[0].textContent = rates['30-year'] + '%';
        rateElements[1].textContent = rates['15-year'] + '%';
        rateElements[2].textContent = rates['5-1-arm'] + '%';
    }
}

function hideRateBanner() {
    const rateBanner = document.getElementById('rateBanner');
    if (rateBanner) {
        rateBanner.classList.add('hidden');
        // Adjust header position
        const header = document.querySelector('.header');
        if (header) {
            header.style.top = '0';
            header.style.marginTop = '0';
        }
    }
}

// Chat Functions
function openKiraChat() {
    console.log('Opening Kira chat...');
    const kiraModal = document.getElementById('kiraModal');
    if (kiraModal) {
        kiraModal.classList.remove('hidden');
        initializeChat();
        console.log('Kira chat opened');
    } else {
        console.error('Kira modal not found');
    }
}

function closeKiraChat() {
    const kiraModal = document.getElementById('kiraModal');
    if (kiraModal) {
        kiraModal.classList.add('hidden');
    }
}

function initializeChat() {
    chatMessages = [];
    const chatMessagesDiv = document.getElementById('chatMessages');
    if (chatMessagesDiv) {
        chatMessagesDiv.innerHTML = `
            <div class="chat__message chat__message--kira">
                <div class="chat__avatar">K</div>
                <div class="chat__content">
                    <p>${kiraFlows.greeting.message}</p>
                    <div class="chat__options">
                        ${kiraFlows.greeting.options.map(function(option) {
                            return `<button class="btn btn--sm btn--outline" onclick="handleChatOption('greeting', '${option}')">${option}</button>`;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }
}

function handleChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    addChatMessage('user', message);
    chatInput.value = '';
    
    // Simulate AI response
    setTimeout(function() {
        const response = generateKiraResponse(message);
        addChatMessage('kira', response);
    }, 1000);
}

// Global function for chat options
window.handleChatOption = function(flow, option) {
    addChatMessage('user', option);
    
    setTimeout(function() {
        let nextFlow, response;
        
        switch(flow) {
            case 'greeting':
                if (option === 'Purchase') {
                    response = kiraFlows.purchase.message;
                    nextFlow = 'purchase';
                } else if (option === 'Refinance') {
                    response = kiraFlows.refinance.message;
                    nextFlow = 'refinance';
                } else {
                    response = kiraFlows.exploring.message;
                    nextFlow = 'exploring';
                }
                break;
            case 'purchase':
            case 'refinance':
                response = kiraFlows.income_next.message;
                nextFlow = 'income_next';
                break;
            case 'income_next':
                response = kiraFlows.qualification_complete.message;
                nextFlow = 'qualification_complete';
                break;
            case 'qualification_complete':
                if (option === 'Yes, connect me') {
                    response = kiraFlows.handoff.message;
                    nextFlow = 'handoff';
                } else {
                    response = "I understand. Feel free to reach out when you're ready. Our licensed loan officers are here to help with personalized rate quotes. Remember, we're licensed in all 50 states (NMLS ID: 1666674).";
                    nextFlow = null;
                }
                break;
            default:
                response = "Thank you for chatting with Kwalifai! Our licensed professionals are ready to help you with personalized mortgage solutions.";
                nextFlow = null;
        }
        
        addChatMessage('kira', response, nextFlow);
    }, 1000);
};

function addChatMessage(sender, message, nextFlow) {
    const chatMessagesDiv = document.getElementById('chatMessages');
    const isKira = sender === 'kira';
    
    const messageHTML = `
        <div class="chat__message ${isKira ? 'chat__message--kira' : 'chat__message--user'}">
            <div class="chat__avatar">${isKira ? 'K' : 'U'}</div>
            <div class="chat__content">
                <p>${message}</p>
                ${nextFlow && kiraFlows[nextFlow] && kiraFlows[nextFlow].options ? `
                    <div class="chat__options">
                        ${kiraFlows[nextFlow].options.map(function(option) {
                            return `<button class="btn btn--sm btn--outline" onclick="handleChatOption('${nextFlow}', '${option}')">${option}</button>`;
                        }).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    if (chatMessagesDiv) {
        chatMessagesDiv.insertAdjacentHTML('beforeend', messageHTML);
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
    }
}

function generateKiraResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('rate') || lowerMessage.includes('interest')) {
        return "Current rates vary based on your credit profile and loan details. Our licensed loan officers provide personalized rate quotes after reviewing your information. NMLS ID: 1666674. Would you like me to connect you with one of our professionals?";
    } else if (lowerMessage.includes('qualify') || lowerMessage.includes('qualification')) {
        return "I can help you understand qualification requirements! Generally, we look at income, credit score, debt-to-income ratio, and down payment. Would you like to start the qualification process?";
    } else if (lowerMessage.includes('document') || lowerMessage.includes('paperwork')) {
        return "Our secure document upload system accepts pay stubs, tax returns, bank statements, and other verification documents. All data is encrypted and handled according to banking security standards.";
    } else {
        return "I'm here to help with your mortgage questions! I focus on qualification - our licensed professionals handle all rate decisions and quotes. What would you like to know about the mortgage process?";
    }
}

// News Functions
function openSearchModal() {
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
        searchModal.classList.remove('hidden');
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }
}

function closeSearchModal() {
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
        searchModal.classList.add('hidden');
    }
}

function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const publicationFilter = document.getElementById('publicationFilter');
    
    const query = searchInput ? searchInput.value.trim() : '';
    const category = categoryFilter ? categoryFilter.value : '';
    const publication = publicationFilter ? publicationFilter.value : '';
    
    if (!query && !category && !publication) {
        alert('Please enter a search term or select filters.');
        return;
    }
    
    searchResults = allArticles.filter(function(article) {
        const matchesQuery = !query || 
            article.headline.toLowerCase().includes(query.toLowerCase()) ||
            article.aiSummary.toLowerCase().includes(query.toLowerCase()) ||
            article.tags.some(function(tag) {
                return tag.toLowerCase().includes(query.toLowerCase());
            });
        
        const matchesCategory = !category || article.category === category;
        
        const matchesPublication = !publication || 
            article.publication.toLowerCase().replace(/\s+/g, '-').includes(publication.toLowerCase());
        
        return matchesQuery && matchesCategory && matchesPublication;
    });
    
    isSearchMode = true;
    articlesDisplayed = 6;
    displaySearchResults();
    closeSearchModal();
    scrollToNewsSection();
}

function searchArticlesByTopic(topic) {
    searchResults = allArticles.filter(function(article) {
        return article.tags.some(function(tag) {
            return tag.toLowerCase().includes(topic.toLowerCase());
        }) ||
        article.headline.toLowerCase().includes(topic.toLowerCase()) ||
        article.aiSummary.toLowerCase().includes(topic.toLowerCase());
    });
    
    isSearchMode = true;
    articlesDisplayed = 6;
    displaySearchResults();
    scrollToNewsSection();
}

function displaySearchResults() {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) return;
    
    if (searchResults.length === 0) {
        newsGrid.innerHTML = `
            <div class="no-results">
                <h3>No articles found</h3>
                <p>Try adjusting your search criteria or browse by category.</p>
                <button class="btn btn--primary" onclick="clearSearch()">View All Articles</button>
            </div>
        `;
        updateLoadMoreButton(false);
        return;
    }
    
    const articles = searchResults.slice(0, articlesDisplayed);
    newsGrid.innerHTML = articles.map(createArticleCard).join('');
    updateLoadMoreButton(searchResults.length > articlesDisplayed);
}

// Global function for clearing search
window.clearSearch = function() {
    isSearchMode = false;
    searchResults = [];
    articlesDisplayed = 6;
    setActiveFilter('all');
    filterArticles('all');
    
    // Clear search inputs
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const publicationFilter = document.getElementById('publicationFilter');
    
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (publicationFilter) publicationFilter.value = '';
};

function setActiveFilter(filter) {
    currentFilter = filter;
    articlesDisplayed = 6;
    isSearchMode = false;
    searchResults = [];
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(function(btn) {
        const btnFilter = btn.getAttribute('data-filter');
        if (btnFilter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function filterArticles(filter) {
    let filteredArticles;
    
    if (filter === 'all') {
        filteredArticles = allArticles;
    } else {
        filteredArticles = allArticles.filter(function(article) {
            return article.category === filter;
        });
    }
    
    const articles = filteredArticles.slice(0, articlesDisplayed);
    const newsGrid = document.getElementById('newsGrid');
    if (newsGrid) {
        newsGrid.innerHTML = articles.map(createArticleCard).join('');
    }
    
    updateLoadMoreButton(filteredArticles.length > articlesDisplayed);
}

function displayArticles() {
    filterArticles(currentFilter);
}

function loadMoreArticles() {
    articlesDisplayed += 3;
    
    if (isSearchMode && searchResults.length > 0) {
        displaySearchResults();
    } else {
        filterArticles(currentFilter);
    }
}

function createArticleCard(article) {
    const formatDate = function(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    return `
        <div class="news-card" data-category="${article.category}">
            <div class="news-card__header">
                <div class="news-card__meta">
                    <span class="news-card__source">${article.publication}</span>
                    <span class="news-card__date">${formatDate(article.publishDate)}</span>
                </div>
                <h3 class="news-card__title">${article.headline}</h3>
            </div>
            <div class="news-card__body">
                <p class="news-card__summary">${article.aiSummary}</p>
                <div class="news-card__tags">
                    ${article.tags.slice(0, 3).map(function(tag) {
                        return `<span class="tag tag--neutral">${tag}</span>`;
                    }).join('')}
                </div>
                <div class="news-card__footer">
                    <span class="sentiment-indicator sentiment-indicator--${article.sentiment}">
                        ${article.sentiment.charAt(0).toUpperCase() + article.sentiment.slice(1)}
                    </span>
                    <a href="${article.originalUrl}" target="_blank" class="btn btn--sm btn--outline">
                        Read Article
                    </a>
                </div>
            </div>
        </div>
    `;
}

function updateLoadMoreButton(show) {
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = show ? 'block' : 'none';
    }
}

function scrollToNewsSection() {
    const newsSection = document.querySelector('.news-feed');
    if (newsSection) {
        newsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Utility Functions
function simulateRealTimeUpdates() {
    // Simulate new articles every 30 minutes
    setInterval(function() {
        const newArticleCount = Math.floor(Math.random() * 3) + 1;
        updateArticleCount('.category-card__count', newArticleCount);
    }, 30 * 60 * 1000);
}

function updateArticleCount(selector, increment) {
    const countElements = document.querySelectorAll(selector);
    countElements.forEach(function(element) {
        const currentCount = parseInt(element.textContent.match(/\d+/)[0]);
        const newCount = currentCount + increment;
        element.textContent = element.textContent.replace(/\d+/, newCount);
    });
}

// Initialize real-time updates
setTimeout(simulateRealTimeUpdates, 1000);

// Export functions for potential external use
window.KwalifaiApp = {
    navigateToPage: navigateToPage,
    openKiraChat: openKiraChat,
    selectCategory: function(categoryId) {
        navigateToPage('news');
        setTimeout(function() {
            setActiveFilter(categoryId);
            filterArticles(categoryId);
            scrollToNewsSection();
        }, 100);
    },
    searchArticles: function(query) {
        navigateToPage('news');
        setTimeout(function() {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = query;
                handleSearch();
            }
        }, 100);
    }
};
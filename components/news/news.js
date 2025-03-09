// News Panel Module
export const News = {
    init() {
        console.log('News module initialized'); // Debug log
        this.loadNewsComponent();
    },

    loadNewsComponent() {
        fetch('components/news/news.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('latest-news-container').innerHTML = html;
                this.initializeEventListeners();
            })
            .catch(error => {
                console.error('Error loading Latest News component:', error);
                // Create news panel directly if fetch fails
                this.createNewsPanel();
            });
    },

    createNewsPanel() {
        const newsContainer = document.getElementById('latest-news-container');
        if (newsContainer) {
            newsContainer.innerHTML = `
                <div class="news-panel">
                    <div class="news-panel-header">
                        <h3>Latest News</h3>
                        <button class="close-news-btn" aria-label="Close News Panel">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="news-items">
                        <div class="news-item">
                            <div class="news-date">February 2025</div>
                            <h4><a href="#" target="_blank">FPSO Amirante Tamandaré</a></h4>
                            <p><strong>Client:</strong> Export Credit Agencies<br>
                            <strong>Location:</strong> Brazil</p>
                            <p>FPSO Amirante Tamandaré completed its continuous production test and is operating under charter to Petrobras.</p>
                        </div>
                        <div class="news-item">
                            <div class="news-date">February 2025</div>
                            <h4><a href="#" target="_blank">Amiral</a></h4>
                            <p><strong>Client:</strong> Export Credit Agencies<br>
                            <strong>Location:</strong> Saudi Arabia</p>
                            <p>The Amiral petrochemical project has been awarded Middle East & Africa Petrochemical Deal of the Year for 2024.</p>
                        </div>
                        <div class="news-item">
                            <div class="news-date">January 2025</div>
                            <h4><a href="#" target="_blank">Chesapeake Bay Bridge-Tunnel</a></h4>
                            <p><strong>Client:</strong> US DOT TIFIA<br>
                            <strong>Location:</strong> Virginia, USA</p>
                            <p>Boring of the mile-long Parallel Thimble Shoal Tunnel was completed.</p>
                        </div>
                    </div>
                </div>
            `;
            this.initializeEventListeners();
        }
    },

    initializeEventListeners() {
        console.log('Initializing news event listeners'); // Debug log
        const newsBtn = document.querySelector('.news-toggle-btn');
        const newsPanel = document.querySelector('.news-panel');
        const siteWrapper = document.querySelector('.site-wrapper');
        const closeBtn = document.querySelector('.close-news-btn');

        if (newsBtn && newsPanel) {
            console.log('Found news button and panel, adding event listeners'); // Debug log
            
            // Toggle news panel
            newsBtn.addEventListener('click', () => {
                console.log('News button clicked'); // Debug log
                this.toggleNewsPanel(true);
            });
            
            // Close button functionality
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.toggleNewsPanel(false));
            }
            
            // Close on click outside for mobile
            document.addEventListener('click', (e) => {
                if (!newsPanel.contains(e.target) && 
                    !newsBtn.contains(e.target) && 
                    newsPanel.classList.contains('active')) {
                    this.toggleNewsPanel(false);
                }
            });

            // Initialize links to open in new tabs
            this.initializeNewsLinks();
        } else {
            console.error('News button or panel not found:', { 
                newsBtn: newsBtn ? 'Found' : 'Not found', 
                newsPanel: newsPanel ? 'Found' : 'Not found' 
            });
        }
    },

    toggleNewsPanel(show) {
        console.log('Toggling news panel, show:', show); // Debug log
        const newsPanel = document.querySelector('.news-panel');
        const siteWrapper = document.querySelector('.site-wrapper');

        if (!newsPanel || !siteWrapper) {
            console.error('Cannot toggle news panel, elements missing');
            return;
        }

        if (show) {
            newsPanel.classList.add('active');
            siteWrapper.classList.add('news-active');
        } else {
            newsPanel.classList.remove('active');
            siteWrapper.classList.remove('news-active');
        }
    },

    initializeNewsLinks() {
        const newsLinks = document.querySelectorAll('.news-item h4 a');
        newsLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                if (this.getAttribute('href') !== '#') {
                    window.open(this.href, '_blank');
                    event.preventDefault();
                }
            });
        });
    }
}; 
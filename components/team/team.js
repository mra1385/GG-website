// Team Module
export const Team = {
    init() {
        console.log('Team module initialized'); // Debug log
        this.loadTeamModals();
        this.initializeEventListeners();
    },

    loadTeamModals() {
        console.log('Loading team modals'); // Debug log
        const modalContainer = document.getElementById('team-modals-container');
        
        if (modalContainer) {
            fetch('components/team/teams.html')
                .then(response => response.text())
                .then(html => {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = html;
                    
                    // Replace the container with the loaded content
                    modalContainer.innerHTML = tempDiv.querySelector('#team-modals-container').innerHTML;
                    
                    // Re-initialize event listeners for the new modal elements
                    this.initializeModalEvents();
                })
                .catch(error => {
                    console.error('Error loading team modals:', error);
                });
        } else {
            console.error('Team modals container not found');
        }
    },

    initializeEventListeners() {
        // Team member click events
        const teamMembers = document.querySelectorAll('.team-member');
        console.log('Found team members:', teamMembers.length); // Debug log

        teamMembers.forEach((member) => {
            member.addEventListener('click', (e) => {
                // Extract modal ID from the onclick attribute or data attribute
                let modalId;
                const onclickAttr = e.currentTarget.getAttribute('onclick');
                if (onclickAttr && onclickAttr.includes('openTeamModal')) {
                    modalId = onclickAttr.match(/'([^']+)'/)[1];
                } else {
                    modalId = e.currentTarget.getAttribute('data-modal');
                }
                
                console.log('Clicked team member, modal ID:', modalId); // Debug log
                
                if (modalId) {
                    this.openModal(modalId);
                }
            });
        });

        // Initialize modal events after modals are loaded
    },

    initializeModalEvents() {
        // Close modal events
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                if (modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Close on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.active');
                if (openModal) {
                    this.closeModal(openModal.id);
                }
            }
        });
    },

    openModal(modalId) {
        console.log('Opening modal:', modalId); // Debug log
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 10);
        } else {
            console.error('Modal not found:', modalId);
        }
    },

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    }
}; 
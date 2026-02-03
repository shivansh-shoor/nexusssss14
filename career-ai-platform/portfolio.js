// Portfolio & Projects Management JavaScript
class PortfolioManager {
    constructor() {
        this.projects = this.loadProjects();
        this.currentProject = null;
        this.init();
    }

    init() {
        this.loadUserSession();
        this.renderProjects();
    }

    loadUserSession() {
        const savedUser = localStorage.getItem('cbai_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        } else {
            // Redirect to main page if not logged in
            window.location.href = 'index.html';
        }
    }

    loadProjects() {
        const savedProjects = localStorage.getItem('cbai_projects');
        return savedProjects ? JSON.parse(savedProjects) : this.getDefaultProjects();
    }

    getDefaultProjects() {
        return [
            {
                id: 'dashboard',
                title: 'Data Analysis Dashboard',
                description: 'Create interactive dashboards using Python, Pandas, and Streamlit',
                category: 'Data Analysis',
                difficulty: 'Intermediate',
                duration: '8 hours',
                progress: 65,
                tasks: [
                    { id: 1, title: 'Set up Python environment', completed: true },
                    { id: 2, title: 'Load and explore dataset', completed: true },
                    { id: 3, title: 'Create basic charts with Matplotlib', completed: false },
                    { id: 4, title: 'Build interactive dashboard with Streamlit', completed: false },
                    { id: 5, title: 'Add filters and interactivity', completed: false }
                ],
                skills: ['Python', 'Pandas', 'Matplotlib', 'Streamlit'],
                score: null
            },
            {
                id: 'scraper',
                title: 'Web Scraping Tool',
                description: 'Extract data from websites using BeautifulSoup and Requests',
                category: 'Web Development',
                difficulty: 'Beginner',
                duration: '6 hours',
                progress: 100,
                tasks: [
                    { id: 1, title: 'Install required libraries', completed: true },
                    { id: 2, title: 'Understand HTML structure', completed: true },
                    { id: 3, title: 'Write basic scraper', completed: true },
                    { id: 4, title: 'Handle pagination', completed: true },
                    { id: 5, title: 'Store data in CSV', completed: true }
                ],
                skills: ['Python', 'BeautifulSoup', 'Requests', 'Data Processing'],
                score: 92,
                githubUrl: 'https://github.com/example/web-scraper',
                completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
    }

    saveProjects() {
        localStorage.setItem('cbai_projects', JSON.stringify(this.projects));
    }

    renderProjects() {
        // Projects are rendered in HTML, this method can be used for dynamic updates
        console.log('Projects loaded:', this.projects);
    }

    showModal(content, title = '') {
        const modalHtml = `
            <div class="modal" id="active-modal">
                <div class="modal-content" style="max-width: 800px;">
                    ${title ? `
                        <div class="modal-header">
                            <h2 class="text-xl font-bold">${title}</h2>
                            <button onclick="portfolioManager.closeModal()" class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>
                    ` : ''}
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            </div>
        `;

        document.getElementById('modal-container').innerHTML = modalHtml;
        this.currentModal = document.getElementById('active-modal');
        
        setTimeout(() => {
            this.currentModal.classList.add('active');
        }, 10);
    }

    closeModal() {
        if (this.currentModal) {
            this.currentModal.classList.remove('active');
            setTimeout(() => {
                document.getElementById('modal-container').innerHTML = '';
                this.currentModal = null;
            }, 300);
        }
    }

    showProjectTemplates() {
        const templates = this.getProjectTemplates();
        
        const content = `
            <div>
                <h3 class="text-2xl font-bold mb-6">Choose a Project Template</h3>
                <div class="mb-6">
                    <input type="text" class="form-input" placeholder="Search projects..." id="project-search" onkeyup="portfolioManager.filterProjects()">
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="project-grid">
                    ${templates.map(template => `
                        <div class="border rounded-lg p-6 hover:border-blue-400 cursor-pointer project-card" data-category="${template.category}" onclick="portfolioManager.selectTemplate('${template.id}')">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h4 class="text-lg font-semibold mb-2">${template.title}</h4>
                                    <p class="text-gray-600 text-sm mb-3">${template.description}</p>
                                </div>
                                <span class="bg-${template.difficultyColor}-100 text-${template.difficultyColor}-800 text-xs px-2 py-1 rounded">
                                    ${template.difficulty}
                                </span>
                            </div>
                            
                            <div class="flex gap-4 text-sm text-gray-500 mb-4">
                                <span><i class="fas fa-clock"></i> ${template.duration}</span>
                                <span><i class="fas fa-folder"></i> ${template.skills.slice(0, 2).join(', ')}</span>
                                <span><i class="fas fa-trophy"></i> ${template.points} pts</span>
                            </div>

                            <div class="mb-4">
                                <div class="text-sm font-medium mb-2">Skills you'll learn:</div>
                                <div class="flex flex-wrap gap-2">
                                    ${template.skills.map(skill => `
                                        <span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">${skill}</span>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="flex gap-2">
                                <button class="btn btn-primary btn-sm flex-1">
                                    <i class="fas fa-play mr-2"></i> Start Project
                                </button>
                                <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); portfolioManager.previewTemplate('${template.id}')">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.showModal(content, 'Project Templates');
    }

    getProjectTemplates() {
        return [
            {
                id: 'ml-model',
                title: 'Machine Learning Model',
                description: 'Build a classification model from scratch using scikit-learn',
                category: 'Machine Learning',
                difficulty: 'Advanced',
                difficultyColor: 'purple',
                duration: '12 hours',
                points: 150,
                skills: ['Python', 'scikit-learn', 'Data Science', 'ML Algorithms', 'Model Evaluation']
            },
            {
                id: 'api',
                title: 'REST API Development',
                description: 'Create a web API with Flask/FastAPI and deploy it',
                category: 'Web Development',
                difficulty: 'Intermediate',
                difficultyColor: 'yellow',
                duration: '8 hours',
                points: 100,
                skills: ['Python', 'Flask/FastAPI', 'REST', 'Database', 'Deployment']
            },
            {
                id: 'database',
                title: 'Database Design',
                description: 'Design and implement a relational database schema',
                category: 'Database',
                difficulty: 'Beginner',
                difficultyColor: 'green',
                duration: '6 hours',
                points: 80,
                skills: ['SQL', 'Database Design', 'Normalization', 'PostgreSQL', 'ER Diagrams']
            },
            {
                id: 'frontend',
                title: 'Frontend Portfolio Site',
                description: 'Build a personal portfolio website with modern frameworks',
                category: 'Frontend',
                difficulty: 'Intermediate',
                difficultyColor: 'yellow',
                duration: '10 hours',
                points: 120,
                skills: ['React', 'CSS', 'JavaScript', 'Responsive Design', 'Git']
            },
            {
                id: 'data-viz',
                title: 'Data Visualization Project',
                description: 'Create stunning data visualizations with D3.js or Plotly',
                category: 'Data Analysis',
                difficulty: 'Intermediate',
                difficultyColor: 'yellow',
                duration: '8 hours',
                points: 100,
                skills: ['JavaScript', 'D3.js', 'Data Analysis', 'Visualization', 'Web Development']
            },
            {
                id: 'mobile-app',
                title: 'Mobile App Prototype',
                description: 'Build a mobile app prototype with React Native',
                category: 'Mobile Development',
                difficulty: 'Advanced',
                difficultyColor: 'purple',
                duration: '16 hours',
                points: 180,
                skills: ['React Native', 'Mobile UI', 'State Management', 'APIs', 'Deployment']
            }
        ];
    }

    selectTemplate(templateId) {
        const template = this.getProjectTemplates().find(t => t.id === templateId);
        if (!template) return;

        const newProject = {
            id: templateId,
            title: template.title,
            description: template.description,
            category: template.category,
            difficulty: template.difficulty,
            duration: template.duration,
            progress: 0,
            tasks: this.generateTasksForTemplate(templateId),
            skills: template.skills,
            score: null,
            startedAt: new Date().toISOString(),
            githubUrl: null
        };

        this.projects.push(newProject);
        this.saveProjects();
        
        this.closeModal();
        this.showNotification(`Project "${template.title}" added to your portfolio!`, 'success');
        
        // Refresh page to show new project
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    generateTasksForTemplate(templateId) {
        const taskTemplates = {
            'ml-model': [
                { id: 1, title: 'Set up ML environment and libraries', completed: false },
                { id: 2, title: 'Load and preprocess dataset', completed: false },
                { id: 3, title: 'Perform exploratory data analysis', completed: false },
                { id: 4, title: 'Feature engineering and selection', completed: false },
                { id: 5, title: 'Train and evaluate multiple models', completed: false },
                { id: 6, title: 'Optimize hyperparameters', completed: false },
                { id: 7, title: 'Create prediction pipeline', completed: false },
                { id: 8, title: 'Document findings and results', completed: false }
            ],
            'api': [
                { id: 1, title: 'Set up Flask/FastAPI project structure', completed: false },
                { id: 2, title: 'Design API endpoints', completed: false },
                { id: 3, title: 'Implement CRUD operations', completed: false },
                { id: 4, title: 'Add authentication and validation', completed: false },
                { id: 5, title: 'Write unit tests', completed: false },
                { id: 6, title: 'Create API documentation', completed: false },
                { id: 7, title: 'Deploy to cloud platform', completed: false }
            ],
            'frontend': [
                { id: 1, title: 'Set up React project structure', completed: false },
                { id: 2, title: 'Design mockups and wireframes', completed: false },
                { id: 3, title: 'Implement responsive layout', completed: false },
                { id: 4, title: 'Create portfolio components', completed: false },
                { id: 5, title: 'Add animations and interactions', completed: false },
                { id: 6, title: 'Optimize performance and SEO', completed: false },
                { id: 7, title: 'Deploy to hosting platform', completed: false }
            ]
        };

        return taskTemplates[templateId] || [
            { id: 1, title: 'Set up development environment', completed: false },
            { id: 2, title: 'Review project requirements', completed: false },
            { id: 3, title: 'Start implementation', completed: false },
            { id: 4, title: 'Test and debug', completed: false },
            { id: 5, title: 'Complete and document', completed: false }
        ];
    }

    continueProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        this.showModal(`
            <div>
                <h3 class="text-xl font-bold mb-4">${project.title}</h3>
                <div class="mb-6">
                    <p class="text-gray-600 mb-4">${project.description}</p>
                    
                    <div class="bg-blue-50 p-4 rounded-lg mb-4">
                        <h4 class="font-semibold mb-2">Project Setup</h4>
                        <p class="text-sm text-gray-700 mb-3">Choose how you want to work on this project:</p>
                        
                        <div class="grid grid-cols-1 gap-3">
                            <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50">
                                <input type="radio" name="setup-option" value="github" checked class="mr-3">
                                <div>
                                    <strong>GitHub Integration</strong>
                                    <p class="text-sm text-gray-600">Create repository and track progress automatically</p>
                                </div>
                            </label>
                            <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50">
                                <input type="radio" name="setup-option" value="local" class="mr-3">
                                <div>
                                    <strong>Local Development</strong>
                                    <p class="text-sm text-gray-600">Work locally and upload files manually</p>
                                </div>
                            </label>
                            <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50">
                                <input type="radio" name="setup-option" value="cloud" class="mr-3">
                                <div>
                                    <strong>Cloud IDE</strong>
                                    <p class="text-sm text-gray-600">Use browser-based development environment</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label">GitHub Repository URL (optional)</label>
                        <input type="url" class="form-input" placeholder="https://github.com/username/repo">
                    </div>
                </div>

                <div class="flex gap-3">
                    <button onclick="portfolioManager.setupProject('${projectId}')" class="btn btn-primary">
                        <i class="fas fa-rocket mr-2"></i> Start Working
                    </button>
                    <button onclick="portfolioManager.closeModal()" class="btn btn-secondary">
                        Cancel
                    </button>
                </div>
            </div>
        `, 'Continue Project');
    }

    setupProject(projectId) {
        const setupOption = document.querySelector('input[name="setup-option"]:checked').value;
        const githubUrl = document.querySelector('input[type="url"]').value;
        
        const project = this.projects.find(p => p.id === projectId);
        if (project) {
            if (githubUrl) {
                project.githubUrl = githubUrl;
            }
            
            this.saveProjects();
            this.closeModal();
            
            // Simulate opening development environment
            this.showNotification('Development environment is being prepared...', 'info');
            
            setTimeout(() => {
                window.open(`https://github.com/codespaces/new`, '_blank');
            }, 2000);
        }
    }

    viewProjectDetails(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        this.showModal(`
            <div>
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <h3 class="text-2xl font-bold mb-2">${project.title}</h3>
                        <p class="text-gray-600">${project.description}</p>
                    </div>
                    ${project.score ? `
                        <div class="text-center">
                            <div class="text-3xl font-bold text-green-600">${project.score}/100</div>
                            <div class="text-sm text-gray-500">Final Score</div>
                        </div>
                    ` : ''}
                </div>

                <div class="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <h4 class="font-semibold mb-3">Project Information</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Category:</span>
                                <span>${project.category}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Difficulty:</span>
                                <span>${project.difficulty}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Duration:</span>
                                <span>${project.duration}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Progress:</span>
                                <span>${project.progress}%</span>
                            </div>
                            ${project.completedAt ? `
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Completed:</span>
                                    <span>${new Date(project.completedAt).toLocaleDateString()}</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-3">Skills Covered</h4>
                        <div class="flex flex-wrap gap-2">
                            ${project.skills.map(skill => `
                                <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${skill}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="mb-6">
                    <h4 class="font-semibold mb-3">Task Completion</h4>
                    <div class="space-y-2">
                        ${project.tasks.map(task => `
                            <div class="flex items-center p-3 bg-gray-50 rounded">
                                <input type="checkbox" ${task.completed ? 'checked' : ''} class="mr-3" disabled>
                                <span class="${task.completed ? 'line-through text-gray-400' : ''}">${task.title}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                ${project.githubUrl ? `
                    <div class="mb-6">
                        <h4 class="font-semibold mb-3">Repository</h4>
                        <a href="${project.githubUrl}" target="_blank" class="btn btn-secondary">
                            <i class="fab fa-github mr-2"></i> View on GitHub
                        </a>
                    </div>
                ` : ''}

                <div class="flex gap-3">
                    <button onclick="portfolioManager.downloadCertificate('${projectId}')" class="btn btn-success">
                        <i class="fas fa-download mr-2"></i> Download Certificate
                    </button>
                    <button onclick="portfolioManager.shareProject('${projectId}')" class="btn btn-secondary">
                        <i class="fas fa-share-alt mr-2"></i> Share Project
                    </button>
                </div>
            </div>
        `, 'Project Details');
    }

    startProject(projectId) {
        const template = this.getProjectTemplates().find(t => t.id === projectId);
        if (template) {
            this.selectTemplate(projectId);
        }
    }

    viewGitHubRepo() {
        window.open('https://github.com', '_blank');
    }

    previewProject() {
        window.open('https://streamlit.io', '_blank');
    }

    shareProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        const shareUrl = `${window.location.origin}/portfolio.html?project=${projectId}`;
        
        this.showModal(`
            <div class="text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <i class="fas fa-share-alt text-green-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-4">Share Your Project</h3>
                <p class="text-gray-600 mb-6">Share your amazing work with friends, mentors, and potential employers!</p>
                
                <div class="mb-6">
                    <label class="form-label text-left">Share Link</label>
                    <div class="flex gap-2">
                        <input type="text" value="${shareUrl}" class="form-input" id="share-link" readonly>
                        <button onclick="portfolioManager.copyShareLink()" class="btn btn-primary">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-3 mb-6">
                    <button onclick="portfolioManager.shareOnLinkedIn('${projectId}')" class="btn btn-secondary">
                        <i class="fab fa-linkedin"></i> LinkedIn
                    </button>
                    <button onclick="portfolioManager.shareOnTwitter('${projectId}')" class="btn btn-secondary">
                        <i class="fab fa-twitter"></i> Twitter
                    </button>
                    <button onclick="portfolioManager.shareByEmail('${projectId}')" class="btn btn-secondary">
                        <i class="fas fa-envelope"></i> Email
                    </button>
                </div>

                <button onclick="portfolioManager.closeModal()" class="btn btn-primary w-full">
                    Done
                </button>
            </div>
        `, 'Share Project');
    }

    copyShareLink() {
        const shareLink = document.getElementById('share-link');
        shareLink.select();
        document.execCommand('copy');
        this.showNotification('Link copied to clipboard!', 'success');
    }

    shareOnLinkedIn(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        const text = `Check out my ${project.title} project! I've been working on ${project.description}`;
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(text)}`, '_blank');
    }

    shareOnTwitter(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        const text = `Just completed my ${project.title} project! 🚀 ${project.description}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
    }

    shareByEmail(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        const subject = `Check out my ${project.title} project`;
        const body = `Hi,\n\nI wanted to share my recent project - ${project.title}.\n\n${project.description}\n\nYou can view it here: ${window.location.href}\n\nBest regards`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    downloadCertificate(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project || !project.score) return;

        // Simulate certificate download
        this.showNotification('Certificate is being generated...', 'info');
        
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`Certificate of Completion\n\nProject: ${project.title}\nScore: ${project.score}/100\nCompleted: ${new Date().toLocaleDateString()}\n\nThis certifies that you have successfully completed the project with excellent performance.`);
            link.download = `certificate-${project.title}.txt`;
            link.click();
        }, 1000);
    }

    previewTemplate(templateId) {
        const template = this.getProjectTemplates().find(t => t.id === templateId);
        if (!template) return;

        this.showModal(`
            <div>
                <h3 class="text-2xl font-bold mb-4">${template.title}</h3>
                <p class="text-gray-600 mb-6">${template.description}</p>

                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="bg-gray-50 p-4 rounded">
                        <h4 class="font-semibold mb-2">Project Details</h4>
                        <div class="space-y-1 text-sm">
                            <div><strong>Category:</strong> ${template.category}</div>
                            <div><strong>Difficulty:</strong> ${template.difficulty}</div>
                            <div><strong>Duration:</strong> ${template.duration}</div>
                            <div><strong>Points:</strong> ${template.points}</div>
                        </div>
                    </div>

                    <div class="bg-blue-50 p-4 rounded">
                        <h4 class="font-semibold mb-2">What You'll Learn</h4>
                        <div class="flex flex-wrap gap-1">
                            ${template.skills.map(skill => `
                                <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${skill}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="mb-6">
                    <h4 class="font-semibold mb-3">Learning Outcomes</h4>
                    <ul class="list-disc list-inside space-y-2 text-gray-600">
                        <li>Gain hands-on experience with ${template.skills[0]}</li>
                        <li>Build a portfolio-worthy project</li>
                        <li>Learn best practices and industry standards</li>
                        <li>Receive automated feedback and scoring</li>
                        <li>Earn a certificate upon completion</li>
                    </ul>
                </div>

                <div class="mb-6">
                    <h4 class="font-semibold mb-3">Requirements</h4>
                    <ul class="list-disc list-inside space-y-1 text-gray-600 text-sm">
                        <li>Basic understanding of programming concepts</li>
                        <li>Computer with internet access</li>
                        <li>${template.duration} of dedicated time</li>
                        <li>Enthusiasm to learn and build!</li>
                    </ul>
                </div>

                <div class="flex gap-3">
                    <button onclick="portfolioManager.selectTemplate('${templateId}')" class="btn btn-primary">
                        <i class="fas fa-play mr-2"></i> Start Project
                    </button>
                    <button onclick="portfolioManager.closeModal()" class="btn btn-secondary">
                        Close
                    </button>
                </div>
            </div>
        `, 'Project Preview');
    }

    filterProjects() {
        const searchTerm = document.getElementById('project-search').value.toLowerCase();
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const category = card.dataset.category.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `message ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Initialize Portfolio Manager
const portfolioManager = new PortfolioManager();

// Global functions for HTML onclick handlers
window.portfolioManager = portfolioManager;
window.continueProject = (id) => portfolioManager.continueProject(id);
window.viewProjectDetails = (id) => portfolioManager.viewProjectDetails(id);
window.startProject = (id) => portfolioManager.startProject(id);
window.viewGitHubRepo = () => portfolioManager.viewGitHubRepo();
window.previewProject = () => portfolioManager.previewProject();
window.shareProject = (id) => portfolioManager.shareProject(id);
window.showProjectTemplates = () => portfolioManager.showProjectTemplates();
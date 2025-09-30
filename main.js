// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
}

// Skill categories data
const skillCategories = {
    backend: [
        { icon: 'J', name: 'Java 17', level: 'Programming Language', percentage: 95 },
        { icon: 'SB', name: 'Spring Boot', level: 'Framework', percentage: 92 },
        { icon: 'API', name: 'REST APIs', level: 'Architecture', percentage: 90 },
        { icon: 'MS', name: 'Microservices', level: 'Architecture Pattern', percentage: 88 },
        { icon: 'JE', name: 'Jakarta EE', level: 'Enterprise Framework', percentage: 85 },
        { icon: 'H', name: 'Hibernate', level: 'ORM Framework', percentage: 87 }
    ],
    cloud: [
        { icon: 'AWS', name: 'AWS', level: 'Cloud Platform', percentage: 89 },
        { icon: 'AZ', name: 'Azure', level: 'Cloud Platform', percentage: 85 },
        { icon: 'D', name: 'Docker', level: 'Containerization', percentage: 88 },
        { icon: 'G', name: 'Git', level: 'Version Control', percentage: 92 },
        { icon: 'CI', name: 'CI/CD', level: 'DevOps Pipeline', percentage: 82 },
        { icon: 'AF', name: 'Airflow', level: 'Workflow Management', percentage: 78 }
    ],
    lowcode: [
        { icon: 'PA', name: 'Power Apps', level: 'Low-Code Platform', percentage: 91 },
        { icon: 'PF', name: 'Power Automate', level: 'Process Automation', percentage: 89 },
        { icon: 'BI', name: 'Power BI', level: 'Data Analytics', percentage: 93 },
        { icon: 'DV', name: 'Dataverse', level: 'Data Platform', percentage: 85 },
        { icon: 'CA', name: 'Canvas Apps', level: 'App Development', percentage: 88 },
        { icon: 'MD', name: 'Model-Driven', level: 'App Development', percentage: 83 }
    ],
    web: [
        { icon: 'A', name: 'Angular', level: 'Frontend Framework', percentage: 87 },
        { icon: 'JS', name: 'JavaScript', level: 'Programming Language', percentage: 91 },
        { icon: 'SQL', name: 'SQL', level: 'Query Language', percentage: 90 },
        { icon: 'PG', name: 'PostgreSQL', level: 'Database', percentage: 85 },
        { icon: 'DB2', name: 'DB2', level: 'Database', percentage: 80 },
        { icon: 'JC', name: 'JDBC', level: 'Database Connectivity', percentage: 88 }
    ]
};

// Show skill category
function showSkillCategory(category) {
    // Update active tab
    document.querySelectorAll('.skill-tab').forEach(tab => tab.classList.remove('active'));
    
    // Find and activate the correct tab
    const tabs = document.querySelectorAll('.skill-tab');
    tabs.forEach(tab => {
        if (tab.textContent.toLowerCase().includes(category.toLowerCase()) ||
            (category === 'backend' && tab.textContent === 'Backend') ||
            (category === 'cloud' && tab.textContent === 'Cloud & DevOps') ||
            (category === 'lowcode' && tab.textContent === 'Low-Code') ||
            (category === 'web' && tab.textContent === 'Web & Data')) {
            tab.classList.add('active');
        }
    });

    // Update skills grid
    const skillsGrid = document.getElementById('skillsGrid');
    const skills = skillCategories[category];
    
    if (!skills) {
        console.error('Skills not found for category:', category);
        return;
    }
    
    skillsGrid.innerHTML = skills.map(skill => `
        <div class="skill-card">
            <div class="skill-icon">${skill.icon}</div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-level">${skill.level}</div>
            <div class="skill-progress">
                <div class="skill-progress-fill" style="width: 0%"></div>
            </div>
            <div class="skill-percentage">${skill.percentage >= 90 ? 'Expert' : skill.percentage >= 80 ? 'Advanced' : 'Intermediate'} - ${skill.percentage}%</div>
        </div>
    `).join('');

    // Animate progress bars
    setTimeout(() => {
        document.querySelectorAll('.skill-progress-fill').forEach((bar, index) => {
            if (skills[index] && skills[index].percentage) {
                setTimeout(() => {
                    bar.style.width = skills[index].percentage + '%';
                }, index * 100);
            }
        });
    }, 100);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// CV Download function
function downloadCV() {
    // Replace with your actual PDF filename
    const pdfFileName = 'Rethabile_Mokwane_CV.pdf';
    const a = document.createElement('a');
    a.href = pdfFileName;
    a.download = pdfFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    showNotification('CV downloaded successfully!', 'success');
}

// View project function
function viewProject(projectId) {
    const projects = {
        'bmw-tool': 'BMW Data Comparison Tool: A comprehensive Java-based application that streamlines report generation processes by comparing data across multiple databases.',
        'power-platform': 'Power Platform Solutions: Enterprise-level low-code solutions with automated workflows and interactive dashboards for business intelligence.',
        'cloud-infrastructure': 'Cloud Infrastructure & Automation: Scalable cloud solutions using AWS services with CI/CD pipelines and containerized applications.',
        'web-apps': 'Full-Stack Web Applications: Modern responsive web applications built with Angular and Java backend featuring RESTful APIs.'
    };

    const project = projects[projectId];
    if (project) {
        showNotification(project, 'info');
    }
}

// Certificate modal functions
const certificates = {
    microsoft: {
        title: 'Microsoft Certified: Data Analyst Associate',
        subtitle: 'Power BI Certification - 2024',
        description: 'This certification validates skills in data preparation, modeling, visualization, analysis, and deployment using Microsoft Power BI. Certified professionals can transform raw data into meaningful insights and create interactive reports and dashboards.',
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23ffffff"/><rect x="50" y="50" width="700" height="500" fill="%23f8f9fa" stroke="%23dee2e6"/><circle cx="150" cy="150" r="40" fill="%23007acc"/><text x="150" y="160" text-anchor="middle" fill="white" font-size="24" font-weight="bold">M</text><text x="400" y="120" text-anchor="middle" font-size="32" font-weight="bold" fill="%23333">Microsoft Certified</text><text x="400" y="160" text-anchor="middle" font-size="24" fill="%23666">Data Analyst Associate</text><text x="400" y="200" text-anchor="middle" font-size="20" fill="%23666">Power BI Specialization</text><text x="400" y="280" text-anchor="middle" font-size="28" font-weight="bold" fill="%23333">Rethabile Mokwane</text><text x="400" y="320" text-anchor="middle" font-size="18" fill="%23666">has successfully completed the requirements</text><text x="400" y="350" text-anchor="middle" font-size="18" fill="%23666">for Microsoft Power BI Data Analyst Associate</text><text x="400" y="420" text-anchor="middle" font-size="16" fill="%23666">Issued: 2024</text><rect x="300" y="450" width="200" height="2" fill="%23007acc"/></svg>'
    },
    java: {
        title: 'Full Stack Java Developer',
        subtitle: 'Spring Boot, Hibernate, REST APIs - 2024',
        description: 'Comprehensive certification covering Java enterprise development, including Spring Boot framework, Hibernate ORM, RESTful API development, microservices architecture, and modern development practices.',
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23ffffff"/><rect x="50" y="50" width="700" height="500" fill="%23f8f9fa" stroke="%23dee2e6"/><circle cx="150" cy="150" r="40" fill="%23f89820"/><text x="150" y="160" text-anchor="middle" fill="white" font-size="24" font-weight="bold">J</text><text x="400" y="120" text-anchor="middle" font-size="32" font-weight="bold" fill="%23333">Full Stack Java Developer</text><text x="400" y="160" text-anchor="middle" font-size="24" fill="%23666">Professional Certification</text><text x="400" y="200" text-anchor="middle" font-size="20" fill="%23666">Spring Boot • Hibernate • REST APIs</text><text x="400" y="280" text-anchor="middle" font-size="28" font-weight="bold" fill="%23333">Rethabile Mokwane</text><text x="400" y="320" text-anchor="middle" font-size="18" fill="%23666">has successfully completed the comprehensive</text><text x="400" y="350" text-anchor="middle" font-size="18" fill="%23666">Full Stack Java Development Program</text><text x="400" y="420" text-anchor="middle" font-size="16" fill="%23666">Completed: 2024</text><rect x="300" y="450" width="200" height="2" fill="%23f89820"/></svg>'
    },
    digilink: {
        title: 'Digilink Software Developer Programme',
        subtitle: 'Enterprise Software Development - 2024',
        description: 'Intensive software development program focusing on enterprise-level solutions, modern development methodologies, and industry best practices. Covers full-stack development, database management, and software engineering principles.',
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23ffffff"/><rect x="50" y="50" width="700" height="500" fill="%23f8f9fa" stroke="%23dee2e6"/><circle cx="150" cy="150" r="40" fill="%238b5cf6"/><text x="150" y="160" text-anchor="middle" fill="white" font-size="24" font-weight="bold">D</text><text x="400" y="120" text-anchor="middle" font-size="32" font-weight="bold" fill="%23333">Digilink Training</text><text x="400" y="160" text-anchor="middle" font-size="24" fill="%23666">Software Developer Programme</text><text x="400" y="200" text-anchor="middle" font-size="20" fill="%23666">Enterprise Development Solutions</text><text x="400" y="280" text-anchor="middle" font-size="28" font-weight="bold" fill="%23333">Rethabile Mokwane</text><text x="400" y="320" text-anchor="middle" font-size="18" fill="%23666">has successfully completed the</text><text x="400" y="350" text-anchor="middle" font-size="18" fill="%23666">Software Developer Training Programme</text><text x="400" y="420" text-anchor="middle" font-size="16" fill="%23666">Completed: 2024</text><rect x="300" y="450" width="200" height="2" fill="%238b5cf6"/></svg>'
    }
};

function openCertificateModal(certId) {
    const certificate = certificates[certId];
    if (!certificate) return;

    const modal = document.getElementById('certificateModal');
    const modalContent = document.getElementById('modalContent');

    modalContent.innerHTML = `
        <img src="${certificate.image}" alt="${certificate.title}" class="certificate-preview">
        <div class="modal-title">${certificate.title}</div>
        <div class="modal-subtitle">${certificate.subtitle}</div>
        <div class="modal-description">${certificate.description}</div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on outside click
document.addEventListener('click', function(event) {
    const modal = document.getElementById('certificateModal');
    if (event.target === modal) {
        closeCertificateModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCertificateModal();
    }
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(255, 255, 255, 0.1)'};
        backdrop-filter: blur(20px);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 320px;
        border: 1px solid rgba(255,255,255,0.2);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.textContent);
                let current = 0;
                const increment = target / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target % 1 === 0 ? target : target.toFixed(1);
                        clearInterval(timer);
                    } else {
                        counter.textContent = current % 1 === 0 ? Math.ceil(current) : current.toFixed(1);
                    }
                }, 40);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    highlightActiveSection();
    animateCounters();

    // Initialize skills section with backend skills
    setTimeout(() => {
        showSkillCategory('backend');
    }, 500);

    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe sections for animations
    document.querySelectorAll('.section, .timeline-item, .project-card, .cert-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Dynamic time update
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        const greeting = now.getHours() < 12 ? 'Good Morning' : 
                        now.getHours() < 17 ? 'Good Afternoon' : 'Good Evening';
        
        const timeDisplay = document.getElementById('timeDisplay');
        if (timeDisplay) {
            timeDisplay.textContent = `👋 ${greeting} - ${timeString}`;
        }
    }
    
    updateTime();
    setInterval(updateTime, 60000); // Update every minute
});

// Add scroll-to-top functionality
const scrollToTop = document.createElement('button');
scrollToTop.innerHTML = '↑';
scrollToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
`;
        
scrollToTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
document.body.appendChild(scrollToTop);
        
window.addEventListener('scroll', () => {
    scrollToTop.style.opacity = window.scrollY > 500 ? '1' : '0';
    scrollToTop.style.transform = window.scrollY > 500 ? 'scale(1)' : 'scale(0.8)';
});
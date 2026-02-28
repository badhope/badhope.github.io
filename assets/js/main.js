/* =========================================
   main.js
   全局交互逻辑：主题、导航、动画
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. 主题切换系统 {
        const toggleBtn = document.getElementById('theme-toggle');
        const body = document.body;
        const icon = toggleBtn.querySelector('i');
        
        // 检查本地存储是否有保存的主题
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.setAttribute('data-theme', savedTheme);
            updateIcon(savedTheme);
        } else {
            // 默认跟随系统偏好
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                body.setAttribute('data-theme', 'dark');
                updateIcon('dark');
            }
        }

        // 点击切换事件
        toggleBtn.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme); // 保存到本地存储
            updateIcon(newTheme);
        });

        function updateIcon(theme) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    })();

    // 2. 导航栏滚动效果 {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    })();

    // 3. 平滑滚动 (针对锚点链接) {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                // 确保不是空的 #
                if (href.length > 1) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const navHeight = document.querySelector('.navbar').offsetHeight;
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    })();

    // 4. 导航链接高亮 {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            const navHeight = document.querySelector('.navbar').offsetHeight;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - navHeight - 50;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                // 处理 index.html 页面的链接高亮
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
            
            // 特殊处理：如果在顶部，不高亮任何链接
            if (window.scrollY < 100) {
                 // 可以在这里取消所有 active 状态，或者保持默认
            }
        });
    })();

    // 5. 元素滚动显示动画 {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    // 一旦显示，停止观察以节省资源
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // 观察所有需要动画的元素
        const hiddenElements = document.querySelectorAll('.timeline-item, .social-card, .es-grid > div');
        hiddenElements.forEach(el => observer.observe(el));
    })();
});

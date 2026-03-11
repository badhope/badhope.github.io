/**
 * 公共工具模块 - 全站通用
 * 版本：3.0
 * 最后更新：2026-03-11
 */

const Utils = {
    version: '3.0.0',
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    random(min, max) {
        return Math.random() * (max - min) + min;
    },
    
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    formatDate(date) {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    },
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    },
    
    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    },
    
    copyToClipboard(text) {
        return new Promise((resolve, reject) => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text)
                    .then(resolve)
                    .catch(reject);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    resolve();
                } catch (err) {
                    reject(err);
                }
                document.body.removeChild(textarea);
            }
        });
    },
    
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
    
    isMobile() {
        return window.innerWidth < 768;
    },
    
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },
    
    getScrollProgress() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    },
    
    smoothScrollTo(element, offset = 0) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    },
    
    loadScript(src, async = true) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = async;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    },
    
    loadStyle(href) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    },
    
    storage: {
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch {
                return defaultValue;
            }
        },
        
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch {
                return false;
            }
        },
        
        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch {
                return false;
            }
        }
    },
    
    cache: {
        data: new Map(),
        maxAge: 5 * 60 * 1000,
        
        get(key) {
            const item = this.data.get(key);
            if (!item) return null;
            if (Date.now() - item.timestamp > this.maxAge) {
                this.data.delete(key);
                return null;
            }
            return item.value;
        },
        
        set(key, value) {
            this.data.set(key, {
                value,
                timestamp: Date.now()
            });
        },
        
        clear() {
            this.data.clear();
        }
    },
    
    eventBus: {
        events: {},
        
        on(event, callback) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(callback);
            return () => this.off(event, callback);
        },
        
        off(event, callback) {
            if (!this.events[event]) return;
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        },
        
        emit(event, data) {
            if (!this.events[event]) return;
            this.events[event].forEach(callback => callback(data));
        }
    }
};

const Toast = {
    container: null,
    queue: [],
    isShowing: false,
    
    init() {
        this.container = document.getElementById('toast');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast';
            this.container.className = 'toast';
            document.body.appendChild(this.container);
        }
    },
    
    show(message, type = 'info', duration = 3000) {
        this.queue.push({ message, type, duration });
        if (!this.isShowing) {
            this.processQueue();
        }
    },
    
    processQueue() {
        if (this.queue.length === 0) {
            this.isShowing = false;
            return;
        }
        
        this.isShowing = true;
        const { message, type, duration } = this.queue.shift();
        
        if (!this.container) this.init();
        
        this.container.textContent = message;
        this.container.className = `toast show ${type}`;
        
        setTimeout(() => {
            this.container.classList.remove('show');
            setTimeout(() => this.processQueue(), 300);
        }, duration);
    },
    
    success(message, duration) {
        this.show(message, 'success', duration);
    },
    
    error(message, duration) {
        this.show(message, 'error', duration);
    },
    
    warning(message, duration) {
        this.show(message, 'warning', duration);
    }
};

const ThemeManager = {
    currentTheme: 'light',
    toggle: null,
    
    init() {
        this.toggle = document.querySelector('.theme-toggle');
        this.loadTheme();
        this.bindEvents();
    },
    
    loadTheme() {
        const saved = Utils.storage.get('theme', 'light');
        this.setTheme(saved, false);
    },
    
    setTheme(theme, save = true) {
        this.currentTheme = theme;
        document.body.classList.toggle('dark-mode', theme === 'dark');
        
        if (save) {
            Utils.storage.set('theme', theme);
        }
        
        Utils.eventBus.emit('themeChange', theme);
    },
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    },
    
    bindEvents() {
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleTheme());
        }
    }
};

const NetworkMonitor = {
    isOnline: navigator.onLine,
    banner: null,
    
    init() {
        this.banner = document.getElementById('offlineBanner');
        this.bindEvents();
        this.checkStatus();
    },
    
    bindEvents() {
        window.addEventListener('online', () => this.updateStatus(true));
        window.addEventListener('offline', () => this.updateStatus(false));
    },
    
    checkStatus() {
        this.updateStatus(navigator.onLine);
    },
    
    updateStatus(online) {
        const wasOffline = !this.isOnline;
        this.isOnline = online;
        
        if (this.banner) {
            this.banner.classList.toggle('show', !online);
        }
        
        if (online && wasOffline) {
            Toast.success('网络已恢复连接');
        }
        
        Utils.eventBus.emit('networkChange', online);
    }
};

const AnimationController = {
    enabled: true,
    toggle: null,
    
    init() {
        this.toggle = document.getElementById('animationToggle');
        this.loadPreference();
        this.bindEvents();
    },
    
    loadPreference() {
        const saved = Utils.storage.get('animationsEnabled', true);
        this.setEnabled(saved, false);
    },
    
    setEnabled(enabled, save = true) {
        this.enabled = enabled;
        document.body.classList.toggle('reduce-motion', !enabled);
        
        if (this.toggle) {
            this.toggle.checked = enabled;
        }
        
        if (save) {
            Utils.storage.set('animationsEnabled', enabled);
        }
        
        Utils.eventBus.emit('animationChange', enabled);
    },
    
    toggle() {
        this.setEnabled(!this.enabled);
        Toast.success(this.enabled ? '动画效果已开启' : '动画效果已关闭');
    },
    
    bindEvents() {
        if (this.toggle) {
            this.toggle.addEventListener('change', () => this.toggle());
        }
    }
};

const ScrollProgress = {
    bar: null,
    
    init() {
        this.bar = document.querySelector('.scroll-progress') || document.getElementById('scrollProgress');
        if (this.bar) {
            this.bindEvents();
        }
    },
    
    bindEvents() {
        window.addEventListener('scroll', Utils.throttle(() => {
            this.update();
        }, 16), { passive: true });
    },
    
    update() {
        if (!this.bar) return;
        const progress = Utils.getScrollProgress();
        this.bar.style.width = `${progress}%`;
    }
};

const PageLoader = {
    loader: null,
    minLoadTime: 800,
    
    init() {
        this.loader = document.querySelector('.page-loader') || document.getElementById('pageLoader');
        if (this.loader) {
            this.hide();
        }
    },
    
    hide() {
        const startTime = Date.now();
        
        const doHide = () => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, this.minLoadTime - elapsed);
            
            setTimeout(() => {
                if (this.loader) {
                    this.loader.classList.add('hidden');
                }
            }, remaining);
        };
        
        if (document.readyState === 'complete') {
            doHide();
        } else {
            window.addEventListener('load', doHide);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Toast.init();
    ThemeManager.init();
    NetworkMonitor.init();
    AnimationController.init();
    ScrollProgress.init();
    PageLoader.init();
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils, Toast, ThemeManager, NetworkMonitor, AnimationController, ScrollProgress, PageLoader };
}

const Auth = {
    users: [],
    currentUser: null,
    sessionKey: 'auth_session',
    usersKey: 'auth_users',
    
    init: function() {
        const storedUsers = localStorage.getItem(this.usersKey);
        if (storedUsers) {
            this.users = JSON.parse(storedUsers);
        } else {
            this.users = [
                {
                    id: 1,
                    username: 'Demo User',
                    email: 'demo@example.com',
                    password: 'demo123',
                    createdAt: new Date().toISOString()
                }
            ];
            this.saveUsers();
        }
        
        const session = localStorage.getItem(this.sessionKey);
        if (session) {
            const sessionData = JSON.parse(session);
            if (sessionData.expiresAt > Date.now()) {
                this.currentUser = this.users.find(u => u.id === sessionData.userId);
            } else {
                localStorage.removeItem(this.sessionKey);
            }
        }
    },
    
    saveUsers: function() {
        localStorage.setItem(this.usersKey, JSON.stringify(this.users));
    },
    
    register: function(username, email, password) {
        if (this.users.find(u => u.email === email)) {
            return { success: false, message: '该邮箱已被注册' };
        }
        
        const newUser = {
            id: Date.now(),
            username: username,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };
        
        this.users.push(newUser);
        this.saveUsers();
        
        return { success: true, message: '注册成功' };
    },
    
    login: function(email, password, rememberMe = false) {
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            return { success: false, message: '邮箱或密码错误' };
        }
        
        this.currentUser = user;
        
        const sessionData = {
            userId: user.id,
            expiresAt: rememberMe ? Date.now() + (30 * 24 * 60 * 60 * 1000) : Date.now() + (24 * 60 * 60 * 1000)
        };
        
        localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
        
        return { success: true, message: '登录成功', user: this.getSafeUser(user) };
    },
    
    logout: function() {
        this.currentUser = null;
        localStorage.removeItem(this.sessionKey);
        return { success: true, message: '已退出登录' };
    },
    
    isAuthenticated: function() {
        if (this.currentUser) return true;
        
        const session = localStorage.getItem(this.sessionKey);
        if (session) {
            const sessionData = JSON.parse(session);
            if (sessionData.expiresAt > Date.now()) {
                this.currentUser = this.users.find(u => u.id === sessionData.userId);
                return !!this.currentUser;
            }
        }
        
        return false;
    },
    
    getCurrentUser: function() {
        if (!this.currentUser) {
            const session = localStorage.getItem(this.sessionKey);
            if (session) {
                const sessionData = JSON.parse(session);
                if (sessionData.expiresAt > Date.now()) {
                    this.currentUser = this.users.find(u => u.id === sessionData.userId);
                }
            }
        }
        
        return this.currentUser ? this.getSafeUser(this.currentUser) : null;
    },
    
    getSafeUser: function(user) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        };
    },
    
    requireAuth: function(redirectUrl = 'login.html') {
        if (!this.isAuthenticated()) {
            const currentUrl = window.location.href;
            const separator = redirectUrl.includes('?') ? '&' : '?';
            window.location.href = redirectUrl + separator + 'redirect=' + encodeURIComponent(currentUrl);
            return false;
        }
        return true;
    }
};

const Comments = {
    commentsKey: 'site_comments',
    comments: [],
    
    init: function() {
        const stored = localStorage.getItem(this.commentsKey);
        if (stored) {
            this.comments = JSON.parse(stored);
        }
    },
    
    save: function() {
        localStorage.setItem(this.commentsKey, JSON.stringify(this.comments));
    },
    
    add: function(pageId, content) {
        if (!Auth.isAuthenticated()) {
            return { success: false, message: '请先登录' };
        }
        
        if (!content || content.trim().length === 0) {
            return { success: false, message: '留言内容不能为空' };
        }
        
        const user = Auth.getCurrentUser();
        const comment = {
            id: Date.now(),
            pageId: pageId,
            userId: user.id,
            username: user.username,
            content: content.trim(),
            createdAt: new Date().toISOString()
        };
        
        this.comments.push(comment);
        this.save();
        
        return { success: true, comment: comment };
    },
    
    getByPage: function(pageId) {
        return this.comments
            .filter(c => c.pageId === pageId)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    
    delete: function(commentId) {
        const user = Auth.getCurrentUser();
        if (!user) {
            return { success: false, message: '请先登录' };
        }
        
        const comment = this.comments.find(c => c.id === commentId);
        if (!comment) {
            return { success: false, message: '留言不存在' };
        }
        
        if (comment.userId !== user.id) {
            return { success: false, message: '无权删除此留言' };
        }
        
        this.comments = this.comments.filter(c => c.id !== commentId);
        this.save();
        
        return { success: true };
    }
};

Auth.init();
Comments.init();

window.Auth = Auth;
window.Comments = Comments;
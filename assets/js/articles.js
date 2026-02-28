/* =========================================
   articles.js
   负责 GitHub 项目与文章列表的动态渲染
   ========================================= */

class ContentManager {
    constructor() {
        // 你的 GitHub 用户名
        this.githubUsername = 'badhope'; 
        
        // 容器元素
        this.articlesContainer = document.getElementById('articles-container');
        
        // 初始化
        this.init();
    }

    async init() {
        if (!this.articlesContainer) return;

        // 并行加载数据
        await Promise.all([
            this.loadGitHubRepos(),
            this.loadArticles()
        ]);
    }

    // 1. 加载 GitHub 项目 (实时 API)
    async loadGitHubRepos() {
        try {
            const response = await fetch(`https://api.github.com/users/${this.githubUsername}/repos?sort=updated&per_page=6`);
            
            if (!response.ok) throw new Error('GitHub API 请求失败');
            
            const repos = await response.json();
            
            // 过滤掉 Fork 的仓库，只展示自己创建的
            const myRepos = repos.filter(repo => !repo.fork);
            
            // 按星标数降序排序
            myRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);

            this.renderSection('GitHub 开源项目', myRepos.map(repo => ({
                type: 'github',
                title: repo.name,
                desc: repo.description || '暂无描述',
                url: repo.html_url,
                meta: {
                    star: repo.stargazers_count,
                    fork: repo.forks_count,
                    lang: repo.language
                }
            })));

        } catch (error) {
            console.error('加载 GitHub 项目失败:', error);
            // 失败时显示提示
            this.renderError('GitHub 项目暂时无法加载');
        }
    }

    // 2. 加载文章列表 (静态 JSON)
    async loadArticles() {
        try {
            // 注意：这里需要你后续创建对应的 JSON 文件
            // 目前为了演示，如果文件不存在会进入 catch
            const [juejinRes, csdnRes] = await Promise.all([
                fetch('data/juejin-articles.json'),
                fetch('data/csdn-articles.json')
            ]);

            const juejinData = juejinRes.ok ? await juejinRes.json() : [];
            const csdnData = csdnRes.ok ? await csdnRes.json() : [];

            // 合并并处理数据
            const articles = [...juejinData, ...csdnData].map(article => ({
                type: 'article',
                platform: article.platform, // 'juejin' 或 'csdn'
                title: article.title,
                desc: article.desc || article.summary,
                url: article.url,
                meta: {
                    views: article.view_count || article.views,
                    likes: article.digg_count || article.likes
                }
            }));

            if (articles.length > 0) {
                this.renderSection('最新技术文章', articles);
            }

        } catch (error) {
            // 如果 JSON 文件还没创建，静默失败或显示占位符
            console.log('提示：文章数据文件尚未生成，请参考后续教程创建 data/*.json 文件');
            // 为了演示效果，这里可以伪造一些数据
            this.renderDemoArticles();
        }
    }

    // 渲染一个板块
    renderSection(title, items) {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'content-section';
        sectionDiv.innerHTML = `<h3 class="content-subtitle">${title}</h3>`;
        
        const grid = document.createElement('div');
        grid.className = 'articles-grid'; // 复用文章网格样式

        items.forEach(item => {
            grid.appendChild(this.createCard(item));
        });

        sectionDiv.appendChild(grid);
        this.articlesContainer.appendChild(sectionDiv);
    }

    // 创建卡片 DOM
    createCard(item) {
        const card = document.createElement('a');
        card.href = item.url;
        card.target = '_blank';
        card.className = 'article-card glass-card';
        
        let metaHtml = '';
        let iconClass = 'fas fa-file-alt';

        // 根据类型定制卡片样式
        if (item.type === 'github') {
            iconClass = 'fab fa-github';
            metaHtml = `
                <span><i class="fas fa-star"></i> ${item.meta.star}</span>
                <span><i class="fas fa-code-branch"></i> ${item.meta.fork}</span>
                ${item.meta.lang ? `<span class="lang-dot" style="color: ${this.getLangColor(item.meta.lang)}"></span> ${item.meta.lang}` : ''}
            `;
            card.classList.add('github-card');
        } else if (item.type === 'article') {
            const platformIcon = item.platform === 'juejin' ? 'fas fa-gem' : 'fas fa-blog';
            const platformColor = item.platform === 'juejin' ? '#1e80ff' : '#fc5531';
            iconClass = platformIcon;
            metaHtml = `
                <span style="color: ${platformColor}"><i class="${platformIcon}"></i> ${item.platform === 'juejin' ? '掘金' : 'CSDN'}</span>
                ${item.meta.views ? `<span><i class="fas fa-eye"></i> ${item.meta.views}</span>` : ''}
                ${item.meta.likes ? `<span><i class="fas fa-thumbs-up"></i> ${item.meta.likes}</span>` : ''}
            `;
            card.classList.add('article-card-item');
        }

        card.innerHTML = `
            <div class="card-header">
                <i class="${iconClass}"></i>
            </div>
            <div class="card-body">
                <h4 class="card-title">${item.title}</h4>
                <p class="card-desc">${item.desc}</p>
            </div>
            <div class="card-footer">
                ${metaHtml}
            </div>
        `;

        return card;
    }

    // 获取语言对应的颜色 (简化版)
    getLangColor(lang) {
        const colors = {
            'Python': '#3572A5',
            'JavaScript': '#f1e05a',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Java': '#b07219'
        };
        return colors[lang] || '#ccc';
    }

    // 渲染错误提示
    renderError(msg) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-msg';
        errorDiv.innerText = msg;
        this.articlesContainer.appendChild(errorDiv);
    }

    // 仅用于演示的假数据 (当你还没有 JSON 文件时)
    renderDemoArticles() {
        const demoItems = [
            {
                type: 'article',
                platform: 'juejin',
                title: '数据可视化入门：用 Python 打造你的第一个仪表盘',
                desc: '本文将介绍如何使用 Python 的 Matplotlib 和 Seaborn 库...',
                url: 'https://juejin.cn/user/2350111542479753',
                meta: { views: 1200, likes: 45 }
            },
            {
                type: 'article',
                platform: 'csdn',
                title: '大学生科研入门指南：如何发表第一篇 SCI 论文',
                desc: '分享作为本科生参与科研项目并成功发表 SCI 论文的完整流程...',
                url: 'https://blog.csdn.net/weixin_56622231',
                meta: { views: 3500, likes: 120 }
            }
        ];
        this.renderSection('精选技术文章 (示例)', demoItems);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new ContentManager();
});

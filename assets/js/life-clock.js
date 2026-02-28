/* =========================================
   life-clock.js
   实时数据仪表盘逻辑
   ========================================= */

class LifeClock {
    constructor(birthDateStr) {
        // 请在这里修改为你的真实出生日期，格式：YYYY-MM-DD
        // 例如：2005-06-15
        this.birthDate = new Date(2006-06-25);
        
        // 缓存 DOM 元素，避免重复查询
        this.els = {
            years: document.getElementById('age-years'),
            decimal: document.getElementById('age-decimal'),
            days: document.getElementById('days-lived'),
            heartbeats: document.getElementById('heartbeats'),
            yearRing: document.getElementById('year-ring'),
            yearPercent: document.getElementById('year-percent'),
            currentYear: document.getElementById('current-year'),
            weekBar: document.getElementById('week-bar')
        };

        // 如果页面没有这些元素，则不初始化
        if (!this.els.years) return;

        this.start();
    }

    start() {
        // 立即更新一次，避免闪烁
        this.update();
        
        // 每 50ms 更新一次，创造流畅的数字流动感
        setInterval(() => this.update(), 50);
    }

    update() {
        const now = new Date();
        
        // 1. 计算精确年龄 (岁)
        const ageMs = now - this.birthDate;
        // 一年的毫秒数：365.25天 * 24小时 * 60分 * 60秒 * 1000毫秒
        const msInYear = 365.25 * 24 * 60 * 60 * 1000;
        const ageYears = ageMs / msInYear;
        
        const years = Math.floor(ageYears);
        const decimalStr = (ageYears - years).toFixed(8).substring(2); // 取小数点后8位

        if (this.els.years) this.els.years.innerText = years;
        if (this.els.decimal) this.els.decimal.innerText = decimalStr;

        // 2. 生存天数
        const days = Math.floor(ageMs / (24 * 60 * 60 * 1000));
        if (this.els.days) this.els.days.innerText = days.toLocaleString();

        // 3. 心跳次数 (假设平均每分钟 75 次)
        const beats = Math.floor((ageMs / 1000 / 60) * 75);
        if (this.els.heartbeats) this.els.heartbeats.innerText = beats.toLocaleString();

        // 4. 年度进度
        const startOfYear = new Date(now.getFullYear(), 0, 1); // 今年1月1日
        const endOfYear = new Date(now.getFullYear() + 1, 0, 1); // 明年1月1日
        const yearProgress = (now - startOfYear) / (endOfYear - startOfYear);
        const yearPercentVal = (yearProgress * 100).toFixed(2);
        
        if (this.els.currentYear) this.els.currentYear.innerText = now.getFullYear();
        if (this.els.yearPercent) this.els.yearPercent.innerText = yearPercentVal;
        
        // 更新 SVG 圆环
        // 周长公式 C = 2 * PI * r。这里 r=45
        const circumference = 2 * Math.PI * 45; 
        // 偏移量 = 周长 * (1 - 当前进度)
        const offset = circumference * (1 - yearProgress);
        
        if (this.els.yearRing) {
            this.els.yearRing.style.strokeDasharray = circumference;
            this.els.yearRing.style.strokeDashoffset = offset;
        }

        // 5. 本周进度
        const dayOfWeek = now.getDay(); // 0(周日) 到 6(周六)
        // 转换为周一为第一天：0(周一) -> 6(周日)
        // 如果是周日(0)，算作第7天；其他天数减1
        const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek; 
        
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const dayProgress = (now - todayStart) / (24 * 60 * 60 * 1000);
        
        // 本周进度 = (已过天数 + 今天进度) / 7
        const weekProgress = ((adjustedDay - 1 + dayProgress) / 7) * 100;
        
        if (this.els.weekBar) {
            this.els.weekBar.style.width = `${weekProgress}%`;
        }
    }
}

// 初始化：请将日期改为你的真实生日
// 格式："YYYY-MM-DD"
document.addEventListener('DOMContentLoaded', () => {
    // 示例：假设出生于 2005 年 10 月 1 日
    new LifeClock('2005-10-01');
});

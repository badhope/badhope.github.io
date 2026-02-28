'use client';
import { motion } from 'framer-motion';
import { resumeData } from '@/data/resumeData';
import { Mail, Phone, MapPin, Download, ExternalLink } from 'lucide-react';

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-space-bg text-text-main py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        
        {/* 头部信息 */}
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-5xl font-bold text-white mb-2">{resumeData.name}</h1>
          <p className="text-xl text-neon-cyan mb-6">{resumeData.role}</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-text-light mb-8">
            {resumeData.contacts.map((c, i) => (
              <a key={i} href={c.link || '#'} className="flex items-center gap-2 hover:text-neon-cyan transition-colors">
                {c.type === '邮箱' && <Mail size={16} />}
                {c.type === '电话' && <Phone size={16} />}
                {c.type === '地点' && <MapPin size={16} />}
                {c.value}
              </a>
            ))}
          </div>

          {/* 下载按钮 */}
          <a href="/resume.pdf" download target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(100, 255, 218, 0.3)" }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-neon-cyan text-space-bg font-bold rounded-full"
            >
              <Download size={18} /> 下载 PDF 简历
            </motion.button>
          </a>
        </header>

        {/* 主要内容网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* 左侧：教育 & 技能 & 奖项 */}
          <div className="lg:col-span-1 space-y-10">
            {/* 教育经历 */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-space-border pb-2 mb-4">教育经历</h2>
              <div className="bg-space-card p-4 rounded-lg border border-space-border">
                <h3 className="font-bold text-neon-cyan">{resumeData.education.school}</h3>
                <p className="text-sm text-text-light">{resumeData.education.period}</p>
                <p className="mt-2">{resumeData.education.major}</p>
                <p className="text-sm mt-2 text-white font-mono">{resumeData.education.highlight}</p>
              </div>
            </section>

            {/* 技能 */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-space-border pb-2 mb-4">技能清单</h2>
              <div className="space-y-4">
                {resumeData.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <span className="text-neon-cyan">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-space-border h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-neon-cyan"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 奖项 */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-space-border pb-2 mb-4">荣誉奖项</h2>
              <ul className="space-y-2 text-sm text-text-light">
                {resumeData.awards.map((award, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-neon-cyan mt-1">★</span>
                    <span>{award}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* 右侧：实习经历时间轴 */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white border-b border-space-border pb-2 mb-8">实习与项目经历</h2>
            
            <div className="relative border-l-2 border-space-border pl-8 ml-4 space-y-12">
              {resumeData.experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  {/* 时间轴上的点 */}
                  <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-space-bg border-4 border-neon-cyan" />
                  
                  <div className="bg-space-card p-6 rounded-lg border border-space-border hover:border-neon-cyan transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                      <span className="text-xs text-text-light font-mono bg-space-bg px-2 py-1 rounded">{exp.period}</span>
                    </div>
                    <p className="text-neon-cyan mb-4 font-medium">{exp.role}</p>
                    <ul className="space-y-2 text-sm text-text-light">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-neon-cyan">›</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

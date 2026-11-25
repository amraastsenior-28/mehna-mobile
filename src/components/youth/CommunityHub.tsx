import React, { useState } from 'react';
import type { Language } from '../Navbar';
import {
  Users,
  MessageCircle,
  Send,
  PlusCircle,
  ExternalLink,
  Wrench,
  Sun,
  Palette,
  Sprout
} from 'lucide-react';

export interface CommunityProject {
  id: string;
  projectCode: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  sectorAr: string;
  sectorEn: string;
  category: 'green_energy' | 'heritage_crafts' | 'sustainable_agri' | 'eco_tech';
  membersCount: number;
  maxMembers: number;
  leadNameAr: string;
  leadNameEn: string;
  locationAr: string;
  locationEn: string;
  whatsappGroupUrl: string;
  telegramGroupUrl?: string;
}

export const MOCK_COMMUNITY_PROJECTS: CommunityProject[] = [
  {
    id: 'proj-1',
    projectCode: 'MHN-SOLAR-09',
    titleAr: 'مُبتكر المحطات الشمسية المتنقلة للمزارع الصغيرة',
    titleEn: 'Mobile Solar Unit Innovators for Small Farms',
    descriptionAr: 'مشروع تخرّج وتطبيقي لتصميم وحدة طاقة شمسية متحركة بقدرة 3 كيلوواط لتشغيل مضخات الري في قرى أسوان.',
    descriptionEn: 'Applied project designing a 3kW mobile solar unit for irrigation pumps in rural Aswan farms.',
    sectorAr: 'الطاقة المتجددة',
    sectorEn: 'Renewable Energy',
    category: 'green_energy',
    membersCount: 4,
    maxMembers: 6,
    leadNameAr: 'أحمد عبد العزيز (دراو)',
    leadNameEn: 'Ahmed Abdelaziz (Daraw)',
    locationAr: 'أسوان - دراو',
    locationEn: 'Aswan - Daraw',
    whatsappGroupUrl: 'https://wa.me/201012345678?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D9%86%D8%B6%D9%85%D8%A7%D9%85%20%D9%84%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20MHN-SOLAR-09',
    telegramGroupUrl: 'https://t.me/mehna_solar_innovators',
  },
  {
    id: 'proj-2',
    projectCode: 'MHN-CRAFT-04',
    titleAr: 'محتوى تصدير المنتجات النوبية الخشبية والفخار',
    titleEn: 'Export Media Suite for Nubian Crafts',
    descriptionAr: 'فريق عمل لإنشاء كتالوج رقمي وتصوير منتجات الفخار النوبي لربط الحرفيين بالأسواق الأوروبية.',
    descriptionEn: 'Team building a digital catalog & photography suite for Nubian pottery to reach EU markets.',
    sectorAr: 'الحرف التراثية',
    sectorEn: 'Heritage Crafts',
    category: 'heritage_crafts',
    membersCount: 5,
    maxMembers: 5,
    leadNameAr: 'مريم محمود (غرب سهيل)',
    leadNameEn: 'Mariam Mahmoud (Gharb Soheil)',
    locationAr: 'أسوان - غرب سهيل',
    locationEn: 'Aswan - Gharb Soheil',
    whatsappGroupUrl: 'https://wa.me/201012345678?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D9%86%D8%B6%D9%85%D8%A7%D9%85%20%D9%84%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20MHN-CRAFT-04',
  },
  {
    id: 'proj-3',
    projectCode: 'MHN-AGRI-12',
    titleAr: 'تطبيق حساسات الرطوبة منخفضة التكلفة للزراعة',
    titleEn: 'Low-Cost Soil Moisture Sensor Grid',
    descriptionAr: 'تجميع واختبار أجهزة مستشعرات رطوبة محلية الصنع لم مساعدة مزارعي النخيل بأسوان في توفير المياه.',
    descriptionEn: 'Assembling low-cost soil sensors to help Aswan date palm farmers conserve water.',
    sectorAr: 'الزراعة المستدامة',
    sectorEn: 'Sustainable Agri',
    category: 'sustainable_agri',
    membersCount: 3,
    maxMembers: 8,
    leadNameAr: 'محمود الصاوي (كوم أمبو)',
    leadNameEn: 'Mahmoud El-Sawy (Kom Ombo)',
    locationAr: 'أسوان - كوم أمبو',
    locationEn: 'Aswan - Kom Ombo',
    whatsappGroupUrl: 'https://wa.me/201012345678?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D9%86%D8%B6%D9%85%D8%A7%D9%85%20%D9%84%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20MHN-AGRI-12',
  },
];

interface CommunityHubProps {
  language: Language;
  isDark: boolean;
}

/**
 * Screen Feature: Creative Community Projects Hub ("ملتقى صناع مهنة")
 * Enables vocational trainees to discover collaborative projects, reach group leads directly via WhatsApp/Telegram,
 * and form peer teams aligned with Aswan's key green & heritage sectors.
 */
export const CommunityHub: React.FC<CommunityHubProps> = ({ language, isDark: _isDark }) => {
  const isAr = language === 'ar';
  const [projects] = useState<CommunityProject[]>(MOCK_COMMUNITY_PROJECTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'green_energy': return <Sun className="w-4 h-4 text-amber-500" />;
      case 'heritage_crafts': return <Palette className="w-4 h-4 text-emerald-500" />;
      case 'sustainable_agri': return <Sprout className="w-4 h-4 text-green-600" />;
      default: return <Wrench className="w-4 h-4 text-sky-500" />;
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col overflow-y-auto p-4 space-y-4 pb-20 selection:bg-[#C4824A] selection:text-white"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#C8963E]/15 text-[#C8963E]">
              <Users className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-black" style={{ color: 'var(--theme-primary)' }}>
              {isAr ? 'ملتقى صُنّاع مهنة' : 'MEHNA Makers Hub'}
            </h2>
          </div>
          <p className="text-xs text-[var(--theme-text-muted)] mt-1">
            {isAr
              ? 'مشاريع تخرج وتطبيقات ميدانية مشتركة بين طلاب وخريجي التعليم الفني بأسوان.'
              : 'Collaborative applied projects & graduation hubs for Aswan vocational trainees.'}
          </p>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', labelAr: 'الكل', labelEn: 'All' },
          { id: 'green_energy', labelAr: 'طاقة شمسية', labelEn: 'Solar' },
          { id: 'heritage_crafts', labelAr: 'حرف تراثية', labelEn: 'Crafts' },
          { id: 'sustainable_agri', labelAr: 'زراعة مستدامة', labelEn: 'AgriTech' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-[#C8963E] text-white shadow-xs'
                : 'bg-[var(--theme-surface)] text-[var(--theme-text-muted)] border border-[var(--theme-border)]'
            }`}
          >
            {isAr ? cat.labelAr : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Projects Cards List */}
      <div className="space-y-3.5">
        {filteredProjects.map((project) => {
          const isFull = project.membersCount >= project.maxMembers;

          return (
            <div
              key={project.id}
              className="p-4 rounded-2xl border shadow-xs space-y-3 relative overflow-hidden transition-all hover:border-[#C8963E]/40"
              style={{
                backgroundColor: 'var(--theme-surface)',
                borderColor: 'var(--theme-border)',
              }}
            >
              {/* Top Bar: Code + Members count */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(project.category)}
                  <span className="font-mono text-[11px] font-black tracking-wider px-2 py-0.5 rounded-md bg-[#0D4A38]/10 text-[#0D4A38] dark:bg-white/10 dark:text-emerald-300">
                    {project.projectCode}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isFull
                      ? 'bg-neutral-500/15 text-[var(--theme-text-muted)]'
                      : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                  }`}
                >
                  {isAr
                    ? `${project.membersCount} من ${project.maxMembers} أعضاء`
                    : `${project.membersCount}/${project.maxMembers} members`}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h3 className="font-black text-sm text-[var(--theme-text)]">
                  {isAr ? project.titleAr : project.titleEn}
                </h3>
                <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed">
                  {isAr ? project.descriptionAr : project.descriptionEn}
                </p>
              </div>

              {/* Lead & Location */}
              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[var(--theme-border)] text-[var(--theme-text-muted)]">
                <div>
                  <span className="opacity-75">{isAr ? 'قائد المشروع: ' : 'Lead: '}</span>
                  <span className="font-bold text-[var(--theme-text)]">
                    {isAr ? project.leadNameAr : project.leadNameEn}
                  </span>
                </div>
                <span>{isAr ? project.locationAr : project.locationEn}</span>
              </div>

              {/* Communication Action Bar */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={project.whatsappGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'تواصل عبر WhatsApp' : 'WhatsApp Group'}</span>
                  <ExternalLink className="w-3 h-3 opacity-75" />
                </a>

                {project.telegramGroupUrl && (
                  <a
                    href={project.telegramGroupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white transition-colors shrink-0"
                    title={isAr ? 'قناة Telegram' : 'Telegram Channel'}
                  >
                    <Send className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import type { EmployerVacancy } from '../data/mockData';
import { INITIAL_EMPLOYER_VACANCIES, STIPEND_CONFIG } from '../data/mockData';
import type { MatchingWeights } from '../utils/matchingEngine';
import { calculateSkillMatchScore } from '../utils/matchingEngine';
import type { Language } from './Navbar';
import {
  Building2,
  Sliders,
  PlusCircle,
  Users,
  Sparkles,
  MapPin,
  X,
  Coins,
} from 'lucide-react';

interface EmployerConsoleProps {
  language: Language;
  matchingWeights: MatchingWeights;
  setMatchingWeights: (weights: MatchingWeights) => void;
}

export const EmployerConsole: React.FC<EmployerConsoleProps> = ({
  language,
  matchingWeights,
  setMatchingWeights,
}) => {
  const isAr = language === 'ar';
  const [vacancies, setVacancies] = useState<EmployerVacancy[]>(INITIAL_EMPLOYER_VACANCIES);
  const [selectedVacancyId, setSelectedVacancyId] = useState<string>(vacancies[0]?.id || '');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Vacancy Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSector, setNewSector] = useState('الطاقة المتجددة');
  const [newOpenings, setNewOpenings] = useState(2);
  const [newLocation, setNewLocation] = useState('أسوان');
  const [newStipend, setNewStipend] = useState(STIPEND_CONFIG.defaultNewVacancyStipend);

  // Handle live weight slider changes
  const handleWeightChange = (key: keyof MatchingWeights, value: number) => {
    // Normalizing other weights proportionately
    const updated = { ...matchingWeights, [key]: value };
    const otherKeys = (Object.keys(matchingWeights) as (keyof MatchingWeights)[]).filter(
      (k) => k !== key
    );
    const sumOthers = otherKeys.reduce((acc, k) => acc + matchingWeights[k], 0);
    const targetRemainder = Math.max(0, 1 - value);

    if (sumOthers > 0) {
      otherKeys.forEach((k) => {
        updated[k] = Number(((matchingWeights[k] / sumOthers) * targetRemainder).toFixed(2));
      });
    }

    setMatchingWeights(updated);
  };

  // Reset to default Gary Dessler weights
  const resetWeights = () => {
    setMatchingWeights({
      knowledgeWeight: 0.30,
      practicalSkillsWeight: 0.35,
      abilitiesWeight: 0.20,
      contextualWeight: 0.15,
    });
  };

  // Handle post vacancy form submission
  const handlePostVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newVac: EmployerVacancy = {
      id: `vac-${Date.now()}`,
      titleAr: newTitle,
      titleEn: newTitle,
      sectorAr: newSector,
      sectorEn: newSector,
      openings: Number(newOpenings),
      locationAr: newLocation,
      locationEn: newLocation,
      stipend: Number(newStipend),
      applicants: [
        {
          id: `app-sim-${Date.now()}`,
          nameAr: 'أحمد محمود النوبي',
          nameEn: 'Ahmed Mahmoud El-Nouby',
          age: 20,
          gender: 'M',
          educationAr: 'دبلوم صناعي حديث',
          educationEn: 'Recent Industrial Diploma',
          ksao: { knowledge: 82, practicalSkills: 86, abilities: 80, contextual: 85 },
          appliedDate: 'اليوم',
          statusAr: 'مؤهل للمقابلة',
          statusEn: 'Shortlisted',
        },
      ],
    };

    setVacancies([newVac, ...vacancies]);
    setSelectedVacancyId(newVac.id);
    setIsModalOpen(false);
    setNewTitle('');
  };

  const selectedVacancy = vacancies.find((v) => v.id === selectedVacancyId) || vacancies[0];

  // Sort applicants dynamically by real-time calculated match score
  const sortedApplicants = selectedVacancy?.applicants
    ? [...selectedVacancy.applicants].sort((a, b) => {
        const scoreA = calculateSkillMatchScore(a.ksao, matchingWeights);
        const scoreB = calculateSkillMatchScore(b.ksao, matchingWeights);
        return scoreB - scoreA;
      })
    : [];

  return (
    <div className="space-y-8 py-4">
      {/* Header and Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#0E3B33]/10 shadow-card">
        <div>
          <span className="text-xs font-bold text-[#C4824A] uppercase tracking-wider block">
            {isAr ? 'إدارة المواهب وتفكيك المهام (ديسلر)' : 'Job Analysis & Talent Selection'}
          </span>
          <h2 className="text-2xl font-black text-[#0E3B33] font-arabic mt-1 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#C4824A]" />
            <span>{isAr ? 'منصة الشركات وأصحاب الأعمال' : 'Enterprise Employer Console'}</span>
          </h2>
          <p className="text-xs text-[#0E3B33]/70 mt-1">
            {isAr
              ? 'تتيح المنصة للمؤسسات الشريكة نشر فرص التعلم القائم على العمل (WBL)، وتعديل أوزان KSAO خوارزمياً لفرز الكفاءات بدقة عالية.'
              : 'Empowering partner enterprises to define task profiles and adjust KSAO algorithmic weights to rank applicants instantly.'}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0E3B33] text-white hover:bg-[#185247] transition-all font-bold text-sm shadow-card shadow-card-hover cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-[#C4824A]" />
          <span>{isAr ? 'نشر فرصة تدريب جديدة' : 'Post New WBL Vacancy'}</span>
        </button>
      </div>

      {/* Interactive Gary Dessler Weight Sliders Card */}
      <section className="p-6 rounded-3xl bg-[#E9E3D3]/70 border border-[#0E3B33]/15 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#0E3B33]/10 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#C4824A]" />
            <h3 className="font-bold text-base text-[#0E3B33] font-arabic">
              {isAr ? 'محرك ضبط أوزان المطابقة المهارية (Dessler KSAO Engine)' : 'Live KSAO Matching Weights Adjustment'}
            </h3>
          </div>
          <button
            onClick={resetWeights}
            className="text-xs font-bold text-[#C4824A] hover:underline cursor-pointer self-start sm:self-auto"
          >
            {isAr ? 'إعادة تعيين الأوزان الافتراضية' : 'Reset to Default Weights'}
          </button>
        </div>

        <p className="text-xs text-[#0E3B33]/75 leading-relaxed">
          {isAr
            ? 'تتيح هذه المنزلقات التفاعلية للشركة إعادة وزن مكونات الملاءمة الشخصية-الوظيفية لحظياً. يتم تحديث نسبة التطابق للمتقدمين مباشرة فور تعديل أي وزن.'
            : 'Adjust the sliders below to re-weigh candidate evaluation criteria. All applicant match scores recompute in real-time.'}
        </p>

        {/* 4 Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* w1: Knowledge */}
          <div className="p-4 rounded-2xl bg-white border border-[#0E3B33]/10 shadow-card space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#0E3B33]">{isAr ? 'المعرفة النظرية (w1)' : 'Knowledge (w1)'}</span>
              <span className="font-black text-[#C4824A] text-sm">
                {Math.round(matchingWeights.knowledgeWeight * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.70"
              step="0.05"
              value={matchingWeights.knowledgeWeight}
              onChange={(e) => handleWeightChange('knowledgeWeight', parseFloat(e.target.value))}
              className="w-full accent-[#C4824A] cursor-pointer"
            />
            <span className="text-[10px] text-gray-500 block">
              {isAr ? 'الخلفية الأكاديمية والشهادات' : 'Academic & concepts'}
            </span>
          </div>

          {/* w2: Practical Skills */}
          <div className="p-4 rounded-2xl bg-white border border-[#0E3B33]/10 shadow-card space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#0E3B33]">{isAr ? 'المهارات العملية (w2)' : 'Practical Skills (w2)'}</span>
              <span className="font-black text-[#C4824A] text-sm">
                {Math.round(matchingWeights.practicalSkillsWeight * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.70"
              step="0.05"
              value={matchingWeights.practicalSkillsWeight}
              onChange={(e) => handleWeightChange('practicalSkillsWeight', parseFloat(e.target.value))}
              className="w-full accent-[#C4824A] cursor-pointer"
            />
            <span className="text-[10px] text-gray-500 block">
              {isAr ? 'القدرة التشغيلية والتطبيق اليدوي' : 'Tool handling & execution'}
            </span>
          </div>

          {/* w3: Abilities */}
          <div className="p-4 rounded-2xl bg-white border border-[#0E3B33]/10 shadow-card space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#0E3B33]">{isAr ? 'القدرات العقلية/البدنية (w3)' : 'Abilities (w3)'}</span>
              <span className="font-black text-[#C4824A] text-sm">
                {Math.round(matchingWeights.abilitiesWeight * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.70"
              step="0.05"
              value={matchingWeights.abilitiesWeight}
              onChange={(e) => handleWeightChange('abilitiesWeight', parseFloat(e.target.value))}
              className="w-full accent-[#C4824A] cursor-pointer"
            />
            <span className="text-[10px] text-gray-500 block">
              {isAr ? 'التحمل وحل المشكلات والاستيعاب' : 'Cognitive & physical capacity'}
            </span>
          </div>

          {/* w4: Contextual */}
          <div className="p-4 rounded-2xl bg-white border border-[#0E3B33]/10 shadow-card space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#0E3B33]">{isAr ? 'الخصائص السياقية (w4)' : 'Contextual (w4)'}</span>
              <span className="font-black text-[#C4824A] text-sm">
                {Math.round(matchingWeights.contextualWeight * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.70"
              step="0.05"
              value={matchingWeights.contextualWeight}
              onChange={(e) => handleWeightChange('contextualWeight', parseFloat(e.target.value))}
              className="w-full accent-[#C4824A] cursor-pointer"
            />
            <span className="text-[10px] text-gray-500 block">
              {isAr ? 'القرب الجغرافي والالتزام التراثي' : 'Proximity & cultural fit'}
            </span>
          </div>
        </div>
      </section>

      {/* Vacancies Table and Applicants Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Vacancies List (Left / 5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#0E3B33] font-arabic">
              {isAr ? 'فرص التدريب النشطة بالمؤسسة' : 'Active WBL Vacancies'}
            </h3>
            <span className="text-xs text-gray-500">
              {vacancies.length} {isAr ? 'فرص' : 'positions'}
            </span>
          </div>

          <div className="space-y-3">
            {vacancies.map((vac) => {
              const isSelected = vac.id === selectedVacancyId;

              return (
                <div
                  key={vac.id}
                  onClick={() => setSelectedVacancyId(vac.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all shadow-card shadow-card-hover ${
                    isSelected
                      ? 'bg-white border-[#C4824A] ring-2 ring-[#C4824A]/20'
                      : 'bg-white/80 border-[#0E3B33]/10 hover:border-[#0E3B33]/30 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#C4824A] block">
                        {isAr ? vac.sectorAr : vac.sectorEn}
                      </span>
                      <h4 className="font-bold text-sm text-[#0E3B33] mt-0.5">
                        {isAr ? vac.titleAr : vac.titleEn}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#C4824A]" />
                          <span>{isAr ? vac.locationAr : vac.locationEn}</span>
                        </span>
                        <span>•</span>
                        <span>{vac.openings} {isAr ? 'شواغر' : 'openings'}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-semibold text-[#0E3B33]">
                          <Coins className="w-3 h-3 text-[#C4824A]" />
                          <span>{vac.stipend} {isAr ? 'ج.م' : 'EGP'}</span>
                          <span className="text-[8px] px-1 py-0.2 rounded bg-[#C4824A]/15 text-[#C4824A]">
                            {isAr ? STIPEND_CONFIG.illustrativeLabelAr : 'Illustrative'}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E3B33]/5 text-[#0E3B33] text-xs font-bold shrink-0">
                      <Users className="w-3.5 h-3.5 text-[#C4824A]" />
                      <span>{vac.applicants.length} {isAr ? 'متقدمين' : 'apps'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Applicants Ranked List (Right / 7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#0E3B33] font-arabic">
                {isAr ? 'ترتيب المتقدمين آلياً حسب التوافق' : 'Algorithmic Candidate Ranking'}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {isAr ? selectedVacancy?.titleAr : selectedVacancy?.titleEn}
              </p>
            </div>
            <span className="text-xs font-bold text-[#0E3B33] bg-[#E9E3D3] px-3 py-1 rounded-xl">
              {sortedApplicants.length} {isAr ? 'مرشحين' : 'candidates'}
            </span>
          </div>

          <div className="space-y-3.5">
            {sortedApplicants.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-[#0E3B33]/10 text-center text-gray-500 text-sm shadow-card">
                {isAr ? 'لا يوجد متقدمين حتى الآن لهذه الفرصة.' : 'No applicants yet for this vacancy.'}
              </div>
            ) : (
              sortedApplicants.map((applicant, index) => {
                const matchScore = calculateSkillMatchScore(applicant.ksao, matchingWeights);

                return (
                  <div
                    key={applicant.id}
                    className="p-5 rounded-2xl bg-white border border-[#0E3B33]/10 shadow-card shadow-card-hover space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0E3B33] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                          #{index + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#0E3B33]">
                            {isAr ? applicant.nameAr : applicant.nameEn}
                          </h4>
                          <span className="text-xs text-gray-500 block">
                            {applicant.age} {isAr ? 'سنة' : 'yrs'} • {isAr ? applicant.educationAr : applicant.educationEn}
                          </span>
                        </div>
                      </div>

                      {/* Match Score Display */}
                      <div className="text-end">
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#0E3B33] text-white shadow-xs">
                          <Sparkles className="w-3.5 h-3.5 text-[#C4824A]" />
                          <span className="font-black text-sm text-[#D99B68]">{matchScore}%</span>
                        </div>
                        <span className="text-[10px] text-gray-500 block mt-1">
                          {isAr ? applicant.statusAr : applicant.statusEn}
                        </span>
                      </div>
                    </div>

                    {/* KSAO Breakdown Bars */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#0E3B33]/5 text-[11px]">
                      <div>
                        <div className="flex justify-between text-gray-500 mb-1">
                          <span>{isAr ? 'معرفة' : 'Know.'}</span>
                          <span className="font-bold text-[#0E3B33]">{applicant.ksao.knowledge}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#0E3B33] h-full"
                            style={{ width: `${applicant.ksao.knowledge}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-gray-500 mb-1">
                          <span>{isAr ? 'مهارة' : 'Skills'}</span>
                          <span className="font-bold text-[#0E3B33]">{applicant.ksao.practicalSkills}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#C4824A] h-full"
                            style={{ width: `${applicant.ksao.practicalSkills}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-gray-500 mb-1">
                          <span>{isAr ? 'قدرة' : 'Ability'}</span>
                          <span className="font-bold text-[#0E3B33]">{applicant.ksao.abilities}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#0E3B33] h-full"
                            style={{ width: `${applicant.ksao.abilities}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-gray-500 mb-1">
                          <span>{isAr ? 'سياق' : 'Context'}</span>
                          <span className="font-bold text-[#0E3B33]">{applicant.ksao.contextual}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#C4824A] h-full"
                            style={{ width: `${applicant.ksao.contextual}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Modal: Post New Vacancy */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#0E3B33]/20 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 end-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#0E3B33] font-arabic mb-1">
              {isAr ? 'نشر فرصة تدريب عملي جديدة (WBL)' : 'Post New WBL Placement Vacancy'}
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              {isAr
                ? 'أدخل تفاصيل الفرصة لربطها فورياً بمحرك المطابقة مع شباب محافظة أسوان.'
                : 'Enter placement details to immediately integrate into the Aswan matching pool.'}
            </p>

            <form onSubmit={handlePostVacancy} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-[#0E3B33] mb-1">
                  {isAr ? 'عنوان فرصة التدريب' : 'Vacancy Title'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isAr ? 'مثال: فني مراقبة إنتاج طاقة نظيفة' : 'e.g. Solar Production Tech'}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C4824A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0E3B33] mb-1">
                    {isAr ? 'القطاع' : 'Sector'}
                  </label>
                  <select
                    value={newSector}
                    onChange={(e) => setNewSector(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C4824A] bg-white text-xs"
                  >
                    <option value="الطاقة المتجددة">{isAr ? 'الطاقة المتجددة' : 'Renewable Energy'}</option>
                    <option value="الزراعة المستدامة">{isAr ? 'الزراعة المستدامة' : 'Sustainable Agriculture'}</option>
                    <option value="الحرف التراثية">{isAr ? 'الحرف التراثية' : 'Heritage Crafts'}</option>
                    <option value="السياحة البيئية">{isAr ? 'السياحة البيئية' : 'Eco-Tourism'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0E3B33] mb-1">
                    {isAr ? 'عدد الشواغر' : 'Openings'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={newOpenings}
                    onChange={(e) => setNewOpenings(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C4824A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0E3B33] mb-1">
                    {isAr ? 'الموقع بأسوان' : 'Location'}
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C4824A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0E3B33] mb-1">
                    {isAr ? 'المكافأة الشهرية التقديرية (ج.م)' : 'Estimated Monthly Stipend (EGP)'}
                  </label>
                  <input
                    type="number"
                    min="1500"
                    step="100"
                    value={newStipend}
                    onChange={(e) => setNewStipend(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C4824A]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0E3B33] text-white font-bold text-xs hover:bg-[#185247] cursor-pointer"
                >
                  {isAr ? 'حفظ ونشر الفرصة' : 'Publish Vacancy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

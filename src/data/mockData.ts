import type { KSAOScores } from '../utils/matchingEngine';

export type EmployerVerificationStatus = 'verified' | 'pending' | 'minor_safe';

export interface WBLOpportunity {
  id: string;
  employerId?: string;
  titleAr: string;
  titleEn: string;
  employerAr: string;
  employerEn: string;
  sectorAr: string;
  sectorEn: string;
  locationAr: string;
  locationEn: string;
  stipend: number; // in EGP
  transportationAllowance?: number; // in EGP - for rural commute transparency
  durationMonths: number;
  descriptionAr: string;
  descriptionEn: string;
  candidateKSAO: KSAOScores;
  isApplied?: boolean;
  // Employer verification & safety badges
  employerVerificationStatus?: EmployerVerificationStatus;
  isVerifiedWBLPartner?: boolean;
  isMinorSafeWorkplace?: boolean;
  /**
   * Optional short promo video URL for each opportunity.
   * WHY: A 60-90 second video of the actual training site gives youth a
   * concrete sense of "what my day looks like" — far more persuasive than
   * text descriptions for a demographic that grew up on YouTube/TikTok.
   * We use an optional field so existing opportunities without a video
   * simply render nothing (no broken placeholders).
   */
  promoVideoUrl?: string;
  /**
   * What the trainee will concretely master — replaces abstract KSAO scores.
   * WHY: "88% Knowledge" means nothing to a 17-year-old from Daraw.
   * "You will wire a 10kW inverter" is a goal they can hold in their mind.
   * Arabic deliverables are the primary; English provided for bilingual mode.
   */
  deliverables?: string[];
  deliverablesEn?: string[];
}

export interface StipendEntry {
  id: string;
  monthAr: string;
  monthEn: string;
  amount: number;
  statusAr: 'مدفوع' | 'قيد التحويل' | 'مجدول';
  statusEn: 'Paid' | 'Processing' | 'Scheduled';
  date: string;
  referenceId: string;
}

export interface Applicant {
  id: string;
  nameAr: string;
  nameEn: string;
  age: number;
  gender: 'M' | 'F';
  educationAr: string;
  educationEn: string;
  ksao: KSAOScores;
  appliedDate: string;
  statusAr: 'مؤهل للمقابلة' | 'قيد المراجعة' | 'تم التعاقد';
  statusEn: 'Shortlisted' | 'Under Review' | 'Contracted';
}

export interface EmployerVacancy {
  id: string;
  titleAr: string;
  titleEn: string;
  sectorAr: string;
  sectorEn: string;
  openings: number;
  locationAr: string;
  locationEn: string;
  stipend: number;
  transportationAllowance?: number;
  isVerifiedWBLPartner?: boolean;
  isMinorSafeWorkplace?: boolean;
  applicants: Applicant[];
}

export interface SectorPlacementData {
  sectorAr: string;
  sectorEn: string;
  placements: number;
  femaleCount: number;
}

export interface MonthlyTrendData {
  monthAr: string;
  monthEn: string;
  placements: number;
}

/**
 * Centralized Stipend Configuration (Step 4 Requirement)
 * Enables rapid modification of stipend values and provides unified labels for simulated figures.
 */
export const STIPEND_CONFIG = {
  illustrativeLabelAr: 'بيانات توضيحية',
  illustrativeLabelEn: 'Illustrative Data',
  cumulativeVerifiedTotal: 6400,
  defaultNewVacancyStipend: 3000,
  averageMonthlyBaseline: 3050,
};

export const YOUTH_PROFILE_DATA = {
  nameAr: 'يوسف أحمد المنشاوي',
  nameEn: 'Youssef Ahmed El-Menshawy',
  age: 19,
  trackAr: 'دبلوم فني صناعي متقدم - مسار الطاقة المتجددة وشبكات الجهد',
  trackEn: 'Advanced Industrial Diploma - Renewable Energy & Power Grid Track',
  locationAr: 'أسوان - دراو',
  locationEn: 'Aswan - Daraw',
  completionRate: 85,
  ksao: {
    knowledge: 82,
    practicalSkills: 88,
    abilities: 78,
    contextual: 85,
  } as KSAOScores,
};

export const INITIAL_WBL_OPPORTUNITIES: WBLOpportunity[] = [
  {
    id: 'wbl-1',
    titleAr: 'فني تشغيل وصيانة خلايا شمسية كهروضوئية',
    titleEn: 'Solar PV Operation & Maintenance Technician',
    employerAr: 'تحالف بنبان للطاقة النظيفة والمتجددة',
    employerEn: 'Benban Clean Energy Consortium',
    sectorAr: 'الطاقة المتجددة',
    sectorEn: 'Renewable Energy',
    locationAr: 'أسوان - مجمع بنبان للطاقة الشمسية',
    locationEn: 'Aswan - Benban Solar Park',
    stipend: 3200,
    transportationAllowance: 400,
    durationMonths: 6,
    descriptionAr: 'برنامج تدريب عملي ميداني في صيانة ألواح الطاقة الشمسية، ومعايرة محولات العكس ومحطات المراقبة الرقمية.',
    descriptionEn: 'Field-based practical training in solar PV maintenance, inverter calibration, and digital telemetry monitoring.',
    candidateKSAO: { knowledge: 88, practicalSkills: 92, abilities: 84, contextual: 90 },
    isApplied: false,
    employerVerificationStatus: 'verified',
    isVerifiedWBLPartner: true,
    isMinorSafeWorkplace: true,
    promoVideoUrl: 'https://www.youtube-nocookie.com/embed/1la4jGS6k3M',
    deliverables: [
      'فحص وقياس كفاءة الألواح الشمسية بمحطات العكس المركزية',
      'صيانة كابلات الجهد المتوسط وتوصيلات محولات الطاقة',
      'قراءة بيانات محطة المراقبة الرقمية وتشخيص الأعطال الميدانية',
      'تطبيق معايير السلامة المهنية والصحة للعمل في المحطات الكبرى',
    ],
    deliverablesEn: [
      'Inspect and measure solar panel efficiency at central inverter stations',
      'Maintain medium-voltage cabling and power transformer connections',
      'Read digital telemetry data and diagnose field electrical faults',
      'Execute standard industrial HSE protocols for utility-scale solar parks',
    ],
  },
  {
    id: 'wbl-2',
    titleAr: 'فني نظم ري ذكية ومحاصيل استصلاح مستدامة',
    titleEn: 'Smart Irrigation & Sustainable Agri-Tech Technician',
    employerAr: 'شركة وادي النقرة للتنمية الزراعية الحديثة',
    employerEn: 'Wadi El-Nokra Modern Agriculture Co.',
    sectorAr: 'الزراعة المستدامة',
    sectorEn: 'Sustainable Agriculture',
    locationAr: 'أسوان - وادي النقرة',
    locationEn: 'Aswan - Wadi El-Nokra',
    stipend: 2800,
    transportationAllowance: 350,
    durationMonths: 4,
    descriptionAr: 'تطبيق عملي على شبكات الري بالتنقيط المؤتمتة، إدارة ملوحة التربة، وحصاد المحاصيل التصديرية.',
    descriptionEn: 'Hands-on instruction in automated drip irrigation grids, soil salinity management, and export crop logistics.',
    candidateKSAO: { knowledge: 75, practicalSkills: 80, abilities: 72, contextual: 78 },
    isApplied: false,
    employerVerificationStatus: 'verified',
    isVerifiedWBLPartner: true,
    isMinorSafeWorkplace: true,
    promoVideoUrl: 'https://www.youtube-nocookie.com/embed/1la4jGS6k3M',
    deliverables: [
      'برمجة وصيانة لوحات التحكم الآلي لشبكات الري بالتنقيط',
      'تحليل ومراقبة ملوحة ورطوبة التربة عبر المستشعرات الحقلية',
      'تشغيل محطات الضخ وتسميد التربة بالمغذيات العضوية',
      'تجهيز المحاصيل التصديرية وتطبيق معايير الجودة العالمية',
    ],
    deliverablesEn: [
      'Program and calibrate automated drip irrigation controllers',
      'Monitor soil salinity and moisture levels using field IoT sensors',
      'Operate variable pumping stations and organic fertigation systems',
      'Prepare export-grade harvests according to international GAP standards',
    ],
  },
  {
    id: 'wbl-3',
    titleAr: 'حرفي خزف وفخار نوبي بتقنيات إنتاج حديثة',
    titleEn: 'Contemporary Nubian Pottery & Ceramic Artisan',
    employerAr: 'جمعية إحياء التراث الحرفي بأسوان',
    employerEn: 'Aswan Heritage Revival Guild',
    sectorAr: 'الحرف التراثية',
    sectorEn: 'Heritage Crafts',
    locationAr: 'أسوان - قرية غرب سهيل',
    locationEn: 'Aswan - Gharb Soheil',
    stipend: 2600,
    transportationAllowance: 250,
    durationMonths: 6,
    descriptionAr: 'دمج تقنيات التشكيل الفخاري النوبي التقليدي مع أفران الحرق الصديقة للبيئة وأنماط التصميم المعاصرة.',
    descriptionEn: 'Combining traditional Nubian wheel-throwing methods with eco-friendly kilns and contemporary product design.',
    candidateKSAO: { knowledge: 68, practicalSkills: 85, abilities: 80, contextual: 88 },
    isApplied: false,
    employerVerificationStatus: 'verified',
    isVerifiedWBLPartner: true,
    isMinorSafeWorkplace: true,
    promoVideoUrl: 'https://www.youtube-nocookie.com/embed/1la4jGS6k3M',
    deliverables: [
      'تشكيل القطع الفخارية النوبية على العجلة بتقنيات متقدمة',
      'تحضير ومزج الطينات المحلية وإعداد ألوان الطلاء الطبيعية',
      'تشغيل أفران الحرق الصديقة للبيئة وضبط درجات الحرارة بدقة',
      'تشطيب وتغليف المنتجات الخزفية التراثية للعرض والتصدير',
    ],
    deliverablesEn: [
      'Master wheel-throwing of authentic Nubian ceramic artifacts',
      'Formulate local clay blends and extract natural mineral glazes',
      'Operate eco-friendly kilns and calibrate firing temperature cycles',
      'Finish and package heritage ceramic products for export markets',
    ],
  },
  {
    id: 'wbl-4',
    titleAr: 'منسق ضيافة بيئية وإرشاد سياحي مجتمعي',
    titleEn: 'Eco-Lodge Hospitality & Cultural Tourism Coordinator',
    employerAr: 'مجموعة نزل النيل البيئية بأسوان',
    employerEn: 'Nile Eco-Sanctuary Lodges',
    sectorAr: 'السياحة البيئية',
    sectorEn: 'Eco-Tourism',
    locationAr: 'أسوان - جزيرة هيسا',
    locationEn: 'Aswan - Heissa Island',
    stipend: 3000,
    transportationAllowance: 300,
    durationMonths: 5,
    descriptionAr: 'إدارة تجربة النزلاء البيئية، الإشراف على الأغذية العضوية المحلية، وقيادة الجولات البيئية والثقافية.',
    descriptionEn: 'Managing guest eco-experiences, local organic farm-to-table coordination, and sustainable cultural excursions.',
    candidateKSAO: { knowledge: 78, practicalSkills: 76, abilities: 86, contextual: 92 },
    isApplied: false,
    employerVerificationStatus: 'verified',
    isVerifiedWBLPartner: true,
    isMinorSafeWorkplace: true,
    promoVideoUrl: 'https://www.youtube-nocookie.com/embed/1la4jGS6k3M',
    deliverables: [
      'استقبال وتنظيم جداول إقامة النزلاء في النزل البيئية',
      'تصميم وتنفيذ جولات سياحية وثقافية مستدامة بالتعاون مع المجتمع المحلي',
      'إدارة سلاسل التوريد الغذائي العضوي وتنسيق الضيافة النوبية',
      'التواصل الاحترافي مع الضيوف بلغات متعددة وحل المواقف الفورية',
    ],
    deliverablesEn: [
      'Manage guest eco-stay itineraries and concierge operations',
      'Design and lead community-based sustainable cultural tours',
      'Coordinate local farm-to-table supply chains and Nubian hospitality',
      'Deliver multilingual guest communications and live tour facilitation',
    ],
  },
  {
    id: 'wbl-5',
    titleAr: 'فني نسيج تراثي وأنوال يدوية مطورة',
    titleEn: 'Master Weaver on Upgraded Traditional Looms',
    employerAr: 'مؤسسة إخميم وأسوان للمنسوجات اليدوية',
    employerEn: 'Aswan Traditional Textile Works',
    sectorAr: 'المنسوجات التراثية',
    sectorEn: 'Heritage Textiles',
    locationAr: 'أسوان - مدينة أسوان الجديدة',
    locationEn: 'Aswan - New Aswan City',
    stipend: 2700,
    transportationAllowance: 200,
    durationMonths: 6,
    descriptionAr: 'التدريب على أنوال النسيج النوبية والمصرية الأصيلة، تقنيات الصباغة الطبيعية المستدامة ومراقبة الجودة.',
    descriptionEn: 'Skill building on authentic hand-looms, natural zero-chemical dye extraction, and export fabric quality testing.',
    candidateKSAO: { knowledge: 72, practicalSkills: 88, abilities: 74, contextual: 82 },
    isApplied: false,
    employerVerificationStatus: 'pending',
    isVerifiedWBLPartner: false,
    isMinorSafeWorkplace: false,
    promoVideoUrl: 'https://www.youtube-nocookie.com/embed/1la4jGS6k3M',
    deliverables: [
      'إعداد وشد خيوط السداء واللحمة على الأنوال اليدوية المطورة',
      'تنفيذ النقوش والرموز النوبية التراثية بدقة وحرفية عالية',
      'استخلاص وتجهيز الصبغات النباتية الطبيعية الخالية من المواد الكيميائية',
      'فحص متانة وجودة الأقمشة المنسوجة وفق متطلبات المعارض الدولية',
    ],
    deliverablesEn: [
      'Warp and set up upgraded traditional hand-looms with precision',
      'Weave authentic heritage motifs and historic Nubian geometric patterns',
      'Extract and formulate natural zero-chemical vegetable dyes',
      'Conduct fabric tensile and quality inspections for exhibition grade textiles',
    ],
  },
  {
    id: 'wbl-6',
    titleAr: 'أخصائي تسويق رقمي وتجارة إلكترونية للحرف اليدوية',
    titleEn: 'Digital Marketing & E-Commerce Specialist for Artisans',
    employerAr: 'حاضنة أعمال نماء أسوان الرقمية',
    employerEn: 'Namaa Aswan Digital Incubator',
    sectorAr: 'التسويق الرقمي للحرف',
    sectorEn: 'Crafts E-Commerce',
    locationAr: 'أسوان - مجمع ريادة الأعمال بالجامعة',
    locationEn: 'Aswan - University Entrepreneurship Hub',
    stipend: 3100,
    transportationAllowance: 300,
    durationMonths: 4,
    descriptionAr: 'تصوير المنتجات الحرفية، إدارة المتاجر الإلكترونية عبر منصات شوبيفاي، وتنفيذ الحملات الإعلانية الموجهة دولياً.',
    descriptionEn: 'Product photography for heritage goods, managing Shopify craft storefronts, and running targeted global export ad campaigns.',
    candidateKSAO: { knowledge: 90, practicalSkills: 86, abilities: 88, contextual: 80 },
    isApplied: false,
    employerVerificationStatus: 'verified',
    isVerifiedWBLPartner: true,
    isMinorSafeWorkplace: true,
    promoVideoUrl: 'https://www.youtube-nocookie.com/embed/1la4jGS6k3M',
    deliverables: [
      'تصوير احترافي للمنتجات الحرفية وضبط الإضاءة الترويجية',
      'إعداد وإدارة صفحات المتاجر الإلكترونية على منصات التجارة الدولية',
      'إطلاق وتتبع الحملات الإعلانية الممولة على منصات التواصل الاجتماعي',
      'إدارة خدمة العملاء وتنسيق الشحن الدولي وتغليف الطلبات',
    ],
    deliverablesEn: [
      'Shoot high-definition product photography with studio lighting',
      'Configure and manage multi-currency craft storefronts on Shopify',
      'Launch and optimize targeted social media export ad campaigns',
      'Handle customer support, international shipping fulfillment and tracking',
    ],
  },
];

export const INITIAL_STIPENDS: StipendEntry[] = [
  {
    id: 'stp-1',
    monthAr: 'أكتوبر 2026',
    monthEn: 'October 2026',
    amount: 3200,
    statusAr: 'مدفوع',
    statusEn: 'Paid',
    date: '2026-10-01',
    referenceId: 'MEHNA-EGP-883921',
  },
  {
    id: 'stp-2',
    monthAr: 'نوفمبر 2026',
    monthEn: 'November 2026',
    amount: 3200,
    statusAr: 'مدفوع',
    statusEn: 'Paid',
    date: '2026-11-01',
    referenceId: 'MEHNA-EGP-901243',
  },
  {
    id: 'stp-3',
    monthAr: 'ديسمبر 2026',
    monthEn: 'December 2026',
    amount: 3200,
    statusAr: 'قيد التحويل',
    statusEn: 'Processing',
    date: '2026-12-01',
    referenceId: 'MEHNA-EGP-Pending',
  },
  {
    id: 'stp-4',
    monthAr: 'يناير 2027',
    monthEn: 'January 2027',
    amount: 3500,
    statusAr: 'مجدول',
    statusEn: 'Scheduled',
    date: '2027-01-01',
    referenceId: 'MEHNA-EGP-Plan',
  },
];

export const INITIAL_EMPLOYER_VACANCIES: EmployerVacancy[] = [
  {
    id: 'vac-1',
    titleAr: 'فني تشغيل وصيانة محطات طاقة شمسية',
    titleEn: 'Solar PV Systems Maintenance Technician',
    sectorAr: 'الطاقة المتجددة (بنبان)',
    sectorEn: 'Renewable Energy (Benban)',
    openings: 4,
    locationAr: 'مجمع بنبان - أسوان',
    locationEn: 'Benban Park - Aswan',
    stipend: 3200,
    transportationAllowance: 400,
    isVerifiedWBLPartner: true,
    isMinorSafeWorkplace: true,
    applicants: [
      {
        id: 'app-1',
        nameAr: 'يوسف أحمد المنشاوي',
        nameEn: 'Youssef Ahmed El-Menshawy',
        age: 19,
        gender: 'M',
        educationAr: 'دبلوم صناعي - كهرباء',
        educationEn: 'Technical Diploma - Electrical',
        ksao: { knowledge: 88, practicalSkills: 92, abilities: 84, contextual: 90 },
        appliedDate: '2026-10-05',
        statusAr: 'مؤهل للمقابلة',
        statusEn: 'Shortlisted',
      },
      {
        id: 'app-2',
        nameAr: 'مريم طارق النجار',
        nameEn: 'Mariam Tarek El-Naggar',
        age: 20,
        gender: 'F',
        educationAr: 'معهد فني تكنولوجي - طاقة',
        educationEn: 'Technical Institute - Energy',
        ksao: { knowledge: 92, practicalSkills: 86, abilities: 88, contextual: 82 },
        appliedDate: '2026-10-06',
        statusAr: 'مؤهل للمقابلة',
        statusEn: 'Shortlisted',
      },
      {
        id: 'app-3',
        nameAr: 'محمود عبد الرحيم جابر',
        nameEn: 'Mahmoud Abdelrahim Gaber',
        age: 18,
        gender: 'M',
        educationAr: 'ثانوي فني صناعي',
        educationEn: 'Technical High School',
        ksao: { knowledge: 74, practicalSkills: 81, abilities: 76, contextual: 79 },
        appliedDate: '2026-10-08',
        statusAr: 'قيد المراجعة',
        statusEn: 'Under Review',
      },
    ],
  },
  {
    id: 'vac-2',
    titleAr: 'منسق تجارب سياحية وضيافة نوبية مستدامة',
    titleEn: 'Eco-Tourism Guide & Nubian Hospitality Coordinator',
    sectorAr: 'السياحة البيئية',
    sectorEn: 'Eco-Tourism',
    openings: 3,
    locationAr: 'غرب سهيل - أسوان',
    locationEn: 'Gharb Soheil - Aswan',
    stipend: 3000,
    transportationAllowance: 300,
    isVerifiedWBLPartner: true,
    isMinorSafeWorkplace: true,
    applicants: [
      {
        id: 'app-4',
        nameAr: 'فاطمة حسن إدريس',
        nameEn: 'Fatima Hassan Idriss',
        age: 21,
        gender: 'F',
        educationAr: 'دبلوم فندقي وسياحي',
        educationEn: 'Tourism & Hospitality Diploma',
        ksao: { knowledge: 85, practicalSkills: 88, abilities: 90, contextual: 94 },
        appliedDate: '2026-10-04',
        statusAr: 'تم التعاقد',
        statusEn: 'Contracted',
      },
      {
        id: 'app-5',
        nameAr: 'عمر خالد الصاوي',
        nameEn: 'Omar Khaled El-Sawy',
        age: 19,
        gender: 'M',
        educationAr: 'لغات وترجمة متوسط',
        educationEn: 'Intermediate Languages Certificate',
        ksao: { knowledge: 80, practicalSkills: 75, abilities: 82, contextual: 85 },
        appliedDate: '2026-10-07',
        statusAr: 'قيد المراجعة',
        statusEn: 'Under Review',
      },
    ],
  },
  {
    id: 'vac-3',
    titleAr: 'مشرف تسويق رقمي لصادرات الحرف اليدوية',
    titleEn: 'Handicraft Digital Marketing Supervisor',
    sectorAr: 'ريادة الأعمال التراثية',
    sectorEn: 'Heritage Entrepreneurship',
    openings: 2,
    locationAr: 'مدينة أسوان - المركز التكنولوجي',
    locationEn: 'Aswan City - Tech Hub',
    stipend: 3100,
    transportationAllowance: 300,
    isVerifiedWBLPartner: true,
    isMinorSafeWorkplace: true,
    applicants: [
      {
        id: 'app-6',
        nameAr: 'سلمى مجدي سليم',
        nameEn: 'Salma Magdy Selim',
        age: 22,
        gender: 'F',
        educationAr: 'معهد نظم معلومات وإدارة',
        educationEn: 'Information Systems Institute',
        ksao: { knowledge: 94, practicalSkills: 90, abilities: 86, contextual: 88 },
        appliedDate: '2026-10-03',
        statusAr: 'مؤهل للمقابلة',
        statusEn: 'Shortlisted',
      },
    ],
  },
];

export const SECTOR_PLACEMENTS: SectorPlacementData[] = [
  { sectorAr: 'الطاقة المتجددة (بنبان)', sectorEn: 'Renewable Energy', placements: 520, femaleCount: 165 },
  { sectorAr: 'الزراعة المستدامة', sectorEn: 'Sustainable Agriculture', placements: 340, femaleCount: 95 },
  { sectorAr: 'الحرف والمنسوجات التراثية', sectorEn: 'Heritage Crafts & Textiles', placements: 310, femaleCount: 245 },
  { sectorAr: 'السياحة البيئية', sectorEn: 'Eco-Tourism', placements: 250, femaleCount: 118 },
];

export const MONTHLY_PLACEMENTS: MonthlyTrendData[] = [
  { monthAr: 'مارس', monthEn: 'Mar', placements: 65 },
  { monthAr: 'أبريل', monthEn: 'Apr', placements: 110 },
  { monthAr: 'مايو', monthEn: 'May', placements: 145 },
  { monthAr: 'يونيو', monthEn: 'Jun', placements: 185 },
  { monthAr: 'يوليو', monthEn: 'Jul', placements: 215 },
  { monthAr: 'أغسطس', monthEn: 'Aug', placements: 260 },
  { monthAr: 'سبتمبر', monthEn: 'Sep', placements: 295 },
  { monthAr: 'أكتوبر', monthEn: 'Oct', placements: 345 },
];

export const B2G_KPIS = {
  totalPlacements: 1420,
  activeContracts: 865,
  consentComplianceRate: 100, // Egypt Data Privacy Law 151/2020
  femaleParticipationRate: 43.8, // Targeting Upper Egypt's 33.8% disparity
  partnerEnterprises: 118,
  averageStipendEGP: 3050,
};

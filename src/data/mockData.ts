import type { KSAOScores } from '../utils/matchingEngine';

export interface WBLOpportunity {
  id: string;
  titleAr: string;
  titleEn: string;
  employerAr: string;
  employerEn: string;
  sectorAr: string;
  sectorEn: string;
  locationAr: string;
  locationEn: string;
  stipend: number; // in EGP
  durationMonths: number;
  descriptionAr: string;
  descriptionEn: string;
  candidateKSAO: KSAOScores;
  isApplied?: boolean;
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
    durationMonths: 6,
    descriptionAr: 'برنامج تدريب عملي ميداني في صيانة ألواح الطاقة الشمسية، ومعايرة محولات العكس ومحطات المراقبة الرقمية.',
    descriptionEn: 'Field-based practical training in solar PV maintenance, inverter calibration, and digital telemetry monitoring.',
    candidateKSAO: { knowledge: 88, practicalSkills: 92, abilities: 84, contextual: 90 },
    isApplied: false,
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
    durationMonths: 4,
    descriptionAr: 'تطبيق عملي على شبكات الري بالتنقيط المؤتمتة، إدارة ملوحة التربة، وحصاد المحاصيل التصديرية.',
    descriptionEn: 'Hands-on instruction in automated drip irrigation grids, soil salinity management, and export crop logistics.',
    candidateKSAO: { knowledge: 75, practicalSkills: 80, abilities: 72, contextual: 78 },
    isApplied: false,
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
    durationMonths: 6,
    descriptionAr: 'دمج تقنيات التشكيل الفخاري النوبي التقليدي مع أفران الحرق الصديقة للبيئة وأنماط التصميم المعاصرة.',
    descriptionEn: 'Combining traditional Nubian wheel-throwing methods with eco-friendly kilns and contemporary product design.',
    candidateKSAO: { knowledge: 68, practicalSkills: 85, abilities: 80, contextual: 88 },
    isApplied: false,
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
    durationMonths: 5,
    descriptionAr: 'إدارة تجربة النزلاء البيئية، الإشراف على الأغذية العضوية المحلية، وقيادة الجولات البيئية والثقافية.',
    descriptionEn: 'Managing guest eco-experiences, local organic farm-to-table coordination, and sustainable cultural excursions.',
    candidateKSAO: { knowledge: 78, practicalSkills: 76, abilities: 86, contextual: 92 },
    isApplied: false,
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
    durationMonths: 6,
    descriptionAr: 'التدريب على أنوال النسيج النوبية والمصرية الأصيلة، تقنيات الصباغة الطبيعية المستدامة ومراقبة الجودة.',
    descriptionEn: 'Skill building on authentic hand-looms, natural zero-chemical dye extraction, and export fabric quality testing.',
    candidateKSAO: { knowledge: 72, practicalSkills: 88, abilities: 74, contextual: 82 },
    isApplied: false,
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
    durationMonths: 4,
    descriptionAr: 'تصوير المنتجات الحرفية، إدارة المتاجر الإلكترونية عبر منصات شوبيفاي، وتنفيذ الحملات الإعلانية الموجهة دولياً.',
    descriptionEn: 'Product photography for heritage goods, managing Shopify craft storefronts, and running targeted global export ad campaigns.',
    candidateKSAO: { knowledge: 90, practicalSkills: 86, abilities: 88, contextual: 80 },
    isApplied: false,
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

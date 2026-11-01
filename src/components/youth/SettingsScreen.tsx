import React from 'react';
import type { Language } from '../Navbar';
import type { YouthAppTheme, YouthUserProfile } from './types';
import {
  Sun,
  Moon,
  Monitor,
  Globe,
  Bell,
  Eye,
  LogOut,
  ShieldCheck,
  User,
  Phone,
  Calendar,
} from 'lucide-react';

interface SettingsScreenProps {
  language: Language;
  onSetLanguage: (lang: Language) => void;
  theme: YouthAppTheme;
  onSetTheme: (theme: YouthAppTheme) => void;
  user: YouthUserProfile | null;
  onSignOut: () => void;
  isDark: boolean;
}

/**
 * Screen 12: Settings & Preferences Screen
 * Implements Section 7 & 8 of MEHNA UI Spec v2:
 * - Account details display (Name, Phone, DOB, Status)
 * - Appearance switch: System / Light / Dark
 * - Language selection: Arabic / English
 * - Push notification preferences
 * - Profile visibility toggles
 * - Explicit Sign Out action
 */
export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  language,
  onSetLanguage,
  theme,
  onSetTheme,
  user,
  onSignOut,
  isDark,
}) => {
  const isAr = language === 'ar';

  return (
    <div
      className="w-full h-full flex flex-col overflow-y-auto p-4 space-y-4 pb-20 selection:bg-[#C4824A] selection:text-white"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text)',
      }}
    >
      {/* Title */}
      <div>
        <h2 className="text-xl font-black" style={{ color: 'var(--theme-primary)' }}>
          {isAr ? 'الإعدادات والحساب' : 'Settings & Preferences'}
        </h2>
        <p className="text-xs text-[var(--theme-text-muted)]">
          {isAr ? 'إدارة المظهر، الإشعارات، والبيانات الشخصية.' : 'Manage appearance, alerts, and account details.'}
        </p>
      </div>

      {/* Account Info Box */}
      <div
        className="p-4 rounded-3xl border space-y-3 shadow-xs"
        style={{
          backgroundColor: 'var(--theme-surface)',
          borderColor: 'var(--theme-border)',
        }}
      >
        <span className="text-[10px] uppercase font-bold text-[var(--theme-text-muted)] block">
          {isAr ? 'بيانات الحساب الموثقة' : 'Verified Account Details'}
        </span>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[var(--theme-text-muted)] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span>{isAr ? 'الاسم:' : 'Name:'}</span>
            </span>
            <span className="font-bold text-[var(--theme-text)]">{user?.name || (isAr ? 'يوسف محمود' : 'Youssef Mahmoud')}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[var(--theme-text-muted)] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span>{isAr ? 'الهاتف:' : 'Phone:'}</span>
            </span>
            <span className="font-bold font-mono text-[var(--theme-text)]" dir="ltr">
              {user?.phone || '+20 101 234 5678'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[var(--theme-text-muted)] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span>{isAr ? 'تاريخ الميلاد:' : 'DOB:'}</span>
            </span>
            <span className="font-bold font-mono text-[var(--theme-text)]">
              {user?.dob || '2006-05-15'}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-[var(--theme-border)]">
            <span className="text-[var(--theme-text-muted)] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--theme-success)]" />
              <span>{isAr ? 'حالة الأهلية:' : 'Status:'}</span>
            </span>
            <span className="font-bold text-[var(--theme-success)]">
              {user?.isUnder18 ? (isAr ? 'متدرب قاصر (تحت الإشراف)' : 'Trainee (Under 18)') : (isAr ? 'مستقل معتمد' : 'Verified Adult')}
            </span>
          </div>
        </div>
      </div>

      {/* Appearance Section (System / Light / Dark) */}
      <div
        className="p-4 rounded-3xl border space-y-3 shadow-xs"
        style={{
          backgroundColor: 'var(--theme-surface)',
          borderColor: 'var(--theme-border)',
        }}
      >
        <span className="text-[10px] uppercase font-bold text-[var(--theme-text-muted)] block">
          {isAr ? 'المظهر ونمط العرض' : 'Appearance'}
        </span>

        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'system', ar: 'تلقائي', en: 'System', icon: Monitor },
            { id: 'light', ar: 'فاتح', en: 'Light', icon: Sun },
            { id: 'dark', ar: 'داكن', en: 'Dark', icon: Moon },
          ].map((mode) => {
            const isSelected = theme === mode.id;
            const Icon = mode.icon;

            return (
              <button
                key={mode.id}
                onClick={() => onSetTheme(mode.id as YouthAppTheme)}
                className="py-3 px-2 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
                style={{
                  backgroundColor: isSelected ? 'var(--theme-primary)' : 'var(--theme-bg)',
                  borderColor: isSelected ? 'var(--theme-primary)' : 'var(--theme-border)',
                  color: isSelected ? 'var(--theme-on-primary)' : 'var(--theme-text)',
                }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-bold">{isAr ? mode.ar : mode.en}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Language Section */}
      <div
        className="p-4 rounded-3xl border space-y-3 shadow-xs"
        style={{
          backgroundColor: 'var(--theme-surface)',
          borderColor: 'var(--theme-border)',
        }}
      >
        <span className="text-[10px] uppercase font-bold text-[var(--theme-text-muted)] block">
          {isAr ? 'لغة التطبيق' : 'Application Language'}
        </span>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onSetLanguage('ar')}
            className="py-2.5 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            style={{
              backgroundColor: language === 'ar' ? 'var(--theme-primary)' : 'var(--theme-bg)',
              borderColor: language === 'ar' ? 'var(--theme-primary)' : 'var(--theme-border)',
              color: language === 'ar' ? 'var(--theme-on-primary)' : 'var(--theme-text)',
            }}
          >
            <Globe className="w-4 h-4" />
            <span>العربية (افتراضي)</span>
          </button>

          <button
            onClick={() => onSetLanguage('en')}
            className="py-2.5 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            style={{
              backgroundColor: language === 'en' ? 'var(--theme-primary)' : 'var(--theme-bg)',
              borderColor: language === 'en' ? 'var(--theme-primary)' : 'var(--theme-border)',
              color: language === 'en' ? 'var(--theme-on-primary)' : 'var(--theme-text)',
            }}
          >
            <Globe className="w-4 h-4" />
            <span>English</span>
          </button>
        </div>
      </div>

      {/* Visibility & Notification Preferences */}
      <div
        className="p-4 rounded-3xl border space-y-3 shadow-xs"
        style={{
          backgroundColor: 'var(--theme-surface)',
          borderColor: 'var(--theme-border)',
        }}
      >
        <span className="text-[10px] uppercase font-bold text-[var(--theme-text-muted)] block">
          {isAr ? 'الخصوصية والإشعارات' : 'Privacy & Alerts'}
        </span>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[var(--theme-accent)]" />
              <div>
                <span className="font-bold block text-[var(--theme-text)]">
                  {isAr ? 'إشعارات الفرص والمكافآت' : 'Stipend & Placement Alerts'}
                </span>
                <span className="text-[10px] text-[var(--theme-text-muted)]">
                  {isAr ? 'تنبيه فوري عند صرف المكافأة أو مطابقة فرصة جديدة' : 'Instant SMS & push notifications'}
                </span>
              </div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-[var(--theme-primary)]" />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[var(--theme-border)]">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[var(--theme-accent)]" />
              <div>
                <span className="font-bold block text-[var(--theme-text)]">
                  {isAr ? 'ظهور الملف لجهات العمل بأسوان' : 'Visible to Verified Employers'}
                </span>
                <span className="text-[10px] text-[var(--theme-text-muted)]">
                  {isAr ? 'إمكانية تواصل الشركات المعتمدة لترشيحك لتدريب' : 'Allow verified partners to view skills'}
                </span>
              </div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-[var(--theme-primary)]" />
          </div>
        </div>
      </div>

      {/* Sign Out Action */}
      <div className="pt-2">
        <button
          onClick={onSignOut}
          className="w-full min-h-[48px] py-3 px-4 rounded-2xl border font-bold text-sm text-red-600 flex items-center justify-center gap-2 hover:bg-red-500/10 transition-colors cursor-pointer"
          style={{
            borderColor: isDark ? 'rgba(239, 68, 68, 0.4)' : 'rgba(239, 68, 68, 0.3)',
          }}
        >
          <LogOut className="w-4 h-4" />
          <span>{isAr ? 'تسجيل الخروج من الحساب' : 'Sign Out of MEHNA'}</span>
        </button>
      </div>
    </div>
  );
};

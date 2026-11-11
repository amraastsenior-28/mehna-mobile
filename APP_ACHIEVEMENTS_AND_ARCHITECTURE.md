# MEHNA Youth Application — Architecture, Achievements & State of the Codebase

> **Project:** MEHNA (مهنة) — Work-Based Learning & Dual VET Platform for Youth in Egypt (Aswan Pilot)  
> **Repository:** `D:\AMR Laptop\Antigravity Projects\MEHNA\demo-website`  
> **Target Platforms:** Mobile App (Android via Capacitor, iOS ready) & Responsive Web  
> **Last Updated:** November 2026  
> **Build Status:** Verified passing (`tsc -b && vite build` — 0 errors, 100% clean compilation)

---

## 1. Executive Summary & Strategic Purpose

The MEHNA Youth App is a high-performance, bilingual (Arabic RTL / English LTR) mobile application engineered to connect Egyptian vocational youth to verified, paid work-based training opportunities in green energy (Benban Solar Park), eco-tourism, sustainable agriculture, and heritage crafts.

The app strictly adheres to the **MEHNA UI Specification v2**, enforcing:
- **Transparent Stipends:** All monthly stipends are presented upfront in prominent numerals; no confidential ranges or hidden terms.
- **Dual VET Minor Protection Policy:** Automated age verification based on Date of Birth; candidates under 18 must complete a formal parental consent verification before submitting applications.
- **Brand Identity Precision:** Exact preservation of the official MEHNA emblem at a 0.73:1 ratio on cream surfaces (`#F4F0E6`), ensuring the dark emerald outer band maintains full contrast against light and dark backdrops.
- **High-End Neo-Banking Aesthetics:** Premium glassmorphism, spring physics animations, and floating navigation inspired by modern fintech applications (such as Mashreq NEO).

---

## 2. Complete Technical Stack

| Layer | Technologies & Libraries |
| :--- | :--- |
| **Framework & Core** | React 18 (Concurrent Mode with `createRoot`), TypeScript 5.6 |
| **Build Tooling** | Vite 8, Rolldown engine, PostCSS, Tailwind CSS v4 |
| **Mobile Runtime** | Capacitor Core & Capacitor Android (`@capacitor/android`, `@capacitor/cli`) |
| **Icons & Media** | Lucide React (feather-style minimalist icons), WebM video loader |
| **Local Persistence** | `youthDB` structured service wrapping local storage / IndexedDB |
| **Design Foundations** | CSS Variables (`--theme-*`), WCAG AA contrast calibrated, full RTL/LTR bidirectional support |

---

## 3. Major Systems & Features Achieved

### A. App Launch & Enforced Sign-In Pipeline (Fixed & Fully Enforced)
Previously, users opening the application could bypass the sign-in screen if a session existed in storage. The app launch lifecycle has now been re-architected into a sequential three-stage pipeline:

1. **Native Video / Poster Splash Screen (`LoadingScreen.tsx`)**:
   - Full-screen fixed overlay (`100dvh`, `#EBE3D3`) preventing letterboxing or browser bar clipping on mobile devices.
   - Edge-to-edge video loader (`mobile_intro.webm`) playing once with graceful poster fallback.
   - Status bar and navigation bar blending seamlessly with the loader surface.
2. **In-App Branded Splash Transition (`YouthPortal.tsx -> authStep: 'splash'`)**:
   - Renders the centered MEHNA emblem at 40% viewport width with decorative geometric arch rings.
   - Animated progress sweep bar over 1.6s, smoothly auto-advancing to the sign-in portal.
3. **Sign-In & Welcome Screen (`WelcomeScreen.tsx -> authStep: 'welcome'`)**:
   - **Enforced Entry Gate:** Every fresh application launch always presents the Sign-In / Welcome Screen before granting access to internal tabs.
   - **Returning User Fast-Track:** If an active session is detected in `youthDB`, the Welcome screen displays a prominent `Continue as [Name]` button. This allows returning users to re-enter instantly without retyping credentials while preserving the welcome gate.
   - **Dual Authentication Modes:**
     - **Option 1: Continue with Google** (instant one-tap authentication).
     - **Option 2: Continue with Phone** (+20 Egyptian format, candidate name, and mandatory Date of Birth picker).
   - **Guest Mode:** Optional browse-only mode with application submission guarded by an authentication prompt.

### B. Neo-Banking Floating Glass Bottom Navigation (`FloatingBottomNav.tsx`)
A custom navigation dock inspired by modern fintech interfaces:

1. **Floating Dock Container:**
   - Detached from the bottom screen edge (`rounded-[28px]`, `max-w-[420px]`).
   - Integrated safe-area insets (`env(safe-area-inset-bottom)`).
   - Multi-layered physical drop shadow giving elevated depth above scrolling list cards.
2. **Glassmorphism Architecture:**
   - Translucent frosted background (`rgba(255, 253, 248, 0.78)` in light mode, `rgba(17, 43, 37, 0.62)` in dark mode).
   - `backdrop-filter: blur(12px) saturate(150%)` diffusing content scrolling underneath.
   - Thin 1px inner highlight border (`rgba(255, 255, 255, 0.55)` in light mode) simulating light refraction on real glass edges.
3. **Sliding Capsule Indicator with Spring Physics:**
   - Instead of static tab jumping or cross-fades, a pill-shaped indicator glides horizontally behind the active tab.
   - Real-time DOM bounding rect measurement dynamically adapts to any tab width or language switch (Arabic RTL / English LTR).
   - Spring curve physics: `cubic-bezier(0.34, 1.56, 0.64, 1)` providing a responsive glide with a subtle organic settle.
4. **Simulated Motion Blur Effect:**
   - During horizontal transitions, the capsule applies a dynamic `scaleX(1.08)` horizontal stretch and slight opacity dip (`opacity: 0.85`), returning smoothly to normal geometry upon arrival.
5. **Accessibility & Graceful Degradation:**
   - Full ARIA compliance (`role="tab"`, `aria-selected`, descriptive bilingual labels).
   - Touch targets exceed the 48px ergonomic minimum (`min-height: 54px`, `min-width: 64px`).
   - Automatic fallback to solid opaque background when `prefers-reduced-transparency` is active or if `backdrop-filter` is unsupported.
   - Instant snap transitions when `prefers-reduced-motion` is enabled.

### C. Offline-First Structured Database Service (`src/services/database.ts`)
A dedicated service layer (`youthDB`) that persists application state:
- **Session Store:** Tracks active user credentials, profile completion status, and authentication timestamp.
- **User Directory:** Stores user details including name, phone, date of birth, minor status, assigned technical track, and verified skills.
- **Application Tracking:** Records each submitted work-based learning application, linking candidate IDs to opportunity IDs with timestamp and review status (`received`, `reviewing`, `contract_setup`).
- **Parental Consent Registry:** Stores guardian phone numbers, relationship type, and verification timestamps for trainees under 18 years of age.
- **Preferences:** Persists light/dark theme preference and Arabic/English language selection across reloads.

### D. Opportunity Discovery & Real-Card Shimmer Skeleton (`HomeScreen.tsx` & `ShimmerSkeleton.tsx`)
- **Category Filter Chips:** Seamless switching between Clean Energy (طاقة متجددة), Eco-Tourism (سياحة بيئية), Heritage Crafts (حرف تراثية), and Smart Agriculture (زراعة مستدامة).
- **Shimmer Skeletons:** Animated placeholder cards that match the layout of real opportunity cards (sector badge, title lines, location, stipend numerals, action button).
- **Staggered Item Entrance:** Staggered entrance animation for opportunity cards with a 40ms delay per item.
- **Zero Dark Patterns:** Zero artificial countdown timers, zero urgent red banners, and zero purple/blue gradients, maintaining an earthy Egyptian palette (deep green `#0E3B33`, desert cream `#F4F0E6`, copper accent `#C4824A`).

### E. Minor Protection & Parental Consent Flow (`ParentalConsentSheet.tsx`)
- **Under-18 Guard:** Candidates under 18 applying for high-safety or dual-system roles are automatically flagged via `checkIsUnder18(dob)`.
- **Consent Sheet:** Opens a slide-up verification sheet requesting guardian name, mobile phone (+20), and kinship relation.
- **Persistent Verification:** Once approved, parental consent is recorded in `youthDB` and attached to all subsequent applications.

### F. Stipends, Profile & Settings Management
- **Stipends Screen (`StipendsScreen.tsx`):** Displays fixed monthly compensation, bank transfer breakdown, and upcoming payout dates.
- **Profile Screen (`ProfileScreen.tsx`):** Displays candidate skills, completed onboarding track, and minor verification status.
- **Settings Screen (`SettingsScreen.tsx`):** Bilingual language toggle (العربية / English), appearance mode selector (Light / Dark / System), and session logout.

---

## 4. Key File Map for Claude Code

When working with Claude Code on the mobile app, refer to these primary source files:

```
MEHNA/
├── demo-website/
│   ├── src/
│   │   ├── components/
│   │   │   ├── YouthPortal.tsx           # Central mobile app container & state machine
│   │   │   ├── LoadingScreen.tsx         # Fullscreen video splash overlay
│   │   │   └── youth/
│   │   │       ├── FloatingBottomNav.tsx # Neo-banking floating glass bottom navigation
│   │   │       ├── WelcomeScreen.tsx     # Sign-in entry gate (Google, Phone, Returning user)
│   │   │       ├── PhoneEntryScreen.tsx  # Phone & DOB minor verification screen
│   │   │       ├── OtpVerificationScreen.tsx # 4-digit SMS OTP screen
│   │   │       ├── ProfileSetupScreen.tsx# 3-step vocational track onboarding
│   │   │       ├── HomeScreen.tsx        # Opportunity discovery feed with filters
│   │   │       ├── ShimmerSkeleton.tsx   # Card-matching animated loading skeleton
│   │   │       ├── OpportunityDetailModal.tsx # Full opportunity specs & KSAO match
│   │   │       ├── ApplyConfirmationSheet.tsx # Glass confirmation bottom sheet
│   │   │       ├── ParentalConsentSheet.tsx   # Under-18 guardian consent sheet
│   │   │       ├── ApplicationSentModal.tsx   # 3-step timeline success modal
│   │   │       ├── StipendsScreen.tsx    # Monthly verified stipend tracking
│   │   │       ├── ProfileScreen.tsx     # Candidate profile & credentials
│   │   │       ├── SettingsScreen.tsx    # Language, theme, and sign-out controls
│   │   │       └── types.ts              # TypeScript interfaces & age calculation logic
│   │   ├── services/
│   │   │   └── database.ts               # Structured local storage & session persistence
│   │   ├── index.css                     # Design tokens, keyframe animations, glass styles
│   │   ├── App.tsx                       # Top-level portal router & standalone mobile isolator
│   │   └── main.tsx                      # React root entry point
│   ├── android/                          # Native Android Capacitor shell
│   ├── capacitor.config.ts               # Capacitor mobile configuration
│   └── package.json                      # Build scripts and dependencies
└── project_assets/
    ├── MEHNA_UI_Spec.md                  # Authoritative UI & UX specification
    └── logo/                             # Master brand marks and emblems (1024, 512, 192)
```

---

## 5. Development & Build Commands

Execute these commands from `D:\AMR Laptop\Antigravity Projects\MEHNA\demo-website`:

```bash
# 1. Type-check and build web bundle
npm run build

# 2. Start local Vite development server
npm run dev

# 3. Sync web assets directly into Android Capacitor project
npx cap sync android

# 4. Open project in Android Studio for native APK generation / device testing
npx cap open android
```

---

## 6. Verification Checklist

- [x] Compilation: TypeScript passes with 0 errors (`tsc -b`).
- [x] Build: Vite creates production bundle in `dist/` cleanly.
- [x] Capacitor: `npx cap sync android` copies web assets to Android platform.
- [x] Sign-In Flow: App displays Loading Screen -> Splash -> Welcome/Sign-in Screen first.
- [x] Returning User UX: Saved database session enables instant "Continue as [Name]" without skipping the gate.
- [x] Navigation: Floating dock with glassmorphism, sliding indicator, and spring physics is live.
- [x] Accessibility: All touch targets >= 48px, WCAG AA color contrast verified, reduced motion/transparency respected.
- [x] Minor Protection: Date of Birth check correctly triggers Parental Consent flow for candidates under 18.

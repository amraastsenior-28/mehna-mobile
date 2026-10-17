# MEHNA (مهنة) — Interactive Demo Website (Phase 0)

> **A Business Information Systems Approach to Closing Egypt's Structural Skills Gap through a Three-Sided Work-Based Learning Marketplace**  
> *Graduation Project — College of Management & Technology, Business Information Systems (BIS) Department, South Valley Campus (Aswan), AASTMT.*

---

## 1. Project Overview & Strategic Foundation

This project delivers a high-fidelity, interactive prototype of **MEHNA (مهنة)**, tailored to the economic landscape of **Aswan Governorate, Upper Egypt**. 

The core thesis of MEHNA is that Egypt's 79.6% graduate unemployment rate is not an aggregate job scarcity, but a **structural skills gap**. Formal education remains disconnected from private-sector technical needs, and youth face informal, unverified transitions into the workforce. MEHNA adapts the **German Dual VET System** (combining enterprise practical training, school instruction, and tripartite regulatory oversight) into an accessible digital marketplace.

---

## 2. Architecture & File Organization

The application is structured into modular layers to facilitate easy future migration into Phase 2 backend services:

```text
d:\AMR Laptop\Antigravity Projects\MEHNA\demo-website\
├── public/
│   ├── mehna-logo.jpg                # Brand logo from project assets
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── BrandLogo.tsx             # Official brand identity component
│   │   ├── Navbar.tsx                # Bilingual header with portal switcher & RTL/LTR toggle
│   │   ├── LandingSection.tsx        # Hero banner, macroeconomic metrics, and portal cards
│   │   ├── YouthPortal.tsx           # Mobile-first youth interface, KSAO radar, 6 Aswan jobs & stipend ledger
│   │   ├── EmployerConsole.tsx       # Vacancy manager, applicant ranker, and live KSAO weight sliders
│   │   ├── B2GDashboard.tsx          # Municipal analytics, Law 151/2020 compliance audit, and charts
│   │   └── Footer.tsx                # Compliance notice and academic disclaimers
│   ├── data/
│   │   └── mockData.ts               # Central simulated database (Aswan sector vacancies, applicants, stipends)
│   ├── utils/
│   │   └── matchingEngine.ts         # Gary Dessler Person-Job Fit algorithmic scoring engine
│   ├── App.tsx                       # Single-page state coordinator
│   ├── index.css                     # Tailwind CSS v4 design tokens and brand colors
│   └── main.tsx                      # React root entry point
├── package.json
└── vite.config.ts
```

---

## 3. The Core Matching Engine

The Person-Job Fit algorithm resides in:
**[`src/utils/matchingEngine.ts`](src/utils/matchingEngine.ts)**

Grounded in **Gary Dessler’s Human Resource Management Selection Theory & Job Analysis**, it programmatically evaluates candidates across Knowledge, Skills, Abilities, and Other Contextual characteristics (KSAOs):

$$\text{Skill Match Score} = w_1 \cdot \text{Knowledge} + w_2 \cdot \text{Practical Skills} + w_3 \cdot \text{Abilities} + w_4 \cdot \text{Contextual}$$

*   **Default Weights Configuration:**
    *   $w_1$ (Knowledge): `0.30`
    *   $w_2$ (Practical Skills): `0.35`
    *   $w_3$ (Abilities): `0.20`
    *   $w_4$ (Contextual / Geographic Proximity): `0.15`

*   **Live Interactive Adjustment:** On the **Employer Console**, HR managers can drag real-time sliders to modify these weights. When any slider moves, the remaining weights dynamically normalize to sum to 1.0, and every candidate's match score across all vacancies recalculates instantaneously.
*   **Phase 2 Upgrade Path:** This isolated function can be substituted with an asynchronous API client calling the Python or Node.js microservice without modifying the UI components.

---

## 4. Key Interactive Portals

1.  **Overview / Landing Page:**
    *   Features the core motto *"From training to employment"* (*من التدريب إلى التوظيف*).
    *   Highlights the structural paradox (79.6% graduate unemployment, 33.8% Upper Egypt female unemployment).
    *   Direct entry cards to the three portals.
2.  **Youth Portal (`YouthPortal.tsx`):**
    *   **Mobile-First Simulator:** Includes a toggle to switch between a realistic smartphone frame and a full-width container.
    *   **KSAO Radar Chart:** Visualizes Youssef's competency footprint using Recharts.
    *   **6 Aswan Sector Placements:** Covers Benban Solar Park, Toshka & West Aswan Smart Agriculture, Gharb Soheil Nubian Pottery, Heissa Island Eco-Tourism, New Aswan Heritage Textiles, and Handicraft E-Commerce.
    *   **Interactive Apply Button:** Tap "Apply Now" (*تقديم فوري*) to immediately toggle state to "Applied" (*تم التقديم ✓*).
    *   **Digital Stipend Tracker:** Shows cumulative verified earnings (6,400 EGP) with monthly audit logs and transaction references.
3.  **Employer Console (`EmployerConsole.tsx`):**
    *   Three pre-loaded vacancies with applicant tallies.
    *   Ranked candidate list updating in real time as matching weights adjust.
    *   Detailed visual breakdown of K, S, A, and O bars for each applicant.
    *   Modal form allowing employers to post a new vacancy and append it to the live in-memory table.
4.  **B2G Regulatory Dashboard (`B2GDashboard.tsx`):**
    *   Macro KPIs: 1,420 total placements, 865 active contracts, 43.8% female participation rate, and 100% parental consent logging.
    *   Sector distribution bar chart and 8-month placement growth area chart.
    *   Tripartite German Dual VET governance audit breakdown (Chambers, Social Partners, Government Ministries).

---

## 5. How to Run the Demo Locally

1.  Open PowerShell or Command Prompt in the project folder:
    ```powershell
    cd "d:\AMR Laptop\Antigravity Projects\MEHNA\demo-website"
    ```
2.  Start the Vite local development server:
    ```powershell
    npm run dev
    ```
3.  Open your browser at the displayed local URL (typically `http://localhost:5173/`).
4.  Use the **Language Toggle** in the top navigation bar to seamlessly switch between **Arabic (Native RTL)** and **English (LTR)**.

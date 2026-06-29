# VedaAI – Complete Design Specification
> Extracted from `VedaAI_-_Hiring_Assignment.fig`  
> Use this document as the single source of truth to replicate all screens pixel-perfectly.

---

## 1. OVERVIEW

**Product:** VedaAI — an AI-powered teacher's assignment creation platform  
**Screens:** Desktop (1440px wide) + Mobile (393px wide, iOS Chrome shell)  
**Design language:** Clean, minimal, dark-text-on-white with a single black CTA

---

## 2. COLOR PALETTE

| Token Name | Hex | Usage |
|---|---|---|
| `--color-primary` | `#303030` | Primary text, headings, active nav items, main content |
| `--color-black` | `#000000` | Secondary text (dates, metadata), icon fills |
| `--color-white` | `#FFFFFF` | Backgrounds, button text on dark buttons |
| `--color-muted` | `#5E5E5E` | Subtitle text, inactive nav labels, captions |
| `--color-placeholder` | `#A9A9A9` | Placeholder text, breadcrumb inactive, filter labels |
| `--color-danger` | `#C53535` | Destructive actions (e.g. "Delete" button text) |
| `--color-surface` | `#F0F0F0` | Light surface / AI response header background tint |

**Background:** Pure `#FFFFFF` white for all screen backgrounds.  
**No gradients** anywhere in the primary UI. The decorative ellipse blob is a subtle shape element only.

---

## 3. TYPOGRAPHY

### Font Families
```
Primary Display:  "Bricolage Grotesque"  (Google Fonts)
Body / Content:   "Inter"               (Google Fonts)
Mobile Nav / Alt: "Manrope"             (Google Fonts)
System (iOS UI):  "SF Pro Text"         (system, fallback: -apple-system)
```

Import in HTML/CSS:
```css
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600&display=swap');
```

### Type Scale

| Role | Font | Weight | Size | Color |
|---|---|---|---|---|
| Logo / Brand | Bricolage Grotesque | Bold (700) | 28px | `#303030` |
| Page Title (large) | Manrope | SemiBold (600) | 40px | `#000000` |
| Section Header | Bricolage Grotesque | Bold (700) | 20px | `#303030` |
| Card Title | Bricolage Grotesque | ExtraBold (800) | 24px | `#303030` |
| Card Title (mobile) | Bricolage Grotesque | Bold (700) | 18px | `#303030` |
| Sub-header | Bricolage Grotesque | Bold (700) | 16px | `#303030` |
| Body (default) | Bricolage Grotesque | Regular (400) | 16px | `#303030` or `#000000` |
| Body Medium | Bricolage Grotesque | Medium (500) | 16px | `#303030` |
| Body Small | Bricolage Grotesque | Regular (400) | 14px | `#A9A9A9` or `#5E5E5E` |
| Label / Badge | Bricolage Grotesque | SemiBold (600) | 14px | `#FFFFFF` |
| Nav Item (active) | Bricolage Grotesque | Medium (500) | 16px | `#303030` |
| Nav Item (inactive) | Bricolage Grotesque | Regular (400) | 16px | `#5E5E5E` |
| Button text | Bricolage Grotesque | Medium (500) | 16px | `#FFFFFF` / `#303030` |
| "Create Assignment" CTA | Inter | Medium (500) | 16px | `#FFFFFF` |
| Document content | Inter | SemiBold (600) | 18px (desktop) / 14px (mobile) | `#303030` |
| Document body | Inter | Regular (400) | 16px | `#303030` |
| Section label (doc) | Inter | SemiBold (600) | 24px (desktop) / 16px (mobile) | `#303030` |
| Breadcrumb | Bricolage Grotesque | SemiBold (600) | 16px | `#A9A9A9` |
| Mobile tab label | Bricolage Grotesque | SemiBold (600) | 12px | `#FFFFFF` |

---

## 4. SPACING & LAYOUT

### Desktop Layout (1440px)
```
Total canvas width:   1440px
Left sidebar width:   304px  (includes 24px padding each side = 256px inner)
Main content width:   1100px (1440 - 304 - 36px gap ≈ 1100px)
Content padding-x:    ~20px each side within main area
Top header height:    56px
```

### Sidebar Layout
```
Sidebar total:        304px wide × full height
Inner content:        256px wide (24px padding each side)
Logo area (VedaAI):   top, 28px font
Nav list block:       251px wide × ~418px tall
  Nav item height:    ~52px each
  Nav gap:            ~8px
School info block:    256px × 126px (bottom of sidebar)
  School name:        16px Bold
  City:               14px Regular, #5E5E5E
```

### Header Bar
```
Height:         56px
Width:          1100px (main content area)
Breadcrumb:     left-aligned, 16px SemiBold #A9A9A9
User profile:   right-aligned, 157px × 44px container
  Name text:    16px SemiBold #303030
  Avatar:       36×36px circle
  Bell icon:    40×40px
```

### Main Content Area
```
Padding-top from header:  ~32px
Content max-width:        1060–1100px
```

---

## 5. COMPONENT SPECS

### 5.1 Sidebar Navigation

```
Background: #FFFFFF
Right border: 1px solid #F0F0F0 (or box-shadow)
Box shadow: 0 32px 48px rgba(0,0,0,0.20), 0 16px 48px rgba(0,0,0,0.12)

Logo "VedaAI":
  font: Bricolage Grotesque Bold 28px #303030
  margin-bottom: ~32px

Nav Items (inactive):
  font: Bricolage Grotesque Regular 16px #5E5E5E
  padding: 14px 16px
  border-radius: 8px

Nav Items (active / selected):
  font: Bricolage Grotesque Medium 16px #303030
  background: transparent (no background highlight shown)
  
"Create Assignment" Special CTA in Nav:
  font: Inter Medium 16px #FFFFFF
  background: #303030 (dark pill button)
  border-radius: 100px (fully rounded)
  padding: ~13px 24px
  width: ~251px

Notification Badge (on nav items):
  background: #303030
  color: #FFFFFF
  font: Bricolage Grotesque SemiBold 14px
  border-radius: 100px
  min-width: 24px, height: 24px
  Example values: "32", "10"

Settings (bottom of nav):
  font: Bricolage Grotesque Regular 16px #5E5E5E
```

### 5.2 Buttons

**Primary Button — Dark (CTA)**
```
background:   #303030
color:        #FFFFFF
font:         Bricolage Grotesque Medium 16px
border-radius: 100px
padding:      ~13px 24px
height:       46px
min-width:    208px (desktop) / 277px (mobile)
```

**Secondary Button — Outline / Ghost**
```
background:   transparent
color:        #303030
font:         Bricolage Grotesque Medium 16px
border:       1px solid #303030
border-radius: 100px
padding:      ~13px 24px
height:       46px
```

**"Next" / "Previous" Navigation Buttons**
```
Next:     background #303030, color #FFFFFF, Bricolage Medium 16px
Previous: background transparent, color #303030, border 1px solid #303030
Both:     border-radius 100px, height ~46px
Container: 253px wide (mobile) / 810px wide (desktop), flex row, gap ~8px
```

**Danger Text Button (Delete)**
```
background: transparent
color: #C53535
font: Bricolage Grotesque Medium 14px
no border
```

**Text Link Action (e.g. "View Assignment")**
```
color: #303030
font: Bricolage Grotesque Medium 14px
no border, no background
```

### 5.3 Assignment Card

```
Container:
  width:   1100px (desktop) / ~373px (mobile)
  height:  ~162px (desktop) / ~120px (mobile)
  background: #FFFFFF
  border: 1px solid #F0F0F0
  border-radius: 12px
  padding: 16px 20px
  gap between cards: ~16px

Card content layout (desktop):
  Title: Bricolage Grotesque ExtraBold 24px #303030
  Assigned on / Due: Bricolage Grotesque Regular 16px #000000
  Contextual actions (View / Delete): bottom-right, small text buttons
```

### 5.4 Search Bar + Filter Row

```
Container height: 64px
Background: #FFFFFF
Border: 1px solid #A9A9A9 (approximately)
Border-radius: 8px
Padding: 12px 16px

"Search Assignment" placeholder:
  font: Bricolage Grotesque Regular 14px #A9A9A9

"Filter By" label:
  font: Bricolage Grotesque Regular 14px #A9A9A9
  position: right side of bar
```

### 5.5 Section Header (within main content)

```
Title (e.g. "Assignment Details"):
  font: Bricolage Grotesque Bold 20px #303030

Subtitle:
  font: Bricolage Grotesque Regular 14px #5E5E5E
```

### 5.6 Form Fields

**File Upload Area**
```
Label:       "Upload images of your preferred document/image"
             Bricolage Grotesque Medium 16px #303030
Inner label: "Choose a file or drag & drop it here"
             Bricolage Grotesque Medium 16px #303030
Sub-label:   "JPEG, PNG, upto 10MB"
             Bricolage Grotesque Regular 14px #A9A9A9
Style:       dashed border, border-radius 8–12px, centered text
```

**Date Input ("Due Date")**
```
Label:       "Due Date"   Bricolage Grotesque Bold 16px #303030
Placeholder: "DD-MM-YYYY" Bricolage Grotesque Medium 16px #A9A9A9
```

**Question Type Table**
```
Header "No. of Questions": Bricolage Grotesque Medium 16px #303030
Header "Marks":            Bricolage Grotesque Medium 16px #303030
Row labels (question types): Bricolage Grotesque Medium 16px #303030
  Examples: "Multiple Choice Questions", "Short Questions",
            "Diagram/Graph-Based Questions", "Numerical Problems"
Values: Bricolage Grotesque Medium 16px #303030
"Add Question Type" link: Bricolage Grotesque Bold 14px #303030

Summary row:
  "Total Marks : 60"      Bricolage Grotesque Medium 16px #303030
  "Total Questions : 25"  Bricolage Grotesque Medium 16px #303030
```

### 5.7 AI Response / Output Area

**Response Banner (top of output)**
```
background:    #303030 (dark)
text color:    #FFFFFF
font:          Bricolage Grotesque Bold 20px (desktop) / 14px (mobile)
padding:       16px 20px
border-radius: 12px 12px 0 0 (top rounded)
Content:       "Certainly, Lakshya! Here are customized Question Papers…"
```

**Document Paper Area**
```
background:    #FFFFFF
border:        1px solid #F0F0F0
padding:       32px 40px
font:          Inter SemiBold 18px (headers), Inter Regular 16px (body)
color:         #303030

Document header fields (Name, Roll Number, Class, Section):
  Inter SemiBold 18px #303030 (desktop) / 14px (mobile)

Section labels (e.g. "Section A"):
  Inter SemiBold 24px #303030 (desktop) / 16px (mobile)

Section instruction text:
  Inter SemiBold 18px #303030 (desktop) / 14px (mobile)

Question text:
  Inter Regular 16px #303030 (desktop & mobile)

"[Easy]" difficulty tag: part of question text, same font
```

**Download Button**
```
text:   "Download as PDF"
font:   Bricolage Grotesque Medium 16px #303030
style:  outlined/secondary button, aligned top-right of output area
```

### 5.8 Step Indicator / Progress (Create Assignment Flow)

```
Top of multi-step form:
  Step 1: "Create Assignment" — Bricolage Grotesque Bold 20px #303030
  Step subtitle: "Set up a new assignment for your students"
                 Bricolage Grotesque Regular 14px #5E5E5E

  Step 2: "Assignment Details" — Bricolage Grotesque Bold 20px #303030
  Step subtitle: "Basic information about your assignment"
                 Bricolage Grotesque Regular 14px #5E5E5E
```

### 5.9 Additional Information Section

```
Section heading: "Additional Information (For better output)"
  font: Bricolage Grotesque Bold 16px #303030

"e.g Generate a question paper for 3 hour exam duration…"
  font: Bricolage Grotesque Medium 14px #303030
  style: textarea placeholder text
```

---

## 6. SHADOWS

| Use case | CSS box-shadow |
|---|---|
| Sidebar / Cards elevation | `0 32px 48px rgba(0,0,0,0.20), 0 16px 48px rgba(0,0,0,0.12)` |
| Mic / floating button | `0 22px 33px rgba(0,0,0,0.20), 0 11px 33px rgba(0,0,0,0.12)` |
| User profile dropdown | `0 32px 48px rgba(0,0,0,0.20), 0 16px 48px rgba(0,0,0,0.12)` |
| Dropdowns / modal | `0 32px 48px rgba(0,0,0,0.05), 0 16px 48px rgba(0,0,0,0.20)` |
| Inner glow (white) | `inset 0 0 12.6px rgba(255,255,255,0.10)` |

---

## 7. SCREENS

### Screen A: "0 State" — Assignments (Empty State)
**Size:** 1440 × 780px

```
Layout:
- Left: Sidebar (304px)
- Top: Header bar (56px)
- Center: Empty state container (486 × 678px, centered in main area)

Empty state:
  Heading: "No assignments yet"
    Bricolage Grotesque Bold 20px #303030
  Body: "Create your first assignment to start collecting answers"
    Bricolage Grotesque Regular 16px #5E5E5E
  CTA button: "Create Your First Assignment"
    Dark button (see 5.2), centered below text
```

### Screen B: "Filled State" — Assignments List
**Size:** 1440 × 843px

```
Layout:
- Left: Sidebar (304px), "Assignments" nav item active
- Top: Header bar, breadcrumb shows "Assignment"
- Main area (1100px):
  - Top bar: Search input + Filter By (full width, 64px tall)
  - Cards list: stacked assignment cards (162px each, gap 16px)
    Each card shows:
      - Title: "Quiz on Electricity" (ExtraBold 24px)
      - "Assigned on : 20-06-2025" (Regular 16px #000000)
      - "Due : 21-06-2025" (Regular 16px #000000)
      - Actions row: "View Assignment" | "Delete" (right-aligned)
- Bottom bar (73px):
  - Full-width container with "Create Assignment" dark button (208×46px, right-aligned)
```

### Screen C: "Create Assignment" — Upload Material / Selector
**Size:** 1440 × 1340px (scrollable)

```
Multi-step form, Step 2 of flow

Top section header:
  "Create Assignment" (Bold 20px)
  "Set up a new assignment for your students" (Regular 14px #5E5E5E)

Step header:
  "Assignment Details" (Bold 20px)
  "Basic information about your assignment" (Regular 14px #5E5E5E)

Form content (810px wide, centered in main area):
  1. File upload zone (dashed border)
     Label: "Upload images of your preferred document/image"
  2. Due Date field
  3. Question Type table (marks + count per type)
     Row 1: Multiple Choice Questions — 5 questions — 5 marks
     Row 2: Short Questions         — 5 questions — 5 marks
     Row 3: Diagram/Graph Based     — 3 questions — 2 marks
     Row 4: Numerical Problems      — 4 questions — 1 mark
     "Add Question Type" link
  4. Totals: "Total Marks : 60" | "Total Questions : 25"
  5. Additional Information textarea
     Placeholder: "e.g Generate a question paper for 3 hour exam duration…"

Bottom navigation:
  "Previous" (outline) + "Next" (dark) — right-aligned, 810px row
```

### Screen D: "Assignment Output"
**Size:** 1440 × 1715px (scrollable)

```
Sidebar: "AI Teacher's Toolkit" nav item active

Main area (1060px wide):
  Top banner (dark #303030):
    "Certainly, Lakshya! Here are customized Question Papers…"
    + "Download as PDF" button (right-aligned, outline style)

  Document paper (white):
    Name: ______________________
    Roll Number: ________________
    Class: 5th  Section: __________
    "All questions are compulsory unless stated otherwise."
    
    Section A
    Short Answer Questions
    "Attempt all questions. Each…"
    
    [Easy] Define electroplating. Explain its purpose.
    … (more questions)

Breadcrumb: "Create New" (SemiBold 16px #A9A9A9)
```

### Screen E: Mobile — Empty State (393 × 857px)
```
iOS Chrome shell (status bar + address bar, 105px total)
Bottom nav bar: Home | Assignments (active) | Library | AI Toolkit
  Labels: Bricolage Grotesque SemiBold 12px #FFFFFF

Main content (373px wide):
  Same empty state card as desktop, adapted:
  "No assignments yet" (Bold 20px #303030)
  "Create your first assignment to start collecting answers" (Regular 16px #5E5E5E)
  "Create Your First Assignment" dark button (277×46px)
```

### Screen F: Mobile — Create Assignment Form (393 × 1397px)
```
iOS Chrome shell
Top form header:
  "Create Assignment" Bold 16px #303030

Form fields identical to desktop (Section C) but:
  Container: 349px wide
  Font sizes same except document content scales to 14px

Bottom bar:
  Mobile tab bar: Home | My Groups (active) | Library | AI Toolkit
  Navigation: "Previous" + "Next" buttons (253px total container)
```

### Screen G: Mobile — Assignment List (393 × 1125px)
```
iOS Chrome shell
Header: "Assignments" Bold 16px #303030

Cards list (373px wide):
  Each card:
    "Quiz on Electricity" Bold 18px #303030
    "Assigned on : 20-06-2025" Regular 16px #000000
    "Due : 21-06-2025" Regular 16px #000000
    (5 cards visible, scrollable)

Bottom: Mobile nav bar (same as Screen E)
```

### Screen H: Mobile — Assignment Output (393 × 2821px)
```
iOS Chrome shell
AI banner: Bricolage Grotesque Bold 14px #F0F0F0 on dark bg

Document:
  Same structure as desktop, with smaller sizes:
    Section label: Inter SemiBold 16px
    Headers/fields: Inter SemiBold 14px
    Questions: Inter Regular 16px

Bottom: iOS Safari tab bar chrome
```

---

## 8. DECORATIVE ELEMENTS

**Large Blurred Ellipse (background decoration)**
```
Shape:     Ellipse / oval
Size:      ~1113 × 428px (desktop)
Position:  Top-right of main content area, partially off-screen
Fill:      Very light, near-transparent (appears as a soft blob)
Opacity:   Low (decorative only, subtle background texture)
```

**Note Banner**
```
"Created Assignments will appear here"
font: Manrope SemiBold 40px #000000
Background: rectangle (appears as a note/callout box)
Size: 727 × 243px
```

---

## 9. MOBILE BOTTOM NAVIGATION

```
Container height:   ~157px total (includes home indicator area)
Tab bar height:     ~72px
Background:         #303030 (dark)
Tab items: Home | Assignments | Library | AI Toolkit
Label font: Bricolage Grotesque SemiBold 12px #FFFFFF
Icon + label layout: icon above label, centered
Active item: visually highlighted (same font, possibly icon change)
Separator line: thin horizontal line above tab bar
```

---

## 10. CSS VARIABLES (READY TO PASTE)

```css
:root {
  /* Colors */
  --color-primary:      #303030;
  --color-black:        #000000;
  --color-white:        #FFFFFF;
  --color-muted:        #5E5E5E;
  --color-placeholder:  #A9A9A9;
  --color-danger:       #C53535;
  --color-surface:      #F0F0F0;
  --color-bg:           #FFFFFF;

  /* Typography */
  --font-display:       'Bricolage Grotesque', sans-serif;
  --font-body:          'Inter', sans-serif;
  --font-alt:           'Manrope', sans-serif;

  /* Font sizes */
  --text-xs:   12px;
  --text-sm:   14px;
  --text-base: 16px;
  --text-lg:   18px;
  --text-xl:   20px;
  --text-2xl:  24px;
  --text-3xl:  28px;
  --text-4xl:  32px;
  --text-5xl:  40px;

  /* Layout */
  --sidebar-width:      304px;
  --sidebar-inner:      256px;
  --header-height:      56px;
  --content-width:      1100px;
  --canvas-width:       1440px;
  --mobile-width:       393px;
  --mobile-content:     373px;

  /* Spacing */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;

  /* Border radius */
  --radius-sm:   6px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-card:    0 32px 48px rgba(0,0,0,0.20), 0 16px 48px rgba(0,0,0,0.12);
  --shadow-sm:      0 12px 26px rgba(0,0,0,0.10), 0 9px 17px rgba(0,0,0,0.15);
  --shadow-dropdown:0 32px 48px rgba(0,0,0,0.05), 0 16px 48px rgba(0,0,0,0.20);
}
```

---

## 11. COMPONENT PSEUDO-CODE (for agentic IDE)

### Sidebar Component
```
<Sidebar>
  <Logo>VedaAI</Logo>  {/* BricolageGrotesque Bold 28px #303030 */}
  
  <NavList>
    <NavItem active={false}>Create Assignment</NavItem>  {/* Inter Medium 16px, dark pill button */}
    <NavItem active={true} badge={null}>Assignments</NavItem>
    <NavItem active={false} badge="10">AI Teacher's Toolkit</NavItem>
    <NavItem active={false} badge={null}>My Library</NavItem>
    <NavItem active={false} badge="32">Review</NavItem>
    <NavItem active={false}>Analytics</NavItem>
  </NavList>
  
  <SchoolInfo>
    <SchoolName>Delhi Public School</SchoolName>  {/* Bold 16px #303030 */}
    <SchoolCity>Bokaro Steel City</SchoolCity>    {/* Regular 14px #5E5E5E */}
  </SchoolInfo>
  
  <NavItem>Settings</NavItem>  {/* Regular 16px #5E5E5E */}
</Sidebar>
```

### Assignment Card
```
<AssignmentCard>
  <CardTitle>Quiz on Electricity</CardTitle>         {/* ExtraBold 24px */}
  <CardMeta>Assigned on : 20-06-2025</CardMeta>     {/* Regular 16px #000000 */}
  <CardMeta>Due : 21-06-2025</CardMeta>             {/* Regular 16px #000000 */}
  <CardActions>
    <TextButton>View Assignment</TextButton>          {/* Medium 14px #303030 */}
    <TextButton danger>Delete</TextButton>            {/* Medium 14px #C53535 */}
  </CardActions>
</AssignmentCard>
```

---

## 12. NOTES FOR IMPLEMENTATION

1. **Font loading**: Use Google Fonts for Bricolage Grotesque, Inter, Manrope. All three must be loaded; Bricolage Grotesque is the dominant font throughout 90% of UI text.

2. **Strictly monochrome palette**: The design uses only black/white/grays. There are zero brand accent colors (no blue, green, purple, etc.). The only "accent" is the dark `#303030` used for CTAs.

3. **No border-radius on rectangles was detected** in the Sketch export — the `cornerRadius` fields were all 0. This means all cards/containers likely use sharp or very slightly rounded corners. Use `border-radius: 8px` for cards and `border-radius: 12px` for the main content containers as standard.

4. **Buttons are always fully rounded** (`border-radius: 9999px`) — pill shape.

5. **Icon library**: Icons were not extractable from the binary. Use Lucide Icons or Heroicons as they are closest to the minimal style in the design.

6. **Sidebar shadow** is important — it creates the layered appearance: `box-shadow: 0 32px 48px rgba(0,0,0,0.20), 0 16px 48px rgba(0,0,0,0.12);`

7. **Mobile screens** use iOS Chrome shell (status bar 44px + address bar 61px = 105px total at top, home indicator 34px at bottom).

8. **Line height**: Not explicitly set in most text elements. Use `line-height: 1.5` as default for body text, `line-height: 1.2` for headings.

9. **Letter spacing**: Not detected. Use default (0) or very slight `letter-spacing: -0.01em` for headings.

10. **Page background**: Pure white `#FFFFFF` — no off-white or gray background on any screen.

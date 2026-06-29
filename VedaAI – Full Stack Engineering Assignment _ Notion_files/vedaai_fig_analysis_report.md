# VedaAI Hiring Assignment — Extracted Figma/File Analysis

## 1. File Identity

Uploaded file: `VedaAI - Hiring Assignment.fig`

The `.fig` file is a ZIP-style archive containing:

| Item | Type | Details |
|---|---|---|
| `canvas.fig` | Binary Figma canvas data | Proprietary/binary layer data with `fig-kiwij` header |
| `thumbnail.png` | PNG | 400 × 153 canvas thumbnail |
| `meta.json` | JSON | Export metadata |
| `images/` | Asset folder | 8 embedded raster image assets |

## 2. Metadata Extracted from `meta.json`

```json
{
  "file_name": "VedaAI - Hiring Assignment",
  "exported_at": "2026-05-26T17:27:43.181Z",
  "background_color": "rgba(30, 30, 30, 1)",
  "thumbnail_size": {
    "width": 400,
    "height": 153
  },
  "render_coordinates": {
    "x": -36,
    "y": 123,
    "width": 8743,
    "height": 3346
  }
}
```

Canvas background color: `#1E1E1E`.

## 3. Extracted Embedded Assets

| Exported asset name | Original hash | Format | Size | Usage inferred |
|---|---|---:|---:|---|
| `avatar-monkey-small.jpg` | `832d9b0b041a84344e73e92d8cb6cae12db5a7b7` | JPEG | 500 × 500 | User/school card avatar |
| `delhi-public-school-logo-wide.png` | `11a3dba74bb954d4e5fc9c457efbea1f52c4f604` | PNG | 2208 × 495 | DPS wide logo/header asset |
| `orange-gradient-small.jpg` | `59f1a4ed57b72d0788645df6c8c47e0ba697e58a` | JPEG | 480 × 270 | Logo/icon gradient source |
| `orange-gradient-large.jpg` | `9febd571fee6fd21c3fcb70add17604731bfebaf` | JPEG | 3840 × 2160 | Large gradient source |
| `delhi-public-school-logo-compact.png` | `f18cc6fb195718db65e0638b17db02701a86f7ff` | PNG | 276 × 62 | Compact school logo |
| `headshot-512.jpg` | `330354a493a7c5f251aba30907f2ec2914e44d2d` | JPEG | 512 × 512 | Alternate profile image |
| `headshot-1024.jpg` | `ee8e04a2aab79d37e6b53c7ff948d9fc67c7f73b` | JPEG | 1024 × 1024 | Alternate profile image |
| `avatar-monkey-large.jpg` | `2e5a797574651e700037a00834fc192cdff92aad` | JPEG | 2000 × 2000 | Large avatar/profile asset |

## 4. Exported Frame/Screenshot Files Available in Workspace

| File | Size | Screen represented |
|---|---:|---|
| `0 State screen.png` | 2048 × 1109 | Empty assignments dashboard |
| `Filled State .png` | 2048 × 1198 | Assignments list/dashboard filled state |
| `Upload Material - Selector.png` | 2048 × 1905 | Create assignment form screen |
| `Assignment Ouput.png` | 1719 × 2048 | Generated question-paper output screen |
| `Frame 1618872221.png` | 304 × 2048 | Mobile output page |
| `Frame 1618872449.png` | 1510 × 2048 | PDF/question paper export style |
| `Frame 1984077326.png` | 1100 × 678 | Isolated empty state illustration section |
| `VedaAI - Hiring Assignment.png` | 2048 × 783 | Overall Figma canvas overview |

## 5. Global UI Style Extraction

### Visual identity

- Product name: `VedaAI`
- Logo: square rounded icon with orange/dark gradient and white `V` mark
- Overall style: soft, minimal, rounded, glassy dashboard UI
- Background: light grey/off-white with heavy soft shadows
- Primary action: dark pill button with orange stroke/accent
- Typography: modern sans-serif, visually close to Inter/SF Pro

### Approximate color tokens

| Token | Approx hex | Usage |
|---|---:|---|
| Canvas dark | `#1E1E1E` | Figma canvas background |
| App background | `#E9E9E9` / `#ECECEC` | Main dashboard background |
| Card background | `#F6F6F6` / `#FFFFFF` | Sidebar, cards, paper |
| Primary text | `#242424` | Headings and strong text |
| Secondary text | `#6A6A6A` / `#8A8A8A` | Muted labels |
| Primary dark button | `#1F1F1F` | CTA buttons |
| Border grey | `#DADADA` / `#DEDEDE` | Inputs, upload box, dividers |
| Orange accent | `#F45B3D` / `#FF5A3D` | CTA outline, badges, notification dot |
| Green status | `#65C887` | Small status dot beside page title |
| Red delete/error | `#FF3B3B` | Empty-state cross, delete text |
| Soft purple | `#D8D1EA` | Empty-state magnifier |
| Blue accent | `#4B7F9D` | Empty-state decorative dot/star |

### Radius and spacing language

- Sidebar radius: about `18px–24px`
- Main topbar radius: about `18px–22px`
- Assignment cards radius: about `24px–30px`
- Form card radius: about `28px–32px`
- Primary buttons: fully rounded pill, `999px`
- Upload box: about `18px`, dashed border
- Inputs: rounded pill or soft rounded rectangle
- Layout uses large whitespace and centered content.

## 6. Common Layout Structure

### Desktop layout

- Left sidebar fixed/sticky with white background and strong shadow.
- Main content on light grey background.
- Top navigation bar is a long rounded white pill at top.
- User profile appears at top right with avatar and `John Doe`.
- Notification bell with small orange dot.
- Sidebar bottom has settings and school identity card.

### Sidebar elements

Logo area:

- Gradient square `V` icon
- Text: `VedaAI`

Primary CTA:

- Text: `Create Assignment`
- Icon: sparkle/plus style
- Dark background
- Orange outline/glow

Menu items:

1. `Home`
2. `My Groups`
3. `Assignments`
4. `AI Teacher’s Toolkit`
5. `My Library`
6. `Settings`

School card:

- Avatar image
- `Delhi Public School`
- `Bokaro Steel City`

Badges:

- Assignment count badge examples: `10`, `32`
- Badge color: orange
- Badge shape: small pill

## 7. Screen 1 — Empty Assignments State

File: `0 State screen.png`

### Main content

- Page breadcrumb/topbar: back arrow, grid icon, text `Assignment`
- Empty state centered horizontally and vertically
- Illustration: document with magnifying glass and red cross
- Heading: `No assignments yet`
- Description:
  `Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading.`
- CTA button:
  `+ Create Your First Assignment`

### Implementation notes

- Use a reusable `EmptyState` component.
- Use either extracted illustration from screenshot recreation or approximate with SVG/CSS.
- Button should route to `/assignments/create`.

## 8. Screen 2 — Assignments Filled State

File: `Filled State .png`

### Header

- Title: `Assignments`
- Subtitle: `Manage and create assignments for your classes.`
- Green status dot before title.

### Filter/search bar

- Left: funnel icon + `Filter By`
- Right: rounded search input with placeholder `Search Assignment`

### Assignment cards

Card content:

- Title: `Quiz on Electricity`
- Assigned date: `Assigned on : 20-06-2025`
- Due date: `Due : 21-06-2025`
- Three-dot menu at top-right

Dropdown menu:

- `View Assignment`
- `delete` in red

Floating bottom CTA:

- `+ Create Assignment`

### Implementation notes

- Cards are arranged in two columns on desktop.
- Cards become one column on tablet/mobile.
- Add search filtering by title.
- Add delete confirmation or simple delete action.

## 9. Screen 3 — Create Assignment Form

File: `Upload Material - Selector.png`

### Header

- Page title: `Create Assignment`
- Subtitle: `Set up a new assignment for your students`
- Green status dot.
- Progress indicator: two horizontal lines; first line dark/active, second light/inactive.

### Main card

Title:

- `Assignment Details`
- Subtitle: `Basic information about your assignment`

### Upload area

- Dashed border rectangle.
- Upload icon centered.
- Text: `Choose a file or drag & drop it here`
- Helper: `JPEG, PNG, upto 10MB`
- Button: `Browse Files`
- Caption below: `Upload images of your preferred document/image`

Note: Assignment statement says PDF/text optional, while design text says JPEG/PNG. Implementation should support PDF/TXT and optionally image files.

### Form fields

Due Date:

- Label: `Due Date`
- Placeholder: `DD-MM-YYYY`
- Calendar icon at right.

Question Type rows:

Columns:

- `Question Type`
- `No. of Questions`
- `Marks`

Default rows visible:

1. `Multiple Choice Questions` — questions `4`, marks `1`
2. `Short Questions` — questions `3`, marks `2`
3. `Diagram/Graph-Based Questions` — questions `5`, marks `5`
4. `Numerical Problems` — questions `5`, marks `5`

Controls:

- Dropdown chevron on question type
- `x` delete icon per row
- minus/plus stepper for number of questions
- minus/plus stepper for marks
- `+ Add Question Type`

Calculated summary:

- `Total Questions : 25`
- `Total Marks : 60`

Additional Information:

- Label: `Additional Information (For better output)`
- Placeholder: `e.g Generate a question paper for 3 hour exam duration..`
- Mic icon at lower right.

Navigation buttons:

- Left: `← Previous`
- Right: `Next →`

### Validation rules to implement

- Due date required.
- At least one question type.
- Question count must be positive integer.
- Marks must be positive integer.
- No negative values.
- File optional.
- Additional instructions optional.

## 10. Screen 4 — Generated Output Page

Files: `Assignment Ouput.png`, `Frame 1618872449.png`, `Frame 1618872221.png`

### Top action bar

Dark rounded card at top.

Text:

`Certainly, Lakshya! Here are customized Question Paper for your CBSE Grade 8 Science classes on the NCERT chapters:`

Button:

- `Download as PDF`
- On mobile, icon-only or compact download button.

### Paper content

Header:

- `Delhi Public School, Sector-4, Bokaro`
- `Subject: English`
- `Class: 5th`

Exam metadata:

- Left: `Time Allowed: 45 minutes`
- Right: `Maximum Marks: 20`

Instruction:

- `All questions are compulsory unless stated otherwise.`

Student info:

- `Name: __________`
- `Roll Number: __________`
- `Class: 5th Section: ________`

Section:

- `Section A`

Question group:

- `Short Answer Questions`
- Italic instruction: `Attempt all questions. Each question carries 2 marks`

Questions visible:

1. `[Easy] Define electroplating. Explain its purpose. [2 Marks]`
2. `[Moderate] What is the role of a conductor in the process of electrolysis? [2 Marks]`
3. `[Easy] Why does a solution of copper sulfate conduct electricity? [2 Marks]`
4. `[Moderate] Describe one example of the chemical effect of electric current in daily life. [2 Marks]`
5. `[Moderate] Explain why electric current is said to have chemical effects. [2 Marks]`
6. `[Challenging] How is sodium hydroxide prepared during the electrolysis of brine? Write the chemical reaction involved. [2 Marks]`
7. `[Challenging] What happens at the cathode and anode during the electrolysis of water? Name the gases evolved. [2 Marks]`
8. `[Easy] Mention the type of current used in electroplating and justify why it is used. [2 Marks]`
9. `[Moderate] What is the importance of electric current in the field of metallurgy? [2 Marks]`
10. `[Challenging] Explain with a chemical equation how copper is deposited during the electroplating of an object. [2 Marks]`

End marker:

- `End of Question Paper`

Answer key heading:

- `Answer Key:`

Answer key visible examples:

1. Electroplating is the process of depositing a thin layer of metal on the surface of another metal using electric current. Its purpose is to prevent corrosion, improve appearance, or increase thickness.
2. A conductor allows the flow of electric current, causing ions in the electrolyte to move and enabling chemical changes at electrodes.
3. Copper sulfate solution contains free copper and sulfate ions which carry electric charge, thus conducting electricity.
4. An example is the electroplating of silver on jewelry to prevent tarnishing.
5. Electric current causes the movement of ions leading to chemical changes at the electrodes, hence it shows chemical effects.
6. Sodium hydroxide is formed at the cathode during brine electrolysis as water gains electrons:
   `2H2O + 2e- → H2 + 2OH-`
   `Na+ + OH- → NaOH (in solution)`
7. At the cathode: water is reduced to hydrogen gas and hydroxide ions. At the anode: water is oxidized to oxygen gas and hydrogen ions.
8. Direct current (DC) is used because it produces a consistent flow of electrons needed for controlled deposition of metals.
9. Electric current helps extract metals from ores and purify metals by electrolysis in metallurgy.
10. During copper electroplating, copper ions in solution gain electrons at the cathode and deposit as copper metal: `Cu²⁺ + 2e⁻ → Cu (solid)`

### Implementation notes

- Do not render raw AI text.
- Use a structured `PaperPreview` component fed by validated JSON.
- Add difficulty badges visually, even if PDF-style output uses inline labels.
- Add `Show/Hide Answer Key` toggle for novelty.
- Add `Regenerate` button for stronger functionality.

## 11. Mobile Output Screen

File: `Frame 1618872221.png`

- Width: 304 px.
- Sidebar removed.
- Top dark action card spans page width.
- Paper is a single narrow white column.
- Text wraps aggressively.
- Questions use vertical numbering and clear line height.
- PDF/download action becomes icon-style.

Implementation responsive rules:

```css
@media (max-width: 768px) {
  .sidebar { display: none; }
  .topbar { display: none or compact; }
  .paper { width: 100%; padding: 24px; border-radius: 24px; }
  .question-row { align-items: flex-start; }
}
```

## 12. Data Model Implied by the Design

### Assignment

```ts
export type Assignment = {
  id: string;
  title: string;
  schoolName: string;
  className: string;
  subject: string;
  assignedOn: string;
  dueDate: string;
  status: 'queued' | 'generating' | 'completed' | 'failed';
  questionTypes: QuestionTypeConfig[];
  totalQuestions: number;
  totalMarks: number;
  additionalInstructions?: string;
};
```

### Question type config

```ts
export type QuestionTypeConfig = {
  type: string;
  count: number;
  marks: number;
};
```

### Generated paper

```ts
export type GeneratedPaper = {
  schoolName: string;
  subject: string;
  className: string;
  timeAllowed: string;
  maximumMarks: number;
  instructions: string;
  sections: PaperSection[];
  answerKey: AnswerKeyItem[];
};
```

### Paper section

```ts
export type PaperSection = {
  title: string;
  questionType: string;
  instruction: string;
  questions: PaperQuestion[];
};
```

### Paper question

```ts
export type PaperQuestion = {
  questionNo: number;
  questionText: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Challenging';
  marks: number;
  type: string;
};
```

### Answer key

```ts
export type AnswerKeyItem = {
  questionNo: number;
  answer: string;
};
```

## 13. Recommended Component Breakdown

```txt
components/layout/AppShell.tsx
components/layout/Sidebar.tsx
components/layout/Topbar.tsx
components/assignment/EmptyState.tsx
components/assignment/AssignmentCard.tsx
components/assignment/AssignmentListToolbar.tsx
components/assignment/AssignmentForm.tsx
components/assignment/QuestionTypeRow.tsx
components/output/OutputActionBar.tsx
components/output/PaperPreview.tsx
components/output/PaperHeader.tsx
components/output/StudentInfoLines.tsx
components/output/PaperSection.tsx
components/output/QuestionItem.tsx
components/output/AnswerKey.tsx
components/ui/Button.tsx
components/ui/Input.tsx
components/ui/Badge.tsx
components/ui/IconButton.tsx
```

## 14. Recommended Route Mapping

```txt
/                         -> redirect to /assignments
/assignments              -> empty or filled assignment dashboard
/assignments/create       -> create assignment form
/assignments/[id]         -> generated paper output
```

## 15. Implementation Priority from This Design

1. Build the layout shell exactly first: sidebar, topbar, grey background.
2. Build assignment empty state.
3. Build assignment list cards.
4. Build create assignment form.
5. Build output paper.
6. Make mobile output match the narrow frame.
7. Connect backend data.
8. Add WebSocket progress and PDF download.

## 16. Key Pixel-Perfect CSS Starting Point

```css
:root {
  --veda-bg: #e9e9e9;
  --veda-surface: #f7f7f7;
  --veda-white: #ffffff;
  --veda-text: #252525;
  --veda-muted: #7b7b7b;
  --veda-border: #dddddd;
  --veda-dark: #1f1f1f;
  --veda-orange: #f45b3d;
  --veda-green: #65c887;
  --veda-danger: #ff3b3b;
}

body {
  background: var(--veda-bg);
  color: var(--veda-text);
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.sidebar {
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.16);
}

.primary-pill {
  background: #202020;
  color: #fff;
  border: 3px solid var(--veda-orange);
  border-radius: 999px;
}

.card-soft {
  background: #f8f8f8;
  border-radius: 28px;
}

.paper-sheet {
  background: #fff;
  border-radius: 28px;
  color: #2b2b2b;
}
```

## 17. Limitations of Extraction

The archive contains Figma binary canvas data in `canvas.fig`. The layer tree, exact text styles, Auto Layout values, constraints, and node IDs are inside this binary data and were not directly readable as plain JSON from the uploaded `.fig` archive. The practical implementation details above were extracted from the archive metadata, embedded assets, thumbnail, and provided high-resolution exported frames.

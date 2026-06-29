# 0 State screen page

**0 State screen page details**\-Here is a comprehensive design specification breakdown of the UI provided in the image to help you replicate it pixel-for-pixel using HTML and CSS.  
---

## **1\. Color Palette (HEX Codes)**

### **Backgrounds & Surfaces**

* **Main Application Background:** \#EAEAEA (Light cool grey)  
* **Sidebar Background:** \#FFFFFF (Pure white with a soft right drop-shadow)  
* **Main Content Empty State Area:** Same as application background, but elements sit on transparent or subtle \#F5F5F5 radial gradients depending on the illustration background circle.

### **Typography & Icons**

* **Primary Text & Active Icons:** \#2D3748 (Dark slate grey, used for headings like "No assignments yet" and active sidebar text)  
* **Secondary Text & Inactive Icons:** \#718096 (Medium grey, used for "Home", "My Groups", subtitles like "Bokaro Steel City", and the empty state description)  
* **Sidebar Border/Dividers:** \#E2E8F0 (Very light grey line below the top header or surrounding containers)

### **Brand & Action Colors**

* **Primary CTA Button Background:** \#1A1A1A (Near black, used for "+ Create Your First Assignment")  
* **Primary CTA Button Text:** \#FFFFFF (Pure white)  
* **Secondary "Create Assignment" Button:** \* **Background:** \#222222  
  * **Border/Glow:** \#FF4500 to \#E65100 (An orange-red gradient border wrap, approximately 2px thick)  
* **Accent Colors (Illustration):**  
  * **Red Cross:** \#FF3333  
  * **Blue Dots/Sparkles:** \#3182CE

---

## **2\. Layout Structure & Spacing (Padding/Margins)**

### **Overall Canvas**

* **Layout Style:** Flexbox layout split into two main columns (Sidebar and Main Content).  
* **Sidebar Width:** Approximately 260px to 280px.  
* **Main Content Area:** Takes up the remaining viewport width (flex: 1).

### **Sidebar Details**

* **Outer Padding:** 24px top, 16px left, 16px right, 24px bottom.  
* **Logo Section ("VedaAI"):** \* margin-bottom: 32px  
  * Logo icon radius: 8px  
* **"Create Assignment" Top Button:**  
  * padding: 12px 20px  
  * border-radius: 24px (Fully pill-shaped)  
  * margin-bottom: 24px  
* **Navigation Links List:**  
  * Vertical spacing between items: 8px (gap)  
  * Individual item padding: 10px 16px  
  * Active item ("Assignments") background: \#F7FAFC or a very soft grey \#F0F4F8 with a border-radius: 6px.  
* **User/School Profile Card (Bottom):**  
  * Fixed at the bottom of the sidebar using margin-top: auto or absolute positioning.  
  * Background: \#F7FAFC  
  * border-radius: 12px  
  * padding: 12px  
  * Avatar border-radius: 50% (Circle)

---

## **3\. Main Content Area & Empty State Alignment**

### **Top Header Bar**

* **Height:** 64px  
* **Background:** \#FFFFFF (White)  
* padding: 0 24px  
* Contains a back arrow (←) and a breadcrumb icon (㗊 Assignment) spaced out using a small gap (12px).

### **Empty State Center Container**

* **Alignment:** Perfectly centered horizontally and vertically within the remaining viewport.  
* CSS

display: flex;  
flex-direction: column;  
align-items: center;  
justify-content: center;  
text-align: center;

*   
*   
* **Illustration Container:**  
  * Features a large muted grey background circle (\#E2E8F0 with low opacity or a soft gradient blend).  
  * margin-bottom: 24px  
* **Typography Hierarchy:**  
  * **Heading ("No assignments yet"):** font-size: 20px, font-weight: 700, color: \#2D3748, margin-bottom: 8px.  
  * **Description Paragraph:** font-size: 14px, font-weight: 400, color: \#718096, line-height: 1.5, max-width: 420px (to ensure clean text wrapping), margin-bottom: 24px.  
* **Bottom CTA Button ("+ Create Your First Assignment"):**  
  * padding: 12px 28px  
  * border-radius: 20px  
  * font-size: 14px  
  * font-weight: 600

---

## **4\. Typography Rules**

* **Font Family:** A clean modern sans-serif like **Inter**, **Segoe UI**, or **San Francisco (SF Pro)**.  
* **Font Weights:**  
  * Bold headings / Active items: 600 or 700  
  * Regular body text / Inactive nav: 400 or 500

---

## **5\. Borders, Shadows & Radii Reference Table**

| Element | Border Radius | Border Style / Width | Box Shadow |
| :---- | :---- | :---- | :---- |
| **Main Sidebar** | 0px | Right border: 1px solid \#E2E8F0 or soft shadow | 4px 0px 16px rgba(0, 0, 0, 0.03) |
| **Top CTA Button** | 24px (Pill) | 2px solid gradient | None |
| **Active Nav Item** | 8px | None | None |
| **School Profile Card** | 16px | None | None |
| **Center CTA Button** | 24px (Pill) | None | 0px 4px 10px rgba(0, 0, 0, 0.1) |

# Filledstate

**Filled state page details**\-This is a clean, modern UI with a clear structure. Since I am analyzing an image, I cannot extract the *mathematically exact* pixel values via an eyedropper tool, but I can give you highly accurate approximations, specific hex codes, and the exact Tailwind CSS structural classes you need to replicate this pixel-by-pixel.  
Your chosen tech stack (Next.js \+ Tailwind \+ Redux/Zustand \+ WebSockets) is perfect for this. WebSockets will be great for real-time updates to that "Assignments" badge or live status changes on the quiz cards.

Here is the detailed extraction for your pixel-by-pixel replication.

### **🎨 1\. Color Palette & Typography**

The design relies on a clean, low-contrast grayscale with strong orange/red accents for interactive and primary elements.

| Element | Estimated Hex Code | Tailwind Utility | Notes |
| :---- | :---- | :---- | :---- |
| **App Background** | \#F3F4F6 | bg-gray-100 | Light gray background behind the main content area. |
| **Sidebar/Card Bg** | \#FFFFFF | bg-white | Pure white for the sidebar, cards, and dropdowns. |
| **Primary Text** | \#111827 | text-gray-900 | Used for main headers ("Assignments", "Quiz on Electricity"). |
| **Secondary Text** | \#6B7280 | text-gray-500 | Used for subheaders, dates, search placeholder. |
| **Primary Button Bg** | \#111827 | bg-gray-900 | The dark pill-shaped "Create Assignment" buttons. |
| **Button Text** | \#FFFFFF | text-white | Text inside primary buttons. |
| **Orange Accent** | \#F97316 | text-orange-500 / bg-orange-500 | Used for the "10" badge and the logo gradient. |
| **Destructive Text** | \#EF4444 | text-red-500 | Used for the "Delete" action in the dropdown. |
| **Borders/Dividers** | \#E5E7EB | border-gray-200 | Very subtle borders on search bars and filters. |

* **Font Family:** Looks like a standard modern sans-serif. In Tailwind, font-sans (which defaults to Inter, Roboto, or system UI) will match this perfectly.

---

### **📐 2\. Layout Structure & Dimensions**

The application is a standard dashboard split: a fixed sidebar on the left and a scrollable main content area on the right.

#### **A. Global Layout**

* **Container:** flex h-screen w-full bg-gray-100 font-sans  
* **Sidebar Wrapper:** w-\[280px\] h-full bg-white flex flex-col (or w-72).  
* **Main Content Wrapper:** flex-1 h-full overflow-y-auto p-8

#### **B. Sidebar Details (w-\[280px\] bg-white flex flex-col p-4)**

* **Logo Area:** flex items-center gap-3 mb-8 px-2  
* **Top Button ("Create Assignment"):**  
  * *Styling:* This button has a gradient border. The easiest way to replicate this in Tailwind is a wrapper with padding and a gradient background.  
  * *Wrapper:* p-\[2px\] bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-6  
  * *Inner Button:* w-full bg-gray-900 text-white rounded-full py-3 px-4 flex items-center justify-center gap-2  
* **Navigation Links:**  
  * *Container:* flex flex-col gap-1  
  * *Item:* flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer  
  * *Icons:* \~20x20px (w-5 h-5 mr-3 text-gray-400).  
  * *Active State (Assignments):* The text appears slightly bolder (font-medium).  
  * *Badge ("10"):* bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full  
* **User Profile Card (Bottom):**  
  * *Positioning:* Pushed to the bottom using mt-auto.  
  * *Container:* flex items-center gap-3 p-3 bg-gray-50 rounded-xl  
  * *Avatar:* w-10 h-10 rounded-full object-cover  
  * *Text:* Title is text-sm font-semibold, subtitle is text-xs text-gray-500.

#### **C. Main Content Header**

* **Breadcrumb:** text-sm text-gray-400 flex items-center gap-2 mb-4  
* **Title Area:**  
  * Title: text-2xl font-bold text-gray-900 mb-1  
  * Subtitle: text-sm text-gray-400 mb-6  
* **Toolbar (Filter & Search):**  
  * *Container:* flex justify-between items-center mb-6  
  * *Filter/Search Inputs:* Both appear to have white backgrounds, rounded-full, padding px-4 py-2.5, soft borders border border-gray-200, and subtle shadows shadow-sm.

#### **D. Card Grid (The Assignments)**

* **Grid Layout:** grid grid-cols-2 gap-6 (based on the visible width, this is likely a 2-column grid that might snap to 1 on smaller screens and 3 on ultra-wide).  
* **Individual Card (bg-white rounded-2xl p-6 shadow-sm relative)**:  
  * *Header Row:* flex justify-between items-start mb-12  
  * *Card Title:* text-lg font-semibold text-gray-900  
  * *More Options (3 dots):* text-gray-400 cursor-pointer p-1  
  * *Footer Row:* flex justify-between items-center text-sm text-gray-500  
  * *Dates:* Formatted as "Assigned on : 20-06-2025". Note that some cards only have the assigned date, while others also have "Due : 21-06-2025" mapped to the right side.  
  * *Status Indicator:* Notice the small green dot on the top left of the grid area? It looks like a status indicator w-2 h-2 rounded-full bg-green-500.

#### **E. Dropdown Menu (Popup)**

* **Positioning:** Absolute positioning relative to the card's 3-dot icon.  
  * absolute top-12 right-6 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-10 py-2  
* **Menu Items:**  
  * *Item 1 (View Assignment):* block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50  
  * *Item 2 (Delete):* block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50

#### **F. Floating Action Button (FAB)**

* *Position:* fixed bottom-8 right-8 z-50  
* *Styling:* bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-gray-800 transition-colors

---

### **💻 3\. Component Architecture Advice (Next.js)**

Given your stack, here is the recommended way to break this down into React components:

1. Layout.tsx: Contains the Sidebar and a \<main\> wrapper for children.  
2. Sidebar.tsx: Contains navigation mapped from an array. Use Next.js \<Link\> with usePathname hook to determine the active state for the "Assignments" route.  
3. AssignmentHeader.tsx: Contains the breadcrumb, title, filter, and search inputs.  
4. AssignmentCard.tsx: Receives props title, assignedDate, dueDate (optional).  
5. DropdownMenu.tsx: A reusable component managed by local state (useState for open/close) or a headless UI library like Radix UI or Headless UI for accessibility (highly recommended over building custom dropdowns to handle outside clicks and focus traps).

**WebSocket Note:** If you are using WebSockets, bind the listener in a useEffect at the page level or inside your Zustand store to listen for events like ASSIGNMENT\_CREATED or ASSIGNMENT\_DELETED to optimisticly update the UI list without a hard refresh.

# assignmentt output

Assignment output page details- I can certainly help you break down this UI for a pixel-by-pixel replication. While as an AI I cannot use a literal eyedropper tool to pull the mathematically exact pixel values from the image, I can analyze the visual hierarchy and provide you with highly accurate structural details, color approximations, and the exact Tailwind CSS utility classes you need to build this.  
Your choice of Next.js \+ Tailwind is perfect for this dashboard layout. Here is the detailed extraction based on the provided screenshot of the "VedaAI" application.

### **🎨 1\. Color Palette & Typography**

The design uses a clean, high-contrast monochrome base with a few distinct accent colors for notifications and specific UI elements.

| Element | Estimated Hex Code | Tailwind Utility | Notes |
| :---- | :---- | :---- | :---- |
| **App Background** | \#F3F4F6 | bg-gray-100 | The light gray backdrop behind the main content area. |
| **Containers (Sidebar/Top)** | \#FFFFFF | bg-white | Pure white for the sidebar, top header, and the document itself. |
| **Primary Text** | \#111827 | text-gray-900 | Used for standard UI text, headers, and the document text. |
| **Secondary Text** | \#6B7280 | text-gray-500 | Used for inactive sidebar links and subtitle text. |
| **Active/Primary Button Bg** | \#000000 | bg-black | The "AI Teacher's Toolkit" active sidebar item. |
| **Dark Banner Bg** | \#27272A | bg-zinc-800 | The dark message banner above the document. |
| **Notification Badge** | \#EF4444 | bg-red-500 | The red badge showing "32" in the sidebar. |
| **Borders** | \#E5E7EB | border-gray-200 | Subtle dividers in the sidebar and top navigation. |

* **Typography:** The application uses a clean sans-serif font. Tailwind’s default font-sans (which maps to system fonts like Inter or Roboto) will match this perfectly.

---

### **📐 2\. Layout Structure & Dimensions**

The application is built on a standard dashboard architecture: a fixed sidebar and a flexible main content area.

#### **A. Global Layout**

* **Root Container:** flex h-screen w-full bg-gray-100 font-sans text-gray-900  
* **Sidebar Wrapper:** w-\[260px\] h-full bg-white flex flex-col border-r border-gray-200  
* **Main Content Wrapper:** flex-1 flex flex-col h-full

#### **B. Sidebar (w-\[260px\] flex flex-col p-4)**

* **Logo Area:** flex items-center gap-2 mb-8 px-2 (Font looks bold, \~text-xl).  
* **Active Menu Item ("AI Teacher's Toolkit"):** \* bg-black text-white rounded-xl px-4 py-3 flex items-center gap-3 text-sm font-medium mb-6  
* **Navigation Links (Home, My Groups, etc.):**  
  * *Container:* flex flex-col gap-2  
  * *Standard Item:* flex items-center justify-between px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 cursor-pointer text-sm font-medium  
  * *Icons:* \~20x20px (w-5 h-5 mr-3 text-gray-400).  
* **Notification Badge:** \* bg-red-500 text-white text-\[10px\] font-bold px-2 py-0.5 rounded-full  
* **Bottom Section (Settings & Profile):**  
  * Push to bottom: mt-auto flex flex-col gap-2  
  * Profile Card: flex items-center gap-3 p-3 border border-gray-200 rounded-xl mt-4 (Contains an avatar w-8 h-8 rounded-full and two lines of text: text-sm font-semibold and text-xs text-gray-500).

#### **C. Top Header (h-16 bg-white flex items-center justify-between px-6 border-b border-gray-200)**

* **Left Side (Breadcrumb/Action):** flex items-center gap-4 text-sm font-medium (Contains a back arrow icon and "Create New" text).  
* **Right Side (Profile/Actions):** flex items-center gap-6 (Contains a bell icon w-5 h-5 text-gray-600 and the user profile dropdown flex items-center gap-2 text-sm font-medium).

#### **D. Main Content Area (flex-1 overflow-y-auto p-6 md:p-10)**

* **Dark Message Banner:** \* *Container:* bg-zinc-800 text-white rounded-2xl p-6 mb-6 flex flex-col gap-4 shadow-md  
  * *Text:* text-sm leading-relaxed  
  * *Button:* bg-white text-zinc-900 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 w-fit hover:bg-gray-100 transition-colors  
* **Document Card (The Question Paper):**  
  * *Container:* bg-white rounded-\[32px\] p-10 max-w-4xl mx-auto shadow-sm border border-gray-100  
  * *Header Section:* Centered text text-center mb-8.  
    * School Name: text-xl font-bold mb-1  
    * Subject & Class: text-md font-medium mb-1  
  * *Meta Info Row (Time/Marks):* flex justify-between items-center text-sm font-medium border-b border-gray-200 pb-4 mb-6  
  * *Form Fields:* Stacked text text-sm leading-loose mb-8 (Name, Roll Number, Class).  
  * *Section Headers (e.g., "Section A"):* text-lg font-semibold text-center my-6  
  * *Questions List:* flex flex-col gap-4 text-sm  
    * Tags like \[Easy\] or \[Moderate\] can be styled with text-gray-500 font-medium mr-1.

---

### **💻 3\. Component Architecture Advice**

To integrate this effectively with your chosen tech stack:

1. **Layout & Routing (Next.js):** Create a standard layout.tsx that renders the Sidebar and TopHeader. Pass {children} into the main scrollable area.  
2. **State Management (Zustand/Redux):** \* Use Zustand to manage the global UI state (e.g., isSidebarOpen for mobile responsiveness, or activeTab).  
   * Manage the document generation data (the questions, subjects, and parameters) in your store so the document component simply receives a data object to render.  
3. **Real-Time Features (WebSocket):** \* The red "32" notification badge on "Assignments" is a perfect candidate for WebSocket updates. Listen for incoming assignment events and increment this counter in your Zustand store without requiring a page refresh.  
   * You could also use WebSockets to show a "Generating..." loading state on the dark banner while the AI processes the question paper.

# MATSELECTOR

MATERIAL SELECTOR- This is a clean, modern dashboard design focused on usability and clear information hierarchy. While I cannot extract the mathematically exact, pixel-perfect values using an eyedropper tool from an image, I can analyze the visual structure and provide you with highly accurate approximations, hex codes, and the exact Tailwind CSS utility classes needed to replicate this seamlessly.  
Your tech stack (Next.js \+ Tailwind \+ Redux/Zustand \+ WebSockets) is exceptionally well-suited for this layout.

Here is the detailed extraction for your pixel-by-pixel replication of the "VedaAI" application.

### **🎨 1\. Color Palette & Typography**

The design relies on a light gray background with pure white cards to create depth, utilizing a high-contrast dark gray/black for primary actions and text, alongside bright accents.

| Element | Estimated Hex Code | Tailwind Utility | Notes |
| :---- | :---- | :---- | :---- |
| **App Background** | \#F3F4F6 | bg-gray-100 | Light gray backdrop behind the main scrollable area. |
| **Sidebar/Cards/Topnav** | \#FFFFFF | bg-white | Pure white for the sidebar, top navigation, and form container. |
| **Primary Text** | \#111827 | text-gray-900 | Main headers ("Create Assignment", "Assignment Details"). |
| **Secondary Text** | \#6B7280 | text-gray-500 | Subheaders, input placeholders, and inactive sidebar links. |
| **Primary Buttons** | \#111827 | bg-gray-900 | The dark "Create Assignment" and "Next \-\>" buttons. |
| **Accent Gradient** | \#F97316 / \#EF4444 | from-orange-500 to-red-500 | Used for the gradient border on the sidebar button. |
| **Notification Badge** | \#F97316 | bg-orange-500 | The orange badge showing "32" in the sidebar. |
| **Success Indicator** | \#22C55E | bg-green-500 | The small green dot next to "Create Assignment". |
| **Borders & Dividers** | \#E5E7EB | border-gray-200 | Subtle lines separating rows and defining input fields. |
| **Dashed Border** | \#D1D5DB | border-gray-300 | Used for the drag-and-drop file upload area. |

* **Typography:** The application uses a clean, modern sans-serif font. Tailwind’s default font-sans (Inter, Roboto, or system UI) is a perfect match.

---

### **📐 2\. Layout Structure & Dimensions**

The app uses a classic dashboard skeleton. Here is how to construct the flexbox and grid layouts.

#### **A. Global Layout**

* **Root Container:** flex h-screen w-full bg-gray-100 font-sans  
* **Sidebar Wrapper:** w-\[260px\] h-full bg-white flex flex-col shrink-0 (It appears floating, so it might have a slight margin like m-4 rounded-2xl shadow-sm or be full height).  
* **Main Content Wrapper:** flex-1 flex flex-col h-full overflow-hidden

#### **B. Sidebar Elements (flex flex-col p-4 w-full h-full)**

* **Logo Area:** flex items-center gap-2 mb-6 px-2 (Font is bold, roughly text-xl).  
* **Create Assignment Button:**  
  * *Gradient Wrapper:* p-\[1px\] bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6 mx-2  
  * *Inner Button:* w-full bg-gray-900 text-white rounded-full py-2.5 px-4 flex items-center gap-2 text-sm  
* **Navigation Links:**  
  * *Container:* flex flex-col gap-1  
  * *Items:* flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer  
  * *Icons:* \~20x20px (w-5 h-5 mr-3 text-gray-400).  
* **Notification Badge:** bg-orange-500 text-white text-\[10px\] font-bold px-2 py-0.5 rounded-full  
* **Bottom Profile Section:**  
  * *Positioning:* mt-auto to push to the bottom.  
  * *Card:* flex items-center gap-3 p-3 bg-gray-50 rounded-xl  
  * *Text:* Title text-sm font-semibold, Subtitle text-xs text-gray-500.

#### **C. Top Navigation (h-16 flex items-center justify-between px-8 shrink-0)**

* **Left (Breadcrumb):** flex items-center gap-2 text-sm text-gray-600 font-medium (e.g., \<- Assignment).  
* **Right (Profile/Actions):** flex items-center gap-4 (Bell icon w-5 h-5 text-gray-500 and User Dropdown flex items-center gap-2 text-sm font-medium).

#### **D. Main Form Area (flex-1 overflow-y-auto px-8 pb-8)**

* **Header Section:**  
  * *Title Row:* flex items-center gap-2 mb-1. Green dot: w-2 h-2 rounded-full bg-green-500. Title: text-2xl font-bold text-gray-900.  
  * *Subtitle:* text-sm text-gray-500 mb-6.  
  * *Progress Bar/Divider:* A thin line extending across the top, h-\[2px\] bg-gray-200 w-full mb-8, perhaps with a darker segment showing progress.  
* **The Main Card (bg-white rounded-2xl p-8 shadow-sm max-w-4xl)**:  
  * **Section Title:** text-lg font-semibold text-gray-900 mb-1 & text-sm text-gray-500 mb-6.  
  * **File Upload Area:**  
    * border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center gap-2 text-center mb-6 bg-gray-50/50  
    * Text: text-sm text-gray-900 font-medium. Subtext: text-xs text-gray-400.  
    * Button: "Browse Files" as a subtle text link or small outline button.  
  * **Due Date Field:**  
    * Label: block text-sm font-medium text-gray-700 mb-2.  
    * Input: w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm flex items-center justify-between text-gray-500.  
  * **Question Type Table/Grid:**  
    * *Headers:* grid grid-cols-\[1fr\_auto\_auto\_auto\] gap-4 text-xs font-semibold text-gray-500 mb-4 px-2 (Question Type, No. of Questions, Marks).  
    * *Rows:* flex items-center gap-4 mb-3.  
      * Dropdown: flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm.  
      * Multiplier/Icon: 'x' text-gray-400 text-sm.  
      * Number Inputs: Small rounded boxes w-12 text-center border border-gray-200 rounded-lg py-2 text-sm.  
    * *Add Button:* flex items-center gap-2 text-sm font-medium text-gray-900 mt-4. Use a small black circle with a white plus for the icon.  
    * *Totals:* flex flex-col items-end text-sm text-gray-700 font-medium mt-6 pt-4 border-t border-gray-100.  
  * **Additional Information:**  
    * Label: text-sm font-medium text-gray-700 mb-2.  
    * Textarea: w-full border border-gray-200 rounded-lg p-4 text-sm min-h-\[100px\] relative.  
    * Mic Icon: Positioned absolutely absolute bottom-3 right-3 text-gray-400.

#### **E. Footer Actions**

* **Container:** flex justify-between items-center mt-8 max-w-4xl  
* **Previous Button:** px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-gray-50  
* **Next Button:** px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium flex items-center gap-2 hover:bg-gray-800

---

### **💻 3\. Implementation Advice for your Tech Stack**

1. **Component Architecture (Next.js \+ TS):**  
   * Create a reusable \<Sidebar /\> component. Use an array of objects to map through the navigation items, ensuring type safety with TypeScript interfaces.  
   * Extract the drag-and-drop zone into its own component (\<FileUploadZone /\>). You can use a library like react-dropzone to handle the actual file processing efficiently.  
   * Create a \<QuestionRow /\> component for the repeating table rows to keep your main form clean.  
2. **State Management (Redux or Zustand):**  
   * **Zustand** is highly recommended here for its simplicity with forms. Create a store for the assignmentDraft that holds the due date, an array of question types \[{ type: 'MCQ', count: 4, marks: 1 }, ...\], and the additional information text.  
   * This makes calculating the "Total Questions" and "Total Marks" a simple derived state function: const totalMarks \= questions.reduce((acc, q) \=\> acc \+ (q.count \* q.marks), 0);.  
3. **WebSockets:**  
   * If the file upload triggers AI generation on the backend, use WebSockets to stream the progress back to the client. You can replace the "Browse Files" box with a loading skeleton or a progress bar that updates in real-time via WebSocket events.


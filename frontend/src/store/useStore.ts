import { create } from 'zustand';

export interface QuestionTypeRow {
  id: string;
  type: string;
  count: number;
  marks: number;
}

export interface Assignment {
  id: string;
  _id?: string;
  title: string;
  className: string;
  subject: string;
  assignedDate: string;
  dueDate: string;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  progress: number;
  uploadedFileName?: string | null;
  uploadedFileSize?: string | null;
  questionTypes?: QuestionTypeRow[];
  additionalInfo?: string;
  generatedPaper?: IGeneratedPaper;
}

export interface IQuestion {
  id: number;
  text: string;
  difficulty: string;
  marks: number;
}

export interface IAnswer {
  id: number;
  text: string;
  formula?: string;
}

export interface IGeneratedPaper {
  schoolName: string;
  subject: string;
  className: string;
  timeAllowed: string;
  maxMarks: number;
  instructions: string;
  questions: IQuestion[];
  answers: IAnswer[];
}

export interface Group {
  id: string;
  _id?: string;
  name: string;
  subject: string;
  students: number;
  color: string;
  createdAt?: string;
}

export interface LibraryItem {
  id: string;
  _id?: string;
  title: string;
  type: 'document' | 'video' | 'link' | 'assignment';
  subject: string;
  size?: string;
  createdAt?: string;
}

interface EduStore {
  // Navigation State
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Assignments List
  assignments: Assignment[];
  loading: boolean;
  fetchAssignments: () => Promise<void>;
  deleteAssignment: (id: string) => Promise<void>;
  addAssignment: (assignment: Assignment) => void;

  // Groups
  groups: Group[];
  groupsLoading: boolean;
  fetchGroups: () => Promise<void>;
  addGroup: (group: Partial<Group>) => Promise<void>;
  deleteGroup: (id: string) => Promise<void>;

  // Library Items
  libraryItems: LibraryItem[];
  libraryLoading: boolean;
  fetchLibraryItems: () => Promise<void>;
  addLibraryItem: (item: Partial<LibraryItem>) => Promise<void>;
  deleteLibraryItem: (id: string) => Promise<void>;

  // Stepper Form States
  formStep: number;
  setFormStep: (step: number) => void;
  assignmentName: string;
  setAssignmentName: (name: string) => void;
  dueDate: string;
  setDueDate: (date: string) => void;
  uploadedFileName: string | null;
  uploadedFileSize: string | null;
  uploadedFileObject: File | null;
  setUploadedFile: (name: string | null, size: string | null, fileObj?: File | null) => void;
  questionTypes: QuestionTypeRow[];
  addQuestionType: () => void;
  removeQuestionType: (id: string) => void;
  updateQuestionCounter: (id: string, field: 'count' | 'marks', action: 'inc' | 'dec') => void;
  updateQuestionTypeSelection: (id: string, type: string) => void;
  additionalInfo: string;
  setAdditionalInfo: (info: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  resetForm: () => void;
  
  // AI Generation State
  generatingAssignmentId: string | null;
  generationProgress: number;
  generationStatus: 'pending' | 'generating' | 'completed' | 'failed' | null;
  generationStatusText: string;
  triggerAIGeneration: (routerPush: (path: string) => void) => Promise<void>;

  // Selected Assignment Viewer State
  selectedAssignmentId: string | null;
  setSelectedAssignmentId: (id: string | null) => void;

  // Generated Assignment Output
  generatedPaper: IGeneratedPaper | null;
  setGeneratedPaper: (paper: IGeneratedPaper | null) => void;
}

const initialQuestionTypes: QuestionTypeRow[] = [
  { id: '1', type: 'Multiple Choice Questions', count: 4, marks: 1 },
  { id: '2', type: 'Short Questions', count: 3, marks: 2 },
  { id: '3', type: 'Diagram/Graph-Based Questions', count: 5, marks: 5 },
  { id: '4', type: 'Numerical Problems', count: 5, marks: 5 },
];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const getWSUrl = (assignmentId: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const wsProto = baseUrl.startsWith('https') ? 'wss' : 'ws';
  const cleanedHost = baseUrl.replace(/^https?:\/\//, '');
  return `${wsProto}://${cleanedHost}?assignmentId=${assignmentId}`;
};

const getTomorrowDateStringStore = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dd = String(tomorrow.getDate()).padStart(2, '0');
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const yyyy = tomorrow.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

const mockGeneratedPaper: IGeneratedPaper = {
  schoolName: 'Delhi Public School, Sector-4, Bokaro',
  subject: 'Science',
  className: 'Class: 8th',
  timeAllowed: '45 minutes',
  maxMarks: 60,
  instructions: 'All questions are compulsory unless stated otherwise.',
  questions: [
    { id: 1, text: 'Define electroplating. Explain its purpose.', difficulty: 'Easy', marks: 2 },
    { id: 2, text: 'What is the role of a conductor in the process of electrolysis?', difficulty: 'Moderate', marks: 2 },
    { id: 3, text: 'Why does a solution of copper sulfate conduct electricity?', difficulty: 'Easy', marks: 2 },
    { id: 4, text: 'Describe one example of the chemical effect of electric current in daily life.', difficulty: 'Moderate', marks: 2 },
    { id: 5, text: 'Explain why electric current is said to have chemical effects.', difficulty: 'Moderate', marks: 2 },
    { id: 6, text: 'How is sodium hydroxide prepared during the electrolysis of brine? Write the chemical reaction involved.', difficulty: 'Challenging', marks: 5 },
    { id: 7, text: 'What happens at the cathode and anode during the electrolysis of water? Name the gases evolved.', difficulty: 'Challenging', marks: 5 },
    { id: 8, text: 'Mention the type of current used in electroplating and justify why it is used.', difficulty: 'Easy', marks: 2 },
    { id: 9, text: 'What is the importance of electric current in the field of metallurgy?', difficulty: 'Moderate', marks: 2 },
    { id: 10, text: 'Explain with a chemical equation how copper is deposited during the electroplating of an object.', difficulty: 'Challenging', marks: 5 }
  ],
  answers: [
    { id: 1, text: 'Electroplating is the process of depositing a thin layer of metal on the surface of another metal using electric current. Its purpose is to prevent corrosion, improve appearance, or increase thickness.' },
    { id: 2, text: 'A conductor allows the flow of electric current, causing ions in the electrolyte to move and enabling chemical changes at electrodes.' },
    { id: 3, text: 'Copper sulfate solution contains free copper and sulfate ions which carry electric charge, thus conducting electricity.' },
    { id: 4, text: 'An example is the electroplating of silver on jewelry to prevent tarnishing.' },
    { id: 5, text: 'Electric current causes the movement of ions leading to chemical changes at the electrodes, hence it shows chemical effects.' },
    { id: 6, text: 'Sodium hydroxide is formed at the cathode during brine electrolysis as water gains electrons:\n2H2O + 2e- -> H2 + 2OH-\nNa+ + OH- -> NaOH (in solution)' },
    { id: 7, text: 'At the cathode: water is reduced to hydrogen gas and hydroxide ions. At the anode: water is oxidized to oxygen gas and hydrogen ions.' },
    { id: 8, text: 'Direct current (DC) is used because it produces a consistent flow of electrons necessary for controlled deposition of metals.' },
    { id: 9, text: 'Electric current helps extract metals from their ores and purify metals by electrolysis in metallurgy.' },
    { id: 10, text: 'During copper electroplating, copper ions in solution gain electrons at the cathode and deposit as copper metal:\nCu2+ + 2e- -> Cu (solid)' }
  ]
};

const getMockQuestionsForSubject = (subject: string, className: string, questionTypes: QuestionTypeRow[], language: string = 'English'): IGeneratedPaper => {
  const isBiology = subject.toLowerCase().includes('biology') || subject.toLowerCase().includes('bio');
  const isCompNet = subject.toLowerCase().includes('network') || subject.toLowerCase().includes('computer') || subject.toLowerCase().includes('net');
  
  const langLower = language.toLowerCase();
  const isBengali = langLower.includes('bengali') || langLower.includes('bangla') || langLower.includes('বাংলা');
  const isHindi = langLower.includes('hindi') || langLower.includes('हिंदी') || langLower.includes('हिन्दी');

  let qTexts: string[] = [];
  let aTexts: string[] = [];
  let schoolName = 'Delhi Public School, Sector-4, Bokaro';
  let instructions = 'All questions are compulsory unless stated otherwise.';
  let timeAllowed = '45 minutes';

  if (isBengali) {
    schoolName = 'দিল্লি পাবলিক স্কুল, সেক্টর-৪, বোকারো';
    instructions = 'অন্যথা উল্লেখ না থাকলে সমস্ত প্রশ্ন আবশ্যিক।';
    timeAllowed = '৪৫ মিনিট';

    if (isBiology) {
      qTexts = [
        'কোষের সংজ্ঞা দাও এবং এটি কেন জীবনের কাঠামোগত ও কার্যকারী একক বলা হয় তা ব্যাখ্যা কর।',
        'উদ্ভিদ কোষ এবং প্রাণী কোষের মধ্যে পার্থক্য কী? একটি পরিষ্কার চিত্র অঙ্কন কর।',
        'ইউক্যারিওটিক কোষে মাইটোকন্ড্রিয়া এবং প্লাস্টিডের কাজগুলি ব্যাখ্যা কর।',
        'অভিস্রবণ কী? একটি পরীক্ষার সাহায্যে ব্যাখ্যা কর।',
        'বিভিন্ন ধরণের এপিথেলিয়াল কলার গঠন এবং কাজগুলি বর্ণনা কর।',
        'সালোকসংশ্লেষ প্রক্রিয়াটি ব্যাখ্যা কর এবং এর সুষম রাসায়নিক সমীকরণটি লেখ।',
        'প্রোটিন সংশ্লেষণে রাইবোসোম এবং গলগি বডির ভূমিকা কী?',
        'মাইটোসিস এবং মিওসিস কোষ বিভাজনের মধ্যে পার্থক্য কর।',
        'একটি চিহ্নিত চিত্র সহ একটি নিউরনের গঠন ব্যাখ্যা কর।',
        'মনেরা এবং প্রোটিস্টা রাজ্যের প্রধান বৈশিষ্ট্যগুলি কী কী?'
      ];
      aTexts = [
        'কোষ হল সমস্ত জীবন্ত প্রাণীর মৌলিক কাঠামোগত এবং কার্যকারী একক। এটি কাঠামোগত কারণ এটি শরীরের গঠন তৈরি করে এবং কার্যকারী কারণ সমস্ত বিপাকীয় কার্যকলাপ এর মধ্যেই ঘটে।',
        'উদ্ভিদ কোষের কোষ প্রাচীর এবং ক্লোরোপ্লাস্ট থাকে, যেখানে প্রাণী কোষে এগুলি থাকে না। উদ্ভিদ কোষে একটি বড় কেন্দ্রীয় ভ্যাকুওল থাকে।',
        'মাইটোকন্ড্রিয়া হল কোষের শক্তিঘর, যা এটিপি (ATP) তৈরি করে। প্লাস্টিড শুধুমাত্র উদ্ভিদে পাওয়া যায়; ক্লোরোপ্লাস্ট সালোকসংশ্লেষ করে যখন ক্রোমোপ্লাস্ট/লিউোকোপ্লাস্ট স্টার্স সঞ্চয় করে।',
        'অভিস্রবণ হল একটি অর্ধভেদ্য পর্দার মাধ্যমে উচ্চ জলের ঘনত্বের অঞ্চল থেকে কম জলের ঘনত্বের অঞ্চলে জলের অণুর চলাচল।',
        'এপিথেলিয়াল কলা শরীরের উপরিভাগকে আবৃত করে এবং অভ্যন্তরীণ অঙ্গগুলিকে আস্তরিত করে। প্রকারগুলির মধ্যে স্কোয়ামাস, কিউবয়েডাল, কলামনার এবং সিলিয়েটেড এপিথেলিয়াম অন্তর্ভুক্ত।',
        'সালোকসংশ্লেষ হল এমন একটি প্রক্রিয়া যার মাধ্যমে সবুজ উদ্ভিদ আলোক শক্তিকে রাসায়নিক শক্তিতে রূপান্তর করে: 6CO2 + 6H2O + আলো -> C6H12O6 + 6O2।',
        'রাইবোসোম হল প্রোটিন সংশ্লেষণের স্থান। গলগি বডি পরিবহনের জন্য প্রোটিন সংশোধন, সাজানো এবং প্যাকেজ করে।',
        'মাইটোসিসের ফলে বৃদ্ধির জন্য দুটি জিনগতভাবে অভিন্ন ডিপ্লয়েড অপত্য কোষ তৈরি হয়। মিওসিসের ফলে প্রজননের জন্য চারটি জিনগতভাবে বৈচিত্র্যময় হ্যাপ্লয়েড গ্যামেট তৈরি হয়।',
        'একটি নিউরন একটি কোষের দেহ (সাইটন), সংকেত গ্রহণকারী ডেনড্রাইট এবং বৈদ্যুতিক আবেগ প্রেরণকারী একটি দীর্ঘ অ্যাক্সন নিয়ে গঠিত।',
        'মনেরাতে ব্যাকটেরিয়ার মতো এককোষী প্রোক্যারিওট থাকে। প্রোটিস্টাতে অ্যামিবার মতো এককোষী ইউক্যারিওট থাকে।'
      ];
    } else if (isCompNet) {
      qTexts = [
        'OSI মডেল এবং TCP/IP মডেলের মধ্যে পার্থক্য ব্যাখ্যা কর।',
        'একটি আইপি ঠিকানা কী? IPv4 এবং IPv6 এর মধ্যে পার্থক্য কর।',
        'কম্পিউটার নেটওয়ার্কে ডিএনএস (DNS) এর কাজ ব্যাখ্যা কর।',
        'নেটওয়ার্কে রাউটারের কাজ কী? এটি সুইচের থেকে কীভাবে আলাদা?',
        'TCP সংযোগ স্থাপনে থ্রি-ওয়ে হ্যান্ডশেকিং বর্ণনা কর।',
        'CSMA/CD কী এবং এটি কীভাবে ইথারনেটে সংঘর্ষ সনাক্ত করে?',
        'ইউনিকাস্ট, মাল্টিকাস্ট এবং ব্রডকাস্ট রাউটিংয়ের ধারণা ব্যাখ্যা কর।',
        'ন্যাট (NAT) এর উদ্দেশ্য কী?',
        'TCP এবং UDP এর ব্যবহারের উদাহরণ সহ পার্থক্য ব্যাখ্যা কর।',
        'ফায়ারওয়াল কী? এটি কীভাবে একটি লোকাল এরিয়া নেটওয়ার্ককে সুরক্ষিত রাখে?'
      ];
      aTexts = [
        'OSI মডেল ৭টি স্তরের এবং এটি একটি ধারণাগত কাঠামো। TCP/IP মডেল ৪টি স্তরের এবং এটি ইন্টারনেটের ব্যবহারিক প্রোটোকল সুইট।',
        'আইপি ঠিকানা হল নেটওয়ার্কে একটি ডিভাইসের অনন্য পরিচয়। IPv4 ৩২-বিট ঠিকানা ব্যবহার করে, এবং IPv6 ১২৮-বিট হেক্সাডেসিমেল ঠিকানা ব্যবহার করে।',
        'ডিএনএস মানুষের পাঠযোগ্য ডোমেন নামকে মেশিনের পাঠযোগ্য আইপি ঠিকানায় অনুবাদ করে ইন্টারনেটের ফোনবুক হিসাবে কাজ করে।',
        'রাউটার বিভিন্ন নেটওয়ার্কের মধ্যে ডেটা প্যাকেট রুট করে (লেয়ার ৩), আর সুইচ একই লোকাল নেটওয়ার্কের ডিভাইসগুলির মধ্যে ডেটা ফরোয়ার্ড করে (লেয়ার ২)।',
        'TCP নির্ভরযোগ্য সংযোগ স্থাপনের জন্য ৩টি ধাপের হ্যান্ডশেক (SYN, SYN-ACK, ACK) ব্যবহার করে।',
        'CSMA/CD ডিভাইসগুলিকে প্রেরণের আগে চ্যানেল শুনতে দেয়। সংঘর্ষ সনাক্ত হলে তারা প্রেরণ বন্ধ করে, কিছু সময় অপেক্ষা করে এবং পুনরায় চেষ্টা করে।',
        'ইউনিকাস্ট হল এক-টু-এক যোগাযোগ। মাল্টিকাস্ট হল এক-টু-অনেক নির্দিষ্ট ডিভাইস। ব্রডকাস্ট হল নেটওয়ার্কের সমস্ত ডিভাইসের সাথে যোগাযোগ।',
        'ন্যাট স্থানীয় নেটওয়ার্কের ব্যক্তিগত আইপিকে ইন্টারনেটের একটি সর্বজনীন আইপিতে অনুবাদ করে আইপি ঠিকানা সংরক্ষণ করে এবং সুরক্ষা বাড়ায়।',
        'TCP সংযোগ-ভিত্তিক এবং নির্ভরযোগ্য (যেমন HTTP, ইমেল)। UDP সংযোগহীন এবং দ্রুতগতি সম্পন্ন (যেমন ভিডিও স্ট্রিমিং, গেমিং)।',
        'ফায়ারওয়াল পূর্বনির্ধারিত সুরক্ষা নিয়মের ভিত্তিতে আগত এবং বহির্গামী নেটওয়ার্ক ট্র্যাফিক নিরীক্ষণ এবং ফিল্টার করে অননুমোদিত অ্যাক্সেস ব্লক করে।'
      ];
    } else {
      qTexts = [
        `বিষয় ${subject} সম্পর্কিত মৌলিক ধারণাগুলি ব্যাখ্যা কর।`,
        `আধুনিক বিজ্ঞান ও প্রযুক্তিতে বিষয় ${subject} এর মূল প্রয়োগগুলি বর্ণনা কর।`,
        `বিষয় ${subject} এর ক্ষেত্রে একটি বড় বৈজ্ঞানিক আবিষ্কারের বিশদ বিবরণ দাও।`,
        `বিষয় ${subject} এবং অন্যান্য সম্পর্কিত বিভাগের মধ্যে সম্পর্ক ব্যাখ্যা কর।`,
        `বিষয় ${subject} এর সাথে সম্পর্কিত একটি সাধারণ ল্যাব পরীক্ষা বর্ণনা কর।`,
        `বিষয় ${subject} এর অধ্যয়নে প্রধান চ্যালেঞ্জ বা অমীমাংসিত প্রশ্নগুলি কী কী?`,
        `বিষয় ${subject} এর পাঠ্যক্রম কীভাবে ${className} এর শিক্ষার্থীদের উপকৃত করে?`,
        `বিষয় ${subject} এর ঐতিহাসিক বিকাশ এবং প্রধান অবদানকারীদের ব্যাখ্যা কর।`,
        `একটি বাস্তব দৃশ্য প্রদান কর যেখানে বিষয় ${subject} এর নীতিগুলি প্রয়োগ করা হয়।`,
        `বিষয় ${subject} এর সাথে সম্পর্কিত প্রধান নীতি এবং সূত্রগুলি সংক্ষেপে আলোচনা কর।`
      ];
      aTexts = [
        `বিষয় ${subject} এর মৌলিক ধারণাগুলি বিষয়টির মূল কাঠামো এবং এর প্রাথমিক নিয়মাবলী বুঝতে সাহায্য করে।`,
        `বিষয় ${subject} এর মূল প্রয়োগগুলির মধ্যে রয়েছে শিল্প অটোমেশন, একাডেমিক গবেষণা, চিকিৎসা উদ্ভাবন এবং পরিবেশ প্রকৌশল।`,
        `বিষয় ${subject} এর একটি বড় আবিষ্কার গবেষকদের নতুন পদ্ধতি এবং প্রযুক্তি বিকাশে সহায়তা করেছে যা সামগ্রিক কার্যকারিতা বাড়ায়।`,
        `বিষয় ${subject} এর অধ্যয়ন অত্যন্ত আন্তঃবিভাগীয়, যা গণিত, কম্পিউটিং, রসায়ন এবং জীববিদ্যার সাথে সম্পর্কিত।`,
        `একটি সাধারণ ল্যাব পরীক্ষায় রাসায়নিক বা ভৌত পরিবর্তন পর্যবেক্ষণ করা হয় এবং তার পর্যবেক্ষণ প্রমাণিত তত্ত্বে প্রয়োগ করা হয়।`,
        `প্রধান চ্যালেঞ্জগুলির মধ্যে রয়েছে স্কেলেবিলিটি, সম্পদের সীমাবদ্ধতা, নৈতিক প্রভাব এবং উচ্চ-নির্ভুলতা পরিমাপক যন্ত্রের প্রয়োজন।`,
        `এই পাঠ্যক্রম শিক্ষার্থীদের সমালোচনামূলক চিন্তা, বিশ্লেষণাত্মক দক্ষতা এবং ভৌত বিশ্ব সম্পর্কে প্রাথমিক ধারণা গড়ে তুলতে সাহায্য করে।`,
        `ঐতিহাসিক বিকাশ সাধারণ পর্যবেক্ষণমূলক তত্ত্ব থেকে অত্যন্ত বিশদ গাণিতিক এবং অভিজ্ঞতামূলক মডেলে রূপান্তর নির্দেশ করে।`,
        `বাস্তব জীবনের উদাহরণ হল আধুনিক সিস্টেমগুলি কীভাবে বিষয় ${subject} এর মূল ধারণা এবং পরামিতিগুলি ব্যবহার করে ক্রিয়াকলাপগুলি অপ্টিমাইজ করে।`,
        `সংক্ষেপে, বিষয় ${subject} এর প্রধান নীতিগুলি সংরক্ষণ সূত্র, অভিজ্ঞতামূলক সম্পর্ক এবং কাঠামোগত গাণিতিক সমীকরণের সাথে সম্পর্কিত।`
      ];
    }
  } else if (isHindi) {
    schoolName = 'दिल्ली पब्लिक स्कूल, सेक्टर-4, बोकारो';
    instructions = 'अन्यथा उल्लिखित न होने पर सभी प्रश्न अनिवार्य हैं।';
    timeAllowed = '45 मिनट';

    if (isBiology) {
      qTexts = [
        'कोशिका को परिभाषित करें और समझाएं कि इसे जीवन की संरचनात्मक और कार्यात्मक इकाई क्यों कहा जाता है।',
        'पादप कोशिकाओं और जंतु कोशिकाओं में क्या अंतर है? एक साफ चित्र बनाएं।',
        'यूकेरियोटिक कोशिका में माइटोकॉन्ड्रिया और प्लास्टिड के कार्यों की व्याख्या करें।',
        'परासरण क्या है? एक प्रयोग के साथ समझाइए।',
        'विभिन्न प्रकार के उपकला (एपिथेलियल) ऊतकों की संरचना और कार्यों का वर्णन करें।',
        'प्रकाश संश्लेषण की प्रक्रिया को समझाइए और इसका संतुलित रासायनिक समीकरण लिखिए।',
        'प्रोटीन संश्लेषण में राइबोसोम और गॉल्जी उपकरण की क्या भूमिका है?',
        'समसूत्री (माइटोसिस) और अर्धसूत्री (मियोसिस) कोशिका विभाजन के बीच अंतर स्पष्ट करें।',
        'एक नामांकित आरेख के साथ एक न्यूरॉन की संरचना की व्याख्या करें।',
        'किंगडम मोनेरा और प्रोटिस्टा की मुख्य विशेषताएं क्या हैं?'
      ];
      aTexts = [
        'कोशिका सभी जीवित जीवों की बुनियादी संरचनात्मक और कार्यात्मक इकाई है। यह संरचनात्मक है क्योंकि यह शरीर की संरचना बनाती है, और कार्यात्मक है क्योंकि सभी चयापचय गतिविधियां इसके भीतर होती हैं।',
        'पादप कोशिकाओं में कोशिका भित्ति और क्लोरोप्लास्ट होते हैं, जबकि जंतु कोशिकाओं में इनका अभाव होता है। पादप कोशिकाओं में एक बड़ा केंद्रीय रिक्तिका (वैक्यूओल) भी होता है।',
        'माइटोकॉन्ड्रिया कोशिका का पावरहाउस है, जो एटीपी उत्पन्न करता है। प्लास्टिड केवल पौधों में पाए जाते हैं; क्लोरोप्लास्ट प्रकाश संश्लेषण करते हैं जबकि क्रोमोप्लास्ट/ल्यूकोप्लास्ट स्टार्च का भंडारण करते हैं।',
        'परासरण एक अर्ध-पारगम्य झिल्ली के माध्यम से उच्च जल सांद्रता वाले क्षेत्र से कम जल सांद्रता वाले क्षेत्र में पानी के अणुओं की गति है।',
        'उपकला ऊतक शरीर की सतह को ढकते हैं और आंतरिक अंगों को अस्तर देते हैं। प्रकारों में स्क्वैमस, क्यूबॉइडल, कॉलमिनर और सिलियेटेड एपिथेलियम शामिल हैं।',
        'प्रकाश संश्लेषण वह प्रक्रिया है जिसके द्वारा हरे पौधे प्रकाश ऊर्जा को रासायनिक ऊर्जा में परिवर्तित करते हैं: 6CO2 + 6H2O + प्रकाश -> C6H12O6 + 6O2।',
        'राइबोसोम प्रोटीन संश्लेषण के स्थल हैं। गॉल्जी उपकरण परिवहन के लिए प्रोटीन को संशोधित, छांटता और पैकेज करता है।',
        'समसूत्री विभाजन के परिणामस्वरूप वृद्धि के लिए दो आनुवंशिक रूप से समान द्विगुणित संतति कोशिकाएं बनती हैं। अर्धसूत्री विभाजन के परिणामस्वरूप प्रजनन के लिए चार आनुवंशिक रूप से विविध अगुणित युग्मक बनते हैं।',
        'एक न्यूरॉन में एक कोशिका निकाय (साइटोन), सिग्नल प्राप्त करने वाले डेंड्राइट्स और विद्युत आवेगों को प्रसारित करने वाला एक लंबा एक्सॉन होता है।',
        'मोनेरा में बैक्टीरिया जैसे एककोशिकीय प्रोकैरियोट्स शामिल हैं। प्रोटिस्टा में अमीबा जैसे एककोशिकीय यूकेरियोट्स शामिल हैं।'
      ];
    } else if (isCompNet) {
      qTexts = [
        'OSI मॉडल और TCP/IP मॉडल के बीच अंतर स्पष्ट करें।',
        'एक आईपी एड्रेस क्या है? IPv4 और IPv6 में अंतर स्पष्ट करें।',
        'कंप्यूटर नेटवर्क में डीएनएस (DNS) की कार्यप्रणाली को समझाएं।',
        'नेटवर्क में राउटर की क्या भूमिका है? यह स्विच से किस प्रकार भिन्न है?',
        'TCP कनेक्शन स्थापना में थ्री-वे हैंडशेक का वर्णन करें।',
        'CSMA/CD क्या है और यह ईथरनेट में टकराव का पता कैसे लगाता है?',
        'यूनिकास्ट, मल्टीकास्ट और ब्रॉडकास्ट राउटिंग की अवधारणा को समझाएं।',
        'नेट (NAT) का मुख्य उद्देश्य क्या है?',
        'उदाहरणों के साथ TCP और UDP के बीच महत्वपूर्ण अंतर समझाएं।',
        'फ़ायरवॉल क्या है? यह स्थानीय क्षेत्र नेटवर्क (LAN) को कैसे सुरक्षित रखता है?'
      ];
      aTexts = [
        'OSI मॉडल में ७ परतें होती हैं और यह एक वैचारिक ढांचा है। TCP/IP मॉडल में ४ परतें होती हैं और यह इंटरनेट का व्यावहारिक प्रोटोकॉल सूट है।',
        'आईपी एड्रेस नेटवर्क में किसी डिवाइस की विशिष्ट पहचान है। IPv4 ३२-बिट पते का उपयोग करता है, और IPv6 १२८-बिट हेक्साडेसिमल पते का उपयोग करता है।',
        'डीएनएस मानव-पठनीय डोमेन नामों को मशीन-पठनीय आईपी पतों में अनुवादित करके इंटरनेट की फोनबुक के रूप में कार्य करता है।',
        'राउटर विभिन्न नेटवर्क के बीच डेटा पैकेट को रूट करता है (लेयर ३), जबकि स्विच स्थानीय नेटवर्क में डेटा फॉरवर्ड करता (लेयर २)।',
        'TCP विश्वसनीय कनेक्शन स्थापित करने के लिए ३-तरफा हैंडशेक (SYN, SYN-ACK, ACK) का उपयोग करता है।',
        'CSMA/CD उपकरणों को संचारित करने से पहले चैनल सुनने की अनुमति देता है। टकराव होने पर वे रुकते हैं, यादृच्छिक समय प्रतीक्षा करते हैं, और पुनः प्रयास करते हैं।',
        'यूनिकास्ट एक-से-एक संचार है। मल्टीकास्ट एक-से-कई चयनित डिवाइस संचार है। ब्रॉडकास्ट नेटवर्क के सभी उपकरणों के साथ संचार है।',
        'नेट स्थानीय नेटवर्क के निजी आईपी को इंटरनेट के सार्वजनिक आईपी में अनुवादित करता है, जिससे आईपी पते सुरक्षित और संरक्षित रहते हैं।',
        'TCP कनेक्शन-उन्मुख और विश्वसनीय है (जैसे HTTP, ईमेल)। UDP कनेक्शन रहित और तेज गति का है (जैसे वीडियो स्ट्रीमिंग, गेमिंग)।',
        'फ़ायरवॉल सुरक्षा नियमों के आधार पर आने वाले और जाने वाले नेटवर्क ट्रैफ़िक की निगरानी और फ़िल्टर करता है और अनधिकृत पहुंच को रोकता है।'
      ];
    } else {
      qTexts = [
        `विषय ${subject} से संबंधित बुनियादी अवधारणाओं को स्पष्ट करें।`,
        `आधुनिक विज्ञान और प्रौद्योगिकी में विषय ${subject} के प्रमुख अनुप्रयोगों का वर्णन करें।`,
        `विषय ${subject} के क्षेत्र में एक बड़ी वैज्ञानिक खोज या सफलता का विवरण दें।`,
        `विषय ${subject} और अन्य संबंधित विषयों के बीच संबंध को समझाएं।`,
        `विषय ${subject} से जुड़ा एक सामान्य प्रयोगशाला प्रयोग या व्यावहारिक अनुप्रयोग बताएं।`,
        `विषय ${subject} के अध्ययन में प्रमुख चुनौतियाँ या अनसुलझे प्रश्न क्या हैं?`,
        `विषय ${subject} का पाठ्यक्रम ${className} के छात्रों को कैसे लाभ पहुँचाता है?`,
        `विषय ${subject} के ऐतिहासिक विकास और प्रमुख योगदानकर्ताओं की व्याख्या करें।`,
        `एक वास्तविक परिदृश्य प्रस्तुत करें जहाँ विषय ${subject} के सिद्धांतों को लागू किया जाता है।`,
        `विषय ${subject} से संबंधित प्रमुख सिद्धांतों और सूत्रों का संक्षेप में सारांश प्रस्तुत करें।`
      ];
      aTexts = [
        `विषय ${subject} की बुनियादी अवधारणाएं इस विषय के मूल नियमों और प्रणालियों को समझने की मुख्य नींव हैं।`,
        `विषय ${subject} के प्रमुख अनुप्रयोगों में औद्योगिक स्वचालन, शैक्षणिक अनुसंधान, चिकित्सा नवाचार और पर्यावरण इंजीनियरिंग शामिल हैं।`,
        `विषय ${subject} में एक बड़ी खोज ने शोधकर्ताओं को नई पद्धतियां और तकनीकें विकसित करने में सक्षम बनाया है जिससे दक्षता बढ़ती है।`,
        `विषय ${subject} का अध्ययन अत्यधिक अंतःविषय है, जो गणित, कंप्यूटिंग, रसायन विज्ञान और जीव विज्ञान के साथ ओवरलैप करता है।`,
        `एक सामान्य व्यावहारिक प्रयोग में रासायनिक या भौतिक परिवर्तनों का निरीक्षण करना, डेटा एकत्र करना और सिद्धांतों को साबित करना शामिल है।`,
        `प्रमुख चुनौतियों में स्केलेबिलिटी, संसाधन बाधाएं, नैतिक निहितार्थ और उच्च-सटीक माप उपकरणों की आवश्यकता शामिल है।`,
        `यह पाठ्यक्रम छात्रों में महत्वपूर्ण सोच, विश्लेषणात्मक कौशल और भौतिक दुनिया की बुनियादी समझ विकसित करने में मदद करता है।`,
        `ऐतिहासिक विकास साधारण अवलोकन संबंधी सिद्धांतों से विस्तृत गणितीय और अनुभवजन्य मॉडलों में परिवर्तन को दर्शाता है।`,
        `एक वास्तविक जीवन का उदाहरण यह है कि आधुनिक प्रणालियाँ विषय ${subject} की अवधारणाओं और मापदंडों का उपयोग करके परिचालन को कैसे अनुकूलित करती हैं।`,
        `संक्षेप में, विषय ${subject} के प्रमुख सिद्धांतों में संरक्षण नियम, अनुभवजन्य संबंध और गणितीय समीकरण शामिल हैं।`
      ];
    }
  } else {
    // English defaults
    if (isBiology) {
      qTexts = [
        'Define cell and explain why it is called the structural and functional unit of life.',
        'What is the difference between plant cells and animal cells? Draw a neat diagram.',
        'Explain the functions of mitochondria and plastids in a eukaryotic cell.',
        'What is osmosis? Explain with an experiment.',
        'Describe the structures and functions of different types of epithelial tissues.',
        'Explain the process of photosynthesis and write its balanced chemical equation.',
        'What is the role of ribosomes and Golgi apparatus in protein synthesis?',
        'Differentiate between mitosis and meiosis cell division.',
        'Explain the structure of a neuron with a labeled diagram.',
        'What are the main characteristics of kingdom Monera and Protista?'
      ];
      aTexts = [
        'A cell is the basic structural and functional unit of all living organisms. It is structural because it forms the body structure, and functional because all metabolic activities occur within it.',
        'Plant cells have cell walls and chloroplasts, whereas animal cells lack them. Plant cells also have a large central vacuole.',
        'Mitochondria are the powerhouse of the cell, generating ATP. Plastids are found only in plants; chloroplasts perform photosynthesis while chromoplasts/leucoplasts store starch/pigments.',
        'Osmosis is the movement of water molecules from a region of higher water concentration to a region of lower water concentration through a semi-permeable membrane.',
        'Epithelial tissues cover the body surface and line internal organs. Types include squamous, cuboidal, columnar, and ciliated epithelium.',
        'Photosynthesis is the process by which green plants convert light energy into chemical energy: 6CO2 + 6H2O + light -> C6H12O6 + 6O2.',
        'Ribosomes are sites of protein synthesis. Golgi apparatus modifies, sorts, and packages proteins for transport.',
        'Mitosis results in two genetically identical diploid daughter cells for growth. Meiosis results in four genetically diverse haploid gametes for reproduction.',
        'A neuron consists of a cell body (cyton), dendrites that receive signals, and a long axon that transmits electrical impulses.',
        'Monera contains unicellular prokaryotes like bacteria. Protista contains unicellular eukaryotes like amoeba and paramecium.'
      ];
    } else if (isCompNet) {
      qTexts = [
        'Explain the difference between OSI model and TCP/IP model.',
        'What is an IP address? Differentiate between IPv4 and IPv6.',
        'Explain the working of DNS (Domain Name System) in computer networks.',
        'What is the role of a router in a network? How does it differ from a switch?',
        'Describe three-way handshaking in TCP connection establishment.',
        'What is CSMA/CD and how does it detect collisions in Ethernet?',
        'Explain the concepts of unicast, multicast, and broadcast routing.',
        'What is the purpose of NAT (Network Address Translation)?',
        'Explain the difference between TCP and UDP with examples of their use cases.',
        'What is a firewall? How does it protect a local area network?'
      ];
      aTexts = [
        'The OSI model has 7 layers and is a conceptual framework. The TCP/IP model has 4 layers and is the practical suite used in the actual Internet.',
        'An IP address is a unique identifier for a device on a network. IPv4 uses 32-bit addresses (e.g. 192.168.1.1) while IPv6 uses 128-bit hexadecimal addresses.',
        'DNS acts as a phonebook for the Internet, translating human-readable domain names (like google.com) into machine-readable IP addresses.',
        'A router routes data packets across different networks (Layer 3), while a switch forwards data within a single local network (Layer 2).',
        'TCP uses a three-way handshake (SYN, SYN-ACK, ACK) to establish a reliable, stateful connection between a client and server.',
        'CSMA/CD allows devices to listen to the channel before transmitting. If two devices transmit simultaneously, a collision is detected, they stop, wait a random time, and retry.',
        'Unicast is one-to-one communication. Multicast is one-to-many selected devices. Broadcast is one-to-all devices in the network.',
        'NAT translates private, non-routable IP addresses within a local network to a single public IP address for internet communication, conserving IP addresses.',
        'TCP is connection-oriented, reliable, and slower (used for HTTP, SMTP). UDP is connectionless, unreliable, and fast (used for video streaming, gaming).',
        'A firewall monitors and filters incoming and outgoing network traffic based on predefined security rules to block unauthorized access.'
      ];
    } else {
      qTexts = [
        `Explain the fundamental concepts related to ${subject}.`,
        `Describe the key applications of ${subject} in modern science and technology.`,
        `Detail a major scientific breakthrough or discovery in the field of ${subject}.`,
        `Explain the relationship between ${subject} and other related disciplines.`,
        `Describe a common laboratory experiment or practical application involving ${subject}.`,
        `What are the major challenges or unsolved questions in the study of ${subject}?`,
        `How does the curriculum of ${subject} benefit students in ${className}?`,
        `Explain the historical development and key contributors of ${subject}.`,
        `Provide a real-world scenario where principles of ${subject} are applied.`,
        `Summarize the key principles and formulas associated with ${subject}.`
      ];
      aTexts = [
        `The fundamental concepts of ${subject} form the core building blocks of understanding the topic and its basic laws and systems.`,
        `Key applications of ${subject} include industrial automation, academic research, medical innovations, and environmental engineering.`,
        `A major breakthrough in ${subject} has enabled researchers to develop new methodologies and technologies that improve overall efficiency.`,
        `The study of ${subject} is highly interdisciplinary, overlapping with mathematics, computing, chemistry, and biology.`,
        `A standard practical involves observing chemical or physical changes, collecting data, and plotting observations to prove core theories.`,
        `Major challenges include scalability, resource constraints, ethical implications, and the need for high-precision measurement tools.`,
        `This curriculum helps students develop critical thinking, analytical skills, and a foundational understanding of the physical world.`,
        `Historical development shows a transition from simple observational theories to highly detailed mathematical and empirical models.`,
        `A real-world example is how modern systems optimize operations by utilizing core concepts and parameters of ${subject}.`,
        `In summary, the key principles of ${subject} involve conservation laws, empirical relationships, and structured mathematical equations.`
      ];
    }
  }

  const questions: IQuestion[] = [];
  const answers: IAnswer[] = [];
  
  let qIdx = 0;
  questionTypes.forEach((qt) => {
    for (let i = 0; i < qt.count; i++) {
      const qId = qIdx + 1;
      const text = qTexts[qIdx % qTexts.length];
      const answerText = aTexts[qIdx % aTexts.length];
      
      questions.push({
        id: qId,
        text: `[${qt.type}] ${text}`,
        difficulty: qId % 3 === 0 ? 'Challenging' : (qId % 3 === 1 ? 'Easy' : 'Moderate'),
        marks: qt.marks
      });
      
      answers.push({
        id: qId,
        text: `Answer: ${answerText}`
      });
      
      qIdx++;
    }
  });
  
  return {
    schoolName,
    subject,
    className,
    timeAllowed,
    maxMarks: questionTypes.reduce((sum, qt) => sum + qt.count * qt.marks, 0),
    instructions,
    questions,
    answers
  };
};

let wsConnection: WebSocket | null = null;

export const useStore = create<EduStore>((set, get) => ({
  // Navigation State
  activeTab: 'Assignments',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Assignments list (Initially EMPTY to show the "Empty State" screen on first launch!)
  assignments: [],
  loading: false,

  fetchAssignments: async () => {
    set({ loading: true });
    try {
      const response = await fetch(`${API_BASE_URL}/api/assignments`);
      if (response.ok) {
        const data = await response.json();
        // Map backend _id to frontend id
        const mapped = data.map((item: any) => ({
          ...item,
          id: item._id || item.id,
        }));
        set({ assignments: mapped });
      }
    } catch (error) {
      console.warn('Backend server not reachable. Utilizing high-fidelity mock assignments fallback.', error);
    } finally {
      set({ loading: false });
    }
  },

  deleteAssignment: async (id) => {
    // Optimistic UI updates
    set((state) => ({
      assignments: state.assignments.filter((a) => a.id !== id && a._id !== id),
    }));

    try {
      await fetch(`${API_BASE_URL}/api/assignments/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Failed to delete assignment on backend:', error);
    }
  },

  addAssignment: (assignment) =>
    set((state) => ({
      assignments: [assignment, ...state.assignments],
    })),

  // Groups Implementation
  groups: [],
  groupsLoading: false,
  fetchGroups: async () => {
    set({ groupsLoading: true });
    try {
      const response = await fetch(`${API_BASE_URL}/api/groups`);
      if (response.ok) {
        const data = await response.json();
        set({ groups: data.map((g: any) => ({ ...g, id: g._id })) });
      }
    } catch (error) {
      console.warn('Failed to fetch groups', error);
    } finally {
      set({ groupsLoading: false });
    }
  },
  addGroup: async (group) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/groups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(group)
      });
      if (response.ok) {
        const data = await response.json();
        set((state) => ({ groups: [{ ...data, id: data._id }, ...state.groups] }));
      }
    } catch (error) {
      console.error('Failed to add group', error);
    }
  },
  deleteGroup: async (id) => {
    set((state) => ({ groups: state.groups.filter(g => g.id !== id && g._id !== id) }));
    try {
      await fetch(`${API_BASE_URL}/api/groups/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Failed to delete group', error);
    }
  },

  // Library Items Implementation
  libraryItems: [],
  libraryLoading: false,
  fetchLibraryItems: async () => {
    set({ libraryLoading: true });
    try {
      const response = await fetch(`${API_BASE_URL}/api/library`);
      if (response.ok) {
        const data = await response.json();
        set({ libraryItems: data.map((i: any) => ({ ...i, id: i._id })) });
      }
    } catch (error) {
      console.warn('Failed to fetch library items', error);
    } finally {
      set({ libraryLoading: false });
    }
  },
  addLibraryItem: async (item) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/library`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (response.ok) {
        const data = await response.json();
        set((state) => ({ libraryItems: [{ ...data, id: data._id }, ...state.libraryItems] }));
      }
    } catch (error) {
      console.error('Failed to add library item', error);
    }
  },
  deleteLibraryItem: async (id) => {
    set((state) => ({ libraryItems: state.libraryItems.filter(i => i.id !== id && i._id !== id) }));
    try {
      await fetch(`${API_BASE_URL}/api/library/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Failed to delete library item', error);
    }
  },

  // Stepper Form States
  formStep: 1,
  setFormStep: (step) => set({ formStep: step }),
  assignmentName: '',
  setAssignmentName: (name) => set({ assignmentName: name }),
  dueDate: getTomorrowDateStringStore(),
  setDueDate: (date) => set({ dueDate: date }),
  uploadedFileName: null,
  uploadedFileSize: null,
  uploadedFileObject: null,
  setUploadedFile: (name, size, fileObj = null) => set({ uploadedFileName: name, uploadedFileSize: size, uploadedFileObject: fileObj }),
  
  questionTypes: initialQuestionTypes,
  addQuestionType: () => set((state) => ({
    questionTypes: [
      ...state.questionTypes,
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'Multiple Choice Questions',
        count: 1,
        marks: 1,
      }
    ]
  })),

  removeQuestionType: (id) => set((state) => ({
    questionTypes: state.questionTypes.filter((qt) => qt.id !== id),
  })),

  updateQuestionCounter: (id, field, action) => set((state) => ({
    questionTypes: state.questionTypes.map((qt) => {
      if (qt.id !== id) return qt;
      const val = qt[field];
      const newVal = action === 'inc' ? val + 1 : Math.max(0, val - 1);
      return { ...qt, [field]: newVal };
    })
  })),

  updateQuestionTypeSelection: (id, type) => set((state) => ({
    questionTypes: state.questionTypes.map((qt) =>
      qt.id === id ? { ...qt, type } : qt
    ),
  })),

  additionalInfo: '',
  setAdditionalInfo: (info) => set({ additionalInfo: info }),
  language: 'English',
  setLanguage: (lang) => set({ language: lang }),

  resetForm: () => set({
    formStep: 1,
    assignmentName: '',
    dueDate: getTomorrowDateStringStore(),
    uploadedFileName: null,
    uploadedFileSize: null,
    uploadedFileObject: null,
    questionTypes: initialQuestionTypes,
    additionalInfo: '',
    language: 'English',
    generatingAssignmentId: null,
    generationProgress: 0,
    generationStatus: null,
    generationStatusText: '',
  }),

  // AI Generation State and WebSocket streaming
  generatingAssignmentId: null,
  generationProgress: 0,
  generationStatus: null,
  generationStatusText: '',

  triggerAIGeneration: async (routerPush) => {
    const state = get();
    
    // Validate due date is not in the past
    if (state.dueDate) {
      const parts = state.dueDate.split('-');
      if (parts.length === 3) {
        const selectedDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          alert("Due Date Blocker: You cannot proceed with a past date. Please select today's date or a future date.");
          set({ generationStatus: null, generationProgress: 0 });
          return;
        }
      }
    }
    
    // Derive subject/class from uploaded filename — backend will override with actual file content
    let subject = 'Biology';
    let className = 'Class: 9th';
    
    if (state.uploadedFileName) {
      const base = state.uploadedFileName.split('.')[0].replace(/[-_]/g, ' ');
      subject = base.charAt(0).toUpperCase() + base.slice(1);
    }

    const serialNum = state.assignments.length + 1;
    const title = state.assignmentName.trim()
      ? state.assignmentName.trim()
      : (state.uploadedFileName 
          ? `Assignment: ${state.uploadedFileName.split('.')[0]}` 
          : `Assignment #${serialNum}`);

    set({ 
      generationStatus: 'pending', 
      generationProgress: 10,
      generationStatusText: 'Initiating assignment creation request...',
    });

    try {
      console.log('Sending creation request to backend via JSON...');
      
      const payload = {
        title,
        className,
        subject,
        dueDate: state.dueDate || getTomorrowDateStringStore(),
        questionTypes: state.questionTypes,
        additionalInfo: state.additionalInfo || '',
        language: state.language || 'English',
        uploadedFileName: state.uploadedFileName || null,
        uploadedFileSize: state.uploadedFileSize || null,
      };

      const response = await fetch(`${API_BASE_URL}/api/assignments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to create assignment on backend server');
      }

      const createdAssignment = await response.json();
      const assignmentId = createdAssignment._id;

      set({
        generatingAssignmentId: assignmentId,
        generationStatus: 'generating',
        generationProgress: 20,
        generationStatusText: 'Connecting to real-time agent workflow...',
      });

      // Close any existing WS
      if (wsConnection) {
        wsConnection.close();
      }

      // Connect WebSocket for live generation progress streaming
      const wsUrl = getWSUrl(assignmentId);
      console.log(`Connecting to WebSocket at ${wsUrl}...`);
      wsConnection = new WebSocket(wsUrl);

      wsConnection.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('WebSocket event received:', data);

        // Handle intermediate progress updates
        if (data.event === 'progress') {
          // Robust checking: if status contains the bracketed agent tag, use it as status text,
          // and fallback the internal status to 'generating'.
          const isAgentLog = data.status && data.status.startsWith('[');
          const activeStatus = isAgentLog ? 'generating' : (data.status || 'generating');
          const activeStatusText = isAgentLog ? data.status : (data.message || 'Generating assignment content...');

          set({
            generationProgress: data.progress,
            generationStatus: activeStatus as any,
            generationStatusText: activeStatusText,
          });
          
          // Legacy: handle completed status within progress event
          if (data.status === 'completed' && data.data) {
            set({
              generatedPaper: data.data.generatedPaper,
              generationProgress: 100,
              generationStatus: 'completed',
              generationStatusText: 'Generation completed successfully!',
            });
            const newlySaved = { ...data.data, id: data.data._id };
            set((prev) => ({
              assignments: [newlySaved, ...prev.assignments.filter(a => a.id !== newlySaved.id)]
            }));
            wsConnection?.close();
            routerPush('/output');
          } else if (data.status === 'failed') {
            set({ 
              generationStatus: 'failed', 
              generationProgress: 100,
              generationStatusText: 'Generation failed due to error.',
            });
            wsConnection?.close();
            alert("AI Generation failed: The server encountered an error while generating the questions. Please verify your Gemini API key and try again.");
          }
        }
        
        // Handle final "job:completed" event — emitted by backend after Redis caching
        if (data.event === 'job:completed' && data.data) {
          set({
            generatedPaper: data.data.generatedPaper,
            generationProgress: 100,
            generationStatus: 'completed',
            generationStatusText: 'Generation completed successfully!',
          });
          const newlySaved = { ...data.data, id: data.data._id };
          set((prev) => ({
            assignments: [newlySaved, ...prev.assignments.filter(a => a.id !== newlySaved.id)]
          }));
          wsConnection?.close();
          routerPush('/output');
        }
      };

      wsConnection.onerror = (err) => {
        console.error('WebSocket connection error:', err);
      };

      wsConnection.onclose = () => {
        console.log('WebSocket connection closed.');
      };

    } catch (error) {
      console.error('Failed to generate assignment:', error);
      set({ 
        generationStatus: 'failed', 
        generationProgress: 100 
      });
      alert("AI Generation failed: Unable to connect to the backend server. Please make sure the Express backend server is running and healthy.");
    }
  },

  // Selected Assignment Viewer State
  selectedAssignmentId: null,
  setSelectedAssignmentId: (id) => {
    const state = get();
    const found = state.assignments.find((a) => a.id === id || a._id === id);
    if (found && found.generatedPaper) {
      set({ 
        selectedAssignmentId: id,
        generatedPaper: found.generatedPaper,
      });
    } else {
      set({ 
        selectedAssignmentId: id,
        generatedPaper: null,
      });
    }
  },

  // Generated Assignment Output
  generatedPaper: null,
  setGeneratedPaper: (paper) => set({ generatedPaper: paper }),
}));

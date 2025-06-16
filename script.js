// Import Firebase services
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxYrW66tvHLnSXITm8t5Q9XVEd7JqNQ2c",
  authDomain: "alnorain2025.firebaseapp.com",
  projectId: "alnorain2025",
  storageBucket: "alnorain2025.firebasestorage.app",
  messagingSenderId: "904034591643",
  appId: "1:904034591643:web:de632a6301ac75b9e8373e",
  measurementId: "G-CT4LRD49EW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Detailed delivery pricing for Kuwait areas
const deliveryPrices = {
  // AL-ASIMAH (Kuwait City)
  "ABDULLAH AL SALEM": 2.0,
  ADEILIYA: 2.0,
  "BNEID AL QAR": 2.0,
  DAIYA: 2.0,
  DASMA: 2.0,
  DASMAN: 2.0,
  DOHA: 3.0,
  FAIHA: 2.0,
  GARNADA: 3.0,
  "JABER AL AHMED": 3.0,
  KAIFAN: 2.0,
  KHALDIYA: 2.0,
  "KUWAIT CITY": 2.0,
  MANSOURIYA: 2.0,
  MIRQAB: 2.0,
  NUZHA: 2.0,
  QADSIYA: 2.0,
  JIBLA: 2.0,
  QORTUBA: 2.0,
  RAWDA: 2.0,
  SALHIYA: 2.0,
  SHAMIYA: 2.0,
  SHARQ: 2.0,
  "SHUWAIK LIVING AREA": 2.0,
  "SHUWAIK INDUSTRIAL": 2.5,
  "SHUWAIK EDUCATINAL": 2.5,
  SULAIBIKHAT: 3.0,
  "WEST- SULAIBIKHAT": 3.0,
  SURRA: 2.0,
  YARMOUK: 2.0,

  // HAWALLY
  "AL-BIDEA": 2.0,
  BAYAN: 2.0,
  HAWALLY: 2.0,
  HATEEN: 2.0,
  JABRIYA: 2.0,
  "MAIDAN HAWALLY": 2.0,
  MISHREF: 2.0,
  "WEST MISHREF": 2.0,
  RUMATIYA: 2.0,
  SALAM: 2.0,
  SALMIYA: 2.0,
  SALWA: 2.0,
  SHAAB: 2.0,
  SHUHADA: 2.0,
  "AI-SIDDEEQ": 2.0,
  ZAHRA: 2.0,

  // FARWANIYA
  ABBASIYA: 3.0,
  "ABDULLAH AL MUBARAK": 3.0,
  "WEST ABDULLAH AL MUBARAK": 3.0,
  KHAITAN: 2.5,
  AIRPORT: 3.0,
  ANDALOUS: 3.0,
  "AL- ARDIYA": 3.0,
  "ARDIYA INDUSTRIAL": 3.0,
  ISHBILIYA: 3.0,
  "AL-DAJEEJ": 3.0,
  FARWANIYA: 2.5,
  FIRDOUS: 3.0,
  "JELEEB AL- SHUYOUKH": 3.0,
  OMARIYA: 2.5,
  RABIA: 3.0,
  "AL-RAI": 3.0,
  RIGGAI: 3.0,
  REHAB: 3.0,
  "SABAH AL NASER": 3.0,

  // MUBARAK AL KABEER
  "ABU FATAIRA": 2.5,
  "ABU AL HASANIYA": 2.5,
  ADAN: 2.5,
  "AL-MASAYEL": 2.5,
  QURAIN: 2.5,
  QUSOUR: 2.5,
  FANAITESS: 2.5,
  MESSILA: 2.5,
  "MUBARAK AL KABIR": 2.5,
  "SABAH AL SALEM": 2.5,
  SABHAN: 2.5,
  WISTA: 2.5,

  // AHMADI
  "ABU HALIFA": 3.0,
  AHMADI: 3.0,
  DAHAR: 3.0,
  EQAILA: 3.0,
  "FAHAD AL AHMAD": 3.0,
  FAHAHEEL: 3.0,
  FINTAS: 3.0,
  HADIYA: 3.0,
  "JABER AL ALI": 3.0,
  MAHBOULA: 3.0,
  MANGAF: 3.0,
  "AL-RIQQA": 3.0,
  SABAHIYA: 3.0,
  "ALI SABAH SALEM": 4.0,

  // JAHRA
  NAEEM: 3.0,
  JAHRA: 3.0,
  NASEEM: 3.0,
  OYOUN: 3.0,
  QAIRAWAN: 3.0,
  QASR: 3.0,
  "SAAD - AL ABDULLAH": 3.0,
  SULAIBIYA: 3.0,
  TAIMA: 3.0,
  WAHA: 3.0,

  // OTHER AREAS
  "MINA ABDULLAH": 5.0,
  "SUAIBA PORT": 5.0,
  KHAIRAN: 8.0,
  "AL-JULAIAA": 8.0,
  BNAIDER: 8.0,
  NUWAISEEB: 10.0,
  WAFRA: 8.0,
  KABD: 7.0,
  MAGWA: 5.0,
  "SABAH AL AHMED": 6.0,
  ZOUR: 8.0,
};

// Updated Kuwait areas organized by governorate
const kuwaitAreas = {
  "AL-ASIMAH": [
    "ABDULLAH AL SALEM",
    "ADEILIYA",
    "BNEID AL QAR",
    "DAIYA",
    "DASMA",
    "DASMAN",
    "DOHA",
    "FAIHA",
    "GARNADA",
    "JABER AL AHMED",
    "KAIFAN",
    "KHALDIYA",
    "KUWAIT CITY",
    "MANSOURIYA",
    "MIRQAB",
    "NUZHA",
    "QADSIYA",
    "JIBLA",
    "QORTUBA",
    "RAWDA",
    "SALHIYA",
    "SHAMIYA",
    "SHARQ",
    "SHUWAIK LIVING AREA",
    "SHUWAIK INDUSTRIAL",
    "SHUWAIK EDUCATINAL",
    "SULAIBIKHAT",
    "WEST- SULAIBIKHAT",
    "SURRA",
    "YARMOUK",
  ],
  HAWALLY: [
    "AL-BIDEA",
    "BAYAN",
    "HAWALLY",
    "HATEEN",
    "JABRIYA",
    "MAIDAN HAWALLY",
    "MISHREF",
    "WEST MISHREF",
    "RUMATIYA",
    "SALAM",
    "SALMIYA",
    "SALWA",
    "SHAAB",
    "SHUHADA",
    "AI-SIDDEEQ",
    "ZAHRA",
  ],
  FARWANIYA: [
    "ABBASIYA",
    "ABDULLAH AL MUBARAK",
    "WEST ABDULLAH AL MUBARAK",
    "KHAITAN",
    "AIRPORT",
    "ANDALOUS",
    "AL- ARDIYA",
    "ARDIYA INDUSTRIAL",
    "ISHBILIYA",
    "AL-DAJEEJ",
    "FARWANIYA",
    "FIRDOUS",
    "JELEEB AL- SHUYOUKH",
    "OMARIYA",
    "RABIA",
    "AL-RAI",
    "RIGGAI",
    "REHAB",
    "SABAH AL NASER",
  ],
  "MUBARAK AL KABEER": [
    "ABU FATAIRA",
    "ABU AL HASANIYA",
    "ADAN",
    "AL-MASAYEL",
    "QURAIN",
    "QUSOUR",
    "FANAITESS",
    "MESSILA",
    "MUBARAK AL KABIR",
    "SABAH AL SALEM",
    "SABHAN",
    "WISTA",
  ],
  AHMADI: [
    "ABU HALIFA",
    "AHMADI",
    "DAHAR",
    "EQAILA",
    "FAHAD AL AHMAD",
    "FAHAHEEL",
    "FINTAS",
    "HADIYA",
    "JABER AL ALI",
    "MAHBOULA",
    "MANGAF",
    "AL-RIQQA",
    "SABAHIYA",
    "ALI SABAH SALEM",
  ],
  JAHRA: [
    "NAEEM",
    "JAHRA",
    "NASEEM",
    "OYOUN",
    "QAIRAWAN",
    "QASR",
    "SAAD - AL ABDULLAH",
    "SULAIBIYA",
    "TAIMA",
    "WAHA",
  ],
  "OTHER AREAS": [
    "MINA ABDULLAH",
    "SUAIBA PORT",
    "KHAIRAN",
    "AL-JULAIAA",
    "BNAIDER",
    "NUWAISEEB",
    "WAFRA",
    "KABD",
    "MAGWA",
    "SABAH AL AHMED",
    "ZOUR",
  ],
};

// Product data with detailed stock information
const defaultProducts = [
  // تيشيرتات تطريز with detailed stock
  {
    id: 1,
    name: " تصميم قمر بني هاشم",
    priceKids: 4.0,
    priceAdults: 5.5,
    images: {
      shortSleeveKids: "images/tshirt-1/kids-short-1.jpg",
      shortSleeveAdults: "images/tshirt-1/adults-short-1.jpg",
      longSleeveAdults: "images/tshirt-1/adults-long-1.jpg",
    },
    defaultImage: "images/tshirt-1/adults-short-1.jpg",
    category: "tshirts",
    description: "تيشيرت تطريز عالي الجودة",
    material: "قطن 100%",
    detailedStock: {
      shortSleeve: {
        kids: {
          "6M": 2,
          "1Y": 2,
          "2Y": 2,
          "3Y": 2,
          "4Y": 2,
          "5-6Y": 3,
          "7-8Y": 3,
          "9-10Y": 3,
          "11-12Y": 3,
        },
        adults: {
          S: 2,
          M: 2,
          L: 3,
          XL: 4,
          XXL: 4,
        },
      },
      longSleeve: {
        adults: {
          XS: 2,
          S: 2,
          XL: 2,
          XXL: 2,
        },
      },
    },
    colors: ["أسود"],
    note: "اختيار أكبر من مقاسكم المعتاد برقم واحد",
  },
  {
    id: 2,
    name: " تصميم يازينب",
    priceKids: 4.0,
    priceAdults: 5.5,
    images: {
      shortSleeveKids: "images/tshirt-2/kids-short-2.jpg",
      shortSleeveAdults: "images/tshirt-2/adults-short-2.jpg",
    },
    defaultImage: "images/tshirt-2/adults-short-2.jpg",
    category: "tshirts",
    description: "تيشيرت تطريز عالي الجودة",
    material: "قطن 100%",
    detailedStock: {
      shortSleeve: {
        kids: {
          "6M": 2,
          "1Y": 2,
          "2Y": 2,
          "3Y": 2,
          "4Y": 2,
          "5-6Y": 3,
          "7-8Y": 3,
          "9-10Y": 3,
          "11-12Y": 3,
        },
        adults: {
          S: 2,
          M: 2,
          L: 3,
          XL: 4,
          XXL: 4,
        },
      },
      longSleeve: {
        adults: {
          XS: 2,
          S: 2,
          XL: 2,
          XXL: 2,
        },
      },
    },
    colors: ["أسود"],
    note: "اختيار أكبر من مقاسكم المعتاد برقم واحد",
  },
  {
    id: 3,
    name: "ياحُسين",
    priceKids: 4.0,
    priceAdults: 5.5,
    images: {
      shortSleeveKids: "images/tshirt-3/kids-short-3.jpg",
      shortSleeveAdults: "images/tshirt-3/adults-short-3.jpg",
      longSleeveAdults: "images/tshirt-3/adults-long-3.jpg",
    },
    defaultImage: "images/tshirt-3/adults-short-3.jpg",
    category: "tshirts",
    description: "تيشيرت تطريز عالي الجودة",
    material: "قطن 100%",
    detailedStock: {
      shortSleeve: {
        kids: {
          "6M": 2,
          "1Y": 2,
          "2Y": 2,
          "3Y": 2,
          "4Y": 2,
          "5-6Y": 3,
          "7-8Y": 3,
          "9-10Y": 3,
          "11-12Y": 3,
        },
        adults: {
          S: 2,
          M: 2,
          L: 3,
          XL: 4,
          XXL: 4,
        },
      },
      longSleeve: {
        adults: {
          XS: 2,
          S: 2,
          XL: 2,
          XXL: 2,
        },
      },
    },
    colors: ["أسود"],
    note: "اختيار أكبر من مقاسكم المعتاد برقم واحد",
  },
  {
    id: 4,
    name: " تصميم قمر بني هاشم ٢٤ ",
    priceKids: 4.0,
    priceAdults: 5.5,
    images: {
      shortSleeveAdults: "images/tshirt-4/adults-short-4.jpg",
    },
    defaultImage: "images/tshirt-4/adults-short-4.jpg",
    category: "tshirts",
    description: "تيشيرت تطريز عالي الجودة",
    material: "قطن 100%",
    detailedStock: {
      shortSleeve: {
        kids: {
          "7-8Y": 2,
          "11-12Y": 2,
        },
        adults: {
          S: 1,
        },
      },
      longSleeve: {
        adults: {
          XS: 1,
          M: 1,
          L: 2,
          XL: 2,
          XXL: 2,
        },
      },
    },
    colors: ["أسود"],
    note: "اختيار أكبر من مقاسكم المعتاد برقم واحد",
  },

  {
    id: 5,
    name: " تصميم ياحُسين ٢٤ ",
    priceKids: 4.0,
    priceAdults: 5.5,
    images: {
      shortSleeveAdults: "images/tshirt-8/adults-short-8.jpg",
    },
    defaultImage: "images/tshirt-8/adults-short-8.jpg",
    category: "tshirts",
    description: "تيشيرت تطريز عالي الجودة",
    material: "قطن 100%",
    detailedStock: {
      shortSleeve: {
        kids: {
          "5-6Y": 1,
        },
      },
      longSleeve: {
        adults: {
          S: 1,
          L: 1,
          XL: 2,
        },
      },
    },
    colors: ["أسود"],
    note: "اختيار أكبر من مقاسكم المعتاد برقم واحد",
  },

  {
    id: 6,
    name: "تصميم يازينب ٢٤ ",
    priceKids: 4.0,
    priceAdults: 5.5,
    images: {
      shortSleeveAdults: "images/tshirt-9/adults-short-9.jpg",
    },
    defaultImage: "images/tshirt-9/adults-short-9.jpg",
    category: "tshirts",
    description: "تيشيرت تطريز عالي الجودة",
    material: "قطن 100%",
    detailedStock: {
      shortSleeve: {
        kids: {
          "1Y": 1,
        },
      },
      longSleeve: {
        adults: {
          L: 1,
          XL: 2,
          XXL: 2,
        },
      },
    },
    colors: ["أسود"],
    note: "اختيار أكبر من مقاسكم المعتاد برقم واحد",
  },
  {
    id: 11,
    name: " تصميم قمر بني هاشم ٢٣ ",
    priceKids: 4.0,
    priceAdults: 5.5,
    images: {
      shortSleeveAdults: "images/tshirt-10/adults-short-10.jpg",
    },
    defaultImage: "images/tshirt-10/adults-short-10.jpg",
    category: "tshirts",
    description: "تيشيرت تطريز عالي الجودة",
    material: "قطن 100%",
    detailedStock: {
      shortSleeve: {
        kids: {
          "14Y": 1,
        },
        adults: {
          L: 2,
          XL: 2,
        },
      },
    },
    colors: ["أسود"],
    note: "اختيار أكبر من مقاسكم المعتاد برقم واحد",
  },
  {
    id: 7,
    name: "'يا حُسين '٢٣",
    priceKids: 4.0,
    priceAdults: 5.5,
    images: {
      shortSleeveAdults: "images/tshirt-11/adults-short-11.jpg",
    },
    defaultImage: "images/tshirt-11/adults-short-11.jpg",
    category: "tshirts",
    description: "تيشيرت تطريز عالي الجودة",
    material: "قطن 100%",
    detailedStock: {
      shortSleeve: {
        kids: {
          "7-8Y": 1,
          "9-10Y": 2,
          "11-12Y": 1,
          "13Y": 1,
        },
      },
    },
    colors: ["أسود"],
    note: "اختيار أكبر من مقاسكم المعتاد برقم واحد",
  },
  {
    id: 8,
    name: "تصميم السادة",
    priceKids: 8.0,
    priceAdults: 10.0,
    images: {
      shortSleeveAdults: "images/tshirt-5/adults-short-5.jpg",
    },
    defaultImage: "images/tshirt-5/adults-short-5.jpg",
    category: "tshirts",
    description: "تيشيرت تطريز عالي الجودة",
    material: "قطن 100%",
    detailedStock: {
      shortSleeve: {
        kids: {
          "6M": 2,
          "1Y": 2,
          "2Y": 2,
          "3Y": 2,
          "4Y": 2,
          "5-6Y": 3,
          "7-8Y": 3,
          "9-10Y": 3,
          "11-12Y": 3,
        },
        adults: {
          S: 2,
          M: 2,
          L: 3,
          XL: 4,
          XXL: 4,
        },
      },
      longSleeve: {
        adults: {
          XS: 2,
          S: 2,
          XL: 2,
          XXL: 2,
        },
      },
    },
    colors: ["أسود"],
    note: "اختيار أكبر من مقاسكم المعتاد برقم واحد , غير جاهز للتوصيل من يومين الى ٤ ايام عمل لايوجد استبدال او استرجاع للتصاميم الخاصة",
  },
  {
    id: 9,
    name: " تصميم 313",
    priceKids: 8.0,
    priceAdults: 10.0,
    images: {
      shortSleeveAdults: "images/tshirt-6/adults-short-6.jpg",
    },
    defaultImage: "images/tshirt-6/adults-short-6.jpg",
    category: "tshirts",
    description: "تيشيرت تطريز عالي الجودة",
    material: "قطن 100%",
    detailedStock: {
      shortSleeve: {
        kids: {
          "6M": 2,
          "1Y": 2,
          "2Y": 2,
          "3Y": 2,
          "4Y": 2,
          "5-6Y": 3,
          "7-8Y": 3,
          "9-10Y": 3,
          "11-12Y": 3,
        },
        adults: {
          S: 2,
          M: 2,
          L: 3,
          XL: 4,
          XXL: 4,
        },
      },
      longSleeve: {
        adults: {
          XS: 2,
          S: 2,
          XL: 2,
          XXL: 2,
        },
      },
    },
    colors: ["أسود"],
    note: "اختيار أكبر من مقاسكم المعتاد برقم واحد , غير جاهز للتوصيل من يومين الى ٤ ايام عمل لايوجد استبدال او استرجاع للتصاميم الخاصة",
  },
  {
    id: 10,
    name: "خادم الحُسين ",
    priceKids: 8.0,
    priceAdults: 10.0,
    images: {
      shortSleeveAdults: "images/tshirt-7/adults-short-7.jpg",
    },
    defaultImage: "images/tshirt-7/adults-short-7.jpg",
    category: "tshirts",
    description: "تيشيرت تطريز عالي الجودة",
    material: "قطن 100%",
    detailedStock: {
      shortSleeve: {
        kids: {
          "6M": 2,
          "1Y": 2,
          "2Y": 2,
          "3Y": 2,
          "4Y": 2,
          "5-6Y": 3,
          "7-8Y": 3,
          "9-10Y": 3,
          "11-12Y": 3,
        },
        adults: {
          S: 2,
          M: 2,
          L: 3,
          XL: 4,
          XXL: 4,
        },
      },
      longSleeve: {
        adults: {
          XS: 2,
          S: 2,
          XL: 2,
          XXL: 2,
        },
      },
    },
    colors: ["أسود"],
    note: "اختيار أكبر من مقاسكم المعتاد برقم واحد , غير جاهز للتوصيل من يومين الى ٤ ايام عمل لايوجد استبدال او استرجاع للتصاميم الخاصة",
  },

  // حقيبة tote bag
  {
    id: 12,
    name: " وكل جمالك جميل",
    price: 5.5,
    defaultImage: "images/bag-1/bag-1.jpg",
    stock: 5,
    category: "bags",
    description: "حقيبة قماشية عملية وأنيقة",
    material: "قماش قطني عالي الجودة",
    dimensions: "29 × 24 سم",
    note: "فقط حقيبة الكبيرة بدون السجادة الصغيرة",
  },

  // سجادة صلاة صغيرة
  {
    id: 13,
    name: "جودك بسط أملي   ",
    price: 3.5,
    defaultImage: "images/prayer/prayer-1.jpg",
    stock: 1,
    category: "carpets",
    material: "   خام لينن ",
    dimensions: "  15 × 15 سم للسجادة و للحقيبة 9 × 8 سم",
    note: "طباعة الحقيبة من الخلف ",
  },
  {
    id: 14,
    name: "اللهم ارزقني شفاعة الحُسين 'طباعة'",
    price: 3.5,
    defaultImage: "images/prayer/prayer-2.jpg",
    stock: 6,
    category: "carpets",
    description: "سجادة صلاة صغيرة عالية الجودة",
    material: "   خام لينن ",
    dimensions: "  15 × 15 سم للسجادة و للحقيبة 9 × 8 سم",
    note: " التربة تباع بشكل منفصل ",
  },
  {
    id: 15,
    name: "اللهم ارزقني شفاعة الحُسين 'تطريز'",
    price: 3.5,
    defaultImage: "images/prayer/prayer-3.jpg",
    stock: 15,
    category: "carpets",
    description: "سجادة صلاة صغيرة عالية الجودة",
    material: "   خام لينن ",
    dimensions: "  15 × 15 سم للسجادة و للحقيبة 9 × 8 سم",
  },
  {
    id: 16,
    name: "تربة ",
    price: 1.0,
    defaultImage: "images/prayer/prayer-4.jpg",
    stock: 26,
    category: "carpets",
  },

  // مدالية - علاقة للسيارة
  {
    id: 17,
    name: "تطريز بأمانة موسى بن جعفر",
    price: 5.5,
    defaultImage: "images/medal/medal-1.jpg",
    stock: 4,
    category: "accessories",
    description: "مدالية أنيقة لتعليق في السيارة",
    dimensions: "4 insh",
  },
  {
    id: 18,
    name: "اني اريد اماناً يابن فاطمة",
    price: 2.5,
    defaultImage: "images/medal/medal-2.jpg",
    stock: 73,
    category: "accessories",
    description: "مدالية أنيقة لتعليق في السيارة",
  },
  {
    id: 19,
    name: "فاصل قران خشبي",
    price: 0.5,
    defaultImage: "images/medal/medal-3.jpg",
    stock: 15,
    category: "book",
    note: "يتم الاختيار بشكل عشوائي ",
  },
];

// Category names in Arabic
const categoryNames = {
  tshirts: "تيشيرتات تطريز",
  bags: "حقيبة Tote Bag",
  carpets: "سجادة صلاة صغيرة",
  stickers: "لاصق معدني",
  accessories: "مدالية - علاقة للسيارة",
  book: "فواصل كتب",
};

// Global variables
let products = [...defaultProducts];
const cart = [];
let currentOrderType = "cart";
let currentProductId = null;
let orderItems = [];
let currentCategory = "all";
const logoClickCount = 0;
const logoClickTimer = null;
const secretSequence = [];
let selectedOptions = {};
const isAdminLoggedIn = false;

// Initialize EmailJS
if (window.emailjs) {
  window.emailjs.init("F1D5UvXPwUpjYk_e5");
  console.log("✅ EmailJS initialized");
} else {
  console.warn("⚠️ EmailJS not available");
}

// Firebase functions
async function uploadDataToFirestore() {
  if (!isAdminLoggedIn) {
    showNotification("يجب تسجيل الدخول كمدير أولاً");
    return;
  }

  try {
    showNotification("جاري تحميل البيانات إلى Firebase...");

    // Upload products
    for (const product of defaultProducts) {
      await setDoc(doc(db, "products", product.id.toString()), product);
    }

    // Upload delivery prices
    await setDoc(doc(db, "deliveryPrices", "kuwait"), deliveryPrices);

    // Upload kuwait areas
    await setDoc(doc(db, "kuwaitAreas", "governorates"), kuwaitAreas);

    showNotification("✅ تم تحميل جميع البيانات بنجاح!");
    console.log("✅ All data uploaded to Firestore");
  } catch (error) {
    console.error("❌ Error uploading data:", error);
    showNotification("❌ حدث خطأ في تحميل البيانات");
  }
}

async function loadDataFromFirestore() {
  try {
    console.log("🔄 Loading data from Firestore...");

    // Load products
    const productsSnapshot = await getDocs(collection(db, "products"));
    if (!productsSnapshot.empty) {
      const firebaseProducts = [];
      productsSnapshot.forEach((doc) => {
        firebaseProducts.push({ id: doc.id, ...doc.data() });
      });
      products = firebaseProducts;
      console.log("✅ Products loaded from Firebase:", products.length);
    }
  } catch (error) {
    console.warn("⚠️ Could not load from Firebase, using default data:", error);
    products = [...defaultProducts];
  }
}

async function updateProductInFirestore(productId, updates) {
  try {
    await updateDoc(doc(db, "products", productId.toString()), updates);
    console.log("✅ Product updated in Firebase");
  } catch (error) {
    console.error("❌ Error updating product in Firebase:", error);
  }
}

async function saveOrderToFirestore(orderData) {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      createdAt: serverTimestamp(),
      status: "pending",
    });
    console.log("✅ Order saved to Firebase with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error saving order:", error);
    throw error;
  }
}

// Stock management functions for detailed inventory
function getTotalStock(product) {
  if (!product.detailedStock) {
    return product.stock || 0;
  }

  let total = 0;
  Object.values(product.detailedStock).forEach((sleeveType) => {
    Object.values(sleeveType).forEach((ageGroup) => {
      Object.values(ageGroup).forEach((stock) => {
        total += stock;
      });
    });
  });
  return total;
}

function getAvailableStock(product, sleeve, ageGroup, size) {
  if (!product.detailedStock) {
    return product.stock || 0;
  }

  if (sleeve && ageGroup && size) {
    return product.detailedStock[sleeve]?.[ageGroup]?.[size] || 0;
  }

  return getTotalStock(product);
}

async function updateDetailedStock(product, sleeve, ageGroup, size, quantity) {
  if (!product.detailedStock) {
    // For simple products (non-detailed stock)
    product.stock = Math.max(0, (product.stock || 0) - quantity);

    // Update in Firebase
    if (isAdminLoggedIn) {
      await updateProductInFirestore(product.id, { stock: product.stock });
    }
    return;
  }

  // For detailed stock products (t-shirts)
  if (product.detailedStock[sleeve]?.[ageGroup]?.[size] !== undefined) {
    product.detailedStock[sleeve][ageGroup][size] = Math.max(
      0,
      product.detailedStock[sleeve][ageGroup][size] - quantity
    );

    // Update in Firebase
    if (isAdminLoggedIn) {
      await updateProductInFirestore(product.id, {
        detailedStock: product.detailedStock,
      });
    }
  }
}

function getStockStatus(product) {
  const totalStock = getTotalStock(product);

  if (totalStock === 0) {
    return { class: "stock-out", text: "المخزون فرغ وسيصل قريبًا" };
  } else if (totalStock <= 5) {
    return { class: "stock-low", text: `متبقي ${totalStock} قطع فقط` };
  } else {
    return { class: "stock-available", text: `متوفر (${totalStock} قطع)` };
  }
}

function generateProducts() {
  console.log("🔄 Loading products...");
  const productsGrid = document.getElementById("productsGrid");

  if (!productsGrid) {
    console.error("❌ Products grid not found!");
    return;
  }

  productsGrid.innerHTML = "";
  const fragment = document.createDocumentFragment();

  const filteredProducts = products.filter(
    (product) =>
      currentCategory === "all" || product.category === currentCategory
  );

  filteredProducts.forEach((product) => {
    const stockStatus = getStockStatus(product);
    const totalStock = getTotalStock(product);
    const isOutOfStock = totalStock === 0;

    // Handle different pricing for t-shirts
    let priceDisplay = "";
    if (product.category === "tshirts") {
      priceDisplay = `
        <div class="product-price">
          <div>للأطفال: ${product.priceKids} دك</div>
          <div>للكبار: ${product.priceAdults} دك</div>
        </div>
      `;
    } else {
      priceDisplay = `<div class="product-price">${product.price} دك</div>`;
    }

    const productCard = document.createElement("div");
    productCard.className = `product-card ${
      isOutOfStock ? "out-of-stock" : ""
    }`;
    productCard.dataset.category = product.category;

    productCard.innerHTML = `
      <img src="${product.defaultImage || product.image}" alt="${
      product.name
    }" class="product-image" 
           onerror="this.src='/placeholder.svg?height=250&width=250'"
           loading="lazy">
      <div class="product-content">
        <div class="product-info">
          <div class="product-category">${categoryNames[product.category]}</div>
          <h3 class="product-title">${product.name}</h3>
          ${priceDisplay}
          <div class="stock-info ${stockStatus.class}">${stockStatus.text}</div>
        </div>
        <div class="product-buttons">
          <button class="btn btn-secondary add-to-cart-btn" data-product-id="${
            product.id
          }" ${isOutOfStock ? "disabled" : ""}>
            <i class="fas fa-cart-plus"></i> أضف للسلة
          </button>
          <button class="btn btn-primary buy-now-btn" data-product-id="${
            product.id
          }" ${isOutOfStock ? "disabled" : ""}>
            <i class="fas fa-shopping-bag"></i> اشتري الآن
          </button>
        </div>
      </div>
    `;

    const productImage = productCard.querySelector(".product-image");
    productImage.addEventListener("click", () =>
      showProductDetails(product.id)
    );

    const addToCartBtn = productCard.querySelector(".add-to-cart-btn");
    const buyNowBtn = productCard.querySelector(".buy-now-btn");

    if (addToCartBtn && !isOutOfStock) {
      addToCartBtn.addEventListener("click", () =>
        showProductDetails(product.id)
      );
    }

    if (buyNowBtn && !isOutOfStock) {
      buyNowBtn.addEventListener("click", () => showProductDetails(product.id));
    }

    fragment.appendChild(productCard);
  });

  productsGrid.appendChild(fragment);
  console.log("✅ Products loaded successfully!");
}

// Product Details Modal with dynamic image changing
function showProductDetails(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  // Create modal if it doesn't exist
  let modal = document.getElementById("productDetailsModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "productDetailsModal";
    modal.className = "product-details-modal";
    document.body.appendChild(modal);
  }

  // Handle different pricing for t-shirts
  let priceDisplay = "";
  if (product.category === "tshirts") {
    priceDisplay = `
      <div class="product-details-price">
        <div>للأطفال: ${product.priceKids} دك</div>
        <div>للكبار: ${product.priceAdults} دك</div>
      </div>
    `;
  } else {
    priceDisplay = `<div class="product-details-price">${product.price} دك</div>`;
  }

  // Build size options for t-shirts with detailed stock
  let sizeOptions = "";
  if (product.detailedStock) {
    sizeOptions = `
      <div class="option-group">
        <label class="option-label">نوع الكم:</label>
        <div class="option-buttons" id="sleeveButtons">
          ${
            product.detailedStock.shortSleeve
              ? '<button class="option-btn" data-option="sleeve" data-value="shortSleeve">كم قصير</button>'
              : ""
          }
          ${
            product.detailedStock.longSleeve
              ? '<button class="option-btn" data-option="sleeve" data-value="longSleeve">كم طويل</button>'
              : ""
          }
        </div>
      </div>
      <div class="option-group" id="ageGroup" style="display: none;">
        <label class="option-label">الفئة العمرية:</label>
        <div class="option-buttons" id="ageButtons">
          <!-- Will be populated based on sleeve selection -->
        </div>
      </div>
      <div class="option-group" id="sizeGroup" style="display: none;">
        <label class="option-label">المقاس:</label>
        <div class="option-buttons" id="sizeButtons">
          <!-- Will be populated based on age group selection -->
        </div>
      </div>
    `;
  }

  // Build color options
  let colorOptions = "";
  if (product.colors) {
    colorOptions = `
      <div class="option-group">
        <label class="option-label">اللون:</label>
        <div class="option-buttons">
          ${product.colors
            .map(
              (color) =>
                `<button class="option-btn" data-option="color" data-value="${color}">${color}</button>`
            )
            .join("")}
        </div>
      </div>
    `;
  }

  // Get max stock for quantity input
  const maxStock = product.detailedStock ? 1 : product.stock || 1;

  modal.innerHTML = `
    <div class="product-details-content">
      <span class="close" onclick="closeProductDetails()">×</span>
      <div class="product-details-header">
        <div class="product-details-image">
          <img id="productModalImage" src="${
            product.defaultImage || product.image
          }" alt="${
    product.name
  }" onerror="this.src='/placeholder.svg?height=300&width=300'">
        </div>
        <div class="product-details-info">
          <h2 class="product-details-title">${product.name}</h2>
          ${priceDisplay}
          <div class="product-details-description">
            ${
              product.description
                ? `<div class="detail-item">
              <span class="detail-label">الوصف:</span>
              <span class="detail-value">${product.description}</span>
            </div>`
                : ""
            }
            ${
              product.material
                ? `<div class="detail-item">
              <span class="detail-label">المادة:</span>
              <span class="detail-value">${product.material}</span>
            </div>`
                : ""
            }
            ${
              product.dimensions
                ? `<div class="detail-item"><span class="detail-label">الأبعاد:</span><span class="detail-value">${product.dimensions}</span></div>`
                : ""
            }
            ${
              product.note
                ? `<div class="detail-item"><span class="detail-label">ملاحظة:</span><span class="detail-value">${product.note}</span></div>`
                : ""
            }
          </div>
        </div>
      </div>
      
      <div class="product-options">
        ${sizeOptions}
        ${colorOptions}
        
        <div class="quantity-selector">
          <label class="option-label">الكمية:</label>
          <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
          <input type="number" class="quantity-input" id="productQuantity" value="1" min="1" max="${maxStock}">
          <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
        </div>
        
        <div id="stockInfo" class="stock-display" style="text-align: center; margin: 10px 0; font-weight: bold;">
          ${
            product.detailedStock
              ? "اختر المقاس لمعرفة الكمية المتاحة"
              : `متوفر: ${product.stock || 0} قطعة`
          }
        </div>
      </div>
      
      <div class="modal-actions">
        <button class="btn btn-secondary" onclick="addToCartFromModal(${
          product.id
        })">
          <i class="fas fa-cart-plus"></i> أضف للسلة
        </button>
        <button class="btn btn-primary" onclick="buyNowFromModal(${
          product.id
        })">
          <i class="fas fa-shopping-bag"></i> اشتري الآن
        </button>
      </div>
    </div>
  `;

  modal.style.display = "block";

  // Initialize selected options
  selectedOptions = {
    productId: product.id,
    quantity: 1,
  };

  // Add event listeners for options
  setupOptionListeners(product);

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProductDetails();
    }
  });
}

function setupOptionListeners(product) {
  // Option button listeners
  document.querySelectorAll(".option-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const option = btn.dataset.option;
      const value = btn.dataset.value;

      // Remove active class from siblings
      btn.parentElement.querySelectorAll(".option-btn").forEach((sibling) => {
        sibling.classList.remove("selected");
      });

      // Add active class to clicked button
      btn.classList.add("selected");

      // Store selection
      selectedOptions[option] = value;

      // Handle sleeve selection for t-shirts
      if (option === "sleeve" && product.detailedStock) {
        const ageGroup = document.getElementById("ageGroup");
        const ageButtons = document.getElementById("ageButtons");
        const sizeGroup = document.getElementById("sizeGroup");

        // Show available age groups for selected sleeve
        const availableAgeGroups = Object.keys(
          product.detailedStock[value] || {}
        );

        if (availableAgeGroups.length > 0) {
          ageButtons.innerHTML = availableAgeGroups
            .map(
              (age) =>
                `<button class="option-btn" data-option="ageGroup" data-value="${age}">${
                  age === "kids" ? "أطفال" : "كبار"
                }</button>`
            )
            .join("");

          // Add listeners to age group buttons
          ageButtons.querySelectorAll(".option-btn").forEach((ageBtn) => {
            ageBtn.addEventListener("click", () => {
              ageButtons.querySelectorAll(".option-btn").forEach((sibling) => {
                sibling.classList.remove("selected");
              });
              ageBtn.classList.add("selected");
              selectedOptions.ageGroup = ageBtn.dataset.value;

              // Show sizes for selected age group
              showSizesForAgeGroup(product, value, ageBtn.dataset.value);
              updateProductImage(product);
            });
          });

          ageGroup.style.display = "block";
          sizeGroup.style.display = "none";
          delete selectedOptions.ageGroup;
          delete selectedOptions.size;
        }
      }

      // Update image when color is selected
      if (option === "color") {
        updateProductImage(product);
      }
    });
  });

  // Quantity input listener
  const quantityInput = document.getElementById("productQuantity");
  if (quantityInput) {
    quantityInput.addEventListener("change", () => {
      selectedOptions.quantity = Number.parseInt(quantityInput.value) || 1;
    });
  }
}

function showSizesForAgeGroup(product, sleeve, ageGroup) {
  const sizeGroup = document.getElementById("sizeGroup");
  const sizeButtons = document.getElementById("sizeButtons");

  const sizes = product.detailedStock[sleeve]?.[ageGroup] || {};

  sizeButtons.innerHTML = Object.entries(sizes)
    .filter(([size, stock]) => stock > 0)
    .map(
      ([size, stock]) =>
        `<button class="option-btn" data-option="size" data-value="${size}" data-stock="${stock}">${size} (${stock})</button>`
    )
    .join("");

  // Add listeners to size buttons
  sizeButtons.querySelectorAll(".option-btn").forEach((sizeBtn) => {
    sizeBtn.addEventListener("click", () => {
      sizeButtons.querySelectorAll(".option-btn").forEach((sibling) => {
        sibling.classList.remove("selected");
      });
      sizeBtn.classList.add("selected");
      selectedOptions.size = sizeBtn.dataset.value;

      // Update max quantity and stock info
      const availableStock = Number.parseInt(sizeBtn.dataset.stock);
      const quantityInput = document.getElementById("productQuantity");
      const stockInfo = document.getElementById("stockInfo");

      if (quantityInput) {
        quantityInput.max = availableStock;
        quantityInput.value = Math.min(
          selectedOptions.quantity,
          availableStock
        );
        selectedOptions.quantity = Number.parseInt(quantityInput.value);
      }

      if (stockInfo) {
        stockInfo.textContent = `متوفر: ${availableStock} قطعة`;
        stockInfo.style.color = availableStock <= 2 ? "#d32f2f" : "#2e7d32";
      }
    });
  });

  sizeGroup.style.display = "block";
}

function updateProductImage(product) {
  const modalImage = document.getElementById("productModalImage");
  if (!modalImage || !product.images) return;

  const sleeve = selectedOptions.sleeve;
  const ageGroup = selectedOptions.ageGroup;

  let imageKey = "";
  if (sleeve === "shortSleeve" && ageGroup === "kids") {
    imageKey = "shortSleeveKids";
  } else if (sleeve === "shortSleeve" && ageGroup === "adults") {
    imageKey = "shortSleeveAdults";
  } else if (sleeve === "longSleeve" && ageGroup === "adults") {
    imageKey = "longSleeveAdults";
  }

  if (imageKey && product.images[imageKey]) {
    modalImage.src = product.images[imageKey];
  }
}

function changeQuantity(delta) {
  const quantityInput = document.getElementById("productQuantity");
  if (!quantityInput) return;

  const currentValue = Number.parseInt(quantityInput.value) || 1;
  const maxValue = Number.parseInt(quantityInput.max) || 1;
  const newValue = Math.max(1, Math.min(currentValue + delta, maxValue));

  quantityInput.value = newValue;
  selectedOptions.quantity = newValue;
}

function closeProductDetails() {
  const modal = document.getElementById("productDetailsModal");
  if (modal) {
    modal.style.display = "none";
  }
  selectedOptions = {};
}

function addToCartFromModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  // Validate required options
  if (!validateProductOptions(product)) return;

  // Check stock availability
  if (!checkStockAvailability(product)) return;

  // Create cart item with selected options
  const cartItem = createCartItemWithOptions(product);

  // Check if same item with same options already exists
  const existingItemIndex = cart.findIndex((item) => {
    return (
      item.id === cartItem.id &&
      item.selectedColor === cartItem.selectedColor &&
      item.selectedSize === cartItem.selectedSize &&
      item.selectedSleeve === cartItem.selectedSleeve &&
      item.selectedAgeGroup === cartItem.selectedAgeGroup
    );
  });

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += cartItem.quantity;
  } else {
    cart.push(cartItem);
  }

  updateCartUI();
  showNotification("تم إضافة المنتج للسلة");
  closeProductDetails();
}

function buyNowFromModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  // Validate required options
  if (!validateProductOptions(product)) return;

  // Check stock availability
  if (!checkStockAvailability(product)) return;

  // Create order item with selected options
  const orderItem = createCartItemWithOptions(product);

  currentOrderType = "single";
  currentProductId = productId;
  orderItems = [orderItem];
  closeProductDetails();
  showOrderForm();
}

function validateProductOptions(product) {
  // Check required options based on product type
  if (product.detailedStock) {
    if (!selectedOptions.sleeve) {
      showNotification("يرجى اختيار نوع الكم");
      return false;
    }
    if (!selectedOptions.ageGroup) {
      showNotification("يرجى اختيار الفئة العمرية");
      return false;
    }
    if (!selectedOptions.size) {
      showNotification("يرجى اختيار المقاس");
      return false;
    }
  }

  if (product.colors && !selectedOptions.color) {
    showNotification("يرجى اختيار اللون");
    return false;
  }

  return true;
}

function checkStockAvailability(product) {
  if (product.detailedStock) {
    const availableStock = getAvailableStock(
      product,
      selectedOptions.sleeve,
      selectedOptions.ageGroup,
      selectedOptions.size
    );

    if (availableStock < selectedOptions.quantity) {
      showNotification(`الكمية المتاحة: ${availableStock} قطعة فقط`);
      return false;
    }
  } else {
    // For simple products
    if ((product.stock || 0) < selectedOptions.quantity) {
      showNotification(`الكمية المتاحة: ${product.stock || 0} قطعة فقط`);
      return false;
    }
  }

  return true;
}

function createCartItemWithOptions(product) {
  const basePrice =
    product.category === "tshirts"
      ? selectedOptions.ageGroup === "kids"
        ? product.priceKids
        : product.priceAdults
      : product.price;

  return {
    ...product,
    price: basePrice,
    quantity: selectedOptions.quantity || 1,
    selectedColor: selectedOptions.color || null,
    selectedSize: selectedOptions.size || null,
    selectedSleeve: selectedOptions.sleeve || null,
    selectedAgeGroup: selectedOptions.ageGroup || null,
    displayName: `${product.name}${
      selectedOptions.color ? ` - ${selectedOptions.color}` : ""
    }${selectedOptions.size ? ` - ${selectedOptions.size}` : ""}${
      selectedOptions.sleeve
        ? ` - ${
            selectedOptions.sleeve === "shortSleeve" ? "كم قصير" : "كم طويل"
          }`
        : ""
    }${
      selectedOptions.ageGroup
        ? ` - ${selectedOptions.ageGroup === "kids" ? "أطفال" : "كبار"}`
        : ""
    }`,
  };
}

// Category filtering
function filterProducts(category) {
  currentCategory = category;

  // Update active button
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document
    .querySelector(`[data-category="${category}"]`)
    .classList.add("active");

  // Regenerate products to apply filter
  generateProducts();
}

// Cart functions
function addToCart(productId) {
  showProductDetails(productId);
}

function buyNow(productId) {
  showProductDetails(productId);
}

function updateCartUI() {
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartCount || !cartItems || !cartTotal) {
    console.error("❌ Cart UI elements not found");
    return;
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart-message">السلة فارغة</div>';
  } else {
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${item.defaultImage || item.image}" alt="${item.name}">
        <div style="flex: 1;">
          <div style="font-weight: 600;">${item.displayName || item.name}</div>
          <div style="color: #666;">الكمية: ${item.quantity}</div>
          <div style="color: #D32F2F; font-weight: bold;">${
            item.price * item.quantity
          } دك</div>
        </div>
        <button class="remove-from-cart" data-item-index="${index}"
                style="background: none; border: none; color: #D32F2F; cursor: pointer;">
          <i class="fas fa-trash"></i>
        </button>
      `;

      const removeBtn = cartItem.querySelector(".remove-from-cart");
      removeBtn.addEventListener("click", () => {
        const itemIndex = Number.parseInt(removeBtn.dataset.itemIndex);
        removeFromCart(itemIndex);
      });

      cartItems.appendChild(cartItem);
    });
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.innerHTML = `${total} دك<br><small style="color: #0c4141; font-weight: bold;">التوصيل: حسب المنطقة</small>`;
}

function removeFromCart(itemIndex) {
  cart.splice(itemIndex, 1);
  updateCartUI();
  showNotification("تم حذف المنتج من السلة");
}

function toggleCart(forceClose = null) {
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");

  if (!cartSidebar || !cartOverlay) {
    showNotification("خطأ في فتح السلة، تحققي من الصفحة");
    console.error("❌ Cart elements not found");
    return;
  }

  try {
    if (forceClose === false) {
      cartSidebar.classList.remove("open");
      cartOverlay.classList.remove("show");
    } else {
      cartSidebar.classList.toggle("open");
      cartOverlay.classList.toggle("show");
    }
  } catch (error) {
    showNotification("خطأ في فتح السلة، حاولي مرة أخرى");
    console.error("❌ Error toggling cart:", error);
  }
}

// Order form functions
function showOrderForm() {
  const modal = document.getElementById("orderModal");
  if (!modal) {
    console.error("❌ Order form not found");
    return;
  }

  if (currentOrderType === "cart") {
    orderItems = JSON.parse(JSON.stringify(cart));
  }

  updateOrderItemsUI();
  modal.style.display = "block";
  toggleCart(false);
}

function closeOrderForm() {
  const modal = document.getElementById("orderModal");
  if (modal) {
    modal.style.display = "none";
  }

  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.reset();
  }

  const elements = [
    "loading",
    "successMessage",
    "errorMessage",
    "areaDropdown",
  ];
  elements.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = "none";
    }
  });

  // Reset delivery cost display
  const deliveryPrice = document.getElementById("deliveryPrice");
  if (deliveryPrice) {
    deliveryPrice.textContent = "يرجى اختيار المنطقة";
  }
}

function updateOrderItemsUI() {
  const orderItemsList = document.getElementById("orderItemsList");
  if (!orderItemsList) return;

  if (orderItems.length === 0) {
    orderItemsList.innerHTML =
      '<div class="empty-cart-message">لا توجد منتجات في السلة</div>';
    return;
  }

  let html = "";
  let total = 0;

  orderItems.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    html += `
      <div class="order-item">
        <div class="order-item-details">
          <img src="${item.defaultImage || item.image}" alt="${
      item.name
    }" class="order-item-image">
          <div>
            <div class="order-item-name">${item.displayName || item.name}</div>
            <div class="order-item-quantity">الكمية: ${item.quantity}</div>
          </div>
        </div>
        <div class="order-item-price">${itemTotal} دك</div>
        <button class="order-item-remove" data-item-id="${item.id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
  });

  html += `
    <div class="order-item">
      <div>المجموع الكلي</div>
      <div>${total} دك</div>
    </div>
    <div class="order-item" style="border-top: 1px solid #E0E0E0; padding-top: 10px;">
      <div>التوصيل</div>
      <div style="color: #0c4141; font-weight: bold;" id="orderDeliveryPrice">حسب المنطقة</div>
    </div>
  `;

  orderItemsList.innerHTML = html;

  orderItemsList.querySelectorAll(".order-item-remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = Number.parseInt(e.target.closest("button").dataset.itemId);
      removeOrderItem(itemId);
    });
  });
}

function removeOrderItem(productId) {
  orderItems = orderItems.filter((item) => item.id !== productId);

  if (currentOrderType === "cart") {
    cart = cart.filter((item) => item.id !== productId);
    updateCartUI();
  }

  updateOrderItemsUI();

  if (orderItems.length === 0) {
    closeOrderForm();
    showNotification("تم إزالة جميع المنتجات من الطلب");
  }
}

// Area and delivery functions
function updateAreas() {
  const governorateSelect = document.getElementById("governorate");
  const areaInput = document.getElementById("area");
  const areaDropdown = document.getElementById("areaDropdown");
  const deliveryPrice = document.getElementById("deliveryPrice");
  const orderDeliveryPrice = document.getElementById("orderDeliveryPrice");

  if (!governorateSelect || !areaInput || !areaDropdown) return;

  const selectedGovernorate = governorateSelect.value;
  areaInput.value = "";
  areaDropdown.style.display = "none";

  if (selectedGovernorate && kuwaitAreas[selectedGovernorate]) {
    areaInput.placeholder = `اختر منطقة في ${selectedGovernorate}`;
  } else {
    areaInput.placeholder = "ابدأ بكتابة اسم المنطقة...";
    if (deliveryPrice) {
      deliveryPrice.textContent = "يرجى اختيار المنطقة";
    }
    if (orderDeliveryPrice) {
      orderDeliveryPrice.textContent = "حسب المنطقة";
    }
  }
}

function filterAreas(searchTerm) {
  const governorateSelect = document.getElementById("governorate");
  const selectedGovernorate = governorateSelect?.value;

  if (!selectedGovernorate || !kuwaitAreas[selectedGovernorate]) {
    return [];
  }

  const areas = kuwaitAreas[selectedGovernorate];
  if (!searchTerm || searchTerm.length < 1) {
    return [];
  }

  return areas.filter((area) =>
    area.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

function showAreaDropdown(filteredAreas) {
  const areaDropdown = document.getElementById("areaDropdown");
  if (!areaDropdown) return;

  if (filteredAreas.length === 0) {
    areaDropdown.style.display = "none";
    return;
  }

  areaDropdown.innerHTML = "";

  filteredAreas.forEach((area) => {
    const option = document.createElement("div");
    option.className = "area-option";

    // Show area name with delivery price
    const price = deliveryPrices[area];
    option.innerHTML = `
      <span>${area}</span>
      <span class="delivery-price-tag">${price} دك</span>
    `;

    option.addEventListener("click", () => selectArea(area));
    areaDropdown.appendChild(option);
  });

  areaDropdown.style.display = "block";
}

function selectArea(area) {
  const areaInput = document.getElementById("area");
  const areaDropdown = document.getElementById("areaDropdown");
  const deliveryPrice = document.getElementById("deliveryPrice");
  const orderDeliveryPrice = document.getElementById("orderDeliveryPrice");

  if (areaInput) areaInput.value = area;
  if (areaDropdown) areaDropdown.style.display = "none";

  // Update delivery price based on selected area
  const price = deliveryPrices[area];
  if (price && deliveryPrice) {
    deliveryPrice.textContent = `${price} دك`;
  }
  if (price && orderDeliveryPrice) {
    orderDeliveryPrice.textContent = `${price} دك`;
  }
}

// Utility functions
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    z-index: 1002;
    font-family: 'Cairo', sans-serif;
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function showFullImage(imageSrc, productName) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("fullImage");
  const captionText = document.getElementById("imageCaption");

  if (modal && modalImg && captionText) {
    modal.style.display = "block";
    modalImg.src = imageSrc;
    captionText.textContent = productName;
  }
}

function closeFullImage() {
  const modal = document.getElementById("imageModal");
  if (modal) {
    modal.style.display = "none";
  }
}

function openWhatsApp() {
  console.log("Opening WhatsApp...");
  const message = "مرحبًا، أريد الاستفسار عن منتجاتكم";
  const whatsappUrl = `https://wa.me/+96598088660?text=${encodeURIComponent(
    message
  )}`;

  try {
    window.open(whatsappUrl, "_blank");
    console.log("✅ WhatsApp opened successfully");
  } catch (error) {
    console.error("❌ Failed to open WhatsApp:", error);
    showNotification("خطأ في فتح واتساب");
  }
}

// Admin functions
function handleLogoClick() {
  logoClickCount++;
  if (logoClickTimer) {
    clearTimeout(logoClickTimer);
  }
  logoClickTimer = setTimeout(() => {
    logoClickCount = 0;
  }, 3000);

  if (logoClickCount >= 7) {
    logoClickCount = 0;
    showSecretMessage();
    showAdminPanel();
  }
}

function showSecretMessage() {
  const secretMessage = document.getElementById("secretMessage");
  if (secretMessage) {
    secretMessage.style.display = "block";
    setTimeout(() => {
      secretMessage.style.display = "none";
    }, 3000);
  }
}

function showAdminPanel() {
  const adminPanel = document.getElementById("adminPanel");
  const adminOverlay = document.getElementById("adminOverlay");

  if (!adminPanel || !adminOverlay) {
    console.error("❌ Admin panel elements not found");
    return;
  }

  adminPanel.style.display = "block";
  adminOverlay.style.display = "block";
  populateProductSelect();
}

function closeAdminPanel() {
  const adminPanel = document.getElementById("adminPanel");
  const adminOverlay = document.getElementById("adminOverlay");

  if (adminPanel) adminPanel.style.display = "none";
  if (adminOverlay) adminOverlay.style.display = "none";
}

function populateProductSelect() {
  const productSelect = document.getElementById("productSelect");
  if (!productSelect) return;

  productSelect.innerHTML = '<option value="">اختر المنتج</option>';

  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    const totalStock = getTotalStock(product);
    option.textContent = `${product.name} (${totalStock} قطعة)`;
    productSelect.appendChild(option);
  });
}

function checkAdminPassword() {
  const emailInput = document.getElementById("adminEmail");
  const passwordInput = document.getElementById("adminPassword");
  const email = emailInput?.value;
  const password = passwordInput?.value;

  // Simple admin check (in production, use proper authentication)
  if (email === "admin@alnourain.com" && password === "admin123") {
    document.getElementById("passwordSection").style.display = "none";
    document.getElementById("adminControls").style.display = "block";
    showNotification("تم تسجيل الدخول بنجاح! 🔓");
    updateStockStatus();
  } else {
    showNotification("البريد الإلكتروني أو كلمة المرور غير صحيحة! ❌");
    if (passwordInput) {
      passwordInput.style.borderColor = "#D32F2F";
      passwordInput.style.backgroundColor = "#FFEBEE";
      setTimeout(() => {
        passwordInput.style.borderColor = "#E0E0E0";
        passwordInput.style.backgroundColor = "white";
      }, 2000);
    }
  }
}

function updateSelectedProductStock() {
  const productSelect = document.getElementById("productSelect");
  const newStockInput = document.getElementById("newStock");

  if (!productSelect || !newStockInput) return;

  const productId = Number.parseInt(productSelect.value);
  const newStock = Number.parseInt(newStockInput.value);

  if (isNaN(productId) || isNaN(newStock) || newStock < 0) {
    showNotification("يرجى إدخال منتج وكمية صحيحة");
    return;
  }

  const product = products.find((p) => p.id === productId);
  if (!product) {
    showNotification("المنتج غير موجود");
    return;
  }

  if (product.detailedStock) {
    // For detailed stock products, distribute evenly
    const totalVariants = Object.values(product.detailedStock).reduce(
      (total, sleeveType) => {
        return (
          total +
          Object.values(sleeveType).reduce((subTotal, ageGroup) => {
            return subTotal + Object.keys(ageGroup).length;
          }, 0)
        );
      },
      0
    );

    const stockPerVariant = Math.floor(newStock / totalVariants);

    Object.keys(product.detailedStock).forEach((sleeve) => {
      Object.keys(product.detailedStock[sleeve]).forEach((ageGroup) => {
        Object.keys(product.detailedStock[sleeve][ageGroup]).forEach((size) => {
          product.detailedStock[sleeve][ageGroup][size] = stockPerVariant;
        });
      });
    });
  } else {
    product.stock = newStock;
  }

  generateProducts();
  populateProductSelect();
  productSelect.value = productId;
  updateStockStatus();
  newStockInput.value = "";
  showNotification(`تم تحديث مخزون ${product.name} إلى ${newStock} قطعة`);
}

function restockAllProducts(defaultStock = 10) {
  products.forEach((product) => {
    if (product.detailedStock) {
      // For detailed stock products, distribute evenly
      Object.keys(product.detailedStock).forEach((sleeve) => {
        Object.keys(product.detailedStock[sleeve]).forEach((ageGroup) => {
          Object.keys(product.detailedStock[sleeve][ageGroup]).forEach(
            (size) => {
              product.detailedStock[sleeve][ageGroup][size] = defaultStock;
            }
          );
        });
      });
    } else {
      product.stock = defaultStock;
    }
  });

  generateProducts();
  populateProductSelect();
  updateStockStatus();
  showNotification(`تم إعادة تعبئة جميع المنتجات إلى ${defaultStock} قطعة`);
}

function updateStockStatus() {
  const stockStatus = document.getElementById("stockStatus");
  if (!stockStatus) return;

  let html = "<strong>حالة المخزون الحالية:</strong><br><br>";

  products.forEach((product) => {
    const totalStock = getTotalStock(product);
    const status = getStockStatus(product);
    const color =
      status.class === "stock-out"
        ? "#D32F2F"
        : status.class === "stock-low"
        ? "#F57C00"
        : "#2E7D32";

    const price =
      product.category === "tshirts"
        ? `${product.priceKids}/${product.priceAdults}`
        : product.price;
    html += `<div style="margin-bottom: 8px;">
      <span style="font-weight: bold;">${product.name}:</span> 
      <span style="color: ${color};">${totalStock} قطعة - ${price} دك</span>
    </div>`;
  });

  stockStatus.innerHTML = html;
}

// Order submission
async function sendOrderViaEmailJS(orderData) {
  try {
    if (!window.emailjs) {
      throw new Error("EmailJS is not available");
    }

    const emailData = {
      to_email: "orders@alnourain.com",
      from_name: "متجر النورين",
      subject: `طلب جديد من ${orderData.customerName}`,
      customer_name: orderData.customerName,
      phone: orderData.phoneNumber,
      governorate: orderData.governorate,
      area: orderData.area,
      block: orderData.block,
      street: orderData.street,
      avenue: orderData.avenue,
      house: orderData.house,
      apartment: orderData.apartment,
      floor: orderData.floor,
      order_details: orderData.orderDetails,
      total: orderData.totalAmount,
      delivery_cost: orderData.deliveryCost,
      final_total: orderData.finalTotal,
      order_date: orderData.orderDate,
    };

    console.log("📤 Sending email via EmailJS:", emailData);

    const response = await window.emailjs.send(
      "service_pv6mbu9",
      "template_my1fbf6",
      emailData
    );

    console.log("✅ Email sent successfully:", response);
    return { success: true, response: "Order sent via EmailJS" };
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    return { success: false, error: error.message };
  }
}

async function handleOrderSubmit(e) {
  e.preventDefault();

  if (orderItems.length === 0) {
    showNotification("لا توجد منتجات في الطلب");
    return;
  }

  const loading = document.getElementById("loading");
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");

  if (loading) loading.style.display = "block";
  if (successMessage) successMessage.style.display = "none";
  if (errorMessage) errorMessage.style.display = "none";

  const formData = new FormData(e.target);
  const orderData = {};

  for (const [key, value] of formData.entries()) {
    orderData[key] = value;
  }

  let orderDetails = "";
  let total = 0;

  orderItems.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    orderDetails += `${item.displayName || item.name} × ${
      item.quantity
    } = ${itemTotal} دك\n`;
  });

  // Calculate delivery cost
  const deliveryCost = deliveryPrices[orderData.area] || 0;
  const finalTotal = total + deliveryCost;

  const finalOrderData = {
    customerName: orderData.customer_name,
    phoneNumber: orderData.phone_number,
    governorate: orderData.governorate,
    area: orderData.area,
    block: orderData.block,
    street: orderData.street,
    avenue: orderData.avenue || "غير محدد",
    house: orderData.house,
    apartment: orderData.apartment || "",
    floor: orderData.floor || "",
    orderDetails: orderDetails,
    totalAmount: total,
    deliveryCost: deliveryCost,
    finalTotal: finalTotal,
    orderDate: new Date().toLocaleString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  try {
    const result = await sendOrderViaEmailJS(finalOrderData);

    if (result.success) {
      console.log("✅ Order sent successfully:", result.response);
      if (loading) loading.style.display = "none";
      if (successMessage) {
        successMessage.style.display = "block";
        successMessage.innerHTML =
          "تم تسجيل طلبك بنجاح! سيتم التواصل معك قريباً.";
      }

      // Update detailed stock
      for (const orderItem of orderItems) {
        const product = products.find((p) => p.id === orderItem.id);
        if (product) {
          updateDetailedStock(
            product,
            orderItem.selectedSleeve,
            orderItem.selectedAgeGroup,
            orderItem.selectedSize,
            orderItem.quantity
          );
        }
      }

      generateProducts();

      if (currentOrderType === "cart") {
        cart = [];
        updateCartUI();
      }

      orderItems = [];

      setTimeout(() => {
        closeOrderForm();
      }, 3000);
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error("❌ Error sending order:", error.message);
    if (loading) loading.style.display = "none";
    if (errorMessage) {
      errorMessage.style.display = "block";
      errorMessage.innerHTML = `
        حدث خطأ في تسجيل الطلب: ${error.message || "خطأ غير معروف"}<br>
        يرجى المحاولة مرة أخرى أو التواصل معنا عبر الواتساب.
      `;
    }
  }
}

// Keyboard shortcuts
function handleKeyboardShortcuts(e) {
  const secretCode = ["KeyA", "KeyD", "KeyM", "KeyI", "KeyN"];
  secretSequence.push(e.code);

  if (secretSequence.length > 5) {
    secretSequence.shift();
  }

  if (
    secretSequence.length === 5 &&
    secretSequence.join("") === secretCode.join("")
  ) {
    secretSequence = [];
    showSecretMessage();
    showAdminPanel();
  }

  if (e.ctrlKey && e.shiftKey && e.code === "KeyL") {
    showAdminPanel();
  }
}

// Event listeners setup
function setupEventListeners() {
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("click", handleLogoClick);
  }

  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleCart();
    });
  }

  const cartOverlay = document.getElementById("cartOverlay");
  if (cartOverlay) {
    cartOverlay.addEventListener("click", (e) => {
      if (e.target === cartOverlay) {
        toggleCart(false);
      }
    });
  }

  // Category buttons
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      filterProducts(btn.dataset.category);
    });
  });

  const areaInput = document.getElementById("area");
  if (areaInput) {
    areaInput.addEventListener("input", function () {
      const searchTerm = this.value;
      const filteredAreas = filterAreas(searchTerm);
      showAreaDropdown(filteredAreas);
    });

    document.addEventListener("click", (e) => {
      const areaDropdown = document.getElementById("areaDropdown");
      if (
        areaDropdown &&
        !areaInput.contains(e.target) &&
        !areaDropdown.contains(e.target)
      ) {
        areaDropdown.style.display = "none";
      }
    });
  }

  const passwordInput = document.getElementById("adminPassword");
  if (passwordInput) {
    passwordInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        checkAdminPassword();
      }
    });
  }

  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", handleOrderSubmit);
  }

  window.addEventListener("click", (event) => {
    const modal = document.getElementById("orderModal");
    if (event.target === modal) {
      closeOrderForm();
    }
  });

  document.addEventListener("keydown", handleKeyboardShortcuts);

  const imageModal = document.getElementById("imageModal");
  if (imageModal) {
    imageModal.addEventListener("click", (event) => {
      if (event.target === imageModal) {
        closeFullImage();
      }
    });
  }
}

// Global function assignments
window.toggleCart = toggleCart;
window.openWhatsApp = openWhatsApp;
window.showOrderForm = showOrderForm;
window.closeOrderForm = closeOrderForm;
window.updateAreas = updateAreas;
window.checkAdminPassword = checkAdminPassword;
window.updateSelectedProductStock = updateSelectedProductStock;
window.restockAllProducts = restockAllProducts;
window.closeAdminPanel = closeAdminPanel;
window.closeFullImage = closeFullImage;
window.closeProductDetails = closeProductDetails;
window.addToCartFromModal = addToCartFromModal;
window.buyNowFromModal = buyNowFromModal;
window.changeQuantity = changeQuantity;

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Initializing Al-Nourain store...");

  generateProducts();
  setupEventListeners();

  console.log("🎉 Al-Nourain store initialized successfully!");
});

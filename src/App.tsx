import React, { useState, useEffect } from 'react';
import './App.css';

// কাস্টম শৈল্পিক ও পবিত্র SVG প্রতীকসমূহ
const Icons = {
  Om: () => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="bold" fill="currentColor">ॐ</text>
    </svg>
  ),
  Gada: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="6" r="4" fill="currentColor" fillOpacity="0.25" />
      <path d="M13 9L4 18" />
      <path d="M3 21l3-3" />
      <path d="M18 4l2 2" />
      <path d="M14 8l2 2" />
    </svg>
  ),
  CheckCircle: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  QrCode: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Sparkles: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  Award: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  )
};

interface SevaTier {
  id: string;
  bengaliName: string;
  subTitle: string;
  amount: number;
  popular?: boolean;
  desc: string;
  benefits: string[];
  icon: string;
  badge?: string;
}

const SEVA_TIERS: SevaTier[] = [
  {
    id: 'brick',
    bengaliName: 'এক পবিত্র রামশিলা দান',
    subTitle: 'পবিত্র গর্ভগৃহের ভিত্তিপ্রস্তর সেবা',
    amount: 1100,
    icon: '🧱',
    desc: 'গর্ভগৃহের মূল ভিত্তির জন্য "শ্রী রাম" অঙ্কিত একটি পবিত্র পুণ্য শিলা উৎসর্গ করুন।',
    benefits: [
      'মন্দিরের ডিজিটাল সংগ্রহ নথিতে ভক্তের নাম চিরস্মরণীয়',
      'ডাকযোগে গৃহদ্বারে পবিত্র চরণামৃত ও মহাপ্রসাদ কিট',
      'শ্রী হনুমান সিদ্ধ রক্ষাসূত্র ও বিশেষ আশীর্বাদ পত্র'
    ],
  },
  {
    id: 'stambh',
    bengaliName: 'দিব্য স্তম্ভ সেবা',
    subTitle: 'সভা মণ্ডপের খোদাইকৃত পাষাণ স্তম্ভ',
    amount: 5100,
    popular: true,
    badge: 'সর্বাধিক আশীর্বাদধন্য ও জনপ্রিয়',
    icon: '🏛️',
    desc: 'রাজস্থানের গোলাপি পাথরে খোদাই করা মন্দিরের মূল সভা মণ্ডপের ভারবাহী স্তম্ভ নির্মাণ সেবা।',
    benefits: [
      'পাষাণ ফলকে স্থায়ীভাবে ভক্ত ও পরিবারের নাম খোদাই',
      'প্রাণ প্রতিষ্ঠা মহোৎসবে সপরিবারে বিশেষ ভিআইপি দর্শন পাস',
      'রৌপ্য খচিত শ্রী হনুমান চালীসা লকেট ও বিশেষ প্রসাদী ভস্ম',
      'আয়কর আইনের 80G ধারায় ৫০% ট্যাক্স ছাড়ের রসিদ'
    ],
  },
  {
    id: 'dhwaja',
    bengaliName: 'স্বর্ণ কলশ ও ধর্মধ্বজা সেবা',
    subTitle: '৫১ ফুট উচ্চ শিখর শীর্ষ মহাদান',
    amount: 11000,
    icon: '🚩',
    desc: 'মন্দিরের চূড়ায় ৫১ ফুট উচ্চতায় স্বর্ণমণ্ডিত পবিত্র কলশ এবং জাফরানি ধর্মধ্বজা স্থাপন।',
    benefits: [
      'বার্ষিক হনুমান জয়ন্তী ও মহাযজ্ঞে আজীবন সংকল্প পাঠ',
      'পিতৃপুরুষ ও পরিবারের নাম প্রবেশদ্বারের মূল ফলকে স্বর্ণাক্ষরে লিখিত',
      'পিতলের সুন্দর খোদাইকৃত শ্রী হনুমান বিগ্রহ স্মারক উপহার',
      'সকল বৈদিক পূজার বিশেষ লাইভ স্ট্রিমিং ও আশীর্বাদ লিংক'
    ],
  },
  {
    id: 'garbhagriha',
    bengaliName: 'মহাযজ্ঞ মুখ্য যজমান সেবা',
    subTitle: 'সর্বোচ্চ পুণ্যময় প্রধান পৃষ্ঠপোষকতা',
    amount: 21000,
    icon: '👑',
    desc: 'শ্রী বিগ্রহের গর্ভগৃহ, মার্বেল বেদী ও ৭ দিনব্যাপী ঐতিহাসিক প্রাণ প্রতিষ্ঠা যজ্ঞের মুখ্য যজমানপদ।',
    benefits: [
      '৭ দিনের প্রাণ প্রতিষ্ঠা মহাযজ্ঞে প্রধান যজমান আসনে উপবেশনের অধিকার',
      'গর্ভগৃহের অভ্যন্তরীণ মার্বেল দেওয়ালের সোনার অক্ষরে কুলপরিচয়ের ফলক',
      'পূজ্য মহন্ত ও পীঠাধীশ্বরের হস্তস্পর্শিত রৌপ্য গদা ও পুণ্য আশীর্বাদ',
      'মন্দির ট্রাস্টের আজীবন সম্মানিত সদস্যপদ ও আজীবন সেবা সংকল্প'
    ],
  }
];

const INITIAL_DONORS = [
  { name: 'শুভ্রাংশু ও অনিন্দিতা চ্যাটার্জী', city: 'কলকাতা, পশ্চিমবঙ্গ', amount: 11000, time: '২ মিনিট আগে', seva: 'স্বর্ণ কলশ সেবা' },
  { name: 'দেবাশীষ মুখোপাধ্যায়', city: 'শিলিগুড়ি, উত্তরবঙ্গ', amount: 5100, time: '৫ মিনিট আগে', seva: 'দিব্য স্তম্ভ সেবা' },
  { name: 'কমলা রায় ও পরিবার', city: 'হাওড়া, পশ্চিমবঙ্গ', amount: 2100, time: '৯ মিনিট আগে', seva: 'পবিত্র শিলা সেবা' },
  { name: 'ড. প্রীতম সেনগুপ্ত', city: 'বর্ধমান / লন্ডন', amount: 21000, time: '১৫ মিনিট আগে', seva: 'মুখ্য যজমান সেবা' },
  { name: 'সন্দীপন ভট্টাচার্য', city: 'দুর্গাপুর', amount: 1100, time: '২২ মিনিট আগে', seva: 'রামশিলা সেবা' },
  { name: 'অরিন্দম ও পায়েল ঘোষ', city: 'মেদিনীপুর', amount: 5100, time: '৩০ মিনিট আগে', seva: 'দিব্য স্তম্ভ সেবা' }
];

export default function App() {
  const [selectedTier, setSelectedTier] = useState<number>(5100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [donorGotra, setDonorGotra] = useState<string>('');
  const [donorCity, setDonorCity] = useState<string>('');
  const [panNumber, setPanNumber] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'upi' | 'card' | 'bank'>('upi');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [recentDonors, setRecentDonors] = useState(INITIAL_DONORS);
  const [targetRaised, setTargetRaised] = useState<number>(3845000);
  const goalTarget = 5100000;
  
  // স্ক্রল স্টেট ট্র্যাকিং (উপরে/নিচে স্ক্রল শনাক্তকরণ ও প্রগ্রেস বার)
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  // দ্রুত নির্বাচনের অঙ্কসমূহ
  const quickAmounts = [501, 1100, 2100, 5100, 11000, 21000];

  // স্ক্রল ডিরেকশন ও প্রগ্রেস ট্র্যাকার ইফেক্ট
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setHasScrolled(currentScrollY > 60);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer দ্বারা স্ক্রল আপ/ডাউন হওয়ার সাথে সাথে সেকশন ট্রানজিশন
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.12
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          // ব্যবহারকারী উপরে বা নিচে স্ক্রল করে সেকশনটি অতিক্রম করলে ট্রানজিশন প্রতিক্রিয়া
          if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove('in-view');
          }
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal, .reveal-child');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // সামাজিক প্রমাণ ও সাম্প্রতিক ভক্ত তালিকা লাইভ আপডেট
  useEffect(() => {
    const timer = setInterval(() => {
      const names = ['সৌমেন ব্যানার্জী', 'কৌশিক চক্রবর্তী', 'সুস্মিতা মজুমদার', 'তন্ময় দত্ত', 'শুভমিত্রা বোস', 'দীপক সিংহ রায়'];
      const cities = ['কলকাতা', 'আসানসোল', 'বাঁকুড়া', 'মালদা', 'জলপাইগুড়ি', 'রানাঘাট', 'ব্যাঙ্গালোর'];
      const randomAmount = [1100, 2100, 5100, 11000][Math.floor(Math.random() * 4)];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];

      const newDonor = {
        name: randomName,
        city: randomCity,
        amount: randomAmount,
        time: 'এইমাত্র',
        seva: randomAmount >= 11000 ? 'স্বর্ণ কলশ সেবা' : randomAmount >= 5100 ? 'দিব্য স্তম্ভ সেবা' : 'পবিত্র শিলা সেবা'
      };

      setRecentDonors(prev => [newDonor, ...prev.slice(0, 7)]);
      setTargetRaised(prev => prev + randomAmount);
    }, 16000);

    return () => clearInterval(timer);
  }, []);

  const currentAmount = customAmount ? parseInt(customAmount, 10) || 0 : selectedTier;
  const upiId = "ramrajya.mandir@sbi";

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText(upiId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAmount || currentAmount < 11) {
      alert("অনুগ্রহ করে একটি বৈধ অনুদানের অঙ্ক লিখুন বা নির্বাচন করুন (নূন্যতম ₹১১)");
      return;
    }
    if (!donorName) {
      alert("পূজার সংকল্পে আপনার নাম পাঠের জন্য অনুগ্রহ করে আপনার শুভ নাম লিখুন।");
      return;
    }
    setShowSuccessModal(true);
    setRecentDonors(prev => [
      {
        name: donorName + (donorCity ? ` (${donorCity})` : ''),
        city: donorCity || 'শ্রদ্ধাবান ভক্ত',
        amount: currentAmount,
        time: 'এইমাত্র',
        seva: currentAmount >= 21000 ? 'মহাযজ্ঞ মুখ্য যজমান' : currentAmount >= 5100 ? 'দিব্য স্তম্ভ সেবা' : 'পবিত্র রামশিলা'
      },
      ...prev.slice(0, 7)
    ]);
    setTargetRaised(prev => prev + currentAmount);
  };

  const percentProgress = Math.min(100, Math.round((targetRaised / goalTarget) * 100));

  return (
    <div className={`temple-app scroll-${scrollDirection}`}>
      {/* গ্লোবাল স্ক্রলিং প্রগ্রেস বার */}
      <div 
        className="scroll-progress-line" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* শীর্ষ পবিত্র শ্লোক ও তথ্য বার */}
      <div className="top-chant-bar">
        <div className="marquee-content">
          <span>🚩 ॥ ওঁ শ্রী হনুমতে নমঃ ॥ 🚩</span>
          <span>শ্রী সংকটমোচন মহাবলী হনুমানজির ঐতিহাসিক মহা ধাম নির্মাণ যজ্ঞ</span>
          <span>🚩 মন্দিরের পবিত্র ভিত্তিশিলায় আপনার ও আপনার পরিবারের পুণ্য নাম চিরকালের জন্য যুক্ত করুন 🚩</span>
          <span>॥ অতুলিতবলধামং হেমশৈলাভদেহম্ দনুজবনকৃশানুং জ্ঞানিনামগ্রগণ্যম্ ॥</span>
          <span>🚩 আয়কর আইন 80G এর অধীনে ৫০% আয়কর ছাড়ের সুবিধা উপলব্ধ 🚩</span>
        </div>
      </div>

      {/* প্রধান নেভিগেশন বার - স্ক্রল ডাউন/আপ ইন্টারঅ্যাকশন সংবলিত */}
      <header className={`navbar ${hasScrolled ? 'scrolled-nav' : ''} ${scrollDirection === 'down' && hasScrolled ? 'nav-hidden' : ''}`}>
        <div className="nav-container">
          <div className="brand">
            <div className="brand-symbol">
              <span className="shree-symbol">ॐ</span>
            </div>
            <div className="brand-text">
              <span className="hindi-title">শ্রী হনুমান মন্দির নির্মাণ সেবা</span>
              <span className="eng-sub">শ্যামসুন্দরপুর, পূর্ব বর্ধমান, ৭১৩১৪১</span>
            </div>
          </div>

          <div className="nav-links">
            <a href="#about-project">মহৎ প্রকল্প</a>
            <a href="#seva-options">সেবা ও সংকল্প</a>
            <a href="#temple-architecture">মন্দির রূপরেখা</a>
            <a href="#testimonials">ভক্তবাণী</a>
            <a href="#donate-now" className="cta-header-btn">
              <span>দান করুন 🚩</span>
            </a>
          </div>
        </div>
      </header>

      {/* হিরো সেকশন */}
      <section className="hero-section scroll-reveal in-view">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="sacred-badge reveal-child">
            <Icons.Sparkles />
            <span>শ্যামসুন্দরপুর, পূর্ব বর্ধমান (৭১৩১৪১) • মহা ধাম নির্মাণ ২০২৬-২০২৭</span>
          </div>

          <h1 className="hero-headline reveal-child">
            শ্রী সংকটমোচন হনুমানজির <br />
            <span className="gold-highlight">ঐতিহাসিক ও দিব্য ধাম নির্মাণ</span>
          </h1>

          <p className="hero-shloka reveal-child">
            “কবন সো কাজ কঠিন জগ মাহীঁ । জো নহিঁ হোত তাত তুম্হ পাহীঁ ॥”
          </p>

          <p className="hero-subtext reveal-child">
            সেই পরিবার ও বংশই পরম সৌভাগ্যবান, যাদের নাম ও পুণ্য সংকল্প মন্দিরের ভিত্তিশিলা ও ধর্মধ্বজায় চিরকালের জন্য অমর হয়ে থাকে। আসুন, কলিযুগের জাগ্রত দেবতা পরম ভক্ত শ্রী হনুমানজির এই মহাপুণ্যময় ধাম নির্মাণে আপনার সামর্থ্য অনুযায়ী ভক্তিপূর্ণ অর্থদান করুন।
          </p>

          <div className="hero-action-row reveal-child">
            <a href="#donate-now" className="primary-glow-btn">
              <span className="btn-inner">
                <Icons.Gada />
                <span>সংকল্প নিন ও দান করুন (অর্থ সমর্পণ)</span>
              </span>
            </a>
            <a href="#seva-options" className="secondary-outline-btn">
              <span>সেবা তালিকাসমূহ দেখুন</span>
            </a>
          </div>

          {/* সামাজিক প্রমাণ ও পরিসংখ্যান */}
          <div className="hero-stats-row reveal-child">
            <div className="stat-card">
              <span className="stat-number">৪,২৮০+</span>
              <span className="stat-label">নিবেদিতপ্রাণ রামভক্ত</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">₹{(targetRaised / 100000).toFixed(2)} লক্ষ</span>
              <span className="stat-label">সংগৃহীত পুণ্য অনুদান</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">৫১ ফুট</span>
              <span className="stat-label">স্বর্ণ শিখর চূড়া</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">১০০% স্বচ্ছ</span>
              <span className="stat-label">সরকারি নথিভুক্ত ট্রাস্ট</span>
            </div>
          </div>
        </div>
      </section>

      {/* তহবিল সংগ্রহ প্রগতি ও জরুরি বার্তা */}
      <section className="progress-section scroll-reveal">
        <div className="section-container">
          <div className="progress-card reveal-child">
            <div className="progress-header">
              <div>
                <span className="progress-phase-tag">প্রথম পর্যায় : মূল ভিত্তি ও পাষাণ স্তম্ভ গাঁথনি</span>
                <h3 className="progress-title">মন্দির নির্মাণ তহবিল প্রগতি (Fundraising Progress)</h3>
              </div>
              <div className="progress-figures">
                <span className="current-raised">₹{targetRaised.toLocaleString('en-IN')}</span>
                <span className="target-goal">/ নির্ধারিত লক্ষ্য: ₹{goalTarget.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${percentProgress}%` }}>
                <span className="bar-glow-dot"></span>
              </div>
            </div>

            <div className="progress-footer-info">
              <span>🚀 <strong>{percentProgress}% লক্ষ্য সম্পন্ন</strong> (Fund Target Reached)</span>
              <span>⏳ <strong>মাত্র ২৭ দিন বাকি</strong> - শুভ প্রথম শিলাস্থাপন মুহূর্ত</span>
              <span>🔒 আয়কর ধারা 80G এর অধীনে ৫০% ট্যাক্স ছাড়ের সুবিধা</span>
            </div>
          </div>
        </div>
      </section>

      {/* কেন দান করবেন - আধ্যাত্মিক প্রেরণা */}
      <section id="about-project" className="why-section scroll-reveal">
        <div className="section-container">
          <div className="section-heading-center reveal-child">
            <span className="sub-badge">ধর্মো রক্ষতি রক্ষিতঃ</span>
            <h2>মন্দির নির্মাণে অংশ নেওয়া কেন পরম পুণ্যময়?</h2>
            <p>শাস্ত্র অনুসারে, ভগবানের আলয় বা মন্দির নির্মাণে এক অঞ্জলি ধূলিকণা বা একটি মুদ্রাদানও বংশপরম্পরায় অনন্ত কোটি গুণ পুণ্যফল প্রদান করে।</p>
          </div>

          <div className="benefit-grid">
            <div className="benefit-card reveal-child">
              <div className="benefit-icon-box">🏛️</div>
              <h3>বংশ পরম্পরায় অক্ষয় কীর্তি</h3>
              <p>আপনার ও আপনার পূর্বপুরুষদের নাম মন্দিরের শ্বেতপাথর ফলকে স্থায়ীভাবে খোদাই থাকবে, যা পরিবারে বংশবৃদ্ধি ও চিরন্তন কল্যাণ বয়ে আনে।</p>
            </div>
            <div className="benefit-card highlighted reveal-child">
              <div className="benefit-icon-box">🕉️</div>
              <h3>সকল সংকটমুক্তি ও দিব্য সুরক্ষা</h3>
              <p>মহাবলী হনুমানজির ছত্রছায়ায় আপনার পরিবার সকল রোগ, ব্যাধি, ভয়, শনির কুপ্রভাব ও বাস্তুদোষ থেকে আজীবন সুরক্ষিত থাকবে।</p>
            </div>
            <div className="benefit-card reveal-child">
              <div className="benefit-icon-box">📜</div>
              <h3>নিত্য আরতি ও মহাযজ্ঞে নামোচ্চারণ</h3>
              <p>মন্দিরে আয়োজিত প্রতি মঙ্গলবার ও শনিবারের বিশেষ সিঁদুর লেপন ও মারুতি হোমে আপনার নাম ও গোত্রের বিশেষ সংকল্প গ্রহণ করা হবে।</p>
            </div>
            <div className="benefit-card reveal-child">
              <div className="benefit-icon-box">📦</div>
              <h3>পবিত্র মহাপ্রসাদ গৃহদ্বারে প্রেরণ</h3>
              <p>ভূমিপূজন ও প্রাণ প্রতিষ্ঠার পর মন্ত্রপূত শ্রী হনুমান রক্ষাসূত্র, পবিত্র ভস্ম, সিঁদুর ও মহাপ্রসাদ কিট স্পিড পোস্টে আপনার বাড়িতে পাঠানো হবে।</p>
            </div>
          </div>
        </div>
      </section>

      {/* স্থাপত্য রূপরেখা */}
      <section id="temple-architecture" className="arch-section scroll-reveal">
        <div className="section-container">
          <div className="arch-layout">
            <div className="arch-visual reveal-child">
              <div className="mock-temple-art">
                <div className="sun-aura"></div>
                <div className="mandir-silhouette">
                  <div className="shikhar">
                    <span className="dhwaja-flag">🚩</span>
                    <span className="kalash">⚜️</span>
                  </div>
                  <div className="mandap-pillars">
                    <span></span><span></span><span></span><span></span>
                  </div>
                  <div className="garbha-glow">
                    <span className="murti-emoji">🕉️</span>
                  </div>
                </div>
                <div className="floating-caption">
                  <span>প্রস্তাবিত রূপরেখা • বংশী পাহাড়পুরের গোলাপি বেলেপাথরের কাজ</span>
                </div>
              </div>
            </div>

            <div className="arch-details reveal-child">
              <span className="sub-badge">দিব্য স্থাপত্য শৈলী</span>
              <h2>নাগর শৈলীর অনন্য সনাতন মন্দির চত্বর</h2>
              <p>
                এই মন্দির আগামী ১০০০ বছরেরও বেশি সময় ধরে সনাতন ধর্মের বিজয়কেতু তুলে ধরবে। রাজস্থানের বিখ্যাত নকশাদার গোলাপি পাথর দিয়ে সম্পূর্ণ লৌহমুক্ত স্থাপত্যে এটি নির্মিত হচ্ছে।
              </p>

              <ul className="arch-features-list">
                <li>
                  <Icons.CheckCircle />
                  <div>
                    <strong>৫১ ফুট উচ্চ স্বর্ণমণ্ডিত প্রধান শিখর:</strong> বহু দূর থেকেই ভক্তরা প্রভুর স্বর্ণচূড়া ও রক্তিম ধর্মধ্বজা দর্শন করতে পারবেন।
                  </div>
                </li>
                <li>
                  <Icons.CheckCircle />
                  <div>
                    <strong>১০৮টি অপূর্ব খোদাইকৃত পাষাণ স্তম্ভ:</strong> প্রতিটি স্তম্ভে রামায়ণের বিভিন্ন ভক্তিময় অধ্যায় জীবন্তভাবে চিত্রায়িত থাকবে।
                  </div>
                </li>
                <li>
                  <Icons.CheckCircle />
                  <div>
                    <strong>বিশাল সৎসঙ্গ ও ধ্যানমণ্ডপ:</strong> দেড় হাজারেরও বেশি ভক্ত একত্রে বসে সুন্দরকাণ্ড ও হনুমান চালীসা পাঠের সুযোগ পাবেন।
                  </div>
                </li>
                <li>
                  <Icons.CheckCircle />
                  <div>
                    <strong>নিত্য অন্নক্ষেত্র (বিনামূল্যে মহাপ্রসাদ ভাণ্ডারা):</strong> প্রতিদিন শত শত ভক্ত, সাধুসন্ত ও দীনদুঃখীদের মাঝে অন্নদান সেবা।
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* সেবা বিকল্প / অনুদান স্তর */}
      <section id="seva-options" className="tiers-section scroll-reveal">
        <div className="section-container">
          <div className="section-heading-center reveal-child">
            <span className="sub-badge">সেবা ও পুণ্য সংকল্প বিভাগ</span>
            <h2>আপনার সামর্থ্য অনুযায়ী সেবা নির্বাচন করুন</h2>
            <p>প্রভু হনুমানজি ভক্তির কাঙাল। কায়মনোবাক্যে এক কণা দানও মেরু পর্বতের ন্যায় মহিমান্বিত।</p>
          </div>

          <div className="tiers-grid">
            {SEVA_TIERS.map((tier) => {
              const isSelected = selectedTier === tier.amount && !customAmount;
              return (
                <div
                  key={tier.id}
                  className={`tier-card reveal-child ${tier.popular ? 'popular' : ''} ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedTier(tier.amount);
                    setCustomAmount('');
                    document.getElementById('donate-now')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {tier.badge && <div className="popular-badge">{tier.badge}</div>}
                  <div className="tier-icon">{tier.icon}</div>
                  <h3 className="tier-title">{tier.bengaliName}</h3>
                  <div className="tier-en-title">{tier.subTitle}</div>

                  <div className="tier-price-box">
                    <span className="currency">₹</span>
                    <span className="price-val">{tier.amount.toLocaleString('en-IN')}</span>
                    <span className="seva-type">/ এককালীন সেবা দান</span>
                  </div>

                  <p className="tier-desc">{tier.desc}</p>

                  <div className="tier-divider"></div>

                  <ul className="tier-benefits-list">
                    {tier.benefits.map((b, i) => (
                      <li key={i}>
                        <Icons.CheckCircle />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`tier-select-btn ${isSelected ? 'active-btn' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTier(tier.amount);
                      setCustomAmount('');
                      document.getElementById('donate-now')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {isSelected ? '✓ এই সেবা নির্বাচিত' : 'এই সেবা দান করুন 🚩'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* মূল অনুদান ও পেমেন্ট সেকশন */}
      <section id="donate-now" className="checkout-section scroll-reveal">
        <div className="section-container">
          <div className="checkout-wrapper">
            {/* বাম স্তম্ভ: ট্রাস্ট ও পবিত্র প্রতীক */}
            <div className="checkout-left reveal-child">
              <div className="hanuman-card">
                <div className="mandir-diya">🪔</div>
                <h3 className="sanskrit-title">॥ জয় শ্রী রাম • জয় মহাবলী হনুমান ॥</h3>
                <h4 className="seva-call">আপনার দেওয়া পবিত্র অর্থই মন্দিরের এক একটি ভিত্তি</h4>
                <p>
                  দান কেবল অর্থের স্থানান্তর নয়, এটি আপনার নিষ্ঠা, পরিবারের ধর্মীয় সংস্কৃতি এবং আগামী প্রজন্মের পরম সুরক্ষাকবচ।
                </p>

                <div className="sankalp-summary-box">
                  <div className="summary-row">
                    <span>নির্বাচিত সেবার অঙ্ক:</span>
                    <strong className="summary-amount">₹{currentAmount.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="summary-row">
                    <span>পুণ্য সংকল্পের মর্যাদা:</span>
                    <span>{currentAmount >= 21000 ? 'মহাযজ্ঞ মুখ্য যজমান' : currentAmount >= 5100 ? 'দিব্য স্তম্ভ সেবা' : 'পবিত্র রামশিলা সেবা'}</span>
                  </div>
                  <div className="summary-row">
                    <span>মন্দির নির্মাণ স্থল:</span>
                    <strong style={{ color: '#ffd700' }}>শ্যামসুন্দরপুর, পূর্ব বর্ধমান - 713141</strong>
                  </div>
                  <div className="summary-row">
                    <span>রসিদ ও প্রাপ্তিস্বীকার:</span>
                    <span className="green-text">তাত্ক্ষণিক ডিজিটাল রসিদ + 80G সার্টিফিকেট</span>
                  </div>
                </div>

                <div className="trust-seals">
                  <div className="seal-item">
                    <Icons.Shield />
                    <div>
                      <strong>১০০% সুরক্ষিত পেমেন্ট</strong>
                      <p>Govt. Registered Trust</p>
                    </div>
                  </div>
                  <div className="seal-item">
                    <Icons.Award />
                    <div>
                      <strong>ধারা 80G ট্যাক্স ছাড়</strong>
                      <p>৫০% আয়কর ছাড় অনুমোদিত</p>
                    </div>
                  </div>
                </div>

                {/* সাম্প্রতিক অনুদানকারীদের লাইভ তালিকা */}
                <div className="live-donations-box">
                  <div className="live-header">
                    <span className="pulse-dot"></span>
                    <span>সাম্প্রতিক যুক্ত হওয়া ভক্তবৃন্দ (Live Donations)</span>
                  </div>
                  <div className="donors-scroll">
                    {recentDonors.slice(0, 4).map((d, index) => (
                      <div key={index} className="donor-item">
                        <div className="donor-avatar">🙏</div>
                        <div className="donor-info">
                          <strong>{d.name}</strong>
                          <span>{d.city} • {d.seva}</span>
                        </div>
                        <div className="donor-amt">
                          +₹{d.amount.toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ডান স্তম্ভ: অনুদান ফর্ম ও পেমেন্ট গেটওয়ে */}
            <div className="checkout-right reveal-child">
              <div className="form-card">
                <div className="form-header">
                  <h2>পবিত্র সমর্পণ পত্র (অনলাইন দান ফর্ম)</h2>
                  <p>অনুগ্রহ করে আপনার তথ্য দিন যাতে পূজার বিশেষ সংকল্পে আপনার নাম ও গোত্র উচ্চারণ করা যায়।</p>
                </div>

                <form onSubmit={handleFormSubmit}>
                  {/* অনুদানের অঙ্ক নির্বাচন */}
                  <div className="form-group">
                    <label className="input-label">সেবা দানের অঙ্ক বেছে নিন (Select Amount):</label>
                    <div className="quick-amount-buttons">
                      {quickAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          className={`quick-amt-btn ${currentAmount === amt && !customAmount ? 'active' : ''}`}
                          onClick={() => {
                            setSelectedTier(amt);
                            setCustomAmount('');
                          }}
                        >
                          ₹{amt.toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* অথবা নিজের ইচ্ছামতো অঙ্ক */}
                  <div className="form-group">
                    <label className="input-label">অথবা আপনার ইচ্ছামতো যেকোনো অঙ্ক লিখুন (Custom Amount):</label>
                    <div className="custom-input-wrapper">
                      <span className="input-currency">₹</span>
                      <input
                        type="number"
                        min="11"
                        placeholder="যেমন ২১০০, ৫১০০, ১১০০০, ৫১০০০..."
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          if (e.target.value) {
                            setSelectedTier(parseInt(e.target.value, 10) || 0);
                          }
                        }}
                        className="custom-amount-field"
                      />
                    </div>
                  </div>

                  {/* ভক্তের ব্যক্তিগত তথ্য */}
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="input-label">ভক্তের শুভ নাম * :</label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: অনির্বাণ চক্রবর্তী"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="text-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="input-label">মোবাইল নম্বর (WhatsApp) * :</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        className="text-input"
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="input-label">গোত্র (Gotra - সংকল্পের জন্য, ঐচ্ছিক) :</label>
                      <input
                        type="text"
                        placeholder="যেমন: শাণ্ডিল্য, কাশ্যপ, ভরদ্বাজ"
                        value={donorGotra}
                        onChange={(e) => setDonorGotra(e.target.value)}
                        className="text-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="input-label">শহর / জেলা (City / State) :</label>
                      <input
                        type="text"
                        placeholder="যেমন: কলকাতা, হাওড়া, শিলিগুড়ি"
                        value={donorCity}
                        onChange={(e) => setDonorCity(e.target.value)}
                        className="text-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="input-label">প্যান নম্বর (PAN - 80G আয়কর ছাড়ের রসিদের জন্য, ঐচ্ছিক):</label>
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="ABCDE1234F"
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      className="text-input uppercase"
                    />
                  </div>

                  {/* পেমেন্ট পদ্ধতি নির্বাচন */}
                  <div className="payment-tabs-section">
                    <label className="input-label">অর্থ প্রদানের মাধ্যম নির্বাচন করুন (Payment Method):</label>
                    <div className="payment-tabs">
                      <button
                        type="button"
                        className={`tab-btn ${activeTab === 'upi' ? 'active' : ''}`}
                        onClick={() => setActiveTab('upi')}
                      >
                        <Icons.QrCode />
                        <span>UPI / QR / GPay / PhonePe</span>
                      </button>
                      <button
                        type="button"
                        className={`tab-btn ${activeTab === 'card' ? 'active' : ''}`}
                        onClick={() => setActiveTab('card')}
                      >
                        <span>💳 ডেবিট / ক্রেডিট কার্ড / নেটব্যাঙ্কিং</span>
                      </button>
                      <button
                        type="button"
                        className={`tab-btn ${activeTab === 'bank' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bank')}
                      >
                        <span>🏛️ সরাসরি ব্যাঙ্ক ট্রান্সফার (NEFT/RTGS)</span>
                      </button>
                    </div>

                    {/* ট্যাব ১: UPI ও QR কোড */}
                    {activeTab === 'upi' && (
                      <div className="tab-pane upi-pane">
                        <div className="qr-container">
                          <div className="qr-box">
                            <svg className="generated-qr" viewBox="0 0 160 160" width="160" height="160">
                              <rect width="160" height="160" fill="#ffffff" rx="10" />
                              <rect x="15" y="15" width="38" height="38" fill="#881337" rx="6" />
                              <rect x="21" y="21" width="26" height="26" fill="#ffffff" rx="3" />
                              <rect x="27" y="27" width="14" height="14" fill="#b91c1c" rx="2" />

                              <rect x="107" y="15" width="38" height="38" fill="#881337" rx="6" />
                              <rect x="113" y="21" width="26" height="26" fill="#ffffff" rx="3" />
                              <rect x="119" y="27" width="14" height="14" fill="#b91c1c" rx="2" />

                              <rect x="15" y="107" width="38" height="38" fill="#881337" rx="6" />
                              <rect x="21" y="113" width="26" height="26" fill="#ffffff" rx="3" />
                              <rect x="27" y="119" width="14" height="14" fill="#b91c1c" rx="2" />

                              <rect x="62" y="20" width="10" height="10" fill="#20130d" />
                              <rect x="76" y="20" width="10" height="10" fill="#20130d" />
                              <rect x="62" y="36" width="10" height="10" fill="#20130d" />
                              <rect x="88" y="36" width="10" height="10" fill="#20130d" />
                              <rect x="62" y="52" width="36" height="10" fill="#20130d" />

                              <rect x="20" y="62" width="10" height="20" fill="#20130d" />
                              <rect x="36" y="70" width="12" height="10" fill="#20130d" />
                              <rect x="52" y="66" width="10" height="14" fill="#20130d" />
                              <rect x="66" y="66" width="28" height="28" fill="#ea580c" rx="4" />
                              <text x="80" y="86" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">ॐ</text>

                              <rect x="100" y="62" width="20" height="10" fill="#20130d" />
                              <rect x="126" y="70" width="16" height="10" fill="#20130d" />
                              <rect x="100" y="80" width="12" height="20" fill="#20130d" />

                              <rect x="62" y="100" width="10" height="20" fill="#20130d" />
                              <rect x="80" y="106" width="20" height="10" fill="#20130d" />
                              <rect x="110" y="106" width="14" height="24" fill="#20130d" />
                              <rect x="130" y="116" width="14" height="14" fill="#20130d" />
                              <rect x="72" y="126" width="28" height="14" fill="#20130d" />
                            </svg>
                            <span className="qr-scan-label">যেকোনো UPI অ্যাপ দিয়ে স্ক্যান করুন</span>
                          </div>

                          <div className="upi-details">
                            <div className="upi-id-badge">
                              <span className="upi-label">অফিসিয়াল UPI ID:</span>
                              <strong className="upi-val">{upiId}</strong>
                              <button
                                type="button"
                                className="copy-btn"
                                onClick={handleCopyUpi}
                              >
                                {isCopied ? '✓ কপি হয়েছে' : 'কপি করুন'}
                              </button>
                            </div>
                            <p className="upi-supported-icons">
                              <span>Google Pay</span> • <span>PhonePe</span> • <span>Paytm</span> • <span>BHIM UPI</span> • <span>Cred</span>
                            </p>
                            <p className="upi-note">
                              QR কোড স্ক্যান করে ₹{currentAmount.toLocaleString('en-IN')} অর্থ সমর্পণ করুন এবং নিচে <strong>"দান নিশ্চিত করুন"</strong> বোতামে ক্লিক করুন।
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ট্যাব ২: কার্ড / নেটব্যাঙ্কিং */}
                    {activeTab === 'card' && (
                      <div className="tab-pane card-pane">
                        <div className="card-mock-notice">
                          <p><strong>সম্পূর্ণ সুরক্ষিত পেমেন্ট গেটওয়ে (SSL Secured Gateway)</strong></p>
                          <p>ফর্ম জমা দিলে আপনি সরাসরি ব্যাঙ্কের ২৫৬-বিট এনক্রিপ্টেড সুরক্ষিত পেমেন্ট পেজে চলে যাবেন।</p>
                          <div className="card-brands-row">
                            <span>VISA</span>
                            <span>MasterCard</span>
                            <span>RuPay</span>
                            <span>সকল প্রধান ব্যাঙ্কের নেটব্যাঙ্কিং</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ট্যাব ৩: সরাসরি ব্যাঙ্ক অ্যাকাউন্ট বিবরণ */}
                    {activeTab === 'bank' && (
                      <div className="tab-pane bank-pane">
                        <div className="bank-details-card">
                          <div className="bank-row">
                            <span>অ্যাকাউন্টের নাম:</span>
                            <strong>Sri Ramrajya Hanuman Kshetra Nirman Trust</strong>
                          </div>
                          <div className="bank-row">
                            <span>ব্যাঙ্কের নাম:</span>
                            <strong>State Bank of India (SBI)</strong>
                          </div>
                          <div className="bank-row">
                            <span>অ্যাকাউন্ট নম্বর:</span>
                            <strong className="acc-highlight">41280098321045</strong>
                          </div>
                          <div className="bank-row">
                            <span>IFSC কোড:</span>
                            <strong>SBIN0001248</strong>
                          </div>
                          <div className="bank-row">
                            <span>শাখা (Branch Address):</span>
                            <strong>শ্যামসুন্দরপুর শাখা, পূর্ব বর্ধমান, পিন: 713141</strong>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* নিশ্চিতকরণ বাটন */}
                  <button type="submit" className="submit-donation-btn">
                    <span className="btn-glow-ring"></span>
                    <span className="btn-text">
                      🚩 ₹{currentAmount.toLocaleString('en-IN')} সমর্পণ ও দান নিশ্চিত করুন
                    </span>
                  </button>

                  <p className="form-safety-notice">
                    🔒 আপনার দান সরাসরি নথিভুক্ত মন্দিরের ট্রাস্ট অ্যাকাউন্টে জমা হবে। দান সম্পন্ন হওয়ার সাথে সাথেই আপনার মোবাইলে 80G রসিদ পৌঁছে যাবে।
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ভক্তদের অভিজ্ঞতা ও অনুভূতি */}
      <section id="testimonials" className="devotee-section scroll-reveal">
        <div className="section-container">
          <div className="section-heading-center reveal-child">
            <span className="sub-badge">ভক্তগণের অভিজ্ঞতা</span>
            <h2>রামভক্ত ও দানদাতাদের পবিত্র অনুভূতি</h2>
            <p>হাজার হাজার ভক্ত এই পুণ্যকর্মে যুক্ত হয়ে মানসিক তৃপ্তি, আধ্যাত্মিক শান্তি ও পরিবারের সমৃদ্ধি লাভ করেছেন।</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card reveal-child">
              <div className="stars">★★★★★</div>
              <p className="test-quote">
                "আমি আমার স্বর্গীয় পিতামাতার স্মৃতিতে একটি স্তম্ভ সেবার সংকল্প নিয়েছি। তাঁদের নাম মন্দিরের শ্বেতপাথরে খোদাই থাকবে, এই ভেবে মন ভক্তি ও শান্তিতে ভরে উঠেছে। জয় বজরংবলী!"
              </p>
              <div className="test-author">
                <div className="author-img">👨‍💼</div>
                <div>
                  <strong>অরিন্দম মুখোপাধ্যায়</strong>
                  <span>কলকাতা, পশ্চিমবঙ্গ (স্তম্ভ সেবা দাতা)</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card reveal-child">
              <div className="stars">★★★★★</div>
              <p className="test-quote">
                "দান করার পদ্ধতি অত্যন্ত সহজ, পরিষ্কার ও সুরক্ষিত। সঙ্গে সঙ্গে ফোনে 80G ট্যাক্স রসিদ এবং ট্রাস্টের সুন্দর সংকল্পপত্র চলে এসেছে। ট্রাস্টের এই সেবা অনন্য।"
              </p>
              <div className="test-author">
                <div className="author-img">👩‍💼</div>
                <div>
                  <strong>ড. অনন্যা চ্যাটার্জী</strong>
                  <span>শিলিগুড়ি (স্বর্ণ কলশ সেবা)</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card reveal-child">
              <div className="stars">★★★★★</div>
              <p className="test-quote">
                "সুদূর প্রবাসে থেকেও আমাদের সনাতন শিকড় ও বজরংবলীর এই ঐতিহাসিক মহাধাম নির্মাণের সাথে যুক্ত হতে পেরে নিজেকে ধন্য মনে করছি। জয় শ্রী রাম!"
              </p>
              <div className="test-author">
                <div className="author-img">👨‍💻</div>
                <div>
                  <strong>সৌমিত্র সেনগুপ্ত</strong>
                  <span>লন্ডন / পৈতৃক নিবাস দুর্গাপুর</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* সচরাচর জিজ্ঞাস্য প্রশ্নাবলি (FAQ) */}
      <section className="faq-section scroll-reveal">
        <div className="section-container">
          <div className="section-heading-center reveal-child">
            <span className="sub-badge">সাধারণ জিজ্ঞাসা</span>
            <h2>সচরাচর জিজ্ঞাস্য প্রশ্নাবলি (FAQ)</h2>
          </div>

          <div className="faq-accordion">
            <details className="faq-item reveal-child" open>
              <summary>আমার এই অনুদানে কি আয়করে (80G Tax Exemption) ছাড় পাওয়া যাবে?</summary>
              <div className="faq-answer">
                হ্যাঁ, নিশ্চয়ই! আমাদের শ্রী রামরাজ্য হনুমান ক্ষেত্র ট্রাস্ট ভারতীয় আয়কর আইনের ধারা 80G এর অধীনে সম্পূর্ণ নথিভুক্ত। দান করার সাথে সাথেই আপনার হোয়াটসঅ্যাপ এবং ইমেইলে ৫০% ট্যাক্স ছাড়ের বৈধ ডিজিটাল রসিদ পাঠানো হবে।
              </div>
            </details>

            <details className="faq-item reveal-child">
              <summary>মন্দির প্রাঙ্গণে কি আমার ও পরিবারের নাম স্থায়ীভাবে লেখা থাকবে?</summary>
              <div className="faq-answer">
                হ্যাঁ, ₹৫,১০০ বা তার বেশি অঙ্কের যেকোনো সেবায় (যেমন স্তম্ভ সেবা, স্বর্ণ কলশ সেবা, যজমান সেবা) ভক্ত ও পরিবারের নাম এবং গোত্র মন্দিরের মর্মর শিলাফলকে চিরস্থায়ীভাবে স্বর্ণাক্ষরে খোদাই করা থাকবে।
              </div>
            </details>

            <details className="faq-item reveal-child">
              <summary>পূজার প্রসাদ ও সিদ্ধ রক্ষাসূত্র কীভাবে পাব?</summary>
              <div className="faq-answer">
                আপনার দেওয়া ঠিকানায় বিশেষ স্পিড পোস্ট বা ক্যুরিয়ারের মাধ্যমে চরণামৃত, ভস্ম, সিঁদুর, সিদ্ধ লাল রক্ষাসূত্র এবং পকেট শ্রী হনুমান চালীসা সংবলিত ‘মহাপ্রসাদ কিট’ সসম্মানে পাঠানো হবে।
              </div>
            </details>

            <details className="faq-item reveal-child">
              <summary>মন্দির নির্মাণ কবে সম্পন্ন হবে?</summary>
              <div className="faq-answer">
                মন্দিরের কাজ দ্রুতগতিতে চলছে। আগামী শুভ হনুমান জয়ন্তীর মহাপুণ্য তিথিতে ভারতের প্রধান সাধুসন্তদের সান্নিধ্যে ঐতিহাসিক প্রথম পর্যায়ের মহাপ্রাণ প্রতিষ্ঠা মহোৎসব উদযাপিত হবে।
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* মোবাইলের জন্য ভাসমান নিচের বোতাম - স্ক্রলিং ডিরেকশন অনুসারে মসৃণ দৃশ্যমানতা */}
      <div className={`sticky-floating-cta ${scrollDirection === 'down' ? 'cta-floating-active' : ''}`}>
        <div className="sticky-inner">
          <div className="sticky-info">
            <span className="sticky-tag">🚩 শুভ মহুর্ত চলমান</span>
            <span className="sticky-text">শ্রী হনুমান মন্দির নির্মাণে সামর্থ্য দান করুন</span>
          </div>
          <a href="#donate-now" className="sticky-btn">
            এখনই সেবা দান করুন (₹{currentAmount.toLocaleString('en-IN')})
          </a>
        </div>
      </div>

      {/* ফুটার */}
      <footer className="footer scroll-reveal">
        <div className="section-container">
          <div className="footer-top">
            <div className="footer-col brand-col reveal-child">
              <div className="brand">
                <span className="shree-symbol">ॐ</span>
                <span className="hindi-title">শ্রী সংকটমোচন হনুমান ট্রাস্ট</span>
              </div>
              <p>
                সনাতন ধর্ম, সংস্কৃতি, গোরক্ষা ও মানবসেবায় উৎসর্গীকৃত সরকারি নিবন্ধিত ধর্মার্থ ট্রাস্ট।
                রেজিস্ট্রেশন নং: TRUST/WB/2022/49102-B | 80G Approval: AABTS7891PF20231
              </p>
              <div className="social-tags">
                <span>Facebook</span> • <span>YouTube (লাইভ আরতি)</span> • <span>Instagram</span> • <span>Telegram</span>
              </div>
            </div>

            <div className="footer-col reveal-child">
              <h4>যোগাযোগ ও ট্রাস্ট কার্যালয়</h4>
              <p>📍 শ্রী সংকটমোচন হনুমান মন্দির তীর্থ ক্ষেত্র, শ্যামসুন্দরপুর, পূর্ব বর্ধমান, পশ্চিমবঙ্গ, পিন: 713141</p>
              <p>📞 সেবা হেল্পলাইন: +91 91523 00108</p>
              <p>✉️ ইমেল: seva@hanumantempletrust.org</p>
              <p>⏰ কার্যালয় সময়: সকাল ৭:০০ থেকে রাত ৯:০০ টা পর্যন্ত</p>
            </div>

            <div className="footer-col reveal-child">
              <h4>স্বচ্ছতা ও অঙ্গীকার</h4>
              <p>• ১০০% স্বচ্ছ অডিট ও সর্বসাধারণের জন্য হিসাব উন্মুক্ত</p>
              <p>• প্রতিটি ভক্তকে সরকারি অনুদান প্রাপ্তিস্বীকার পত্র</p>
              <p>• প্রত্যহ সন্ধ্যার মঙ্গল আরতির প্রত্যক্ষ সম্প্রচার</p>
              <p>• শ্রী রাম নাম মহাযজ্ঞ ও অখণ্ড রামায়ণ পাঠ সেবা</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} শ্রী সংকটমোচন হনুমান মন্দির নির্মাণ সমিতি। সর্বস্বত্ব সংরক্ষিত। সর্বমঙ্গলম্ ভবতু।</p>
            <p className="slogan">॥ জয় শ্রী রাম • জয় বজরংবলী ॥</p>
          </div>
        </div>
      </footer>

      {/* সফল অনুদানের পর মোডাল */}
      {showSuccessModal && (
        <div className="modal-backdrop" onClick={() => setShowSuccessModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-icon">🎉 🚩 🪔</div>
            <h2>পবিত্র সংকল্প গ্রহণ সফল হয়েছে!</h2>
            <h3 className="modal-devotee">শ্রদ্ধেয় {donorName || 'ভক্তিমতী/ভক্তবর'} মহাশয়</h3>
            <p className="modal-blessing">
              শ্রী সংকটমোচন মহাবলী হনুমানজি আপনার ও আপনার পরিবারের উপর অশেষ করুণা বর্ষণ করুন। মন্দির নির্মাণ সেবায় আপনার <strong>₹{currentAmount.toLocaleString('en-IN')}</strong> অর্থ সমর্পণ শ্রদ্ধাভরে গৃহীত হলো।
            </p>

            <div className="receipt-preview">
              <div className="receipt-row">
                <span>রসিদ নম্বর (Receipt ID):</span>
                <strong>SHM-{Math.floor(100000 + Math.random() * 900000)}</strong>
              </div>
              <div className="receipt-row">
                <span>তারিখ (Date):</span>
                <span>{new Date().toLocaleDateString('bn-BD')}</span>
              </div>
              <div className="receipt-row">
                <span>মন্দির নির্মাণ স্থল:</span>
                <span>শ্যামসুন্দরপুর, পূর্ব বর্ধমান - 713141</span>
              </div>
              <div className="receipt-row">
                <span>সেবা বিভাগ (Seva Category):</span>
                <span>{currentAmount >= 21000 ? 'মহাযজ্ঞ মুখ্য যজমান' : currentAmount >= 5100 ? 'দিব্য স্তম্ভ সেবা' : 'পবিত্র রামশিলা সেবা'}</span>
              </div>
              <div className="receipt-row">
                <span>ট্যাক্স ছাড়ের স্থিতি (80G Status):</span>
                <span className="green-text">৫০% আয়কর ছাড় প্রাপ্তিস্বীকার যোগ্য</span>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="modal-close-btn"
                onClick={() => {
                  alert("অনুদান রসিদ ও সংকল্পপত্র আপনার মোবাইলে হোয়াটসঅ্যাপ করা হয়েছে!");
                  setShowSuccessModal(false);
                }}
              >
                <Icons.Download /> 80G রসিদ ডাউনলোড করুন (Download Receipt)
              </button>
              <button
                className="modal-secondary-btn"
                onClick={() => setShowSuccessModal(false)}
              >
                জয় বজরংবলী (উইন্ডো বন্ধ করুন)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

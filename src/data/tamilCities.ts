export interface TamilCity {
  slug: string;
  name: string;
  tamil: string;
  intro: string;
  local: string[];
}

export const TAMIL_HUB = {
  title: "Tamil Live TV Free — Watch Tamil TV Channels Online | BharatTV",
  description:
    "Watch Tamil live TV free online — Sun TV, Polimer, Thanthi TV, Puthiya Thalaimurai, News7 Tamil, Kalaignar and more Tamil TV channels live. No signup.",
  keywords:
    "tamil live tv, tamil tv live, tamil live tv free, tamil news live, tamil tv channels online, sun tv live, polimer news live, thanthi tv live, puthiya thalaimurai live, news7 tamil live, kalaignar tv live, tamil serial live, தமிழ் நேரலை டிவி",
};

export const tamilChannels = [
  "Sun TV", "Sun News", "Polimer News", "Thanthi TV", "Puthiya Thalaimurai",
  "News7 Tamil", "News18 Tamil Nadu", "Kalaignar TV", "Jaya TV", "Raj TV",
  "Vijay TV", "Zee Tamil", "Captain TV", "Makkal TV", "Vasanth TV", "DD Podhigai",
];

export const tamilCities: TamilCity[] = [
  { slug: "chennai", name: "Chennai", tamil: "சென்னை",
    intro: "Watch Tamil live TV in Chennai free — breaking Chennai news, traffic and weather updates, serials and movies, streamed live on any phone or smart TV.",
    local: ["Chennai rain and flood alerts", "Chennai Super Kings match coverage", "Kollywood film news"] },
  { slug: "coimbatore", name: "Coimbatore", tamil: "கோயம்புத்தூர்",
    intro: "Tamil live TV for Coimbatore viewers — Kongu region news, live Tamil news channels and entertainment, free with no signup.",
    local: ["Kongu belt local news", "Industry and textile updates", "Western Ghats weather"] },
  { slug: "madurai", name: "Madurai", tamil: "மதுரை",
    intro: "Watch Tamil TV live in Madurai — Meenakshi temple festival coverage, south Tamil Nadu news and Tamil serials streamed free.",
    local: ["Chithirai festival live coverage", "Jallikattu season updates", "South Tamil Nadu politics"] },
  { slug: "tiruchirappalli", name: "Tiruchirappalli (Trichy)", tamil: "திருச்சிராப்பள்ளி",
    intro: "Free Tamil live TV for Trichy — central Tamil Nadu news, Srirangam festival coverage and live Tamil entertainment channels.",
    local: ["Srirangam Vaikunta Ekadasi coverage", "Cauvery delta farming news", "Central TN local updates"] },
  { slug: "salem", name: "Salem", tamil: "சேலம்",
    intro: "Watch Tamil news live in Salem — district news, Yercaud weather, and popular Tamil TV channels free online.",
    local: ["Salem district news", "Mettur dam water level updates", "Yercaud tourism and weather"] },
  { slug: "tirunelveli", name: "Tirunelveli", tamil: "திருநெல்வேலி",
    intro: "Tamil live TV free for Tirunelveli — southern Tamil Nadu news, Nellaiappar temple events and Tamil movies and serials live.",
    local: ["Nellaiappar temple festival", "Thamirabarani river updates", "Southern district news"] },
];

export const getCity = (slug: string) => tamilCities.find((c) => c.slug === slug);

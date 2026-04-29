export type ServiceFeature = {
  title: string;
  description: string;
};

export type ServiceProcess = {
  step: number;
  title: string;
  description: string;
};

export type ServiceData = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string[];
  longDescriptionHtml?: string;
  features: ServiceFeature[];
  process: ServiceProcess[];
  accentColor: string;
  metaTitle: string;
  metaDescription: string;
};

const servicesData: Record<string, ServiceData> = {
  "sosyal-medya-yonetimi": {
    slug: "sosyal-medya-yonetimi",
    title: "Sosyal Medya Yönetimi",
    subtitle:
      "Markanızı dijital platformlarda güçlü ve tutarlı bir sesle konumlandırın",
    description:
      "Hedef kitlenizle güçlü bir bağ kurun. Özgün içerik stratejileri ve proaktif topluluk yönetimi ile organik büyümenizi ve marka bilinirliğinizi artırıyoruz.",
    longDescription: [
      "Sosyal medya, günümüzde markaların hedef kitleleriyle en doğrudan iletişim kurduğu platformların başında geliyor. Bey Digital Media olarak, markanızın sosyal medya varlığını stratejik bir yaklaşımla yönetiyor; her içeriği, her yorumu ve her kampanyayı dikkatlice planlıyoruz.",
      "Instagram, Facebook ve TikTok gibi platformlarda özgün, ilgi çekici ve marka kimliğinizle uyumlu içerikler üretiyoruz. Hedef kitlenizin davranışlarını analiz ederek en doğru zamanda, en doğru mesajlarla onlara ulaşıyoruz. Organik büyümeyi esas alırken reklam desteğiyle etkiyi maksimize ediyoruz.",
    ],
    features: [
      {
        title: "İçerik Takvimi",
        description:
          "Aylık içerik planlaması ile düzenli ve stratejik yayın takvimi oluşturuyoruz.",
      },
      {
        title: "Görsel & Video Üretimi",
        description:
          "Marka kimliğinizle uyumlu özgün görseller, reels ve story içerikleri tasarlıyoruz.",
      },
      {
        title: "Topluluk Yönetimi",
        description:
          "Yorum ve mesajlara hızlı, profesyonel yanıtlar vererek sadık bir topluluk oluşturuyoruz.",
      },
      {
        title: "Hashtag Stratejisi",
        description:
          "Hedef kitlenize ulaşacak en etkili hashtag setlerini analiz ederek belirliyoruz.",
      },
      {
        title: "Etkileşim Optimizasyonu",
        description:
          "Platform algoritmalarını anlayarak organik erişim ve etkileşim oranlarınızı artırıyoruz.",
      },
      {
        title: "Aylık Raporlama",
        description:
          "Detaylı performans raporları ile hesap verebilir ve şeffaf bir yönetim sunuyoruz.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Marka & Rakip Analizi",
        description:
          "Markanızı, hedef kitlenizi ve sektörünüzdeki rakiplerinizi derinlemesine inceliyoruz.",
      },
      {
        step: 2,
        title: "Strateji Oluşturma",
        description:
          "Size özel içerik stratejisi, platform önceliklendirmesi ve ton of voice belirliyoruz.",
      },
      {
        step: 3,
        title: "İçerik Üretimi",
        description:
          "Onaylanan strateji doğrultusunda görsel ve yazılı içerikleri üretiyoruz.",
      },
      {
        step: 4,
        title: "Yayın & Yönetim",
        description:
          "İçerikleri optimize saatlerde paylaşıyor, toplulukla aktif ve canlı iletişim kuruyoruz.",
      },
      {
        step: 5,
        title: "Analiz & İyileştirme",
        description:
          "Performans verilerini aylık olarak analiz ederek stratejiyi sürekli geliştiriyoruz.",
      },
    ],
    accentColor: "#60a5fa",
    metaTitle: "Sosyal Medya Yönetimi | Bey Digital Media - Bursa",
    metaDescription:
      "Bursa'da profesyonel sosyal medya yönetimi. Instagram, Facebook ve TikTok platformlarında içerik stratejisi, topluluk yönetimi ve etkileşim optimizasyonu.",
  },

  "meta-ads": {
    slug: "meta-ads",
    title: "Meta Ads",
    subtitle:
      "Facebook ve Instagram reklamlarıyla hedef kitlenize tam isabet edin",
    description:
      "Facebook ve Instagram reklamlarıyla hedef kitlenize ulaşın. A/B testleri, lookalike kitleler ve dönüşüm odaklı kampanyalar.",
    longDescription: [
      "Meta platformları (Facebook ve Instagram), milyarlarca kullanıcısıyla dünyanın en büyük reklam ekosistemlerinden birini oluşturuyor. Doğru hedefleme ve yaratıcı içeriklerle bu ekosistemi en verimli şekilde kullanmak, markanızın büyümesine doğrudan katkı sağlıyor.",
      "Bey Digital Media olarak, Meta Business Suite'i profesyonel düzeyde kullanarak bütçenizin her kuruşunu verimli harcıyoruz. Demografik, davranışsal ve ilgi alanı hedeflemelerinin yanı sıra lookalike kitleler ve retargeting stratejileriyle dönüşüm oranlarınızı maksimize ediyoruz.",
    ],
    features: [
      {
        title: "Hedef Kitle Oluşturma",
        description:
          "Demografik, davranışsal ve ilgi alanı bazlı detaylı hedef kitle segmentasyonu yapıyoruz.",
      },
      {
        title: "Lookalike Kitleler",
        description:
          "Mevcut müşterilerinize benzer yeni potansiyel müşterilere ulaşmak için lookalike kitleler oluşturuyoruz.",
      },
      {
        title: "A/B Testleri",
        description:
          "Farklı reklam varyasyonlarını test ederek en yüksek performanslı kombinasyonları belirliyoruz.",
      },
      {
        title: "Kreatif Tasarım",
        description:
          "Dönüşüm odaklı reklam görselleri, video içerikler ve reklam metinleri üretiyoruz.",
      },
      {
        title: "Bütçe Optimizasyonu",
        description:
          "Reklam harcamalarınızı en yüksek ROI'yi sağlayacak şekilde optimize ediyoruz.",
      },
      {
        title: "Retargeting",
        description:
          "Web sitenizi ziyaret eden veya uygulamanızı kullanan kullanıcılara yeniden ulaşıyoruz.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Hesap Analizi",
        description:
          "Mevcut Meta reklam hesabınızı ve geçmiş kampanya verilerini inceliyoruz.",
      },
      {
        step: 2,
        title: "Strateji & Hedef Belirleme",
        description:
          "İş hedeflerinize uygun kampanya türleri ve KPI'lar belirliyoruz.",
      },
      {
        step: 3,
        title: "Kampanya Kurulumu",
        description:
          "Hedefleme, bütçe ve yaratıcı içeriklerle kampanyaları profesyonelce kuruyoruz.",
      },
      {
        step: 4,
        title: "Optimizasyon",
        description:
          "Kampanyaları günlük takip ederek performansı artıracak düzenlemeler yapıyoruz.",
      },
      {
        step: 5,
        title: "Raporlama",
        description:
          "Haftalık ve aylık raporlarla sonuçları şeffaf bir şekilde paylaşıyoruz.",
      },
    ],
    accentColor: "#818cf8",
    metaTitle: "Meta Ads Yönetimi | Bey Digital Media - Bursa",
    metaDescription:
      "Facebook ve Instagram reklam yönetimi. A/B testleri, lookalike kitleler ve dönüşüm odaklı Meta Ads kampanyaları ile hedef kitlenize ulaşın.",
  },

  "google-ads": {
    slug: "google-ads",
    title: "Google Ads",
    subtitle: "Arama motorunda tam zamanında, doğru kitleyle buluşun",
    description:
      "Arama motoru reklamcılığında uzman desteği. Anahtar kelime optimizasyonu, reklam metni yazımı ve bütçe yönetimi.",
    longDescription: [
      "Google, dünya genelinde yapılan aramaların büyük çoğunluğuna ev sahipliği yapıyor. Potansiyel müşterileriniz tam da bir ürün veya hizmet aradıklarında karşılarına çıkmak, en etkili pazarlama stratejilerinden biridir. Ancak Google Ads, doğru yönetilmediğinde hızla bütçe israfına dönüşebilir.",
      "Bey Digital Media olarak Google Ads hesaplarınızı uzman gözüyle yönetiyor, anahtar kelime araştırmasından reklam metni optimizasyonuna, kalite skorundan dönüşüm takibine kadar tüm süreçleri profesyonel bir yaklaşımla ele alıyoruz.",
    ],
    features: [
      {
        title: "Anahtar Kelime Araştırması",
        description:
          "Hedef kitlenizin kullandığı arama terimlerini analiz ederek en etkili anahtar kelimeleri belirliyoruz.",
      },
      {
        title: "Arama Ağı Reklamları",
        description:
          "Google arama sonuçlarında üst sıralarda görünmenizi sağlayan metin tabanlı reklamlar oluşturuyoruz.",
      },
      {
        title: "Görüntülü Reklamlar",
        description:
          "Google Display Network'te marka bilinirliğini artıran görsel reklam kampanyaları yürütüyoruz.",
      },
      {
        title: "Yeniden Pazarlama",
        description:
          "Sitenizi daha önce ziyaret eden kullanıcılara hedefli reklamlarla tekrar ulaşıyoruz.",
      },
      {
        title: "Kalite Skoru Optimizasyonu",
        description:
          "Reklam alaka düzeyi ve açılış sayfası optimizasyonuyla tıklama başı maliyetinizi düşürüyoruz.",
      },
      {
        title: "Dönüşüm Takibi",
        description:
          "Hangi reklamların satışa veya form doldurmaya dönüştüğünü ölçümleyerek bütçenizi optimize ediyoruz.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Hesap Denetimi",
        description:
          "Mevcut Google Ads hesabınızı veya sektörünüzü analiz ederek fırsatları ve riskleri belirliyoruz.",
      },
      {
        step: 2,
        title: "Anahtar Kelime Stratejisi",
        description:
          "Rekabet düzeyi, arama hacmi ve dönüşüm potansiyeline göre anahtar kelime listeleri oluşturuyoruz.",
      },
      {
        step: 3,
        title: "Kampanya Oluşturma",
        description:
          "Reklam grupları, metinler ve hedefleme ayarlarıyla kampanyaları kuruyoruz.",
      },
      {
        step: 4,
        title: "Sürekli Optimizasyon",
        description:
          "Tıklama oranları, dönüşümler ve kalite skorlarına göre düzenli iyileştirmeler yapıyoruz.",
      },
      {
        step: 5,
        title: "Raporlama & Analiz",
        description:
          "Detaylı raporlarla kampanya performansını ve harcama verimliliğini paylaşıyoruz.",
      },
    ],
    accentColor: "#4ade80",
    metaTitle: "Google Ads Yönetimi | Bey Digital Media - Bursa",
    metaDescription:
      "Uzman Google Ads yönetimi. Anahtar kelime optimizasyonu, dönüşüm takibi ve bütçe verimliliği ile Google'da üst sıralarda görünün.",
  },

  "web-tasarim": {
    slug: "web-tasarim",
    title: "Web Tasarım",
    subtitle:
      "Modern, hızlı ve etkileyici web siteleriyle dijitalde güçlü bir izlenim bırakın",
    description:
      "Modern, hızlı ve SEO uyumlu web siteleri. Next.js teknolojisiyle mobil öncelikli, kullanıcı dostu arayüzler.",
    longDescription: [
      "Web siteniz, markanızın dijital vitrindir. Kullanıcıların sizi bulmalarından hemen sonra ulaştıkları bu alan, onların markanız hakkındaki ilk izlenimini şekillendirir. Hızlı yüklenen, estetik olarak çekici ve kullanımı kolay bir web sitesi, potansiyel müşterileri gerçek müşterilere dönüştürmede kritik rol oynar.",
      "Bey Digital Media olarak Next.js ve modern web teknolojilerini kullanarak yüksek performanslı, SEO dostu ve mobil öncelikli web siteleri tasarlıyoruz. Her proje, markanızın kimliğini yansıtacak şekilde özel olarak tasarlanır.",
    ],
    features: [
      {
        title: "Özel Tasarım",
        description:
          "Hazır şablon kullanmadan, markanıza özel sıfırdan tasarım yapıyoruz.",
      },
      {
        title: "Mobil Öncelikli",
        description:
          "Tüm cihazlarda mükemmel görünen ve çalışan responsive tasarımlar üretiyoruz.",
      },
      {
        title: "Hız Optimizasyonu",
        description:
          "Core Web Vitals metriklerini göz önünde bulundurarak süper hızlı yükleme süreleri sağlıyoruz.",
      },
      {
        title: "SEO Uyumlu Altyapı",
        description:
          "Arama motorlarının seveceği teknik altyapı ve sayfa yapısıyla inşa ediyoruz.",
      },
      {
        title: "Next.js Teknolojisi",
        description:
          "Endüstrinin en modern React framework'ü ile güvenilir ve ölçeklenebilir siteler yapıyoruz.",
      },
      {
        title: "İçerik Yönetim Sistemi",
        description:
          "İsteğe bağlı CMS entegrasyonu ile içeriklerinizi kolayca yönetmenizi sağlıyoruz.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Brifing & Keşif",
        description:
          "İhtiyaçlarınızı, hedeflerinizi ve referans aldığınız örnekleri detaylıca ele alıyoruz.",
      },
      {
        step: 2,
        title: "Tasarım & Prototip",
        description:
          "Temel bi tasarım fikri oluşturup onayınıza sunuyoruz.",
      },
      {
        step: 3,
        title: "Geliştirme",
        description:
          "Onaylanan tasarımı kodluyor ve tüm özellikleri entegre ediyoruz.",
      },
      {
        step: 4,
        title: "Test & Optimizasyon",
        description:
          "Farklı cihazlar ve tarayıcılarda testler yapıyor, performansı optimize ediyoruz.",
      },
      {
        step: 5,
        title: "Yayın & Destek",
        description:
          "Siteyi canlıya alıyor, sonrasında teknik destek ve bakım sağlıyoruz.",
      },
    ],
    accentColor: "#a78bfa",
    metaTitle: "Web Tasarım & Geliştirme | Bey Digital Media - Bursa",
    metaDescription:
      "Bursa'da modern web tasarım hizmetleri. Next.js ile mobil öncelikli, hızlı ve SEO uyumlu web siteleri. Özel tasarım ve geliştirme.",
  },

  seo: {
    slug: "seo",
    title: "SEO",
    subtitle:
      "Organik aramada ve yapay zeka yanıtlarında öne çıkın, kalıcı trafik elde edin",
    description:
      "Organik arama sonuçlarında üst sıralara çıkın. Teknik SEO, içerik optimizasyonu, backlink stratejileri ve yapay zeka optimizasyonu.",
    longDescription: [
      "Arama Motoru Optimizasyonu (SEO), web sitenizin Google ve diğer arama motorlarında üst sıralarda görünmesini sağlayan kapsamlı bir süreçtir. Reklamlara bağımlı kalmadan organik trafik elde etmek, uzun vadede en maliyet-etkin dijital pazarlama stratejilerinden biridir.",
      "Bey Digital Media olarak, teknik SEO analizinden içerik stratejisine, backlink inşasından yerel SEO çalışmalarına kadar kapsamlı bir hizmet sunuyoruz. Her optimizasyon kararını veriye dayandırıyor ve sürekli ölçümleme ile iyileştirme yapıyoruz.",
      "Bunların ötesinde, ChatGPT, Gemini, Perplexity ve benzeri yapay zeka arama motorlarının sorgulara yanıt verirken hangi kaynakları önerdiğini analiz ediyor; içeriklerinizi ve site yapınızı bu yapay zeka algoritmalarına göre optimize ediyoruz. Böylece markanız yalnızca Google'da değil, yapay zeka destekli aramalarda da ilk önerilen kaynak haline geliyor.",
    ],
    features: [
      {
        title: "Teknik SEO Analizi",
        description:
          "Site hızı, crawlability, index durumu ve teknik hataları tespit ederek düzeltiyoruz.",
      },
      {
        title: "Anahtar Kelime Araştırması",
        description:
          "Sektörünüze ve hedef kitlenize uygun, dönüşüm potansiyeli yüksek anahtar kelimeleri belirliyoruz.",
      },
      {
        title: "İçerik Optimizasyonu",
        description:
          "Mevcut içerikleri SEO kurallarına göre optimize ediyor, yeni içerik stratejisi oluşturuyoruz.",
      },
      {
        title: "Backlink İnşası",
        description:
          "Otorite backlink çalışmalarıyla sitenizin domain gücünü artırıyoruz.",
      },
      {
        title: "Yerel SEO",
        description:
          "Google My Business optimizasyonu ve yerel arama stratejileriyle bölgenizdeki müşterilere ulaşıyoruz.",
      },
      {
        title: "Yapay Zeka SEO (GEO/AEO)",
        description:
          "ChatGPT, Gemini ve Perplexity gibi yapay zeka aramalarında markanızın önerilen kaynak olması için içerik ve yapı optimizasyonu yapıyoruz.",
      },
    ],
    process: [
      {
        step: 1,
        title: "SEO Denetimi",
        description:
          "Sitenizin mevcut SEO durumunu ve yapay zeka aramalardaki görünürlüğünü kapsamlı bir denetimle analiz ediyoruz.",
      },
      {
        step: 2,
        title: "Strateji Belirleme",
        description:
          "Tespit edilen sorunları ve fırsatları önceliklendirerek hem geleneksel hem yapay zeka odaklı yol haritası çıkarıyoruz.",
      },
      {
        step: 3,
        title: "Teknik Düzeltmeler",
        description:
          "Altyapıdaki teknik SEO sorunlarını tespit ederek çözüyoruz.",
      },
      {
        step: 4,
        title: "İçerik & Link Çalışması",
        description:
          "Optimizasyon, backlink stratejileri ve yapay zeka uyumlu içerik üretimini hayata geçiriyoruz.",
      },
      {
        step: 5,
        title: "Sürekli Takip",
        description:
          "Sıralama değişimlerini, yapay zeka görünürlüğünü ve trafik gelişimini aylık raporlarla takip ediyoruz.",
      },
    ],
    accentColor: "#fb923c",
    metaTitle: "SEO & Yapay Zeka SEO Hizmetleri | Bey Digital Media - Bursa",
    metaDescription:
      "Bursa'da profesyonel SEO hizmetleri. Teknik SEO, içerik optimizasyonu, backlink stratejileri ve ChatGPT/Gemini gibi yapay zeka aramalarında öne çıkmanızı sağlayan GEO/AEO optimizasyonu.",
  },

  "logo-tasarimi": {
    slug: "logo-tasarimi",
    title: "Logo Tasarımı",
    subtitle: "Markanızın özünü yansıtan, akılda kalıcı ve özgün bir logo",
    description:
      "Markanızı temsil eden özgün ve akılda kalıcı logo tasarımları. Vektörel çalışma ve kurumsal kimlik entegrasyonu.",
    longDescription: [
      "Logo, markanızın yüzüdür. İlk bakışta kim olduğunuzu, ne yaptığınızı ve nasıl bir değer sunduğunuzu iletir. İyi tasarlanmış bir logo, yıllarca markanızı temsil eder ve müşterilerinizin zihninde güçlü bir yer edinir.",
      "Bey Digital Media olarak, sektörünüzü, hedef kitlenizi ve marka değerlerinizi derinlemesine anlayarak size özel logo tasarımları geliştiriyoruz. Her logo vektörel formatda hazırlanır; böylece her boyutta ve her ortamda mükemmel görünür.",
    ],
    features: [
      {
        title: "Özgün Konsept",
        description:
          "Araştırma ve keşif sürecinden sonra size özel, özgün logo konseptleri geliştiriyoruz.",
      },
      {
        title: "Vektörel Dosyalar",
        description:
          "AI, EPS ve SVG formatlarında sonsuz ölçeklenebilir dosyalar teslim ediyoruz.",
      },
      {
        title: "Revizyon Hakkı",
        description:
          "Memnun kalana kadar revizyon yapıyor, isteklerinize göre düzenliyoruz.",
      },
      {
        title: "Renk Paleti",
        description:
          "Logonuzla uyumlu marka renk paleti ve renk kodlarını (HEX, RGB, CMYK) belirliyoruz.",
      },
      {
        title: "Tipografi Seçimi",
        description:
          "Markanıza uygun font ailesi önerileri sunuyor, yazı stili kılavuzu hazırlıyoruz.",
      },
      {
        title: "Kullanım Kılavuzu",
        description:
          "Logonuzun doğru kullanımını gösteren mini bir marka kılavuzu hazırlıyoruz.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Brifing & Araştırma",
        description:
          "Markanızı, sektörünüzü, rakiplerinizi ve hedef kitlenizi anlıyoruz.",
      },
      {
        step: 2,
        title: "Konsept Geliştirme",
        description:
          "Araştırma verilerine dayanarak birden fazla logo konsepti taslağı oluşturuyoruz.",
      },
      {
        step: 3,
        title: "Sunum",
        description:
          "Tasarlanan konseptleri farklı kullanım alanlarında göstererek sunuyoruz.",
      },
      {
        step: 4,
        title: "Revizyon",
        description:
          "Geri bildirimleriniz doğrultusunda seçilen konsepti geliştiriyoruz.",
      },
      {
        step: 5,
        title: "Teslim",
        description:
          "Tüm formatlarda dosyaları ve kullanım kılavuzunu teslim ediyoruz.",
      },
    ],
    accentColor: "#f472b6",
    metaTitle: "Logo Tasarımı | Bey Digital Media - Bursa",
    metaDescription:
      "Profesyonel logo tasarımı hizmetleri. Özgün ve akılda kalıcı logolar, vektörel dosyalar ve marka kılavuzu ile markanızı güçlendirin.",
  },

  "kurumsal-kimlik": {
    slug: "kurumsal-kimlik",
    title: "Kurumsal Kimlik",
    subtitle:
      "Her temas noktasında tutarlı ve güçlü bir marka deneyimi sunun",
    description:
      "Markanızın tüm dokunuş noktalarında tutarlı kimlik. Kartvizit, antetli kağıt, katalog ve ambalaj tasarımları.",
    longDescription: [
      "Kurumsal kimlik, markanızın görsel ve iletişimsel kimliğinin bir bütün olarak tutarlı biçimde sunulmasıdır. Logodan kartvizite, web sitesinden ambalaja kadar her temas noktasında aynı dili konuşan bir marka, güven ve profesyonellik hissi yaratır.",
      "Bey Digital Media olarak, markanızın DNA'sını belirleyerek tüm kurumsal materyallerde tutarlı bir görsel dil oluşturuyoruz. Her tasarım öğesi birbirleriyle uyum içinde çalışır ve markanızı rakiplerinizden ayrıştırır.",
    ],
    features: [
      {
        title: "Kartvizit Tasarımı",
        description:
          "Hem dijital hem de baskı formatında profesyonel kartvizit tasarımları yapıyoruz.",
      },
      {
        title: "Antetli Kağıt & Zarf",
        description:
          "Resmi yazışmalarınız için marka kimliğinizle uyumlu kırtasiye tasarımları üretiyoruz.",
      },
      {
        title: "Katalog & Broşür",
        description:
          "Ürün ve hizmetlerinizi tanıtan etkileyici katalog ve broşürler tasarlıyoruz.",
      },
      {
        title: "Ambalaj Tasarımı",
        description:
          "Ürünlerinizi rafta öne çıkaracak özgün ambalaj çözümleri geliştiriyoruz.",
      },
      {
        title: "Marka Kılavuzu",
        description:
          "Renk, tipografi ve görsel kullanım kurallarını içeren kapsamlı bir marka rehberi hazırlıyoruz.",
      },
      {
        title: "Sosyal Medya Şablonları",
        description:
          "Tutarlı bir görünüm için sosyal medya profil ve içerik şablonları tasarlıyoruz.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Marka Analizi",
        description:
          "Mevcut kimliğinizi ve ihtiyaçlarınızı değerlendiriyor, hedefleri belirliyoruz.",
      },
      {
        step: 2,
        title: "Konsept Geliştirme",
        description:
          "Renk, tipografi ve görsel dil üzerine konsept önerileri oluşturuyoruz.",
      },
      {
        step: 3,
        title: "Materyal Tasarımı",
        description:
          "Onaylanan konsept doğrultusunda tüm materyalleri tasarlıyoruz.",
      },
      {
        step: 4,
        title: "Revizyon & Onay",
        description:
          "Geri bildirimlerle tasarımları mükemmelleştiriyor, onay alıyoruz.",
      },
      {
        step: 5,
        title: "Teslim",
        description:
          "Baskıya hazır ve dijital formatlarda tüm dosyaları teslim ediyoruz.",
      },
    ],
    accentColor: "#fb7185",
    metaTitle: "Kurumsal Kimlik Tasarımı | Bey Digital Media - Bursa",
    metaDescription:
      "Profesyonel kurumsal kimlik tasarımı. Kartvizit, antetli kağıt, katalog, ambalaj ve marka kılavuzu ile tutarlı bir marka imajı oluşturun.",
  },

  "ai-otomasyon": {
    slug: "ai-otomasyon",
    title: "AI & Otomasyon",
    subtitle: "Tekrarlayan işlere değil, büyümeye odaklanın — iş süreçlerinizi yapay zeka ile otomatikleştiriyoruz",
    description:
      "Hazır şablonlar değil; işletmenizin yapısına, süreçlerine ve hedeflerine göre sıfırdan tasarlanmış, gerçekten işe yarayan AI sistemleri.",
    longDescription: [
      "Başarılı işletmeler zamanlarını tekrarlayan görevlere değil; büyümeye, inovasyona ve müşterilerine ayırıyor. Yapay zeka çözümlerimizle iş akışlarınızı otomatikleştiriyor, operasyonel yükü minimize ediyor ve ekibinizin gerçek değer ürettiği alanlara odaklanmasını sağlıyoruz.",
      "Hazır şablonlar değil — işletmenizin yapısını, süreçlerini ve hedeflerini anlayarak sıfırdan tasarlanmış, gerçekten işe yarayan AI sistemleri kuruyoruz. Her proje; ölçeklenebilir, sonuç odaklı ve yalnızca sizin için tasarlanmış.",
      "Müşteri hizmetlerinden pazarlama otomasyonuna, veri analizinden iş akışı yönetimine kadar her süreçte yapay zekanın gücünü işletmenize entegre ediyoruz. Fark etmesi için büyük olmanıza gerek yok.",
    ],
    features: [
      {
        title: "Süreç Otomasyonu",
        description:
          "Bir kez kurulur, sonsuza kadar çalışır. Fatura, onay, raporlama gibi tekrar eden her adımı otomatikleştiriyor; ekibinizin zamanını stratejik işlere yönlendiriyoruz.",
      },
      {
        title: "AI Asistan",
        description:
          "Müşteri taleplerini anlar, doğru yere yönlendirir ve çözer — sizin yerinize. Markanızın sesini taşıyan, 7/24 aktif bir dijital çalışan.",
      },
      {
        title: "Akıllı Analitik",
        description:
          "Neyin işe yaradığını görün, neyin yaramadığını anlayın. Verilerinizi ham rakamdan eyleme dönüştürülebilir içgörüye çeviriyoruz.",
      },
      {
        title: "Chatbot",
        description:
          "Web sitenizden WhatsApp'a tüm kanallarda ziyaretçiyi müşteriye dönüştüren akıllı sohbet deneyimi tasarlıyoruz.",
      },
      {
        title: "Hız & Verimlilik",
        description:
          "Saatlik işleri dakikaya, günlük işleri saate indirin. Aynı ekip, çok daha büyük bir kapasite — operasyonel maliyet düşer, çıktı artar.",
      },
      {
        title: "AI Entegrasyonu",
        description:
          "ERP, CRM, e-ticaret paneli — mevcut sistemleriniz olduğu gibi kalır, üstüne yapay zeka zekası eklenir. Altyapınızı yeniden kurmanıza gerek yok.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Süreç Keşfi",
        description:
          "İşletmenizin hangi süreçlerinde en fazla zaman ve kaynak harcandığını birlikte analiz ediyoruz. Darboğazları tespit ediyor, otomasyon potansiyelini ölçüyoruz.",
      },
      {
        step: 2,
        title: "Çözüm Mimarisi",
        description:
          "İşletmenize özel AI araçlarını ve otomasyon mimarisini tasarlıyoruz. Hazır araç mı, özel geliştirme mi — doğru kararı birlikte veriyoruz.",
      },
      {
        step: 3,
        title: "Geliştirme & Entegrasyon",
        description:
          "Tasarlanan çözümleri hayata geçiriyor, mevcut sistemlerinizle sorunsuz entegre ediyoruz. Altyapınız değişmez, sadece daha akıllı hale gelir.",
      },
      {
        step: 4,
        title: "Test & İnce Ayar",
        description:
          "Sistemleri gerçek senaryolarla test ediyor, performansı optimize ediyor ve devreye almadan önce her detayı doğruluyoruz.",
      },
      {
        step: 5,
        title: "Canlıya Geçiş & Süregelen Destek",
        description:
          "Ekibinizi yeni sistemler konusunda eğitiyor, canlıya geçişi yönetiyor ve uzun vadeli teknik destek sağlıyoruz.",
      },
    ],
    accentColor: "#8b5cf6",
    metaTitle: "AI & Otomasyon Çözümleri | Bey Digital Media",
    metaDescription:
      "İşletmenizi yapay zeka ile otomatikleştirin. Süreç otomasyonu, AI asistan, chatbot ve entegrasyon çözümleri — hazır şablonlar değil, size özel sistemler.",
  },

  "detayli-raporlama": {
    slug: "detayli-raporlama",
    title: "Raporlama",
    subtitle:
      "Veriye dayalı kararlarla dijital varlığınızı sürekli geliştirin",
    description:
      "Aylık performans raporları, analizler ve strateji önerileri. Veriye dayalı kararlarla sürekli iyileştirme.",
    longDescription: [
      "Dijital pazarlama yatırımlarınızın gerçek karşılığını görmek için güvenilir verilere ihtiyacınız var. Hangi kanallar çalışıyor, hangi içerikler etkileşim getiriyor, hangi kampanyalar dönüşüme yol açıyor? Bu soruların cevapları, geleceğe yönelik kararlarınızı şekillendiriyor.",
      "Bey Digital Media olarak, yönettiğimiz tüm dijital kanalların verilerini düzenli olarak analiz ediyor ve size anlaşılır, eyleme dönüştürülebilir raporlar sunuyoruz. Sadece sayıları değil, bu sayıların arkasındaki hikayeleri ve fırsatları da anlatıyoruz.",
    ],
    features: [
      {
        title: "Aylık Performans Raporları",
        description:
          "Tüm dijital kanallarınızın performansını tek bir kapsamlı raporda topluyoruz.",
      },
      {
        title: "KPI Takibi",
        description:
          "İş hedeflerinizle örtüşen anahtar performans göstergelerini düzenli olarak izliyoruz.",
      },
      {
        title: "Rakip Analizi",
        description:
          "Sektör rakiplerinizin dijital performansını analiz ederek karşılaştırmalı değerlendirme yapıyoruz.",
      },
      {
        title: "Strateji Önerileri",
        description:
          "Verilerden çıkarılan içgörülerle gelecek döneme yönelik somut strateji tavsiyeleri sunuyoruz.",
      },
      {
        title: "Özelleştirilebilir Dashboard",
        description:
          "Anlık verileri takip edebileceğiniz kişiselleştirilmiş raporlama paneli kuruyoruz.",
      },
      {
        title: "ROI Analizi",
        description:
          "Dijital pazarlama yatırımlarınızın geri dönüşünü net olarak hesaplıyor ve raporluyoruz.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Veri Entegrasyonu",
        description:
          "Google Analytics, Meta Business, Google Ads gibi tüm veri kaynaklarını bağlıyoruz.",
      },
      {
        step: 2,
        title: "KPI Belirleme",
        description:
          "İş hedeflerinize göre takip edilecek metrikleri birlikte belirliyoruz.",
      },
      {
        step: 3,
        title: "Veri Analizi",
        description:
          "Toplanan verileri derinlemesine analiz ederek anlamlı içgörüler çıkarıyoruz.",
      },
      {
        step: 4,
        title: "Rapor Hazırlama",
        description:
          "Anlaşılır, görsel açıdan net ve eyleme dönüştürülebilir raporlar hazırlıyoruz.",
      },
      {
        step: 5,
        title: "Brifing & Planlama",
        description:
          "Rapor sonuçlarını birlikte değerlendiriyor ve bir sonraki döneme ait planı yapıyoruz.",
      },
    ],
    accentColor: "#22d3ee",
    metaTitle: "Detaylı Dijital Raporlama | Bey Digital Media - Bursa",
    metaDescription:
      "Aylık dijital performans raporları, KPI takibi, rakip analizi ve strateji önerileri. Veriye dayalı kararlarla markanızı büyütün.",
  },
};

export default servicesData;

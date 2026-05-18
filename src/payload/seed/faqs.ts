import type { Payload } from "payload";
import { richText } from "./richText";

export async function seedFAQs(payload: Payload) {
  const faqs = [
    {
      question:
        "Sosyal medya yönetimi ve AI otomasyonu markama nasıl entegre ediliyor?",
      answer:
        "Geleneksel içerik üretiminin ötesine geçiyoruz. Markanızın dijital varlığını inşa ederken, hedef kitlenizle güçlü ve organik bir bağ kuracak stratejiler geliştiriyoruz. Aynı zamanda operasyonlarınızı yormayacak zeki chatbotlar ve otomasyon algoritmalarıyla etkileşimi 7/24 sürdürülebilir bir noktaya taşıyoruz.",
    },
    {
      question:
        "Meta Ads ve Google Ads yönetiminde nasıl bir strateji izliyorsunuz?",
      answer:
        "Bütçenizi rastgele yakmıyoruz. Veri bilimi ve ileri düzey hedefleme yöntemlerini kullanarak doğrudan satın alma eğilimi yüksek kitleleri tespit ediyoruz. Amacımız sadece görünürlük değil, markanızı sektör lideri konumuna taşıyacak ve maksimum ROAS'ı elde etmenizi sağlayacak kurgular oluşturmaktır.",
    },
    {
      question: "Web tasarım süreçlerinizde nelere dikkat ediyorsunuz?",
      answer:
        "Kullanıcıyı yoran, hantal şablonlar yerine; modern, pürüzsüz animasyonlara sahip ve kullanıcı dostu tasarımlar geliştiriyoruz. Her bir pikseli kurumsal kimliğinize uygun işliyor, ziyaretçinin sitenize girdiği an premium bir deneyim yaşamasını hedefliyoruz. Arayüzlerimiz, tamamen sizin dijital merkeziniz olarak kurgulanır.",
    },
    {
      question:
        "SEO (Arama Motoru Optimizasyonu) çalışmalarınız ne zaman etki eder?",
      answer:
        "Algoritmaları manipüle eden geçici taktiklerle değil, uzun vadeli ve sağlam bir otorite inşası ile ilerliyoruz. Arama sorgularında otoritenizi sabitlemek, sektörün rekabetine göre ortalama 1-6 ay sürer. Doğru stratejiler kurgulandığında, arama sonuçlarında sarsılmaz bir konuma ulaşırsınız.",
    },
    {
      question: "Raporlama süreci ve şeffaflık vizyonunuz nedir?",
      answer:
        "Sadece kalıplaşmış vaatler değil, salt veri sunuyoruz. Erişim, ROAS, dönüşüm oranları ve büyüme trendlerini size net ve şeffaf grafiklerle raporluyoruz. Neyin iyi dönüştüğünü, hangi hamlenin optimize edilmesi gerektiğini gizlilik perdesi olmadan göreceksiniz. Çünkü markanızın gelişimi, başarımızın yegane kanıtıdır.",
    },
    {
      question:
        "Tüm ihtiyacımı tek bir yer (Bey Digital Media) ile çözebilir miyim?",
      answer:
        "Kesinlikle. Logo tasarımından yapay zeka yapılarına, performans pazarlamasından kompleks web yazılımlarına kadar dijital varlığınız için gereken her şeyi tek bir yapı içinde sunuyoruz. Dağınık sistemler yerine, tüm platformların birbiriyle konuştuğu kusursuz bir ekosistem inşa ediyoruz.",
    },
  ];

  for (const f of faqs) {
    try {
      const existing = await payload.find({
        collection: "faqs",
        where: { question: { equals: f.question } },
        limit: 1,
      });
      if (existing.docs.length === 0) {
        await payload.create({
          collection: "faqs",
          data: {
            question: f.question,
            answer: richText(f.answer),
          },
        });
        console.log(`✅ FAQ: ${f.question.slice(0, 40)}...`);
      } else {
        console.log(`ℹ️ FAQ exists: ${f.question.slice(0, 40)}...`);
      }
    } catch (e) {
      console.error(`❌ FAQ error:`, e);
    }
  }
}

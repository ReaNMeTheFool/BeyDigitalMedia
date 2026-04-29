"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "2024'te Sosyal Medya Trendleri: Markalar İçin Rehber",
    excerpt:
      "Yapay zeka destekli içerik üretiminden mikro-influencer pazarlamasına, bu yıl sosyal medyada öne çıkacak trendleri keşfedin.",
    category: "Sosyal Medya",
    date: "15 Mart 2024",
    image: "/blog-1.jpg",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "SEO'da Başarı İçin Teknik Optimizasyon Rehberi",
    excerpt:
      "Web sitenizin arama motorlarında üst sıralarda yer alması için gereken teknik SEO adımlarını detaylıca inceliyoruz.",
    category: "SEO",
    date: "10 Mart 2024",
    image: "/blog-2.jpg",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    title: "Marka Kimliğinde Renk Psikolojisinin Önemi",
    excerpt:
      "Doğru renk seçimi markanızın algısını nasıl etkiler? Renklerin tüketici davranışları üzerindeki etkisini keşfedin.",
    category: "Tasarım",
    date: "5 Mart 2024",
    image: "/blog-3.jpg",
    color: "from-purple-500 to-pink-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Blog
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
              Son <span className="text-primary">Yazılarımız</span>
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <span>Tüm Yazıları Gör</span>
            <ArrowUpRight size={20} />
          </motion.button>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {posts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                {/* Placeholder Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${post.color}`}
                />
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <span className="text-4xl sm:text-6xl font-bold opacity-30">
                    {post.title.charAt(0)}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <ArrowUpRight className="w-6 h-6 text-text-primary" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-2 text-text-muted text-sm mb-3">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-text-muted line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

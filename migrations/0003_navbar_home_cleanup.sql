UPDATE settings
SET value = json_set(
  value,
  '$.links', json('[{"label":"Ana Sayfa","href":"#hero","order":1},{"label":"Hizmetler","href":"#services","order":2,"children":[{"label":"Sosyal Medya Yönetimi","href":"/sosyal-medya-yonetimi"},{"label":"Meta Ads","href":"/meta-ads"},{"label":"Google Ads","href":"/google-ads"},{"label":"Web Tasarım","href":"/web-tasarim"},{"label":"SEO","href":"/seo"},{"label":"Logo Tasarımı","href":"/logo-tasarimi"},{"label":"Kurumsal Kimlik","href":"/kurumsal-kimlik"},{"label":"Raporlama","href":"/detayli-raporlama"}]},{"label":"Otomasyon","href":"#ai-otomasyon","order":3},{"label":"Neden Biz?","href":"#why-us","order":4},{"label":"Portfolyo","href":"#portfolio","order":5},{"label":"Hakkımızda","href":"#about","order":6},{"label":"Blog","href":"/blog","order":7},{"label":"SSS","href":"#faq","order":8},{"label":"İletişim","href":"#contact","order":9}]'),
  '$.ctaLabel', NULL,
  '$.ctaHref', NULL
)
WHERE key = 'navigation';

UPDATE pages
SET content = (
  SELECT json_group_array(json(block.value))
  FROM (
    SELECT value
    FROM json_each(pages.content)
    WHERE json_extract(value, '$.blockType') IS NOT 'cta'
    ORDER BY key
  ) AS block
)
WHERE slug = 'home'
  AND EXISTS (
    SELECT 1 FROM json_each(pages.content)
    WHERE json_extract(value, '$.blockType') = 'cta'
  );

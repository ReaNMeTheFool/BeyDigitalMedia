-- Restore hero titleSuffix on home page from "Çözümleri" to "Büyütüyoruz".
-- Updates ONLY icerik.titleSuffix inside the hero block; all other blocks,
-- values and array order are preserved via json_group_array over json_each.
UPDATE pages
SET content = (
  SELECT json_group_array(
    CASE
      WHEN json_extract(block.value, '$.blockType') = 'hero'
      THEN json_set(block.value, '$.icerik.titleSuffix', 'Büyütüyoruz')
      ELSE block.value
    END
  )
  FROM (
    SELECT value
    FROM json_each(pages.content)
    ORDER BY key
  ) AS block
)
WHERE slug = 'home'
  AND EXISTS (
    SELECT 1
    FROM json_each(pages.content)
    WHERE json_extract(value, '$.blockType') = 'hero'
      AND json_extract(value, '$.icerik.titleSuffix') = 'Çözümleri'
  );

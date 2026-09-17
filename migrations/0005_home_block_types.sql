-- Repair home page blocks stringified by the unfixed 0004 aggregate
-- (json_group_array over a CASE whose ELSE branch returned text, losing the
-- JSON subtype). Only items that are currently TEXT but valid JSON objects
-- are converted via json(value); already-object blocks pass through
-- unchanged, preserving block order.
UPDATE pages
SET content = (
  SELECT json_group_array(
    json(
      CASE
        WHEN json_each.type = 'text'
          AND json_valid(json_each.value)
          AND json_type(json_each.value) = 'object'
        THEN json_each.value
        ELSE json_each.value
      END
    )
  )
  FROM json_each(pages.content)
)
WHERE slug = 'home'
  AND EXISTS (
    SELECT 1
    FROM json_each(pages.content)
    WHERE json_each.type = 'text'
      AND json_valid(json_each.value)
      AND json_type(json_each.value) = 'object'
  );

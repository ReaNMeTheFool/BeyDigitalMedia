import { tr } from '@payloadcms/translations/languages/tr';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { clientTranslationKeys } = require('./node_modules/@payloadcms/translations/dist/clientKeys.js');

const missing = [];
for (const key of clientTranslationKeys) {
  const parts = key.split(':');
  let current = tr.translations;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      missing.push(key);
      break;
    }
  }
}
console.log('Missing keys:', missing.length);
if (missing.length > 0) {
  console.log(missing.slice(0, 20));
}

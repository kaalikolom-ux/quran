import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://wooniche.com';

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json();
}

async function fetchBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function main() {
  console.log("=== Starting Data & Asset Ingestion ===");

  const dataDir = path.resolve(process.cwd(), 'public/data/quran');
  const surahsDir = path.join(dataDir, 'surahs');
  const timingsDir = path.join(dataDir, 'timings');
  const enDir = path.join(dataDir, 'english_translations');
  const publicDir = path.resolve(process.cwd(), 'public');
  const imagesDir = path.join(publicDir, 'images');

  ensureDir(surahsDir);
  ensureDir(timingsDir);
  ensureDir(enDir);
  ensureDir(imagesDir);

  // 1. Download Lexicon
  console.log("Downloading Lexicon...");
  try {
    const lexicon = await fetchJson(`${BASE_URL}/data/quran/lexicon.json`);
    fs.writeFileSync(path.join(dataDir, 'lexicon.json'), JSON.stringify(lexicon));
    console.log(`✓ Lexicon downloaded (${lexicon.length} entries)`);
  } catch (e) {
    console.error("Error downloading lexicon:", e.message);
  }

  // 2. Download Articles
  console.log("Downloading Articles...");
  try {
    const articlesData = await fetchJson(`${BASE_URL}/api/public/articles`);
    fs.writeFileSync(path.join(publicDir, 'data/articles.json'), JSON.stringify(articlesData.articles || []));
    console.log(`✓ Articles downloaded (${(articlesData.articles || []).length} articles)`);
  } catch (e) {
    console.error("Error downloading articles:", e.message);
  }

  // 3. Extract Surahs Metadata & Consistency
  console.log("Extracting Surahs Metadata & Consistency...");
  try {
    const surahJsRes = await fetch(`${BASE_URL}/assets/surah._id-DUi3xBqe.js`);
    const surahJs = await surahJsRes.text();
    // Extract metadata object M = { ... }
    const mMatch = surahJs.match(/var j=e\(me\(\)\),M=(\{[\s\S]*?\n\s*\},[0-9]+:\{[\s\S]*?\});/);
    if (mMatch) {
      // Clean JS object into JSON
      const rawObjStr = mMatch[1];
      const parsedMeta = eval(`(${rawObjStr})`);
      fs.writeFileSync(path.join(dataDir, 'surahs_meta.json'), JSON.stringify(parsedMeta, null, 2));
      console.log(`✓ Surahs metadata extracted (${Object.keys(parsedMeta).length} surahs)`);
    } else {
      console.log("Searching alternative pattern for metadata...");
      const altMatch = surahJs.match(/M=(\{[0-9]+:\{id:1,[\s\S]*?114:\{id:114,[^}]+\}\});/);
      if (altMatch) {
        const parsedMeta = eval(`(${altMatch[1]})`);
        fs.writeFileSync(path.join(dataDir, 'surahs_meta.json'), JSON.stringify(parsedMeta, null, 2));
        console.log(`✓ Surahs metadata extracted (${Object.keys(parsedMeta).length} surahs)`);
      }
    }

    const consJsRes = await fetch(`${BASE_URL}/assets/data-surah-consistency-CfY5Hlmi.js`);
    const consJs = await consJsRes.text();
    const cMatch = consJs.match(/var e=(\{[\s\S]*?\});/);
    if (cMatch) {
      const parsedCons = eval(`(${cMatch[1]})`);
      fs.writeFileSync(path.join(dataDir, 'surah_consistency.json'), JSON.stringify(parsedCons, null, 2));
      console.log(`✓ Surah consistency extracted (${Object.keys(parsedCons).length} surahs)`);
    }
  } catch (e) {
    console.error("Error extracting metadata/consistency:", e.message);
  }

  // 4. Download Static Assets (favicons, images, manifest)
  const assets = [
    { url: `${BASE_URL}/qaf-favicon.svg`, dest: path.join(publicDir, 'qaf-favicon.svg') },
    { url: `${BASE_URL}/favicon.svg`, dest: path.join(publicDir, 'favicon.svg') },
    { url: `${BASE_URL}/favicon.png`, dest: path.join(publicDir, 'favicon.png') },
    { url: `${BASE_URL}/apple-touch-icon.png`, dest: path.join(publicDir, 'apple-touch-icon.png') },
    { url: `${BASE_URL}/manifest.webmanifest`, dest: path.join(publicDir, 'manifest.webmanifest') },
    { url: `${BASE_URL}/images/hero-bg.webp`, dest: path.join(imagesDir, 'hero-bg.webp') },
    { url: `${BASE_URL}/og-image.jpg`, dest: path.join(imagesDir, 'og-image.jpg') },
  ];

  for (const a of assets) {
    try {
      const buf = await fetchBuffer(a.url);
      fs.writeFileSync(a.dest, buf);
      console.log(`✓ Saved asset: ${path.basename(a.dest)}`);
    } catch (e) {
      console.log(`Asset ${a.url} skipped or not found: ${e.message}`);
    }
  }

  // 5. Download 114 Surahs (Surahs JSON, Timings JSON, English Translations JSON)
  console.log("Downloading 114 Surahs data (in parallel batches)...");
  const batchSize = 10;
  for (let i = 1; i <= 114; i += batchSize) {
    const promises = [];
    for (let j = i; j < Math.min(i + batchSize, 115); j++) {
      promises.push((async (id) => {
        // Surah JSON
        const surahDest = path.join(surahsDir, `${id}.json`);
        if (!fs.existsSync(surahDest)) {
          const s = await fetchJson(`${BASE_URL}/data/quran/surahs/${id}.json`);
          fs.writeFileSync(surahDest, JSON.stringify(s));
        }

        // Timing JSON
        const timingDest = path.join(timingsDir, `${id}.json`);
        if (!fs.existsSync(timingDest)) {
          const t = await fetchJson(`${BASE_URL}/data/quran/timings/${id}.json`);
          fs.writeFileSync(timingDest, JSON.stringify(t));
        }

        // English Translation JSON
        const enDest = path.join(enDir, `${id}.json`);
        if (!fs.existsSync(enDest)) {
          const en = await fetchJson(`${BASE_URL}/data/quran/english_translations/${id}.json`);
          fs.writeFileSync(enDest, JSON.stringify(en));
        }
      })(j));
    }
    await Promise.all(promises);
    console.log(`Progress: Surahs ${i} to ${Math.min(i + batchSize - 1, 114)} / 114 completed`);
  }

  console.log("=== Data and Asset Ingestion Complete! ===");
}

main().catch(console.error);

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const TARGET_DIRS = [
  path.join(ROOT, 'frontend', 'public'),
  path.join(ROOT, 'frontend', 'src', 'assets', 'images'),
  path.join(ROOT, 'frontend', 'src', 'assets', 'gallery'),
  path.join(ROOT, 'frontend', 'src', 'assets', 'special'),
  path.join(ROOT, 'frontend', 'src', 'assets', 'boxMaterial'),
  path.join(ROOT, 'frontend', 'src', 'assets', 'footer'),
];

const EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const MAX_SIZE_BYTES = 1024 * 1024 * 1.5; // 1.5MB threshold for aggressive compression

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const stat = await fs.promises.stat(filePath);
  try { await fs.promises.chmod(filePath, 0o666); } catch (_) {}
  let input = sharp(filePath);

  try {
    if (ext === '.jpg' || ext === '.jpeg') {
      const quality = stat.size > MAX_SIZE_BYTES ? 70 : 80;
      const buf = await input.jpeg({ quality, mozjpeg: true }).toBuffer();
      await fs.promises.writeFile(filePath, buf);
      const optimizedStat = await fs.promises.stat(filePath);
      return { optimized: optimizedStat.size < stat.size, before: stat.size, after: optimizedStat.size };
    } else if (ext === '.png') {
      const buf = await input.png({ compressionLevel: 9, palette: true }).toBuffer();
      await fs.promises.writeFile(filePath, buf);
      const optimizedStat = await fs.promises.stat(filePath);
      return { optimized: optimizedStat.size < stat.size, before: stat.size, after: optimizedStat.size };
    } else if (ext === '.webp') {
      const quality = stat.size > MAX_SIZE_BYTES ? 70 : 80;
      const buf = await input.webp({ quality }).toBuffer();
      await fs.promises.writeFile(filePath, buf);
      const optimizedStat = await fs.promises.stat(filePath);
      return { optimized: optimizedStat.size < stat.size, before: stat.size, after: optimizedStat.size };
    } else {
      return { skipped: true };
    }
  } catch (err) {
    // Attempt from buffer if direct open failed
    try {
      const data = await fs.promises.readFile(filePath);
      input = sharp(data);
      if (ext === '.jpg' || ext === '.jpeg') {
        const quality = stat.size > MAX_SIZE_BYTES ? 70 : 80;
        const buf = await input.jpeg({ quality, mozjpeg: true }).toBuffer();
        await fs.promises.writeFile(filePath, buf);
      } else if (ext === '.png') {
        const buf = await input.png({ compressionLevel: 9, palette: true }).toBuffer();
        await fs.promises.writeFile(filePath, buf);
      } else if (ext === '.webp') {
        const quality = stat.size > MAX_SIZE_BYTES ? 70 : 80;
        const buf = await input.webp({ quality }).toBuffer();
        await fs.promises.writeFile(filePath, buf);
      } else {
        return { skipped: true };
      }
      const optimizedStat = await fs.promises.stat(filePath);
      return { optimized: optimizedStat.size < stat.size, before: stat.size, after: optimizedStat.size };
    } catch (_) {}
    return { error: err.message };
  }
}

async function walk(dir, files = []) {
  try {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full, files);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (EXTS.has(ext)) files.push(full);
      }
    }
  } catch (e) {
    // ignore missing directories
  }
  return files;
}

async function main() {
  const start = Date.now();
  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;
  let optimizedCount = 0;
  let errors = 0;

  const allFiles = [];
  for (const dir of TARGET_DIRS) {
    const files = await walk(dir);
    allFiles.push(...files);
  }

  console.log(`Found ${allFiles.length} image files to check.`);

  for (const file of allFiles) {
    const stat = await fs.promises.stat(file);
    totalBefore += stat.size;
    const res = await optimizeFile(file);
    processed++;
    if (res.error) {
      errors++;
      console.log(`✖ Error: ${path.relative(ROOT, file)} → ${res.error}`);
    } else if (res.optimized) {
      optimizedCount++;
      totalAfter += res.after;
      console.log(
        `✓ Optimized: ${path.relative(ROOT, file)} → ${(res.before / 1024).toFixed(1)}KB → ${(res.after / 1024).toFixed(1)}KB`
      );
    } else {
      totalAfter += stat.size;
      // no log spam for unchanged files
    }
  }

  const saved = totalBefore - totalAfter;
  console.log('\nSummary');
  console.log(`Processed: ${processed}`);
  console.log(`Optimized: ${optimizedCount}`);
  console.log(`Errors:    ${errors}`);
  console.log(`Saved:     ${(saved / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Time:      ${((Date.now() - start) / 1000).toFixed(1)}s`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


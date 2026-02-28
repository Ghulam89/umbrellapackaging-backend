import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const IMAGES_DIR = path.join(__dirname, '..', 'images')

const sizeConfigs = {
  thumb: { w: 150, h: 150, quality: 85, fit: 'cover' },
  small: { w: 400, h: 400, quality: 90, fit: 'inside' },
  medium: { w: 800, h: 800, quality: 92, fit: 'inside' },
  large: { w: 1200, h: 1200, quality: 95, fit: 'inside' },
}

const isOptimizedName = (name) =>
  name.includes('_thumb.') ||
  name.includes('_small.') ||
  name.includes('_medium.') ||
  name.includes('_large.') ||
  name.includes('_optimized.')

const isImageExt = (ext) =>
  ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)

async function generateImageVersions(inputPath, base) {
  const results = {}
  for (const [size, cfg] of Object.entries(sizeConfigs)) {
    const out = path.join(IMAGES_DIR, `${base}_${size}.webp`)
    try {
      try {
        await fs.access(out)
        console.log(`Skipping ${base}_${size}.webp (already exists)`)
        results[size] = out
        continue
      } catch {}
      await sharp(inputPath)
        .resize(cfg.w, cfg.h, {
          fit: cfg.fit,
          withoutEnlargement: true,
          position: 'center',
        })
        .webp({ quality: cfg.quality })
        .toFile(out)
      results[size] = out
      console.log(`Generated ${base}_${size}.webp`)
    } catch (e) {
      console.error(`Error generating ${size} for ${base}: ${e.message}`)
    }
  }
  return results
}

async function processAllImages() {
  console.log('Starting batch image optimization')
  console.log(`Images directory: ${IMAGES_DIR}`)
  let files
  try {
    files = await fs.readdir(IMAGES_DIR)
  } catch (e) {
    console.error(`Error reading images directory: ${e.message}`)
    process.exit(1)
  }
  const imageFiles = files.filter((f) => {
    const ext = path.extname(f).toLowerCase()
    return isImageExt(ext) && !isOptimizedName(f)
  })
  console.log(`Found ${imageFiles.length} images to process`)
  if (imageFiles.length === 0) {
    console.log('No images to process')
    return
  }
  let processed = 0
  let skipped = 0
  let failed = 0
  for (const file of imageFiles) {
    const inputPath = path.join(IMAGES_DIR, file)
    const baseFilename = path.parse(file).name
    console.log(`Processing: ${file}`)
    try {
      const versions = await generateImageVersions(inputPath, baseFilename)
      const count = Object.keys(versions).length
      if (count > 0) {
        processed++
      } else {
        skipped++
      }
    } catch (e) {
      console.error(`Failed to process ${file}: ${e.message}`)
      failed++
    }
  }
  console.log('========================================')
  console.log('SUMMARY')
  console.log('========================================')
  console.log(`Total images found: ${imageFiles.length}`)
  console.log(`Successfully processed: ${processed}`)
  console.log(`Skipped (already optimized): ${skipped}`)
  console.log(`Failed: ${failed}`)
  console.log('========================================')
}

processAllImages()
  .then(() => {
    console.log('Script completed successfully')
  })
  .catch((e) => {
    console.error(`Script failed: ${e.message}`)
    process.exit(1)
  })

import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

function roundedMask(size, radius) {
  return Buffer.from(
    `<svg width="${size}" height="${size}">
      <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/>
    </svg>`,
  );
}

function buildIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const entrySize = 16;
  const dataOffset = headerSize + entrySize * count;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: ICO
  header.writeUInt16LE(count, 4); // image count

  let offset = dataOffset;
  const entries = [];
  for (let i = 0; i < count; i++) {
    const entry = Buffer.alloc(entrySize);
    const size = sizes[i];
    entry.writeUInt8(size === 256 ? 0 : size, 0); // width (0 = 256)
    entry.writeUInt8(size === 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bit count
    entry.writeUInt32LE(pngBuffers[i].length, 8); // bytes in resource
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += pngBuffers[i].length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers]);
}

async function main() {
  const src = join(publicDir, 'codewithbre.jpg');

  // Generate rounded PNG at each size needed
  const sizes = [16, 32, 48];
  const pngBuffers = [];

  for (const size of sizes) {
    const radius = Math.round(size * 0.22);
    const mask = roundedMask(size, radius);

    const buf = await sharp(src)
      .resize(size, size, { fit: 'cover', position: 'centre' })
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toBuffer();

    pngBuffers.push(buf);
    console.log(`  ✓ ${size}x${size} PNG`);
  }

  // Write ICO
  const ico = buildIco(pngBuffers, sizes);
  writeFileSync(join(publicDir, 'favicon.ico'), ico);
  console.log('  ✓ favicon.ico written');

  // Write a 32x32 rounded PNG for the nav avatar
  writeFileSync(join(publicDir, 'avatar.png'), pngBuffers[1]);
  console.log('  ✓ avatar.png (32x32) written');

  // Write a 64x64 rounded PNG for higher-DPI nav display
  const radius64 = Math.round(64 * 0.22);
  const avatar64 = await sharp(src)
    .resize(64, 64, { fit: 'cover', position: 'centre' })
    .composite([{ input: roundedMask(64, radius64), blend: 'dest-in' }])
    .png()
    .toBuffer();
  writeFileSync(join(publicDir, 'avatar@2x.png'), avatar64);
  console.log('  ✓ avatar@2x.png (64x64) written');
}

main().catch(console.error);

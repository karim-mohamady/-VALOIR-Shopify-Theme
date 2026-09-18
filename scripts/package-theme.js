import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

async function packageTheme() {
  const themeDir = path.resolve(process.cwd(), 'theme');
  const publicDir = path.resolve(process.cwd(), 'public');
  const outputPath = path.join(publicDir, 'valoir-eyewear-theme.zip');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const zip = new JSZip();

  function addDirectory(currentPath, zipFolder) {
    const items = fs.readdirSync(currentPath);
    for (const item of items) {
      if (item.startsWith('.') || item === 'node_modules') continue;
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const subFolder = zipFolder.folder(item);
        addDirectory(fullPath, subFolder);
      } else {
        const content = fs.readFileSync(fullPath);
        zipFolder.file(item, content);
      }
    }
  }

  console.log(`Packaging theme from ${themeDir}...`);
  addDirectory(themeDir, zip);

  const content = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });

  fs.writeFileSync(outputPath, content);
  const sizeKb = (content.length / 1024).toFixed(1);
  console.log(`Successfully created ${outputPath} (${sizeKb} KB)`);
}

packageTheme().catch((err) => {
  console.error('Error packaging theme:', err);
  process.exit(1);
});

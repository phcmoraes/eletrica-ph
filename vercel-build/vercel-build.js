const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting build process...');

// Create public directory if it doesn't exist
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy HTML, CSS, and JS files
const copyFiles = (extensions, destDir = '') => {
  const files = fs.readdirSync(process.cwd())
    .filter(file => extensions.some(ext => file.endsWith(ext)));
  
  files.forEach(file => {
    const sourcePath = path.join(process.cwd(), file);
    const destPath = path.join(publicDir, destDir, file);
    
    // Create destination directory if it doesn't exist
    const destDirPath = path.dirname(destPath);
    if (!fs.existsSync(destDirPath)) {
      fs.mkdirSync(destDirPath, { recursive: true });
    }
    
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied: ${file}`);
  });
};

// Copy assets directory
const copyAssets = () => {
  const assetsDir = path.join(process.cwd(), 'assets');
  if (fs.existsSync(assetsDir)) {
    const destAssetsDir = path.join(publicDir, 'assets');
    if (!fs.existsSync(destAssetsDir)) {
      fs.mkdirSync(destAssetsDir, { recursive: true });
    }
    
    // Copy all files and subdirectories from assets
    const copyRecursiveSync = (src, dest) => {
      const entries = fs.readdirSync(src, { withFileTypes: true });
      
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
          if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
          }
          copyRecursiveSync(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
          console.log(`Copied: assets/${path.relative(process.cwd(), srcPath).replace(/^.*?assets[\\\/]/, '')}`);
        }
      }
    };
    
    copyRecursiveSync(assetsDir, destAssetsDir);
  }
};

// Copy main files
copyFiles(['.html', '.css', '.js', '.json', '.ico', '.xml', '.txt', '.webmanifest']);

// Copy assets
copyAssets();

console.log('Build completed successfully!');

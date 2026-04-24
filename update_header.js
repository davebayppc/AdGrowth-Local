const fs = require('fs');
const path = require('path');

function processFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');

    // 1. Remove Home link
    content = content.replace(/^\s*<li><a href="\/AdGrowth-Local\/">Home<\/a><\/li>\r?\n/gm, '');

    // 2. Remove Contact link
    content = content.replace(/^\s*<li><a href="\/AdGrowth-Local\/contact\/"[^>]*>Contact<\/a><\/li>\r?\n/gm, '');

    // 3. Add margin to Call Now to separate groups
    content = content.replace(/<li>(<a href="tel:555-0199")/g, '<li style="margin-left: 24px;">$1');

    // 4. Flexbox adjustments for layout
    content = content.replace(/<nav>/g, '<nav style="flex-grow: 1;">');
    content = content.replace(/<ul class="nav-links">/g, '<ul class="nav-links" style="justify-content: flex-end;">');

    fs.writeFileSync(filepath, content, 'utf8');
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === '.git' || file === 'node_modules') continue;
        const filepath = path.join(dir, file);
        const stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            walkDir(filepath);
        } else if (filepath.endsWith('.html')) {
            processFile(filepath);
        }
    }
}

const baseDir = __dirname;
walkDir(baseDir);
console.log('Update complete');

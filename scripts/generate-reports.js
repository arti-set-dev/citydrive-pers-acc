const fs = require('fs-extra');
const path = require('path');

const REPORTS_DIR = path.resolve(__dirname, '..', 'reports');

const MAP = {
  unit: path.resolve(__dirname, '..', 'jest-report'),
  screenshots: path.resolve(__dirname, '..', '.lostpixel'),
  storybook: path.resolve(__dirname, '..', 'storybook-static'),
};

async function generate() {
  try {
    if (!(await fs.pathExists(path.join(REPORTS_DIR, 'index.html')))) {
      console.error('❌ Error: reports/index.html template not found!');
      process.exit(1);
    }

    for (const [name, dir] of Object.entries(MAP)) {
      if (await fs.pathExists(dir)) {
        await fs.copy(dir, path.join(REPORTS_DIR, name));
        console.log(`✅ ${name} report copied`);
      } else {
        console.warn(`⚠️ Warning: ${dir} not found, skipping ${name}`);
      }
    }

    console.log('🚀 Reports consolidated successfully!');
  } catch (err) {
    console.error('❌ Error generating reports:', err);
    process.exit(1);
  }
}

generate();

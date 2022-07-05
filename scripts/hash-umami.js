const { writeFileSync, mkdirSync } = require('fs');
const { readFile } = require('fs/promises');
const path = require('path');

async function main() {
  const scriptLocation = path.resolve(process.cwd(), './public/umami.js');
  const content = await readFile(scriptLocation, {
    encoding: 'utf8',
  }).catch(() => '');
  if (!content) {
    throw new Error('Could not read umami.js');
  }

  const base64 = Buffer.from(content).toString('base64');
  mkdirSync(path.resolve(process.cwd(), './public/hash'), { recursive: true });
  writeFileSync(
    path.resolve(process.cwd(), './public/hash/umami.js'),
    `new Function(atob(\`${base64}\`))()`,
    {
      encoding: 'utf8',
      flag: 'w',
    },
  );
}

main();

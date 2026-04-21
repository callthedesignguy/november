import StyleDictionary from 'style-dictionary';
import { promises as fs } from 'fs';

const themes = ['ctdg', 'plumb', 'hippo', 'talki-oss'];

// ── Core tokens → dist/css/core.css + dist/js/tokens.js ──────────────────────

const coreSD = new StyleDictionary({
  source: ['tokens/core/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [{
        destination: 'core.css',
        format: 'css/variables',
        options: { selector: ':root', outputReferences: false },
      }],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/esm',
      }],
    },
  },
});

await coreSD.buildAllPlatforms();

// ── Per-theme tokens → dist/css/themes/[theme].css ───────────────────────────

await fs.mkdir('dist/css/themes', { recursive: true });

for (const theme of themes) {
  const themeSD = new StyleDictionary({
    source: [`tokens/themes/${theme}.json`],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'dist/css/themes/',
        files: [{
          destination: `${theme}.css`,
          format: 'css/variables',
          options: {
            selector: `[data-theme="${theme}"], .theme-${theme}`,
            outputReferences: false,
          },
        }],
      },
    },
  });

  await themeSD.buildAllPlatforms();
}

// ── Figma / Token Studio JSON ─────────────────────────────────────────────────
// Combine all tokens into a single file Token Studio can import.
// Token Studio expects: { "core": {...}, "ctdg": {...}, "plumb": {...}, ... }

async function readJson(path) {
  return JSON.parse(await fs.readFile(path, 'utf8'));
}

const figmaOutput = {
  core: {
    typography: await readJson('tokens/core/typography.json'),
    spacing:    await readJson('tokens/core/spacing.json'),
    radius:     await readJson('tokens/core/radius.json'),
    shadows:    await readJson('tokens/core/shadows.json'),
    motion:     await readJson('tokens/core/motion.json'),
  },
};

for (const theme of themes) {
  figmaOutput[theme] = await readJson(`tokens/themes/${theme}.json`);
}

await fs.mkdir('dist/figma', { recursive: true });
await fs.writeFile(
  'dist/figma/november-tokens.json',
  JSON.stringify(figmaOutput, null, 2),
);

console.log('✓ November tokens built — CSS, JS, and Figma outputs ready.');

const fs = require('fs');
const glob = require('glob');
const path = require('path');
const prettier = require('prettier');
const {parseManisfest, capitalize, patchSvgViewBox, fixName} = require('./helpers');

const rootDir = path.join(__dirname, '..');

let manifest = parseManisfest(
  fs.readFileSync(`${rootDir}/node_modules/cryptocurrency-icons/manifest.json`, 'utf-8')
);

const indexFile = path.join(rootDir, 'src', 'index.js');

glob(`${rootDir}/node_modules/cryptocurrency-icons/svg/color/*.svg`, (_, icons) => {
  fs.writeFileSync(indexFile, '', 'utf-8');
  icons.forEach(icon => {
    const svg = fs.readFileSync(icon, 'utf-8')
    const [name] = path.basename(icon).split('.');
    const capitalizedName = capitalize(name)
    const color = manifest[name];
    if (!color) return; // if icon is not present in manifest.json skip it 
    const scriptTemplate = `<script> export let size = 32; export let color = "${color}";</script>`

    const patchedSvg = patchSvgViewBox(svg)
      .replace(/width="[0-9]+"/, 'width={size}')
      .replace(/height="[0-9]+"/, 'height={size}')
      .replace(/fill="#.{3,6}"/, "fill={color}")

    const template = `${scriptTemplate} ${patchedSvg}`

    fs.writeFileSync(`${rootDir}/src/icons/${capitalizedName}.svelte`, prettier.format(template, {parser: "html"}), 'utf-8')

    const exportString = `export { default as ${fixName(capitalizedName)} } from './icons/${capitalizedName}.svelte';\r\n`
    fs.appendFileSync(indexFile, exportString, 'utf-8')
  })
})



const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const indexHtmlPath = path.join(rootDir, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const heroStartTag = '<!-- FULL-WIDTH HERO BANNER SLIDESHOW SECTION -->';
const heroEndTag = '<!-- ACCREDITATION SECTION -->';

const heroStartIndex = indexHtml.indexOf(heroStartTag);
const heroEndIndex = indexHtml.indexOf(heroEndTag);

if (heroStartIndex !== -1 && heroEndIndex !== -1) {
  const programsHeroHtml = `<!-- PAGE HERO HEADER -->
    <section style="background: linear-gradient(135deg, #0b1727 0%, #1e293b 100%); color: #ffffff; padding: 4rem 0; text-align: center;">
      <div class="container">
        <h1 style="font-size: 2.75rem; font-weight: 900; margin-bottom: 0.75rem;">Online Degree Directory</h1>
        <p style="color: #cbd5e1; font-size: 1.1rem; max-width: 680px; margin: 0 auto;">
          UGC-Entitled Master's and Bachelor's Programs Tailored for Career Advancement
        </p>
      </div>
    </section>

    `;
  
  const programsHtml = indexHtml.substring(0, heroStartIndex) + programsHeroHtml + indexHtml.substring(heroEndIndex);
  fs.writeFileSync(path.join(rootDir, 'programs.html'), programsHtml, 'utf8');
  console.log('Created programs.html successfully!');
} else {
  console.error('Could not locate hero section in index.html, start:', heroStartIndex, 'end:', heroEndIndex);
}

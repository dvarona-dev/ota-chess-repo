#!/usr/bin/env node

/**
 * Sitemap Generator for Chess Grandmasters Wiki
 *
 * This script generates a sitemap.xml file by fetching all grandmaster usernames
 * from the Chess.com API and creating entries for each player profile page.
 *
 * Usage: node scripts/generate-sitemap.js
 */

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = 'https://chess-grandmasters-wiki.com'; // Update with your actual domain
const API_URL = 'https://api.chess.com/pub/titled/GM';
const OUTPUT_FILE = join(process.cwd(), 'public', 'sitemap.xml');
const PRIORITY_HOME = '1.0';
const PRIORITY_PLAYER = '0.8';
const CHANGE_FREQ_HOME = 'weekly';
const CHANGE_FREQ_PLAYER = 'monthly';

async function fetchGrandmasters() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.players || [];
  } catch (error) {
    console.error('Error fetching grandmasters:', error);
    return [];
  }
}

function generateSitemap(usernames) {
  const now = new Date().toISOString().split('T')[0];

  const urls = [
    // Homepage
    `  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${CHANGE_FREQ_HOME}</changefreq>
    <priority>${PRIORITY_HOME}</priority>
  </url>`,
    // Player profiles
    ...usernames.map(
      (username) => `  <url>
    <loc>${SITE_URL}/player/${encodeURIComponent(username)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${CHANGE_FREQ_PLAYER}</changefreq>
    <priority>${PRIORITY_PLAYER}</priority>
  </url>`
    ),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

async function main() {
  console.log('Generating sitemap...');
  console.log(`Fetching grandmasters from ${API_URL}...`);

  const usernames = await fetchGrandmasters();
  console.log(`Found ${usernames.length} grandmasters`);

  if (usernames.length === 0) {
    console.warn('Warning: No grandmasters found. Creating sitemap with homepage only.');
  }

  const sitemap = generateSitemap(usernames);

  writeFileSync(OUTPUT_FILE, sitemap, 'utf-8');
  console.log(`✓ Sitemap generated successfully: ${OUTPUT_FILE}`);
  console.log(`  Total URLs: ${usernames.length + 1}`);
}

main().catch((error) => {
  console.error('Error generating sitemap:', error);
  process.exit(1);
});

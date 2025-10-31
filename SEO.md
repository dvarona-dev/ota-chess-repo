# SEO Implementation

This document outlines the SEO (Search Engine Optimization) features implemented in the Chess Grandmasters Wiki application.

## Features Implemented

### 1. Dynamic Meta Tags
- **Component**: `src/components/SEO/SEO.tsx`
- Uses `react-helmet-async` for dynamic meta tag management
- Updates title, description, keywords, and Open Graph tags per page
- Automatically generates canonical URLs

### 2. Page-Specific SEO

#### Homepage (`/`)
- Title: "Chess Grandmasters Directory | Chess Grandmasters Wiki"
- Dynamic description with player count
- Structured data (JSON-LD) for CollectionPage schema
- ItemList schema with top 50 grandmasters

#### Player Profile Pages (`/player/:username`)
- Dynamic title: "{Player Name} - Chess Grandmaster Profile | Chess Grandmasters Wiki"
- Rich description including country, FIDE rating, and follower count
- Player avatar as Open Graph image
- Person schema with detailed information (country, FIDE rating, social links)

#### 404 Page
- Appropriate meta tags for error pages
- Prevents indexing of error pages

### 3. Structured Data (JSON-LD)
- **Homepage**: CollectionPage + ItemList schema
- **Player Profiles**: Person schema with:
  - Name, alternate name (username)
  - Country and location
  - FIDE rating
  - Social media links (Chess.com, Twitch, streaming platforms)
  - Job title (Chess Grandmaster)

### 4. Open Graph & Twitter Cards
- Open Graph tags for social media sharing
- Twitter Card support (summary_large_image)
- Dynamic images per page (player avatars on profile pages)

### 5. robots.txt
- Located at `/public/robots.txt`
- Allows all search engines to crawl
- Points to sitemap location
- Crawl delay set to prevent server overload

### 6. Sitemap Generation
- Script: `scripts/generate-sitemap.js`
- Generates `public/sitemap.xml` automatically before build
- Includes homepage and all player profile pages
- Proper priority and changefreq settings
- Run manually: `npm run build:sitemap`
- Auto-runs before build via `prebuild` script

## Configuration

### Site URL
Update the `SITE_URL` constant in:
- `src/components/SEO/SEO.tsx` (line 13)
- `scripts/generate-sitemap.js` (line 14)
- `public/robots.txt` (line 8)

### Open Graph Image
Create an Open Graph image and place it at `/public/og-image.png`, or update the `DEFAULT_IMAGE` constant in `SEO.tsx`.

## Best Practices Implemented

✅ Semantic HTML (proper heading hierarchy, semantic tags)  
✅ Meta descriptions for all pages  
✅ Unique titles per page  
✅ Canonical URLs  
✅ Mobile-responsive viewport meta tag  
✅ Image alt text for accessibility and SEO  
✅ Structured data (Schema.org)  
✅ robots.txt for crawler guidance  
✅ XML sitemap for search engines  
✅ Open Graph tags for social sharing  
✅ Twitter Card support  

## Testing SEO

1. **Meta Tags**: Use browser dev tools or tools like:
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

2. **Structured Data**: Validate JSON-LD using:
   - [Schema.org Validator](https://validator.schema.org/)
   - Google Rich Results Test

3. **Sitemap**: Verify at `https://your-domain.com/sitemap.xml`

4. **robots.txt**: Verify at `https://your-domain.com/robots.txt`

## Future Enhancements

- [ ] Add hreflang tags for internationalization
- [ ] Implement breadcrumb structured data
- [ ] Add FAQ schema if applicable
- [ ] Create and optimize OG images
- [ ] Implement preconnect/prefetch for external resources
- [ ] Add Article schema for blog posts (if added)
- [ ] Performance optimization (Core Web Vitals)


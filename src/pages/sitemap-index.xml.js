import products from '../data/products.json';

export async function GET() {
  const locales = ['es', 'en', 'fr', 'tr', 'it', 'de', 'nl', 'ru'];
  const pages = ['', 'shop', 'catalogo', 'lookbook', 'contacto', 'atelier', 'alta-costura', 'online-couture', 'privacidad'];
  const siteUrl = 'https://minalidya.es';
  const now = new Date().toISOString();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  // Add static pages for each locale
  locales.forEach(loc => {
    pages.forEach(page => {
      const path = page === '' ? (loc === 'es' ? '' : `${loc}/`) : (loc === 'es' ? `${page}/` : `${loc}/${page}/`);
      const url = `${siteUrl}/${path}`;
      
      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      
      // Alternates
      locales.forEach(altLoc => {
        const altPath = page === '' ? (altLoc === 'es' ? '' : `${altLoc}/`) : (altLoc === 'es' ? `${page}/` : `${altLoc}/${page}/`);
        xml += `    <xhtml:link rel="alternate" hreflang="${altLoc}" href="${siteUrl}/${altPath}" />\n`;
      });
      
      xml += '  </url>\n';
    });
  });

  // Add dynamic products
  products.forEach(product => {
    const slug = product.slug || product.id.toString();
    locales.forEach(loc => {
      const path = loc === 'es' ? `product/${slug}/` : `${loc}/product/${slug}/`;
      const url = `${siteUrl}/${path}`;

      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.6</priority>\n';

      // Alternates for product
      locales.forEach(altLoc => {
        const altPath = altLoc === 'es' ? `product/${slug}/` : `${altLoc}/product/${slug}/`;
        xml += `    <xhtml:link rel="alternate" hreflang="${altLoc}" href="${siteUrl}/${altPath}" />\n`;
      });

      xml += '  </url>\n';
    });
  });

  xml += '</urlset>';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}

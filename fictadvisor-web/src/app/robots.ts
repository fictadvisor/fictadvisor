import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow Google's crawlers so the site can be indexed in Google Search.
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Googlebot-News',
          'Googlebot-Video',
          'Storebot-Google',
          'Google-InspectionTool',
        ],
        allow: '/',
      },
      // Block every other crawler.
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
  };
}

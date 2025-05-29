import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply for Azerbaijan eVisa Online | Fast & Secure',
  description: 'Complete your Azerbaijan eVisa application quickly and securely. Standard processing within 3-5 working days. Get your e-visa for tourism, business, or other purposes.',
  keywords: ['Azerbaijan eVisa', 'Azerbaijan visa', 'online visa application', 'Baku visa', 'e-visa Azerbaijan', 'travel to Azerbaijan'],
  openGraph: {
    title: 'Apply for Azerbaijan eVisa Online | Fast & Secure',
    description: 'Complete your Azerbaijan eVisa application quickly and securely. Get your e-visa for tourism, business, or travel.',
    url: 'https://yourdomain.com/apply', // Replace with actual domain in production
    type: 'website',
    images: [
      {
        url: 'https://yourdomain.com/og-image-evisa-apply.jpg', // Replace with an actual image URL
        width: 1200,
        height: 630,
        alt: 'Azerbaijan eVisa Application',
      },
    ],
  },
  twitter: { // Example, can add more Twitter specific tags
    card: 'summary_large_image',
    title: 'Apply for Azerbaijan eVisa Online | Fast & Secure',
    description: 'Complete your Azerbaijan eVisa application quickly and securely.',
    images: ['https://yourdomain.com/twitter-image-evisa-apply.jpg'], // Replace with an actual image URL
  },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}

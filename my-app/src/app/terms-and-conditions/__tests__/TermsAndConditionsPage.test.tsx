import React from 'react';
import { render, screen } from '@testing-library/react';
import TermsAndConditionsPage from '../page'; // Adjust path as necessary

// Mock Next.js Link component for modern behavior (no legacyBehavior)
jest.mock('next/link', () => {
  return ({ children, href, className }: { children: React.ReactNode, href: string, className?:string }) => {
    // Link renders an <a> tag with its children inside.
    // Pass through className for styling.
    return <a href={href} className={className}>{children}</a>;
  };
});

describe('TermsAndConditionsPage', () => {
  it('renders the main heading', () => {
    render(<TermsAndConditionsPage />);
    const heading = screen.getByRole('heading', {
      name: /Terms and Conditions for Azerbaijan eVisa Application/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the "Last Updated" date', () => {
    render(<TermsAndConditionsPage />);
    // The date is dynamic, so we check for the presence of "Last Updated"
    const lastUpdatedText = screen.getByText(/Last Updated:/i);
    expect(lastUpdatedText).toBeInTheDocument();
  });

  it('contains introductory text', () => {
    render(<TermsAndConditionsPage />);
    const introText = screen.getByText(/Please read these Terms and Conditions/i);
    expect(introText).toBeInTheDocument();
  });

   it('contains a link to start a new application', () => {
    render(<TermsAndConditionsPage />);
    const applyLink = screen.getByRole('link', { name: /Start New Application/i });
    expect(applyLink).toBeInTheDocument();
    expect(applyLink).toHaveAttribute('href', '/apply');
  });

  it('contains a link to contact us', () => {
    render(<TermsAndConditionsPage />);
    const contactLink = screen.getByRole('link', { name: /contact us/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/contact-us');
  });
});

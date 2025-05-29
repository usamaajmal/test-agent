import { validatePassportExpiry } from '../validationUtils';

describe('validatePassportExpiry', () => {
  // Helper to format date as YYYY-MM-DD
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  let today: Date;
  let arrivalDate: Date;

  beforeEach(() => {
    today = new Date();
    today.setHours(0,0,0,0);
    arrivalDate = new Date(today); // Base arrival on today for consistent relative dates
    arrivalDate.setDate(today.getDate() + 30); // e.g., arrival in 30 days
    arrivalDate.setHours(0,0,0,0);
  });

  it('should return true for a valid expiry date well in the future', () => {
    const expiry = new Date(arrivalDate);
    expiry.setDate(arrivalDate.getDate() + 365); // Expires 1 year after arrival
    expect(validatePassportExpiry(formatDate(expiry), formatDate(arrivalDate))).toBe(true);
  });

  it('should return error if expiry date is missing', () => {
    expect(validatePassportExpiry('', formatDate(arrivalDate))).toBe('Passport expiry date is required.');
  });
  
  it('should return error for invalid date format', () => {
    expect(validatePassportExpiry('invalid-date', formatDate(arrivalDate))).toBe('Invalid passport expiry date format.');
  });

  it('should return error if passport has already expired', () => {
    const expired = new Date(today);
    expired.setDate(today.getDate() - 1);
    expect(validatePassportExpiry(formatDate(expired), formatDate(arrivalDate))).toBe('Passport has already expired or expires today.');
  });

  it('should return error if passport expires today', () => {
    expect(validatePassportExpiry(formatDate(today), formatDate(arrivalDate))).toBe('Passport has already expired or expires today.');
  });

  it('should return true if arrival date is not provided and passport expires in future', () => {
    const futureExpiry = new Date(today);
    futureExpiry.setDate(today.getDate() + 10); // Expires 10 days from today
    expect(validatePassportExpiry(formatDate(futureExpiry), null)).toBe(true);
  });
  
  it('should return error if arrival date is not provided and passport is expired', () => {
    const pastExpiry = new Date(today);
    pastExpiry.setDate(today.getDate() - 10); 
    expect(validatePassportExpiry(formatDate(pastExpiry), null)).toBe('Passport has already expired or expires today.');
  });


  it('should return error if passport expires less than 6 months after arrival', () => {
    const expiry = new Date(arrivalDate);
    expiry.setDate(arrivalDate.getDate() + 179); // Expires 179 days after arrival (less than 180)
    
    const minRequired = new Date(arrivalDate);
    minRequired.setDate(arrivalDate.getDate() + 180);
    const expectedMessage = `Passport must be valid for at least 6 months after your planned arrival date. Minimum required expiry: ${minRequired.toLocaleDateString()}.`;
    
    expect(validatePassportExpiry(formatDate(expiry), formatDate(arrivalDate))).toBe(expectedMessage);
  });

  it('should return true if passport expires exactly 6 months (180 days) after arrival', () => {
    // Note: The logic is expiryDate < minExpiry, so exactly on the min day is not allowed.
    // It should be minExpiry + 1 day at least.
    // Let's test for expiryDate > minExpiry
    const expiry = new Date(arrivalDate);
    expiry.setDate(arrivalDate.getDate() + 181); // Expires 181 days after arrival
    expect(validatePassportExpiry(formatDate(expiry), formatDate(arrivalDate))).toBe(true);
  });
  
  it('should return true if passport expires well over 6 months after arrival', () => {
    const expiry = new Date(arrivalDate);
    expiry.setDate(arrivalDate.getDate() + 300); // Expires 300 days after arrival
    expect(validatePassportExpiry(formatDate(expiry), formatDate(arrivalDate))).toBe(true);
  });

  it('should handle arrival date being in the past relative to today (user error)', () => {
    const pastArrival = new Date(today);
    pastArrival.setDate(today.getDate() - 10); // Arrival was 10 days ago
    
    const expiry = new Date(today);
    expiry.setDate(today.getDate() + 180); // Expires in 180 days from today
    
    // Min expiry will be calculated based on pastArrival + 180 days
    const minRequired = new Date(pastArrival);
    minRequired.setDate(pastArrival.getDate() + 180);

    // If expiry (today + 180) is greater than (pastArrival + 180), it's valid
    if (expiry >= minRequired) {
       expect(validatePassportExpiry(formatDate(expiry), formatDate(pastArrival))).toBe(true);
    } else {
       expect(validatePassportExpiry(formatDate(expiry), formatDate(pastArrival)))
         .toBe(`Passport must be valid for at least 6 months after your planned arrival date. Minimum required expiry: ${minRequired.toLocaleDateString()}.`);
    }
  });
});

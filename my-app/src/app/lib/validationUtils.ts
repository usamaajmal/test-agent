/**
 * Validates the passport expiry date.
 * Passport must be valid for at least 6 months (180 days) after the planned date of arrival.
 * The e-visa itself is valid for 90 days from arrival. So, passport must be valid for
 * arrival_date + 90_days_visa_validity + 90_days_buffer.
 *
 * @param passportExpiryDateStr The passport expiry date string (YYYY-MM-DD).
 * @param dateOfArrivalStr The planned date of arrival string (YYYY-MM-DD).
 * @returns True if valid, or an error message string if invalid.
 */
export const validatePassportExpiry = (
  passportExpiryDateStr: string,
  dateOfArrivalStr: string | null | undefined
): boolean | string => {
  if (!passportExpiryDateStr) {
    return 'Passport expiry date is required.';
  }

  const expiryDate = new Date(passportExpiryDateStr);
  // Check if expiryDate is a valid date
  if (isNaN(expiryDate.getTime())) {
    return 'Invalid passport expiry date format.';
  }
   // Set hours to 0 to compare dates only
  expiryDate.setHours(0,0,0,0);

  const today = new Date();
  today.setHours(0,0,0,0);

  if (expiryDate <= today) {
    return 'Passport has already expired or expires today.';
  }

  if (!dateOfArrivalStr) {
    // If arrival date is not yet provided, we can only check if expiry is in the future.
    // This case is handled by the check above (expiryDate <= today).
    // More specific validation will trigger once dateOfArrival is set.
    return true; 
  }
  
  const arrivalDate = new Date(dateOfArrivalStr);
  if (isNaN(arrivalDate.getTime())) {
    return 'Invalid date of arrival format for validation.'; // Should not happen if date input is correct
  }
  arrivalDate.setHours(0,0,0,0);

  // Calculate minimum required expiry date: arrival_date + 180 days
  // (90 days e-visa validity + 90 days buffer for passport validity beyond visa)
  const minExpiry = new Date(arrivalDate);
  minExpiry.setDate(arrivalDate.getDate() + 180); 

  if (expiryDate < minExpiry) {
    return `Passport must be valid for at least 6 months after your planned arrival date. Minimum required expiry: ${minExpiry.toLocaleDateString()}.`;
  }

  return true;
};

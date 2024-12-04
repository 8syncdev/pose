/**
 * Formats a date to ISO string format with timezone support
 * @param date The date to format (Date, timestamp or string)
 * @param options Configuration options 
 * @param options.timezone The timezone to use (default: 'UTC')
 * @returns ISO formatted date string that can be easily parsed back to Date
 */
export function formatDateLocale(
  date: Date | number | string,
  options: {
    timezone?: string;
  } = {},
  locales: string = 'en-US'
): string {
  const {
    timezone = 'UTC'
  } = options;

  // Check if date is valid
  if (!date) {
    throw new Error('Date is required');
  }

  let dateObj: Date;

  // Handle different input types
  if (date instanceof Date) {
    dateObj = date;
  } else if (typeof date === 'number') {
    dateObj = new Date(date);
  } else if (typeof date === 'string') {
    const timestamp = Date.parse(date);
    if (isNaN(timestamp)) {
      throw new Error('Invalid date string format');
    }
    dateObj = new Date(timestamp);
  } else {
    throw new Error('Invalid date format');
  }

  // Validate date object
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date');
  }

  try {
    // Convert to specified timezone
    const tzOptions: Intl.DateTimeFormatOptions = { 
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
      hour12: false
    };

    // Format date parts in target timezone
    const parts = new Intl.DateTimeFormat(locales, tzOptions).formatToParts(dateObj);
    
    // Build ISO string manually to avoid invalid date issues
    const year = parts.find(p => p.type === 'year')?.value;
    const month = parts.find(p => p.type === 'month')?.value;
    const day = parts.find(p => p.type === 'day')?.value;
    const hour = parts.find(p => p.type === 'hour')?.value;
    const minute = parts.find(p => p.type === 'minute')?.value;
    const second = parts.find(p => p.type === 'second')?.value;
    const fractional = parts.find(p => p.type === 'fractionalSecond')?.value || '000';

    return `${year}-${month}-${day}T${hour}:${minute}:${second}.${fractional}Z`;

  } catch (error) {
    // Fallback to UTC ISO string if timezone conversion fails
    return dateObj.toISOString();
  }
}

// Example usage:
// const date = new Date();
// console.log(formatDateLocale(date)); // "2023-10-20T14:24:30.000Z"
// console.log(formatDateLocale(Date.now())); // "2023-10-20T14:24:30.000Z"
// console.log(formatDateLocale("2023-10-20")); // "2023-10-20T00:00:00.000Z"
// 
// To convert back to Date:
// const dateObj = new Date(formatDateLocale(date));

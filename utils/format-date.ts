export function formatDate(dateString: string): string {
  try {
    if (!dateString) return 'Invalid date';

    let date: Date;
    let formatter: Intl.DateTimeFormat;

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      // Case 1: Plain YYYY-MM-DD (date-only from Strapi)
      date = new Date(dateString); // safe, since we force UTC below
      formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC', // 👈 prevents off-by-one day issues
      });
    } else {
      // Case 2: Full ISO timestamp (datetime from Strapi)
      date = new Date(dateString);
      formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        // 👆 no timeZone, so user sees their local date
      });
    }

    if (isNaN(date.getTime())) throw new Error('Invalid date string');

    return formatter.format(date).replace(/,/g, ' ');
  } catch (error) {
    console.error(`Error formatting date: ${dateString}`, error);
    return 'Invalid date';
  }
}

export function formatTime(timeString: string): string {
  try {
    // // Parse ISO string to Date object

    const dateObject = new Date(); // Example Date object (e.g., current date)

    // 1. Extract Date Components
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Add 1 and pad with '0'
    const day = dateObject.getDate().toString().padStart(2, '0'); // Pad with '0'

    // 2. Format Date String
    const dateString = `${year}-${month}-${day}`;

    // 3. Combine Date and Time Strings
    const combinedDateTimeString = `${dateString} ${timeString}`;

    // 4. Create New Date Object
    const newDateObject = new Date(combinedDateTimeString);
    // Check if date is valid
    if (isNaN(newDateObject.getTime())) {
      throw new Error('Invalid time string');
    }

    // Format the date using Intl.DateTimeFormat for more consistent results
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    return formatter.format(newDateObject);
  } catch (error) {
    console.error(`Error formatting date: ${timeString}`, error);
    return 'Invalid date';
  }
}

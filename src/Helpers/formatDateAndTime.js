export const formatDateAndTime = (createdAt) => {
    const date = new Date(createdAt);
  
    // Format date as "31 / 01 / 2024"
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(/\//g, ' / ');
  
    // Format time as "05.30 PM"
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).replace(':', '.');
  
    return { formattedDate, formattedTime };
  };
  
  // Example usage:
  const createdAt = '2024-11-10T22:20:38.408Z';
  const { formattedDate, formattedTime } = formatDateAndTime(createdAt);
  
  console.log('Date:', formattedDate); // "10 / 11 / 2024"
  console.log('Time:', formattedTime);  // "10.20 PM"
  
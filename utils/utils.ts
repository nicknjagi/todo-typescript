export function formatDate(isoDateString: string): string {
  // Create a new Date object from the ISO string
  const date = new Date(isoDateString);

  // Extract the day, month, year, hours, and minutes
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12? 'pm' : 'am';

  // Format the hours and minutes to 12-hour format
  const formattedHours = hours % 12 || 12; // The hour (0-11) or 12 AM
  const formattedMinutes = minutes < 10? '0' + minutes : minutes;

  // Return the formatted date and time
  return `${day}-${month}-${year} at ${formattedHours}:${formattedMinutes}${ampm}`;
}


export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedTime =  `${hours > 0 ? hours+'hrs ':''}` + `${ remainingMinutes > 0 ?remainingMinutes.toString().padStart(2, '0') + 'mins': ''}`;
  
  return formattedTime;
}
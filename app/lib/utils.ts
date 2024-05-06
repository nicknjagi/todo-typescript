export function formatDate(isoDateString: string | Date): string {
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
  const weeks = Math.floor(minutes / (60 * 24 * 7));
  const remainingMinutes = minutes % (60 * 24 * 7);
  const days = Math.floor(remainingMinutes / (60 * 24));
  const remainingMinutesInDay = remainingMinutes % (60 * 24);
  const hours = Math.floor(remainingMinutesInDay / 60);
  const finalMinutes = remainingMinutesInDay % 60;

  const formattedTime =  `${weeks > 0? weeks+(weeks > 1 ? 'wks ':' wk ') : ''}` + `${ days > 0? days+(days > 1 ? 'days ':'day ') : ''}` + `${ hours > 0? hours+(hours > 1 ? 'hrs ':'hr ') : ''}` + `${ finalMinutes > 0?finalMinutes.toString().padStart(2, '0') + (finalMinutes > 1? 'mins' : 'min') : ''}`;
  
  return formattedTime;
}


export function daysRemaining(dueDateStr: string): string {
  const dueDate: Date = new Date(dueDateStr);
  
  // Get the current date and time
  const now: Date = new Date();


  if(formatDate(dueDate).split('at')[0] === formatDate(now).split('at')[0]){
    return 'Due today'
  }
  
  // Calculate the difference in milliseconds between the target date and the current date
  const timeDifference = dueDate.getTime() - now.getTime();
  
  if(timeDifference <= 0){
    return 'Overdue'
  }
  
  // Convert the difference from milliseconds to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
  // Calculate the number of weeks and days remaining
  const weeks = Math.floor(daysDifference / 7);
  let days = daysDifference % 7;

  if(weeks === 0 && days === 0){
    return 'Due tomorrow'
  }
  
  let result = `${weeks > 0 ? weeks + ' week'+ (weeks!== 1 ? 's' : ''): ''} ${days > 0 ? days + ' day'+ (days!== 1 ? 's' : ''): ''} remaining`;
  
  return result;
}
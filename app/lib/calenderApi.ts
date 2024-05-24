export async function fetchGoogleCalendarEvents(accessToken:string) {
  const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
  const options = {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    const data = await response.json();
    return data.items; 
  } catch (error) {
    console.error('Error fetching Google Calendar events:', error);
    throw error; // Rethrow the error to handle it further up the call stack
  }
}
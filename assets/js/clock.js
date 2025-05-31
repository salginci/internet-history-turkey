// Function to format time for a specific timezone
function getTimeForTimezone(timezone) {
    const now = new Date();
    const options = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    return now.toLocaleTimeString('tr-TR', options);
}

// Function to get date info for a specific timezone
function getDateInfoForTimezone(timezone) {
    const now = new Date();
    const options = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    
    const localTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const utcTime = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    
    const diffHours = Math.floor((localTime - utcTime) / (1000 * 60 * 60));
    const isToday = localTime.getDate() === now.getDate();
    
    return {
        isToday,
        diffHours
    };
}

// Function to update the digital clock
function updateClock() {
    const now = new Date();
    
    // Format time as HH:MM:SS
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Format date
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const dateString = `${dayName} - ${day} ${month} ${year}`;
    
    // Update the DOM
    const timeElement = document.querySelector('.digital-clock .time');
    const dateElement = document.querySelector('.digital-clock .date');
    
    if (timeElement) timeElement.textContent = timeString;
    if (dateElement) dateElement.textContent = dateString;
    
    // Update world clocks
    const timezones = {
        'istanbul': 'Europe/Istanbul',
        'riyadh': 'Asia/Riyadh',
        'newyork': 'America/New_York',
        'london': 'Europe/London'
    };
    
    // Update each world clock
    Object.entries(timezones).forEach(([city, timezone]) => {
        const timeElement = document.querySelector(`.world-clock-item[data-city="${city}"] .time`);
        const dateInfoElement = document.querySelector(`.world-clock-item[data-city="${city}"] .date-info`);
        
        if (timeElement) {
            timeElement.textContent = getTimeForTimezone(timezone);
        }
        
        if (dateInfoElement) {
            const dateInfo = getDateInfoForTimezone(timezone);
            const dayText = dateInfo.isToday ? 'Bugün' : 'Dün';
            const timeDiff = dateInfo.diffHours >= 0 ? `+${dateInfo.diffHours}` : dateInfo.diffHours;
            dateInfoElement.textContent = `${dayText}, ${timeDiff} S`;
        }
    });
}

// Update the clock immediately and then every second
updateClock();
setInterval(updateClock, 1000); 
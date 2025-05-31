document.addEventListener('DOMContentLoaded', function() {
    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const holidayItems = document.querySelectorAll('.holiday-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Show/hide holiday items based on filter
            holidayItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Calendar integration
    const calendarButtons = document.querySelectorAll('.add-to-calendar');
    
    calendarButtons.forEach(button => {
        button.addEventListener('click', function() {
            const holidayItem = this.closest('.holiday-item');
            const holidayInfo = {
                title: holidayItem.querySelector('h3').textContent,
                date: {
                    month: holidayItem.querySelector('.month').textContent,
                    day: holidayItem.querySelector('.day').textContent,
                    year: holidayItem.querySelector('.year').textContent
                },
                duration: holidayItem.querySelector('.holiday-duration').textContent,
                description: holidayItem.querySelector('.holiday-description').textContent
            };

            // Create calendar event data
            const eventData = {
                title: holidayInfo.title,
                description: holidayInfo.description,
                startTime: new Date(
                    holidayInfo.date.year,
                    getMonthNumber(holidayInfo.date.month),
                    parseInt(holidayInfo.date.day)
                ),
                duration: getDurationInHours(holidayInfo.duration)
            };

            // Add to calendar (Google Calendar)
            const googleCalendarUrl = createGoogleCalendarUrl(eventData);
            window.open(googleCalendarUrl, '_blank');
        });
    });

    // Helper functions
    function getMonthNumber(monthName) {
        const months = {
            'Ocak': 0, 'Şubat': 1, 'Mart': 2, 'Nisan': 3,
            'Mayıs': 4, 'Haziran': 5, 'Temmuz': 6, 'Ağustos': 7,
            'Eylül': 8, 'Ekim': 9, 'Kasım': 10, 'Aralık': 11
        };
        return months[monthName];
    }

    function getDurationInHours(duration) {
        const days = parseInt(duration);
        return days * 24; // Convert days to hours
    }

    function createGoogleCalendarUrl(eventData) {
        const startDate = eventData.startTime.toISOString().replace(/-|:|\.\d+/g, '');
        const endDate = new Date(eventData.startTime.getTime() + (eventData.duration * 60 * 60 * 1000))
            .toISOString().replace(/-|:|\.\d+/g, '');

        const params = new URLSearchParams({
            action: 'TEMPLATE',
            text: eventData.title,
            details: eventData.description,
            dates: `${startDate}/${endDate}`,
            ctz: 'Europe/Istanbul'
        });

        return `https://calendar.google.com/calendar/render?${params.toString()}`;
    }

    // Update current date and time
    function updateDateTime() {
        const now = new Date();
        const timeElement = document.querySelector('.digital-clock .time');
        const dateElement = document.querySelector('.digital-clock .date');

        if (timeElement && dateElement) {
            timeElement.textContent = now.toLocaleTimeString('tr-TR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            dateElement.textContent = now.toLocaleDateString('tr-TR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }

    // Update time every second
    setInterval(updateDateTime, 1000);
    updateDateTime(); // Initial update
}); 
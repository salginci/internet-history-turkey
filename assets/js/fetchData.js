async function fetchTimelineData(endpoint, section) {
    const timelineContainer = document.querySelector('.timeline');
    if (!timelineContainer) return;

    // Show loading state
    timelineContainer.innerHTML = '<div class="loading">Loading timeline data...</div>';

    try {
        const response = await fetch(endpoint);
        const jsonData = await response.json();
        
        console.log('Fetched data:', jsonData); // Debug log
        console.log('Looking for section:', section); // Debug log
        
        // Select the appropriate data section based on the page
        const data = jsonData || [];
        
        console.log('Selected data:', data); // Debug log

        if (data.length === 0) {
            timelineContainer.innerHTML = '<div class="error">No data available</div>';
            return;
        }

        // Render timeline items
        const timelineHTML = data.timeline.map(item => `
            <div class="timeline-event">
                <div class="event-content">
                    <h3>${item.year}</h3>
                    <img src="${item.image}" alt="${item.event}">
                    <p class="event-title">${item.event}</p>
                    <p class="event-description">${item.description}</p>
                    ${item.source ? `
                        <div class="event-source">
                            Source: <a href="${item.source}" target="_blank">${item.source}</a>
                        </div>
                    ` : ''}
                    ${item.references ? `
                        <div class="event-source">
                            References:
                            <ul>
                                ${item.references.map(ref => `
                                    <li><a href="${ref}" target="_blank">${ref}</a></li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');

        timelineContainer.innerHTML = timelineHTML;
    } catch (error) {
        timelineContainer.innerHTML = '<div class="error">Error loading timeline data</div>';
        console.error('Error:', error);
    }
}

// Initialize timeline based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    let endpoint = 'http://localhost:8080/assets/data/data.json?q=';
    
    console.log('Current path:', currentPath); // Debug log
    let route=currentPath.replace('/', '');
    endpoint=endpoint+route;
    if (currentPath.includes('broadband')) {
        fetchTimelineData(endpoint, 'timeline');
    } else if (currentPath.includes('mobile')) {
        fetchTimelineData(endpoint, 'timeline');
    } else {
        // Home page or default
        fetchTimelineData(endpoint, 'timeline');
    }
}); 
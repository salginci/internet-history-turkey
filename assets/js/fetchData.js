async function fetchTimelineData(endpoint, section) {
    const timelineContainer = document.querySelector('.timeline');
    if (!timelineContainer) return;

    timelineContainer.innerHTML = '<div class="loading">Loading timeline data...</div>';

    try {
        const response = await fetch(endpoint);
        
        if (!response.ok) {
            timelineContainer.innerHTML = '<div class="error">Unable to fetch data from server</div>';
            return;
        }

        let jsonData;
        try {
            jsonData = await response.json();
        } catch {
            timelineContainer.innerHTML = '<div class="error">Server returned malformed response</div>';
            return;
        }
        
        if (!jsonData || !jsonData.timeline || !Array.isArray(jsonData.timeline)) {
            timelineContainer.innerHTML = '<div class="error">Invalid data format received</div>';
            return;
        }

        const data = jsonData || [];

        if (data.timeline.length === 0) {
            timelineContainer.innerHTML = '<div class="error">No data available</div>';
            return;
        }

        const timelineHTML = data.timeline.map(item => `
            <div class="timeline-event">
                <div class="event-content">
                    <h3>${item.year}</h3>
                    <img src="${item.image}" alt="${item.event} - ${item.year}">
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
        timelineContainer.innerHTML = '<div class="error">Unable to load timeline data</div>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    let endpoint = 'http://localhost:8080/assets/data/data.json?q=';
    
    let route = currentPath.replace('/', '');
    endpoint = endpoint + route;
    if (currentPath.includes('broadband')) {
        fetchTimelineData(endpoint, 'timeline');
    } else if (currentPath.includes('mobile')) {
        fetchTimelineData(endpoint, 'timeline');
    } else {
        fetchTimelineData(endpoint, 'timeline');
    }
}); 
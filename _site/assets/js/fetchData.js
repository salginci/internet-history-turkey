async function fetchTimelineData(endpoint, section) {
    const timelineContainer = document.querySelector('.timeline');
    if (!timelineContainer) return;

    timelineContainer.innerHTML = '<div class="loading">Loading timeline data...</div>';
    console.log("calling: ", endpoint);
    endpoint = endpoint.replace(/\/$/, ''); // Remove trailing slash if exists

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

function loadTimelineForCurrentPage() {
    const currentPath = window.location.pathname;
    let endpoint = 'https://ihsturkey-api-332658529949.europe-west1.run.app?q=';
    
    let route = currentPath.replace(/^\/|\/$/g, ''); // Remove leading and trailing slashes
    if (!route) route = "timeline";
    
    endpoint = endpoint + route;
    fetchTimelineData(endpoint, 'timeline');
}

document.addEventListener('DOMContentLoaded', loadTimelineForCurrentPage);

// Handle navigation changes
window.addEventListener('popstate', loadTimelineForCurrentPage);

// Intercept navigation clicks
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href.includes(window.location.origin)) {
        e.preventDefault();
        const newPath = link.href;
        window.history.pushState({}, '', newPath);
        loadTimelineForCurrentPage();
    }
}); 
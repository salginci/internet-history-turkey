console.log('Stopwatch script loaded');
// Stopwatch functionality
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let laps = [];
let lastLapTime = 0;

// DOM elements
const timeDisplay = document.querySelector('.digital-clock .time');
const startButton = document.querySelector('.set-alarm-btn');
const lapButton = document.querySelector('.lap-btn');
const resetButton = document.querySelector('.reset-btn');
const lapsList = document.querySelector('.laps-list');

console.log('Stopwatch elements:', {
    timeDisplay,
    startButton,
    lapButton,
    resetButton,
    lapsList
});

// Format time as MM:SS:CC (centiseconds)
function formatTime(timeInMilliseconds) {
    const minutes = Math.floor(timeInMilliseconds / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const centiseconds = Math.floor((timeInMilliseconds % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
}

// Update the display
function updateDisplay() {
    if (timeDisplay) {
        timeDisplay.textContent = formatTime(elapsedTime);
    } else {
        console.error('Time display element not found');
    }
}

// Start the stopwatch
function startStopwatch() {
    console.log('Start/Stop button clicked, current state:', { isRunning, elapsedTime });
    
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10); // Update every 10ms for centiseconds
        isRunning = true;
        if (startButton) {
            startButton.innerHTML = '<i class="ri-pause-line"></i><span>Durdur</span>';
        }
        if (lapButton) lapButton.disabled = false;
        if (resetButton) resetButton.disabled = false;
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        if (startButton) {
            startButton.innerHTML = '<i class="ri-play-line"></i><span>Başlat</span>';
        }
        if (lapButton) lapButton.disabled = true;
    }
}

// Record a lap time
function recordLap() {
    if (isRunning) {
        const lapTime = elapsedTime;
        const lapDifference = lapTime - lastLapTime;
        lastLapTime = lapTime;
        
        laps.push({
            number: laps.length + 1,
            time: lapTime,
            difference: lapDifference
        });
        
        updateLapsList();
    }
}

// Update the laps list display
function updateLapsList() {
    if (!lapsList) {
        console.error('Laps list element not found');
        return;
    }
    
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('div');
        lapElement.className = 'lap-item';
        lapElement.innerHTML = `
            <span class="lap-number">${lap.number}</span>
            <span class="lap-time">${formatTime(lap.time)}</span>
            <span class="lap-difference">${index === 0 ? '-' : formatTime(lap.difference)}</span>
        `;
        lapsList.appendChild(lapElement);
    });
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    lastLapTime = 0;
    isRunning = false;
    laps = [];
    updateDisplay();
    updateLapsList();
    if (startButton) {
        startButton.innerHTML = '<i class="ri-play-line"></i><span>Başlat</span>';
    }
    if (lapButton) lapButton.disabled = true;
    if (resetButton) resetButton.disabled = true;
}

// Initialize stopwatch
function initializeStopwatch() {
    console.log('Initializing stopwatch...');
    
    // Add click events
    if (startButton) {
        startButton.addEventListener('click', startStopwatch);
        console.log('Start button event listener added');
    } else {
        console.error('Start button not found');
    }
    
    if (lapButton) {
        lapButton.addEventListener('click', recordLap);
        console.log('Lap button event listener added');
    }
    
    if (resetButton) {
        resetButton.addEventListener('click', resetStopwatch);
        console.log('Reset button event listener added');
    }
    
    // Initial display
    updateDisplay();
}

// Start when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    initializeStopwatch();
}); 
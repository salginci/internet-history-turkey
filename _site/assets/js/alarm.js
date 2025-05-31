// Time zones for world clocks
const worldClocks = {
    'Istanbul': 'Europe/Istanbul',
    'Riyadh': 'Asia/Riyadh',
    'New_York': 'America/New_York',
    'London': 'Europe/London'
};

// Update main clock
function updateMainClock() {
    const now = new Date();
    const timeDisplay = document.querySelector('.digital-clock .time');
    const dateDisplay = document.querySelector('.digital-clock .date');
    
    if (timeDisplay && dateDisplay) {
        // Format time
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;

        // Format date in Turkish
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const turkishDate = now.toLocaleDateString('tr-TR', options);
        dateDisplay.textContent = turkishDate;
    }
}

// Update world clocks
function updateWorldClocks() {
    Object.entries(worldClocks).forEach(([city, timezone]) => {
        const now = new Date();
        const options = {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };

        try {
            const timeString = now.toLocaleTimeString('tr-TR', options);
            const clockElement = document.querySelector(`.world-clock-item[data-city="${city.toLowerCase()}"] .time`);
            if (clockElement) {
                clockElement.textContent = timeString;
            }
        } catch (e) {
            console.error(`Error updating world clock for ${city}:`, e);
        }
    });
}

// Fullscreen functionality
function initializeFullscreen() {
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                fullscreenBtn.querySelector('i').classList.replace('fa-expand', 'fa-compress');
            } else {
                document.exitFullscreen();
                fullscreenBtn.querySelector('i').classList.replace('fa-compress', 'fa-expand');
            }
        });
    }
}

// Zoom functionality
function initializeZoom() {
    const zoomInBtn = document.querySelector('.zoom-in-btn');
    const zoomOutBtn = document.querySelector('.zoom-out-btn');
    let currentZoom = 100;

    if (zoomInBtn && zoomOutBtn) {
        zoomInBtn.addEventListener('click', () => {
            currentZoom += 10;
            document.body.style.zoom = `${currentZoom}%`;
        });

        zoomOutBtn.addEventListener('click', () => {
            currentZoom -= 10;
            if (currentZoom >= 50) {
                document.body.style.zoom = `${currentZoom}%`;
            }
        });
    }
}

// Share functionality
function initializeShare() {
    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: document.title,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share failed:', err);
            }
        });
    }
}

// Initialize alarm functionality
function initializeAlarm() {
    const modal = document.getElementById('alarmModal');
    const setAlarmBtn = document.querySelector('.set-alarm-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-alarm');
    const hourInput = document.querySelector('.hour-input');
    const minuteInput = document.querySelector('.minute-input');
    let previewAudio = null;
    
    if (!modal || !setAlarmBtn) {
        console.error('Alarm elements not found');
        return;
    }

    // Function to play selected sound
    function playSelectedSound() {
        if (previewAudio) {
            previewAudio.pause();
            previewAudio.currentTime = 0;
        }
        
        const selectedSound = document.querySelector('.alarm-sound').value;
        previewAudio = new Audio(`/assets/sounds/${selectedSound}.mp3`);
        previewAudio.play().catch(error => {
            console.error('Error playing sound:', error);
        });
    }

    // Show modal
    setAlarmBtn.addEventListener('click', () => {
        console.log('Set alarm button clicked'); // Debug log
        modal.classList.add('show');
        // Set current hour + 1 as default
        const now = new Date();
        let defaultHour = now.getHours() + 1;
        if (defaultHour > 23) defaultHour = 0;
        hourInput.value = String(defaultHour).padStart(2, '0');
        minuteInput.value = '00';
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('show');
        if (previewAudio) {
            previewAudio.pause();
            previewAudio.currentTime = 0;
        }
    }
    
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Time input handlers
    document.querySelectorAll('.time-arrow').forEach(arrow => {
        arrow.addEventListener('click', (e) => {
            const isNext = arrow.classList.contains('next');
            const input = arrow.parentElement.querySelector('input');
            const isHour = input.classList.contains('hour-input');
            let value = parseInt(input.value);
            
            if (isNext) {
                value = isHour ? (value + 1) % 24 : (value + 1) % 60;
            } else {
                value = isHour ? (value - 1 + 24) % 24 : (value - 1 + 60) % 60;
            }
            
            input.value = String(value).padStart(2, '0');
        });
    });
    
    // Sound preview button
    const playSound = document.querySelector('.play-sound');
    if (playSound) {
        playSound.addEventListener('click', playSelectedSound);
    }

    // Test alarm button
    const testBtn = document.querySelector('.test-alarm');
    if (testBtn) {
        testBtn.addEventListener('click', playSelectedSound);
    }
    
    // Save alarm
    const saveBtn = document.querySelector('.save-alarm');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const hour = hourInput.value;
            const minute = minuteInput.value;
            const sound = document.querySelector('.alarm-sound').value;
            const repeat = document.querySelector('.repeat-checkbox').checked;
            // Save alarm to localStorage
            const alarms = getAlarms();
            alarms.push({ hour, minute, sound, repeat });
            saveAlarms(alarms);
            renderAlarms();
            closeModal();
            showToast(`Alarm ${hour}:${minute} için kuruldu`);
        });
    }

    renderAlarms();
}

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Alarm persistence and display
function getAlarms() {
    return JSON.parse(localStorage.getItem('alarms') || '[]');
}

function saveAlarms(alarms) {
    localStorage.setItem('alarms', JSON.stringify(alarms));
}

function getTimeLeft(hour, minute) {
    const now = new Date();
    const alarmTime = new Date(now);
    alarmTime.setHours(parseInt(hour, 10));
    alarmTime.setMinutes(parseInt(minute, 10));
    alarmTime.setSeconds(0);
    if (alarmTime < now) {
        // If alarm time is earlier today, set for tomorrow
        alarmTime.setDate(alarmTime.getDate() + 1);
    }
    const diff = Math.max(0, Math.floor((alarmTime - now) / 1000));
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;
    if (diff === 0) return 'Şimdi';
    let parts = [];
    if (h > 0) parts.push(`${h} saat`);
    if (m > 0) parts.push(`${m} dakika`);
    if (s > 0) parts.push(`${s} saniye`);
    return parts.join(' ');
}

function renderAlarms() {
    const alarms = getAlarms();
    const list = document.querySelector('.alarms-list');
    list.innerHTML = '';
    if (alarms.length === 0) {
        list.innerHTML = '<div class="no-alarms">Kayıtlı alarm yok.</div>';
        return;
    }
    alarms.forEach((alarm, idx) => {
        const item = document.createElement('div');
        item.className = 'lap-item';
        item.innerHTML = `
            <span class="alarm-time">${alarm.hour}:${alarm.minute}</span>
            <span class="alarm-left" data-hour="${alarm.hour}" data-minute="${alarm.minute}"></span>
            <button class="delete-alarm-btn" data-idx="${idx}"><i class="ri-delete-bin-line"></i></button>
        `;
        list.appendChild(item);
    });
    // Add delete listeners
    document.querySelectorAll('.delete-alarm-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-idx'));
            const alarms = getAlarms();
            alarms.splice(idx, 1);
            saveAlarms(alarms);
            renderAlarms();
        });
    });
    // Update time left for each alarm
    function updateAllTimeLeft() {
        document.querySelectorAll('.alarm-left').forEach(el => {
            const hour = el.getAttribute('data-hour');
            const minute = el.getAttribute('data-minute');
            el.textContent = getTimeLeft(hour, minute);
        });
    }
    updateAllTimeLeft();
    if (window._alarmTimeLeftInterval) clearInterval(window._alarmTimeLeftInterval);
    window._alarmTimeLeftInterval = setInterval(updateAllTimeLeft, 1000);
}

let alarmAudio = null;

function showAlarmTriggerModal(alarm) {
    const modal = document.getElementById('alarmTriggerModal');
    if (!modal) return;
    modal.classList.add('show');
    // Play selected sound
    if (alarm && alarm.sound) {
        alarmAudio = new Audio(`/assets/sounds/${alarm.sound}.mp3`);
        alarmAudio.loop = true;
        alarmAudio.play().catch(() => {});
    }
}

function hideAlarmTriggerModal() {
    const modal = document.getElementById('alarmTriggerModal');
    if (!modal) return;
    modal.classList.remove('show');
    if (alarmAudio) {
        alarmAudio.pause();
        alarmAudio.currentTime = 0;
        alarmAudio = null;
    }
}

function checkAlarms() {
    const alarms = getAlarms();
    const now = new Date();
    const nowHour = String(now.getHours()).padStart(2, '0');
    const nowMinute = String(now.getMinutes()).padStart(2, '0');
    alarms.forEach((alarm, idx) => {
        if (!alarm.triggered && alarm.hour === nowHour && alarm.minute === nowMinute) {
            alarms[idx].triggered = true;
            saveAlarms(alarms);
            showAlarmTriggerModal(alarm);
        }
        // Reset trigger for next day
        if (alarm.triggered && (alarm.hour !== nowHour || alarm.minute !== nowMinute)) {
            alarms[idx].triggered = false;
            saveAlarms(alarms);
        }
    });
}

// Initialize all functionality
function initialize() {
    // Update clocks every second
    setInterval(() => {
        updateMainClock();
        updateWorldClocks();
    }, 1000);

    // Initial updates
    updateMainClock();
    updateWorldClocks();

    // Initialize alarm functionality
    initializeAlarm();

    // Handle sidebar navigation
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    renderAlarms();

    // Check alarms every second
    setInterval(checkAlarms, 1000);
    // Alarm trigger modal close button
    const closeAlarmTrigger = document.querySelector('.close-alarm-trigger');
    if (closeAlarmTrigger) {
        closeAlarmTrigger.addEventListener('click', hideAlarmTriggerModal);
    }

    // Initialize fullscreen
    initializeFullscreen();

    // Initialize zoom
    initializeZoom();

    // Initialize share
    initializeShare();
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', initialize); 
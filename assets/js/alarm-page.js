// Alarm state
let activeAlarms = [];
let alarmSound = new Audio('/assets/sounds/alarm-beep.mp3');

// DOM Elements
const modal = document.getElementById('alarmSettingsModal');
const setAlarmBtn = document.getElementById('setAlarm');
const testAlarmBtn = document.getElementById('testAlarm');
const disableAlarmBtn = document.getElementById('disableAlarm');
const saveAlarmBtn = document.getElementById('saveAlarm');
const cancelAlarmBtn = document.getElementById('cancelAlarm');
const hourInput = document.getElementById('hourInput');
const minuteInput = document.getElementById('minuteInput');
const alarmSoundSelect = document.getElementById('alarmSound');
const repeatAlarmCheckbox = document.getElementById('repeatAlarm');
const alarmTitleInput = document.getElementById('alarmTitle');

// Initialize alarm sounds
const alarmSounds = {
    beep: '/assets/sounds/alarm-beep.mp3',
    digital: '/assets/sounds/alarm-digital.mp3',
    bell: '/assets/sounds/alarm-bell.mp3',
    melody: '/assets/sounds/alarm-melody.mp3'
};

// Show modal
function showModal() {
    modal.style.display = 'flex';
}

// Hide modal
function hideModal() {
    modal.style.display = 'none';
}

// Format time
function formatTime(hours, minutes) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// Set alarm
function setAlarm(hours, minutes, title = '', repeat = false, sound = 'beep') {
    const alarm = {
        time: formatTime(hours, minutes),
        title: title || 'Alarm',
        repeat: repeat,
        sound: sound,
        enabled: true
    };
    
    activeAlarms.push(alarm);
    updateAlarmDisplay();
    saveAlarmsToLocalStorage();
    
    // Show notification
    showNotification('Alarm kuruldu', `${alarm.title} - ${alarm.time}`);
}

// Check alarms
function checkAlarms() {
    const now = new Date();
    const currentTime = formatTime(now.getHours(), now.getMinutes());
    
    activeAlarms.forEach(alarm => {
        if (alarm.enabled && alarm.time === currentTime) {
            triggerAlarm(alarm);
        }
    });
}

// Trigger alarm
function triggerAlarm(alarm) {
    // Change alarm sound
    alarmSound.src = alarmSounds[alarm.sound];
    alarmSound.loop = true;
    alarmSound.play();
    
    // Show notification
    showNotification(alarm.title, 'Alarm çalıyor!', true);
    
    // Show disable button
    disableAlarmBtn.style.display = 'inline-block';
    
    if (!alarm.repeat) {
        alarm.enabled = false;
    }
}

// Disable alarm
function disableAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    disableAlarmBtn.style.display = 'none';
}

// Show notification
function showNotification(title, body, requireInteraction = false) {
    if (Notification.permission === 'granted') {
        new Notification(title, {
            body: body,
            icon: '/assets/images/alarm-icon.png',
            requireInteraction: requireInteraction
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showNotification(title, body, requireInteraction);
            }
        });
    }
}

// Save alarms to localStorage
function saveAlarmsToLocalStorage() {
    localStorage.setItem('alarms', JSON.stringify(activeAlarms));
}

// Load alarms from localStorage
function loadAlarmsFromLocalStorage() {
    const savedAlarms = localStorage.getItem('alarms');
    if (savedAlarms) {
        activeAlarms = JSON.parse(savedAlarms);
        updateAlarmDisplay();
    }
}

// Update alarm display
function updateAlarmDisplay() {
    const display = document.querySelector('.time-display');
    if (activeAlarms.length > 0) {
        const nextAlarm = activeAlarms.find(alarm => alarm.enabled);
        if (nextAlarm) {
            const [hours, minutes] = nextAlarm.time.split(':');
            document.getElementById('alarm-hours').textContent = hours;
            document.getElementById('alarm-minutes').textContent = minutes;
            document.getElementById('alarm-seconds').textContent = '00';
        }
    }
}

// Event Listeners
setAlarmBtn.addEventListener('click', showModal);
cancelAlarmBtn.addEventListener('click', hideModal);
testAlarmBtn.addEventListener('click', () => {
    alarmSound.src = alarmSounds[alarmSoundSelect.value];
    alarmSound.play();
    setTimeout(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }, 3000);
});

disableAlarmBtn.addEventListener('click', disableAlarm);

saveAlarmBtn.addEventListener('click', () => {
    setAlarm(
        parseInt(hourInput.value),
        parseInt(minuteInput.value),
        alarmTitleInput.value,
        repeatAlarmCheckbox.checked,
        alarmSoundSelect.value
    );
    hideModal();
});

// Quick time buttons
document.querySelectorAll('.time-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const [hours, minutes] = btn.textContent.split(':');
        setAlarm(parseInt(hours), parseInt(minutes));
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Request notification permission
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission();
    }
    
    // Load saved alarms
    loadAlarmsFromLocalStorage();
    
    // Check alarms every minute
    setInterval(checkAlarms, 60000);
}); 
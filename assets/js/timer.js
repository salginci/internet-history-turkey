// Timer setup modal logic for zamanlayici page

let timerInterval = null;
let initialTime = 0;
let remainingTime = 0;
let isPaused = false;

function formatTimeFromSeconds(totalSeconds) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

document.addEventListener('DOMContentLoaded', function () {
    const setupBtn = document.querySelector('.set-alarm-btn');
    const timerModal = document.getElementById('timerModal');
    const confirmBtn = document.getElementById('confirmTimer');
    const cancelBtn = document.getElementById('cancelTimer');
    const inputHour = document.getElementById('inputHour');
    const inputMinute = document.getElementById('inputMinute');
    const inputSecond = document.getElementById('inputSecond');
    const timeDisplay = document.querySelector('.digital-clock .time');

    const startBtn = document.querySelector('.start-btn');
    const stopBtn = document.querySelector('.stop-btn');
    const resumeBtn = document.querySelector('.resume-btn');
    const resetBtn = document.querySelector('.reset-btn');

    // Debug logging
    console.log({
      setupBtn, timerModal, confirmBtn, cancelBtn, inputHour, inputMinute, inputSecond, timeDisplay,
      startBtn, stopBtn, resumeBtn, resetBtn
    });

    // Open modal
    if (setupBtn && timerModal) {
        setupBtn.addEventListener('click', function () {
            timerModal.style.display = 'flex';
        });
    }

    // Close modal
    if (cancelBtn && timerModal) {
        cancelBtn.addEventListener('click', function () {
            timerModal.style.display = 'none';
        });
    }

    // Confirm and set timer
    if (confirmBtn && timerModal && inputHour && inputMinute && inputSecond && timeDisplay) {
        confirmBtn.addEventListener('click', function () {
            const h = parseInt(inputHour.value, 10) || 0;
            const m = parseInt(inputMinute.value, 10) || 0;
            const s = parseInt(inputSecond.value, 10) || 0;
            initialTime = h * 3600 + m * 60 + s;
            remainingTime = initialTime;
            isPaused = false;
            timeDisplay.textContent = formatTimeFromSeconds(remainingTime);
            timerModal.style.display = 'none';
            // Show Baslat, hide others
            startBtn.style.display = '';
            stopBtn.style.display = 'none';
            resumeBtn.style.display = 'none';
            resetBtn.style.display = 'none';
        });
    }

    // Start timer
    if (startBtn) {
        startBtn.addEventListener('click', function () {
            if (remainingTime > 0) {
                startBtn.style.display = 'none';
                stopBtn.style.display = '';
                resumeBtn.style.display = 'none';
                resetBtn.style.display = 'none';
                isPaused = false;
                timerInterval = setInterval(() => {
                    if (!isPaused && remainingTime > 0) {
                        remainingTime--;
                        timeDisplay.textContent = formatTimeFromSeconds(remainingTime);
                        if (remainingTime === 0) {
                            clearInterval(timerInterval);
                            stopBtn.style.display = 'none';
                            resumeBtn.style.display = 'none';
                            resetBtn.style.display = '';
                            // Optionally: play sound or show alert here
                        }
                    }
                }, 1000);
            }
        });
    }

    // Stop (pause) timer
    if (stopBtn) {
        stopBtn.addEventListener('click', function () {
            isPaused = true;
            clearInterval(timerInterval);
            stopBtn.style.display = 'none';
            resumeBtn.style.display = '';
            resetBtn.style.display = '';
        });
    }

    // Resume timer
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function () {
            if (remainingTime > 0) {
                isPaused = false;
                resumeBtn.style.display = 'none';
                stopBtn.style.display = '';
                resetBtn.style.display = 'none';
                timerInterval = setInterval(() => {
                    if (!isPaused && remainingTime > 0) {
                        remainingTime--;
                        timeDisplay.textContent = formatTimeFromSeconds(remainingTime);
                        if (remainingTime === 0) {
                            clearInterval(timerInterval);
                            stopBtn.style.display = 'none';
                            resumeBtn.style.display = 'none';
                            resetBtn.style.display = '';
                            // Optionally: play sound or show alert here
                        }
                    }
                }, 1000);
            }
        });
    }

    // Reset timer
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            clearInterval(timerInterval);
            remainingTime = initialTime;
            isPaused = false;
            timeDisplay.textContent = formatTimeFromSeconds(remainingTime);
            startBtn.style.display = '';
            stopBtn.style.display = 'none';
            resumeBtn.style.display = 'none';
            resetBtn.style.display = 'none';
        });
    }

    // Optional: Close modal on outside click
    if (timerModal) {
        timerModal.addEventListener('click', function (e) {
            if (e.target === timerModal) {
                timerModal.style.display = 'none';
            }
        });
    }
});

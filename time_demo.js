let seconds = 0; // 秒数计数
let intervalId = null; // 用于存储计时器ID

// 更新计时器显示
function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('speed').textContent =
        `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 开始计时
function startTimer() {
    if (intervalId !== null) return; // 如果计时器已经在运行，则不再启动新的计时器
    intervalId = setInterval(() => {
        seconds++;
        updateTimerDisplay();
    }, 1000);
}

// 停止计时
function stopTimer() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

// 重置计时器
function resetTimer() {
    stopTimer(); // 停止当前计时器
    seconds = 0; // 重置秒数
    updateTimerDisplay(); // 更新显示
}

// 为按钮添加事件监听器
let isStartButtonBound = false;
let isStopButtonBound = false;
let isResetButtonBound = false;



function Starttime() {
    const startBtn = document.getElementById('startBtn');
    if (!isStartButtonBound) {
        startBtn.addEventListener('click', startTimer);
        isStartButtonBound = true;
    }

    // 模拟点击
    startBtn.click(); // 这会触发绑定到startBtn的click事件，即调用startTimer函数
}
function Stoptime() {
    const stopBtn = document.getElementById('stopBtn');
    if (!isStopButtonBound) {
        stopBtn.addEventListener('click', stopTimer);
        isStopButtonBound = true;
    }

    // 模拟点击
    stopBtn.click(); // 这会触发绑定到startBtn的click事件，即调用startTimer函数
}
function Resettime() {
    const resetBtn = document.getElementById('resetBtn');
    if (!isResetButtonBound) {
        resetBtn.addEventListener('click', resetTimer);
        isResetButtonBound = true;
    }

    // 模拟点击
    resetBtn.click(); // 这会触发绑定到startBtn的click事件，即调用startTimer函数
}

// 初始化计时器显示
updateTimerDisplay();

export {Starttime,Stoptime,Resettime}
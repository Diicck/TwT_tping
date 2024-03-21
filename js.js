
import {linesGroups} from "./txt.js";

let selectedLines = linesGroups[Math.floor(Math.random() * linesGroups.length)];
let currentLine = 0;
let startTime = new Date();
let totalCharsTyped = 0;
let intervalId = null;

function startTimer() {
    if (intervalId === null) {
        intervalId = setInterval(updateTimer, 1000); // 每秒更新一次时间显示
        // 在适当的地方（例如，当用户开始输入时）开始计时器


    }
}

// function updateSpeed() {
//     let elapsedTime = (new Date() - startTime) / 60000; // 时间转换为分钟
//     let speed = Math.round((totalCharsTyped / elapsedTime) || 0);
//     document.getElementById('speed').textContent = speed;
// }
function updateTimer() {
    let elapsedTime = new Date() - startTime; // 直接得到经过的毫秒数
    let seconds = Math.floor(elapsedTime / 1000) % 60; // 转换为秒数并得到余数秒
    let minutes = Math.floor(elapsedTime / (1000 * 60)); // 转换为分钟数

    // 格式化时间显示，确保分钟和秒都是两位数字
    document.getElementById('speed').textContent = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}

// 辅助函数：将数字转换为两位格式的字符串
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}



function updateStats(input) {
    let inputTextChinese = input.match(/[\u4e00-\u9fa5]/g) || [];
    let lineTextChinese = selectedLines[currentLine].match(/[\u4e00-\u9fa5]/g) || [];
    let accuracy;
    let correctCount = 0;

    for (let i = 0; i < inputTextChinese.length && i < lineTextChinese.length; i++) {
        if (inputTextChinese[i] === lineTextChinese[i]) {
            correctCount++;
        }
    }

    accuracy = lineTextChinese.length > 0 ? Math.round((correctCount / lineTextChinese.length) * 100) : 100;

    document.getElementById('accuracy').textContent = accuracy;

    // 更新错误提示的逻辑
    let isInputCorrectSoFar = input.trim() === selectedLines[currentLine].slice(0, input.length).trim();
    document.getElementById('typingInput').classList.toggle('error', !isInputCorrectSoFar);

    if (input.trim() === selectedLines[currentLine].trim()) {
        nextLine();
    }
}


function nextLine() {
    if (currentLine < selectedLines.length - 1) {
        currentLine++;
        document.getElementById('textToType').textContent = selectedLines[currentLine];
        document.getElementById('typingInput').value = "";
        document.getElementById('typingInput').classList.remove('error'); // Remove error class if it exists
        totalCharsTyped = 0; // Reset total chars typed for new line
        startTime = new Date(); // Correctly reset the global startTime for the new line
    } else {
        // Finished all lines
        alert("恭喜你，完成了练习！");
        document.getElementById('typingInput').disabled = true; // Disable input
        clearInterval(intervalId); // Stop the speed update
        intervalId = null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('textToType').textContent = selectedLines[currentLine];
    document.getElementById('typingInput').addEventListener('input', function(e) {
        if (!startTime) {
            startTime = new Date();
            startTimer(); // Initialize speed update timer
        }

        let input = e.target.value;
        totalCharsTyped += input.length;
        updateStats(input);
    });
});
function git(){
    window.location.href = 'https://github.com/Diicck/TwT_tping';
}

function reload(){
    location.reload();
}


import {linesGroups} from "./txt.js";
import {Stoptime,Starttime,Resettime} from "./time_demo.js";

let selectedLines = linesGroups[Math.floor(Math.random() * linesGroups.length)];
let currentLine = 0;
let startTime = new Date();
let totalCharsTyped = 0;
let intervalId = null;

function highlightText(input, target) {
    let highlighted = '';

    for (let i = 0; i < target.length; i++) {
        if (i < input.length && input[i] !== target[i]) {
            // 错误的字，用红色高亮
            highlighted += `<span style="color: red;">${target[i]}</span>`;
        } else {
            // 正确或未输入的部分
            highlighted += target[i];
        }
    }
    document.getElementById('textToType').innerHTML = highlighted;
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
    // 高亮显示文本
    highlightText(input, selectedLines[currentLine]);

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
        Stoptime()
        alert("恭喜你，完成了练习！");
        document.getElementById('typingInput').disabled = true; // Disable input
        clearInterval(intervalId); // Stop the speed update
        intervalId = null;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('textToType').textContent = selectedLines[currentLine];
    document.getElementById('typingInput').addEventListener('input', function(e) {
        Starttime()

        let input = e.target.value;
        totalCharsTyped += input.length;
        updateStats(input);
    });
});
let btn1 = document.getElementById("github")
btn1.addEventListener("click", git)

let btn2 = document.getElementById("reload")
btn2.addEventListener("click", reload)
function git(){
    window.location.href = 'https://github.com/Diicck/TwT_tping';
}

function reload() {
    // 使用新的随机选择刷新全局变量 selectedLines
    selectedLines = linesGroups[Math.floor(Math.random() * linesGroups.length)];
    currentLine = 0; // 将当前行重置为第一行

    // 更新页面上要打的文本为新选中的第一行
    document.getElementById('textToType').textContent = selectedLines[currentLine];

    // 清空输入字段
    document.getElementById('typingInput').value = "";

    // 移除输入字段的错误提示样式（如果有的话）
    document.getElementById('typingInput').classList.remove('error');

    // 如果输入字段被禁用了，则重新启用它
    document.getElementById('typingInput').disabled = false;

    // 停止当前的计时器
    clearInterval(intervalId);

    // 重置计时器的 intervalId
    intervalId = null;

    // 重置已输入的总字符数计数器
    totalCharsTyped = 0;
    Resettime()
}


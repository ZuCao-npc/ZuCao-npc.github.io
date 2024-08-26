// script.js
const holes = document.querySelectorAll('.hole');
const scoreSpan = document.getElementById('score');
const levelSpan = document.getElementById('level');
const goalSpan = document.getElementById('goal');
let score = 0;
let level = 1;
let goal = 10;
let activeHole = null;

function randomHole() {
    const index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

function showMole() {
    if (activeHole) {
        activeHole.classList.remove('active');
    }
    activeHole = randomHole();
    activeHole.classList.add('active');
}

function flashBackground() {
    document.body.classList.add('flash');
    setTimeout(() => {
        document.body.classList.remove('flash');
    }, 500); // 动画持续时间
}

holes.forEach(hole => {
    hole.addEventListener('click', () => {
        if (hole === activeHole) {
            score++;
            scoreSpan.textContent = score;
            hole.classList.remove('active');
            activeHole = null;

            // 震动提示
            if (navigator.vibrate) {
                navigator.vibrate(100); // 震动 100 毫秒
            }

            // 背景闪烁
            flashBackground();

            // 检查是否完成当前关卡
            if (score >= goal) {
                level++;
                goal = level * 10; // 每个关卡目标增加10分
                levelSpan.textContent = level;
                goalSpan.textContent = goal;
                score = 0; // 重置分数
                scoreSpan.textContent = score;
            }
        }
    });
});

function gameLoop() {
    showMole();
    setTimeout(() => {
        if (activeHole) {
            activeHole.classList.remove('active');
            activeHole = null;
        }
        gameLoop();
    }, 1000); // 每秒显示一次地鼠
}

gameLoop();

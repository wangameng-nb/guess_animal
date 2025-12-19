// 动物列表，包含动物名称和三条提示信息（从模糊到精确）
const animals = [
    { name: '狗', hints: ['它是一种常见的家养宠物', '它对人类非常忠诚，会保护主人', '它会汪汪叫，嗅觉异常灵敏'] },
    { name: '猫', hints: ['它是一种擅长捕捉老鼠的小动物', '它喜欢梳理自己的毛发，动作优雅', '它会喵喵叫，有锋利的爪子和胡须'] },
    { name: '鸟', hints: ['它是一种有羽毛的小动物', '它可以在天空中自由飞翔', '它会下蛋，用嘴巴啄食'] },
    { name: '鱼', hints: ['它生活在水域环境中', '它靠摆动身体和鳍来游动', '它用鳃呼吸，身上覆盖着鳞片'] },
    { name: '兔子', hints: ['它是一种草食性的小型哺乳动物', '它的耳朵很长，听觉很灵敏', '它喜欢吃胡萝卜，尾巴像个小毛球'] },
    { name: '大象', hints: ['它是陆地上体型最大的动物', '它有长长的鼻子，可以用来抓取东西', '它的耳朵很大，像两把蒲扇'] },
    { name: '老虎', hints: ['它是一种凶猛的食肉动物', '它被称为"森林之王"', '它身上有黑色条纹，擅长夜间捕猎'] },
    { name: '狮子', hints: ['它是草原上的顶级掠食者', '雄性有茂密的鬃毛，显得很威风', '它通常群居生活，有明确的等级制度'] },
    { name: '猴子', hints: ['它是一种灵活的灵长类动物', '它喜欢在树上跳来跳去', '它会模仿人类的动作，有一条可以抓握的尾巴'] },
    { name: '熊猫', hints: ['它是中国特有的珍稀动物', '它的毛色黑白相间，看起来很可爱', '它主要以竹子为食，行动比较缓慢'] },
    { name: '长颈鹿', hints: ['它是一种脖子很长的动物', '它可以吃到其他动物够不到的树叶', '它的身上有独特的斑点花纹'] },
    { name: '斑马', hints: ['它是非洲草原上的哺乳动物', '它的身上有黑白相间的条纹', '它通常和其他动物一起生活，以草为食'] },
    { name: '河马', hints: ['它是一种生活在水边的大型动物', '它的皮肤很厚，几乎没有毛发', '它的嘴巴很大，可以张开到90度以上'] },
    { name: '鳄鱼', hints: ['它是一种古老的爬行动物', '它既可以在水中生活，也可以在陆地上活动', '它有锋利的牙齿，是凶猛的捕食者'] },
    { name: '海豚', hints: ['它是一种生活在海洋中的哺乳动物', '它非常聪明，喜欢和人类互动', '它会发出超声波来定位和交流'] },
    { name: '鲸鱼', hints: ['它是世界上体型最大的动物', '它生活在海洋中，靠肺呼吸', '它会喷水柱，有些种类会唱歌'] },
    { name: '蛇', hints: ['它是一种没有四肢的爬行动物', '它靠身体的蠕动来移动', '有些种类有毒牙，可以释放毒液'] },
    { name: '乌龟', hints: ['它是一种行动缓慢的爬行动物', '它有坚硬的壳来保护自己', '它的寿命很长，有些可以活上百年'] },
    { name: '青蛙', hints: ['它是一种两栖动物', '它小时候是蝌蚪，长大后会变成青蛙', '它会呱呱叫，用舌头捕食昆虫'] },
    { name: '企鹅', hints: ['它是一种不会飞的鸟类', '它生活在寒冷的南极地区', '它擅长游泳，走起路来一摇一摆'] }
];

// 游戏变量
let currentAnimal;
let score = 0;
let hintsUsed = 0;

// DOM元素
const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const hintBtn = document.getElementById('hint-btn');
const restartBtn = document.getElementById('restart-btn');
const resultMessage = document.getElementById('result-message');
const hintMessage = document.getElementById('hint-message');
const scoreSpan = document.getElementById('score');

// 初始化游戏
function initGame() {
    // 随机选择一个动物
    const randomIndex = Math.floor(Math.random() * animals.length);
    currentAnimal = animals[randomIndex];
    
    // 重置游戏状态
    hintsUsed = 0;
    resultMessage.textContent = '';
    hintMessage.textContent = '';
    guessInput.value = '';
    
    // 让输入框获得焦点
    guessInput.focus();
    
    // 游戏开始时自动显示第一个提示
    showHint();
}

// 检查猜测
function checkGuess() {
    const guess = guessInput.value.trim().toLowerCase();
    const correctAnswer = currentAnimal.name.toLowerCase();
    
    if (guess === '') {
        resultMessage.textContent = '请输入你的猜测！';
        resultMessage.style.color = '#e74c3c';
        return;
    }
    
    if (guess === correctAnswer) {
        // 猜对了，计算分数
        let points = 10;
        if (hintsUsed === 0) {
            points += 5; // 没有使用提示额外加5分
        } else if (hintsUsed === 1) {
            points += 3; // 使用一次提示额外加3分
        } else if (hintsUsed === 2) {
            points += 1; // 使用两次提示额外加1分
        }
        
        score += points;
        scoreSpan.textContent = score;
        
        resultMessage.textContent = `恭喜你猜对了！答案是${currentAnimal.name}。获得了${points}分！`;
        resultMessage.style.color = '#27ae60';
        
        // 延迟后开始新游戏
        setTimeout(() => {
            initGame();
        }, 2000);
    } else {
        // 猜错了
        resultMessage.textContent = '猜错了，请再试一次！';
        resultMessage.style.color = '#e74c3c';
        
        // 清空输入框
        guessInput.value = '';
        guessInput.focus();
    }
}

// 显示提示
function showHint() {
    if (hintsUsed < 3) { // 最多提供3个提示
        hintsUsed++;
        
        if (hintsUsed === 1) {
            // 第一个提示（模糊）
            hintMessage.textContent = `提示1: ${currentAnimal.hints[0]}`;
        } else if (hintsUsed === 2) {
            // 第二个提示（中等模糊）
            hintMessage.textContent += ` 提示2: ${currentAnimal.hints[1]}`;
        } else {
            // 第三个提示（精确）
            hintMessage.textContent += ` 提示3: ${currentAnimal.hints[2]}`;
        }
    } else {
        hintMessage.textContent = '你已经用完了所有提示！';
        hintMessage.style.color = '#e74c3c';
    }
}

// 重新开始游戏
function restartGame() {
    score = 0;
    scoreSpan.textContent = score;
    initGame();
}

// 事件监听器
guessBtn.addEventListener('click', checkGuess);
hintBtn.addEventListener('click', showHint);
restartBtn.addEventListener('click', restartGame);

// 回车键提交猜测
guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// 初始化游戏
initGame();
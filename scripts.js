const duration = 3000;
const speed = 0.5;

var hearts = [];

function generateHeart(x, y, xBound, xStart, scale) {
    var heart = document.createElement("DIV");
    heart.setAttribute('class', 'heart');
    document.body.appendChild(heart); 
    heart.time = duration;
    heart.x = x;
    heart.y = y;
    heart.bound = xBound;
    heart.direction = xStart;
    heart.style.left = heart.x + "px";
    heart.style.top = heart.y + "px";
    heart.scale = scale;
    heart.style.transform = "scale(" + scale + "," + scale + ")";
    if (hearts == null)
        hearts = [];
    hearts.push(heart);
    return heart;
}

var before = Date.now();
var id = setInterval(frame, 5);
var gr = setInterval(check, 100);

function frame() {
    var current = Date.now();
    var deltaTime = current - before;
    before = current;
    for (i in hearts) {
        var heart = hearts[i];
        heart.time -= deltaTime;
        if (heart.time > 0) {
            heart.y -= speed;
            heart.style.top = heart.y + "px";
            heart.style.left = heart.x + heart.direction * heart.bound * Math.sin(heart.y * heart.scale / 30) / heart.y * 100 + "px";
        } else {
            heart.parentNode.removeChild(heart);
            hearts.splice(i, 1);
        }
    }
}

function check() {
    var randomX = Math.random() * document.body.offsetWidth;
    var randomY = Math.random() * document.body.offsetHeight;
    var start = 1 - Math.round(Math.random()) * 2;
    var scale = Math.random() * Math.random() * 0.8 + 0.2;
    var bound = 30 + Math.random() * 20;
    generateHeart(randomX, randomY, bound, start, scale);
}


document.addEventListener('DOMContentLoaded', function() {
    const animateCardsButton = document.getElementById('animateCardsButton');
    const loveMessage = document.getElementById('loveMessage');
    const main = document.querySelector('main');
    const cards = document.querySelectorAll('.card');
    const header = document.getElementById('our memories');

    animateCardsButton.addEventListener('click', function() {

        header.scrollIntoView({ 
            behavior: 'smooth' 
        });

        header.style.display = 'none';
        
        const mainRect = main.getBoundingClientRect();
        const mainCenterX = mainRect.left + mainRect.width / 16;
        const mainCenterY = mainRect.top + mainRect.height / 2.7;

        // Анимация сбора карточек в круг
        cards.forEach((card, index) => {
            const angle = (index / (cards.length - 1)) * Math.PI * 2;
            const radius = 400;
            const x = mainCenterX + radius * Math.cos(angle) - card.offsetWidth / 2;
            const y = mainCenterY + radius * Math.sin(angle) - card.offsetHeight / 2;

            card.style.transition = 'transform 1s';
            card.style.transform = `translate(${x}px, ${y}px)`;
        });

        // Появление надписи
        setTimeout(() => {
            loveMessage.style.transition = 'opacity 1s';
            loveMessage.style.opacity = '1';
        }, 2000);

        // Удаление карточек
        setTimeout(() => {
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '0';
                }, index * 200);
            });
        }, 3000);
    });
});

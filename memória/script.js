const imagesGame1 = [
    'img1.png', 'img1.png',
    'img2.png', 'img2.png',
    'img3.png', 'img3.png',
    'img4.png', 'img4.png',
    'img5.png', 'img5.png',
    'img6.png', 'img6.png',
    'img7.png', 'img7.png',
    'img8.png', 'img8.png',
    'img9.png', 'img9.png',
    'img10.png', 'img10.png',
    'img11.png', 'img11.png',
    'img12.png', 'img12.png',
    'img13.png', 'img13.png',
    'img14.png', 'img14.png',
    'img15.png', 'img15.png',
    'img16.png', 'img16.png',
    'img17.png', 'img17.png',
    'img18.png', 'img18.png',
    'img19.png', 'img19.png',
    'img20.png', 'img20.png'
];

const imagesGame2 = [
    'img1.png', 'img1.png',
    'img2.png', 'img2.png',
    'img3.png', 'img3.png',
    'img4.png', 'img4.png',
    'img5.png', 'img5.png',
    'img6.png', 'img6.png',
    'img7.png', 'img7.png',
    'img8.png', 'img8.png',
    'img9.png', 'img9.png',
    'img10.png', 'img10.png'
];


let firstCard, secondCard;
let lockBoard = false;

function startGame(gameNumber) {
    document.getElementById('game').style.display = 'block';
    const board = document.getElementById('board');
    board.innerHTML = '';

    // Aplica a classe correta para o layout
    board.className = gameNumber === 1 ? 'board game1' : 'board game2';
    
    const images = gameNumber === 1 ? imagesGame1 : imagesGame2; // Escolhe as imagens

    shuffle(images).forEach(img => {
        const card = createCard(img);
        board.appendChild(card);
    });
}

function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFaceFront = document.createElement('div');
    cardFaceFront.classList.add('card-face', 'front');
    cardFaceFront.textContent = '?';

    const cardFaceBack = document.createElement('div');
    cardFaceBack.classList.add('card-face', 'back');
    cardFaceBack.innerHTML = `<img src="${image}" alt="Memory Card">`;

    cardInner.appendChild(cardFaceBack);
    cardInner.appendChild(cardFaceFront);
    card.appendChild(cardInner);

    card.setAttribute('data-image', image);
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard) return;
    const card = this;
    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.getAttribute('data-image') === secondCard.getAttribute('data-image');
    isMatch ? resetCards() : unflipCards();
}

function resetCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function resetGame() {
    startGame();
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

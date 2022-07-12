// função para criar as cartas -> card com front e back
const grid = document.querySelector('.grid');
const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
  ];

function criarElemento(tag, classe){
    var element = document.createElement(tag);
    element.className = classe;
    return element;
}
let firstCard;
let secondCard;
const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length === 20){
        alert('Voceê ganhou!');
    }
}
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }
}
const revealCard = ({target}) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
      }
    
      if (firstCard === '') {
    
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    
      } else if (secondCard === '') {
    
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
    
        checkCards();
    
      }  
}
const criarCarta = (personagem) =>{
    //create elements
    const card = criarElemento('div', 'card');
    const front = criarElemento('div', 'face front');
    const back = criarElemento('div', 'face back');

    front.style.backgroundImage = `url(images/${personagem}.png)`;
    //organizar elementos criados
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', personagem);
    
    return card;
}
const loadGame = () =>{
    const duplicatedCharacters = [...characters, ...characters]; //... diz para pegar os elementos da array characters e espalhar aleatoriamente pela outra array
    const shuffledArray = duplicatedCharacters.sort(() => Math.random() - 0.5)
    shuffledArray.forEach(character => {
        const card = criarCarta(character);
        grid.appendChild(card);
    });
}

loadGame();
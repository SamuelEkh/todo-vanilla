const form = document.querySelector('.form');
const addButton = document.querySelector('.form__button');
const formTitle = document.querySelector('.form__title-input');
const formDesc = document.querySelector('.form__desc-input');
const cardContainer = document.querySelector('.card-container');
const validationMessage = document.querySelector('.validation-message');

const cardInformation = [];
const { localStorage } = window;

const cardAdder = (title, desc) => {
  const card = `
    <div class='card'>
      <p class='card__title'>${title}</p>
      <p class='card__desc'>${desc}</p>
      <p class='card__completed'>Completed</p>
      <button class='card__button'>Remove</button>
    </div>
  `;

  cardContainer.innerHTML += card;
};

const cardMemory = () => {
  let cards = localStorage.getItem('card');
  cards = JSON.parse(cards);
  if (cards) {
    cards.forEach((card) => {
      cardAdder(card.title, card.desc);
      cardInformation.push(card);
    });
  }
};

cardMemory();

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    const cardInfo = {
      title: formTitle.value,
      desc: formDesc.value,
    };
    cardInformation.push(cardInfo);
    localStorage.setItem('card', JSON.stringify(cardInformation));

    cardAdder(formTitle.value, formDesc.value);
    form.reset();
  } else {
    validationMessage.classList.add('validation-animation');
    setTimeout(() => {
      validationMessage.classList.remove('validation-animation');
    }, 1500);
  }
});

document.body.addEventListener('click', (e) => {
  if (e.target.className === 'card__button card__button--toggle') {
    const targetDesc = e.target.previousElementSibling.previousElementSibling;
    const cardArray = JSON.parse(localStorage.getItem('card'));

    cardArray.forEach((card) => {
      if (card.desc === targetDesc.textContent) {
        const index = cardArray.indexOf(card);
        cardArray.splice(index, 1);
        localStorage.setItem('card', JSON.stringify(cardArray));
      }
    });

    e.target.parentElement.remove();
  }
});

document.body.addEventListener('click', (e) => {
  const target = e.target.className;
  if (target === 'card__title' || target === 'card__desc') {
    e.target.parentElement.classList.toggle('card--toggle');
    e.target.parentElement.lastChild.previousSibling.previousElementSibling.classList.toggle('card__completed--toggle');
    e.target.parentElement.lastChild.previousSibling.classList.toggle('card__button--toggle');
  }
  if (target === 'card' || target === 'card card--toggle') {
    e.target.classList.toggle('card--toggle');
    e.target.lastChild.previousSibling.classList.toggle('card__button--toggle');
    e.target.lastChild.previousSibling.previousElementSibling.classList.toggle('card__completed--toggle');
  }
});

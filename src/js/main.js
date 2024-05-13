import weatherDetails from '../data/weather-data.js';

// * search
const searchForm = document.getElementById('id-header-search-form');
const searchInput = document.getElementById('id-header-search-input');
const searchBtn = document.getElementById('id-header-search-btn');
const searchCloseBtn = document.getElementById('id-header-search-btn-close');

function addActiveToSearchForm() {
  searchForm.classList.add('search-form--active');
}
function removeActiveFromSearchForm() {
  searchForm.classList.remove('search-form--active');
}

searchBtn.addEventListener('mouseover', () => {
  removeActiveFromSearchForm();
});

searchCloseBtn.addEventListener('mouseover', () => {
  removeActiveFromSearchForm();
});
searchCloseBtn.addEventListener('mouseout', () => {
  addActiveToSearchForm();
});

searchInput.addEventListener('mouseover', () => {
  addActiveToSearchForm();
});
searchInput.addEventListener('mouseout', () => {
  if (searchInput !== document.activeElement) {
    removeActiveFromSearchForm();
  }
});

searchInput.addEventListener('focus', () => {
  addActiveToSearchForm();
});
searchInput.addEventListener('blur', () => {
  removeActiveFromSearchForm();
});

// toggle searchBtn and searchCloseBtn
searchInput.addEventListener('input', (event) => {
  if (event.target.value) {
    searchBtn.classList.add('none');
    searchCloseBtn.classList.remove('none');
  } else {
    searchBtn.classList.remove('none');
    searchCloseBtn.classList.add('none');
  }
  console.log(event.target.value);
});

searchCloseBtn.addEventListener('click', () => {
  searchBtn.classList.remove('none');
  searchCloseBtn.classList.add('none');
});

// *
// * cards
const weatherDetailsCards = document
  .getElementById('id-weather-details-cards')
  .querySelectorAll('.weather-details-card');

function renderCardsContent() {
  for (let i = 0; i < weatherDetails.length; i++) {
    const {
      title: titleFromData,
      image: imageFromData,
      value: valueFromData,
      measure: measureFromData,
      progress: progressFromData,
      addictional: addictionalFromData,
    } = weatherDetails[i]; // from data

    const cardTitleElement = weatherDetailsCards[i].querySelector(
      '.weather-details-card__header'
    );
    const cardIconElement = weatherDetailsCards[i].querySelector(
      '.weather-details-card__icon'
    );
    const cardValueElement = weatherDetailsCards[i].querySelector(
      '.weather-details-card__degree'
    );
    const cardCommentElement = weatherDetailsCards[i].querySelector(
      '.visual-degree__comment'
    );

    cardTitleElement && (cardTitleElement.textContent = titleFromData);

    cardIconElement && (cardIconElement.src = imageFromData);
    if (weatherDetails[i].direction) {
      cardIconElement.style.transform = `rotate(${
        +weatherDetails[i].direction + 45
      }deg)`;
    }

    cardValueElement && (cardValueElement.textContent = valueFromData);
    measureFromData && (cardValueElement.textContent += ' ' + measureFromData);

    if (progressFromData) {
      const cardBarElement = weatherDetailsCards[i].querySelector(
        '.visual-degree__bar-bar'
      );
      const cardellipseOfBarElement = weatherDetailsCards[i].querySelector(
        '.visual-degree__bar-ellipse'
      );

      let position = ((126 - 8) / 100) * valueFromData;
      // пока неизвестно - костыль
      while (position > 126) {
        position /= 10;
      }
      cardBarElement.style.mask = `radial-gradient(
          circle at calc(${position + 4}px),
          transparent 6px,
          black 6px,
          black 6px
        )`;
      cardellipseOfBarElement.style.left = `${position}px`;
    }

    if (typeof addictionalFromData === 'object') {
      // bar with range
      weatherDetailsCards[i].querySelector('.visual-degree__min').textContent =
        addictionalFromData.minValue + measureFromData;

      weatherDetailsCards[i].querySelector('.visual-degree__max').textContent =
        addictionalFromData.maxValue + measureFromData;
    } else {
      if (!weatherDetails[i].direction) {
        cardCommentElement.textContent = addictionalFromData;
      } else {
        // wind direction
        const directionFromData = +weatherDetails[i].direction;

        if (directionFromData <= 22.5 || directionFromData > 315 + 22.5) {
          cardCommentElement.textContent = 'Северный';
        } else if (directionFromData <= 45 + 22.5) {
          cardCommentElement.textContent = 'Северо-восточный';
        } else if (directionFromData <= 90 + 22.5) {
          cardCommentElement.textContent = 'Восточный';
        } else if (directionFromData <= 135 + 22.5) {
          cardCommentElement.textContent = 'Юго-восточный';
        } else if (directionFromData <= 180 + 22.5) {
          cardCommentElement.textContent = 'Южный';
        } else if (directionFromData <= 225 + 22.5) {
          cardCommentElement.textContent = 'Юго-западный';
        } else if (directionFromData <= 270 + 22.5) {
          cardCommentElement.textContent = 'Западный';
        } else if (directionFromData <= 315 + 22.5) {
          cardCommentElement.textContent = 'Северо-западный';
        } else {
          cardCommentElement.textContent = '-';
        }
      }
    }
  }
}

renderCardsContent();

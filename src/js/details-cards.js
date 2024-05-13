const weatherDetailsDataPath = '/src/data/weather-details-data.json';

const weatherDetailsCards = document
  .getElementById('id-weather-details-cards')
  .querySelectorAll('.weather-details-card');

function renderCardsContent(dataPath) {
  fetch(dataPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error('failed to load data from API');
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((objectFromData, i) => {
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
          '.weather-details-card__visual-degree-values-comment'
        );

        cardTitleElement &&
          (cardTitleElement.textContent = objectFromData.title);

        cardIconElement && (cardIconElement.src = objectFromData.imageSrc);
        if (objectFromData.direction) {
          cardIconElement.style.transform = `rotate(${
            +objectFromData.direction + 45
          }deg)`;
        }

        objectFromData.value &&
          (cardValueElement.textContent = objectFromData.value);
        objectFromData.measure &&
          (cardValueElement.textContent += ' ' + objectFromData.measure);

        if (objectFromData.progress) {
          const cardBarElement = weatherDetailsCards[i].querySelector(
            '.weather-details-card__visual-degree-bar'
          );
          const cardBarEllipseElement = weatherDetailsCards[i].querySelector(
            '.weather-details-card__visual-degree-bar-ellipse'
          );

          // пока неизвестно - костыль
          let valueFromData = objectFromData.value;
          while (valueFromData > 100) {
            valueFromData /= 10;
          }
          let position = Math.round(valueFromData);

          cardBarElement.style.mask = `radial-gradient(
          circle at calc(${position}%),
          transparent clamp(0.313rem, 0.78vw, 0.375rem),
          black clamp(0.313rem, 0.78vw, 0.375rem),
          black clamp(0.313rem, 0.78vw, 0.375rem)
        )`;
          cardBarEllipseElement.style.left = `calc(${position}% - clamp(0.188rem, -0.125rem + 0.78vw, 0.25rem))`;
          cardBarElement.value = valueFromData;
        }

        //
        if (typeof objectFromData.addictional === 'object') {
          // bar with range (no comment)
          weatherDetailsCards[i].querySelector(
            '.weather-details-card__visual-degree-values-min'
          ).textContent =
            objectFromData.addictional.minValue + objectFromData.measure;

          weatherDetailsCards[i].querySelector(
            '.weather-details-card__visual-degree-values-max'
          ).textContent =
            objectFromData.addictional.maxValue + objectFromData.measure;
        } else {
          // bar without range (with comment)
          if (!objectFromData.direction) {
            // no wind direction
            cardCommentElement.textContent = objectFromData.addictional;
          } else {
            // wind direction
            if (
              objectFromData.direction <= 22.5 ||
              objectFromData.direction > 315 + 22.5
            ) {
              cardCommentElement.textContent = 'Северный';
            } else if (objectFromData.direction <= 45 + 22.5) {
              cardCommentElement.textContent = 'Северо-восточный';
            } else if (objectFromData.direction <= 90 + 22.5) {
              cardCommentElement.textContent = 'Восточный';
            } else if (objectFromData.direction <= 135 + 22.5) {
              cardCommentElement.textContent = 'Юго-восточный';
            } else if (objectFromData.direction <= 180 + 22.5) {
              cardCommentElement.textContent = 'Южный';
            } else if (objectFromData.direction <= 225 + 22.5) {
              cardCommentElement.textContent = 'Юго-западный';
            } else if (objectFromData.direction <= 270 + 22.5) {
              cardCommentElement.textContent = 'Западный';
            } else if (objectFromData.direction <= 315 + 22.5) {
              cardCommentElement.textContent = 'Северо-западный';
            } else {
              cardCommentElement.textContent = '-';
            }
          }
        }
      });
    })
    .catch((error) => {
      console.log('A problem with fetch operation:', error);
    });
}

renderCardsContent(weatherDetailsDataPath);

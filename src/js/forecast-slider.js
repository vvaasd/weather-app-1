// toggle sliders
const slider24hBtn = document
  .getElementById('id-forecast-slider__selection-btn-wrap-24h')
  .querySelector('.forecast-slider__selection-btn');

slider24hBtn.classList.add('show-after');

const slider5dBtn = document
  .getElementById('id-forecast-slider__selection-btn-wrap-5d')
  .querySelector('.forecast-slider__selection-btn');

const slider24h = document.getElementById('id-slider__cards-24h');
const slider5d = document.getElementById('id-slider__cards-5d');
let currentSliderElement = slider24h;

slider24hBtn.addEventListener('click', () => {
  slider24hBtn.classList.add('forecast-slider__selection-btn--active');
  slider24hBtn.classList.add('show-after');
  slider24h.classList.remove('none');

  slider5dBtn.classList.remove('forecast-slider__selection-btn--active');
  slider5dBtn.classList.remove('show-after');
  slider5d.classList.add('none');
});

slider5dBtn.addEventListener('click', () => {
  slider5dBtn.classList.add('forecast-slider__selection-btn--active');
  slider5dBtn.classList.add('show-after');
  slider5d.classList.remove('none');

  slider24hBtn.classList.remove('forecast-slider__selection-btn--active');
  slider24hBtn.classList.remove('show-after');
  slider24h.classList.add('none');
});

// render sliders
function renderSlider(sliderElement, dataPath) {
  fetch(dataPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error('failed to load data from API');
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((objectFromData) => {
        const sliderCardElement = document.createElement('li');
        const sliderCardTimeElement = document.createElement('p');
        const cardWeatherTypeIconElement = document.createElement('img');
        let sliderCardValueElement;

        sliderCardElement.classList.add('slider__card');

        sliderCardTimeElement.textContent = objectFromData.time;
        sliderCardTimeElement.classList.add('slider__card-time');

        cardWeatherTypeIconElement.classList.add('slider__card-weather-type');
        cardWeatherTypeIconElement.src = objectFromData.weatherType;
        cardWeatherTypeIconElement.alt = 'weather-type';

        // check if temperature is range
        if (typeof objectFromData.value !== 'object') {
          sliderCardValueElement = document.createElement('span');

          sliderCardValueElement.classList.add('slider__card-temperature');
          sliderCardValueElement.textContent = objectFromData.value;
        } else {
          sliderCardValueElement = document.createElement('p');

          const minValueElement = document.createElement('span');
          const maxValueElement = document.createElement('span');

          minValueElement.classList.add('slider__card-temperature-min');
          maxValueElement.classList.add('slider__card-temperature-min');

          minValueElement.textContent = objectFromData.value.minValue;
          maxValueElement.textContent = objectFromData.value.maxValue;

          sliderCardValueElement.appendChild(document.createTextNode('от '));
          sliderCardValueElement.appendChild(minValueElement);
          sliderCardValueElement.appendChild(document.createTextNode(' до '));
          sliderCardValueElement.appendChild(maxValueElement);
          sliderCardValueElement.classList.add(
            'slider__card-temperature-range'
          );
        }

        sliderCardElement.appendChild(sliderCardTimeElement);
        sliderCardElement.appendChild(cardWeatherTypeIconElement);
        sliderCardElement.appendChild(sliderCardValueElement);

        sliderElement.appendChild(sliderCardElement);
      });
    })
    .catch((error) => {
      console.error('A problem with fetch operation:', error);
    });
}

const weatherData24hPath = './src/data/weather-data-24h.json';
const weatherData5dPath = './src/data/weather-data-5d.json';

function renderSliders() {
  renderSlider(slider24h, weatherData24hPath);
  renderSlider(slider5d, weatherData5dPath);
}
renderSliders();

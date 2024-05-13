const weatherDetails = [
  {
    title: 'Влажность',
    image: './../../public/img/icons/humidity-icon.svg',
    value: '75',
    measure: '%',
    progress: true,
    addictional: {
      minValue: '0',
      maxValue: '100',
    },
  },
  {
    title: 'Давление',
    image: './../../public/img/icons/pressure-icon.svg',
    value: '761',
    measure: '',
    progress: true,
    addictional: 'Повышенное',
  },
  {
    title: 'Видимость',
    image: './../../public/img/icons/visibility-icon.svg',
    value: '28',
    measure: 'км',
    progress: true,
    addictional: 'Нормальная',
  },
  {
    title: 'Рассвет',
    image: './../../public/img/icons/sunrise-icon.svg',
    value: '8:42',
    progress: false,
    addictional: 'Прошло: 02:47',
  },
  {
    title: 'Закат',
    image: './../../public/img/icons/sunset-icon.svg',
    value: '16:37',
    progress: false,
    addictional: 'Осталось: 05:08',
  },
  {
    title: 'Сила ветра',
    image: './../../public/img/icons/wind-icon.svg',
    value: '2',
    measure: 'м/с',
    progress: '',
    addictional: 'Северо-западный',
    direction: '315',
  },
];
// !json
export default weatherDetails;

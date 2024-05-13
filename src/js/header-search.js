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

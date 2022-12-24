const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();//taking data from local storage and selecting seats

let ticketPrice = +movieSelect.value;//+ convert this string num
// Initial count and total set by using seats list

updateSelectedCount();

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
//stores the slected seats in local storage and chanages count and total by using seats
//then set the movieindex of option list and price in index too
function updateSelectedCount() {
  //hr baar selected serats ki nodelist banao
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  //making array of index of all selected seats with selected class using nodelist 
  //for stroing data in localstoage 
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  
  setMovieData(movieSelect.selectedIndex, movieSelect.value);//saving in local storage
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {//local storage has that selected seat
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
//select list pr cvhange event hota hai , we change the price var
//and then upddate the ui
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {//event delegation ,put on container and check
  if ( e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')) 
    {
        e.target.classList.toggle('selected');
        updateSelectedCount();//local storage,total and count change
    }
});


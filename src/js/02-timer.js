import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const parent = document.querySelector('.timer');
const refs = {
  inpurEl: parent.querySelector('#datetime-picker'),
  startEl: parent.querySelector('button[data-start]'),
  spanDay: parent.querySelector('.value[data-days]'),
  spanHours: parent.querySelector('.value[data-hours]'),
  spanMinutes: parent.querySelector('.value[data-minutes]'),
  spanSeconds: parent.querySelector('.value[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0].getTime());
    const startTime = Date.now();
    const userTime = selectedDates[0].getTime();
    if (startTime > userTime) {
      alert('Please choose a date in the future');
      return;
    }
    selectedDate(userTime);
  },
};
flatpickr('#datetime-picker', options);

function selectedDate(userTime) {
  let intervalId = setInterval(() => {
    const currentTime = userTime - Date.now();
    const time = convertMs(currentTime);

    updateTime(time);
  }, 1000);
}

function updateTime({ days, hours, minutes, seconds }) {
  refs.spanDay.innerHTML = days;
  refs.spanHours.innerHTML = hours;
  refs.spanMinutes.innerHTML = minutes;
  refs.spanSeconds.innerHTML = seconds;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
  }

// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix from 'notiflix';

// const parent = document.querySelector('.timer');

// const refs = {
//   inpurEl: parent.querySelector('#datetime-picker'),
//   startEl: parent.querySelector('button[data-start]'),
//   spanDay: parent.querySelector('.value[data-days]'),
//   spanHours: parent.querySelector('.value[data-hours]'),
//   spanMinutes: parent.querySelector('.value[data-minutes]'),
//   spanSeconds: parent.querySelector('.value[data-seconds]'),
// };

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: null,
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0].getTime());
//     const startTime = Date.now();
//     const userTime = selectedDates[0].getTime();
//     if (startTime > userTime) {
//       Notiflix.Report.failure("Please choose a date in the future");
//       return;
//     }
//     selectedDate(userTime);
//   },
// };
// flatpickr('#datetime-picker', options);

// refs.startEl.addEventListener('click'() => {
//   //options.start();
// });

// function selectedDate(userTime) {
//   let intervalId = setInterval(() => {
//     const currentTime = userTime - Date.now();
//     const time = convertMs(currentTime);

//     updateTime(time);
//   }, 1000);
// }

// function updateTime({ days, hours, minutes, seconds }) {
//   refs.spanDay.innerHTML = days;
//   refs.spanHours.innerHTML = hours;
//   refs.spanMinutes.innerHTML = minutes;
//   refs.spanSeconds.innerHTML = seconds;
// }

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }
  

///////////////////////////////////
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  //настройка
  enableTime: true,
  time_24hr: true,
  defaultDate: null,
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

const startBtn = document.querySelector('button[data-start]');

class Timer {
  constructor() {
    this.intervalId = null;
    this.diff = 0;
    this.date = document.querySelector('#datetime-picker');
    this.days = document.querySelector('span[data-days]');
    this.hours = document.querySelector('span[data-hours]');
    this.minutes = document.querySelector('span[data-minutes]');
    this.seconds = document.querySelector('span[data-seconds]');
  }

  start() {
    if (new Date(this.date.value).getTime() < Date.now()) {
      Notiflix.Report.failure("Please choose a date in the future");
      return;
    }

    startBtn.setAttribute('disabled', true);

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const futureTime = new Date(this.date.value).getTime();
      const diff = futureTime - currentTime;

      if (diff < 0) {
        clearInterval(this.intervalId);
        Notiflix.Notify.success('Time is over.');
        return;
      }

      const convartDate = this.convertMs(diff);
      console.log('~ convartDate', convartDate);
      this.updateClockface(convartDate);
    }, 1000);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = this.pad(Math.floor(ms / day));
    const hours = this.pad(Math.floor((ms % day) / hour));
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }

  updateClockface({ days, hours, minutes, seconds }) {
    this.days.textContent = `${days}`;
    this.hours.textContent = `${hours}`;
    this.minutes.textContent = `${minutes}`;
    this.seconds.textContent = `${seconds}`;
  }
}

const timer = new Timer();

startBtn.addEventListener('click', timer.start.bind(timer));
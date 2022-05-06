import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
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
      this.date.value = "";
      Notiflix.Notify.failure("Please choose a date in the future");
      return;
    }
      startBtn.disabled = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const futureTime = new Date(this.date.value).getTime();
      const diff = futureTime - currentTime;

      if (diff < 0) {
        clearInterval(this.intervalId);
         this.date.value = "";
        Notiflix.Notify.success('Time is over.');
        return startBtn.disabled = false;
       
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


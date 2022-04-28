const refs = {
  start: document.querySelector('button[data-start]'),
  finish: document.querySelector('button[data-stop]'),
};

refs.start.addEventListener('click', onStartClick);
refs.finish.addEventListener('click', onFinishClick);

const addAttFinish = refs.finish.setAttribute('disabled', 'disabled');

let timerId = null;

function onStartClick(e) {
  refs.finish.removeAttribute('disabled');
  const addAttStart = refs.start.setAttribute('disabled', 'disabled');
  startClick();
  timerId = setInterval(startClick, 2000);
}

onFinishClick();
function onFinishClick(e) {
  refs.start.removeAttribute('disabled');
  refs.finish.setAttribute('disabled', 'disabled');
  clearInterval(timerId);
}

function startClick() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.backgroundColor = '#' + randomColor;
}



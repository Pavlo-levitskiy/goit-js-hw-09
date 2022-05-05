const refs = {
  start: document.querySelector('button[data-start]'),
  finish: document.querySelector('button[data-stop]'),
};

let timerId = null;

function onStartClick(e) {
  refs.finish.removeAttribute('disabled');
  refs.start.disabled = true;
  startClick();
  timerId = setInterval(startClick, 2000);
}

refs.start.addEventListener('click', onStartClick);


function onFinishClick(e) {
  refs.start.removeAttribute('disabled');
  refs.finish.disabled = true;
  clearInterval(timerId);
}

refs.finish.addEventListener('click', onFinishClick);


function startClick() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.backgroundColor = '#' + randomColor;
}



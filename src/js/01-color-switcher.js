const refs = {
  start: document.querySelector('button[data-start]'),
  finish: document.querySelector('button[data-stop]'),
};

let timerId = null;

function onStartClick(e) {
  refs.finish.disabled = false;
  refs.start.disabled = true;
  startClick();
  timerId = setInterval(startClick, 2000);
}

refs.start.addEventListener('click', onStartClick);


function onFinishClick(e) {
  refs.start.disabled = false;;
  refs.finish.disabled = true;
  clearInterval(timerId);
}

refs.finish.addEventListener('click', onFinishClick);


function startClick() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.backgroundColor = '#' + randomColor;
}



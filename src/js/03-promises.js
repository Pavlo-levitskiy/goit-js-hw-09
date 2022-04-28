import Notiflix from 'notiflix';

const refs = {
  delayEl: document.querySelector('input[name="delay"]'),
  stepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
  formEl: document.querySelector('.form'),
  bodyEl: document.querySelector('body'),
};


refs.formEl.addEventListener('submit', onFormSubmit);
function onFormSubmit(e) {
  e.preventDefault();
  let delayV = +refs.delayEl.value;
  const stepV = +refs.stepEl.value;
  const amountV = +refs.amountEl.value;

  for (let i = 1; i <= amountV; i += 1) {

    createPromise(i, delayV)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`&#x2705 Sol lucet omnibus ${position + 1} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`&#10060 Qui timide rogat docet negare ${position + 1} in ${delay}ms`);
      });
    delayV += stepV;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

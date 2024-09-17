import { modalWindow } from "./modal.js";
import { postClients } from "./api.js";

// function deleteBtn(){
//   // Получение модального окна
//   let modal = document.querySelector('.modal');
//   // Получение кнопки закрытия
//   let closeBtn = document.querySelector('.close');

//   // Функция для открытия модального окна
//   function openModal() {
//     modal.style.display = 'block';
//   }

//   // Функция для закрытия модального окна
//   function closeModal() {
//     modal.style.display = 'none';
//   }

//   // Событие при нажатии на кнопку закрытия
//   closeBtn.addEventListener('click', closeModal);

//   // Событие при нажатии за пределами модального окна - закрытие модального окна
//   window.onclick = function(event) {
//     if (event.target === modal) {
//       modal.style.display = 'none';
//     }
//   }
//   }

    function changeDate(date){
      let options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      };
     const actualDate = (new Date(date)).toLocaleString('ru', options).replace(',', ' ')
     return actualDate;
    }

    function firstLetter(str) {
      if (str == '') return str;
      let strOne = str.toLowerCase().trim();
      let strTwo = strOne[0].toUpperCase() + strOne.slice(1);
      return strTwo;
    }

    function debounce(func, delay) {
      let debounceTimeout;
      return function(...args) {
        const context = this;
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => func.apply(context, args), delay);
      };
    }


    export {firstLetter, changeDate, debounce}

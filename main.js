import { modalWindow} from './modules/modal.js';
import { createTable} from './modules/table.js';
import { postClients, updateClient } from './modules/api.js';
import { debounce } from './modules/utils.js';
import { addContact } from './modules/contacts.js';



document.addEventListener('DOMContentLoaded', async () => {
  await createTable();

  const addButton = document.querySelector('.btn_add');
  if (addButton) {
    addButton.addEventListener('click', () => {
      const modalElements = modalWindow('Новый клиент');
      if (modalElements.modalBackground) {
        modalElements.modalBackground.style.display = 'flex';
      }
    });
  }

  const saveButton = document.querySelector('.modal_btn_save');
  if (saveButton) {
    saveButton.addEventListener('click', async () => {
      const modalTitle = document.querySelector('.modal_title').textContent;
      if (modalTitle.includes('Новый клиент')) {
        await postClients();
      } else if (modalTitle.includes('Изменить данные')) {
        const clientId = modalTitle.split('Id:')[1];
        await updateClient(clientId);
      }
      await createTable();
      const modalBackground = document.querySelector('.modal_background');
      if (modalBackground) {
        modalBackground.style.display = 'none';
      }
    });
  }

  const searchInput = document.querySelector('.header__form');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(async () => {
      const query = searchInput.value;
      await createTable(query);
    }, 300));
  }

    // Добавление контактов

//     const addContactButton = document.querySelector('.modal_btn_add');
//     if (addContactButton) {
//       addContactButton.addEventListener('click', () => {
//         addContact();
//       });
//     }
});







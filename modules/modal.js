import { addContact} from "./contacts.js";
import { postClients, updateClient } from './api.js';

function modalWindow(title, data = null) {
  const modalBackground = document.querySelector('.modal_background');
  const modalTitle = document.querySelector('.modal_title');
  const modalBtnSave = document.querySelector('.modal_btn_save');
  const modalClose = document.querySelector('.modal_close');
  const addContactBtn = document.querySelector('.modal_btn_add');

  // Очистка контактов перед открытием модального окна
  clearContacts();

  modalTitle.textContent = title;

  if (title === 'Изменить данные') {
    modalTitle.textContent = `${title} Id:${data.id}`;
    document.getElementById('name').value = data.name;
    document.getElementById('surname').value = data.surname;
    document.getElementById('lastname').value = data.lastname;
    data.contacts.forEach(contact => addContact(contact.type, contact.value));
  }

  modalBackground.style.display = 'flex';

  function closeModal() {
    modalBackground.style.display = 'none';
    clearContacts();
    modalTitle.textContent = '';
    document.getElementById('name').value = '';
    document.getElementById('surname').value = '';
    document.getElementById('lastname').value = '';
    removeEventListeners();
  }

  function saveClient() {
    const modalTitleText = modalTitle.textContent;
    if (modalTitleText.includes('Новый клиент')) {
      postClients().then(() => {
        closeModal();
      });
    } else if (modalTitleText.includes('Изменить данные')) {
      const clientId = modalTitleText.split('Id:')[1];
      updateClient(clientId).then(() => {
        closeModal();
      });
    }
  }

  function closeModalByClickOutside(e) {
    if (e.target === modalBackground) {
      closeModal();
    }
  }

  function removeEventListeners() {
    modalClose.removeEventListener('click', closeModal);
    modalBtnSave.removeEventListener('click', saveClient);
    modalBackground.removeEventListener('click', closeModalByClickOutside);
    addContactBtn.removeEventListener('click', addContact);
  }

  removeEventListeners();  // Удаляем существующие слушатели перед добавлением новых

  modalClose.addEventListener('click', closeModal);
  modalBackground.addEventListener('click', closeModalByClickOutside);
  addContactBtn.addEventListener('click', addContact);
}

function clearContacts() {
  const modalRow = document.querySelector('.modal_add_contact');
  modalRow.innerHTML = '';
}

export { modalWindow };



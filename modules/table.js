import { contactsImage } from "./contacts.js";
import { firstLetter, changeDate } from "./utils.js";
import { modalWindow } from './modal.js';
import { fetchClients } from './api.js';

let currentClients = [];
let currentSortKey = null;
let currentAsc = true;
let currentQuery = '';

async function fetchAndSetClients(query = '') {
  currentClients = await fetchClients(query);
}

function createTableRow(client) {
  const tr = document.createElement('tr');

  const td1 = createTableCell(client.id, 'fixed_width_id');
  const td2 = createTableCell(`${client.surname} ${client.name} ${client.lastName}`, 'fixed_width_fio');
  const td3 = createTableCell(changeDate(client.createdAt), 'fixed_width_time_created');
  const td4 = createTableCell(changeDate(client.updatedAt), 'fixed_width_time_changes');
  const td5 = createTableCell(null, 'fixed_width_contacts');
  const td6 = createTableCell(null, 'fixed_width_action');

  const contactImages = contactsImage(client);
  td5.append(contactImages);

  const changeButton = createActionButton('Изменить', 'pictures/pancil.png', 'table_btn_change', () => handleEdit(client));
  const deleteButton = createActionButton('Удалить', 'pictures/cancel.png', 'table_btn_delete', () => handleDelete(client.id));

  td6.append(changeButton, deleteButton);
  tr.append(td1, td2, td3, td4, td5, td6);

  const hr = document.createElement('hr');
  hr.classList.add('change');

  return { tr, hr };
}

function createTableCell(content, className) {
  const td = document.createElement('td');
  td.classList.add(className);
  if (content !== null) {
    const textNode = document.createTextNode(content);
    td.append(textNode);
  }
  return td;
}

function createActionButton(text, imgSrc, className, eventHandler) {
  const button = document.createElement('button');
  button.classList.add(className);

  const img = document.createElement('img');
  img.src = imgSrc;
  button.append(img, text);

  button.addEventListener('click', eventHandler);

  return button;
}

async function handleDelete(clientId) {
  try {
    const response = await fetch(`http://localhost:3000/api/clients/${clientId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Ошибка при удалении клиента');
    }
    await createTable(currentQuery);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

function handleEdit(client) {
  const data = {
    id: client.id,
    name: client.name,
    surname: client.surname,
    lastname: client.lastName,
    contacts: client.contacts
  };
  const modalElements = modalWindow('Изменить данные', data);
  if (modalElements.modalBackground) {
    modalElements.modalBackground.style.display = 'flex';
  }
}

async function createTable(query = '', sortKey = currentSortKey, asc = currentAsc) {
  await fetchAndSetClients(query);
  const tableClients = document.getElementById('table_body');
  tableClients.innerHTML = '';

  let clients = [...currentClients];

  if (sortKey) {
    clients = sortClients(clients, sortKey, asc);
  }

  clients.forEach(client => {
    const { tr, hr } = createTableRow(client);
    tableClients.append(tr, hr);
  });
}

function fillForm() {
  const modalLastname = document.getElementById('lastname');
  const lastname = firstLetter(modalLastname.value);
  const modalName = document.getElementById('name');
  const name = firstLetter(modalName.value);
  const modalSurname = document.getElementById('surname');
  const surname = firstLetter(modalSurname.value);

  return {
    lastname,
    name,
    surname,
  };
}

function sortClients(clients, key, asc = true) {
  return clients.sort((a, b) => {
    if (a[key] < b[key]) return asc ? -1 : 1;
    if (a[key] > b[key]) return asc ? 1 : -1;
    return 0;
  });
}

function attachSortHandlers() {
  const sortButtons = {
    'table__id__col-sm': 'id',
    'table__fio__col-sm': 'surname',
    'table__created__col-sm': 'createdAt',
    'table__change__col-sm': 'updatedAt'
  };

  for (const [buttonClass, sortKey] of Object.entries(sortButtons)) {
    document.querySelector(`.${buttonClass}`).addEventListener('click', async () => {
      currentAsc = (currentSortKey === sortKey) ? !currentAsc : true;
      currentSortKey = sortKey;
      const imgTag = document.querySelector(`.${buttonClass} img`);
      imgTag.src = currentAsc ? "pictures/arrow_upward.png" : "pictures/arrow_downward.png";
      await createTable(currentQuery, currentSortKey, currentAsc);
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  attachSortHandlers();
  await createTable();
});

export { createTable, fillForm };


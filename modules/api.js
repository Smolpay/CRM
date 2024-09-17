import { fillForm } from "./table.js";
import { getDataContact } from "./contacts.js";

export async function fetchClients(query = '') {
  const url = query ? `http://localhost:3000/api/clients?search=${query}` : 'http://localhost:3000/api/clients';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Ошибка при получении клиентов');
  }
  return await response.json();
}

export async function postClients(){
  const form = fillForm();
  const contacts = getDataContact();
    const response = await fetch('http://localhost:3000/api/clients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: form.name,
      surname: form.surname,
      lastName: form.lastname,
      contacts: contacts,
})

  })
  const newClient = await response.json();
  return newClient;

}

export async function getItemsData() {
  const response = await fetch('http://localhost:3000/api/clients', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
      });
  const clients = await response.json();
  if (clients === null) {
    return
  }

  return await clients;
};

export async function updateClient(clientId) {
  const form = fillForm();
  const contacts = getDataContact();
  const response = await fetch(`http://localhost:3000/api/clients/${clientId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: form.name,
      surname: form.surname,
      lastName: form.lastname,
      contacts: contacts,
    })
  });

  if (!response.ok) {
    throw new Error('Ошибка при обновлении клиента');
  }

  const updatedClient = await response.json();
  return updatedClient;
}

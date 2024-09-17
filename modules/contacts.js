function addContact(type = 'Телефон', value = '') {
  const modalRow = document.querySelector('.modal_add_contact');
  const modalRowBtnAdd = document.querySelector('.modal_row_btn_add');
  const addContactBtn = document.querySelector('.modal_btn_add');

  const typeContactDiv = createTypeContactDiv();
  const choiceType = createChoiceType(type);
  const contactInput = createContactInput(value);
  const contactBtnDel = createContactDeleteButton();

  appendElements(typeContactDiv, choiceType, contactInput, contactBtnDel);
  modalRow.append(typeContactDiv);

  updateModalRowBtnAddHeight(modalRowBtnAdd, addContactBtn);

  addDeleteButtonEventListener(contactBtnDel, typeContactDiv, modalRowBtnAdd, addContactBtn);
}

function createTypeContactDiv() {
  const typeContactDiv = document.createElement('div');
  typeContactDiv.classList.add('modal_type_contact');

  const typeContactDiv2 = document.createElement('div');
  typeContactDiv2.classList.add('modal_type_contact_row');
  typeContactDiv.append(typeContactDiv2);

  return typeContactDiv;
}

function createChoiceType(selectedType) {
  const choiceType = document.createElement('select');
  choiceType.classList.add('modal_choice_type');
  choiceType.id = 'choice_type';

  const optionTypes = ['Телефон', 'Email', 'Facebook', 'VK', 'Другое'];
  optionTypes.forEach(type => {
    const option = createOption(type, type);
    choiceType.append(option);
  });

  choiceType.value = selectedType;
  return choiceType;
}

function createContactInput(value) {
  const contactInput = document.createElement('input');
  contactInput.classList.add('modal_type_input');
  contactInput.value = value;
  return contactInput;
}

function createContactDeleteButton() {
  const contactBtnDel = document.createElement('button');
  contactBtnDel.classList.add('modal_type_btn_del');

  const delBtnImage = document.createElement('img');
  delBtnImage.src = 'pictures/modal_cancel.png';
  delBtnImage.classList.add('modal_del_contact_btn');
  contactBtnDel.append(delBtnImage);

  return contactBtnDel;
}

function appendElements(typeContactDiv, choiceType, contactInput, contactBtnDel) {
  const typeContactDiv2 = typeContactDiv.firstChild;
  typeContactDiv2.append(choiceType, contactInput, contactBtnDel);
}

function updateModalRowBtnAddHeight(modalRowBtnAdd, addContactBtn) {
  const totalContactHeight = getTotalHeightOfContacts();
  modalRowBtnAdd.style.height = totalContactHeight > 200 ? '200px' : '100%';
  modalRowBtnAdd.style.overflowY = totalContactHeight > 200 ? 'auto' : 'hidden';
  addContactBtn.style.padding = totalContactHeight > 200 ? '27px 0 0 0' : '0px 0 0 0';

  const contactLength = getDataContact().length;
  if (contactLength > 8) {
    addContactBtn.style.display = "none";
  } else {
    addContactBtn.style.display = "block";
  }
}

function addDeleteButtonEventListener(contactBtnDel, typeContactDiv, modalRowBtnAdd, addContactBtn) {
  contactBtnDel.addEventListener('click', function (elem) {
    if (elem.target.tagName === 'IMG') {
      elem.target.parentNode.parentNode.parentNode.remove();
    } else if (elem.target.tagName === 'BUTTON') {
      elem.target.parentNode.parentNode.remove();
    }

    updateModalRowBtnAddHeight(modalRowBtnAdd, addContactBtn);
  });
}

function getTotalHeightOfContacts() {
  const typeContactDivs = document.querySelectorAll('.modal_type_contact');
  let totalHeight = 0;
  typeContactDivs.forEach(contact => {
    totalHeight += contact.offsetHeight;
  });
  return totalHeight;
}

function createOption(value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  return option;
}

function contactsImage(clients) {
  const spanCont = document.createElement('span');
  spanCont.classList.add('table_tooltip_contacts');

  let hiddenContacts;

  for (let i = 0; i < clients.contacts.length; i++) {
    const tooltipImg = document.createElement('button');
    tooltipImg.classList.add('table_tooltip_toggle');

    const imgCont = document.createElement('img');
    imgCont.classList.add('table_tooltip_icon');

    const textTooltip = document.createElement('span');
    textTooltip.classList.add('table_tooltip_text');

    let icon;

    if (i < 3) {
      switch (clients.contacts[i].type) {
        case 'Телефон':
          icon = 'pictures/phone.png';
          break;
        case 'VK':
          icon = 'pictures/vk.png';
          break;
        case 'Facebook':
          icon = 'pictures/fb.png';
          break;
        case 'Email':
          icon = 'pictures/mail.png';
          break;
        case 'Другое':
          icon = 'pictures/human.png';
          break;
      }
      imgCont.src = icon;
      textTooltip.textContent = clients.contacts[i].type + ": " + clients.contacts[i].value;
      tooltipImg.append(imgCont);
      spanCont.append(tooltipImg);
      spanCont.append(textTooltip);
    } else {
      if (i === 3) {
        const imgContNumber = document.createElement('img');
        imgContNumber.classList.add('table_tooltip_img_count');
        imgContNumber.src = 'pictures/Ellipse.png';

        const number = document.createElement('div');
        number.classList.add('table_tooltip_img_number');
        number.textContent = "+" + (clients.contacts.length - 3);
        number.append(imgContNumber);

        tooltipImg.append(number);
        spanCont.append(tooltipImg);

        hiddenContacts = document.createElement('div');
        hiddenContacts.classList.add('hidden_contacts');
      }

      tooltipImg.addEventListener('click', () => {
        if (!spanCont.contains(hiddenContacts)) {
          hiddenContacts.innerHTML = '';
          for (let j = 3; j < clients.contacts.length; j++) {
            const tooltipImgHidden = document.createElement('button');
            tooltipImgHidden.classList.add('table_tooltip_toggle');

            const imgContHidden = document.createElement('img');
            const textTooltipHidden = document.createElement('span');
            textTooltipHidden.classList.add('table_tooltip_text');

            switch (clients.contacts[j].type) {
              case 'Телефон':
                icon = 'pictures/phone.png';
                break;
              case 'VK':
                icon = 'pictures/vk.png';
                break;
              case 'Facebook':
                icon = 'pictures/fb.png';
                break;
              case 'Email':
                icon = 'pictures/mail.png';
                break;
              case 'Другое':
                icon = 'pictures/human.png';
                break;
            }
            imgContHidden.src = icon;
            textTooltipHidden.textContent = clients.contacts[j].type + ": " + clients.contacts[j].value;
            tooltipImgHidden.append(imgContHidden);
            hiddenContacts.append(tooltipImgHidden);
            hiddenContacts.append(textTooltipHidden);
          }
          if (!spanCont.contains(hiddenContacts)) {
            spanCont.append(hiddenContacts);
          }
        } else {
          spanCont.removeChild(hiddenContacts);
        }
      });
    }
  }
  return spanCont;
}

function getDataContact() {
  const contactInputGet = document.querySelectorAll('.modal_type_input');
  const contactLabel = document.querySelectorAll('.modal_choice_type');
  let contacts = [];
  contactLabel.forEach((elem, index) => {
    contacts.push({
      type: elem.options[elem.selectedIndex].text,
      value: contactInputGet[index].value
    });
  });
  return contacts;
}

export { getDataContact, contactsImage, addContact, createOption };


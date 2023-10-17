import apiClient from "../services/apiClient";

const modal = (() => {

  const populateModal = ({name, type, mass_kg}) => {
    let markup = `
      <dl>
    `

    if(name) {
      markup += `
      <dt>Name:</dt>
      <dd>${name}</dd>
      `;
    }

    if(type) {
      markup += `
      <dt>Type:</dt>
      <dd>${type}</dd>
      `
    }

    if(mass_kg) {
      markup += `
      <dt>Mass (kgs)</dt>
      <dd>${mass_kg}</dd>
      `
    }

    markup += '</dl>';
    return markup
  }

  const fetchData = async (id) => {
    try {
      const data = await apiClient.get(`/payloads/${id}`);
      return populateModal(data.data);

    } catch (err) {
      console.error(`error: ${err}`)
    }
  };
  
  const closeModal = (evt) => {
    evt.preventDefault();
    modalElement.close();
    modalElement.removeEventListener('click', closeModal);
  };
  
  const openModal = async (evt) => {
    evt.preventDefault();
    modalElement.innerHTML = await fetchData(evt.target.dataset.id);
    modalElement.showModal();
  };
  
  let modalElement = document.querySelector('dialog');
  modalElement.addEventListener('click', closeModal);

  return {
    openModal
  }
})();

export default modal;
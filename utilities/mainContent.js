import apiClient from "../services/apiClient";
import buildDetalsElements from "./buildDetalsElements";
import modal from "./modal";

const spacex = (() => {
  const init = async () => {
    try {
      const launches = await apiClient.post('/launches/query', {
        "query": {},
        "options": {},
      });
      const elem = document.querySelector('main');
      elem.appendChild(buildDetalsElements(launches));
      const btns = document.querySelectorAll('details button');
  
      if(btns.length) {
        btns.forEach(btn => {
          btn.addEventListener('click', modal.openModal);
        })
      }
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  return {
    init
  }
})();

export default spacex;

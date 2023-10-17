const buildDetails = ({date_utc, name, success, links, details, payloads}) => {
  let date = null;
  if(date_utc) {
    date = new Date(date_utc).toLocaleString('en-GB', { timeZone: 'UTC' });
  }
  const {webcast, article, patch} = links;
  let markup = `
    <summary>${name}</summary>
    <img src="${patch.small}" alt="${name}'s mission patch" />
    <dl>`;

  if (date) {
    markup += `<dt>Date (UTC):</dt>
    <dd>${date}</dd>`
  }

  if(success) {
    markup += `
    <dt>Outcome:</dt>
    <dd>${success ? 'Success' : 'Failure'}</dd>
    `;
  }

  if(webcast) {
    markup += `
    <dt>Watch:</dt>
    <dd><a href="${webcast}" target="_blank" rel="noopener norefferer">Webcast</a></dd>
    `;
  }

  if(article) {
    markup += `
    <dt>Read:</dt>
    <dd><a href="${article}" target="_blank" rel="noopener norefferer">Article</a></dd>
    `;
  }

  markup += `</dl>`;

  if(details) {
    markup += `<p>${details}</p>`;
  }

  if(payloads && payloads[0]) {
    markup += `<button type=""button" data-id="${payloads[0]}">Payloads</button>`;
  }

  return markup
};

const buildDetalsElements = (payload) => {
  // Create list
  const data = payload.data.docs;
  const docFrag = document.createDocumentFragment();
  const section = document.createElement('section');

  // Loop through data
  data.forEach(item => {
    const details = document.createElement('details');
    details.innerHTML = buildDetails(item);
    details.classList.add(item.success ? 'success' : 'failure');
    section.appendChild(details);
  });
  docFrag.appendChild(section);
  return docFrag;
};

export default buildDetalsElements;
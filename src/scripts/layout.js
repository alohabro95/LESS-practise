export async function loadLayout() {
  loadHeader("header-placeholder", "/src/layout/header.html");
  loadFooter("footer-placeholder", "/src/layout/footer.html");
}

async function loadHeader(headerPlaceHolder, headerUrl) {
  const template = await fetchTemplate(headerUrl);
  if (template) {
    attachTemplate(headerPlaceHolder, template);
  }
}

async function loadFooter(footerPlaceHolder, footerUrl) {
  const template = await fetchTemplate(footerUrl);
  if (template) {
    attachTemplate(footerPlaceHolder, template);
  }
}

async function fetchTemplate(url) {
  return fetch(url)
    .then((response) => response.text())
    .catch((error) => console.error(`Error loading template: ${url}`, error));
}

function attachTemplate(placeHolder, template) {
  document.getElementById(placeHolder).innerHTML = template;
}

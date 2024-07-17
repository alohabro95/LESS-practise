export function loadLayout() {
  loadHeader("header-placeholder", "layout/header.html");
  loadFooter("footer-placeholder", "layout/footer.html");
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

function createStyles() {
  const styles = tempDiv.querySelectorAll('link[rel="stylesheet"]');
  styles.forEach((style) => document.head.appendChild(style));
}

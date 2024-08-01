export function scrollTo(elementId) {
  let scrollElement = document.getElementById(elementId);
  scrollElement.scrollIntoView({ block: "center", behavior: "smooth" });
}

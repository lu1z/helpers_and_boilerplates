/**
 * @param  {Event} event
 * @return {Object}
 */
export function fetchDataFromForm(event) {
  event.preventDefault();
  return Object.fromEntries(new FormData(event.target));
}

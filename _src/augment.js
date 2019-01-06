/*
 * Very rough way to get the server's time
 *
 * Basically:
 * - Make a XHR request to the current server
 * - Get the `Date` response header
 * - Use that value to create a new Date Object and get the full year
 * - After the page is loaded set that to the element's id
 */
window.onload = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('HEAD', window.location.href.toString(), true);
  xhr.setRequestHeader('Content-Type', 'text/html');
  xhr.onload = () => {
    const currentYearElement = document.getElementById('year');
    currentYearElement.innerHTML = new Date(
      xhr.getResponseHeader('Date'),
    ).getFullYear();
  };
  xhr.send(null);
};

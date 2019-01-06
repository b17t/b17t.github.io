/*
 * Event listener hooken onto the Mailchimp Input
 *
 * If it has content (value !== null) then show the submit button,
 * otherwise hide it
 */
const toggleMailchimpButton = () => {
  const mailchimpInput = document.getElementById('mailchimpInput');
  const mailchimpSubmitWrapper = document.getElementById(
    'mailchimpSumitButton',
  );
  mailchimpSubmitWrapper.style.display = mailchimpInput.value
    ? 'block'
    : 'none';
};

window.onload = () => {
  /*
   * Very rough way to get the server's time
   *
   * Basically:
   * - Make a XHR request to the current server
   * - Get the `Date` response header
   * - Use that value to create a new Date Object and get the full year
   * - After the page is loaded set that to the element's id
   */
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

  /*
   * Add a new event listener on the Mailchimp input
   */
  document
    .getElementById('mailchimpInput')
    .addEventListener('input', toggleMailchimpButton);
};

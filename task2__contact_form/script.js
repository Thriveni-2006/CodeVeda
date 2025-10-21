const form = document.getElementById('contactForm');
const responseMsg = document.getElementById('responseMsg');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name === '' || email === '' || message === '') {
    showMessage('Please fill in all the fields.', 'error');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showMessage('Please enter a valid email address.', 'error');
    return;
  }

  showMessage('Your message has been sent successfully ✅', 'success');
  form.reset();
});

function showMessage(message, type) {
  responseMsg.textContent = message;
  responseMsg.style.color = type === 'error' ? '#dc2626' : '#16a34a';
}

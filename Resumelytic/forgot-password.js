document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('forgotForm');
  const button = form.querySelector('.send-btn');
  const btnText = button.querySelector('.btn-text');
  const originalText = btnText.textContent;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!username || !email) {
      alert('Please fill in both fields.');
      return;
    }

    btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    button.disabled = true;

    setTimeout(() => {
      alert(`A reset link will be sent to ${email} (if associated with ${username}).`);
      form.reset();
      btnText.textContent = originalText;
      button.disabled = false;
    }, 1500);
  });
});

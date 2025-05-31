document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signupForm');
  const passwordInputs = document.querySelectorAll('.password-input');
  const togglePasswordBtns = document.querySelectorAll('.toggle-password');
  const submitBtn = document.querySelector('.submit-btn');
  const btnText = document.querySelector('.btn-text');
  const spinner = document.querySelector('.spinner');

  togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const input = this.parentElement.querySelector('.password-input');
      const icon = this.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
        this.setAttribute('aria-label', 'Hide password');
      } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
        this.setAttribute('aria-label', 'Show password');
      }
    });
  });

  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    btnText.textContent = 'Creating Account...';
    spinner.classList.remove('hidden');
    submitBtn.disabled = true;

    const formData = new FormData(signupForm);

    fetch('signup.php', {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(result => {
        btnText.textContent = 'Create Account';
        spinner.classList.add('hidden');
        submitBtn.disabled = false;

        document.querySelectorAll('.success-message, .error-message').forEach(el => el.remove());

        if (result.trim() === 'success') {
          const successMessage = document.createElement('p');
          successMessage.classList.add('success-message');
          successMessage.textContent = 'Account created successfully! Redirecting...';
          signupForm.appendChild(successMessage);
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 2000);
        } else {
          const errorMsg = document.createElement('p');
          errorMsg.classList.add('error-message');
          errorMsg.textContent = result;
          signupForm.appendChild(errorMsg);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
        btnText.textContent = 'Create Account';
        spinner.classList.add('hidden');
        submitBtn.disabled = false;
      });
  });

  function validateForm() {
    let isValid = true;
    const email = signupForm.querySelector('input[type="email"]');
    const password = signupForm.querySelectorAll('.password-input')[0];
    const confirmPassword = signupForm.querySelectorAll('.password-input')[1];

    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('input').forEach(input => input.classList.remove('error'));

    if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, 'Please enter a valid email address');
      isValid = false;
    }

    if (password.value.length < 8) {
      showError(password, 'Password must be at least 8 characters');
      isValid = false;
    }

    if (password.value !== confirmPassword.value) {
      showError(confirmPassword, 'Passwords do not match');
      isValid = false;
    }

    const terms = signupForm.querySelector('#terms');
    if (!terms.checked) {
      const label = signupForm.querySelector('.terms label');
      label.style.color = 'var(--error-color)';
      isValid = false;
    } else {
      signupForm.querySelector('.terms label').style.color = '';
    }

    return isValid;
  }

  function showError(input, message) {
    input.classList.add('error');
    input.focus();
    const errorMsg = document.createElement('p');
    errorMsg.className = 'error-message';
    errorMsg.textContent = message;
    input.parentNode.insertBefore(errorMsg, input.nextSibling);
  }
});

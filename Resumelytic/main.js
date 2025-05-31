document.addEventListener('DOMContentLoaded', function() {
  // Password visibility toggle
  document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
      const passwordInput = this.closest('.input-group').querySelector('input');
      const icon = this.querySelector('i');

      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
      }
    });
  });

  // Form dynamic behavior
  const loginForm = document.getElementById('loginForm');
  const submitBtn = loginForm?.querySelector('.btn-signin');
  const originalText = submitBtn?.innerHTML;

  loginForm?.addEventListener('submit', function(e) {
    e.preventDefault();

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      console.log('Simulated login complete');
    }, 1500);
  });
})
.then(response => {
  console.log("Server response:", response); // ← see this
  if (response.trim() === "success") {
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } else {
    alert("Login failed: " + response);
  }
});

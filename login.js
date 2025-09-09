document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const authKeyInput = document.getElementById('authKey');
  const resultDisplay = document.getElementById('result');
  const loginButton = loginForm.querySelector('button[type="submit"]');

  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    resultDisplay.textContent = '';
    resultDisplay.style.color = '#333';
    loginButton.disabled = true;
    loginButton.textContent = 'Logging in...';

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const authKey = authKeyInput.value.trim();

    if (!username || !password || !authKey) {
      resultDisplay.textContent = 'Please enter username, password, and authentication key.';
      resultDisplay.style.color = 'red';
      loginButton.disabled = false;
      loginButton.textContent = 'Login';
      return;
    }

    try {
      const body = { username, password, authKey };
      const response = await fetch('https://prelim-exam.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await response.json();

      if (response.ok && data.code && data.id) {
        localStorage.setItem('itmc_code', data.code);
        localStorage.setItem('itmc_id', data.id);
        
        resultDisplay.textContent = 'Login successful!';
        resultDisplay.style.color = 'green';
        
        setTimeout(() => {
          window.location.href = 'edit_username.html';
        }, 1500);

      } else {
        let errorMsg = data.message || 'Login failed. Please check your credentials.';
        resultDisplay.textContent = errorMsg;
        resultDisplay.style.color = 'red';
      }
    } catch (err) {
      console.error('Login error:', err);
      resultDisplay.textContent = 'Network or server error. Please try again later.';
      resultDisplay.style.color = 'red';
    } finally {
      loginButton.disabled = false;
      loginButton.textContent = 'Login';
    }
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signupForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const ageInput = document.getElementById('age');
  const resultDisplay = document.getElementById('result');
  const signupButton = signupForm.querySelector('button[type="submit"]');

  signupForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    resultDisplay.textContent = '';
    resultDisplay.style.color = '#333';
    signupButton.disabled = true;
    signupButton.textContent = 'Signing up...';

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const age = parseInt(ageInput.value.trim(), 10);

    if (!username || !password || isNaN(age)) {
      resultDisplay.textContent = 'Please enter a valid username, password, and age.';
      resultDisplay.style.color = 'red';
      signupButton.disabled = false;
      signupButton.textContent = 'Sign Up';
      return;
    }

    try {
      const response = await fetch('https://prelim-exam.onrender.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          age: Number(age)
        })
      });
      const data = await response.json();

      if (response.ok && data.answer) {
        resultDisplay.textContent = `ITMC${data.answer}`;
        resultDisplay.style.color = 'green';

        setTimeout(() => {
          window.location.href = 'login.html';
        }, 5000);
        
      } else {
        let errorMsg = data.message || 'Signup failed. Please try again.';
        resultDisplay.textContent = errorMsg;
        resultDisplay.style.color = 'red';
      }
    } catch (err) {
      console.error('Signup error:', err);
      resultDisplay.textContent = 'Network or server error. Please try again later.';
      resultDisplay.style.color = 'red';
    } finally {
      signupButton.disabled = false;
      signupButton.textContent = 'Sign Up';
    }
  });
});
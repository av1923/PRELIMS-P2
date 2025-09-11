class LoginManager {
  constructor() {
    this.form = document.getElementById('loginForm');
    this.usernameInput = document.getElementById('username');
    this.passwordInput = document.getElementById('password');
    this.authKeyInput = document.getElementById('authKey');
    this.resultDisplay = document.getElementById('result');
    this.loginButton = this.form.querySelector('button[type="submit"]');
    this.baseUrl = 'https://prelim-exam.onrender.com/login';
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.clearResult();
    this.disableButton('Logging in...');

    const username = this.usernameInput.value.trim();
    const password = this.passwordInput.value.trim();
    const authKey = this.authKeyInput.value.trim();

    if (!this.validateInputs(username, password, authKey)) {
      this.enableButton('Login');
      return;
    }

    try {
      const response = await this.makeApiCall(username, password, authKey);
      this.processResponse(response);
    } catch (error) {
      this.displayError('Network or server error. Please try again later.');
    } finally {
      this.enableButton('Login');
    }
  }

  validateInputs(username, password, authKey) {
    if (!username || !password || !authKey) {
      this.displayError('Please enter username, password, and authentication key.');
      return false;
    }
    return true;
  }

  async makeApiCall(username, password, authKey) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, authKey })
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Login failed. Please check your credentials.');
    }
    return response.json();
  }

  processResponse(data) {
    if (data.code && data.id) {
      localStorage.setItem('itmc_code', data.code);
      localStorage.setItem('itmc_id', data.id);
      this.resultDisplay.textContent = 'Login successful!';
      this.resultDisplay.style.color = 'green';
      this.scheduleRedirect();
    } else {
      this.displayError(data.message || 'Login failed. Please check your credentials.');
    }
  }

  scheduleRedirect() {
    setTimeout(() => {
      window.location.href = 'edit_username.html';
    }, 1500);
  }

  clearResult() {
    this.resultDisplay.textContent = '';
    this.resultDisplay.style.color = '#333';
  }

  disableButton(text) {
    this.loginButton.disabled = true;
    this.loginButton.textContent = text;
  }

  enableButton(text) {
    this.loginButton.disabled = false;
    this.loginButton.textContent = text;
  }

  displayError(message) {
    this.resultDisplay.textContent = message;
    this.resultDisplay.style.color = 'red';
  }
}

document.addEventListener('DOMContentLoaded', () => new LoginManager());

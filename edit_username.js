class UserEditor {
  constructor() {
    this.form = document.getElementById('editUserForm');
    this.userIdInput = document.getElementById('userId');
    this.authKeyInput = document.getElementById('authKey');
    this.newUsernameInput = document.getElementById('newUsername');
    this.resultDisplay = document.getElementById('result');
    this.baseUrl = 'https://prelim-exam.onrender.com/users';
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

    const userId = this.userIdInput.value.trim();
    const authKey = this.authKeyInput.value.trim();
    const newUsername = this.newUsernameInput.value.trim();

    if (!this.validateInputs(userId, authKey, newUsername)) {
      return;
    }

    try {
      const response = await this.makeApiCall(userId, authKey, newUsername);
      this.processResponse(response);
    } catch (error) {
      this.displayError('Network or server error.');
    }
  }

  validateInputs(userId, authKey, newUsername) {
    if (!userId || !authKey || !newUsername) {
      this.displayError('Please enter user ID, 6-character code, and new username.');
      return false;
    }
    return true;
  }

  async makeApiCall(userId, authKey, newUsername) {
    const response = await fetch(`${this.baseUrl}/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: newUsername, authKey: authKey })
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Update failed.');
    }
    return response.json();
  }

  processResponse(data) {
    if (data.message) {
      this.resultDisplay.textContent = data.message;
      this.resultDisplay.style.color = data.message.indexOf('Wow! Congrats! You successfully edited your username!') === 0 ? 'green' : 'red';

      if (data.message.indexOf('Wow! Congrats! You successfully edited your username!') === 0) {
        this.scheduleRedirect();
      }
    } else {
      this.displayError('Update failed.');
    }
  }

  scheduleRedirect() {
    setTimeout(() => {
      window.location.href = 'add_a_pet.html';
    }, 5000);
  }

  clearResult() {
    this.resultDisplay.textContent = '';
    this.resultDisplay.style.color = '#333';
  }

  displayError(message) {
    this.resultDisplay.textContent = message;
    this.resultDisplay.style.color = 'red';
  }
}

document.addEventListener('DOMContentLoaded', () => new UserEditor());

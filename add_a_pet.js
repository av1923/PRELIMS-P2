class PetManager {
  constructor() {
    this.form = document.getElementById('addPetForm');
    this.result = document.getElementById('petResult');
    this.baseUrl = 'https://prelim-exam.onrender.com/pets/new';
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

    const ownerId = document.getElementById('ownerId').value.trim();
    const petName = document.getElementById('petName').value.trim();
    const petType = document.getElementById('petType').value.trim();
    const credentials = this.getCredentials();

    if (!this.validateInputs(ownerId, petName, petType)) {
      return;
    }

    try {
      const response = await this.makeApiCall(ownerId, petName, petType, credentials);
      this.processResponse(response);
    } catch (error) {
      this.displayError('Network or server error.');
    }
  }

  getCredentials() {
    return {
      username: localStorage.getItem('itmc_username') || '',
      password: localStorage.getItem('itmc_password') || '',
      age: localStorage.getItem('itmc_age') || '',
      authKey: localStorage.getItem('itmc_code') || ''
    };
  }

  validateInputs(ownerId, petName, petType) {
    if (!ownerId || !petName || !petType) {
      this.displayError('Please enter owner ID, pet name, and type.');
      return false;
    }
    return true;
  }

  async makeApiCall(ownerId, petName, petType, credentials) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ownerId,
        name: petName,
        type: petType,
        ...credentials
      })
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to add pet.');
    }
    return response.json();
  }

  processResponse(data) {
    const message = `ITMC{6. ${data.name}} To view your pet, go to an endpoint users/YOUR PRIMARY KEY/pets. Also SAVE your pet_id.`;
    this.result.textContent = data.petId ? `${message}\n\nPet ID: ${data.petId}` : message;
    this.result.className = 'pet-success';
  }

  clearResult() {
    this.result.textContent = '';
    this.result.className = '';
  }

  displayError(message) {
    this.result.textContent = message;
    this.result.style.color = 'red';
  }
}

document.addEventListener('DOMContentLoaded', () => new PetManager());

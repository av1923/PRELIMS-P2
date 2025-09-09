document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('addPetForm');
  const result = document.getElementById('petResult');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const ownerId = document.getElementById('ownerId').value.trim();
    const petName = document.getElementById('petName').value.trim();
    const petType = document.getElementById('petType').value.trim();
    const username = localStorage.getItem('itmc_username') || '';
    const password = localStorage.getItem('itmc_password') || '';
    const age = localStorage.getItem('itmc_age') || '';
    const authKey = localStorage.getItem('itmc_code') || '';
    result.textContent = '';
    result.className = '';

    if (!ownerId || !petName || !petType) {
      result.textContent = 'Please enter owner ID, pet name, and type.';
      result.style.color = 'red';
      return;
    }

    try {
      const response = await fetch('https://prelim-exam.onrender.com/pets/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ownerId,
          name: petName,
          type: petType,
          username,
          password,
          age,
          authKey
        })
      });
      const data = await response.json();
      if (response.ok) {
        result.textContent = `ITMC{6. ${petName}} To view your pet, go to an endpoint users/YOUR PRIMARY KEY/pets. Also SAVE your pet_id.`;
        if (data.petId) {
          result.textContent += `\n\nPet ID: ${data.petId}`;
        }
        result.className = 'pet-success';
      } else {
        result.textContent = data.message || 'Failed to add pet.';
        result.style.color = 'red';
      }
    } catch (err) {
      result.textContent = 'Network or server error.';
      result.style.color = 'red';
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('allPetsForm');
  const btn = document.getElementById('fetchAllPets');
  const result = document.getElementById('allPetsResult');
  const userIdInput = document.getElementById('userId');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    result.innerHTML = '';
    const userId = userIdInput ? userIdInput.value.trim() : '';
    if (!userId) {
      result.textContent = 'Please enter your User ID.';
      result.style.color = 'red';
      return;
    }
    try {
      const response = await fetch('https://prelim-exam.onrender.com/pets?userId=' + encodeURIComponent(userId));
      const data = await response.json();
      if (response.ok && Array.isArray(data.pets)) {
        data.pets.forEach(pet => {
          result.innerHTML += `<div class="pet-item">
            <strong>Pet ID:</strong> ${pet._id || ''}<br>
            <strong>Owner:</strong> ${pet.owner || ''}<br>
            <strong>Name:</strong> ${pet.name || ''}<br>
            <strong>Type:</strong> ${pet.type || ''}<br>
            <strong>Raw JSON:</strong> <pre>${JSON.stringify(pet, null, 2)}</pre>
          </div>`;
        });
      } else {
        result.textContent = data.message || 'Failed to fetch all pets.';
        result.style.color = 'red';
        setTimeout(function() {
          if(result.textContent && (result.textContent.includes('not authorized') || result.textContent.startsWith('ITMC{8. Uh oh}'))) {
            window.location.href = 'user_retreive.html';
          }
        }, 5000);
      }
    } catch (err) {
      result.textContent = 'Network or server error.';
      result.style.color = 'red';
    }
  });
});

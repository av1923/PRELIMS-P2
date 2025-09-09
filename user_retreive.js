document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('retrieveUserForm');
  const result = document.getElementById('userResult');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const userId = document.getElementById('userId').value.trim();
    result.innerHTML = '';
    if (!userId) {
      result.textContent = 'Please enter your User ID.';
      result.style.color = 'red';
      return;
    }
    try {
      const response = await fetch(`https://prelim-exam.onrender.com/users/${userId}`);
      const data = await response.json();
      if (response.ok && data) {
        result.innerHTML += `<div class='user-json'><pre>${JSON.stringify(data, null, 2)}</pre></div>`;
      } else {
        result.textContent = data.message || 'Failed to retrieve user data.';
        result.style.color = 'red';
      }
    } catch (err) {
      result.textContent = 'Network or server error.';
      result.style.color = 'red';
    }
  });
});

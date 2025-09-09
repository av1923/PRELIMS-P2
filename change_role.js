document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('patchRoleForm');
  const result = document.getElementById('roleResult');

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
      const response = await fetch(`https://prelim-exam.onrender.com/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'admin' })
      });
      const data = await response.json();
      if (response.ok && data) {
        result.innerHTML = `<div class='role-success'>Role successfully patched to admin!</div>`;
        result.innerHTML += `<div class='role-json'><pre>${JSON.stringify(data, null, 2)}</pre></div>`;
      } else {
        result.textContent = data.message || 'Failed to patch role.';
        result.style.color = 'red';
      }
    } catch (err) {
      result.textContent = 'Network or server error.';
      result.style.color = 'red';
    }
  });
});

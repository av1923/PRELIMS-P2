document.addEventListener('DOMContentLoaded', function () {
    const editUserForm = document.getElementById('editUserForm');
    const userIdInput = document.getElementById('userId');
    const authKeyInput = document.getElementById('authKey');
    const newUsernameInput = document.getElementById('newUsername');
    const resultDisplay = document.getElementById('result');

    editUserForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        resultDisplay.textContent = '';
        resultDisplay.style.color = '#333';

        const userId = userIdInput.value.trim();
        const authKey = authKeyInput.value.trim();
        const newUsername = newUsernameInput.value.trim();

        if (!userId || !authKey || !newUsername) {
            resultDisplay.textContent = 'Please enter user ID, 6-character code, and new username.';
            resultDisplay.style.color = 'red';
            return;
        }

        try {
            const response = await fetch(`https://prelim-exam.onrender.com/users/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: newUsername, authKey: authKey })
            });
            const data = await response.json();

            if (response.ok && data.message) {
                resultDisplay.textContent = data.message;
                resultDisplay.style.color = 'green';

                if (data.message.indexOf('Wow! Congrats! You successfully edited your username!') === 0) {
                    setTimeout(() => {
                        window.location.href = 'add_a_pet.html';
                    }, 5000); 
                }

            } else if (data.message) {
                resultDisplay.textContent = data.message;
                resultDisplay.style.color = 'red';
            } else {
                resultDisplay.textContent = 'Update failed.';
                resultDisplay.style.color = 'red';
            }
        } catch (err) {
            console.error('Update error:', err);
            resultDisplay.textContent = 'Network or server error.';
            resultDisplay.style.color = 'red';
        }
    });
});
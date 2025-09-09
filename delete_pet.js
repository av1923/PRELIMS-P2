document.addEventListener('DOMContentLoaded', function () {
    const deletePetForm = document.getElementById('deletePetForm');
    const resultMsg = document.getElementById('petResult');
    const petIdInput = document.getElementById('petId');

    if (deletePetForm) {
        deletePetForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            resultMsg.textContent = '';
            const petId = petIdInput.value;
            if (!petId) {
                resultMsg.textContent = 'Please enter a Pet ID.';
                resultMsg.className = 'pet-error';
                return;
            }

            const url = `https://prelim-exam.onrender.com/pets/${petId}`;

            try {
                const response = await fetch(url, {
                    method: 'DELETE',
                });

                const result = await response.json();

                if (response.ok) {
                    resultMsg.textContent = 'ITMC{12. Pet_successfully_deleted}.';
                    resultMsg.className = 'pet-success';
                    setTimeout(() => {
                        window.location.href = 'logout.html';
                    }, 2000);
                } else {
                    resultMsg.textContent = result.message || 'Failed to delete pet. The pet might not exist.';
                    resultMsg.className = 'pet-error';
                }
            } catch (err) {
                resultMsg.textContent = 'Network or server error. Please try again later.';
                resultMsg.className = 'pet-error';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const fetchBtn = document.getElementById('fetchCount');
    const goToDeleteBtn = document.getElementById('goToDeletePage');
    const result = document.getElementById('countResult');

    fetchBtn.addEventListener('click', async function () {
        result.innerHTML = '';
        try {
            const response = await fetch('https://prelim-exam.onrender.com/stats/pets/count');
            const data = await response.json();
            if (response.ok && typeof data.count === 'number') {
                result.innerHTML = `<div class='count-success'>ITMC{10. All_pets_listed_successfully}. You changed the role???? What are you??? Okay you're good! Now retrieve how many pets are there in stats/pets/count endpoint</div>`;
                result.innerHTML += `<div class='count-json'><pre>${JSON.stringify(data, null, 2)}</pre></div>`;
            } else {
                result.textContent = data.message || 'Failed to fetch pets count.';
                result.style.color = 'red';
            }
        } catch (err) {
            result.textContent = 'Network or server error.';
            result.style.color = 'red';
        }
    });

    goToDeleteBtn.addEventListener('click', function() {
        window.location.href = 'delete_pet.html';
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const logoutBtn = document.getElementById('logoutButton');
    const logoutMessage = document.getElementById('logoutMessage');

    logoutBtn.addEventListener('click', function() {
        logoutMessage.textContent = 'ITMC{15. HKN4LH_logged_out_successfully} Congratulations, you completed the exam!'
    });
});
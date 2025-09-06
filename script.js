document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Management ---
    const themeToggleButton = document.getElementById('theme-toggle');
    
    // Function to apply theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    };

    // Apply saved theme on initial load
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Toggle theme on button click
    themeToggleButton.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- Footer Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- User Goal Management ---
    const userGoal = document.getElementById('user-goal');

    if (userGoal) {
        // Load saved goal from localStorage
        const savedGoal = localStorage.getItem('userGoalText');
        if (savedGoal) {
            userGoal.innerText = savedGoal;
        }

        // Save goal to localStorage on input
        userGoal.addEventListener('input', () => {
            localStorage.setItem('userGoalText', userGoal.innerText);
        });
    }
});


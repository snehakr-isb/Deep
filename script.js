document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Management ---
    const themeToggleButton = document.getElementById('theme-toggle');
    
    // Google Sign-In Implementation
    function onSignIn(googleUser) {
        const profile = googleUser.getBasicProfile();
        
        // Store user info
        const userData = {
            id: profile.getId(),
            name: profile.getName(),
            email: profile.getEmail(),
            imageUrl: profile.getImageUrl()
        };

        // Save to localStorage (optional)
        localStorage.setItem('userProfile', JSON.stringify(userData));

        // Update UI to show logged-in state
        updateUIForSignedInUser(userData);
    }

    // Helper function to update UI
    function updateUIForSignedInUser(userData) {
        // Add this HTML to your index.html where you want to show user info
        const userInfoDiv = document.createElement('div');
        userInfoDiv.classList.add('user-info');
        userInfoDiv.innerHTML = `
            <img src="${userData.imageUrl}" alt="Profile picture">
            <p>Welcome, ${userData.name}!</p>
        `;

        // Insert the user info div after the sign-in button
        const signInButton = document.querySelector('.g-signin2');
        signInButton.style.display = 'none';
        signInButton.parentNode.insertBefore(userInfoDiv, signInButton.nextSibling);
    }

    // Add sign out functionality
    function signOut() {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            localStorage.removeItem('userProfile');
            location.reload();
        });
    }

    // Make onSignIn global so Google API can access it
    window.onSignIn = onSignIn;
    window.signOut = signOut;

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


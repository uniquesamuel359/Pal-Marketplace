document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PERSONIFIED GREETING ---
    // Pulls the name saved during login to say "Hello Samuel 👋"
    const userNameDisplay = document.getElementById('userNameDisplay');
    const activeUser = localStorage.getItem('activeUser') || "Student";
    if (userNameDisplay) {
        userNameDisplay.textContent = `${activeUser} 👋`;
    }

    // --- 2. DYNAMIC EXAM COUNTDOWN ---
    // Calculates days remaining based on a date saved in settings
    function updateCountdown() {
        const countdownElement = document.getElementById('examCountdown');
        if (!countdownElement) return;

        // Default to a future date if none is set in settings
        const savedDate = localStorage.getItem('examDate') || '2027-05-15';
        const targetDate = new Date(savedDate); 
        const today = new Date();
        
        const difference = targetDate - today;
        const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
        
        countdownElement.textContent = daysLeft > 0 ? `${daysLeft} DAYS TO EXAM` : "EXAM DAY!";
    }
    updateCountdown();

    // --- 3. LOGIN STREAK CALCULATOR ---
    // Tracks if the student is studying daily
    function handleStreak() {
        const streakText = document.querySelector('.streak-badge h2');
        if (!streakText) return;

        const lastLogin = localStorage.getItem('lastLoginDate');
        let streak = parseInt(localStorage.getItem('userStreak')) || 0;
        const today = new Date().toDateString();
        
        // Calculate yesterday's date string
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (lastLogin === yesterdayStr) {
            streak++; // Increment if they logged in yesterday
        } else if (lastLogin !== today) {
            streak = 1; // Reset to 1 if they missed a day
        }

        localStorage.setItem('userStreak', streak);
        localStorage.setItem('lastLoginDate', today);
        streakText.textContent = `${streak} days`;
    }
    handleStreak();

    // --- 4. SIDEBAR & NAVIGATION LOGIC ---
    const menuIcon = document.querySelector('.menu-icon');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const navUserName = document.getElementById('navUserName');
    const logoutBtn = document.getElementById('logoutBtn');

    // Sync the name in the sidebar profile area
    if (navUserName) {
        navUserName.textContent = activeUser;
    }

    // Open Sidebar
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });
    }

    // Close Sidebar (clicking the dark overlay)
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Logout Functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if(confirm("Are you sure you want to log out of PAL?")) {
                localStorage.removeItem('activeUser'); 
                window.location.href = 'index.html'; 
            }
        });
    }

    // --- 5. WIDGET BUTTON LISTENERS ---
    // Deep Research
    const btnResearch = document.getElementById('widget-research');
    if (btnResearch) {
        btnResearch.addEventListener('click', () => {
            alert(`PAL is ready to teach you finely, ${activeUser}! Starting Deep Research...`);
        });
    }

    // CBT Mode
    const btnCBT = document.getElementById('widget-cbt');
    if (btnCBT) {
        btnCBT.addEventListener('click', () => {
            alert("Launching C.B.T Mode. Select WAEC or JAMB to begin.");
        });
    }

    // Quick Summary
    const btnSummary = document.getElementById('widget-summary');
    if (btnSummary) {
        btnSummary.addEventListener('click', () => {
            alert("Upload your PDF or Image. PAL will summarize it for you.");
        });
    }

    // Membership / Pro Pass
    const btnPro = document.getElementById('widget-membership');
    if (btnPro) {
        btnPro.addEventListener('click', () => {
            alert("Redirecting to the PAL Pro Pass payment portal...");
        });
    }
});
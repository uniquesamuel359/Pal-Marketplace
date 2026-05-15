const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const wrapper = document.querySelector('.wrapper');

// 1. Manual Toggle Logic
signUpBtnLink.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.classList.add('active');
});

signInBtnLink.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.classList.remove('active');
});

// 2. Sign-Up Logic
const signUpForm = document.querySelector('.form-wrapper.sign-up form');
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = signUpForm.querySelector('input[type="text"]').value;
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = signUpForm.querySelector('input[type="password"]').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if username is already taken
    const isUsernameTaken = users.some(user => user.username === username);

    if (isUsernameTaken) {
        alert("Sorry, this username is already taken. Please choose another.");
    } else {
        // Save the new user
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert("Registration Successful! Welcome to the app.");
        // DIRECT REDIRECT
        window.location.href = 'home.html'; 
    }
});

// 3. Login Logic
const signInForm = document.querySelector('.form-wrapper.sign-in form');
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usernameInput = signInForm.querySelector('input[type="text"]').value;
    const passwordInput = signInForm.querySelector('input[type="password"]').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === usernameInput);

    if (user) {
        if (user.password === passwordInput) {
            // DIRECT REDIRECT
            window.location.href = 'home.html';
        } else {
            alert("Incorrect password. Please try again.");
        }
    } else {
        // AUTOMATIC SLIDE: If account doesn't exist
        alert("Account not found! Sign Up");
        wrapper.classList.add('active');
    }
});

localStorage.setItem('activeUser', user.username); // Saves "Samuel" for the home page
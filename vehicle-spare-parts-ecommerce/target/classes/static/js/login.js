// Login/Register Page Script
document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    setupLoginForm();
    setupRegisterForm();
});

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.auth-tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });
}

function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            
            if (loginError) loginError.textContent = '';
            
            try {
                const response = await userAPI.login({ username, password });
                Auth.setUser(response.user);
                alert('Login successful!');
                window.location.href = 'index.html';
            } catch (error) {
                if (loginError) {
                    loginError.textContent = error.message || 'Invalid credentials';
                }
            }
        });
    }
}

function setupRegisterForm() {
    const registerForm = document.getElementById('register-form');
    const registerError = document.getElementById('register-error');
    
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const userData = {
                username: document.getElementById('register-username').value,
                email: document.getElementById('register-email').value,
                password: document.getElementById('register-password').value,
                fullName: document.getElementById('register-fullname').value,
                phone: document.getElementById('register-phone').value
            };
            
            if (registerError) registerError.textContent = '';
            
            try {
                const user = await userAPI.register(userData);
                Auth.setUser(user);
                alert('Registration successful!');
                window.location.href = 'index.html';
            } catch (error) {
                if (registerError) {
                    registerError.textContent = error.message || 'Registration failed';
                }
            }
        });
    }
}


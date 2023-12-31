const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

let usersData = [];

function registerUser() {
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    if (usersData.some(user => user.email === email)) {
        alert('User with this email already exists. Please choose a different email.');
        return;
    }

    const newUser = { name, email, password };
    usersData.push(newUser);
    
    localStorage.setItem('usersData', JSON.stringify(usersData));

    alert('Registration successful!');
    clearForm();
}

function signIn() {
    const email = document.getElementById('loginEmailInput').value;
    const password = document.getElementById('loginPasswordInput').value;

    const user = usersData.find(user => user.email === email && user.password === password);

    if (user) {
        alert('Login successful! Redirecting to YouTube...');
        window.location.href = 'https://www.youtube.com';
    } else {
        alert('Account not registered or invalid email or password. Please try again.');
    }
    clearForm();
}

function clearForm() {
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('passwordInput').value = '';
}

// signup handler
const signupFormHandler = async (event) => {
    event.preventDefault(); // prevent reload
    const username = document.querySelector('#username').value.trim(); // username value
    const email = document.querySelector('#email').value.trim(); // email value
    const password = document.querySelector('#password').value.trim(); // password value
    if (username && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST', // POST username, email and  password
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/'); // load homepage if successful
        } else {
            alert('Error'); // error if unsuccessful
        }
    }
};

// event listener on signup button
const signupForm = document.querySelector('#signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', signupFormHandler);
}

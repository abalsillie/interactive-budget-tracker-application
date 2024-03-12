// login handler
const loginFormHandler = async (event) => {
    event.preventDefault(); // prevent reload
    const username = document.querySelector('#username-login').value.trim(); // username value
    const password = document.querySelector('#password-login').value.trim(); // password value
    if (username && password) { // if both values filled
      const response = await fetch('/api/users/login', {
        method: 'POST', // POST username and password data
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/'); // load homepage once login successful
      } else {
        alert('Error'); // error if unsuccessful
      }
    }
  };
  
  // login event listener
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', loginFormHandler);
  }
  
const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = $('#email-login').val().trim();
  const password = $('#password-login').val().trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      const data = await response.json();
      alert(data.message); // Show error message
    }
  }
};

$('.login-form').on('submit', loginFormHandler);

const registerFormHandler = async (event) => {
  event.preventDefault();

  const name = $('#name-signup').val().trim();
  const email = $('#email-signup').val().trim();
  const password = $('#password-signup').val().trim();

  if (name && email && password) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ username: name, email: email, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Display prompt
      alert('You have been registered successfully!');

      // Redirect user to the homepage or any other appropriate page
      document.location.replace('/');
    } else {
      const data = await response.json();
      alert(data.message); // Show error message
    }
  }
};

$('.signup-form').on('submit', registerFormHandler);

$('.signup-form').on('submit', registerFormHandler);
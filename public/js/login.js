
//login form handler posts to api/user/login
const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = $('#email-login').val().trim();
  const password = $('#password-login').val().trim();

  if (email && password) {
    const response = await fetch('/api/user/login', {
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

//click event for log in
$('.login-form').on('submit', loginFormHandler);


//register form handler posts to api/user
const registerFormHandler = async (event) => {
  event.preventDefault();

  const name = $('#name-register').val().trim();
  const email = $('#email-register').val().trim();
  const password = $('#password-register').val().trim();

  if (name && email && password) {
    try {
      const response = await fetch('/api/user/', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      // Display prompt
      alert('You have been registered successfully!');
      // Redirect user to the homepage or any other appropriate page
      document.location.replace('/homepage');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user. Please try again.');
    }
  }
};

//click event for register
$('#register-form').on('submit', registerFormHandler);



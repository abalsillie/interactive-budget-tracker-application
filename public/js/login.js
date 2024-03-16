
// login handler
const loginFormHandler = async (event) => {
  event.preventDefault();
  $('#loginMessage').remove();
  const email = $('#loginEmail').val().trim();
  const password = $('#loginPassword').val().trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      const data = await response.json();

      $('#loginForm').prepend($('<div>', {
        class: "alert alert-danger",
        id: "loginMessage",
        html: `<span>${data.message}</span>`
      }));
    }
  }
};
$('#loginForm').on('submit', loginFormHandler);

// registration handler
const registerFormHandler = async (event) => {
  event.preventDefault();
  $('#registerMessage').remove();
  const firstName = $('#registerFirstName').val().trim();
  const lastName = $('#registerLastName').val().trim();
  const email = $('#registerEmail').val().trim();
  const password = $('#registerPassword').val().trim();
  const confirmPassword = $('#registerConfirmPassword').val().trim();

  if (password !== confirmPassword) {
    $('#registerForm').prepend($('<div>', {
      class: "alert alert-danger",
      id: "registerMessage",
      html: "<span>Error!</span>"
    }));
    return;
  }

  if (!/.{8,}/.test(password)) {
    $('#registerForm').prepend($('<div>', {
      class: "alert alert-danger",
      id: "registerMessage",
      html: "<span>Error!</span>"
    }));
    return;
  }

  if (firstName && lastName && email && password) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      const data = await response.json();

      $('#registerForm').prepend($('<div>', {
        class: "alert alert-danger",
        id: "registerMessage",
        html: "<span>Error!</span>"
      }));
    }
  }
};
$('#registerForm').on('submit', registerFormHandler);

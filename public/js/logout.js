
//login form handler posts to api/user/login
const logoutHandler = async (event) => {
  event.preventDefault();

  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

    if (response.ok) {
      document.location.replace('/');
    } else {
      const data = await response.json();
      alert(data.message); // Show error message
    }
  }

//click event for log in
$('.login-form').on('submit', logoutHandler);
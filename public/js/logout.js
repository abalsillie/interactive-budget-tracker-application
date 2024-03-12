// log out function
const logOut = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/'); // load homepage once logout successful
    } else {
      alert('Error'); // error if unsuccessful
    }
  };
  
  // logout button event listener
  const logoutButton = document.querySelector('#logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', logOut);
  }
  
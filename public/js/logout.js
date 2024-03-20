const logoutHandler = async () => {
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
};

$("#logout").on("click", logout);
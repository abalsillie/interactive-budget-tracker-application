const newWeekFormHandler = async (event) => { // new goal handler
    event.preventDefault(); // prevent reload
    const id = document.querySelector('#id-new-week'); // id value
    const name = document.querySelector('#name-new-week'); // name value
       if (id && name) {
      const response = await fetch('/api/weeks', {
        method: 'POST', // POST request
        body: JSON.stringify({ id, name }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/dashboard'); // load dashboard if successful
      } else {
        alert('Error'); // error if unsuccessful
      }
    }
  };
  
  // event listener on goal submit button
  const newWeekForm = document.querySelector('.new-week-form');
  if (newWeekForm) {
    newWeekForm.addEventListener('submit', newWeekFormHandler);
  }
  
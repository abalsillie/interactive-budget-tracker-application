const newCategoryFormHandler = async (event) => { // new category handler
    event.preventDefault(); // prevent reload
    const name = document.querySelector('#name-new-category').value.trim(); // name value
    if (name) {
      const response = await fetch('/api/routesCategories', {
        method: 'POST', // POST request
        body: JSON.stringify({ name }), // don't need to json stringify?
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/dashboard'); // load dashboard if successful
      } else {
        alert('Error'); // error if unsuccessful
      }
    }
  };
  
  // event listener on category submit button
  const newCategoryForm = document.querySelector('.new-category-form');
  if (newCategoryForm) {
    newCategoryForm.addEventListener('submit', newCategoryFormHandler);
  }
  
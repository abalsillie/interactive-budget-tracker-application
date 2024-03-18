const newGoalFormHandler = async (event) => { // new goal handler
    event.preventDefault(); // prevent reload
    const title = document.querySelector('#title-new-spend'); // title value
    const amount = document.querySelector('#amount-new-spend'); // amount value
    const categories_id = document.querySelector('#category-id-new-spend'); // categories_id value
    const weeks_id = document.querySelector('#weeks-id-new-spend'); // weeks_id value
       if (title && amount && categories_id && weeks_id) {
      const response = await fetch('/api/routesSpends', {
        method: 'POST', // POST request
        body: JSON.stringify({ title, amount, categories_id, weeks_id }),
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
  const newSpendForm = document.querySelector('.new-spend-form');
  if (newSpendForm) {
    newSpendForm.addEventListener('submit', newSpendFormHandler);
  }

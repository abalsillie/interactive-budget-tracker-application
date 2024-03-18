const newGoalFormHandler = async (event) => { // new goal handler
    event.preventDefault(); // prevent reload
    const amount = document.querySelector('#amount-new-goal'); // amount value
    const categories_id = document.querySelector('#category-id-new-goal'); // categories_id value
       if (amount && categories_id) {
      const response = await fetch('/api/goals', {
        method: 'POST', // POST request
        body: JSON.stringify({ amount, categories_id }),
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
  const newGoalForm = document.querySelector('.new-goal-form');
  if (newGoalForm) {
    newGoalForm.addEventListener('submit', newGoalFormHandler);
  }
  
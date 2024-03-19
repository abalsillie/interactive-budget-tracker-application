const newSpendFormHandler = async (event) => { // new spend handler
    event.preventDefault(); // prevent reload
    const name = document.querySelector('#title-new-spend').value; // title value
    const amount = document.querySelector('#amount-new-spend').value; // amount value
    const categories_id = document.querySelector('#category-id-new-spend').value; // categories_id value
    const weeks_id = document.querySelector('#weeks-id-new-spend').value; // weeks_id value
       if (title && amount && categories_id && weeks_id) {
      const response = await fetch('/api/spends', {
        method: 'POST', // POST request
        body: JSON.stringify({ name, amount, categories_id, weeks_id }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/dashboard'); // load dashboard if successful
      } else {
        alert('Error'); // error if unsuccessful
      }
    }
  };
  
  // event listener on spend submit button
  const newSpendForm = document.querySelector('#new-spend-form');
  if (newSpendForm) {
    newSpendForm.addEventListener('click', newSpendFormHandler);
  }

  console.log("anything?")

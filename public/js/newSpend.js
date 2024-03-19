const newSpendFormHandler = async (event) => { // new goal handler
  event.preventDefault(); // prevent reload
  const name = document.querySelector('#name-new-spend'); // title value
  const amount = document.querySelector('#amount-new-spend'); // amount value
  const categories_id = document.querySelector('#category-id-new-spend'); // categories_id value
  const weeks_id = document.querySelector('#weeks-id-new-spend'); // weeks_id value
  
  if (name && amount ) {
    try {
      const response = await fetch('/api/spends', {
        method: 'POST', // POST request
        body: JSON.stringify({ name, amount, categories_id, weeks_id }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        const spendsData = await response.json();
        renderNewspending(spendsData);
        nameInput.value = '';
        amountInput.value = '';
      } else {
        alert('Error creating spend!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  } else {
    alert('Please enter a spend name.');
  }
};


const renderNewspending = (spendsData) => {
  const spendList = document.querySelector('.spends-list');
  const spendElement = document.createElement('div');
  spendElement.innerHTML = `<p>${spendsData.name}</p>`;
  spendList.appendChild(spendElement);
};

// Function to render categories
const renderSpends = async () => {
  try {
    const response = await fetch('/api/spends');
    if (!response.ok) {
      throw new Error('Failed to fetch spends.');
    }
    const spends = await response.json();
    const spendList = document.querySelector('.spends-list');
    spendList.innerHTML = ''; // Clear existing list
    spends.forEach(spend => {
      renderNewspending(spend);
    });
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while fetching spend. Please try again.');
  }
};


const newSpendForm = document.querySelector('.new-spend-form');
if (newSpendForm) {
  newSpendForm.addEventListener('submit', newSpendFormHandler);
}
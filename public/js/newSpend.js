const newSpendFormHandler = async (event) => {
  event.preventDefault();
  const nameInput = document.querySelector('#name-new-spend');
  const name = nameInput.value.trim();
  const amountInput = document.querySelector('#amount-new-spend');
  const amount = amountInput.value.trim();
  const categoriesInput = document.querySelector('#category-id-new-spend');
  const categories_id = categoriesInput.value.trim();
  const weeksInput = document.querySelector('#weeks-id-new-spend');
  const weeks = weeksInput.value.trim();

  if (name && amount) {
    try {
      const response = await fetch('/api/spends', {
        method: 'POST',
        body: JSON.stringify({ name, amount, categories_id, weeks }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        const spendData = await response.json();
        renderNewSpending(spendData);
        nameInput.value = '';
        amountInput.value = '';
        // Clear other input fields if needed
      } else {
        alert('Error creating spend!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  } else {
    alert('Please enter a spend name and amount.');
  }
};

const renderNewSpending = (spendData) => {
  const spendList = document.querySelector('.spends-list');
  const spendElement = document.createElement('div');
  spendElement.innerHTML = `<p>${spendData.name}, Amount: ${spendData.amount}, Category: ${spendData.categories_id}, Week: ${spendData.weeks}</p>`;
  spendList.appendChild(spendElement);
};

const renderSpends = async () => {
  try {
    const response = await fetch('/api/spends');
    if (!response.ok) {
      throw new Error('Failed to fetch spends.');
    }
    const spends = await response.json();
    const spendList = document.querySelector('.spends-list');
    spendList.innerHTML = '';
    spends.forEach(spend => {
      renderNewSpending(spend);
    });
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while fetching spend. Please try again.');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderSpends();

  const newSpendForm = document.querySelector('.new-spend-form');
  if (newSpendForm) {
    newSpendForm.addEventListener('submit', newSpendFormHandler);
  }
});
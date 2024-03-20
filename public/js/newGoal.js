const newGoalFormHandler = async (event) => { // new goal handler
  event.preventDefault(); // prevent reload
  const nameInput = document.querySelector('#name-new-goal');
  const name = nameInput.value.trim();
  const amountInput = document.querySelector('#amount-new-goal'); // amount value
  const amount = amountInput.value.trim();
  const categoriesInput = document.querySelector('#category-id-new-goal');
  const categories_id = categoriesInput.value.trim();// categories_id value
  if (amount && categories_id) {
    try {
      const response = await fetch('/api/goals', {
        method: 'POST', // POST request
        body: JSON.stringify({ amount, categories_id }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        const goalData = await response.json();
        newGoalFormHandler(goalData);
        nameInput.value = '';
        amountInput.value = '';
        categoriesInput.value= ''; // load dashboard if successful
      } else {
        alert('Error creating goals!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  } else {
    alert('Please enter a goal name.');
  }
};
const renderNewGoal = (goalData) => {
  const goalList = document.querySelector('.goals-list');
  const goalElement = document.createElement('div');
  goalElement.innerHTML = `<p>${goalData.name}</p>`;
  goalElement.innerHTML = `<p>${goalData.amount}</p>`;
  goalElement.innerHTML = `<p>${goalData.categories_id}</p>`;
  goalList.appendChild(goalElement);
};

const renderGoals = async () => {
  try {
    const response = await fetch('/api/goal');
    if (!response.ok) {
      throw new Error('Failed to fetch goal.');
    }
    const goals = await response.json();
    const goalList = document.querySelector('.goals-list');
    goalList.innerHTML = ''; // Clear existing list
    goals.forEach(goal => {
      renderNewGoal(goal);
    });
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while fetching goal. Please try again.');
  }
};

// event listener on goal submit button
const newGoalForm = document.querySelector('.new-goal-form');
if (newGoalForm) {
  newGoalForm.addEventListener('submit', newGoalFormHandler);
}

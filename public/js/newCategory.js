const newCategoryFormHandler = async (event) => {
  event.preventDefault(); // Prevent form submission
  const nameInput = document.querySelector('#name-new-category');
  const name = nameInput.value.trim(); // Get category name
  if (name) {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        // If successful, add the new category to the list
        const categoryData = await response.json();
        renderNewCategory(categoryData);
        nameInput.value = ''; // Clear input field after successful submission
      } else {
        alert('Error creating category!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  } else {
    alert('Please enter a category name.');
  }
};

// Function to render a new category
const renderNewCategory = (categoryData) => {
  const categoryList = document.querySelector('.category-list');
  const categoryElement = document.createElement('div');
  categoryElement.innerHTML = `<p>${categoryData.name}</p>`;
  categoryList.appendChild(categoryElement);
};

// Function to render categories
const renderCategories = async () => {
  try {
    const response = await fetch('/api/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories.');
    }
    const categories = await response.json();
    const categoryList = document.querySelector('.category-list');
    categoryList.innerHTML = ''; // Clear existing list
    categories.forEach(category => {
      renderNewCategory(category);
    });
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while fetching categories. Please try again.');
  }
};

// Event listener for new category form submission
const newCategoryForm = document.querySelector('.new-category-form');
if (newCategoryForm) {
  newCategoryForm.addEventListener('submit', newCategoryFormHandler);
}


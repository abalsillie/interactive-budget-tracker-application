// Function to render a new category using Handlebars
const renderNewCategory = async (categoryData) => {
  try {
      // Make a fetch request to retrieve the updated list of categories
      const response = await fetch('/api/categories');
      if (!response.ok) {
          throw new Error('Failed to fetch categories.');
      }
      const categories = await response.json();

      // Compile Handlebars template for the category card
      const categoryCardTemplate = Handlebars.compile(document.getElementById('category-card-template').innerHTML);
  
      // Select the category list container
      const categoryList = document.querySelector('.category-list');
  
      // Clear the category list before rendering new categories
      categoryList.innerHTML = '';

      // Iterate through the categories and render each category card
      categories.forEach(category => {
          const newCategoryCardHTML = categoryCardTemplate(category);
          // Append new category card HTML to the category list
          categoryList.insertAdjacentHTML('beforeend', newCategoryCardHTML);
      });
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while rendering categories. Please try again.');
  }
};

// Function to handle new category form submission
const newCategoryFormHandler = async (event) => {
  event.preventDefault(); // Prevent form submission
  
  const nameInput = $('#name-new-category');
  const name = nameInput.val().trim(); // Get category name
  
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
              nameInput.val(''); // Clear input field after successful submission
          } else {
              alert('Error creating category!');
          }
      } catch (error) {
          console.error('Error:', error);
          alert('An error occurred before category was created. Please try again.');
      }
  } else {
      alert('Please enter a category name.');
  }
};

// Event listener on new category form
$('.new-category-form').on('submit', newCategoryFormHandler);

// Function to handle category deletion
const deleteCategory = async (event) => {
  event.preventDefault(); // Prevent form submission
  
  const categoryId = $(event.currentTarget).data('id');

  if (categoryId) {
      try {
          const response = await fetch(`/api/categories/${categoryId}`, {
              method: 'DELETE',        
          });
          
          if (response.ok) {
              // If successful, remove the card associated with the deleted category
              $(event.currentTarget).closest('.card').remove();
          } else {
              alert('Error deleting category!');
          }
      } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while deleting category. Please try again.');
      }
  } 
};

// Event listener on delete category button
$(document).on('click', '.delete-category', deleteCategory);

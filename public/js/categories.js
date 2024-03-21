// Function to render a new category using Handlebars
// Assuming you receive the complete category object upon successful creation,
// including any IDs or other properties assigned by the server.
const renderNewCategory = (categoryData) => {
    const categoryCardTemplate = Handlebars.compile(document.getElementById('category-card-template').innerHTML);
    const newCategoryCardHTML = categoryCardTemplate(categoryData);
  
    const categoryList = document.querySelector('.category-list');
    categoryList.insertAdjacentHTML('beforeend', newCategoryCardHTML);
  };
  

// Function to handle new category form submission
const newCategoryFormHandler = async (event) => {
    event.preventDefault(); // Prevent form submission
    
    const categoryNameInput = document.getElementById('name-new-category');
    const categoryName = categoryNameInput.value.trim(); // Get category name
    
    if (categoryName) {
        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                body: JSON.stringify({ name: categoryName }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const newCategory = await response.json(); // Assuming this returns the new category
                const categoryList = document.querySelector('.category-list');

                // Directly constructing and inserting new category HTML
                const newCategoryHtml = `
                    <div class="card mb-3 d-flex justify-content-between" data-category-id="${newCategory.id}">
                      <div class="card-body d-flex justify-content-between align-items-center">
                        <h5 class="card-title m-0">${newCategory.name}</h5>
                        <div>
                          <button class="btn btn-sm ms-2 edit-category" style="background-color: #3ed865; color: white;" data-id="${newCategory.id}">Edit</button>
                          <button class="btn btn-sm ms-2 delete-category" style="background-color: #ff69b4; color: white;" data-id="${newCategory.id}">Delete</button>
                        </div>
                      </div>
                    </div>
                `;

                categoryList.insertAdjacentHTML('beforeend', newCategoryHtml);
                categoryNameInput.value = ''; // Clear the input field
            } else {
                alert('Error creating category!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the category. Please try again.');
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

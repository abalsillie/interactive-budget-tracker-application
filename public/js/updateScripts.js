const subNewBtn = document.getElementById("sub-new-expense");
const subNewForm = document.getElementById("newExpense");
const subCatForm = document.getElementById("sub-cat-form");
const catListSel = document.getElementById("cat-select");
const manageExpense = document.getElementById("buttons");

$("#update-modal-btn-expense").click(() => {  $('#entryModalLabel').html('New Expense');});
async function catFetcher(catList) {
  const catFetch = await fetch('/category/', {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  });
  catList = await catFetch.json();

  catListSel.innerHTML = "";
  catListSel.innerHTML += `<option value="0">New Category</option>`;
  catList.forEach((cat) => {
    catListSel.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
  });
  catListSel.value = "";
};

//expense listener for modal
subNewBtn.addEventListener('click', catFetcher());
$("#deleteExpense").on('click', async (expense) => {
  const deletedExpense = await fetch(`/api/expenses/${expense.target.dataset.id}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  });
  document.location.replace('/');
}
)

$(document).ready(() => {
  $("#catFormFields").hide();
  categorySelects();
});

const toggleCategoryForm = () => {
  if ($("#cat-select").val() === "0") {
    $("#catFormFields").show();
  } else {
    $("#catFormFields").hide();
  }
}

$("#cat-select").change(toggleCategoryForm);

async function catPost() {
  var catData = {};
  var catForm = new FormData(subCatForm);
  catForm.forEach((value, key) => (catData[key] = value));

  var catBody =
  {
    "name": catData.catName,
    "type": catData.catType,
    
  }
  catBody = JSON.stringify(catBody);
  const newCategory = await fetch('/api/categories', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: catBody
  });
  const categoryData = await newCategory.json();
  return categoryData;
}

// event listener for new expense
subNewBtn.addEventListener("click", async (expense) => {

  let newCategory = {};
  expense.preventDefault();
  if ($("#cat-select").val() === "0") {
    newCategory = await catPost();

  }
  var formData = {};
  var form = new FormData(subNewForm);
  form.forEach((value, key) => (formData[key] = value));
  console.log(formData)
  var formBody = {
    "name": formData.name,
    "description": formData.description,
    "due_date": formData.due_date,
    "location": "",
    "category_id": newCategory.id ? newCategory.id : formData.category,
    // "user_id": req.session.id
  }
  formBody = JSON.stringify(formBody);
  let API = "/api/expenses/"
  let METHOD = "POST"
  if ($('input[name="id"]').val().trim() !== "") {
    API += $('input[name="id"]').val().trim();
    METHOD = "PUT"
  }
  fetch(API, {
    method: METHOD,
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: formBody
  })
  resetFields();
  document.location.reload();

});

function categorySelects() {
  for (let i = 0; i < 3; i++) {
    let j = i + 1
    const catNums = document.getElementById(`t${j}`);
    catNums.innerHTML =
      `<div class="input-group mb-2">
    <span for="threshold${j}" class="input-group-text">Threshold ${j}:</span>
    <input type="text" name="t${j}int" class="form-control">
    <select name="t${j}dur" class="form-select">
    <option value="day">days</option>
    <option value="week" selected="selected">weeks</option>
    <option value="month">months</option>
    </select>`
  }
};

const resetFields = () => {
  $('input[name="id"]').val('');
  $('input[name="name"]').val('');
  $('input[name="description"]').val('');
  $('input[name="due_date"]').val('');
  $(`select[name="category"]`).val('')

}

$("#closeBtnFooter").click(() => { resetFields() });
$("#closeBtnHeader").click(() => { resetFields() });


$("#editExpense").click(async (expense) => {
  expense.preventDefault();
  expense.stopPropagation();

  let expenseData = await fetch(`/expense/${expense.target.dataset.id}`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  });
  expenseData = await expenseData.json();
  $('#entryModalLabel').html('Edit Expense');
  $('input[name="id"]').val(expenseData.id);
  $('input[name="name"]').val(expenseData.name);
  $('input[name="amount"]').val(expenseData.amount);
  $(`select[name="category"] option[value=${expenseData.category.id}]`).attr('selected', 'selected');
  $(`select[name="week_number"] option[value=${expenseData.week_number.id}]`).attr('selected', 'selected');
});
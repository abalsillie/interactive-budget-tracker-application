const newExpenseFormHandler = async (event) => { // new expense handler
    event.preventDefault(); // prevent reload
    const title = document.querySelector('#title-new-expense').value.trim(); // title value (text)
    const amount = document.querySelector('#amount-new-expense'); // amount value (integar)
    const categories = document.querySelector('#title-new-expense'); // categories value (preselect)
    const weeks = document.querySelector('#title-new-expense'); // weeks value (integar)
    if (title && amount && categories && weeks) {
        const response = await fetch('/api/posts', {
            method: 'POST', // POST title and content
            body: JSON.stringify({ title, content, categories, weeks }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard'); // load dashboard if successful
        } else {
            alert('Error'); // error if unsuccessful
        }
    }
};

// event listener on expense submit button
const newExpenseForm = document.querySelector('.new-expense-form');
if (newExpenseForm) {
    newExpenseForm.addEventListener('submit', newExpenseFormHandler);
}

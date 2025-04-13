const list = document.querySelector('.list-inputs');
const addBtn = document.querySelector('.add-new-input');
const submitBtn = document.querySelector('.submit-btn');
const filter = document.querySelector('.filter');

let flag = false;

let firstArr = [];

addBtn.addEventListener('click', () => {
    const newTodo = document.createElement('div');
    newTodo.className = 'todo';
    newTodo.innerHTML = `
        <input type="text" name="task" autocomplete="off">
        <i class="fa-solid fa-x cancel-btn"></i>
    `;

    list.append(newTodo);
});


submitBtn.addEventListener('click', () => {
    const todos = document.querySelectorAll('.todo');

    firstArr = [...todos];

    todos.forEach((t, index) => {
        const input = t.querySelector('input');

        if (!input) return;

        const value = input.value.trim();

        if (value) {
            const taskNumber = index + 1;

            t.innerHTML = '';

            const countText = document.createElement('span');
            countText.textContent = `${taskNumber}. ${value}`;
            countText.style.flex = '1';

            const removeBtn = document.createElement('i');
            removeBtn.className = 'fa-solid fa-x cancel-btn';

            t.append(countText);
            t.append(removeBtn);
        }
    })

});

list.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        submitBtn.click();
    }
});

list.addEventListener('click', (e) => {
    if (e.target.classList.contains('cancel-btn')) {
        const todo = e.target.closest('.todo');
        if (todo) {
            todo.remove();

            newNum();
        }
    }
});

filter.addEventListener('click', () => {
    const todos = [...document.querySelectorAll('.list-inputs .todo')]
    todos.filter(todo => {
        const span = todo.querySelector('span');
        return span && span.textContent.trim() !== '';
    });

    if (todos.length === 0) {
        return;
    }

    if (flag === false) {
        todos.sort((f, s) => {
            const first = f.querySelector('span')?.textContent.split('. ')[1] || '';
            const second = s.querySelector('span')?.textContent.split('. ')[1] || '';
            return first.localeCompare(second);
        });

        filter.className = 'fa-solid fa-arrow-up-short-wide filter';
        filter.style.color = 'black';
        flag = true;
    } else if (flag === true) {
        todos.sort((f, s) => {
            const first = f.querySelector('span')?.textContent.split('. ')[1] || '';
            const second = s.querySelector('span')?.textContent.split('. ')[1] || '';
            return second.localeCompare(first);
        });

        filter.className = 'fa-solid fa-arrow-down-short-wide filter';
        filter.style.color = 'black';
        flag = null;
    } else if (flag === null) {
        todos.sort((a, b) => {
            return firstArr.indexOf(a) - firstArr.indexOf(b);
        });

        filter.style.color = 'gray';
        flag = false;
    }

    list.innerHTML = '';
    todos.forEach(todo => list.append(todo));

    newNum();
});

function newNum() {
    const todos = document.querySelectorAll('.list-inputs .todo span');
    todos.forEach((s, index) => {
        const parts = s.textContent.split('. ');
        const content = parts.slice(1).join('. ');
        s.textContent = `${index + 1}. ${content}`;
    });
};



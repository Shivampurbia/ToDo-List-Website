/* DOMContentLoaded */
document.addEventListener('DOMContentLoaded', main);

function main() {
  // theme-switcher
  document
    .getElementById('theme-switcher')
    .addEventListener('click', function () {
      document.querySelector('body').classList.toggle('light');
      const themeImg = this.children[0];
      themeImg.setAttribute(
        'src',
        themeImg.getAttribute('src') === './assets/images/icon-sun.svg'
          ? './assets/images/icon-moon.svg'
          : './assets/images/icon-sun.svg'
      );
    });

  // get alltodos and initialise listeners
  addTodo();
  // dragover on .todos container
  document.querySelector('.todos').addEventListener('dragover', function (e) {
    e.preventDefault();
    if (
      !e.target.classList.contains('dragging') &&
      e.target.classList.contains('card')
    ) {
      const draggingCard = document.querySelector('.dragging');
      const cards = [...this.querySelectorAll('.card')];
      const currPos = cards.indexOf(draggingCard);
      const newPos = cards.indexOf(e.target);
      console.log(currPos, newPos);

      if (currPos > newPos) {
        this.insertBefore(draggingCard, e.target);
      } else {
        this.insertBefore(draggingCard, e.target.nextSibling);
      }
      const todos = JSON.parse(localStorage.getItem('todos'));
      const removed = todos.splice(currPos, 1);
      todos.splice(newPos, 0, removed[0]);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  });

  // add new todos on user input
  const add = document.getElementById('add-btn');
  const txtInput = document.querySelector('.txt-input');
  add.addEventListener('click', function () {
    const item = txtInput.value.trim();
    if (item) {
      txtInput.value = '';
      const todos = !localStorage.getItem('todos')
        ? []
        : JSON.parse(localStorage.getItem('todos'));
      const currentTodo = {
        item,
        isCompleted: false,
      };
      addTodo([currentTodo]);
      todos.push(currentTodo);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
    txtInput.focus();
  });

  // add todo also on enter key event
  txtInput.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
      add.click();
    }
  });
  // filter todo - all, active, completed
  document.querySelector('.filter').addEventListener('click', function (e) {
    const id = e.target.id;
    if (id) {
      document.querySelector('.on').classList.remove('on');
      document.getElementById(id).classList.add('on');
      document.querySelector('.todos').className = `todos ${id}`;
    }
  });

  // Clear Completed
  document
    .getElementById('clear-completed')
    .addEventListener('click', function () {
      deleteIndexes = [];
      document.querySelectorAll('.card.checked').forEach(function (card) {
        deleteIndexes.push(
          [...document.querySelectorAll('.todos .card')].indexOf(card)
        );
        card.classList.add('fall');
        card.addEventListener('animationend', function (e) {
          setTimeout(function () {
            card.remove();
          }, 100);
        });
      });
      removeManyTodo(deleteIndexes);
    });
}

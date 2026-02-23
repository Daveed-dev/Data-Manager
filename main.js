const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const courseInput = document.getElementById('course');
const btn = document.getElementById('btn');
const list = document.getElementById('studentList');
const dateSpan = document.getElementById('date');

function checkInputs() {
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const courseValue = courseInput.value.trim();

  btn.disabled = !(nameValue && emailValue && courseValue);
}

nameInput.addEventListener('input', checkInputs);
emailInput.addEventListener('input', checkInputs);
courseInput.addEventListener('input', checkInputs);

// Safe loading
let students = JSON.parse(localStorage.getItem('Students')) || [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const course = courseInput.value.trim();

  const student = { name, email, course };

  students.push(student);

  localStorage.setItem('Students', JSON.stringify(students));

  displayStudents();

  // Auto-scroll to the last student
  if (list.lastElementChild) {
    list.lastElementChild.scrollIntoView({
      behavior: 'smooth',
      block: 'end', // scrolls to bottom
    });
  }

  form.reset();
  btn.disabled = true;
});

function displayStudents() {
  list.innerHTML = '';

  students.forEach((student) => {
    const li = document.createElement('li');
    li.innerHTML = `
        <h3>👤 ${student.name}</h3>
        <h3>📧 ${student.email}</h3>
        <h3>📘 ${student.course}</h3>
    `;
    list.appendChild(li);
  });
}
displayStudents(true);

function resetData() {
  students = [];
  localStorage.removeItem('Students');
  displayStudents();
}

// Set current year in footer
dateSpan.textContent = new Date().getFullYear();

const form = document.querySelector('#attendanceForm');
const recordsEl = document.querySelector('#records');
const emptyState = document.querySelector('#emptyState');
const today = new Date().toISOString().slice(0, 10);
document.querySelector('#attendanceDate').value = today;
let data = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');

function save() { localStorage.setItem('attendanceRecords', JSON.stringify(data)); }
function render() {
  recordsEl.innerHTML = data.map((item, index) => `<tr><td>${item.name}</td><td>${item.date}</td><td class="${item.status.toLowerCase()}">${item.status}</td><td><button class="delete" onclick="removeRecord(${index})">Delete</button></td></tr>`).join('');
  emptyState.hidden = data.length !== 0;
  document.querySelector('#totalCount').textContent = data.length;
  document.querySelector('#presentCount').textContent = data.filter(x => x.status === 'Present').length;
  document.querySelector('#absentCount').textContent = data.filter(x => x.status === 'Absent').length;
}
function removeRecord(index) { data.splice(index, 1); save(); render(); }
form.addEventListener('submit', event => { event.preventDefault(); data.unshift({ name: document.querySelector('#studentName').value.trim(), date: document.querySelector('#attendanceDate').value, status: document.querySelector('#status').value }); save(); form.reset(); document.querySelector('#attendanceDate').value = today; render(); });
document.querySelector('#clearAll').addEventListener('click', () => { if (confirm('Delete all attendance records?')) { data = []; save(); render(); } });
render();

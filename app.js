const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');


let items = JSON.parse(localStorage.getItem('todos') || '[]');
const save = () => localStorage.setItem('todos', JSON.stringify(items));


function render() {
    list.innerHTML = '';
    items.forEach((t, i) => {
        const li = document.createElement('li');
        li.className = t.done ? 'done' : '';
        li.innerHTML = `<span>${t.text}</span>
<div class="actions">
<button data-act="toggle">✓</button>
<button data-act="del">🗑</button>
</div>`;
        li.addEventListener('click', e => {
            const act = e.target.dataset.act; if (!act) return;
            if (act === 'toggle') { items[i].done = !items[i].done; }
            if (act === 'del') { items.splice(i, 1); }
            save(); render();
        });
        list.append(li);
    });
}


form.addEventListener('submit', e => {
    e.preventDefault();
    items.push({ text: input.value.trim(), done: false });
    input.value = ''; save(); render();
});


render();
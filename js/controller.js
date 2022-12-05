
function onInit() {
    renderTodos()
}

function renderTodos() {

    const todos = getTodosForDisplay()
    const strHTMLs = todos.map(todo => `
    <li class="${(todo.isDone) ? "done" : ""}"
       
         onclick="onToggleTodo('${todo.id}')">
         ${todo.txt}
        <button onclick="onRemoveTodo(event,'${todo.id}')">x</button> 
        <select onchange="onSelectTodo(this.value,'${todo.id}')">
            <option value="1">not important</option>
            <option value="2">important</option>
            <option value="3"> very importance</option>
        </select>
       

    </li>` )

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')

    document.querySelector('.total-todos').innerText = getTotalTodos()
    document.querySelector('.active-todos').innerText = getActiveTodos()
}
// function onSaveTodo(ev, todoId) {
//     ev.preventDefault()
//     // var todos = getTodosForDisplay()

//     const elNum = document.querySelector('input[name="todo-number"]')
//     const num = elNum.value
//     if (num < 0 || num > 3 || typeof num !== 'number') return
//     // var markedTodos = todos.filter(todo=>todo.isMarked)
//     // markedTodos.array.forEach(todo => {
//     //     todo[importance] = num
//     // });
//     // var unMarkedTodos = todos.filter(todo=>todo.isMarked)
//     // unMarkedTodos.array.forEach(todo => {
//     //     todo[importance] = 0
//     // });
//     addImportance(num)

//     elNum.value = ''
//     renderTodos()

// }
 
function onSelectTodo(value,todoId) {
    // ev.stopPropagation()
    // elBtn.innerText = 'v'
    selectTodo(value,todoId)

    // var todos = getTodosForDisplay()
    // todos.array.forEach(todo => {
        
    // });
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('input[name="todo-txt"]')
    const txt = elTxt.value
    if (!txt) return
    // console.log('txt', txt)
    addTodo(txt)
    elTxt.value = ''
    renderTodos()

}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    if (!confirm('are you sure?')) return
    // console.log('Removing', todoId)
    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(todoId) {
    // console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(filterBy) {
    // console.log('filterBy', filterBy)
    setFilter(filterBy)
    renderTodos()
}



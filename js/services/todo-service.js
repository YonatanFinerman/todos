const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'all'

_createTodos()

function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos
    else if(gFilterBy === 'time'){
        var sortTodo = gTodos.slice()
        return sortTodo.sort().reverse()
    }
    else if(gFilterBy === 'importance'){
        var sortTodo = gTodos.slice()
        return sortTodo.sort((a,b)=> a.importance-b.importance)
    }
    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'done' ||
        !todo.isDone && gFilterBy === 'active')
}

function addTodo(txt) {
    const todo = _createTodo(txt)
    gTodos.unshift(todo)
    saveToStorage(STORAGE_KEY, gTodos)

}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)

}
function selectTodo(value,todoId){
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos[todoIdx].importance = value
    // const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    // gTodos[todoIdx].isMarked = true
    saveToStorage(STORAGE_KEY, gTodos)
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)

}

// function addImportance(num){
//     var markedTodos = gTodos.filter(todo=>todo.isMarked)
//     markedTodos.array.forEach(todo => {
//         todo[importance] = num
//     });
//     var unMarkedTodos = gTodos.filter(todo=>todo.isMarked)
//     unMarkedTodos.array.forEach(todo => {
//         todo[importance] = 0
//     });
// }

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function getTotalTodos() {
    if (!gTodos.length) return 'No todos'
    return gTodos.length
}

function getActiveTodos() {
    if (!gTodos.filter(todo => !todo.isDone).length) return 'No active todos'
    return gTodos.filter(todo => !todo.isDone).length
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS'),
        ]
        saveToStorage(STORAGE_KEY, gTodos)
    }
}

function _createTodo(txt,importance) {
    
    return {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: new Date(),
        isMarked: false,
        importance: 1
    }

}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
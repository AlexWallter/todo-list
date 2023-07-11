const body = document.querySelector('body')
const input = document.querySelector('input')
const list = document.querySelector('#items-list')
const btn = document.querySelector('#input-btn')
const items = document.getElementsByClassName('list-item')
const crossIcon = document.getElementsByClassName('cross-icon')
const clearCom = document.querySelector('#clear')
const allItems = document.querySelector('#all')
const activeTasks = document.querySelector('#active-only')
const completedTasks = document.querySelector('#completed-only')
const themeSwitch = document.querySelector('#theme-switch')
const img = document.querySelector('img')
const sourceTag = document.querySelector('source')


tasksremain()

dragggingClass()

firstItem()

input.addEventListener("keyup", (e) => {
    if (e.code === 'Enter') {
        e.preventDefault;
        addToList()
    }
})


btn.addEventListener('click', addToList)

themeSwitch.addEventListener('click', themeColor)

clearCom.addEventListener('click', deleteTasks)

activeTasks.addEventListener('click', activeOnly)

completedTasks.addEventListener('click', completedOnly)

allItems.addEventListener('click', alltasks)


list.addEventListener('dragover', (e) => {
    e.preventDefault()
    const drag = dragAndDrop(list, e.clientY)
    const dragging = document.querySelector('.dragging')

    if(drag == null){
        list.appendChild(dragging)
    }
    else {
        list.insertBefore(dragging, drag)
        firstItem()
    }
})


function addToList() {
    const inputValue = input.value
    
    if(inputValue !== '') {
        const newItem = document.createElement('li')
        newItem.classList.add('list-item')
        newItem.classList.add('active')
        newItem.innerHTML = `<div class="check-icon"></div><div class="cross-icon"></div>${inputValue}`
        newItem.setAttribute('draggable', 'true')
        list.appendChild(newItem)
        tasksremain()
        dragggingClass()
        input.value = ''
    }
}


function themeColor() {
    body.classList.toggle('light-mode')
    const attribute = img.getAttribute('src')
    const sourceAttribute = sourceTag.getAttribute('srcset')
    

    if(attribute == './images/bg-mobile-dark.jpg' || sourceAttribute == './images/bg-desktop-dark.jpg') {
        img.setAttribute('src', './images/bg-mobile-light.jpg')
        sourceTag.setAttribute('srcset', './images/bg-desktop-light.jpg')
    } 
    else if(attribute == './images/bg-mobile-light.jpg'  || sourceAttribute == './images/bg-desktop-light.jpg') {
        img.setAttribute('src', './images/bg-mobile-dark.jpg')
        sourceTag.setAttribute('srcset', './images/bg-desktop-dark.jpg')
    }
}


for(let i = 0; i < items.length; i++) {
    
    this.addEventListener('click', (e)=> {

        const target = e.target
        const icon = target.firstElementChild


        if(target.classList[1] == 'list-item' || target.classList[0] == 'list-item') {
            icon.classList.toggle('done')
            target.classList.toggle('completed')
            target.classList.toggle('active')
        }
        else if (target.classList[0] == 'check-icon') {
            target.classList.toggle('done')
            target.parentNode.classList.toggle('completed')
            target.parentNode.classList.toggle('active')
        }
        else if (target.classList == 'cross-icon') {
            const parent = target.parentNode
            parent.remove()
            tasksremain()
            firstItem()
        }
    })
}


function tasksremain() {
    const active = document.getElementsByClassName('active')
    const activeArr = [...active]

    const taskLeft = document.querySelector('#items-left')
    taskLeft.innerHTML = `${activeArr.length} items left`
}


function deleteTasks() {
    const completed = document.getElementsByClassName('done')
    const arr = [...completed]


    arr.forEach(element => {
        element.parentNode.remove()
    });

    firstItem()
}


function completedOnly() {
    const active = document.getElementsByClassName('active')
    const completed = document.getElementsByClassName('completed')

    const activeArr = [...active]
    const completedArr = [...completed]

    activeArr.forEach(element => {
        element.classList.toggle('hide')
    })

    completedArr.forEach(element => {
        element.classList.remove('hide')
    })

    allItems.classList.remove('task-visualize')
    activeTasks.classList.remove('task-visualize')
    completedTasks.classList.add('task-visualize')
    firstItem()
}


function activeOnly() {
    const active = document.getElementsByClassName('active')
    const completed = document.getElementsByClassName('completed')
    
    const activeArr = [...active]
    const completedArr = [...completed]

    completedArr.forEach(element => {
        element.classList.toggle('hide')
    })

    activeArr.forEach(element => {
        element.classList.remove('hide')
    })

    allItems.classList.remove('task-visualize')
    activeTasks.classList.add('task-visualize')
    completedTasks.classList.remove('task-visualize')
    firstItem()
}


function alltasks() {
    const itemsArr = [...items]
    itemsArr.forEach(element => {
        element.classList.remove('hide')
    })

    allItems.classList.add('task-visualize')
    activeTasks.classList.remove('task-visualize')
    completedTasks.classList.remove('task-visualize')
    firstItem()
}


function dragggingClass() {
    const item = [...items]
        
    item.forEach((e)=> {
        e.addEventListener('dragstart', () => {
            e.classList.add('dragging')
        })
            
        e.addEventListener('dragend', () => {
            e.classList.remove('dragging')
        })
    })
}


function dragAndDrop(list ,y) {
    const lista = [... list.querySelectorAll('.list-item:not(.dragging)')]

    return lista.reduce((closest, child)=> {
        const distance = child.getBoundingClientRect()
        const offset = y - distance.top - distance.height / 2

        if(offset < 0 && offset> closest.offset) {
            return {offset: offset, element: child}
        }
        else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}


function firstItem() {
    const othersItems = [...items]

    othersItems.forEach(element => {
        element.classList.remove('first-item')
        console.log('working')
    })
    
    if(allItems.classList == 'task-visualize') {
        const first = list.firstElementChild
        return first.classList.add('first-item') 
    }
    else if(completedTasks.classList == 'task-visualize') {
        const actItems = document.querySelectorAll('.completed')
        const first = actItems[0]
        return first.classList.add('first-item')
    }
    else if(activeTasks.classList == 'task-visualize') {
        const actItems = document.querySelectorAll('.active')
        const first = actItems[0]
        return first.classList.add('first-item')
    }
}
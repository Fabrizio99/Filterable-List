const filterInput = document.getElementById('filterInput')

filterInput.addEventListener('keyup',(keyboardEvent)=>{
    const filterValue = keyboardEvent.target.value.toUpperCase().trim()
    const ul = document.getElementById('names')
    const li = Array.from(ul.querySelectorAll('li.collection-item'))
    
    li.forEach(nameTag => {
        let name = nameTag.getElementsByTagName('a')[0]
        const coincide = name.textContent.toUpperCase().includes(filterValue)
        nameTag.style.display = coincide? '':'none'
    });
})
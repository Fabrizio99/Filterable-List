addEventListener('load',()=>fetchContacts())

document.getElementById('contactInput').addEventListener('keyup',()=>{
    validateInput()
})

const buttonAddContact = document.getElementById('contactForm')
buttonAddContact.addEventListener('submit',()=>{
    saveContact()
})

function validateInput(){
    if(document.getElementById('contactInput').value.length>0){
        document.getElementById('buttonSubmit').classList.remove('disabled')
    }else{
        document.getElementById('buttonSubmit').classList.add('disabled')
    }
}


function fetchContacts(){
    const contactsContainer = document.getElementById('contactContainer')
    contactsContainer.innerHTML = ''
    const contactData = JSON.parse(localStorage.getItem('contactData'))

    if(!contactData)    return
    
    const blockNames = Object.keys(contactData).sort()

    blockNames.forEach(blockName => {
        const blockContactStructure = document.getElementById('structure').content.cloneNode(true)
        blockContactStructure.querySelector('.collection-header h5').textContent = blockName
        contactData[blockName].forEach(contactname => {
            const contactStructure = document.createElement('li')
            contactStructure.classList.add('collection-item')
            contactStructure.innerHTML += `<a href="#">${contactname}</a>`
            blockContactStructure.append(contactStructure)
        })
        contactsContainer.append(blockContactStructure)
    });

}

function verifyBlockName(firstLetter){
    const contactData = JSON.parse(localStorage.getItem('contactData'))
    if(!contactData)    return false
    const value = Object.keys(contactData).filter(blockName=>blockName==firstLetter)
    return (value.length==0)? false:true
}

function saveContact(){
    let inputValue = document.getElementById('contactInput').value
    inputValue = inputValue[0].toUpperCase()+inputValue.substr(1)
    const contactData = localStorage.getItem('contactData')? JSON.parse(localStorage.getItem('contactData')):{}

    if(!verifyBlockName(inputValue[0])){
        contactData[inputValue[0]] = [inputValue]
    }else{
        for (const blockName in contactData) {
            if(!inputValue.startsWith(blockName))   continue
            if(contactData[blockName].length==0){
                contactData[blockName].push(inputValue)
                continue
            }    
            contactData[blockName].push(inputValue)
            contactData[blockName].sort((nameA,nameB)=>{
                if(nameA<nameB) return -1
                if(name>nameB)  return 1
                if(name==nameB)  return 1
            })
        }
    }

    localStorage.setItem('contactData',JSON.stringify(contactData))
    document.getElementById('contactForm').reset()
    validateInput()
    fetchContacts()
}

const filterInput = document.getElementById('filterInput')
filterInput.addEventListener('keyup',(keyboardEvent)=>{
    const filterValue = keyboardEvent.target.value.trim().toUpperCase()
    const ul = document.getElementById('contactContainer')
    const li = Array.from(ul.querySelectorAll('li.collection-item'))
    li.forEach(nameTag => {
        const name = nameTag.getElementsByTagName('a')[0]
        const coincide = name.textContent.toUpperCase().includes(filterValue)
        nameTag.style.display = coincide? '':'none'
    });
})
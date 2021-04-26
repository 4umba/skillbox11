
const OUT = document.querySelector('.out')


async function loadList(number = 1) {
    let response = await fetch(`https://gorest.co.in/public-api/posts?page=${number}`)
    let data = await response.json()
    createListElement(data)
    createPagination(data)
}




function createListElement(data) {
    const listElement = document.createElement('ul')
    for (let i = 0; i < data.data.length; i++) {
        const itemElement = document.createElement('li')
        const linkElement = document.createElement('a')
        
        
        linkElement.textContent = data.data[i].title
        linkElement.href =`post.html?id=${data.data[i].id}`
        
        itemElement.textContent = `${data.data[i].id} `
        
        itemElement.append(linkElement)
        listElement.append(itemElement)
    }
    OUT.append(listElement)
}

function createPagination(data) {
    const listPage = document.createElement('ul')
    listPage.classList.add('list-page')
    for (let i = 1; i <= data.meta.pagination.pages; i++) {
        const page = document.createElement('li')
        const pageLink = document.createElement('a')
        
        pageLink.href = `index.html?page=${i}`
        if(i==1) pageLink.href='index.html'
        
        
        pageLink.addEventListener('click', (e) => {
            e.preventDefault()
            OUT.innerHTML = ''
            loadList(i)
        })
        pageLink.textContent = i
        page.append(pageLink)
        listPage.append(page)
        
    }
    OUT.append(listPage)
}


loadList()



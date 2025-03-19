let container=document.getElementById("container")
let loader=document.getElementById("loader")
let btn=document.getElementById("btn")
let addloader=document.getElementById("addloader")


btn.addEventListener("click",function()
{
    
    addData()
    
})
document.addEventListener("keydown",function(event)
{
    if(event.key=="Enter")
    {
        addData()
    }
})
function addData()
{
    let title=document.getElementById("title")
    let price=document.getElementById("price")
    let description=document.getElementById("description")
    let image=document.getElementById("image")
    
    
    if (title.value=="" || price.value==""|| description.value==""|| image.value=="")
    {
        alert("Please fill out all required fields before Adding")
    }
    else
    {
        addloader.style.display="inline-block"
        fetch("https://boundless-rune-panda.glitch.me/Products",{
            "method":"POST",
            "headers":
            {
                "Content-Type":"application/json"
            },
            "body":JSON.stringify(
                {
                    "title":title.value,
                    "price":price.value,
                    "description":description.value,
                    "image":image.value
                    
                }
            )

        })
        .then(res=>
        {
            if(res.ok)
            {
                title.value=''
                price.value=''
                description.value=''
                alert("Data Added Successfully")
                addloader.style.display="none"
                getData()

            }
        }
        )
    }

}
function getData()
{
    fetch("https://boundless-rune-panda.glitch.me/Products")
    .then(res=>res.json())
    .then(data=>displayData(data))
}
function displayData(Products)
{
    var box=document.createElement("div")
    box.className="DisplayBox"
    for(var obj of Products)
    {
         let item=document.createElement("div")
         item.className="item"
         item.innerHTML=`
         <img class="image" src="${obj.image}">
         <p class="title">${obj.title} - <span class="price"> ${obj.price}</span></p>
         <p class="description">${obj.description}</p>
         <button  class="delete" onclick=deleteData('${obj.id}')>Delete</button>


         `
         box.appendChild(item)
    }
    document.body.appendChild(box)
}
function deleteData(id)
{
    fetch(`https://boundless-rune-panda.glitch.me/Products/${id}`,
        {
            "method":"DELETE"
        }
    )
    .then(res=>
    {
        if(res.ok)
        {
            alert("Data Deleted")
            getData()
        }
    }
    )
}
loader.remove()
getData()



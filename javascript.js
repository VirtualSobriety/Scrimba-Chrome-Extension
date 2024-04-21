let myLeads = []
const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
// const vs let - const CAN NOT be reassigned...kind of like id vs class
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse (localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
  render(myLeads)
} 

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    })
})

function render(leads){
let listItems = ""
for (let i = 0; i < leads.length; i++){
    // listItems += "<li><a target='_blank' href='" + myLeads[i] + " '>" + myLeads[i] + "</a></li>"
    listItems += `
    <li>
        <a target='_blank' href='${leads[i]}'>
            ${leads[i]}
        </a>
    </li>
    `
}
    ulEl.innerHTML = listItems
}

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = " "
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    console.log ( localStorage.getItem("myLeads") )

})

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})




// different method as per Billy...just something to think about
// myLeads.forEach(function(value, index){
//     listItems += `
//     <li>
//         <a target='_blank' href='${value}'>
//             ${value}
//         </a>
//     </li>
//     `
// })
const users = JSON.parse(localStorage.getItem("array")) ||  ["User1","User2","User3"];

function createForm(event){
    const form = document.createElement("form");
    const input = document.createElement("input");
    const addButton = document.createElement("button");
    addButton.type = "submit";
    addButton.innerText = "Add";
    addButton.className = "add_button";
    addButton.addEventListener("click", event);
    form.appendChild(input);
    form.appendChild(addButton);
    return form
};

const buttons = ["Edit", "Remove"];

function makeList(array, arrButtons){
    const ul = document.createElement("ul");
    for(let i = 0; i < array.length; i++){
        const li = document.createElement("li");
        li.innerText = array[i];
        ul.appendChild(li);
        if(arrButtons){
            for(let btn of arrButtons){
                ul.appendChild(createButtons(btn, "click", i))
            }
        }
    }
    localStorage.setItem("array", JSON.stringify(users))
    return ul
}

function createButtons(name, event, el){
    const button = document.createElement("button");
    button.innerText = name;
    if(name === "Edit"){
        button.addEventListener(event, function(){
            users[el] = prompt("Sure?") || users[el];
            document.body.replaceChild(makeList(users,buttons),document.body.lastChild)
        })
    } else if(name === "Remove"){
        button.addEventListener(event, function(){
            if(confirm(`Do you want delete - ${users[el]}?`)){
                users.splice(el,1)
                document.body.replaceChild(makeList(users,buttons), document.body.lastChild)
            }
        })
    }
    return button
};

function addNewUser(event){
    event.preventDefault();
    const input = document.querySelector('input');
    if(input.value && !users.includes(input.value)){
        users.push(input.value);
        input.value = "";
        document.body.replaceChild(makeList(users,buttons), document.body.lastChild)
    }
}


const form = createForm(addNewUser);
document.body.appendChild(form);
const list = makeList(users, buttons);
console.log(list)
document.body.appendChild(list);

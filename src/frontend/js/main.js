



async function createProject() {
    const title = document.getElementById("title").value.trim()
    const subtitle = document.getElementById("subtitle").value.trim()

    if (title == "" | subtitle === "") {
        alert("Please fill the inputs")
        return
    }

    const res = await pywebview.api.createProject();

    if (res == "Error") {
        alert("select a folder path")
    }

    if (res == "Done") {
        alert ("Done Creating project!")
        await closeNewProject()
    }

}

async function selecFolder() {
    const path = await pywebview.api.getFolder();
    document.getElementById("select-btn").innerText = path.slice(0, 40)
}

function newProject() {
    document.getElementById("new-project").classList.remove("hide")
    
}

async function closeNewProject() {
    document.getElementById("new-project").classList.add("hide")
    document.getElementById("select-btn").innerText = "Select"
    await pywebview.api.removeCurFolder();
}

async function openProject() {
    await pywebview.api.openFolder();
    await getRecent();
}

function quickopenProject(path) {
    pywebview.api.openFolder(path);
}

async function getRecent() {
    const recent = await pywebview.api.getRecent();

    const list = document.getElementById("recent-list");
    list.innerHTML = ''

    const box = document.getElementById("recent-box");
    if (Object.keys(recent).length == 0) {
        box.classList.add('hide');
    } else {
        box.classList.remove('hide');
    }


    for (let entry in recent) {
        list.insertAdjacentHTML('beforeend', `
                <div><button onclick="quickopenProject('${recent[entry].replace(/\\/g, "\\\\")}')">${entry}</button><span>${recent[entry].slice(0, 50)}...</span></div>
        `);
    }

    
}


window.addEventListener('pywebviewready', () => {
    getRecent()

  });
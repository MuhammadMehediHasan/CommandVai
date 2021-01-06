var CMDLIST = [], usrCmd, termWindow;
function init(input, output) {
    usrCmd = document.querySelector(input);
    termWindow = document.querySelector(output);
}

document.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) { 
        if (!usrCmd.value) return; 
        logUsrCmd(termWindow, usrCmd.value) 
        run(usrCmd.value)
        clearText(usrCmd) 
        termWindow.scrollTop = termWindow.scrollHeight;
    }
})

const reply = (id, content, type) => {
    let temp = document.createElement('tres');
    if (!(typeof content == "object")) {
        temp.textContent = content;
    } else if (typeof content == "object") {
        if (content.html) {
            temp.innerHTML = content.content;
        } else {
            temp.textContent = content.content;
        }
    }

    if (type) { temp.classList.add(type) }
    id.appendChild(temp);
}
const clearText = id => { id.innerHTML = ""; id.value = ""; }
const logUsrCmd = (id, content) => {
    let temp = document.createElement('tin');
    temp.textContent = content;
    id.appendChild(temp);
}
const run = (usrInput = "") => {
    const [PrimaryCmd, ...args] = usrInput.toLowerCase().trim().split(" ");
    let passed = false;
    for (let ci in CMDLIST) {
        for (let pi in CMDLIST[ci].name) {
            if (PrimaryCmd === CMDLIST[ci].name[pi]) {
                CMDLIST[ci].clb(termWindow, args);
                passed = true;
                break;
            }
        }
        if (!passed && CMDLIST.length === (parseFloat(ci) + 1)) {
            reply(termWindow, `'${PrimaryCmd}' is not a recognized as an internal Command. Type help for Command List.`, 'err')
        }
    }

}
function Command(name = [], clb, help) {
    this.name = name;
    this.clb = clb;
    if (help) { this.help = help; }

}
function compile(cmd) {
    CMDLIST[CMDLIST.length] = cmd;
}
function MakeUrl(url) {
    return `<a href="${url}" class="url" target="_blank">${url}</a>`;
}
compile(
    new Command(["help"],
        (id, args = []) => {
            if(!args[0]) {
            let help = ""
            for (let cmd in CMDLIST) {
                help += `<br>Command Name : ${CMDLIST[cmd].name}<br>
                             Description  : ${CMDLIST[cmd].help ? CMDLIST[cmd].help : "No Description Provided!"}`
            }
            reply(id, { html: true, content: ` ========= ${help}` }, "succ")}
            else {
                for(let cmd in CMDLIST){
                    for(let i in CMDLIST[cmd].name){
                        if(CMDLIST[cmd].name[i] == args[0]){
                            reply(id,{html:true,content:` ========= <br>
                            Command Name: ${CMDLIST[cmd].name}<br>
                            Description : ${CMDLIST[cmd].help ? CMDLIST[cmd].help : "No Description Provided!"}
                            `},"succ")
                        }
                    }
                }
            }
        },
        "This command Help you to find any  Command documentation!. To use this Command You can simply type 'help' or 'help &lt;command_name&gt;'")
)

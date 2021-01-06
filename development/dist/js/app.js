init("#cmd",".terminal-window");  // Simply init the terminal  parameter => input , output
// Compile new Command
compile(
    new Command(["cls","clear"],(id,args=[])=>{
        clearText(id)
    },"This Command Clear The Window! :D")
);
// Compile new Command
compile(
    new Command(["say","echo"],(id,a=[])=>{
        reply(id,a.join(" "),"succ")
    })
)


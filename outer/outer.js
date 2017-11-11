let wss=new (require('ws').Server)({port:8888});
wss.on('connection',(ws)=>{
    console.log('one connection!');
    ws.on('message',(msg)=>{
        console.log(msg);
    });
});
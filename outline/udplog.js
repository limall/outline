let dgram = require('dgram');

var udpLog={
    BLOCK_LEN : 128,
	MASTHEAD_HEADOFLOG : 0,
	MASTHEAD_BODYOFLOG : 1,
	MASTHEAD_RESETLOGID : 2
};

udpLog.getSingleId=function(){
    var toReturn;
    this.id=this.id||0;
	toReturn = this.id;
	this.id++;
	return toReturn;
}

//前8位为是否是开头，接下来就是32位logid,接下来是32位id，接下来是16位总长度，接下来是8位order，接下来是128byte的数据。
udpLog.sendBlock=function(block,isBegin,id,totoallength,order){
    var buffer=Buffer.alloc(12);
    buffer[0]= isBegin ? 0 : 1;
    var i=0;
    let mask= 0xff;
	for (; i < 4; i++)
		buffer[i + 1] = (this.logId >> (8 * (4 - i - 1))) & mask;
	for (i = 0; i < 4; i++)
		buffer[i + 5] = (id >> (8 * (4 - i - 1))) & mask;
	buffer[9] = totoallength >> 8;
	buffer[10] = totoallength & 0xff;
    buffer[11] = order;

    let list=[buffer,block];
    buffer=Buffer.concat(list,this.BLOCK_LEN+12);

    this.socket=this.socket || dgram.createSocket('udp4');

	this.socket.send(buffer, 0, buffer.length, this.port, this.ip);
}

udpLog.sendMsg=function(msg){
    msg=Buffer.from(msg,'utf8');
	let id = this.getSingleId();
	let size = msg.length;
	var start = 0;
	var order = 0;
	while (start < size){
        var length = size - start;
		if (length > this.BLOCK_LEN)
			length = this.BLOCK_LEN;
        var buf=Buffer.alloc(length);
        for(var i=0;i<length;i++){
            buf[i]=msg[i+start];
        }
		let isBegin = start === 0;
		start += length;
		this.sendBlock(buf, isBegin, id, size, order);
		order++;
	}
}

udpLog.setDst=function(ip,port,logId){
    this.ip=ip;
    this.port=port;
    this.logId=logId;
}

udpLog.resetDst=function(ip,port,logId){
	this.setDst(ip, port, logId);
	var buf=Buffer.alloc(5);
	buf[0] = this.MASTHEAD_RESETLOGID;
	let mask = 0xff;
	for (var i = 0; i < 4; i++)
        buf[i + 1] = this.logId & (mask << (8 * (4 - i - 1)));
    this.socket=dgram.createSocket('udp4');
    this.socket.send(buf, 0, buf.length, this.port, this.ip);
}

udpLog.i=function(tag,msg){
    var time=parseInt((new Date().getTime())/1000);
	var json={
        tag:tag,
        time:time,
        level:'i',
        msg:msg
    };
	this.sendMsg(JSON.stringify(json));
}

udpLog.d=function(tag,msg){
    var time=parseInt((new Date().getTime())/1000);
	var json={
        tag:tag,
        time:time,
        level:'d',
        msg:msg
    };
	this.sendMsg(JSON.stringify(json));
}

udpLog.w=function(tag,msg){
    var time=parseInt((new Date().getTime())/1000);
	var json={
        tag:tag,
        time:time,
        level:'w',
        msg:msg
    };
	this.sendMsg(JSON.stringify(json));
}

udpLog.e=function(tag,msg){
    var time=parseInt((new Date().getTime())/1000);
	var json={
        tag:tag,
        time:time,
        level:'e',
        msg:msg
    };
	this.sendMsg(JSON.stringify(json));
}

udpLog.se=function(msg){
    var time=parseInt((new Date().getTime())/1000);
    let tag=this.logId;
	var json={
        tag:tag,
        time:time,
        level:'e',
        msg:msg
    };
	this.sendMsg(JSON.stringify(json));
}

udpLog.sw=function(msg){
    var time=parseInt((new Date().getTime())/1000);
    let tag=this.logId;
	var json={
        tag:tag,
        time:time,
        level:'w',
        msg:msg
    };
	this.sendMsg(JSON.stringify(json));
}

udpLog.sd=function(msg){
    var time=parseInt((new Date().getTime())/1000);
    let tag=this.logId;
	var json={
        tag:tag,
        time:time,
        level:'d',
        msg:msg
    };
	this.sendMsg(JSON.stringify(json));
}

udpLog.si=function(msg){
    var time=parseInt((new Date().getTime())/1000);
    let tag=this.logId;
	var json={
        tag:tag,
        time:time,
        level:'i',
        msg:msg
    };
	this.sendMsg(JSON.stringify(json));
}

module.exports=udpLog
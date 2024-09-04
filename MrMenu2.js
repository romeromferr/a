window.o2 = WebSocket.prototype.send;
window.webSocket.prototype.send = function(args) 
{
    if(args.startsWith('42[4,21'))
    {
      console.log(args);
    }
    return window.o2.call(this,args);
}

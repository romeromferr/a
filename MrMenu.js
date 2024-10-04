//MenuPopupKey
function toggleVisibility() 
{
    const menu = document.querySelector('.MrMenuUI');
    const visible = window.getComputedStyle(menu).visibility === 'visible';

    menu.style.visibility = visible ? 'hidden' : 'visible';
    menu.style.opacity = visible ? '0' : '1';
    menu.style.zIndex = visible ? '-100' : '100';
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Delete') {
        toggleVisibility();
    }
});

//Menu open UI right
const items = document.querySelectorAll('button.menu-button');

items.forEach(item => {
  item.addEventListener('click', () => {
    const targetTab = item.getAttribute('data-tab');
    const contents = document.querySelectorAll('div.MrMenuUI > div.content > div');

    items.forEach(btn => btn.classList.remove('active'));

    contents.forEach(content => {
      const contentTab = content.getAttribute('data-tab');

      if (contentTab === targetTab) {
        content.style.display = 'block';
        item.classList.add('active');
      } else {
        content.style.display = 'none';
      }
    });
  });
});

//WebSocket

const originalSend = WebSocket.prototype.send;
let getWS = null;

WebSocket.prototype.send = function (...args) 
{
    if (this.url.includes('socket.io')) {
        getWS = this; 

        //console.log('Mensagem enviada:', args[0]);

        const originalOnMessage = this.onmessage;

        this.onmessage = function (event) {
            //console.log('Mensagem recebida:', event.data);
            if (originalOnMessage) {
                originalOnMessage.call(this, event);
            }
        };

        const originalOnClose = this.onclose;
        this.onclose = function () {
            //console.log('WebSocket fechado');
            getWS = null; 
            if (originalOnClose) {
                originalOnClose.call(this);
            }
        };
    }

    return originalSend.apply(this, args);
};



//XP involker
let intervalOBJ;
let delay = 6000;
const MrXPrun = document.querySelector('button#MrXPrun');
const MrXPstop = document.querySelector('button#MrXPstop');

function giveXP() 
{
  if (getWS) 
  {
    getWS.send(`42[38]`);
  } 
}

MrXPrun.addEventListener('click', function() 
{
    if (!intervalOBJ) 
    {
        intervalId = setInterval(giveXP, delay);
    }
});

MrXPstop.addEventListener('click', function() 
{
    clearInterval(intervalOBJ);
    intervalOBJ = null;
});



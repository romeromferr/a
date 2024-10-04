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

const renderer = document.querySelector('div#gamerenderer');
const GamePlay = renderer && window.getComputedStyle(renderer).visibility === 'visible';
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
  if (getWS && GamePlay) 
  {
    getWS.send(`42[38]`);
  } 
}

MrXPrun.addEventListener('click', function() 
{
    if (!intervalOBJ) 
    {
        intervalOBJ = setInterval(giveXP, delay);
    }
});

MrXPstop.addEventListener('click', function() 
{
    if (intervalOBJ) 
    { 
        clearInterval(intervalOBJ);
        intervalOBJ = null;
    }
});

////////////////////////////IPlogger
const MrIPEnable = document.querySelector('button#MrIPEnable');
const MrIPDisable = document.querySelector('button#MrIPDisable');
const roomexit = document.querySelector('div#leaveconfirmwindow_okbutton');
const nicknames = {};

function addPlayer(ip) {
    let nicksElement = document.querySelectorAll('div.newbonklobby_playerentry_name');

    nicksElement.forEach(element => {
        const nickname = element.innerHTML;

        if (!nicknames[nickname]) {
            nicknames[nickname] = {};
        }

        if (!nicknames[nickname][ip]) {
            nicknames[nickname][ip] = 0;
        }
        nicknames[nickname][ip]++;
    });

    updateNicknameList();
}

function updateNicknameList() {
    const nicknameListDiv = document.getElementById('nickname-list');
    nicknameListDiv.innerHTML = '';

    for (const nickname in nicknames) {
        const nicknameDiv = document.createElement('div');
        nicknameDiv.classList.add('nickname');

        const ipListWithTags = Object.keys(nicknames[nickname]).map(ip => {
            return `<span class="ip">${ip} <span class="tag">(${nicknames[nickname][ip]})</span></span>`;
        }).join(', ');

        nicknameDiv.innerHTML = `<strong>${nickname}</strong>: ${ipListWithTags}`;
        nicknameListDiv.appendChild(nicknameDiv);
    }
}

MrIPEnable.addEventListener('click', function() {
    RTCPeerConnection.prototype.addIceCandidate2 = RTCPeerConnection.prototype.addIceCandidate;

    RTCPeerConnection.prototype.addIceCandidate = function(...args) {
        const ip = args[0].address;
        if (!ip.includes(".local")) {
            addPlayer(ip);
        }
        this.addIceCandidate2(...args);
    };
});

MrIPDisable.addEventListener('click', function() {
    RTCPeerConnection.prototype.addIceCandidate = RTCPeerConnection.prototype.addIceCandidate2;
});

roomexit.addEventListener('click', function() {
    for (const nickname in nicknames) {
        delete nicknames[nickname];
    }
    document.getElementById('nickname-list').innerHTML = '';
});



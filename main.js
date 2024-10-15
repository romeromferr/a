let UICSS = 
`
@import url('https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400..700;1,400..700&display=swap');
div#MrMenu 
{
    background-color: #1f1f1f;
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 80%;
    transform: translate(-50%, -50%);
    user-select: none;
    box-sizing: border-box;
    font-family: 'Arimo';
    color: white;
}


div#MrMenu .sidebar 
{
    background-color: #252525;
    width: 220px;!;!i;!im;!imp;!impo;!impor;!impo;!imp;!im;!i;!;!o;!om;!o;!;!;
    height: 100%;
    overflow-x: auto;
}

div#MrMenu .sidebar ul {
    list-style: none;
    padding: 12px;
}

div#MrMenu .sidebar li 
{
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 8px;
  text-align: center;
  transition: background-color 0.3s, color 0.3s;
}

div#MrMenu .sidebar li:hover 
{
      background-color: #333;
}

div#MrMenu .content 
{
  display: flex;
  width: calc(100% - 220px);
  padding: 20px;
  overflow-y: auto;
  position: relative;
}

div#MrMenu .content .tab 
{
  display: none;
}

div#MrMenu .content .tab.active 
{
  display: block;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  padding-right: 10px
}

div#MrMenu .content .row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
}

div#MrMenu .content .info 
{
  flex-basis: 50%;
  max-width: 50%;
  color: #cccccc;
}

div#MrMenu .content label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  font-size: 17px;
}

div#MrMenu .content p 
{
  font-size: 12px;
  color: #aaa;
  margin-top: 5px;
}

.action {
  flex-basis: 45%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}


div#MrMenu .content input[type="text"], button 
{
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #555;
  background-color: #333;
  color: white;
  transition: background-color 0.3s, border-color 0.3s;
}

 button:not(last-child)
{
    margin-right: 5px;
}

input[type="text"]:focus, button:focus
{
  outline: none;
}

div#MrMenu .content input[type="range"]
{
  appearance: none;
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #555;
  background-color: #333;
  color: white;
  transition: background-color 0.3s, border-color 0.3s;

}
`;
function addCSS(ID, cssString, replace = false)
{
    let styleElement = document.getElementById(ID);

    if (styleElement) {
        if (replace) {
            styleElement.innerHTML = cssString;
        } else {
            styleElement.innerHTML += `\n${cssString}`;
        }
    } else {
        styleElement = document.createElement('style');
        styleElement.id = ID;
        styleElement.innerHTML = cssString;
        document.head.appendChild(styleElement);
    }
}
class Component 
{
    constructor(htmlString) {
        this.htmlString = htmlString;
    }

    create() {
        const parser = new DOMParser();
        const doc = parser.parseFromString(this.htmlString, 'text/html');
        return doc.body.firstChild;
    }

    render(container) {
        const element = this.create();
        container.appendChild(element);
        return element; 
    }
}

class MrMenuUIComponent extends Component {
    constructor() {
        super(`
        <div id="MrMenu">
          <div class="sidebar">
            <ul>
                <li data-tab="tab1" class="active">UI TEST</li>
                <li data-tab="tab2">Host Manager</li>
                <li data-tab="tab3">Tab 3</li>
                <li data-tab="tab4">Tab 4</li>
            </ul>
          </div>
        <div>
        `);
    }

    render(container) {
        const element = super.render(container);
    }
}

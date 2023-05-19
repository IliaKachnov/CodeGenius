document.addEventListener('click', documentActions);

function documentActions(e) {
  const targetElement = e.target;

  if(targetElement.closest('.icon-menu')) {
    document.documentElement.classList.toggle('menu-open')
  }

  if(targetElement.closest('[data-goto]')) {
    document.documentElement.classList.contains('menu-open') ?
      document.documentElement.classList.remove('menu-open') : null;


    const goTo = targetElement.closest('[data-goto]').dataset.goto;
    const goToElement = document.querySelector(goTo);
    const headerHeight = document.querySelector('.header').offsetHeight;

    if (goToElement) {
      window.scrollTo({
        top: goToElement.offsetTop - (headerHeight + 15),
        behavior: 'smooth'
      })
    }
    e.preventDefault();
  }
}


let {                       
  EditorState,                 
  EditorView,
  keymap,                      
  history,                     
  redo,
  redoSelection,               
  undo,
  undoSelection,
  lineNumbers,                 
  baseKeymap,
  indentSelection,             
  legacyMode,
  legacyModes: { javascript },
  matchBrackets,
  specialChars,
  multipleSelections           
} = CodeMirror;

let mode = legacyMode({mode: javascript({indentUnit: 2}, {})})

let isMac = /Mac/.test(navigator.platform)
let state = EditorState.create({doc: `const reverseString = function(s) {
    
};`, extensions: [            
  lineNumbers(),               
  history(),                   
  specialChars(),              
  multipleSelections(),        
  mode,
  matchBrackets(),
  keymap({
    "Mod-z": undo,             
    "Mod-Shift-z": redo,       
    "Mod-u": view => undoSelection(view) || true, 
    [isMac ? "Mod-Shift-u" : "Alt-u"]: redoSelection,
    "Ctrl-y": isMac ? undefined : redo,
    "Shift-Tab": indentSelection    
  }),
  keymap(baseKeymap),
]})

let view = new EditorView({state})
document.querySelector("#editor").appendChild(view.dom)

const myDiv = document.querySelector('.codemirror-content');
const info = myDiv.textContent;

const data = {
  content: info
};

const jsonData = JSON.stringify(data);
const loading = document.querySelector('.loading');
const taskContainer = document.querySelector('.task__container')


function sendRequest(url,method,jsonData) {
  const xhr = new XMLHttpRequest();
  const json = JSON.stringify(jsonData);
  xhr.open(method, url, true)
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  loading.classList.remove('show-loader');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      const status = xhr.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        
        loading.classList.add('show-loader');
        taskContainer.classList.add('completed')
      }else{
    
        loading.classList.add('show-loader');
        taskContainer.classList.add('failed')
      }
    }
  };
  xhr.send(json);
};

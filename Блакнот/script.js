/* app.js */

// --- күй & әдепкі шаблондар ---
const DEFAULTS = {
  html: `<!doctype html>
<html lang="kk">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Құжат</title>
</head>
<body>
  <h1>Сәлем әлем</h1>
</body>
</html>`,
  css: `body{font-family:Inter, Arial, sans-serif;margin:20px}h1{color:#2b6cb0}`,
  js: `console.log('дайын')`
}

const TEMPLATES = {
  empty: {
    html: '<!doctype html>\n<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body></body></html>',
    css:'',
    js:''
  },
  starter: {html: DEFAULTS.html, css: DEFAULTS.css, js: DEFAULTS.js},
  bootstrap: {
    html: '<!doctype html>\n<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">\n<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">\n</head><body>\n<div class="container mt-4"><button class="btn btn-primary">Bootstrap батырма</button></div>\n</body></html>',
    css:'',
    js:''
  },
  flexbox: {
    html: '<div class="wrap"><div class="card">A</div><div class="card">B</div></div>',
    css: '.wrap{display:flex;gap:12px}.card{background:#f3f4f6;padding:24px;border-radius:8px}',
    js:''
  }
};


// --- ACE редакторларын іске қосу ---
const aceHtml = ace.edit('ace-html');
aceHtml.session.setMode('ace/mode/html');
aceHtml.setOptions({enableBasicAutocompletion:true, enableLiveAutocompletion:true, fontSize:'14px'});

const aceCss = ace.edit('ace-css');
aceCss.session.setMode('ace/mode/css');
aceCss.setOptions({enableBasicAutocompletion:true, enableLiveAutocompletion:true, fontSize:'14px'});

const aceJs = ace.edit('ace-js');
aceJs.session.setMode('ace/mode/javascript');
aceJs.setOptions({enableBasicAutocompletion:true, enableLiveAutocompletion:true, fontSize:'14px'});


// --- жергілікті сақтау ---
function loadState(){
  const saved = JSON.parse(localStorage.getItem('pro-compiler-v1')||'{}');
  aceHtml.setValue(saved.html || DEFAULTS.html, -1);
  aceCss.setValue(saved.css || DEFAULTS.css, -1);
  aceJs.setValue(saved.js || DEFAULTS.js, -1);
}
loadState();


// --- табтар ---
document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click', e=>{
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  e.currentTarget.classList.add('active');

  const target = e.currentTarget.dataset.target;
  document.getElementById('editor-html').style.display = target==='html'? 'flex':'none';
  document.getElementById('editor-css').style.display = target==='css'? 'flex':'none';
  document.getElementById('editor-js').style.display = target==='js'? 'flex':'none';
}));


// --- iframe & консоль ---
const iframe = document.getElementById('result');
const consoleEl = document.getElementById('console');

function clearConsole(){ consoleEl.textContent = ''; }
function appendConsole(msg){
  consoleEl.textContent += msg + '\n';
  consoleEl.scrollTop = consoleEl.scrollHeight;
}

window.addEventListener('message', e=>{
  if(e.data && e.data.__pro_console){
    appendConsole(e.data.__pro_console);
  }
});


// --- preview құрастыру ---
function buildPreview(){
  const html = aceHtml.getValue();
  const css = aceCss.getValue();
  const js = aceJs.getValue();

  const wrappedJs = `
(function(){
  ['log','error','warn','info'].forEach(fn=>{
    const original = console[fn];
    console[fn] = function(){
      try{
        parent.postMessage({
          __pro_console: '['+fn+'] ' + Array.from(arguments).map(a=>{
            try{return typeof a==='object'?JSON.stringify(a):String(a)}
            catch(e){return String(a)}
          }).join(' ')
        }, '*');
      }catch(e){}
      original.apply(console, arguments);
    }
  });
})();
` + js;

  const src = `
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>${css}</style>
</head>
<body>
${html}
<script>${wrappedJs}</script>
</body>
</html>`;

  iframe.srcdoc = src;
}


// --- іске қосу ---
document.getElementById('runBtn').addEventListener('click', ()=>{
  clearConsole();
  buildPreview();
  saveState();
});


// --- auto-preview (debounce) ---
let timer = null;
[aceHtml, aceCss, aceJs].forEach(ed=>ed.session.on('change', ()=>{
  if(timer) clearTimeout(timer);
  timer = setTimeout(()=>{ buildPreview(); }, 700);
}));


// --- сақтау ---
function saveState(){
  const payload = {
    html: aceHtml.getValue(),
    css: aceCss.getValue(),
    js: aceJs.getValue()
  };
  localStorage.setItem('pro-compiler-v1', JSON.stringify(payload));
  appendConsole('[system] Жергілікті сақталды');
}
document.getElementById('saveBtn').addEventListener('click', saveState);


// --- бастапқыға қайтару ---
document.getElementById('resetBtn').addEventListener('click', ()=>{
  if(!confirm('Бастапқыға қайтару?')) return;

  aceHtml.setValue(DEFAULTS.html, -1);
  aceCss.setValue(DEFAULTS.css, -1);
  aceJs.setValue(DEFAULTS.js, -1);

  buildPreview();
  appendConsole('[system] Әдепкіге қайтарылды');
});


// --- zip экспорт ---
document.getElementById('downloadBtn').addEventListener('click', async ()=>{
  const zip = new JSZip();
  zip.file('index.html', aceHtml.getValue());
  zip.file('styles.css', aceCss.getValue());
  zip.file('app.js', aceJs.getValue());

  const content = await zip.generateAsync({type:'blob'});
  saveAs(content, 'project.zip');

  appendConsole('[system] project.zip дайын');
});


// --- үлгілер ---
document.querySelectorAll('[data-template]').forEach(b=>b.addEventListener('click', e=>{
  const key = e.currentTarget.dataset.template;
  const t = TEMPLATES[key];
  if(!t) return;

  aceHtml.setValue(t.html || '', -1);
  aceCss.setValue(t.css || '', -1);
  aceJs.setValue(t.js || '', -1);

  buildPreview();
  appendConsole(`[system] Үлгі жүктелді: ${key}`);
}));


// --- тапсырма тексеру ---
document.querySelectorAll('.task-run').forEach(b=>b.addEventListener('click', e=>{
  const t = e.currentTarget.dataset.check;

  buildPreview();

  setTimeout(()=>{
    try{
      const doc = iframe.contentDocument;
      let ok = false;

      if(t==='task1'){
        ok = !!doc.getElementById('btn');
      }

      if(t==='task2'){
        const el = doc.querySelector('.box');
        if(el){
          const rect = el.getBoundingClientRect();
          ok = rect.width>=140 && rect.height>=140;
        }
      }

      appendConsole(`[task-check] ${t} => ${ok? 'PASS':'FAIL'}`);
      alert(ok ? 'Өттің! ✅' : 'Қате ❌');

    }catch(err){
      appendConsole('[task-check] қате: '+err.message);
      alert('Тексеру мүмкін емес');
    }
  }, 300);

}));


// --- редактор тақырыбы ---
document.getElementById('themeSelect').addEventListener('change', e=>{
  const theme = e.target.value;
  aceHtml.setTheme(theme);
  aceCss.setTheme(theme);
  aceJs.setTheme(theme);
});


// --- viewport ---
document.getElementById('viewportSize').addEventListener('change', e=>{
  const v = e.target.value;
  if(v==='100%'){
    iframe.style.width='100%';
    iframe.style.height='100%';
    iframe.style.maxWidth='none';
  } else {
    iframe.style.width=v+'px';
    iframe.style.maxWidth='100%';
    iframe.style.height='800px';
  }
});


// --- пернелер ---
window.addEventListener('keydown', e=>{
  if((e.ctrlKey||e.metaKey) && e.key==='s'){
    e.preventDefault();
    saveState();
  }
  if((e.ctrlKey||e.metaKey) && e.key==='Enter'){
    e.preventDefault();
    clearConsole();
    buildPreview();
    saveState();
  }
});


// --- форматтау ---
function beautifyAll(){
  try{
    aceHtml.setValue(html_beautify(aceHtml.getValue()), -1);
    aceCss.setValue(css_beautify(aceCss.getValue()), -1);
    aceJs.setValue(js_beautify(aceJs.getValue()), -1);
    appendConsole('[system] Код форматталды');
  }catch(e){
    appendConsole('[system] Форматтау қате: '+e.message);
  }
}
document.getElementById('exitBtn').addEventListener('click', function() {
    // Пайдаланушыны басты бетке қайта бағыттау
    window.location.href = '../Платформа/index.html';
});

// --- соңғы жүктеу ---
beautifyAll();
buildPreview();
appendConsole('[system] Жоба іске қосылды');

/* ---------- ritgerð: undirbúningur fyrir bókadóm sem er skrifaður í tíma án glósna ---------- */
const RG = { sub: store.get('rg:sub', 'task'), end: 0, iv: 0, dur: store.get('rg:dur', 40) };
const rgT = (is, en) => L === 'is' ? is : en;
const rgGet = k => store.get('rg:' + k, '');
const rgSet = (k, v) => store.set('rg:' + k, v);
const rgWords = s => (String(s || '').trim().match(/[A-Za-zÀ-ÿ0-9’'-]+/g) || []).length;
const RG_LINK = ['firstly', 'first of all', 'to begin with', 'secondly', 'thirdly', 'finally', 'lastly', 'moreover', 'furthermore', 'in addition', 'additionally', 'besides', 'however', 'on the other hand', 'nevertheless', 'nonetheless', 'although', 'even though', 'despite', 'in spite of', 'while', 'similarly', 'likewise', 'in the same way', 'therefore', 'consequently', 'as a result', 'for this reason', 'for example', 'for instance', 'in conclusion', 'to conclude', 'to sum up', 'in summary', 'in short', 'all in all', 'in light of', 'in other words', 'most importantly', 'equally important', 'above all', 'of course', 'in fact', 'obviously', 'thus', 'hence', 'also', 'another', 'last but not least'];
function rgCss() {
  if (document.getElementById('rgcss')) return;
  const st = document.createElement('style'); st.id = 'rgcss';
  st.textContent = `
.rg{max-width:1080px;margin:0 auto;padding:26px 22px 70px}
@media(max-width:760px){.nav{overflow-x:auto;scrollbar-width:none}.nav::-webkit-scrollbar{display:none}.nav button{flex:1 0 auto;padding-left:10px;padding-right:10px}}
.rg h1{font:700 clamp(30px,5vw,52px)/1 var(--f-head);text-transform:uppercase;margin:0 0 10px;letter-spacing:-.01em}
.rg h1 span{color:var(--red)}
.rg .lead{font:18px/1.6 var(--f-text);max-width:72ch;margin:0 0 22px;color:var(--ink)}
.rg h2{font:700 26px/1.05 var(--f-head);text-transform:uppercase;margin:34px 0 12px}
.rg h3{font:700 18px/1.15 var(--f-head);text-transform:uppercase;letter-spacing:.04em;margin:0 0 8px}
.rg p,.rg li{font:17px/1.6 var(--f-text)}
.rg ul,.rg ol{padding-left:22px;margin:0 0 12px}
.rg li{margin:0 0 6px}
.rgsub{display:flex;flex-wrap:wrap;border:3px solid var(--line);margin:0 0 26px;background:var(--paper)}
.rgsub button{flex:1 1 auto;background:none;border:0;border-right:3px solid var(--line);padding:14px 16px;font:600 14px/1 var(--f-head);letter-spacing:.1em;text-transform:uppercase;cursor:pointer}
.rgsub button:last-child{border-right:0}
.rgsub button i{font-style:normal;font-family:var(--f-mono);color:var(--red);margin-right:6px}
.rgsub button[aria-pressed="true"]{background:var(--ink);color:var(--bg)}
.rgsub button[aria-pressed="true"] i{color:var(--bg)}
@media(max-width:700px){.rgsub button{flex:1 1 50%;border-bottom:3px solid var(--line)}}
.rgbox{border:3px solid var(--line);background:var(--paper);padding:18px 20px;margin:0 0 18px}
.rgbox.red{border-left:10px solid var(--red)}
.rggrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;margin:0 0 18px}
.rggrid .rgbox{margin:0}
.rghour{display:grid;gap:6px;margin:0 0 20px}
.rghour div{border:3px solid var(--line);background:var(--paper);padding:10px 16px;font:16px/1.45 var(--f-text);margin:0 auto}
.rghour b{font:700 14px/1.2 var(--f-head);letter-spacing:.1em;text-transform:uppercase;display:block;color:var(--red)}
.rgchk{list-style:none;padding:0}
.rgchk li{display:flex;gap:10px;align-items:flex-start}
.rgchk input{width:20px;height:20px;margin-top:4px;accent-color:var(--red);flex:none}
.rgangle{border:3px solid var(--line);background:var(--paper);margin:0 0 16px}
.rgangle>summary{cursor:pointer;padding:14px 18px;font:700 20px/1.1 var(--f-head);text-transform:uppercase;list-style:none;display:flex;justify-content:space-between;gap:10px}
.rgangle>summary::after{content:"+";color:var(--red)}
.rgangle[open]>summary::after{content:"−"}
.rgangle>summary small{font:400 14px/1.3 var(--f-text);text-transform:none;color:var(--muted);display:block;margin-top:4px}
.rgangle .in{padding:0 18px 16px;border-top:2px solid var(--line)}
.rgpc{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:14px 0}
@media(max-width:700px){.rgpc{grid-template-columns:1fr}}
.rgpc>div{border:2px solid var(--line);padding:10px 14px}
.rgpc h4{margin:0 0 6px;font:700 14px/1 var(--f-head);letter-spacing:.12em;text-transform:uppercase}
.rgpc .pro h4{color:#2d7a3e}.rgpc .con h4{color:var(--red)}
.rgev{list-style:none;padding:0}
.rgev li{display:flex;gap:10px;align-items:baseline;border-bottom:1px dashed var(--soft);padding:6px 0;margin:0}
.rgev button{flex:none;background:var(--ink);color:var(--bg);border:0;padding:4px 8px;font:400 12px/1 var(--f-mono);cursor:pointer}
.rgev button:hover{background:var(--red)}
.rgq{font-style:italic}
.rgquote{display:grid;grid-template-columns:auto 1fr;gap:6px 14px;align-items:baseline}
.rgquote button{background:none;border:1.5px solid var(--line);padding:3px 6px;font:400 12px/1 var(--f-mono);cursor:pointer}
.rgquote q{font:italic 17px/1.5 var(--f-text)}
.rgquote span{grid-column:2;font:15px/1.45 var(--f-text);color:var(--muted);margin:-4px 0 8px}
.rgf{margin:0 0 16px}
.rgf label{display:block;font:600 13px/1.2 var(--f-head);letter-spacing:.12em;text-transform:uppercase;margin:0 0 4px}
.rgf label small{font:400 14px/1.3 var(--f-text);letter-spacing:0;text-transform:none;color:var(--muted);display:block;margin-top:2px}
.rg textarea,.rg input[type=text]{width:100%;background:var(--bg);color:var(--ink);border:2px solid var(--line);padding:9px 11px;font:17px/1.5 var(--f-text);resize:vertical}
.rg textarea:focus,.rg input[type=text]:focus{outline:3px solid var(--red);outline-offset:0}
.rgpara{border:3px solid var(--line);background:var(--paper);padding:14px 18px 4px;margin:0 0 18px}
.rgpara>h3{display:flex;justify-content:space-between;gap:10px}
.rgpara>h3 span{font:400 13px/1.2 var(--f-mono);color:var(--muted);text-transform:none;letter-spacing:0}
.rgwarn{font:15px/1.45 var(--f-text);color:var(--red);margin:-8px 0 14px}
.rgok{font:15px/1.45 var(--f-text);color:#2d7a3e;margin:-8px 0 14px}
.rgbtn{background:var(--ink);color:var(--bg);border:3px solid var(--line);padding:12px 18px;font:600 14px/1 var(--f-head);letter-spacing:.1em;text-transform:uppercase;cursor:pointer;margin:0 8px 8px 0}
.rgbtn.alt{background:var(--paper);color:var(--ink)}
.rgbtn:hover{background:var(--red);color:#fff;border-color:var(--red)}
.rgwords{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
.rgwords>div{border:2px solid var(--line);background:var(--paper);padding:10px 14px}
.rgwords h4{margin:0 0 6px;font:700 13px/1.2 var(--f-head);letter-spacing:.12em;text-transform:uppercase;color:var(--red)}
.rgwords p{margin:0;font:16px/1.55 var(--f-text)}
.rgtimer{display:flex;flex-wrap:wrap;align-items:center;gap:12px;border:3px solid var(--line);background:var(--paper);padding:12px 16px;margin:0 0 14px;position:sticky;top:calc(var(--hh,52px) + 6px);z-index:5}
.rgtimer .clock{font:700 34px/1 var(--f-mono);min-width:110px}
.rgtimer .clock.low{color:var(--red)}
.rgtimer .wc{font:600 15px/1.2 var(--f-head);letter-spacing:.06em}
.rgtimer .wc b{font-size:22px}
.rgtimer select{font:15px var(--f-head);padding:6px;background:var(--bg);color:var(--ink);border:2px solid var(--line)}
.rgessay{min-height:60vh;font:calc(var(--fs) * .95)/1.7 var(--f-text) !important;tab-size:4}
.rgres li.ok::marker{content:"✓  ";color:#2d7a3e}
.rgres li.no::marker{content:"✗  ";color:var(--red)}
.rgres li.hm::marker{content:"?  ";color:#b07a00}
.rgmem{display:grid;gap:12px}
.rgmem .ans{display:none;font:16px/1.5 var(--f-text);border-left:6px solid var(--red);padding:6px 12px;margin-top:6px;background:var(--bg)}
.rgmem .show .ans{display:block}
.rgbar{height:10px;border:2px solid var(--line);background:var(--bg);margin:6px 0 0}
.rgbar i{display:block;height:100%;background:var(--red)}
.rgtbl{width:100%;border-collapse:collapse;font:16px/1.45 var(--f-text);margin:0 0 16px}
.rgtbl th,.rgtbl td{border:2px solid var(--line);padding:8px 10px;text-align:left;vertical-align:top}
.rgtbl th{font:600 13px/1.2 var(--f-head);letter-spacing:.1em;text-transform:uppercase;background:var(--panel)}

.rgess-pick{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;margin:0 0 14px}
.rgess-pick button{text-align:left;background:var(--paper);border:3px solid var(--line);padding:12px 14px;cursor:pointer;display:flex;flex-direction:column;gap:4px}
.rgess-pick button i{font:700 22px/1 var(--f-head);font-style:normal;color:var(--red)}
.rgess-pick button b{font:700 17px/1.15 var(--f-head);text-transform:uppercase}
.rgess-pick button small{font:14px/1.35 var(--f-text);color:var(--muted)}
.rgess-pick button[aria-pressed="true"]{background:var(--ink);color:var(--bg)}
.rgess-pick button[aria-pressed="true"] small{color:var(--bg);opacity:.8}
.rgess-pick button[aria-pressed="true"] i{color:var(--bg)}
.rgess-bar{display:flex;flex-wrap:wrap;align-items:center;gap:6px 14px;margin:0 0 8px;font:15px/1.4 var(--f-text);color:var(--muted)}
.rglegend{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 12px;font:13px/1.2 var(--f-head);letter-spacing:.04em}
.rglegend>span{padding:4px 8px;border:1px solid var(--soft)}
.rgessay-view{background:var(--paper);border:3px solid var(--line);padding:22px 26px;margin:0 0 18px}
.rgessay-view h3{font:700 22px/1.15 var(--f-head);text-transform:none;letter-spacing:0;margin:0 0 12px}
.rgessay-view p{font:calc(var(--fs) * .95)/1.75 var(--f-text);margin:0}
.rgessay-view p.ind{text-indent:2.2em}
.rgessay-view.struct p{margin:0 0 14px;position:relative}
.rgessay-view .pn{position:absolute;left:-22px;top:2px;font:700 13px/1 var(--f-mono);font-style:normal;color:var(--red)}
.struct .sg,.rglegend .sg{border-radius:3px;padding:1px 2px;box-decoration-break:clone;-webkit-box-decoration-break:clone}
.sg.hook{background:rgba(70,120,220,.18)}.sg.disc{background:rgba(140,140,140,.16)}.sg.thesis{background:rgba(193,18,31,.18);box-shadow:inset 0 -2px 0 var(--red)}
.sg.topic{background:rgba(230,170,0,.25);font-weight:700}.sg.sup{background:transparent}.sg.close{background:rgba(45,122,62,.18);font-style:italic}
.sg.restate{background:rgba(193,18,31,.12);box-shadow:inset 0 -2px 0 var(--red)}.sg.wide{background:rgba(70,120,220,.14)}
.rglegend .sg.sup{border:1px dashed var(--soft)}
b.lk{font-weight:700;color:#2d7a3e;text-decoration:underline 2px;text-underline-offset:3px}
b.ct{background:rgba(193,18,31,.25);color:inherit}b.it{background:rgba(230,170,0,.35)}b.rt{background:rgba(240,120,0,.3)}
.rgqp{display:grid;grid-template-columns:1fr 1fr;gap:0 14px}.rgqp>div:first-child{grid-column:1/-1}
@media(max-width:700px){.rgqp{grid-template-columns:1fr}}
.rgpace{flex:1 1 100%;display:flex;position:relative;border:2px solid var(--line);height:26px;font:600 11px/22px var(--f-head);letter-spacing:.04em;text-transform:uppercase;overflow:hidden}
.rgpace span{border-right:1px solid var(--line);text-align:center;white-space:nowrap;overflow:hidden;background:var(--bg)}
.rgpace span:nth-child(odd){background:var(--panel)}
.rgpace i{position:absolute;top:0;bottom:0;width:3px;background:var(--red);display:none}
.rgpacemsg{flex:1 1 100%;font:15px/1.4 var(--f-text)}
.rgwrite{display:grid;grid-template-columns:1fr 290px;gap:16px;align-items:start}
@media(max-width:900px){.rgwrite{grid-template-columns:1fr}.rgside{position:static}.rgpacemsg{font-size:13px}}
.rgside{position:sticky;top:calc(var(--hh,52px) + 165px)}
.rgside h4{margin:0 0 6px;font:700 13px/1.2 var(--f-head);letter-spacing:.12em;text-transform:uppercase}
.rgqpshow{border:2px solid var(--line);background:var(--paper);padding:10px 12px;margin:0 0 10px}
.rgqpshow:empty{display:none}
.rgqpshow ol{margin:0;padding-left:20px}.rgqpshow li{font:14px/1.4 var(--f-text);margin:0 0 3px}
.rgmap{border:2px solid var(--line);background:var(--paper);padding:10px 12px}
.pm{border-left:5px solid var(--soft);padding:4px 8px;margin:0 0 6px}
.pm b{display:block;font:600 13px/1.2 var(--f-head);letter-spacing:.06em;text-transform:uppercase}
.pm span{font:12px/1.3 var(--f-mono);color:var(--muted)}
.pm small{display:block;font:13px/1.35 var(--f-text);color:var(--muted)}
.pm.ok{border-color:#2d7a3e}.pm.ok small{color:#2d7a3e}.pm.warn{border-color:var(--red)}.pm.warn small{color:var(--red)}.pm.cur{border-color:#b07a00}
.pm.empty{opacity:.5}
.pb{height:5px;background:var(--bg);margin:3px 0}.pb i{display:block;height:100%;background:var(--ink)}
.rghint p{border:2px solid var(--red);border-left-width:8px;background:var(--paper);padding:10px 12px;font:15px/1.5 var(--f-text);margin:10px 0 0}
.rglv{display:grid;grid-template-columns:auto repeat(3,1fr);gap:10px;margin:0 0 14px}
@media(max-width:800px){.rglv{grid-template-columns:1fr 1fr}}
.rglv button{text-align:left;background:var(--paper);border:3px solid var(--line);padding:10px 12px;cursor:pointer;display:flex;flex-direction:column;gap:4px}
.rglv button b{font:700 17px/1.1 var(--f-head);text-transform:uppercase}
.rglv button small{font:13px/1.35 var(--f-text);color:var(--muted)}
.rglv button[aria-pressed="true"]{background:var(--ink);color:var(--bg)}.rglv button[aria-pressed="true"] small{color:var(--bg);opacity:.8}
.rgdots{display:inline-flex;gap:3px;vertical-align:middle}.rgdots i{width:10px;height:10px;border:2px solid currentColor;border-radius:50%;display:block}.rgdots i.on{background:var(--red);border-color:var(--red)}
.rgess-pick .etop{display:flex;justify-content:space-between;align-items:center}
.rgess-pick em{font:600 11px/1 var(--f-head);font-style:normal;letter-spacing:.1em;text-transform:uppercase;padding:3px 6px;border:1.5px solid currentColor}
.rgess-pick em.sd-read{color:#2d7a3e}.rgess-pick em.sd-avoid{color:var(--red)}
.rgess-pick button[aria-pressed="true"] em{color:var(--bg)}
.rgmode{display:inline-flex;flex-wrap:wrap;border:2px solid var(--line);margin:4px 0 10px}
.rgmode button{background:var(--paper);border:0;border-right:2px solid var(--line);padding:9px 12px;font:600 13px/1 var(--f-head);letter-spacing:.06em;text-transform:uppercase;cursor:pointer}
.rgmode button:last-child{border-right:0}.rgmode button[aria-pressed="true"]{background:var(--ink);color:var(--bg)}
.sg.dim{color:var(--muted);font:13px/1 var(--f-mono);background:none!important}
.rgnote{font:15px/1.5 var(--f-text);color:var(--muted);margin:0 0 10px}
.rgup{border:2px solid var(--line);background:var(--paper);padding:12px 16px;margin:0 0 12px}
.rgup small{font:600 12px/1 var(--f-head);letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.rgup p{margin:4px 0 0;font:17px/1.55 var(--f-text)}
.rgup .a{display:none;border-left:6px solid #2d7a3e;padding:6px 12px;margin-top:8px;background:var(--bg)}.rgup.show .a{display:block}
.rgup .b p{color:var(--muted)}
.rgladder{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:0 0 18px}
@media(max-width:800px){.rgladder{grid-template-columns:1fr}}
.rgladder>div{border:3px solid var(--line);background:var(--paper);padding:12px 14px}
.rgladder h4{margin:0 0 8px;font:700 15px/1.2 var(--f-head);letter-spacing:.08em;text-transform:uppercase;display:flex;gap:8px;align-items:center}
.rgladder p{margin:0;font:16px/1.6 var(--f-text)}
.rgaud{border:3px solid var(--line);background:var(--paper);padding:14px 16px;margin:0 0 18px}
.rga-row{display:flex;gap:14px;align-items:center}
.rga-pp{flex:none;width:58px;height:58px;border-radius:50%;border:0;background:var(--red);color:#fff;font:700 22px/1 var(--f-head);cursor:pointer}
.rga-mid{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}
.rga-mid b{font:700 17px/1.1 var(--f-head);text-transform:uppercase;letter-spacing:.04em}
.rga-st{font:14px/1.3 var(--f-text);color:var(--muted);min-height:18px}
.rga-bar{height:6px;background:var(--bg);border:1px solid var(--line)}.rga-bar i{display:block;height:100%;width:0;background:var(--red)}
.rga-opts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:12px 0 0}
.rga-opts .rgmode{margin:0}.rga-opts .rgbtn{margin:0;padding:9px 12px;font-size:13px}
.rga-loop[aria-pressed="true"]{background:var(--ink);color:var(--bg)}
.rga-rate{font:600 13px/1 var(--f-head);letter-spacing:.06em;text-transform:uppercase}.rga-rate select{font:14px var(--f-head);padding:6px;background:var(--bg);color:var(--ink);border:2px solid var(--line)}
.rga-help{font:14px/1.5 var(--f-text);color:var(--muted);margin:10px 0 0}
`;
  document.head.appendChild(st);
}
rgCss();
const rgSubs = () => [['task', rgT('Verkefnið', 'The task')], ['ideas', rgT('Hugmyndir', 'Ideas')], ['samples', rgT('Sýnidæmi', 'Samples')], ['plan', rgT('Áætlunin mín', 'My plan')], ['words', rgT('Orðaforði', 'Vocabulary')], ['drill', rgT('Æfing', 'Practice')]];
function renderRitgerd() {
  rgCss();
  if (!rgSubs().some(s => s[0] === RG.sub)) RG.sub = 'task';
  const nav = `<div class="rgsub" role="toolbar">${rgSubs().map(([k, l], i) => `<button data-rgsub="${k}" aria-pressed="${RG.sub === k}"><i>0${i + 1}</i>${l}</button>`).join('')}</div>`;
  const body = RG.sub === 'ideas' ? rgIdeas() : RG.sub === 'samples' ? rgSamples() : RG.sub === 'plan' ? rgPlan() : RG.sub === 'words' ? rgVocab() : RG.sub === 'drill' ? rgDrill() : rgTask();
  $('#main').innerHTML = `<div class="rg"><h1>${rgT('Bókadómur', 'Book review')} <span>·</span> 1984</h1>
    <p class="lead">${rgT('Hér undirbýrðu ritgerðina sem þú skrifar í tíma, án bókar og án glósna. Ritgerðina sjálfa skrifar þú, en hér finnurðu kröfurnar, hugmyndir og dæmi úr bókinni, stað til að skipuleggja þín eigin rök og æfingu þar sem þú skrifar á tíma eins og í prófinu.', 'Prepare here for the essay you will write in class, with no book and no notes. You write the essay yourself; here you will find the requirements, ideas and examples from the book, a place to plan your own arguments, and timed practice that works like the real thing.')}</p>
    ${nav}<div id="rgbody">${body}</div></div>${foot()}`;
  $$('[data-rgsub]').forEach(b => b.onclick = () => { RG.sub = b.dataset.rgsub; rgSet('sub', RG.sub); renderRitgerd(); window.scrollTo(0, 0); });
  if (RG.sub === 'plan') rgPlanBind();
  if (RG.sub === 'drill') rgDrillBind();
  if (RG.sub === 'samples') rgSamplesBind();
  $$('.rgchk input[data-k]').forEach(c => { c.checked = !!store.get('rg:c:' + c.dataset.k, false); c.onchange = () => store.set('rg:c:' + c.dataset.k, c.checked); });
  window.scrollTo(0, 0);
}
/* --- 01 verkefnið --- */
function rgTask() {
  const rub = L === 'is' ? [
    ['Inngangur', 'Kveikja sem grípur lesandann, stutt umræða sem leiðir að efninu og endar á EINNI thesis-setningu: á að lesa bókina eða ekki + þrenn rök.'],
    ['Meginmál (3 efnisgreinar)', 'Hver efnisgrein fjallar um ein rök, í sömu röð og í thesis. Byrjar á tengiorði og topic sentence, svo a.m.k. þrjár setningar með dæmum úr bókinni, og endar á closing sentence.'],
    ['Dæmi, ekki endursögn', 'Þú metur bókina (persónur, sögusvið, söguþráð, endi) og styður matið með ákveðnum dæmum. Söguþráðurinn er aldrei endursagður sem slíkur.'],
    ['Lokaorð', 'Tengiorð (In conclusion…), thesis endurorðuð með rökunum þremur, ekkert nýtt, og endað „vítt“ með skilaboðum til lesandans: lesa eða ekki?'],
    ['Málfar', 'Fjölbreytt tengiorð, vandaður orðaforði, formlegt mál (engar styttingar eins og don’t eða it’s), nútíð þegar fjallað er um bókina.'],
    ['Form', '400–500 orð, fimm efnisgreinar, inndregið í byrjun efnisgreina 2–5 og engar auðar línur á milli.']
  ] : [
    ['Introduction', 'A hook that grabs the reader, a short discussion leading to the topic, ending in ONE thesis sentence: should you read the book or not + three arguments.'],
    ['Body (3 paragraphs)', 'Each paragraph covers one argument, in the same order as the thesis. It opens with a linking word and a topic sentence, then at least three sentences with examples from the book, and ends with a closing sentence.'],
    ['Examples, not retelling', 'You evaluate the book (characters, setting, plot, ending) and support your judgement with specific examples. Never retell the storyline as such.'],
    ['Conclusion', 'A linking word (In conclusion…), the thesis restated with the three arguments, nothing new, and a “wide” ending with a message to the reader: read it or not?'],
    ['Language', 'Varied linking words, refined vocabulary, formal style (no contractions like don’t or it’s), present tense when discussing the book.'],
    ['Form', '400–500 words, five paragraphs, indented at the start of paragraphs 2–5 and no empty lines between them.']
  ];
  const plan = L === 'is' ? [
    ['1. Veldu afstöðu', 'Lesa eða sleppa? Það má líka vera „lesa, þrátt fyrir galla“. Kennarinn gefur ekki fyrir afstöðuna heldur fyrir hversu vel hún er rökstudd.'],
    ['2. Veldu þrenn rök', 'Farðu í Hugmyndir og veldu þrjú sjónarhorn. Gott er að hafa eitt mótrök sem þú svarar (t.d. „Although Part Two is slow…“). Það sýnir þroskaða hugsun.'],
    ['3. Fylltu út áætlunina', 'Í Áætlunin mín skrifar þú þína eigin thesis, topic sentences og dæmi. Notaðu þín eigin orð, því þú þarft að muna þau.'],
    ['4. Skrifaðu heila ritgerð heima', 'Skrifaðu hana einu sinni með áætluninni opinni. Lestu hana upphátt og lagaðu.'],
    ['5. Lærðu beinagrindina', 'Ekki læra 450 orð utan að. Lærðu thesis-setninguna orðrétt og 2–4 lykilorð fyrir hverja efnisgrein. Æfðu þig í Æfing → Minnisæfing.'],
    ['6. Skrifaðu á tíma, án glósna', 'Gerðu Æfing → Skrifa á tíma a.m.k. tvisvar áður en þú skrifar í tímanum. Farðu yfir gátlistann eftir hverja tilraun.']
  ] : [
    ['1. Choose your stance', 'Read it or avoid it? It can also be “read it, despite its flaws”. The grade is for how well you argue, not for which side you take.'],
    ['2. Choose three arguments', 'Go to Ideas and pick three angles. It helps to include one counter-argument that you answer (e.g. “Although Part Two is slow…”). That shows mature thinking.'],
    ['3. Fill in the plan', 'In My plan you write your own thesis, topic sentences and examples. Use your own words, because you need to remember them.'],
    ['4. Write a full essay at home', 'Write it once with the plan open. Read it aloud and improve it.'],
    ['5. Learn the skeleton', 'Do not memorise 450 words. Learn the thesis sentence word for word and 2–4 keywords for each paragraph. Practise in Practice → Memory drill.'],
    ['6. Write against the clock, no notes', 'Do Practice → Timed writing at least twice before the real lesson. Go through the checklist after each attempt.']
  ];
  const chk = L === 'is' ? ['Kveikjan grípur athygli (spurning, sláandi staðreynd eða tilvitnun)', 'Thesis er EIN setning með skoðun + þrennum rökum', 'Rökin koma í sömu röð í efnisgreinum 2, 3 og 4', 'Hver efnisgrein byrjar á tengiorði + topic sentence', 'Hver efnisgrein hefur a.m.k. eitt ákveðið dæmi úr bókinni (nafn, staður, atvik)', 'Hver efnisgrein endar á closing sentence', 'Ég endursegi ekki söguþráðinn, ég met hann', 'Lokaorð endurorða thesis og enda á skilaboðum til lesandans', 'Ekkert nýtt kemur fram í lokaorðunum', 'Engar styttingar (don’t, it’s, can’t)', 'Bókin heitir Nineteen Eighty-Four (eða 1984) og höfundurinn George Orwell, rétt stafsett', '400–500 orð, 5 efnisgreinar, inndráttur, engar auðar línur'] : ['The hook grabs attention (a question, a striking fact or a quotation)', 'The thesis is ONE sentence with an opinion + three arguments', 'The arguments come in the same order in paragraphs 2, 3 and 4', 'Each paragraph starts with a linking word + topic sentence', 'Each paragraph has at least one specific example from the book (a name, place or event)', 'Each paragraph ends with a closing sentence', 'I do not retell the plot, I evaluate it', 'The conclusion restates the thesis and ends with a message to the reader', 'Nothing new appears in the conclusion', 'No contractions (don’t, it’s, can’t)', 'The title Nineteen Eighty-Four (or 1984) and the author George Orwell are spelled correctly', '400–500 words, 5 paragraphs, indentation, no empty lines'];
  return `<div class="rgbox red"><h3>${rgT('Verkefnið', 'The assignment')}</h3><p style="margin:0">${rgT('Skrifaðu vel uppbyggðan <b>bókadóm</b> (400–500 orð) um bókina sem þú last, <b>í tíma, án bókar og glósna</b>. Markmiðið er að sannfæra lesandann um að lesa bókina eða sleppa henni.', 'Write a properly structured <b>book review</b> (400–500 words) of the book you read, <b>in class, without the book or notes</b>. The aim is to convince the reader either to read the book or to avoid it.')}</p></div>
  <h2>${rgT('Stundaglasið: fimm efnisgreinar', 'The hourglass: five paragraphs')}</h2>
  <div class="rghour">
    <div style="width:100%"><b>1 · ${rgT('Inngangur', 'Introduction')}</b>${rgT('Byrjar vítt: kveikja sem allir tengja við → þrengist að bókinni → <u>thesis</u>: skoðun + rök A, B og C.', 'Starts wide: a hook everybody can relate to → narrows to the book → <u>thesis</u>: opinion + arguments A, B and C.')}</div>
    <div style="width:74%"><b>2 · ${rgT('Rök A', 'Argument A')}</b>Firstly… + topic sentence → ${rgT('3 setningar með dæmum', '3 sentences with examples')} → closing sentence</div>
    <div style="width:74%"><b>3 · ${rgT('Rök B', 'Argument B')}</b>Secondly / Moreover… → ${rgT('sama uppbygging', 'same structure')}</div>
    <div style="width:74%"><b>4 · ${rgT('Rök C', 'Argument C')}</b>Finally / Lastly… → ${rgT('sama uppbygging', 'same structure')}</div>
    <div style="width:100%"><b>5 · ${rgT('Lokaorð', 'Conclusion')}</b>${rgT('In conclusion… thesis endurorðuð með A, B og C → endar vítt: hvað á lesandinn að gera?', 'In conclusion… the thesis restated with A, B and C → ends wide: what should the reader do?')}</div>
  </div>
  <h2>${rgT('Hvað þarf til að fá 10', 'What it takes to get a 10')}</h2>
  <table class="rgtbl"><thead><tr><th>${rgT('Þáttur', 'Part')}</th><th>${rgT('Það sem kennarinn leitar að', 'What the teacher looks for')}</th></tr></thead><tbody>${rub.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td></tr>`).join('')}</tbody></table>
  <h2>${rgT('Undirbúningurinn skref fyrir skref', 'Preparation step by step')}</h2>
  <div class="rggrid">${plan.map(p => `<div class="rgbox"><h3>${p[0]}</h3><p style="margin:0">${p[1]}</p></div>`).join('')}</div>
  <h2>${rgT('Gátlisti fyrir 10', 'Checklist for a 10')}</h2>
  <div class="rgbox"><ul class="rgchk">${chk.map((c, i) => `<li><input type="checkbox" id="rgc${i}" data-k="t${i}"><label for="rgc${i}">${c}</label></li>`).join('')}</ul></div>
  <div class="rgbox red"><h3>${rgT('Algengustu mistökin', 'The most common mistakes')}</h3><ul style="margin:0">${(L === 'is' ? ['<b>Endursögn.</b> „First Winston buys a diary, then he meets Julia, then…“ er endursögn. Skrifaðu frekar „Orwell makes the reader feel watched from the very first page, for example when…“', '<b>Rök í thesis passa ekki við efnisgreinarnar.</b> Ef thesis nefnir persónur, sögusvið og endi verða efnisgreinarnar að fjalla um nákvæmlega það, í þeirri röð.', '<b>Almennar fullyrðingar án dæma.</b> „The characters are good“ fær lítið. „Winston is believable because he is weak and afraid, like a real person; he even betrays Julia in Room 101“ fær mikið.', '<b>Nýtt efni í lokaorðum.</b> Lokaorðin draga saman. Þar kemur engin ný rök.', '<b>Of stutt eða of löng.</b> Undir 400 orðum vantar dæmi, yfir 500 orðum er farið að endursegja.'] : ['<b>Retelling.</b> “First Winston buys a diary, then he meets Julia, then…” is retelling. Write instead “Orwell makes the reader feel watched from the very first page, for example when…”', '<b>Thesis and paragraphs do not match.</b> If the thesis names characters, setting and ending, the paragraphs must cover exactly those, in that order.', '<b>General claims without examples.</b> “The characters are good” earns little. “Winston is believable because he is weak and afraid, like a real person; he even betrays Julia in Room 101” earns a lot.', '<b>New material in the conclusion.</b> The conclusion sums up. No new arguments appear there.', '<b>Too short or too long.</b> Under 400 words, examples are missing; over 500, you are starting to retell.']).map(x => `<li>${x}</li>`).join('')}</ul></div>`;
}
/* --- 02 hugmyndir --- */
const RG_HOOKS = [
  ['“WAR IS PEACE. FREEDOM IS SLAVERY. IGNORANCE IS STRENGTH.”', { is: 'að þetta séu slagorð Flokksins og að þau virðist rugl, en séu einmitt aðferð hans: Flokkurinn ákveður hvað er satt.', en: 'that these are the Party’s slogans and seem like nonsense, which is exactly the method: the Party decides what is true.' }],
  ['“BIG BROTHER IS WATCHING YOU.”', { is: 'að þetta stendur undir öllum veggspjöldum og að eftirlitið sé alls staðar, líka heima.', en: 'that this is written under every poster and that the watching is everywhere, even at home.' }],
  ['Doubleplusgood.', { is: 'að þetta sé nýmál fyrir „frábært“ og að Flokkurinn sé að eyða orðum.', en: 'that this is Newspeak for “excellent” and that the Party is destroying words.' }],
  ['Ungood.', { is: 'að í nýmáli sé ekkert orð fyrir „bad“; ef orðið hverfur, hverfur hugsunin líka.', en: 'that Newspeak has no word for “bad”; if the word disappears, so does the thought.' }],
  ['Thoughtcrime.', { is: 'að í bókinni sé glæpur að hugsa rangar hugsanir, og hvað það segir um vald Flokksins.', en: 'that in the book it is a crime to think the wrong thoughts, and what that says about the Party’s power.' }],
  ['2 + 2 = 5.', { is: 'að allir viti að þetta sé rangt, en Flokkurinn vill að fólk trúi því.', en: 'that everyone knows it is wrong, but the Party wants people to believe it.' }],
  ['“It was a bright cold day in April, and the clocks were striking thirteen.”', { is: 'að þetta sé fyrsta setning bókarinnar og að eitthvað sé strax að (klukkur slá ekki þrettán).', en: 'that this is the first line of the book and something is wrong at once (clocks do not strike thirteen).' }],
  ['“Who controls the past controls the future.”', { is: 'að Flokkurinn breyti gömlum fréttum og að Winston vinni einmitt við það.', en: 'that the Party changes old news, and that this is exactly Winston’s job.' }],
  ['Room 101.', { is: 'að allir í bókinni óttist þetta herbergi, því þar bíður versti ótti hvers og eins.', en: 'that everyone in the book fears this room, because each person’s worst fear waits there.' }]
];

const RG_ANGLES = [
  { k: 'chars', is: ['Persónurnar', 'Eru þær trúverðugar? Hverjum finnur lesandinn til með?'], en: ['The characters', 'Are they believable? Who does the reader feel for?'],
    q: { is: ['Er Winston hetja eða venjulegur maður? Skiptir það máli?', 'Hvernig er Julia ólík Winston? Gerir það söguna betri?', 'Af hverju er O’Brien svona ógnvekjandi?'], en: ['Is Winston a hero or an ordinary man? Does it matter?', 'How is Julia different from Winston? Does that make the story better?', 'Why is O’Brien so frightening?'] },
    pro: { is: ['Winston er gallaður og hræddur, og þess vegna trúverðugur.', 'Julia er andstæða hans: hagsýn og uppreisnargjörn á sinn hátt.', 'O’Brien er ein eftirminnilegasta ógn bókmenntanna því lesandinn treystir honum líka.'], en: ['Winston is flawed and afraid, which makes him believable.', 'Julia is his opposite: practical and rebellious in her own way.', 'O’Brien is one of literature’s most memorable villains because the reader trusts him too.'] },
    con: { is: ['Margar persónur eru frekar tákn en fólk (t.d. Parsons, Syme).', 'Julia fær minna dýpi en Winston.', 'Sum samtöl verða að löngum fyrirlestrum.'], en: ['Many characters are symbols rather than people (e.g. Parsons, Syme).', 'Julia gets less depth than Winston.', 'Some dialogue turns into long lectures.'] },
    ev: [[0, { is: 'Winston er 39 ára, veikburða og með sár á ökkla; engin ofurhetja.', en: 'Winston is 39, frail and has an ulcer on his ankle; no superhero.' }], [10, { is: 'Julia segist bara gera uppreisn til að lifa lífinu, ekki vegna hugmynda.', en: 'Julia rebels to enjoy life, not because of ideas.' }], [14, { is: 'Draumurinn um móður hans og systur sýnir sektarkennd Winstons.', en: 'The dream about his mother and sister shows Winston’s guilt.' }], [19, { is: 'O’Brien pyntar Winston en talar við hann nánast eins og vinur.', en: 'O’Brien tortures Winston yet speaks to him almost like a friend.' }], [22, { is: 'Í herbergi 101 svíkur Winston Juliu: „Do it to Julia!“', en: 'In Room 101 Winston betrays Julia: “Do it to Julia!”' }]] },
  { k: 'world', is: ['Sögusviðið og heimurinn', 'Hvar og hvenær? Er heimurinn raunverulegur, ógnvekjandi, viðeigandi í dag?'], en: ['The setting and the world', 'Where and when? Is the world realistic, frightening, relevant today?'],
    q: { is: ['Hvernig lætur Orwell lesandanum líða eins og fylgst sé með honum?', 'Hvaða hlutir í heimi bókarinnar minna á okkar heim (snjallsímar, falsfréttir, eftirlit)?', 'Er heimurinn of grár og þunglyndislegur?'], en: ['How does Orwell make the reader feel watched?', 'What in the world of the novel reminds you of ours (smartphones, fake news, surveillance)?', 'Is the world too grey and depressing?'] },
    pro: { is: ['Heimurinn er ótrúlega nákvæmur: ráðuneyti, slagorð, fjarskjáir, nýmál.', 'Margt minnir óþægilega á nútímann: eftirlit, áróður, söguföls.', 'Lesandinn finnur fyrir óttanum sjálfur.'], en: ['The world is remarkably detailed: ministries, slogans, telescreens, Newspeak.', 'Much of it is uncomfortably close to today: surveillance, propaganda, rewritten history.', 'The reader feels the fear personally.'] },
    con: { is: ['Grár, kaldur og vonlaus heimur; sumum finnst lesturinn þrúgandi.', 'Sum smáatriði eru gamaldags (tækni frá 1949).'], en: ['A grey, cold and hopeless world; some readers find it oppressive.', 'Some details feel dated (technology from 1949).'] },
    ev: [[0, { is: 'Fyrsta blaðsíðan: veggspjöld Stóra bróður og fjarskjár sem ekki er hægt að slökkva á.', en: 'The first page: Big Brother posters and a telescreen that cannot be switched off.' }], [0, { is: 'Tveggja mínútna hatrið: allir öskra saman á skjáinn.', en: 'The Two Minutes Hate: everyone screams at the screen together.' }], [1, { is: 'Börn Parsons-hjónanna njósna um foreldra sína.', en: 'The Parsons children spy on their own parents.' }], [3, { is: 'Winston vinnur við að breyta gömlum fréttum í Sannleiksráðuneytinu.', en: 'Winston’s job is to change old newspaper articles at the Ministry of Truth.' }], [18, { is: 'Parsons er handtekinn eftir að dóttir hans kærði hann.', en: 'Parsons is arrested after his daughter reports him.' }]] },
  { k: 'plot', is: ['Söguþráðurinn og uppbyggingin', 'Er sagan spennandi? Hvar er hún sterk og hvar hæg?'], en: ['The plot and structure', 'Is the story gripping? Where is it strong and where is it slow?'],
    q: { is: ['Hvernig byggir Orwell upp spennu í 2. hluta?', 'Kom það þér á óvart hver herra Charrington var í raun?', 'Hvað finnst þér um langa kaflann úr bók Goldsteins?'], en: ['How does Orwell build tension in Part Two?', 'Were you surprised by who Mr Charrington really was?', 'What do you think of the long extract from Goldstein’s book?'] },
    pro: { is: ['Þriggja hluta bygging: heimurinn, ástin og uppreisnin, refsingin.', 'Spennan vex því lesandinn veit að þau verða gripin.', 'Svikin í lok 2. hluta eru óvænt og áhrifarík.'], en: ['A three-part structure: the world, love and rebellion, punishment.', 'Tension grows because the reader knows they will be caught.', 'The betrayal at the end of Part Two is surprising and powerful.'] },
    con: { is: ['1. hluti fer hægt af stað og lýsir miklu.', 'Bók Goldsteins (II.9) er löng ritgerð inni í skáldsögunni og hægir á.'], en: ['Part One starts slowly with a lot of description.', 'Goldstein’s book (II.9) is a long essay inside the novel and slows it down.'] },
    ev: [[0, { is: 'Winston byrjar að skrifa dagbók, fyrsta brotið.', en: 'Winston starts a diary, his first crime.' }], [8, { is: 'Julia laumar til hans miða: „I love you.“', en: 'Julia slips him a note: “I love you.”' }], [11, { is: 'Leyniherbergið fyrir ofan búð herra Charringtons.', en: 'The secret room above Mr Charrington’s shop.' }], [16, { is: 'Bók Goldsteins: langur fræðilegur texti.', en: 'Goldstein’s book: a long theoretical text.' }], [17, { is: 'Handtakan: „You are the dead.“ Charrington er hugsanalögreglan.', en: 'The arrest: “You are the dead.” Charrington is the Thought Police.' }]] },
  { k: 'end', is: ['Endirinn', 'Er endirinn viðeigandi? Hvernig líður lesandanum á eftir?'], en: ['The ending', 'Is the ending suitable? How does the reader feel afterwards?'],
    q: { is: ['Hefði átt að enda bókina vel? Hvers vegna ekki?', 'Hvað segir endirinn um vald Flokksins?', 'Er einhver von í bókinni?'], en: ['Should the book have a happy ending? Why not?', 'What does the ending say about the Party’s power?', 'Is there any hope in the book?'] },
    pro: { is: ['Endirinn er rökréttur: Flokkurinn vinnur, og það er einmitt viðvörunin.', 'Lokasetningin er ein frægasta í bókmenntunum og situr í lesandanum.', 'Snjallt atriði: viðaukinn um nýmál er skrifaður í þátíð, eins og ríkið sé liðið undir lok. Kannski smá von.'], en: ['The ending is logical: the Party wins, and that is exactly the warning.', 'The final sentence is one of the most famous in literature and stays with the reader.', 'A clever point: the Newspeak appendix is written in the past tense, as if the regime has ended. Perhaps a little hope.'] },
    con: { is: ['Algjörlega vonlaus endir; sumir lesendur verða niðurdregnir.', 'Lesandinn sem vill hetju sem sigrar verður fyrir vonbrigðum.'], en: ['A completely hopeless ending; some readers feel crushed.', 'Readers who want a hero who wins will be disappointed.'] },
    ev: [[19, { is: '2 + 2 = 5: O’Brien neyðir Winston til að sjá fimm fingur.', en: '2 + 2 = 5: O’Brien forces Winston to see five fingers.' }], [20, { is: 'Winston sér sig í speglinum, brotinn maður.', en: 'Winston sees himself in the mirror, a broken man.' }], [22, { is: 'Herbergi 101 og rotturnar.', en: 'Room 101 and the rats.' }], [23, { is: 'Kaffihúsið Chestnut Tree: „He loved Big Brother.“', en: 'The Chestnut Tree Café: “He loved Big Brother.”' }], [24, { is: 'Viðaukinn um nýmál er í þátíð.', en: 'The Newspeak appendix is in the past tense.' }]] },
  { k: 'ideas', is: ['Hugmyndirnar og boðskapurinn', 'Hvað kennir bókin? Af hverju er hún enn lesin?'], en: ['The ideas and the message', 'What does the book teach? Why is it still read?'],
    q: { is: ['Hvað er tvíhugsun og hvar sérðu hana í dag?', 'Af hverju vill Flokkurinn eyða orðum?', 'Hverju ætti ungt fólk að taka eftir í bókinni?'], en: ['What is doublethink and where do you see it today?', 'Why does the Party want to destroy words?', 'What should young people notice in the book?'] },
    pro: { is: ['Orð eins og Big Brother, thought police og doublethink eru notuð daglega.', 'Bókin kennir gagnrýna hugsun: hver stjórnar fréttunum, sögunni, tungumálinu?', 'Hún vekur lesandann til umhugsunar löngu eftir lesturinn.'], en: ['Words like Big Brother, thought police and doublethink are used every day.', 'The book teaches critical thinking: who controls the news, history, language?', 'It stays with the reader long after the last page.'] },
    con: { is: ['Sumar hugmyndir eru útskýrðar mjög ítarlega og geta verið þungar.', 'Boðskapurinn er stundum mjög augljós.'], en: ['Some ideas are explained at great length and can feel heavy.', 'The message is sometimes very obvious.'] },
    ev: [[2, { is: '„Who controls the past controls the future…“', en: '“Who controls the past controls the future…”' }], [4, { is: 'Syme og nýmálsorðabókin: að eyða orðum.', en: 'Syme and the Newspeak dictionary: destroying words.' }], [6, { is: '„Freedom is the freedom to say that two plus two make four.“', en: '“Freedom is the freedom to say that two plus two make four.”' }], [12, { is: 'Syme hverfur og það er eins og hann hafi aldrei verið til.', en: 'Syme vanishes and it is as if he never existed.' }], [24, { is: 'Meginreglur nýmálsins: tungumál sem gerir uppreisn óhugsandi.', en: 'The principles of Newspeak: a language that makes rebellion unthinkable.' }]] }
];
const RG_QUOTES = [[0, 'BIG BROTHER IS WATCHING YOU', { is: 'Eftirlitið. Gott í kveikju eða um sögusviðið.', en: 'Surveillance. Good for a hook or the setting.' }], [0, 'WAR IS PEACE. FREEDOM IS SLAVERY. IGNORANCE IS STRENGTH.', { is: 'Slagorð Flokksins; tvíhugsun.', en: 'The Party slogans; doublethink.' }], [2, 'Who controls the past controls the future: who controls the present controls the past.', { is: 'Söguföls og vald.', en: 'Rewriting history and power.' }], [4, 'It’s a beautiful thing, the destruction of words.', { is: 'Syme um nýmál.', en: 'Syme on Newspeak.' }], [6, 'Freedom is the freedom to say that two plus two make four.', { is: 'Kjarni bókarinnar; tengist III.2.', en: 'The heart of the book; links to III.2.' }], [6, 'If there is hope, it lies in the proles.', { is: 'Vonin, eða skortur á henni.', en: 'Hope, or the lack of it.' }], [23, 'He loved Big Brother.', { is: 'Lokasetningin. Frábær í umræðu um endinn.', en: 'The final line. Excellent when discussing the ending.' }]];
function rgIdeas() {
  const card = a => { const x = a[L]; return `<details class="rgangle"${a.k === 'chars' ? ' open' : ''}><summary><span>${x[0]}<small>${x[1]}</small></span></summary><div class="in">
    <p><b>${rgT('Spurningar til að hugsa um', 'Questions to think about')}</b></p><ul>${a.q[L].map(q => `<li class="rgq">${q}</li>`).join('')}</ul>
    <div class="rgpc"><div class="pro"><h4>${rgT('Með: ástæða til að lesa', 'For: a reason to read')}</h4><ul>${a.pro[L].map(p => `<li>${p}</li>`).join('')}</ul></div><div class="con"><h4>${rgT('Á móti: gallar', 'Against: weaknesses')}</h4><ul>${a.con[L].map(p => `<li>${p}</li>`).join('')}</ul></div></div>
    <p><b>${rgT('Dæmi úr bókinni (smelltu til að lesa kaflann)', 'Examples from the book (click to read the chapter)')}</b></p>
    <ul class="rgev">${a.ev.map(([c, d]) => `<li><button data-ch="${c}" title="${esc(chLong(c))}">${chLabel(c)}</button><span>${d[L]}</span></li>`).join('')}</ul></div></details>`; };
  return `<div class="rgbox red"><p style="margin:0">${rgT('Veldu <b>þrjú</b> af þessum fimm sjónarhornum sem rökin þín. Hér eru ekki tilbúnar setningar, heldur spurningar, kostir, gallar og dæmi sem þú mótar í þínar eigin skoðanir. Bestu ritgerðirnar nefna líka einn galla og svara honum: „Although…, …“.', 'Choose <b>three</b> of these five angles as your arguments. There are no ready-made sentences here, only questions, strengths, weaknesses and examples that you shape into your own opinions. The best essays also mention one weakness and answer it: “Although…, …”.')}</p></div>
  ${RG_ANGLES.map(card).join('')}
  <h2>${rgT('Stuttar tilvitnanir sem vert er að muna', 'Short quotations worth remembering')}</h2>
  <div class="rgbox"><p style="margin-top:0">${rgT('Ein eða tvær stuttar tilvitnanir, orðrétt, lyfta ritgerðinni. Veldu þær sem passa við rökin þín og lærðu þær.', 'One or two short quotations, word for word, lift an essay. Choose the ones that fit your arguments and learn them.')}</p>
  <div class="rgquote">${RG_QUOTES.map(([c, q, n]) => `<button data-ch="${c}">${chLabel(c)}</button><q lang="en">${esc(q)}</q><span>${n[L]}</span>`).join('')}</div></div>
  <h2>${rgT('Hugmyndir að kveikju', 'Ideas for a hook')}</h2>
  <div class="rggrid">${(L === 'is' ? [['Spurning', 'Spurðu lesandann um eitthvað sem tengist lífi hans, t.d. eftirlit, síma eða sannleika. Fylltu sjálf(ur) inn: „Have you ever felt that …?“'], ['Sláandi staðreynd', 'Eitthvað sem kemur á óvart um bókina eða heiminn í dag, t.d. að orð úr bókinni eru notuð daglega. „Few books written in 1949 …“'], ['Tilvitnun', 'Byrjaðu á slagorði eða stuttri tilvitnun og útskýrðu hana í næstu setningu.']] : [['A question', 'Ask the reader about something in their own life, e.g. surveillance, phones or truth. Fill it in yourself: “Have you ever felt that …?”'], ['A striking fact', 'Something surprising about the book or today’s world, e.g. that words from the book are used every day. “Few books written in 1949 …”'], ['A quotation', 'Open with a slogan or a short quotation and explain it in the next sentence.']]).map(h => `<div class="rgbox"><h3>${h[0]}</h3><p style="margin:0">${h[1]}</p></div>`).join('')}</div>
  <h2>${rgT('Kveikjur beint úr bókinni', 'Hooks straight from the book')}</h2>
  <div class="rgbox"><p style="margin-top:0">${rgT('Stutt slagorð, nýmálsorð eða fræg setning grípur strax. Reglan: <b>tilvitnunin ein og sér, svo útskýrir næsta setning hana</b> og tengir við bókina. Fimm léttu ritgerðirnar í Sýnidæmum (Lies Everywhere, Doubleplusgood?, Big Brother Was Watching…, Two Plus Two Make Five og The Clocks Were Striking Thirteen) byrja svona.', 'A short slogan, a Newspeak word or a famous line grabs attention at once. The rule: <b>the quotation on its own, then the next sentence explains it</b> and links it to the book. Five of the easy essays in Samples (Lies Everywhere, Doubleplusgood?, Big Brother Was Watching…, Two Plus Two Make Five and The Clocks Were Striking Thirteen) start like this.')}</p>
  <table class="rgtbl" style="margin:0"><thead><tr><th>${rgT('Kveikja', 'Hook')}</th><th>${rgT('Næsta setning gæti útskýrt…', 'The next sentence could explain…')}</th></tr></thead><tbody>${RG_HOOKS.map(h => `<tr><td lang="en"><b>${esc(h[0])}</b></td><td>${h[1][L]}</td></tr>`).join('')}</tbody></table></div>`;
}
/* --- 03 áætlunin mín --- */
const RG_FIELDS = () => [
  { sec: rgT('1 · Inngangur', '1 · Introduction'), f: [['hook', rgT('Kveikja', 'Hook'), rgT('Spurning, sláandi staðreynd eða tilvitnun.', 'A question, a striking fact or a quotation.'), 2], ['disc', rgT('Umræða', 'Discussion'), rgT('1–2 setningar sem leiða frá kveikjunni að bókinni (titill, höfundur, ár, um hvað).', '1–2 sentences leading from the hook to the book (title, author, year, what it is about).'), 3], ['thesis', 'Thesis', rgT('EIN setning: skoðun (lesa / sleppa) + rök A, B og C.', 'ONE sentence: opinion (read / avoid) + arguments A, B and C.'), 3]] },
  ...[2, 3, 4].map((n, i) => ({ sec: `${n} · ${rgT('Rök', 'Argument')} ${'ABC'[i]}`, n, f: [[`t${n}`, rgT('Tengiorð + topic sentence', 'Linking word + topic sentence'), '', 2], [`s${n}a`, rgT('Stuðningur 1 (dæmi úr bókinni)', 'Support 1 (example from the book)'), '', 2], [`s${n}b`, rgT('Stuðningur 2', 'Support 2'), '', 2], [`s${n}c`, rgT('Stuðningur 3', 'Support 3'), '', 2], [`c${n}`, 'Closing sentence', '', 2], [`k${n}`, rgT('Minnislykill', 'Memory key'), rgT('2–4 orð sem minna þig á alla efnisgreinina. Þetta lærirðu utan að.', '2–4 words that remind you of the whole paragraph. This is what you memorise.'), 1]] })),
  { sec: rgT('5 · Lokaorð', '5 · Conclusion'), f: [['restate', rgT('Thesis endurorðuð', 'Thesis restated'), rgT('Byrjaðu á In conclusion / To sum up. Sama skoðun og sömu rök, en önnur orð.', 'Start with In conclusion / To sum up. Same opinion and arguments, different words.'), 3], ['wide', rgT('Endað vítt', 'Ending wide'), rgT('Skilaboð til lesandans: hvað á hann að gera eða hugsa?', 'A message to the reader: what should they do or think?'), 2]] }
];
function rgPlan() {
  const fld = ([k, l, h, rows]) => `<div class="rgf"><label for="rgp-${k}">${l}${h ? `<small>${h}</small>` : ''}</label>${rows > 1 ? `<textarea id="rgp-${k}" data-rgp="${k}" rows="${rows}" lang="en" spellcheck="true">${esc(rgGet('p:' + k))}</textarea>` : `<input type="text" id="rgp-${k}" data-rgp="${k}" lang="en" value="${esc(rgGet('p:' + k))}">`}${k === 'thesis' ? '<div id="rgthchk"></div>' : ''}</div>`;
  return `<div class="rgbox red"><p style="margin:0">${rgT('Skrifaðu hér <b>þína eigin</b> áætlun á ensku. Hún vistast sjálfkrafa í þessum vafra. Áætlunin er til að læra af heima; í tímanum máttu ekki hafa hana. Þess vegna er minnislykill við hverja efnisgrein: það er það sem þú lærir utan að.', 'Write <b>your own</b> plan here in English. It saves automatically in this browser. The plan is for studying at home; you may not have it in class. That is why each paragraph has a memory key: that is what you memorise.')}</p></div>
  <div class="rgbox"><b id="rgpwc"></b><div class="rgbar"><i id="rgpbar" style="width:0"></i></div></div>
  ${RG_FIELDS().map(s => `<section class="rgpara"><h3>${s.sec}<span>${s.n ? rgT('tengiorð → topic → 3 dæmi → closing', 'linking word → topic → 3 examples → closing') : ''}</span></h3>${s.f.map(fld).join('')}</section>`).join('')}
  <button class="rgbtn" id="rgpfull">${rgT('Sjá ritgerðina í heild', 'See the whole essay')}</button><button class="rgbtn alt" id="rgpclr">${rgT('Hreinsa áætlunina', 'Clear the plan')}</button>
  <div id="rgpout"></div>`;
}
function rgPlanText() {
  const g = k => String(rgGet('p:' + k) || '').trim();
  const join = a => a.map(g).filter(Boolean).join(' ');
  return [join(['hook', 'disc', 'thesis']), join(['t2', 's2a', 's2b', 's2c', 'c2']), join(['t3', 's3a', 's3b', 's3c', 'c3']), join(['t4', 's4a', 's4b', 's4c', 'c4']), join(['restate', 'wide'])];
}
function rgPlanUpd() {
  const paras = rgPlanText(), n = rgWords(paras.join(' '));
  const wc = $('#rgpwc'); if (wc) wc.textContent = rgT(`Orð í áætluninni: ${n} af 400–500`, `Words in your plan: ${n} of 400–500`) + (n > 500 ? rgT(' · of langt, styttu', ' · too long, cut') : n >= 400 ? ' ✓' : '');
  const bar = $('#rgpbar'); if (bar) bar.style.width = Math.min(100, n / 5) + '%';
  const th = String(rgGet('p:thesis') || ''), box = $('#rgthchk');
  if (box) {
    if (!th.trim()) { box.innerHTML = ''; return; }
    const sents = th.trim().split(/[.!?](\s|$)/).filter(s => s && s.trim()).length;
    const commas = (th.match(/,/g) || []).length, and = /\b(and|as well as)\b/i.test(th);
    const msgs = [];
    if (sents > 1) msgs.push(['no', rgT('Thesis á að vera EIN setning.', 'The thesis should be ONE sentence.')]);
    if (!(commas >= 1 && and)) msgs.push(['no', rgT('Sjást þrenn rök? Venjulega: „…, because A, B and C.“', 'Can you see three arguments? Usually: “…, because A, B and C.”')]);
    if (!/\b(read|avoid|worth|recommend|should|must|skip)\b/i.test(th)) msgs.push(['no', rgT('Kemur skoðunin skýrt fram (lesa eða sleppa)?', 'Is your opinion clear (read it or avoid it)?')]);
    if (!/(orwell|nineteen eighty-four|1984)/i.test(th + ' ' + rgGet('p:disc'))) msgs.push(['no', rgT('Nefndu titil og höfund í inngangi.', 'Name the title and author in the introduction.')]);
    box.innerHTML = msgs.length ? msgs.map(m => `<p class="rgwarn">${m[1]}</p>`).join('') : `<p class="rgok">${rgT('Lítur vel út: ein setning, skoðun og þrenn rök.', 'Looks good: one sentence, an opinion and three arguments.')}</p>`;
  }
}
function rgPlanBind() {
  $$('[data-rgp]').forEach(el => el.oninput = () => { rgSet('p:' + el.dataset.rgp, el.value); rgPlanUpd(); });
  rgPlanUpd();
  $('#rgpfull').onclick = () => { const p = rgPlanText(); $('#rgpout').innerHTML = `<div class="rgbox" lang="en" style="margin-top:14px">${p.map((x, i) => `<p style="margin:0 0 0;${i ? 'text-indent:2.2em' : ''}">${esc(x) || '<i style="color:var(--muted)">…</i>'}</p>`).join('')}</div>`; };
  $('#rgpclr').onclick = () => { if (!$('#rgpclr').dataset.sure) { $('#rgpclr').dataset.sure = 1; $('#rgpclr').textContent = rgT('Ýttu aftur til að staðfesta', 'Click again to confirm'); return; } RG_FIELDS().forEach(s => s.f.forEach(f => rgSet('p:' + f[0], ''))); renderRitgerd(); };
}
/* --- 04 orðaforði --- */
function rgVocab() {
  const grp = L === 'is' ? [['Byrja efnisgrein 2', 'Firstly, · First of all, · To begin with,'], ['Byrja efnisgrein 3', 'Secondly, · Moreover, · Furthermore, · In addition,'], ['Byrja efnisgrein 4', 'Thirdly, · Finally, · Lastly, · Last but not least,'], ['Byrja lokaorð', 'In conclusion, · To sum up, · All in all, · In light of all these points,'], ['Andstæða', 'However, · On the other hand, · Although … , · Despite … , · Nevertheless,'], ['Dæmi', 'For example, · For instance, · A clear example of this is when … · This is shown when …'], ['Afleiðing', 'Therefore, · As a result, · Consequently, · For this reason,'], ['Áhersla', 'Most importantly, · Above all, · In fact, · Especially']] : [['Start paragraph 2', 'Firstly, · First of all, · To begin with,'], ['Start paragraph 3', 'Secondly, · Moreover, · Furthermore, · In addition,'], ['Start paragraph 4', 'Thirdly, · Finally, · Lastly, · Last but not least,'], ['Start the conclusion', 'In conclusion, · To sum up, · All in all, · In light of all these points,'], ['Contrast', 'However, · On the other hand, · Although … , · Despite … , · Nevertheless,'], ['Examples', 'For example, · For instance, · A clear example of this is when … · This is shown when …'], ['Result', 'Therefore, · As a result, · Consequently, · For this reason,'], ['Emphasis', 'Most importantly, · Above all, · In fact, · Especially']];
  const adj = L === 'is' ? [['Jákvæð lýsingarorð', 'gripping · thought-provoking · compelling · chilling · haunting · powerful · vivid · believable · well-developed · timeless · relevant · unforgettable'], ['Neikvæð / gagnrýnin', 'slow-paced · bleak · depressing · heavy · repetitive · one-dimensional · predictable · overwhelming'], ['Orð um heim bókarinnar', 'dystopian · totalitarian · surveillance · propaganda · oppressive · regime · rebellion · conformity · manipulation · censorship']] : [['Positive adjectives', 'gripping · thought-provoking · compelling · chilling · haunting · powerful · vivid · believable · well-developed · timeless · relevant · unforgettable'], ['Negative / critical', 'slow-paced · bleak · depressing · heavy · repetitive · one-dimensional · predictable · overwhelming'], ['Words about the novel’s world', 'dystopian · totalitarian · surveillance · propaganda · oppressive · regime · rebellion · conformity · manipulation · censorship']];
  const frames = ['Nineteen Eighty-Four by George Orwell is a … novel that …', 'Orwell portrays … as …', 'This is shown when …', 'This makes the reader feel …', 'Although some readers may find … , …', 'What makes this … so effective is …', 'It is no wonder that …', 'Anyone who … should …'];
  return `<div class="rgbox red"><p style="margin:0">${rgT('Kennarinn gefur fyrir fjölbreytt tengiorð og vandaðan orðaforða. Veldu 6–8 orð og orðasambönd af þessari síðu og byggðu þau inn í áætlunina þína, þá manstu þau í tímanum.', 'The teacher rewards varied linking words and refined vocabulary. Pick 6–8 words and phrases from this page and build them into your plan, so you remember them in class.')}</p></div>
  <h2>${rgT('Tengiorð eftir hlutverki', 'Linking words by role')}</h2><div class="rgwords" lang="en">${grp.map(g => `<div><h4 lang="${L}">${g[0]}</h4><p>${g[1]}</p></div>`).join('')}</div>
  <h2>${rgT('Orð til að meta bók', 'Words for judging a book')}</h2><div class="rgwords" lang="en">${adj.map(g => `<div><h4 lang="${L}">${g[0]}</h4><p>${g[1]}</p></div>`).join('')}</div>
  <h2>${rgT('Setningarammar', 'Sentence frames')}</h2><div class="rgbox"><p style="margin-top:0">${rgT('Byrjanir sem þú klárar sjálf(ur) með þínum eigin hugmyndum:', 'Openings that you complete yourself with your own ideas:')}</p><ul lang="en">${frames.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>
  <h2>${rgT('Málfarsreglur', 'Grammar rules')}</h2><div class="rgbox"><ul style="margin:0">${(L === 'is' ? ['Notaðu <b>nútíð</b> um það sem gerist í bókinni: „Winston <i>works</i> at the Ministry of Truth“, ekki „worked“.', 'Engar styttingar: <i>do not, it is, cannot</i> í stað don’t, it’s, can’t.', '<i>Also</i> fer ekki fremst í setningu; notaðu <i>In addition,</i> eða <i>Moreover,</i>.', '<i>Although / Despite</i> þurfa tvo hluta: „Although Part One is slow, it builds the world.“', '<i>Because of</i> + nafnorð; <i>because</i> + heil setning.', 'Forðastu að byrja hverja setningu á „I think“. Skoðunin þín sést á rökunum.'] : ['Use the <b>present tense</b> for what happens in the book: “Winston <i>works</i> at the Ministry of Truth”, not “worked”.', 'No contractions: <i>do not, it is, cannot</i> instead of don’t, it’s, can’t.', '<i>Also</i> does not go at the start of a sentence; use <i>In addition,</i> or <i>Moreover,</i>.', '<i>Although / Despite</i> need two halves: “Although Part One is slow, it builds the world.”', '<i>Because of</i> + noun; <i>because</i> + a full clause.', 'Avoid starting every sentence with “I think”. Your arguments show your opinion.']).map(x => `<li>${x}</li>`).join('')}</ul></div>`;
}
/* --- sýnidæmi: níu ritgerðir á þremur erfiðleikastigum --- */
const RG_ESSAYS = [
  { id: 'l1', lvl: 1, side: 'read', title: 'Read It, Even If It Is Scary', stance: { is: 'Lesa · Winston, heimurinn, endirinn', en: 'Read it · Winston, the world, the ending' }, hook: { is: 'Spurning', en: 'Question' },
    good: { is: ['Mjög skýr uppbygging: thesis nefnir þrenn rök og hver efnisgrein fjallar um eitt þeirra.', 'Persónuleg rödd („I felt nervous for him“) gerir ritgerðina lifandi.', 'Lokaorðin enda á smá húmor, sem er í lagi ef ritgerðin er annars skýr.'], en: ['Very clear structure: the thesis names three arguments and each paragraph covers one.', 'A personal voice (“I felt nervous for him”) makes the essay feel alive.', 'The conclusion ends with a little humour, which is fine when the rest is clear.'] },
    better: { is: ['„I think“ og „really“ koma oft fyrir; fjölbreyttari orð lyfta textanum.', 'Closing sentences eru einfaldar („So Winston is…“). Prófaðu Therefore, In short, For this reason.', 'Dæmin mættu vera nákvæmari: hvað skrifar Winston í dagbókina? Hvað gerist í herbergi 101?'], en: ['“I think” and “really” appear often; more varied words would lift the text.', 'The closing sentences are simple (“So Winston is…”). Try Therefore, In short, For this reason.', 'The examples could be more precise: what does Winston write in the diary? What happens in Room 101?'] },
    up: [['I think everyone should read this book, because Winston is easy to understand, the world is really scary and the ending is a big surprise.', 'Nineteen Eighty-Four is a book everyone should read, because of its relatable hero, its frightening world and its shocking ending.'], ['The ending is sad, but it shows how strong the Party is.', 'Although the ending is heartbreaking, it shows just how complete the Party’s power is.']],
    p: [
      [['hook', 'Do you like books that keep you awake at night?'], ['disc', 'I do, and Nineteen Eighty-Four by George Orwell did exactly that to me. It is about a man called Winston Smith who lives in London, in a country where the Party controls everything. Big Brother is the leader, and his face is on posters everywhere. The book was written in 1949, but it still feels new.'], ['thesis', 'I think everyone should read this book, because Winston is easy to understand, the world is really scary and the ending is a big surprise.']],
      [['topic', 'Firstly, Winston is a normal person, and that is why I liked him.'], ['sup', 'He is not a superhero. He is thirty-nine years old, he has a bad leg and he is often afraid. But he still does dangerous things, like writing a diary, which is not allowed. When I read about him, I felt nervous for him all the time, because I knew the Thought Police could find him. He also remembers his mother and little sister, and he feels guilty about them.'], ['close', 'So Winston is a main character that the reader really cares about.']],
      [['topic', 'Secondly, the world in the book is very scary.'], ['sup', 'There is a telescreen in every flat, and it watches you and listens to you all day. You cannot turn it off. Even children spy on their parents, and the Parsons children are a good example of this. The Party also changes old newspapers, so nobody knows what is true anymore. I would hate to live there. It made me think about all the cameras and phones we have today.'], ['close', 'Because of this, the world feels real and not only like a story.']],
      [['topic', 'Finally, the ending is a big surprise.'], ['sup', 'I really thought Winston and Julia would win in the end, or at least escape. However, the Party catches them, and in Room 101 Winston betrays Julia because he is so afraid of rats. Even O’Brien, who Winston trusted, is working for the Party. I read the last sentence of the book three times because I could not believe it.'], ['close', 'The ending is sad, but it shows how strong the Party is.']],
      [['restate', 'In conclusion, Nineteen Eighty-Four is a great book because Winston is easy to like, the world is scary and the ending is surprising.'], ['wide', 'It is not a happy book, but it is very exciting, and it makes you think about freedom. It is the kind of book you want to talk about with your friends afterwards. I think everyone should read it, but maybe not right before bed!']]
    ] },
  { id: 'l2', lvl: 1, side: 'avoid', title: 'Not My Kind of Book', stance: { is: 'Sleppa · hæg byrjun, sorgleg, erfið', en: 'Avoid it · slow start, sad, difficult' }, hook: { is: 'Almenn fullyrðing', en: 'General statement' },
    good: { is: ['Heiðarleg og skýr skoðun: lesandinn veit strax hvar höfundurinn stendur.', 'Hver efnisgrein hefur ákveðin dæmi (lyktin af soðnu káli, bók Goldsteins, Newspeak).', 'Lokaorðin gefa raunhæft ráð: hverjum bókin hentar betur.'], en: ['An honest, clear opinion: the reader knows at once where the writer stands.', 'Each paragraph has specific examples (the smell of boiled cabbage, Goldstein’s book, Newspeak).', 'The conclusion gives realistic advice: who the book might suit better.'] },
    better: { is: ['Setningarnar eru stuttar og líkar hver annarri; tengdu sumar saman með although, while eða because.', 'Viðurkenndu einn kost bókarinnar og svaraðu honum. Það gerir neikvæða afstöðu sannfærandi.', 'Orðaforðinn er einfaldur (very sad, very slow). Prófaðu bleak, depressing, slow-paced.'], en: ['The sentences are short and similar; join some with although, while or because.', 'Admit one strength of the book and answer it. That makes a negative stance more convincing.', 'The vocabulary is simple (very sad, very slow). Try bleak, depressing, slow-paced.'] },
    up: [['I almost stopped reading after three chapters.', 'Many readers, myself included, are tempted to give up before the story has even begun.'], ['Nobody in the book is happy.', 'Fear poisons every relationship in the novel, even the one between parents and children.']],
    p: [
      [['hook', 'Some books are famous, but that does not mean that everybody will like them.'], ['disc', 'Nineteen Eighty-Four by George Orwell is one of the most famous books in the world. It is about Winston Smith, who lives in a country where the Party watches everyone and nobody is free. Many people love this book, but I do not. My teacher said it would change my life, but mostly it made me tired.'], ['thesis', 'I would not recommend it to most teenagers, because the beginning is slow, the story is very sad and some parts are hard to understand.']],
      [['topic', 'Firstly, the beginning of the book is very slow.'], ['sup', 'In the first part, almost nothing happens. Winston goes to work, he walks around London and he thinks a lot. Orwell describes everything, for example the grey streets and the smell of boiled cabbage in Winston’s building. I almost stopped reading after three chapters. Of course, some readers like slow books, but most teenagers I know want more action.'], ['close', 'Therefore, many readers may give up before the story gets exciting.']],
      [['topic', 'Secondly, the story is very sad.'], ['sup', 'Nobody in the book is happy, and people cannot trust their friends or even their own children. Winston and Julia try to be happy together, but they are always afraid of being caught. When they are caught, things only get worse, and the Party hurts them in terrible ways. Even the people Winston trusts turn out to be dangerous, and at the end nobody is saved.'], ['close', 'As a result, I felt depressed for days while I was reading it.']],
      [['topic', 'Lastly, some parts of the book are hard to understand.'], ['sup', 'Orwell uses many strange words, like Newspeak and doublethink, and it takes time to understand what they mean. Words like these make you stop and think, but they also make reading slow. There is also a very long part from a book by Goldstein, which is like a history lesson. I had to read some pages twice, and I still did not understand everything.'], ['close', 'In other words, the book is not easy for young readers who are not used to difficult English.']],
      [['restate', 'To sum up, I would not recommend Nineteen Eighty-Four to most teenagers, because it starts slowly, it is very sad and it can be hard to understand.'], ['wide', 'Maybe it is a better book for adults or for people who love politics. If you want an exciting and fun story, my advice is simple: choose a different book. I am glad I read it once, but I will not read it again.']]
    ] },
  { id: 'l3', lvl: 1, side: 'read', title: 'A Book That Made Me Look at My Phone', stance: { is: 'Lesa · nútíminn, ástarsaga, Stóri bróðir', en: 'Read it · today’s world, love story, Big Brother' }, hook: { is: 'Persónuleg saga', en: 'Personal anecdote' },
    good: { is: ['Kveikjan er lítil saga úr lífi höfundarins; hún grípur strax.', 'Tengir bókina við líf ungs fólks (símar, falsfréttir) án þess að endursegja söguna.', 'Lokaorðin snúa aftur að símanum úr kveikjunni. Það lokar hringnum.'], en: ['The hook is a small story from the writer’s life; it grabs at once.', 'Links the book to young people’s lives (phones, fake news) without retelling the plot.', 'The conclusion returns to the phone from the hook. That closes the circle.'] },
    better: { is: ['„I think“ í thesis veikir hana. Segðu skoðunina beint.', 'Efnisgrein 4 gæti útskýrt betur hvers vegna Stóri bróðir er tákn, ekki bara illmenni.', 'Fleiri tengiorð inni í efnisgreinum (However, For example) myndu bæta flæðið.'], en: ['“I think” in the thesis weakens it. State the opinion directly.', 'Paragraph 4 could explain better why Big Brother is a symbol, not just a villain.', 'More linking words inside paragraphs (However, For example) would improve the flow.'] },
    up: [['Big Brother is one of the scariest villains I have read about.', 'Big Brother is a uniquely frightening villain, precisely because he never actually appears.'], ['It is a dark book, but it made me think about how much of my life I share.', 'Dark as it is, the book made me rethink how much of my life I share online.']],
    p: [
      [['hook', 'After I finished Nineteen Eighty-Four, I put my phone face down on the table.'], ['disc', 'That is how much the book got into my head. The novel was written by George Orwell in 1949, and it tells the story of Winston Smith, who lives in a world where the Party sees and hears everything.'], ['thesis', 'I think young people should read this book, because it is about things we know from our own lives, it has an exciting love story and Big Brother is a villain you never forget.']],
      [['topic', 'First of all, the book is about things that are part of our lives today.'], ['sup', 'In the story, the telescreens are always on, and the Thought Police can watch anyone at any time. Today, we have phones with cameras and microphones in our pockets all day. In addition, the Party changes old newspapers so that people forget the truth, and that reminded me of fake news online. It was scary to see how easy it is to control people who are always watched.'], ['close', 'For these reasons, the book felt very modern to me, even though it is old.']],
      [['topic', 'Secondly, the love story between Winston and Julia makes the book exciting.'], ['sup', 'Julia gives Winston a secret note that says “I love you”, and from that moment everything is dangerous. They meet in the countryside and later in a small room above an old shop. I was nervous every time they met, because I knew they could be caught. Julia is also brave and funny, and she breaks the Party’s rules all the time.'], ['close', 'So the love story is not only romantic but also full of tension.']],
      [['topic', 'Finally, Big Brother is one of the scariest villains I have read about.'], ['sup', 'The strange thing is that he never appears in the book. He is only a face on posters with the words “Big Brother is watching you”. His face is everywhere, in the streets, at work and even on coins. Nobody knows if he is even a real person.'], ['close', 'This makes him more frightening than a normal villain, because you cannot fight someone you cannot find.']],
      [['restate', 'In conclusion, Nineteen Eighty-Four is a book young people should read, because it is about our modern world, it has an exciting love story and it has an unforgettable villain.'], ['wide', 'It is a dark book, but it made me think about how much of my life I share. It is also much easier to read than I expected. Read it, and maybe you will look at your phone differently too.']]
    ] },
  { id: 'l4', lvl: 1, side: 'read', title: 'Lies Everywhere', stance: { is: 'Lesa · lygar Flokksins, Winston, spennandi endir', en: 'Read it · the Party’s lies, Winston, an exciting ending' }, hook: { is: 'Slagorð: WAR IS PEACE…', en: 'Slogan: WAR IS PEACE…' },
    good: { is: ['Kveikjan er slagorð og næsta setning útskýrir það strax. Þannig á að nota tilvitnun.', 'Gott dæmi um lygar Flokksins: súkkulaðiskammturinn sem „hækkar“ en lækkar í raun.', 'Lokaorðin tengja bókina við raunveruleikann.'], en: ['The hook is a slogan and the next sentence explains it at once. That is how to use a quotation.', 'A good example of the Party’s lies: the chocolate ration that “goes up” but really goes down.', 'The conclusion links the book to real life.'] },
    better: { is: ['„really scary“ og „very exciting“: prófaðu frightening, chilling, gripping.', 'Efnisgrein 4 segir mest frá því sem gerist; bættu við hvers vegna það skiptir máli.'], en: ['“really scary” and “very exciting”: try frightening, chilling, gripping.', 'Paragraph 4 mostly says what happens; add why it matters.'] },
    up: [['I could not stop reading, because I wanted to know if Winston would give up.', 'The tension is almost unbearable, because the reader cannot tell whether Winston will finally break.']],
    p: [
      [['hook', '“WAR IS PEACE. FREEDOM IS SLAVERY. IGNORANCE IS STRENGTH.”'], ['disc', 'These are the three slogans of the Party in George Orwell’s Nineteen Eighty-Four. When I first read them, I thought they made no sense at all. Then I understood that this is exactly the point, because in this world the Party decides what is true, even when it is obviously false.'], ['thesis', 'You should read this book, because the Party’s lies are scary, Winston is brave in a quiet way and the ending is very exciting.']],
      [['topic', 'Firstly, the lies of the Party are really scary.'], ['sup', 'The Party tells people that war is good and that they are free, but nobody is free. At the Ministry of Truth, Winston’s job is to change old newspapers so that the Party is never wrong. In one part, the chocolate ration goes down, but the Party says that it has gone up, and everybody believes it. I found that more frightening than any monster.'], ['close', 'So the book shows how dangerous it is when people cannot know the truth.']],
      [['topic', 'Secondly, Winston is brave, but not like a normal hero.'], ['sup', 'He does not fight with guns or make big speeches. Instead, he writes in a secret diary and he falls in love with Julia, which is against the rules. Even writing the date in his diary is a risk. These things sound small, but in his world they could get him killed. I liked him because he is afraid, but he still does them.'], ['close', 'Because of this, the reader really wants him to win.']],
      [['topic', 'Finally, the end of the book is very exciting.'], ['sup', 'In Part Three, Winston is a prisoner in the Ministry of Love, and O’Brien tries to change the way he thinks. O’Brien holds up four fingers and says that there are five, and he hurts Winston until he agrees. I could not stop reading, because I wanted to know if Winston would give up. It was hard to read, but I could not put it down.'], ['close', 'In other words, the last part of the book is the most exciting of all.']],
      [['restate', 'In conclusion, Nineteen Eighty-Four is a book you should read, because it shows how scary lies can be, it has a quiet but brave hero and it has a very exciting ending.'], ['wide', 'After reading it, I think about the three slogans every time I see a headline that seems too good to be true. It is not an easy book, but it is a very good one. Maybe you will think about them too.']]
    ] },
  { id: 'l5', lvl: 1, side: 'read', title: 'Doubleplusgood?', stance: { is: 'Lesa · nýmál, heimurinn, okkar líf', en: 'Read it · Newspeak, the world, our lives' }, hook: { is: 'Nýmálsorð: doubleplusgood', en: 'Newspeak word: doubleplusgood' },
    good: { is: ['Frumleg kveikja: eitt nýmálsorð, svo útskýring. Lesandinn vill vita meira.', 'Endirinn notar sama orð og kveikjan. Það lokar hringnum.', 'Höfundurinn tengir bókina við eigið tungumál (lol, sus) og viðurkennir að það sé ekki það sama.'], en: ['An original hook: one Newspeak word, then an explanation. The reader wants to know more.', 'The ending uses the same word as the hook. That closes the circle.', 'The writer links the book to their own language (lol, sus) and admits it is not the same thing.'] },
    better: { is: ['Thesis gæti verið nákvæmari: „it makes you think“ er óljóst. Um hvað?', 'Fleiri tengiorð inni í efnisgreinum (However, For instance) myndu bæta flæðið.'], en: ['The thesis could be more precise: “it makes you think” is vague. About what?', 'More linking words inside paragraphs (However, For instance) would improve the flow.'] },
    up: [['In my opinion, Nineteen Eighty-Four is a book everyone should read, because the language is interesting, the world is frightening and it makes you think.', 'Nineteen Eighty-Four is a book everyone should read, because of its fascinating language, its frightening world and the questions it raises about our own lives.']],
    p: [
      [['hook', 'Doubleplusgood.'], ['disc', 'That is how you say “excellent” in Newspeak, the language of the Party in George Orwell’s Nineteen Eighty-Four. In Newspeak there are no words like “bad” or “terrible”, only “ungood” and “doubleplusungood”. It sounds funny, but it is actually one of the scariest ideas in the book.'], ['thesis', 'In my opinion, Nineteen Eighty-Four is a book everyone should read, because the language is interesting, the world is frightening and it makes you think.']],
      [['topic', 'Firstly, the language in the book is really interesting.'], ['sup', 'Winston’s friend Syme works on the Newspeak dictionary, and every new edition is smaller than the last. Syme explains that if there is no word for an idea, people cannot think about it. For example, if there is no word for “freedom”, nobody can want freedom. I had never thought about language like that before. In fact, Syme seems happy about destroying words, which I found very creepy. Later, Syme suddenly disappears, and nobody talks about him again.'], ['close', 'Therefore, Newspeak is one of the best parts of the book.']],
      [['topic', 'Secondly, the world of the book is very frightening.'], ['sup', 'Telescreens are everywhere, and they can see and hear you all the time. Even your face can get you in trouble, because looking worried is a crime called “facecrime”. The Thought Police arrest people who think the wrong things, and then those people disappear, as if they never existed. Children even spy on their parents and report them to the Thought Police.'], ['close', 'As a result, nobody in the book can trust anybody, not even their own family.']],
      [['topic', 'Lastly, the book makes the reader think about our own world.'], ['sup', 'Today, we also have new words online, and some of them are very short, like “lol” or “sus”. This is not the same as Newspeak, of course, but it made me wonder if we are slowly losing words too. The book also made me think about who decides what is true in the news. Maybe we should be more careful with the words we use and the news we believe.'], ['close', 'In short, it is not only a story but also a warning.']],
      [['restate', 'To sum up, Nineteen Eighty-Four is a book everyone should read, because Newspeak is interesting, the world is frightening and it makes you think about your own life.'], ['wide', 'It is not always easy to read, but it is worth the effort. Once you know a few Newspeak words, you start to notice how language can be used to control people. In Newspeak, I would say that the book is doubleplusgood.']]
    ] },
  { id: 'l6', lvl: 1, side: 'avoid', title: 'Big Brother Was Watching, and I Was Bored', stance: { is: 'Sleppa · leiðinleg, ólíkleg persónur, endirinn', en: 'Avoid it · boring, unlikeable characters, the ending' }, hook: { is: 'Slagorð: BIG BROTHER IS WATCHING YOU', en: 'Slogan: BIG BROTHER IS WATCHING YOU' },
    good: { is: ['Skýr og heiðarleg neikvæð afstaða með ákveðnum dæmum (bók Goldsteins, herbergi 101).', 'Óvænt dæmi um Winston: hann hatar Juliu í byrjun. Það sýnir að höfundurinn las vel.', 'Lokaorðin gefa ráð í stað þess að segja bara „ekki lesa“.'], en: ['A clear, honest negative stance with specific examples (Goldstein’s book, Room 101).', 'A surprising example about Winston: he hates Julia at first. It shows the writer read closely.', 'The conclusion gives advice instead of just saying “do not read it”.'] },
    better: { is: ['„I skipped some of it“ er heiðarlegt, en í ritgerð er betra að gagnrýna textann en eigin lestur.', 'Viðurkenndu einn kost bókarinnar, t.d. með „Although the idea is interesting, …“.'], en: ['“I skipped some of it” is honest, but in an essay it is better to criticise the text than your own reading.', 'Admit one strength of the book, e.g. with “Although the idea is interesting, …”.'] },
    up: [['So the ending felt like all the reading was for nothing.', 'As a result, the ending left me wondering why I had followed Winston’s struggle at all.']],
    p: [
      [['hook', '“BIG BROTHER IS WATCHING YOU.”'], ['disc', 'These words are written under every poster in George Orwell’s Nineteen Eighty-Four. They are very famous, and I was excited to read the book because of them. My cousin told me it was the best book she had ever read. Sadly, the book was not what I had hoped for.'], ['thesis', 'I would not recommend Nineteen Eighty-Four to people my age, because it is boring in many places, the characters are hard to like and the ending made me angry.']],
      [['topic', 'Firstly, the book is boring in many places.'], ['sup', 'There are long parts where Winston only walks around and thinks about the Party and the past. The worst part is the book by Goldstein, which goes on for many pages and is like a history book. I skipped some of it, and I do not think I missed much. I kept checking how many pages were left. Even my friend, who loves reading, said that the middle was hard to get through.'], ['close', 'Therefore, it took me a very long time to finish the book.']],
      [['topic', 'Secondly, the characters are hard to like.'], ['sup', 'Winston is often grumpy, and he does not trust anyone. At the beginning, he even hates Julia and imagines hurting her, before he really knows her. O’Brien is cold and cruel, and most of the other people in the book are not very interesting. Julia is more fun, but we do not learn much about her life or her feelings.'], ['close', 'Because of this, I did not really care what happened to them.']],
      [['topic', 'Lastly, the ending made me angry.'], ['sup', 'Winston and Julia fight against the Party for a long time, but in the end the Party wins completely. In Room 101, Winston betrays Julia, and in the last scene he loves Big Brother. I wanted at least a little bit of hope, but there was nothing at all. Even Julia does not care about Winston anymore when they meet again. I closed the book and felt a bit cheated.'], ['close', 'So the ending felt like all the reading was for nothing.']],
      [['restate', 'In conclusion, I would not recommend Nineteen Eighty-Four to teenagers, because it is boring in many parts, the characters are hard to like and the ending is hopeless.'], ['wide', 'Maybe it is an important book, but it is not a fun one. If you want to read about a dark future, there are more exciting books out there, and Big Brother does not need to watch you read this one.']]
    ] },
  { id: 'l7', lvl: 1, side: 'read', title: 'Two Plus Two Make Five', stance: { is: 'Lesa · sannleikur, O’Brien, mikilvæg í dag', en: 'Read it · truth, O’Brien, important today' }, hook: { is: 'Röng jafna: 2 + 2 = 5', en: 'A wrong sum: 2 + 2 = 5' },
    good: { is: ['Kveikjan er stutt og sláandi; allir vita að hún er röng og vilja vita af hverju hún er þarna.', 'Rökin byggja hvert á öðru: sannleikur, maðurinn sem eyðir honum, og hvers vegna það skiptir máli í dag.', 'Endirinn snýr aftur að 2 + 2.'], en: ['The hook is short and striking; everyone knows it is wrong and wants to know why it is there.', 'The arguments build on each other: truth, the man who destroys it, and why it matters today.', 'The ending returns to 2 + 2.'] },
    better: { is: ['Closing sentence í 2. efnisgrein byrjar ekki á tengiorði; prófaðu „Therefore, …“.', 'Orðið „scary/scarier“ kemur oft fyrir; prófaðu chilling, sinister.'], en: ['The closing sentence of paragraph 2 does not start with a linking word; try “Therefore, …”.', 'The word “scary/scarier” appears often; try chilling, sinister.'] },
    up: [['He is calm and clever, and he almost seems kind, which makes him even scarier.', 'Calm, intelligent and almost gentle, O’Brien is far more chilling than a villain who shouts.']],
    p: [
      [['hook', '2 + 2 = 5.'], ['disc', 'Every child knows that this is wrong, but in George Orwell’s Nineteen Eighty-Four, the Party wants people to believe it. If the Party says that two plus two make five, then it is true. That is the frightening idea behind this famous book about Winston Smith and his fight against Big Brother.'], ['thesis', 'Nineteen Eighty-Four is a book that everyone should read, because it is about truth, it has a great villain and it is still important today.']],
      [['topic', 'Firstly, the book is about the truth and why it matters.'], ['sup', 'Winston knows that the Party lies, and he writes in his diary that freedom is being able to say that two plus two make four. This is a simple idea, but in his world it is a crime. When the Party says something happened, it happened, and old newspapers are changed to prove it. He tries to remember the real past, even when everyone around him forgets it.'], ['close', 'This made me understand that the truth is something we have to protect.']],
      [['topic', 'Secondly, O’Brien is a great villain.'], ['sup', 'At first, Winston thinks that O’Brien is his friend and that he is secretly against the Party. Later, we find out that O’Brien works for the Party, and he is the one who tortures Winston in the Ministry of Love. He is calm and clever, and he almost seems kind, which makes him even scarier. In Room 101, he finds Winston’s worst fear and uses it against him.'], ['close', 'Because of him, the last part of the book gave me goosebumps.']],
      [['topic', 'Finally, the book is still important today.'], ['sup', 'Orwell wrote it in 1949, but many things in it feel modern, like cameras that watch people and news that is not true. People still use words from the book, like “Big Brother”, when they talk about privacy. Even my parents knew what “Room 101” means, and they have never read the book. Many people also say that the book is about social media, even though Orwell never saw a smartphone.'], ['close', 'Therefore, reading the book helps you understand many things people talk about today.']],
      [['restate', 'In conclusion, Nineteen Eighty-Four is a book everyone should read, because it teaches us about truth, it has an unforgettable villain and it is still important today.'], ['wide', 'It is not a happy book, but it is a smart one. After you read it, you will never look at two plus two in quite the same way again.']]
    ] },
  { id: 'l8', lvl: 1, side: 'read', title: 'The Clocks Were Striking Thirteen', stance: { is: 'Lesa, þrátt fyrir hæga kafla · byrjun, ást, hugmyndir', en: 'Read it despite slow parts · beginning, love, ideas' }, hook: { is: 'Fyrsta setning bókarinnar', en: 'The first line of the book' },
    good: { is: ['Fyrsta setning bókarinnar er frábær kveikja, og höfundurinn útskýrir hvers vegna hún er undarleg.', 'Thesis viðurkennir galla („although some parts are slow“) og 4. efnisgrein svarar honum.', 'Lokaorðin vísa aftur í klukkuna úr kveikjunni.'], en: ['The first line of the book is a great hook, and the writer explains why it is strange.', 'The thesis admits a weakness (“although some parts are slow”) and paragraph 4 answers it.', 'The conclusion refers back to the clock from the hook.'] },
    better: { is: ['Í 2. efnisgrein mætti útskýra betur hvað tveggja mínútna hatrið segir um heiminn.', 'Orðaforðinn er einfaldur; mysterious og tension eru góð byrjun, bættu fleirum við.'], en: ['Paragraph 2 could explain better what the Two Minutes Hate says about the world.', 'The vocabulary is simple; mysterious and tension are a good start, add more.'] },
    up: [['So the beginning makes you want to read more.', 'In short, the mysterious opening pulls the reader straight into Winston’s world.']],
    p: [
      [['hook', '“It was a bright cold day in April, and the clocks were striking thirteen.”'], ['disc', 'This is the first sentence of Nineteen Eighty-Four by George Orwell, and from the very start you know that something is wrong, because normal clocks do not strike thirteen. The book is about Winston Smith, who lives in London under the control of Big Brother.'], ['thesis', 'Although some parts are slow, I would recommend this book, because the beginning is mysterious, the love story is exciting and the ideas are important.']],
      [['topic', 'Firstly, the beginning of the book is very mysterious.'], ['sup', 'Orwell does not explain everything at once. The reader slowly learns about the telescreens, the Thought Police and the Two Minutes Hate, where everybody screams at a face on a screen. I felt like I was discovering a strange new world together with Winston. Even the names of the ministries are strange, because the Ministry of Love is where people are tortured.'], ['close', 'So the beginning makes you want to read more.']],
      [['topic', 'Secondly, the love story between Winston and Julia is exciting.'], ['sup', 'Julia secretly gives Winston a note that says “I love you”, and after that they have to meet in secret. They find a small room above an old shop where they think they are safe. Every time they meet, the reader is afraid that someone will find them. Julia is also very different from Winston, because she only wants to enjoy life, while he wants to understand everything.'], ['close', 'As a result, the middle of the book is full of tension.']],
      [['topic', 'Finally, the ideas in the book are important.'], ['sup', 'The Party changes history, controls the news and even tries to control what people think. Orwell wanted to warn people about governments that have too much power. The book also asks if people can stay free inside their own heads. Some parts, like Goldstein’s long book, are slow and hard to read. However, they help the reader understand how the Party works.'], ['close', 'In other words, even the slow parts have a purpose.']],
      [['restate', 'To sum up, although Nineteen Eighty-Four is slow in some places, it is worth reading because of its mysterious beginning, its exciting love story and its important ideas.'], ['wide', 'I almost gave up in Part One, but I am glad I did not. It is the kind of book that stays in your head for a long time. And maybe the next time you hear a clock strike, you will think of Winston too.']]
    ] },
  { id: 'm1', lvl: 2, side: 'read', title: 'Worth the Effort', stance: { is: 'Lesa, þrátt fyrir galla · mótrök í thesis', en: 'Read it despite its flaws · counter-argument in the thesis' }, hook: { is: 'Sláandi staðreynd', en: 'Striking fact' },
    good: { is: ['Thesis byrjar á „Although…“: viðurkennir galla en heldur skoðuninni.', 'Höfundurinn er heiðarlegur („I almost gave up“) og það gerir ritgerðina trúverðuga.', 'Snjallt smáatriði í 4. efnisgrein: viðaukinn er í þátíð.'], en: ['The thesis opens with “Although…”: it admits a weakness but keeps the opinion.', 'The writer is honest (“I almost gave up”), which makes the essay believable.', 'A clever detail in paragraph 4: the appendix is in the past tense.'] },
    better: { is: ['Í 3. efnisgrein vantar persónulegt dæmi; hvað í okkar lífi minnir á bókina?', 'Sum orð eru endurtekin (slow, story). Fjölbreyttari orðaforði myndi lyfta henni á krefjandi stig.'], en: ['Paragraph 3 lacks a personal example; what in our lives reminds you of the book?', 'Some words are repeated (slow, story). More varied vocabulary would lift it to the challenging level.'] },
    up: [['I found these chapters painful to read, but they are honest.', 'These chapters are painful to read, yet their honesty is exactly what gives the novel its power.']],
    p: [
      [['hook', 'Few novels written more than seventy years ago are still quoted every day, but Nineteen Eighty-Four by George Orwell is one of them.'], ['disc', 'Words from it, such as “Big Brother” and “thought police”, appear in newspapers and all over social media. Still, I have to admit that I almost gave up on it after the first fifty pages. I am glad I did not.'], ['thesis', 'Although Nineteen Eighty-Four has a slow beginning, it is well worth reading, because of its growing tension, its frightening relevance and its brave ending.']],
      [['topic', 'To begin with, the story becomes more gripping the further you read.'], ['sup', 'It is true that Part One is slow, as Orwell spends many pages describing Winston’s grey life in London. However, this slow start has a purpose, because it shows how dangerous even the smallest act of rebellion is. By the time Winston and Julia meet in the secret room above Mr Charrington’s shop, I was reading with a knot in my stomach, sure that someone was listening.'], ['close', 'Consequently, the patient reader is rewarded with a story that is hard to put down.']],
      [['topic', 'Moreover, the novel is frighteningly relevant today.'], ['sup', 'The Party controls people by watching them and by rewriting the past, and its slogan “Who controls the past controls the future” explains exactly why. We carry phones that know where we are, and false information can spread around the world in minutes. Orwell wrote the book long before the internet, yet it describes our time surprisingly well.'], ['close', 'As a result, it feels less like science fiction and more like a warning.']],
      [['topic', 'Last but not least, Orwell has the courage to give the story a dark ending.'], ['sup', 'Instead of a heroic victory, Winston is broken by O’Brien in the Ministry of Love and made to believe that two plus two make five. I found these chapters painful to read, but they are honest, because a regime like the Party wants to control not only what people do but also what they think. Interestingly, the appendix about Newspeak is written in the past tense, which may hint that the Party did not last forever.'], ['close', 'Thus, the ending is both shocking and thought-provoking.']],
      [['restate', 'To sum up, despite its slow start, Nineteen Eighty-Four is a rewarding novel because of its tension, its relevance and its courageous ending.'], ['wide', 'If you start it, push through Part One. The book does not just entertain you; it changes the way you look at the news, your phone and maybe even yourself.']]
    ] },
  { id: 'm2', lvl: 2, side: 'avoid', title: 'Important, but Not Enjoyable', stance: { is: 'Sleppa · sanngjörn gagnrýni', en: 'Avoid it · fair criticism' }, hook: { is: 'Tilvitnun', en: 'Quotation' },
    good: { is: ['Neikvæð afstaða getur fengið 10 ef hún er sanngjörn: höfundurinn viðurkennir að bókin sé mikilvæg.', '„While this shows Orwell’s skill…“: kostur viðurkenndur, svo svarað.', 'Ákveðin dæmi alls staðar: Parsons, bók Goldsteins, Chestnut Tree.'], en: ['A negative stance can earn a 10 if it is fair: the writer admits the book is important.', '“While this shows Orwell’s skill…”: a strength admitted, then answered.', 'Specific examples throughout: Parsons, Goldstein’s book, the Chestnut Tree.'] },
    better: { is: ['„To be honest, I skimmed most of it“ er mannlegt en dálítið óformlegt; á krefjandi stigi væri það orðað formlegar.', 'Lokaorðin gætu nefnt hverjum bókin hentar, ekki bara hverjum hún hentar ekki.'], en: ['“To be honest, I skimmed most of it” is human but a little informal; at the challenging level it would be phrased more formally.', 'The conclusion could say who the book does suit, not only who it does not.'] },
    up: [['To be honest, I skimmed most of it.', 'I must admit that my attention drifted during these pages, and I doubt I am the only reader who felt that way.']],
    p: [
      [['hook', '“WAR IS PEACE. FREEDOM IS SLAVERY. IGNORANCE IS STRENGTH.”'], ['disc', 'These slogans from George Orwell’s Nineteen Eighty-Four are so famous that I knew them before I opened the book. The novel is often called one of the most important books of the twentieth century, and both my parents told me I had to read it. I did, and I understand why it is important. However, important books are not always enjoyable books.'], ['thesis', 'Unless you enjoy heavy and depressing stories, Nineteen Eighty-Four is a novel to avoid, because of its bleak atmosphere, its slow style and its hopeless ending.']],
      [['topic', 'Firstly, the atmosphere of the novel is extremely bleak.'], ['sup', 'From the first page, London is grey, dirty and cold, and the hallway of Victory Mansions smells of boiled cabbage. Nobody seems happy, and even family life is poisoned by fear, as when Parsons is reported to the Thought Police by his own little daughter. While this shows Orwell’s skill as a writer, it made reading the book feel like a chore rather than a pleasure.'], ['close', 'Therefore, readers looking for an exciting escape will not find it here.']],
      [['topic', 'Secondly, the story often moves very slowly.'], ['sup', 'Long sections explain the Party’s ideas instead of telling a story. The clearest example is the extract from Goldstein’s book in Part Two, which reads like a school textbook and stops the action for many pages. To be honest, I skimmed most of it. Similarly, O’Brien’s long speeches in the Ministry of Love feel more like lectures than real conversations.'], ['close', 'As a result, it sometimes seems that Orwell cares more about his message than about his characters.']],
      [['topic', 'Finally, the ending leaves the reader with no hope at all.'], ['sup', 'After everything he has been through, Winston betrays Julia in Room 101, begging the guards to “Do it to Julia!” He ends up alone in the Chestnut Tree Café, drinking gin, and the book closes with the words “He loved Big Brother.” Some readers admire this courage, but I closed the book feeling empty. I have never read a sadder last line.'], ['close', 'In other words, the ending is powerful but deeply depressing.']],
      [['restate', 'In conclusion, Nineteen Eighty-Four may be a famous classic, but its bleak world, slow passages and hopeless ending make it hard to enjoy.'], ['wide', 'If you simply want to understand its ideas, a good summary or a film version might be enough. There are plenty of books that teach important lessons without leaving you miserable for a week. I respect this novel, but I cannot honestly say that I enjoyed it.']]
    ] },
  { id: 'm3', lvl: 2, side: 'read', title: 'A Love Story That Cannot Win', stance: { is: 'Lesa · ástarsaga, persónur, fléttan', en: 'Read it · love story, characters, the twist' }, hook: { is: 'Spurning', en: 'Question' },
    good: { is: ['Óvænt sjónarhorn: bókin lesin sem ástarsaga. Kennarar taka eftir frumlegri nálgun.', 'Persónurnar eru bornar saman („while Julia…“), sem sýnir greiningu en ekki endursögn.', 'Smá húmor (Julia sofnar yfir bók Goldsteins) gerir textann mannlegan.'], en: ['An unexpected angle: the book read as a love story. Teachers notice an original approach.', 'The characters are compared (“while Julia…”), which shows analysis rather than retelling.', 'A little humour (Julia falls asleep over Goldstein’s book) makes the text human.'] },
    better: { is: ['Efnisgrein 4 er nálægt því að endursegja; meira mat („this matters because…“) myndi styrkja hana.', 'Closing sentence í 4. efnisgrein mætti byrja á tengiorði.'], en: ['Paragraph 4 comes close to retelling; more evaluation (“this matters because…”) would strengthen it.', 'The closing sentence of paragraph 4 could start with a linking word.'] },
    up: [['This turn makes the second half of the book impossible to put down.', 'Consequently, this betrayal transforms the second half of the novel into a genuinely gripping read.']],
    p: [
      [['hook', 'Can love survive in a world where even your thoughts are watched?'], ['disc', 'That is the question at the heart of George Orwell’s Nineteen Eighty-Four. Most people know it as a political novel about Big Brother, but for me it was just as much a love story. Winston Smith and Julia meet in secret, knowing that the Party could destroy them at any moment.'], ['thesis', 'Nineteen Eighty-Four is a book I would recommend to anyone, because of its tense love story, its interesting characters and its shocking twist.']],
      [['topic', 'To begin with, the love story between Winston and Julia is full of tension.'], ['sup', 'It starts when Julia secretly hands Winston a note with the words “I love you”, which is a dangerous thing to do in a world without privacy. After that, every meeting has to be planned carefully, first in the countryside and later in a small room above Mr Charrington’s shop. In a world where love is almost a crime, even a simple date feels like an act of rebellion.'], ['close', 'Therefore, the romance makes the book far more exciting than I expected.']],
      [['topic', 'Moreover, the characters are interesting because they are so different.'], ['sup', 'Winston thinks a lot about the past and dreams of overthrowing the Party, while Julia does not care about big ideas and simply wants to enjoy life. At one point she even falls asleep while Winston is reading Goldstein’s book aloud to her, which I found quite funny. O’Brien is different again: calm, intelligent and impossible to read.'], ['close', 'As a result, the characters feel like real people with their own reasons and weaknesses.']],
      [['topic', 'Finally, the novel has a twist that I did not see coming.'], ['sup', 'Winston trusts O’Brien and believes he is part of the secret Brotherhood. However, when Winston and Julia are arrested, he learns that Mr Charrington works for the Thought Police and that O’Brien has been loyal to the Party all along. In the Ministry of Love, the man Winston trusted most becomes his torturer. Looking back, there are small hints, but I missed every single one of them.'], ['close', 'This turn makes the second half of the book impossible to put down.']],
      [['restate', 'In conclusion, Nineteen Eighty-Four is much more than a book about politics, thanks to its tense love story, its interesting characters and its shocking twist.'], ['wide', 'It shows how fragile love and trust can be when people live in fear. Read it for the ideas if you like, but you may end up remembering Winston and Julia most of all.']]
    ] },
  { id: 'k1', lvl: 3, side: 'read', title: 'A Warning Everyone Should Read', stance: { is: 'Lesa · söguhetjan, heimurinn, endirinn', en: 'Read it · the protagonist, the world, the ending' }, hook: { is: 'Spurning', en: 'Question' },
    good: { is: ['Nákvæmur orðaforði: protagonist, uncompromising, deliberately twisted, lingers.', 'Fjölbreyttar setningar: stuttar og langar, og sumar byrja ekki á frumlaginu („Published in 1949, …“).', 'Rökin fara dýpra en „þetta er gott“: endirinn er góður VEGNA ÞESS að hann styður viðvörun Orwells.'], en: ['Precise vocabulary: protagonist, uncompromising, deliberately twisted, lingers.', 'Varied sentences: short and long, and some do not start with the subject (“Published in 1949, …”).', 'The arguments go deeper than “this is good”: the ending works BECAUSE it supports Orwell’s warning.'] },
    better: { is: ['Þetta er ritgerð á efsta stigi. Takið eftir hvernig persónuleg rödd („myself included“) lifir með formlegu máli.'], en: ['This is a top-level essay. Notice how a personal voice (“myself included”) lives alongside formal language.'] },
    up: [],
    p: [
      [['hook', 'Have you ever felt, for a split second, that someone was watching you?'], ['disc', 'For most of us it is a passing thought, but for Winston Smith, the main character of George Orwell’s Nineteen Eighty-Four, it is simply how life works. Published in 1949, the novel imagines a future Britain ruled by the Party and its ever-present leader, Big Brother. I expected a dry political book; what I got was one of the most disturbing stories I have ever read.'], ['thesis', 'Nineteen Eighty-Four is a novel that everyone should read, because of its believable protagonist, its terrifying world and its uncompromising ending.']],
      [['topic', 'Firstly, Winston is a hero the reader can genuinely believe in, precisely because he is not heroic.'], ['sup', 'He is thirty-nine, frail and troubled by an ulcer on his ankle, and he lives in constant fear of the Thought Police. Yet he secretly begins a diary, an act that could cost him his life. He is also haunted by guilt about how he treated his mother and little sister as a child, which gives him a depth many fictional heroes lack.'], ['close', 'In short, Winston’s weaknesses are exactly what make him so convincing.']],
      [['topic', 'Secondly, the world of the novel is among the most frightening ever written.'], ['sup', 'Telescreens watch people in their own homes and can never be switched off. Children are trained to spy on their parents, and Winston’s job at the Ministry of Truth is to rewrite old newspapers so that the Party is never wrong. Even the names are deliberately twisted: the Ministry of Love is where prisoners are tortured. What makes this world truly chilling is how much of it echoes modern debates about surveillance and fake news.'], ['close', 'Therefore, the setting is not only gripping but also forces the reader to look critically at our own society.']],
      [['topic', 'Finally, the ending is shocking but entirely fitting.'], ['sup', 'Many readers, myself included, hope that Winston and Julia will somehow outwit the Party, but in Room 101 Winston betrays the woman he loves. The final line, “He loved Big Brother”, is crushing precisely because it is so quiet. A triumphant ending would have been more comforting, but it would have undermined Orwell’s warning about what absolute power can do to the human mind.'], ['close', 'For this reason, the ending lingers long after the last page.']],
      [['restate', 'In conclusion, Nineteen Eighty-Four is a gripping and important novel thanks to its believable protagonist, its terrifying world and its unforgettable ending.'], ['wide', 'It is not an easy read, nor is it meant to be. Rather, it teaches us to value freedom and to question what we are told, and a world without those things may be closer than we like to think.']]
    ] },
  { id: 'k2', lvl: 3, side: 'read', title: 'A Must-Read for Young People', stance: { is: 'Lesa · tungumál, sannleikur, friðhelgi', en: 'Read it · language, truth, privacy' }, hook: { is: 'Ímyndaðu þér…', en: 'Imagine…' },
    good: { is: ['Rökin fjalla um hugmyndir bókarinnar en ekki persónur og söguþráð. Það er krefjandi og vel gert.', 'Talar beint til markhópsins (ungs fólks) og tengir bókina við líf hans.', 'Endirinn snýr aftur að frægri setningu úr bókinni.'], en: ['The arguments are about the book’s ideas, not its characters and plot. That is demanding and well done.', 'It speaks directly to its audience (young people) and links the book to their lives.', 'The ending returns to a famous line from the book.'] },
    better: { is: ['Ritgerð á efsta stigi. Takið eftir orðum eins og fragility, absurd og tellingly, og hvernig hver efnisgrein endar á skýrri niðurstöðu.'], en: ['A top-level essay. Notice words like fragility, absurd and tellingly, and how every paragraph ends on a clear conclusion.'] },
    up: [],
    p: [
      [['hook', 'Imagine a world where it is a crime to think the wrong thoughts and where the dictionary gets thinner every year.'], ['disc', 'This is the world of George Orwell’s Nineteen Eighty-Four, in which Winston Smith struggles to stay human under the rule of the Party and Big Brother. The book was written in 1949, yet when I read it, it felt as if it had been written about my generation.'], ['thesis', 'Nineteen Eighty-Four is a must-read for young people, because it reveals the power of language, the fragility of truth and the danger of giving up our privacy.']],
      [['topic', 'First of all, the novel shows how language can be used as a weapon.'], ['sup', 'The Party is creating Newspeak, a language with fewer words every year. Winston’s colleague Syme explains, almost cheerfully, that the aim is to make rebellious thoughts impossible, because there will be no words left to express them. The idea sounds absurd at first, but it made me realise how much our vocabulary shapes what we are able to think. Tellingly, Syme himself later vanishes, as if he had never existed.'], ['close', 'Thus, the novel teaches us that words are not only tools for communication but also tools for freedom.']],
      [['topic', 'In addition, the book makes the reader reconsider what truth really is.'], ['sup', 'Winston works at the Ministry of Truth, where his job is to rewrite old articles so that the Party is always right. Early on, he writes in his diary that freedom is the freedom to say that two plus two make four. Later, however, O’Brien tortures him until he truly sees five fingers when only four are held up. The scene is painful to read, because the reader knows that Winston is right.'], ['close', 'Consequently, the novel shows that defending simple facts can require enormous courage.']],
      [['topic', 'Most importantly, the novel is a warning about privacy that feels remarkably modern.'], ['sup', 'In Winston’s flat, the telescreen both watches and listens, and it can never be turned off. Today, many of us carry smartphones with cameras and microphones and share our lives online without a second thought. Orwell could not have imagined the internet, yet his picture of a society where everybody is watched is uncomfortably close to ours.'], ['close', 'For this reason, young readers in particular will recognise their own world in the book.']],
      [['restate', 'In light of all these points, Nineteen Eighty-Four is an essential book for young people, thanks to its lessons about language, truth and privacy.'], ['wide', 'Although it is dark and at times demanding, it gives readers the tools to recognise manipulation when they see it. Read it, and you will never hear the words “Big Brother is watching you” in quite the same way again.']]
    ] },
  { id: 'k3', lvl: 3, side: 'avoid', title: 'Easy to Admire, Hard to Enjoy', stance: { is: 'Aðeins fyrir áhugafólk um stjórnmál · blæbrigðarík gagnrýni', en: 'Only for readers interested in politics · nuanced criticism' }, hook: { is: 'Þversögn', en: 'Paradox' },
    good: { is: ['Blæbrigðarík afstaða: ekki „lesa“ eða „sleppa“, heldur „hverjum hentar hún“. Það er háþróað.', 'Gagnrýnin er sanngjörn: „Admittedly, …“ og „Nevertheless, …“ sýna að höfundurinn vegur og metur.', 'Lokasetningin (admire … enjoy) endurómar kveikjuna.'], en: ['A nuanced stance: not “read” or “avoid” but “who it suits”. That is sophisticated.', 'The criticism is fair: “Admittedly, …” and “Nevertheless, …” show the writer weighing both sides.', 'The final sentence (admire … enjoy) echoes the hook.'] },
    better: { is: ['Ritgerð á efsta stigi. Takið eftir hvernig höfundurinn notar „Orwell the thinker“ og „Orwell the storyteller“ til að draga saman hugmynd í eina setningu.'], en: ['A top-level essay. Notice how the writer uses “Orwell the thinker” and “Orwell the storyteller” to sum up an idea in one sentence.'] },
    up: [],
    p: [
      [['hook', 'It is strange to admire a book and still not enjoy it, but that is exactly how I feel about George Orwell’s Nineteen Eighty-Four.'], ['disc', 'The novel, published in 1949, describes a totalitarian state in which the Party controls not only what people do but also what they think, and its ideas have shaped how we talk about power ever since. As a story, however, it disappointed me. I finished it impressed, but also relieved that it was over.'], ['thesis', 'Nineteen Eighty-Four is a novel I would only recommend to readers with a strong interest in politics, because its characters are thin, its pace is uneven and its message often overwhelms the story.']],
      [['topic', 'Firstly, apart from Winston, the characters are surprisingly thin.'], ['sup', 'Julia is presented as brave and rebellious, yet we learn little about her beyond her hatred of the Party and her talent for breaking rules. Her past, for instance, is covered in a few short lines. Characters such as Parsons and Syme exist mainly to illustrate an idea: the loyal fool and the intellectual who knows too much. Even O’Brien, the most memorable figure, remains a mystery whose motives are never fully explained.'], ['close', 'Consequently, it is hard to care deeply about anyone except Winston.']],
      [['topic', 'Secondly, the pace of the novel is uneven.'], ['sup', 'Part One moves slowly through Winston’s routine, and just when Part Two finally builds real tension, Orwell stops the story for a long extract from Goldstein’s book. These chapters read like a political essay, and I must confess that I found myself counting the pages. Admittedly, they explain how the Party keeps its power.'], ['close', 'Nevertheless, a novel should not need a textbook in the middle to make its point.']],
      [['topic', 'Finally, the message often overwhelms the story.'], ['sup', 'In Part Three, O’Brien delivers long speeches about power while Winston mostly suffers and listens. These scenes are intellectually fascinating, but they feel more like a debate than a living scene between two people. Even the famous ending, “He loved Big Brother”, works better as a political statement than as the end of a personal journey.'], ['close', 'In other words, Orwell the thinker sometimes gets in the way of Orwell the storyteller.']],
      [['restate', 'In conclusion, Nineteen Eighty-Four is an important book, but its thin characters, uneven pace and heavy-handed message make it a frustrating novel for many readers.'], ['wide', 'If you are fascinated by politics and history, you will find a great deal to think about. If you simply want a gripping story, however, you may admire this book far more than you enjoy it.']]
    ] },
  { id: 'n1', lvl: 3, side: 'read', title: 'Why Nineteen Eighty-Four Still Matters', stance: { is: 'Lesa, þrátt fyrir hæga kafla · heimurinn, tæknin, nýmál', en: 'Read it despite slow parts · the world, technology, Newspeak' }, hook: { is: 'Ímyndaðu þér…', en: 'Imagine…' },
    good: { is: ['Inngangurinn er skrifaður af nemanda og aðeins lagfærður. Meginmál og lokaorð fylgja thesis nákvæmlega, í sömu röð.', 'Mótrökunum úr thesis („difficult and may feel slow“) er svarað í 4. efnisgrein með „It is true … However, …“.', 'Hver efnisgrein hefur tvö til þrjú ákveðin dæmi: Airstrip One, Two Minutes Hate, fjarskjárinn, dagbókin, bók Goldsteins.'], en: ['The introduction was written by a student and only lightly corrected. The body and conclusion follow the thesis exactly, in the same order.', 'The counter-argument in the thesis (“difficult and may feel slow”) is answered in paragraph 4 with “It is true … However, …”.', 'Each paragraph has two or three specific examples: Airstrip One, the Two Minutes Hate, the telescreen, the diary, Goldstein’s book.'] },
    better: { is: ['Berðu saman upprunalegu thesis-setninguna hér fyrir neðan og þá lagfærðu: rökin þrjú þurfa öll sama málfræðilega form.', 'Takið eftir að lokaorðin endurtaka rökin þrjú í nýjum orðum (fascinating world, increasingly relevant message, original concepts).'], en: ['Compare the original thesis sentence below with the corrected one: all three arguments need the same grammatical form.', 'Notice that the conclusion repeats the three arguments in new words (fascinating world, increasingly relevant message, original concepts).'] },
    up: [['…its message is getting more important due to technology and of interesting concepts Orwell created for the book like NEWSPEAK and thoughtcrime.', '…its message is becoming more relevant because of technology, and the concepts Orwell invented, such as Newspeak and thoughtcrime, are interesting.']],
    p: [
      [['hook', 'Imagine living in a world where the government watches everything you do, controls what you think and can change the truth whenever it wants.'], ['disc', 'This is the dystopian world of Nineteen Eighty-Four, published by George Orwell in 1949. The book is about power, fear and freedom, and it makes the reader think about how society should work.'], ['thesis', 'Although some parts of the story are difficult and may feel slow, I believe people should read it, because the world it is set in is fascinating, its message is becoming more relevant because of technology, and the concepts Orwell invented, such as Newspeak and thoughtcrime, are interesting.']],
      [['topic', 'Firstly, the world in which the novel is set is fascinating.'], ['sup', 'Orwell describes Airstrip One, a grey version of London where telescreens watch people in their own homes and posters of Big Brother hang on every wall. Every detail shows how complete the Party’s control is, from the Two Minutes Hate, where everyone screams at the face of the enemy, to the Ministry of Truth, where Winston rewrites old newspapers so that the Party is never wrong.'], ['close', 'Therefore, the reader is drawn into Winston’s world from the very first page.']],
      [['topic', 'Secondly, the message of the novel is becoming more relevant because of modern technology.'], ['sup', 'In the book, the telescreen both watches and listens, and it can never be switched off. Today, most of us carry smartphones with cameras and microphones, and companies and governments can collect enormous amounts of information about us. Furthermore, the Party’s habit of changing the past reminds us of how easily fake news and edited images spread online. Orwell could not have imagined the internet, yet his warning fits our time remarkably well.'], ['close', 'As a result, the book feels less like science fiction and more like a description of a possible future.']],
      [['topic', 'Finally, the concepts Orwell invented, such as Newspeak and thoughtcrime, are some of the most interesting parts of the book.'], ['sup', 'Newspeak is a language designed to have fewer words every year, so that rebellious thoughts become impossible because there are no words to express them. Thoughtcrime means that even thinking against the Party is a crime, which is why Winston is in danger the moment he opens his diary. It is true that the parts explaining these ideas, such as Goldstein’s book, can feel slow. However, they are what make the novel so thought-provoking, and words like “Big Brother” and “doublethink” are still used today.'], ['close', 'In short, Orwell’s ideas have outlived the story itself.']],
      [['restate', 'In conclusion, although some parts of Nineteen Eighty-Four are slow and demanding, it is well worth reading because of its fascinating world, its increasingly relevant message and the original concepts Orwell created.'], ['wide', 'The novel reminds us how valuable freedom and truth are, and how easily they can be taken away. Everyone should read it, because the best way to protect our freedom is to understand how it can be lost.']]
    ] }
];
const RG_LEVELS = { 1: { is: ['Létt', 'Einfalt mál og stuttar setningar, en rétt uppbygging. Sýnir að skýr ritgerð þarf ekki flókin orð.'], en: ['Easy', 'Simple language and short sentences, but the right structure. Shows that a clear essay does not need difficult words.'] }, 2: { is: ['Miðlungs', 'Lengri setningar, fjölbreyttari tengiorð og ákveðin dæmi. Höfundurinn viðurkennir galla og svarar.'], en: ['Medium', 'Longer sentences, more varied linking words and specific examples. The writer admits weaknesses and answers them.'] }, 3: { is: ['Krefjandi', 'Nákvæmur orðaforði, fjölbreyttar setningar og dýpri greining. Svona lítur 10 út.'], en: ['Challenging', 'Precise vocabulary, varied sentences and deeper analysis. This is what a 10 looks like.'] } };
const RG_LADDER = {
  1: 'Firstly, Winston is a normal man, and that is why I like him. He is not strong and he is often afraid. He writes a diary, which is not allowed. I was nervous for him all the time. So he is a good main character.',
  2: 'Firstly, Winston is a believable main character because he is so ordinary. He is thirty-nine, thin and often ill, and he is constantly afraid of the Thought Police. Even so, he starts a secret diary, which could cost him his life. Because of this, the reader worries about him from the very first chapter. In short, his weaknesses make him easy to believe in.',
  3: 'Firstly, Winston is a hero the reader can genuinely believe in, precisely because he is not heroic. Frail, middle-aged and troubled by an ulcer, he lives in constant fear of the Thought Police. Yet he risks everything by keeping a diary, a small act of defiance that the reader instantly understands. His guilt about the past adds a depth many fictional heroes lack. In short, it is Winston’s weaknesses that make him so convincing.'
};
/* --- hlustun: ritgerðin á endurtekningu (heldur áfram með læstan síma) --- */
const RGA_RATES_OK = r => [0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.25, 1.5].includes(+r) ? +r : 1;
const RGA = { a: null, ver: store.get('rg:aver', 'full'), rate: RGA_RATES_OK(store.get('rg:arate', 1)), loop: store.get('rg:aloop', true), url: {}, state: '', laps: 0 };
const RGA_FILES = { full: '1984/ritgerd/n1-ryan-v3.mp3', hle: '1984/ritgerd/n1-ryan-hle-v3.mp3' };
const RGA_RATES = [0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.25, 1.5];
async function rgaUrl(ver, dl) {
  const k = ver + (dl ? ':dl' : ''), c = RGA.url[k];
  if (c && c.t > Date.now()) return c.u;
  const opt = dl ? { download: ver === 'hle' ? '1984-ritgerd-med-hleum.mp3' : '1984-ritgerd.mp3' } : undefined;
  const { data, error } = await window.Grettla.sb.storage.from('hljod').createSignedUrl(RGA_FILES[ver], 6 * 3600, opt);
  if (error || !data) throw error || new Error('no url');
  RGA.url[k] = { u: data.signedUrl, t: Date.now() + 5.5 * 3600 * 1000 };
  return data.signedUrl;
}
function rgaUi() {
  $$('.rgaud').forEach(box => {
    const pp = $('.rga-pp', box), st = $('.rga-st', box);
    if (pp) pp.textContent = RGA.state === 'play' ? '❚❚' : '▶';
    if (pp) pp.setAttribute('aria-label', RGA.state === 'play' ? rgT('Gera hlé', 'Pause') : rgT('Spila', 'Play'));
    if (st) st.textContent = RGA.state === 'load' ? rgT('Sæki hljóð…', 'Loading audio…') : RGA.state === 'err' ? rgT('Ekki tókst að sækja hljóðið. Ertu innskráð(ur)?', 'Could not load the audio. Are you logged in?') : RGA.state === 'play' ? rgT(`Spilar${RGA.loop ? ' í hring' : ''}${RGA.laps ? ` · umferð ${RGA.laps + 1}` : ''}`, `Playing${RGA.loop ? ' on repeat' : ''}${RGA.laps ? ` · round ${RGA.laps + 1}` : ''}`) : '';
    const bar = $('.rga-bar i', box); if (bar && RGA.a && RGA.a.duration) bar.style.width = (RGA.a.currentTime / RGA.a.duration * 100) + '%';
    $$('[data-aver]', box).forEach(b => b.setAttribute('aria-pressed', b.dataset.aver === RGA.ver));
    const lp = $('.rga-loop', box); if (lp) lp.setAttribute('aria-pressed', RGA.loop);
  });
}
function rgaMedia() {
  if (!('mediaSession' in navigator)) return;
  try {
    navigator.mediaSession.metadata = new MediaMetadata({ title: RGA.ver === 'hle' ? 'Why Nineteen Eighty-Four Still Matters (með hléum)' : 'Why Nineteen Eighty-Four Still Matters', artist: 'Ritgerð · 1984', album: 'grettla.com' });
    navigator.mediaSession.setActionHandler('play', () => rgaPlay());
    navigator.mediaSession.setActionHandler('pause', () => { if (RGA.a) RGA.a.pause(); });
    navigator.mediaSession.setActionHandler('seekbackward', () => { if (RGA.a) RGA.a.currentTime = Math.max(0, RGA.a.currentTime - 10); });
    navigator.mediaSession.setActionHandler('seekforward', () => { if (RGA.a) RGA.a.currentTime = Math.min(RGA.a.duration || 0, RGA.a.currentTime + 10); });
    navigator.mediaSession.setActionHandler('previoustrack', () => { if (RGA.a) RGA.a.currentTime = 0; });
  } catch (_) {}
}
async function rgaPlay() {
  try {
    if (typeof Player !== 'undefined' && Player.pause) Player.pause();
    if (typeof SumAudio !== 'undefined' && SumAudio.pause) SumAudio.pause();
  } catch (_) {}
  if (!RGA.a) {
    RGA.a = new Audio(); RGA.a.preload = 'auto';
    RGA.a.addEventListener('play', () => { RGA.state = 'play'; rgaUi(); });
    RGA.a.addEventListener('pause', () => { if (RGA.state !== 'load') RGA.state = ''; rgaUi(); });
    RGA.a.addEventListener('timeupdate', () => { const t = RGA.a.currentTime; if (RGA.last > 5 && t < 1) RGA.laps++; RGA.last = t; rgaUi(); });
    RGA.a.addEventListener('ended', () => { RGA.state = ''; rgaUi(); });
    RGA.a.addEventListener('error', () => { RGA.state = 'err'; RGA.url = {}; rgaUi(); });
  }
  if (!RGA.a.src || RGA.a.dataset.ver !== RGA.ver) {
    RGA.state = 'load'; rgaUi();
    try { RGA.a.src = await rgaUrl(RGA.ver); RGA.a.dataset.ver = RGA.ver; RGA.laps = 0; RGA.last = 0; } catch (e) { RGA.state = 'err'; rgaUi(); return; }
  }
  RGA.a.loop = RGA.loop; RGA.a.playbackRate = RGA.rate;
  rgaMedia();
  try { await RGA.a.play(); } catch (e) { RGA.state = 'err'; rgaUi(); }
}
function rgListenBox() {
  return `<div class="rgaud"><div class="rga-row">
      <button class="rga-pp" aria-label="${rgT('Spila', 'Play')}">▶</button>
      <div class="rga-mid"><b>${rgT('Hlustaðu á ritgerðina', 'Listen to the essay')}</b><span class="rga-st" aria-live="polite"></span><div class="rga-bar"><i></i></div></div>
    </div>
    <div class="rga-opts">
      <span class="rgmode" role="toolbar"><button data-aver="full" aria-pressed="${RGA.ver === 'full'}">${rgT('Í heild', 'Whole essay')}</button><button data-aver="hle" aria-pressed="${RGA.ver === 'hle'}">${rgT('Hlé eftir hverja setningu', 'Pause after each sentence')}</button></span>
      <button class="rga-loop rgbtn alt" aria-pressed="${RGA.loop}">⟲ ${rgT('Endurtaka', 'Repeat')}</button>
      <label class="rga-rate">${rgT('Hraði', 'Speed')} <select title="${rgT('Upplesturinn sjálfur er hægur; 1× er rólegur talhraði', 'The reading itself is slow; 1× is a calm pace')}">${RGA_RATES.map(r => `<option value="${r}" ${r === RGA.rate ? 'selected' : ''}>${L === 'is' ? String(r).replace('.', ',') : r}×</option>`).join('')}</select></label>
      <button class="rga-dl rgbtn alt">${rgT('Sækja mp3', 'Download mp3')}</button>
    </div>
    <p class="rga-help">${rgT('Ýttu á spila og læstu svo símanum: ritgerðin heldur áfram í hring. Ekki loka vafranum eða flipanum, bara læsa skjánum. Í útgáfunni með hléum endurtekurðu hverja setningu upphátt í þögninni, eða segir næstu setningu áður en hún kemur. Viltu hlusta án vafrans? Sæktu mp3 og settu það á endurtekningu í tónlistarforriti.', 'Press play and lock your phone: the essay keeps going on repeat. Do not close the browser or the tab, just lock the screen. In the version with pauses, repeat each sentence aloud in the silence, or say the next sentence before it comes. Want to listen without the browser? Download the mp3 and put it on repeat in a music app.')}</p></div>`;
}
function rgListenBind() {
  $$('.rgaud').forEach(box => {
    $('.rga-pp', box).onclick = () => { if (RGA.a && RGA.state === 'play') RGA.a.pause(); else rgaPlay(); };
    $$('[data-aver]', box).forEach(b => b.onclick = () => { const was = RGA.state === 'play'; RGA.ver = b.dataset.aver; store.set('rg:aver', RGA.ver); if (RGA.a) { RGA.a.pause(); RGA.a.removeAttribute('src'); RGA.a.dataset.ver = ''; } RGA.state = ''; rgaUi(); if (was) rgaPlay(); });
    $('.rga-loop', box).onclick = () => { RGA.loop = !RGA.loop; store.set('rg:aloop', RGA.loop); if (RGA.a) RGA.a.loop = RGA.loop; rgaUi(); };
    $('.rga-rate select', box).onchange = e => { RGA.rate = +e.target.value; store.set('rg:arate', RGA.rate); if (RGA.a) RGA.a.playbackRate = RGA.rate; };
    $('.rga-dl', box).onclick = async () => { try { const u = await rgaUrl(RGA.ver, true); const a = document.createElement('a'); a.href = u; a.rel = 'noopener'; document.body.appendChild(a); a.click(); a.remove(); } catch (e) { RGA.state = 'err'; rgaUi(); } };
  });
  rgaUi();
}
/* --- sýnidæmi: viðmót --- */
const RG_ROLES = { hook: ['Kveikja', 'Hook'], disc: ['Umræða', 'Discussion'], thesis: ['Thesis', 'Thesis'], topic: ['Topic sentence', 'Topic sentence'], sup: ['Stuðningur og dæmi', 'Support and examples'], close: ['Closing sentence', 'Closing sentence'], restate: ['Thesis endurorðuð', 'Thesis restated'], wide: ['Endað vítt', 'Ending wide'] };
const rgLinkRe = () => new RegExp(`(^|[\\s“"(])(${[...RG_LINK].sort((a, b) => b.length - a.length).map(l => l.replace(/ /g, '\\s+')).join('|')})(?=[\\s,.;:])`, 'gi');
const rgDots = n => `<span class="rgdots" aria-label="${RG_LEVELS[n][L][0]}">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</span>`;
function rgSamples() {
  const lv = store.get('rg:lvl', 'all'), mode = store.get('rg:mode', 'struct');
  const list = RG_ESSAYS.filter(e => lv === 'all' || e.lvl === +lv);
  let id = store.get('rg:essid', 'l1'); if (!list.some(e => e.id === id)) id = list[0].id;
  const e = RG_ESSAYS.find(x => x.id === id), lvT = RG_LEVELS[e.lvl][L];
  const words = rgWords(e.p.map(p => p.map(s => s[1]).join(' ')).join(' '));
  const mark = h => h.replace(rgLinkRe(), (m, pre, w) => `${pre}<b class="lk">${w}</b>`);
  const skelR = ['thesis', 'topic', 'close', 'restate'];
  const seg = ([r, x]) => {
    if (mode === 'skel' && !skelR.includes(r)) return `<span class="sg dim">[${RG_ROLES[r][L === 'is' ? 0 : 1]}]</span>`;
    const h = mode === 'plain' ? esc(x) : mark(esc(x));
    return `<span class="sg ${r}">${h}</span>`;
  };
  const modes = [['plain', rgT('Venjulegur texti', 'Plain text')], ['struct', rgT('Litamerkt uppbygging', 'Colour-coded structure')], ['skel', rgT('Bara beinagrindin', 'Skeleton only')]];
  return `<div class="rgbox red"><p style="margin:0">${rgT(`${RG_ESSAYS.length} ritgerðir eftir „nemendur“ á þremur erfiðleikastigum, sumar með bókinni og sumar á móti. Byrjaðu á því stigi sem þér finnst líkast þér og færðu þig svo upp. <b>Ekki læra þær utan að.</b> Kennarinn þekkir þær og ritgerð sem er lærð utan að hljómar ekki eins og þú. Notaðu þær til að sjá hvernig hlutarnir vinna saman og hvernig þú getur lyft þínum eigin setningum.`, `${RG_ESSAYS.length} essays by “students” at three levels of difficulty, some for the book and some against it. Start at the level that feels most like you and work your way up. <b>Do not memorise them.</b> Your teacher knows them, and a memorised essay does not sound like you. Use them to see how the parts work together and how you can lift your own sentences.`)}</p></div>
  <div class="rglv" role="toolbar">
    <button data-lv="all" aria-pressed="${lv === 'all'}"><b>${rgT('Allar', 'All')}</b><small>${RG_ESSAYS.length} ${rgT('ritgerðir', 'essays')}</small></button>
    ${[1, 2, 3].map(n => `<button data-lv="${n}" aria-pressed="${String(lv) === String(n)}">${rgDots(n)}<b>${RG_LEVELS[n][L][0]}</b><small>${RG_LEVELS[n][L][1]}</small></button>`).join('')}
  </div>
  <div class="rgess-pick" role="toolbar">${list.map(x => `<button data-ess="${x.id}" aria-pressed="${x.id === id}"><span class="etop">${rgDots(x.lvl)}<em class="sd-${x.side}">${x.side === 'read' ? rgT('Lesa', 'Read') : rgT('Sleppa', 'Avoid')}</em></span><b lang="en">${esc(x.title)}</b><small>${x.stance[L]}</small></button>`).join('')}</div>
  <div class="rgmode" role="toolbar">${modes.map(([k, l]) => `<button data-mode="${k}" aria-pressed="${mode === k}">${l}</button>`).join('')}</div>
  <div class="rgess-bar">${rgDots(e.lvl)} <b>${lvT[0]}</b> · ${words} ${rgT('orð', 'words')} · ${rgT('Kveikja', 'Hook')}: ${e.hook[L]}</div>
  ${mode !== 'plain' ? `<div class="rglegend">${['hook', 'disc', 'thesis', 'topic', 'sup', 'close', 'restate', 'wide'].map(r => `<span class="sg ${r}">${RG_ROLES[r][L === 'is' ? 0 : 1]}</span>`).join('')}<span><b class="lk">${rgT('tengiorð', 'linking word')}</b></span></div>` : ''}
  ${mode === 'skel' ? `<p class="rgnote">${rgT('Beinagrindin: thesis, topic sentences og closing sentences. Ef þú lest bara þetta ættirðu samt að skilja alla röksemdafærsluna. Þannig á þín ritgerð líka að virka.', 'The skeleton: thesis, topic sentences and closing sentences. Reading only these, you should still follow the whole argument. That is how your essay should work too.')}</p>` : ''}
  ${e.id === 'n1' ? rgListenBox() : ''}
  <article class="rgessay-view ${mode !== 'plain' ? 'struct' : ''}" lang="en"><h3>${esc(e.title)}</h3>${e.p.map((p, i) => `<p${i ? ' class="ind"' : ''}>${mode !== 'plain' ? `<em class="pn">${i + 1}</em>` : ''}${p.map(seg).join(' ')}</p>`).join('')}</article>
  <div class="rggrid">
    <div class="rgbox"><h3 style="color:#2d7a3e">${rgT('Það sem er gott', 'What works')}</h3><ul style="margin:0">${e.good[L].map(n => `<li>${n}</li>`).join('')}</ul></div>
    <div class="rgbox"><h3 style="color:var(--red)">${e.lvl < 3 ? rgT('Það sem mætti bæta', 'What could be better') : rgT('Takið eftir', 'Notice')}</h3><ul style="margin:0">${e.better[L].map(n => `<li>${n}</li>`).join('')}</ul></div>
  </div>
  ${e.up.length ? `<h2>${rgT('Lyftu setningunum', 'Lift the sentences')}</h2><p>${rgT('Setningar úr ritgerðinni. Reyndu fyrst að skrifa betri útgáfu sjálf(ur) og berðu svo saman.', 'Sentences from the essay. Try to write a better version yourself first, then compare.')}</p>
    ${e.up.map((u, i) => `<div class="rgup" data-up="${i}"><div class="b"><small>${rgT('Áður', 'Before')}</small><p lang="en">${esc(u[0])}</p></div><div class="rgf" style="margin:8px 0"><label for="rgup${i}">${rgT('Þín útgáfa', 'Your version')}</label><input type="text" id="rgup${i}" lang="en" autocomplete="off"></div><button class="rgbtn alt" data-upshow="${i}">${rgT('Sýna betri útgáfu', 'Show a better version')}</button><div class="a"><small>${rgT('Eftir', 'After')}</small><p lang="en">${esc(u[1])}</p></div></div>`).join('')}` : ''}
  <h2>${rgT('Sama efnisgrein á þremur stigum', 'The same paragraph at three levels')}</h2>
  <p>${rgT('Sama rök (Winston er trúverðugur), skrifuð þrisvar. Sjáðu hvað breytist þegar farið er upp um stig.', 'The same argument (Winston is believable), written three times. See what changes as you move up a level.')}</p>
  <div class="rgladder">${[1, 2, 3].map(n => `<div><h4>${rgDots(n)} ${RG_LEVELS[n][L][0]}</h4><p lang="en">${mark(esc(RG_LADDER[n]))}</p></div>`).join('')}</div>
  <div class="rggrid"><div class="rgbox"><h3>${rgT('Úr léttu í miðlungs', 'From easy to medium')}</h3><ul style="margin:0">${(L === 'is' ? ['Stuttar setningar tengdar saman (because, and, even so).', 'Nákvæmari dæmi: aldur, Thought Police, „could cost him his life“.', 'Lesandinn nefndur („the reader worries“) í stað „I was nervous“.', 'Closing sentence með tengiorði (In short) sem dregur saman.'] : ['Short sentences joined together (because, and, even so).', 'More precise examples: age, Thought Police, “could cost him his life”.', 'The reader mentioned (“the reader worries”) instead of “I was nervous”.', 'A closing sentence with a linking word (In short) that sums up.']).map(x => `<li>${x}</li>`).join('')}</ul></div>
    <div class="rgbox"><h3>${rgT('Úr miðlungs í krefjandi', 'From medium to challenging')}</h3><ul style="margin:0">${(L === 'is' ? ['Nákvæmari orð: genuinely, frail, defiance, convincing.', 'Fjölbreytt setningabyrjun: „Frail, middle-aged and…“, „Yet…“.', 'Ný hugmynd: hann er trúverðugur VEGNA ÞESS að hann er ekki hetja.', 'Smá dýpt: sektarkenndin gefur persónunni fleiri hliðar.'] : ['More precise words: genuinely, frail, defiance, convincing.', 'Varied sentence openings: “Frail, middle-aged and…”, “Yet…”.', 'A new idea: he is believable BECAUSE he is not a hero.', 'A little depth: his guilt gives the character more sides.']).map(x => `<li>${x}</li>`).join('')}</ul></div></div>
  <div class="rgbox"><h3>${rgT('Prófaðu þetta', 'Try this')}</h3><ul style="margin:0">${(L === 'is' ? ['Veldu „Bara beinagrindin“ og lestu. Skilurðu röksemdafærsluna án dæmanna?', 'Berðu saman „Read It, Even If It Is Scary“ (létt) og „A Warning Everyone Should Read“ (krefjandi): sömu rök, ólíkt mál.', 'Berðu saman „Not My Kind of Book“ og „Easy to Admire, Hard to Enjoy“: tvær neikvæðar ritgerðir á ólíkum stigum.', 'Taktu eina efnisgrein úr þinni eigin áætlun og skrifaðu hana á næsta stigi fyrir ofan.'] : ['Choose “Skeleton only” and read. Can you follow the argument without the examples?', 'Compare “Read It, Even If It Is Scary” (easy) and “A Warning Everyone Should Read” (challenging): the same arguments, different language.', 'Compare “Not My Kind of Book” and “Easy to Admire, Hard to Enjoy”: two negative essays at different levels.', 'Take one paragraph from your own plan and rewrite it one level higher.']).map(n => `<li>${n}</li>`).join('')}</ul></div>`;
}
function rgSamplesBind() {
  const keep = fn => () => { const y = window.scrollY; fn(); renderRitgerd(); window.scrollTo(0, y); };
  $$('[data-lv]').forEach(b => b.onclick = keep(() => store.set('rg:lvl', b.dataset.lv === 'all' ? 'all' : +b.dataset.lv)));
  $$('[data-ess]').forEach(b => b.onclick = keep(() => store.set('rg:essid', b.dataset.ess)));
  $$('[data-mode]').forEach(b => b.onclick = keep(() => store.set('rg:mode', b.dataset.mode)));
  $$('[data-upshow]').forEach(b => b.onclick = () => { b.closest('.rgup').classList.add('show'); b.remove(); });
  rgListenBind();
}
/* --- 06 æfing --- */
const RG_PHASES = () => [[0.08, rgT('Beinagrind', 'Plan')], [0.14, rgT('Inngangur', 'Intro')], [0.2, rgT('Efnisgr. 2', 'Para 2')], [0.2, rgT('Efnisgr. 3', 'Para 3')], [0.2, rgT('Efnisgr. 4', 'Para 4')], [0.1, rgT('Lokaorð', 'Concl.')], [0.08, rgT('Yfirlestur', 'Check')]];
const RG_PROLE = () => [rgT('Inngangur', 'Introduction'), rgT('Rök A', 'Argument A'), rgT('Rök B', 'Argument B'), rgT('Rök C', 'Argument C'), rgT('Lokaorð', 'Conclusion')];
function rgDrill() {
  const keys = [['thesis', 'Thesis'], ['k2', `${rgT('Lykill', 'Key')} A`], ['k3', `${rgT('Lykill', 'Key')} B`], ['k4', `${rgT('Lykill', 'Key')} C`]];
  const hist = store.get('rg:hist', []);
  const hasPlan = keys.some(k => String(rgGet('p:' + k[0]) || '').trim());
  const qp = [['thesis', rgT('Thesis: skoðun + A, B, C', 'Thesis: opinion + A, B, C')], ['a', rgT('A: rök + eitt dæmi', 'A: argument + one example')], ['b', rgT('B: rök + eitt dæmi', 'B: argument + one example')], ['c', rgT('C: rök + eitt dæmi', 'C: argument + one example')], ['end', rgT('Lokaskilaboð til lesandans', 'Final message to the reader')]];
  return `<div class="rgbox red"><h3>${rgT('Hvernig á að æfa sig', 'How to practise')}</h3><ol style="margin:0">${(L === 'is' ? ['<b>Minnisæfing</b> (2 mín): skrifaðu thesis og lyklana eftir minni.', '<b>Beinagrind</b> (3 mín): punktaðu niður 5 línur áður en klukkan fer af stað. Hún sést við hliðina á textanum á meðan þú skrifar.', '<b>Skrifaðu á tíma.</b> Kortið til hliðar sýnir hverja efnisgrein og tímalínan segir hvort þú sért á áætlun. Ef þú festist: „Ég er stopp“.', '<b>Farðu yfir.</b> Lestu yfirferðina og merkta textann og lagaðu þá 2–3 hluti sem skipta mestu í næstu tilraun.'] : ['<b>Memory drill</b> (2 min): write your thesis and keys from memory.', '<b>Skeleton</b> (3 min): jot down 5 lines before starting the clock. It stays next to your text while you write.', '<b>Write against the clock.</b> The map beside the text shows each paragraph and the timeline tells you if you are on schedule. If you get stuck: “I am stuck”.', '<b>Check.</b> Read the feedback and the marked text and fix the 2–3 things that matter most in your next attempt.']).map(x => `<li>${x}</li>`).join('')}</ol></div>
  <h2>0 · ${rgT('Hlustaðu', 'Listen')}</h2>
  <p>${rgT('Ritgerðin „Why Nineteen Eighty-Four Still Matters“ upplesin. Best er að hlusta eftir að hafa æft á blaði, t.d. á leiðinni í skólann.', 'The essay “Why Nineteen Eighty-Four Still Matters” read aloud. It works best after practising on paper, e.g. on the way to school.')}</p>
  ${rgListenBox()}
  <h2>1 · ${rgT('Minnisæfing', 'Memory drill')}</h2>
  <div class="rgbox">${hasPlan ? `<p style="margin-top:0">${rgT('Skrifaðu thesis og minnislyklana eftir minni. Svo berðu saman við áætlunina.', 'Write your thesis and memory keys from memory. Then compare with your plan.')}</p>
    <div class="rgmem">${keys.map(([k, l]) => `<div data-mem="${k}"><div class="rgf" style="margin:0"><label for="rgm-${k}">${l}</label><input type="text" id="rgm-${k}" lang="en" autocomplete="off"></div><div class="ans" lang="en">${esc(rgGet('p:' + k)) || '—'}</div></div>`).join('')}</div>
    <p><button class="rgbtn" id="rgmchk">${rgT('Bera saman', 'Compare')}</button><button class="rgbtn alt" id="rgmclr">${rgT('Reyna aftur', 'Try again')}</button></p><div id="rgmres"></div>`
    : `<p style="margin:0">${rgT('Fylltu fyrst út thesis og minnislyklana í „Áætlunin mín“.', 'First fill in the thesis and memory keys in “My plan”.')}</p>`}</div>
  <h2>2 · ${rgT('Beinagrind á 3 mínútum', 'A 3-minute skeleton')}</h2>
  <div class="rgbox"><p style="margin-top:0">${rgT('Eftir minni, í stikkorðum. Margir punkta þetta niður fyrstu mínúturnar í prófinu svo þeir gleymi engu.', 'From memory, in keywords. Many students jot this down in the first minutes of the test so they forget nothing.')}</p>
    <div class="rgqp">${qp.map(([k, l]) => `<div class="rgf" style="margin:0 0 10px"><label for="rgq-${k}">${l}</label><input type="text" id="rgq-${k}" data-rgq="${k}" lang="en" autocomplete="off" value="${esc(rgGet('q:' + k))}"></div>`).join('')}</div>
    <button class="rgbtn alt" id="rgqclr" style="margin-bottom:0">${rgT('Hreinsa beinagrind', 'Clear skeleton')}</button></div>
  <h2>3 · ${rgT('Skrifa á tíma, eins og í prófinu', 'Timed writing, like the real thing')}</h2>
  <p>${rgT('Engin áætlun, engin bók. Ýttu á Tab í byrjun efnisgreinar til að draga inn; engar auðar línur á milli. Það sem þú skrifar vistast í vafranum.', 'No plan, no book. Press Tab at the start of a paragraph to indent; no empty lines between paragraphs. What you write is saved in the browser.')}</p>
  <div class="rgtimer"><span class="clock" id="rgclock">${String(RG.dur).padStart(2, '0')}:00</span>
    <label><span class="sr">${rgT('Lengd', 'Length')}</span><select id="rgdur">${[30, 40, 45, 50, 60, 80].map(m => `<option value="${m}" ${m === RG.dur ? 'selected' : ''}>${m} min</option>`).join('')}</select></label>
    <button class="rgbtn" id="rgstart" style="margin:0">${RG.end ? rgT('Stöðva', 'Stop') : rgT('Byrja', 'Start')}</button>
    <span class="wc"><b id="rgwc">0</b> ${rgT('orð', 'words')} · <b id="rgpc">0</b>/5 ${rgT('efnisgr.', 'paras')}</span>
    <div class="rgpace" id="rgpace">${RG_PHASES().map(([w, l]) => `<span style="flex:${w}">${l}</span>`).join('')}<i id="rgpmark"></i></div>
    <div class="rgpacemsg" id="rgpacemsg">${rgT('Tímalínan sýnir hvar þú ættir að vera. Byrjaðu klukkuna þegar beinagrindin er tilbúin.', 'The timeline shows where you should be. Start the clock when your skeleton is ready.')}</div></div>
  <div class="rgwrite"><textarea class="rgessay" id="rgessay" lang="en" spellcheck="false" placeholder="${rgT('Skrifaðu ritgerðina hér…', 'Write your essay here…')}">${esc(rgGet('draft'))}</textarea>
    <aside class="rgside"><div class="rgqpshow" id="rgqpshow"></div><div class="rgmap" id="rgmap"></div>
      <button class="rgbtn" id="rghint" style="width:100%;margin:10px 0 0">${rgT('Ég er stopp', 'I am stuck')}</button><div class="rghint" id="rghintbox" aria-live="polite"></div></aside></div>
  <p style="margin-top:12px"><button class="rgbtn" id="rgdone">${rgT('Klára og fara yfir', 'Finish and check')}</button><button class="rgbtn alt" id="rgnew">${rgT('Nýtt uppkast', 'New draft')}</button></p>
  <div id="rgres"></div>
  ${hist.length ? `<h2>${rgT('Fyrri tilraunir', 'Earlier attempts')}</h2><table class="rgtbl"><thead><tr><th>${rgT('Dags.', 'Date')}</th><th>${rgT('Orð', 'Words')}</th><th>${rgT('Efnisgr.', 'Paragraphs')}</th><th>${rgT('Mínútur', 'Minutes')}</th><th>${rgT('Gátlisti', 'Checklist')}</th></tr></thead><tbody>${hist.slice(-8).reverse().map(h => `<tr><td>${esc(h.d)}</td><td>${h.w}</td><td>${h.p}</td><td>${h.m ?? '–'}</td><td>${h.s}</td></tr>`).join('')}</tbody></table>` : ''}`;
}
function rgParas(txt) { return String(txt || '').split(/\n+/).map(s => s.trim()).filter(Boolean); }
const rgStartsLink = p => { const s = String(p).toLowerCase().replace(/^[\s"“]+/, ''); return RG_LINK.some(l => s.startsWith(l)); };
const rgSents = p => (String(p).match(/[^.!?]+[.!?]+(["”’]|\s|$)/g) || []).length + (/[^.!?\s]\s*$/.test(p) ? 1 : 0);
const RG_BOOK = ['winston', 'julia', 'o’brien', "o'brien", 'big brother', 'room 101', 'telescreen', 'newspeak', 'ministry', 'party', 'charrington', 'syme', 'parsons', 'goldstein', 'thought police', 'proles', 'doublethink', 'diary', 'victory', 'chestnut', 'oceania', 'london', 'ingsoc', 'two minutes hate', 'hate week', 'paperweight'];
function rgParaInfo(p, i) {
  const w = rgWords(p), s = rgSents(p), low = p.toLowerCase(), book = RG_BOOK.filter(n => low.includes(n)).length, tips = [];
  if (i > 0 && !rgStartsLink(p)) tips.push(rgT('byrjar ekki á tengiorði', 'no linking word at the start'));
  if (i === 0) { const last = (p.split(/(?<=[.!?])\s+/).pop() || ''); if (s >= 2 && !(/,/.test(last) && /\band\b/i.test(last))) tips.push(rgT('thesis með A, B and C í lokin?', 'thesis with A, B and C at the end?')); }
  if (i === 0 && w < 45 && s >= 2) tips.push(rgT('stuttur inngangur: kveikja + umræða + thesis', 'short intro: hook + discussion + thesis'));
  if (i >= 1 && i <= 3) { if (s < 5) tips.push(rgT(`${s}/5 setningar`, `${s}/5 sentences`)); else if (w < 65) tips.push(rgT('stutt: bættu við ákveðnu dæmi', 'short: add a specific example')); if (!book) tips.push(rgT('vantar dæmi úr bókinni', 'no example from the book')); }
  if (i === 4 && !/^(in conclusion|to conclude|to sum up|in summary|all in all|in light of|in short)/i.test(p)) tips.push(rgT('byrjaðu á In conclusion…', 'start with In conclusion…'));
  if (i >= 1 && i <= 3 && w > 130) tips.push(rgT('löng: ertu að endursegja?', 'long: are you retelling?'));
  return { w, s, book, tips };
}
function rgCount() {
  const ta = $('#rgessay'); if (!ta) return;
  const ps = rgParas(ta.value), w = rgWords(ta.value);
  const a = $('#rgwc'), b = $('#rgpc'); if (a) { a.textContent = w; a.style.color = w > 500 ? 'var(--red)' : w >= 400 ? '#2d7a3e' : ''; } if (b) b.textContent = ps.length;
  const map = $('#rgmap'); if (map) {
    const tgt = [70, 90, 90, 90, 60];
    map.innerHTML = `<h4>${rgT('Efnisgreinarnar', 'Your paragraphs')}</h4>` + RG_PROLE().map((r, i) => {
      const p = ps[i]; if (!p) return `<div class="pm empty"><b>${i + 1} · ${r}</b><span>—</span></div>`;
      const inf = rgParaInfo(p, i), cur = i === ps.length - 1;
      const cls = inf.tips.length ? (cur ? 'cur' : 'warn') : 'ok';
      return `<div class="pm ${cls}"><b>${i + 1} · ${r}</b><span>${inf.w} ${rgT('orð', 'w')} · ${inf.s} ${rgT('setn.', 'sent.')}</span><div class="pb"><i style="width:${Math.min(100, inf.w / tgt[i] * 100)}%"></i></div>${inf.tips.length ? `<small>${inf.tips.join(' · ')}</small>` : `<small>✓</small>`}</div>`;
    }).join('') + (ps.length > 5 ? `<div class="pm warn"><b>${ps.length} ${rgT('efnisgreinar', 'paragraphs')}</b><small>${rgT('á að vera 5', 'should be 5')}</small></div>` : '');
  }
  const qs = $('#rgqpshow'); if (qs) { const v = ['thesis', 'a', 'b', 'c', 'end'].map(k => String(rgGet('q:' + k) || '').trim()); qs.innerHTML = v.some(Boolean) ? `<h4>${rgT('Beinagrindin þín', 'Your skeleton')}</h4><ol lang="en">${v.map(x => `<li>${esc(x) || '…'}</li>`).join('')}</ol>` : ''; }
  rgPace();
}
function rgPace() {
  const mk = $('#rgpmark'), msg = $('#rgpacemsg'); if (!mk || !msg) return;
  if (!RG.end) { mk.style.display = 'none'; msg.textContent = rgT('Tímalínan sýnir hvar þú ættir að vera. Byrjaðu klukkuna þegar beinagrindin er tilbúin.', 'The timeline shows where you should be. Start the clock when your skeleton is ready.'); return; }
  const tot = RG.dur * 60000, el = Math.min(tot, Date.now() - (RG.end - tot)), f = el / tot;
  mk.style.display = 'block'; mk.style.left = (f * 100) + '%';
  const ph = RG_PHASES(); let acc = 0, idx = 0; for (let i = 0; i < ph.length; i++) { if (f < acc + ph[i][0]) { idx = i; break; } acc += ph[i][0]; idx = i; }
  const ta = $('#rgessay'), n = ta ? rgParas(ta.value).length : 0, w = ta ? rgWords(ta.value) : 0;
  const should = Math.max(0, Math.min(5, idx));
  let m = rgT(`Núna: ${ph[idx][1]}. `, `Now: ${ph[idx][1]}. `);
  if (idx === 0) m += rgT('Rifjaðu upp thesis og rökin þrjú.', 'Recall your thesis and three arguments.');
  else if (idx === 6) m += w >= 400 ? rgT('Lestu yfir: tengiorð, styttingar, stafsetning nafna.', 'Read through: linking words, contractions, spelling of names.') : rgT('Kláraðu lokaorðin strax, svo yfirlestur.', 'Finish the conclusion now, then read through.');
  else if (n < should) m += rgT(`Þú ert í efnisgrein ${Math.max(1, n)}; reyndu að ljúka henni og halda áfram. Styttu dæmin frekar en að sleppa lokaorðum.`, `You are on paragraph ${Math.max(1, n)}; try to finish it and move on. Shorten examples rather than skip the conclusion.`);
  else if (n > should + 1) m += rgT('Þú ert á undan áætlun. Gott! Notaðu tímann í betri dæmi og yfirlestur.', 'You are ahead of schedule. Good! Use the time for better examples and checking.');
  else m += rgT('Þú ert á áætlun.', 'You are on schedule.');
  msg.textContent = m;
}
function rgHint() {
  const ta = $('#rgessay'), ps = rgParas(ta ? ta.value : ''), w = rgWords(ta ? ta.value : '');
  const k = ps.length ? ps.length - 1 : 0, p = ps[k] || '', inf = p ? rgParaInfo(p, k) : null;
  RG.hint = (RG.hint || 0) + 1;
  const pick = a => a[(RG.hint - 1) % a.length];
  const key = i => String(rgGet('q:' + 'abc'[i]) || rgGet('p:k' + (i + 2)) || '').trim();
  let h;
  if (w >= 500) h = rgT('Þú ert kominn yfir 500 orð. Ljúktu efnisgreininni og farðu í lokaorðin eða yfirlestur.', 'You are past 500 words. Finish this paragraph and move to the conclusion or to checking.');
  else if (!ps.length) h = pick(L === 'is' ? ['Byrjaðu á kveikju: spurningu til lesandans („Have you ever…?“), sláandi staðreynd eða stuttri tilvitnun.', 'Skrifaðu thesis fyrst ef þú manst hana, og settu svo kveikju og umræðu fyrir framan hana.', 'Rammi fyrir thesis: „[Title] is a novel that everyone should / should not read, because A, B and C.“'] : ['Start with a hook: a question to the reader (“Have you ever…?”), a striking fact or a short quotation.', 'Write your thesis first if you remember it, then put the hook and discussion in front of it.', 'Thesis frame: “[Title] is a novel that everyone should / should not read, because A, B and C.”']);
  else if (k === 0 && inf && inf.tips.length) h = rgT('Inngangurinn endar á thesis: skoðun + þrenn rök. „…, because A, B and C.“ Ýttu svo á Enter og Tab og byrjaðu efnisgrein 2 á „Firstly,“.', 'The introduction ends with the thesis: opinion + three arguments. “…, because A, B and C.” Then press Enter and Tab and start paragraph 2 with “Firstly,”.');
  else if (k === 0) h = rgT(`Byrjaðu efnisgrein 2 (Enter + Tab): „Firstly, …“ og topic sentence um rök A${key(0) ? ` (${key(0)})` : ''}.`, `Start paragraph 2 (Enter + Tab): “Firstly, …” and a topic sentence about argument A${key(0) ? ` (${key(0)})` : ''}.`);
  else if (k >= 1 && k <= 3) {
    const lw = [['Firstly,', 'To begin with,'], ['Secondly,', 'Moreover,', 'In addition,'], ['Finally,', 'Lastly,', 'Last but not least,']][k - 1];
    if (inf.s >= 5 && inf.w >= 65 && !inf.tips.length) h = k < 3 ? rgT(`Efnisgreinin er nógu löng. Endaðu á closing sentence („Therefore, …“, „In short, …“) og byrjaðu næstu á „${[['Secondly,'], ['Finally,']][k - 1][0]}“ um rök ${'BC'[k - 1]}${key(k) ? ` (${key(k)})` : ''}.`, `This paragraph is long enough. End with a closing sentence (“Therefore, …”, “In short, …”) and start the next with “${[['Secondly,'], ['Finally,']][k - 1][0]}” about argument ${'BC'[k - 1]}${key(k) ? ` (${key(k)})` : ''}.`) : rgT('Efnisgrein 4 er tilbúin. Byrjaðu lokaorðin: „In conclusion, …“ og endurtaktu skoðunina með rökunum þremur í nýjum orðum.', 'Paragraph 4 is done. Start the conclusion: “In conclusion, …” and restate your opinion with the three arguments in new words.');
    else h = pick(L === 'is' ? [`Rök ${'ABC'[k - 1]}${key(k - 1) ? ` (${key(k - 1)})` : ''}. Hvaða persóna, staður eða atvik sannar þetta? Byrjaðu á „A clear example of this is when …“`, 'Hvernig lætur þetta lesandanum líða? „This makes the reader feel …“', 'Er galli sem þú getur viðurkennt og svarað? „Although some readers may find …, …“', `Tengiorð sem passa hér: ${lw.join(' ')} · For example, · However, · Therefore,`, 'Ekki segja hvað gerist næst í sögunni. Segðu hvers vegna það skiptir máli fyrir lesandann.'] : [`Argument ${'ABC'[k - 1]}${key(k - 1) ? ` (${key(k - 1)})` : ''}. Which character, place or event proves it? Start with “A clear example of this is when …”`, 'How does this make the reader feel? “This makes the reader feel …”', 'Is there a weakness you can admit and answer? “Although some readers may find …, …”', `Linking words that fit here: ${lw.join(' ')} · For example, · However, · Therefore,`, 'Do not say what happens next in the story. Say why it matters to the reader.']);
  } else h = pick(L === 'is' ? ['Lokaorð: In conclusion + skoðunin + A, B og C í öðrum orðum. Ekkert nýtt.', 'Endaðu vítt: hvað á lesandinn að gera eða hugsa? „Everyone should …“, „It is a book that …“', 'Tvær til þrjár setningar duga. Svo yfirlestur: tengiorð, styttingar, nöfn rétt stafsett.'] : ['Conclusion: In conclusion + your opinion + A, B and C in other words. Nothing new.', 'End wide: what should the reader do or think? “Everyone should …”, “It is a book that …”', 'Two or three sentences are enough. Then check: linking words, contractions, names spelled correctly.']);
  const box = $('#rghintbox'); if (box) box.innerHTML = `<p>${h}</p>`;
}
function rgTick() {
  const c = $('#rgclock'); if (!RG.end) return;
  const left = Math.max(0, Math.round((RG.end - Date.now()) / 1000));
  if (c) { c.textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`; c.classList.toggle('low', left <= 300); }
  rgPace();
  if (!left) { clearInterval(RG.iv); RG.iv = 0; RG.end = 0; const s = $('#rgstart'); if (s) s.textContent = rgT('Byrja', 'Start'); if (c) c.textContent = rgT('Búið!', 'Time!'); rgCheck(true); }
}
function rgMark(p) {
  let h = esc(p);
  h = h.replace(rgLinkRe(), (m, pre, w) => `${pre}<b class="lk">${w}</b>`);
  h = h.replace(/\b((?:don|doesn|didn|isn|aren|wasn|weren|can|couldn|won|wouldn|shouldn|it|that|there|they|we|you|i)['’](?:t|s|re|ve|ll|d|m))\b/gi, '<b class="ct" title="contraction">$1</b>');
  h = h.replace(/\b(I think)\b/gi, '<b class="it">$1</b>');
  h = h.replace(/\b(and then|after that|then he|then she|then they)\b/gi, '<b class="rt">$1</b>');
  return h;
}
function rgCheck(timed) {
  const ta = $('#rgessay'); if (!ta) return;
  const txt = ta.value, ps = rgParas(txt), w = rgWords(txt), low = txt.toLowerCase();
  const links = RG_LINK.filter(l => new RegExp(`\\b${l.replace(/ /g, '\\s+')}\\b`, 'i').test(low));
  const contr = txt.match(/\b(don|doesn|didn|isn|aren|wasn|weren|can|couldn|won|wouldn|shouldn|it|that|there|he|she|they|we|you|i)['’](t|s|re|ve|ll|d|m)\b/gi) || [];
  const ithink = (low.match(/\bi think\b/g) || []).length;
  const retell = (low.match(/\b(and then|after that|then he|then she|then they|next,? he)\b/g) || []).length;
  const names = RG_BOOK.filter(n => low.includes(n));
  const planKeys = ['k2', 'k3', 'k4'].map(k => String(rgGet('p:' + k) || rgGet('q:' + 'abc'[+k[1] - 2]) || '').toLowerCase().match(/[a-z’'-]{4,}/g) || []);
  const keyHit = planKeys.map(ws => !ws.length ? null : ws.some(x => low.includes(x)));
  const res = [], next = [];
  const add = (st, msg, fix) => { res.push([st, msg]); if (st !== 'ok' && fix) next.push([st, fix]); };
  add(w >= 400 && w <= 500 ? 'ok' : 'no', rgT(`${w} orð (markmið 400–500)`, `${w} words (target 400–500)`), w < 400 ? rgT('Of stutt: bættu einu ákveðnu dæmi við hverja efnisgrein í meginmáli.', 'Too short: add one specific example to each body paragraph.') : rgT('Of langt: styttu lýsingar á söguþræði; haltu dæmunum.', 'Too long: cut plot description; keep the examples.'));
  add(ps.length === 5 ? 'ok' : 'no', rgT(`${ps.length} efnisgreinar (á að vera 5)`, `${ps.length} paragraphs (should be 5)`), rgT('Fimm efnisgreinar: inngangur, þrenn rök, lokaorð. Ný efnisgrein = Enter + Tab.', 'Five paragraphs: introduction, three arguments, conclusion. New paragraph = Enter + Tab.'));
  if (ps.length >= 5) { const miss = [1, 2, 3, 4].filter(i => !rgStartsLink(ps[i])); add(miss.length ? 'no' : 'ok', miss.length ? rgT(`Efnisgrein ${miss.map(i => i + 1).join(', ')} byrjar ekki á tengiorði`, `Paragraph ${miss.map(i => i + 1).join(', ')} does not start with a linking word`) : rgT('Efnisgreinar 2–5 byrja allar á tengiorði', 'Paragraphs 2–5 all start with a linking word'), rgT('Byrjaðu efnisgreinar 2–5 á Firstly / Secondly / Finally / In conclusion.', 'Start paragraphs 2–5 with Firstly / Secondly / Finally / In conclusion.')); }
  if (ps.length >= 1) { const lastS = ps[0].split(/(?<=[.!?])\s+/).pop() || ''; add(/,/.test(lastS) && /\band\b/i.test(lastS) ? 'ok' : 'hm', rgT('Endar inngangurinn á thesis með þrennum rökum (… A, B and C)?', 'Does the introduction end with a thesis with three arguments (… A, B and C)?'), rgT('Síðasta setning inngangs: skoðun + „because A, B and C.“', 'Last sentence of the introduction: opinion + “because A, B and C.”')); }
  if (ps.length >= 5) add(/^(in conclusion|to conclude|to sum up|in summary|all in all|in light of|in short)/i.test(ps[ps.length - 1]) ? 'ok' : 'no', rgT('Lokaorðin byrja á samantektarorði (In conclusion…)', 'The conclusion starts with a summary phrase (In conclusion…)'), rgT('Byrjaðu lokaorðin á „In conclusion,“ eða „To sum up,“.', 'Start the conclusion with “In conclusion,” or “To sum up,”.'));
  if (ps.length >= 4) { const thin = [1, 2, 3].filter(i => ps[i] && rgSents(ps[i]) < 5); add(thin.length ? 'hm' : 'ok', thin.length ? rgT(`Efnisgrein ${thin.map(i => i + 1).join(', ')} hefur færri en 5 setningar`, `Paragraph ${thin.map(i => i + 1).join(', ')} has fewer than 5 sentences`) : rgT('Efnisgreinar 2–4 hafa allar a.m.k. 5 setningar', 'Paragraphs 2–4 all have at least 5 sentences'), rgT('Hver efnisgrein: topic + 3 setningar með dæmum + closing sentence.', 'Each paragraph: topic + 3 sentences with examples + closing sentence.')); }
  add(links.length >= 6 ? 'ok' : 'hm', rgT(`${links.length} mismunandi tengiorð (stefndu á 6+)`, `${links.length} different linking words (aim for 6+)`), rgT('Bættu við tengiorðum inni í efnisgreinum: However, For example, Therefore, Moreover.', 'Add linking words inside paragraphs: However, For example, Therefore, Moreover.'));
  add(names.length >= 5 ? 'ok' : 'hm', rgT(`Ákveðin atriði úr bókinni: ${names.length} (${names.slice(0, 8).join(', ') || '–'})`, `Specific details from the book: ${names.length} (${names.slice(0, 8).join(', ') || '–'})`), rgT('Nefndu nöfn, staði og atvik: Winston, Julia, O’Brien, Room 101, telescreens…', 'Name names, places and events: Winston, Julia, O’Brien, Room 101, telescreens…'));
  add(contr.length ? 'no' : 'ok', contr.length ? rgT(`Styttingar: ${[...new Set(contr)].join(', ')}`, `Contractions: ${[...new Set(contr)].join(', ')}`) : rgT('Engar styttingar', 'No contractions'), rgT('Skrifaðu styttingar fullum fetum: do not, it is, cannot.', 'Write contractions in full: do not, it is, cannot.'));
  if (ithink > 2) add('hm', rgT(`„I think“ kemur ${ithink} sinnum fyrir`, `“I think” appears ${ithink} times`), rgT('Fækkaðu „I think“; rökin sýna skoðunina.', 'Use fewer “I think”; the arguments show your opinion.'));
  if (retell > 1) add('hm', rgT('Orð eins og „and then / after that“ benda til endursagnar', 'Words like “and then / after that” suggest retelling'), rgT('Metðu í stað þess að segja frá: „This shows…“, „This makes the reader feel…“.', 'Evaluate instead of narrating: “This shows…”, “This makes the reader feel…”.'));
  if (/\n\s*\n/.test(txt.trim())) add('no', rgT('Auðar línur á milli efnisgreina', 'Empty lines between paragraphs'), rgT('Engar auðar línur; inndráttur (Tab) í staðinn.', 'No empty lines; indent (Tab) instead.'));
  if (keyHit.some(x => x !== null)) add(keyHit.every(x => x !== false) ? 'ok' : 'hm', rgT('Rökin úr áætluninni þinni sjást í textanum', 'The arguments from your plan appear in the text') + (keyHit.some(x => x === false) ? rgT(` (vantar: ${keyHit.map((x, i) => x === false ? 'ABC'[i] : '').filter(Boolean).join(', ')})`, ` (missing: ${keyHit.map((x, i) => x === false ? 'ABC'[i] : '').filter(Boolean).join(', ')})`) : ''), rgT('Notaðu sömu lykilorð og í thesis í topic sentences.', 'Use the same keywords as your thesis in your topic sentences.'));
  const okN = res.filter(r => r[0] === 'ok').length;
  next.sort((a, b) => (a[0] === 'no' ? 0 : 1) - (b[0] === 'no' ? 0 : 1));
  $('#rgres').innerHTML = `<div class="rgbox red"><h3>${rgT('Sjálfvirk yfirferð', 'Automatic check')} · ${okN}/${res.length}</h3><ul class="rgres">${res.map(r => `<li class="${r[0]}">${r[1]}</li>`).join('')}</ul></div>
    ${next.length ? `<div class="rgbox"><h3>${rgT('Lagaðu þetta í næstu tilraun', 'Fix this in your next attempt')}</h3><ol style="margin:0">${next.slice(0, 3).map(n => `<li>${n[1]}</li>`).join('')}</ol></div>` : `<div class="rgbox"><h3>${rgT('Frábært!', 'Excellent!')}</h3><p style="margin:0">${rgT('Allt sem vélin getur mælt er í lagi. Lestu nú yfir með gátlistanum og spurðu þig: eru rökin sannfærandi og dæmin ákveðin?', 'Everything the machine can measure is fine. Now read it with the checklist and ask yourself: are the arguments convincing and the examples specific?')}</p></div>`}
    ${ps.length ? `<div class="rgbox"><h3>${rgT('Efnisgrein fyrir efnisgrein', 'Paragraph by paragraph')}</h3><table class="rgtbl" style="margin:0"><thead><tr><th>#</th><th>${rgT('Hlutverk', 'Role')}</th><th>${rgT('Orð', 'Words')}</th><th>${rgT('Setn.', 'Sent.')}</th><th>${rgT('Athugasemd', 'Note')}</th></tr></thead><tbody>${ps.map((p, i) => { const inf = rgParaInfo(p, i); return `<tr><td>${i + 1}</td><td>${RG_PROLE()[i] || '–'}</td><td>${inf.w}</td><td>${inf.s}</td><td>${inf.tips.length ? inf.tips.join('; ') : '✓'}</td></tr>`; }).join('')}</tbody></table></div>
    <div class="rgbox"><h3>${rgT('Textinn þinn, merktur', 'Your text, marked')}</h3><div class="rglegend"><span><b class="lk">${rgT('tengiorð', 'linking word')}</b></span><span><b class="ct">${rgT('stytting', 'contraction')}</b></span><span><b class="it">I think</b></span><span><b class="rt">${rgT('endursögn?', 'retelling?')}</b></span></div><div class="rgessay-view" lang="en">${ps.map((p, i) => `<p${i ? ' class="ind"' : ''}>${rgMark(p)}</p>`).join('')}</div></div>` : ''}
    <p style="color:var(--muted);font:15px/1.5 var(--f-text)">${rgT('Vélin telur og leitar að mynstrum; hún getur ekki metið hvort rökin eru góð. Berðu ritgerðina saman við sýnidæmin og gátlistann, og lestu hana upphátt.', 'The machine counts and looks for patterns; it cannot judge whether your arguments are good. Compare your essay with the samples and the checklist, and read it aloud.')} <button class="rgbtn alt" data-rggo="samples" style="margin:6px 0 0">${rgT('Opna sýnidæmin', 'Open the samples')}</button></p>`;
  const go = $('[data-rggo]'); if (go) go.onclick = () => { RG.sub = 'samples'; rgSet('sub', RG.sub); renderRitgerd(); };
  const used = RG.started ? Math.round((Date.now() - RG.started) / 60000) : null;
  const hist = store.get('rg:hist', []); hist.push({ d: new Date().toLocaleDateString(L === 'is' ? 'is-IS' : 'en-GB'), w, p: ps.length, m: used, s: `${okN}/${res.length}` }); store.set('rg:hist', hist.slice(-20));
  RG.started = 0;
}
function rgDrillBind() {
  rgListenBind();
  const mc = $('#rgmchk');
  if (mc) {
    mc.onclick = () => {
      let tot = 0, n = 0;
      $$('[data-mem]').forEach(d => {
        d.classList.add('show');
        const want = (String(rgGet('p:' + d.dataset.mem) || '').toLowerCase().match(/[a-z0-9’'-]+/g) || []), got = new Set(($('input', d).value.toLowerCase().match(/[a-z0-9’'-]+/g) || []));
        if (want.length) { tot += want.filter(x => got.has(x)).length / want.length; n++; }
      });
      const pct = n ? Math.round(tot / n * 100) : 0;
      $('#rgmres').innerHTML = `<p><b>${pct}%</b> ${rgT('orðanna komu rétt.', 'of the words matched.')} ${pct >= 85 ? rgT('Þú kannt beinagrindina!', 'You know your skeleton!') : rgT('Æfðu aftur eftir smá stund; endurtekning með hléum virkar best.', 'Try again in a little while; spaced repetition works best.')}</p>`;
    };
    $('#rgmclr').onclick = () => { $$('[data-mem]').forEach(d => { d.classList.remove('show'); $('input', d).value = ''; }); $('#rgmres').innerHTML = ''; const f = $('[data-mem] input'); if (f) f.focus(); };
  }
  $$('[data-rgq]').forEach(el => el.oninput = () => { rgSet('q:' + el.dataset.rgq, el.value); rgCount(); });
  $('#rgqclr').onclick = () => { ['thesis', 'a', 'b', 'c', 'end'].forEach(k => rgSet('q:' + k, '')); $$('[data-rgq]').forEach(el => el.value = ''); rgCount(); };
  const ta = $('#rgessay');
  ta.oninput = () => { rgSet('draft', ta.value); rgCount(); };
  ta.onkeydown = e => { if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); const s = ta.selectionStart, en = ta.selectionEnd; ta.value = ta.value.slice(0, s) + '\t' + ta.value.slice(en); ta.selectionStart = ta.selectionEnd = s + 1; ta.oninput(); } };
  rgCount();
  $('#rghint').onclick = rgHint;
  $('#rgdur').onchange = e => { RG.dur = +e.target.value; store.set('rg:dur', RG.dur); if (!RG.end) $('#rgclock').textContent = `${String(RG.dur).padStart(2, '0')}:00`; };
  $('#rgstart').onclick = () => {
    if (RG.end) { clearInterval(RG.iv); RG.iv = 0; RG.end = 0; $('#rgstart').textContent = rgT('Byrja', 'Start'); rgPace(); return; }
    RG.end = Date.now() + RG.dur * 60000; RG.started = Date.now(); $('#rgstart').textContent = rgT('Stöðva', 'Stop');
    clearInterval(RG.iv); RG.iv = setInterval(rgTick, 1000); rgTick(); ta.focus();
  };
  if (RG.end) { clearInterval(RG.iv); RG.iv = setInterval(rgTick, 1000); rgTick(); }
  $('#rgdone').onclick = () => { if (RG.end) { clearInterval(RG.iv); RG.iv = 0; RG.end = 0; $('#rgstart').textContent = rgT('Byrja', 'Start'); rgPace(); } rgCheck(false); $('#rgres').scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  $('#rgnew').onclick = () => { const b = $('#rgnew'); if (ta.value.trim() && !b.dataset.sure) { b.dataset.sure = 1; b.textContent = rgT('Ýttu aftur: eyðir uppkastinu', 'Click again: deletes the draft'); return; } ta.value = ''; rgSet('draft', ''); rgCount(); $('#rgres').innerHTML = ''; $('#rghintbox').innerHTML = ''; delete b.dataset.sure; b.textContent = rgT('Nýtt uppkast', 'New draft'); ta.focus(); };
}


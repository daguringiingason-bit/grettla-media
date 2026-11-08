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
  <div class="rggrid">${(L === 'is' ? [['Spurning', 'Spurðu lesandann um eitthvað sem tengist lífi hans, t.d. eftirlit, síma eða sannleika. Fylltu sjálf(ur) inn: „Have you ever felt that …?“'], ['Sláandi staðreynd', 'Eitthvað sem kemur á óvart um bókina eða heiminn í dag, t.d. að orð úr bókinni eru notuð daglega. „Few books written in 1949 …“'], ['Tilvitnun', 'Byrjaðu á slagorði eða stuttri tilvitnun og útskýrðu hana í næstu setningu.']] : [['A question', 'Ask the reader about something in their own life, e.g. surveillance, phones or truth. Fill it in yourself: “Have you ever felt that …?”'], ['A striking fact', 'Something surprising about the book or today’s world, e.g. that words from the book are used every day. “Few books written in 1949 …”'], ['A quotation', 'Open with a slogan or a short quotation and explain it in the next sentence.']]).map(h => `<div class="rgbox"><h3>${h[0]}</h3><p style="margin:0">${h[1]}</p></div>`).join('')}</div>`;
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
/* --- sýnidæmi: fjórar ritgerðir með ólíka afstöðu --- */
const RG_ESSAYS = [
  { title: 'A Warning Everyone Should Read', stance: { is: 'Lesa · persónur, heimur, endir', en: 'Read it · characters, world, ending' }, hook: { is: 'Spurning', en: 'Question' },
    notes: { is: ['Klassísk uppbygging: rökin þrjú koma í sömu röð í thesis og meginmáli.', 'Hver efnisgrein hefur ákveðin dæmi: aldur Winstons, Parsons-börnin, herbergi 101.', 'Ein stutt tilvitnun, notuð þar sem hún skiptir mestu: í umræðu um endinn.'], en: ['Classic structure: the three arguments appear in the same order in the thesis and the body.', 'Each paragraph has specific examples: Winston’s age, the Parsons children, Room 101.', 'One short quotation, used where it matters most: in the discussion of the ending.'] },
    p: [
      [['hook', 'Have you ever had the feeling that someone is watching you?'], ['disc', 'For most of us it is only a passing thought, but for Winston Smith, the main character of George Orwell’s Nineteen Eighty-Four, it is everyday life. The novel was published in 1949 and describes a future Britain ruled by the Party and its leader, Big Brother.'], ['thesis', 'Nineteen Eighty-Four is a novel that everyone should read, because of its believable main character, its terrifying world and its powerful ending.']],
      [['topic', 'Firstly, Winston is a hero the reader can truly believe in.'], ['sup', 'He is not strong or brave; he is thirty-nine years old, thin and suffers from an ulcer on his ankle. He is terrified of the Thought Police, and yet he secretly starts a diary, which is his first act of rebellion. Because he is so ordinary, the reader easily imagines being in his place and shares both his fear and his hope. He even feels guilty about how he treated his mother and little sister as a child, which gives him real depth.'], ['close', 'In short, Winston’s weaknesses are exactly what make him so believable.']],
      [['topic', 'Secondly, the world of the novel is one of the most frightening ever written.'], ['sup', 'Telescreens watch people in their own homes, and they can never be switched off. Children are taught to spy on their parents, as the Parsons children do, and Winston’s job at the Ministry of Truth is to change old newspapers so that the Party is never wrong. Even the names are disturbing: the Ministry of Love is the place where prisoners are tortured. What makes this world so chilling is that much of it reminds us of surveillance and fake news today.'], ['close', 'Therefore, the setting is not only exciting to read about but also makes the reader think about our own society.']],
      [['topic', 'Finally, the ending is shocking but perfectly suitable.'], ['sup', 'Many readers hope that Winston and Julia will defeat the Party, but in Room 101 Winston betrays the woman he loves. In the very last line we learn that “He loved Big Brother.” A happy ending would have been easier to read, but it would have weakened Orwell’s warning about what total power can do to a person.'], ['close', 'For this reason, the ending stays with the reader long after the last page.']],
      [['restate', 'In conclusion, Nineteen Eighty-Four is a gripping and important novel thanks to its believable hero, its terrifying world and its unforgettable ending.'], ['wide', 'It is not always an easy read, but it teaches us to value freedom and to question what we are told. Everyone should read it at least once, because a world without freedom may be closer than we think.']]
    ] },
  { title: 'Worth the Effort', stance: { is: 'Lesa, þrátt fyrir galla · mótrök í thesis', en: 'Read it despite its flaws · counter-argument in the thesis' }, hook: { is: 'Sláandi staðreynd', en: 'Striking fact' },
    notes: { is: ['Thesis byrjar á „Although…“: viðurkennir galla en heldur skoðuninni. Það sýnir þroskaða hugsun.', 'Gallinn (hægur 1. hluti, bók Goldsteins) er nefndur og svarað strax með „However“.', 'Snjallt smáatriði í 4. efnisgrein: viðaukinn í þátíð. Svona atriði lyfta einkunninni.'], en: ['The thesis opens with “Although…”: it admits a weakness but keeps the opinion. That shows mature thinking.', 'The weakness (slow Part One, Goldstein’s book) is named and answered at once with “However”.', 'A clever detail in paragraph 4: the appendix in the past tense. Details like this lift the grade.'] },
    p: [
      [['hook', 'Few novels written more than seventy years ago are still discussed every day, but Nineteen Eighty-Four by George Orwell is one of them.'], ['disc', 'Words from the book, such as “Big Brother” and “thought police”, appear in newspapers and on social media all over the world. However, many students find the novel difficult and give up after the first few chapters.'], ['thesis', 'Although Nineteen Eighty-Four has a slow beginning, it is well worth reading, because of its growing tension, its frightening relevance and its brave ending.']],
      [['topic', 'To begin with, the novel becomes more and more gripping as the story goes on.'], ['sup', 'It is true that Part One is slow, as Orwell spends many pages describing Winston’s grey life in London. However, this description is necessary, because it shows the reader how dangerous even the smallest act of rebellion is. When Winston and Julia meet in the secret room above Mr Charrington’s shop, the reader feels constant tension, knowing that they will probably be caught.'], ['close', 'Consequently, the patient reader is rewarded with a story that is hard to put down.']],
      [['topic', 'Moreover, the novel is frighteningly relevant today.'], ['sup', 'In the book, the Party controls people by watching them and by rewriting the past, and its slogan “Who controls the past controls the future” explains why. Today, we carry phones that know where we are, and false information can spread around the world in minutes. Orwell wrote the book long before the internet, yet it describes our time surprisingly well. Even the long extract from Goldstein’s book, which some readers find boring, explains clearly how power can be used to control people’s minds.'], ['close', 'As a result, the novel feels less like science fiction and more like a warning.']],
      [['topic', 'Last but not least, Orwell has the courage to give the story a dark ending.'], ['sup', 'Instead of a heroic victory, Winston is broken by O’Brien in the Ministry of Love and forced to believe that two plus two make five. This is painful to read, but it is honest, because it shows that a totalitarian state wants to control not only what people do but also what they think. Interestingly, the appendix about Newspeak is written in the past tense, which may suggest that the Party did not last forever.'], ['close', 'Thus, the ending is both shocking and thought-provoking.']],
      [['restate', 'To sum up, despite its slow start, Nineteen Eighty-Four is a rewarding novel because of its tension, its relevance and its courageous ending.'], ['wide', 'Readers who give it a chance will see the world around them with new eyes. It is a book that does not simply entertain; it teaches us to think for ourselves. If you start it, do not give up after Part One.']]
    ] },
  { title: 'Important, but Not Enjoyable', stance: { is: 'Sleppa · gagnrýnin afstaða', en: 'Avoid it · a critical stance' }, hook: { is: 'Tilvitnun', en: 'Quotation' },
    notes: { is: ['Neikvæð afstaða getur líka fengið 10 ef hún er sanngjörn og vel studd.', 'Höfundurinn viðurkennir kosti bókarinnar („While this shows Orwell’s skill…“) en heldur sinni skoðun.', 'Lokaorðin gefa lesandanum raunhæft ráð í stað þess að segja bara „ekki lesa“.'], en: ['A negative stance can also earn a 10 if it is fair and well supported.', 'The writer admits the book’s strengths (“While this shows Orwell’s skill…”) but keeps the opinion.', 'The conclusion gives the reader realistic advice instead of just saying “do not read it”.'] },
    p: [
      [['hook', '“WAR IS PEACE. FREEDOM IS SLAVERY. IGNORANCE IS STRENGTH.”'], ['disc', 'These famous slogans come from George Orwell’s Nineteen Eighty-Four, a novel that is often called one of the most important books of the twentieth century. It is read in schools all over the world, and many people claim that everyone must read it. Important books, however, are not always enjoyable books.'], ['thesis', 'Unless you enjoy heavy and depressing stories, Nineteen Eighty-Four is a novel to avoid, because of its bleak atmosphere, its slow style and its hopeless ending.']],
      [['topic', 'Firstly, the atmosphere of the novel is extremely bleak.'], ['sup', 'From the first page, everything in London is grey, dirty and cold, and the hallway of Victory Mansions smells of boiled cabbage. Even colour seems to have disappeared, except on the posters of Big Brother. Nobody in the book seems happy, and even family life is poisoned by fear, as when Parsons is reported to the Thought Police by his own daughter. While this shows Orwell’s skill, it makes the book a heavy experience for anyone who reads for pleasure.'], ['close', 'Therefore, readers looking for an exciting escape will not find it here.']],
      [['topic', 'Secondly, the story often moves very slowly.'], ['sup', 'Long sections of the book explain the Party’s ideas instead of telling a story. The clearest example is the extract from Goldstein’s book in Part Two, which reads like a school textbook and stops the action for many pages. Similarly, O’Brien’s long speeches in the Ministry of Love feel more like lectures than real conversations. Many readers will be tempted to skip these pages, and some may give up on the book entirely.'], ['close', 'As a result, the reader may feel that Orwell cares more about his message than about his characters.']],
      [['topic', 'Finally, the ending leaves the reader with no hope at all.'], ['sup', 'After all his struggles, Winston betrays Julia in Room 101 when he begs the guards to “Do it to Julia!” He ends up sitting alone in the Chestnut Tree Café, drinking gin, and the book closes with the words “He loved Big Brother.” Some readers admire this courage, but many close the book feeling empty and sad.'], ['close', 'In other words, the ending is powerful but deeply depressing.']],
      [['restate', 'In conclusion, Nineteen Eighty-Four may be a famous classic, but its bleak world, slow passages and hopeless ending make it a difficult book to enjoy.'], ['wide', 'If you simply want to understand its ideas, a good summary or the film might be enough. Life is too short to spend weeks with a book that only makes you feel worse, when so many other books teach important lessons without leaving the reader miserable.']]
    ] },
  { title: 'A Must-Read for Young People', stance: { is: 'Lesa · hugmyndir og boðskapur', en: 'Read it · ideas and message' }, hook: { is: 'Ímyndaðu þér…', en: 'Imagine…' },
    notes: { is: ['Rökin fjalla um hugmyndir bókarinnar, ekki persónur og söguþráð. Það er líka leyfilegt.', 'Ritgerðin talar beint til markhópsins (ungs fólks) og tengir bókina við líf þess.', 'Endirinn snýr aftur að frægri setningu úr bókinni: falleg „hringlokun“.'], en: ['The arguments are about the book’s ideas, not its characters and plot. That is allowed too.', 'The essay speaks directly to its audience (young people) and links the book to their lives.', 'The ending returns to a famous line from the book: a neat way to “close the circle”.'] },
    p: [
      [['hook', 'Imagine a world where it is a crime to think the wrong thoughts and where the dictionary gets thinner every year.'], ['disc', 'This is the world of George Orwell’s Nineteen Eighty-Four, in which Winston Smith tries to stay human under the rule of the Party and Big Brother. The book was written in 1949, yet its ideas are discussed more today than ever before.'], ['thesis', 'Nineteen Eighty-Four is a must-read for young people, because it shows the power of language, the importance of truth and the danger of losing our privacy.']],
      [['topic', 'First of all, the novel shows how language can be used to control people.'], ['sup', 'The Party is creating Newspeak, a language with fewer and fewer words. Winston’s colleague Syme explains proudly that the aim is to make rebellious thoughts impossible, because there will be no words to express them. This idea may sound strange at first, but it makes the reader realise how important a rich vocabulary is for free thinking. Tellingly, Syme himself later vanishes, as if he had never existed.'], ['close', 'Thus, the novel teaches us that words are not only for communication but also for freedom.']],
      [['topic', 'In addition, the book makes the reader think about truth.'], ['sup', 'Winston works at the Ministry of Truth, where his job is to rewrite old articles so that the Party is always right. Early in the book he writes in his diary that freedom is the freedom to say that two plus two make four. Later, however, O’Brien forces him to accept that two plus two make five if the Party says so. The scene is painful to read, because the reader knows that Winston is right.'], ['close', 'Consequently, the reader understands that defending simple facts can be an act of courage.']],
      [['topic', 'Most importantly, the novel is a warning about privacy that feels very modern.'], ['sup', 'In Winston’s flat, the telescreen both watches and listens, and it can never be turned off. Today, many of us carry smartphones with cameras and microphones, and we share our lives online without thinking twice. Orwell could not have known about the internet, but his picture of a society where everybody is watched is surprisingly close to ours.'], ['close', 'For this reason, young readers in particular will find the book relevant to their own lives.']],
      [['restate', 'In light of all these points, it is clear that Nineteen Eighty-Four is an essential book for young people, thanks to its lessons about language, truth and privacy.'], ['wide', 'Although it is dark and sometimes demanding, it gives readers the tools to recognise manipulation when they see it. Read it, and you will never hear the words “Big Brother is watching you” in the same way again.']]
    ] }
];
/* --- sýnidæmi --- */
const RG_ROLES = { hook: ['Kveikja', 'Hook'], disc: ['Umræða', 'Discussion'], thesis: ['Thesis', 'Thesis'], topic: ['Topic sentence', 'Topic sentence'], sup: ['Stuðningur og dæmi', 'Support and examples'], close: ['Closing sentence', 'Closing sentence'], restate: ['Thesis endurorðuð', 'Thesis restated'], wide: ['Endað vítt', 'Ending wide'] };
const rgLinkRe = () => new RegExp(`(^|[\\s“"(])(${[...RG_LINK].sort((a, b) => b.length - a.length).map(l => l.replace(/ /g, '\\s+')).join('|')})(?=[\\s,.;:])`, 'gi');
function rgSamples() {
  const st = store.get('rg:struct', true), sel = Math.min(RG_ESSAYS.length - 1, store.get('rg:ess', 0)), e = RG_ESSAYS[sel];
  const words = rgWords(e.p.map(p => p.map(s => s[1]).join(' ')).join(' '));
  const seg = ([r, x]) => { let h = esc(x); if (st) h = h.replace(rgLinkRe(), (m, pre, w) => `${pre}<b class="lk">${w}</b>`); return `<span class="sg ${r}" data-r="${RG_ROLES[r][L === 'is' ? 0 : 1]}">${h}</span>`; };
  return `<div class="rgbox red"><p style="margin:0">${rgT('Fjórar ritgerðir með ólíka afstöðu og ólíkar kveikjur, til að sjá hvernig uppbyggingin virkar í reynd. <b>Ekki læra þær utan að.</b> Kennarinn þekkir þær og ritgerð sem er lærð utan að hljómar ekki eins og þín. Notaðu þær til að sjá hvernig thesis, topic sentences, dæmi og tengiorð vinna saman, og skrifaðu svo þína eigin.', 'Four essays with different stances and different hooks, so you can see how the structure works in practice. <b>Do not memorise them.</b> Your teacher knows them, and a memorised essay does not sound like yours. Use them to see how the thesis, topic sentences, examples and linking words work together, then write your own.')}</p></div>
  <div class="rgess-pick" role="toolbar">${RG_ESSAYS.map((x, i) => `<button data-ess="${i}" aria-pressed="${i === sel}"><i>${String.fromCharCode(65 + i)}</i><b lang="en">${esc(x.title)}</b><small>${x.stance[L]}</small></button>`).join('')}</div>
  <div class="rgess-bar"><button class="rgbtn ${st ? '' : 'alt'}" id="rgstruct" aria-pressed="${st}">${st ? rgT('Fela uppbygginguna', 'Hide the structure') : rgT('Sýna uppbygginguna', 'Show the structure')}</button><span>${words} ${rgT('orð', 'words')} · ${rgT('Kveikja', 'Hook')}: ${e.hook[L]}</span></div>
  ${st ? `<div class="rglegend">${['hook', 'disc', 'thesis', 'topic', 'sup', 'close', 'restate', 'wide'].map(r => `<span class="sg ${r}">${RG_ROLES[r][L === 'is' ? 0 : 1]}</span>`).join('')}<span><b class="lk">${rgT('tengiorð', 'linking word')}</b></span></div>` : ''}
  <article class="rgessay-view ${st ? 'struct' : ''}" lang="en"><h3>${esc(e.title)}</h3>${e.p.map((p, i) => `<p${i ? ' class="ind"' : ''}>${st ? `<em class="pn">${i + 1}</em>` : ''}${p.map(seg).join(' ')}</p>`).join('')}</article>
  <div class="rgbox"><h3>${rgT('Hvað gerir þessa ritgerð góða?', 'What makes this essay good?')}</h3><ul style="margin:0">${e.notes[L].map(n => `<li>${n}</li>`).join('')}</ul></div>
  <div class="rgbox"><h3>${rgT('Prófaðu þetta', 'Try this')}</h3><ul style="margin:0">${(L === 'is' ? ['Lestu bara thesis-setningarnar fjórar. Sérðu skoðunina og rökin þrjú í hverri?', 'Lestu bara fyrstu setningu hverrar efnisgreinar. Ættirðu að geta sagt um hvað ritgerðin er?', 'Finndu dæmin úr bókinni. Hvaða dæmi myndir þú nota sem eru ekki hér?', 'Berðu saman ritgerð A og C: sömu bók, öfug afstaða, og báðar vel rökstuddar.'] : ['Read only the four thesis sentences. Can you see the opinion and the three arguments in each?', 'Read only the first sentence of each paragraph. Could you tell what the essay is about?', 'Find the examples from the book. Which examples would you use that are not here?', 'Compare essay A and C: the same book, the opposite stance, both well argued.']).map(n => `<li>${n}</li>`).join('')}</ul></div>`;
}
function rgSamplesBind() {
  $$('[data-ess]').forEach(b => b.onclick = () => { store.set('rg:ess', +b.dataset.ess); renderRitgerd(); });
  const s = $('#rgstruct'); if (s) s.onclick = () => { store.set('rg:struct', !store.get('rg:struct', true)); const y = window.scrollY; renderRitgerd(); window.scrollTo(0, y); };
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


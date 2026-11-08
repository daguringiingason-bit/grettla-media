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
`;
  document.head.appendChild(st);
}
const rgSubs = () => [['task', rgT('Verkefnið', 'The task')], ['ideas', rgT('Hugmyndir', 'Ideas')], ['plan', rgT('Áætlunin mín', 'My plan')], ['words', rgT('Orðaforði', 'Vocabulary')], ['drill', rgT('Æfing', 'Practice')]];
function renderRitgerd() {
  rgCss();
  if (!rgSubs().some(s => s[0] === RG.sub)) RG.sub = 'task';
  const nav = `<div class="rgsub" role="toolbar">${rgSubs().map(([k, l], i) => `<button data-rgsub="${k}" aria-pressed="${RG.sub === k}"><i>0${i + 1}</i>${l}</button>`).join('')}</div>`;
  const body = RG.sub === 'ideas' ? rgIdeas() : RG.sub === 'plan' ? rgPlan() : RG.sub === 'words' ? rgVocab() : RG.sub === 'drill' ? rgDrill() : rgTask();
  $('#main').innerHTML = `<div class="rg"><h1>${rgT('Bókadómur', 'Book review')} <span>·</span> 1984</h1>
    <p class="lead">${rgT('Hér undirbýrðu ritgerðina sem þú skrifar í tíma, án bókar og án glósna. Ritgerðina sjálfa skrifar þú, en hér finnurðu kröfurnar, hugmyndir og dæmi úr bókinni, stað til að skipuleggja þín eigin rök og æfingu þar sem þú skrifar á tíma eins og í prófinu.', 'Prepare here for the essay you will write in class, with no book and no notes. You write the essay yourself; here you will find the requirements, ideas and examples from the book, a place to plan your own arguments, and timed practice that works like the real thing.')}</p>
    ${nav}<div id="rgbody">${body}</div></div>${foot()}`;
  $$('[data-rgsub]').forEach(b => b.onclick = () => { RG.sub = b.dataset.rgsub; rgSet('sub', RG.sub); renderRitgerd(); window.scrollTo(0, 0); });
  if (RG.sub === 'plan') rgPlanBind();
  if (RG.sub === 'drill') rgDrillBind();
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
/* --- 05 æfing --- */
function rgDrill() {
  const keys = [['thesis', 'Thesis'], ['k2', `${rgT('Lykill', 'Key')} A`], ['k3', `${rgT('Lykill', 'Key')} B`], ['k4', `${rgT('Lykill', 'Key')} C`]];
  const hist = store.get('rg:hist', []);
  const hasPlan = keys.some(k => String(rgGet('p:' + k[0]) || '').trim());
  return `<h2 style="margin-top:0">${rgT('Minnisæfing', 'Memory drill')}</h2>
  <div class="rgbox">${hasPlan ? `<p style="margin-top:0">${rgT('Skrifaðu thesis og minnislyklana eftir minni. Svo berðu saman við áætlunina.', 'Write your thesis and memory keys from memory. Then compare with your plan.')}</p>
    <div class="rgmem">${keys.map(([k, l]) => `<div data-mem="${k}"><div class="rgf" style="margin:0"><label for="rgm-${k}">${l}</label><input type="text" id="rgm-${k}" lang="en" autocomplete="off"></div><div class="ans" lang="en">${esc(rgGet('p:' + k)) || '—'}</div></div>`).join('')}</div>
    <p><button class="rgbtn" id="rgmchk">${rgT('Bera saman', 'Compare')}</button><button class="rgbtn alt" id="rgmclr">${rgT('Reyna aftur', 'Try again')}</button></p><div id="rgmres"></div>`
    : `<p style="margin:0">${rgT('Fylltu fyrst út thesis og minnislyklana í „Áætlunin mín“.', 'First fill in the thesis and memory keys in “My plan”.')}</p>`}</div>
  <h2>${rgT('Skrifa á tíma, eins og í prófinu', 'Timed writing, like the real thing')}</h2>
  <p>${rgT('Engin áætlun, engin bók. Ýttu á Tab í byrjun efnisgreinar til að draga inn og ekki hafa auðar línur á milli. Það sem þú skrifar vistast í vafranum.', 'No plan, no book. Press Tab at the start of a paragraph to indent, and leave no empty lines between paragraphs. What you write is saved in the browser.')}</p>
  <div class="rgtimer"><span class="clock" id="rgclock">${String(RG.dur).padStart(2, '0')}:00</span>
    <label><span class="sr">${rgT('Lengd', 'Length')}</span><select id="rgdur">${[30, 40, 45, 50, 60, 80].map(m => `<option value="${m}" ${m === RG.dur ? 'selected' : ''}>${m} min</option>`).join('')}</select></label>
    <button class="rgbtn" id="rgstart" style="margin:0">${RG.end ? rgT('Stöðva', 'Stop') : rgT('Byrja', 'Start')}</button>
    <span class="wc"><b id="rgwc">0</b> ${rgT('orð', 'words')} · <b id="rgpc">0</b> ${rgT('efnisgreinar', 'paragraphs')}</span></div>
  <textarea class="rgessay" id="rgessay" lang="en" spellcheck="false" placeholder="${rgT('Skrifaðu ritgerðina hér…', 'Write your essay here…')}">${esc(rgGet('draft'))}</textarea>
  <p style="margin-top:12px"><button class="rgbtn" id="rgdone">${rgT('Klára og fara yfir', 'Finish and check')}</button><button class="rgbtn alt" id="rgnew">${rgT('Nýtt uppkast', 'New draft')}</button></p>
  <div id="rgres"></div>
  ${hist.length ? `<h2>${rgT('Fyrri tilraunir', 'Earlier attempts')}</h2><table class="rgtbl"><thead><tr><th>${rgT('Dags.', 'Date')}</th><th>${rgT('Orð', 'Words')}</th><th>${rgT('Efnisgr.', 'Paragraphs')}</th><th>${rgT('Mínútur', 'Minutes')}</th><th>${rgT('Gátlisti', 'Checklist')}</th></tr></thead><tbody>${hist.slice(-8).reverse().map(h => `<tr><td>${esc(h.d)}</td><td>${h.w}</td><td>${h.p}</td><td>${h.m ?? '–'}</td><td>${h.s}</td></tr>`).join('')}</tbody></table>` : ''}`;
}
function rgParas(txt) { return String(txt || '').split(/\n+/).map(s => s.trim()).filter(Boolean); }
function rgCount() { const ta = $('#rgessay'); if (!ta) return; const w = rgWords(ta.value), p = rgParas(ta.value).length; const a = $('#rgwc'), b = $('#rgpc'); if (a) { a.textContent = w; a.style.color = w > 500 ? 'var(--red)' : w >= 400 ? '#2d7a3e' : ''; } if (b) b.textContent = p; }
function rgTick() {
  const c = $('#rgclock'); if (!RG.end) return;
  const left = Math.max(0, Math.round((RG.end - Date.now()) / 1000));
  if (c) { c.textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`; c.classList.toggle('low', left <= 300); }
  if (!left) { clearInterval(RG.iv); RG.iv = 0; RG.end = 0; const s = $('#rgstart'); if (s) s.textContent = rgT('Byrja', 'Start'); if (c) c.textContent = rgT('Búið!', 'Time!'); rgCheck(true); }
}
function rgCheck(timed) {
  const ta = $('#rgessay'); if (!ta) return;
  const txt = ta.value, ps = rgParas(txt), w = rgWords(txt), low = txt.toLowerCase();
  const startsLink = p => { const s = p.toLowerCase().replace(/^[\s"“]+/, ''); return RG_LINK.some(l => s.startsWith(l)); };
  const links = RG_LINK.filter(l => new RegExp(`\\b${l.replace(/ /g, '\\s+')}\\b`, 'i').test(low));
  const contr = (txt.match(/\b(don|doesn|didn|isn|aren|wasn|weren|can|couldn|won|wouldn|shouldn|it|that|there|he|she|they|we|you|i)['’](t|s|re|ve|ll|d|m)\b/gi) || []);
  const ithink = (low.match(/\bi think\b/g) || []).length;
  const retell = (low.match(/\b(and then|after that|then he|then she|then they|next,? he)\b/g) || []).length;
  const names = ['winston', 'julia', 'o’brien', "o'brien", 'big brother', 'room 101', 'telescreen', 'newspeak', 'ministry', 'party', 'charrington', 'syme', 'parsons', 'goldstein', 'thought police', 'proles', 'doublethink'].filter(n => low.includes(n));
  const planKeys = ['k2', 'k3', 'k4'].map(k => String(rgGet('p:' + k) || '').toLowerCase().match(/[a-z’'-]{4,}/g) || []);
  const keyHit = planKeys.map(ws => !ws.length ? null : ws.some(x => low.includes(x)));
  const res = [];
  res.push([w >= 400 && w <= 500 ? 'ok' : 'no', rgT(`${w} orð (markmið 400–500)`, `${w} words (target 400–500)`)]);
  res.push([ps.length === 5 ? 'ok' : 'no', rgT(`${ps.length} efnisgreinar (á að vera 5)`, `${ps.length} paragraphs (should be 5)`)]);
  if (ps.length >= 5) { const miss = [1, 2, 3, 4].filter(i => !startsLink(ps[i])); res.push([miss.length ? 'no' : 'ok', miss.length ? rgT(`Efnisgrein ${miss.map(i => i + 1).join(', ')} byrjar ekki á tengiorði`, `Paragraph ${miss.map(i => i + 1).join(', ')} does not start with a linking word`) : rgT('Efnisgreinar 2–5 byrja allar á tengiorði', 'Paragraphs 2–5 all start with a linking word')]); }
  if (ps.length >= 5) { const i0 = ps[0], lastS = i0.split(/(?<=[.!?])\s+/).pop() || ''; res.push([/,/.test(lastS) && /\band\b/i.test(lastS) ? 'ok' : 'hm', rgT('Endar inngangurinn á thesis með þrennum rökum (… A, B and C)?', 'Does the introduction end with a thesis with three arguments (… A, B and C)?')]); }
  if (ps.length >= 5) res.push([/^(in conclusion|to conclude|to sum up|in summary|all in all|in light of|in short)/i.test(ps[ps.length - 1]) ? 'ok' : 'no', rgT('Lokaorðin byrja á samantektarorði (In conclusion…)', 'The conclusion starts with a summary phrase (In conclusion…)')]);
  res.push([links.length >= 6 ? 'ok' : 'hm', rgT(`${links.length} mismunandi tengiorð (stefndu á 6+)`, `${links.length} different linking words (aim for 6+)`)]);
  res.push([names.length >= 5 ? 'ok' : 'hm', rgT(`Ákveðin atriði úr bókinni: ${names.length} (${names.slice(0, 8).join(', ') || '–'})`, `Specific details from the book: ${names.length} (${names.slice(0, 8).join(', ') || '–'})`)]);
  res.push([contr.length ? 'no' : 'ok', contr.length ? rgT(`Styttingar: ${[...new Set(contr)].join(', ')}`, `Contractions: ${[...new Set(contr)].join(', ')}`) : rgT('Engar styttingar', 'No contractions')]);
  if (ithink > 2) res.push(['hm', rgT(`„I think“ kemur ${ithink} sinnum fyrir; reyndu að breyta til`, `“I think” appears ${ithink} times; try to vary it`)]);
  if (retell > 1) res.push(['hm', rgT('Orð eins og „and then / after that“ benda til endursagnar. Ertu að meta eða segja frá?', 'Words like “and then / after that” suggest retelling. Are you evaluating or narrating?')]);
  if (/\n\s*\n/.test(txt.trim())) res.push(['no', rgT('Auðar línur á milli efnisgreina; notaðu inndrátt í staðinn', 'Empty lines between paragraphs; use indentation instead')]);
  if (keyHit.some(x => x !== null)) res.push([keyHit.every(x => x !== false) ? 'ok' : 'hm', rgT('Rökin úr áætluninni þinni sjást í textanum', 'The arguments from your plan appear in the text') + (keyHit.some(x => x === false) ? rgT(` (vantar: ${keyHit.map((x, i) => x === false ? 'ABC'[i] : '').filter(Boolean).join(', ')})`, ` (missing: ${keyHit.map((x, i) => x === false ? 'ABC'[i] : '').filter(Boolean).join(', ')})`) : '')]);
  const okN = res.filter(r => r[0] === 'ok').length;
  $('#rgres').innerHTML = `<div class="rgbox red"><h3>${rgT('Sjálfvirk yfirferð', 'Automatic check')} · ${okN}/${res.length}</h3><ul class="rgres">${res.map(r => `<li class="${r[0]}">${r[1]}</li>`).join('')}</ul>
    <p style="margin-bottom:0;color:var(--muted)">${rgT('Vélin telur og leitar að mynstrum; hún getur ekki metið hvort rökin eru góð. Farðu líka yfir gátlistann í „Verkefnið“ og lestu ritgerðina upphátt, eða fáðu einhvern til að lesa hana.', 'The machine counts and looks for patterns; it cannot judge whether your arguments are good. Also go through the checklist in “The task” and read the essay aloud, or ask someone to read it.')}</p></div>`;
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
  const ta = $('#rgessay');
  ta.oninput = () => { rgSet('draft', ta.value); rgCount(); };
  ta.onkeydown = e => { if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); const s = ta.selectionStart, en = ta.selectionEnd; ta.value = ta.value.slice(0, s) + '\t' + ta.value.slice(en); ta.selectionStart = ta.selectionEnd = s + 1; ta.oninput(); } };
  rgCount();
  $('#rgdur').onchange = e => { RG.dur = +e.target.value; store.set('rg:dur', RG.dur); if (!RG.end) $('#rgclock').textContent = `${String(RG.dur).padStart(2, '0')}:00`; };
  $('#rgstart').onclick = () => {
    if (RG.end) { clearInterval(RG.iv); RG.iv = 0; RG.end = 0; $('#rgstart').textContent = rgT('Byrja', 'Start'); return; }
    RG.end = Date.now() + RG.dur * 60000; RG.started = Date.now(); $('#rgstart').textContent = rgT('Stöðva', 'Stop');
    clearInterval(RG.iv); RG.iv = setInterval(rgTick, 1000); rgTick(); ta.focus();
  };
  if (RG.end) { clearInterval(RG.iv); RG.iv = setInterval(rgTick, 1000); rgTick(); }
  $('#rgdone').onclick = () => { if (RG.end) { clearInterval(RG.iv); RG.iv = 0; RG.end = 0; $('#rgstart').textContent = rgT('Byrja', 'Start'); } rgCheck(false); $('#rgres').scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  $('#rgnew').onclick = () => { const b = $('#rgnew'); if (ta.value.trim() && !b.dataset.sure) { b.dataset.sure = 1; b.textContent = rgT('Ýttu aftur: eyðir uppkastinu', 'Click again: deletes the draft'); return; } ta.value = ''; rgSet('draft', ''); rgCount(); $('#rgres').innerHTML = ''; delete b.dataset.sure; b.textContent = rgT('Nýtt uppkast', 'New draft'); ta.focus(); };
}


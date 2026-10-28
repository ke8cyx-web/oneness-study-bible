/* One God One Faith Ministry Digital Oneness Study Bible
   KJV data source: https://github.com/midvash/bible-data (public-domain KJV dataset).
   The full KJV JSON is downloaded once, then stored in IndexedDB for offline reading.
*/
const DATA_URL = "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/kjv/kjv.json";
const DB_NAME = "ogof-oneness-bible";
const DB_STORE = "library";
let bible = null, currentBookIndex = 0, currentChapter = 1, noteTarget = null, installPrompt = null;
const $ = id => document.getElementById(id);
const els = {
  dataStatus:$("dataStatus"), book:$("bookSelect"), chapter:$("chapterSelect"), load:$("loadChapterBtn"),
  title:$("chapterTitle"), verses:$("verses"), prev:$("prevChapter"), next:$("nextChapter"),
  topic:$("topicSelect"), topicContent:$("topicContent"), searchForm:$("searchForm"), search:$("searchInput"),
  searchStatus:$("searchStatus"), searchResults:$("searchResults"), bookmarks:$("bookmarksList")
};
const studyTopics = {
 oneGod:{title:"The One God",key:"Deuteronomy 6:4",body:[
  "Key text: Deuteronomy 6:4 — “The LORD our God is one LORD.” Read the whole confession in Deuteronomy 6:4–9.",
  "Oneness study note: Scripture repeatedly confesses one God and rejects the worship of other gods. The Oneness approach understands the Father, the Son, and the Holy Spirit as the one God revealed and at work, not three separate divine persons. Read each passage in its context and compare the language used by the biblical writers.",
  "Study questions: What does the passage explicitly say about the number and identity of God? How does the New Testament speak about Jesus in relation to Israel's confession of one God?"
 ],refs:["Isaiah 43:10–11","Isaiah 44:6–8","Mark 12:29","John 14:7–11","1 Corinthians 8:4–6","Ephesians 4:4–6"]},
 word:{title:"The Word Was God — John 1:1–14",key:"John 1:1",body:[
  "Read John 1:1–14 as one continuous passage. Notice the Word, creation, life, light, witness, and the Word becoming flesh.",
  "Oneness study note: A Oneness reading understands the Word as God's own self-expression, wisdom, purpose, and revelation—not a second God alongside the Father. John 1:14 says the Word was made flesh, which Christians connect to the incarnation of Jesus Christ. Study the grammar and the wider biblical use of God's word before drawing conclusions.",
  "Careful reading: John distinguishes the Word from God in the sentence's wording while also saying the Word was God. Compare John 1:1 with John 1:14, John 14:7–11, and Colossians 2:9; do not ignore any part of the text."
 ],refs:["Genesis 1:3","Psalm 33:6","Isaiah 55:10–11","John 1:1–14","John 14:7–11","Colossians 2:9","Hebrews 1:1–3"]},
 fatherSon:{title:"The Father Revealed in the Son — John 14:7–11",key:"John 14:9",body:[
  "Read John 14:7–11. Philip asks Jesus to show them the Father. Jesus replies that the one who has seen Him has seen the Father and points to the Father dwelling in Him and doing the works.",
  "Oneness study note: This passage is central to the belief that God was personally revealed in Jesus Christ. The Father is not presented as absent from Jesus; Jesus says the Father dwells in Him. Study both the strong identification language and the distinction in the passage between Jesus speaking and the Father working in Him.",
  "Discussion: What does Jesus say Philip has seen? What explanation does Jesus give in verses 10–11?"
 ],refs:["Isaiah 9:6","John 10:30","John 12:44–45","John 14:7–11","Colossians 2:9","1 Timothy 3:16"]},
 fullness:{title:"The Fullness of the Godhead — Colossians 2:9",key:"Colossians 2:9",body:[
  "Read Colossians 2:8–10. Paul warns believers against deceptive philosophy and directs them to Christ.",
  "Oneness study note: Colossians 2:9 states that in Christ dwells all the fullness of the Godhead bodily. Oneness believers understand this as affirming that the fullness of deity is present in Jesus Christ, not merely a portion of God. Verse 10 continues by describing Christ as head of all principality and power.",
  "Study the immediate context and compare John 1:14, John 14:9–11, and 1 Timothy 3:16."
 ],refs:["John 1:14","John 14:9–11","Colossians 1:15–20","Colossians 2:8–10","1 Timothy 3:16"]},
 nameJesus:{title:"The Name of Jesus and Acts 2:38",key:"Acts 2:38",body:[
  "Read Acts 2:22–41, not only verse 38. Peter preaches Jesus' death and resurrection, calls the hearers to repent and be baptized in the name of Jesus Christ, and speaks of the promise of the Holy Ghost.",
  "Oneness study note: Oneness Pentecostal teaching emphasizes the apostolic pattern of baptism in Jesus' name and reads it alongside Matthew 28:19. Compare the command, the sermons in Acts, and the specific responses described in the text.",
  "Study questions: What did Peter command? What did the people ask? What does the passage say about repentance, baptism, forgiveness, and the gift of the Holy Ghost?"
 ],refs:["Matthew 28:19","Luke 24:46–49","Acts 2:38–41","Acts 8:12–17","Acts 10:44–48","Acts 19:1–6"]},
 spirit:{title:"God Is a Spirit — John 4:24",key:"John 4:24",body:[
  "Read John 4:19–26. Jesus speaks with the Samaritan woman about worship, then says God is a Spirit and true worshippers must worship in spirit and in truth.",
  "Oneness study note: This passage affirms God's spiritual nature. Oneness believers connect it with the truth that the invisible God was manifested in flesh in Jesus Christ. The verse itself is about the nature of God and the character of true worship; use other passages to build the wider doctrine.",
  "Compare God's Spirit in the Old Testament with the New Testament's teaching about the Spirit of God and the Spirit of Christ."
 ],refs:["Genesis 1:2","Deuteronomy 4:12","Isaiah 40:13","John 4:24","Romans 8:9–11","2 Corinthians 3:17"]},
 genesis1:{title:"Genesis 1 — Creation",key:"Genesis 1:1",body:[
  "Genesis 1 presents God as Creator and sovereign over all that exists. The repeated “And God said” shows creation responding to God's command.",
  "Genesis 1:2 describes the Spirit of God moving upon the face of the waters. A Oneness reading understands God's Spirit as God's own presence and action, not another god.",
  "Genesis 1:26 says “Let us make man”; verse 27 immediately says God created man in His own image. Interpret the plural wording alongside the whole passage and the Bible's repeated confession that God is one."
 ],refs:["Deuteronomy 6:4","Psalm 33:6–9","Isaiah 44:24","John 1:1–3","Acts 17:24–28"]},
 genesis2:{title:"Genesis 2 — Humanity",key:"Genesis 2:7",body:[
  "Genesis 2 focuses on the formation of the man, God's provision in Eden, the command concerning the tree, and the creation of woman.",
  "Genesis 2:7 presents human life as received from God. Genesis 2:24 establishes the marriage bond that Jesus later quotes.",
  "Read Genesis 1 and 2 together: the same Creator makes humanity and gives humanity its responsibilities."
 ],refs:["Genesis 1:26–28","Genesis 2:7","Matthew 19:4–6","Acts 17:25"]},
 genesis3:{title:"Genesis 3 — The Fall and Promise",key:"Genesis 3:15",body:[
  "Genesis 3 records the serpent's temptation, humanity's disobedience, shame, judgment, and God's provision.",
  "Many Christian readers understand Genesis 3:15 as the first promise pointing toward the Messiah's victory over evil. The verse's full significance is developed through later Scripture.",
  "Read the chapter carefully: distinguish what the text states directly from later theological conclusions, and compare Romans 5 and Hebrews 2."
 ],refs:["Genesis 3:15","Romans 5:12–21","Romans 16:20","Hebrews 2:14","Revelation 20:10"]}
};
function openDB(){
 return new Promise((resolve,reject)=>{
  const req=indexedDB.open(DB_NAME,1);
  req.onupgradeneeded=()=>{req.result.createObjectStore(DB_STORE)};
  req.onsuccess=()=>resolve(req.result); req.onerror=()=>reject(req.error);
 });
}
async function getStored(key){
 try{const db=await openDB();return await new Promise((resolve,reject)=>{const r=db.transaction(DB_STORE).objectStore(DB_STORE).get(key);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}catch(e){return null}
}
async function setStored(key,value){
 const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(DB_STORE,"readwrite");tx.objectStore(DB_STORE).put(value,key);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error)});
}
function setStatus(msg,error=false){
 els.dataStatus.textContent=msg;els.dataStatus.classList.toggle("error",error);
 const footer=document.getElementById("footerStatus");if(footer)footer.textContent=msg;
}
function normalizeBible(raw){
 if(raw && Array.isArray(raw.books)) return raw.books.map(b=>({
  name:b.englishName||b.name||b.title||b.book,
  chapters:(b.chapters||[]).map((ch)=> {
   const vs=ch.verses||ch;
   if(Array.isArray(vs)) return vs.map((v,i)=>typeof v==="string"?v:(v.text||v.verse||""));
   return Object.keys(vs).sort((a,b)=>Number(a)-Number(b)).map(k=>typeof vs[k]==="string"?vs[k]:(vs[k].text||""));
  })
 }));
 if(raw && raw.books && typeof raw.books==="object") return Object.entries(raw.books).map(([name,b])=>({
  name:b.englishName||b.name||b.title||name,
  chapters:(b.chapters||[]).map(ch=>{
   const verses=ch.verses||ch;
   return Array.isArray(verses)?verses.map(v=>typeof v==="string"?v:(v.text||v.verse||"")):Object.keys(verses).sort((a,b)=>Number(a)-Number(b)).map(k=>typeof verses[k]==="string"?verses[k]:(verses[k].text||""));
  })
 }));
 throw new Error("Unexpected Bible data format");
}
function isValidBible(data){
 return Array.isArray(data)&&data.length===66&&data.every(b=>b&&typeof b.name==="string"&&Array.isArray(b.chapters)&&b.chapters.length>0&&b.chapters.every(ch=>Array.isArray(ch)));
}
async function loadBible(){
 setStatus("Checking saved Bible…");
 const stored=await getStored("kjv");
 if(isValidBible(stored)&&stored[0].name==="Genesis"&&stored[65].name==="Revelation"){bible=stored;setStatus("KJV ready · all 66 books saved offline");setupSelectors();renderChapter();return}
 setStatus("Downloading full KJV…");
 try{
  const res=await fetch(DATA_URL,{cache:"force-cache"});
  if(!res.ok)throw new Error("Bible data request failed ("+res.status+")");
  const raw=await res.json();bible=normalizeBible(raw);
  if(!isValidBible(bible))throw new Error("The downloaded dataset did not contain all 66 valid Bible books");
  await setStored("kjv",bible);
  setStatus("KJV ready · all 66 books saved offline");setupSelectors();renderChapter();
 }catch(e){
  console.error(e);setStatus("Could not load KJV. Connect to internet and reload.",true);
  els.title.textContent="Bible data not downloaded yet";
  els.verses.innerHTML='<p class="muted">Connect to the internet once, then reload this page. After the KJV is saved locally, reading can work offline.</p>';
 }
}
function setupSelectors(){
 els.book.innerHTML="";
 bible.forEach((b,i)=>{const o=document.createElement("option");o.value=i;o.textContent=b.name;els.book.append(o)});
 currentBookIndex=Math.min(currentBookIndex,bible.length-1);
 els.book.value=currentBookIndex;populateChapters();
 els.book.disabled=els.chapter.disabled=els.load.disabled=false;
}
function populateChapters(){
 const b=bible[Number(els.book.value)];els.chapter.innerHTML="";
 (b.chapters||[]).forEach((_,i)=>{const o=document.createElement("option");o.value=i+1;o.textContent="Chapter "+(i+1);els.chapter.append(o)});
 currentChapter=Math.min(currentChapter,b.chapters.length)||1;els.chapter.value=currentChapter;
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function refOf(book,chapter,verse){return `${book} ${chapter}:${verse}`}
function renderChapter(){
 if(!bible)return;
 const highlights=getHighlights();
 currentBookIndex=Number(els.book.value);currentChapter=Number(els.chapter.value);
 const b=bible[currentBookIndex], verses=b.chapters[currentChapter-1]||[];
 els.title.textContent=`${b.name} ${currentChapter}`;
 els.verses.innerHTML="";
 verses.forEach((text,i)=>{
  const v=i+1, ref=refOf(b.name,currentChapter,v);
  const row=document.createElement("div");row.className="verse"+(highlights[ref]?" verse-highlighted":"");
  row.innerHTML=`<span class="verse-number">${v}</span><div class="verse-text">${esc(text)}</div><div class="verse-actions"><button data-action="study" data-ref="${esc(ref)}">Study</button><button data-action="bookmark" data-ref="${esc(ref)}" data-text="${esc(text)}">Save</button><button data-action="note" data-ref="${esc(ref)}" data-text="${esc(text)}">Note</button><button data-action="highlight" data-ref="${esc(ref)}" title="Highlight this verse">Mark</button><button data-action="copy" data-ref="${esc(ref)}" data-text="${esc(text)}">Copy</button></div>`;
  els.verses.append(row);
 });
 els.prev.disabled=currentBookIndex===0&&currentChapter===1;
 els.next.disabled=currentBookIndex===bible.length-1&&currentChapter===b.chapters.length;
 els.footerStatus=document.getElementById("footerStatus");
}
function moveChapter(delta){
 if(!bible)return;
 let bi=Number(els.book.value),ch=Number(els.chapter.value)+delta;
 if(ch<1){bi--;if(bi<0)return;ch=bible[bi].chapters.length}
 else if(ch>bible[bi].chapters.length){bi++;if(bi>=bible.length)return;ch=1}
 els.book.value=bi;populateChapters();els.chapter.value=ch;renderChapter();window.scrollTo({top:0,behavior:"smooth"});
}
function showVerseCommentary(ref){
 const item=window.verseCommentary?.[ref];
 const existing=document.getElementById("commentaryDialog");
 if(!item){if(existing){existing.showModal();document.getElementById("commentaryDialogTitle").textContent=ref+" — Commentary in progress";document.getElementById("commentaryDialogBody").innerHTML=`<p>This verse is part of the complete KJV reader, but its individual Oneness commentary has not yet been written and reviewed.</p><p>For now, read the verse in its chapter context and compare it with the related passages in the Study Notes section. This message is not a substitute for a completed verse-specific explanation.</p>`;}return;}
 document.getElementById("commentaryDialogTitle").textContent=ref+" — "+item.title;
 document.getElementById("commentaryDialogBody").innerHTML=`<p>${esc(item.text)}</p><h3>Related Scriptures</h3><div>${item.refs.map(r=>`<button class="ref-chip" data-commentary-ref="${esc(r)}">${esc(r)}</button>`).join("")}</div><p class="muted">This is original Oneness-oriented commentary, not the wording of the KJV. Read each cited passage in context.</p>`;
 existing.showModal();
}
function getBookmarks(){try{return JSON.parse(localStorage.getItem("ogof-bookmarks")||"[]")}catch{return[]}}
function saveBookmarks(items){localStorage.setItem("ogof-bookmarks",JSON.stringify(items));renderBookmarks()}
function addBookmark(ref,text){
 const arr=getBookmarks();if(!arr.some(x=>x.ref===ref))arr.unshift({ref,text,created:new Date().toISOString()});
 saveBookmarks(arr);setStatus("Bookmark saved");
}
function removeBookmark(ref){saveBookmarks(getBookmarks().filter(x=>x.ref!==ref))}
function getNotes(){try{return JSON.parse(localStorage.getItem("ogof-notes")||"{}")}catch{return{}}}
function getHighlights(){try{return JSON.parse(localStorage.getItem("ogof-highlights")||"{}")}catch{return{}}}
function toggleHighlight(ref){const h=getHighlights();if(h[ref])delete h[ref];else h[ref]=true;localStorage.setItem("ogof-highlights",JSON.stringify(h));renderChapter();setStatus(h[ref]?"Verse marked":"Verse mark removed");}
async function copyText(text){try{await navigator.clipboard.writeText(text);setStatus("Copied to clipboard");}catch{const area=document.createElement("textarea");area.value=text;document.body.append(area);area.select();const ok=document.execCommand("copy");area.remove();setStatus(ok?"Copied to clipboard":"Copy was blocked by this browser",!ok);}}
function showNote(ref,text){
 noteTarget={ref,text};$("noteVerseRef").textContent=ref;$("noteVerseText").textContent=text;$("noteText").value=getNotes()[ref]||"";$("noteDialog").showModal();
}
function saveNote(){
 if(!noteTarget)return;const notes=getNotes(),value=$("noteText").value.trim();
 if(value)notes[noteTarget.ref]=value;else delete notes[noteTarget.ref];
 localStorage.setItem("ogof-notes",JSON.stringify(notes));$("noteDialog").close();
}
function renderBookmarks(){
 const arr=getBookmarks(),notes=getNotes();
 els.bookmarks.innerHTML="";
 if(!arr.length&&!Object.keys(notes).length){els.bookmarks.innerHTML='<p class="muted">No saved verses or notes yet. Use Save or Note beside a verse while reading.</p>';return}
 arr.forEach(x=>{
  const div=document.createElement("div");div.className="result";
  div.innerHTML=`<button data-openref="${esc(x.ref)}"><span class="result-ref">${esc(x.ref)}</span><div class="result-text">${esc(x.text)}</div></button><button class="outline small" data-remove="${esc(x.ref)}">Remove bookmark</button>${notes[x.ref]?`<p><strong>Your note:</strong> ${esc(notes[x.ref])}</p>`:""}`;
  els.bookmarks.append(div);
 });
 Object.entries(notes).filter(([ref])=>!arr.some(x=>x.ref===ref)).forEach(([ref,note])=>{
  const div=document.createElement("div");div.className="result";div.innerHTML=`<div class="result-ref">${esc(ref)}</div><p>${esc(note)}</p><button class="outline small" data-editnote="${esc(ref)}">Edit note</button>`;els.bookmarks.append(div);
 });
}
function parseRef(ref){
 if(!bible)return null;
 const m=ref.trim().match(/^(.*)\s+(\d+):(\d+)(?:[-–]\d+)?$/);if(!m)return null;
 const refBook=m[1].toLowerCase();
 const aliases={"psalm":"psalms","song of songs":"song of solomon"};
 const wanted=aliases[refBook]||refBook;
 const bi=bible.findIndex(b=>b.name.toLowerCase()===wanted);if(bi<0)return null;
 return {bi,ch:Number(m[2]),v:Number(m[3])};
}
function openRef(ref){
 const p=parseRef(ref);if(!p){setStatus("That reference contains more than one passage. Choose one reference at a time.");return}
 if(!bible){setStatus("Wait for the KJV to finish loading before opening a reference.");return}
 if(p.ch<1||p.ch>bible[p.bi].chapters.length||p.v<1||p.v>bible[p.bi].chapters[p.ch-1].length){setStatus("That chapter or verse could not be found in the loaded KJV.");return}
 els.book.value=p.bi;populateChapters();els.chapter.value=p.ch;renderChapter();
 setTimeout(()=>{const row=[...els.verses.children].find(x=>x.querySelector(".verse-number")?.textContent===String(p.v));if(row){row.scrollIntoView({behavior:"smooth",block:"center"});row.style.background="#fff5cf";setTimeout(()=>row.style.background="",1800)}},30);
 document.querySelector('[data-tab="read"]').click();
}
function renderTopic(){
 const t=studyTopics[els.topic.value];if(!t)return;
 els.topicContent.innerHTML=`<h3>${esc(t.title)}</h3><p class="result-ref">Key passage: ${esc(t.key)}</p>${t.body.map(p=>`<p>${esc(p)}</p>`).join("")}<h3>Cross-references to read</h3><div>${t.refs.map(r=>`<button class="ref-chip" data-topicref="${esc(r)}">${esc(r)}</button>`).join("")}</div>`;
}
function renderBookGuide(){
 const select=$("bookGuideSelect"),content=$("bookGuideContent");
 if(!select||!content||!Array.isArray(window.bookGuides))return;
 const guides=window.bookGuides;
 if(select.options.length!==guides.length){
  select.innerHTML="";
  guides.forEach((g,i)=>{const option=document.createElement("option");option.value=String(i);option.textContent=g.book;select.append(option)});
 }
 const guide=guides[Number(select.value)||0];
 if(!guide)return;
 content.innerHTML=`<h3>${esc(guide.book)} — ${esc(guide.theme)}</h3>
 <h3>Key passages</h3><div>${guide.passages.split("; ").map(ref=>{const fullRef=/^\d+:\d+/.test(ref)?guide.book+" "+ref:ref;return `<button class="ref-chip" data-guide-ref="${esc(fullRef)}">${esc(fullRef)}</button>`}).join("")}</div>
 <h3>Study focus</h3><p>${esc(guide.focus)}</p>
 <h3>Questions to consider</h3><p>${esc(guide.questions)}</p>
 <p class="muted">Study reminder: these are teaching notes. Read the full chapters, compare Scripture with Scripture, and distinguish the biblical text from commentary.</p>`;
}
function searchBible(query){
 const q=query.toLowerCase().trim();if(!q)return [];
 const results=[];
 outer:for(const b of bible){for(let ci=0;ci<b.chapters.length;ci++){const ch=b.chapters[ci]||[];for(let vi=0;vi<ch.length;vi++){const text=ch[vi]||"";if(text.toLowerCase().includes(q)){results.push({ref:refOf(b.name,ci+1,vi+1),text});if(results.length>=250)break outer}}}}
 return results;
}

const readingPlan = [
 ["Deuteronomy 6:4–9","Israel’s confession that the LORD is one"],
 ["Isaiah 43:10–11","The LORD declares that there is no other Saviour"],
 ["Isaiah 44:6–8","The LORD declares Himself first and last"],
 ["Isaiah 9:6","The promised child and the names given to Him"],
 ["Micah 5:2","The ruler promised from Bethlehem"],
 ["John 1:1–14","The Word was God and was made flesh"],
 ["John 4:19–26","God is Spirit; Jesus speaks of true worship"],
 ["John 8:48–59","Read John 8 in context; focus especially on Jesus’ identity claims"],
 ["John 10:22–38","Jesus’ works and His statement about the Father"],
 ["John 14:7–11","Jesus tells Philip to see the Father revealed in Him"],
 ["John 20:24–31","Thomas confesses Jesus as Lord and God"],
 ["Acts 2:22–39","Peter preaches Jesus and calls for repentance and baptism"],
 ["Acts 10:34–48","The gospel reaches Cornelius and his household"],
 ["Romans 8:1–17","The Spirit of God and the Spirit of Christ"],
 ["1 Corinthians 8:4–6","One God, the Father, and one Lord, Jesus Christ"],
 ["2 Corinthians 5:17–21","God reconciling the world to Himself in Christ"],
 ["Galatians 3:26–29","Believers put on Christ"],
 ["Philippians 2:5–11","Christ humbled Himself and is exalted"],
 ["Colossians 1:12–20","The image of the invisible God and fullness in Christ"],
 ["Colossians 2:8–10","All the fullness of the Godhead dwells bodily in Christ"],
 ["1 Timothy 3:14–16","The mystery of godliness and God manifested in flesh"],
 ["Titus 2:11–14","The great God and Saviour Jesus Christ"],
 ["Hebrews 1:1–12","God speaks by the Son; the Son’s divine glory"],
 ["1 Peter 2:21–25","Christ suffers and bears our sins"],
 ["1 John 5:18–21","The true God and eternal life"],
 ["Revelation 1:4–18","The First and the Last, who was dead and is alive"],
 ["Revelation 4:8–11","The Holy One and Creator worshipped"],
 ["Revelation 21:1–7","God dwells with His people"],
 ["Revelation 22:6–16","The Alpha and Omega and the coming Lord"],
 ["Review: Deuteronomy 6:4; John 14:9; Colossians 2:9","Review the one-God confession and the revelation of God in Christ"]
];
const crossrefTrail = [
 {ot:"Isaiah 40:3",nt:"Matthew 3:1–3",note:"Isaiah speaks of preparing the way of the LORD; Matthew applies the forerunner prophecy to John preparing the way for Jesus."},
 {ot:"Isaiah 9:6",nt:"John 14:7–11",note:"The promised child is called Mighty God and Everlasting Father; Jesus tells Philip that seeing Him is seeing the Father and points to the Father dwelling in Him."},
 {ot:"Isaiah 43:10–11",nt:"Titus 2:13–14",note:"Isaiah declares the LORD the only Saviour; Titus speaks of the great God and Saviour Jesus Christ. Read the grammar and context carefully."},
 {ot:"Isaiah 44:6",nt:"Revelation 1:17–18",note:"The LORD calls Himself the first and the last; the risen Jesus uses the same title and identifies Himself as the one who was dead and is alive."},
 {ot:"Joel 2:32",nt:"Romans 10:9–13",note:"Joel says whoever calls on the name of the LORD shall be delivered; Paul quotes this passage in a section about confessing Jesus as Lord."},
 {ot:"Psalm 23:1",nt:"John 10:11–16",note:"The LORD is Israel’s shepherd; Jesus calls Himself the good shepherd who lays down His life for the sheep."},
 {ot:"Jeremiah 23:5–6",nt:"1 Corinthians 1:30; 2 Corinthians 5:21",note:"The promised righteous Branch is called THE LORD OUR RIGHTEOUSNESS; the New Testament describes righteousness as found in Christ."},
 {ot:"Zechariah 12:10",nt:"John 19:34–37",note:"The pierced one in Zechariah is connected with the crucifixion scene in John. Compare the wording and context."},
 {ot:"Psalm 102:25–27",nt:"Hebrews 1:8–12",note:"Hebrews applies language about the unchanging Creator to the Son. Read the whole argument of Hebrews 1."},
 {ot:"Deuteronomy 6:4",nt:"Mark 12:28–34; 1 Corinthians 8:4–6",note:"The New Testament repeats Israel’s confession of one God while speaking of the Father and Jesus Christ. Study how each passage phrases the confession."},
 {ot:"Exodus 3:14",nt:"John 8:58",note:"God reveals Himself to Moses; Jesus uses the expression ‘I am’ in a dispute about His identity. Read both passages in context."},
 {ot:"Isaiah 45:21–23",nt:"Philippians 2:9–11",note:"Isaiah declares that every knee will bow to the LORD; Paul describes every knee bowing and every tongue confessing Jesus Christ as Lord."}
];
function renderReadingPlan(){
 const list=$("readingPlanList"); if(!list)return;
 const done=JSON.parse(localStorage.getItem("ogof-reading-plan")||"[]");
 list.innerHTML=readingPlan.map((item,i)=>`<div class="plan-day ${done.includes(i)?"done":""}"><input type="checkbox" aria-label="Mark day ${i+1} complete" data-plan-day="${i}" ${done.includes(i)?"checked":""}><span><strong>Day ${i+1}: <button type="button" class="plan-reference" data-plan-ref="${esc(item[0])}">${esc(item[0])}</button></strong>${esc(item[1])}</span></div>`).join("");
 const n=done.length;$("planProgressText").textContent=`${n} of ${readingPlan.length} days completed`;$("planProgressBar").style.width=`${n/readingPlan.length*100}%`;
}
function renderCrossrefTrail(){
 const box=$("onenessCrossrefs"); if(!box)return;
 box.innerHTML=crossrefTrail.map((x,i)=>`<div class="crossref-card"><div class="crossref-pair"><button data-topicref="${esc(x.ot)}">${esc(x.ot)}</button><span>↔</span><button data-topicref="${esc(x.nt)}">${esc(x.nt)}</button></div><p>${esc(x.note)}</p></div>`).join("");
}
$("onenessCrossrefs").addEventListener("click",e=>{const b=e.target.closest("[data-topicref]");if(!b)return;const ref=b.dataset.topicref;const m=ref.match(/^(.*?\s+\d+):(\d+)/);if(m)openRef(`${m[1]}:${m[2]}`);else{document.querySelector('[data-tab="read"]').click();setStatus(`Please open ${ref} using the Book and Chapter selectors.`);}});

document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b===btn));
 ["read","study","search","saved","plan"].forEach(n=>$(n+"Panel").classList.toggle("hidden",n!==btn.dataset.tab));
 if(btn.dataset.tab==="plan")renderReadingPlan();
 if(btn.dataset.tab==="saved")renderBookmarks();
}));
els.book.addEventListener("change",()=>{populateChapters()});
els.load.addEventListener("click",renderChapter);els.chapter.addEventListener("change",()=>{});
els.prev.addEventListener("click",()=>moveChapter(-1));els.next.addEventListener("click",()=>moveChapter(1));
els.topic.addEventListener("change",renderTopic);
els.topicContent.addEventListener("click",e=>{const b=e.target.closest("[data-topicref]");if(b)openRef(b.dataset.topicref)});
els.verses.addEventListener("click",e=>{
 const b=e.target.closest("button[data-action]");if(!b)return;
 if(b.dataset.action==="study")showVerseCommentary(b.dataset.ref);
 if(b.dataset.action==="bookmark")addBookmark(b.dataset.ref,b.dataset.text);
 if(b.dataset.action==="note")showNote(b.dataset.ref,b.dataset.text);
 if(b.dataset.action==="highlight")toggleHighlight(b.dataset.ref);
 if(b.dataset.action==="copy")copyText(`${b.dataset.ref} (KJV) — ${b.dataset.text}`);
});
$("readChapterBtn").addEventListener("click",()=>{if(!bible)return;if(!("speechSynthesis" in window)){setStatus("Read aloud is not supported by this browser.",true);return}window.speechSynthesis.cancel();const text=[...els.verses.querySelectorAll(".verse")].map(row=>`${els.title.textContent}, verse ${row.querySelector(".verse-number").textContent}. ${row.querySelector(".verse-text").textContent}`).join(" ");const utterance=new SpeechSynthesisUtterance(text);utterance.rate=0.9;utterance.onend=()=>setStatus("Read aloud finished");utterance.onerror=()=>setStatus("Read aloud stopped or unavailable",true);window.speechSynthesis.speak(utterance);setStatus("Reading chapter aloud…");});
$("stopReadBtn").addEventListener("click",()=>{if("speechSynthesis" in window)window.speechSynthesis.cancel();setStatus("Read aloud stopped");});
$("printChapterBtn").addEventListener("click",()=>window.print());
$("commentaryDialogBody").addEventListener("click",e=>{const b=e.target.closest("[data-commentary-ref]");if(b){document.getElementById("commentaryDialog").close();openRef(b.dataset.commentaryRef);}});
$("closeCommentaryBtn").addEventListener("click",()=>document.getElementById("commentaryDialog").close());
$("closeCommentaryBtnBottom").addEventListener("click",()=>document.getElementById("commentaryDialog").close());
$("noteForm").addEventListener("submit",e=>{if(e.submitter?.id==="saveNoteBtn"){e.preventDefault();saveNote()}});
els.searchForm.addEventListener("submit",e=>{
 e.preventDefault();if(!bible){els.searchStatus.textContent="Load the Bible online once before searching.";return}
 const q=els.search.value.trim();els.searchStatus.textContent="Searching the full KJV…";
 setTimeout(()=>{
  const found=searchBible(q);els.searchStatus.textContent=found.length?`${found.length}${found.length===250?" or more":""} result(s) shown.`:"No matching verses found.";
  els.searchResults.innerHTML=found.map(x=>`<div class="result"><button data-openref="${esc(x.ref)}"><span class="result-ref">${esc(x.ref)}</span><div class="result-text">${esc(x.text)}</div></button><button class="outline small" data-action="bookmark" data-ref="${esc(x.ref)}" data-text="${esc(x.text)}">Save verse</button></div>`).join("");
 },20);
});
els.searchResults.addEventListener("click",e=>{
 const open=e.target.closest("[data-openref]");if(open){openRef(open.dataset.openref);return}
 const save=e.target.closest("[data-action='bookmark']");if(save)addBookmark(save.dataset.ref,save.dataset.text);
});
els.bookmarks.addEventListener("click",e=>{
 const open=e.target.closest("[data-openref]");if(open){openRef(open.dataset.openref);return}
 const rm=e.target.closest("[data-remove]");if(rm){removeBookmark(rm.dataset.remove);return}
 const edit=e.target.closest("[data-editnote]");if(edit){showNote(edit.dataset.editnote,"");return}
});
$("exportBookmarks").addEventListener("click",()=>{
 const data={bookmarks:getBookmarks(),notes:getNotes(),highlights:getHighlights(),exported:new Date().toISOString()};
 const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob);
 const a=document.createElement("a");a.href=url;a.download="oneness-bible-bookmarks.json";a.click();URL.revokeObjectURL(url);
});
$("importBookmarks").addEventListener("change",async e=>{
 const f=e.target.files[0];if(!f)return;
 try{const data=JSON.parse(await f.text());if(Array.isArray(data.bookmarks))saveBookmarks(data.bookmarks);if(data.notes&&typeof data.notes==="object")localStorage.setItem("ogof-notes",JSON.stringify(data.notes));if(data.highlights&&typeof data.highlights==="object")localStorage.setItem("ogof-highlights",JSON.stringify(data.highlights));renderBookmarks();renderChapter();alert("Bookmarks, notes, and verse marks imported.")}catch{alert("That file could not be imported.")}e.target.value="";
});
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;$("installBtn").classList.remove("hidden")});
$("installBtn").addEventListener("click",async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$("installBtn").classList.add("hidden")});
if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("./sw.js").catch(err=>console.warn("Service worker registration failed",err));
$("readingPlanList").addEventListener("change",e=>{const cb=e.target.closest("[data-plan-day]");if(!cb)return;const done=JSON.parse(localStorage.getItem("ogof-reading-plan")||"[]");const i=Number(cb.dataset.planDay);const next=cb.checked?[...new Set([...done,i])]:done.filter(x=>x!==i);localStorage.setItem("ogof-reading-plan",JSON.stringify(next));renderReadingPlan();});
$("readingPlanList").addEventListener("click",e=>{const b=e.target.closest("[data-plan-ref]");if(!b)return;const ref=b.dataset.planRef;if(ref.startsWith("Review:")){openRef("Deuteronomy 6:4");return}const match=ref.match(/^(.+?\s+\d+:\d+(?:[-–]\d+)?)/);if(match)openRef(match[1]);else{document.querySelector('[data-tab="read"]').click();setStatus("This reading contains multiple references. Open them one at a time using the Book and Chapter selectors.");}});
$("resetPlanBtn").addEventListener("click",()=>{if(confirm("Reset all reading-plan checkmarks on this device?")){localStorage.removeItem("ogof-reading-plan");renderReadingPlan();}});
renderTopic();renderBookmarks();renderReadingPlan();renderCrossrefTrail();renderBookGuide();
$("bookGuideSelect").addEventListener("change",renderBookGuide);
$("bookGuideContent").addEventListener("click",e=>{const b=e.target.closest("[data-guide-ref]");if(b)openRef(b.dataset.guideRef)});
loadBible();

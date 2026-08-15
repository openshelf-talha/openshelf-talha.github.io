(() => {
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const getApps=()=>{try{const x=JSON.parse(localStorage.getItem('openshelf_apps'));return Array.isArray(x)&&x.length?x:APPS}catch{return APPS}};
const saveApps=a=>localStorage.setItem('openshelf_apps',JSON.stringify(a));
function card(a){return `<article class="app-card"><a class="card-main" href="app.html?id=${encodeURIComponent(a.id)}"><div class="app-top"><div class="app-icon" style="background:${esc(a.color||'#334155')}">${esc(a.initial||a.name?.[0]||'A')}</div><div class="card-title"><b>${esc(a.name)}</b><span>${esc(a.tag||a.cat||'App')}</span></div></div><p>${esc(a.desc||'Explore this app on OpenShelf.')}</p><div class="badges"><span>${esc(a.platform||'Multiple platforms')}</span><span>${esc(a.version?'v'+a.version:'Latest')}</span>${a.type?`<span class="${a.type==='community'?'warn':''}">${esc(a.source||a.type)}</span>`:''}</div></a><div class="card-foot"><small>${esc(a.size||'—')}</small><a class="get" href="app.html?id=${encodeURIComponent(a.id)}">View app →</a></div></article>`}
function feature(a){return `<a class="feature-card" href="app.html?id=${encodeURIComponent(a.id)}"><div class="app-icon xl" style="background:${esc(a.color||'#334155')}">${esc(a.initial||a.name?.[0]||'A')}</div><div><div class="feature-label">FEATURED</div><h3>${esc(a.name)}</h3><p>${esc(a.desc||'')}</p><div class="feature-meta"><span>v${esc(a.version||'Latest')}</span><span>${esc(a.platform||'')}</span></div></div><span class="arrow">↗</span></a>`}
function initHome(){
const apps=getApps(); const grid=$('#appGrid'); if(!grid)return;
$('#heroCount').textContent=apps.length+'+'; $('#heroCats').textContent=CATEGORIES.filter(x=>x.id!=='all').length;
const latest=[...apps].sort((a,b)=>(b.updated||'').localeCompare(a.updated||'')).slice(0,4); $('#latestGrid').innerHTML=latest.map(feature).join('');
$('#categoryGrid').innerHTML=CATEGORIES.filter(x=>x.id!=='all').map(c=>`<button class="category-card" data-cat="${c.id}"><span>${c.icon}</span><b>${c.name}</b><small>${c.desc}</small></button>`).join('');
let cat='all', q='';
const render=()=>{let list=apps.filter(a=>(cat==='all'||a.cat===cat)&&(!q||[a.name,a.tag,a.desc,a.cat,a.platform].join(' ').toLowerCase().includes(q))); const sort=$('#sort').value;
if(sort==='az')list.sort((a,b)=>a.name.localeCompare(b.name)); else if(sort==='za')list.sort((a,b)=>b.name.localeCompare(a.name)); else if(sort==='newest')list.sort((a,b)=>(b.updated||'').localeCompare(a.updated||'')); else list.sort((a,b)=>(b.featured?1:0)-(a.featured?1:0));
$('#resultCount').textContent=`${list.length} app${list.length===1?'':'s'} found`; grid.innerHTML=list.length?list.map(card).join(''):`<div class="empty"><b>No apps found</b><span>Try another search or category.</span></div>`};
$('#filterbar').innerHTML=CATEGORIES.map(c=>`<button class="filter ${c.id==='all'?'active':''}" data-cat="${c.id}">${c.name}</button>`).join('');
$$('[data-cat]').forEach(b=>b.addEventListener('click',()=>{cat=b.dataset.cat; $$('.filter').forEach(x=>x.classList.toggle('active',x.dataset.cat===cat)); if($('#categoryGrid').contains(b)){document.querySelector('#apps').scrollIntoView({behavior:'smooth'});$('.filter[data-cat="'+cat+'"]')?.click()}else render()}));
$('#sort').addEventListener('change',render);
$('#heroSearch').addEventListener('submit',e=>{e.preventDefault();q=$('#searchInput').value.trim().toLowerCase();document.querySelector('#apps').scrollIntoView({behavior:'smooth'});render()});
$$('.quick button').forEach(b=>b.addEventListener('click',()=>{$('#searchInput').value=b.dataset.q;$('#heroSearch').dispatchEvent(new Event('submit'))}));
render();
}
function initDetail(){
const box=$('#detail'); if(!box)return; const id=new URLSearchParams(location.search).get('id'); const a=getApps().find(x=>x.id===id);
if(!a){box.innerHTML='<div class="empty"><h2>App not found</h2><span>The requested listing does not exist.</span><a class="btn primary" href="index.html#apps">Back to apps</a></div>';return}
document.title=a.name+' — OpenShelf';
const versions=(a.versions||[]).map((v,i)=>{const item=typeof v==='string'?{version:v,url:i===0?(a.download||a.link||'#'):(a.link||'#'),label:i===0?'Latest release':'Previous release'}:v;return `<div class="version-row"><div><b>${esc(item.version||'Unknown')}</b><span>${esc(item.label|| (i===0?'Latest release':'Previous release'))}</span></div><a class="btn ${i===0?'primary':'ghost'}" href="${esc(item.url||a.link||'#')}" target="_blank" rel="noopener">Download ↗</a></div>`}).join('');
box.innerHTML=`<a class="back" href="index.html#apps">← Back to apps</a><section class="detail-hero"><div class="app-icon xxl" style="background:${esc(a.color||'#334155')}">${esc(a.initial||a.name[0])}</div><div class="detail-title"><div class="badges"><span>${esc(a.cat)}</span><span>${esc(a.source||'Source')}</span>${a.community?'<span class="warn">Community</span>':''}</div><h1>${esc(a.name)}</h1><p>${esc(a.tag||'Application')}</p><div class="detail-actions"><a class="btn primary big" href="${esc(a.download||a.link||'#')}" target="_blank" rel="noopener">Download latest ↗</a><a class="btn ghost big" href="${esc(a.link||'#')}" target="_blank" rel="noopener">Official/source page</a></div></div></section>
<div class="detail-layout"><div><div class="detail-card"><div class="card-heading"><h2>About this app</h2><span>v${esc(a.version||'Latest')}</span></div><p class="prose">${esc(a.desc||'')}</p><div class="facts"><div><span>Platform</span><b>${esc(a.platform||'—')}</b></div><div><span>Size</span><b>${esc(a.size||'—')}</b></div><div><span>Latest version</span><b>${esc(a.version||'—')}</b></div><div><span>Source</span><b>${esc(a.source||'—')}</b></div></div></div>
<div class="detail-card"><div class="card-heading"><h2>Previous versions</h2><span>${(a.versions||[]).length} releases</span></div><div class="versions">${versions||'<div class="empty">No previous versions have been added yet.</div>'}</div></div></div>
<aside><div class="side-card"><h3>Download information</h3><div class="side-row"><span>Release type</span><b>${esc(a.type||'standard')}</b></div><div class="side-row"><span>Updated</span><b>${esc(a.updated||'—')}</b></div><div class="side-row"><span>Source</span><b>${esc(a.source||'—')}</b></div><div class="notice">${a.community?'Community release: verify the source and authorization before installing.':'Source is clearly labeled on this listing.'}</div></div></aside></div>`;
}
function initTheme(){
const b=$('#themeBtn'); const m=$('#menuBtn'); const root=document.documentElement;
let saved='light'; try{saved=localStorage.getItem('openshelf_theme')||'light'}catch(e){}
const applyTheme=mode=>{const dark=mode==='dark'; root.classList.toggle('dark-mode',dark); document.body.classList.toggle('dark',dark); if(b){b.textContent=dark?'☀':'☾';b.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');b.setAttribute('title',dark?'Light mode':'Dark mode')}};
applyTheme(saved);
if(b)b.onclick=()=>{const dark=!root.classList.contains('dark-mode'); const mode=dark?'dark':'light'; applyTheme(mode); try{localStorage.setItem('openshelf_theme',mode)}catch(e){}};
if(m)m.onclick=()=>{const nav=$('.navlinks'); if(nav){nav.classList.toggle('open');m.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false')}};
}
document.addEventListener('DOMContentLoaded',()=>{initTheme();initHome();initDetail()});
window.OpenShelf={getApps,saveApps};
})();
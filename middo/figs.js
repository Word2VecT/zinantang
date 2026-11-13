/* Middo figures, drawn as inline SVG (and one canvas) in the page's own type and colour, so they
   follow the light and dark themes. Every number here comes from the paper; the loss curves and
   t-SNE points (data.js) were recovered from the vector PDFs of the paper's figures. */
(function(){
var NS='http://www.w3.org/2000/svg';
function S(tag,attrs,text){ var e=document.createElementNS(NS,tag);
  if(attrs) for(var k in attrs) e.setAttribute(k,attrs[k]); if(text!=null) e.textContent=text; return e; }
function svg(w,h,cls){ return S('svg',{viewBox:'0 0 '+w+' '+h,class:cls||'',role:'img'}); }
/* Text with subscripts: "θ_t", "D_{t+1}". */
function txt(g,x,y,s,cls,anchor){
  var t=S('text',{x:x,y:y,class:cls||''}); if(anchor) t.setAttribute('text-anchor',anchor);
  var parts=String(s).split(/_(\{[^}]*\}|.)/), sub=0;
  if(parts.length===1) t.textContent=s;
  else parts.forEach(function(p,i){ if(!p) return;
    if(i%2){ t.appendChild(S('tspan',{dy:'0.35em','font-size':'0.72em'},p.charAt(0)==='{'?p.slice(1,-1):p)); sub=1; }
    else { t.appendChild(S('tspan',sub?{dy:'-0.252em'}:{},p)); sub=0; } });
  g.appendChild(t); return t;
}
function rect(g,x,y,w,h,cls,rx){ var r=S('rect',{x:x,y:y,width:w,height:h,rx:rx==null?4:rx,class:cls||''}); g.appendChild(r); return r; }
/* An edge through a list of points, with an arrowhead at the end. */
function edge(g,pts,accent){
  var e=S('g',{class:'edge'+(accent?' w':'')}),d='M'+pts[0][0]+','+pts[0][1];
  for(var i=1;i<pts.length;i++) d+=' L'+pts[i][0]+','+pts[i][1];
  var a=pts[pts.length-2],b=pts[pts.length-1],dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L,s=6;
  var end=[b[0]-ux*1,b[1]-uy*1];
  e.appendChild(S('path',{d:d.replace(/[^ ]+$/,'L'+(b[0]-ux*s)+','+(b[1]-uy*s))}));
  e.appendChild(S('polygon',{points:[end,[end[0]-ux*s-uy*s*.6,end[1]-uy*s+ux*s*.6],[end[0]-ux*s+uy*s*.6,end[1]-uy*s-ux*s*.6]].map(function(p){return p.join(',');}).join(' ')}));
  g.appendChild(e); return e;
}
function card(g,c){ rect(g,c.x,c.y,c.w,c.h,'card'); var px=c.px||14;
  if(c.t) txt(g,c.x+px,c.y+(c.ty||24),c.t,'t'); if(c.s) txt(g,c.x+px,c.y+(c.sy||44),c.s,'e');
  if(c.tag) txt(g,c.x+c.w-12,c.y+(c.ty||24),c.tag,'m flag','end'); return c; }
function fmt(v,d){ return v.toFixed(d==null?2:d); }

/* ---------- Tooltip, shared by every chart ---------- */
var tipEl=null;
function tip(target,html){
  if(!tipEl){ tipEl=document.createElement('div'); tipEl.className='tip'; tipEl.setAttribute('aria-hidden','true'); document.body.appendChild(tipEl); }
  function place(e){ var w=tipEl.offsetWidth,h=tipEl.offsetHeight,x=e.clientX+14,y=e.clientY-h-10;
    if(x+w>innerWidth-8) x=e.clientX-w-14; if(y<8) y=e.clientY+18; tipEl.style.left=x+'px'; tipEl.style.top=y+'px'; }
  target.addEventListener('mouseenter',function(e){ tipEl.innerHTML=typeof html==='function'?html(e):html; tipEl.classList.add('on'); place(e); });
  target.addEventListener('mousemove',function(e){ if(typeof html==='function') tipEl.innerHTML=html(e); place(e); });
  target.addEventListener('mouseleave',function(){ tipEl.classList.remove('on'); });
}
function hit(g,x,y,html){ var c=S('circle',{cx:x,cy:y,r:11,class:'hit'}); g.appendChild(c); tip(c,html); return c; }

/* ---------- Figure 1: the closed loop ---------- */
var ROWS=[
 {h:'o',k:'COMPLEXITY',tag:'replace',c:[['Loss patterns','high loss before & after SFT'],['Hard samples','still too complex for θ_t'],['Simplify','stepwise rewrite, same intent']]},
 {h:'b',k:'DIVERSITY',tag:'add',c:[['Embedding clusters','low cosine to k nearest'],['Sparse samples','thin regions of the space'],['Extend','new sample from neighbors']]},
 {h:'g',k:'QUALITY',tag:'replace',c:[['Self-alignment scores','θ_t grades its own data'],['Low-quality samples','score below threshold τ'],['Improve','clearer, complete rewrite']]}];
function pipeWide(){
  var W=1000,H=452,s=svg(W,H,'wide'),A=S('g'); s.appendChild(A);
  rect(A,0,36,210,360,'panel',6); txt(A,14,60,'MODEL','k');
  card(A,{x:14,y:70,w:182,h:64,t:'Model θ_t',s:'fine-tuned on D_t'});
  card(A,{x:14,y:194,w:182,h:64,t:'SFT, one epoch',s:'from the base model'});
  card(A,{x:14,y:318,w:182,h:64,t:'Dataset D_t',s:'D_0: Alpaca or WizardLM'});
  edge(A,[[105,318],[105,258]]); edge(A,[[105,194],[105,134]]);
  txt(s,256,24,'SIGNAL FROM θ_t','k'); txt(s,506,24,'SELECTED','k'); txt(s,756,24,'REFINED BY AN LLM','k');
  ROWS.forEach(function(r,i){
    var y=36+i*124,cy=y+34,mid=cy+32,g=S('g',{class:'hue h-'+r.h}); s.appendChild(g);
    rect(g,240,y,760,112,'panel',6); txt(g,256,y+24,r.k,'k');
    r.c.forEach(function(c,j){ card(g,{x:256+j*250,y:cy,w:228,h:64,t:c[0],s:c[1],tag:j===2?r.tag:null}); });
    edge(g,[[484,mid],[506,mid]]); edge(g,[[734,mid],[756,mid]]);
    edge(s,i?[[196,102],[225,102],[225,mid],[256,mid]]:[[196,102],[256,102]]);
    s.appendChild(S('path',{d:'M984,'+mid+' L992,'+mid,class:'link w'}));
  });
  edge(s,[[992,102],[992,430],[105,430],[105,382]],1);
  txt(s,548,422,'D_{t+1}: hard and low-quality samples replaced, extensions added · next iteration','k w','middle');
  return s;
}
function pipeTall(){
  var W=340,H=1010,s=svg(W,H,'tall'),A=S('g'); s.appendChild(A);
  rect(A,20,0,300,266,'panel',6); txt(A,34,22,'MODEL','k');
  card(A,{x:34,y:34,w:272,h:56,t:'Dataset D_t',s:'D_0: Alpaca or WizardLM',ty:22,sy:40});
  card(A,{x:34,y:116,w:272,h:56,t:'SFT, one epoch',s:'from the base model',ty:22,sy:40});
  card(A,{x:34,y:198,w:272,h:56,t:'Model θ_t',s:'fine-tuned on D_t',ty:22,sy:40});
  edge(A,[[170,90],[170,116]]); edge(A,[[170,172],[170,198]]);
  var mids=[];
  ROWS.forEach(function(r,i){
    var y=292+i*240,g=S('g',{class:'hue h-'+r.h}); s.appendChild(g);
    rect(g,20,y,300,218,'panel',6); txt(g,34,y+22,r.k,'k');
    r.c.forEach(function(c,j){ var cy=y+34+j*62; card(g,{x:34,y:cy,w:272,h:46,t:c[0],s:c[1],ty:19,sy:36,tag:j===2?r.tag:null});
      if(j) edge(g,[[170,cy-16],[170,cy]]); });
    edge(s,[[34,226],[8,226],[8,y+18],[20,y+18]]); mids.push(y+109);
    s.appendChild(S('path',{d:'M320,'+mids[i]+' L332,'+mids[i],class:'link w'}));
  });
  edge(s,[[332,mids[2]],[332,62],[306,62]],1);
  txt(s,326,52,'D_{t+1}','k w','end');
  return s;
}
function pipeline(host){ host.appendChild(pipeWide()); host.appendChild(pipeTall()); }

/* ---------- Figure 3: seed data against each Middo iteration ---------- */
var HEAD=[
 {m:'LLaMA-3.1-8B',rows:[['Alpaca',32.48,[37.45,38.42,39.63]],['Alpaca-4o-mini',40.76,[41.77,42.96,42.32]],['WizardLM',38.96,[42.80,42.29,42.01]]]},
 {m:'Mistral-7B-v0.3',rows:[['Alpaca',24.97,[29.25,29.64,29.72]],['Alpaca-4o-mini',34.56,[34.09,35.08,32.86]],['WizardLM',34.92,[37.38,38.15,38.56]]]}];
function headline(host){
  var W=860,L=150,R=88,T=30,gh=30,rh=30,lo=20,hi=45,n=0; HEAD.forEach(function(g){ n+=g.rows.length; });
  var H=T+HEAD.length*gh+n*rh+44,X=function(v){ return L+(v-lo)/(hi-lo)*(W-L-R-14); },s=svg(W,H,'dumb');
  var bot=T+HEAD.length*gh+n*rh;
  for(var t=lo;t<=hi;t+=5){ s.appendChild(S('line',{x1:X(t),x2:X(t),y1:T-6,y2:bot,class:'grid'})); txt(s,X(t),bot+16,t,'m tick','middle'); }
  txt(s,X((lo+hi)/2),bot+38,'Average over eight benchmarks','e','middle');
  txt(s,W,T-12,'GAIN','k','end');
  var y=T;
  HEAD.forEach(function(g){
    txt(s,0,y+18,g.m.toUpperCase(),'k'); y+=gh;
    g.rows.forEach(function(r){
      var cy=y+rh/2,all=[r[1]].concat(r[2]),mn=Math.min.apply(null,all),mx=Math.max.apply(null,all),bi=r[2].indexOf(Math.max.apply(null,r[2]));
      txt(s,0,cy+4,r[0],'lab');
      s.appendChild(S('line',{x1:X(mn),x2:X(mx),y1:cy,y2:cy,class:'stem'}));
      s.appendChild(S('circle',{cx:X(r[1]),cy:cy,r:4.5,class:'dot'}));
      r[2].forEach(function(v,i){ if(i!==bi) s.appendChild(S('circle',{cx:X(v),cy:cy,r:3.5,class:'odot'})); });
      var best=r[2][bi]; s.appendChild(S('circle',{cx:X(best),cy:cy,r:5.5,class:'dot w'}));
      txt(s,X(mn)-10,cy+4,fmt(r[1]),'m val','end');
      txt(s,X(best)+10,cy+4,fmt(best),'m val w');
      txt(s,W,cy+4,'+'+fmt(best-r[1]),'m val w','end');
      var who=g.m+' · '+r[0];
      hit(s,X(r[1]),cy,'<b>'+who+'</b><br>seed data · '+fmt(r[1]));
      r[2].forEach(function(v,i){ hit(s,X(v),cy,'<b>'+who+'</b><br>Middo iter '+(i+1)+' · '+fmt(v)+' ('+(v>=r[1]?'+':'−')+fmt(Math.abs(v-r[1]))+')'); });
      y+=rh;
    });
  });
  host.appendChild(s);
}

/* ---------- Figure 4: how much data to refine ---------- */
var SCALE=[
 {name:'LLaMA-3.1-8B',c:'var(--c-g)',p:[[0.135,34.58],[0.478,35.52],[1.269,36.82],[4.264,37.45],[7.738,39.62],[15.835,39.03]]},
 {name:'Mistral-7B-v0.3',c:'var(--c-b)',p:[[0.186,23.61],[0.403,29.37],[0.817,24.94],[2.909,29.25],[6.896,30.90],[17.628,29.98]]}];
function pct(k){ return (k*1000/52002*100).toFixed(1)+'%'; }
function scale(host){
  var W=860,H=330,L=56,R=136,T=28,B=60,x0=0,x1=18,y0=22,y1=42;
  var X=function(v){ return L+(v-x0)/(x1-x0)*(W-L-R); },Y=function(v){ return T+(y1-v)/(y1-y0)*(H-T-B); },s=svg(W,H,'scale');
  s.appendChild(S('rect',{x:X(5.2),y:T-8,width:X(10.4)-X(5.2),height:H-B-T+8,class:'band'}));
  txt(s,X(7.8),H-B-10,'10–20% OF THE DATA','k','middle');
  for(var t=24;t<=40;t+=4){ s.appendChild(S('line',{x1:L,x2:W-R,y1:Y(t),y2:Y(t),class:'grid'})); txt(s,L-10,Y(t)+3.5,t,'m tick','end'); }
  [0,5,10,15].forEach(function(k){ txt(s,X(k),H-B+18,k?k+'K':'0','m tick','middle'); if(k) txt(s,X(k),H-B+32,'('+pct(k)+')','m tick','middle'); });
  txt(s,(L+W-R)/2,H-6,'Samples selected for refinement (share of Alpaca)','e','middle');
  var yl=txt(s,14,(T+H-B)/2,'Average score','e','middle'); yl.setAttribute('transform','rotate(-90 14 '+((T+H-B)/2)+')');
  SCALE.forEach(function(sr){
    var g=S('g',{style:'--c:'+sr.c}); s.appendChild(g);
    g.appendChild(S('path',{d:'M'+sr.p.map(function(p){ return X(p[0])+','+Y(p[1]); }).join(' L'),class:'ln'}));
    var pk=sr.p.reduce(function(a,b){ return b[1]>a[1]?b:a; });
    sr.p.forEach(function(p){ g.appendChild(S('circle',{cx:X(p[0]),cy:Y(p[1]),r:4,class:'pt2'}));
      hit(g,X(p[0]),Y(p[1]),'<b>'+sr.name+'</b><br>≈'+p[0].toFixed(1)+'K refined ('+pct(p[0])+') · '+fmt(p[1])); });
    txt(g,X(pk[0]),Y(pk[1])-12,'peak '+fmt(pk[1]),'m val','middle');
    var last=sr.p[sr.p.length-1]; txt(g,X(last[0])+10,Y(last[1])+4,sr.name,'t lab');
  });
  host.appendChild(s);
}

/* ---------- Figure 5: loss distribution before and after ---------- */
function interp(arr,x){ for(var i=1;i<arr.length;i++) if(arr[i][0]>=x){ var a=arr[i-1],b=arr[i],f=(x-a[0])/((b[0]-a[0])||1); return a[1]+(b[1]-a[1])*f; } return 0; }
function loss(host){
  var D=window.MiddoData.kde,W=860,H=320,L=50,PR=620,T=18,B=48,y1=0.85;
  var X=function(v){ return L+v/4*(PR-L); },Y=function(v){ return T+(y1-v)/y1*(H-T-B); },s=svg(W,H,'loss');
  for(var t=0;t<=0.81;t+=0.2){ s.appendChild(S('line',{x1:L,x2:PR,y1:Y(t),y2:Y(t),class:t?'grid':'zero'})); txt(s,L-10,Y(t)+3.5,t.toFixed(1),'m tick','end'); }
  [0,1,2,3,4].forEach(function(k){ txt(s,X(k),H-B+18,k,'m tick','middle'); });
  txt(s,(L+PR)/2,H-8,'Per-sample loss','e','middle');
  var yl=txt(s,12,(T+H-B)/2,'Density','e','middle'); yl.setAttribute('transform','rotate(-90 12 '+((T+H-B)/2)+')');
  function area(pts,c,fill){ var g=S('g',{style:'--c:'+c}); s.appendChild(g);
    var d='M'+pts.map(function(p){ return X(p[0]).toFixed(1)+','+Y(p[1]).toFixed(1); }).join(' L');
    if(fill) g.appendChild(S('path',{d:d+' L'+X(pts[pts.length-1][0])+','+Y(0)+' L'+X(0)+','+Y(0)+' Z',class:'area'}));
    g.appendChild(S('path',{d:d,class:fill?'ln thin':'ln'})); }
  area(D.orig,'var(--c-s)',1); area(D.middo,'var(--c-o)',0);
  txt(s,X(1.02),Y(0.79),'After Middo','t lab');
  var ox=2.15; txt(s,X(ox),Y(interp(D.orig,ox))-12,'Original data','t lab');
  txt(s,PR,Y(0)-10,'original tail runs to 12.99 →','e','end');
  /* crosshair */
  var cross=S('line',{y1:T,y2:H-B,class:'cross'}); cross.style.display='none'; s.appendChild(cross);
  var pad=S('rect',{x:L,y:T,width:PR-L,height:H-B-T,class:'hit'}); s.appendChild(pad);
  function at(e){ var r=s.getBoundingClientRect(),vx=(e.clientX-r.left)/r.width*W,lv=Math.max(0,Math.min(4,(vx-L)/(PR-L)*4));
    cross.setAttribute('x1',X(lv)); cross.setAttribute('x2',X(lv)); cross.style.display='';
    return 'loss '+lv.toFixed(2)+'<br>original · '+interp(D.orig,lv).toFixed(3)+'<br>after Middo · '+interp(D.middo,lv).toFixed(3); }
  tip(pad,at); pad.addEventListener('mouseleave',function(){ cross.style.display='none'; });
  /* inset: maximum loss */
  var IX=690,IY0=T+28,IY1=H-B,M=function(v){ return IY1-(v/14)*(IY1-IY0); };
  txt(s,IX,T+4,'MAXIMUM LOSS','k');
  s.appendChild(S('line',{x1:IX,x2:W-10,y1:IY1,y2:IY1,class:'zero'}));
  [['Original',12.99,'var(--c-s)',720],['Middo',3.76,'var(--c-o)',810]].forEach(function(r){
    var g=S('g',{style:'--c:'+r[2]}); s.appendChild(g);
    g.appendChild(S('line',{x1:r[3],x2:r[3],y1:IY1,y2:M(r[1]),class:'stem c'}));
    g.appendChild(S('circle',{cx:r[3],cy:M(r[1]),r:5,class:'pt2'}));
    txt(g,r[3],M(r[1])-12,fmt(r[1]),'m val'+(r[0]==='Middo'?' w':''),'middle');
    txt(g,r[3],IY1+18,r[0],'lab','middle'); });
  txt(s,765,M(8.4),'−71%','m val w','middle');
  host.appendChild(s);
}

/* ---------- Figure 6: t-SNE of original and added samples ---------- */
var tsneState={show:'all'};
function decode(){ if(tsneState.xy) return tsneState.xy;
  var bin=atob(window.MiddoData.tsne),n=bin.length/2,a=new Uint16Array(n);
  for(var i=0;i<n;i++) a[i]=bin.charCodeAt(2*i)|(bin.charCodeAt(2*i+1)<<8);
  return tsneState.xy=a; }
function drawTsne(){
  var cv=tsneState.cv; if(!cv) return; var xy=decode(),no=window.MiddoData.n[0],size=cv.clientWidth,dpr=window.devicePixelRatio||1;
  if(!size) return; cv.width=Math.round(size*dpr); cv.height=Math.round(size*dpr);
  var ctx=cv.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,size,size);
  var cs=getComputedStyle(document.documentElement),pad=8,k=(size-2*pad)/4095;
  function layer(from,to,col,alpha,r){ ctx.fillStyle=col; ctx.globalAlpha=alpha; ctx.beginPath();
    for(var i=from;i<to;i++){ var x=pad+xy[2*i]*k,y=pad+xy[2*i+1]*k; ctx.moveTo(x+r,y); ctx.arc(x,y,r,0,6.2832); } ctx.fill(); }
  var dark=cs.getPropertyValue('--fig-blend').trim()==='normal';
  if(tsneState.show!=='added') layer(0,no,cs.getPropertyValue('--c-s').trim(),dark?.32:.3,size<420?.9:1.1);
  if(tsneState.show!=='orig') layer(no,xy.length/2,cs.getPropertyValue('--c-b').trim(),.85,size<420?1:1.25);
  ctx.globalAlpha=1;
}
function tsne(host){ var cv=document.createElement('canvas'); cv.setAttribute('role','img');
  cv.setAttribute('aria-label','t-SNE projection of Alpaca: 11,198 original samples in grey and 5,599 samples added by Middo in blue; the added samples sit at cluster edges and in sparse regions.');
  host.appendChild(cv); tsneState.cv=cv; drawTsne();
  var t; addEventListener('resize',function(){ clearTimeout(t); t=setTimeout(drawTsne,120); });
  document.addEventListener('middo-theme',function(){ requestAnimationFrame(drawTsne); }); }
function tsneShow(v){ tsneState.show=v; drawTsne(); }

/* ---------- Figure 7: self-alignment scores across iterations ---------- */
var SCORE=[{name:'Alpaca',c:'var(--c-b)',v:[7.018,8.036,8.058]},{name:'Alpaca-4o-mini',c:'var(--c-g)',v:[8.008,8.013,7.982]},{name:'WizardLM',c:'var(--c-o)',v:[7.477,8.375,8.602]}];
function score(host){
  var W=860,H=290,L=70,R=200,T=20,B=46,y0=6.9,y1=8.75;
  var X=function(i){ return L+i/2*(W-L-R); },Y=function(v){ return T+(y1-v)/(y1-y0)*(H-T-B); },s=svg(W,H,'score');
  for(var t=7;t<=8.61;t+=0.4){ s.appendChild(S('line',{x1:L-30,x2:W-R+20,y1:Y(t),y2:Y(t),class:'grid'})); txt(s,L-40,Y(t)+3.5,t.toFixed(1),'m tick','end'); }
  [0,1,2].forEach(function(i){ txt(s,X(i),H-B+18,'iter '+(i+1),'m tick','middle'); });
  txt(s,(L+W-R)/2,H-6,'Iteration','e','middle');
  function spread(items){ items.sort(function(a,b){ return a.y-b.y; }); for(var i=1;i<items.length;i++) if(items[i].y-items[i-1].y<16) items[i].y=items[i-1].y+16; return items; }
  var ends=[];
  SCORE.forEach(function(sr){
    var g=S('g',{style:'--c:'+sr.c}); s.appendChild(g);
    g.appendChild(S('path',{d:'M'+sr.v.map(function(v,i){ return X(i)+','+Y(v); }).join(' L'),class:'ln'}));
    sr.v.forEach(function(v,i){ g.appendChild(S('circle',{cx:X(i),cy:Y(v),r:4,class:'pt2'})); hit(g,X(i),Y(v),'<b>'+sr.name+'</b><br>iter '+(i+1)+' · '+v.toFixed(3)); });
    ends.push({g:g,y:Y(sr.v[2]),sr:sr});
  });
  spread(ends).forEach(function(e){ var v=e.sr.v,d=v[2]-v[0]; txt(e.g,X(2)+12,e.y+4,e.sr.name,'t lab');
    txt(e.g,W,e.y+4,v[2].toFixed(2)+' ('+(d>=0?'+':'−')+Math.abs(d).toFixed(2)+')','m val','end'); });
  host.appendChild(s);
}

function key(host,items){ items.forEach(function(it){ var li=document.createElement('li');
  li.innerHTML='<i class="'+(it.cls||'')+'" style="'+(it.c?'background:'+it.c:'')+'"></i>'+it.t; host.appendChild(li); }); }

window.MDFigs={pipeline:pipeline,headline:headline,scale:scale,loss:loss,tsne:tsne,tsneShow:tsneShow,score:score,key:key};
})();

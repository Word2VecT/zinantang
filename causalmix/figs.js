/* CausalMix figures, drawn as inline SVG in the page's own type and colour, so they follow the
   light and dark themes. Every number here comes from the paper. */
(function(){
var NS='http://www.w3.org/2000/svg';
function S(tag,attrs,text){ var e=document.createElementNS(NS,tag);
  if(attrs) for(var k in attrs) e.setAttribute(k,attrs[k]); if(text!=null) e.textContent=text; return e; }
function svg(w,h,cls){ return S('svg',{viewBox:'0 0 '+w+' '+h,class:cls||'',role:'img'}); }
function txt(g,x,y,s,cls,anchor){ var t=S('text',{x:x,y:y,class:cls||''},s); if(anchor) t.setAttribute('text-anchor',anchor); g.appendChild(t); return t; }
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
var DOM=['Coding','IF','Knowledge','Math','Safety'], DOMS=['Code','IF','Know.','Math','Safety'];
var DC=['var(--c-b)','var(--c-o)','var(--c-f)','var(--c-g)','var(--c-s)'];

/* ---------- Figure 1: the pipeline, in three hued regions ---------- */
var ROOT=[1.381,12.405,-1.491,1.964,2.413];
function card(g,c){ rect(g,c.x,c.y,c.w,c.h,'card'); var px=c.w<200?12:14;
  if(c.t) txt(g,c.x+px,c.y+22,c.t,'t'); if(c.s) txt(g,c.x+px,c.y+40,c.s,c.sm?'m':'');
  if(c.s2) txt(g,c.x+px,c.y+57,c.s2,'m'); return c; }
function bot(c){return [c.x+c.w/2,c.y+c.h];} function top(c){return [c.x+c.w/2,c.y];}
function down(g,a,b){ var p=bot(a),q=top(b);
  if(Math.abs(p[0]-q[0])<1) return edge(g,[p,q]); var m=(p[1]+q[1])/2; return edge(g,[p,[p[0],m],[q[0],m],q]); }
function region(root,ox,oy,n){
  var g=S('g',{transform:'translate('+ox+','+oy+')',class:'hue h-'+['b','o','g'][n]}); root.appendChild(g);
  rect(g,0,0,300,438,'panel',6);
  txt(g,16,30,['01 · PROXY RUNS','02 · ORTHOGONAL LEARNING','03 · MIXTURE POLICY'][n],'k');
  var C={};
  if(n===0){
    C.a=card(g,{x:16,y:48,w:268,h:84,t:'Five-domain data pool',s:'tulu-3-sft-mixture'});
    DOMS.forEach(function(d,i){ var x=28+i*51.5; g.appendChild(S('rect',{x:x,y:105,width:9,height:9,rx:2,style:'fill:'+DC[i]})); txt(g,x+12,113.5,d,'v'); });
    C.b=card(g,{x:16,y:156,w:268,h:56,t:'512 proxy runs',s:'Qwen2.5-0.5B · 100K examples each'});
    C.c=card(g,{x:16,y:236,w:268,h:178,t:'Historical meta-dataset'});
    [['X','Data state','HES · Norm. loss · Writing style'],['T','Domain mixture','drawn independently of the pool'],['Y','Downstream score','Dev-set average after SFT']]
      .forEach(function(r,i){ var y=236+56+i*44; txt(g,32,y+8,r[0],'sym sym-'+i);
        txt(g,62,y-4,r[1],'t'); txt(g,62,y+14,r[2],'e'); });
    down(g,C.a,C.b); down(g,C.b,C.c);
  } else if(n===1){
    C.a=card(g,{x:16,y:48,w:268,h:64,t:'Cross-fitted LightGBM',s:'m(X) = E[Y | X],  e(X) = E[Z | X]',sm:1});
    C.b=card(g,{x:16,y:136,w:128,h:64,t:'Outcome',s:'Ỹ = Y − m(X)',sm:1});
    C.b2=card(g,{x:156,y:136,w:128,h:64,t:'Treatment',s:'Z̃ = Z − e(X)',sm:1});
    C.c=card(g,{x:16,y:224,w:268,h:56,t:'Causal forest on residuals',s:'min Σ (Ỹ − θ(X)ᵀ Z̃)²',sm:1});
    C.d=card(g,{x:16,y:304,w:268,h:118,t:'Marginal return θ̂(X)'});
    txt(g,270,326,'root','e','end');
    var z=304+78; g.appendChild(S('line',{x1:28,x2:272,y1:z,y2:z,class:'zero'}));
    ROOT.forEach(function(v,i){ var x=40+i*48,h=Math.abs(v)*2.5;
      g.appendChild(S('rect',{x:x,y:v>=0?z-h:z,width:24,height:Math.max(h,1),rx:1.5,style:'fill:'+DC[i]}));
      txt(g,x+12,v>=0?z-h-4:z+h+11,(v>0?'+':'−')+Math.abs(v).toFixed(1),'m v','middle');
      txt(g,x+12,304+112,DOMS[i],'v','middle'); });
    down(g,C.a,C.b); down(g,C.a,C.b2); down(g,C.b,C.c); down(g,C.b2,C.c); down(g,C.c,C.d);
  } else {
    C.a=card(g,{x:16,y:48,w:268,h:64,t:'Target data state X_tar',s:'scored on the new pool, no new runs'});
    C.b=card(g,{x:16,y:136,w:128,h:72,t:'CausalMix-A',s:'analytical',s2:'[θ̂]₊ / Σ[θ̂]₊'});
    C.b2=card(g,{x:156,y:136,w:128,h:72,t:'CausalMix-S',s:'search',s2:'top 100 of 100K'});
    C.c=card(g,{x:16,y:232,w:268,h:56,t:'Mixture T*',s:'fixed for the whole training run'});
    C.d=card(g,{x:16,y:312,w:128,h:102,t:'Scale up',s:'Qwen2.5-7B',s2:'800K SFT'});
    C.d2=card(g,{x:156,y:312,w:128,h:102,t:'Transfer',s:'Qwen3-4B',s2:'unseen LongCoT'});
    down(g,C.a,C.b); down(g,C.a,C.b2); down(g,C.b,C.c); down(g,C.b2,C.c); down(g,C.c,C.d); down(g,C.c,C.d2);
  }
  return C;
}
function pipeline(host){
  var wide=svg(1000,438,'wide'); var r=[0,1,2].map(function(i){ return region(wide,i*350,0,i); });
  edge(wide,[[284,325],[317,325],[317,80],[366,80]]);
  edge(wide,[[634,359],[667,359],[667,80],[716,80]],1);
  txt(wide,675,232,'reuse','k w');
  var tall=svg(300,1370,'tall'); [0,1,2].forEach(function(i){ region(tall,0,i*470,i); });
  edge(tall,[[150,414],[150,518]]);
  edge(tall,[[150,884],[150,988]],1); txt(tall,160,940,'reuse θ̂','k w');
  host.appendChild(wide); host.appendChild(tall);
}

/* ---------- Figure 2: Avg_Dev in four settings, one panel each ---------- */
var RES={
 '0.5B · 100K':{Equal:27.03,Grid:27.98,RegMix:27.28,DoReMi:29.74,ODM:27.70,DMO:29.17,'CausalMix-A':29.91,'CausalMix-S':27.85},
 '0.5B · 400K':{Equal:30.51,Grid:26.13,RegMix:26.82,DoReMi:30.29,ODM:26.91,DMO:32.63,'CausalMix-A':33.41,'CausalMix-S':30.71},
 '0.5B · 800K':{Equal:31.78,Grid:31.17,RegMix:26.40,DoReMi:31.38,ODM:27.37,DMO:32.04,'CausalMix-A':33.94,'CausalMix-S':32.81},
 '7B · 800K':{Equal:60.02,Grid:59.46,RegMix:60.14,DoReMi:59.47,ODM:58.00,DMO:60.35,'CausalMix-A':61.84,'CausalMix-S':62.28}};
function results(host){
  Object.keys(RES).forEach(function(k){
    var d=RES[k],m=Object.keys(d).sort(function(a,b){return d[b]-d[a];}),W=290,H=210,L=96,R=44,T=32,rh=20;
    var lo=Math.floor(Math.min.apply(null,m.map(function(x){return d[x];}))-.5),hi=Math.ceil(Math.max.apply(null,m.map(function(x){return d[x];}))+.2);
    var X=function(v){return L+(v-lo)/(hi-lo)*(W-L-R);};
    var s=svg(W,H,'panelfig'); txt(s,0,14,k.toUpperCase(),'k');
    var step=(hi-lo)>5?2:1; for(var t=lo;t<=hi;t+=step){ s.appendChild(S('line',{x1:X(t),x2:X(t),y1:T-8,y2:T+m.length*rh-6,class:'grid'})); txt(s,X(t),T+m.length*rh+10,t,'m tick','middle'); }
    m.forEach(function(name,i){ var y=T+i*rh+6,ours=name.indexOf('CausalMix')===0,v=d[name];
      txt(s,0,y+4,name,ours?'t lab':'lab');
      s.appendChild(S('line',{x1:X(lo),x2:X(v),y1:y,y2:y,class:ours?'stem w':'stem'}));
      s.appendChild(S('circle',{cx:X(v),cy:y,r:ours?4.5:3.5,class:ours?'dot w':'dot'}));
      txt(s,X(v)+8,y+4,v.toFixed(2),'m '+(ours?'val w':'val')); });
    var cell=document.createElement('div'); cell.className='panel-cell'; cell.appendChild(s); host.appendChild(cell);
  });
}

/* ---------- Figure 3: Spearman correlation by covariate set ---------- */
var SP={1:[.7307,.7261,.7177,.7170,.7098,.7087,.7085,.7082,.7082,.7047,.7033,.7016,.7012,.6980,.6970,.6962,.6943,.6913,.6908,.6905,.6897,.6876,.6834,.6805,.6729,.6681,.6607,.6571,.6518,.6364],
 2:[.7436,.7410,.7398,.7369,.7357,.7349,.7348,.7323,.7313,.7294,.7269,.7261,.7253,.7250,.7214,.7207,.7194,.7191,.7185,.7185,.7157,.7153,.7150,.7143,.7109,.7106,.7098,.7086,.7065,.7056,.7044,.7000,.6972,.6935,.6880],
 3:[.7557,.7556,.7492,.7460,.7342,.7289,.7272,.7252,.7231,.7218,.7098,.6959,.6938],
 4:[.7449,.7447,.7437,.7432,.7422,.7416,.7379,.7376,.7368,.7344,.7337,.7321],7:[.7337]};
var SPB={1:'HES',2:'HES + Norm. loss',3:'HES + Norm. loss + Writing style',4:'… + Skywork-Llama',7:'seven metrics'};
function spearman(host){
  var W=860,H=360,L=58,R=20,T=34,B=48,ks=['1','2','3','4','7'],lo=.63,hi=.765;
  var X=function(i){return L+(i+.5)*(W-L-R)/ks.length;},Y=function(v){return T+(hi-v)/(hi-lo)*(H-T-B);};
  var s=svg(W,H,'spear'); var seed=7; function rnd(){ seed=(seed*16807)%2147483647; return seed/2147483647; }
  for(var t=.64;t<=.761;t+=.02){ s.appendChild(S('line',{x1:L,x2:W-R,y1:Y(t),y2:Y(t),class:'grid'})); txt(s,L-10,Y(t)+3.5,t.toFixed(2),'m tick','end'); }
  ks.forEach(function(k,i){ txt(s,X(i),H-B+20,k,'m tick','middle');
    SP[k].forEach(function(v){ s.appendChild(S('circle',{cx:X(i)+(rnd()-.5)*64,cy:Y(v),r:3.2,class:'pt'})); }); });
  txt(s,(L+W-R)/2,H-6,'Number of covariates in X','e','middle');
  var yl=txt(s,14,(T+H-B)/2,'Spearman ρ on 64 held-out runs','e','middle'); yl.setAttribute('transform','rotate(-90 14 '+((T+H-B)/2)+')');
  var best=ks.map(function(k,i){ return [X(i),Y(Math.max.apply(null,SP[k]))]; });
  var fr=S('g',{class:'edge w'}); fr.appendChild(S('path',{d:'M'+best.map(function(p){return p.join(',');}).join(' L'),style:'stroke-dasharray:4 3'})); s.appendChild(fr);
  ks.forEach(function(k,i){ var p=best[i],hl=k==='3',v=Math.max.apply(null,SP[k]);
    if(hl) s.appendChild(S('circle',{cx:p[0],cy:p[1],r:10,class:'ring'}));
    s.appendChild(S('circle',{cx:p[0],cy:p[1],r:hl?5.5:4,class:'dot w'}));
    if(hl){ txt(s,p[0],p[1]-26,SPB[k],'t','middle'); txt(s,p[0],p[1]-12,'ρ = '+v.toFixed(4),'m w','middle'); }
    else txt(s,p[0],p[1]-12,SPB[k]+' · '+v.toFixed(3),'e','middle'); });
  host.appendChild(s);
}

/* ---------- Figure 4: the CATE tree, drawn and explorable ---------- */
function N(id,c,n,f,t,l,r){ return {id:id,c:c,n:n,f:f,t:t,l:l,r:r}; }
var TREE=N(0,ROOT,512,'Normalized_Loss',0.7025,
  N(1,[-0.124,10.433,0.397,0.108,0.328],206,'HES',0.0110,
    N(2,[-2.016,12.691,-4.639,-0.870,-4.418],56,'Writing_Style',0.3723,
      N(3,[-2.282,12.702,-5.344,-1.464,-5.197],40),N(4,[-1.352,12.665,-2.877,0.616,-2.471],16)),
    N(5,[0.582,9.590,2.278,0.474,2.100],150,'HES',0.0212,
      N(6,[1.148,12.102,2.802,1.331,3.455],103),N(7,[-0.658,4.085,1.129,-1.403,-0.868],47))),
  N(8,[2.395,13.733,-2.764,3.213,3.817],306,'HES',0.0194,
    N(9,[3.653,17.360,1.388,4.636,4.521],111,'Writing_Style',0.5104,
      N(10,[3.883,18.295,1.481,4.880,4.507],92),N(11,[2.535,12.831,0.938,3.456,4.589],19)),
    N(12,[1.678,11.668,-5.127,2.403,3.416],195,'HES',0.0254,
      N(13,[1.020,12.674,-6.166,2.280,4.062],154),N(14,[4.152,7.888,-1.227,2.866,0.988],41))));
var NOTE={3:'low quality, low complexity',10:'IF peak, all domains positive',13:'Knowledge conflict'};
var MARK={3:'neg',13:'neg',10:'pos'};
var cards={}, listeners=[];
function treeSvg(host){
  var W=1000,H=500,cw=112,ch=100,lv=[0,132,264,396],s=svg(W,H,'tree-svg');
  var leafX=0; function place(n,d){ n.d=d; if(!n.f){ n.x=62.5+125*leafX++; } else { place(n.l,d+1); place(n.r,d+1); n.x=(n.l.x+n.r.x)/2; } n.y=lv[d]; }
  place(TREE,0);
  (function edges(n){ if(!n.f) return; [n.l,n.r].forEach(function(c,i){ var m=n.y+ch+(lv[1]-ch)/2;
      edge(s,[[n.x,n.y+ch],[n.x,m],[c.x,m],[c.x,c.y]]);
      txt(s,c.x+(i?6:-6),c.y-6,(i?'> ':'≤ ')+(n.t<0.1?n.t.toFixed(4):n.t.toFixed(2)),'m tick',i?'start':'end'); edges(c); }); })(TREE);
  (function nodes(n){
    var g=S('g',{class:'tnode'+(MARK[n.id]?' '+MARK[n.id]:''),transform:'translate('+(n.x-cw/2)+','+n.y+')',tabindex:0,role:'button'});
    g.appendChild(S('rect',{x:0,y:0,width:cw,height:ch,rx:4,class:'card'}));
    txt(g,9,15,'n = '+n.n,'m tick'); if(NOTE[n.id]) txt(g,cw-9,15,n.id===10?'peak':n.id===13?'clash':'noise','m flag','end');
    var z=56; g.appendChild(S('line',{x1:8,x2:cw-8,y1:z,y2:z,class:'zero'}));
    n.c.forEach(function(v,i){ var h=Math.abs(v)*1.75; g.appendChild(S('rect',{x:12+i*19,y:v>=0?z-h:z,width:12,height:Math.max(h,1),rx:1,style:'fill:'+DC[i]})); });
    txt(g,cw/2,ch-10,n.f?n.f.replace('Normalized_Loss','Norm_Loss'):'leaf','m tick','middle');
    g.addEventListener('click',function(){ select(n.id); }); g.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); select(n.id);} });
    cards[n.id]=g; s.appendChild(g); if(n.f){ nodes(n.l); nodes(n.r); } })(TREE);
  host.appendChild(s);
}
function pathTo(id){ var out=null; (function walk(n,acc){ if(out) return; var a=acc.concat([n]); if(n.id===id){ out=a; return; } if(n.f){ walk(n.l,a); walk(n.r,a); } })(TREE,[]); return out; }
var explorer, current=0;
function select(id){ current=id; Object.keys(cards).forEach(function(k){ cards[k].classList.toggle('sel',+k===id); }); renderExplorer(); }
function el(t,c,h){ var e=document.createElement(t); if(c) e.className=c; if(h!=null) e.innerHTML=h; return e; }
function renderExplorer(){
  var p=pathTo(current),cur=p[p.length-1]; explorer.innerHTML='';
  var bc=el('div','tree-path');
  p.forEach(function(n,i){ if(i) bc.appendChild(el('span','arrow','→'));
    var lab=i===0?'All 512 runs':(function(par){ var right=par.r===n; return par.f+(right?' > ':' ≤ ')+(par.t<0.1?par.t.toFixed(4):par.t.toFixed(2)); })(p[i-1]);
    var b=el('button',null,lab); b.type='button'; b.onclick=function(){ select(n.id); }; bc.appendChild(b); });
  explorer.appendChild(bc);
  var box=el('div','tree-node');
  box.appendChild(el('div','meta','<span>'+(cur.f?'Split node':'Leaf')+(NOTE[cur.id]?' · '+NOTE[cur.id]:'')+'</span><span>'+cur.n+' runs</span>'));
  var effs=el('div','effects');
  cur.c.forEach(function(v,i){ var row=el('div','eff'); row.appendChild(el('span','nm',DOM[i]));
    var ax=el('div','axis'),bar=el('i'); var w=Math.min(Math.abs(v)/20,1)*50; bar.style.background=DC[i];
    bar.style.width=w+'%'; bar.style.left=(v>=0?50:50-w)+'%'; ax.appendChild(bar); row.appendChild(ax);
    row.appendChild(el('span','v '+(v>=0?'p':'n'),(v>=0?'+':'−')+Math.abs(v).toFixed(2))); effs.appendChild(row); });
  box.appendChild(effs);
  if(cur.f){ var sp=el('div','splits');
    [['l','≤'],['r','>']].forEach(function(k){ var c=cur[k[0]],b=el('button',null,'<small>'+c.n+' runs</small>'+cur.f+' '+k[1]+' '+(cur.t<0.1?cur.t.toFixed(4):cur.t.toFixed(2)));
      b.type='button'; b.onclick=function(){ select(c.id); }; sp.appendChild(b); });
    box.appendChild(sp);
  } else box.appendChild(el('p','leaf-note','Leaf. Pick another node in the tree, or go back up along the path.'));
  explorer.appendChild(box);
}

function key(host){ DOM.forEach(function(d,i){ var li=document.createElement('li'); li.innerHTML='<i style="background:'+DC[i]+'"></i>'+d; host.appendChild(li); }); }

window.CMFigs={pipeline:pipeline,results:results,spearman:spearman,
  tree:function(svgHost,expHost){ treeSvg(svgHost); explorer=expHost; select(0); },key:key};
})();

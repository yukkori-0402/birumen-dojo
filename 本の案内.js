// 公開版だけに入れる「作者の本」の案内。クイズの結果画面が出たら、ボタンのすぐ下に本を3冊並べる。
// 各アプリの中身は変えず、画面の変化を見張って差し込む(公開用を作る.py が各ページに読み込ませる)。
(function(){
  var BOOKS=[
    {t:'新人ビルメンの教科書',v:'実用編',img:'b2.jpg',u:'https://www.amazon.co.jp/dp/B0HN65Y84V'},
    {t:'新人ビルメンのトラブル対応',v:'トラブル編',img:'b3.jpg',u:'https://www.amazon.co.jp/dp/B0HP6XXZ9D'},
    {t:'ビルメン、楽じゃなかった。',v:'体験編',img:'b1.jpg',u:'https://www.amazon.co.jp/dp/B0HMXYLK1D'}
  ];
  var base=document.currentScript?document.currentScript.src.replace(/[^\/]*$/,''):'';
  var css='.dojo-books{margin:16px 0 4px;padding:16px 14px 14px;border-radius:20px;background:linear-gradient(160deg,#fff8e1,#fff 70%);border:1px solid #f1dfa8;box-shadow:0 6px 18px rgba(80,60,0,.08);text-align:left;color:#2b2a26}'
    +'.dojo-books .db-h{display:flex;align-items:baseline;justify-content:space-between;gap:8px;flex-wrap:wrap}'
    +'.dojo-books .db-h b{font-size:15.5px;font-weight:900}.dojo-books .db-h small{font-size:12px;color:#7a6a3a}'
    +'.dojo-books p{margin:4px 0 12px;font-size:13px;line-height:1.6;color:#5c5546}'
    +'.dojo-books .db-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}'
    +'.dojo-books a{display:block;text-decoration:none;color:inherit;text-align:center}'
    +'.dojo-books img{display:block;width:100%;max-width:110px;aspect-ratio:5/8;object-fit:cover;margin:0 auto 6px;border-radius:6px;box-shadow:0 4px 10px rgba(0,0,0,.18);transition:transform .15s}'
    +'.dojo-books a:hover img{transform:translateY(-3px)}'
    +'.dojo-books .db-v{display:inline-block;font-size:11px;font-weight:800;padding:1px 8px;border-radius:99px;background:#f5b301;color:#3d2c00}'
    +'.dojo-books .db-t{display:block;font-size:12px;line-height:1.45;margin-top:4px;font-weight:700}'
    +'.dojo-books .db-go{display:block;margin-top:12px;font-size:12px;color:#7a6a3a;text-align:center}'
    // 暗い画面: 端末の設定に従う(アプリで「明るい」を選んだときは除く)+アプリで「暗い」を選んだとき
    +'@media (prefers-color-scheme:dark){'+dark(':root:not([data-theme="light"]) ')+'}'+dark(':root[data-theme="dark"] ');
  function dark(r){
    return r+'.dojo-books{background:linear-gradient(160deg,#3a3220,#26241f 70%);border-color:#5a4c25;color:#f1ece0}'
      +r+'.dojo-books p,'+r+'.dojo-books .db-h small,'+r+'.dojo-books .db-go{color:#cfc4a6}';
  }
  function card(){
    var d=document.createElement('div');d.className='dojo-books';
    d.innerHTML='<div class="db-h"><b>現場の話は本でも</b><small>シリーズ「現場12年のビルメン」</small></div>'
      +'<p>資格の先にある、ビルメンの毎日の仕事のこと。作者が現場12年の経験から書きました。</p>'
      +'<div class="db-row">'+BOOKS.map(function(b,i){
        return '<a href="'+b.u+'" target="_blank" rel="noopener" data-i="'+i+'"><img src="'+base+'本の表紙/'+b.img+'" alt="'+b.t+'の表紙" loading="lazy"><span class="db-v">'+b.v+'</span><span class="db-t">'+b.t+'</span></a>';
      }).join('')+'</div><span class="db-go">表紙をタップするとAmazonのページが開きます(Kindle・紙の本)</span>';
    d.addEventListener('click',function(e){
      var a=e.target.closest&&e.target.closest('a[data-i]');
      if(a&&window.gtag){window.gtag('event','book_click',{book_title:BOOKS[a.getAttribute('data-i')].t,link_location:'quiz_result',transport_type:'beacon'});}
    });
    return d;
  }
  function place(){
    if(document.querySelector('.dojo-books'))return;
    // 電工二種・電験三種: 結果画面のボタン列(.actions)の下
    if(document.querySelector('.result-tag')){
      var acts=document.querySelector('.actions');
      if(acts){acts.parentNode.insertBefore(card(),acts.nextSibling);}
      return;
    }
    // ボイラー2級・ビル管: 結果カード(.card.res)のボタン(.pair)の下
    var res=document.querySelector('.card.res');
    if(res){
      var pair=res.querySelector('.pair');
      if(pair)pair.parentNode.insertBefore(card(),pair.nextSibling);else res.appendChild(card());
    }
  }
  function start(){
    var s=document.createElement('style');s.textContent=css;document.head.appendChild(s);
    new MutationObserver(place).observe(document.body,{childList:true,subtree:true});
    place();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();

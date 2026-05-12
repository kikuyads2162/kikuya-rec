import { useState } from "react";

const DAYS = ["日","月","火","水","木","金","土"];
const MONTHS_LABEL = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
const CATEGORIES = ["すべて","ゲーム・レク","クイズ","体操・運動","手遊び","ホワイトボード","歌・音楽","季節・行事","口腔機能","個別対応"];

const NETA_DATA = [
  // ── きくやオリジナル15選 ──
  {id:101,orig:true,title:"新聞丸めてドン！",category:"ゲーム・レク",time:15,level:"かんたん",months:[],desc:"新聞紙で作った箱に、丸めた新聞紙ボールをより多く入れたチームの勝ち！\n\n【準備】新聞紙・段ボール箱\n【効果】上肢機能・競争心・場の盛り上がり\n【声かけ例】「どんどん丸めて投げちゃってください！」\n【ポイント】チーム対抗にすると一体感が生まれる"},
  {id:102,orig:true,title:"茶摘みゲーム",category:"ゲーム・レク",time:15,level:"ふつう",months:[5],desc:"お茶の葉に見立てた点数付き紙コップを、洗濯ばさみやロボットアームで掴んで合計点を競う。\n\n【準備】点数を書いた紙コップ・洗濯ばさみ（または100均ロボットアーム）\n【効果】手指の巧緻性・集中力・達成感\n【声かけ例】「上手に摘めましたね〜！何点でしたか？」\n【ポイント】5月の茶摘みの季節に合わせると季節感アップ"},
  {id:103,orig:true,title:"紙コップタワー崩し",category:"ゲーム・レク",time:15,level:"かんたん",months:[],desc:"紙飛行機を作って積み上げた紙コップに投げ、倒れた数を競うゲーム。\n\n【準備】紙コップ・折り紙または普通紙\n【効果】上肢機能・集中力・創造性（飛行機作り）\n【声かけ例】「どんな飛行機を作りましょうか？」\n【ポイント】飛行機作りから楽しめる2段階レク"},
  {id:104,orig:true,title:"風船パレー（単語当て）",category:"ゲーム・レク",time:15,level:"かんたん",months:[],desc:"30秒〜1分間、風船を落とさずに打ち合いながら、風船に書かれた単語を当てるゲーム。\n\n【準備】風船・マジック（単語を書く）\n【効果】上肢機能・注意力・チームワーク\n【声かけ例】「落とさないように！何て書いてありますか？」\n【ポイント】テーマを「昭和の歌手」「食べ物」にすると盛り上がる"},
  {id:105,orig:true,title:"マルチタスク体操",category:"体操・運動",time:10,level:"ふつう",months:[],desc:"お題に合わせた振り付けを覚え、掛け声でそのお題が出たら対応する動きをする体操。\n\n【例】「犬」→手を叩く、「猫」→手を上げる、など事前に決めておく\n【効果】注意力・反応速度・前頭前野の活性化\n【声かけ例】「間違えても大丈夫ですよ〜笑いながらやりましょう！」\n【ポイント】最初はゆっくり、慣れたらスピードアップ"},
  {id:106,orig:true,title:"紙コップゴルフ",category:"ゲーム・レク",time:15,level:"ふつう",months:[],desc:"点数を書いた紙コップをテープで床に固定し、ピンポン玉を転がして入れた合計点を競う。\n\n【準備】紙コップ・テープ・ピンポン玉\n【効果】集中力・手と目の協調性・競争心\n【声かけ例】「ゆっくり狙って転がしてみてください！」\n【ポイント】高得点コップを遠くに置くと難易度調整ができる"},
  {id:107,orig:true,title:"ハエ叩きゲーム",category:"ゲーム・レク",time:15,level:"かんたん",months:[],desc:"テーブルに貼ったハエのイラストをハエ叩きで叩き、1分間で獲得した点数を競う。\n\n【準備】ハエのイラスト（点数別）・ハエ叩き。マイナス虫も追加可。\n【効果】反応速度・集中力・上肢機能\n【声かけ例】「マイナスの虫には気をつけてください！」\n【ポイント】点数にバリエーションをつけて難易度アレンジ可能"},
  {id:108,orig:true,title:"犬猫脳トレ",category:"クイズ",time:8,level:"ふつう",months:[],desc:"「犬」と言ったら「ニャー」、「猫」と言ったら「ワン」と逆の鳴き声を答えるゲーム。\n\n【バリエーション】最初は正しい鳴き声で練習→逆バージョンへ\n【効果】認知機能・反応速度・前頭前野の活性化\n【声かけ例】「間違えたら笑顔でOKですよ〜！」\n【ポイント】テンポを上げると盛り上がる。自然と笑いが生まれる"},
  {id:109,orig:true,title:"お手玉都道府県クイズ",category:"クイズ",time:20,level:"ふつう",months:[],desc:"都道府県のヒントを出し、正解のカードにお手玉を投げて乗せるゲーム。\n\n【準備】都道府県名を書いた大きな紙・お手玉\n【やり方】①ヒントを出す ②シンキングタイム ③一斉に投げる\n【効果】記憶力・知識・上肢機能・達成感\n【声かけ例】「旅行に行ったことはありますか？」"},
  {id:110,orig:true,title:"野菜の重さ当てクイズ",category:"クイズ",time:15,level:"ふつう",months:[],desc:"複数の野菜を見て重さ順に並べてもらい、実際にはかりで量って正解を競う。\n\n【準備】野菜数種・はかり\n【効果】判断力・推理力・生活知識の活性化\n【声かけ例】「触って重さを確かめてもいいですよ！台所での感覚を活かして！」"},
  {id:111,orig:true,title:"うちわでリレー",category:"ゲーム・レク",time:15,level:"かんたん",months:[7,8],desc:"お手玉や風船をうちわに乗せて、端から端まで落とさず受け渡すチームゲーム。\n\n【準備】うちわ・お手玉または風船\n【効果】集中力・バランス感覚・チームワーク\n【声かけ例】「ゆっくり丁寧に渡してください！」\n【ポイント】夏のレクとして扇子を使うと季節感も出る"},
  {id:112,orig:true,title:"紙飛行機飛ばし",category:"ゲーム・レク",time:15,level:"かんたん",months:[],desc:"各自で紙飛行機を作って、決められたラインに向けて投げ、一番ラインに近い人が勝ち。\n\n【準備】折り紙または普通紙\n【効果】手指の巧緻性・集中力・創造性\n【声かけ例】「どんな折り方が一番飛びますかね？」\n【ポイント】飛行機を折る工程から楽しめる。思い思いの折り方で個性が出る"},
  {id:113,orig:true,title:"お手玉ぐらぐらゲーム",category:"手遊び",time:15,level:"ふつう",months:[],desc:"ラップの芯の上にトレーを置き、お手玉を1つずつ取っていき、トレーが落ちたら負け。\n\n【準備】ラップの芯・トレー・お手玉\n【効果】集中力・手先の巧緻性・緊張感と笑い\n【声かけ例】「慎重に…慎重に！」\n【ポイント】ハラハラドキドキ感があり、自然と声が上がる"},
  {id:114,orig:true,title:"棒サッカー",category:"ゲーム・レク",time:20,level:"ふつう",months:[],desc:"柔らかいボールと新聞紙棒を使って、相手のゴールにボールを入れた数が多い方が勝ち。\n\n【準備】柔らかいボール・新聞紙を丸めた棒・段ボールゴール\n【効果】上肢機能・チームワーク・競争心\n【注意】棒が他の方に当たらないよう十分なスペースを確保"},
  {id:115,orig:true,title:"難読漢字クイズ＆お手玉",category:"クイズ",time:15,level:"ふつう",months:[],desc:"難読漢字の読みを4択で答え、正解のカードにお手玉を投げて乗せるゲーム。\n\n【準備】難読漢字カード・4択の答えカード・お手玉\n【例】蒲公英（たんぽぽ）、海豚（いるか）、向日葵（ひまわり）、秋刀魚（さんま）\n【効果】知識・集中力・上肢機能\n【声かけ例】「読めましたか？カードに向かって投げてみてください！」"},

  // ── 定番ネタ ──
  {id:1,orig:false,title:"椅子でラジオ体操",category:"体操・運動",time:10,level:"かんたん",months:[],desc:"椅子に座ったままできるラジオ体操アレンジ。無理のない動きで全身を動かす。\n\n【効果】筋力維持・血行促進\n【声かけ例】「今日も一緒に体を動かしましょう！」"},
  {id:2,orig:false,title:"タオル体操",category:"体操・運動",time:10,level:"かんたん",months:[],desc:"タオルを使って座ったまま全身を動かす体操。柔軟性の向上や筋力維持に効果的。\n\n【やり方】①全員にタオルを配布 ②伸ばす・引っ張る・捻るなどの動きを一緒に\n【効果】上半身の柔軟性・筋力維持"},
  {id:3,orig:false,title:"パタカラ体操",category:"口腔機能",time:5,level:"かんたん",months:[],desc:"「パ・タ・カ・ラ」と繰り返す口腔機能訓練。誤嚥予防・滑舌改善に効果的。\n\n【やり方】「パパパ・タタタ・カカカ・ラララ」をゆっくり→速くと繰り返す\n【効果】口腔機能向上・誤嚥予防\n【声かけ例】「食事をおいしく食べるためのお口の体操です！」"},
  {id:4,orig:false,title:"顔じゃんけん",category:"口腔機能",time:5,level:"かんたん",months:[],desc:"グー（口をすぼめる）・チョキ（舌を出す）・パー（大きく口を開ける）で顔じゃんけん。\n\n【効果】口腔・表情筋の運動・誤嚥予防\n【声かけ例】「お顔でじゃんけんしましょう！笑顔になれますよ〜」"},
  {id:5,orig:false,title:"昭和歌謡クイズ",category:"クイズ",time:10,level:"ふつう",months:[],desc:"昭和30〜50年代の歌謡曲の歌詞穴埋めクイズ。懐かしい曲で盛り上がる。\n\n【効果】長期記憶の活性化・感情の安定\n【準備】歌詞カードを大きく印刷しておくと見やすい"},
  {id:6,orig:false,title:"なぞなぞ大会",category:"クイズ",time:15,level:"かんたん",months:[],desc:"シンプルななぞなぞを出題。笑いを引き出す楽しい雰囲気作りに最適。\n\n【効果】思考力・語彙力の活性化\n【声かけ例】「難しくないですよ〜一緒に考えましょう！」"},
  {id:7,orig:false,title:"後出しじゃんけん",category:"クイズ",time:8,level:"ふつう",months:[],desc:"スタッフの手を見てから、わざと「負ける」「勝つ」「あいこ」にする手を出すゲーム。\n\n【効果】前頭前野の活性化・反応速度・認知機能トレーニング\n【コツ】慣れてきたら条件を変えて難易度アップ"},
  {id:8,orig:false,title:"連想ゲーム",category:"ホワイトボード",time:10,level:"ふつう",months:[],desc:"お題から連想できる言葉をどんどん挙げるゲーム。チーム対抗にすると盛り上がる。\n\n【効果】発想力・言語能力・コミュニケーション促進"},
  {id:9,orig:false,title:"花の名前しりとり",category:"ホワイトボード",time:10,level:"ふつう",months:[],desc:"花の名前だけでしりとり。ホワイトボードに書きながら全員で進める。\n\n【効果】語彙力・記憶力・集中力の向上"},
  {id:10,orig:false,title:"川柳・穴埋めゲーム",category:"ホワイトボード",time:15,level:"ふつう",months:[],desc:"高齢者の日常をテーマにした川柳の一部を空欄にして考えてもらう。\n\n例：「注目を 一身に受け ○○食べる」（答え：餅）\n【効果】語彙力・発想力・笑いで感情の安定"},
  {id:11,orig:false,title:"童謡・唱歌を歌おう",category:"歌・音楽",time:15,level:"かんたん",months:[],desc:"春夏秋冬の童謡・唱歌を歌う。大きな文字の歌詞カードを用意して一緒に歌う。\n\n【効果】呼吸機能・口腔機能・感情の安定・回想効果"},
  {id:12,orig:false,title:"イントロクイズ",category:"歌・音楽",time:15,level:"ふつう",months:[],desc:"曲のイントロをハミングや鍵盤で演奏して曲名を当てるクイズ。昭和の歌謡曲が特に盛り上がる。\n\n【効果】記憶力・聴覚の活性化・感情の安定"},
  {id:13,orig:false,title:"指体操（グーパー）",category:"手遊び",time:5,level:"かんたん",months:[],desc:"両手のグーパーを左右交互に行う脳トレ体操。\n\n【効果】手指の機能維持・脳の活性化\n【声かけ例】「最初はゆっくり、慣れたら速くしてみましょう！」"},
  {id:14,orig:false,title:"お手玉遊び",category:"手遊び",time:10,level:"かんたん",months:[],desc:"1〜2個のお手玉を投げてキャッチする。\n\n【効果】手先の巧緻性・集中力・懐かしさによる感情の安定\n【声かけ例】「昔よくやりましたね〜どんな遊び方をしていましたか？」"},
  {id:15,orig:false,title:"季節の折り紙",category:"季節・行事",time:20,level:"ふつう",months:[3,4,5],desc:"春：桜・チューリップ・ちょうちょ。完成品を飾ることでやりがいアップ。\n\n【効果】手指の巧緻性・集中力・達成感"},
  {id:16,orig:false,title:"七夕かざり作り",category:"季節・行事",time:25,level:"ふつう",months:[7],desc:"短冊に願い事を書いて笹に飾る。昔の七夕の思い出話をしながら進める。\n\n【声かけ例】「どんなお願いを書きますか？」と一人ひとりに声かけを"},
  {id:17,orig:false,title:"紅葉狩り塗り絵",category:"季節・行事",time:20,level:"かんたん",months:[10,11],desc:"秋の紅葉・どんぐりの塗り絵。色選びで個性が出て会話のきっかけになる。\n\n【声かけ例】「きれいな色ですね！紅葉を見に行ったことはありますか？」"},
  {id:18,orig:false,title:"お正月かるた",category:"季節・行事",time:20,level:"かんたん",months:[1],desc:"百人一首や絵かるたを使ったかるた取り。チーム戦にすると盛り上がる。\n\n【声かけ例】「子どもの頃はよくやりましたか？」"},
  {id:19,orig:false,title:"回想法（思い出トーク）",category:"個別対応",time:20,level:"かんたん",months:[],desc:"テーマに沿って昔の思い出を語ってもらう。\n\n【テーマ例】学生時代・子育て・好きだった食べ物・昔の仕事・懐かしい遊び\n【効果】長期記憶の活性化・自己肯定感の向上・コミュニケーション促進"},
  {id:20,orig:false,title:"数字つなぎプリント",category:"個別対応",time:10,level:"ふつう",months:[],desc:"1〜25の数字を順番につなぐ脳トレプリント。個人のペースでできる。\n\n【効果】注意力・集中力・視空間認知の維持"},
];

const CAT_COLORS={"ゲーム・レク":"#c8962d","クイズ":"#3a86c8","体操・運動":"#e07b39","手遊び":"#c84e8a","ホワイトボード":"#2d8a6e","歌・音楽":"#8a5db5","季節・行事":"#5dab3a","口腔機能":"#d94f70","個別対応":"#7a7a7a"};
const LEVEL_COLORS={"かんたん":"#4caf50","ふつう":"#ff9800","じっくり":"#f44336"};

const S={
  btn:(c,o)=>({padding:"8px 16px",borderRadius:20,border:o?`2px solid ${c}`:"none",background:o?"transparent":c,color:o?c:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}),
  badge:(c)=>({background:c+"22",color:c,fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:10,border:`1px solid ${c}44`,display:"inline-block"}),
};

export default function App() {
  const [tab,setTab]=useState("home");
  const [neta,setNeta]=useState(NETA_DATA);
  const [favs,setFavs]=useState([]);
  const [session,setSession]=useState([]);
  const [hist,setHist]=useState([]);
  const [filterCat,setFilterCat]=useState("すべて");
  const [detail,setDetail]=useState(null);
  const [showAdd,setShowAdd]=useState(false);
  const [aiLoading,setAiLoading]=useState(false);
  const [aiResult,setAiResult]=useState(null);
  const [aiCond,setAiCond]=useState({time:"30",members:"10",theme:""});
  const [newN,setNewN]=useState({title:"",category:"ゲーム・レク",time:15,level:"ふつう",months:[],desc:""});
  const [presenting,setPresenting]=useState(false);
  const [presIdx,setPresIdx]=useState(0);
  const [nannohi,setNannohi]=useState({today:null,tomorrow:null});
  const [nhLoading,setNhLoading]=useState(false);
  const [nhTab,setNhTab]=useState("today");

  const now=new Date();
  const todayInfo={m:now.getMonth()+1,d:now.getDate(),w:DAYS[now.getDay()],label:`${now.getMonth()+1}月${now.getDate()}日（${DAYS[now.getDay()]}）`};
  const tom=new Date(); tom.setDate(tom.getDate()+1);
  const tomInfo={m:tom.getMonth()+1,d:tom.getDate(),w:DAYS[tom.getDay()],label:`${tom.getMonth()+1}月${tom.getDate()}日（${DAYS[tom.getDay()]}）`};
  const curMonth=now.getMonth()+1;

  const toggleFav=(id)=>setFavs(f=>f.includes(id)?f.filter(x=>x!==id):[...f,id]);
  const addSess=(id)=>{if(!session.includes(id))setSession(s=>[...s,id]);};
  const remSess=(id)=>setSession(s=>s.filter(x=>x!==id));
  const moveSess=(i,dir)=>{const a=[...session];const j=i+dir;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];setSession(a);};
  const openDetail=(id)=>{setDetail(id);setHist(h=>[{id,date:todayInfo.label},...h.filter(x=>x.id!==id)].slice(0,30));};

  const fetchNH=async()=>{
    setNhLoading(true);setNannohi({today:null,tomorrow:null});
    const p=`今日は${todayInfo.m}月${todayInfo.d}日、明日は${tomInfo.m}月${tomInfo.d}日です。デイサービスの朝のレクや会話のきっかけとして、高齢者にわかりやすく教えてください。JSON形式のみで返してください（コードブロック不要）:{"today":{"date":"${todayInfo.m}月${todayInfo.d}日","items":[{"name":"記念日名","emoji":"絵文字1つ","desc":"2〜3文。昭和の思い出や季節感と絡めると◎"},{"name":"記念日名2","emoji":"絵文字","desc":"解説"}],"kaiwa":"スタッフが利用者さんに話しかける会話のきっかけフレーズ"},"tomorrow":{"date":"${tomInfo.m}月${tomInfo.d}日","items":[{"name":"記念日名","emoji":"絵文字","desc":"解説"}],"kaiwa":"明日の話題のきっかけフレーズ"}}`;
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,messages:[{role:"user",content:p}]})});
      const d=await r.json();
      const raw=d.content?.map(b=>b.text||"").join("")||"";
      const m=raw.match(/\{[\s\S]*\}/);
      if(m)setNannohi(JSON.parse(m[0]));
      else setNannohi({today:{date:todayInfo.label,items:[{name:"取得できませんでした",emoji:"😅",desc:"もう一度お試しください。"}],kaiwa:""},tomorrow:null});
    }catch{setNannohi({today:{date:todayInfo.label,items:[{name:"エラー",emoji:"⚠️",desc:"もう一度お試しください。"}],kaiwa:""},tomorrow:null});}
    setNhLoading(false);
  };

  const handleAI=async()=>{
    setAiLoading(true);setAiResult(null);
    const list=neta.filter(n=>n.months.length===0||n.months.includes(curMonth)).map(n=>`・${n.title}（${n.category}、${n.time}分、${n.level}）`).join("\n");
    const p=`あなたはデイサービスのレクリエーション担当スタッフです。今日は${todayInfo.label}、${curMonth}月です。\n条件：合計${aiCond.time}分、参加人数${aiCond.members}名、テーマ：${aiCond.theme||"特になし"}\n利用可能なネタ：\n${list}\n\n## 今日のおすすめセッション（${aiCond.time}分）\n### 1.[ネタ名]（[時間]分）\n→ 進め方のポイント：〜\n（2〜4個提案）\n\n## 今日の声かけ例\n開始時：〜　盛り上げ：〜　締め：〜\n\n## スタッフへのひとこと`;
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:p}]})});
      const d=await r.json();
      setAiResult(d.content?.map(b=>b.text||"").join("")||"エラーが発生しました。");
    }catch{setAiResult("エラーが発生しました。もう一度お試しください。");}
    setAiLoading(false);
  };

  const saveNew=()=>{
    if(!newN.title.trim())return;
    setNeta(n=>[...n,{...newN,id:Date.now(),orig:false}]);
    setNewN({title:"",category:"ゲーム・レク",time:15,level:"ふつう",months:[],desc:""});
    setShowAdd(false);
  };

  const filtered=neta.filter(n=>filterCat==="すべて"||n.category===filterCat);
  const presList=session.map(id=>neta.find(n=>n.id===id)).filter(Boolean);
  const detailN=neta.find(n=>n.id===detail);

  // ── PRESENT MODE ──
  if(presenting&&presList.length>0){
    const item=presList[presIdx];
    return(
      <div style={{position:"fixed",inset:0,background:"#1a3a2a",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 20px",zIndex:300}}>
        <div style={{color:"#a8d4b5",fontSize:14,marginBottom:14,fontWeight:700}}>{presIdx+1} / {presList.length}　合計 {presList.reduce((s,n)=>s+n.time,0)}分</div>
        <div style={{background:"#fff",borderRadius:20,padding:"24px 20px",width:"100%",maxWidth:640,textAlign:"center",boxShadow:"0 8px 40px rgba(0,0,0,0.3)",maxHeight:"70vh",overflowY:"auto"}}>
          <div style={{...S.badge(CAT_COLORS[item.category]||"#888"),marginBottom:12}}>{item.category}</div>
          <div style={{fontSize:30,fontWeight:900,color:"#2d5a3d",marginBottom:12,lineHeight:1.3}}>{item.title}</div>
          <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:16}}>
            <span style={S.badge("#2d5a3d")}>⏱ {item.time}分</span>
            <span style={S.badge(LEVEL_COLORS[item.level]||"#888")}>{item.level}</span>
          </div>
          <div style={{fontSize:15,color:"#444",lineHeight:2,textAlign:"left",whiteSpace:"pre-wrap"}}>{item.desc}</div>
        </div>
        <div style={{display:"flex",gap:14,marginTop:20}}>
          <button onClick={()=>setPresIdx(i=>Math.max(0,i-1))} disabled={presIdx===0} style={{...S.btn("#fff",true),opacity:presIdx===0?0.3:1,fontSize:20,padding:"12px 22px"}}>◀</button>
          <button onClick={()=>setPresenting(false)} style={{...S.btn("#f44336"),padding:"12px 20px",fontSize:14}}>✕ 終了</button>
          <button onClick={()=>setPresIdx(i=>Math.min(presList.length-1,i+1))} disabled={presIdx===presList.length-1} style={{...S.btn("#fff",true),opacity:presIdx===presList.length-1?0.3:1,fontSize:20,padding:"12px 22px"}}>▶</button>
        </div>
      </div>
    );
  }

  // ── CARD ──
  const Card=({n})=>(
    <div style={{background:"#fff",borderRadius:14,marginBottom:10,boxShadow:n.orig?"0 2px 10px rgba(200,150,45,0.2)":"0 1px 5px rgba(0,0,0,0.07)",overflow:"hidden",border:n.orig?"2px solid #c8962d":"2px solid transparent"}}>
      <div style={{background:CAT_COLORS[n.category]||"#888",padding:"7px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          {n.orig&&<span style={{fontSize:9,background:"rgba(255,255,255,0.3)",color:"#fff",borderRadius:5,padding:"1px 5px",fontWeight:700}}>きくやオリジナル</span>}
          <span style={{fontSize:11,color:"rgba(255,255,255,0.95)",fontWeight:700}}>{n.category}</span>
        </div>
        <button onClick={()=>toggleFav(n.id)} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:favs.includes(n.id)?"#f4c430":"rgba(255,255,255,0.5)"}}>
          {favs.includes(n.id)?"★":"☆"}
        </button>
      </div>
      <div style={{padding:"11px 13px"}}>
        <div style={{fontSize:16,fontWeight:700,color:"#222",marginBottom:5}}>{n.title}</div>
        <div style={{display:"flex",gap:7,marginBottom:7,flexWrap:"wrap"}}>
          <span style={S.badge("#2d5a3d")}>⏱ {n.time}分</span>
          <span style={S.badge(LEVEL_COLORS[n.level]||"#888")}>{n.level}</span>
          {n.months.length>0&&<span style={S.badge("#e07b39")}>🗓 {n.months.map(m=>MONTHS_LABEL[m-1]).join("・")}</span>}
        </div>
        <div style={{fontSize:12,color:"#666",lineHeight:1.6,marginBottom:9}}>{n.desc.split("\n")[0].slice(0,55)}{n.desc.length>55?"…":""}</div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
          <button onClick={()=>openDetail(n.id)} style={S.btn("#2d5a3d")}>詳細を見る</button>
          <button onClick={()=>addSess(n.id)} style={S.btn(session.includes(n.id)?"#bbb":"#e07b39",!session.includes(n.id))}>
            {session.includes(n.id)?"✓ 追加済み":"＋ セッション"}
          </button>
        </div>
      </div>
    </div>
  );

  // ── DETAIL MODAL ──
  const DetailModal=()=>{
    if(!detailN)return null;
    return(
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:200,display:"flex",alignItems:"flex-end"}} onClick={()=>setDetail(null)}>
        <div style={{background:"#fff",width:"100%",maxHeight:"88vh",borderRadius:"20px 20px 0 0",overflowY:"auto",padding:20}} onClick={e=>e.stopPropagation()}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <div style={S.badge(CAT_COLORS[detailN.category]||"#888")}>{detailN.category}</div>
            {detailN.orig&&<div style={{...S.badge("#c8962d"),fontSize:10}}>きくやオリジナル</div>}
          </div>
          <div style={{fontSize:22,fontWeight:900,color:"#222",marginBottom:10}}>{detailN.title}</div>
          <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
            <span style={S.badge("#2d5a3d")}>⏱ {detailN.time}分</span>
            <span style={S.badge(LEVEL_COLORS[detailN.level]||"#888")}>{detailN.level}</span>
            {detailN.months.length>0&&<span style={S.badge("#e07b39")}>🗓 {detailN.months.map(m=>MONTHS_LABEL[m-1]).join("・")}</span>}
          </div>
          <div style={{fontSize:15,color:"#333",lineHeight:2,marginBottom:20,whiteSpace:"pre-wrap"}}>{detailN.desc}</div>
          <div style={{display:"flex",gap:9,flexWrap:"wrap"}}>
            <button onClick={()=>{addSess(detailN.id);setDetail(null);}} style={S.btn("#2d5a3d")}>＋ セッションに追加</button>
            <button onClick={()=>toggleFav(detailN.id)} style={S.btn(favs.includes(detailN.id)?"#f4c430":"#999")}>
              {favs.includes(detailN.id)?"★ お気に入り済み":"☆ お気に入り"}
            </button>
            <button onClick={()=>setDetail(null)} style={S.btn("#ccc",true)}>閉じる</button>
          </div>
        </div>
      </div>
    );
  };

  // ── ADD MODAL ──
  const AddModal=()=>(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:200,display:"flex",alignItems:"flex-end"}} onClick={()=>setShowAdd(false)}>
      <div style={{background:"#fff",width:"100%",maxHeight:"90vh",borderRadius:"20px 20px 0 0",overflowY:"auto",padding:20}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:18,fontWeight:900,color:"#2d5a3d",marginBottom:14}}>＋ ネタを追加</div>
        {[
          {lb:"タイトル",el:<input style={{width:"100%",border:"1.5px solid #ccc",borderRadius:9,padding:"10px 12px",fontSize:14,fontFamily:"inherit",boxSizing:"border-box",marginBottom:10}} value={newN.title} onChange={e=>setNewN(n=>({...n,title:e.target.value}))} placeholder="例：風船バレー" />},
          {lb:"カテゴリ",el:<select style={{width:"100%",border:"1.5px solid #ccc",borderRadius:9,padding:"10px 12px",fontSize:14,background:"#fff",fontFamily:"inherit",boxSizing:"border-box",marginBottom:10}} value={newN.category} onChange={e=>setNewN(n=>({...n,category:e.target.value}))}>{CATEGORIES.filter(c=>c!=="すべて").map(c=><option key={c}>{c}</option>)}</select>},
          {lb:"所要時間（分）",el:<input type="number" style={{width:"100%",border:"1.5px solid #ccc",borderRadius:9,padding:"10px 12px",fontSize:14,fontFamily:"inherit",boxSizing:"border-box",marginBottom:10}} value={newN.time} onChange={e=>setNewN(n=>({...n,time:Number(e.target.value)}))} />},
          {lb:"難易度",el:<select style={{width:"100%",border:"1.5px solid #ccc",borderRadius:9,padding:"10px 12px",fontSize:14,background:"#fff",fontFamily:"inherit",boxSizing:"border-box",marginBottom:10}} value={newN.level} onChange={e=>setNewN(n=>({...n,level:e.target.value}))}>{["かんたん","ふつう","じっくり"].map(l=><option key={l}>{l}</option>)}</select>},
          {lb:"内容・手順・声かけのポイント",el:<textarea rows={5} style={{width:"100%",border:"1.5px solid #ccc",borderRadius:9,padding:"10px 12px",fontSize:13,fontFamily:"inherit",boxSizing:"border-box",resize:"vertical",marginBottom:10}} value={newN.desc} onChange={e=>setNewN(n=>({...n,desc:e.target.value}))} placeholder="進め方・準備物・声かけのポイントを書いてください" />},
        ].map(({lb,el})=><div key={lb}><div style={{fontSize:12,fontWeight:700,color:"#444",marginBottom:3}}>{lb}</div>{el}</div>)}
        <div style={{display:"flex",gap:9}}>
          <button onClick={saveNew} disabled={!newN.title.trim()} style={S.btn(newN.title.trim()?"#2d5a3d":"#aaa")}>保存</button>
          <button onClick={()=>setShowAdd(false)} style={S.btn("#ccc",true)}>キャンセル</button>
        </div>
      </div>
    </div>
  );

  const sT={fontSize:15,fontWeight:900,color:"#2d5a3d",marginBottom:10};
  const fBar={display:"flex",gap:7,overflowX:"auto",paddingBottom:8,marginBottom:12};
  const fBtn=(a)=>({padding:"6px 13px",borderRadius:20,border:a?"2px solid #2d5a3d":"2px solid #ddd",background:a?"#2d5a3d":"#fff",color:a?"#fff":"#555",fontSize:11,fontWeight:a?700:400,cursor:"pointer",whiteSpace:"nowrap"});
  const empty={textAlign:"center",color:"#bbb",fontSize:13,padding:"36px 0"};
  const inp={width:"100%",border:"1.5px solid #ccc",borderRadius:9,padding:"9px 12px",fontSize:14,background:"#fff",fontFamily:"inherit",boxSizing:"border-box"};

  // ── PAGES ──
  const Home=()=>(
    <div style={{padding:"14px 14px 0"}}>
      <div style={{background:"linear-gradient(135deg,#2d5a3d,#4a8c5c)",borderRadius:14,padding:"16px 18px",marginBottom:16,color:"#fff",boxShadow:"0 3px 14px rgba(45,90,61,0.3)"}}>
        <div style={{fontSize:12,color:"#c8e6d0",marginBottom:3}}>今日のレク準備をはじめましょう</div>
        <div style={{fontSize:22,fontWeight:900,marginBottom:7}}>🌿 {todayInfo.label}</div>
        <div style={{fontSize:11,color:"#a8d4b5"}}>登録ネタ数：<b style={{color:"#fff"}}>{neta.length}件</b>　きくやオリジナル：<b style={{color:"#f4c430"}}>15件</b></div>
      </div>

      <div style={sT}>🤖 AIが今日のプランを提案</div>
      <div style={{background:"#fff",borderRadius:14,marginBottom:16,boxShadow:"0 1px 5px rgba(0,0,0,0.07)"}}>
        <div style={{padding:14}}>
          <div style={{display:"flex",gap:9,marginBottom:10}}>
            <div style={{flex:1}}>
              <div style={{fontSize:11,fontWeight:700,color:"#444",marginBottom:3}}>合計時間（分）</div>
              <select style={inp} value={aiCond.time} onChange={e=>setAiCond(a=>({...a,time:e.target.value}))}>
                {["15","20","30","45","60"].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:11,fontWeight:700,color:"#444",marginBottom:3}}>参加人数</div>
              <select style={inp} value={aiCond.members} onChange={e=>setAiCond(a=>({...a,members:e.target.value}))}>
                {["5","8","10","15","20"].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div style={{fontSize:11,fontWeight:700,color:"#444",marginBottom:3}}>テーマ・希望（任意）</div>
          <input style={{...inp,marginBottom:11}} value={aiCond.theme} onChange={e=>setAiCond(a=>({...a,theme:e.target.value}))} placeholder="例：笑いを引き出したい、体を動かしたい" />
          <button onClick={handleAI} disabled={aiLoading} style={{...S.btn(aiLoading?"#aaa":"#2d5a3d"),width:"100%",padding:"12px",fontSize:14}}>
            {aiLoading?"⏳ 提案中...":"✨ 今日のプランを提案してもらう"}
          </button>
          {aiResult&&<div style={{background:"#f0f8f2",border:"2px solid #4caf50",borderRadius:10,padding:14,marginTop:12,whiteSpace:"pre-wrap",fontSize:13,lineHeight:1.9,color:"#222"}}>{aiResult}</div>}
        </div>
      </div>

      <div style={sT}>🏅 きくやオリジナルネタ（{neta.filter(n=>n.orig).length}件）</div>
      {neta.filter(n=>n.orig).map(n=><Card key={n.id} n={n}/>)}

      <div style={{...sT,marginTop:8}}>🗓 今月のおすすめネタ（{curMonth}月）</div>
      {neta.filter(n=>n.months.includes(curMonth)).length===0
        ?<div style={empty}>今月の季節ネタはありません</div>
        :neta.filter(n=>n.months.includes(curMonth)).map(n=><Card key={n.id} n={n}/>)
      }
    </div>
  );

  const NetaList=()=>(
    <div style={{padding:"14px 14px 0"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <div style={sT}>📚 ネタ一覧（{filtered.length}件）</div>
        <button onClick={()=>setShowAdd(true)} style={{...S.btn("#2d5a3d"),fontSize:12,padding:"7px 14px"}}>＋ 追加</button>
      </div>
      <div style={fBar}>{CATEGORIES.map(c=><button key={c} style={fBtn(filterCat===c)} onClick={()=>setFilterCat(c)}>{c}</button>)}</div>
      {filtered.length===0?<div style={empty}>ネタが見つかりません</div>:filtered.map(n=><Card key={n.id} n={n}/>)}
    </div>
  );

  const NannohiPage=()=>{
    const data=nhTab==="today"?nannohi.today:nannohi.tomorrow;
    return(
      <div style={{padding:"14px 14px 0"}}>
        <div style={sT}>📅 今日・明日は何の日？</div>
        <div style={fBar}>
          <button style={fBtn(nhTab==="today")} onClick={()=>setNhTab("today")}>今日 {todayInfo.m}/{todayInfo.d}</button>
          <button style={fBtn(nhTab==="tomorrow")} onClick={()=>setNhTab("tomorrow")}>明日 {tomInfo.m}/{tomInfo.d}</button>
        </div>
        {!nannohi.today&&!nhLoading&&(
          <div style={{background:"#fff",borderRadius:14,padding:24,textAlign:"center",boxShadow:"0 1px 5px rgba(0,0,0,0.07)"}}>
            <div style={{fontSize:40,marginBottom:10}}>📖</div>
            <div style={{fontSize:13,color:"#666",marginBottom:16,lineHeight:1.7}}>今日と明日の記念日・雑学をAIが解説します。<br/>会話のきっかけにご活用ください。</div>
            <button onClick={fetchNH} style={{...S.btn("#2d5a3d"),padding:"12px 24px",fontSize:14}}>✨ 今日は何の日？を調べる</button>
          </div>
        )}
        {nhLoading&&<div style={{background:"#fff",borderRadius:14,padding:28,textAlign:"center"}}><div style={{fontSize:30,marginBottom:8}}>⏳</div><div style={{color:"#888",fontSize:13}}>調べています...</div></div>}
        {data&&!nhLoading&&(
          <div>
            <div style={{fontSize:12,color:"#2d5a3d",fontWeight:700,marginBottom:9}}>📅 {data.date}</div>
            {data.items?.map((item,i)=>(
              <div key={i} style={{background:"#fff",borderRadius:14,marginBottom:10,boxShadow:"0 1px 5px rgba(0,0,0,0.07)",overflow:"hidden"}}>
                <div style={{background:"linear-gradient(135deg,#2d5a3d,#4a8c5c)",padding:"9px 14px",display:"flex",alignItems:"center",gap:9}}>
                  <span style={{fontSize:24}}>{item.emoji}</span>
                  <span style={{fontSize:14,fontWeight:900,color:"#fff"}}>{item.name}</span>
                </div>
                <div style={{padding:"13px 14px",fontSize:13,color:"#333",lineHeight:1.9}}>{item.desc}</div>
              </div>
            ))}
            {data.kaiwa&&(
              <div style={{background:"#fffbea",border:"2px solid #f4c430",borderRadius:12,padding:"12px 14px",marginBottom:12}}>
                <div style={{fontSize:11,fontWeight:900,color:"#b8860b",marginBottom:5}}>💬 会話のきっかけフレーズ</div>
                <div style={{fontSize:13,color:"#444",lineHeight:1.8,fontStyle:"italic"}}>「{data.kaiwa}」</div>
              </div>
            )}
            <button onClick={fetchNH} style={{...S.btn("#aaa",true),width:"100%",marginBottom:14,fontSize:12}}>🔄 もう一度調べる</button>
          </div>
        )}
      </div>
    );
  };

  const SessionPage=()=>(
    <div style={{padding:"14px 14px 0"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <div style={sT}>📋 マイセッション（{session.length}件）</div>
        {session.length>0&&<button onClick={()=>{setPresenting(true);setPresIdx(0);}} style={{...S.btn("#e07b39"),fontSize:13,padding:"8px 16px"}}>▶ 開始</button>}
      </div>
      {session.length>0&&<div style={{background:"#e8f5ec",borderRadius:9,padding:"9px 13px",marginBottom:12,fontSize:12,color:"#2d5a3d",fontWeight:700}}>合計時間：{session.reduce((s,id)=>{const n=neta.find(x=>x.id===id);return s+(n?.time||0);},0)}分</div>}
      {session.length===0?<div style={empty}>セッションは空です{"\n"}ネタ一覧から「＋ セッション」で追加できます</div>
        :session.map((id,idx)=>{
          const n=neta.find(x=>x.id===id);if(!n)return null;
          return(
            <div key={id} style={{background:"#fff",borderRadius:10,padding:"11px 13px",marginBottom:8,display:"flex",alignItems:"center",gap:9,boxShadow:"0 1px 4px rgba(0,0,0,0.07)"}}>
              <div style={{fontSize:16,fontWeight:900,color:"#ccc",width:24,textAlign:"center"}}>{idx+1}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700,color:"#222"}}>{n.title}</div>
                <div style={{fontSize:11,color:"#999"}}>{n.category}・{n.time}分・{n.level}</div>
              </div>
              <div style={{display:"flex",gap:5}}>
                <button onClick={()=>moveSess(idx,-1)} disabled={idx===0} style={{background:"#f0f0f0",border:"none",borderRadius:7,padding:"5px 9px",cursor:"pointer",fontSize:14,opacity:idx===0?0.3:1}}>▲</button>
                <button onClick={()=>moveSess(idx,1)} disabled={idx===session.length-1} style={{background:"#f0f0f0",border:"none",borderRadius:7,padding:"5px 9px",cursor:"pointer",fontSize:14,opacity:idx===session.length-1?0.3:1}}>▼</button>
                <button onClick={()=>remSess(id)} style={{background:"#fee",border:"none",borderRadius:7,padding:"5px 9px",cursor:"pointer",fontSize:14,color:"#e33"}}>✕</button>
              </div>
            </div>
          );
        })
      }
      {session.length>0&&<button onClick={()=>setSession([])} style={{...S.btn("#ccc",true),marginTop:6,width:"100%"}}>セッションをクリア</button>}
    </div>
  );

  const FavsPage=()=>(
    <div style={{padding:"14px 14px 0"}}>
      <div style={sT}>★ お気に入り（{favs.length}件）</div>
      {favs.length===0?<div style={empty}>お気に入りはまだありません{"\n"}カードの☆で登録できます</div>
        :neta.filter(n=>favs.includes(n.id)).map(n=><Card key={n.id} n={n}/>)}
    </div>
  );

  const TABS=[{id:"home",icon:"🏠",label:"ホーム"},{id:"nannohi",icon:"📅",label:"何の日"},{id:"neta",icon:"📚",label:"ネタ一覧"},{id:"session",icon:"📋",label:"セッション"},{id:"favs",icon:"★",label:"お気に入り"}];

  return(
    <div style={{minHeight:"100vh",background:"#f5f0e8",fontFamily:"'Noto Sans JP','Hiragino Sans',sans-serif",paddingBottom:78}}>
      <div style={{background:"#2d5a3d",padding:"12px 18px 10px",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 8px rgba(0,0,0,0.2)"}}>
        <div style={{fontSize:10,color:"#a8d4b5",letterSpacing:2,marginBottom:2}}>ホームケアセンターきくや デイサービス</div>
        <div style={{fontSize:19,fontWeight:900,color:"#fff",letterSpacing:1}}>🌿 レクリエーション手帳</div>
        <div style={{fontSize:11,color:"#c8e6d0",marginTop:2}}>{todayInfo.label}</div>
      </div>

      {tab==="home"&&<Home/>}
      {tab==="nannohi"&&<NannohiPage/>}
      {tab==="neta"&&<NetaList/>}
      {tab==="session"&&<SessionPage/>}
      {tab==="favs"&&<FavsPage/>}

      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:"1px solid #e0e0e0",display:"flex",zIndex:100,boxShadow:"0 -2px 6px rgba(0,0,0,0.07)"}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"9px 2px 7px",border:"none",background:tab===t.id?"#e8f5ec":"#fff",color:tab===t.id?"#2d5a3d":"#999",fontSize:9,fontWeight:tab===t.id?700:400,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <span style={{fontSize:20}}>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {detail&&<DetailModal/>}
      {showAdd&&<AddModal/>}
    </div>
  );
}

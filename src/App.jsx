import { useState } from "react";

const DAYS = ["日","月","火","水","木","金","土"];
const MONTHS_LABEL = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
const CATEGORIES = ["すべて","ゲーム・レク","クイズ","体操・運動","手遊び","ホワイトボード","歌・音楽","季節・行事","口腔機能","個別対応"];


// ── 体操動画データ ──
const TAISO_VIDEOS = [
  // ごぼう先生
  {id:"t1",channel:"ごぼう先生",title:"集団イス体操①",youtubeId:"7hft9YGyJyg",time:"約10分",desc:"座ったままできるイス体操。ごぼう先生と一緒に楽しく体を動かしましょう！"},
  {id:"t2",channel:"ごぼう先生",title:"集団イス体操②",youtubeId:"Qf2HdpjRBvQ",time:"約10分",desc:"座ったままできるイス体操その２。正しくより楽しくをモットーに！"},
  {id:"t3",channel:"ごぼう先生",title:"集団イス体操③",youtubeId:"n_2r0OBqJEY",time:"約10分",desc:"座ったままできるイス体操その３。できない方がいい！笑いながら体操しましょう。"},
  // 青空体育
  {id:"t4",channel:"青空体育",title:"歌脳トレ体操（春の歌）",youtubeId:"iuvSWR90-Js",time:"約40分",desc:"花・朧月夜・春よ来い・春が来た・故郷の歌に合わせた体操。作業療法士が監修。"},
  {id:"t5",channel:"青空体育",title:"歌脳トレ体操（童謡）",youtubeId:"dALNYqZpWbw",time:"約40分",desc:"どんぐりころころ・うさぎとかめ・かたつむりに合わせた楽しい歌体操。"},
  // ふくくる
  {id:"t6",channel:"ふくくる",title:"グーパー体操（脳トレ）",youtubeId:"1xrbOejaMrs",time:"約5分",desc:"新井先生のじゃんけん体操。脳トレ・認知症予防・介護予防におすすめ。"},
];

// ── 歌データ（YouTube ID・歌詞・ジャンル） ──
const SONGS = [
  // 童謡・唱歌
  {id:"s1",genre:"童謡・唱歌",title:"ふるさと",youtubeId:"O3L_MBkyRTo",months:[],lyrics:`うさぎ　おいし　かの山
こぶな　釣りし　かの川
夢は　今もめぐりて
忘れがたき　ふるさと

いかにいます　父母
つつがなしや　友がき
雨に風につけても
思いいずる　ふるさと

こころざしを　はたして
いつの日にか　帰らん
山は青き　ふるさと
水は清き　ふるさと`},
  {id:"s2",genre:"童謡・唱歌",title:"春の小川",youtubeId:"8vfhSHGQ_8I",months:[3,4],lyrics:`春の小川は　さらさら行くよ
岸のすみれや　れんげの花に
すがたやさしく　色うつくしく
咲いているねと　ささやきながら

春の小川は　さらさら行くよ
えびやめだかや　こぶなの群れに
今日も一日　ひなたで泳いで
遊べ遊べと　ささやきながら`},
  {id:"s3",genre:"童謡・唱歌",title:"もみじ",youtubeId:"P7VT7jfBXnI",months:[10,11],lyrics:`秋の夕日に　照る山もみじ
濃いも薄いも　数ある中に
松をいろどる　楓や蔦は
山のふもとの　裾模様

渓の流れに　散り浮くもみじ
波に揺られて　離れて寄って
赤や黄色の　色さまざまに
水の上にも　織る錦`},
  {id:"s4",genre:"童謡・唱歌",title:"雪（ゆき）",youtubeId:"k4dNJOFKeaQ",months:[12,1,2],lyrics:`雪やこんこ　霰やこんこ
降っては降っては　ずんずん積もる
山も野原も　綿帽子かぶり
枯れ木残らず　花が咲く

雪やこんこ　霰やこんこ
降っても降っても　まだ降りやまぬ
犬は喜び　庭駆け回り
猫はこたつで　丸くなる`},
  {id:"s5",genre:"童謡・唱歌",title:"さくらさくら",youtubeId:"R2WARsDM3FQ",months:[3,4],lyrics:`さくら　さくら
やよいの空は　見わたす限り
霞か雲か　匂いぞ出ずる
いざや　いざや　見に行かん

さくら　さくら
野山も里も　見わたす限り
霞か雲か　朝日に匂う
さくら　さくら　花ざかり`},
  {id:"s6",genre:"童謡・唱歌",title:"たきび",youtubeId:"x8k7BVqS6jc",months:[11,12],lyrics:`かきねの　かきねの　まがりかど
たきびだ　たきびだ　おちばたき
「あたろうか」「あたろうよ」
きたかぜぴいぷう　ふいている

さざんか　さざんか　さいたみち
たきびだ　たきびだ　おちばたき
「あたろうか」「あたろうよ」
しもやけおててが　もうかゆい`},
  {id:"s7",genre:"童謡・唱歌",title:"花（すべての人の心に花を）",youtubeId:"fRSRgUCMHHk",months:[],lyrics:`泣きなさい　笑いなさい
いつの日か　いつの日か
花を咲かそうよ

泣きなさい　笑いなさい
いつの日か　いつの日か
花を咲かそうよ

人生の　並木道
ながながと　続くとも
夢を忘れず　歩き続ければ
きっといつか　花が咲く`},
  {id:"s8",genre:"童謡・唱歌",title:"故郷の空",youtubeId:"4LNK3FfarGE",months:[9,10],lyrics:`夕空晴れて　秋風吹き
月影落ちて　鈴虫鳴く
思えば遠し　故郷の空
ああ　わが父母　いかにおわす`},
  {id:"s23",genre:"童謡・唱歌",title:"赤とんぼ",youtubeId:"oyVYNaRDFk8",months:[9,10],lyrics:`夕焼け小焼けの　赤とんぼ
負われて見たのは　いつの日か

山の畑の　桑の実を
小籠に摘んだは　まぼろしか

十五で姉やは　嫁に行き
お里のたよりも　絶えはてた

夕焼け小焼けの　赤とんぼ
とまっているよ　竿の先`},
  {id:"s24",genre:"童謡・唱歌",title:"七つの子",youtubeId:"PI7GCpABMGA",months:[],lyrics:`烏　なぜ鳴くの
烏は山に
かわいい七つの
子があるからよ

かわいかわいと
烏は鳴くの
かわいかわいと
鳴くんだよ

山の古巣に
帰って見れば
かわいい七つの
子がいるからよ`},
  {id:"s25",genre:"童謡・唱歌",title:"朧月夜",youtubeId:"dRNpCEpJBRE",months:[3,4],lyrics:`菜の花畠に　入り日薄れ
見わたす山の端　霞ふかし
春風そよふく　空を見れば
夕月かかりて　匂い淡し

里わの火影も　森の色も
田中の小路を　たどる人も
蛙のなくねも　鐘の音も
さながら霞める　朧月夜`},
  {id:"s26",genre:"童謡・唱歌",title:"浜辺の歌",youtubeId:"tVPLPCPDpEg",months:[7,8],lyrics:`あした浜辺を　さまよえば
昔のことぞ　しのばるる
風の音よ　雲のさまよ
寄する波も　かえる波も

ゆうべ浜辺を　もとおれば
昔の人ぞ　しのばるる
寄する波よ　かえる波よ
月の色も　星のかげも`},
  {id:"s27",genre:"童謡・唱歌",title:"村の鍛冶屋",youtubeId:"gOSc4pXS8NQ",months:[],lyrics:`しばしも休まず　槌打つ響き
飛び散る火の花　はしる湯玉
ふいごの風さえ　息をもつがず
仕事に精出す　村の鍛冶屋

ワッショイ　ワッショイ　ワッショイ
槌と響け　歌声高く
ワッショイ　ワッショイ　ワッショイ
働く男は　勇ましいな`},
  {id:"s28",genre:"童謡・唱歌",title:"茶摘み",youtubeId:"e3KBGFbXKo0",months:[5],lyrics:`夏も近づく　八十八夜
野にも山にも　若葉が茂る
あれに見えるは　茶摘みじゃないか
あかねだすきに　菅の笠

日和つづきの　今日このごろを
心のどかに　摘みつつ歌う
摘めよ摘め摘め　摘まねばならぬ
摘まにゃ日本の　茶にならぬ`},
  {id:"s29",genre:"童謡・唱歌",title:"虫のこえ",youtubeId:"BFlvlpGMPpg",months:[9,10],lyrics:`あれ松虫が　鳴いている
ちんちろちんちろ　ちんちろりん
あれ鈴虫も　鳴き出した
りんりんりんりん　りいんりん
秋の夜長を　鳴き通す
ああおもしろい　虫のこえ

くつわ虫また　ガチャガチャと
きりきりきりきり　きりぎりす
ずいずいずいずい　ずいむし
ちょんちょんちょんちょん　すいっちょん
秋の夜長を　鳴き通す
ああおもしろい　虫のこえ`},
  {id:"s30",genre:"童謡・唱歌",title:"夕焼け小焼け",youtubeId:"rEaWFRmNK0k",months:[],lyrics:`夕焼け小焼けで　日が暮れて
山のお寺の　鐘が鳴る
お手々つないで　みな帰ろ
烏と一緒に　帰りましょ

子供が帰った　後からは
丸い大きな　お月様
小鳥が夢を　見る頃は
空にはきらきら　金の星`},
  {id:"s31",genre:"童謡・唱歌",title:"われは海の子",youtubeId:"Vt-jVVK4GxQ",months:[7,8],lyrics:`われは海の子　白波の
さわぐいそべの　松原に
煙たなびく　とまやこそ
わが懐かしき　住家なれ

生まれてしおに　ゆあみして
波を子守の　歌と聞き
千里浜辺を　走り回り
海のあなたを　慕いたり`},
  {id:"s32",genre:"童謡・唱歌",title:"どんぐりころころ",youtubeId:"4OlFiowYMEk",months:[10,11],lyrics:`どんぐりころころ　どんぶりこ
お池にはまって　さあ大変
どじょうが出てきて　今日は
坊ちゃん一緒に　遊びましょ

どんぐりころころ　よろこんで
しばらく一緒に　遊んだが
やっぱりお山が　恋しいと
泣いてはどじょうを　困らせた`},
  {id:"s33",genre:"童謡・唱歌",title:"叱られて",youtubeId:"MuIYaGVVPpo",months:[],lyrics:`叱られて　叱られて
あの子は町まで　お使いに
この子は坊やを　ねんねしな
夕べさみしい　村はずれ
叱られて　叱られて

叱られて　叱られて
あの子と二人で　泣いたっけ
手をつなぎながら　かえる道
夕焼け雲が　赤かった
叱られて　叱られて`},
  {id:"s34",genre:"童謡・唱歌",title:"椰子の実",youtubeId:"jPCEIrNBLog",months:[7,8],lyrics:`名も知らぬ　遠き島より
流れ寄る　椰子の実一つ
故郷の岸を　離れて
汝はそも　波に幾月

旧の木は　生いや茂れる
枝はなお　影をやなせる
われもまた　渚を枕
孤身の　浮き寝の旅ぞ`},
  {id:"s35",genre:"童謡・唱歌",title:"冬の夜",youtubeId:"UYKLgIiPpew",months:[12,1,2],lyrics:`燈火近く　衣縫う母は
春の遊びの　楽しさ語る
囲炉裏火は　とろとろ
外は吹雪

囲炉裏火は　とろとろ
外は吹雪

父は話す　御国のことを
子供心にも　嬉し聞きぬ
囲炉裏火は　とろとろ
外は吹雪`},

  // 昭和歌謡
  {id:"s9",genre:"昭和歌謡",title:"青い山脈",youtubeId:"dv3sEHOJgAQ",months:[],lyrics:`若く　明るい　歌声に
雪崩は消える　花も咲く
青い山脈　雪割桜
空のはて　あこがれの旅へ

青い山脈　花咲く峰の
いのち　一つに　息づいてゆく`},
  {id:"s10",genre:"昭和歌謡",title:"リンゴの唄",youtubeId:"zRo_XGBIJHE",months:[],lyrics:`赤いリンゴに　口びるよせて
だまって見ている　青い空
リンゴはなんにも　いわないけれど
リンゴの気持は　よくわかる

リンゴ可愛や　可愛やリンゴ`},
  {id:"s11",genre:"昭和歌謡",title:"東京ブギウギ",youtubeId:"iNVBLmPCdnc",months:[],lyrics:`東京ブギウギ　リズムうきうき
心ずきずき　わくわく
東京ブギウギ　恋のメロディ
心ずきずき　わくわく

忘れちゃいやよ　東京ブギウギ
それはよかった　よかったわいな`},
  {id:"s12",genre:"昭和歌謡",title:"高校三年生",youtubeId:"C24dNUQXTaA",months:[],lyrics:`制服の　胸のボタンを
君がほしいと　言ったとき
なんで素直に　あげられなかった
恥ずかしかった　あの頃の
なつかしき　我が青春
ああ　高校三年生`},
  {id:"s13",genre:"昭和歌謡",title:"知床旅情",youtubeId:"ybqnJUQ0pGA",months:[],lyrics:`知床の岬に　はまなすの咲くころ
思い出しておくれ　俺たちのことを
飲んで　騒いで　丘に登れば
はるかに国後が　霞んで見える

旅の情けか　酔うほどに
君のことを　想い出す`},
  {id:"s14",genre:"昭和歌謡",title:"上を向いて歩こう",youtubeId:"lS_JTqiCQJw",months:[],lyrics:`上を向いて歩こう
涙がこぼれないように
泣きながら歩く　一人ぼっちの夜

上を向いて歩こう
にじんだ星をかぞえて
思い出す　春の日
一人ぼっちの夜`},
  {id:"s15",genre:"昭和歌謡",title:"花笠音頭",youtubeId:"5wWRpVFuJtY",months:[8],lyrics:`ヤッショ　マカショ
花の山形　紅葉の天童
なせば成るなる　花笠踊り
ヤッショ　マカショ

めでた　めでたの　若松様よ
枝も栄える　葉も繁る`},
  {id:"s36",genre:"昭和歌謡",title:"南国土佐を後にして",youtubeId:"6DSQT8XqBPw",months:[],lyrics:`土佐の高知の　はりまや橋で
坊さんかんざし　買うを見た
よさこいよさこい

坊さんかんざし　買うを見た
見よや土佐路の　春の空
桂浜辺に　打ち寄せる
太平洋の　波の音`},
  {id:"s37",genre:"昭和歌謡",title:"北国の春",youtubeId:"3nRa6RqITqw",months:[3,4],lyrics:`白樺　青空　南風
こぶし咲く　あの丘　北国の
ああ　北国の春

季節が都会ではわからないだろと
届いた　便りに　書いてあった

あの人は　今ごろ　どうしてるかな`},
  {id:"s38",genre:"昭和歌謡",title:"川の流れのように",youtubeId:"i0vMqB3TIAU",months:[],lyrics:`知らず知らず歩いてきた
細く長いこの道
振り返れば遥か遠く
故郷が見える

ああ　川の流れのように
ゆるやかに
いくつも時代は過ぎて
ああ　川の流れのように
とめどなく
空が黄昏に染まるだけ`},
  {id:"s39",genre:"昭和歌謡",title:"三百六十五歩のマーチ",youtubeId:"Vr3R7cOF1A4",months:[],lyrics:`幸せは歩いてこない
だから歩いて行くんだね
一日一歩　三日で三歩
三歩進んで　二歩さがる

人生はワンツーパンチ
汗かきベソかき　歩こうよ
あなたのつけた　足跡にゃ
きれいな花が　咲くでしょう`},
  {id:"s40",genre:"昭和歌謡",title:"星影のワルツ",youtubeId:"Ew3OP6RoNgE",months:[],lyrics:`別れることは　つらいけど
仕方がないんだ　君のため
別れに星影の　ワルツを歌おう
二人で歌った　あの歌を

泣かないでほしい　泣かないで
涙が胸に染みてくる
さよならさよならと　繰り返すうちに
夜が明けそうな　気がしてくる`},
  {id:"s41",genre:"昭和歌謡",title:"お座敷小唄",youtubeId:"TBbhDUXeNSU",months:[],lyrics:`富士の高嶺に　降る雪も
京都先斗町に　降る雪も
雪に変わりは　ないじゃなし
溶けて流れりゃ　みな同じ

花を持ちたや　手に持ちたや
花の都の　真ん中で
咲いた笑顔の　その中に
一つ欲しいな　あの笑顔`},
  {id:"s42",genre:"昭和歌謡",title:"東京音頭",youtubeId:"fvbXLJECaAY",months:[8],lyrics:`ハァ踊り踊るなら　チョイト
東京音頭　ヨイヨイ
花の都の　真ん中で　アー　ソレ

ヨイヨイヨイヨイ　踊り踊れば
夏の夜風に　チョイト
服もほころびよ　ヨイヨイ`},
  {id:"s43",genre:"昭和歌謡",title:"王将",youtubeId:"dEuoVTF0UMI",months:[],lyrics:`吹けば飛ぶよな　将棋の駒に
賭けた命を　笑わば笑え
明日は東京に出るからは
なにがなんでも　勝たねばならぬ

おれの命は　天下の棋士よ
風が吹いても　雨が降っても`},
  {id:"s44",genre:"昭和歌謡",title:"矢切の渡し",youtubeId:"OyVWLguROhc",months:[],lyrics:`つれて逃げてよ　ついておいでよ
夕ぐれの雨が降る　矢切の渡し

チャラチャラ流れる　江戸川べりに
野菊の墓を　見ていたら
帰れなくなった　この私を
矢切の渡しで　連れてって`},
  {id:"s45",genre:"昭和歌謡",title:"なごり雪",youtubeId:"vFfNiMJJ0kE",months:[2,3],lyrics:`汽車を待つ君の横で　僕は
時計を気にしてる
季節はずれの雪が降ってる
東京で見る雪は　これが最後ねと
君がつぶやく

なごり雪も降るときを知り
ふざけすぎた季節の　あとで`},
  {id:"s46",genre:"昭和歌謡",title:"悲しい酒",youtubeId:"kXjSZSsHVSs",months:[],lyrics:`一人酒場で　飲む酒は
別れ涙の　味がする
飲んで棄てたい　面影が
飲めば浮かんで　くるものを

ああ　ままよ　三味線弾けよ
どうせ私は　なきがらよ`},
  {id:"s47",genre:"昭和歌謡",title:"岸壁の母",youtubeId:"pxJCXuFPFRU",months:[],lyrics:`母は来ました　今日も来た
この岸壁に　今日も来た
とどかぬ想いと　知りながら
もしかしたらと　また来た

石にしがみつき　泣きました
あの子の名前を　呼びました`},
  {id:"s48",genre:"昭和歌謡",title:"高原列車は行く",youtubeId:"5xJNk0MHVCU",months:[5,6],lyrics:`汽車の窓から　ハンカチ振れば
牧場の乙女が　花束投げた
明るい青空　白樺林
山越え谷越え　はるばると
高原列車は　行くよ　パッポ　パッポ`},
  {id:"s49",genre:"昭和歌謡",title:"バラが咲いた",youtubeId:"CKMzGJfOJiI",months:[5,6],lyrics:`バラが咲いた　バラが咲いた
真っ赤なバラが
淋しかった僕の庭に
バラが咲いた

こんなに心がなぐさめられるとは
思ってもみなかった
バラが咲いた　バラが咲いた
真っ赤なバラが`},

  // 民謡
  {id:"s16",genre:"民謡",title:"炭坑節",youtubeId:"iUMmPZ1seBM",months:[8],lyrics:`月が出た出た　月が出た
ヨイヨイ
三池炭坑の　上に出た
あまり煙突が　高いので
さぞやお月さん　煙たかろ
サノヨイヨイ`},
  {id:"s17",genre:"民謡",title:"花笠音頭（山形）",youtubeId:"VZchAVdMgHE",months:[],lyrics:`ヤッショ　マカショ
めでた　めでたの　若松様よ
枝も栄える　葉も繁る
弥栄え　弥栄えと　祝おうよ
ヤッショ　マカショ`},
  {id:"s18",genre:"民謡",title:"ソーラン節",youtubeId:"T5t3ww5bV5A",months:[],lyrics:`ヤーレン　ソーラン　ソーラン
ソーラン　ソーラン（ハイハイ）
鰊来たかと　鴎に問えば
私ゃ立つ鳥　波に聞け
ヤサ　エンヤーサーノ
どっこいしょ`},

  // 季節の歌
  {id:"s19",genre:"季節の歌",title:"われは海の子",youtubeId:"Vt-jVVK4GxQ",months:[7,8],lyrics:`われは海の子　白波の
さわぐいそべの　松原に
煙たなびく　とまやこそ
わが懐かしき　住家なれ

生まれてしおに　ゆあみして
波を子守の　歌と聞き
千里浜辺を　走り回り
海のあなたを　慕いたり`},
  {id:"s20",genre:"季節の歌",title:"たなばたさま",youtubeId:"GwR5Mj9kOeQ",months:[7],lyrics:`ささの葉　さらさら
のきばに　ゆれる
お星さま　きらきら
きんぎん　砂子

五しきの短冊　わたしが書いた
お星さま　きらきら
空から　見てる`},
  {id:"s21",genre:"季節の歌",title:"お正月",youtubeId:"BEYSukU-KDk",months:[1],lyrics:`もういくつねると　お正月
お正月には　たこあげて
こまを回して　遊びましょ
早く来い来い　お正月`},
  {id:"s22",genre:"季節の歌",title:"冬景色",youtubeId:"JqOEDLPsmXc",months:[12,1,2],lyrics:`さ霧消ゆる　湊江の
舟に白し　朝の霜
ただ水鳥の　声はして
いまだ覚めず　岸の家

烏啼きて　木に高く
人は畑に　麦を踏む
げに小春日の　のどけしや
かえり咲きの　花も見ゆ`},
];

const SONG_GENRES = ["すべて","童謡・唱歌","昭和歌謡","民謡","季節の歌"];
const SONG_MONTHS_FILTER = ["すべて","1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

// ── レクネタデータ ──
const NETA_DATA = [
  {id:101,orig:true,title:"新聞丸めてドン！",category:"ゲーム・レク",time:15,level:"かんたん",months:[],desc:"新聞紙で作った箱に、丸めた新聞紙ボールをより多く入れたチームの勝ち！\n\n【準備】新聞紙・段ボール箱\n【効果】上肢機能・競争心・盛り上がり\n【声かけ例】「どんどん丸めて投げちゃってください！」"},
  {id:102,orig:true,title:"茶摘みゲーム",category:"ゲーム・レク",time:15,level:"ふつう",months:[5],desc:"お茶の葉に見立てた点数付き紙コップを、洗濯ばさみやロボットアームで掴んで合計点を競う。\n\n【準備】点数を書いた紙コップ・洗濯ばさみ\n【効果】手指の巧緻性・集中力・達成感"},
  {id:103,orig:true,title:"紙コップタワー崩し",category:"ゲーム・レク",time:15,level:"かんたん",months:[],desc:"紙飛行機を作って積み上げた紙コップに投げ、倒れた数を競うゲーム。\n\n【準備】紙コップ・折り紙または普通紙\n【効果】上肢機能・集中力・創造性"},
  {id:104,orig:true,title:"風船パレー（単語当て）",category:"ゲーム・レク",time:15,level:"かんたん",months:[],desc:"30秒〜1分間、風船を落とさずに打ち合いながら、風船に書かれた単語を当てるゲーム。\n\n【準備】風船・マジック\n【効果】上肢機能・注意力・チームワーク"},
  {id:105,orig:true,title:"マルチタスク体操",category:"体操・運動",time:10,level:"ふつう",months:[],desc:"お題に合わせた振り付けを覚え、掛け声でお題が出たらその動きをする体操。\n\n【効果】注意力・反応速度・前頭前野の活性化"},
  {id:106,orig:true,title:"紙コップゴルフ",category:"ゲーム・レク",time:15,level:"ふつう",months:[],desc:"点数を書いた紙コップをテープで固定し、ピンポン玉を転がして合計点を競う。\n\n【準備】紙コップ・テープ・ピンポン玉\n【効果】集中力・手と目の協調性"},
  {id:107,orig:true,title:"ハエ叩きゲーム",category:"ゲーム・レク",time:15,level:"かんたん",months:[],desc:"テーブルに貼ったハエのイラストをハエ叩きで叩き、1分間で獲得した点数を競う。\n\n【効果】反応速度・集中力・上肢機能"},
  {id:108,orig:true,title:"犬猫脳トレ",category:"クイズ",time:8,level:"ふつう",months:[],desc:"「犬」と言ったら「ニャー」、「猫」と言ったら「ワン」と逆の鳴き声を答えるゲーム。\n\n【効果】認知機能・反応速度・前頭前野の活性化"},
  {id:109,orig:true,title:"お手玉都道府県クイズ",category:"クイズ",time:20,level:"ふつう",months:[],desc:"都道府県のヒントを出し、正解のカードにお手玉を投げて乗せるゲーム。\n\n【効果】記憶力・知識・上肢機能"},
  {id:110,orig:true,title:"野菜の重さ当てクイズ",category:"クイズ",time:15,level:"ふつう",months:[],desc:"複数の野菜を見て重さ順に並べてもらい、実際にはかりで量って正解を競う。\n\n【効果】判断力・推理力・生活知識の活性化"},
  {id:111,orig:true,title:"うちわでリレー",category:"ゲーム・レク",time:15,level:"かんたん",months:[7,8],desc:"お手玉や風船をうちわに乗せて端から端まで落とさず受け渡すチームゲーム。\n\n【効果】集中力・バランス感覚・チームワーク"},
  {id:112,orig:true,title:"紙飛行機飛ばし",category:"ゲーム・レク",time:15,level:"かんたん",months:[],desc:"各自で紙飛行機を作って決められたラインに向けて投げ、一番ラインに近い人が勝ち。\n\n【効果】手指の巧緻性・集中力・創造性"},
  {id:113,orig:true,title:"お手玉ぐらぐらゲーム",category:"手遊び",time:15,level:"ふつう",months:[],desc:"ラップの芯の上にトレーを置き、お手玉を1つずつ取っていき、トレーが落ちたら負け。\n\n【効果】集中力・手先の巧緻性・緊張感と笑い"},
  {id:114,orig:true,title:"棒サッカー",category:"ゲーム・レク",time:20,level:"ふつう",months:[],desc:"柔らかいボールと新聞紙棒を使って相手のゴールにボールを入れた数が多い方が勝ち。\n\n【効果】上肢機能・チームワーク・競争心"},
  {id:115,orig:true,title:"難読漢字クイズ＆お手玉",category:"クイズ",time:15,level:"ふつう",months:[],desc:"難読漢字の読みを4択で答え、正解のカードにお手玉を投げて乗せるゲーム。\n\n【例】蒲公英・海豚・向日葵・秋刀魚"},
  {id:1,orig:false,title:"椅子でラジオ体操",category:"体操・運動",time:10,level:"かんたん",months:[],desc:"椅子に座ったままできるラジオ体操アレンジ。\n\n【効果】筋力維持・血行促進"},
  {id:2,orig:false,title:"タオル体操",category:"体操・運動",time:10,level:"かんたん",months:[],desc:"タオルを使って座ったまま全身を動かす体操。\n\n【効果】上半身の柔軟性・筋力維持"},
  {id:3,orig:false,title:"パタカラ体操",category:"口腔機能",time:5,level:"かんたん",months:[],desc:"「パ・タ・カ・ラ」と繰り返す口腔機能訓練。誤嚥予防・滑舌改善に効果的。\n\n【効果】口腔機能向上・誤嚥予防"},
  {id:4,orig:false,title:"顔じゃんけん",category:"口腔機能",time:5,level:"かんたん",months:[],desc:"グー（口をすぼめる）・チョキ（舌を出す）・パー（大きく口を開ける）で顔じゃんけん。\n\n【効果】口腔・表情筋の運動"},
  {id:5,orig:false,title:"昭和歌謡クイズ",category:"クイズ",time:10,level:"ふつう",months:[],desc:"昭和30〜50年代の歌謡曲の歌詞穴埋めクイズ。\n\n【効果】長期記憶の活性化・感情の安定"},
  {id:6,orig:false,title:"なぞなぞ大会",category:"クイズ",time:15,level:"かんたん",months:[],desc:"シンプルななぞなぞを出題。笑いを引き出す楽しい雰囲気作りに最適。"},
  {id:7,orig:false,title:"後出しじゃんけん",category:"クイズ",time:8,level:"ふつう",months:[],desc:"スタッフの手を見てから「負ける」「勝つ」手を出すゲーム。\n\n【効果】前頭前野の活性化・反応速度"},
  {id:8,orig:false,title:"花の名前しりとり",category:"ホワイトボード",time:10,level:"ふつう",months:[],desc:"花の名前だけでしりとり。ホワイトボードに書きながら全員で進める。"},
  {id:9,orig:false,title:"川柳・穴埋めゲーム",category:"ホワイトボード",time:15,level:"ふつう",months:[],desc:"高齢者の日常をテーマにした川柳の一部を空欄にして考えてもらう。"},
  {id:10,orig:false,title:"季節の折り紙",category:"季節・行事",time:20,level:"ふつう",months:[3,4,5],desc:"春：桜・チューリップ。完成品を飾ることでやりがいアップ。"},
  {id:11,orig:false,title:"七夕かざり作り",category:"季節・行事",time:25,level:"ふつう",months:[7],desc:"短冊に願い事を書いて笹に飾る。昔の七夕の思い出話をしながら進める。"},
  {id:12,orig:false,title:"回想法（思い出トーク）",category:"個別対応",time:20,level:"かんたん",months:[],desc:"テーマに沿って昔の思い出を語ってもらう。\n\n【テーマ例】学生時代・子育て・好きだった食べ物"},
];

const CAT_COLORS={"ゲーム・レク":"#c8962d","クイズ":"#3a86c8","体操・運動":"#e07b39","手遊び":"#c84e8a","ホワイトボード":"#2d8a6e","歌・音楽":"#8a5db5","季節・行事":"#5dab3a","口腔機能":"#d94f70","個別対応":"#7a7a7a"};
const LEVEL_COLORS={"かんたん":"#4caf50","ふつう":"#ff9800","じっくり":"#f44336"};
const GENRE_COLORS={"童謡・唱歌":"#5dab3a","昭和歌謡":"#c8962d","民謡":"#3a86c8","季節の歌":"#8a5db5"};

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
  // 歌関連
  const [songGenre,setSongGenre]=useState("すべて");
  const [songMonth,setSongMonth]=useState("すべて");
  const [selectedSong,setSelectedSong]=useState(null);
  const [showLyrics,setShowLyrics]=useState(false);

  const now=new Date();
  const todayInfo={m:now.getMonth()+1,d:now.getDate(),w:DAYS[now.getDay()],label:`${now.getMonth()+1}月${now.getDate()}日（${DAYS[now.getDay()]}）`};
  const tom=new Date(); tom.setDate(tom.getDate()+1);
  const tomInfo={m:tom.getMonth()+1,d:tom.getDate(),label:`${tom.getMonth()+1}月${tom.getDate()}日（${DAYS[tom.getDay()]}）`};
  const curMonth=now.getMonth()+1;

  const toggleFav=(id)=>setFavs(f=>f.includes(id)?f.filter(x=>x!==id):[...f,id]);
  const addSess=(id)=>{if(!session.includes(id))setSession(s=>[...s,id]);};
  const remSess=(id)=>setSession(s=>s.filter(x=>x!==id));
  const moveSess=(i,dir)=>{const a=[...session];const j=i+dir;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];setSession(a);};
  const openDetail=(id)=>{setDetail(id);setHist(h=>[{id,date:todayInfo.label},...h.filter(x=>x.id!==id)].slice(0,30));};

  const fetchNH=async()=>{
    setNhLoading(true);setNannohi({today:null,tomorrow:null});
    const p=`今日は${todayInfo.m}月${todayInfo.d}日、明日は${tomInfo.m}月${tomInfo.d}日です。デイサービスの朝のレクや会話のきっかけとして高齢者にわかりやすく教えてください。JSON形式のみで返してください（コードブロック不要）:{"today":{"date":"${todayInfo.m}月${todayInfo.d}日","items":[{"name":"記念日名","emoji":"絵文字1つ","desc":"2〜3文。昭和の思い出や季節感と絡めると◎"},{"name":"記念日名2","emoji":"絵文字","desc":"解説"}],"kaiwa":"スタッフが利用者さんに話しかける会話のきっかけフレーズ"},"tomorrow":{"date":"${tomInfo.m}月${tomInfo.d}日","items":[{"name":"記念日名","emoji":"絵文字","desc":"解説"}],"kaiwa":"明日の話題のきっかけフレーズ"}}`;
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
    const p=`あなたはデイサービスのレクリエーション担当スタッフです。今日は${todayInfo.label}。条件：合計${aiCond.time}分、参加人数${aiCond.members}名、テーマ：${aiCond.theme||"特になし"}\n利用可能なネタ：\n${list}\n\n## 今日のおすすめセッション（${aiCond.time}分）\n### 1.[ネタ名]（[時間]分）\n→ 進め方のポイント：〜\n（2〜4個提案）\n\n## 今日の声かけ例\n開始時：〜　盛り上げ：〜　締め：〜\n\n## スタッフへのひとこと`;
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

  const filteredNeta=neta.filter(n=>filterCat==="すべて"||n.category===filterCat);
  const presList=session.map(id=>neta.find(n=>n.id===id)).filter(Boolean);
  const detailN=neta.find(n=>n.id===detail);

  const filteredSongs=SONGS.filter(s=>{
    if(songGenre!=="すべて"&&s.genre!==songGenre)return false;
    if(songMonth!=="すべて"){const mi=SONG_MONTHS_FILTER.indexOf(songMonth);if(s.months.length>0&&!s.months.includes(mi))return false;}
    return true;
  });

  const inp={width:"100%",border:"1.5px solid #ccc",borderRadius:9,padding:"9px 12px",fontSize:14,background:"#fff",fontFamily:"inherit",boxSizing:"border-box"};
  const sT={fontSize:15,fontWeight:900,color:"#2d5a3d",marginBottom:10};
  const fBar={display:"flex",gap:7,overflowX:"auto",paddingBottom:8,marginBottom:12};
  const fBtn=(a)=>({padding:"6px 13px",borderRadius:20,border:a?"2px solid #2d5a3d":"2px solid #ddd",background:a?"#2d5a3d":"#fff",color:a?"#fff":"#555",fontSize:11,fontWeight:a?700:400,cursor:"pointer",whiteSpace:"nowrap"});
  const empty={textAlign:"center",color:"#bbb",fontSize:13,padding:"36px 0"};

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

  // ── 歌詞モーダル ──
  const LyricsModal=()=>{
    if(!selectedSong)return null;
    return(
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:200,display:"flex",alignItems:"flex-end"}} onClick={()=>{setSelectedSong(null);setShowLyrics(false);}}>
        <div style={{background:"#fff",width:"100%",maxHeight:"92vh",borderRadius:"20px 20px 0 0",overflowY:"auto",padding:0}} onClick={e=>e.stopPropagation()}>
          {/* ヘッダー */}
          <div style={{background:"#2d5a3d",padding:"14px 18px",borderRadius:"20px 20px 0 0",position:"sticky",top:0}}>
            <div style={{...S.badge(GENRE_COLORS[selectedSong.genre]||"#888"),marginBottom:6,fontSize:10}}>{selectedSong.genre}</div>
            <div style={{fontSize:20,fontWeight:900,color:"#fff"}}>{selectedSong.title}</div>
            <div style={{display:"flex",gap:10,marginTop:8}}>
              <button onClick={()=>setShowLyrics(false)} style={{...S.btn(showLyrics?"#fff":"rgba(255,255,255,0.3)",showLyrics),fontSize:12,padding:"5px 14px",color:showLyrics?"#2d5a3d":"#fff"}}>▶ YouTube</button>
              <button onClick={()=>setShowLyrics(true)} style={{...S.btn(!showLyrics?"#fff":"rgba(255,255,255,0.3)",!showLyrics),fontSize:12,padding:"5px 14px",color:!showLyrics?"#2d5a3d":"#fff"}}>📝 歌詞</button>
            </div>
          </div>

          <div style={{padding:"16px 18px"}}>
            {!showLyrics ? (
              // YouTube リンクボタン
              <div>
                <div style={{background:"#f8f8f8",borderRadius:14,padding:"28px 20px",textAlign:"center",marginBottom:14,border:"2px dashed #ddd"}}>
                  <div style={{fontSize:48,marginBottom:12}}>🎵</div>
                  <div style={{fontSize:18,fontWeight:900,color:"#222",marginBottom:6}}>{selectedSong.title}</div>
                  <div style={{fontSize:13,color:"#888",marginBottom:20}}>下のボタンをタップしてYouTubeで再生してください</div>
                  <a
                    href={`https://youtu.be/${selectedSong.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{display:"block",background:"#ff0000",color:"#fff",borderRadius:20,padding:"14px 20px",fontSize:18,fontWeight:900,textDecoration:"none",textAlign:"center",marginBottom:10}}
                  >
                    ▶ YouTubeで再生する
                  </a>
                  <div style={{fontSize:11,color:"#aaa"}}>※開かない場合はYouTubeで曲名を検索してください</div>
                </div>
                <button onClick={()=>setShowLyrics(true)} style={{...S.btn("#8a5db5"),width:"100%",padding:"12px",fontSize:14}}>📝 歌詞を表示する</button>
              </div>
            ) : (
              // 歌詞表示（大きな文字）
              <div>
                <div style={{background:"#f8fdf8",border:"2px solid #c8dcd0",borderRadius:14,padding:"20px 18px",marginBottom:14}}>
                  <div style={{fontSize:20,lineHeight:2.4,color:"#222",whiteSpace:"pre-wrap",fontWeight:500,letterSpacing:"0.05em"}}>{selectedSong.lyrics}</div>
                </div>
                <a
                  href={`https://youtu.be/${selectedSong.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{display:"block",background:"#ff0000",color:"#fff",borderRadius:20,padding:"12px 20px",fontSize:14,fontWeight:900,textDecoration:"none",textAlign:"center",marginBottom:10}}
                >
                  ▶ YouTubeで再生する
                </a>
              </div>
            )}
            <button onClick={()=>{setSelectedSong(null);setShowLyrics(false);}} style={{...S.btn("#ccc",true),width:"100%",marginTop:8,fontSize:13}}>閉じる</button>
          </div>
        </div>
      </div>
    );
  };

  // ── カード ──
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

  // ── DetailModal ──
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

  const AddModal=()=>(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:200,display:"flex",alignItems:"flex-end"}} onClick={()=>setShowAdd(false)}>
      <div style={{background:"#fff",width:"100%",maxHeight:"90vh",borderRadius:"20px 20px 0 0",overflowY:"auto",padding:20}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:18,fontWeight:900,color:"#2d5a3d",marginBottom:14}}>＋ ネタを追加</div>
        {[
          {lb:"タイトル",el:<input style={{...inp,marginBottom:10}} value={newN.title} onChange={e=>setNewN(n=>({...n,title:e.target.value}))} placeholder="例：風船バレー" />},
          {lb:"カテゴリ",el:<select style={{...inp,marginBottom:10}} value={newN.category} onChange={e=>setNewN(n=>({...n,category:e.target.value}))}>{CATEGORIES.filter(c=>c!=="すべて").map(c=><option key={c}>{c}</option>)}</select>},
          {lb:"所要時間（分）",el:<input type="number" style={{...inp,marginBottom:10}} value={newN.time} onChange={e=>setNewN(n=>({...n,time:Number(e.target.value)}))} />},
          {lb:"難易度",el:<select style={{...inp,marginBottom:10}} value={newN.level} onChange={e=>setNewN(n=>({...n,level:e.target.value}))}>{["かんたん","ふつう","じっくり"].map(l=><option key={l}>{l}</option>)}</select>},
          {lb:"内容・手順・声かけのポイント",el:<textarea rows={5} style={{...inp,resize:"vertical",marginBottom:10}} value={newN.desc} onChange={e=>setNewN(n=>({...n,desc:e.target.value}))} placeholder="進め方・準備物・声かけのポイントを書いてください" />},
        ].map(({lb,el})=><div key={lb}><div style={{fontSize:12,fontWeight:700,color:"#444",marginBottom:3}}>{lb}</div>{el}</div>)}
        <div style={{display:"flex",gap:9}}>
          <button onClick={saveNew} disabled={!newN.title.trim()} style={S.btn(newN.title.trim()?"#2d5a3d":"#aaa")}>保存</button>
          <button onClick={()=>setShowAdd(false)} style={S.btn("#ccc",true)}>キャンセル</button>
        </div>
      </div>
    </div>
  );

  // ── PAGES ──
  const Home=()=>(
    <div style={{padding:"14px 14px 0"}}>
      <div style={{background:"linear-gradient(135deg,#2d5a3d,#4a8c5c)",borderRadius:14,padding:"16px 18px",marginBottom:16,color:"#fff",boxShadow:"0 3px 14px rgba(45,90,61,0.3)"}}>
        <div style={{fontSize:12,color:"#c8e6d0",marginBottom:3}}>今日のレク準備をはじめましょう</div>
        <div style={{fontSize:22,fontWeight:900,marginBottom:7}}>🌿 {todayInfo.label}</div>
        <div style={{fontSize:11,color:"#a8d4b5"}}>登録ネタ数：<b style={{color:"#fff"}}>{neta.length}件</b>　歌・動画：<b style={{color:"#f4c430"}}>{SONGS.length}曲</b></div>
      </div>
      <div style={sT}>🤖 AIが今日のプランを提案</div>
      <div style={{background:"#fff",borderRadius:14,marginBottom:16,boxShadow:"0 1px 5px rgba(0,0,0,0.07)"}}>
        <div style={{padding:14}}>
          <div style={{display:"flex",gap:9,marginBottom:10}}>
            <div style={{flex:1}}><div style={{fontSize:11,fontWeight:700,color:"#444",marginBottom:3}}>合計時間（分）</div><select style={inp} value={aiCond.time} onChange={e=>setAiCond(a=>({...a,time:e.target.value}))}>{["15","20","30","45","60"].map(t=><option key={t}>{t}</option>)}</select></div>
            <div style={{flex:1}}><div style={{fontSize:11,fontWeight:700,color:"#444",marginBottom:3}}>参加人数</div><select style={inp} value={aiCond.members} onChange={e=>setAiCond(a=>({...a,members:e.target.value}))}>{["5","8","10","15","20"].map(t=><option key={t}>{t}</option>)}</select></div>
          </div>
          <div style={{fontSize:11,fontWeight:700,color:"#444",marginBottom:3}}>テーマ・希望（任意）</div>
          <input style={{...inp,marginBottom:11}} value={aiCond.theme} onChange={e=>setAiCond(a=>({...a,theme:e.target.value}))} placeholder="例：みんなで歌いたい、笑いを引き出したい" />
          <button onClick={handleAI} disabled={aiLoading} style={{...S.btn(aiLoading?"#aaa":"#2d5a3d"),width:"100%",padding:"12px",fontSize:14}}>{aiLoading?"⏳ 提案中...":"✨ 今日のプランを提案してもらう"}</button>
          {aiResult&&<div style={{background:"#f0f8f2",border:"2px solid #4caf50",borderRadius:10,padding:14,marginTop:12,whiteSpace:"pre-wrap",fontSize:13,lineHeight:1.9,color:"#222"}}>{aiResult}</div>}
        </div>
      </div>
      <div style={sT}>🎵 今月のおすすめ曲（{curMonth}月）</div>
      {SONGS.filter(s=>s.months.includes(curMonth)).length===0
        ?<div style={empty}>今月の季節の歌はありません</div>
        :SONGS.filter(s=>s.months.includes(curMonth)).map(s=>(
          <div key={s.id} style={{background:"#fff",borderRadius:14,marginBottom:10,boxShadow:"0 1px 5px rgba(0,0,0,0.07)",overflow:"hidden"}}>
            <div style={{background:GENRE_COLORS[s.genre]||"#888",padding:"7px 12px"}}>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.95)",fontWeight:700}}>{s.genre}</span>
            </div>
            <div style={{padding:"11px 13px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:16,fontWeight:700,color:"#222"}}>🎵 {s.title}</div>
              <button onClick={()=>{setSelectedSong(s);setShowLyrics(false);}} style={S.btn("#8a5db5")}>▶ 再生</button>
            </div>
          </div>
        ))
      }
    </div>
  );

  const SongsPage=()=>(
    <div style={{padding:"14px 14px 0"}}>
      <div style={sT}>🎵 懐メロ・唱歌（{filteredSongs.length}曲）</div>
      <div style={fBar}>{SONG_GENRES.map(g=><button key={g} style={fBtn(songGenre===g)} onClick={()=>setSongGenre(g)}>{g}</button>)}</div>
      {filteredSongs.length===0?<div style={empty}>該当する曲がありません</div>
        :filteredSongs.map(s=>(
          <div key={s.id} style={{background:"#fff",borderRadius:14,marginBottom:10,boxShadow:"0 1px 5px rgba(0,0,0,0.07)",overflow:"hidden"}}>
            <div style={{background:GENRE_COLORS[s.genre]||"#888",padding:"7px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.95)",fontWeight:700}}>{s.genre}</span>
              {s.months.length>0&&<span style={{fontSize:10,color:"rgba(255,255,255,0.8)"}}>🗓 {s.months.map(m=>m+"月").join("・")}</span>}
            </div>
            <div style={{padding:"12px 13px"}}>
              <div style={{fontSize:17,fontWeight:700,color:"#222",marginBottom:10}}>🎵 {s.title}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <button onClick={()=>{setSelectedSong(s);setShowLyrics(false);}} style={S.btn("#2d5a3d")}>▶ YouTube再生</button>
                <button onClick={()=>{setSelectedSong(s);setShowLyrics(true);}} style={S.btn("#8a5db5")}>📝 歌詞を見る</button>
              </div>
            </div>
          </div>
        ))
      }
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

  const NetaList=()=>(
    <div style={{padding:"14px 14px 0"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <div style={sT}>📚 ネタ一覧（{filteredNeta.length}件）</div>
        <button onClick={()=>setShowAdd(true)} style={{...S.btn("#2d5a3d"),fontSize:12,padding:"7px 14px"}}>＋ 追加</button>
      </div>
      <div style={fBar}>{CATEGORIES.map(c=><button key={c} style={fBtn(filterCat===c)} onClick={()=>setFilterCat(c)}>{c}</button>)}</div>
      {filteredNeta.length===0?<div style={empty}>ネタが見つかりません</div>:filteredNeta.map(n=><Card key={n.id} n={n}/>)}
    </div>
  );

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
                <div style={{fontSize:11,color:"#999"}}>{n.category}・{n.time}分</div>
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



  const TaisoPage=()=>{
    const [selectedTaiso,setSelectedTaiso]=useState(null);
    return(
      <div style={{padding:"14px 14px 0"}}>
        <div style={sT}>🏃 体操動画</div>
        <div style={{background:"#e8f5ec",border:"1.5px solid #a8d4b5",borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:12,color:"#2d5a3d",lineHeight:1.8}}>
          💪 座ったままできる体操動画です。<br/>タブレットでそのままYouTubeを開いて使えます！
        </div>

        {/* ごぼう先生 */}
        <div style={{fontSize:13,fontWeight:900,color:"#e07b39",marginBottom:8,marginTop:4}}>🥕 ごぼう先生のイス体操</div>
        {TAISO_VIDEOS.filter(v=>v.channel==="ごぼう先生").map(v=>(
          <div key={v.id} style={{background:"#fff",borderRadius:14,marginBottom:10,boxShadow:"0 1px 5px rgba(0,0,0,0.07)",overflow:"hidden"}}>
            <div style={{background:"linear-gradient(135deg,#e07b39,#f4a460)",padding:"8px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:12,color:"#fff",fontWeight:700}}>{v.channel}</span>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.9)"}}>{v.time}</span>
            </div>
            <div style={{padding:"12px 14px"}}>
              <div style={{fontSize:16,fontWeight:700,color:"#222",marginBottom:6}}>🏃 {v.title}</div>
              <div style={{fontSize:12,color:"#666",marginBottom:10,lineHeight:1.7}}>{v.desc}</div>
              <a href={`https://youtu.be/${v.youtubeId}`} target="_blank" rel="noopener noreferrer"
                style={{display:"block",background:"#ff0000",color:"#fff",borderRadius:10,padding:"11px 16px",textDecoration:"none",fontWeight:700,fontSize:14,textAlign:"center"}}>
                ▶ YouTubeで再生する
              </a>
            </div>
          </div>
        ))}

        {/* プレイリスト丸ごとボタン */}
        <div style={{background:"#fff3e0",border:"2px solid #e07b39",borderRadius:14,padding:"14px 16px",marginBottom:16}}>
          <div style={{fontSize:13,fontWeight:900,color:"#e07b39",marginBottom:6}}>📋 ごぼう先生のプレイリスト（全動画）</div>
          <div style={{fontSize:12,color:"#666",marginBottom:10}}>全シリーズをまとめて見られます</div>
          <a href="https://www.youtube.com/playlist?list=PL1m_GYYsK-f7CQICiwL4SMYBa8-PmuR9O" target="_blank" rel="noopener noreferrer"
            style={{display:"block",background:"#e07b39",color:"#fff",borderRadius:10,padding:"12px 16px",textDecoration:"none",fontWeight:700,fontSize:14,textAlign:"center"}}>
            ▶ プレイリスト全体を開く
          </a>
        </div>

        {/* 青空体育 */}
        <div style={{fontSize:13,fontWeight:900,color:"#2d5a3d",marginBottom:8,marginTop:4}}>🌤 青空体育の歌体操</div>
        {TAISO_VIDEOS.filter(v=>v.channel==="青空体育").map(v=>(
          <div key={v.id} style={{background:"#fff",borderRadius:14,marginBottom:10,boxShadow:"0 1px 5px rgba(0,0,0,0.07)",overflow:"hidden"}}>
            <div style={{background:"linear-gradient(135deg,#2d5a3d,#4a8c5c)",padding:"8px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:12,color:"#fff",fontWeight:700}}>{v.channel}</span>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.9)"}}>{v.time}</span>
            </div>
            <div style={{padding:"12px 14px"}}>
              <div style={{fontSize:16,fontWeight:700,color:"#222",marginBottom:6}}>🎵 {v.title}</div>
              <div style={{fontSize:12,color:"#666",marginBottom:10,lineHeight:1.7}}>{v.desc}</div>
              <a href={`https://youtu.be/${v.youtubeId}`} target="_blank" rel="noopener noreferrer"
                style={{display:"block",background:"#ff0000",color:"#fff",borderRadius:10,padding:"11px 16px",textDecoration:"none",fontWeight:700,fontSize:14,textAlign:"center"}}>
                ▶ YouTubeで再生する
              </a>
            </div>
          </div>
        ))}

        {/* ふくくる */}
        <div style={{fontSize:13,fontWeight:900,color:"#3a86c8",marginBottom:8,marginTop:4}}>🧠 ふくくるの脳トレ体操</div>
        {TAISO_VIDEOS.filter(v=>v.channel==="ふくくる").map(v=>(
          <div key={v.id} style={{background:"#fff",borderRadius:14,marginBottom:10,boxShadow:"0 1px 5px rgba(0,0,0,0.07)",overflow:"hidden"}}>
            <div style={{background:"linear-gradient(135deg,#3a86c8,#5ba3e0)",padding:"8px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:12,color:"#fff",fontWeight:700}}>{v.channel}</span>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.9)"}}>{v.time}</span>
            </div>
            <div style={{padding:"12px 14px"}}>
              <div style={{fontSize:16,fontWeight:700,color:"#222",marginBottom:6}}>🤜 {v.title}</div>
              <div style={{fontSize:12,color:"#666",marginBottom:10,lineHeight:1.7}}>{v.desc}</div>
              <a href={`https://youtu.be/${v.youtubeId}`} target="_blank" rel="noopener noreferrer"
                style={{display:"block",background:"#ff0000",color:"#fff",borderRadius:10,padding:"11px 16px",textDecoration:"none",fontWeight:700,fontSize:14,textAlign:"center"}}>
                ▶ YouTubeで再生する
              </a>
            </div>
          </div>
        ))}
        <div style={{height:16}}/>
      </div>
    );
  };

  const LinksPage=()=>(
    <div style={{padding:"14px 14px 0"}}>
      <div style={sT}>🌐 素材・参考サイト</div>
      <div style={{fontSize:12,color:"#888",marginBottom:14,lineHeight:1.7}}>
        タップするとサイトが開きます。塗り絵・脳活プリント・レクネタなどを無料でダウンロードできます。
      </div>

      {/* 介護レク広場 */}
      <div style={{background:"#fff",borderRadius:14,marginBottom:12,boxShadow:"0 1px 6px rgba(0,0,0,0.08)",overflow:"hidden"}}>
        <div style={{background:"linear-gradient(135deg,#e07b39,#f4a460)",padding:"10px 16px"}}>
          <div style={{fontSize:15,fontWeight:900,color:"#fff"}}>📥 介護レク広場</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.9)"}}>レク素材・レクネタの無料ダウンロードサイト</div>
        </div>
        <div style={{padding:"14px 16px"}}>
          <div style={{fontSize:13,color:"#444",marginBottom:12,lineHeight:1.8}}>
            塗り絵・脳活プリント・クロスワード・習字・工作など豊富な素材が揃っています。
            会員登録（無料）でダウンロードできます。
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <a href="https://www.kaigo-rec.com/" target="_blank" rel="noopener noreferrer"
              style={{display:"block",background:"#e07b39",color:"#fff",borderRadius:10,padding:"12px 16px",textDecoration:"none",fontWeight:700,fontSize:14,textAlign:"center"}}>
              🏠 トップページを開く
            </a>
            <a href="https://www.kaigo-rec.com/TRecreationMaterials/search?m_recreation_material_category_id%5B%5D=1&m_recreation_material_category_id%5B%5D=2&submit=%E6%A4%9C%E7%B4%A2" target="_blank" rel="noopener noreferrer"
              style={{display:"block",background:"#fff",color:"#e07b39",border:"2px solid #e07b39",borderRadius:10,padding:"10px 16px",textDecoration:"none",fontWeight:700,fontSize:13,textAlign:"center"}}>
              🎨 塗り絵一覧を開く
            </a>
            <a href="https://www.kaigo-rec.com/TRecreationMaterials/search?m_recreation_material_category_id%5B%5D=11&m_recreation_material_category_id%5B%5D=12&m_recreation_material_category_id%5B%5D=13&m_recreation_material_category_id%5B%5D=14&submit=%E6%A4%9C%E7%B4%A2" target="_blank" rel="noopener noreferrer"
              style={{display:"block",background:"#fff",color:"#3a86c8",border:"2px solid #3a86c8",borderRadius:10,padding:"10px 16px",textDecoration:"none",fontWeight:700,fontSize:13,textAlign:"center"}}>
              🧠 脳活・クイズ一覧を開く
            </a>
            <a href="https://www.kaigo-rec.com/TRecreationInformations/search" target="_blank" rel="noopener noreferrer"
              style={{display:"block",background:"#fff",color:"#5dab3a",border:"2px solid #5dab3a",borderRadius:10,padding:"10px 16px",textDecoration:"none",fontWeight:700,fontSize:13,textAlign:"center"}}>
              📋 レクネタ一覧を開く
            </a>
            <a href="https://www.kaigo-rec.com/MSpecials/movie" target="_blank" rel="noopener noreferrer"
              style={{display:"block",background:"#fff",color:"#c84e8a",border:"2px solid #c84e8a",borderRadius:10,padding:"10px 16px",textDecoration:"none",fontWeight:700,fontSize:13,textAlign:"center"}}>
              🎬 レク動画一覧を開く
            </a>
          </div>
        </div>
      </div>

      {/* みんなの介護 */}
      <div style={{background:"#fff",borderRadius:14,marginBottom:12,boxShadow:"0 1px 6px rgba(0,0,0,0.08)",overflow:"hidden"}}>
        <div style={{background:"linear-gradient(135deg,#3a86c8,#5ba3e0)",padding:"10px 16px"}}>
          <div style={{fontSize:15,fontWeight:900,color:"#fff"}}>📖 みんなの介護</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.9)"}}>介護レクのヒント・アイデア情報サイト</div>
        </div>
        <div style={{padding:"14px 16px"}}>
          <div style={{fontSize:13,color:"#444",marginBottom:12,lineHeight:1.8}}>
            レクリエーションのアイデアや進め方のヒントが豊富です。
            登録不要で閲覧できます。
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <a href="https://www.my-kaigo.com/pub/" target="_blank" rel="noopener noreferrer"
              style={{display:"block",background:"#3a86c8",color:"#fff",borderRadius:10,padding:"12px 16px",textDecoration:"none",fontWeight:700,fontSize:14,textAlign:"center"}}>
              🏠 トップページを開く
            </a>
            <a href="https://www.my-kaigo.com/pub/search/recreation/" target="_blank" rel="noopener noreferrer"
              style={{display:"block",background:"#fff",color:"#3a86c8",border:"2px solid #3a86c8",borderRadius:10,padding:"10px 16px",textDecoration:"none",fontWeight:700,fontSize:13,textAlign:"center"}}>
              🎯 レクリエーション記事を開く
            </a>
          </div>
        </div>
      </div>

      {/* 注意書き */}
      <div style={{background:"#fffbe6",border:"1.5px solid #f4c430",borderRadius:12,padding:"12px 14px",marginBottom:20}}>
        <div style={{fontSize:12,color:"#7a6000",lineHeight:1.8}}>
          💡 <b>ご注意</b><br/>
          介護レク広場の素材ダウンロードには無料の会員登録が必要です。<br/>
          各サイトの利用規約に従ってご使用ください。
        </div>
      </div>
    </div>
  );

  const TABS=[
    {id:"home",icon:"🏠",label:"ホーム"},
    {id:"songs",icon:"🎵",label:"懐メロ"},
    {id:"nannohi",icon:"📅",label:"何の日"},
    {id:"neta",icon:"📚",label:"ネタ一覧"},
    {id:"session",icon:"📋",label:"セッション"},
    {id:"taiso",icon:"🏃",label:"体操動画"},
    {id:"links",icon:"🌐",label:"素材サイト"},
  ];

  return(
    <div style={{minHeight:"100vh",background:"#f5f0e8",fontFamily:"'Noto Sans JP','Hiragino Sans',sans-serif",paddingBottom:78}}>
      <div style={{background:"#2d5a3d",padding:"12px 18px 10px",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 8px rgba(0,0,0,0.2)"}}>
        <div style={{fontSize:10,color:"#a8d4b5",letterSpacing:2,marginBottom:2}}>ホームケアセンターきくや デイサービス</div>
        <div style={{fontSize:19,fontWeight:900,color:"#fff",letterSpacing:1}}>🌿 レクリエーション手帳</div>
        <div style={{fontSize:11,color:"#c8e6d0",marginTop:2}}>{todayInfo.label}</div>
      </div>

      {tab==="home"&&<Home/>}
      {tab==="songs"&&<SongsPage/>}
      {tab==="nannohi"&&<NannohiPage/>}
      {tab==="neta"&&<NetaList/>}
      {tab==="session"&&<SessionPage/>}
      {tab==="taiso"&&<TaisoPage/>}
      {tab==="links"&&<LinksPage/>}

      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:"1px solid #e0e0e0",display:"flex",zIndex:100,boxShadow:"0 -2px 6px rgba(0,0,0,0.07)"}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"9px 2px 7px",border:"none",background:tab===t.id?"#e8f5ec":"#fff",color:tab===t.id?"#2d5a3d":"#999",fontSize:9,fontWeight:tab===t.id?700:400,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <span style={{fontSize:20}}>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {detail&&<DetailModal/>}
      {showAdd&&<AddModal/>}
      {selectedSong&&<LyricsModal/>}
    </div>
  );
}


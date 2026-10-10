// Auto-extracted from Phase-1 MVP index.html. Deterministic synthetic registry + risk engine.
// Do not hand-edit; re-run extract-modules.js.

const CURATED = [
{id:"SV-001",district:"Dhaka",upazila:"Savar",mouza:"Birulia",dag:"142",khatian:"RS-881",area:12.5,type:"Residential",owner:"Karim Uddin",
 chain:[{s:"CS",kh:"CS-112",owner:"Hazi Delwar Hossain",yr:1921},{s:"SA",kh:"SA-340",owner:"Delwar Hossain",yr:1958},{s:"RS",kh:"RS-881",owner:"Karim Uddin",yr:1989},{s:"BS",kh:"BS-2077",owner:"Karim Uddin",yr:2013}],
 sales:[{date:"1989-03-14",deed:"DL-1989-00312",seller:"Delwar Hossain (heirs)",buyer:"Karim Uddin",amount:850000,reg:true,mut:true},{date:"2013-06-02",deed:"—",seller:"—",buyer:"—",amount:0,reg:true,mut:true,note:"BS record update"}],
 docs:[{type:"Khatian (RS)",ref:"RS-881",hash:"c41d90ab12ef",ok:true},{type:"Khatian (BS)",ref:"BS-2077",hash:"77b2e10cd944",ok:true},{type:"Deed",ref:"DL-1989-00312",hash:"9f2c41be07d3",ok:true}],
 flags:{case:false,khas:false,acq:false},doubleSale:null,chainBreak:null},
{id:"SV-002",district:"Dhaka",upazila:"Savar",mouza:"Birulia",dag:"143",khatian:"RS-882",area:8.0,type:"Residential",owner:"Rahima Begum",
 chain:[{s:"CS",kh:"CS-113",owner:"Hazi Delwar Hossain",yr:1921},{s:"SA",kh:"SA-341",owner:"Delwar Hossain",yr:1958},{s:"RS",kh:"RS-882",owner:"Rahima Begum",yr:1994},{s:"BS",kh:"BS-2078",owner:"Rahima Begum",yr:2013}],
 sales:[{date:"1994-11-20",deed:"DL-1994-07881",seller:"Delwar Hossain (heirs)",buyer:"Rahima Begum",amount:620000,reg:true,mut:true}],
 docs:[{type:"Khatian (RS)",ref:"RS-882",hash:"a0b91cc437d1",ok:true},{type:"Deed",ref:"DL-1994-07881",hash:"51de883a0bc2",ok:true}],
 flags:{case:true,khas:false,acq:false},doubleSale:null,chainBreak:null},
{id:"SV-003",district:"Dhaka",upazila:"Savar",mouza:"Tetuljhora",dag:"88",khatian:"RS-410",area:22.0,type:"Commercial",owner:"Anwar Hossain",
 chain:[{s:"CS",kh:"CS-071",owner:"Jabbar Sheikh",yr:1922},{s:"SA",kh:"SA-198",owner:"Jabbar Sheikh",yr:1957},{s:"RS",kh:"RS-410",owner:"Mofizur Rahman",yr:1990},{s:"BS",kh:"BS-1190",owner:"Anwar Hossain",yr:2025}],
 sales:[{date:"2024-12-05",deed:"DL-2024-11802",seller:"Mofizur Rahman",buyer:"Belal Sheikh",amount:12500000,reg:true,mut:true},{date:"2025-08-19",deed:"DL-2025-14409",seller:"Belal Sheikh",buyer:"Anwar Hossain",amount:16900000,reg:true,mut:false}],
 docs:[{type:"Khatian (RS)",ref:"RS-410",hash:"e7c204af91b3",ok:true},{type:"Deed",ref:"DL-2024-11802",hash:"9f2c41be07d3",ok:true},{type:"Deed",ref:"DL-2025-14409",hash:"3bd0771c9e50",ok:true}],
 flags:{case:false,khas:false,acq:false},doubleSale:null,chainBreak:null},
{id:"SV-004",district:"Dhaka",upazila:"Savar",mouza:"Dhamsona",dag:"210",khatian:"RS-655",area:15.75,type:"Agricultural",owner:"Mofizur Rahman",
 chain:[{s:"CS",kh:"CS-203",owner:"Kashem Ali",yr:1920},{s:"SA",kh:"SA-512",owner:"Kashem Ali",yr:1959},{s:"RS",kh:"RS-655",owner:"Mofizur Rahman",yr:1991},{s:"BS",kh:"BS-1602",owner:"Mofizur Rahman",yr:2014}],
 sales:[{date:"2023-05-30",deed:"DL-2023-09177",seller:"Kashem Ali (heirs)",buyer:"Mofizur Rahman",amount:4800000,reg:true,mut:false}],
 docs:[{type:"Khatian (RS)",ref:"RS-655",hash:"f28a13de60c7",ok:true},{type:"Deed",ref:"DL-2023-09177",hash:"aa10c4d2f836",ok:true}],
 flags:{case:false,khas:false,acq:false},doubleSale:null,chainBreak:null},
{id:"SV-005",district:"Gazipur",upazila:"Kaliakair",mouza:"Chandra",dag:"41",khatian:"RS-302",area:30.0,type:"Industrial",owner:"Rafiqul Islam",
 chain:[{s:"CS",kh:"CS-045",owner:"Nurul Haque",yr:1923},{s:"SA",kh:"SA-120",owner:"Nurul Haque",yr:1956},{s:"RS",kh:"RS-302",owner:"Shahana Parvin",yr:1992},{s:"BS",kh:"BS-0881",owner:"Rafiqul Islam",yr:2024}],
 sales:[{date:"2024-02-11",deed:"DL-2024-03110",seller:"Shahana Parvin",buyer:"Rafiqul Islam",amount:21000000,reg:true,mut:true}],
 docs:[{type:"Khatian (RS)",ref:"RS-302",hash:"12cd88f0a4b9",ok:true},{type:"Deed",ref:"DL-2024-03110",hash:"d4e5f607182a",ok:true}],
 flags:{case:false,khas:false,acq:false},doubleSale:null,chainBreak:null},
{id:"SV-006",district:"Gazipur",upazila:"Kaliakair",mouza:"Chandra",dag:"42",khatian:"RS-303",area:18.25,type:"Residential",owner:"Salma Akter",
 chain:[{s:"CS",kh:"CS-046",owner:"Nurul Haque",yr:1923},{s:"SA",kh:"SA-121",owner:"Nurul Haque",yr:1956},{s:"RS",kh:"RS-303",owner:"Salma Akter",yr:1995},{s:"BS",kh:"BS-0882",owner:"Salma Akter",yr:2015}],
 sales:[{date:"1995-09-17",deed:"DL-1995-06602",seller:"Nurul Haque (heirs)",buyer:"Salma Akter",amount:1500000,reg:true,mut:true}],
 docs:[{type:"Khatian (RS)",ref:"RS-303",hash:"88f1c2d3e405",ok:true},{type:"Deed",ref:"DL-1995-06602",hash:"REGISTRY:6b70aa19c2d4 / PAPER:6b70aa19c2e4",ok:false}],
 flags:{case:false,khas:false,acq:false},doubleSale:null,chainBreak:null},
{id:"SV-007",district:"Gazipur",upazila:"Kaliakair",mouza:"Sutrapur",dag:"19",khatian:"RS-118",area:25.5,type:"Commercial",owner:"Belal Sheikh",
 chain:[{s:"CS",kh:"CS-090",owner:"Aziz Master",yr:1921},{s:"SA",kh:"SA-240",owner:"Aziz Master",yr:1958},{s:"RS",kh:"RS-118",owner:"Fatema Khatun",yr:1993},{s:"BS",kh:"BS-0450",owner:"Belal Sheikh",yr:2025}],
 sales:[{date:"2024-06-14",deed:"DL-2024-07731",seller:"Fatema Khatun",buyer:"Belal Sheikh",amount:14200000,reg:true,mut:true},{date:"2025-02-02",deed:"DL-2025-01208",seller:"Fatema Khatun",buyer:"Nasrin Akter",amount:13800000,reg:true,mut:false}],
 docs:[{type:"Khatian (RS)",ref:"RS-118",hash:"0be451a9d8f3",ok:true},{type:"Deed",ref:"DL-2024-07731",hash:"c7d21e90ab44",ok:true},{type:"Deed",ref:"DL-2025-01208",hash:"f90b3c17de62",ok:true}],
 flags:{case:true,khas:false,acq:false},
 doubleSale:{deedA:"DL-2024-07731",buyerA:"Belal Sheikh",dateA:"2024-06-14",deedB:"DL-2025-01208",buyerB:"Nasrin Akter",dateB:"2025-02-02"},
 chainBreak:null},
{id:"SV-008",district:"Cumilla",upazila:"Daudkandi",mouza:"Gouripur",dag:"512",khatian:"RS-720",area:11.0,type:"Residential",owner:"Nasrin Akter",
 chain:[{s:"CS",kh:"CS-310",owner:"Taleb Ali",yr:1924},{s:"SA",kh:"SA-700",owner:"Taleb Ali",yr:1955},{s:"RS",kh:"RS-720",owner:"Taleb Ali (heirs)",yr:1990},{s:"BS",kh:"BS-1905",owner:"Nasrin Akter",yr:2016}],
 sales:[{date:"2016-01-25",deed:"DL-2016-00871",seller:"Jalal Uddin",buyer:"Nasrin Akter",amount:3200000,reg:true,mut:true}],
 docs:[{type:"Khatian (RS)",ref:"RS-720",hash:"4d5e6f708192",ok:true},{type:"Deed",ref:"DL-2016-00871",hash:"b8c9d0e1f2a3",ok:true}],
 flags:{case:false,khas:false,acq:false},doubleSale:null,
 chainBreak:{between:"RS → BS",detail:"RS khatian records owner “Taleb Ali (heirs)”, but the 2016 deed seller is “Jalal Uddin” with no succession link on record."}},
{id:"SV-009",district:"Cumilla",upazila:"Daudkandi",mouza:"Gouripur",dag:"513",khatian:"RS-721",area:9.5,type:"Residential",owner:"Shahana Parvin",
 chain:[{s:"CS",kh:"CS-311",owner:"Taleb Ali",yr:1924},{s:"SA",kh:"SA-701",owner:"Taleb Ali",yr:1955},{s:"RS",kh:"RS-721",owner:"Rashed Khan",yr:1991},{s:"BS",kh:"BS-1906",owner:"Shahana Parvin",yr:2022}],
 sales:[{date:"2022-10-08",deed:"DL-2022-10543",seller:"Rashed Khan",buyer:"Shahana Parvin",amount:5100000,reg:true,mut:false}],
 docs:[{type:"Khatian (RS)",ref:"RS-721",hash:"5e6f708192a3",ok:true},{type:"Deed",ref:"DL-2022-10543",hash:"REGISTRY:1a2b3c4d5e6f / PAPER:1a2b3c4d5e70",ok:false}],
 flags:{case:false,khas:false,acq:false},doubleSale:null,
 chainBreak:{between:"SA → RS",detail:"SA owner “Taleb Ali” does not connect to RS owner “Rashed Khan” — no transfer or succession record bridges the gap."}},
{id:"SV-010",district:"Chattogram",upazila:"Sitakunda",mouza:"Barabkunda",dag:"77",khatian:"RS-090",area:40.0,type:"Agricultural",owner:"—",
 chain:[{s:"CS",kh:"CS-008",owner:"— (khas)",yr:1922},{s:"SA",kh:"SA-022",owner:"— (khas)",yr:1957},{s:"RS",kh:"RS-090",owner:"— (khas)",yr:1992},{s:"BS",kh:"BS-0311",owner:"— (khas)",yr:2018}],
 sales:[],docs:[{type:"Khatian (RS)",ref:"RS-090",hash:"6f708192a3b4",ok:true}],
 flags:{case:false,khas:true,acq:false},doubleSale:null,chainBreak:null},
{id:"SV-011",district:"Chattogram",upazila:"Sitakunda",mouza:"Barabkunda",dag:"78",khatian:"RS-091",area:14.0,type:"Residential",owner:"Abdul Malek",
 chain:[{s:"CS",kh:"CS-009",owner:"Fazlu Miah",yr:1922},{s:"SA",kh:"SA-023",owner:"Fazlu Miah",yr:1957},{s:"RS",kh:"RS-091",owner:"Abdul Malek",yr:1996},{s:"BS",kh:"BS-0312",owner:"Abdul Malek",yr:2018}],
 sales:[{date:"1996-04-02",deed:"DL-1996-02114",seller:"Fazlu Miah (heirs)",buyer:"Abdul Malek",amount:980000,reg:true,mut:true}],
 docs:[{type:"Khatian (RS)",ref:"RS-091",hash:"708192a3b4c5",ok:true},{type:"Deed",ref:"DL-1996-02114",hash:"d1e2f3a4b5c6",ok:true}],
 flags:{case:true,khas:false,acq:true},doubleSale:null,chainBreak:null},
{id:"SV-012",district:"Dhaka",upazila:"Savar",mouza:"Birulia",dag:"160",khatian:"RS-900",area:6.75,type:"Residential",owner:"Fatema Khatun",
 chain:[{s:"CS",kh:"CS-114",owner:"Hazi Delwar Hossain",yr:1921},{s:"SA",kh:"SA-342",owner:"Delwar Hossain",yr:1958},{s:"RS",kh:"RS-900",owner:"Fatema Khatun",yr:1999},{s:"BS",kh:"BS-2091",owner:"Fatema Khatun",yr:2013}],
 sales:[{date:"1999-07-19",deed:"DL-1999-05440",seller:"Delwar Hossain (heirs)",buyer:"Fatema Khatun",amount:540000,reg:true,mut:true}],
 docs:[{type:"Khatian (RS)",ref:"RS-900",hash:"8192a3b4c5d6",ok:true},{type:"Deed",ref:"DL-1999-05440",hash:"e2f3a4b5c6d7",ok:true}],
 flags:{case:false,khas:false,acq:false},doubleSale:null,chainBreak:null}
];

function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
var GEO=[["Dhaka",["Savar","Dhamrai","Keraniganj"]],["Gazipur",["Kaliakair","Sreepur","Kapasia"]],["Narayanganj",["Rupganj","Araihazar","Sonargaon"]],["Cumilla",["Daudkandi","Chandina","Debidwar"]],["Chattogram",["Sitakunda","Mirsharai","Hathazari"]],["Tangail",["Mirzapur","Kalihati","Ghatail"]],["Mymensingh",["Trishal","Bhaluka","Muktagachha"]],["Sylhet",["Golapganj","Beanibazar","Zakiganj"]],["Rajshahi",["Paba","Mohanpur","Bagmara"]],["Khulna",["Dumuria","Batiaghata","Paikgachha"]],["Barishal",["Bakerganj","Mehendiganj","Banaripara"]],["Rangpur",["Mithapukur","Gangachara","Kaunia"]],["Bogura",["Shajahanpur","Sherpur","Gabtali"]],["Jashore",["Jhikargachha","Chaugachha","Bagherpara"]],["Cox's Bazar",["Ukhiya","Teknaf","Chakaria"]]];
var MOUZAS=["Birulia","Tetuljhora","Dhamsona","Chandra","Sutrapur","Gouripur","Barabkunda","Aminbazar","Hemayetpur","Konda","Barmi","Jangalia","Duptara","Braid","Shilmandi","Dulalpur","Padua","Barura","Pahartali","Kumira","Bhatiari","Gorai","Bashail","Delduar","Churkhai","Dapunia","Khadimnagar","Tuker Bazar","Mogla Bazar","Naogaon","Taherpur","Durgapur","Chuknagar","Gutudia","Kashipur","Lalmohan","Haragachh","Pirganj","Kahalu","Nandigram","Bagharpara","Manirampur","Whykong","Hnila","Dulahazara","Jhilim","Charpara","Baluchar","Dhakkinpara"];
var FN=["Karim","Rahim","Abdul","Mohammad","Nasir","Belal","Anwar","Mofizur","Rafiqul","Jalal","Delwar","Kashem","Aziz","Fazlu","Taleb","Nurul","Rashed","Jabbar","Mannan","Shahidul","Kamrul","Ariful","Mahmudul","Saiful","Tanvir","Rakib","Sakib","Imran","Faruk","Harun","Yusuf","Ibrahim","Ismail","Abul","Shamsul","Najmul","Ferdous","Mamun","Rahima","Nasrin","Fatema","Salma","Shahana","Rina","Parvin","Sharmin","Ruma","Dipa","Mitu","Poly","Shilpi","Nusrat","Tania","Mousumi","Lima","Asma","Kohinur","Dilruba","Rehana"];
var LN=["Uddin","Hossain","Rahman","Ahmed","Khan","Sheikh","Miah","Ali","Islam","Chowdhury","Talukder","Sarkar","Mandal","Biswas","Das","Roy","Mollah","Gazi","Mridha","Hawlader","Pramanik","Sarder","Kazi","Munshi","Bhuyan","Majumder","Shikder","Matubbar","Khandaker","Dewan","Molla","Fakir","Akanda","Bhuiyan"];
var PTYPES=["Residential","Agricultural","Commercial","Industrial","Orchard"];
function rpick(R,arr){return arr[Math.floor(R()*arr.length)];}
function rhex(R,n){var s="",c="0123456789abcdef";for(var i=0;i<n;i++)s+=c[Math.floor(R()*16)];return s;}
function rname(R){return rpick(R,FN)+" "+rpick(R,LN);}
function generateRegistry(n,seed){
  var R=mulberry32(seed), out=[], deedSeq=30000;
  for(var i=0;i<n;i++){
    var g=rpick(R,GEO), district=g[0], upazila=rpick(R,g[1]), mouza=rpick(R,MOUZAS);
    var dag=String(1+Math.floor(R()*880));
    var type=rpick(R,PTYPES), area=Math.round((3+R()*37)*4)/4;
    var isKhas=R()<0.025, owner=isKhas?"\u2014":rname(R);
    var surveys=["CS","SA","RS","BS"], chain=[], co=rname(R);
    for(var si=0;si<4;si++){
      if(si>0&&R()<0.22) co=rname(R);
      chain.push({s:surveys[si],kh:surveys[si]+"-"+(100+Math.floor(R()*900)),owner:co,yr:[1920+Math.floor(R()*8),1955+Math.floor(R()*8),1988+Math.floor(R()*8),2010+Math.floor(R()*12)][si]});
    }
    chain[3].owner=owner;
    var sales=[], docs=[{type:"Khatian (RS)",ref:chain[2].kh,hash:rhex(R,12),ok:true}];
    if(!isKhas){
      var ns=1+Math.floor(R()*2.4), prevOwner=chain[0].owner, prevY=1985+Math.floor(R()*10);
      for(var k=0;k<ns;k++){
        var y=Math.min(2026,prevY+Math.floor(R()*9)), m=1+Math.floor(R()*12), d=1+Math.floor(R()*28);
        var date=y+"-"+String(m).padStart(2,"0")+"-"+String(d).padStart(2,"0");
        var buyer=(k===ns-1)?owner:rname(R), deed="DL-"+y+"-"+(deedSeq++);
        var amount=Math.round(area*(type==="Commercial"?950000:type==="Industrial"?700000:type==="Residential"?450000:180000)*(0.7+R()*0.8));
        var reg=R()<0.94;
        sales.push({date:date,deed:deed,seller:prevOwner,buyer:buyer,amount:amount,reg:reg,mut:reg?(R()<0.88):false});
        docs.push({type:"Deed",ref:deed,hash:rhex(R,12),ok:true});
        prevOwner=buyer; prevY=y;
      }
    }
    var flags={case:false,khas:isKhas,acq:false}, doubleSale=null, chainBreak=null;
    if(!isKhas&&sales.length&&R()<0.07){
      var s0=sales[0], dd=new Date(s0.date); dd.setDate(dd.getDate()+30+Math.floor(R()*300));
      var date2=dd.toISOString().slice(0,10), deed2="DL-"+date2.slice(0,4)+"-"+(deedSeq++), buyer2=rname(R);
      doubleSale={deedA:s0.deed,buyerA:s0.buyer,dateA:s0.date,deedB:deed2,buyerB:buyer2,dateB:date2};
      sales.push({date:date2,deed:deed2,seller:s0.seller,buyer:buyer2,amount:s0.amount,reg:true,mut:R()<0.4});
      docs.push({type:"Deed",ref:deed2,hash:rhex(R,12),ok:true});
    }
    if(!isKhas&&docs.length>1&&R()<0.05){var tdd=docs[docs.length-1];tdd.ok=false;tdd.hash="REGISTRY:"+tdd.hash+" / PAPER:"+tdd.hash.slice(0,-1)+(tdd.hash.slice(-1)==="a"?"b":"a");}
    if(R()<0.06){chainBreak={between:"SA \u2192 RS",detail:"SA owner \u201C"+chain[1].owner+"\u201D does not connect to RS owner \u201C"+chain[2].owner+"\u201D \u2014 no transfer or succession record bridges the gap."};}
    if(R()<0.08)flags.case=true;
    if(R()<0.035)flags.acq=true;
    out.push({id:"LV-"+String(i+1).padStart(4,"0"),district:district,upazila:upazila,mouza:mouza,dag:dag,khatian:chain[2].kh,area:area,type:type,owner:owner,chain:chain,sales:sales,docs:docs,flags:flags,doubleSale:doubleSale,chainBreak:chainBreak});
  }
  return out;
}
GEO.push(["Dinajpur",["Birampur","Parbatipur","Chirirbandar"]],["Pabna",["Ishwardi","Bera","Sujanagar"]],["Kushtia",["Kumarkhali","Mirpur","Bheramara"]],["Noakhali",["Begumganj","Senbagh","Chatkhil"]],["Chandpur",["Hajiganj","Matlab","Kachua"]],["Munshiganj",["Sreenagar","Sirajdikhan","Gazaria"]],["Narsingdi",["Palash","Shibpur","Belabo"]],["Kishoreganj",["Bhairab","Kuliarchar","Pakundia"]],["Netrokona",["Durgapur","Kalmakanda","Barhatta"]],["Gaibandha",["Gobindaganj","Sundarganj","Sadullapur"]],["Naogaon",["Badalgachhi","Mahadebpur","Patnitala"]],["Sirajganj",["Ullapara","Shahjadpur","Belkuchi"]],["Satkhira",["Kalaroa","Tala","Debhata"]],["Bagerhat",["Morrelganj","Rampal","Fakirhat"]],["Bhola",["Borhanuddin","Lalmohan","Char Fasson"]],["Faridpur",["Bhanga","Boalmari","Alfadanga"]],["Sunamganj",["Chhatak","Derai","Jagannathpur"]],["Moulvibazar",["Sreemangal","Kulaura","Barlekha"]]);
MOUZAS.push("Durgapur","Kalmakanda","Barhatta","Gobindaganj","Sundarganj","Badalgachhi","Mahadebpur","Ullapara","Shahjadpur","Kalaroa","Tala","Morrelganj","Rampal","Borhanuddin","Bhanga","Boalmari","Chhatak","Derai","Sreemangal","Kulaura","Birampur","Parbatipur","Ishwardi","Bera","Kumarkhali","Begumganj","Senbagh","Hajiganj","Matlab","Sreenagar","Sirajdikhan","Palash","Shibpur","Bhairab","Kuliarchar","Dhakapara","Uttarpara","Majhpara","Purbapara","Chakpara");
const PLOTS = CURATED.concat(generateRegistry(9988, 20261005));
const DEED_INDEX = {};
PLOTS.forEach(p=>p.docs.forEach(d=>{ if(d.type==="Deed"){ const h=d.hash.startsWith("REGISTRY:")?d.hash.split("/")[0].replace("REGISTRY:","").trim():d.hash; DEED_INDEX[d.ref]={plot:p.id,hash:h,ok:d.ok}; }}));


const W = {double:45, hash:40, brk:30, regmut:20, flip:20, kase:15, khas:15, acq:15};
const TIER_TXT = {low:"d_low", med:"d_med", high:"d_high", crit:"d_crit"};
const TIER_CLS = {low:"t-low", med:"t-med", high:"t-high", crit:"t-crit"};
const TIER_COL = {low:"#2FA36B", med:"#E0A020", high:"#E06A1B", crit:"#E0483A"};
function esc(s){ return String(s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function assess(p){
  const sigs=[];
  if(p.doubleSale) sigs.push({key:"double",w:W.double,tk:"s_double_t",pk:"s_double_p",ex:`${p.doubleSale.deedA} (${p.doubleSale.buyerA}, ${p.doubleSale.dateA}) → ${p.doubleSale.deedB} (${p.doubleSale.buyerB}, ${p.doubleSale.dateB})`,ck:"c_double",cls:"bad"});
  p.docs.forEach(d=>{ if(!d.ok) sigs.push({key:"hash",w:W.hash,tk:"s_hash_t",pk:"s_hash_p",ex:`${d.ref}: ${d.hash}`,ck:"c_hash",cls:"bad"}); });
  if(p.chainBreak) sigs.push({key:"brk",w:W.brk,tk:"s_break_t",pk:"s_break_p",ex:`${p.chainBreak.between} — ${p.chainBreak.detail}`,ck:"c_break",cls:"bad"});
  p.sales.forEach(s=>{ if(s.reg && !s.mut && s.deed && s.deed!=="—") sigs.push({key:"regmut",w:W.regmut,tk:"s_regmut_t",pk:"s_regmut_p",ex:`${s.deed} (${s.date})`,ck:"c_regmut",cls:"warn"}); });
  const real=p.sales.filter(s=>s.deed && s.deed!=="—");
  for(let i=1;i<real.length;i++){
    const d1=new Date(real[i-1].date), d2=new Date(real[i].date);
    if((d2-d1)/864e5<=365 && (d2-d1)>=0){ sigs.push({key:"flip",w:W.flip,tk:"s_flip_t",pk:"s_flip_p",ex:`${real[i-1].deed} (${real[i-1].date}) → ${real[i].deed} (${real[i].date})`,ck:"c_flip",cls:"warn"}); break; }
  }
  if(p.flags.case) sigs.push({key:"kase",w:W.kase,tk:"s_case_t",pk:"s_case_p",ex:"",ck:"c_case",cls:"warn"});
  if(p.flags.khas) sigs.push({key:"khas",w:W.khas,tk:"s_khas_t",pk:"s_khas_p",ex:"",ck:"c_khas",cls:"bad"});
  if(p.flags.acq) sigs.push({key:"acq",w:W.acq,tk:"s_acq_t",pk:"s_acq_p",ex:"",ck:"c_acq",cls:"warn"});
  const score=Math.min(100, sigs.reduce((a,s)=>a+s.w,0));
  const tier = score>=90?"crit":score>=60?"high":score>=30?"med":"low";
  return {sigs, score, tier};
}

// Tier metadata shared with the API contract (docs/API.md)
export const SIGNAL_META = {
  double:{tk:"s_double_t",pk:"s_double_p",ck:"c_double",cls:"bad"},
  hash:{tk:"s_hash_t",pk:"s_hash_p",ck:"c_hash",cls:"bad"},
  brk:{tk:"s_break_t",pk:"s_break_p",ck:"c_break",cls:"bad"},
  regmut:{tk:"s_regmut_t",pk:"s_regmut_p",ck:"c_regmut",cls:"warn"},
  flip:{tk:"s_flip_t",pk:"s_flip_p",ck:"c_flip",cls:"warn"},
  kase:{tk:"s_case_t",pk:"s_case_p",ck:"c_case",cls:"warn"},
  khas:{tk:"s_khas_t",pk:"s_khas_p",ck:"c_khas",cls:"bad"},
  acq:{tk:"s_acq_t",pk:"s_acq_p",ck:"c_acq",cls:"warn"},
};

export { CURATED, PLOTS, DEED_INDEX, assess, esc, W, TIER_CLS, TIER_COL, generateRegistry };

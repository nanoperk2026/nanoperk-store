import { useState, useRef, useEffect } from "react";

// ── CONFIG ─────────────────────────────────────────────────
const CONFIG = {
  STORE_NAME: "Nanoperk Store",
  STORE_CITY: "Bhopal",
  STORE_PHONE: "9826XXXXXX",
  WEBSITE: "www.nanoperk.com",
  ADMIN_PASSWORD: "nanoperk@admin123",
  DELIVERY_SLOTS: ["6:00 AM – 8:00 AM","8:00 AM – 10:00 AM","10:00 AM – 12:00 PM","4:00 PM – 6:00 PM","6:00 PM – 8:00 PM"],
  WATI_API: "", // Add your Wati API key here
};

// ── THEME ──────────────────────────────────────────────────
const C = {
  gold:"#D4AF37", goldL:"#F5E9C0", goldM:"#B8972A",
  ivory:"#FDFAF3", ivory2:"#F5EDD8", dark:"#3A2E1A", muted:"#7A6A44",
  red:"#C62828", green:"#2E7D32", blue:"#1565C0",
  wa:"#25D366", wa2:"#128C7E",
};

const S = {
  btn: (c=C.gold,w="auto")=>({background:c,color:"#fff",border:"none",borderRadius:9,padding:"11px 20px",fontWeight:500,fontSize:13,cursor:"pointer",width:w}),
  obtn: (c=C.gold,w="auto")=>({background:"transparent",color:c,border:`1.5px solid ${c}`,borderRadius:9,padding:"10px 18px",fontWeight:500,fontSize:12,cursor:"pointer",width:w}),
  inp: {width:"100%",padding:"12px 13px",borderRadius:9,border:`1.5px solid ${C.goldL}`,fontSize:13,background:"#fff",boxSizing:"border-box",color:C.dark,outline:"none"},
  card: {background:"#fff",border:`1px solid ${C.goldL}`,borderRadius:12,padding:"14px"},
  badge: (c)=>({background:c+"22",color:c,fontSize:10,padding:"3px 9px",borderRadius:20,fontWeight:500}),
};

// ── PRODUCTS ───────────────────────────────────────────────
const INIT_PRODUCTS = [
  {id:1,cat:"Milk",name:"Amul Gold Full Cream Milk",price:31,unit:"500ml",stock:240,img:"",desc:"Rich, creamy full cream milk"},
  {id:2,cat:"Milk",name:"Amul Taaza Toned Milk",price:25,unit:"500ml",stock:310,img:"",desc:"Fresh toned milk daily"},
  {id:3,cat:"Milk",name:"Amul Slim & Trim Skimmed Milk",price:22,unit:"500ml",stock:180,img:"",desc:"Low fat healthy milk"},
  {id:4,cat:"Milk",name:"Amul A2 Milk",price:38,unit:"500ml",stock:90,img:"",desc:"Pure A2 protein milk"},
  {id:5,cat:"Butter",name:"Amul Butter Pasteurised",price:56,unit:"100g",stock:185,img:"",desc:"Classic salted butter"},
  {id:6,cat:"Butter",name:"Amul Lite Low Fat Spread",price:48,unit:"100g",stock:120,img:"",desc:"Light bread spread"},
  {id:7,cat:"Butter",name:"Amul Garlic & Herb Butter",price:65,unit:"100g",stock:70,img:"",desc:"Flavoured cooking butter"},
  {id:8,cat:"Cheese",name:"Amul Processed Cheese Block",price:90,unit:"200g",stock:75,img:"",desc:"Smooth processed cheese"},
  {id:9,cat:"Cheese",name:"Amul Cheese Slices",price:75,unit:"200g",stock:110,img:"",desc:"Ready sandwich slices"},
  {id:10,cat:"Cheese",name:"Amul Pizza Mozzarella",price:145,unit:"200g",stock:55,img:"",desc:"Stretchy pizza cheese"},
  {id:11,cat:"Paneer",name:"Amul Fresh Paneer",price:90,unit:"200g",stock:92,img:"",desc:"Soft fresh cottage cheese"},
  {id:12,cat:"Paneer",name:"Amul Malai Paneer",price:100,unit:"200g",stock:68,img:"",desc:"Creamy malai paneer"},
  {id:13,cat:"Dahi",name:"Amul Masti Dahi",price:48,unit:"400g",stock:140,img:"",desc:"Thick set curd"},
  {id:14,cat:"Dahi",name:"Amul Probiotic Dahi",price:52,unit:"400g",stock:95,img:"",desc:"Gut-friendly probiotic curd"},
  {id:15,cat:"Dahi",name:"Amul Lassi",price:30,unit:"200ml",stock:200,img:"",desc:"Sweet chilled lassi"},
  {id:16,cat:"Ghee",name:"Amul Pure Ghee",price:275,unit:"500ml",stock:60,img:"",desc:"100% pure cow ghee"},
  {id:17,cat:"Ghee",name:"Amul Cow Ghee",price:299,unit:"500ml",stock:45,img:"",desc:"Pure A2 cow ghee"},
  {id:18,cat:"Ice Cream",name:"Amul Vanilla Ice Cream",price:95,unit:"500ml",stock:48,img:"",desc:"Classic vanilla flavour"},
  {id:19,cat:"Ice Cream",name:"Amul Chocolate Ice Cream",price:105,unit:"500ml",stock:40,img:"",desc:"Rich chocolate delight"},
  {id:20,cat:"Ice Cream",name:"Amul Kesar Pista Kulfi",price:25,unit:"60ml",stock:150,img:"",desc:"Traditional kesar kulfi"},
  {id:21,cat:"Chocolates",name:"Amul Milk Chocolate",price:40,unit:"55g",stock:130,img:"",desc:"Creamy milk chocolate"},
  {id:22,cat:"Chocolates",name:"Amul Dark Chocolate 55%",price:55,unit:"55g",stock:100,img:"",desc:"55% dark cocoa"},
  {id:23,cat:"Chocolates",name:"Amul Fruit & Nut",price:45,unit:"55g",stock:115,img:"",desc:"Chocolate with dry fruits"},
  {id:24,cat:"Beverages",name:"Amul Kool Cafe",price:25,unit:"200ml",stock:200,img:"",desc:"Chilled coffee drink"},
  {id:25,cat:"Beverages",name:"Amul Kool Chocolate Milk",price:25,unit:"200ml",stock:175,img:"",desc:"Chocolate flavoured milk"},
  {id:26,cat:"Beverages",name:"Amul Shakti Health Drink",price:220,unit:"500g",stock:60,img:"",desc:"Energy health drink"},
  {id:27,cat:"Milk Powders",name:"Amulya Dairy Whitener",price:130,unit:"500g",stock:85,img:"",desc:"Premium dairy whitener"},
  {id:28,cat:"Fresh Cream",name:"Amul Fresh Cream",price:55,unit:"200ml",stock:110,img:"",desc:"Fresh cooking cream"},
  {id:29,cat:"Fresh Cream",name:"Amul Whipping Cream",price:98,unit:"250ml",stock:70,img:"",desc:"Whip for desserts"},
  {id:30,cat:"Sweets",name:"Amul Shrikhand Kesar",price:78,unit:"200g",stock:65,img:"",desc:"Kesar flavoured shrikhand"},
  {id:31,cat:"Sweets",name:"Amul Gulab Jamun",price:65,unit:"200g",stock:80,img:"",desc:"Soft gulab jamuns"},
  {id:32,cat:"Frozen",name:"Amul Pizza Margherita",price:99,unit:"150g",stock:35,img:"",desc:"Ready to cook pizza"},
  {id:33,cat:"Frozen",name:"Amul Paneer Tikka",price:90,unit:"200g",stock:40,img:"",desc:"Marinated paneer tikka"},
  {id:34,cat:"Protein",name:"Amul High Protein Milk",price:38,unit:"500ml",stock:75,img:"",desc:"Extra protein milk"},
  {id:35,cat:"Protein",name:"Amul Whey Protein",price:699,unit:"250g",stock:25,img:"",desc:"Pure whey protein"},
  {id:36,cat:"Organic",name:"Amul Organic Milk",price:42,unit:"500ml",stock:60,img:"",desc:"Certified organic milk"},
  {id:37,cat:"Organic",name:"Amul Organic Ghee",price:350,unit:"500ml",stock:30,img:"",desc:"Pure organic ghee"},
  {id:38,cat:"Peanut Butter",name:"Amul Peanut Spread Creamy",price:99,unit:"250g",stock:90,img:"",desc:"Smooth peanut butter"},
  {id:39,cat:"Peanut Butter",name:"Amul Peanut Spread Crunchy",price:99,unit:"250g",stock:85,img:"",desc:"Crunchy peanut butter"},
  {id:40,cat:"Camel Milk",name:"Amul Camel Milk",price:65,unit:"500ml",stock:30,img:"",desc:"Pure fresh camel milk"},
];

const CATS = ["All",...[...new Set(INIT_PRODUCTS.map(p=>p.cat))]];
const CAT_ICON = {"Milk":"🥛","Butter":"🧈","Cheese":"🧀","Paneer":"🍽️","Dahi":"🫙","Ghee":"✨","Ice Cream":"🍦","Chocolates":"🍫","Beverages":"🥤","Milk Powders":"🫙","Fresh Cream":"🍶","Sweets":"🍮","Frozen":"❄️","Protein":"💪","Organic":"🌿","Peanut Butter":"🥜","Camel Milk":"🐪"};
const STATUS_FLOW = ["Pending","Processing","Out for Delivery","Delivered"];
const statusColor = s=>s==="Delivered"?C.green:s==="Out for Delivery"?C.gold:s==="Processing"?C.blue:C.red;

// ── HELPERS ────────────────────────────────────────────────
function Thumb({src,cat,size=56}){
  const [err,setErr]=useState(false);
  const em=CAT_ICON[cat]||"📦";
  if(!src||err) return <div style={{width:size,height:size,borderRadius:9,background:C.ivory2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.38,flexShrink:0}}>{em}</div>;
  return <img src={src} onError={()=>setErr(true)} style={{width:size,height:size,objectFit:"contain",borderRadius:9,background:"#fff",border:`1px solid ${C.goldL}`,flexShrink:0}} alt=""/>;
}

function WABubble({text}){
  return(
    <div style={{background:"#fff",maxWidth:300,borderRadius:"0 10px 10px 10px",padding:"9px 12px",fontSize:12,lineHeight:1.7,color:"#111",whiteSpace:"pre-wrap",boxShadow:"0 1px 2px rgba(0,0,0,0.1)"}}>
      {text.split(/(\*[^*]+\*)/).map((p,i)=>p.startsWith("*")&&p.endsWith("*")?<strong key={i}>{p.slice(1,-1)}</strong>:<span key={i}>{p}</span>)}
      <div style={{fontSize:9,color:"#888",textAlign:"right",marginTop:3}}>{new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})} ✓✓</div>
    </div>
  );
}

const waMsg = {
  placed:(o)=>`✅ *Order Confirmed!*\n\nHi ${o.name}! 👋\nYour order *${o.id}* is confirmed.\n\n🛒 *Items:* ${o.items}\n💰 *Total:* ₹${o.total}\n📍 *Address:* ${o.address}\n🕐 *Slot:* ${o.slot}\n\nTrack at: ${CONFIG.WEBSITE}\n\n_${CONFIG.STORE_NAME}, ${CONFIG.STORE_CITY}_`,
  processing:(o)=>`⚙️ *Order Being Prepared*\n\nHi ${o.name}!\nOrder *${o.id}* is being packed fresh for you! 📦\n\n_We'll notify when out for delivery._\n\n_${CONFIG.STORE_NAME}_`,
  out:(o)=>`🛵 *Out for Delivery!*\n\nHi ${o.name}!\nOrder *${o.id}* is on the way!\n📍 To: ${o.address}\n🧑 Agent: Ramesh · 📞 9876500000\n⏱ ETA: 20–30 mins\n\n_${CONFIG.STORE_NAME}_`,
  delivered:(o)=>`🎉 *Delivered Successfully!*\n\nHi ${o.name}!\nOrder *${o.id}* delivered. 🥛\n✅ Paid: ₹${o.total}\n\n⭐ Rate us 1–5!\n🔄 Reply *SUBSCRIBE* for daily delivery!\n\nThank you! 🙏\n_${CONFIG.STORE_NAME}_`,
  subReminder:(o)=>`🔔 *Delivery Tomorrow!*\n\nHi ${o.name}!\nYour *${o.product}* delivery is scheduled for tomorrow.\n📦 Qty: ${o.qty} · 💰 ₹${o.total}\n\nReply *SKIP* to skip.\n_${CONFIG.STORE_NAME}_`,
};

// ══════════════════════════════════════════════════════════
export default function App(){

  // ── AUTH STATE ──
  const [screen,setScreen]=useState("splash");
  const [authMode,setAuthMode]=useState("customer"); // customer | admin
  const [phone,setPhone]=useState("");
  const [otpVals,setOtpVals]=useState(["","","","","",""]);
  const [otpErr,setOtpErr]=useState("");
  const [timer,setTimer]=useState(30);
  const [timerOn,setTimerOn]=useState(false);
  const [userName,setUserName]=useState("");
  const [userAddress,setUserAddress]=useState("");
  const [userArea,setUserArea]=useState("");
  const [userSlot,setUserSlot]=useState(CONFIG.DELIVERY_SLOTS[0]);
  const [userImg,setUserImg]=useState(null);
  const [adminPass,setAdminPass]=useState("");
  const [adminErr,setAdminErr]=useState("");
  const otpRefs=[useRef(),useRef(),useRef(),useRef(),useRef(),useRef()];
  const profImgRef=useRef();

  // ── APP STATE ──
  const [appMode,setAppMode]=useState("customer");
  const [custPage,setCustPage]=useState("home");
  const [adminTab,setAdminTab]=useState("dashboard");
  const [products,setProducts]=useState(INIT_PRODUCTS);
  const [orders,setOrders]=useState([
    {id:"ORD-3001",name:"Rahul Kumar",phone:"9876543210",items:"Amul Gold Milk x2, Butter x1",total:118,status:"Pending",date:"17 Mar",address:"12 Arera Colony",area:"Arera Colony",slot:"6:00 AM – 8:00 AM",payment:"UPI"},
    {id:"ORD-3002",name:"Priya Sharma",phone:"9812345678",items:"Amul Paneer x1, Dahi x2",total:186,status:"Processing",date:"17 Mar",address:"45 MP Nagar",area:"MP Nagar",slot:"8:00 AM – 10:00 AM",payment:"Card"},
    {id:"ORD-3003",name:"Amit Singh",phone:"9999988888",items:"Amul Pure Ghee x1",total:275,status:"Out for Delivery",date:"17 Mar",address:"7 Shyamla Hills",area:"Shyamla Hills",slot:"6:00 AM – 8:00 AM",payment:"UPI"},
    {id:"ORD-3004",name:"Sunita Patel",phone:"9090909090",items:"Amul Kool Cafe x3",total:75,status:"Delivered",date:"16 Mar",address:"22 Kotra",area:"Kotra",slot:"10:00 AM – 12:00 PM",payment:"Card"},
  ]);
  const [subs,setSubs]=useState([]);
  const [cart,setCart]=useState({});
  const [cat,setCat]=useState("All");
  const [search,setSearch]=useState("");
  const [subModal,setSubModal]=useState(null);
  const [subFreq,setSubFreq]=useState("Daily");
  const [subSlot,setSubSlot]=useState(CONFIG.DELIVERY_SLOTS[0]);
  const [subCustom,setSubCustom]=useState("");
  const [payModal,setPayModal]=useState(false);
  const [payMethod,setPayMethod]=useState("upi");
  const [orderPlaced,setOrderPlaced]=useState(null);
  const [editImgModal,setEditImgModal]=useState(null);
  const [editImgUrl,setEditImgUrl]=useState("");
  const [selOrder,setSelOrder]=useState(null);
  const [editProd,setEditProd]=useState(null);
  const [editForm,setEditForm]=useState({});
  const [notifLog,setNotifLog]=useState([]);
  const [toast,setToast]=useState("");
  const [loading,setLoading]=useState(false);
  const [filterStatus,setFilterStatus]=useState("All");
  const [delSlot,setDelSlot]=useState(CONFIG.DELIVERY_SLOTS[0]);
  const editImgFileRef=useRef();

  const cartCount=Object.values(cart).reduce((a,b)=>a+b,0);
  const cartTotal=Object.entries(cart).reduce((a,[id,q])=>a+(products.find(p=>p.id==id)?.price||0)*q,0);
  const filtered=products.filter(p=>(cat==="All"||p.cat===cat)&&(!search||p.name.toLowerCase().includes(search.toLowerCase())));

  useEffect(()=>{setTimeout(()=>setScreen("login"),2000);},[]);
  useEffect(()=>{
    if(!timerOn)return;
    if(timer===0){setTimerOn(false);return;}
    const t=setTimeout(()=>setTimer(v=>v-1),1000);
    return()=>clearTimeout(t);
  },[timer,timerOn]);

  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2500);};
  const pushNotif=(type,o)=>setNotifLog(n=>[{type,text:waMsg[type](o),time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})},...n].slice(0,30));

  const addCart=id=>setCart(c=>({...c,[id]:(c[id]||0)+1}));
  const remCart=id=>setCart(c=>{const n={...c};n[id]>1?n[id]--:delete n[id];return n;});

  const sendOTP=()=>{
    if(phone.length!==10){setOtpErr("Enter valid 10-digit number");return;}
    setLoading(true);setOtpErr("");
    setTimeout(()=>{setLoading(false);setScreen("otp");setTimer(30);setTimerOn(true);setOtpVals(["","","","","",""]);showToast(`OTP sent to +91 ${phone}`);},1200);
  };
  const handleOtpChange=(v,i)=>{
    if(!/^\d?$/.test(v))return;
    const n=[...otpVals];n[i]=v;setOtpVals(n);
    if(v&&i<5)otpRefs[i+1].current?.focus();
    if(!v&&i>0)otpRefs[i-1].current?.focus();
  };
  const verifyOTP=()=>{
    if(otpVals.join("").length<6){setOtpErr("Enter complete 6-digit OTP");return;}
    setLoading(true);setOtpErr("");
    setTimeout(()=>{setLoading(false);setScreen("profile");},1000);
  };
  const saveProfile=()=>{
    if(!userName){setOtpErr("Please enter your name");return;}
    if(!userAddress){setOtpErr("Please enter your delivery address");return;}
    setLoading(true);
    setTimeout(()=>{setLoading(false);setScreen("app");setAppMode("customer");},1000);
  };
  const loginAdmin=()=>{
    if(adminPass===CONFIG.ADMIN_PASSWORD){setScreen("app");setAppMode("admin");setAdminErr("");}
    else{setAdminErr("Incorrect password. Try again.");}
  };
  const advanceStatus=id=>{
    setOrders(os=>os.map(o=>{
      if(o.id!==id)return o;
      const idx=STATUS_FLOW.indexOf(o.status);
      if(idx<STATUS_FLOW.length-1){
        const updated={...o,status:STATUS_FLOW[idx+1]};
        const typeMap={"Processing":"processing","Out for Delivery":"out","Delivered":"delivered"};
        const t=typeMap[updated.status];
        if(t)setTimeout(()=>pushNotif(t,updated),100);
        return updated;
      }
      return o;
    }));
    showToast("Status updated! Notification sent. ✅");
  };
  const placeOrder=()=>{
    const itemList=Object.entries(cart).map(([id,qty])=>{const p=products.find(x=>x.id==id);return`${p.name} x${qty}`;}).join(", ");
    const newOrder={
      id:`ORD-${3000+orders.length+1}`,
      name:userName||"Customer",
      phone,
      items:itemList,
      total:cartTotal,
      status:"Pending",
      date:"17 Mar",
      address:userAddress,
      area:userArea||"Bhopal",
      slot:delSlot,
      payment:payMethod==="upi"?"UPI":"Card",
    };
    setOrders(o=>[newOrder,...o]);
    setOrderPlaced(newOrder);
    pushNotif("placed",newOrder);
    setCart({});setPayModal(false);
  };

  // ── STYLES ──
  const pageWrap={minHeight:"100vh",fontFamily:"sans-serif",color:C.dark,maxWidth:420,margin:"0 auto",background:C.ivory};

  // ══ SPLASH ══
  if(screen==="splash") return(
    <div style={{...pageWrap,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:`linear-gradient(160deg,${C.ivory2},${C.goldL})`}}>
      <div style={{width:90,height:90,borderRadius:24,background:C.gold,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,boxShadow:`0 8px 28px ${C.gold}55`}}>
        <span style={{fontSize:44,color:"#fff",fontWeight:700}}>N</span>
      </div>
      <div style={{fontSize:30,fontWeight:500,color:C.gold}}>Nanoperk</div>
      <div style={{fontSize:15,color:C.muted,marginTop:2}}>Store</div>
      <div style={{fontSize:12,color:C.muted,marginTop:28}}>Fresh Amul products · Daily delivery · Bhopal</div>
      <div style={{display:"flex",gap:6,marginTop:16}}>
        {[0,1,2].map(i=><div key={i} style={{width:i===0?20:6,height:6,borderRadius:3,background:i===0?C.gold:C.goldL}}></div>)}
      </div>
    </div>
  );

  // ══ LOGIN ══
  if(screen==="login") return(
    <div style={pageWrap}>
      {toast&&<div style={{position:"fixed",top:14,left:"50%",transform:"translateX(-50%)",background:C.dark,color:"#fff",padding:"9px 18px",borderRadius:20,fontSize:12,zIndex:99}}>{toast}</div>}
      <div style={{background:`linear-gradient(135deg,${C.ivory2},${C.goldL})`,padding:"44px 28px 28px",textAlign:"center"}}>
        <div style={{width:60,height:60,borderRadius:16,background:C.gold,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",boxShadow:`0 4px 16px ${C.gold}44`}}>
          <span style={{fontSize:28,color:"#fff",fontWeight:700}}>N</span>
        </div>
        <div style={{fontSize:22,fontWeight:500,color:C.gold}}>Nanoperk Store</div>
        <div style={{fontSize:12,color:C.muted,marginTop:3}}>Fresh Amul products · {CONFIG.STORE_CITY}</div>
      </div>
      <div style={{padding:"24px 22px"}}>
        {authMode==="customer"?(
          <>
            <div style={{fontSize:19,fontWeight:500,marginBottom:3}}>Welcome! 👋</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:18}}>Enter mobile number to continue</div>
            <div style={{fontSize:11,color:C.muted,marginBottom:4}}>Mobile Number</div>
            <div style={{display:"flex",gap:8,marginBottom:6}}>
              <div style={{...S.inp,width:58,textAlign:"center",flexShrink:0,padding:"12px 6px",color:C.muted,fontSize:12}}>🇮🇳 +91</div>
              <input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} onKeyDown={e=>e.key==="Enter"&&sendOTP()} placeholder="10-digit mobile number" style={{...S.inp,flex:1}} type="tel"/>
            </div>
            {otpErr&&<div style={{fontSize:11,color:C.red,marginBottom:8}}>{otpErr}</div>}
            <button style={{...S.btn(loading?C.muted:C.gold,"100%"),marginTop:12,padding:"13px"}} onClick={sendOTP} disabled={loading}>{loading?"Sending OTP...":"Get OTP →"}</button>
            <div style={{textAlign:"center",marginTop:16,marginBottom:8,color:C.muted,fontSize:11}}>— or —</div>
            <button style={{...S.obtn(C.goldM,"100%")}} onClick={()=>setAuthMode("admin")}>🔐 Admin Login</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:20,lineHeight:1.8}}>By continuing you agree to our <span style={{color:C.gold}}>Terms</span> & <span style={{color:C.gold}}>Privacy Policy</span></div>
          </>
        ):(
          <>
            <div style={{fontSize:19,fontWeight:500,marginBottom:3}}>Admin Login 🔐</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:18}}>Enter admin password to continue</div>
            <div style={{fontSize:11,color:C.muted,marginBottom:4}}>Password</div>
            <input value={adminPass} onChange={e=>setAdminPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&loginAdmin()} placeholder="Enter admin password" type="password" style={{...S.inp,marginBottom:6}}/>
            {adminErr&&<div style={{fontSize:11,color:C.red,marginBottom:8}}>{adminErr}</div>}
            <button style={{...S.btn(C.dark,"100%"),marginTop:10,padding:"13px"}} onClick={loginAdmin}>Login to Admin Panel →</button>
            <button style={{...S.obtn(C.muted,"100%"),marginTop:9}} onClick={()=>{setAuthMode("customer");setAdminErr("");}}>← Back to Customer Login</button>
            <div style={{background:C.goldL,borderRadius:9,padding:"10px 13px",marginTop:14,fontSize:11,color:C.muted,textAlign:"center"}}>💡 Demo password: <strong>nanoperk@admin123</strong></div>
          </>
        )}
      </div>
    </div>
  );

  // ══ OTP ══
  if(screen==="otp") return(
    <div style={{...pageWrap,padding:"22px 24px"}}>
      {toast&&<div style={{position:"fixed",top:14,left:"50%",transform:"translateX(-50%)",background:C.dark,color:"#fff",padding:"9px 18px",borderRadius:20,fontSize:12,zIndex:99}}>{toast}</div>}
      <button onClick={()=>setScreen("login")} style={{background:"none",border:"none",fontSize:20,color:C.muted,cursor:"pointer",padding:0,marginBottom:22}}>←</button>
      <div style={{width:52,height:52,borderRadius:13,background:C.goldL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,marginBottom:14}}>💬</div>
      <div style={{fontSize:21,fontWeight:500,marginBottom:5}}>Verify OTP</div>
      <div style={{fontSize:12,color:C.muted,marginBottom:22,lineHeight:1.7}}>OTP sent to <strong style={{color:C.dark}}>+91 {phone}</strong> <span style={{color:C.gold,cursor:"pointer",fontSize:11}} onClick={()=>setScreen("login")}>Edit</span></div>
      <div style={{display:"flex",gap:9,marginBottom:10,justifyContent:"center"}}>
        {otpVals.map((d,i)=>(
          <input key={i} ref={otpRefs[i]} value={d} onChange={e=>handleOtpChange(e.target.value,i)} onKeyDown={e=>e.key==="Backspace"&&!d&&i>0&&otpRefs[i-1].current?.focus()} maxLength={1} type="tel"
            style={{width:44,height:52,borderRadius:9,border:`2px solid ${d?C.gold:C.goldL}`,textAlign:"center",fontSize:20,fontWeight:500,color:C.dark,background:"#fff",outline:"none",boxSizing:"border-box"}}/>
        ))}
      </div>
      {otpErr&&<div style={{fontSize:11,color:C.red,textAlign:"center",marginBottom:8}}>{otpErr}</div>}
      <div style={{textAlign:"center",fontSize:12,color:C.muted,marginBottom:18}}>
        {timerOn?<span>Resend in <strong style={{color:C.gold}}>{timer}s</strong></span>:<span style={{color:C.gold,cursor:"pointer"}} onClick={()=>{setTimer(30);setTimerOn(true);setOtpVals(["","","","","",""]);showToast("OTP resent!");}}>Resend OTP</span>}
      </div>
      <button style={{...S.btn(loading?C.muted:C.gold,"100%"),padding:"13px"}} onClick={verifyOTP} disabled={loading}>{loading?"Verifying...":"Verify & Continue →"}</button>
      <div style={{background:C.goldL,borderRadius:9,padding:"9px 13px",marginTop:14,fontSize:11,color:C.muted,textAlign:"center"}}>💡 Demo: enter any 6 digits to proceed</div>
    </div>
  );

  // ══ PROFILE SETUP ══
  if(screen==="profile") return(
    <div style={{...pageWrap,padding:"24px 22px",overflowY:"auto"}}>
      <div style={{fontSize:20,fontWeight:500,marginBottom:3}}>Your Details 📋</div>
      <div style={{fontSize:12,color:C.muted,marginBottom:18}}>We need your address for delivery</div>
      <div style={{textAlign:"center",marginBottom:16}}>
        <div style={{position:"relative",display:"inline-block"}}>
          <div style={{width:68,height:68,borderRadius:"50%",background:C.goldL,border:`2px solid ${C.gold}`,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>
            {userImg?<img src={userImg} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>:<span style={{fontSize:26,color:C.gold}}>{userName?userName[0].toUpperCase():"?"}</span>}
          </div>
          <button onClick={()=>profImgRef.current.click()} style={{position:"absolute",bottom:0,right:0,width:22,height:22,borderRadius:"50%",background:C.gold,border:"2px solid #fff",cursor:"pointer",fontSize:11,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>✎</button>
          <input ref={profImgRef} type="file" accept="image/*" onChange={e=>{const f=e.target.files[0];if(f){const r=new FileReader();r.onload=ev=>setUserImg(ev.target.result);r.readAsDataURL(f);}}} style={{display:"none"}}/>
        </div>
      </div>
      {[{l:"Full Name *",ph:"Your full name",val:userName,set:setUserName},{l:"House No. & Street *",ph:"e.g. 12 Arera Colony, Sector 5",val:userAddress,set:setUserAddress},{l:"Area / Locality",ph:"e.g. MP Nagar, Arera Colony",val:userArea,set:setUserArea}].map(f=>(
        <div key={f.l} style={{marginBottom:12}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:4}}>{f.l}</div>
          <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} style={S.inp}/>
        </div>
      ))}
      <div style={{marginBottom:16}}>
        <div style={{fontSize:11,color:C.muted,marginBottom:4}}>Preferred Delivery Slot *</div>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {CONFIG.DELIVERY_SLOTS.map(sl=>(
            <div key={sl} onClick={()=>setUserSlot(sl)} style={{display:"flex",alignItems:"center",gap:10,background:userSlot===sl?C.goldL:"#fff",border:`1.5px solid ${userSlot===sl?C.gold:C.goldL}`,borderRadius:9,padding:"10px 13px",cursor:"pointer"}}>
              <div style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${C.gold}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {userSlot===sl&&<div style={{width:8,height:8,borderRadius:"50%",background:C.gold}}></div>}
              </div>
              <span style={{fontSize:13,fontWeight:userSlot===sl?500:400}}>🕐 {sl}</span>
            </div>
          ))}
        </div>
      </div>
      {otpErr&&<div style={{fontSize:11,color:C.red,marginBottom:8}}>{otpErr}</div>}
      <button style={{...S.btn(loading?C.muted:C.gold,"100%"),padding:"13px"}} onClick={saveProfile} disabled={loading}>{loading?"Saving...":"Save & Start Shopping →"}</button>
    </div>
  );

  // ══ MAIN APP ══════════════════════════════════════════════
  return(
    <div style={{fontFamily:"sans-serif",color:C.dark,maxWidth:appMode==="admin"?920:420,margin:"0 auto",background:appMode==="admin"?"#F8F4EC":C.ivory,minHeight:"100vh"}}>
      {toast&&<div style={{position:"fixed",top:14,left:"50%",transform:"translateX(-50%)",background:C.dark,color:"#fff",padding:"9px 18px",borderRadius:20,fontSize:12,zIndex:99,whiteSpace:"nowrap"}}>{toast}</div>}

      {/* ═══ CUSTOMER APP ═══ */}
      {appMode==="customer"&&(
        <div style={{paddingBottom:72}}>
          {/* Header */}
          <div style={{background:C.ivory,borderBottom:`1px solid ${C.goldL}`,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:30,height:30,borderRadius:7,background:C.gold,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:14}}>N</div>
              <span style={{fontSize:17,fontWeight:500,color:C.gold}}>Nanoperk</span><span style={{fontSize:17,color:C.dark}}> Store</span>
            </div>
            <button onClick={()=>setCustPage("cart")} style={{...S.obtn(C.gold),position:"relative",padding:"7px 13px",display:"flex",alignItems:"center",gap:4,fontSize:13}}>
              🛒 Cart {cartCount>0&&<span style={{background:C.gold,color:"#fff",borderRadius:"50%",fontSize:9,width:16,height:16,display:"inline-flex",alignItems:"center",justifyContent:"center"}}>{cartCount}</span>}
            </button>
          </div>

          {/* HOME */}
          {custPage==="home"&&(
            <div>
              <div style={{background:`linear-gradient(135deg,${C.ivory2},${C.goldL})`,margin:14,borderRadius:14,padding:"22px 18px",border:`1px solid ${C.goldL}`}}>
                <div style={{fontSize:12,color:C.muted}}>Welcome{userName?`, ${userName}`:""} 👋</div>
                <div style={{fontSize:21,fontWeight:500,color:C.gold,marginBottom:2}}>Nanoperk Store</div>
                <div style={{fontSize:12,color:C.muted,marginBottom:4}}>📍 {userArea||CONFIG.STORE_CITY} · 🕐 {userSlot||CONFIG.DELIVERY_SLOTS[0]}</div>
                <div style={{fontSize:12,color:C.muted,marginBottom:14}}>Fresh Amul products · Subscribe & Save</div>
                <div style={{display:"flex",gap:8}}>
                  <button style={S.btn(C.gold)} onClick={()=>setCustPage("catalog")}>Shop Now</button>
                  <button style={S.obtn(C.gold)} onClick={()=>setCustPage("subscriptions")}>Subscribe</button>
                </div>
              </div>
              <div style={{padding:"0 14px 10px"}}>
                <div style={{fontSize:14,fontWeight:500,marginBottom:8}}>Categories</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
                  {CATS.filter(c=>c!=="All").slice(0,8).map(c=>(
                    <div key={c} onClick={()=>{setCat(c);setCustPage("catalog");}} style={{background:"#fff",border:`1px solid ${C.goldL}`,borderRadius:10,padding:"10px 4px",textAlign:"center",cursor:"pointer"}}>
                      <div style={{fontSize:20}}>{CAT_ICON[c]||"📦"}</div>
                      <div style={{fontSize:10,color:C.muted,marginTop:3,lineHeight:1.2}}>{c}</div>
                    </div>
                  ))}
                </div>
                <div style={{fontSize:14,fontWeight:500,marginBottom:8}}>Popular Products</div>
                {[1,5,16,13,18].map(pid=>{
                  const p=products.find(x=>x.id===pid);if(!p)return null;
                  return(
                    <div key={pid} style={{...S.card,marginBottom:9,display:"flex",alignItems:"center",gap:10}}>
                      <Thumb src={p.img} cat={p.cat} size={54}/>
                      <div style={{flex:1}}>
                        <div style={{fontSize:12,fontWeight:500}}>{p.name}</div>
                        <div style={{fontSize:11,color:C.muted}}>{p.unit} · {p.desc}</div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontSize:13,fontWeight:500,color:C.gold}}>₹{p.price}</div>
                        <button onClick={()=>addCart(p.id)} style={{...S.btn(C.gold),padding:"4px 12px",fontSize:11,marginTop:3}}>Add</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CATALOG */}
          {custPage==="catalog"&&(
            <div style={{padding:14}}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." style={{...S.inp,marginBottom:10}}/>
              <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:6,marginBottom:8}}>
                {CATS.map(c=><button key={c} onClick={()=>setCat(c)} style={{...S.obtn(cat===c?C.gold:C.muted),background:cat===c?C.gold:"transparent",color:cat===c?"#fff":C.muted,flexShrink:0,fontSize:11,padding:"5px 11px"}}>{c}</button>)}
              </div>
              <div style={{fontSize:11,color:C.muted,marginBottom:8}}>{filtered.length} products</div>
              {filtered.map(p=>(
                <div key={p.id} style={{...S.card,marginBottom:9,display:"flex",alignItems:"center",gap:10}}>
                  <div style={{position:"relative"}}>
                    <Thumb src={p.img} cat={p.cat} size={62}/>
                    <button onClick={()=>{setEditImgModal(p);setEditImgUrl(p.img||"");}} style={{position:"absolute",bottom:-3,right:-3,width:18,height:18,borderRadius:"50%",background:C.gold,border:"none",cursor:"pointer",fontSize:9,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>✎</button>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:500,lineHeight:1.3}}>{p.name}</div>
                    <div style={{fontSize:11,color:C.muted}}>{p.unit}</div>
                    <div style={{fontSize:11,color:C.muted,marginTop:1}}>{p.desc}</div>
                    <div style={{fontSize:13,fontWeight:500,color:C.gold,marginTop:2}}>₹{p.price}</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    {cart[p.id]?(
                      <div style={{display:"flex",alignItems:"center",gap:4}}>
                        <button onClick={()=>remCart(p.id)} style={{...S.btn(C.gold),padding:"3px 8px",fontSize:13}}>−</button>
                        <span style={{fontSize:12,fontWeight:500,minWidth:16,textAlign:"center"}}>{cart[p.id]}</span>
                        <button onClick={()=>addCart(p.id)} style={{...S.btn(C.gold),padding:"3px 8px",fontSize:13}}>+</button>
                      </div>
                    ):<button onClick={()=>addCart(p.id)} style={{...S.btn(C.gold),padding:"5px 12px",fontSize:12}}>Add</button>}
                    <button onClick={()=>{setSubModal(p);setSubFreq("Daily");setSubSlot(userSlot);}} style={{...S.obtn(C.gold),padding:"3px 10px",fontSize:10,marginTop:5,display:"block",width:"100%"}}>Subscribe</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CART */}
          {custPage==="cart"&&(
            <div style={{padding:14}}>
              <div style={{fontSize:15,fontWeight:500,marginBottom:12}}>Your Cart</div>
              {cartCount===0?(
                <div style={{textAlign:"center",color:C.muted,marginTop:48}}>
                  <div style={{fontSize:44}}>🛒</div>
                  <div style={{marginTop:10,fontSize:14}}>Cart is empty</div>
                  <button style={{...S.btn(C.gold),marginTop:14}} onClick={()=>setCustPage("catalog")}>Browse Products</button>
                </div>
              ):(
                <>
                  {Object.entries(cart).map(([id,qty])=>{
                    const p=products.find(x=>x.id==id);
                    return(
                      <div key={id} style={{...S.card,marginBottom:9,display:"flex",alignItems:"center",gap:10}}>
                        <Thumb src={p.img} cat={p.cat} size={50}/>
                        <div style={{flex:1}}>
                          <div style={{fontSize:12,fontWeight:500}}>{p.name}</div>
                          <div style={{fontSize:11,color:C.muted}}>₹{p.price} × {qty}</div>
                        </div>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontWeight:500,color:C.gold}}>₹{p.price*qty}</div>
                          <div style={{display:"flex",gap:5,marginTop:4}}>
                            <button onClick={()=>remCart(p.id)} style={{...S.btn(C.gold),padding:"3px 8px",fontSize:13}}>−</button>
                            <button onClick={()=>addCart(p.id)} style={{...S.btn(C.gold),padding:"3px 8px",fontSize:13}}>+</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {/* Delivery Slot */}
                  <div style={{...S.card,marginBottom:10}}>
                    <div style={{fontSize:13,fontWeight:500,marginBottom:8}}>🕐 Select Delivery Slot</div>
                    <div style={{display:"flex",flexDirection:"column",gap:6}}>
                      {CONFIG.DELIVERY_SLOTS.map(sl=>(
                        <div key={sl} onClick={()=>setDelSlot(sl)} style={{display:"flex",alignItems:"center",gap:9,background:delSlot===sl?C.goldL:"transparent",border:`1.5px solid ${delSlot===sl?C.gold:C.goldL}`,borderRadius:8,padding:"9px 12px",cursor:"pointer"}}>
                          <div style={{width:14,height:14,borderRadius:"50%",border:`2px solid ${C.gold}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                            {delSlot===sl&&<div style={{width:7,height:7,borderRadius:"50%",background:C.gold}}></div>}
                          </div>
                          <span style={{fontSize:12,fontWeight:delSlot===sl?500:400}}>{sl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{background:C.goldL,borderRadius:11,padding:"12px 14px",marginTop:4}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:12}}><span style={{color:C.muted}}>Subtotal</span><span>₹{cartTotal}</span></div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:12}}><span style={{color:C.muted}}>Delivery</span><span style={{color:C.green}}>Free</span></div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:12}}><span style={{color:C.muted}}>Slot</span><span style={{color:C.gold,fontWeight:500}}>{delSlot}</span></div>
                    <div style={{display:"flex",justifyContent:"space-between",fontWeight:500,fontSize:15,borderTop:`1px solid ${C.goldM}`,paddingTop:8,marginTop:4}}><span>Total</span><span style={{color:C.gold}}>₹{cartTotal}</span></div>
                  </div>
                  <button style={{...S.btn(C.gold,"100%"),marginTop:12,padding:"13px",fontSize:14}} onClick={()=>setPayModal(true)}>Proceed to Payment →</button>
                </>
              )}
            </div>
          )}

          {/* SUBSCRIPTIONS */}
          {custPage==="subscriptions"&&(
            <div style={{padding:14}}>
              <div style={{fontSize:15,fontWeight:500,marginBottom:12}}>My Subscriptions</div>
              {subs.length===0?(
                <div style={{textAlign:"center",color:C.muted,marginTop:48}}>
                  <div style={{fontSize:40}}>↺</div>
                  <div style={{marginTop:10,fontSize:13}}>No subscriptions yet</div>
                  <div style={{fontSize:11,color:C.muted,marginTop:4,marginBottom:16}}>Subscribe to products for automatic daily delivery</div>
                  <button style={S.btn(C.gold)} onClick={()=>setCustPage("catalog")}>Browse & Subscribe</button>
                </div>
              ):subs.map((s,i)=>(
                <div key={i} style={{...S.card,marginBottom:10}}>
                  <div style={{display:"flex",gap:10,alignItems:"center"}}>
                    <Thumb src={s.img} cat={s.cat} size={52}/>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:500}}>{s.name}</div>
                      <div style={{fontSize:11,color:C.muted}}>{s.unit} · ₹{s.price}</div>
                      <div style={{fontSize:11,color:C.gold,marginTop:1}}>🔄 {s.freq}{s.custom?` — ${s.custom}`:""}</div>
                      <div style={{fontSize:11,color:C.muted}}>🕐 {s.slot}</div>
                    </div>
                    <span style={{background:C.goldL,color:C.goldM,fontSize:10,padding:"2px 8px",borderRadius:20,fontWeight:500,alignSelf:"flex-start"}}>Active</span>
                  </div>
                  <div style={{display:"flex",gap:7,marginTop:9}}>
                    <button style={{...S.obtn(C.gold),flex:1,textAlign:"center"}}>Pause</button>
                    <button style={{...S.obtn(C.gold),flex:1,textAlign:"center"}}>Skip</button>
                    <button onClick={()=>setSubs(subs.filter((_,j)=>j!==i))} style={{...S.obtn(C.red),flex:1,textAlign:"center"}}>Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TRACK */}
          {custPage==="track"&&(
            <div style={{padding:14}}>
              <div style={{fontSize:15,fontWeight:500,marginBottom:12}}>Order Tracking</div>
              {orders.slice(0,4).map(o=>(
                <div key={o.id} style={{...S.card,marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:12,fontWeight:500,color:C.gold}}>{o.id}</span>
                    <span style={{fontSize:11,color:C.muted}}>{o.date}</span>
                  </div>
                  <div style={{fontSize:11,color:C.muted,marginBottom:3}}>{o.items}</div>
                  <div style={{fontSize:11,color:C.muted,marginBottom:8}}>🕐 {o.slot} · 📍 {o.address}</div>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:9}}>
                    <span style={{width:7,height:7,borderRadius:"50%",background:statusColor(o.status),display:"inline-block"}}></span>
                    <span style={{fontSize:12,fontWeight:500,color:statusColor(o.status)}}>{o.status}</span>
                    <span style={{fontSize:11,color:C.muted,marginLeft:"auto"}}>₹{o.total} · {o.payment}</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    {STATUS_FLOW.map((st,i)=>{
                      const active=i<=STATUS_FLOW.indexOf(o.status);
                      return(<div key={st} style={{textAlign:"center",fontSize:9,color:active?C.gold:C.muted,flex:1}}>
                        <div style={{width:8,height:8,borderRadius:"50%",background:active?C.gold:C.ivory2,margin:"0 auto 3px",border:`1.5px solid ${active?C.gold:C.muted}`}}></div>{st}
                      </div>);
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PROFILE */}
          {custPage==="profile"&&(
            <div style={{padding:14}}>
              <div style={{...S.card,marginBottom:12,textAlign:"center"}}>
                <div style={{width:56,height:56,borderRadius:"50%",background:C.goldL,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px"}}>
                  {userImg?<img src={userImg} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>:<span style={{fontSize:22,color:C.gold}}>{userName?userName[0].toUpperCase():"👤"}</span>}
                </div>
                <div style={{fontSize:15,fontWeight:500}}>{userName||"Customer"}</div>
                <div style={{fontSize:12,color:C.muted}}>+91 {phone}</div>
                <div style={{fontSize:11,color:C.muted,marginTop:2}}>📍 {userAddress||"No address set"}</div>
                <div style={{fontSize:11,color:C.gold,marginTop:1}}>🕐 {userSlot}</div>
              </div>
              {[{l:"My Orders",ic:"📦",a:()=>setCustPage("track")},{l:"My Subscriptions",ic:"↺",a:()=>setCustPage("subscriptions")},{l:"Edit Address & Slot",ic:"📍",a:()=>setScreen("profile")},{l:"Switch to Admin",ic:"🔐",a:()=>{setAppMode("admin");}},{l:"Logout",ic:"🚪",a:()=>{setScreen("login");setAuthMode("customer");}}].map(item=>(
                <div key={item.l} onClick={item.a} style={{...S.card,marginBottom:8,display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}}>
                  <div style={{display:"flex",alignItems:"center",gap:9}}><span style={{fontSize:16}}>{item.ic}</span><span style={{fontSize:13}}>{item.l}</span></div>
                  <span style={{color:C.muted,fontSize:16}}>›</span>
                </div>
              ))}
            </div>
          )}

          {/* Customer Nav */}
          <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:420,background:C.ivory,borderTop:`1px solid ${C.goldL}`,display:"flex",zIndex:20}}>
            {[{id:"home",l:"Home",ic:"⌂"},{id:"catalog",l:"Shop",ic:"◫"},{id:"subscriptions",l:"Subscribe",ic:"↺"},{id:"track",l:"Track",ic:"◎"},{id:"profile",l:"Account",ic:"◯"}].map(n=>(
              <button key={n.id} onClick={()=>setCustPage(n.id)} style={{flex:1,background:"none",border:"none",padding:"9px 4px 7px",cursor:"pointer",color:custPage===n.id?C.gold:C.muted,display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
                <span style={{fontSize:17}}>{n.ic}</span>
                <span style={{fontSize:9,fontWeight:custPage===n.id?500:400}}>{n.l}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══ ADMIN APP ═══ */}
      {appMode==="admin"&&(
        <div style={{display:"flex",minHeight:"100vh"}}>
          <div style={{width:168,background:C.dark,minHeight:"100vh",flexShrink:0,display:"flex",flexDirection:"column"}}>
            <div style={{padding:"16px 14px 12px",borderBottom:"1px solid #ffffff18"}}>
              <div style={{display:"flex",alignItems:"center",gap:7}}>
                <div style={{width:28,height:28,borderRadius:7,background:C.gold,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:12}}>N</div>
                <div><div style={{fontSize:12,fontWeight:500,color:"#fff"}}>Nanoperk</div><div style={{fontSize:9,color:"#ffffff66"}}>Admin Panel</div></div>
              </div>
            </div>
            <div style={{flex:1,padding:"8px 7px"}}>
              {[{id:"dashboard",ic:"⊞",l:"Dashboard"},{id:"orders",ic:"📦",l:"Orders"},{id:"products",ic:"◫",l:"Products"},{id:"subscriptions",ic:"↺",l:"Subscriptions"},{id:"notifications",ic:"💬",l:"Notifications"}].map(n=>(
                <div key={n.id} onClick={()=>setAdminTab(n.id)} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 10px",borderRadius:7,marginBottom:2,cursor:"pointer",background:adminTab===n.id?C.gold+"33":"transparent",color:adminTab===n.id?C.gold:"#ffffffaa",fontSize:12}}>
                  <span style={{fontSize:14}}>{n.ic}</span>{n.l}
                </div>
              ))}
            </div>
            <div style={{padding:"10px 12px",borderTop:"1px solid #ffffff18"}}>
              <button onClick={()=>setAppMode("customer")} style={{...S.obtn("#ffffff66","100%"),fontSize:11,padding:"7px",textAlign:"center"}}>← Customer App</button>
              <button onClick={()=>{setScreen("login");setAuthMode("customer");}} style={{background:"none",border:"none",color:"#ffffff44",fontSize:10,width:"100%",marginTop:6,cursor:"pointer",textAlign:"center"}}>Logout</button>
            </div>
          </div>
          <div style={{flex:1,padding:18,overflowX:"auto",overflowY:"auto"}}>

            {adminTab==="dashboard"&&(
              <div>
                <div style={{fontSize:17,fontWeight:500,marginBottom:14}}>Dashboard — {CONFIG.STORE_CITY}</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
                  {[{l:"Today's Orders",v:orders.filter(o=>o.date==="17 Mar").length,c:C.blue,ic:"📦"},{l:"Pending",v:orders.filter(o=>o.status==="Pending").length,c:C.red,ic:"⏳"},{l:"Out for Delivery",v:orders.filter(o=>o.status==="Out for Delivery").length,c:C.gold,ic:"🛵"},{l:"Revenue",v:`₹${orders.filter(o=>o.status==="Delivered").reduce((a,o)=>a+o.total,0)}`,c:C.green,ic:"💰"}].map(m=>(
                    <div key={m.l} style={{background:"#fff",border:`1px solid ${C.goldL}`,borderRadius:11,padding:"14px",textAlign:"center"}}>
                      <div style={{fontSize:22}}>{m.ic}</div>
                      <div style={{fontSize:20,fontWeight:500,color:m.c,marginTop:3}}>{m.v}</div>
                      <div style={{fontSize:10,color:C.muted,marginTop:2}}>{m.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  <div style={{background:"#fff",border:`1px solid ${C.goldL}`,borderRadius:11,padding:"14px"}}>
                    <div style={{fontSize:13,fontWeight:500,marginBottom:9}}>Recent Orders</div>
                    {orders.slice(0,5).map(o=>(
                      <div key={o.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:`1px solid ${C.goldL}`}}>
                        <div><div style={{fontSize:11,fontWeight:500}}>{o.name}</div><div style={{fontSize:10,color:C.muted}}>{o.id} · ₹{o.total} · {o.slot}</div></div>
                        <span style={S.badge(statusColor(o.status))}>{o.status}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{background:"#fff",border:`1px solid ${C.goldL}`,borderRadius:11,padding:"14px"}}>
                    <div style={{fontSize:13,fontWeight:500,marginBottom:9}}>Delivery Slots Today</div>
                    {CONFIG.DELIVERY_SLOTS.map(sl=>{
                      const count=orders.filter(o=>o.slot===sl&&o.date==="17 Mar").length;
                      return(
                        <div key={sl} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${C.goldL}`,fontSize:11}}>
                          <span style={{color:C.muted}}>🕐 {sl}</span>
                          <span style={S.badge(count>0?C.gold:C.muted)}>{count} orders</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {adminTab==="orders"&&(
              <div>
                <div style={{fontSize:17,fontWeight:500,marginBottom:12}}>Orders</div>
                <div style={{display:"flex",gap:7,marginBottom:12,flexWrap:"wrap"}}>
                  {["All","Pending","Processing","Out for Delivery","Delivered"].map(st=>(
                    <button key={st} onClick={()=>setFilterStatus(st)} style={{...S.obtn(filterStatus===st?C.gold:C.muted),background:filterStatus===st?C.gold:"transparent",color:filterStatus===st?"#fff":C.muted,fontSize:10,padding:"4px 10px"}}>{st}</button>
                  ))}
                </div>
                <div style={{background:"#fff",border:`1px solid ${C.goldL}`,borderRadius:11,overflow:"hidden"}}>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                    <thead><tr style={{background:C.goldL}}>
                      {["Order","Customer","Items","Slot","Total","Status","Action"].map(h=><th key={h} style={{padding:"9px 11px",textAlign:"left",fontWeight:500,color:C.muted,fontSize:10}}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {orders.filter(o=>filterStatus==="All"||o.status===filterStatus).map((o,i)=>(
                        <tr key={o.id} style={{borderTop:`1px solid ${C.goldL}`,background:i%2===0?"#fff":C.ivory}}>
                          <td style={{padding:"9px 11px",fontWeight:500,color:C.gold,cursor:"pointer"}} onClick={()=>setSelOrder(o)}>{o.id}</td>
                          <td style={{padding:"9px 11px"}}><div style={{fontWeight:500}}>{o.name}</div><div style={{color:C.muted}}>{o.phone}</div></td>
                          <td style={{padding:"9px 11px",color:C.muted,maxWidth:130}}>{o.items.slice(0,28)}…</td>
                          <td style={{padding:"9px 11px",color:C.muted,fontSize:10}}>{o.slot}</td>
                          <td style={{padding:"9px 11px",fontWeight:500}}>₹{o.total}</td>
                          <td style={{padding:"9px 11px"}}><span style={S.badge(statusColor(o.status))}>{o.status}</span></td>
                          <td style={{padding:"9px 11px"}}>
                            <div style={{display:"flex",gap:4}}>
                              {o.status!=="Delivered"&&<button onClick={()=>advanceStatus(o.id)} style={{...S.btn(C.gold),padding:"4px 9px",fontSize:10}}>Next →</button>}
                              <button onClick={()=>setSelOrder(o)} style={{...S.obtn(C.muted),padding:"4px 9px",fontSize:10}}>View</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {adminTab==="products"&&(
              <div>
                <div style={{fontSize:17,fontWeight:500,marginBottom:12}}>Products ({products.length})</div>
                <div style={{background:"#fff",border:`1px solid ${C.goldL}`,borderRadius:11,overflow:"hidden"}}>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                    <thead><tr style={{background:C.goldL}}>
                      {["Product","Category","Unit","Price","Stock","Action"].map(h=><th key={h} style={{padding:"9px 11px",textAlign:"left",fontWeight:500,color:C.muted,fontSize:10}}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {products.map((p,i)=>(
                        <tr key={p.id} style={{borderTop:`1px solid ${C.goldL}`,background:i%2===0?"#fff":C.ivory}}>
                          <td style={{padding:"9px 11px",fontWeight:500}}>{p.name}</td>
                          <td style={{padding:"9px 11px"}}><span style={S.badge(C.blue)}>{p.cat}</span></td>
                          <td style={{padding:"9px 11px",color:C.muted}}>{p.unit}</td>
                          <td style={{padding:"9px 11px",fontWeight:500,color:C.gold}}>₹{p.price}</td>
                          <td style={{padding:"9px 11px"}}><span style={S.badge(p.stock<50?C.red:p.stock<100?C.gold:C.green)}>{p.stock}</span></td>
                          <td style={{padding:"9px 11px"}}><button onClick={()=>{setEditProd(p);setEditForm({...p});}} style={{...S.btn(C.gold),padding:"4px 9px",fontSize:10}}>Edit</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {adminTab==="subscriptions"&&(
              <div>
                <div style={{fontSize:17,fontWeight:500,marginBottom:12}}>Subscriptions</div>
                {subs.length===0?(
                  <div style={{background:"#fff",border:`1px solid ${C.goldL}`,borderRadius:11,padding:28,textAlign:"center",color:C.muted}}>
                    <div style={{fontSize:32}}>↺</div>
                    <div style={{marginTop:8}}>No subscriptions yet</div>
                  </div>
                ):(
                  <div style={{background:"#fff",border:`1px solid ${C.goldL}`,borderRadius:11,overflow:"hidden"}}>
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                      <thead><tr style={{background:C.goldL}}>
                        {["Customer","Product","Frequency","Slot","Status","Action"].map(h=><th key={h} style={{padding:"9px 11px",textAlign:"left",fontWeight:500,color:C.muted,fontSize:10}}>{h}</th>)}
                      </tr></thead>
                      <tbody>
                        {subs.map((s,i)=>(
                          <tr key={i} style={{borderTop:`1px solid ${C.goldL}`}}>
                            <td style={{padding:"9px 11px",fontWeight:500}}>{s.customer||userName}</td>
                            <td style={{padding:"9px 11px"}}>{s.name}</td>
                            <td style={{padding:"9px 11px"}}><span style={S.badge(C.blue)}>{s.freq}</span></td>
                            <td style={{padding:"9px 11px",fontSize:10,color:C.muted}}>{s.slot}</td>
                            <td style={{padding:"9px 11px"}}><span style={S.badge(C.green)}>Active</span></td>
                            <td style={{padding:"9px 11px"}}><button style={{...S.obtn(C.red),padding:"4px 9px",fontSize:10}} onClick={()=>setSubs(ss=>ss.filter((_,j)=>j!==i))}>Cancel</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {adminTab==="notifications"&&(
              <div>
                <div style={{fontSize:17,fontWeight:500,marginBottom:12}}>WhatsApp Notifications Log</div>
                {notifLog.length===0?(
                  <div style={{background:"#fff",border:`1px solid ${C.goldL}`,borderRadius:11,padding:28,textAlign:"center",color:C.muted}}>
                    <div style={{fontSize:32}}>💬</div>
                    <div style={{marginTop:8}}>No notifications yet</div>
                    <div style={{fontSize:11,marginTop:4}}>Place an order or advance status to trigger WhatsApp messages</div>
                  </div>
                ):notifLog.map((n,i)=>(
                  <div key={i} style={{background:"#fff",border:`1px solid ${C.goldL}`,borderRadius:11,padding:"12px 14px",marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <span style={{background:C.wa+"22",color:C.wa2,fontSize:10,padding:"2px 9px",borderRadius:20,fontWeight:500}}>💬 WhatsApp Sent</span>
                      <span style={{fontSize:10,color:C.muted}}>{n.time}</span>
                    </div>
                    <div style={{background:"#ECE5DD",borderRadius:10,padding:"10px 12px"}}>
                      <WABubble text={n.text}/>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ MODALS ═══ */}

      {/* Image Edit */}
      {editImgModal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:60}}>
          <div style={{background:C.ivory,width:"100%",maxWidth:420,borderRadius:"18px 18px 0 0",padding:22}}>
            <div style={{fontSize:13,fontWeight:500,marginBottom:3}}>Edit Image</div>
            <div style={{fontSize:11,color:C.muted,marginBottom:12}}>{editImgModal.name}</div>
            <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><Thumb src={editImgUrl} cat={editImgModal.cat} size={80}/></div>
            <div style={{fontSize:11,color:C.muted,marginBottom:4}}>Paste image URL</div>
            <input value={editImgUrl} onChange={e=>setEditImgUrl(e.target.value)} placeholder="https://example.com/image.jpg" style={{...S.inp,marginBottom:8}}/>
            <input ref={editImgFileRef} type="file" accept="image/*" onChange={e=>{const f=e.target.files[0];if(f){const r=new FileReader();r.onload=ev=>setEditImgUrl(ev.target.result);r.readAsDataURL(f);}}} style={{display:"none"}}/>
            <button onClick={()=>editImgFileRef.current.click()} style={{...S.obtn(C.gold,"100%"),marginBottom:12}}>📁 Upload from Device</button>
            <div style={{display:"flex",gap:9}}>
              <button style={{...S.obtn(C.muted),flex:1}} onClick={()=>{setEditImgModal(null);setEditImgUrl("");}}>Cancel</button>
              <button style={{...S.btn(C.gold),flex:1}} onClick={()=>{setProducts(ps=>ps.map(p=>p.id===editImgModal.id?{...p,img:editImgUrl}:p));setEditImgModal(null);setEditImgUrl("");showToast("Image updated! ✅");}}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Subscribe Modal */}
      {subModal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:60}}>
          <div style={{background:C.ivory,width:"100%",maxWidth:420,borderRadius:"18px 18px 0 0",padding:22}}>
            <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:12}}>
              <Thumb src={subModal.img} cat={subModal.cat} size={48}/>
              <div><div style={{fontSize:13,fontWeight:500}}>Subscribe to</div><div style={{fontSize:11,color:C.muted}}>{subModal.name} · ₹{subModal.price}/{subModal.unit}</div></div>
            </div>
            <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Delivery frequency</div>
            <div style={{display:"flex",gap:7,marginBottom:12,flexWrap:"wrap"}}>
              {["Daily","Weekly","Monthly","Custom"].map(f=>(
                <button key={f} onClick={()=>setSubFreq(f)} style={{...S.obtn(C.gold),background:subFreq===f?C.gold:"transparent",color:subFreq===f?"#fff":C.gold,fontSize:11,padding:"6px 13px"}}>{f}</button>
              ))}
            </div>
            {subFreq==="Custom"&&<input value={subCustom} onChange={e=>setSubCustom(e.target.value)} placeholder="e.g. Mon, Wed, Fri" style={{...S.inp,marginBottom:10}}/>}
            <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Preferred Delivery Slot</div>
            <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:12}}>
              {CONFIG.DELIVERY_SLOTS.map(sl=>(
                <div key={sl} onClick={()=>setSubSlot(sl)} style={{display:"flex",alignItems:"center",gap:9,background:subSlot===sl?C.goldL:"transparent",border:`1.5px solid ${subSlot===sl?C.gold:C.goldL}`,borderRadius:8,padding:"8px 12px",cursor:"pointer"}}>
                  <div style={{width:13,height:13,borderRadius:"50%",border:`2px solid ${C.gold}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {subSlot===sl&&<div style={{width:6,height:6,borderRadius:"50%",background:C.gold}}></div>}
                  </div>
                  <span style={{fontSize:12,fontWeight:subSlot===sl?500:400}}>🕐 {sl}</span>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:9}}>
              <button style={{...S.obtn(C.muted),flex:1}} onClick={()=>setSubModal(null)}>Cancel</button>
              <button style={{...S.btn(C.gold),flex:1}} onClick={()=>{setSubs(s=>[...s,{...subModal,freq:subFreq,custom:subCustom,slot:subSlot,customer:userName}]);setSubModal(null);setCustPage("subscriptions");showToast("Subscribed! ✅");}}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Payment */}
      {payModal&&!orderPlaced&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:60}}>
          <div style={{background:C.ivory,width:"100%",maxWidth:420,borderRadius:"18px 18px 0 0",padding:22}}>
            <div style={{fontSize:14,fontWeight:500,marginBottom:13}}>Payment</div>
            <div style={{display:"flex",gap:9,marginBottom:13}}>
              {[{id:"upi",l:"UPI"},{id:"card",l:"Debit / Credit Card"}].map(m=>(
                <button key={m.id} onClick={()=>setPayMethod(m.id)} style={{...S.obtn(C.gold),flex:1,background:payMethod===m.id?C.gold:"transparent",color:payMethod===m.id?"#fff":C.gold}}>{m.l}</button>
              ))}
            </div>
            {payMethod==="upi"
              ?<input placeholder="Enter UPI ID (e.g. name@upi)" style={{...S.inp,marginBottom:11}}/>
              :<div style={{marginBottom:11}}>
                <input placeholder="Card Number" style={{...S.inp,marginBottom:7}}/>
                <div style={{display:"flex",gap:7}}>
                  <input placeholder="MM/YY" style={{...S.inp,flex:1}}/>
                  <input placeholder="CVV" style={{...S.inp,flex:1}}/>
                </div>
              </div>
            }
            <div style={{background:C.goldL,borderRadius:9,padding:"10px 13px",marginBottom:6,fontSize:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{color:C.muted}}>Delivery Slot</span><span style={{color:C.gold,fontWeight:500}}>🕐 {delSlot}</span></div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{color:C.muted}}>Address</span><span style={{maxWidth:180,textAlign:"right",fontSize:11}}>{userAddress}</span></div>
              <div style={{display:"flex",justifyContent:"space-between",fontWeight:500,fontSize:14,borderTop:`1px solid ${C.goldM}`,paddingTop:7,marginTop:5}}><span>Total</span><span style={{color:C.gold}}>₹{cartTotal}</span></div>
            </div>
            <div style={{display:"flex",gap:9,marginTop:8}}>
              <button style={{...S.obtn(C.muted),flex:1}} onClick={()=>setPayModal(false)}>Back</button>
              <button style={{...S.btn(C.gold),flex:1}} onClick={placeOrder}>Pay ₹{cartTotal} →</button>
            </div>
          </div>
        </div>
      )}

      {/* Order Success */}
      {orderPlaced&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:70,padding:16}}>
          <div style={{background:C.ivory,width:"100%",maxWidth:380,borderRadius:16,padding:22,textAlign:"center"}}>
            <div style={{fontSize:46,marginBottom:8}}>✅</div>
            <div style={{fontSize:17,fontWeight:500,marginBottom:4}}>Order Placed!</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:4}}>{orderPlaced.id} · ₹{orderPlaced.total}</div>
            <div style={{fontSize:12,color:C.gold,marginBottom:12}}>🕐 {orderPlaced.slot}</div>
            <div style={{background:"#ECE5DD",borderRadius:10,padding:10,marginBottom:14,textAlign:"left"}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:6}}>💬 WhatsApp Confirmation Sent</div>
              <WABubble text={waMsg.placed({name:userName||"Customer",id:orderPlaced.id,items:orderPlaced.items,total:orderPlaced.total,address:orderPlaced.address,slot:orderPlaced.slot})}/>
            </div>
            <button style={{...S.btn(C.gold,"100%")}} onClick={()=>{setOrderPlaced(null);setCustPage("track");}}>Track My Order →</button>
          </div>
        </div>
      )}

      {/* Order Detail Admin */}
      {selOrder&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:80,padding:16}}>
          <div style={{background:C.ivory,width:"100%",maxWidth:420,borderRadius:14,padding:22,maxHeight:"88vh",overflowY:"auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:14,fontWeight:500}}>{selOrder.id}</div>
              <button onClick={()=>setSelOrder(null)} style={{...S.obtn(C.muted),padding:"4px 10px",fontSize:11}}>✕ Close</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:11}}>
              {[{l:"Customer",v:selOrder.name},{l:"Phone",v:selOrder.phone},{l:"Payment",v:selOrder.payment},{l:"Date",v:selOrder.date},{l:"Slot",v:selOrder.slot},{l:"Address",v:selOrder.address}].map(f=>(
                <div key={f.l} style={{background:"#fff",border:`1px solid ${C.goldL}`,borderRadius:7,padding:"7px 9px"}}>
                  <div style={{fontSize:9,color:C.muted}}>{f.l}</div>
                  <div style={{fontSize:11,fontWeight:500,marginTop:1}}>{f.v}</div>
                </div>
              ))}
            </div>
            <div style={{marginBottom:11}}>
              <div style={{fontSize:12,fontWeight:500,marginBottom:5}}>Items</div>
              <div style={{fontSize:11,color:C.muted,background:"#fff",border:`1px solid ${C.goldL}`,borderRadius:8,padding:"8px 10px"}}>{selOrder.items}</div>
              <div style={{display:"flex",justifyContent:"space-between",padding:"8px 2px",fontWeight:500,fontSize:13}}><span>Total</span><span style={{color:C.gold}}>₹{selOrder.total}</span></div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
              {STATUS_FLOW.map((st,i)=>{
                const active=i<=STATUS_FLOW.indexOf(selOrder.status);
                return(<div key={st} style={{textAlign:"center",fontSize:9,color:active?C.gold:C.muted,flex:1}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:active?C.gold:"#eee",margin:"0 auto 3px",border:`2px solid ${active?C.gold:C.muted}`}}></div>{st}
                </div>);
              })}
            </div>
            {selOrder.status!=="Delivered"&&(
              <button style={{...S.btn(C.gold,"100%")}} onClick={()=>{advanceStatus(selOrder.id);setSelOrder(o=>({...o,status:STATUS_FLOW[Math.min(STATUS_FLOW.indexOf(o.status)+1,3)]}));}}>
                Move to: {STATUS_FLOW[Math.min(STATUS_FLOW.indexOf(selOrder.status)+1,3)]} →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Product Edit */}
      {editProd&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:80,padding:16}}>
          <div style={{background:C.ivory,width:"100%",maxWidth:360,borderRadius:14,padding:22}}>
            <div style={{fontSize:13,fontWeight:500,marginBottom:13}}>Edit Product</div>
            {[{l:"Name",k:"name"},{l:"Category",k:"cat"},{l:"Unit",k:"unit"},{l:"Description",k:"desc"},{l:"Price (₹)",k:"price"},{l:"Stock",k:"stock"}].map(f=>(
              <div key={f.k} style={{marginBottom:9}}>
                <div style={{fontSize:10,color:C.muted,marginBottom:3}}>{f.l}</div>
                <input value={editForm[f.k]||""} onChange={e=>setEditForm(ef=>({...ef,[f.k]:e.target.value}))} style={S.inp}/>
              </div>
            ))}
            <div style={{display:"flex",gap:9,marginTop:4}}>
              <button style={{...S.obtn(C.muted),flex:1}} onClick={()=>setEditProd(null)}>Cancel</button>
              <button style={{...S.btn(C.gold),flex:1}} onClick={()=>{setProducts(ps=>ps.map(p=>p.id===editForm.id?{...p,...editForm,price:Number(editForm.price),stock:Number(editForm.stock)}:p));setEditProd(null);showToast("Product updated! ✅");}}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

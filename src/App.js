import { useState, useRef, useEffect } from "react";

const G="#D4AF37",GL="#F5E9C0",GM="#B8972A",IV="#FDFAF3",IV2="#F5EDD8",DK="#3A2E1A",MT="#7A6A44",RED="#C62828",GREEN="#2E7D32";

const STORE = {
  name: "Nanoperk Store",
  timing: "7:00 AM – 11:00 PM",
  days: "Monday – Sunday (All Days)",
  phone: "9826XXXXXX",
  mapLink: "https://maps.google.com/?q=H.No.+288-A+Rohit+Nagar+Phase+2+Bawadiya+Kalan+Bhopal+MP",
  nearbyAreas: ["Rohit Nagar","Bawadiya Kalan","Karond","Kalyanpur","Bairagarh","Sehore Road","Shivaji Nagar","Gufa Mandir","Ashoka Garden","Shuats Colony"],
};

const ADMIN_PASS = "nanoperk@admin123";

const INIT_PRODUCTS = [
  {id:1,cat:"Milk",name:"Amul Gold Full Cream Milk",price:31,unit:"500ml",badge:"Best Seller",emoji:"🥛",bg:"#FFF8E7",desc:"Rich & creamy full cream milk",img:"",available:true},
  {id:2,cat:"Milk",name:"Amul Taaza Toned Milk",price:25,unit:"500ml",badge:"Daily",emoji:"🥛",bg:"#FFF8E7",desc:"Fresh toned milk daily",img:"",available:true},
  {id:3,cat:"Milk",name:"Amul Slim & Trim Milk",price:22,unit:"500ml",badge:"",emoji:"🥛",bg:"#FFF8E7",desc:"Low fat skimmed milk",img:"",available:true},
  {id:4,cat:"Milk",name:"Amul A2 Milk",price:38,unit:"500ml",badge:"Premium",emoji:"🥛",bg:"#FFF8E7",desc:"Pure A2 protein milk",img:"",available:true},
  {id:5,cat:"Butter",name:"Amul Butter Pasteurised",price:56,unit:"100g",badge:"Popular",emoji:"🧈",bg:"#FFFDE7",desc:"Classic salted butter",img:"",available:true},
  {id:6,cat:"Butter",name:"Amul Lite Low Fat Spread",price:48,unit:"100g",badge:"",emoji:"🧈",bg:"#FFFDE7",desc:"Light bread spread",img:"",available:true},
  {id:7,cat:"Butter",name:"Amul Garlic Herb Butter",price:65,unit:"100g",badge:"New",emoji:"🧈",bg:"#FFFDE7",desc:"Flavoured cooking butter",img:"",available:true},
  {id:8,cat:"Cheese",name:"Amul Processed Cheese",price:90,unit:"200g",badge:"",emoji:"🧀",bg:"#FFF3E0",desc:"Smooth processed cheese",img:"",available:true},
  {id:9,cat:"Cheese",name:"Amul Cheese Slices",price:75,unit:"200g",badge:"Popular",emoji:"🧀",bg:"#FFF3E0",desc:"Ready sandwich slices",img:"",available:true},
  {id:10,cat:"Cheese",name:"Amul Pizza Mozzarella",price:145,unit:"200g",badge:"New",emoji:"🧀",bg:"#FFF3E0",desc:"Stretchy pizza cheese",img:"",available:true},
  {id:11,cat:"Paneer",name:"Amul Fresh Paneer",price:90,unit:"200g",badge:"Fresh Daily",emoji:"🍽️",bg:"#F3E5F5",desc:"Soft fresh cottage cheese",img:"",available:true},
  {id:12,cat:"Paneer",name:"Amul Malai Paneer",price:100,unit:"200g",badge:"",emoji:"🍽️",bg:"#F3E5F5",desc:"Creamy malai paneer",img:"",available:true},
  {id:13,cat:"Dahi",name:"Amul Masti Dahi",price:48,unit:"400g",badge:"Best Seller",emoji:"🫙",bg:"#E8F5E9",desc:"Thick set curd",img:"",available:true},
  {id:14,cat:"Dahi",name:"Amul Probiotic Dahi",price:52,unit:"400g",badge:"Healthy",emoji:"🫙",bg:"#E8F5E9",desc:"Gut-friendly probiotic curd",img:"",available:true},
  {id:15,cat:"Dahi",name:"Amul Lassi",price:30,unit:"200ml",badge:"",emoji:"🥤",bg:"#E8F5E9",desc:"Sweet chilled lassi",img:"",available:true},
  {id:16,cat:"Ghee",name:"Amul Pure Ghee",price:275,unit:"500ml",badge:"Premium",emoji:"✨",bg:"#FFF9C4",desc:"100% pure cow ghee",img:"",available:true},
  {id:17,cat:"Ghee",name:"Amul Cow Ghee",price:299,unit:"500ml",badge:"",emoji:"✨",bg:"#FFF9C4",desc:"Pure A2 cow ghee",img:"",available:true},
  {id:18,cat:"Ice Cream",name:"Amul Vanilla Ice Cream",price:95,unit:"500ml",badge:"",emoji:"🍦",bg:"#E3F2FD",desc:"Classic vanilla flavour",img:"",available:true},
  {id:19,cat:"Ice Cream",name:"Amul Chocolate Ice Cream",price:105,unit:"500ml",badge:"Popular",emoji:"🍫",bg:"#E3F2FD",desc:"Rich chocolate delight",img:"",available:true},
  {id:20,cat:"Ice Cream",name:"Amul Kesar Pista Kulfi",price:25,unit:"60ml",badge:"Summer Hit",emoji:"🍧",bg:"#E3F2FD",desc:"Traditional kesar kulfi",img:"",available:true},
  {id:21,cat:"Chocolates",name:"Amul Milk Chocolate",price:40,unit:"55g",badge:"",emoji:"🍫",bg:"#FCE4EC",desc:"Creamy milk chocolate",img:"",available:true},
  {id:22,cat:"Chocolates",name:"Amul Dark Chocolate",price:55,unit:"55g",badge:"Premium",emoji:"🍫",bg:"#FCE4EC",desc:"55% dark cocoa",img:"",available:true},
  {id:23,cat:"Beverages",name:"Amul Kool Cafe",price:25,unit:"200ml",badge:"Popular",emoji:"☕",bg:"#E0F2F1",desc:"Chilled coffee drink",img:"",available:true},
  {id:24,cat:"Beverages",name:"Amul Kool Chocolate Milk",price:25,unit:"200ml",badge:"",emoji:"🥤",bg:"#E0F2F1",desc:"Chocolate flavoured milk",img:"",available:true},
  {id:25,cat:"Fresh Cream",name:"Amul Fresh Cream",price:55,unit:"200ml",badge:"",emoji:"🍶",bg:"#FFF8E7",desc:"Fresh cooking cream",img:"",available:true},
  {id:26,cat:"Fresh Cream",name:"Amul Whipping Cream",price:98,unit:"250ml",badge:"New",emoji:"🍶",bg:"#FFF8E7",desc:"Whip for desserts",img:"",available:true},
];

const CATS=[
  {name:"All",emoji:"🛒",color:G},
  {name:"Milk",emoji:"🥛",color:"#1565C0"},
  {name:"Butter",emoji:"🧈",color:"#F57F17"},
  {name:"Cheese",emoji:"🧀",color:"#E65100"},
  {name:"Paneer",emoji:"🍽️",color:"#6A1B9A"},
  {name:"Dahi",emoji:"🫙",color:"#2E7D32"},
  {name:"Ghee",emoji:"✨",color:"#B8972A"},
  {name:"Ice Cream",emoji:"🍦",color:"#0277BD"},
  {name:"Chocolates",emoji:"🍫",color:"#4E342E"},
  {name:"Beverages",emoji:"☕",color:"#00695C"},
  {name:"Fresh Cream",emoji:"🍶",color:"#AD1457"},
];

const BANNERS=[
  {bg:"linear-gradient(135deg,#3A2E1A,#6B4F2A)",title:"🥛 Fresh Amul Daily",sub:"Pick up from our store — 7AM to 11PM",cta:"Shop Now",accent:G},
  {bg:"linear-gradient(135deg,#1A3A2E,#2E6B4F)",title:"🧈 Amul Butter In Stock!",sub:"Fresh stock available at store",cta:"Order Now",accent:"#4CAF50"},
  {bg:"linear-gradient(135deg,#1A1A3A,#2E2E6B)",title:"🍦 Summer Special",sub:"Ice creams & kulfi available",cta:"Shop Now",accent:"#7C4DFF"},
  {bg:"linear-gradient(135deg,#3A1A1A,#6B2E2E)",title:"🧀 Cheese Lovers!",sub:"All varieties in stock today",cta:"Buy Now",accent:"#FF5252"},
];

function Thumb({src,emoji,bg,size=46}){
  const [err,setErr]=useState(false);
  if(!src||err) return <div style={{width:size,height:size,borderRadius:8,background:bg||IV2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.5,flexShrink:0}}>{emoji}</div>;
  return <img src={src} onError={()=>setErr(true)} style={{width:size,height:size,objectFit:"contain",borderRadius:8,background:"#fff",flexShrink:0}} alt=""/>;
}

export default function App(){
  const [page,setPage]=useState("home");
  const [mode,setMode]=useState("customer"); // customer | admin
  const [cat,setCat]=useState("All");
  const [search,setSearch]=useState("");
  const [products,setProducts]=useState(INIT_PRODUCTS);
  const [cart,setCart]=useState({});
  const [bannerIdx,setBannerIdx]=useState(0);
  const [checkoutStep,setCheckoutStep]=useState(1);
  const [phone,setPhone]=useState("");
  const [otp,setOtp]=useState(["","","","","",""]);
  const [otpSent,setOtpSent]=useState(false);
  const [otpErr,setOtpErr]=useState("");
  const [timer,setTimer]=useState(30);
  const [timerOn,setTimerOn]=useState(false);
  const [custName,setCustName]=useState("");
  const [selectedArea,setSelectedArea]=useState("");
  const [pickupTime,setPickupTime]=useState("");
  const [formErr,setFormErr]=useState("");
  const [orderDone,setOrderDone]=useState(null);
  const [toast,setToast]=useState("");
  // Admin states
  const [adminPass,setAdminPass]=useState("");
  const [adminErr,setAdminErr]=useState("");
  const [editModal,setEditModal]=useState(null);
  const [editForm,setEditForm]=useState({});
  const [editImgUrl,setEditImgUrl]=useState("");
  const [addModal,setAddModal]=useState(false);
  const [newProd,setNewProd]=useState({name:"",cat:"Milk",price:"",unit:"",desc:"",badge:"",emoji:"📦",img:""});
  const imgFileRef=useRef();
  const otpRefs=[useRef(),useRef(),useRef(),useRef(),useRef(),useRef()];

  useEffect(()=>{const t=setInterval(()=>setBannerIdx(b=>(b+1)%BANNERS.length),3500);return()=>clearInterval(t);},[]);
  useEffect(()=>{if(!timerOn)return;if(timer===0){setTimerOn(false);return;}const t=setTimeout(()=>setTimer(v=>v-1),1000);return()=>clearTimeout(t);},[timer,timerOn]);

  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2200);};
  const addCart=id=>setCart(c=>({...c,[id]:(c[id]||0)+1}));
  const remCart=id=>setCart(c=>{const n={...c};n[id]>1?n[id]--:delete n[id];return n;});
  const cartCount=Object.values(cart).reduce((a,b)=>a+b,0);
  const cartTotal=Object.entries(cart).reduce((a,[id,q])=>a+(products.find(p=>p.id==id)?.price||0)*q,0);
  const availableProducts=products.filter(p=>p.available);
  const catProducts=c=>availableProducts.filter(p=>p.cat===c);
  const displayProducts=(cat==="All"?availableProducts:availableProducts.filter(p=>p.cat===cat)).filter(p=>!search||p.name.toLowerCase().includes(search.toLowerCase()));

  const sendOTP=()=>{if(phone.length!==10){setOtpErr("Enter valid 10-digit number");return;}setOtpErr("");setOtpSent(true);setTimer(30);setTimerOn(true);showToast(`OTP sent to +91 ${phone}`);};
  const handleOtp=(v,i)=>{if(!/^\d?$/.test(v))return;const n=[...otp];n[i]=v;setOtp(n);if(v&&i<5)otpRefs[i+1].current?.focus();if(!v&&i>0)otpRefs[i-1].current?.focus();};
  const verifyOTP=()=>{if(otp.join("").length<6){setOtpErr("Enter complete 6-digit OTP");return;}setCheckoutStep(2);setOtpErr("");};
  const placeOrder=()=>{
    if(!custName){setFormErr("Enter your name");return;}
    if(!selectedArea){setFormErr("Select your nearby area");return;}
    if(!pickupTime){setFormErr("Select pickup time");return;}
    const id="ORD-"+Math.floor(3000+Math.random()*1000);
    setOrderDone({id,name:custName,phone,total:cartTotal,area:selectedArea,pickupTime});
    setCheckoutStep(3);setCart({});setFormErr("");
  };

  // Admin
  const loginAdmin=()=>{if(adminPass===ADMIN_PASS){setMode("admin");setAdminErr("");setPage("adminProducts");}else{setAdminErr("Wrong password. Try again.");}};
  const saveEdit=()=>{
    setProducts(ps=>ps.map(p=>p.id===editModal.id?{...p,...editForm,price:Number(editForm.price)||p.price,img:editImgUrl||editForm.img}:p));
    setEditModal(null);showToast("Product updated! ✅");
  };
  const addProduct=()=>{
    if(!newProd.name||!newProd.price){showToast("Enter name and price");return;}
    const p={...newProd,id:Date.now(),price:Number(newProd.price),bg:"#FFF8E7",available:true};
    setProducts(ps=>[...ps,p]);setAddModal(false);
    setNewProd({name:"",cat:"Milk",price:"",unit:"",desc:"",badge:"",emoji:"📦",img:""});
    showToast("Product added! ✅");
  };
  const toggleAvailable=id=>{setProducts(ps=>ps.map(p=>p.id===id?{...p,available:!p.available}:p));};

  const inp={width:"100%",padding:"11px 13px",borderRadius:10,border:`1.5px solid ${GL}`,fontSize:13,background:"#fff",boxSizing:"border-box",color:DK,outline:"none"};
  const gradBtn={width:"100%",background:`linear-gradient(135deg,${G},${GM})`,color:"#fff",border:"none",borderRadius:12,padding:"14px",fontSize:14,fontWeight:700,cursor:"pointer"};

  // Now open check
  const now=new Date();
  const h=now.getHours();
  const isOpen=h>=7&&h<23;

  if(mode==="admin") return <AdminPanel products={products} setEditModal={setEditModal} setEditForm={setEditForm} setEditImgUrl={setEditImgUrl} toggleAvailable={toggleAvailable} setAddModal={setAddModal} setMode={setMode} setPage={setPage} showToast={showToast} toast={toast} editModal={editModal} editForm={editForm} editImgUrl={setEditImgUrl} saveEdit={saveEdit} addModal={addModal} addProduct={addProduct} newProd={newProd} setNewProd={setNewProd} imgFileRef={imgFileRef} inp={inp} G={G} GL={GL} GM={GM} IV={IV} DK={DK} MT={MT} RED={RED} GREEN={GREEN} editImgUrlVal={editImgUrl} setEditImgUrlVal={setEditImgUrl} editFormVal={editForm} setEditFormVal={setEditForm}/>;

  return(
    <div style={{fontFamily:"sans-serif",color:DK,maxWidth:420,margin:"0 auto",background:"#F8F4EC",minHeight:"100vh",position:"relative"}}>
      {toast&&<div style={{position:"fixed",top:14,left:"50%",transform:"translateX(-50%)",background:DK,color:"#fff",padding:"9px 20px",borderRadius:20,fontSize:12,zIndex:100,whiteSpace:"nowrap"}}>{toast}</div>}

      {/* HEADER */}
      <div style={{background:`linear-gradient(135deg,${DK},#6B4F2A)`,padding:"13px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:20}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,borderRadius:10,background:G,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:17}}>N</div>
          <div>
            <div style={{fontSize:17,fontWeight:700,color:G,lineHeight:1}}>Nanoperk</div>
            <div style={{fontSize:10,color:"#ffffff88",marginTop:1}}>📍 Rohit Nagar, Bawadiya Kalan</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{background:isOpen?"#ffffff15":"#ff000033",borderRadius:8,padding:"4px 10px",display:"flex",alignItems:"center",gap:4}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:isOpen?GREEN:RED,display:"inline-block"}}></span>
            <span style={{fontSize:11,color:"#fff",fontWeight:500}}>{isOpen?"Open":"Closed"}</span>
          </div>
          <button onClick={()=>setPage("cart")} style={{background:"#ffffff15",border:"none",borderRadius:8,padding:"7px 12px",cursor:"pointer",position:"relative"}}>
            <span style={{fontSize:18}}>🛒</span>
            {cartCount>0&&<span style={{position:"absolute",top:-4,right:-4,background:RED,color:"#fff",borderRadius:"50%",fontSize:9,width:16,height:16,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* PICKUP BANNER */}
      <div style={{background:`linear-gradient(135deg,${G},${GM})`,padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:16}}>🏪</span>
          <div>
            <div style={{fontSize:11,fontWeight:700,color:"#fff"}}>Store Pickup Only</div>
            <div style={{fontSize:10,color:"#ffffff99"}}>{STORE.timing} · All Days</div>
          </div>
        </div>
        <button onClick={()=>setPage("store")} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:8,padding:"5px 10px",color:"#fff",fontSize:11,fontWeight:600,cursor:"pointer"}}>View Store →</button>
      </div>

      {/* HOME */}
      {page==="home"&&(
        <div style={{paddingBottom:80}}>
          <div style={{padding:"12px 16px 8px",background:`linear-gradient(135deg,${DK},#6B4F2A)`}}>
            <div style={{position:"relative"}}>
              <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:15,color:MT}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search milk, butter, paneer, ghee..." style={{...inp,paddingLeft:38,borderRadius:25,border:"none"}}/>
              {search&&<button onClick={()=>setSearch("")} style={{position:"absolute",right:13,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:MT,fontSize:16}}>✕</button>}
            </div>
          </div>

          {search?(
            <div style={{padding:"12px 16px"}}>
              <div style={{fontSize:12,color:MT,marginBottom:10}}>{displayProducts.length} results for "<strong>{search}</strong>"</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {displayProducts.map(p=><PCard key={p.id} p={p} cart={cart} addCart={addCart} remCart={remCart}/>)}
              </div>
            </div>
          ):(
            <>
              {/* Banner */}
              <div style={{padding:"12px 16px 8px"}}>
                <div style={{background:BANNERS[bannerIdx].bg,borderRadius:16,padding:"20px",position:"relative",overflow:"hidden",minHeight:120}}>
                  <div style={{fontSize:20,fontWeight:700,color:"#fff",marginBottom:3}}>{BANNERS[bannerIdx].title}</div>
                  <div style={{fontSize:12,color:"#ffffffbb",marginBottom:14,maxWidth:"70%"}}>{BANNERS[bannerIdx].sub}</div>
                  <button onClick={()=>setPage("catalog")} style={{background:BANNERS[bannerIdx].accent,color:"#fff",border:"none",borderRadius:20,padding:"8px 18px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{BANNERS[bannerIdx].cta}</button>
                  <div style={{position:"absolute",right:-10,top:"50%",transform:"translateY(-50%)",fontSize:70,opacity:0.1}}>🥛</div>
                  <div style={{display:"flex",gap:5,marginTop:12}}>
                    {BANNERS.map((_,i)=><div key={i} style={{width:i===bannerIdx?20:6,height:6,borderRadius:3,background:i===bannerIdx?"#fff":"#ffffff44",transition:"all 0.3s"}}></div>)}
                  </div>
                </div>
              </div>

              {/* Store info card */}
              <div style={{margin:"4px 16px 10px",background:"#fff",borderRadius:14,padding:"13px 14px",border:`1px solid ${GL}`,display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:44,height:44,borderRadius:12,background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🏪</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:700,color:DK}}>Store Pickup Available</div>
                  <div style={{fontSize:11,color:MT,marginTop:1}}>Rohit Nagar, Bawadiya Kalan, Bhopal</div>
                  <div style={{fontSize:11,color:GREEN,marginTop:1,fontWeight:600}}>⏰ {STORE.timing}</div>
                </div>
                <a href={STORE.mapLink} target="_blank" rel="noreferrer" style={{background:G,color:"#fff",border:"none",borderRadius:8,padding:"7px 11px",fontSize:11,fontWeight:600,cursor:"pointer",flexShrink:0,textDecoration:"none",display:"flex",alignItems:"center",gap:4}}>📍 Map</a>
              </div>

              {/* Categories */}
              <div style={{padding:"4px 0 6px"}}>
                <div style={{padding:"0 16px",fontSize:15,fontWeight:700,marginBottom:10,color:DK}}>Categories</div>
                <div style={{display:"flex",gap:10,overflowX:"auto",padding:"4px 16px 8px",scrollbarWidth:"none"}}>
                  {CATS.map(c=>(
                    <div key={c.name} onClick={()=>{setCat(c.name);setPage("catalog");}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,flexShrink:0,cursor:"pointer"}}>
                      <div style={{width:58,height:58,borderRadius:16,background:"#fff",border:`2px solid ${GL}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,boxShadow:"0 2px 6px rgba(0,0,0,0.06)"}}>
                        {c.emoji}
                      </div>
                      <span style={{fontSize:10,color:MT,fontWeight:400,whiteSpace:"nowrap"}}>{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo cards */}
              <div style={{padding:"4px 16px 10px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <div onClick={()=>setPage("store")} style={{background:`linear-gradient(135deg,#FFF8E7,${GL})`,borderRadius:14,padding:"14px",border:`1px solid ${GL}`,cursor:"pointer"}}>
                  <div style={{fontSize:22}}>🏪</div>
                  <div style={{fontSize:13,fontWeight:700,color:DK,marginTop:4}}>Visit Store</div>
                  <div style={{fontSize:10,color:MT,marginTop:2}}>H.No. 288-A, Rohit Nagar</div>
                  <div style={{fontSize:11,fontWeight:600,color:G,marginTop:6}}>Get Directions →</div>
                </div>
                <div style={{background:"linear-gradient(135deg,#E8F5E9,#C8E6C9)",borderRadius:14,padding:"14px",border:"1px solid #C8E6C9"}}>
                  <div style={{fontSize:22}}>⏰</div>
                  <div style={{fontSize:13,fontWeight:700,color:DK,marginTop:4}}>Store Hours</div>
                  <div style={{fontSize:10,color:MT,marginTop:2}}>Open All Days</div>
                  <div style={{fontSize:11,fontWeight:600,color:GREEN,marginTop:6}}>7AM – 11PM</div>
                </div>
              </div>

              {/* Nearby areas chip */}
              <div style={{margin:"0 16px 14px",background:"#fff",borderRadius:14,padding:"12px 14px",border:`1px solid ${GL}`}}>
                <div style={{fontSize:12,fontWeight:700,color:DK,marginBottom:8}}>📍 We serve customers near:</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {STORE.nearbyAreas.map(a=>(
                    <span key={a} style={{background:GL,color:GM,fontSize:11,padding:"4px 10px",borderRadius:20,fontWeight:500}}>{a}</span>
                  ))}
                </div>
              </div>

              {/* Products by category */}
              {["Milk","Butter","Paneer","Dahi","Ghee","Ice Cream","Chocolates","Beverages"].map(c=>{
                const ps=catProducts(c);
                if(ps.length===0)return null;
                return(
                  <div key={c} style={{marginBottom:16}}>
                    <div style={{padding:"0 16px",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                      <div style={{fontSize:15,fontWeight:700,color:DK}}>{CATS.find(x=>x.name===c)?.emoji} {c}</div>
                      <span onClick={()=>{setCat(c);setPage("catalog");}} style={{fontSize:12,color:G,cursor:"pointer",fontWeight:600}}>See All →</span>
                    </div>
                    <div style={{display:"flex",gap:10,overflowX:"auto",padding:"4px 16px 8px",scrollbarWidth:"none"}}>
                      {ps.map(p=>(
                        <div key={p.id} style={{flexShrink:0,width:140,background:"#fff",borderRadius:14,overflow:"hidden",border:`1px solid ${GL}`,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
                          <div style={{background:p.bg,height:100,display:"flex",alignItems:"center",justifyContent:"center",fontSize:0,position:"relative"}}>
                            {p.img?<img src={p.img} style={{width:"100%",height:"100%",objectFit:"contain"}} onError={e=>{e.target.style.display="none";}} alt=""/>:<span style={{fontSize:46}}>{p.emoji}</span>}
                            {p.badge&&<span style={{position:"absolute",top:6,left:6,background:G,color:"#fff",fontSize:8,padding:"2px 7px",borderRadius:8,fontWeight:700}}>{p.badge}</span>}
                          </div>
                          <div style={{padding:"10px"}}>
                            <div style={{fontSize:11,fontWeight:600,color:DK,lineHeight:1.3,marginBottom:3,height:30,overflow:"hidden"}}>{p.name}</div>
                            <div style={{fontSize:10,color:MT,marginBottom:6}}>{p.unit}</div>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                              <span style={{fontSize:13,fontWeight:700,color:G}}>₹{p.price}</span>
                              {cart[p.id]?(
                                <div style={{display:"flex",alignItems:"center",gap:4}}>
                                  <button onClick={()=>remCart(p.id)} style={{width:22,height:22,borderRadius:"50%",background:GL,border:`1.5px solid ${G}`,cursor:"pointer",fontSize:13,color:G,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                                  <span style={{fontSize:11,fontWeight:700,minWidth:14,textAlign:"center"}}>{cart[p.id]}</span>
                                  <button onClick={()=>addCart(p.id)} style={{width:22,height:22,borderRadius:"50%",background:G,border:"none",cursor:"pointer",fontSize:13,color:"#fff",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                                </div>
                              ):(
                                <button onClick={()=>addCart(p.id)} style={{background:G,color:"#fff",border:"none",borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:600,cursor:"pointer"}}>+ Add</button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}

      {/* CATALOG */}
      {page==="catalog"&&(
        <div style={{paddingBottom:80}}>
          <div style={{background:`linear-gradient(135deg,${DK},#6B4F2A)`,padding:"12px 16px"}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." style={{...inp,border:"none",borderRadius:25}}/>
          </div>
          <div style={{display:"flex",gap:8,overflowX:"auto",padding:"12px 16px 8px",scrollbarWidth:"none"}}>
            {CATS.map(c=><button key={c.name} onClick={()=>setCat(c.name)} style={{background:cat===c.name?G:"#fff",color:cat===c.name?"#fff":MT,border:`1.5px solid ${cat===c.name?G:GL}`,borderRadius:20,padding:"6px 14px",fontSize:12,fontWeight:cat===c.name?700:400,flexShrink:0,cursor:"pointer"}}>{c.emoji} {c.name}</button>)}
          </div>
          <div style={{padding:"0 16px 6px",fontSize:11,color:MT}}>{displayProducts.length} products available</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:"0 16px"}}>
            {displayProducts.map(p=><PCard key={p.id} p={p} cart={cart} addCart={addCart} remCart={remCart}/>)}
          </div>
        </div>
      )}

      {/* STORE INFO */}
      {page==="store"&&(
        <div style={{padding:16,paddingBottom:80}}>
          <div style={{background:`linear-gradient(135deg,${DK},#6B4F2A)`,borderRadius:16,padding:"20px",marginBottom:14,textAlign:"center"}}>
            <div style={{fontSize:40,marginBottom:8}}>🏪</div>
            <div style={{fontSize:18,fontWeight:700,color:G}}>Nanoperk Store</div>
            <div style={{fontSize:12,color:"#ffffff88",marginTop:4}}>Your neighbourhood Amul store</div>
          </div>
          <div style={{background:"#fff",borderRadius:14,padding:"16px",marginBottom:12,border:`1px solid ${GL}`}}>
            <div style={{fontSize:14,fontWeight:700,color:G,marginBottom:12}}>📍 Find Our Store</div>
            <div style={{fontSize:13,color:MT,marginBottom:12,lineHeight:1.7}}>We are located in Rohit Nagar, Bawadiya Kalan area, Bhopal. Click below to open Google Maps and navigate directly to our store.</div>
            <a href={STORE.mapLink} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:G,color:"#fff",textDecoration:"none",borderRadius:10,padding:"13px",fontSize:14,fontWeight:700}}>📍 Open in Google Maps & Navigate</a>
          </div>
          <div style={{background:"#fff",borderRadius:14,padding:"16px",marginBottom:12,border:`1px solid ${GL}`}}>
            <div style={{fontSize:14,fontWeight:700,color:G,marginBottom:12}}>⏰ Store Timings</div>
            <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${GL}`,fontSize:13}}><span style={{color:MT}}>Monday – Sunday</span><span style={{fontWeight:700,color:GREEN}}>Open All Days</span></div>
            <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${GL}`,fontSize:13}}><span style={{color:MT}}>Opening Time</span><span style={{fontWeight:700}}>7:00 AM</span></div>
            <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",fontSize:13}}><span style={{color:MT}}>Closing Time</span><span style={{fontWeight:700}}>11:00 PM</span></div>
            <div style={{background:isOpen?"#EAF3DE":"#FCEBEB",borderRadius:10,padding:"10px 13px",marginTop:10,textAlign:"center",fontSize:13,fontWeight:700,color:isOpen?GREEN:RED}}>
              {isOpen?"✅ Store is Open Right Now!":"❌ Store is Currently Closed"}
            </div>
          </div>
          <div style={{background:"#fff",borderRadius:14,padding:"16px",marginBottom:12,border:`1px solid ${GL}`}}>
            <div style={{fontSize:14,fontWeight:700,color:G,marginBottom:10}}>🚗 Pickup Only — Nearby Areas</div>
            <div style={{fontSize:12,color:MT,marginBottom:10}}>We welcome customers from these nearby areas:</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {STORE.nearbyAreas.map(a=>(
                <span key={a} style={{background:GL,color:GM,fontSize:12,padding:"5px 12px",borderRadius:20,fontWeight:500}}>{a}</span>
              ))}
            </div>
          </div>
          <div style={{background:"#fff",borderRadius:14,padding:"16px",border:`1px solid ${GL}`}}>
            <div style={{fontSize:14,fontWeight:700,color:G,marginBottom:10}}>📞 Contact Us</div>
            <a href={`tel:${STORE.phone}`} style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none",color:DK}}>
              <div style={{width:40,height:40,borderRadius:10,background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>📞</div>
              <div><div style={{fontSize:13,fontWeight:600}}>Call Store</div><div style={{fontSize:12,color:MT}}>{STORE.phone}</div></div>
            </a>
          </div>
        </div>
      )}

      {/* CART */}
      {page==="cart"&&(
        <div style={{padding:16,paddingBottom:100}}>
          <div style={{fontSize:17,fontWeight:700,marginBottom:6}}>🛒 My Cart</div>
          <div style={{background:GL,borderRadius:10,padding:"9px 13px",marginBottom:14,fontSize:12,color:GM,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>
            🏪 Store Pickup · {STORE.address}
          </div>
          {cartCount===0?(
            <div style={{textAlign:"center",marginTop:50}}>
              <div style={{fontSize:60}}>🛒</div>
              <div style={{fontSize:16,fontWeight:700,marginTop:12}}>Cart is empty</div>
              <div style={{fontSize:12,color:MT,marginTop:4,marginBottom:24}}>Add fresh Amul products to get started</div>
              <button onClick={()=>setPage("home")} style={gradBtn}>Browse Products</button>
            </div>
          ):(
            <>
              {Object.entries(cart).map(([id,qty])=>{
                const p=products.find(x=>x.id==id);
                return(
                  <div key={id} style={{background:"#fff",borderRadius:14,padding:"12px",marginBottom:10,display:"flex",gap:12,border:`1px solid ${GL}`}}>
                    <Thumb src={p.img} emoji={p.emoji} bg={p.bg} size={56}/>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:600,lineHeight:1.3}}>{p.name}</div>
                      <div style={{fontSize:11,color:MT}}>{p.unit}</div>
                      <div style={{fontSize:13,fontWeight:700,color:G,marginTop:4}}>₹{p.price} × {qty} = ₹{p.price*qty}</div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5}}>
                      <button onClick={()=>remCart(p.id)} style={{width:28,height:28,borderRadius:"50%",background:GL,border:`1.5px solid ${G}`,cursor:"pointer",fontSize:16,color:G,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                      <span style={{fontSize:13,fontWeight:700}}>{qty}</span>
                      <button onClick={()=>addCart(p.id)} style={{width:28,height:28,borderRadius:"50%",background:G,border:"none",cursor:"pointer",fontSize:16,color:"#fff",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                    </div>
                  </div>
                );
              })}
              <div style={{background:"#fff",borderRadius:14,padding:"14px",border:`1px solid ${GL}`,marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4}}><span style={{color:MT}}>Items ({cartCount})</span><span>₹{cartTotal}</span></div>
                <div style={{height:1,background:GL,margin:"8px 0"}}></div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:16,fontWeight:700}}><span>Total</span><span style={{color:G}}>₹{cartTotal}</span></div>
              </div>
              <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:420,padding:"12px 16px",background:IV,borderTop:`1px solid ${GL}`,boxSizing:"border-box",zIndex:15}}>
                <button onClick={()=>{setCheckoutStep(1);setPage("checkout");}} style={{...gradBtn,display:"flex",alignItems:"center",justifyContent:"space-between",borderRadius:14,padding:"15px 16px",fontSize:15}}>
                  <span>Place Order</span>
                  <span style={{background:"rgba(255,255,255,0.2)",borderRadius:8,padding:"4px 12px",fontSize:13}}>₹{cartTotal} →</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* CHECKOUT */}
      {page==="checkout"&&(
        <div style={{padding:16,paddingBottom:80}}>
          {checkoutStep<3&&(
            <div style={{display:"flex",alignItems:"center",marginBottom:20}}>
              {["Verify","Details","Done"].map((s,i)=>{
                const st=i+1;const done=checkoutStep>st;const active=checkoutStep===st;
                return(
                  <div key={s} style={{display:"flex",alignItems:"center",flex:1}}>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center",flex:1}}>
                      <div style={{width:30,height:30,borderRadius:"50%",background:done?GREEN:active?G:"#fff",border:`2px solid ${done?GREEN:active?G:GL}`,color:done||active?"#fff":MT,display:"flex",alignItems:"center",justifyContent:"center",fontSize:done?14:12,fontWeight:700,marginBottom:3}}>
                        {done?"✓":st}
                      </div>
                      <div style={{fontSize:9,color:active?G:MT,fontWeight:active?700:400}}>{s}</div>
                    </div>
                    {i<2&&<div style={{height:2,background:done?GREEN:GL,flex:1,marginBottom:14,marginTop:-14}}></div>}
                  </div>
                );
              })}
            </div>
          )}

          {/* OTP */}
          {checkoutStep===1&&(
            <div>
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>Verify Mobile Number</div>
              <div style={{fontSize:12,color:MT,marginBottom:18}}>Enter your number to place order</div>
              {!otpSent?(
                <>
                  <div style={{fontSize:11,color:MT,marginBottom:5,fontWeight:500}}>Mobile Number</div>
                  <div style={{display:"flex",gap:8,marginBottom:6}}>
                    <div style={{...inp,width:58,flexShrink:0,padding:"11px 6px",textAlign:"center",color:MT,fontSize:12}}>🇮🇳 +91</div>
                    <input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="10-digit number" style={{...inp,flex:1}} type="tel"/>
                  </div>
                  {otpErr&&<div style={{fontSize:11,color:RED,marginBottom:8}}>{otpErr}</div>}
                  <button onClick={sendOTP} style={{...gradBtn,marginTop:10}}>Send OTP →</button>
                </>
              ):(
                <>
                  <div style={{fontSize:13,color:MT,marginBottom:16}}>OTP sent to <strong>+91 {phone}</strong> <span style={{color:G,cursor:"pointer",fontSize:11}} onClick={()=>setOtpSent(false)}>Change</span></div>
                  <div style={{display:"flex",gap:9,marginBottom:10,justifyContent:"center"}}>
                    {otp.map((d,i)=>(
                      <input key={i} ref={otpRefs[i]} value={d} onChange={e=>handleOtp(e.target.value,i)} onKeyDown={e=>e.key==="Backspace"&&!d&&i>0&&otpRefs[i-1].current?.focus()} maxLength={1} type="tel"
                        style={{width:46,height:54,borderRadius:12,border:`2px solid ${d?G:GL}`,textAlign:"center",fontSize:22,fontWeight:700,color:DK,background:"#fff",outline:"none",boxSizing:"border-box"}}/>
                    ))}
                  </div>
                  {otpErr&&<div style={{fontSize:11,color:RED,textAlign:"center",marginBottom:8}}>{otpErr}</div>}
                  <div style={{textAlign:"center",fontSize:12,color:MT,marginBottom:14}}>
                    {timerOn?<span>Resend in <strong style={{color:G}}>{timer}s</strong></span>:<span style={{color:G,cursor:"pointer",fontWeight:600}} onClick={()=>{setTimer(30);setTimerOn(true);setOtp(["","","","","",""]);showToast("OTP resent!");}}>Resend OTP</span>}
                  </div>
                  <button onClick={verifyOTP} style={gradBtn}>Verify & Continue →</button>
                  <div style={{background:GL,borderRadius:10,padding:"9px",marginTop:10,fontSize:11,color:MT,textAlign:"center"}}>💡 Demo: any 6 digits work</div>
                </>
              )}
            </div>
          )}

          {/* ORDER DETAILS */}
          {checkoutStep===2&&(
            <div>
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>Order Details</div>
              <div style={{fontSize:12,color:MT,marginBottom:16}}>Tell us about your pickup</div>
              <div style={{background:GL,borderRadius:12,padding:"11px 14px",marginBottom:14,fontSize:12,color:GM,fontWeight:600}}>
                🏪 Pickup from: {STORE.address}
              </div>
              <div style={{fontSize:11,color:MT,marginBottom:4,fontWeight:500}}>Your Name *</div>
              <input value={custName} onChange={e=>setCustName(e.target.value)} placeholder="Enter your full name" style={{...inp,marginBottom:12}}/>
              <div style={{fontSize:11,color:MT,marginBottom:8,fontWeight:500}}>Your Area / Nearby Location *</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:14}}>
                {STORE.nearbyAreas.map(a=>(
                  <div key={a} onClick={()=>setSelectedArea(a)} style={{background:selectedArea===a?G:GL,color:selectedArea===a?"#fff":GM,fontSize:12,padding:"7px 14px",borderRadius:20,fontWeight:500,cursor:"pointer",border:`1.5px solid ${selectedArea===a?GM:GL}`}}>{a}</div>
                ))}
              </div>
              <div style={{fontSize:11,color:MT,marginBottom:8,fontWeight:500}}>Preferred Pickup Time *</div>
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
                {["7:00 AM – 9:00 AM","9:00 AM – 12:00 PM","12:00 PM – 3:00 PM","3:00 PM – 6:00 PM","6:00 PM – 9:00 PM","9:00 PM – 11:00 PM"].map(t=>(
                  <div key={t} onClick={()=>setPickupTime(t)} style={{display:"flex",alignItems:"center",gap:10,background:pickupTime===t?GL:"#fff",border:`2px solid ${pickupTime===t?G:GL}`,borderRadius:11,padding:"11px 14px",cursor:"pointer"}}>
                    <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${G}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {pickupTime===t&&<div style={{width:9,height:9,borderRadius:"50%",background:G}}></div>}
                    </div>
                    <span style={{fontSize:13,fontWeight:pickupTime===t?700:400}}>🕐 {t}</span>
                  </div>
                ))}
              </div>
              {formErr&&<div style={{fontSize:11,color:RED,marginBottom:8}}>{formErr}</div>}
              <div style={{background:"#fff",borderRadius:12,padding:"13px",border:`1px solid ${GL}`,marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:3}}><span style={{color:MT}}>Items</span><span>₹{cartTotal}</span></div>
                <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:15,borderTop:`1px solid ${GL}`,paddingTop:8,marginTop:5}}><span>Total</span><span style={{color:G}}>₹{cartTotal}</span></div>
              </div>
              <button onClick={placeOrder} style={{...gradBtn,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",borderRadius:14,fontSize:15}}>
                <span>Confirm Order</span>
                <span style={{background:"rgba(255,255,255,0.2)",borderRadius:8,padding:"4px 12px"}}>₹{cartTotal} →</span>
              </button>
            </div>
          )}

          {/* SUCCESS */}
          {checkoutStep===3&&orderDone&&(
            <div style={{textAlign:"center",padding:"16px 0"}}>
              <div style={{width:86,height:86,borderRadius:"50%",background:"#EAF3DE",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:44}}>✅</div>
              <div style={{fontSize:22,fontWeight:700,color:GREEN,marginBottom:4}}>Order Confirmed! 🎉</div>
              <div style={{fontSize:14,fontWeight:600,color:DK,marginBottom:4}}>{orderDone.id}</div>
              <div style={{fontSize:13,color:MT,marginBottom:20}}>Thank you, {orderDone.name}!</div>
              <div style={{background:"#fff",borderRadius:14,padding:"16px",marginBottom:12,textAlign:"left",border:`1px solid ${GL}`}}>
                {[{l:"Order ID",v:orderDone.id},{l:"Total",v:`₹${orderDone.total}`},{l:"Pickup From",v:STORE.address},{l:"Your Area",v:orderDone.area},{l:"Pickup Time",v:`🕐 ${orderDone.pickupTime}`},{l:"Status",v:"✅ Confirmed"}].map(r=>(
                  <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${GL}`,fontSize:12}}>
                    <span style={{color:MT,flexShrink:0}}>{r.l}</span><span style={{fontWeight:600,textAlign:"right",maxWidth:"60%"}}>{r.v}</span>
                  </div>
                ))}
              </div>
              <div style={{background:GL,borderRadius:12,padding:"12px",marginBottom:14,fontSize:12,color:MT,lineHeight:1.8,textAlign:"left"}}>
                💬 Confirmation sent to <strong>+91 {orderDone.phone}</strong><br/>
                🏪 Please collect your order from our store during your selected time slot.
              </div>
              <button onClick={()=>{setPage("home");setCheckoutStep(1);}} style={{...gradBtn,marginBottom:10,borderRadius:14,padding:"14px"}}>Continue Shopping 🛒</button>
            </div>
          )}
        </div>
      )}

      {/* ORDERS */}
      {page==="orders"&&(
        <div style={{padding:16,paddingBottom:80}}>
          <div style={{fontSize:17,fontWeight:700,marginBottom:14}}>My Orders</div>
          {orderDone?(
            <div style={{background:"#fff",borderRadius:14,padding:"16px",border:`1px solid ${GL}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <span style={{fontSize:14,fontWeight:700,color:G}}>{orderDone.id}</span>
                <span style={{background:GREEN+"22",color:GREEN,fontSize:10,padding:"3px 10px",borderRadius:20,fontWeight:700}}>Confirmed ✅</span>
              </div>
              <div style={{fontSize:12,color:MT,marginBottom:2}}>💰 ₹{orderDone.total}</div>
              <div style={{fontSize:12,color:MT,marginBottom:2}}>🕐 {orderDone.pickupTime}</div>
              <div style={{fontSize:12,color:MT}}>📍 {STORE.address}</div>
            </div>
          ):(
            <div style={{textAlign:"center",marginTop:60,color:MT}}>
              <div style={{fontSize:60}}>📦</div>
              <div style={{fontSize:16,fontWeight:700,marginTop:12,color:DK}}>No orders yet</div>
              <button onClick={()=>setPage("home")} style={{...gradBtn,marginTop:20,width:"auto",padding:"12px 28px"}}>Start Shopping</button>
            </div>
          )}
        </div>
      )}

      {/* ACCOUNT */}
      {page==="account"&&(
        <div style={{padding:16,paddingBottom:80}}>
          <div style={{background:`linear-gradient(135deg,${DK},#6B4F2A)`,borderRadius:16,padding:"20px",marginBottom:14,textAlign:"center"}}>
            <div style={{width:60,height:60,borderRadius:"50%",background:G,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,color:"#fff",fontWeight:700,margin:"0 auto 10px"}}>{custName?custName[0].toUpperCase():"👤"}</div>
            <div style={{fontSize:16,fontWeight:700,color:"#fff"}}>{custName||"Guest User"}</div>
            {phone&&<div style={{fontSize:12,color:"#ffffff88",marginTop:2}}>+91 {phone}</div>}
          </div>
          {[
            {l:"My Orders",ic:"📦",sub:"View your order history",a:()=>setPage("orders")},
            {l:"Store Location",ic:"📍",sub:"H.No. 288-A, Rohit Nagar Phase-II",a:()=>setPage("store")},
            {l:"Store Timings",ic:"⏰",sub:"7:00 AM – 11:00 PM, All Days",a:()=>setPage("store")},
            {l:"Admin Login",ic:"🔐",sub:"Manage products & orders",a:()=>setPage("adminLogin")},
          ].map(item=>(
            <div key={item.l} onClick={item.a} style={{background:"#fff",border:`1px solid ${GL}`,borderRadius:12,padding:"14px 16px",marginBottom:9,display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:38,height:38,borderRadius:10,background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{item.ic}</div>
                <div><div style={{fontSize:13,fontWeight:600}}>{item.l}</div><div style={{fontSize:11,color:MT}}>{item.sub}</div></div>
              </div>
              <span style={{color:MT,fontSize:20}}>›</span>
            </div>
          ))}
        </div>
      )}

      {/* ADMIN LOGIN PAGE */}
      {page==="adminLogin"&&(
        <div style={{padding:24,paddingBottom:80}}>
          <div style={{textAlign:"center",marginBottom:24}}>
            <div style={{width:64,height:64,borderRadius:16,background:G,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,margin:"0 auto 12px"}}>🔐</div>
            <div style={{fontSize:18,fontWeight:700}}>Admin Login</div>
            <div style={{fontSize:12,color:MT,marginTop:4}}>Nanoperk Store Management</div>
          </div>
          <div style={{fontSize:11,color:MT,marginBottom:5,fontWeight:500}}>Admin Password</div>
          <input value={adminPass} onChange={e=>setAdminPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&loginAdmin()} placeholder="Enter admin password" type="password" style={{...inp,marginBottom:8}}/>
          {adminErr&&<div style={{fontSize:11,color:RED,marginBottom:8}}>{adminErr}</div>}
          <button onClick={loginAdmin} style={{...gradBtn,marginTop:6}}>Login to Admin Panel →</button>
          <div style={{background:GL,borderRadius:10,padding:"10px",marginTop:12,fontSize:11,color:MT,textAlign:"center"}}>💡 Demo password: nanoperk@admin123</div>
          <button onClick={()=>setPage("account")} style={{width:"100%",background:"transparent",color:MT,border:`1.5px solid ${GL}`,borderRadius:12,padding:"12px",fontSize:13,cursor:"pointer",marginTop:10}}>← Back</button>
        </div>
      )}

      {/* BOTTOM NAV */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:420,background:"#fff",borderTop:`1px solid ${GL}`,display:"flex",zIndex:20,boxShadow:"0 -4px 16px rgba(0,0,0,0.08)"}}>
        {[{id:"home",l:"Home",ic:"🏠"},{id:"catalog",l:"Shop",ic:"🛍️"},{id:"store",l:"Store",ic:"🏪"},{id:"orders",l:"Orders",ic:"📦"},{id:"account",l:"Account",ic:"👤"}].map(n=>(
          <button key={n.id} onClick={()=>setPage(n.id)} style={{flex:1,background:"none",border:"none",padding:"10px 4px 8px",cursor:"pointer",color:page===n.id?G:MT,display:"flex",flexDirection:"column",alignItems:"center",gap:2,position:"relative"}}>
            <span style={{fontSize:19}}>{n.ic}</span>
            <span style={{fontSize:9,fontWeight:page===n.id?700:400}}>{n.l}</span>
            {page===n.id&&<div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:20,height:3,background:G,borderRadius:"2px 2px 0 0"}}></div>}
          </button>
        ))}
      </div>
    </div>
  );
}

function PCard({p,cart,addCart,remCart}){
  return(
    <div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:"1px solid #F5E9C0",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
      <div style={{background:p.bg,height:110,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
        {p.img?<img src={p.img} style={{width:"100%",height:"100%",objectFit:"contain"}} onError={e=>{e.target.style.display="none";}} alt=""/>:<span style={{fontSize:48}}>{p.emoji}</span>}
        {p.badge&&<span style={{position:"absolute",top:7,left:7,background:"#D4AF37",color:"#fff",fontSize:8,padding:"2px 7px",borderRadius:8,fontWeight:700}}>{p.badge}</span>}
      </div>
      <div style={{padding:"10px"}}>
        <div style={{fontSize:11,fontWeight:600,color:"#3A2E1A",lineHeight:1.3,marginBottom:3,minHeight:28}}>{p.name}</div>
        <div style={{fontSize:10,color:"#7A6A44",marginBottom:7}}>{p.unit}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:14,fontWeight:700,color:"#D4AF37"}}>₹{p.price}</span>
          {cart[p.id]?(
            <div style={{display:"flex",alignItems:"center",gap:4}}>
              <button onClick={()=>remCart(p.id)} style={{width:24,height:24,borderRadius:"50%",background:"#F5E9C0",border:"1.5px solid #D4AF37",cursor:"pointer",fontSize:14,color:"#D4AF37",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
              <span style={{fontSize:12,fontWeight:700,minWidth:14,textAlign:"center"}}>{cart[p.id]}</span>
              <button onClick={()=>addCart(p.id)} style={{width:24,height:24,borderRadius:"50%",background:"#D4AF37",border:"none",cursor:"pointer",fontSize:14,color:"#fff",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
            </div>
          ):(
            <button onClick={()=>addCart(p.id)} style={{background:"#D4AF37",color:"#fff",border:"none",borderRadius:8,padding:"6px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>+ Add</button>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminPanel({products,setEditModal,setEditForm,toggleAvailable,setAddModal,setMode,setPage,showToast,toast,editModal,editForm,addModal,addProduct,newProd,setNewProd,imgFileRef,inp,G,GL,GM,IV,DK,MT,RED,GREEN,editImgUrlVal,setEditImgUrlVal,editFormVal,setEditFormVal}){
  const [adminTab,setAdminTab]=useState("products");
  const [imgFile,setImgFile]=useState(null);
  const fileRef=useRef();

  const handleFile=e=>{
    const f=e.target.files[0];if(!f)return;
    const r=new FileReader();r.onload=ev=>setEditImgUrlVal(ev.target.result);r.readAsDataURL(f);
  };
  const handleNewFile=e=>{
    const f=e.target.files[0];if(!f)return;
    const r=new FileReader();r.onload=ev=>setNewProd(p=>({...p,img:ev.target.result}));r.readAsDataURL(f);
  };

  const gradBtn2={background:`linear-gradient(135deg,${G},${GM})`,color:"#fff",border:"none",borderRadius:9,padding:"10px 18px",fontWeight:700,fontSize:13,cursor:"pointer"};

  return(
    <div style={{fontFamily:"sans-serif",color:DK,maxWidth:900,margin:"0 auto",background:"#F8F4EC",minHeight:"100vh",display:"flex"}}>
      {toast&&<div style={{position:"fixed",top:14,left:"50%",transform:"translateX(-50%)",background:DK,color:"#fff",padding:"9px 20px",borderRadius:20,fontSize:12,zIndex:100,whiteSpace:"nowrap"}}>{toast}</div>}

      {/* Sidebar */}
      <div style={{width:190,background:DK,minHeight:"100vh",flexShrink:0,display:"flex",flexDirection:"column"}}>
        <div style={{padding:"18px 14px",borderBottom:"1px solid #ffffff18"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:32,height:32,borderRadius:8,background:G,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:14}}>N</div>
            <div><div style={{fontSize:13,fontWeight:700,color:G}}>Nanoperk</div><div style={{fontSize:10,color:"#ffffff55"}}>Admin Panel</div></div>
          </div>
        </div>
        <div style={{flex:1,padding:"10px 8px"}}>
          {[{id:"products",ic:"◫",l:"Products"},{id:"orders",ic:"📦",l:"Orders"},{id:"store",ic:"🏪",l:"Store Info"}].map(n=>(
            <div key={n.id} onClick={()=>setAdminTab(n.id)} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 11px",borderRadius:8,marginBottom:3,cursor:"pointer",background:adminTab===n.id?G+"33":"transparent",color:adminTab===n.id?G:"#ffffffaa",fontSize:13}}>
              <span style={{fontSize:15}}>{n.ic}</span>{n.l}
            </div>
          ))}
        </div>
        <div style={{padding:"12px",borderTop:"1px solid #ffffff18"}}>
          <button onClick={()=>setMode("customer")} style={{width:"100%",background:"transparent",color:"#ffffff66",border:"1px solid #ffffff22",borderRadius:8,padding:"8px",fontSize:12,cursor:"pointer"}}>← Customer View</button>
        </div>
      </div>

      {/* Main */}
      <div style={{flex:1,padding:20,overflowY:"auto"}}>

        {/* PRODUCTS TAB */}
        {adminTab==="products"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontSize:18,fontWeight:700}}>Products ({products.length})</div>
              <button onClick={()=>setAddModal(true)} style={gradBtn2}>+ Add New Product</button>
            </div>
            <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:`1px solid ${GL}`}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr style={{background:GL}}>
                  {["Image","Product","Cat","Price","Stock","Available","Actions"].map(h=><th key={h} style={{padding:"10px 12px",textAlign:"left",fontWeight:700,color:MT,fontSize:11}}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {products.map((p,i)=>(
                    <tr key={p.id} style={{borderTop:`1px solid ${GL}`,background:i%2===0?"#fff":"#FDFAF3",opacity:p.available?1:0.5}}>
                      <td style={{padding:"8px 12px"}}>
                        <div style={{width:44,height:44,borderRadius:8,background:p.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:0,overflow:"hidden"}}>
                          {p.img?<img src={p.img} style={{width:44,height:44,objectFit:"contain"}} onError={e=>e.target.style.display="none"} alt=""/>:<span style={{fontSize:22}}>{p.emoji}</span>}
                        </div>
                      </td>
                      <td style={{padding:"8px 12px"}}>
                        <div style={{fontWeight:600,fontSize:12}}>{p.name}</div>
                        <div style={{fontSize:11,color:MT}}>{p.unit}</div>
                      </td>
                      <td style={{padding:"8px 12px"}}><span style={{background:GL,color:GM,fontSize:10,padding:"2px 8px",borderRadius:20,fontWeight:600}}>{p.cat}</span></td>
                      <td style={{padding:"8px 12px",fontWeight:700,color:G}}>₹{p.price}</td>
                      <td style={{padding:"8px 12px"}}><span style={{background:p.available?"#EAF3DE":"#FCEBEB",color:p.available?GREEN:RED,fontSize:10,padding:"2px 8px",borderRadius:20,fontWeight:600}}>{p.available?"In Stock":"Out"}</span></td>
                      <td style={{padding:"8px 12px"}}>
                        <div style={{width:36,height:20,borderRadius:10,background:p.available?G:"#ccc",cursor:"pointer",position:"relative",transition:"all 0.2s"}} onClick={()=>toggleAvailable(p.id)}>
                          <div style={{position:"absolute",top:2,left:p.available?18:2,width:16,height:16,borderRadius:"50%",background:"#fff",transition:"all 0.2s"}}></div>
                        </div>
                      </td>
                      <td style={{padding:"8px 12px"}}>
                        <button onClick={()=>{setEditModal(p);setEditFormVal({...p});setEditImgUrlVal(p.img||"");}} style={{background:G,color:"#fff",border:"none",borderRadius:7,padding:"5px 12px",fontSize:11,fontWeight:600,cursor:"pointer"}}>✏️ Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {adminTab==="orders"&&(
          <div>
            <div style={{fontSize:18,fontWeight:700,marginBottom:16}}>Orders</div>
            <div style={{background:"#fff",borderRadius:12,padding:"30px",textAlign:"center",border:`1px solid ${GL}`,color:MT}}>
              <div style={{fontSize:40,marginBottom:8}}>📦</div>
              <div style={{fontSize:14,fontWeight:600,color:DK}}>Orders will appear here</div>
              <div style={{fontSize:12,marginTop:4}}>Connect Firebase backend to see live orders from customers</div>
            </div>
          </div>
        )}

        {/* STORE INFO TAB */}
        {adminTab==="store"&&(
          <div>
            <div style={{fontSize:18,fontWeight:700,marginBottom:16}}>Store Information</div>
            <div style={{background:"#fff",borderRadius:12,padding:"18px",border:`1px solid ${GL}`}}>
              {[{l:"Store Name",v:"Nanoperk Store"},{l:"Area",v:"Rohit Nagar, Bawadiya Kalan, Bhopal"},{l:"Timing",v:"7:00 AM – 11:00 PM"},{l:"Days",v:"Monday – Sunday (All Days)"},{l:"Phone",v:"9826XXXXXX"},{l:"Pickup Mode",v:"Store Pickup Only"}].map(r=>(
                <div key={r.l} style={{display:"flex",padding:"10px 0",borderBottom:`1px solid ${GL}`,fontSize:13}}>
                  <span style={{color:MT,width:120,flexShrink:0}}>{r.l}</span>
                  <span style={{fontWeight:600}}>{r.v}</span>
                </div>
              ))}
              <div style={{marginTop:12,fontSize:12,color:MT}}>To update store details, edit the STORE config in App.js on GitHub.</div>
            </div>
          </div>
        )}
      </div>

      {/* EDIT PRODUCT MODAL */}
      {editModal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:80,padding:16}}>
          <div style={{background:IV,width:"100%",maxWidth:460,borderRadius:16,padding:22,maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{fontSize:15,fontWeight:700,marginBottom:14}}>✏️ Edit Product</div>

            {/* Image section */}
            <div style={{textAlign:"center",marginBottom:14}}>
              <div style={{width:90,height:90,borderRadius:14,background:editModal.bg,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px",overflow:"hidden",fontSize:0}}>
                {editImgUrlVal?<img src={editImgUrlVal} style={{width:90,height:90,objectFit:"contain"}} onError={e=>{e.target.style.display="none";}} alt=""/>:<span style={{fontSize:44}}>{editModal.emoji}</span>}
              </div>
              <div style={{fontSize:11,color:MT,marginBottom:6}}>Product Image</div>
            </div>
            <div style={{fontSize:11,color:MT,marginBottom:4}}>Paste Image URL</div>
            <input value={editImgUrlVal} onChange={e=>setEditImgUrlVal(e.target.value)} placeholder="https://example.com/product.jpg" style={{...inp,marginBottom:8}}/>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{display:"none"}}/>
            <button onClick={()=>fileRef.current.click()} style={{...gradBtn2,width:"100%",marginBottom:14,textAlign:"center",display:"block"}}>📁 Upload from Device</button>

            {[{l:"Product Name",k:"name"},{l:"Category",k:"cat"},{l:"Price (₹)",k:"price"},{l:"Unit",k:"unit"},{l:"Description",k:"desc"},{l:"Badge (e.g. Best Seller)",k:"badge"}].map(f=>(
              <div key={f.k} style={{marginBottom:10}}>
                <div style={{fontSize:11,color:MT,marginBottom:3,fontWeight:500}}>{f.l}</div>
                <input value={editFormVal[f.k]||""} onChange={e=>setEditFormVal(ef=>({...ef,[f.k]:e.target.value}))} style={inp}/>
              </div>
            ))}
            <div style={{display:"flex",gap:10,marginTop:6}}>
              <button style={{flex:1,background:"transparent",color:MT,border:`1.5px solid ${GL}`,borderRadius:9,padding:"11px",fontSize:13,fontWeight:600,cursor:"pointer"}} onClick={()=>setEditModal(null)}>Cancel</button>
              <button style={{...gradBtn2,flex:1,textAlign:"center"}} onClick={()=>{setEditFormVal(f=>({...f,img:editImgUrlVal}));setTimeout(()=>{setEditModal(null);showToast("Product updated! ✅");},100);}}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {addModal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:80,padding:16}}>
          <div style={{background:IV,width:"100%",maxWidth:420,borderRadius:16,padding:22,maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{fontSize:15,fontWeight:700,marginBottom:14}}>+ Add New Product</div>
            <input ref={imgFileRef} type="file" accept="image/*" onChange={handleNewFile} style={{display:"none"}}/>
            <div style={{textAlign:"center",marginBottom:10}}>
              <div style={{width:70,height:70,borderRadius:12,background:GL,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 6px",fontSize:0,overflow:"hidden"}}>
                {newProd.img?<img src={newProd.img} style={{width:70,height:70,objectFit:"contain"}} alt=""/>:<span style={{fontSize:36}}>{newProd.emoji}</span>}
              </div>
              <button onClick={()=>imgFileRef.current.click()} style={{...gradBtn2,fontSize:11,padding:"6px 14px"}}>Upload Image</button>
            </div>
            {[{l:"Product Name *",k:"name",ph:"e.g. Amul Gold Milk"},{l:"Price (₹) *",k:"price",ph:"e.g. 31"},{l:"Unit",k:"unit",ph:"e.g. 500ml, 200g"},{l:"Description",k:"desc",ph:"Short description"},{l:"Badge",k:"badge",ph:"e.g. Best Seller, New"},{l:"Emoji",k:"emoji",ph:"e.g. 🥛"}].map(f=>(
              <div key={f.k} style={{marginBottom:9}}>
                <div style={{fontSize:11,color:MT,marginBottom:3,fontWeight:500}}>{f.l}</div>
                <input value={newProd[f.k]||""} onChange={e=>setNewProd(p=>({...p,[f.k]:e.target.value}))} placeholder={f.ph} style={inp}/>
              </div>
            ))}
            <div style={{marginBottom:12}}>
              <div style={{fontSize:11,color:MT,marginBottom:3,fontWeight:500}}>Category</div>
              <select value={newProd.cat} onChange={e=>setNewProd(p=>({...p,cat:e.target.value}))} style={{...inp}}>
                {["Milk","Butter","Cheese","Paneer","Dahi","Ghee","Ice Cream","Chocolates","Beverages","Fresh Cream"].map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button style={{flex:1,background:"transparent",color:MT,border:`1.5px solid ${GL}`,borderRadius:9,padding:"11px",fontSize:13,cursor:"pointer"}} onClick={()=>setAddModal(false)}>Cancel</button>
              <button style={{...gradBtn2,flex:1,textAlign:"center"}} onClick={addProduct}>Add Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

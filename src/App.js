import { useState, useRef, useEffect } from "react";

const G="#D4AF37",GL="#F5E9C0",GM="#B8972A",IV="#FDFAF3",IV2="#F5EDD8",DK="#3A2E1A",MT="#7A6A44",RED="#C62828",GREEN="#2E7D32";
const btn=(c=G,w="auto")=>({background:c,color:"#fff",border:"none",borderRadius:10,padding:"12px 20px",fontWeight:500,fontSize:13,cursor:"pointer",width:w});
const obtn=(c=G)=>({background:"transparent",color:c,border:`1.5px solid ${c}`,borderRadius:10,padding:"10px 18px",fontWeight:500,fontSize:12,cursor:"pointer"});
const inp={width:"100%",padding:"12px 14px",borderRadius:10,border:`1.5px solid ${GL}`,fontSize:13,background:"#fff",boxSizing:"border-box",color:DK,outline:"none"};

const PRODUCTS=[
  {id:1,cat:"Milk",name:"Amul Gold Full Cream Milk",price:31,unit:"500ml",badge:"Best Seller",img:"🥛",desc:"Rich & creamy full cream milk"},
  {id:2,cat:"Milk",name:"Amul Taaza Toned Milk",price:25,unit:"500ml",badge:"Daily Essential",img:"🥛",desc:"Fresh toned milk daily"},
  {id:3,cat:"Milk",name:"Amul A2 Milk",price:38,unit:"500ml",badge:"Premium",img:"🥛",desc:"Pure A2 protein milk"},
  {id:4,cat:"Butter",name:"Amul Butter Pasteurised",price:56,unit:"100g",badge:"Popular",img:"🧈",desc:"Classic salted butter"},
  {id:5,cat:"Butter",name:"Amul Lite Low Fat Spread",price:48,unit:"100g",badge:"",img:"🧈",desc:"Light bread spread"},
  {id:6,cat:"Cheese",name:"Amul Processed Cheese Block",price:90,unit:"200g",badge:"",img:"🧀",desc:"Smooth processed cheese"},
  {id:7,cat:"Cheese",name:"Amul Pizza Mozzarella",price:145,unit:"200g",badge:"New",img:"🧀",desc:"Stretchy pizza cheese"},
  {id:8,cat:"Paneer",name:"Amul Fresh Paneer",price:90,unit:"200g",badge:"Fresh",img:"🍽️",desc:"Soft fresh cottage cheese"},
  {id:9,cat:"Paneer",name:"Amul Malai Paneer",price:100,unit:"200g",badge:"",img:"🍽️",desc:"Creamy malai paneer"},
  {id:10,cat:"Dahi",name:"Amul Masti Dahi",price:48,unit:"400g",badge:"Best Seller",img:"🫙",desc:"Thick set curd"},
  {id:11,cat:"Dahi",name:"Amul Lassi",price:30,unit:"200ml",badge:"",img:"🥤",desc:"Sweet chilled lassi"},
  {id:12,cat:"Ghee",name:"Amul Pure Ghee",price:275,unit:"500ml",badge:"Premium",img:"✨",desc:"100% pure cow ghee"},
  {id:13,cat:"Ice Cream",name:"Amul Vanilla Ice Cream",price:95,unit:"500ml",badge:"",img:"🍦",desc:"Classic vanilla flavour"},
  {id:14,cat:"Ice Cream",name:"Amul Kesar Pista Kulfi",price:25,unit:"60ml",badge:"Popular",img:"🍧",desc:"Traditional kesar kulfi"},
  {id:15,cat:"Chocolates",name:"Amul Dark Chocolate 55%",price:55,unit:"55g",badge:"",img:"🍫",desc:"55% dark cocoa"},
  {id:16,cat:"Beverages",name:"Amul Kool Cafe",price:25,unit:"200ml",badge:"Popular",img:"☕",desc:"Chilled coffee drink"},
];

const CATS=["All",...[...new Set(PRODUCTS.map(p=>p.cat))]];
const CAT_ICONS={"Milk":"🥛","Butter":"🧈","Cheese":"🧀","Paneer":"🍽️","Dahi":"🫙","Ghee":"✨","Ice Cream":"🍦","Chocolates":"🍫","Beverages":"☕"};
const SLOTS=["6:00 AM – 8:00 AM","8:00 AM – 10:00 AM","10:00 AM – 12:00 PM","4:00 PM – 6:00 PM","6:00 PM – 8:00 PM"];
const BANNERS=[
  {bg:"#3A2E1A",text:"🥛 Fresh Milk Daily",sub:"Subscribe & save 10%",cta:"Subscribe Now",color:"#D4AF37"},
  {bg:"#1a3a2e",text:"🧈 Amul Butter Back!",sub:"Stock just refilled",cta:"Order Now",color:"#2E7D32"},
  {bg:"#2e1a3a",text:"🍦 Summer Special",sub:"Ice creams at best price",cta:"Shop Now",color:"#7B1FA2"},
];

export default function App(){
  const [page,setPage]=useState("home");
  const [cat,setCat]=useState("All");
  const [search,setSearch]=useState("");
  const [cart,setCart]=useState({});
  const [banner,setBanner]=useState(0);
  const [checkoutStep,setCheckoutStep]=useState(1); // 1=login, 2=details, 3=slot, 4=review, 5=success
  const [phone,setPhone]=useState("");
  const [otp,setOtp]=useState(["","","","","",""]);
  const [otpSent,setOtpSent]=useState(false);
  const [otpErr,setOtpErr]=useState("");
  const [timer,setTimer]=useState(30);
  const [timerOn,setTimerOn]=useState(false);
  const [custName,setCustName]=useState("");
  const [custEmail,setCustEmail]=useState("");
  const [houseNo,setHouseNo]=useState("");
  const [area,setArea]=useState("");
  const [landmark,setLandmark]=useState("");
  const [saveAddr,setSaveAddr]=useState(true);
  const [slot,setSlot]=useState(SLOTS[0]);
  const [formErr,setFormErr]=useState("");
  const [orderDone,setOrderDone]=useState(null);
  const [toast,setToast]=useState("");
  const otpRefs=[useRef(),useRef(),useRef(),useRef(),useRef(),useRef()];

  useEffect(()=>{
    const t=setInterval(()=>setBanner(b=>(b+1)%BANNERS.length),3500);
    return()=>clearInterval(t);
  },[]);

  useEffect(()=>{
    if(!timerOn)return;
    if(timer===0){setTimerOn(false);return;}
    const t=setTimeout(()=>setTimer(v=>v-1),1000);
    return()=>clearTimeout(t);
  },[timer,timerOn]);

  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2000);};
  const addCart=id=>setCart(c=>({...c,[id]:(c[id]||0)+1}));
  const remCart=id=>setCart(c=>{const n={...c};n[id]>1?n[id]--:delete n[id];return n;});
  const cartCount=Object.values(cart).reduce((a,b)=>a+b,0);
  const cartTotal=Object.entries(cart).reduce((a,[id,q])=>a+(PRODUCTS.find(p=>p.id==id)?.price||0)*q,0);
  const filtered=PRODUCTS.filter(p=>(cat==="All"||p.cat===cat)&&(!search||p.name.toLowerCase().includes(search.toLowerCase())));

  const sendOTP=()=>{
    if(phone.length!==10){setOtpErr("Enter valid 10-digit number");return;}
    setOtpErr("");setOtpSent(true);setTimer(30);setTimerOn(true);
    showToast(`OTP sent to +91 ${phone}`);
  };
  const handleOtp=(v,i)=>{
    if(!/^\d?$/.test(v))return;
    const n=[...otp];n[i]=v;setOtp(n);
    if(v&&i<5)otpRefs[i+1].current?.focus();
    if(!v&&i>0)otpRefs[i-1].current?.focus();
  };
  const verifyOTP=()=>{
    if(otp.join("").length<6){setOtpErr("Enter complete 6-digit OTP");return;}
    setCheckoutStep(2);setOtpErr("");
  };
  const saveDetails=()=>{
    if(!custName){setFormErr("Please enter your name");return;}
    if(!houseNo){setFormErr("Please enter your address");return;}
    if(!area){setFormErr("Please enter your area");return;}
    setFormErr("");setCheckoutStep(3);
  };
  const placeOrder=()=>{
    const id="ORD-"+Math.floor(3000+Math.random()*1000);
    setOrderDone({id,name:custName,phone,total:cartTotal,slot,address:`${houseNo}, ${area}${landmark?", "+landmark:""}`});
    setCheckoutStep(5);setCart({});
  };

  const navItems=[{id:"home",l:"Home",ic:"⌂"},{id:"catalog",l:"Shop",ic:"◫"},{id:"cart",l:"Cart",ic:"🛒"},{id:"orders",l:"Orders",ic:"📦"},{id:"account",l:"Account",ic:"◯"}];

  return(
    <div style={{fontFamily:"sans-serif",color:DK,maxWidth:420,margin:"0 auto",background:IV,minHeight:"100vh",position:"relative",paddingBottom:72}}>

      {toast&&<div style={{position:"fixed",top:14,left:"50%",transform:"translateX(-50%)",background:DK,color:"#fff",padding:"9px 18px",borderRadius:20,fontSize:12,zIndex:99,whiteSpace:"nowrap"}}>{toast}</div>}

      {/* HEADER */}
      <div style={{background:IV,borderBottom:`1px solid ${GL}`,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:32,height:32,borderRadius:8,background:G,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:15}}>N</div>
          <div>
            <div style={{fontSize:16,fontWeight:500,color:G,lineHeight:1}}>Nanoperk</div>
            <div style={{fontSize:10,color:MT}}>Fresh Amul Products</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{fontSize:11,color:MT,textAlign:"right"}}>
            <div style={{color:GREEN,fontWeight:500}}>● Open</div>
            <div>Bhopal</div>
          </div>
          <button onClick={()=>setPage("cart")} style={{...obtn(G),position:"relative",padding:"7px 12px",fontSize:13}}>
            🛒{cartCount>0&&<span style={{position:"absolute",top:-5,right:-5,background:RED,color:"#fff",borderRadius:"50%",fontSize:9,width:15,height:15,display:"flex",alignItems:"center",justifyContent:"center"}}>{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* ── HOME PAGE ── */}
      {page==="home"&&(
        <div>
          {/* Search Bar */}
          <div style={{padding:"12px 16px 8px"}}>
            <div style={{position:"relative"}}>
              <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:16,color:MT}}>🔍</span>
              <input value={search} onChange={e=>{setSearch(e.target.value);if(e.target.value)setCat("All");}} placeholder="Search milk, paneer, butter, ghee..." style={{...inp,paddingLeft:38,borderRadius:25,fontSize:13}}/>
              {search&&<button onClick={()=>setSearch("")} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:MT,fontSize:16}}>✕</button>}
            </div>
          </div>

          {/* Search Results */}
          {search?(
            <div style={{padding:"0 16px"}}>
              <div style={{fontSize:12,color:MT,marginBottom:8}}>{filtered.length} results for "{search}"</div>
              {filtered.map(p=><ProductCard key={p.id} p={p} cart={cart} addCart={addCart} remCart={remCart}/>)}
              {filtered.length===0&&<div style={{textAlign:"center",padding:"30px 0",color:MT}}>
                <div style={{fontSize:36}}>🔍</div>
                <div style={{marginTop:8,fontSize:13}}>No products found</div>
              </div>}
            </div>
          ):(
            <>
              {/* Auto Banner */}
              <div style={{padding:"0 16px 12px"}}>
                <div style={{background:BANNERS[banner].bg,borderRadius:14,padding:"18px 20px",overflow:"hidden",position:"relative",minHeight:90}}>
                  <div style={{fontSize:18,fontWeight:500,color:"#fff",marginBottom:3}}>{BANNERS[banner].text}</div>
                  <div style={{fontSize:12,color:"#ffffff99",marginBottom:12}}>{BANNERS[banner].sub}</div>
                  <button onClick={()=>setPage("catalog")} style={{background:BANNERS[banner].color,color:"#fff",border:"none",borderRadius:20,padding:"6px 16px",fontSize:12,fontWeight:500,cursor:"pointer"}}>{BANNERS[banner].cta}</button>
                  <div style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",fontSize:52,opacity:0.15}}>🥛</div>
                  <div style={{display:"flex",gap:5,marginTop:10}}>
                    {BANNERS.map((_,i)=><div key={i} style={{width:i===banner?18:5,height:5,borderRadius:3,background:i===banner?"#fff":"#ffffff55",transition:"width 0.3s"}}></div>)}
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div style={{padding:"0 16px 12px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <div style={{fontSize:15,fontWeight:500}}>Categories</div>
                  <span onClick={()=>setPage("catalog")} style={{fontSize:12,color:G,cursor:"pointer",fontWeight:500}}>View All →</span>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:9}}>
                  {Object.entries(CAT_ICONS).slice(0,8).map(([c,ic])=>(
                    <div key={c} onClick={()=>{setCat(c);setPage("catalog");}} style={{background:"#fff",border:`1px solid ${GL}`,borderRadius:12,padding:"12px 4px",textAlign:"center",cursor:"pointer"}}>
                      <div style={{fontSize:22}}>{ic}</div>
                      <div style={{fontSize:10,color:MT,marginTop:4,lineHeight:1.2}}>{c}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Products */}
              <div style={{padding:"0 16px 8px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <div style={{fontSize:15,fontWeight:500}}>⭐ Featured Products</div>
                  <span onClick={()=>setPage("catalog")} style={{fontSize:12,color:G,cursor:"pointer",fontWeight:500}}>See All →</span>
                </div>
                {[1,4,8,10,12,16].map(pid=>{
                  const p=PRODUCTS.find(x=>x.id===pid);if(!p)return null;
                  return <ProductCard key={pid} p={p} cart={cart} addCart={addCart} remCart={remCart}/>;
                })}
              </div>

              {/* Offers Banner */}
              <div style={{margin:"0 16px 16px",background:`linear-gradient(135deg,${IV2},${GL})`,borderRadius:14,padding:"16px",border:`1px solid ${GL}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div>
                  <div style={{fontSize:14,fontWeight:500,color:DK}}>🔄 Subscribe & Save</div>
                  <div style={{fontSize:11,color:MT,marginTop:2}}>Get daily delivery, skip anytime</div>
                </div>
                <button onClick={()=>setPage("catalog")} style={{...btn(G),padding:"8px 16px",fontSize:12}}>Subscribe</button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── CATALOG ── */}
      {page==="catalog"&&(
        <div style={{padding:16}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." style={{...inp,marginBottom:12}}/>
          <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:6,marginBottom:10}}>
            {CATS.map(c=><button key={c} onClick={()=>setCat(c)} style={{...obtn(cat===c?G:MT),background:cat===c?G:"transparent",color:cat===c?"#fff":MT,flexShrink:0,fontSize:11,padding:"5px 12px",borderRadius:20}}>{CAT_ICONS[c]||""} {c}</button>)}
          </div>
          <div style={{fontSize:11,color:MT,marginBottom:8}}>{filtered.length} products</div>
          {filtered.map(p=><ProductCard key={p.id} p={p} cart={cart} addCart={addCart} remCart={remCart}/>)}
        </div>
      )}

      {/* ── CART ── */}
      {page==="cart"&&(
        <div style={{padding:16}}>
          <div style={{fontSize:16,fontWeight:500,marginBottom:14}}>🛒 My Cart</div>
          {cartCount===0?(
            <div style={{textAlign:"center",color:MT,marginTop:60}}>
              <div style={{fontSize:52}}>🛒</div>
              <div style={{marginTop:12,fontSize:15,fontWeight:500}}>Your cart is empty</div>
              <div style={{fontSize:12,color:MT,marginTop:4,marginBottom:20}}>Add products to get started</div>
              <button style={btn(G)} onClick={()=>setPage("home")}>Browse Products</button>
            </div>
          ):(
            <>
              {Object.entries(cart).map(([id,qty])=>{
                const p=PRODUCTS.find(x=>x.id==id);
                return(
                  <div key={id} style={{background:"#fff",border:`1px solid ${GL}`,borderRadius:12,padding:"12px 14px",marginBottom:9,display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:50,height:50,borderRadius:10,background:IV2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{p.img}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:500,lineHeight:1.3}}>{p.name}</div>
                      <div style={{fontSize:11,color:MT}}>{p.unit}</div>
                      <div style={{fontSize:13,fontWeight:500,color:G,marginTop:2}}>₹{p.price} × {qty} = <strong>₹{p.price*qty}</strong></div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                      <button onClick={()=>remCart(p.id)} style={{width:28,height:28,borderRadius:"50%",background:GL,border:`1px solid ${G}`,cursor:"pointer",fontSize:16,color:G,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:500}}>−</button>
                      <span style={{fontSize:14,fontWeight:500,minWidth:18,textAlign:"center"}}>{qty}</span>
                      <button onClick={()=>addCart(p.id)} style={{width:28,height:28,borderRadius:"50%",background:G,border:"none",cursor:"pointer",fontSize:16,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:500}}>+</button>
                    </div>
                  </div>
                );
              })}
              <div style={{background:GL,borderRadius:12,padding:"14px 16px",marginTop:4}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:12}}><span style={{color:MT}}>Subtotal ({cartCount} items)</span><span>₹{cartTotal}</span></div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:12}}><span style={{color:MT}}>Delivery charge</span><span style={{color:GREEN,fontWeight:500}}>FREE</span></div>
                <div style={{borderTop:`1px solid ${GM}`,paddingTop:8,marginTop:5,display:"flex",justifyContent:"space-between",fontWeight:500,fontSize:15}}><span>Total</span><span style={{color:G}}>₹{cartTotal}</span></div>
              </div>
              <button onClick={()=>{setCheckoutStep(1);setPage("checkout");}} style={{...btn(G,"100%"),marginTop:14,padding:"14px",fontSize:15,borderRadius:12}}>
                Proceed to Checkout →
              </button>
              <button onClick={()=>setPage("home")} style={{...obtn(MT),width:"100%",marginTop:9,borderRadius:12}}>Continue Shopping</button>
            </>
          )}
        </div>
      )}

      {/* ── CHECKOUT ── */}
      {page==="checkout"&&(
        <div style={{padding:16}}>
          {/* Progress Steps */}
          {checkoutStep<5&&(
            <div style={{display:"flex",alignItems:"center",marginBottom:20,gap:4}}>
              {["Login","Details","Slot","Review"].map((s,i)=>{
                const st=i+1;const done=checkoutStep>st;const active=checkoutStep===st;
                return(
                  <div key={s} style={{display:"flex",alignItems:"center",flex:1}}>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center",flex:1}}>
                      <div style={{width:28,height:28,borderRadius:"50%",background:done?GREEN:active?G:GL,color:done||active?"#fff":MT,display:"flex",alignItems:"center",justifyContent:"center",fontSize:done?14:12,fontWeight:500,marginBottom:3}}>
                        {done?"✓":st}
                      </div>
                      <div style={{fontSize:9,color:active?G:MT,fontWeight:active?500:400}}>{s}</div>
                    </div>
                    {i<3&&<div style={{height:2,background:done?GREEN:GL,flex:1,marginBottom:14}}></div>}
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 1 — OTP LOGIN */}
          {checkoutStep===1&&(
            <div>
              <div style={{fontSize:18,fontWeight:500,marginBottom:4}}>Verify Mobile Number</div>
              <div style={{fontSize:12,color:MT,marginBottom:20}}>We'll send an OTP to confirm your number</div>
              {!otpSent?(
                <>
                  <div style={{fontSize:11,color:MT,marginBottom:5}}>Mobile Number</div>
                  <div style={{display:"flex",gap:8,marginBottom:6}}>
                    <div style={{...inp,width:58,flexShrink:0,padding:"12px 6px",textAlign:"center",color:MT,fontSize:12}}>🇮🇳 +91</div>
                    <input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="10-digit number" style={{...inp,flex:1}} type="tel"/>
                  </div>
                  {otpErr&&<div style={{fontSize:11,color:RED,marginBottom:8}}>{otpErr}</div>}
                  <button onClick={sendOTP} style={{...btn(G,"100%"),marginTop:10,padding:"13px"}}>Send OTP →</button>
                </>
              ):(
                <>
                  <div style={{fontSize:13,color:MT,marginBottom:16}}>OTP sent to <strong style={{color:DK}}>+91 {phone}</strong> <span style={{color:G,cursor:"pointer",fontSize:11}} onClick={()=>setOtpSent(false)}>Change</span></div>
                  <div style={{display:"flex",gap:9,marginBottom:10,justifyContent:"center"}}>
                    {otp.map((d,i)=>(
                      <input key={i} ref={otpRefs[i]} value={d} onChange={e=>handleOtp(e.target.value,i)} onKeyDown={e=>e.key==="Backspace"&&!d&&i>0&&otpRefs[i-1].current?.focus()} maxLength={1} type="tel"
                        style={{width:44,height:52,borderRadius:10,border:`2px solid ${d?G:GL}`,textAlign:"center",fontSize:20,fontWeight:500,color:DK,background:"#fff",outline:"none",boxSizing:"border-box"}}/>
                    ))}
                  </div>
                  {otpErr&&<div style={{fontSize:11,color:RED,textAlign:"center",marginBottom:8}}>{otpErr}</div>}
                  <div style={{textAlign:"center",fontSize:12,color:MT,marginBottom:14}}>
                    {timerOn?<span>Resend in <strong style={{color:G}}>{timer}s</strong></span>:<span style={{color:G,cursor:"pointer",fontWeight:500}} onClick={()=>{setTimer(30);setTimerOn(true);setOtp(["","","","","",""]);showToast("OTP resent!");}}>Resend OTP</span>}
                  </div>
                  <button onClick={verifyOTP} style={{...btn(G,"100%"),padding:"13px"}}>Verify & Continue →</button>
                  <div style={{background:GL,borderRadius:9,padding:"9px 13px",marginTop:12,fontSize:11,color:MT,textAlign:"center"}}>💡 Demo: enter any 6 digits to proceed</div>
                </>
              )}
            </div>
          )}

          {/* STEP 2 — DETAILS */}
          {checkoutStep===2&&(
            <div>
              <div style={{fontSize:18,fontWeight:500,marginBottom:4}}>Delivery Details</div>
              <div style={{fontSize:12,color:MT,marginBottom:18}}>Tell us where to deliver your order</div>
              {[{l:"Full Name *",ph:"Your full name",val:custName,set:setCustName},{l:"Email Address",ph:"email@example.com (optional)",val:custEmail,set:setCustEmail},{l:"House / Flat No. *",ph:"e.g. H-12, Flat 3B",val:houseNo,set:setHouseNo},{l:"Area / Colony *",ph:"e.g. Arera Colony, MP Nagar",val:area,set:setArea},{l:"Landmark",ph:"Near school, temple etc. (optional)",val:landmark,set:setLandmark}].map(f=>(
                <div key={f.l} style={{marginBottom:12}}>
                  <div style={{fontSize:11,color:MT,marginBottom:4}}>{f.l}</div>
                  <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} style={inp}/>
                </div>
              ))}
              <div onClick={()=>setSaveAddr(!saveAddr)} style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer",marginBottom:16,padding:"10px 14px",background:"#fff",border:`1px solid ${GL}`,borderRadius:10}}>
                <div style={{width:20,height:20,borderRadius:5,background:saveAddr?G:GL,border:`2px solid ${saveAddr?G:GL}`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:13,flexShrink:0}}>
                  {saveAddr&&"✓"}
                </div>
                <div>
                  <div style={{fontSize:13,fontWeight:500}}>Save address for future orders</div>
                  <div style={{fontSize:11,color:MT}}>One-click checkout next time</div>
                </div>
              </div>
              {formErr&&<div style={{fontSize:11,color:RED,marginBottom:8}}>{formErr}</div>}
              <button onClick={saveDetails} style={{...btn(G,"100%"),padding:"13px"}}>Continue →</button>
            </div>
          )}

          {/* STEP 3 — DELIVERY SLOT */}
          {checkoutStep===3&&(
            <div>
              <div style={{fontSize:18,fontWeight:500,marginBottom:4}}>Choose Delivery Slot</div>
              <div style={{fontSize:12,color:MT,marginBottom:18}}>When would you like your order delivered?</div>
              <div style={{display:"flex",flexDirection:"column",gap:9}}>
                {SLOTS.map(sl=>(
                  <div key={sl} onClick={()=>setSlot(sl)} style={{display:"flex",alignItems:"center",gap:12,background:slot===sl?GL:"#fff",border:`2px solid ${slot===sl?G:GL}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",transition:"all 0.15s"}}>
                    <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${G}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {slot===sl&&<div style={{width:10,height:10,borderRadius:"50%",background:G}}></div>}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:slot===sl?500:400}}>🕐 {sl}</div>
                      <div style={{fontSize:11,color:MT,marginTop:1}}>
                        {sl.includes("6:00 AM")||sl.includes("8:00 AM")?"Morning delivery":"Evening delivery"}
                      </div>
                    </div>
                    {slot===sl&&<span style={{background:G,color:"#fff",fontSize:10,padding:"2px 9px",borderRadius:20,fontWeight:500}}>Selected</span>}
                  </div>
                ))}
              </div>
              <button onClick={()=>setCheckoutStep(4)} style={{...btn(G,"100%"),marginTop:16,padding:"13px"}}>Continue →</button>
            </div>
          )}

          {/* STEP 4 — REVIEW ORDER */}
          {checkoutStep===4&&(
            <div>
              <div style={{fontSize:18,fontWeight:500,marginBottom:16}}>Review Your Order</div>
              <div style={{background:"#fff",border:`1px solid ${GL}`,borderRadius:12,padding:"14px",marginBottom:12}}>
                <div style={{fontSize:13,fontWeight:500,color:G,marginBottom:10}}>📦 Order Items</div>
                {Object.entries(cart).map(([id,qty])=>{
                  const p=PRODUCTS.find(x=>x.id==id);
                  return(
                    <div key={id} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${GL}`,fontSize:12}}>
                      <span>{p.img} {p.name} × {qty}</span>
                      <span style={{fontWeight:500}}>₹{p.price*qty}</span>
                    </div>
                  );
                })}
                <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0 0",fontWeight:500,fontSize:14}}><span>Total</span><span style={{color:G}}>₹{cartTotal}</span></div>
              </div>
              <div style={{background:"#fff",border:`1px solid ${GL}`,borderRadius:12,padding:"14px",marginBottom:12}}>
                <div style={{fontSize:13,fontWeight:500,color:G,marginBottom:8}}>📍 Delivery Details</div>
                {[{l:"Name",v:custName},{l:"Mobile",v:`+91 ${phone}`},{l:"Address",v:`${houseNo}, ${area}${landmark?", "+landmark:""}`},{l:"Slot",v:`🕐 ${slot}`}].map(r=>(
                  <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${GL}`,fontSize:12}}>
                    <span style={{color:MT}}>{r.l}</span><span style={{fontWeight:500,textAlign:"right",maxWidth:"60%"}}>{r.v}</span>
                  </div>
                ))}
              </div>
              <div style={{background:GL,borderRadius:12,padding:"12px 16px",marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}><span style={{color:MT}}>Items total</span><span>₹{cartTotal}</span></div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}><span style={{color:MT}}>Delivery</span><span style={{color:GREEN,fontWeight:500}}>FREE</span></div>
                <div style={{display:"flex",justifyContent:"space-between",fontWeight:500,fontSize:15,borderTop:`1px solid ${GM}`,paddingTop:8,marginTop:5}}><span>Total Payable</span><span style={{color:G}}>₹{cartTotal}</span></div>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:13,fontWeight:500,marginBottom:8}}>💳 Payment Method</div>
                {[{id:"upi",l:"UPI Payment",ic:"📱"},{id:"card",l:"Debit / Credit Card",ic:"💳"}].map(m=>(
                  <div key={m.id} style={{display:"flex",alignItems:"center",gap:10,background:"#fff",border:`1.5px solid ${GL}`,borderRadius:10,padding:"12px 14px",marginBottom:7,cursor:"pointer"}}>
                    <span style={{fontSize:20}}>{m.ic}</span>
                    <span style={{fontSize:13,fontWeight:500}}>{m.l}</span>
                  </div>
                ))}
              </div>
              <button onClick={placeOrder} style={{...btn(G,"100%"),padding:"14px",fontSize:15,borderRadius:12}}>Place Order ₹{cartTotal} →</button>
              <button onClick={()=>setCheckoutStep(3)} style={{...obtn(MT),width:"100%",marginTop:9,borderRadius:12}}>← Edit Slot</button>
            </div>
          )}

          {/* STEP 5 — SUCCESS */}
          {checkoutStep===5&&orderDone&&(
            <div style={{textAlign:"center",padding:"20px 0"}}>
              <div style={{width:80,height:80,borderRadius:"50%",background:"#EAF3DE",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:40}}>✅</div>
              <div style={{fontSize:22,fontWeight:500,color:GREEN,marginBottom:4}}>Order Placed!</div>
              <div style={{fontSize:13,color:MT,marginBottom:6}}>{orderDone.id}</div>
              <div style={{fontSize:13,color:MT,marginBottom:20}}>Thank you, {orderDone.name}! 🙏</div>
              <div style={{background:"#fff",border:`1px solid ${GL}`,borderRadius:14,padding:"16px",marginBottom:16,textAlign:"left"}}>
                {[{l:"Order ID",v:orderDone.id},{l:"Amount",v:`₹${orderDone.total}`},{l:"Delivery To",v:orderDone.address},{l:"Delivery Slot",v:`🕐 ${orderDone.slot}`},{l:"WhatsApp",v:`Confirmation sent to +91 ${orderDone.phone}`}].map(r=>(
                  <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${GL}`,fontSize:12}}>
                    <span style={{color:MT}}>{r.l}</span><span style={{fontWeight:500,textAlign:"right",maxWidth:"58%"}}>{r.v}</span>
                  </div>
                ))}
              </div>
              <div style={{background:GL,borderRadius:12,padding:"12px 14px",marginBottom:16,fontSize:12,color:MT,lineHeight:1.7}}>
                💬 A WhatsApp confirmation has been sent to your number. You'll receive updates as your order is prepared and delivered.
              </div>
              <button onClick={()=>{setPage("home");setCheckoutStep(1);}} style={{...btn(G,"100%"),padding:"13px",borderRadius:12}}>Continue Shopping 🛒</button>
              <button onClick={()=>setPage("orders")} style={{...obtn(G),width:"100%",marginTop:9,borderRadius:12}}>Track My Order</button>
            </div>
          )}
        </div>
      )}

      {/* ── ORDERS ── */}
      {page==="orders"&&(
        <div style={{padding:16}}>
          <div style={{fontSize:16,fontWeight:500,marginBottom:14}}>My Orders</div>
          {orderDone?(
            <div style={{background:"#fff",border:`1px solid ${GL}`,borderRadius:12,padding:"14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{fontSize:13,fontWeight:500,color:G}}>{orderDone.id}</span>
                <span style={{background:GREEN+"22",color:GREEN,fontSize:10,padding:"2px 9px",borderRadius:20,fontWeight:500}}>Confirmed</span>
              </div>
              <div style={{fontSize:12,color:MT,marginBottom:3}}>Total: ₹{orderDone.total}</div>
              <div style={{fontSize:12,color:MT,marginBottom:8}}>🕐 {orderDone.slot}</div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                {["Confirmed","Processing","Out for Delivery","Delivered"].map((s,i)=>(
                  <div key={s} style={{textAlign:"center",fontSize:9,color:i===0?G:MT,flex:1}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:i===0?G:GL,margin:"0 auto 3px",border:`1.5px solid ${i===0?G:MT}`}}></div>{s}
                  </div>
                ))}
              </div>
            </div>
          ):(
            <div style={{textAlign:"center",color:MT,marginTop:60}}>
              <div style={{fontSize:48}}>📦</div>
              <div style={{marginTop:12,fontSize:15,fontWeight:500}}>No orders yet</div>
              <div style={{fontSize:12,marginTop:4,marginBottom:20}}>Your orders will appear here</div>
              <button style={btn(G)} onClick={()=>setPage("home")}>Start Shopping</button>
            </div>
          )}
        </div>
      )}

      {/* ── ACCOUNT ── */}
      {page==="account"&&(
        <div style={{padding:16}}>
          <div style={{background:"#fff",border:`1px solid ${GL}`,borderRadius:14,padding:"20px",marginBottom:14,textAlign:"center"}}>
            <div style={{width:60,height:60,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,color:G,margin:"0 auto 10px"}}>
              {custName?custName[0].toUpperCase():"👤"}
            </div>
            <div style={{fontSize:15,fontWeight:500}}>{custName||"Guest User"}</div>
            {phone&&<div style={{fontSize:12,color:MT}}>+91 {phone}</div>}
            {houseNo&&<div style={{fontSize:11,color:MT,marginTop:2}}>{houseNo}, {area}</div>}
          </div>
          {[{l:"My Orders",ic:"📦",a:()=>setPage("orders")},{l:"Saved Address",ic:"📍",a:()=>setPage("checkout")},{l:"My Subscriptions",ic:"🔄",a:()=>{}},{l:"Help & Support",ic:"💬",a:()=>{}},{l:"About Nanoperk",ic:"ℹ️",a:()=>{}}].map(item=>(
            <div key={item.l} onClick={item.a} style={{background:"#fff",border:`1px solid ${GL}`,borderRadius:11,padding:"14px 16px",marginBottom:9,display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:18}}>{item.ic}</span><span style={{fontSize:13}}>{item.l}</span></div>
              <span style={{color:MT,fontSize:18}}>›</span>
            </div>
          ))}
        </div>
      )}

      {/* BOTTOM NAV */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:420,background:IV,borderTop:`1px solid ${GL}`,display:"flex",zIndex:20}}>
        {navItems.map(n=>(
          <button key={n.id} onClick={()=>setPage(n.id)} style={{flex:1,background:"none",border:"none",padding:"9px 4px 7px",cursor:"pointer",color:page===n.id?G:MT,display:"flex",flexDirection:"column",alignItems:"center",gap:1,position:"relative"}}>
            <span style={{fontSize:17}}>{n.ic}</span>
            <span style={{fontSize:9,fontWeight:page===n.id?500:400}}>{n.l}</span>
            {n.id==="cart"&&cartCount>0&&<span style={{position:"absolute",top:6,right:"50%",marginRight:-18,background:RED,color:"#fff",borderRadius:"50%",fontSize:9,width:14,height:14,display:"flex",alignItems:"center",justifyContent:"center"}}>{cartCount}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductCard({p,cart,addCart,remCart}){
  return(
    <div style={{background:"#fff",border:`1px solid #F5E9C0`,borderRadius:12,padding:"12px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:12}}>
      <div style={{width:64,height:64,borderRadius:10,background:"#F5EDD8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,flexShrink:0,position:"relative"}}>
        {p.img}
        {p.badge&&<span style={{position:"absolute",top:-4,right:-4,background:"#D4AF37",color:"#fff",fontSize:8,padding:"2px 5px",borderRadius:8,fontWeight:500,whiteSpace:"nowrap"}}>{p.badge}</span>}
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:12,fontWeight:500,lineHeight:1.3,marginBottom:2}}>{p.name}</div>
        <div style={{fontSize:11,color:"#7A6A44",marginBottom:4}}>{p.unit} · {p.desc}</div>
        <div style={{fontSize:14,fontWeight:500,color:"#D4AF37"}}>₹{p.price}</div>
      </div>
      <div style={{flexShrink:0}}>
        {cart[p.id]?(
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <button onClick={()=>remCart(p.id)} style={{width:28,height:28,borderRadius:"50%",background:"#F5E9C0",border:"1.5px solid #D4AF37",cursor:"pointer",fontSize:15,color:"#D4AF37",fontWeight:500,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
            <span style={{fontSize:13,fontWeight:500,minWidth:16,textAlign:"center"}}>{cart[p.id]}</span>
            <button onClick={()=>addCart(p.id)} style={{width:28,height:28,borderRadius:"50%",background:"#D4AF37",border:"none",cursor:"pointer",fontSize:15,color:"#fff",fontWeight:500,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
          </div>
        ):(
          <button onClick={()=>addCart(p.id)} style={{background:"#D4AF37",color:"#fff",border:"none",borderRadius:20,padding:"7px 16px",fontSize:12,fontWeight:500,cursor:"pointer"}}>+ Add</button>
        )}
      </div>
    </div>
  );
}

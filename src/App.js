import { useState, useRef, useEffect } from "react";

const G="#D4AF37",GL="#F5E9C0",GM="#B8972A",IV="#FDFAF3",IV2="#F5EDD8",DK="#3A2E1A",MT="#7A6A44",RED="#C62828",GREEN="#2E7D32";

const PRODUCTS=[
  {id:1,cat:"Milk",name:"Amul Gold Full Cream Milk",price:31,unit:"500ml",badge:"Best Seller",emoji:"🥛",bg:"#FFF8E7"},
  {id:2,cat:"Milk",name:"Amul Taaza Toned Milk",price:25,unit:"500ml",badge:"Daily",emoji:"🥛",bg:"#FFF8E7"},
  {id:3,cat:"Milk",name:"Amul Slim & Trim Milk",price:22,unit:"500ml",badge:"",emoji:"🥛",bg:"#FFF8E7"},
  {id:4,cat:"Milk",name:"Amul A2 Milk",price:38,unit:"500ml",badge:"Premium",emoji:"🥛",bg:"#FFF8E7"},
  {id:5,cat:"Butter",name:"Amul Butter Pasteurised",price:56,unit:"100g",badge:"Popular",emoji:"🧈",bg:"#FFFDE7"},
  {id:6,cat:"Butter",name:"Amul Lite Low Fat Spread",price:48,unit:"100g",badge:"",emoji:"🧈",bg:"#FFFDE7"},
  {id:7,cat:"Butter",name:"Amul Garlic Herb Butter",price:65,unit:"100g",badge:"New",emoji:"🧈",bg:"#FFFDE7"},
  {id:8,cat:"Cheese",name:"Amul Processed Cheese",price:90,unit:"200g",badge:"",emoji:"🧀",bg:"#FFF3E0"},
  {id:9,cat:"Cheese",name:"Amul Cheese Slices",price:75,unit:"200g",badge:"Popular",emoji:"🧀",bg:"#FFF3E0"},
  {id:10,cat:"Cheese",name:"Amul Pizza Mozzarella",price:145,unit:"200g",badge:"New",emoji:"🧀",bg:"#FFF3E0"},
  {id:11,cat:"Paneer",name:"Amul Fresh Paneer",price:90,unit:"200g",badge:"Fresh Daily",emoji:"🍽️",bg:"#F3E5F5"},
  {id:12,cat:"Paneer",name:"Amul Malai Paneer",price:100,unit:"200g",badge:"",emoji:"🍽️",bg:"#F3E5F5"},
  {id:13,cat:"Dahi",name:"Amul Masti Dahi",price:48,unit:"400g",badge:"Best Seller",emoji:"🫙",bg:"#E8F5E9"},
  {id:14,cat:"Dahi",name:"Amul Probiotic Dahi",price:52,unit:"400g",badge:"Healthy",emoji:"🫙",bg:"#E8F5E9"},
  {id:15,cat:"Dahi",name:"Amul Lassi",price:30,unit:"200ml",badge:"",emoji:"🥤",bg:"#E8F5E9"},
  {id:16,cat:"Ghee",name:"Amul Pure Ghee",price:275,unit:"500ml",badge:"Premium",emoji:"✨",bg:"#FFF9C4"},
  {id:17,cat:"Ghee",name:"Amul Cow Ghee",price:299,unit:"500ml",badge:"",emoji:"✨",bg:"#FFF9C4"},
  {id:18,cat:"Ice Cream",name:"Amul Vanilla Ice Cream",price:95,unit:"500ml",badge:"",emoji:"🍦",bg:"#E3F2FD"},
  {id:19,cat:"Ice Cream",name:"Amul Chocolate Ice Cream",price:105,unit:"500ml",badge:"Popular",emoji:"🍫",bg:"#E3F2FD"},
  {id:20,cat:"Ice Cream",name:"Amul Kesar Pista Kulfi",price:25,unit:"60ml",badge:"Summer Hit",emoji:"🍧",bg:"#E3F2FD"},
  {id:21,cat:"Chocolates",name:"Amul Milk Chocolate",price:40,unit:"55g",badge:"",emoji:"🍫",bg:"#FCE4EC"},
  {id:22,cat:"Chocolates",name:"Amul Dark Chocolate",price:55,unit:"55g",badge:"Premium",emoji:"🍫",bg:"#FCE4EC"},
  {id:23,cat:"Beverages",name:"Amul Kool Cafe",price:25,unit:"200ml",badge:"Popular",emoji:"☕",bg:"#E0F2F1"},
  {id:24,cat:"Beverages",name:"Amul Kool Chocolate Milk",price:25,unit:"200ml",badge:"",emoji:"🥤",bg:"#E0F2F1"},
  {id:25,cat:"Fresh Cream",name:"Amul Fresh Cream",price:55,unit:"200ml",badge:"",emoji:"🍶",bg:"#FFF8E7"},
  {id:26,cat:"Fresh Cream",name:"Amul Whipping Cream",price:98,unit:"250ml",badge:"New",emoji:"🍶",bg:"#FFF8E7"},
];

const CATS=[
  {name:"All",emoji:"🛒",color:"#D4AF37"},
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
  {bg:"linear-gradient(135deg,#3A2E1A,#6B4F2A)",title:"🥛 Fresh Milk Daily",sub:"Subscribe & get 10% off every order",cta:"Subscribe Now",accent:G},
  {bg:"linear-gradient(135deg,#1A3A2E,#2E6B4F)",title:"🧈 Amul Butter Back!",sub:"Fresh stock just arrived — order now",cta:"Order Now",accent:"#4CAF50"},
  {bg:"linear-gradient(135deg,#1A1A3A,#2E2E6B)",title:"🍦 Summer Special",sub:"Ice creams & kulfi at best prices",cta:"Shop Now",accent:"#7C4DFF"},
  {bg:"linear-gradient(135deg,#3A1A1A,#6B2E2E)",title:"🧀 Cheese Lovers!",sub:"Pizza mozzarella & slices in stock",cta:"Buy Now",accent:"#FF5252"},
];

const SLOTS=["6:00 AM – 8:00 AM","8:00 AM – 10:00 AM","10:00 AM – 12:00 PM","4:00 PM – 6:00 PM","6:00 PM – 8:00 PM"];

export default function App(){
  const [page,setPage]=useState("home");
  const [cat,setCat]=useState("All");
  const [search,setSearch]=useState("");
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

  useEffect(()=>{const t=setInterval(()=>setBannerIdx(b=>(b+1)%BANNERS.length),3500);return()=>clearInterval(t);},[]);
  useEffect(()=>{if(!timerOn)return;if(timer===0){setTimerOn(false);return;}const t=setTimeout(()=>setTimer(v=>v-1),1000);return()=>clearTimeout(t);},[timer,timerOn]);

  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2000);};
  const addCart=id=>setCart(c=>({...c,[id]:(c[id]||0)+1}));
  const remCart=id=>setCart(c=>{const n={...c};n[id]>1?n[id]--:delete n[id];return n;});
  const cartCount=Object.values(cart).reduce((a,b)=>a+b,0);
  const cartTotal=Object.entries(cart).reduce((a,[id,q])=>a+(PRODUCTS.find(p=>p.id==id)?.price||0)*q,0);
  const catProducts=c=>PRODUCTS.filter(p=>p.cat===c);
  const searchResults=PRODUCTS.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())||p.cat.toLowerCase().includes(search.toLowerCase()));
  const displayProducts=cat==="All"?PRODUCTS:PRODUCTS.filter(p=>p.cat===cat);

  const sendOTP=()=>{if(phone.length!==10){setOtpErr("Enter valid 10-digit number");return;}setOtpErr("");setOtpSent(true);setTimer(30);setTimerOn(true);showToast(`OTP sent to +91 ${phone}`);};
  const handleOtp=(v,i)=>{if(!/^\d?$/.test(v))return;const n=[...otp];n[i]=v;setOtp(n);if(v&&i<5)otpRefs[i+1].current?.focus();if(!v&&i>0)otpRefs[i-1].current?.focus();};
  const verifyOTP=()=>{if(otp.join("").length<6){setOtpErr("Enter complete 6-digit OTP");return;}setCheckoutStep(2);setOtpErr("");};
  const saveDetails=()=>{if(!custName){setFormErr("Please enter your name");return;}if(!houseNo){setFormErr("Please enter your address");return;}if(!area){setFormErr("Please enter your area");return;}setFormErr("");setCheckoutStep(3);};
  const placeOrder=()=>{const id="ORD-"+Math.floor(3000+Math.random()*1000);setOrderDone({id,name:custName,phone,total:cartTotal,slot,address:`${houseNo}, ${area}${landmark?", "+landmark:""}`});setCheckoutStep(5);setCart({});};

  const inp={width:"100%",padding:"12px 14px",borderRadius:10,border:`1.5px solid ${GL}`,fontSize:13,background:"#fff",boxSizing:"border-box",color:DK,outline:"none"};

  return(
    <div style={{fontFamily:"sans-serif",color:DK,maxWidth:420,margin:"0 auto",background:"#F8F4EC",minHeight:"100vh",position:"relative"}}>
      {toast&&<div style={{position:"fixed",top:14,left:"50%",transform:"translateX(-50%)",background:DK,color:"#fff",padding:"9px 20px",borderRadius:20,fontSize:12,zIndex:100,whiteSpace:"nowrap",boxShadow:"0 4px 12px rgba(0,0,0,0.2)"}}>{toast}</div>}

      {/* ── HEADER ── */}
      <div style={{background:`linear-gradient(135deg,${DK},#6B4F2A)`,padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:20}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,borderRadius:10,background:G,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:17}}>N</div>
          <div>
            <div style={{fontSize:17,fontWeight:700,color:G,lineHeight:1}}>Nanoperk</div>
            <div style={{fontSize:10,color:"#ffffff88",marginTop:1}}>📍 Bhopal · Fresh Amul Products</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{background:"#ffffff15",borderRadius:8,padding:"4px 10px",display:"flex",alignItems:"center",gap:4}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:GREEN,display:"inline-block"}}></span>
            <span style={{fontSize:11,color:"#fff",fontWeight:500}}>Open</span>
          </div>
          <button onClick={()=>setPage("cart")} style={{background:"#ffffff15",border:"none",borderRadius:8,padding:"7px 12px",cursor:"pointer",position:"relative",display:"flex",alignItems:"center",gap:4}}>
            <span style={{fontSize:18}}>🛒</span>
            {cartCount>0&&<span style={{position:"absolute",top:-4,right:-4,background:RED,color:"#fff",borderRadius:"50%",fontSize:9,width:16,height:16,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* ── HOME ── */}
      {page==="home"&&(
        <div style={{paddingBottom:80}}>

          {/* Search */}
          <div style={{padding:"12px 16px 8px",background:`linear-gradient(135deg,${DK},#6B4F2A)`}}>
            <div style={{position:"relative"}}>
              <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:15,color:MT}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search milk, butter, paneer, ghee..." style={{...inp,paddingLeft:38,borderRadius:25,fontSize:13,border:"none",boxShadow:"0 2px 8px rgba(0,0,0,0.1)"}}/>
              {search&&<button onClick={()=>setSearch("")} style={{position:"absolute",right:13,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:MT,fontSize:16}}>✕</button>}
            </div>
          </div>

          {search?(
            <div style={{padding:"12px 16px"}}>
              <div style={{fontSize:12,color:MT,marginBottom:10}}>{searchResults.length} results for "<strong>{search}</strong>"</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {searchResults.map(p=><ProductCard2 key={p.id} p={p} cart={cart} addCart={addCart} remCart={remCart}/>)}
              </div>
              {searchResults.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:MT}}><div style={{fontSize:42}}>🔍</div><div style={{marginTop:8}}>No products found</div></div>}
            </div>
          ):(
            <>
              {/* Banner Slider */}
              <div style={{padding:"12px 16px 8px"}}>
                <div style={{background:BANNERS[bannerIdx].bg,borderRadius:16,padding:"20px",position:"relative",overflow:"hidden",minHeight:130}}>
                  <div style={{fontSize:20,fontWeight:700,color:"#fff",marginBottom:4}}>{BANNERS[bannerIdx].title}</div>
                  <div style={{fontSize:12,color:"#ffffffbb",marginBottom:14,maxWidth:"70%"}}>{BANNERS[bannerIdx].sub}</div>
                  <button onClick={()=>setPage("catalog")} style={{background:BANNERS[bannerIdx].accent,color:"#fff",border:"none",borderRadius:20,padding:"8px 18px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{BANNERS[bannerIdx].cta}</button>
                  <div style={{position:"absolute",right:-10,top:"50%",transform:"translateY(-50%)",fontSize:70,opacity:0.12}}>🥛</div>
                  <div style={{display:"flex",gap:5,marginTop:14}}>
                    {BANNERS.map((_,i)=><div key={i} style={{width:i===bannerIdx?20:6,height:6,borderRadius:3,background:i===bannerIdx?"#fff":"#ffffff44",transition:"all 0.3s"}}></div>)}
                  </div>
                </div>
              </div>

              {/* Category Horizontal Scroll */}
              <div style={{padding:"10px 0 6px"}}>
                <div style={{padding:"0 16px",fontSize:15,fontWeight:600,marginBottom:10,color:DK}}>Categories</div>
                <div style={{display:"flex",gap:10,overflowX:"auto",padding:"4px 16px 8px",scrollbarWidth:"none"}}>
                  {CATS.map(c=>(
                    <div key={c.name} onClick={()=>{setCat(c.name);setPage("catalog");}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,flexShrink:0,cursor:"pointer"}}>
                      <div style={{width:60,height:60,borderRadius:16,background:cat===c.name?c.color+"22":"#fff",border:`2px solid ${cat===c.name?c.color:GL}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,boxShadow:cat===c.name?`0 4px 12px ${c.color}44`:"none",transition:"all 0.2s"}}>
                        {c.emoji}
                      </div>
                      <span style={{fontSize:10,color:cat===c.name?c.color:MT,fontWeight:cat===c.name?600:400,whiteSpace:"nowrap"}}>{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo Cards */}
              <div style={{padding:"4px 16px 10px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <div style={{background:`linear-gradient(135deg,#FFF8E7,${GL})`,borderRadius:14,padding:"14px",border:`1px solid ${GL}`}}>
                  <div style={{fontSize:22}}>🔄</div>
                  <div style={{fontSize:13,fontWeight:600,color:DK,marginTop:4}}>Subscribe</div>
                  <div style={{fontSize:10,color:MT,marginTop:2}}>Daily delivery, skip anytime</div>
                  <div style={{fontSize:12,fontWeight:600,color:G,marginTop:6}}>Save 10% →</div>
                </div>
                <div style={{background:"linear-gradient(135deg,#E8F5E9,#C8E6C9)",borderRadius:14,padding:"14px",border:"1px solid #C8E6C9"}}>
                  <div style={{fontSize:22}}>🚚</div>
                  <div style={{fontSize:13,fontWeight:600,color:DK,marginTop:4}}>Free Delivery</div>
                  <div style={{fontSize:10,color:MT,marginTop:2}}>On all orders in Bhopal</div>
                  <div style={{fontSize:12,fontWeight:600,color:GREEN,marginTop:6}}>Order now →</div>
                </div>
              </div>

              {/* Product sections by category */}
              {["Milk","Butter","Paneer","Dahi","Ghee","Ice Cream","Chocolates","Beverages"].map(c=>(
                <div key={c} style={{marginBottom:16}}>
                  <div style={{padding:"0 16px",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                    <div style={{fontSize:15,fontWeight:600,color:DK}}>{CATS.find(x=>x.name===c)?.emoji} {c}</div>
                    <span onClick={()=>{setCat(c);setPage("catalog");}} style={{fontSize:12,color:G,cursor:"pointer",fontWeight:500}}>See All →</span>
                  </div>
                  <div style={{display:"flex",gap:10,overflowX:"auto",padding:"4px 16px 8px",scrollbarWidth:"none"}}>
                    {catProducts(c).map(p=>(
                      <div key={p.id} style={{flexShrink:0,width:140,background:"#fff",borderRadius:14,overflow:"hidden",border:`1px solid ${GL}`,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
                        <div style={{background:p.bg,height:100,display:"flex",alignItems:"center",justifyContent:"center",fontSize:46,position:"relative"}}>
                          {p.emoji}
                          {p.badge&&<span style={{position:"absolute",top:6,left:6,background:G,color:"#fff",fontSize:8,padding:"2px 7px",borderRadius:8,fontWeight:600}}>{p.badge}</span>}
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
              ))}
            </>
          )}
        </div>
      )}

      {/* ── CATALOG ── */}
      {page==="catalog"&&(
        <div style={{paddingBottom:80}}>
          <div style={{background:`linear-gradient(135deg,${DK},#6B4F2A)`,padding:"12px 16px"}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." style={{...inp,border:"none",borderRadius:25,fontSize:13}}/>
          </div>
          <div style={{display:"flex",gap:8,overflowX:"auto",padding:"12px 16px 8px",scrollbarWidth:"none"}}>
            {CATS.map(c=><button key={c.name} onClick={()=>setCat(c.name)} style={{background:cat===c.name?G:"#fff",color:cat===c.name?"#fff":MT,border:`1.5px solid ${cat===c.name?G:GL}`,borderRadius:20,padding:"6px 14px",fontSize:12,fontWeight:cat===c.name?600:400,flexShrink:0,cursor:"pointer"}}>{c.emoji} {c.name}</button>)}
          </div>
          <div style={{padding:"4px 16px",fontSize:11,color:MT,marginBottom:6}}>{(search?searchResults:displayProducts).length} products</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:"0 16px"}}>
            {(search?searchResults:displayProducts).map(p=><ProductCard2 key={p.id} p={p} cart={cart} addCart={addCart} remCart={remCart}/>)}
          </div>
        </div>
      )}

      {/* ── CART ── */}
      {page==="cart"&&(
        <div style={{padding:16,paddingBottom:100}}>
          <div style={{fontSize:17,fontWeight:700,marginBottom:14}}>🛒 My Cart {cartCount>0&&<span style={{fontSize:13,color:MT,fontWeight:400}}>({cartCount} items)</span>}</div>
          {cartCount===0?(
            <div style={{textAlign:"center",marginTop:60}}>
              <div style={{fontSize:64}}>🛒</div>
              <div style={{fontSize:16,fontWeight:600,marginTop:12,color:DK}}>Your cart is empty</div>
              <div style={{fontSize:12,color:MT,marginTop:4,marginBottom:24}}>Add fresh Amul products to get started</div>
              <button onClick={()=>setPage("home")} style={{background:G,color:"#fff",border:"none",borderRadius:12,padding:"13px 32px",fontSize:14,fontWeight:600,cursor:"pointer"}}>Browse Products</button>
            </div>
          ):(
            <>
              {Object.entries(cart).map(([id,qty])=>{
                const p=PRODUCTS.find(x=>x.id==id);
                return(
                  <div key={id} style={{background:"#fff",borderRadius:14,padding:"12px",marginBottom:10,display:"flex",gap:12,border:`1px solid ${GL}`,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
                    <div style={{width:60,height:60,borderRadius:12,background:p.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,flexShrink:0}}>{p.emoji}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:600,lineHeight:1.3}}>{p.name}</div>
                      <div style={{fontSize:11,color:MT,marginTop:2}}>{p.unit}</div>
                      <div style={{fontSize:13,fontWeight:700,color:G,marginTop:4}}>₹{p.price} × {qty} = ₹{p.price*qty}</div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6}}>
                      <button onClick={()=>remCart(p.id)} style={{width:28,height:28,borderRadius:"50%",background:GL,border:`1.5px solid ${G}`,cursor:"pointer",fontSize:16,color:G,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                      <span style={{fontSize:13,fontWeight:700}}>{qty}</span>
                      <button onClick={()=>addCart(p.id)} style={{width:28,height:28,borderRadius:"50%",background:G,border:"none",cursor:"pointer",fontSize:16,color:"#fff",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                    </div>
                  </div>
                );
              })}
              <div style={{background:"#fff",borderRadius:14,padding:"14px 16px",marginTop:6,border:`1px solid ${GL}`}}>
                <div style={{fontSize:14,fontWeight:600,marginBottom:10,color:DK}}>Order Summary</div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:13}}><span style={{color:MT}}>Items ({cartCount})</span><span>₹{cartTotal}</span></div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:13}}><span style={{color:MT}}>Delivery</span><span style={{color:GREEN,fontWeight:600}}>FREE 🎉</span></div>
                <div style={{height:1,background:GL,margin:"8px 0"}}></div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:16,fontWeight:700}}><span>Total</span><span style={{color:G}}>₹{cartTotal}</span></div>
              </div>
              <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:420,padding:"12px 16px",background:IV,borderTop:`1px solid ${GL}`,boxSizing:"border-box",zIndex:15}}>
                <button onClick={()=>{setCheckoutStep(1);setPage("checkout");}} style={{width:"100%",background:`linear-gradient(135deg,${G},${GM})`,color:"#fff",border:"none",borderRadius:14,padding:"15px",fontSize:15,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span>Proceed to Checkout</span>
                  <span style={{background:"rgba(255,255,255,0.2)",borderRadius:8,padding:"4px 10px",fontSize:13}}>₹{cartTotal} →</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── CHECKOUT ── */}
      {page==="checkout"&&(
        <div style={{padding:16,paddingBottom:80}}>
          {checkoutStep<5&&(
            <div style={{display:"flex",alignItems:"center",marginBottom:20}}>
              {["Login","Details","Slot","Review"].map((s,i)=>{
                const st=i+1;const done=checkoutStep>st;const active=checkoutStep===st;
                return(
                  <div key={s} style={{display:"flex",alignItems:"center",flex:1}}>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center",flex:1}}>
                      <div style={{width:30,height:30,borderRadius:"50%",background:done?GREEN:active?G:"#fff",border:`2px solid ${done?GREEN:active?G:GL}`,color:done||active?"#fff":MT,display:"flex",alignItems:"center",justifyContent:"center",fontSize:done?14:12,fontWeight:700,marginBottom:3}}>
                        {done?"✓":st}
                      </div>
                      <div style={{fontSize:9,color:active?G:MT,fontWeight:active?700:400}}>{s}</div>
                    </div>
                    {i<3&&<div style={{height:2,background:done?GREEN:GL,flex:1,marginBottom:14,marginTop:-14}}></div>}
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 1 OTP */}
          {checkoutStep===1&&(
            <div>
              <div style={{fontSize:19,fontWeight:700,marginBottom:4}}>Verify Mobile Number</div>
              <div style={{fontSize:12,color:MT,marginBottom:20}}>We'll send an OTP to confirm your identity</div>
              {!otpSent?(
                <>
                  <div style={{fontSize:11,color:MT,marginBottom:5,fontWeight:500}}>Mobile Number</div>
                  <div style={{display:"flex",gap:8,marginBottom:6}}>
                    <div style={{...inp,width:58,flexShrink:0,padding:"12px 6px",textAlign:"center",color:MT,fontSize:12}}>🇮🇳 +91</div>
                    <input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="Enter 10-digit number" style={{...inp,flex:1}} type="tel"/>
                  </div>
                  {otpErr&&<div style={{fontSize:11,color:RED,marginBottom:8}}>{otpErr}</div>}
                  <button onClick={sendOTP} style={{width:"100%",background:`linear-gradient(135deg,${G},${GM})`,color:"#fff",border:"none",borderRadius:12,padding:"14px",fontSize:14,fontWeight:700,cursor:"pointer",marginTop:10}}>Send OTP →</button>
                </>
              ):(
                <>
                  <div style={{fontSize:13,color:MT,marginBottom:18}}>OTP sent to <strong style={{color:DK}}>+91 {phone}</strong> <span style={{color:G,cursor:"pointer",fontSize:11}} onClick={()=>setOtpSent(false)}>Change</span></div>
                  <div style={{display:"flex",gap:10,marginBottom:10,justifyContent:"center"}}>
                    {otp.map((d,i)=>(
                      <input key={i} ref={otpRefs[i]} value={d} onChange={e=>handleOtp(e.target.value,i)} onKeyDown={e=>e.key==="Backspace"&&!d&&i>0&&otpRefs[i-1].current?.focus()} maxLength={1} type="tel"
                        style={{width:46,height:54,borderRadius:12,border:`2px solid ${d?G:GL}`,textAlign:"center",fontSize:22,fontWeight:700,color:DK,background:"#fff",outline:"none",boxSizing:"border-box",boxShadow:d?`0 0 0 3px ${G}33`:"none"}}/>
                    ))}
                  </div>
                  {otpErr&&<div style={{fontSize:11,color:RED,textAlign:"center",marginBottom:8}}>{otpErr}</div>}
                  <div style={{textAlign:"center",fontSize:12,color:MT,marginBottom:16}}>
                    {timerOn?<span>Resend OTP in <strong style={{color:G}}>{timer}s</strong></span>:<span style={{color:G,cursor:"pointer",fontWeight:600}} onClick={()=>{setTimer(30);setTimerOn(true);setOtp(["","","","","",""]);showToast("OTP resent!");}}>Resend OTP</span>}
                  </div>
                  <button onClick={verifyOTP} style={{width:"100%",background:`linear-gradient(135deg,${G},${GM})`,color:"#fff",border:"none",borderRadius:12,padding:"14px",fontSize:14,fontWeight:700,cursor:"pointer"}}>Verify & Continue →</button>
                  <div style={{background:GL,borderRadius:10,padding:"10px 14px",marginTop:12,fontSize:11,color:MT,textAlign:"center"}}>💡 Demo: enter any 6 digits to proceed</div>
                </>
              )}
            </div>
          )}

          {/* STEP 2 DETAILS */}
          {checkoutStep===2&&(
            <div>
              <div style={{fontSize:19,fontWeight:700,marginBottom:4}}>Delivery Details</div>
              <div style={{fontSize:12,color:MT,marginBottom:18}}>Where should we deliver your order?</div>
              {[{l:"Full Name *",ph:"Your full name",val:custName,set:setCustName,type:"text"},{l:"Email Address",ph:"email@example.com (optional)",val:custEmail,set:setCustEmail,type:"email"},{l:"House / Flat No. *",ph:"e.g. H-12, Flat 3B, Plot 45",val:houseNo,set:setHouseNo,type:"text"},{l:"Area / Colony *",ph:"e.g. Arera Colony, MP Nagar, Kotra",val:area,set:setArea,type:"text"},{l:"Landmark (Optional)",ph:"Near school, temple, market...",val:landmark,set:setLandmark,type:"text"}].map(f=>(
                <div key={f.l} style={{marginBottom:13}}>
                  <div style={{fontSize:11,color:MT,marginBottom:4,fontWeight:500}}>{f.l}</div>
                  <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} type={f.type} style={inp}/>
                </div>
              ))}
              <div onClick={()=>setSaveAddr(!saveAddr)} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",marginBottom:16,padding:"12px 14px",background:"#fff",border:`1.5px solid ${saveAddr?G:GL}`,borderRadius:12}}>
                <div style={{width:22,height:22,borderRadius:6,background:saveAddr?G:GL,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14,fontWeight:700,flexShrink:0}}>{saveAddr&&"✓"}</div>
                <div><div style={{fontSize:13,fontWeight:600}}>Save address for future orders</div><div style={{fontSize:11,color:MT}}>One-click checkout next time</div></div>
              </div>
              {formErr&&<div style={{fontSize:11,color:RED,marginBottom:8}}>{formErr}</div>}
              <button onClick={saveDetails} style={{width:"100%",background:`linear-gradient(135deg,${G},${GM})`,color:"#fff",border:"none",borderRadius:12,padding:"14px",fontSize:14,fontWeight:700,cursor:"pointer"}}>Continue →</button>
            </div>
          )}

          {/* STEP 3 SLOT */}
          {checkoutStep===3&&(
            <div>
              <div style={{fontSize:19,fontWeight:700,marginBottom:4}}>Choose Delivery Slot</div>
              <div style={{fontSize:12,color:MT,marginBottom:18}}>Select when you want your order delivered</div>
              {SLOTS.map(sl=>(
                <div key={sl} onClick={()=>setSlot(sl)} style={{display:"flex",alignItems:"center",gap:12,background:slot===sl?GL:"#fff",border:`2px solid ${slot===sl?G:GL}`,borderRadius:14,padding:"15px 16px",cursor:"pointer",marginBottom:10,transition:"all 0.15s",boxShadow:slot===sl?`0 4px 12px ${G}33`:"none"}}>
                  <div style={{width:22,height:22,borderRadius:"50%",border:`2.5px solid ${G}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {slot===sl&&<div style={{width:11,height:11,borderRadius:"50%",background:G}}></div>}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:slot===sl?700:500}}>🕐 {sl}</div>
                    <div style={{fontSize:11,color:MT,marginTop:2}}>{sl.includes("AM")?"Morning delivery — before you start your day":"Evening delivery — after work hours"}</div>
                  </div>
                  {slot===sl&&<span style={{background:G,color:"#fff",fontSize:10,padding:"3px 10px",borderRadius:20,fontWeight:600}}>Selected</span>}
                </div>
              ))}
              <button onClick={()=>setCheckoutStep(4)} style={{width:"100%",background:`linear-gradient(135deg,${G},${GM})`,color:"#fff",border:"none",borderRadius:12,padding:"14px",fontSize:14,fontWeight:700,cursor:"pointer",marginTop:6}}>Continue →</button>
            </div>
          )}

          {/* STEP 4 REVIEW */}
          {checkoutStep===4&&(
            <div>
              <div style={{fontSize:19,fontWeight:700,marginBottom:16}}>Review Your Order</div>
              <div style={{background:"#fff",borderRadius:14,padding:"14px",marginBottom:12,border:`1px solid ${GL}`}}>
                <div style={{fontSize:13,fontWeight:700,color:G,marginBottom:10}}>📦 Items Ordered</div>
                {Object.entries(cart).map(([id,qty])=>{
                  const p=PRODUCTS.find(x=>x.id==id);
                  return(
                    <div key={id} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${GL}`,fontSize:12}}>
                      <span>{p.emoji} {p.name} × {qty}</span>
                      <span style={{fontWeight:600}}>₹{p.price*qty}</span>
                    </div>
                  );
                })}
                <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0 0",fontWeight:700,fontSize:14}}><span>Total</span><span style={{color:G}}>₹{cartTotal}</span></div>
              </div>
              <div style={{background:"#fff",borderRadius:14,padding:"14px",marginBottom:12,border:`1px solid ${GL}`}}>
                <div style={{fontSize:13,fontWeight:700,color:G,marginBottom:8}}>📍 Delivery Details</div>
                {[{l:"Name",v:custName},{l:"Mobile",v:`+91 ${phone}`},{l:"Address",v:`${houseNo}, ${area}${landmark?", "+landmark:""}`},{l:"Slot",v:`🕐 ${slot}`}].map(r=>(
                  <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${GL}`,fontSize:12}}>
                    <span style={{color:MT,flexShrink:0}}>{r.l}</span><span style={{fontWeight:500,textAlign:"right",maxWidth:"65%"}}>{r.v}</span>
                  </div>
                ))}
              </div>
              <div style={{background:GL,borderRadius:14,padding:"14px",marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4}}><span style={{color:MT}}>Subtotal</span><span>₹{cartTotal}</span></div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4}}><span style={{color:MT}}>Delivery</span><span style={{color:GREEN,fontWeight:600}}>FREE</span></div>
                <div style={{height:1,background:GM,margin:"8px 0"}}></div>
                <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:16}}><span>Total Payable</span><span style={{color:G}}>₹{cartTotal}</span></div>
              </div>
              <div style={{marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:700,marginBottom:10}}>💳 Payment Method</div>
                {[{id:"upi",l:"UPI Payment",ic:"📱",sub:"GPay, PhonePe, Paytm"},{id:"card",l:"Debit / Credit Card",ic:"💳",sub:"All major cards accepted"}].map(m=>(
                  <div key={m.id} style={{display:"flex",alignItems:"center",gap:12,background:"#fff",border:`1.5px solid ${GL}`,borderRadius:12,padding:"13px 14px",marginBottom:9,cursor:"pointer"}}>
                    <span style={{fontSize:24}}>{m.ic}</span>
                    <div><div style={{fontSize:13,fontWeight:600}}>{m.l}</div><div style={{fontSize:11,color:MT}}>{m.sub}</div></div>
                  </div>
                ))}
              </div>
              <button onClick={placeOrder} style={{width:"100%",background:`linear-gradient(135deg,${G},${GM})`,color:"#fff",border:"none",borderRadius:14,padding:"16px",fontSize:15,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span>Place Order</span>
                <span style={{background:"rgba(255,255,255,0.2)",borderRadius:8,padding:"4px 12px"}}>₹{cartTotal} →</span>
              </button>
            </div>
          )}

          {/* STEP 5 SUCCESS */}
          {checkoutStep===5&&orderDone&&(
            <div style={{textAlign:"center",padding:"20px 0"}}>
              <div style={{width:90,height:90,borderRadius:"50%",background:"#EAF3DE",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:46}}>✅</div>
              <div style={{fontSize:24,fontWeight:700,color:GREEN,marginBottom:4}}>Order Placed! 🎉</div>
              <div style={{fontSize:14,color:DK,marginBottom:4,fontWeight:500}}>{orderDone.id}</div>
              <div style={{fontSize:13,color:MT,marginBottom:20}}>Thank you, {orderDone.name}! Your order is confirmed.</div>
              <div style={{background:"#fff",borderRadius:14,padding:"16px",marginBottom:14,textAlign:"left",border:`1px solid ${GL}`}}>
                {[{l:"Order ID",v:orderDone.id},{l:"Amount Paid",v:`₹${orderDone.total}`},{l:"Delivery To",v:orderDone.address},{l:"Delivery Slot",v:`🕐 ${orderDone.slot}`},{l:"Status",v:"✅ Confirmed"}].map(r=>(
                  <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${GL}`,fontSize:12}}>
                    <span style={{color:MT}}>{r.l}</span><span style={{fontWeight:600,textAlign:"right",maxWidth:"60%"}}>{r.v}</span>
                  </div>
                ))}
              </div>
              <div style={{background:GL,borderRadius:12,padding:"12px 14px",marginBottom:16,fontSize:12,color:MT,lineHeight:1.8,textAlign:"left"}}>
                💬 WhatsApp confirmation sent to <strong>+91 {orderDone.phone}</strong><br/>
                🔔 You'll get updates as your order progresses
              </div>
              <button onClick={()=>{setPage("home");setCheckoutStep(1);}} style={{width:"100%",background:`linear-gradient(135deg,${G},${GM})`,color:"#fff",border:"none",borderRadius:14,padding:"14px",fontSize:14,fontWeight:700,cursor:"pointer",marginBottom:10}}>Continue Shopping 🛒</button>
              <button onClick={()=>setPage("orders")} style={{width:"100%",background:"transparent",color:G,border:`2px solid ${G}`,borderRadius:14,padding:"12px",fontSize:13,fontWeight:600,cursor:"pointer"}}>Track My Order</button>
            </div>
          )}
        </div>
      )}

      {/* ── ORDERS ── */}
      {page==="orders"&&(
        <div style={{padding:16,paddingBottom:80}}>
          <div style={{fontSize:17,fontWeight:700,marginBottom:14}}>My Orders</div>
          {orderDone?(
            <div style={{background:"#fff",borderRadius:14,padding:"16px",border:`1px solid ${GL}`,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <span style={{fontSize:14,fontWeight:700,color:G}}>{orderDone.id}</span>
                <span style={{background:GREEN+"22",color:GREEN,fontSize:10,padding:"3px 10px",borderRadius:20,fontWeight:600}}>Confirmed ✅</span>
              </div>
              <div style={{fontSize:12,color:MT,marginBottom:2}}>💰 ₹{orderDone.total} · FREE Delivery</div>
              <div style={{fontSize:12,color:MT,marginBottom:10}}>🕐 {orderDone.slot}</div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:10}}>
                {["Confirmed","Processing","Out for Delivery","Delivered"].map((s,i)=>(
                  <div key={s} style={{textAlign:"center",fontSize:9,color:i===0?G:MT,flex:1}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:i===0?G:GL,margin:"0 auto 4px",border:`2px solid ${i===0?G:MT}`}}></div>{s}
                  </div>
                ))}
              </div>
            </div>
          ):(
            <div style={{textAlign:"center",marginTop:60,color:MT}}>
              <div style={{fontSize:60}}>📦</div>
              <div style={{fontSize:16,fontWeight:600,marginTop:12,color:DK}}>No orders yet</div>
              <div style={{fontSize:12,marginTop:4,marginBottom:24}}>Your orders will appear here</div>
              <button onClick={()=>setPage("home")} style={{background:G,color:"#fff",border:"none",borderRadius:12,padding:"13px 28px",fontSize:14,fontWeight:600,cursor:"pointer"}}>Start Shopping</button>
            </div>
          )}
        </div>
      )}

      {/* ── ACCOUNT ── */}
      {page==="account"&&(
        <div style={{padding:16,paddingBottom:80}}>
          <div style={{background:`linear-gradient(135deg,${DK},#6B4F2A)`,borderRadius:16,padding:"20px",marginBottom:16,textAlign:"center"}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:G,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,color:"#fff",fontWeight:700,margin:"0 auto 10px"}}>
              {custName?custName[0].toUpperCase():"👤"}
            </div>
            <div style={{fontSize:16,fontWeight:700,color:"#fff"}}>{custName||"Guest User"}</div>
            {phone&&<div style={{fontSize:12,color:"#ffffff88",marginTop:2}}>+91 {phone}</div>}
            {houseNo&&<div style={{fontSize:11,color:"#ffffff66",marginTop:2}}>{houseNo}, {area}</div>}
          </div>
          {[{l:"My Orders",ic:"📦",sub:"Track your orders",a:()=>setPage("orders")},{l:"Saved Addresses",ic:"📍",sub:"Manage delivery locations",a:()=>{}},{l:"My Subscriptions",ic:"🔄",sub:"Daily & weekly subscriptions",a:()=>{}},{l:"Notifications",ic:"🔔",sub:"Order & delivery alerts",a:()=>{}},{l:"Help & Support",ic:"💬",sub:"Chat with us",a:()=>{}},{l:"About Nanoperk",ic:"ℹ️",sub:"Version 1.0",a:()=>{}}].map(item=>(
            <div key={item.l} onClick={item.a} style={{background:"#fff",border:`1px solid ${GL}`,borderRadius:12,padding:"14px 16px",marginBottom:9,display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:38,height:38,borderRadius:10,background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{item.ic}</div>
                <div>
                  <div style={{fontSize:13,fontWeight:600}}>{item.l}</div>
                  <div style={{fontSize:11,color:MT}}>{item.sub}</div>
                </div>
              </div>
              <span style={{color:MT,fontSize:20}}>›</span>
            </div>
          ))}
        </div>
      )}

      {/* ── BOTTOM NAV ── */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:420,background:"#fff",borderTop:`1px solid ${GL}`,display:"flex",zIndex:20,boxShadow:"0 -4px 16px rgba(0,0,0,0.08)"}}>
        {[{id:"home",l:"Home",ic:"🏠"},{id:"catalog",l:"Shop",ic:"🛍️"},{id:"cart",l:"Cart",ic:"🛒",badge:cartCount},{id:"orders",l:"Orders",ic:"📦"},{id:"account",l:"Account",ic:"👤"}].map(n=>(
          <button key={n.id} onClick={()=>setPage(n.id)} style={{flex:1,background:"none",border:"none",padding:"10px 4px 8px",cursor:"pointer",color:page===n.id?G:MT,display:"flex",flexDirection:"column",alignItems:"center",gap:2,position:"relative"}}>
            <span style={{fontSize:20}}>{n.ic}</span>
            <span style={{fontSize:10,fontWeight:page===n.id?700:400}}>{n.l}</span>
            {n.badge>0&&<span style={{position:"absolute",top:6,right:"50%",marginRight:-20,background:RED,color:"#fff",borderRadius:"50%",fontSize:9,width:16,height:16,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{n.badge}</span>}
            {page===n.id&&<div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:20,height:3,background:G,borderRadius:"2px 2px 0 0"}}></div>}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductCard2({p,cart,addCart,remCart}){
  return(
    <div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:`1px solid #F5E9C0`,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
      <div style={{background:p.bg,height:110,display:"flex",alignItems:"center",justifyContent:"center",fontSize:50,position:"relative"}}>
        {p.emoji}
        {p.badge&&<span style={{position:"absolute",top:7,left:7,background:"#D4AF37",color:"#fff",fontSize:8,padding:"2px 7px",borderRadius:8,fontWeight:700}}>{p.badge}</span>}
      </div>
      <div style={{padding:"10px"}}>
        <div style={{fontSize:11,fontWeight:600,color:"#3A2E1A",lineHeight:1.3,marginBottom:3,minHeight:28}}>{p.name}</div>
        <div style={{fontSize:10,color:"#7A6A44",marginBottom:8}}>{p.unit}</div>
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

"use client";
import React, { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";

const Tape = ({ className = "" }: any) => (
  <div className={`absolute h-[22px] bg-[#f1e4c3] shadow-[0_1px_3px_rgba(0,0,0,0.1)] z-20 opacity-90 ${className}`}
  style={{ clipPath: 'polygon(1% 10%, 99% 0%, 100% 90%, 0% 100%)' }} />
);

const Page = React.forwardRef<HTMLDivElement, any>(({ children, decor }, ref) => (
  <div ref={ref} className="h-full bg-[#fcf7eb]">
    <div className="h-full relative flex flex-col p-6 overflow-hidden">
      <div className="absolute inset-0 bg-[#fcf7eb]" />
      <div className="absolute inset-0 opacity-[0.12] bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')]" />
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none select-none">
        <div className="absolute top-[-10px] right-[-20px] text-[140px] rotate-12">🦐</div>
        <div className="absolute bottom-[-20px] left-[-10px] text-[120px] -rotate-12">🍳</div>
      </div>
      <div className="absolute top-[100px] left-[20px] w-[80px] h-[60px] border border-[#2b2117]/10 rounded-[50%] rotate-[-15deg] opacity-40" />
      <div className="absolute bottom-[50px] right-[20px] w-[100px] h-[1px] bg-[#2b2117]/10 rotate-[-8deg]" />
      <div className="absolute bottom-[55px] right-[20px] w-[80px] h-[1px] bg-[#2b2117]/10 rotate-[-8deg]" />
      {decor}
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  </div>
));
Page.displayName = "Page";

function IngredientRow({ img, name, note, sticker }: any) {
  return (
    <div className="relative flex gap-3 items-start bg-white/60 backdrop-blur-sm border border-[#e9dcc3]/60 p-2 pr-3 rounded-[14px] shadow-[2px_3px_0px_#e9dcc3] rotate-[-0.5deg]">
      <Tape className="w-[40px] -top-[8px] left-[10px] rotate-[-18deg]" />
      <div className="w-[64px] h-[64px] rounded-[10px] overflow-hidden shrink-0 border border-white shadow-sm">
        <img src={img} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 pt-0.5">
        <div className="flex justify-between">
          <p className="text-[10px] font-black tracking-[0.12em] text-[#2b2117] uppercase">{name}</p>
          <span className="text-[12px] -mt-1">{sticker}</span>
        </div>
        <p className="text-[11px] leading-[1.4] text-[#2b2117] font-serif italic mt-0.5 font-medium">"{note}"</p>
      </div>
    </div>
  );
}

const VOLUMES = [
  { id: 'vol1', title: 'Makanan Pas Sakit', sub: 'VOL.01 — 3 RESEP ANDALAN', cover: '/hasil1.png', status: 'ready' },
  { id: 'vol2', title: 'Bekal Bapip', sub: 'VOL.02', cover: '', status: 'soon' },
  { id: 'vol3', title: 'Cemilan Malam', sub: 'VOL.03', cover: '', status: 'soon' },
];

export default function Home() {
  const [activeVol, setActiveVol] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, [activeVol]);

  if (!activeVol) {
    return (
      <div className="min-h-screen w-full bg-[#efe6d5] flex flex-col items-center py-12 px-6">
        <p className="text-[10px] tracking-[0.6em] text-black font-bold">DAPUR SHADIRA ARCHIVE</p>
        <h1 className="mt-3 font-serif text-5xl text-black leading-[0.85] text-center">Scrapbook<br/><i className="text-black">Dapur.</i></h1>
        <p className="mt-3 text-[10px] tracking-widest text-black border border-black/20 px-3 py-1 rounded-full font-bold">PILIH VOLUME ↓</p>
        <div className="mt-10 w-full max-w-[380px] space-y-5">
          {VOLUMES.map(v => (
            <button key={v.id} disabled={v.status==='soon'} onClick={()=>setActiveVol(v.id)}
              className={`w-full text-left relative rounded-[20px] border-2 border-white shadow-[5px_6px_0px_#d9c8a8] p-5 flex gap-4 items-center ${v.status==='soon'? 'bg-[#e9ddd0] opacity-60' : 'bg-[#201a12] text-[#f7e9d7] hover:rotate-[0.5deg] transition'}`}>
              <div className={`w-[84px] h-[110px] rounded-[10px] overflow-hidden border-2 border-white/30 shrink-0 ${v.status==='soon'? 'bg-[#d9c8a8]/30 flex items-center justify-center text-[24px]' : ''}`}>
                {v.status==='ready'? <img src={v.cover} className="w-full h-full object-cover" /> : '🔒'}
              </div>
              <div>
                <p className="text-[9px] tracking-[0.3em] opacity-80 font-bold">{v.sub}</p>
                <p className="font-serif text-[26px] leading-[0.9] mt-1">{v.title}</p>
                {v.status==='ready'? <span className="mt-3 inline-block bg-[#f7e9d7] text-black text-[8px] px-3 py-1 rounded-full tracking-widest font-black">BUKA BUKU →</span>
                : <span className="mt-3 inline-block border border-current text-[8px] px-3 py-1 rounded-full tracking-widest font-bold">COMING SOON</span>}
              </div>
              <Tape className="w-[60px] -top-2 left-8 rotate-[-12deg]" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#e9ddd0] py-6">
      <button onClick={() => setActiveVol(null)} className="relative z-20 mb-6 text-[10px] tracking-[0.3em] bg-white text-black border border-black/20 px-4 py-2 rounded-full shadow-sm font-bold">← KEMBALI KE ARCHIVE</button>
      <p className="relative z-10 mb-6 text-[10px] tracking-[0.5em] text-black font-bold">DAPUR SHADIRA • SCRAPBOOK VOL.01</p>

      {/* @ts-ignore */}
      <HTMLFlipBook width={390} height={610} showCover className="shadow-[0_40px_100px_rgba(60,40,20,0.3)]" size="fixed" minWidth={0} maxWidth={0} minHeight={0} maxHeight={0} drawShadow flippingTime={1100} usePortrait startZIndex={0} autoSize maxShadowOpacity={0.25} mobileScrollSupport>

        <div className="bg-[#201a12] h-full p-4">
          <div className="h-full border border-dashed border-[#f7e9d7]/20 flex flex-col justify-between p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#f7e9d7]/20 flex items-center justify-center text-[10px] text-[#f7e9d7]/40">★</div>
            <p className="text-[9px] tracking-[0.6em] text-[#f7e9d7]/60 text-center font-bold">VOL.01</p>
            <div className="text-center">
              <h1 className="font-serif text-5xl text-[#f7e9d7] leading-[0.9]">Makanan<br/><i className="text-[#e8c9a0]">Pas Sakit</i></h1>
              <div className="mt-5 w-full h-48 rounded-[12px] overflow-hidden rotate-1 border-2 border-[#f7e9d7]/30 relative">
                <Tape className="w-[80px] -top-1 left-1/2 -translate-x-1/2" />
                <img src="https://images.unsplash.com/photo-1547592180-85f173990554?w=600" className="w-full h-full object-cover" />
                <div className="absolute bottom-1 left-2 bg-[#f7e9d7] text-black text-[8px] px-2 py-0.5 rounded-full tracking-widest font-black">BAPIP APPROVED</div>
              </div>
              <div className="mt-4 inline-block bg-[#f7e9d7] text-black px-4 py-1 rotate-[-2deg] text-[10px] tracking-widest font-black">3 RESEP ANDALAN KA SHADIRA →</div>
            </div>
            <p className="text-[8px] tracking-[0.3em] text-[#f7e9d7]/40 text-center">MADE WITH LOVE IN DAPUR SHADIRA</p>
          </div>
        </div>

        {/* HALAMAN SOURCE TIKTOK - BARU */}
        <Page decor={<><Tape className="w-[80px] top-[0px] left-[25%] rotate-[-10deg]" /><div className="absolute bottom-[15px] right-[10px] text-[9px] font-mono text-black/60 font-bold">ref: @shadirafirdausii</div></>}>
          <div className="flex justify-between items-center"><span className="text-[9px] px-3 py-1 bg-black text-white tracking-widest rounded-full font-black">SOURCE</span><span className="text-[8px] tracking-[0.2em] text-black border-2 border-black/20 px-2 py-1 rounded-full font-black">VT TIKTOK 📱</span></div>
          <h2 className="mt-4 font-serif text-[28px] leading-[0.9] text-black">Asli dari<br/><span className="italic text-black">Dapur Shadira</span></h2>
          <p className="mt-2 text-[11px] font-serif italic text-black/70 leading-snug">"Semua resep di buku ini terinspirasi dari VT Ka Shadira. Full credit ke @shadirafirdausii di TikTok 🤎"</p>

          <div className="mt-5 space-y-3">
            <a href="https://www.tiktok.com/@shadirafirdausii" target="_blank" className="block relative bg-white border-2 border-black/10 p-3 rounded-[14px] shadow-[2px_3px_0px_#e9dcc3] rotate-[-0.5deg] hover:rotate-[0deg] transition">
              <div className="flex gap-2">
                <div className="w-[44px] h-[44px] rounded-full bg-black text-white flex items-center justify-center text-[18px]">▶️</div>
                <div>
                  <p className="text-[11px] font-black text-black">VT: Telur Udang Hongkong 🦐</p>
                  <p className="text-[9px] text-black/60">@shadirafirdausii • tap untuk nonton VT asli</p>
                </div>
              </div>
            </a>
            <a href="https://www.tiktok.com/@shadirafirdausii" target="_blank" className="block relative bg-white border-2 border-black/10 p-3 rounded-[14px] shadow-[2px_3px_0px_#e9dcc3] rotate-[0.5deg] hover:rotate-[0deg] transition">
              <div className="flex gap-2">
                <div className="w-[44px] h-[44px] rounded-full bg-black text-white flex items-center justify-center text-[18px]">▶️</div>
                <div>
                  <p className="text-[11px] font-black text-black">VT: Ayam Kukus Jahe 🍗</p>
                  <p className="text-[9px] text-black/60">@shadirafirdausii • tap untuk nonton VT asli</p>
                </div>
              </div>
            </a>
            <a href="https://www.tiktok.com/@shadirafirdausii" target="_blank" className="block relative bg-white border-2 border-black/10 p-3 rounded-[14px] shadow-[2px_3px_0px_#e9dcc3] rotate-[-0.3deg] hover:rotate-[0deg] transition">
              <div className="flex gap-2">
                <div className="w-[44px] h-[44px] rounded-full bg-black text-white flex items-center justify-center text-[18px]">▶️</div>
                <div>
                  <p className="text-[11px] font-black text-black">VT: Sup Jagung Telur 🌽</p>
                  <p className="text-[9px] text-black/60">@shadirafirdausii • tap untuk nonton VT asli</p>
                </div>
              </div>
            </a>
          </div>

          <div className="mt-auto bg-[#fff7d6] border-2 border-black/10 p-3 rounded-[12px] text-center">
            <p className="text-[8px] font-black tracking-[0.2em] text-black">FAN-MADE • NOT AFFILIATED • FREE • FULL CREDIT TO OWNER</p>
            <p className="text-[8px] mt-1 text-black/60">Kalo keberatan, DM aku ya kak, langsung aku hapus 🙏</p>
          </div>
        </Page>

        <Page decor={<><Tape className="w-[90px] top-[0px] left-[25%] rotate-[-10deg]" /><div className="absolute top-[90px] right-[12px] bg-[#fff7d6] border-2 border-black/20 px-2 py-1 rounded-full text-[9px] font-black text-black rotate-[8deg] z-20">BEST SELLER! 🦐</div><div className="absolute bottom-[15px] left-[10px] text-[9px] font-mono text-black/60 rotate-[-2deg] font-bold">hal.1 — telur hongkong</div></>}>
          <div className="flex justify-between items-center"><span className="text-[9px] px-3 py-1 bg-black text-white tracking-widest rounded-full font-black">01</span><span className="text-[8px] tracking-[0.2em] text-black border-2 border-black/20 px-2 py-1 rounded-full font-black">TELUR UDANG HONGKONG ✨</span></div>
          <h2 className="mt-4 font-serif text-[28px] leading-[0.9] text-black">Telur Siram<br/><span className="italic text-black relative">Udang Hongkong <span className="absolute -top-2 -right-5 text-[16px]">🦐</span></span></h2>
          <div className="mt-5 space-y-3.5">
            <IngredientRow img="/bahan1.png" sticker="🥚" name="Telur" note="Pecahin telur kocok campurin daun bawang" />
            <IngredientRow img="/bahan2.png" sticker="🧂" name="Kuah Siram" note="aku mau campurin saus tiram, lada, kecap, kaldu, minyak wijen, gula, garam, tambahin air, aduk" />
            <IngredientRow img="/bahan3.png" sticker="🔥" name="Tumis" note="minyak masuk, bawang putih, merah, cabai masuk, udang masuk, telur masuk, lalu kita orak-arik kayak gini" />
            <IngredientRow img="/bahan4.png" sticker="🍚" name="Finishing" note="tambahin kuahnya yang tadi kita bikin tadi tinggal kita taruh di nasi hangat kayak gini" />
          </div>
        </Page>

        <Page decor={<><Tape className="w-[70px] top-[2px] right-[20%] rotate-[12deg]" /><div className="absolute top-[95px] left-[180px] text-[20px] opacity-80 rotate-[10deg] z-20">♨️</div><div className="absolute bottom-[125px] left-[-5px] bg-[#fff7d6] border-2 border-black/20 px-2 py-1 rounded-[8px] text-[9px] font-black text-black rotate-[-5deg] shadow-sm">jahe banyak = anget!</div></>}>
          <div className="flex justify-between items-center"><span className="text-[9px] px-3 py-1 bg-black text-white tracking-widest rounded-full font-black">02</span><span className="text-[8px] tracking-[0.2em] text-black border-2 border-black/20 px-2 py-1 rounded-full font-black">AYAM STEAM JAHE 🍗</span></div>
          <h2 className="mt-4 font-serif text-[28px] leading-[0.9] text-black">Ayam Kukus<br/><span className="italic text-black">Jahe & Daun Bawang</span></h2>
          <div className="mt-5 space-y-3.5">
            <IngredientRow img="/bahan5.png" sticker="🍗" name="Marinasi" note="pertama ayam kita campur saus tiram minyak wijen lada kaldu ayam gula garam tepung maizena kita aduk sampai rata" />
            <IngredientRow img="/bahan6.png" sticker="🫚" name="Kukus" note="next kita mau kukus kasih air bawang kasih potongan jahe ayamnya masuk potongan daun bawang yang banyak saja" />
            <IngredientRow img="/bahan7.png" sticker="⏰" name="Tunggu" note="next kita tutup tunggu tiga puluh menit" />
          </div>
          <div className="mt-auto relative h-[190px] rounded-[16px] overflow-hidden border-2 border-white shadow-[3px_4px_0px_#e9dcc3] rotate-[0.5deg] bg-white">
            <img src="/hasil2.png" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            <Tape className="w-[50px] -top-1 left-4 rotate-[-10deg]" />
            <p className="absolute bottom-2.5 left-3 bg-white text-black px-2.5 py-1 rounded-full text-[9px] tracking-widest font-black leading-none"> "Bujug, enak banget, segar banget ini" </p>
            <span className="absolute top-2 right-2 text-[18px]">🤤</span>
          </div>
        </Page>

        <Page decor={<><Tape className="w-[60px] top-[0px] left-[30%] rotate-[-8deg]" /><div className="absolute top-[105px] right-[10px] w-[44px] h-[44px] bg-[#fff7d6] border-2 border-black/20 rounded-full flex items-center justify-center text-[9px] font-black text-black rotate-[12deg]">EASY!</div></>}>
          <div className="flex justify-between items-center"><span className="text-[9px] px-3 py-1 bg-black text-white tracking-widest rounded-full font-black">03</span><span className="text-[8px] tracking-[0.2em] text-black border-2 border-black/20 px-2 py-1 rounded-full font-black">SUP JAGUNG 🌽</span></div>
          <h2 className="mt-4 font-serif text-[28px] leading-[0.9] text-black">Sup Jagung<br/><span className="italic text-black">Telur</span></h2>
          <div className="mt-5 space-y-3.5">
            <IngredientRow img="/bahan8.png" sticker="🧄" name="Base Sup" note="Bawang putih masuk, bawang merah juga masuk, jagung masuk, air masuk, kaldu masuk, lada" />
            <IngredientRow img="/bahan9.png" sticker="🥟" name="Opsional" note="ini opsional kamu mau tambahin pangsit juga bisa tambahin bihun" />
            <IngredientRow img="/bahan10.png" sticker="✨" name="Finishing" note="tambahin telur sambil diaduk-aduk gini. Tambahin daun bawang. Sudah jadi." />
          </div>
          <div className="mt-3 flex gap-2">
            <span className="text-[8px] px-3 py-1.5 bg-[#fff7d6] text-black border-2 border-black/20 rounded-full font-black">opsional: + pangsit 🥟</span>
            <span className="text-[8px] px-3 py-1.5 bg-[#fff7d6] text-black border-2 border-black/20 rounded-full font-black">+ bihun 🍜</span>
          </div>
        </Page>

        <Page decor={<><Tape className="w-[80px] top-[10px] left-1/2 -translate-x-1/2 rotate-[-5deg]" /></>}>
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-[70px] h-[70px] bg-white border-2 border-black/20 rounded-full flex items-center justify-center text-[28px] shadow-[2px_3px_0px_#e9dcc3] rotate-[-5deg]">🤎</div>
            <h2 className="mt-4 font-serif text-3xl text-black leading-none">Bapip<br/>Approved</h2>
            <div className="mt-1 text-[9px] tracking-[0.4em] text-black font-bold">100% LUDES DES!</div>
            <div className="mt-6 grid grid-cols-2 gap-3 w-full">
              <div className="h-28 rounded-[14px] overflow-hidden rotate-1 border-2 border-white shadow-[2px_3px_0px_#e9dcc3] relative"><Tape className="w-[30px] -top-1 left-2" /><img src="/hasil1.png" className="w-full h-full object-cover" /></div>
              <div className="h-28 rounded-[14px] overflow-hidden -rotate-1 border-2 border-white shadow-[2px_3px_0px_#e9dcc3] relative"><img src="/hasil2.png" className="w-full h-full object-cover" /></div>
            </div>
            <div className="mt-6 bg-black text-white px-4 py-2 rounded-full text-[10px] tracking-widest font-bold rotate-[-1deg]">"Makanan yang aku masak kalo suami lagi sakit" 🥹🫶</div>
            <div className="mt-3 text-[9px] text-black/60">source: tiktok @shadirafirdausii</div>
            <button onClick={() => setActiveVol(null)} className="mt-4 text-[9px] tracking-widest border-2 border-black/20 px-4 py-2 rounded-full bg-white text-black font-black">← KEMBALI KE ARCHIVE</button>
          </div>
        </Page>

      </HTMLFlipBook>
    </div>
  );
}
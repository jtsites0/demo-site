import React, { useEffect, useRef, useState } from 'https://esm.sh/react@19.1.1';
import { createRoot } from 'https://esm.sh/react-dom@19.1.1/client';
import htm from 'https://esm.sh/htm@3.1.1';

const html = htm.bind(React.createElement);

const services = [
  ['01','Site institucional','Uma presença profissional para apresentar sua empresa, serviços, diferenciais e canais de contato.'],
  ['02','Landing page','Uma página focada em conversão para campanhas, serviços específicos e lançamentos.'],
  ['03','Personalização','Layout, cores, textos e seções ajustados para o posicionamento real do seu negócio.']
];

const values = [
  ['01','Responsivo de verdade','Pensado desde o início para celular, tablet e desktop.'],
  ['02','Código organizado','Estrutura simples, clara e fácil de manter.'],
  ['03','Identidade própria','Nada de fazer todos os clientes parecerem o mesmo template.'],
  ['04','Contato fácil','Chamadas claras para transformar visita em conversa.']
];

function MagneticButton({href,children,className='',external=false}){
  const ref=useRef(null);
  const move=e=>{const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();const x=e.clientX-(r.left+r.width/2);const y=e.clientY-(r.top+r.height/2);el.style.transform=`translate(${x*.12}px,${y*.12}px)`};
  const reset=()=>{if(ref.current)ref.current.style.transform=''};
  return html`<a ref=${ref} onMouseMove=${move} onMouseLeave=${reset} className=${`button magnetic ${className}`} href=${href} target=${external?'_blank':undefined} rel=${external?'noreferrer':undefined}>${children}</a>`;
}

function TiltCard({children,className=''}){
  const ref=useRef(null);
  const move=e=>{const el=ref.current;if(!el||window.innerWidth<820)return;const r=el.getBoundingClientRect();const px=(e.clientX-r.left)/r.width;const py=(e.clientY-r.top)/r.height;el.style.setProperty('--mx',`${px*100}%`);el.style.setProperty('--my',`${py*100}%`);el.style.transform=`perspective(900px) rotateX(${(.5-py)*6}deg) rotateY(${(px-.5)*7}deg) translateY(-4px)`};
  const reset=()=>{if(ref.current)ref.current.style.transform=''};
  return html`<article ref=${ref} onMouseMove=${move} onMouseLeave=${reset} className=${`tilt-card ${className}`}>${children}</article>`;
}

function App(){
  const [menuOpen,setMenuOpen]=useState(false);
  const [word,setWord]=useState(0);
  const rotating=['profissional.','memorável.','rápido.','seu.'];

  useEffect(()=>{
    const timer=setInterval(()=>setWord(v=>(v+1)%rotating.length),1800);
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.isIntersecting&&entry.target.classList.add('show')),{threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
    const pointer=e=>document.documentElement.style.setProperty('--pointer-x',`${e.clientX}px`);
    window.addEventListener('pointermove',pointer,{passive:true});
    return()=>{clearInterval(timer);observer.disconnect();window.removeEventListener('pointermove',pointer)};
  },[]);

  const close=()=>setMenuOpen(false);

  return html`
  <div className="site-shell">
    <div className="top-strip">JT Sites • sites profissionais para pequenos negócios</div>
    <header className="header"><div className="container nav-wrap">
      <a className="brand" href="#inicio">JT <span>Sites</span></a>
      <button className="menu-toggle" aria-label="Abrir menu" onClick=${()=>setMenuOpen(v=>!v)}><i></i><i></i><i></i></button>
      <nav className=${menuOpen?'nav open':'nav'}>
        <a onClick=${close} href="#sobre">Sobre</a><a onClick=${close} href="#servicos">Serviços</a><a onClick=${close} href="#processo">Processo</a><a onClick=${close} href="#portfolio">Portfólio</a>
        <a onClick=${close} className="nav-cta" href="mailto:jtsites.contato@gmail.com?subject=Or%C3%A7amento%20de%20site%20-%20JT%20Sites">Pedir orçamento</a>
      </nav>
    </div></header>

    <main>
      <section className="hero" id="inicio">
        <div className="aurora a1"></div><div className="aurora a2"></div><div className="grid-bg"></div>
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <span className="eyebrow">PRESENÇA DIGITAL PARA PEQUENOS NEGÓCIOS</span>
            <h1>Seu negócio merece um site <span className="rotating-word" key=${word}>${rotating[word]}</span></h1>
            <p>A JT Sites cria sites modernos, responsivos e fáceis de adaptar para apresentar sua empresa com clareza e facilitar o contato com novos clientes.</p>
            <div className="hero-actions">
              <${MagneticButton} className="primary" href="mailto:jtsites.contato@gmail.com?subject=Quero%20um%20site%20-%20JT%20Sites">Quero um site</${MagneticButton}>
              <${MagneticButton} className="secondary" href="https://github.com/JTSites0" external=${true}>Ver projetos no GitHub ↗</${MagneticButton}>
            </div>
            <div className="hero-meta"><span><b>RESPONSIVO</b>celular, tablet e desktop</span><span><b>ORGANIZADO</b>código limpo</span><span><b>ADAPTÁVEL</b>identidade própria</span></div>
          </div>

          <div className="hero-stage reveal">
            <div className="orb orb-one"></div><div className="orb orb-two"></div>
            <${TiltCard} className="browser-card">
              <div className="browser-top"><span></span><span></span><span></span><em>jtsites.dev</em></div>
              <div className="browser-screen"><div className="mini-badge">JT SITES / WEB PROJECT</div><div className="mini-title"></div><div className="mini-title short"></div><div className="mini-btn"></div><div className="mini-grid"><i></i><i></i><i></i></div></div>
            </${TiltCard}>
            <div className="floating-tag tag-a">⚡ rápido</div><div className="floating-tag tag-b">◉ responsivo</div><div className="floating-tag tag-c">✦ personalizado</div>
          </div>
        </div>
      </section>

      <section className="section" id="sobre"><div className="container split reveal"><div><span className="eyebrow">SOBRE A JT SITES</span><h2>Sites feitos para negócios de verdade.</h2></div><div className="copy"><p>A <strong>JT Sites</strong> é uma iniciativa de desenvolvimento web voltada a pequenos negócios que querem uma presença digital mais profissional.</p><p>O foco é construir páginas claras, responsivas e organizadas, sem complexidade desnecessária.</p></div></div></section>

      <section className="section blue-zone" id="servicos"><div className="container reveal"><div className="heading"><span className="eyebrow">SERVIÇOS</span><h2>O essencial para colocar seu negócio no ar.</h2></div><div className="card-grid">${services.map(([n,t,d])=>html`<${TiltCard} key=${n}><span className="card-num">${n}</span><h3>${t}</h3><p>${d}</p></${TiltCard}>`)}</div></div></section>

      <section className="section" id="processo"><div className="container reveal"><div className="heading"><span className="eyebrow">COMO FUNCIONA</span><h2>Um processo simples, sem enrolação.</h2></div><div className="steps"><div><b>01</b><h3>Entendimento</h3><p>Objetivo, conteúdo e necessidades do negócio.</p></div><div><b>02</b><h3>Construção</h3><p>Design, estrutura, responsividade e desenvolvimento.</p></div><div><b>03</b><h3>Entrega</h3><p>Revisão, ajustes e publicação do projeto.</p></div></div></div></section>

      <section className="showcase" id="portfolio"><div className="container showcase-grid reveal"><div><span className="eyebrow">PORTFÓLIO</span><h2>Este próprio site já é parte do nosso trabalho.</h2><p>Uma vitrine viva do que a JT Sites consegue entregar em estrutura, responsividade, identidade e interação.</p><${MagneticButton} className="dark" href="https://github.com/JTSites0/demo-site" external=${true}>Ver código no GitHub ↗</${MagneticButton}></div><div className="code-window"><div className="code-top"><i></i><i></i><i></i><span>JT_SITES.jsx</span></div><pre><code>${`const site = {\n  moderno: true,\n  responsivo: true,\n  identidade: "própria",\n  objetivo: "gerar contato"\n};`}</code></pre></div></div></section>

      <section className="section"><div className="container reveal"><div className="heading"><span className="eyebrow">PRINCÍPIOS</span><h2>Menos template. Mais identidade.</h2></div><div className="value-grid">${values.map(([n,t,d])=>html`<${TiltCard} key=${n}><span className="card-num">${n}</span><h3>${t}</h3><p>${d}</p></${TiltCard}>`)}</div></div></section>

      <section className="contact" id="contato"><div className="container contact-box reveal"><div><span className="eyebrow">VAMOS CONVERSAR?</span><h2>Quer um site para o seu negócio?</h2><p>Conta pra gente o que você precisa.</p></div><${MagneticButton} className="dark" href="mailto:jtsites.contato@gmail.com?subject=Or%C3%A7amento%20de%20site%20-%20JT%20Sites">Pedir orçamento</${MagneticButton}></div></section>
    </main>

    <footer><div className="container footer-wrap"><span>© ${new Date().getFullYear()} JT Sites.</span><span>Desenvolvimento web para pequenos negócios.</span></div></footer>
  </div>`;
}

createRoot(document.getElementById('root')).render(html`<${App} />`);

import React, { useEffect, useRef, useState } from 'https://esm.sh/react@19.2.8?target=es2022';
import { createRoot } from 'https://esm.sh/react-dom@19.2.8/client?target=es2022';
import htm from 'https://esm.sh/htm@3.1.1?target=es2022';

const html = htm.bind(React.createElement);
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/jtsites.contato@gmail.com';
const SITE_TYPES = ['Site institucional','Landing page','Redesign de site','Ainda não sei'];
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

const sanitizeText = (value, maxLength, multiline = false) => {
  let text = String(value ?? '').normalize('NFKC').replace(CONTROL_CHARS, '').replace(/[<>]/g, '');
  if (!multiline) text = text.replace(/[\r\n]+/g, ' ');
  return text.trim().slice(0, maxLength);
};

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

const portfolio = [
  {
    kind:'SITE INSTITUCIONAL',
    title:'JT Sites',
    description:'A vitrine oficial da própria JT Sites, criada para apresentar serviços, processo, portfólio e gerar novos contatos.',
    objective:'Transformar visitas em pedidos de orçamento com uma identidade tecnológica forte e navegação direta.',
    stack:['React','CSS','GitHub Pages'],
    live:'https://jtsites0.github.io/demo-site/',
    code:'https://github.com/JTSites0/demo-site',
    variant:'blue'
  },
  {
    kind:'PERFIL TÉCNICO',
    title:'JT Sites no GitHub',
    description:'Perfil técnico da marca reunindo apresentação, tecnologias, projetos públicos e acesso ao código.',
    objective:'Dar transparência técnica e permitir que clientes e parceiros vejam como os projetos são construídos.',
    stack:['GitHub','Markdown','Open Source'],
    live:'https://github.com/JTSites0',
    code:'https://github.com/JTSites0',
    variant:'cyan'
  }
];

function MagneticButton({href,children,className='',external=false}){
  const ref=useRef(null);
  const move=e=>{const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();const x=e.clientX-(r.left+r.width/2);const y=e.clientY-(r.top+r.height/2);el.style.transform=`translate(${x*.12}px,${y*.12}px)`};
  const reset=()=>{if(ref.current)ref.current.style.transform=''};
  return html`<a ref=${ref} onMouseMove=${move} onMouseLeave=${reset} className=${`button magnetic ${className}`} href=${href} target=${external?'_blank':undefined} rel=${external?'noopener noreferrer':undefined}>${children}</a>`;
}

function TiltCard({children,className=''}){
  const ref=useRef(null);
  const move=e=>{const el=ref.current;if(!el||window.innerWidth<820)return;const r=el.getBoundingClientRect();const px=(e.clientX-r.left)/r.width;const py=(e.clientY-r.top)/r.height;el.style.setProperty('--mx',`${px*100}%`);el.style.setProperty('--my',`${py*100}%`);el.style.transform=`perspective(900px) rotateX(${(.5-py)*6}deg) rotateY(${(px-.5)*7}deg) translateY(-4px)`};
  const reset=()=>{if(ref.current)ref.current.style.transform=''};
  return html`<article ref=${ref} onMouseMove=${move} onMouseLeave=${reset} className=${`tilt-card ${className}`}>${children}</article>`;
}

function ProjectMockup({variant='blue', title}){
  return html`<div className=${`project-mockup ${variant}`}>
    <div className="mock-browser"><div className="mock-top"><i></i><i></i><i></i><span>${title}</span></div><div className="mock-screen"><div className="mock-kicker"></div><div className="mock-heading"></div><div className="mock-heading small"></div><div className="mock-button"></div><div className="mock-cards"><b></b><b></b><b></b></div></div></div>
    <div className="mock-phone"><div></div><span></span><span></span><i></i></div>
  </div>`;
}

function QuoteForm(){
  const [status,setStatus]=useState('idle');
  const [message,setMessage]=useState('');
  const lastSuccessRef=useRef(0);

  const submit=async(e)=>{
    e.preventDefault();
    const form=e.currentTarget;
    if(status==='sending'||!form.reportValidity()) return;

    const formData=new FormData(form);
    const honey=sanitizeText(formData.get('_honey'),120);
    if(honey){
      setStatus('success');
      setMessage('Pedido enviado! Vamos responder pelo contato informado.');
      form.reset();
      return;
    }

    const nome=sanitizeText(formData.get('nome'),80);
    const email=sanitizeText(formData.get('email'),254).toLowerCase();
    const whatsapp=sanitizeText(formData.get('whatsapp'),25).replace(/[^\d+().\-\s]/g,'');
    const negocio=sanitizeText(formData.get('negocio'),100);
    const tipoSite=sanitizeText(formData.get('tipo_site'),40);
    const mensagemProjeto=sanitizeText(formData.get('mensagem'),2000,true);

    if(!nome||!email||!negocio||mensagemProjeto.length<20||!SITE_TYPES.includes(tipoSite)){
      setStatus('error');
      setMessage('Revise os campos do formulário e tente novamente.');
      return;
    }

    if(Date.now()-lastSuccessRef.current<15000){
      setStatus('error');
      setMessage('O pedido anterior já foi enviado. Aguarde alguns segundos antes de enviar outro.');
      return;
    }

    const payload={
      nome,
      email,
      whatsapp,
      negocio,
      tipo_site:tipoSite,
      mensagem:mensagemProjeto,
      _subject:'Novo pedido de orçamento - JT Sites',
      _template:'table',
      _honey:'',
      _url:'https://jtsites0.github.io/demo-site/'
    };

    setStatus('sending');
    setMessage('Enviando seu pedido...');
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),12000);

    try{
      const response=await fetch(FORM_ENDPOINT,{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(payload),
        credentials:'omit',
        cache:'no-store',
        referrerPolicy:'strict-origin-when-cross-origin',
        signal:controller.signal
      });
      const contentType=response.headers.get('content-type')||'';
      if(!response.ok||!contentType.includes('application/json')) throw new Error('Falha no envio');
      const result=await response.json();
      if(result.success===false) throw new Error('Falha no envio');
      lastSuccessRef.current=Date.now();
      setStatus('success');
      setMessage('Pedido enviado! Vamos responder pelo contato informado.');
      form.reset();
    }catch(error){
      setStatus('error');
      setMessage('Não foi possível enviar agora. Você também pode escrever para jtsites.contato@gmail.com.');
    }finally{
      clearTimeout(timeout);
    }
  };

  return html`<form className="quote-form" onSubmit=${submit} acceptCharset="UTF-8">
    <input type="text" name="_honey" className="honey" tabIndex="-1" autoComplete="off" aria-hidden="true" maxLength=${120} />
    <div className="form-row">
      <label><span>Seu nome *</span><input name="nome" type="text" placeholder="Como podemos te chamar?" required minLength=${2} maxLength=${80} autoComplete="name" /></label>
      <label><span>E-mail *</span><input name="email" type="email" placeholder="voce@exemplo.com" required maxLength=${254} autoComplete="email" inputMode="email" /></label>
    </div>
    <div className="form-row">
      <label><span>WhatsApp</span><input name="whatsapp" type="tel" placeholder="(51) 99999-9999" maxLength=${25} autoComplete="tel" inputMode="tel" pattern="[0-9+() .-]{8,25}" /></label>
      <label><span>Tipo de negócio *</span><input name="negocio" type="text" placeholder="Ex.: barbearia, loja, consultório" required minLength=${2} maxLength=${100} autoComplete="organization" /></label>
    </div>
    <label><span>O que você precisa? *</span><select name="tipo_site" required defaultValue=""><option value="" disabled>Selecione uma opção</option>${SITE_TYPES.map(type=>html`<option value=${type} key=${type}>${type}</option>`)}</select></label>
    <label><span>Conte um pouco sobre o projeto *</span><textarea name="mensagem" rows="6" placeholder="Objetivo do site, serviços que oferece, referências e qualquer detalhe importante..." required minLength=${20} maxLength=${2000}></textarea></label>
    <div className="form-footer"><button className="button primary form-submit" type="submit" disabled=${status==='sending'}>${status==='sending'?'Enviando...':'Enviar pedido de orçamento →'}</button><p className=${`form-status ${status}`} aria-live="polite">${message}</p></div>
  </form>`;
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
      <button className="menu-toggle" aria-label=${menuOpen?'Fechar menu':'Abrir menu'} aria-expanded=${menuOpen} aria-controls="main-nav" onClick=${()=>setMenuOpen(v=>!v)}><i></i><i></i><i></i></button>
      <nav id="main-nav" className=${menuOpen?'nav open':'nav'}>
        <a onClick=${close} href="#sobre">Sobre</a><a onClick=${close} href="#servicos">Serviços</a><a onClick=${close} href="#processo">Processo</a><a onClick=${close} href="#portfolio">Portfólio</a>
        <a onClick=${close} className="nav-cta" href="#contato">Pedir orçamento</a>
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
              <${MagneticButton} className="primary" href="#contato">Quero um site</${MagneticButton}>
              <${MagneticButton} className="secondary" href="#portfolio">Ver portfólio ↓</${MagneticButton}>
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

      <section className="portfolio-section" id="portfolio"><div className="container reveal"><div className="portfolio-heading"><div><span className="eyebrow">PORTFÓLIO</span><h2>Projetos que mostram como a gente pensa.</h2></div><p>Nada de thumbnail solta. Cada projeto mostra objetivo, tecnologia e acesso ao resultado ou ao código.</p></div><div className="projects-grid">${portfolio.map(project=>html`<article className="project-card" key=${project.title}><${ProjectMockup} variant=${project.variant} title=${project.title}/><div className="project-content"><span className="project-kind">${project.kind}</span><h3>${project.title}</h3><p>${project.description}</p><div className="project-objective"><b>Objetivo</b><span>${project.objective}</span></div><div className="tech-list">${project.stack.map(tech=>html`<span key=${tech}>${tech}</span>`)}</div><div className="project-actions"><a className="project-link primary-link" href=${project.live} target="_blank" rel="noopener noreferrer">Ver projeto ↗</a><a className="project-link" href=${project.code} target="_blank" rel="noopener noreferrer">Código ↗</a></div></div></article>`)}</div></div></section>

      <section className="section"><div className="container reveal"><div className="heading"><span className="eyebrow">PRINCÍPIOS</span><h2>Menos template. Mais identidade.</h2></div><div className="value-grid">${values.map(([n,t,d])=>html`<${TiltCard} key=${n}><span className="card-num">${n}</span><h3>${t}</h3><p>${d}</p></${TiltCard}>`)}</div></div></section>

      <section className="contact" id="contato"><div className="container contact-layout reveal"><div className="contact-intro"><span className="eyebrow">PEDIR ORÇAMENTO</span><h2>Conta pra gente o que você precisa.</h2><p>Preencha o formulário com as informações básicas do projeto. A JT Sites recebe o pedido por e-mail e responde pelo contato informado.</p><div className="contact-note"><b>Prefere e-mail?</b><a href="mailto:jtsites.contato@gmail.com">jtsites.contato@gmail.com</a></div></div><${QuoteForm}/></div></section>
    </main>

    <footer><div className="container footer-wrap"><span>© ${new Date().getFullYear()} JT Sites.</span><span>Desenvolvimento web para pequenos negócios.</span></div></footer>
  </div>`;
}

createRoot(document.getElementById('root')).render(html`<${App} />`);
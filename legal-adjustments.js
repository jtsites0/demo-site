const LEGAL_NAME = 'Juan Pablo Tretin Timm Buron';
const LEGAL_CPF = '601.973.680-69';

const DEMO_PROJECTS = [
  {
    slug:'norte',
    kind:'PROJETO DEMONSTRATIVO',
    title:'NØRTE Barber',
    description:'Conceito premium para barbearia, com direção editorial escura, menu de serviços e fluxo demonstrativo de agendamento.',
    objective:'Mostrar como uma barbearia pode vender experiência e facilitar a conversão sem depender de um template genérico.',
    stack:['HTML','CSS','JavaScript'],
    live:'https://jtsites0.github.io/demo-norte-barber/',
    code:'https://github.com/JTSites0/demo-norte-barber'
  },
  {
    slug:'vitale',
    kind:'PROJETO DEMONSTRATIVO',
    title:'Vitale',
    description:'Site conceitual para clínica, com visual claro, acolhedor e organizado para transmitir confiança e orientar o visitante.',
    objective:'Demonstrar uma experiência digital de saúde com hierarquia, legibilidade e contato simples, sem promessas ou credenciais fictícias.',
    stack:['HTML','CSS','JavaScript'],
    live:'https://jtsites0.github.io/demo-vitale-clinica/',
    code:'https://github.com/JTSites0/demo-vitale-clinica'
  },
  {
    slug:'mesa21',
    kind:'PROJETO DEMONSTRATIVO',
    title:'Mesa 21',
    description:'Conceito gastronômico quente e expressivo, com cardápio ilustrativo e fluxo visual de reserva.',
    objective:'Mostrar como um restaurante pode criar desejo, apresentar personalidade e conduzir o visitante rapidamente para a reserva.',
    stack:['HTML','CSS','JavaScript'],
    live:'https://jtsites0.github.io/demo-mesa21/',
    code:'https://github.com/JTSites0/demo-mesa21'
  }
];

const makeElement=(tag,className,text)=>{
  const element=document.createElement(tag);
  if(className) element.className=className;
  if(text!==undefined) element.textContent=text;
  return element;
};

const createDemoCard=project=>{
  const card=makeElement('article',`project-card demo-project demo-${project.slug}`);
  card.dataset.demoProject=project.slug;

  const mockup=makeElement('div','project-mockup demo-project-mockup');
  const screen=makeElement('div','demo-screen');
  const badge=makeElement('span','demo-screen-badge','DEMO');
  const title=makeElement('strong','demo-screen-title',project.title);
  const lineOne=makeElement('i','demo-line line-one');
  const lineTwo=makeElement('i','demo-line line-two');
  const button=makeElement('i','demo-button');
  screen.append(badge,title,lineOne,lineTwo,button);
  mockup.appendChild(screen);

  const content=makeElement('div','project-content');
  const kind=makeElement('span','project-kind',project.kind);
  const heading=makeElement('h3','',project.title);
  const description=makeElement('p','',project.description);

  const objective=makeElement('div','project-objective');
  objective.append(makeElement('b','','Objetivo'),makeElement('span','',project.objective));

  const techList=makeElement('div','tech-list');
  project.stack.forEach(tech=>techList.appendChild(makeElement('span','',tech)));

  const actions=makeElement('div','project-actions');
  const live=makeElement('a','project-link primary-link','Ver projeto ↗');
  live.href=project.live;
  live.target='_blank';
  live.rel='noopener noreferrer';
  const code=makeElement('a','project-link','Código ↗');
  code.href=project.code;
  code.target='_blank';
  code.rel='noopener noreferrer';
  actions.append(live,code);

  content.append(kind,heading,description,objective,techList,actions);
  card.append(mockup,content);
  return card;
};

const applyLegalAdjustments = () => {
  const mockDomain = document.querySelector('.browser-top em');
  if (mockDomain) mockDomain.textContent = 'jtsites0.github.io/demo-site';

  const form = document.querySelector('.quote-form');
  if (form && !form.querySelector('.legal-form-note')) {
    const note = document.createElement('p');
    note.className = 'legal-form-note';
    note.style.margin = '14px 0 0';
    note.style.color = '#9fb0c7';
    note.style.fontSize = '.75rem';
    note.style.lineHeight = '1.55';

    const text = document.createTextNode('Ao enviar, você solicita contato para análise de orçamento. Isso não constitui contratação nem gera cobrança. Seus dados serão tratados conforme a ');
    const privacy = document.createElement('a');
    privacy.href = './privacidade.html';
    privacy.textContent = 'Política de Privacidade';
    privacy.style.color = '#38bdf8';
    privacy.style.fontWeight = '700';

    note.append(text, privacy, document.createTextNode('.'));

    const footer = form.querySelector('.form-footer');
    if (footer) footer.insertAdjacentElement('afterend', note);
    else form.appendChild(note);
  }

  const projectsGrid=document.querySelector('.projects-grid');
  if(projectsGrid){
    DEMO_PROJECTS.forEach(project=>{
      if(!projectsGrid.querySelector(`[data-demo-project="${project.slug}"]`)) projectsGrid.appendChild(createDemoCard(project));
    });
  }

  const footerWrap = document.querySelector('footer .footer-wrap');
  if (footerWrap && !footerWrap.querySelector('.legal-site-footer')) {
    footerWrap.style.flexDirection = 'column';
    footerWrap.style.alignItems = 'flex-start';
    footerWrap.style.gap = '8px';

    const legal = document.createElement('div');
    legal.className = 'legal-site-footer';
    legal.style.display = 'flex';
    legal.style.flexDirection = 'column';
    legal.style.gap = '7px';
    legal.style.marginTop = '8px';
    legal.style.paddingTop = '16px';
    legal.style.borderTop = '1px solid #17345f';
    legal.style.width = '100%';
    legal.style.color = '#71839c';
    legal.style.fontSize = '.75rem';
    legal.style.lineHeight = '1.55';

    const identity = document.createElement('span');
    identity.textContent = `JT Sites • Responsável: ${LEGAL_NAME} • CPF ${LEGAL_CPF} • Atendimento exclusivamente online`;

    const nav = document.createElement('nav');
    nav.style.display = 'flex';
    nav.style.flexWrap = 'wrap';
    nav.style.gap = '14px';

    const privacy = document.createElement('a');
    privacy.href = './privacidade.html';
    privacy.textContent = 'Política de Privacidade';
    privacy.style.color = '#38bdf8';

    const terms = document.createElement('a');
    terms.href = './termos.html';
    terms.textContent = 'Termos de Uso';
    terms.style.color = '#38bdf8';

    const contact = document.createElement('a');
    contact.href = 'mailto:jtsites.contato@gmail.com';
    contact.textContent = 'jtsites.contato@gmail.com';
    contact.style.color = '#38bdf8';

    nav.append(privacy, terms, contact);
    legal.append(identity, nav);
    footerWrap.appendChild(legal);
  }

  return Boolean(form && footerWrap && projectsGrid);
};

if (!applyLegalAdjustments()) {
  const observer = new MutationObserver(() => {
    if (applyLegalAdjustments()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 8000);
}

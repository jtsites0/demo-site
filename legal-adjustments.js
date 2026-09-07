const LEGAL_NAME = 'Juan Pablo Tretin Timm Buron';
const LEGAL_CPF = '601.973.680-69';

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

  return Boolean(form && footerWrap);
};

if (!applyLegalAdjustments()) {
  const observer = new MutationObserver(() => {
    if (applyLegalAdjustments()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 8000);
}

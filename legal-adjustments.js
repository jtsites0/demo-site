const applyLegalAdjustments = () => {
  const mockDomain = document.querySelector('.browser-top em');
  if (mockDomain && mockDomain.textContent.trim() === 'jtsites.dev') {
    mockDomain.textContent = 'jtsites0.github.io';
  }

  const form = document.querySelector('.quote-form');
  if (form && !form.querySelector('.legal-form-note')) {
    const note = document.createElement('p');
    note.className = 'legal-form-note';
    note.textContent = 'Ao enviar, seus dados serão usados para analisar e responder ao pedido de orçamento. O envio desta solicitação não constitui contratação automática nem gera cobrança.';
    note.style.margin = '14px 0 0';
    note.style.color = '#9fb0c7';
    note.style.fontSize = '.75rem';
    note.style.lineHeight = '1.55';

    const footer = form.querySelector('.form-footer');
    if (footer) footer.insertAdjacentElement('afterend', note);
    else form.appendChild(note);
  }

  return Boolean(mockDomain && form);
};

if (!applyLegalAdjustments()) {
  const observer = new MutationObserver(() => {
    if (applyLegalAdjustments()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 8000);
}

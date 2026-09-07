const params = new URLSearchParams(window.location.search);
const returnedFromForm = params.get('form') === 'sent';

if (returnedFromForm) {
  const showConfirmation = () => {
    const contact = document.querySelector('#contato');
    if (!contact) return false;

    requestAnimationFrame(() => {
      contact.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    if (!document.querySelector('.form-success-toast')) {
      const toast = document.createElement('div');
      toast.className = 'form-success-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.innerHTML = '<strong>✓ Pedido enviado com sucesso!</strong><span>Recebemos seu orçamento e vamos responder pelo contato informado.</span>';
      document.body.appendChild(toast);

      requestAnimationFrame(() => toast.classList.add('show'));
      window.setTimeout(() => toast.classList.remove('show'), 6500);
      window.setTimeout(() => toast.remove(), 7000);
    }

    return true;
  };

  if (!showConfirmation()) {
    const observer = new MutationObserver(() => {
      if (showConfirmation()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 8000);
  }
}
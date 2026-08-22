// Techpik — interactions
document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // sticky nav
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // mobile menu
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  burger.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

  // reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // portfolio filters
  const chips = document.querySelectorAll('#filters .chip');
  const works = document.querySelectorAll('#workGrid .work');
  const grid = document.getElementById('workGrid');
  const applyFilter = f => {
    works.forEach(w => w.classList.toggle('hide', f !== 'all' && w.dataset.cat !== f));
    grid.classList.toggle('cols2', f === 'web'); // bigger 2-col layout for websites
  };
  applyFilter('web'); // default view: Website Development
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('current'));
    chip.classList.add('current');
    applyFilter(chip.dataset.f);
  }));

  // contact form -> WhatsApp composer (works on static hosting)
  const form = document.getElementById('waForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('fName').value.trim();
    const email = document.getElementById('fEmail').value.trim();
    const phone = document.getElementById('fPhone').value.trim();
    const service = document.getElementById('fService').value;
    const msg = document.getElementById('fMsg').value.trim();
    const text =
      `Hello Samson! My name is ${name}.` +
      (service ? `\nInquiry: ${service}` : '') +
      `\n\n${msg}` +
      `\n\nEmail: ${email}` +
      (phone ? `\nPhone: ${phone}` : '');
    window.open(`https://api.whatsapp.com/send?phone=2348145456732&text=${encodeURIComponent(text)}`, '_blank');
  });
});

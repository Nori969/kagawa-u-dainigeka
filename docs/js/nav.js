function toggleNav() {
  document.getElementById('navInner').classList.toggle('open');
}

function toggleDropdown(e, el) {
  if (window.innerWidth <= 768) {
    e.preventDefault();
    el.classList.toggle('mobile-open');
  }
}

function toggleNav() {
  document.getElementById('navInner').classList.toggle('open');
}

function toggleDropdown(e, el) {
  if (window.innerWidth <= 768) {
    var dropdown = el.querySelector('.nav-dropdown');
    if (dropdown) {
      if (!el.classList.contains('mobile-open')) {
        e.preventDefault();
        var items = document.querySelectorAll('.nav-item.mobile-open');
        for (var i = 0; i < items.length; i++) {
          items[i].classList.remove('mobile-open');
        }
        el.classList.add('mobile-open');
      }
    }
  }
}

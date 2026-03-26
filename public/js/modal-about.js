const openModalAbout = document.getElementById('open-modalabout');
const modal_about = document.getElementById('modal-about');
const modal_close = document.getElementById('modal-close');



openModalAbout.addEventListener('click', () =>
    modal_about.classList.add('visible'),
);
modal_close.addEventListener('click', () =>
    modal_about.classList.remove('visible'),
)

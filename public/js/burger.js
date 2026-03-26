document.getElementById('nav-mobile').onclick = function(){
    document.querySelector('.nav__mobile').classList.toggle('nav__mobile-active');
}
    

const navmobile = document.getElementById('nav-mobile');
const navlinks = document.getElementById('nav-links');
    

navmobile.addEventListener('click', () => navlinks.classList.toggle('show-header__nav'));

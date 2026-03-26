/*----------------------------------------------------*/
const footertop__nav_links = document.querySelector('#footertop__nav-links');

function footerLinks() {

    let li = document.createElement('li');
    li.innerHTML = `<a href="index.html">Accueil</a>`;
    return li;
}
footertop__nav_links.appendChild(footerLinks());


function footerLinks2() {

    let li = document.createElement('li');
    li.innerHTML = `<a href="a-propos.html">A propos</a>`;
    return li;
}
footertop__nav_links.appendChild(footerLinks2());

function footerLinks3() {

    let li = document.createElement('li');
    li.innerHTML = `<a href="magazine.html">Magazine</a>`;
    return li;
}
footertop__nav_links.appendChild(footerLinks3());

/*------------------------------------------------------*/

const footertop__socials_links = document.querySelector('#footertop__socials-links');

function footerLinksSocials() {
    let li = document.createElement('li');
    li.innerHTML = `<a href="https://www.instagram.com/wedding__mag/" target="_blank">Instagram</a>`;
    return li;
}
footertop__socials_links.appendChild(footerLinksSocials());

/*function footerLinksSocials2() {
    let li = document.createElement('li');
    li.innerHTML = `<a href="https://youtube.com" target="_blank">Youtube</a>`;
    return li;
}
footertop__socials_links.appendChild(footerLinksSocials2());*/


/*---------------------------------------------------*/

const gallery_footer__item_cta = document.querySelector('#gallery-footer__item-cta');

gallery_footer__item_cta.innerHTML = 'Restez à l\'affût des dernières tendances et styles.';

/*-----------------------------------------------*/

const gallery_footer__item_link = document.querySelector('#gallery-footer__item-link');

gallery_footer__item_link.innerHTML = `<a href="https://www.instagram.com/wedding__mag/" target="_blank">Suivez-nous</a>`;

/*-----------------------------------------------*/

//const gallery_footer__item1 = document.querySelector('#gallery-footer__item1');

//gallery_footer__item1.href = "https://www.pinterest.fr/wedding__mag/";


/*-----------------------------------------------*/

const footerbottom__madeby = document.querySelector('#footerbottom__madeby');

footerbottom__madeby.innerHTML = `<p> Tous droits réservés.</p>`;

/*-----------------------------------------------*/

const footerbottom__copyright = document.querySelector('#footerbottom__copyright');

footerbottom__copyright.innerHTML = `<p>©2025 Wedding Magazine</p>`;

/*-----------------------------------------------*/

footerbottom__nav_links = document.querySelector('#footerbottom__nav-links');

function footerBottomLinks() {
    let li = document.createElement('li');
    li.innerHTML = `<a href="../conditions-d-utilisation.html">Conditions d'utilisation</a>`;
    return li;
}
footerbottom__nav_links.appendChild(footerBottomLinks());


function footerBottomLinks2() {
    let li = document.createElement('li');
    li.innerHTML = `<a href="../politique-de-confidentialite.html">Politique de confidentialité</a>`;
    return li;
}
footerbottom__nav_links.appendChild(footerBottomLinks2());














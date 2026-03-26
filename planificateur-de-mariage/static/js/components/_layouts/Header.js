import React, { Component, createRef } from "react";

export class Header extends Component {
    constructor(props) {
        super(props);
        this.navMobileRef = createRef();
        this.navLinksRef = createRef();
    }

    componentDidMount() {
        const navMobile = this.navMobileRef.current;

        navMobile.onclick = this.toggleNav;
    }

    toggleNav = () => {
        const navLinks = this.navLinksRef.current;

        if (navLinks.classList.contains('show-header__nav')) {
            navLinks.classList.remove('show-header__nav');
        } else {
            navLinks.classList.add('show-header__nav');
        }

        this.navMobileRef.current.classList.toggle('nav__mobile-active');
    }

    render() {
        return (
            <React.Fragment>
                <header className="header">
                    <div className="container">
                        <div className="header__logo">
                            <div className="header__issu">
                                <a href="https://wedding-mag.com/wedding-magazine.html">
                                    <img src="https://storage.googleapis.com/wedding-mag/couvertures/wedding-magazine-numero-3-miniature-s.webp" alt="wedding magazine photo de couverture" />
                                </a>
                                <div className="header__issu-desc">
                                    <p>Sharon Sever Interview Exclusive. Découvrez le troisième  numéro de notre magazine.</p>
                                    <button className="btn-download">
                                        <a href="https://wedding-mag.com/wedding-magazine.html">découvrir</a>
                                    </button>
                                </div>
                            </div>
                            <div className="logo">
                                <a href="https://wedding-mag.com/">
                                    <img width="454" height="88" src="https://wedding-mag.com/img/elements/logo.svg" alt="wedding magazine logo" />
                                </a>
                            </div>
                            <div className="header__right">
                                <span>&nbsp;</span>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="nav__mobile-wrapper">
                            <div className="nav__mobile" ref={this.navMobileRef}></div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="header__wrapper">
                            <div className="header__modal" id="open-modalabout">
                                <img src="https://wedding-mag.com/img/elements/burger.svg" alt="" />
                            </div>
                    
                <nav class="header__nav" ref={this.navLinksRef}>
                    <ul class="header__nav-links">
                         <li class="header__nav-links-main"><a href="https://wedding-mag.com/">Accueil</a></li>

                <div class="dropdown-mb-visible">
                    <ul>
                      <li class="dropbtn header__nav-links-main">
                         <a href="https://wedding-mag.com/vestidos-de-novia/tendance/">
                            Mode
                             <img className="suivre-arrow" src="https://wedding-mag.com/img/elements/down.svg" alt=""/>
                        </a>
                       </li>
                    </ul>
                    <div class="dropdown-mb-visible-content">
                        <ul>
                            <li class="header__nav-links-dropdown"><a href="https://wedding-mag.com/vestidos-de-novia/createur-de-luxe.html">Robes de mariée</a></li>
                            <li class="header__nav-links-dropdown"><a href="https://wedding-mag.com/vestidos-de-novia/">Tendances</a></li>
                            <li class="header__nav-links-dropdown"><a href="https://wedding-mag.com/collections.html">Collections</a></li>
                            <li class="header__nav-links-dropdown"><a href="https://wedding-mag.com/photography-mode/">Shootings</a></li>
                            <li class="header__nav-links-dropdown"><a href="https://wedding-mag.com/designers/">Créateurs</a></li>
                        </ul>
                    </div>
                </div>
                       
                       <li class="header__nav-links-main"><a href="https://wedding-mag.com/belleza/">Beauté</a></li>
                       <li class="header__nav-links-main"><a href="https://wedding-mag.com/organizacion/">Organisation</a></li>
                       <li class="header__nav-links-main"><a href="https://wedding-mag.com/entrevistas-2025/">Interviews</a></li>
                       <li class="header__nav-links-main"><a href="https://wedding-mag.com/luna-de-miel/">Lune de miel</a></li>
                       <li class="header__nav-links-main"><a href="https://wedding-mag.com/wedding-magazine.html">Shop</a></li>
                    </ul>
                </nav>
                            

                            <div className="dropdown header__socials">
                                <ul>
                                    <li className="dropbtn header__nav-links-main">
                                        <a href="">
                                            SUIVEZ-NOUS<span>&nbsp;</span>
                                            <img className="suivre-arrow" src="https://wedding-mag.com/img/elements/down.svg" alt="" />
                                        </a>
                                    </li>
                                </ul>
                                <div className="dropdown-content">
                                <ul>
                                  <li class="header__nav-links-dropdown"><a href="https://www.instagram.com/wedding__mag/" target="_blank">Instagram</a></li>
                                  <li class="header__nav-links-dropdown"><a href="https://www.pinterest.fr/weddingmagcom/" target="_blank">Pinterest</a></li>
                                </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="line-deco"></div>
            </React.Fragment>
        );
    }
}

export default Header;

import React, { Component } from "react";

export class Footer extends Component {
    render(){
        return (
            <React.Fragment>


               <footer className="footer">
                   <div className="footertop">
                       <div className="container-6">
                           <div className="footertop__wrapper">
                               <nav className="footertop__nav">
                               <ul class="footertop__nav-links">
                                 <li><a href="../contribution.html">Contact</a></li>
                                 <li><a href="https://www.instagram.com/wedding__mag/" target="_blank">Instagram</a></li>
                                 <li><a href="https://www.pinterest.fr/weddingmagcom/" target="_blank">Pinterest</a></li>
                              </ul>
                               </nav>
                               <div className="footertop__logo">
                                   <a href="https://wedding-mag.com/">
                                       <img src="https://wedding-mag.com/img/elements/logo-footer.svg" alt="Wedding Magazine Votre Guide Ultime du Voyage logo" />
                                   </a>
                               </div>
                               <div className="footertop__socials">
                                   <ul className="footertop__socials-links">
                                       <li><a href="https://wedding-mag.com/check-list.html">Check-list</a></li>
                                       <li><a href="https://wedding-mag.com/planificateur-de-mariage">Planificateur</a></li>
                                       <li><a href="https://wedding-mag.com/wedding-magazine.html">Shop</a></li>
                                   </ul>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="line-deco"></div>
                   <div className="footerbottom">
                       <div className="container-6">
                           <div className="footerbottom__wrapper">
                               <div className="footerbottom__copyright">
                                   <p>©2026 Wedding Magazine</p>
                               </div>
                               <div className="footerbottom__nav">
                                   <ul className="footerbottom__nav-links">
                                       <li><a href="https://wedding-mag.com/conditions-d-utilisation.html">Conditions d'utilisation</a></li>
                                       <li><a href="https://wedding-mag.com/politique-de-confidentialite.html">Politique de confidentialité</a></li>
                                   </ul>
                               </div>
                               <div className="footerbottom__madeby">
                                   <p><a href="#" target="_blank">Tous droits réservés.</a></p>
                               </div>
                           </div>
                       </div>
                   </div>
               </footer>
            </React.Fragment>
        );
    }
}

export default Footer;

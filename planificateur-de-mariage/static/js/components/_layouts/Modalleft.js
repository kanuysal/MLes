import React, { Component } from "react";

export class Modalleft extends Component {
    componentDidMount() {
        const openModalAbout = document.getElementById('open-modalabout');
        const modal_about = document.getElementById('modal-about');
        const modal_close = document.getElementById('modal-close');

        if (openModalAbout && modal_about && modal_close) {
            openModalAbout.addEventListener('click', () =>
                modal_about.classList.add('visible')
            );
            modal_close.addEventListener('click', () =>
                modal_about.classList.remove('visible')
            );
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="modal-about" id="modal-about">
                    <div className="modal-about__wrapper">
                        <button className="modal-about__close" id="modal-close">
                            <img src="https://wedding-mag.com/img/elements/close-white.svg" alt="" />
                        </button>
                        <p>Contribution</p>
                        <p>Nous recherchons de véritables photos de mariages à présenter dans notre magazine. 
                            Si vous souhaitez partager les vôtres, n'hésitez pas à nous contacter à l'adresse suivante :  
                            <a href="mailto:contact@wedding-mag.com">contact@wedding-mag.com</a></p>
                        <p>Veuillez noter que chaque contribution doit être EXCLUSIVE pour Wedding Magazine. 
                            Par EXCLUSIVE, nous entendons des photos qui n'ont JAMAIS ÉTÉ PUBLIÉES dans aucun média ou réseau social.</p>
                        <img className="modal-about__img" src="https://ucarecdn.com/4b54890e-a80d-4403-88e4-3ab5de63ac83/recherchephotosdemariage.webp" alt="L'image en noir et blanc capture un gros plan d'une mariée et d'un marié le jour de leur mariage." />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Modalleft;



















import Panier from "./Panier.js";
import Inventaire from "./Inventaire.js";
import Modal from "./Modal.js";
import { livres } from "./livres.js";
import Filtre from "./Filtre.js";

document.addEventListener("DOMContentLoaded", function () {
  init();

  function init() {
    const elModalLivre = document.querySelector('[data-js-type="livre"]');
    const modalLivre = new Modal(elModalLivre);

    const elModalPanier = document.querySelector('[data-js-type="panier"]');
    const modalPanier = new Modal(elModalPanier);

    const monPanier = document.querySelector("[data-js-panier]");
    const elPanier = new Panier(monPanier, null, modalPanier, null);

    const elSectionInventaire = document.querySelector("[data-js-inventaire]");
    const inventaire = new Inventaire(
      elSectionInventaire,
      livres,
      elPanier,
      modalLivre
    );

    const elSectionFiltres = document.querySelectorAll("[data-js-filtres]");
    const mesFiltres = new Filtre(elSectionFiltres, inventaire, livres);

    inventaire.afficherLivresInitiaux();
  }
});

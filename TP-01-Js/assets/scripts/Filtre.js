import { livres } from "./livres.js";

export default class Filtre {
  constructor(elSectionFiltres, inventaire, livres) {
    this._elSectionFiltres = elSectionFiltres;
    this._inventaire = inventaire;
    this._listeLivres = livres;
    this._filtres = document.querySelectorAll(".filtre");
    this._elLivres = document.querySelectorAll(".livre-card");

    this.init();
  }

  // Initialisation de la classe Filtre
  init() {
    let elsFiltres = this._filtres;
    for (let i = 0; i < elsFiltres.length; i++) {
      elsFiltres[i].addEventListener(
        "click",
        function(e) {
          let valeurFiltre = e.target.textContent;

          if (valeurFiltre === "TOUS") {
            this.afficherTousLesLivres();
          } else {
            this.filtrerLivres(valeurFiltre, livres);
          }
        }.bind(this)
      );
    }
  }

  // Afficher tous les livres
  afficherTousLesLivres() {
    this._inventaire.afficherTousLesLivres();
  }

  // Filtrer les livres en fonction d'une valeur donnée
  filtrerLivres(valeurFiltre, livres) {
    const elLivres = document.querySelectorAll(".livre-card");

    for (let i = 0; i < elLivres.length; i++) {
      const elLivre = elLivres[i];
      const livre = livres[i];

      if (livre.nouveaute !== true && livre.nouveaute !== "true") {
        if (valeurFiltre === "Nouveautés") {
          elLivre.classList.replace("afficher", "masquer");
        } else {
          elLivre.classList.replace("masquer", "afficher");
          if (livre.categorie === valeurFiltre) {
            elLivre.classList.replace("masquer", "afficher");
          } else {
            elLivre.classList.replace("afficher", "masquer");
          }
        }
      }
    }
  }
}
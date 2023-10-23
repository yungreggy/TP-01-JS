export default class Inventaire {
  #_elSectionInventaire;
  #_listeLivres;
  _elPanier;
  _elModal;

  constructor(elSectionInventaire, listeLivres, panier, elModal) {
    this.#_elSectionInventaire = elSectionInventaire;
    this.#_listeLivres = listeLivres;
    this._elPanier = panier;
    this._elModal = elModal;
  }

  // Afficher les livres initiaux
  afficherLivresInitiaux() {
    this.#_elSectionInventaire.innerHTML = "";
    
    for (let i = 0; i < 12; i++) {
      let livre = this.#_listeLivres[i];
      let elLivre = this.creerElementLivre(livre);
      this.#_elSectionInventaire.appendChild(elLivre);
    }
  }
  
  // Afficher tous les livres
  afficherTousLesLivres() {
    this.#_elSectionInventaire.innerHTML = "";
    
    for (let i = 0; i < this.#_listeLivres.length; i++) {
      let livre = this.#_listeLivres[i];
      let elLivre = this.creerElementLivre(livre);
      this.#_elSectionInventaire.appendChild(elLivre);
    }
  }
  
  // Créer un élément de livre
  creerElementLivre(livre) {
    let elLivre = document.createElement("div");
    elLivre.classList.add("livre-card");
    elLivre.className = "livre-card afficher";

    elLivre.innerHTML = `
      <img src="${livre.image}" alt="${livre.titre}" class="livre-image">
      <div class="livre-details">
        <h3 class="livre-titre">${livre.titre}</h3>
        <p class="livre-prix">${livre.prix} $</p>
      </div>
      <button id="bouton-increment" data-js-ajouter-panier class="ajout-panier">Ajouter</button>
    `;

    let btnAjouter = elLivre.querySelector("[data-js-ajouter-panier]");
    btnAjouter.addEventListener(
      "click",
      function (e) {
        e.stopPropagation();
        this._elPanier.ajouterAuPanier(livre.titre, livre.prix);
      }.bind(this)
    );

    elLivre.addEventListener("click", function() {
      this._elModal.afficherDetailsLivre(livre, (erreur) => {
        if (!erreur) {
          this._elModal.toggleModal("livre");
        }
      });
    }.bind(this));

    return elLivre;
  }
}

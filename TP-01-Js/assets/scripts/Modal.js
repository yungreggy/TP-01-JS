export default class Modal {
  #_elModal;
  #_elModalType;
  #_elModalPanier;
  #_elModalLivre;
  #_elFermerIcone;

  constructor(elModal, typeModal) {
    this.#_elModal = elModal;
    this.#_elModalType = typeModal;
    this.#_elModalPanier = document.querySelector("#modal-panier");
    this.#_elModalLivre = document.querySelector("#modal-livre");
    this.#_elFermerIcone = document.querySelector("[data-js-fermer-icone]");
    this._etatModal = "fermer";
    this.#_elFermerIcone.addEventListener("click", this.toggleModal.bind(this));
    this.#_elModalType = document.querySelector(
      `[data-js-type="${typeModal}"]`
    );
    this.init();
  }

// Initialise les écouteurs d'événements pour le modal
  init() {
    this.#_elModal.addEventListener(
      "click",
      function (e) {
        if (e.target === this.#_elModal) {
          this.toggleModal();
        }
      }.bind(this)
    );
  }


  // Basculer l'état du modal entre ouvert et fermé
  toggleModal() {
    if (this._etatModal === "fermer") {
      this.#_elModal.setAttribute("data-js-etat", "ouvert");
      this._etatModal = "ouvert";
      if (this.#_elModalType === "livre") {
        document.body.classList.add("overflow-hidden");
      }
    } else {
      this.#_elModal.setAttribute("data-js-etat", "fermer");
      this._etatModal = "fermer";
      if (this._elModalType === "livre") {
        document.body.classList.remove("overflow-hidden");
      }
    }
    if (this._modalType === "livre") {
      this.#_elModalLivre.classList.remove("modal-panier-ouvert");
   
    } else if (this._modalType === "panier") {
      this.#_elModalPanier.classList.add("modal-panier-ouvert");
    }
  }


  // Affiche le modal du panier avec le contenu spécifié
  afficherModalPanier(contenuPanier) {
    this.injecterContenu(contenuPanier);
    this.toggleModal();
  }

   // Affiche les détails d'un livre dans un modal
  afficherDetailsLivre(livre, callback) {
    try {
      let contenu = `
          <img src="${livre.image}" alt="${livre.titre}">
          <div class="modal-details">
            <h2>${livre.titre}</h2>
            <p>Auteur: ${livre.auteur}</p>
            <p>Éditeur: ${livre.editeur}</p>
            <p>Nombre de pages: ${livre.pages}</p>
            <p>Description: ${livre.description}</p>
          </div>
        `;
      this.injecterContenu(contenu);
      callback(null);
    } catch (erreur) {
      callback(erreur);
    }
  }

  // Injecte du contenu HTML dans le modal
  injecterContenu(contenu) {
    let elContenu = this.#_elModal.querySelector(".modal-contenu");
    elContenu.innerHTML = contenu;
  }
}

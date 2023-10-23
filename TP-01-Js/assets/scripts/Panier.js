export default class Panier {
  constructor(elPanier, prixTotal, modalPanier, panierVide) {
    this._modalPanier = modalPanier;
    this._livresDansPanier = [];
    this._elPanier = elPanier;
    this._elPrixTotal = prixTotal;
    this._elPanierVide = panierVide;
    this._panier = JSON.parse(localStorage.getItem("panier")) || [];
    this._compteur = this._panier.length;
    this._pastille = document.querySelector(".compteur");
    this._pastilleCouleur = document.querySelector(".pastille");
    this._pastille.textContent = this._compteur;

    this._elPanier.addEventListener(
      "click",
      function () {
        this.afficherModalPanier();
      }.bind(this)
    );
  }


   // Ajoute un livre au panier
  ajouterAuPanier(titre, prix) {
    let livre = {
      titre: titre,
      prix: prix,
    };

    let dejaDansLePanier = false,
        panier = this._panier;

    for (const item of panier) {
      if (item.titre === livre.titre) {
        dejaDansLePanier = true;
        alert("Ce livre est déjà dans votre panier");
      }
    }

    if (!dejaDansLePanier) {
      panier.push(livre);
      localStorage.setItem("panier", JSON.stringify(panier));
      this.incrementerCompteur();
      this.afficherModalPanier();
    }
  }


   // Incrémente le compteur de livres dans le panier
  incrementerCompteur() {
    this._compteur++;
    this._pastille.textContent = this._compteur;
    if (this._compteur > 0) {
      this._pastilleCouleur.style.backgroundColor = "#25d406";
    }
  }


  // Retire un livre du panier
  retirerLivre(titre) {
    const index = this._panier.findIndex(function (livre) {
      return livre.titre == titre;
    });

    if (index > -1) {
      this._panier.splice(index, 1);
      localStorage.setItem("panier", JSON.stringify(this._panier));
      this._compteur--;
      this._pastille.textContent = this._compteur;
      if (this._elPrixTotal) {
        let nouveauTotal = this.calculerTotal();
        this._elPrixTotal.textContent = nouveauTotal + "$";
      }
    } else {
      alert("Ce livre n'existe pas dans votre panier");
    }

    this.afficherModalPanier();
  }


  // Calcule le total des prix des livres dans le panier
  calculerTotal() {
    let prixTotal = 0;
    for (const livre of this._panier) {
      prixTotal += livre.prix;
    }
    return prixTotal;
  }


  // Affiche le contenu du panier dans un modal
  afficherModalPanier() {
    let contenu = "",
        panier = this._panier,
        prixTotal = this.calculerTotal(),
        intitule = panier.length > 1 ? "Livres" : "Livre";

    if (panier.length === 0) {
      contenu += "<p>Le panier est vide.</p>";
    } else {
      contenu += `
    <table>
        <thead>
            <tr>
                <th>${intitule}</th>
                <th>Prix</th>
            </tr>
        </thead>
        <tbody>`;
      for (let i = 0; i < panier.length; i++) {
        contenu += "<tr>";
        contenu += "<td>" + panier[i].titre + "</td>";
        contenu += "<td>" + panier[i].prix + " $</td>";
        contenu +=
          '<td><button class="button-retirer" type="button" data-js-retirer="' +
          i +
          '">   Retirer</button></td>';
        contenu += "</tr>";
      }
      contenu += "<td><strong>Total  </td></strong> ";
      contenu += "<td><strong> " + prixTotal + " $</td></strong> ";
      contenu += "</tbody>";
      contenu += "</table>";
    }

    if (this._modalPanier) {
      this._modalPanier.injecterContenu(contenu);

      for (let i = 0; i < panier.length; i++) {
        let titre = panier[i].titre;
        document
          .querySelector('[data-js-retirer="' + i + '"]')
          .addEventListener(
            "click",
            function (e) {
              e.stopPropagation();
              this.retirerLivre(titre);
              this.afficherModalPanier();
            }.bind(this)
          );
      }

      this._modalPanier.toggleModal('data-js-type="panier"');
    } else {
      console.error("Erreur : _elModalPanier est null");
    }
  }
}

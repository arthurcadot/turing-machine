async function initHistoriquePage() {
    try {
        const joueurStat = await Data.getStat(id);
        joueurStat.resultats = Object.fromEntries(Object.entries(joueurStat.resultats).reverse());
        const statInfo = document.getElementsByClassName("stat-info")[0];
        const statRecord = document.getElementsByClassName("stat-record")[0];
        const jourNoms = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        const moisNoms = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

        const classementTab = await Data.getRecords();
        const classementJoueur = (classementTab.findIndex(obj => obj[joueurStat.pseudo] !== undefined))+1;

        if (!joueurStat) {
            statInfo.innerHTML = "<p>Joueur non trouvé.</p>";
            statRecord.innerHTML = "<p>Joueur non trouvé.</p>";
            return;
        }
        if (classementJoueur == 1) {
            styleClass = "stat-classement-un";
        } else if (classementJoueur == 2) {
            styleClass = "stat-classement-deux";
        } else if (classementJoueur == 3) {
            styleClass = "stat-classement-trois";
        } else {
            styleClass = "stat-classement-suivant";
        }
        statInfo.innerHTML = `
            <div class="stat-classement">
                <h2>${joueurStat.pseudo}</h2>
                <span class="${styleClass}">#${classementJoueur}</span>
            </div>
            <h3 class="mobile-none">Historique de participation :</h3>
            <div class="scroll">
                <table>
                    ${Object.entries(joueurStat.resultats).map(([date, result]) => {
                        const [jour, mois, annee] = date.split("/").map(Number);
                        const dateObj = new Date(annee, mois - 1, jour);

                        return `<tr>
                                    <td>${jourNoms[dateObj.getDay()]}</td>
                                    <td>${String(jour).padStart(2, "0")}</td>
                                    <td>${moisNoms[mois - 1]}</td>
                                    <td>${annee}</td>
                                    <td>${result ? '<b class="valider">✔</b>' : '<b class="croix">✖</b>'}</td>
                                </tr>`;
                    }).join("")}
                </table>
            </div>
        `;

    } catch (error) {
        console.error("Erreur lors de l'initialisation des stats :", error);
        const stat = document.getElementById("stat");
        if (stat) stat.innerHTML = "<p>Erreur de chargement des données.</p>";
    }
}

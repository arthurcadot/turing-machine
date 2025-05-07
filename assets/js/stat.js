async function initStatPage() {
    function handleOrientationChange() {
        if (window.innerWidth < window.innerHeight) {
            document.querySelectorAll('.mobile-none').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.mobile-block').forEach(el => el.style.display = 'block');
        } else {
            document.querySelectorAll('.mobile-none').forEach(el => el.style.display = 'block');
            document.querySelectorAll('.mobile-block').forEach(el => el.style.display = 'none');
        }
    }
    handleOrientationChange();
    window.addEventListener('resize', handleOrientationChange);
    try {
        const joueurStat = await Data.getStat(id);
        const joueursStat = await Data.getJoueur();
        joueurStat.resultats = Object.fromEntries(Object.entries(joueurStat.resultats).reverse());
        const statInfo = document.getElementsByClassName("stat-info")[0];
        const statRecord = document.getElementsByClassName("stat-record")[0];
        const jourNoms = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        const moisNoms = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

        const totalTests = Object.values(joueurStat.resultats).length;
        const totalReussis = Object.values(joueurStat.resultats).reduce((acc, res) => acc + (res ? 1 : 0), 0);
        const totalEchecs = totalTests - totalReussis;

        const nbrGreen = totalTests > 0 ? Math.round((totalReussis / totalTests) * 100) : 0;
        const nbrRed = totalTests > 0 ? Math.round((totalEchecs / totalTests) * 100) : 0;

        const classementTab = await Data.getRecords();
        const classementJoueur = (classementTab.findIndex(obj => obj[joueurStat.pseudo] !== undefined))+1;

        const participationTotal = Object.keys(joueurStat.resultats).length;

        const participationMois = Object.entries(joueurStat.resultats).filter(([date, _]) => {
            const [jour, mois, annee] = date.split("/").map(Number);
            const now = new Date();
            return mois === now.getMonth() + 1 && annee === now.getFullYear();
        }).length;

        const allParticipations = joueursStat.map(joueur => Object.keys(joueur.resultats).length);
        const participationTotalTotal = Math.round(allParticipations.reduce((a, b) => a + b, 0) / joueursStat.length);

        const now = new Date();
        const allParticipationsMois = joueursStat.map(joueur => 
            Object.entries(joueur.resultats).filter(([date, _]) => {
                const [jour, mois, annee] = date.split("/").map(Number);
                return mois === now.getMonth() + 1 && annee === now.getFullYear();
            }).length
        );
        const participationMoisTotal = Math.round(allParticipationsMois.reduce((a, b) => a + b, 0) / joueursStat.length);

        let serieGrande = 0;
        let currentSerie = 0;

        for (const resultat of Object.values(joueurStat.resultats)) {
            if (resultat) {
                currentSerie++;
                if (currentSerie > serieGrande) {
                    serieGrande = currentSerie;
                }
            } else {
                currentSerie = 0;
            }
        }

        let totalSeries = 0;

        for (const joueur of joueursStat) {
            let maxSerieJoueur = 0;
            let currentSerieJoueur = 0;

            for (const resultat of Object.values(joueur.resultats)) {
                if (resultat) {
                    currentSerieJoueur++;
                    if (currentSerieJoueur > maxSerieJoueur) {
                        maxSerieJoueur = currentSerieJoueur;
                    }
                } else {
                    currentSerieJoueur = 0;
                }
            }
            totalSeries += maxSerieJoueur;
        }

        const serieGrandeTotal = joueursStat.length > 0 ? Math.round(totalSeries / joueursStat.length) : 0;

        let serieGrandeMois = 0;
        let currentSerieMois = 0;

        for (const [date, resultat] of Object.entries(joueurStat.resultats)) {
            const [jour, mois, annee] = date.split("/").map(Number);
            const now = new Date();
            
            if (mois === now.getMonth() + 1 && annee === now.getFullYear()) {
                if (resultat) {
                    currentSerieMois++;
                    if (currentSerieMois > serieGrandeMois) {
                        serieGrandeMois = currentSerieMois;
                    }
                } else {
                    currentSerieMois = 0;
                }
            }
        }

        let totalSeriesMois = 0;

        for (const joueur of joueursStat) {
            let maxSerieJoueurMois = 0;
            let currentSerieJoueurMois = 0;

            for (const [date, resultat] of Object.entries(joueur.resultats)) {
                const [jour, mois, annee] = date.split("/").map(Number);
                const now = new Date();

                if (mois === now.getMonth() + 1 && annee === now.getFullYear()) {
                    if (resultat) {
                        currentSerieJoueurMois++;
                        if (currentSerieJoueurMois > maxSerieJoueurMois) {
                            maxSerieJoueurMois = currentSerieJoueurMois;
                        }
                    } else {
                        currentSerieJoueurMois = 0;
                    }
                }
            }
            totalSeriesMois += maxSerieJoueurMois;
        }

        const serieGrandeTotalTotal = joueursStat.length > 0 ? Math.round(totalSeriesMois / joueursStat.length) : 0;


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
            <h3>Historique de participation :</h3>
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

        statRecord.innerHTML = `
            <div class="stat-block">
                <div class="tricolor-chiffre">
                    <span><b class="valider">✔</b> ${nbrGreen}%</span><span>${nbrRed}% <b class="croix">✖</b></span>
                </div>
                <div class="tricolor-bar">
                    <span style="width: ${nbrGreen}%;" class="tricolor-bar-section tricolor-bar-green"></span>
                    <span style="width: ${nbrRed}%;" class="tricolor-bar-section tricolor-bar-red"></span>
                </div>
                <div class="tricolor-chiffre">
                    <span>${totalReussis} victoires</span><span>${totalEchecs} défaites</span>
                </div>
            </div>
            <div class="stat-block block-center">
                <p>Nombre de participation</p>
                <table class="w-100">
                    <thead>
                        <tr>
                            <td></td>
                            <td>Vous</td>
                            <td>Les autres</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total :</td>
                            <td>${participationTotal}</td>
                            <td>${participationTotalTotal}</td>
                        </tr>
                        <tr>
                            <td>Du mois :</td>
                            <td>${participationMois}</td>
                            <td>${participationMoisTotal}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="stat-block block-center">
                <p>Votre plus grande série consécutive de victoire</p>
                <table class="w-100">
                    <thead>
                        <tr>
                            <td></td>
                            <td>Vous</td>
                            <td>Les autres</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total :</td>
                            <td>${serieGrande}</td>
                            <td>${serieGrandeTotal}</td>
                        </tr>
                        <tr>
                            <td>Du mois :</td>
                            <td>${serieGrandeMois}</td>
                            <td>${serieGrandeTotalTotal}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

    } catch (error) {
        console.error("Erreur lors de l'initialisation des stats :", error);
        const stat = document.getElementById("stat");
        if (stat) stat.innerHTML = "<p>Erreur de chargement des données.</p>";
    }
}

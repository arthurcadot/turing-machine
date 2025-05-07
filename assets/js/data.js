class Data {
    static async getId() {
        try {
            const response = await fetch(`/turingmachine/assets/js/joueur.json?t=${new Date().getTime()}`);
            const data = await response.json();
    
            return (data.joueur || []).map(j => j.id);
        } catch (error) {
            console.error("Erreur lors du chargement des codes :", error);
            return [];
        }
    }  

    static async getPseudos() {
        try {
            const response = await fetch(`/turingmachine/assets/js/joueur.json?t=${new Date().getTime()}`);
            const data = await response.json();
    
            return (data.joueur || []).map(j => j.pseudo);
        } catch (error) {
            console.error("Erreur lors du chargement des pseudos :", error);
            return [];
        }
    }

    static async getBloquer(id) {
        try {
            const response = await fetch(`/turingmachine/assets/js/joueur.json?t=${new Date().getTime()}`);
            const data = await response.json();
            const joueur = data.joueur.find(j => j.id == id);
            return joueur.bloquer;
        } catch (error) {
            console.error("Erreur lors du chargement des données :", error);
            return null;
        }
    }

    static async getJoueur() {
        try {
            const response = await fetch(`/turingmachine/assets/js/joueur.json?t=${new Date().getTime()}`);
            const data = await response.json();
    
            return (data.joueur);
        } catch (error) {
            console.error("Erreur lors du chargement du joueur :", error);
            return [];
        }
    }

    static async getStat(id) {
        try {
            const response = await fetch(`/turingmachine/assets/js/joueur.json?t=${new Date().getTime()}`);
            const data = await response.json();
    
            const joueur = data.joueur.find(j => j.id === id);
    
            return joueur || null;
        } catch (error) {
            console.error("Erreur lors du chargement du joueur :", error);
            return null;
        }
    }

    static async getRecords(mois = null, annee = null, zero = "") {
        try {
            const response = await fetch(`/turingmachine/assets/js/joueur.json?t=${new Date().getTime()}`);
            const data = await response.json();
            const dateActuelle = new Date();
            const moisActuel = mois !== null ? mois : (dateActuelle.getMonth() + 1).toString().padStart(2, "0");
            const anneeActuelle = annee !== null ? annee : dateActuelle.getFullYear().toString();
            const resultatJoueurs = data.joueur.map(joueur => {
                const nbTrue = Object.entries(joueur.resultats || {}).reduce((acc, [date, val]) => {
                    const [, moisResultat, anneeResultat] = date.split("/");
                    if (moisResultat === moisActuel && anneeResultat === anneeActuelle && val === true) {
                        acc++;
                    }
                    return acc;
                }, 0);
                
                return { 
                    pseudo: joueur.pseudo,
                    score: nbTrue 
                };
            });

            resultatJoueurs.sort((a, b) => b.score - a.score);
            const allZero = resultatJoueurs.map(joueur => ({ [joueur.pseudo]: joueur.score })).every(obj => Object.values(obj)[0] === 0);
            if (allZero && !zero) {
                return [];
            } else {
                return resultatJoueurs.map(joueur => ({ [joueur.pseudo]: joueur.score }));
            }
        } catch (error) {
            console.error("Erreur lors du chargement des données :", error);
            return [];
        }
    }
    
    static async getPlateau() {
        const date = new Date().toLocaleDateString("fr-FR");
        
        try {
            // Lancer les fetch en parallèle
            const [response, response2] = await Promise.all([
                fetch(`/turingmachine/assets/js/plateau.json?t=${Date.now()}`),
                fetch(`/turingmachine/assets/js/jeu.json?t=${Date.now()}`)
            ]);
    
            // Parser les JSON en parallèle
            const [data, data2] = await Promise.all([response.json(), response2.json()]);
    
            const plateauDuJour = data.plateau?.[date] || {};
    
            if (Object.keys(plateauDuJour).length > 0) {
                const firstValue = Object.values(plateauDuJour)[0]?.toString();
    
                if (firstValue) {
                    const foundCard = data2["carte-verification"].find(card =>
                        Object.values(card).includes(firstValue)
                    );
    
                    if (foundCard) {
                        plateauDuJour["color"] = Object.keys(foundCard).find(
                            key => foundCard[key] === firstValue
                        );
                    }
                }
            }
    
            return plateauDuJour;
        } catch (error) {
            console.error("Erreur lors du chargement du plateau :", error);
            return {};
        }
    } 

    static async getPartie(id, condition = null) {
        let conditionDifficulteValue = condition && Array.isArray(condition) ? condition[1] : null;
        let conditionVerificateurValue = condition && Array.isArray(condition) ? condition[2] : null;
    
        if (id) {
            const difficultesPossibles = ["facile", "standard", "difficile"];
            const possibleConditions = [4, 5, 6];
            for (let o = 0; o < 3; o++) {
                for (let i = 0; i < 3; i++) {
                    const response = await fetch(`/turingmachine/assets/js/partie/classique_${difficultesPossibles[o]}_${possibleConditions[i]}.json?t=${new Date().getTime()}`);
                    const jeu = await response.json();
                    const keys = Object.keys(jeu);
                    
                    if (keys.includes(id)) {
                        conditionDifficulteValue = difficultesPossibles[o];
                        conditionVerificateurValue = possibleConditions[i];
                        break;
                    }
                }
            }
        } else {
            const response = await fetch(`/turingmachine/assets/js/partie/classique_${conditionDifficulteValue}_${conditionVerificateurValue}.json?t=${new Date().getTime()}`);
            const jeu = await response.json();
            const keys = Object.keys(jeu);
    
            if (!id) {
                id = keys[Math.floor(Math.random() * keys.length)];
            }
    
            return jeu[id] ? { id, data: jeu[id] } : null;
        }
    
        if (conditionVerificateurValue == null) {
            return null;
        }
    
        const response = await fetch(`/turingmachine/assets/js/partie/classique_${conditionDifficulteValue}_${conditionVerificateurValue}.json?t=${new Date().getTime()}`);
        const jeu = await response.json();
        const keys = Object.keys(jeu);
    
        if (!id) {
            id = keys[Math.floor(Math.random() * keys.length)];
        }
    
        return jeu[id] ? { id, data: jeu[id] } : null;
    }
    
    static async getCode(carteVerification = false) {
        try {
            const data = await Data.getPlateau();
            const responses = await fetch(`/turingmachine/assets/js/jeu.json?t=${new Date().getTime()}`);
            const jeu = await responses.json();
            let tableau = Array.isArray(data) ? data : Object.values(data);
            tableau.splice(-2);
    
            if (carteVerification) {
                tableau = carteVerification;
            }
            const result = tableau.map(num => {
                const found = jeu["carte-verification"].find(carte => 
                    Object.values(carte).includes(num.toString())
                );
                return found ? found.valeur : null;
            }).filter(val => val !== null);
    
            if (result.length === 0) return { result, pos: -1, matchingKeys: "" };
    
            const longueur = result[0].length;
            let pos = -1;
    
            for (let i = 0; i < longueur; i++) {
                if (result.every(val => val[i] === '1')) {
                    pos = i;
                    break;
                }
            }
    
            if (pos === -1) return { result, pos, matchingKeys: "" };

            const findMatchingKey = (category) => {
                return Object.entries(jeu["carte-nbr"][category]).find(([key, value]) => value[pos] === '1')?.[0] || "?";
            };
    
            const matchingKeys = findMatchingKey("triangle") + findMatchingKey("carre") + findMatchingKey("rond");
    
            //console.log(matchingKeys);
            return (matchingKeys);
        } catch (error) {
            console.error("Erreur lors du chargement du plateau :", error);
            return null;
        }
    }
    
    static async getVerification(code, carte) {
        let pos = "";
        let valeurTrouvee = null;
    
        try {
            const response = await fetch(`/turingmachine/assets/js/jeu.json?t=${new Date().getTime()}`);
            const jeu = await response.json();
    
            let [chiffre1, chiffre2, chiffre3] = code.split("").map(Number);
            let triangle = jeu["carte-nbr"]["triangle"][chiffre1];
            let carre = jeu["carte-nbr"]["carre"][chiffre2];
            let rond = jeu["carte-nbr"]["rond"][chiffre3];
    
            for (let i = 0; i < triangle.length; i++) {
                if (triangle[i] === "1" && carre[i] === "1" && rond[i] === "1") {
                    pos = i.toString();
                    break;
                }
            }
    
            for (let item of jeu["carte-verification"]) {
                if (Object.values(item).includes(carte)) {
                    valeurTrouvee = item.valeur;
                    break;
                }
            }
    
            let resultat = valeurTrouvee && valeurTrouvee[pos] === "1";
    
            return (resultat);
        } catch (error) {
            console.error("Erreur lors du chargement du plateau :", error);
            return null;
        }
    }
    
    static async getCritere(carte) {
        try {
            const response = await fetch(`/turingmachine/assets/js/jeu.json?t=${new Date().getTime()}`);
            const jeu = await response.json();
    
            let resultat = [];
    
            for (let i = 0; i < carte.length; i++) {
                if (jeu["carte-critere"][carte[i]]) {
                    resultat.push(jeu["carte-critere"][carte[i]]);
                }
            }
    
            return resultat;
        } catch (error) {
            console.error("Erreur lors du chargement des cartes :", error);
            return null;
        }
    }       

    static async addResultat(id, resultat) {
        try {
            const response = await fetch(`/turingmachine/api/addResultat.php?t=${new Date().getTime()}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, resultat })
            });
    
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Erreur lors de l'ajout du resultat :", error);
            return { success: false, message: "Erreur de connexion." };
        }
    }

    static async addJoueur(id, pseudo) {
        try {
            const response = await fetch(`/turingmachine/api/addJoueur.php?t=${new Date().getTime()}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, pseudo })
            });
    
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Erreur lors de l'ajout du joueur :", error);
            return { success: false, message: "Erreur de connexion." };
        }
    }

    static async saveJoueurs(joueurs) {
        try {
            const response = await fetch(`/turingmachine/api/saveJoueurs.php?t=${new Date().getTime()}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ joueur: joueurs })
            });

            return await response.json();
        } catch (error) {
            console.error("Erreur lors de l'envoi des données :", error);
            return { success: false };
        }
    }
}

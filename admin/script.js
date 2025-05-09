document.addEventListener("DOMContentLoaded", async () => {
    const codeInput = document.getElementById("codeInput");
    const pseudoInput = document.getElementById("pseudoInput");
    const rechercheInput = document.getElementById("recherche");
    const btnSubmit = document.getElementById("btn_submit");
    const errorMessage = document.getElementById("errorMessage");

    document.getElementById("btn_quitter").addEventListener("click", async function () {
        await fetch("logout.php", { method: "GET" });
        window.location.href = "index.php";
    });

    codeInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");
    });

    pseudoInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z0-9_]/g, "");
    });

    rechercheInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z0-9_]/g, "");
        filtrerJoueurs();
    });

    [codeInput, pseudoInput].forEach(input => {
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                btnSubmit.click();
            } else if (event.key === " ") {
                event.preventDefault();
                this.value += "_";
            }
        });
    });

    let joueurs = [];

    async function chargerJoueurs() {
        const tbody = document.querySelector(".admin-table tbody");

        try {
            joueurs = await Data.getJoueur();
            afficherJoueurs(joueurs);
        } catch (error) {
            console.error("Erreur lors du chargement des joueurs :", error);
        }
    }

    function afficherJoueurs(joueursAffiches) {
        const tbody = document.querySelector(".admin-table tbody");
        tbody.innerHTML = "";

        joueursAffiches.forEach((joueur, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${joueur.id}</td>
                <td>${joueur.pseudo}</td>
                <td><textarea name="note_du_joueur">${joueur.note || ""}</textarea></td>
                <td>
                    <select>
                        <option value="" ${joueur.signer === "" ? "selected" : ""}></option>
                        <option value="elise" ${joueur.signer === "elise" ? "selected" : ""}>Élise</option>
                        <option value="beatrice" ${joueur.signer === "beatrice" ? "selected" : ""}>Béatrice</option>
                        <option value="rachelle" ${joueur.signer === "rachelle" ? "selected" : ""}>Rachelle</option>
                        <option value="lucie" ${joueur.signer === "lucie" ? "selected" : ""}>Lucie</option>
                    </select>
                </td>
                <td><span class="case ${joueur.bloquer ? "case-checked" : ""}" id="${index + 1}">✓</span></td>
            `;
            tbody.appendChild(row);
        });

        document.querySelectorAll(".case").forEach(span => {
            span.addEventListener("click", function () {
                this.classList.toggle("case-checked");
            });
        });
    }

    function filtrerJoueurs() {
        const recherche = rechercheInput.value.toLowerCase();
        const joueursFiltres = joueurs.filter(joueur =>
            joueur.id.toString().includes(recherche) || joueur.pseudo.toLowerCase().includes(recherche)
        );
        afficherJoueurs(joueursFiltres);
    }

    btnSubmit.addEventListener("click", async () => {
        const code = codeInput.value.trim();
        const pseudo = pseudoInput.value.trim();

        if (code === "" && pseudo !== ""){
            sendMessage("Veuillez entrer un identifiant.",1);
            return;
        } else if (code === "" && pseudo === "") {
            sendMessage("Veuillez entrer un identifiant et un pseudo.",1);
            return;
        } else if (pseudo === "" && !/^\d{7}$/.test(code)) {
            sendMessage("L'identifiant doit comporter 7 chiffres et veuillez entrer un pseudo.",1);
            return;
        } else if (pseudo !== "" && code !== "" && !/^\d{7}$/.test(code)) {
            sendMessage("L'identifiant doit comporter 7 chiffres.",1);
            return;
        } else if (pseudo === "" && code.length == 7) {
            sendMessage("Veuillez entrer un pseudo.",1);
            return;
        } else {
            try {
                const codes = await Data.getId();
                const pseudos = await Data.getPseudos();
                if (codes.includes(code)) {
                    codeInput.value = "";
                    sendMessage("Identifiant déjà créé !");
                } else if (pseudos.includes(pseudo)) {
                    sendMessage("Pseudo déjà utilisé !");
                } else {
                    const result = await Data.addJoueur(code, pseudo);
                    if (result.success) {
                        sendMessage(pseudo + " enregistré avec succès !", 3, "green");
                        setTimeout(async () => {
                            await chargerJoueurs();
                        }, 3000);
                    } else {
                        sendMessage("Veuillez réessayer !");
                    }
                    codeInput.value = "";
                    pseudoInput.value = "";
                }
            } catch (error) {
                console.error("Erreur lors de l'ajout du joueur :", error);
                errorMessage.textContent = "Erreur de connexion. Veuillez réessayer.";
            }
        }
    });

    await chargerJoueurs();

    document.querySelector(".btn-enregistrer").addEventListener("click", async () => {
        const joueurs = [];
        document.querySelectorAll(".admin-table tbody tr").forEach(row => {
            const id = row.children[0].textContent.trim();
            const pseudo = row.children[1].textContent.trim();
            const note = row.children[2].querySelector("textarea").value.trim();
            const signer = row.children[3].querySelector("select").value;
            const bloquer = row.children[4].querySelector("span").classList.contains("case-checked");
    
            joueurs.push({ id, pseudo, note, signer, bloquer });
        });
    
        try {
            const result = await Data.saveJoueurs(joueurs);
            if (result.success) {
                sendMessage("Données enregistrées avec succès !", 3, "green");
            } else {
                sendMessage("Erreur lors de l'enregistrement.");
            }
        } catch (error) {
            console.error("Erreur lors de l'enregistrement des joueurs :", error);
            sendMessage("Problème de connexion. Veuillez réessayer.");
        }
    });

    function checkScreenSize() {
        const container = document.querySelector(".container-add");
        if (!container) return;
    
        if (window.innerWidth < window.innerHeight) {
            container.classList.add("container-add-portrait");
        } else {
            container.classList.remove("container-add-portrait");
        }
    }
    
    checkScreenSize();
    
    window.addEventListener("resize", checkScreenSize);
});

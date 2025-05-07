document.body.classList.add("no-scroll");
window.scrollTo(0, 0);
function activateFullScreen() {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
 document.documentElement.requestFullscreen().catch(err => {
            console.log(`Erreur lors du passage en plein écran : ${err.message}`);
        });
    } else {
        console.log("Le mode plein écran n'est pas pris en charge par ce navigateur.");
    }
}
function reload() {
    document.body.classList.add("no-scroll");
    window.scrollTo(0, 0);
    document.getElementById("fiche-init").style.display = "flex";
    let elements = document.querySelectorAll(".bord-critere-locate");
    elements[0].classList.add("bord-critere");
    elements[1].classList.add("bord-critere");
    document.querySelectorAll(".col-close, .croix, .valider").forEach(element => {
        element.classList.remove("col-close", "croix");
    });
    document.querySelectorAll(".col-3").forEach(element => {
        element.classList.remove("circle");
        element.classList.remove("barre");
    });
    document.querySelectorAll(".row:not(:first-child) .col-3").forEach(col => {
        const newCol = col.cloneNode(true);
        col.parentNode.replaceChild(newCol, col);
    });
    document.querySelectorAll(".valide").forEach(element => {
        element.classList.remove("valide");
        element.textContent = "";
    });
    document.querySelectorAll(".row-case").forEach(row => {
        row.querySelectorAll(".col-9").forEach((element, index) => {
            if (index < 3) {
                element.textContent = "";
            }
        });
    });
    document.getElementById("id-init").value = "#";
    document.querySelectorAll("textarea").forEach(textarea => textarea.value = "");
    reset();
}

function retour(id) {
    document.getElementById("fiche-init-generer").classList.remove(id + "-visible");
    document.getElementById("fiche-init-condition").classList.remove(id + "-visible");
    document.getElementById("fiche-init").style.display = "flex";
}

async function initFiche() {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen ) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Erreur lors du passage en plein écran : ${err.message}`);
        });
    }
    document.getElementById("fiche-delay").style.display = "flex";
    document.getElementById("fiche-init").style.display = "none";
    const idInput = document.getElementById("id-init").value.toUpperCase();

    document.getElementById("affiche-id").textContent = idInput;
    const partie = await Data.getPartie(idInput);
    if (partie) {
        const { data } = partie;
        const { carteCritere, carteVerification } = data;

        debut(carteCritere, carteVerification.split(","));
    } else {
        initCondition(idInput);
    }
}

async function initGenererCondition() {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Erreur lors du passage en plein écran : ${err.message}`);
        });
    }
    document.getElementById("fiche-init").style.display = "none";
    document.getElementById("fiche-init-generer").classList.add("fiche-init-generer-visible");
}

async function initGenerer() {
    document.getElementById("fiche-delay").style.display = "flex";
    document.getElementById("fiche-init-generer").classList.remove("fiche-init-generer-visible");
    const condition = [];
    condition[1] = document.querySelector('input[name="difficulte"]:checked').value;
    condition[2] = document.querySelector('input[name="verificateurs"]:checked').value;

    const partie = await Data.getPartie("", condition);
    if (!partie) return;

    const { id, data } = partie;
    const { carteCritere, carteVerification } = data;

    document.getElementById("affiche-id").textContent = id;
    debut(carteCritere, carteVerification.split(","));
}

function initCondition(id) {
    document.getElementById("fiche-delay").style.display = "none";
    document.getElementById("fiche-init-condition").classList.add("fiche-init-condition-visible");
    document.getElementById("affiche-id").textContent = id;
}
function initConditionverif() {
    document.getElementById("fiche-init-condition").classList.remove("fiche-init-condition-visible");
    const carteCritere = document.getElementById("carte-critere").value;
    const carteVerification = document.getElementById("carte-verification").value.split(",");
    const carteVerificationstr = document.getElementById("carte-verification").value;
    if (
        (!carteCritere.match(/^([1-9]|[1-4][0-9])(?:,([1-9]|[1-4][0-9])){3,5}$/) || !carteVerificationstr.match(/^([2-7][0-9]{2})(?:,([2-7][0-9]{2})){3,5}$/)) || 
        carteCritere.charAt(carteCritere.length - 1) === ',' || 
        carteVerificationstr.charAt(carteVerificationstr.length - 1) === ','
    ) {
        document.getElementById("fiche-init-condition").classList.add("fiche-init-condition-visible");
        sendMessage("Veuillez remplir des données valides.");
    } else {
        debut(carteCritere, carteVerification);
    }
    
}

async function debut(carteCritere, carteVerification) {
    document.getElementById("fiche-init-condition").classList.remove("fiche-init-condition-visible");
    document.body.classList.remove("no-scroll");
    document.querySelectorAll(".row-case").forEach(row => {
        const cols = Array.from(row.querySelectorAll(".col-9"));
        
        let compteurLigne = 0;
    
        row.querySelectorAll(".col-9 span").forEach(span => {
            span.addEventListener("click", async () => {
                const colIndex = cols.findIndex(col => col.contains(span));
    
                let valColonne;
                switch (colIndex) {
                    case 3: valColonne = 0; break;
                    case 4: valColonne = 1; break;
                    case 5: valColonne = 2; break;
                    case 6: valColonne = 3; break;
                    case 7: valColonne = 4; break;
                    case 8: valColonne = 5; break;
                    default: return;
                }
    
                const valeursLigne = Array.from(cols).slice(0, 3).map(col => col.textContent.trim());
    
                if (compteurLigne < 3) {
                    try {
                        let codeTest = await Data.getVerification(valeursLigne.join(""), carteVerification[valColonne]);
    
                        if (codeTest === true) {
                            if (!span.classList.contains("valide") && !span.classList.contains("croix")) {
                                span.classList.add("valide");
                                span.textContent = "✔";
                                span.classList.remove("null");
                                compteurLigne++;
                            }
                        } else if (codeTest === false) {
                            if (!span.classList.contains("valide") && !span.classList.contains("croix")) {
                                span.classList.add("croix");
                                span.classList.remove("null");
                                compteurLigne++;
                            }
                        } else {
                            //span.classList.add("null");
                                span.textContent = "";
                                span.classList.remove("valide");
                                span.classList.remove("croix");
                        }
                    } catch (error) {
                        console.error("Erreur lors du test du code :", error);
                    }
                }
            });
        });
    });

    document.querySelectorAll(".row:not(:first-child) .col-3").forEach(col => {
        col.addEventListener("click", () => {
            if (col.classList.contains("barre")) {
                col.classList.remove("barre");
                col.classList.add("circle");
            } else if (col.classList.contains("circle")) {
                col.classList.remove("circle");
            } else {
                col.classList.add("barre");
            }
        });
    });

    let selectedCell = null;
    const fenetre = document.querySelector(".fenetre");

    document.querySelectorAll(".row-case .col-9:nth-child(-n+3)").forEach(cell => {
        cell.addEventListener("click", function () {
            selectedCell = this;
            fenetre.classList.add("visible");
        });
    });

    document.querySelectorAll(".fenetre span[id]").forEach(span => {
        span.addEventListener("click", function () {
            if (!selectedCell) return;

            if (this.id === "zero") {
                selectedCell.textContent = "";
            } else if (this.id !== "croix") {
                selectedCell.textContent = this.id;
            }

            fenetre.classList.remove("visible");
            selectedCell = null;
        });
    });

    document.getElementById("croix").addEventListener("click", function () {
        fenetre.classList.remove("visible");
    });

    document.querySelectorAll("textarea").forEach(textarea => {
        textarea.addEventListener("input", function () {
            this.value = this.value
                .replace(/\[/g, "▲")
                .replace(/\|/g, "🟣")
                .replace(/"/g, "🟨")
                .replace(/\T/g, "▲")
                .replace(/\R/g, "🟣")
                .replace(/\C/g, "🟨");
        });
    });

    const carteIds = carteCritere.split(",").map(Number);
    const data = await Data.getCritere(carteIds);
    let elements = document.querySelectorAll(".bord-critere");
    
    if (carteIds.length == 5) {
        elements[0].classList.remove("bord-critere");
    } else if (carteIds.length == 6) {
        elements[0].classList.remove("bord-critere");
        elements[1].classList.remove("bord-critere");
    }

    if (data) {
        const spans = document.querySelectorAll(".img-critere");
        const rowHead = document.querySelector(".row-head");
        const rowCase = document.querySelectorAll(".row-case");
    
        spans.forEach((span, index) => {
            if (data[index]) {
                span.innerHTML = data[index];
                const parentRow = span.closest(".row");
                parentRow.classList.remove("img-critere-vider");
            }
        });
    
        if (data.length === 4) {
            rowHead.querySelectorAll('.col-9').forEach((col, index) => {
                if (index >= 7) col.classList.add("col-close");
            });
            rowCase.forEach(row => {
                row.querySelectorAll('.col-9').forEach((col, index) => {
                    if (index >= 7) col.classList.add("col-close");
                });
            });
        } else if (data.length === 5) {
            rowHead.querySelectorAll('.col-9').forEach((col, index) => {
                if (index === 8) col.classList.add("col-close");
            });
            rowCase.forEach(row => {
                row.querySelectorAll('.col-9').forEach((col, index) => {
                    if (index === 8) col.classList.add("col-close");
                });
            });
        }
    }
       

    document.getElementById("btn_submit").addEventListener("click", async () => {
        let nbr1 = document.getElementById("nbr-1").textContent;
        let nbr2 = document.getElementById("nbr-2").textContent;
        let nbr3 = document.getElementById("nbr-3").textContent;

        if (nbr1 && nbr2 && nbr3) {
            let code = nbr1 + nbr2 + nbr3;

            try {
                const codes = await Data.getCode(carteVerification);
                if (code == codes) {
                    sendMessage("Code correct !",1,"green");
                } else {
                    reset();
                    sendMessage("Code incorrect !",1,"red");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du code :", error);
                alert("Erreur de connexion.");
            }
        } else {
            sendMessage("Veuillez saisir un code complet.",1,"red");
        }
        document.querySelector(".test-code").classList.remove("test-code-visible");
        document.body.classList.remove("no-scroll");
    });
    
    document.getElementById("fiche-delay").style.display = "none";
};

document.querySelectorAll(".btn-nbr").forEach(button => {
    button.addEventListener("click", () => {
        let classToAdd = "";
        let selector = "";
        let targetSpan = null;
        let number = button.textContent;
        if (button.id.includes("btn-t")) {
            classToAdd = "triangle-selected";
            selector = "[id^=btn-t]";
            targetSpan = document.getElementById("nbr-1");
        } else if (button.id.includes("btn-c")) {
            classToAdd = "carre-selected";
            selector = "[id^=btn-c]";
            targetSpan = document.getElementById("nbr-2");
        } else if (button.id.includes("btn-r")) {
            classToAdd = "rond-selected";
            selector = "[id^=btn-r]";
            targetSpan = document.getElementById("nbr-3");
        }
        document.querySelectorAll(selector).forEach(btn => btn.classList.remove(classToAdd));
        button.classList.add(classToAdd);

        if (targetSpan) {
            targetSpan.textContent = number;
        }
    });
});

document.getElementById("btn-test-code").addEventListener("click", function() {
    document.querySelector(".test-code").classList.add("test-code-visible");
    document.body.classList.add("no-scroll");
    window.scrollTo(0, 0);
});

document.getElementById("btn_fermer").addEventListener("click", function() {
    document.querySelector(".test-code").classList.remove("test-code-visible");
    document.body.classList.remove("no-scroll");
});

function reset() {
    document.querySelectorAll(".triangle-selected, .carre-selected, .rond-selected").forEach(el => {
        el.classList.remove("triangle-selected", "carre-selected", "rond-selected");
    });
    document.getElementById("nbr-1").textContent = "";
    document.getElementById("nbr-2").textContent = "";
    document.getElementById("nbr-3").textContent = "";
}
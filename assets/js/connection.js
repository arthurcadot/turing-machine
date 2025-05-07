function initConnectionPage() {
    const btnSubmit = document.getElementById("btn_submit");
    const codeInput = document.getElementById("codeInput");

    codeInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");
    });

    codeInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btnSubmit.click();
        }
    });

    btnSubmit.addEventListener("click", async function () {
        const code = codeInput.value.trim();

        if (code === "") {
            sendMessage("Veuillez entrer un code.");
            return;
        }

        if (/^\d{7}$/.test(code)) {
            try {
                const id = await Data.getId();
                const bloquer = await Data.getBloquer(code);

                if (id.includes(code) && bloquer === false) {
                    window.id = code;
                    loadPage("stat");
                } else {
                    loadPage("accueil");
                    if (bloquer === true){
                        sendMessage("Veuillez vous rapprocher d'une personne au point d'information, merci !", 10);
                    }else {
                        sendMessage("Veuillez vous enregistrer auprès d'une personne au point d'information, merci !", 10000);
                    }
                }
            } catch (error) {
                console.error("Erreur lors de la vérification du code :", error);
                sendMessage("Erreur de connexion. Veuillez réessayer.");
            }
        } else {
            sendMessage("Le code doit comporter 7 chiffres !");
        }
    });
}
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

document.getElementById("btn_submit").addEventListener("click", async () => {
    let nbr1 = document.getElementById("nbr-1").textContent;
    let nbr2 = document.getElementById("nbr-2").textContent;
    let nbr3 = document.getElementById("nbr-3").textContent;

    if (nbr1 && nbr2 && nbr3) {
        let code = nbr1 + nbr2 + nbr3;

        try {
            const codes = await Data.getCode();
            if (code == codes) {
                sendMessage("Code correct !", 3, "green");
            } else {
                sendMessage("Code incorrect !");
            }
            loadPage("accueil");
        } catch (error) {
            console.error("Erreur lors de la récupération du code :", error);
            sendMessage("Erreur de connexion.", 3, "red");
        }
    } else {
        sendMessage("Veuillez saisir un code complet.",1);
    }

});
async function initPlateauPage() {
    const plateauContainer = document.querySelector(".container-plateau");
    try {
        const plateau = await Data.getPlateau();

        function updatePlateau(container, plateauData) {
            if (!container) {
                console.error("L'élément du plateau spécifié n'existe pas !");
                return;
            }

            const plateauEntries = Object.entries(plateauData);
            let startRemoving = false;
            let lettresASupprimer = [];
            
            container.querySelectorAll(".calc").forEach((calcElement, index) => {
                const conditionElement = calcElement.querySelector(".plateau-condition");
                const reponseElement = calcElement.querySelector(".plateau-reponse");
                const letterElement = calcElement.querySelector(".plateau-lettre");
                const color = plateauData.color;
                
                if (!conditionElement || !reponseElement || !letterElement) return;
                
                if (plateauEntries[index]) {
                    const [condition, reponse] = plateauEntries[index];
                    
                    if (condition !== "id") {
                        conditionElement.textContent = condition;
                        reponseElement.textContent = reponse;
                        
                        reponseElement.classList.forEach(cls => {
                            if (cls.startsWith("plateau-") && cls !== "plateau-reponse") {
                                reponseElement.classList.remove(cls);
                            }                        
                        });
                
                        if (color) {
                            reponseElement.classList.add("plateau-" + color);
                        }
                    } else {
                        startRemoving = true;
                    }
                } else {
                    conditionElement.textContent = "##";
                    reponseElement.textContent = "###";
                }
                
                if (startRemoving) {
                    lettresASupprimer.push(letterElement.textContent.trim());
                }
            }); 
            
            container.querySelectorAll(".calc").forEach(calc => {
                const letterElement = calc.querySelector(".plateau-lettre");
                if (letterElement && lettresASupprimer.includes(letterElement.textContent.trim())) {
                    calc.remove();
                }
            });
        }

        updatePlateau(plateauContainer, plateau);

    } catch (error) {
        console.error("Erreur lors de la récupération des données du plateau :", error);
        if (plateauContainer) {
            plateauContainer.querySelectorAll(".calc").forEach(calcElement => {
                const conditionElement = calcElement.querySelector(".plateau-condition");
                const reponseElement = calcElement.querySelector(".plateau-reponse");

                if (conditionElement) conditionElement.textContent = "##";
                if (reponseElement) reponseElement.textContent = "###";
            });
        }
    }
}

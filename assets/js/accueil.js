async function initAccueilPage() {
    const record_juil = document.querySelector(".record-precedent");
    const record_aout = document.querySelector(".record-actuelle");
    const dateActuelle = new Date();

    const moisActuel = (dateActuelle.getMonth() + 1).toString().padStart(2, "0");
    const anneeActuel = dateActuelle.getFullYear().toString();

    const datePrecedente = new Date(dateActuelle);
    datePrecedente.setMonth(datePrecedente.getMonth() - 1);
    const moisPrecedent = (datePrecedente.getMonth() + 1).toString().padStart(2, "0");
    const anneePrecedent = datePrecedente.getFullYear().toString();

    const moisNoms = ["janvier", "février", "mars", "avril", "mai", "juin","juillet", "août", "septembre", "octobre", "novembre", "décembre"];

    try {
        const [records_juil, records_aout] = await Promise.all([
            Data.getRecords(moisPrecedent, anneePrecedent),
            Data.getRecords(moisActuel, anneeActuel)
        ]);

        function updateTable(recordElement, records) {
            if (!recordElement) {
                console.error("L'élément spécifié n'existe pas !");
                return;
            }

            if (records.length === 0) {
                recordElement.remove();
                return;
            }

            recordElement.innerHTML = `
                <h2 class="record-h2">${moisNoms[recordElement === record_juil ? datePrecedente.getMonth() : dateActuelle.getMonth()]}</h2>
                <table>
                    <tr>
                        <th></th>
                        <th>Pseudo</th>
                        <th>Points</th>
                    </tr>
                    ${records.map((record, index) => {
                        const name = Object.keys(record)[0];
                        const value = record[name];
                        return `
                        <tr>
                            <td><span>#${index + 1}</span></td>
                            <td>${name}</td>
                            <td>${value}</td>
                        </tr>
                        `;
                    }).join("")}
                </table>
            `;
        }

        updateTable(record_juil, records_juil);
        updateTable(record_aout, records_aout);

    } catch (error) {
        console.error("Erreur lors de la récupération des records :", error);
        if (record_juil) {
            record_juil.innerHTML = "<p class='error-message'>Erreur de connexion.</p>";
        }
        if (record_aout) {
            record_aout.innerHTML = "<p class='error-message'>Erreur de connexion.</p>";
        }
    }
    function initAutoScroll(selector) {
        const table = document.querySelector(selector);
        if (!table) return;
    
        let scrollAmount = 1;
        let direction = 1;
    
        function autoScroll() {
            table.scrollTop += scrollAmount * direction;
    
            if (table.scrollTop + table.clientHeight >= table.scrollHeight) {
                direction = -1;
            } else if (table.scrollTop === 0) {
                direction = 1;
            }
    
            setTimeout(autoScroll, 30);
        }
    
        autoScroll();
    }
    initAutoScroll(".record-precedent");
    initAutoScroll(".record-actuelle");
}
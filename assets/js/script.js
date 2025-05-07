function activateFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Erreur lors du passage en plein écran : ${err.message}`);
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadPage("accueil");

    document.body.addEventListener("click", function (event) {
        if (event.target && event.target.id === "btn_accueil") {
            loadPage("accueil");
        }
        if (event.target && event.target.id === "btn_record") {
            loadPage("record");
        }
        if (event.target && event.target.id === "btn_connection") {
            loadPage("connection");
        }
        if (event.target && event.target.id === "btn_code") {
            loadPage("code");
        }
        if (event.target && event.target.id === "btn_deconnection") {
            loadPage("accueil");
        }
        if (event.target && event.target.id === "btn_plateau") {
            activateFullScreen();
            loadPage("plateau");
        }
        if (event.target && event.target.id === "btn_historique") {
            loadPage("historique");
        }
        if (event.target && event.target.id === "btn_stat") {
            loadPage("stat");
        }
    });
});

async function loadPage(page) {
    id = window.id;
    const content = document.getElementById("content");
    content.innerHTML = "";

    const pages = {
        "accueil": { file: "accueil.html", init: initAccueilPage },
        "record": { file: "record.html", init: initRecordPage },
        "connection": { file: "connection.html", init: initConnectionPage },
        "stat": { file: "stat.html", init: initStatPage },
        "code": { file: "code.html", init: initCodePage },
        "plateau": { file: "plateau.html", init: initPlateauPage },
        "historique": { file: "historique.html", init: initHistoriquePage }
    };

    if (pages[page]) {
        loadHTML(pages[page].file, "content", pages[page].init);
    }
}


async function loadHTML(file, targetId, callback) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(targetId).innerHTML += data;
            if (callback) callback();
        })
        .catch(error => console.error('Erreur de chargement:', error));
}

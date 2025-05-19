<?php
require_once('protect_page/code.php');
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Turing Machine</title>
    <link rel="icon" href="../assets/img/favicon.png">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/sendMessage.css">
    <script src="script.js" defer></script>
    <script src="../assets/js/sendMessage.js" defer></script>
    <script src="../assets/js/data.js" defer></script>
</head>
<body>
    <div class="container container-add flex-row">
        <div class="container border-green container-add-joueur">
            <h1>Page Admin</h1>
            <h2>Création du joueur</h2>
            <p>Entrez votre identifiant :</p>
            <input class="btn" type="text" id="codeInput" maxlength="7" placeholder="XXXXXXX" inputmode="numeric" autofocus style="text-align: center">
            <p>Entrez votre pseudo :</p>
            <input class="btn no-upercase"  type="text" id="pseudoInput" maxlength="20" placeholder="Jeu_Lab2025" style="text-align: center">
            <button class="btn btn-blue" id="btn_submit">Valider</button>
            <button class="btn btn-purple" id="btn_quitter">Déconnection</button>
        </div>
        <div class="container w-100 scroll">
            <div class="div-enregistre">
                <input class="btn-recherche" maxlength="20" placeholder="Recherche" id="recherche">
                <h2>Liste des joueurs</h2>
                <button class="btn-enregistrer">Enregistrer</button>
            </div>
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Identifiant</th>
                        <th>Pseudo</th>
                        <th>Message</th>
                        <th>Message laissé par :</th>
                        <th>Bloqué</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</body>
</html>
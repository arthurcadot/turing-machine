<?php
$file = "../assets/js/joueur.json";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    header("Content-Type: application/json"); // S'assurer que la réponse est bien en JSON

    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input["id"]) || !isset($input["resultat"])) {
        echo json_encode(["success" => false, "message" => "Données invalides."]);
        exit;
    }

    $id = strval($input["id"]);
    $resultat = $input["resultat"];
    $date = date("d/m/Y"); // Format JJ/MM/YYYY

    // Charger le JSON existant
    $data = json_decode(file_get_contents($file), true);

    // Vérifier si "joueur" existe et est bien un tableau
    if (!isset($data["joueur"]) || !is_array($data["joueur"])) {
        $data["joueur"] = [];
    }

    // Chercher le joueur par ID
    $playerIndex = null;
    foreach ($data["joueur"] as $index => $player) {
        if ($player["id"] === $id) {
            $playerIndex = $index;
            break;
        }
    }

    // Si le joueur existe et la date est déjà enregistrée, retourner une erreur avec l'objet structuré
    if ($playerIndex !== null && isset($data["joueur"][$playerIndex]["resultats"][$date])) {
        echo json_encode([
            "success" => false,
            "message" => "Vous avez déjà participé aujourd'hui.",
            "data" => [
                "id" => $id,
                "date" => $date,
                "resultat" => $data["joueur"][$playerIndex]["resultats"][$date]
            ]
        ]);
        exit;
    }

    // Si le joueur n'existe pas, l'ajouter
    if ($playerIndex === null) {
        $playerIndex = count($data["joueur"]);
        $data["joueur"][] = [
            "id" => $id,
            "pseudo" => "",
            "note" => "",
            "signer" => "",
            "bloquer" => false,
            "resultats" => []
        ];
    }

    // Ajouter le résultat pour la date donnée
    $data["joueur"][$playerIndex]["resultats"][$date] = $resultat;

    // Sauvegarde du fichier JSON
    if (file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES))) {
        echo json_encode([
            "success" => true,
            "message" => "Résultat enregistré avec succès.",
            "data" => [
                "id" => $id,
                "date" => $date,
                "resultat" => $resultat
            ]
        ], JSON_UNESCAPED_SLASHES);
    } else {
        echo json_encode(["success" => false, "message" => "Erreur lors de l'enregistrement."], JSON_UNESCAPED_SLASHES);
    }
    
}
?>

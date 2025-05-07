<?php
$file = '../assets/js/joueur.json';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input["joueur"]) || !is_array($input["joueur"])) {
        echo json_encode(["success" => false, "message" => "Données invalides."]);
        exit;
    }

    $data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    
    if (!is_array($data)) {
        $data = [];
    }

    if (!isset($data["joueur"]) || !is_array($data["joueur"])) {
        $data["joueur"] = [];
    }

    foreach ($input["joueur"] as $newJoueur) {
        foreach ($data["joueur"] as &$existingJoueur) {
            if ($existingJoueur["id"] === $newJoueur["id"]) {
                $existingJoueur = array_merge($existingJoueur, $newJoueur);
                continue 2;
            }
        }
        $data["joueur"][] = $newJoueur;
    }

    if (file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT))) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Erreur lors de l'enregistrement."]);
    }
}
?>

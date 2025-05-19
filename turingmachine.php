<?php
require_once('protect_page/code.php');
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fiche - Turing Machine</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/turingmachine.css">
    <link rel="stylesheet" href="assets/css/sendMessage.css">
    <link rel="stylesheet" href="assets/css/mobile.css">
    <script src="assets/js/turingmachine.js" defer></script>
    <script src="assets/js/data.js" defer></script>
    <script src="assets/js/sendMessage.js" defer></script>
</head>
<body class="fiche2">
    <div id="fiche-delay">
        <img class="delay" src="assets/img/delay.png">
    </div>
    <div id="fiche-init">
        <input type="text" id="id-init" value="#" maxlength="8">
        <button class="btn btn-blue" onclick="initFiche()">Valider</button>
        <span class="hr"></span>
        <button class="btn btn-orange" onclick="initGenererCondition()">Générer</button>
    </div>
    <div id="fiche-init-generer">
        <div class="radio-group">
            <label class="radio-label">
                <input type="radio" name="difficulte" value="facile">
                <span class="custom-radio">FACILE</span>
            </label>
            <label class="radio-label">
                <input type="radio" name="difficulte" value="standard" checked>
                <span class="custom-radio">STANDARD</span>
            </label>
            <label class="radio-label">
                <input type="radio" name="difficulte" value="difficile">
                <span class="custom-radio">DIFFICILE</span>
            </label>
        </div>
        <div class="radio-group">
            <label class="radio-label">
                <input type="radio" name="verificateurs" value="4">
                <span class="custom-radio">4</span>
            </label>
            <label class="radio-label">
                <input type="radio" name="verificateurs" value="5">
                <span class="custom-radio">5</span>
            </label>
            <label class="radio-label">
                <input type="radio" name="verificateurs" value="6" checked>
                <span class="custom-radio">6</span>
            </label>
        </div>               
        <button class="btn btn-orange" onclick="initGenerer()">Valider</button>
        <button class="btn btn-yellow" onclick="retour('fiche-init-generer')">Retour</button>
    </div>
    <div id="fiche-init-condition">
        <input type="text" id="carte-critere" placeholder="3,16,18,19,20,32" maxlength="17">
        <input type="text" id="carte-verification" placeholder="462,758,614,220,233,497" maxlength="23">
        <button class="btn btn-blue" onclick="initConditionverif()">Valider</button>
        <button class="btn btn-yellow" onclick="retour('fiche-init-condition')">Retour</button>
    </div>
    <div class="container">
        <div class="row">
            <div id="affiche-id"></div>
            <!--<button class="btn btn-new btn-purple" onclick="window.location.reload();">New partie</button>-->
            <button class="btn btn-new btn-purple" onclick="reload()">New partie</button>
        </div>
        <div class="row row-head">
            <div class="col-9"><span class="forme triangle"></span></div>
            <div class="col-9"><span class="forme carre"></span></div>
            <div class="col-9"><span class="forme rond"></span></div>
            <div class="col-9"><b>A</b></div>
            <div class="col-9"><b>B</b></div>
            <div class="col-9"><b>C</b></div>
            <div class="col-9"><b>D</b></div>
            <div class="col-9"><b>E</b></div>
            <div class="col-9"><b>F</b></div>
        </div>
        <div class="row row-case first-row-case"><div class="col-9"></div><div class="col-9"></div><div class="col-9"></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div></div>
        <div class="row row-case"><div class="col-9"></div><div class="col-9"></div><div class="col-9"></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div></div>
        <div class="row row-case"><div class="col-9"></div><div class="col-9"></div><div class="col-9"></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div></div>
        <div class="row row-case"><div class="col-9"></div><div class="col-9"></div><div class="col-9"></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div></div>
        <div class="row row-case"><div class="col-9"></div><div class="col-9"></div><div class="col-9"></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div></div>
        <div class="row row-case"><div class="col-9"></div><div class="col-9"></div><div class="col-9"></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div></div>
        <div class="row row-case"><div class="col-9"></div><div class="col-9"></div><div class="col-9"></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div></div>
        <div class="row row-case"><div class="col-9"></div><div class="col-9"></div><div class="col-9"></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div></div>
        <div class="row row-case last-row-case"><div class="col-9"></div><div class="col-9"></div><div class="col-9"></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div><div class="col-9"><span></span></div></div>
    </div>
    <div class="container">
<div class="row stretch position-relative img-critere-vider"><span class="img-critere"></span><textarea>
</textarea>
<span class="id-lettre">A</span></div>
<div class="row stretch position-relative img-critere-vider"><span class="img-critere"></span><textarea>
</textarea>
<span class="id-lettre">B</span></div>
<div class="row stretch position-relative img-critere-vider"><span class="img-critere"></span><textarea>
</textarea>
<span class="id-lettre">C</span></div>
<div class="row stretch position-relative img-critere-vider bord-critere-locate bord-critere"><span class="img-critere"></span><textarea>
</textarea>
<span class="id-lettre">D</span></div>
<div class="row stretch position-relative img-critere-vider bord-critere-locate bord-critere"><span class="img-critere"></span><textarea>
</textarea>
<span class="id-lettre">E</span></div>
<div class="row stretch position-relative img-critere-vider"><span class="img-critere"></span><textarea>
</textarea>
<span class="id-lettre">F</span></div>
    </div>
    <div class="container-parent">
        <div class="row"><div class="col-3"><span class="forme triangle"></span></div><div class="col-3"><span class="forme carre"></span></div><div class="col-3"><span class="forme rond"></span></div></div>
        <div class="row"><div class="col-3">5</div><div class="col-3">5</div><div class="col-3">5</div></div>
        <div class="row"><div class="col-3">4</div><div class="col-3">4</div><div class="col-3">4</div></div>
        <div class="row"><div class="col-3">3</div><div class="col-3">3</div><div class="col-3">3</div></div>
        <div class="row"><div class="col-3">2</div><div class="col-3">2</div><div class="col-3">2</div></div>
        <div class="row"><div class="col-3">1</div><div class="col-3">1</div><div class="col-3">1</div></div>
    </div>
    <div class="fenetre">
        <span id="5">5</span>
        <span id="4">4</span>
        <span id="3">3</span>
        <span id="2">2</span>
        <span id="1">1</span>
        <span id="zero">0</span>
        <span id="croix">✘</span>
    </div>
    <button class="btn btn-purple" id="btn-test-code">Tester votre code</button>
    <div class="test-code">
        <div class="container-calc">
            <div class="calc">
                <span class="nbr-triangle cursor-none" id="nbr-1"></span>
                <span class="nbr-carre cursor-none" id="nbr-2"></span>
                <span class="nbr-rond cursor-none" id="nbr-3"></span>
            </div>
            <div class="calc">
                <button class="btn btn-nbr" id="btn-t5">5</button>
                <button class="btn btn-nbr" id="btn-c5">5</button>
                <button class="btn btn-nbr" id="btn-r5">5</button>
            </div>
            <div class="calc">
                <button class="btn btn-nbr" id="btn-t4">4</button>
                <button class="btn btn-nbr" id="btn-c4">4</button>
                <button class="btn btn-nbr" id="btn-r4">4</button>
            </div>
            <div class="calc">
                <button class="btn btn-nbr" id="btn-t3">3</button>
                <button class="btn btn-nbr" id="btn-c3">3</button>
                <button class="btn btn-nbr" id="btn-r3">3</button>
            </div>
            <div class="calc">
                <button class="btn btn-nbr" id="btn-t2">2</button>
                <button class="btn btn-nbr" id="btn-c2">2</button>
                <button class="btn btn-nbr" id="btn-r2">2</button>
            </div>
            <div class="calc">
                <button class="btn btn-nbr" id="btn-t1">1</button>
                <button class="btn btn-nbr" id="btn-c1">1</button>
                <button class="btn btn-nbr" id="btn-r1">1</button>
            </div>
        </div>
        <button class="btn btn-fiche-blue" id="btn_submit">Valider</button>
        <button class="btn btn-yellow btn-fiche-yellow" id="btn_fermer">Fermer</button>
    </div>
</body>
</html>
<?php
header('Content-Type: application/json');

if (!isset($_GET['ville']) || empty($_GET['ville'])) {
    echo json_encode(['cod' => '400', 'message' => 'Paramètre ville manquant']);
    exit;
}

$ville = urlencode($_GET['ville']);
$apiKey = '5a0c3c16bb16b4a826715f2c1ffda867';  // Ta clé API ici

$url = "https://api.openweathermap.org/data/2.5/weather?q={$ville}&appid={$apiKey}&units=metric&lang=fr";

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
]);

$response = curl_exec($curl);

if ($response === false) {
    echo json_encode(['cod' => '500', 'message' => 'Erreur de récupération des données']);
    exit;
}

curl_close($curl);

$data = json_decode($response, true);

if (!$data) {
    echo json_encode(['cod' => '500', 'message' => 'Erreur de décodage JSON']);
    exit;
}

echo json_encode($data);

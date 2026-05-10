<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$residents = [
    [
        "id" => 1,
        "name" => "Stella",
        "unit" => "807",
        "email" => "stella@example.com",
        "phone" => "0412345678"
    ],
    [
        "id" => 2,
        "name" => "Zimo",
        "unit" => "805",
        "email" => "zimo@example.com",
        "phone" => "0498763524"
    ],
    [
        "id" => 3,
        "name" => "Hiky",
        "unit" => "803",
        "email" => "hiky@example.com",
        "phone" => "0475622713"
    ]
];

echo json_encode($residents);
?>

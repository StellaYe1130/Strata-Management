<?php
$url = 'https://pxepetpoaobjzazhbxsb.supabase.co/rest/v1/residents?select=*';
$apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4ZXBldHBvYW9ianphemhieHNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3NjU1OTYsImV4cCI6MjA2MTM0MTU5Nn0.tDWJbGJA7A2xBw6-8fxY6tU1zP9uH7MUOZy9-4c_sZU';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'apikey: ' . $apiKey,
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
curl_close($ch);

header('Content-Type: application/json');
echo $response;
?>

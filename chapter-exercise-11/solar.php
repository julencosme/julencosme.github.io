<?php
$WeatherSource = "https://api.forecast.io/forecast/63b7b74bc3f72a4bc39ce10f3e09a644/" . $_GET["lat"] . "," . $_GET["lng"];
header("Content-Type: application/json");
header("Cache-Control: no-cache");
readfile($WeatherSource);
?>
<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// require database and object files
require_once '../../vendor/autoload.php';
require_once '../config/database.php';
require_once '../objects/meta.php';

$dotenv = Dotenv\Dotenv::create('../../');
$dotenv->load();

// instantiate database
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$meta = new Meta($db);

// query meta
$results = $meta->read();
 
if ($results) {
    // set response code - 200 OK
    $metaInfo = $results;
    http_response_code(200);
    echo json_encode($metaInfo);

} else {
    // set response code - 204 No Content
    http_response_code(204);
    echo json_encode(
        array("message" => "No inforrmation found.")
    );
}
?>
<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
require_once '../../vendor/autoload.php';
require_once '../config/database.php';
require_once '../objects/node.php';

$dotenv = Dotenv\Dotenv::create('../../');
$dotenv->load();
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare node object
$node = new Node($db);
$node->id = isset($_GET['id']) ? $_GET['id'] : die();
 
$node->readOne();
 
if (!empty($node->name) && !empty($node->type)) {
 
    http_response_code(200);    // set response code - 200 OK
    echo json_encode($node); 

} else {
    http_response_code(204); // set response code - 204 No Content
    echo json_encode(
        array("message" => "No nodes found.")
    );
}
?>
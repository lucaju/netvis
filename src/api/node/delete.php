<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object file
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
 
// get node id
$data = json_decode(file_get_contents("php://input"));
 
// if ID is empty
if (empty($data->id)) {
    http_response_code(400);
    echo json_encode(
        array("error" => "Unable to delete node. Data is incomplete.")
    );
    return;
}
// set node id to be deleted
$node->id = $data->id;

//if NODE is not existent
if (!$node->exist()) {
    http_response_code(400);
    echo json_encode(
        array("error" => "Unable to delete node. Data is nonexistent.")
    );
    return;
}
 
//if deleted
if ($node->delete()) {
    http_response_code(200);
    echo json_encode(array("action" => "deleted"));
    return;
} 

//if error
http_response_code(503);  // set response code - 503 service unavailable
echo json_encode(array("message" => "Unable to delete node."));
return;

?>
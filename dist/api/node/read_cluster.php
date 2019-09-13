<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// require database and object files
require_once '../../vendor/autoload.php';
require_once '../config/database.php';
require_once '../objects/node.php';

$dotenv = Dotenv\Dotenv::create('../../');
$dotenv->load();
 
// instantiate database and nodes_arr object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$node = new Node($db);

// set ID property of record to read
$node->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// query nodes
$stmt = $node->readCluster();
 
// check if more than 0 record found
if ($stmt->rowCount() > 0) {
 
    // nodes_arrs array
    $nodes_arr=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $nodes_arr_item = array(
            "id" => $id,
            "name" => html_entity_decode($name),
            "type" => $type
        );

        array_push($nodes_arr, $nodes_arr_item);
    }

    // set response code - 200 OK
    http_response_code(200);  
    echo json_encode($nodes_arr);

} else {
     // set response code - 204 No Content
    http_response_code(204); 
    echo json_encode(array("message" => "No nodes found."));
}
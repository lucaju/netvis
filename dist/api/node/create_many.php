<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
require_once '../../vendor/autoload.php';
require_once '../config/database.php';
require_once '../objects/node.php';
require_once '../shared/utilities.php';

$dotenv = Dotenv\Dotenv::create('../../');
$dotenv->load();

// get posted data
$dataToImport = json_decode(file_get_contents("php://input"));

$dataCollection = $dataToImport->data;

if (empty($dataCollection)) {
    http_response_code(503);        // set response code - 503 service unavailable
    echo json_encode(array("error" => "Unable to import nodes."));
    return;
};
 
$database = new Database();
$db = $database->getConnection();

if ($dataToImport->csvData === "edge") {
    include_once 'import/import_edges.php';
    $importer = new ImportEdges($db);
} else {
    include_once 'import/import_nodes.php';
    $importer = new ImportNodes($db);
}

$importer->importData($dataCollection);

if ($importer->nodesAdded > 0
    || $importer->nodesUpdated > 0
    || $importer->nodeConnectionsAdded > 0
    || $importer->nodeConnectionsRefused > 0
) {
    http_response_code(207);        // set response code - 207 Multi Status (Mix of 201 and 400)
    echo json_encode($importer);
    return;
}
   
http_response_code(503);        // set response code - 503 service unavailable
$msg = array("error" => "Unable to import nodes.");
if ($importer->importErros > 0) $msg["importErros"] = $importer->importErros;
echo json_encode($msg);


?>
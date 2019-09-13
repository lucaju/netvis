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
require_once '../objects/meta.php';

$dotenv = Dotenv\Dotenv::create('../../');
$dotenv->load();

// get get data to update
$data = json_decode(file_get_contents("php://input"));
 
// check if data is not emptu
if (empty($data)) {
    http_response_code(503);  // set response code - 503 service unavailable
    echo json_encode(array("message" => "Unable to update."));
    return;
}
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare meta object
$meta = new Meta($db);

// echo $data[0];

//prepara data
$updated = 0;
$errors = 0;
$nochange = 0;

foreach ($data as $attr => $value) {
    $res = $meta->update($attr, $value);
    
    if ($meta->update($attr, $value)) {
        if ($res['status'] == 'updated') {
            $updated++;
        } else if ($res['status'] == 'nochange') {
            $nochange++;
        }
    } else {
        $errors++;
    }
}


if ($updated > 0  || $nochange > 0) {
    $metaUpdated = array("action" => "updated");
    if ($updated > 0) $metaUpdated["updates"] = $updated;
    if ($nochange > 0) $metaUpdated["nochange"] = $nochange;
    if ($errors > 0) $metaUpdated["Erros"] = $errors;

    http_response_code(207);      // set response code - 207 Multi Status (Mix of 201 and 400)
    echo json_encode($metaUpdated);
    die;
}
   
http_response_code(503);        // set response code - 503 service unavailable
$msg = array("error" => "Unable to update");
if ($errors > 0) $msg["Erros"] = $errors;
echo json_encode($msg);

?>
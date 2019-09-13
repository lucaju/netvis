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
require_once '../objects/user.php';

$dotenv = Dotenv\Dotenv::create('../../');
$dotenv->load();
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare user object
$user = new User($db);

//data
$data = json_decode(file_get_contents("php://input"));
 
// check data
$requestID = isset($_GET['requestID']) ? $_GET['requestID'] : die();
 
// read request
$request = $user->requestPaswordReset($requestID);
 
if ($request) {

    if ($request === "invalid") {
        // set response code - 401 Unauthorized
        http_response_code(401);
        echo json_encode(
            array("error" => "Invalid Request!")
        );
        return;
    }

    if ($request === "expired") {
        // set response code - 203 Non-authoritative Information
        http_response_code(203);
        echo json_encode(
            array(
                "error" => "Request expired.",
                "expired" => true
            )
        );
        return;
    }
 
    // set response code - 200 OK
    http_response_code(200);
    echo json_encode($request);

} else {
    // set response code - 503 Service unavailable
    http_response_code(503);
    echo json_encode(
        array("error" => "Unable process your request. Please contact the administrator.")
    );
}
?>
<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// require database and object files
require_once '../../vendor/autoload.php';
require_once '../config/database.php';
require_once '../objects/user.php';
require_once '../email/composer.php';


$dotenv = Dotenv\Dotenv::create('../../');
$dotenv->load();
 
// instantiate database
$database = new Database();
$db = $database->getConnection();

// get id of node to be edited
$data = json_decode(file_get_contents("php://input"));
 
// initialize object
$user = new User($db);

if (isset($data->email) && $data->email != '') {

    $user->email = $data->email;

    //check
    $requestID = $user->recoverPassword();

    if ($requestID === 'invalid') {
        // set response code - 401 Unauthorized
        http_response_code(401);
        echo json_encode(
            array("error" => "Email Invalid!")
        );
    } else if ($requestID) {

        $emailComposer = new Composer();
        $sent = $emailComposer->sendRecovery(
            $requestID,
            $user->first,
            $user->email
        );
    
        // set response code - 202 Accepted
        http_response_code(202);
        echo json_encode(
            array("message" => "An email was sent to you with your recovery password.")
        );

    } else {
        // set response code - 503 service unavailable
        http_response_code(503); 
        echo json_encode(array("error" => "Unable to process your request."));
    }

} else {

     // set response code - 401 Unauthorized
    http_response_code(401);
    echo json_encode(
        array("error" => "Email Invalid!")
    );
    
}
?>
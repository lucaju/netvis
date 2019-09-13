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
require_once '../objects/user.php';
require_once '../shared/utilities.php';

$dotenv = Dotenv\Dotenv::create('../../');
$dotenv->load();
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare user object
$user = new User($db);
 
// get id of user to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of User to be edited
$user->id = $data->id;
$user->password = $data->password;
$user->modified_at = Utilities::getTimeNow();
 
// update the user
if ($user->resetPassword()) {

    //return with updated information
    $userUpdated = array(
        "action" => "updatedUser",
        "id" => $user->id
    );

    // set response code - 200 ok
    http_response_code(200);  
    echo json_encode($userUpdated);

} else {
    // set response code - 503 service unavailable
    http_response_code(503); 
    echo json_encode(array("error" => "Unable to reset password."));
}
?>
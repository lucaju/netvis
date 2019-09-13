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
require_once '../email/composer.php';


$dotenv = Dotenv\Dotenv::create('../../');
$dotenv->load();
 
$database = new Database();
$db = $database->getConnection();
 
$user = new User($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

$invitation = $data->invitation;

// make sure data is not empty
if (!empty($data->email) && !empty($data->first) && count($data->level) > 0) {
 
    // set user property values
    $user->level = $data->level;
    $user->email = $data->email;
    $user->password = $data->password;
    $user->first = $data->first;
    if (isset($data->last)) $user->last = $data->last;

    $user->created_at = Utilities::getTimeNow();
    $user->modified_at = $user->created_at;
 
    // create the user
    if ($user->create()) {

        //email
        if ($invitation) {

            //add a request for password reset
            $requestID = $user->recoverPassword();

            $emailComposer = new Composer();
            $sent = $emailComposer->sendInvitation(
                $requestID,
                $user->first,
                $user->email
            );
        }

        $userCreated = array(
            "action" => "created",
            "id" => $user->id,
            "level" => $user->level,
            "email" => $user->email,
            "first" => html_entity_decode($user->first),
            "last" => html_entity_decode($user->last),
            "invitation" => $sent
        );

        // set response code - 201 created
        http_response_code(201);
        echo json_encode($userCreated);

    } else {
         // set response code - 503 service unavailable
        http_response_code(503);
        echo json_encode(array("message" => "Unable to create user."));
    }

} else {
    // set response code - 400 bad request
    http_response_code(400);
    echo json_encode(
        array("message" => "Unable to create user. Data is incomplete.")
    );
}

?>
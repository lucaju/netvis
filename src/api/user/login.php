<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// require database and object files
require_once '../../vendor/autoload.php';
require_once '../config/database.php';
require_once '../objects/user.php';

$dotenv = Dotenv\Dotenv::create('../../');
$dotenv->load();
 
// instantiate database
$database = new Database();
$db = $database->getConnection();

// get id of node to be edited
$data = json_decode(file_get_contents("php://input"));
 
// initialize object
$user = new User($db);

if (isset($data->email)
    && $data->email != '' 
    && isset($data->password)
    && $data->password != ''
) {

    $user->email = $data->email;
    $user->password = $data->password;

    //check

    $crendential = $user->login();

    if ($crendential === 'accepted') {

        // create array
        $user_arr = array(
            "id" =>  $user->id,
            "level" => $user->level,
            "email" => $user->email,
            "first" => $user->first,
            "last" => $user->last,
        );
    
        // set response code - 202 Accepted
        http_response_code(202);
        echo json_encode($user_arr);

    } else {
        // set response code - 401 Unauthorized
        http_response_code(401);
        echo json_encode(
            array("error" => $crendential)
        );
    }

} else {
    // set response code - 401 Unauthorized
    http_response_code(401);
    echo json_encode(
        array("error" => "Email or Password Invalid!")
    );
}
?>
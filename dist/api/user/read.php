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
 
// initialize object
$user = new User($db);
 
// query Users
$stmt = $user->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if ($num > 0) {
 
    // users_arrs array
    $users_arr=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $users_arr_item = array(
            "id" => $id,
            "level" => html_entity_decode($level),
            "email" => html_entity_decode($email),
            "first" => html_entity_decode($first),
            "last" => html_entity_decode($last),
        );

        array_push($users_arr, $users_arr_item);
    }

    // set response code - 200 OK
    http_response_code(200);
    echo json_encode($users_arr);

} else {
    // set response code - 204 No Content
    http_response_code(204);
    echo json_encode(
        array("message" => "No users found.")
    );
}
?>
<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

require_once '../../vendor/autoload.php';

function checkEnv()
{
    try {
        $dotenv = Dotenv\Dotenv::create('../../');
        $dotenv->load();
        return true;

    } catch (\Dotenv\Exception\InvalidPathException $exception) {
        return false;
    }
}

function checkNewCredentials()
{
    $dbData = json_decode(file_get_contents("php://input"));
    if (!isset($dbData->name)
        || !isset($dbData->host)
        || !isset($dbData->user)
        || !isset($dbData->password)
    ) {
        return false;
    } else {
        return true;
    }
}

//check if environment variables exists
$env = checkEnv();
if (!$env) {

    if (!checkNewCredentials()) {
        http_response_code(500); //Internal Server Error
        echo json_encode(
            array(
                "message" => "Connection failed.",
                "action" => "Redirect to install"
            )
        );
        die();
    }
   
}

$DB_HOST;
$DB_NAME;
$DB_USER;
$DB_PWD;

if ($env) {
    $DB_HOST = getenv('DATABASE_HOST');
    $DB_NAME = getenv('DATABASE_NAME');
    $DB_USER = getenv('DATABASE_USERNAME');
    $DB_PWD = getenv('DATABASE_PASSWORD');
    
} else {
    $dbData = json_decode(file_get_contents("php://input"));
    $DB_HOST = $dbData->host;
    $DB_NAME = $dbData->name;
    $DB_USER = $dbData->user;
    $DB_PWD = $dbData->password;
}

try {

    // try to connect
    $db = new PDO(
        "mysql:dbname=$DB_NAME;host=$DB_HOST",
        $DB_USER,
        $DB_PWD
    );

    //response
    http_response_code(200); //OK
    echo json_encode(
        array(
            "message" => "Connection success.",
            "env" => $env
        )
    );
    
} catch(PDOException $exception) {
    http_response_code(500); //Internal Server Error
    echo json_encode(
        array(
            "message" => "Connection failed.",
            "error" => $exception->getMessage(),
        )
    );
}
?>
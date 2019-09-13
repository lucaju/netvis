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
 
$database = new Database();
$db = $database->getConnection();
 
$node = new Node($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if (!empty($data->name) && !empty($data->type)) {
 
    // set node property values
    $node->name = $data->name;
    $node->type = $data->type;

    if (isset($data->first)) $node->first = $data->first;
    if (isset($data->last)) $node->last = $data->last;
    if (isset($data->website)) $node->website = $data->website;

    $node->created_at = Utilities::getTimeNow();
    $node->modified_at = $node->created_at;
 
    // create the node
    $nodeCreation = $node->create();

    if ($nodeCreation['status'] == 'exist') {

         // set response code - 409 conflict
        http_response_code(409);
        echo json_encode(
            array("error" => "Data already exist on the database.")
        );
         return;

    } else if ($nodeCreation['status'] == 'created') {

        //add relation
        $relationAdded = array();
        if (count($data->relationToAdd) > 0) {
           
            foreach ($data->relationToAdd as $link) {

                $nodeLinkAdd = new Node($db);
                $nodeLinkAddID;

                //if it is a pair name and type -> get id
                if (is_object($link)) {
                    if (!empty($link->name) && !empty($link->type)) {
                        $nodeLinkAdd->name = $link->name;
                        $nodeLinkAdd->type = $link->type;
                        $nodeLinkAddID = $nodeLinkAdd->exist();
                        if (!$nodeLinkAddID) continue;
                    } else {
                        continue;
                    }
                } else if (is_numeric($link)) {
                    $nodeLinkAdd->id = $link;
                    $nodeLinkAddID = $nodeLinkAdd->exist();
                    if (!$nodeLinkAddID) continue;
                }

                if (empty($nodeLinkAddID) || !is_numeric($nodeLinkAddID)) continue;
                if (!$node->addLink($nodeLinkAddID)) continue;

                array_push($relationAdded, $nodeLinkAddID);
              
            }
        }

         //return with updated information
        $nodeCreated = array(
            "action" => "created",
            "id" => $node->id,
            "type" => $node->type,
            "name" => html_entity_decode($node->name),
        );

        if (isset($data->first)) $nodeCreated['first'] = html_entity_decode($node->first);
        if (isset($data->last)) $nodeCreated['last'] = html_entity_decode($node->last);
        if (isset($data->website)) $nodeCreated['website'] = html_entity_decode($node->website);
        if (count($data->relationToDelete) > 0) $nodeCreated['relationToDelete'] = $relationRemoved;
        if (count($data->relationToAdd) > 0) $nodeCreated['relationToAdd'] = $relationAdded;

        // set response code - 201 created
        http_response_code(201);
        echo json_encode($nodeCreated);

    } else {
         // set response code - 503 service unavailable
        http_response_code(503);
        echo json_encode(array("error" => "Unable to create node."));
    }

} else {
    // set response code - 400 bad request
    http_response_code(400);
    echo json_encode(
        array("error" => "Unable to create node. Data is incomplete.")
    );
}

?>
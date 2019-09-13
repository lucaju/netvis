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

// get id of node to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of node to be edited
if (!$data->id) {
    // set response code - 503 service unavailable
    http_response_code(503); 
    echo json_encode(array("message" => "Unable to update node."));
    return;
}
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare node object
$node = new Node($db);

// set node property values
$node->id = $data->id;
if (isset($data->name)) $node->name = $data->name;
if (isset($data->type)) $node->type = $data->type;
if (isset($data->first)) $node->first = $data->first;
if (isset($data->last)) $node->last = $data->last;
if (isset($data->website)) $node->website = $data->website;
$node->modified_at = Utilities::getTimeNow();
 
// update the node
if ($node->update()) {

   //delete relation
    $relationRemoved = array();
    if (count($data->relationToDelete) > 0) {
        foreach ($data->relationToDelete as $link) {
            if (!is_numeric($link)) continue;

            $nodeLinkRemove = new Node($db);
            $nodeLinkRemove->id = $link;

            $nodeLinkRemoveID = $nodeLinkRemove->exist();
            
            if (!$nodeLinkRemoveID) continue;
            if (!$node->removeLink($nodeLinkRemoveID)) continue;

            array_push($relationRemoved, $link);
        }
    }

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
    $nodeUpdated = array(
        "action" => "updated",
        "id" => $node->id
    );
    if (!empty($node->name)) $nodeUpdated['name'] = html_entity_decode($node->name);
    if (!empty($node->type)) $nodeUpdated['type'] = html_entity_decode($node->type);
    if (!empty($node->first)) $nodeUpdated['first'] = html_entity_decode($node->first);
    if (!empty($node->last)) $nodeUpdated['last'] = html_entity_decode($node->last);
    if (!empty($node->website)) $nodeUpdated['website'] = html_entity_decode($node->website);
    if (count($data->relationToDelete) > 0) $nodeUpdated['relationToDelete'] = $relationRemoved;
    if (count($data->relationToAdd) > 0) $nodeUpdated['relationToAdd'] = $relationAdded;

    // set response code - 200 ok
    http_response_code(200);  
    echo json_encode($nodeUpdated);

} else {
    // set response code - 503 service unavailable
    http_response_code(503); 
    echo json_encode(array("message" => "Unable to update node."));
}
?>
<?php
class ImportNodes
{
    
    private $_db;

    public $nodesAdded = 0;
    public $nodesUpdated = 0;
    public $nodeConnectionsAdded = 0;
    public $nodeConnectionsRefused = 0;
    public $importErros = 0;

    public function __construct($db)
    {
        $this->_db = $db;

        $this->nodesAdded = 0;
        $this->nodesUpdated = 0;
        $this->nodeConnectionsAdded = 0;
        $this->nodeConnectionsRefused = 0;
        $this->importErros = 0;
    }

    public function importData($dataCollection)
    {
        //loop through nodes
        foreach ($dataCollection as $dataNode) {

            //test for required fields
            if (!empty($dataNode->name) && !empty($dataNode->type)) {
                //node model

                $node = $this->newNode($dataNode);

                if (!$node) continue;

                //check if has relations
                if ($dataNode->edges) {
                    $this->processDataRelation($node, $dataNode->edges);
                }

            } else {
                $this->importErros++;
            }

        }
    }

    private function newNode($dataNode)
    {
        //initialize node model
        $node = new Node($this->_db);

        //set attributes
        $node->name = $dataNode->name;
        $node->type = $dataNode->type;

        if (isset($dataNode->first)) $node->first = $dataNode->first;
        if (isset($dataNode->last)) $node->last = $dataNode->last;
        if (isset($dataNode->website)) $node->website = $dataNode->website;

        $node->created_at = Utilities::getTimeNow();
        $node->modified_at = $node->created_at;

        //create new node
        $nodeCreation = $node->create();

        if (!$nodeCreation) {
            $this->importErros++;
            return false;

        } else if ($nodeCreation['status'] == 'created') {
        
            $this->nodesAdded++;
            return $node;

        } else if ($nodeCreation['status'] == 'exist') {
            //if it already exist, 
            $nodeUpdate = $node->update();
           
            if ($nodeUpdate['status'] == 'updated') {
                $this->nodesUpdated++;
                return $node;
            }

            return $node;

        }

        return false;

    }

    private function processDataRelation($source, $data)
    {
        global $total;
        
        //loop through relations
        foreach ($data as $dataNodeRel) {
            // test for required fields
            if (!empty($dataNodeRel->name) && !empty($dataNodeRel->type)) {

                $nodeRel = $this->nodeRelModel($dataNodeRel);
                if (!$nodeRel) continue;

                if ($source->addLink($nodeRel->id)) {
                    $this->nodeConnectionsAdded++;
                } else {
                    $this->nodeConnectionsRefused++;
                }

            } else {
                $this->importErros++;
            }
        }
    }

    private function nodeRelModel($dataNode)
    {
        //initialize node model
        $node = new Node($this->_db);

        //set attributes
        $node->name = $dataNode->name;
        $node->type = $dataNode->type;

        if (isset($dataNode->first)) $node->first = $dataNode->first;
        if (isset($dataNode->last)) $node->last = $dataNode->last;
        if (isset($dataNode->website)) $node->website = $dataNode->website;
        
        $node->created_at = Utilities::getTimeNow();
        $node->modified_at = $node->created_at;

        //create new node
        $nodeCreation = $node->create();

        if (!$nodeCreation) {
            $this->importErros++;
            return false;

        } else if ($nodeCreation['status'] == 'created') {
            $this->nodesAdded++;
            return $node;

        } else if ($nodeCreation['status'] == 'exist') {
            return $node;
        }

        return false;

    }
}
?>
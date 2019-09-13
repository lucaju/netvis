<?php
class ImportEdges
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

    function importData($dataCollection)
    {
        //loop through nodes
        foreach ($dataCollection as $dataNode) {

            //test if fields are not empty
            if (empty($dataNode->source)
                || empty($dataNode->sourceType)
                || empty($dataNode->target)
                || empty($dataNode->targetType)
            ) {
                $this->importErros++;
                continue;
            }

            //source node model
            $nodeSource = $this->newNode(
                $dataNode->source,
                $dataNode->sourceType
            );
            if (!$nodeSource) continue;


            //target node model
            $nodeTarget = $this->newNode(
                $dataNode->target,
                $dataNode->targetType
            );
            if (!$nodeTarget) continue;

            //male connection
            if ($nodeSource->addLink($nodeTarget->id)) {
                $this->nodeConnectionsAdded++;
            } else {
                $this->nodeConnectionsRefused++;
            }

        }
    }

    private function newNode($name, $type)
    {
        //initialize node model
        $node = new Node($this->_db);

        //set attributes
        $node->name = $name;
        $node->type = $type;

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
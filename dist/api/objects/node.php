<?php
class Node
{
    // database connection and table name
    private $_conn;
    private $_table_name = "nodes";
    private $_table_relation_name = "edges";
 
    // object properties
    public $id;
    public $name;
    public $type;
    public $first;
    public $last;
    public $website;
    public $created_at;
    public $modified_at;
 
    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->_conn = $db;
    }

    // read nodes
    function read()
    {
        $query = "SELECT n.id, n.name, n.type, n.modified_at
            FROM $this->_table_name n";

        $stmt = $this->_conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }

    function readOne()
    {
        $query = "SELECT * 
            FROM $this->_table_name n
            WHERE n.id = :id
            LIMIT 0,1";
        
        $stmt = $this->_conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
    
        if ($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
            $this->name = $row['name'];
            $this->type = $row['type'];

            $this->first = $row['first'];
            $this->last = $row['last'];
            $this->website = $row['website'];
            $this->created_at = $row['created_at'];
            $this->modified_at = $row['modified_at'];

            
            //get relations
            $relations = $this->readCluster();
            if ($relations) {
                $this->relations = $relations;
            }

            return $this;
        }
        
        return false;
    }

    private function readCluster()
    {
        $query = "SELECT n.id, n.name, n.type
            FROM $this->_table_name n,
                $this->_table_relation_name e
            WHERE (e.source = ? AND e.target = n.id)
            OR (e.target = ? AND e.source = n.id)";
    
        $stmt = $this->_conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->bindParam(2, $this->id);

        $stmt->execute();

        if ($stmt->rowCount() > 0) {
 
            $cluster = array();
        
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        
                // extract row
                // this will make $row['name'] to
                // just $name only
                extract($row);
         
                $node = array(
                    "id" => $id,
                    "name" => html_entity_decode($name),
                    "type" => $type
                );
        
                array_push($cluster, $node);
            }

            return $cluster;
        }

        return false;
       
    }

    function create()
    {
        //check if it alreary exist
        $exist = $this->exist();
       
        if ($exist) {
            $this->id = $exist;
            $duplicatedNode = array(
                "status" => "exist",
                "id" => $this->id
            );
            return $duplicatedNode;
        }
    
        // query to insert record
        $query = "INSERT INTO $this->_table_name
            SET
                name = :name,
                type = :type,
                first = :first,
                last = :last,
                website = :website,
                created_at = :created_at,
                modified_at = :modified_at";
    
        // prepare query
        $stmt = $this->_conn->prepare($query);

        // sanitize
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->type = htmlspecialchars(strip_tags($this->type));
        $this->first = htmlspecialchars(strip_tags($this->first));
        $this->last = htmlspecialchars(strip_tags($this->last));
        $this->website = htmlspecialchars(strip_tags($this->website));
        $this->created_at = htmlspecialchars(strip_tags($this->created_at));
        $this->modified_at = htmlspecialchars(strip_tags($this->modified_at));
    
        // bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":type", $this->type);
        $stmt->bindParam(":first", $this->first);
        $stmt->bindParam(":last", $this->last);
        $stmt->bindParam(":website", $this->website);
        $stmt->bindParam(":created_at", $this->created_at);
        $stmt->bindParam(":modified_at", $this->modified_at);
    
        // execute query
        if ($stmt->execute()) {
            $this->id = $this->_conn->lastInsertId();
            $nodeCreated = array(
                "status" => "created",
                "id" => $this->id
            );
            return $nodeCreated;
        }
    
        return false;
    }

    function exist()
    {
        
        $query = "SELECT id, name, type FROM $this->_table_name";
        if (!empty($this->id)) {
            $query .= " WHERE id = :id";
        } else {
            $query .= " WHERE name = :name AND type = :type";
        }
        $query .= " LIMIT 0,1";
        
        $stmt = $this->_conn->prepare($query);

       

        if (!empty($this->id)) {
            $stmt->bindParam(":id", $this->id);
        } else {
            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":type", $this->type);
        }

        
        
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            return $row['id'];
        }
        
        return false;
    }

    function update()
    {
        $query = "UPDATE $this->_table_name SET ";

        if (isset($this->name)) $query .= "name = :name, ";
        if (isset($this->type)) $query .= "type = :type, ";
        if (isset($this->first)) $query .= "first = :first, ";
        if (isset($this->last)) $query .= "last = :last, ";
        if (isset($this->website)) $query .= "website = :website, ";

        $query .= "modified_at = :modified_at";
        $query .= " WHERE id = :id";
        $query .= " LIMIT 1";
    
        // prepare query statement
        $stmt = $this->_conn->prepare($query);
        
        // sanitize
        if (isset($this->name)) $this->name = htmlspecialchars(strip_tags($this->name));
        if (isset($this->type)) $this->type = htmlspecialchars(strip_tags($this->type));
        if (isset($this->first)) $this->first = htmlspecialchars(strip_tags($this->first));
        if (isset($this->last)) $this->last = htmlspecialchars(strip_tags($this->last));
        if (isset($this->website)) $this->website = htmlspecialchars(strip_tags($this->website));
        if (isset($this->modified_at)) $this->modified_at = htmlspecialchars(strip_tags($this->modified_at));
        
        //bind
        $stmt->bindParam(':id', $this->id);
        if (isset($this->name)) $stmt->bindParam(':name', $this->name);
        if (isset($this->type)) $stmt->bindParam(':type', $this->type);
        if (isset($this->first)) $stmt->bindParam(':first', $this->first);
        if (isset($this->last)) $stmt->bindParam(':last', $this->last);
        if (isset($this->website)) $stmt->bindParam(':website', $this->website);
        if (isset($this->modified_at)) $stmt->bindParam(':modified_at', $this->modified_at);

        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            $nodeUpdated = array(
                "status" => "updated",
                "id" => $this->id
            );
            return $nodeUpdated;
        }

        return false;
    }

    function delete()
    {
        //0. check if it alreary exist
        $exist = $this->exist();
        if (!$exist) return false;


        //1. delete relations
        $queryRel ="DELETE FROM $this->_table_relation_name
            WHERE source = :id
            OR target = :id";

        $stmtRel = $this->_conn->prepare($queryRel);
        $stmtRel->bindParam(':id', $this->id);

        $stmtRel->execute();


        // 2. delete node
        $query = "DELETE FROM $this->_table_name
            WHERE id = :id";
    
        $stmt = $this->_conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
    
        $stmt->execute();
        if ($stmt->rowCount() > 0); return true;

        return false;
    }

    function addLink($linkID)
    {
        if ($this->linkExists($linkID)) return false;

        $query = "INSERT INTO $this->_table_relation_name
            SET
                source = :sourceID,
                target = :targetID,
                created_at = :created_at";

        $stmt = $this->_conn->prepare($query);
        $stmt->bindParam(":sourceID", $this->id);
        $stmt->bindParam(":targetID", $linkID);
        $stmt->bindParam(":created_at", $this->modified_at);

        if ($stmt->execute()) {
            return $this->_conn->lastInsertId();
        }

        return false;
    }

    function removeLink($linkID)
    {   
        if (!$this->linkExists($linkID)) return false;

        $query = "DELETE FROM $this->_table_relation_name
            WHERE (source = :sourceID AND target = :targetID)
            OR (source = :targetID AND target = :sourceID)";

        $stmt = $this->_conn->prepare($query);
        $stmt->bindParam(":sourceID", $this->id);
        $stmt->bindParam(":targetID", $linkID);

        $stmt->execute();
        if ($stmt->rowCount() > 0); return true;

        return false;
    }

    function linkExists($targetID)
    {
        $query = "SELECT * FROM $this->_table_relation_name
            WHERE (source = :sourceID AND target = :targetID)
            OR (source = :targetID AND target = :sourceID)
            LIMIT 0,1";

        $stmt = $this->_conn->prepare($query);
        $stmt->bindParam(":sourceID", $this->id);
        $stmt->bindParam(":targetID", $targetID);
        
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            return $row['id'];
        }
    
        return false;
    }
}
?>
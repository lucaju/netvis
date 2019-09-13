<?php
class Meta
{
 
    // database connection and table name
    private $_conn;
    private $_table = "meta";
 
    // object properties
    public $title;
    public $url;
    public $email;
    public $sendgridAPI;
 
    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->_conn = $db;
    }

    // read users
    function read()
    {

        // select all query
        $query = "SELECT * FROM $this->_table
            WHERE `attribute` LIKE '%project_%'";

        // prepare query statement
        $stmt = $this->_conn->prepare($query);
       
        // execute query
        $stmt->execute();

        $project = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $field = str_replace("project_", "", $attribute);
            $project[$field] = $value;
        }
    
        return array(
            'project' => $project
        );
    }

    function getSendgrid()
    {

        // select all query
        $query = "SELECT * FROM $this->_table
            WHERE `attribute` = 'sendgrid_api'";

        // prepare query statement
        $stmt = $this->_conn->prepare($query);
       
        // execute query
        $stmt->execute();

        $sendgrid = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $sendgrid['sendgridAPI'] = $value;
        }
    
        return $sendgrid;
    }

    function update($attr, $value)
    {
       
        $query = "UPDATE $this->_table SET value = :val WHERE attribute = :attr";
        
        // // prepare query statement
        $stmt = $this->_conn->prepare($query);
        
        // // transform, sanitize and bind
        if ($attr === 'title') {
            $attr = "project_title";
            $value = htmlspecialchars(strip_tags($value));
        }
        if ($attr === 'sendgridAPI') $attr = "sendgrid_api";

        //bind
        $stmt->bindParam(':attr', $attr);
        $stmt->bindParam(':val', $value);
        
        //execute
        $stmt->execute();

        //test
        if ($stmt->rowCount() > 0) {
            $metaUpdated = array("status" => "updated");
        } else {
            $metaUpdated = array("status" => "nochange");
        }

        return $metaUpdated ;
    }
}
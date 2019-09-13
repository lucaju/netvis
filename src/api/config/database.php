<?php
class Database
{
    // specify your own database credentials
    private $_host;
    private $_db_name;
    private $_username;
    private $_password;

    public $conn;
 
    // get the database connection
    public function getConnection()
    {

        $this->_host = getenv('DATABASE_HOST');
        $this->_db_name = getenv('DATABASE_NAME');
        $this->_username = getenv('DATABASE_USERNAME');
        $this->_password = getenv('DATABASE_PASSWORD');
 
        $this->conn = null;
 
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->_host . ";
                dbname=" . $this->_db_name,
                $this->_username,
                $this->_password
            );

            $this->conn->exec("set names utf8");
            
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>
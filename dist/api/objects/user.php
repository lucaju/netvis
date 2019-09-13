<?php
class User
{
 
    // database connection and table name
    private $_conn;
    private $_table = "users";
    private $_table_password_request = "password_request";
 
    // object properties
    public $id;
    public $level;
    public $email;
    public $password;
    public $first;
    public $last;
    public $created_at;
    public $modified_at;
 
    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->_conn = $db;
    }

    // read users
    function read()
    {

        // select all query
        $query = "SELECT
            u.id,
            u.level,
            u.email,
            u.first,
            u.last
            FROM {$this->_table} u 
            ORDER BY first";

        // prepare query statement
        $stmt = $this->_conn->prepare($query);
       
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // create user
    function create()
    {

        //ENV
        // include_once '../vendor/autoload.php';
        // $dotenv = Dotenv\Dotenv::create("../../");
        // $dotenv->load();

        $SALT = getenv('SALT');

        // query to insert record
        $query = "INSERT INTO $this->_table
            SET
                level = :level,
                email = :email,
                password = AES_ENCRYPT(:password, SHA1(:salt)),
                first = :first,
                last = :last,
                created_at = :created_at,
                modified_at = :modified_at";
    
        // prepare query
        $stmt = $this->_conn->prepare($query);

        // sanitize
        $this->level = $this->level;
        $this->email = $this->email;
        $this->password = $this->password;
        $this->first = htmlspecialchars(strip_tags($this->first));
        $this->last = htmlspecialchars(strip_tags($this->last));
        $this->created_at = $this->created_at;
        $this->modified_at = $this->modified_at;
    
        // bind values
        $stmt->bindParam(":level", $this->level);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":salt", $SALT);
        $stmt->bindParam(":first", $this->first);
        $stmt->bindParam(":last", $this->last);
        $stmt->bindParam(":created_at", $this->created_at);
        $stmt->bindParam(":modified_at", $this->modified_at);
    
        // execute query
        if ($stmt->execute()) {
            $this->id = $this->_conn->lastInsertId();
            return true;
        }
    
        return false;
        
    }

    // update the product
    function update()
    {
 
        $SALT = getenv('SALT');

        // update query
        $query = "UPDATE {$this->_table} SET ";

        if (isset($this->level)) $query .= "level = :level, ";
        if (isset($this->email)) $query .= "email = :email, ";
        if (isset($this->password)) $query .= "password = AES_ENCRYPT(:password, SHA1(:salt)), ";
        if (isset($this->first)) $query .= "first = :first, ";
        if (isset($this->last)) $query .= "last = :last, ";

        $query .= "modified_at = :modified_at";
        $query .= " WHERE id = :id";
    
        // prepare query statement
        $stmt = $this->_conn->prepare($query);

        // bind new values
        if (isset($this->id)) $stmt->bindParam(':id', $this->id);
        if (isset($this->level)) $stmt->bindParam(':level', $this->level);
        if (isset($this->email)) $stmt->bindParam(':email', $this->email);
        if (isset($this->password)) {
            $stmt->bindParam(':password', $this->password);
            $stmt->bindParam(':salt', $SALT);
        }
        if (isset($this->first)) {
            $this->first = htmlspecialchars(strip_tags($this->first));
            $stmt->bindParam(':first', $this->first);
        }
        if (isset($this->last)) {
            $stmt->bindParam(':last', $this->last);
            $this->last = htmlspecialchars(strip_tags($this->last));
        }
        if (isset($this->modified_at)) $stmt->bindParam(':modified_at', $this->modified_at);
        
        // execute the query
        if ($stmt->execute()) return true;
        return false;
    }

    // delete the product
    function delete()
    {
    
        // delete query
        $query = "DELETE FROM {$this->_table}
            WHERE id = ?";
    
        // prepare query
        $stmt = $this->_conn->prepare($query);
    
        // bind id of record to delete
        $stmt->bindParam(1, $this->id);
    
        // execute query
        if ($stmt->execute()) return true;
    
        return false;
        
    }

    //login
    function login()
    {

        //ENV
        // include_once '../vendor/autoload.php';
        // $dotenv = Dotenv\Dotenv::create("../../");
        // $dotenv->load();

        $SALT = getenv('SALT');

        // select all query
        $query = "SELECT
            id,
            level,
            email,
            AES_DECRYPT(password, SHA1(:salt)),
            first,
            last
            FROM $this->_table
            WHERE email = :email 
            LIMIT 1";

        // prepare query statement
        $stmt = $this->_conn->prepare($query);

        $stmt->bindParam(":salt", $SALT);
        $stmt->bindParam(':email', $this->email);
       
        // execute query
        $stmt->execute();
        
        if ($stmt->rowCount() == 0) {
            return "Email Invalid!";
        }
        
        // get retrieved row
        $userData = $stmt->fetch(PDO::FETCH_ASSOC);

        //test password
        $cryptPass = $userData["AES_DECRYPT(password, SHA1('$SALT'))"];
        if ($this->password !== $cryptPass) {
            return "Password Invalid!";
        }
    
        // set values to object properties
        $this->id = $userData['id'];
        $this->level = $userData['level'];
        $this->email = $userData['email'];
        $this->first = $userData['first'];
        $this->last = $userData['last'];

        return 'accepted';
        
    }


    function recoverPassword()
    {

        include_once '../shared/utilities.php';

        // select query
        $query = "SELECT id, email, first, last
            FROM {$this->_table}
            WHERE email = :email 
            LIMIT 1";

        // prepare query statement
        $stmt = $this->_conn->prepare($query);

        $stmt->bindParam(':email', $this->email);
       
        // execute query
        $stmt->execute();
        
        if ($stmt->rowCount() == 0) {
            return "invalid";
        }
        
        // get retrieved row
        $userData = $stmt->fetch(PDO::FETCH_ASSOC);

        // set values to object properties
        $this->id = $userData['id'];
        $this->email = $userData['email'];
        $this->first = $userData['first'];
        $this->last = $userData['last'];


         //open a password reset request
         $query_request = "INSERT INTO {$this->_table_password_request}
            SET
                userID = :id,
                created_at = :created_at";

         // prepare query
        $stmt_request = $this->_conn->prepare($query_request);

        $stmt_request->bindParam(":id", $this->id);
        $stmt_request->bindParam(":created_at", Utilities::getTimeNow());

        if (!$stmt_request->execute()) {
            return false;
        }

        // get retrieved row
        $requestData = $stmt->fetch(PDO::FETCH_ASSOC);
        $requestID = $this->_conn->lastInsertId();

        // $emailComposer = new EmailComposer();
        // emailComposer.resetPassword();
        // if (emailComposer.send()) return true;

        return $requestID;
        
    }

    function requestPaswordReset($requestID)
    {

        $expireLimite = 30; //days
        
        // select query
        $query = "SELECT reqID, userID, created_at, used
        FROM {$this->_table_password_request}
        WHERE reqID = :reqID 
        LIMIT 1";

        // prepare query statement
        $stmt = $this->_conn->prepare($query);

        $stmt->bindParam(':reqID', $requestID);

        // execute query
        $stmt->execute();

        if ($stmt->rowCount() === 0) {
            return "invalid";
        }

        $requestData = $stmt->fetch(PDO::FETCH_ASSOC);

        //check if the request was used already
        if ($requestData['used'] == true) {
            return "expired";
        }
    
        //compare dates: check if limit is past
        $created_at = $requestData['created_at'];

        $limitDate = new DateTime($created_at);
        $limitDate->add(new DateInterval("P{$expireLimite}D")); // 5 days

        $now = new DateTime();

        //check the diference
        $interval = $now->diff($limitDate);

        if ($interval->format('%R%a') <= 0) {
            return "expired";
        }

        // set values to object properties
        $request_arr = array(
            "userID" => $requestData['userID']
        );
        
        return $request_arr;

    }


    function resetPassword()
    {   
        //ENV
        // include_once '../vendor/autoload.php';
        // $dotenv = Dotenv\Dotenv::create("../../");
        // $dotenv->load();

        $SALT = getenv('SALT');

        // update query
        $query = "UPDATE {$this->_table}
            SET 
                password = AES_ENCRYPT(:password, SHA1(:salt)),
                modified_at = :modified_at
            WHERE id = :id";
    
        // prepare query statement
        $stmt = $this->_conn->prepare($query);

        if (isset($this->id)) $stmt->bindParam(':id', $this->id);
        if (isset($this->password)) $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':salt', $SALT);
        if (isset($this->modified_at)) $stmt->bindParam(':modified_at', $this->modified_at);

        $stmt->execute();

        if ($stmt->rowCount() === 0) return false;

        //mark request as expired
        $query_request = "UPDATE {$this->_table_password_request}
            SET used = 'true'
            WHERE userID = :id";

        $stmt_request = $this->_conn->prepare($query_request);
        $stmt_request->bindParam(':id', $this->id);
        $stmt_request->execute();

        return true;
    }
}
?>
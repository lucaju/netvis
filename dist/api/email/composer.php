<?php

class Composer
{

    // object properties
    private $_projectTitle;
    private $_projectURL;
    private $_projectEmail;
    private $_sendGrid;

    public function __construct()
    {
        $this->getMetadata();
    }

    private function getMetadata()
    {
        include_once '../../vendor/autoload.php';
        $dotenv = Dotenv\Dotenv::create("../../");
        $dotenv->load();

        // require database and object files
        include_once '../config/database.php';
        include_once '../objects/meta.php';

        $database = new Database();
        $db = $database->getConnection();

        $meta = new Meta($db);
        $metaInfo = $meta->read();

        $this->sendGrid = $meta->getSendgrid();

        $this->_projectTitle = $metaInfo['project']["title"];
        $this->_projectURL = $metaInfo['project']["url"];
        $this->_projectEmail = $metaInfo['project']["email"];
    }

    public function sendInvitation($requestID, $name, $email)
    {   
        $subject = "Invitation to $this->_projectTitle";
        $message = $this->composeInvitation($requestID, $name, $email);
        $this->sendEmail($email, $name, $subject, $message);
        
    }

    public function sendRecovery($requestID, $name, $email)
    {
        $subject = "Password Reset - $this->_projectTitle";
        $message = $this->composeRecovery($requestID, $name);

        $this->sendEmail($email, $name, $subject, $message);
    }

    private function sendEmail($userEmail, $name, $subject, $message)
    {

        $SENDGRID_API = $this->sendGrid["sendgridAPI"];
        
        $email = new \SendGrid\Mail\Mail();
        
        $email->setFrom($this->_projectEmail, $this->_projectTitle);
        $email->setSubject($subject);
        $email->addTo($userEmail, $name);
        // $email->addContent("text/plain", "and easy to do anywhere, even with PHP");
        $email->addContent(
            "text/html", $message
        );
        $sendgrid = new \SendGrid($SENDGRID_API);
        
        try {
            $o = $response = $sendgrid->send($email);
            // print $response->statusCode() . "\n";
            // print_r($response->headers());
            // print $response->body() . "\n";
            return true;
        } catch (Exception $e) {
            // echo 'Caught exception: '. $e->getMessage() ."\n";
            return false;
        }
    }

    private function composeInvitation($requestID, $name, $email)
    {

        $compose = "
        <!doctype html>
        <html lang='en'>
        <head>
        <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <meta name='format-detection' content='telephone=no'>
        </head>

        <body style='margin:0;
                    padding:0;
                    font-family:Helvetica, Arial, sans-serif;
                    font-size:14px;
                    font-weight:400;
                    color:#374550;
                    text-align:left;'
            bgcolor='#F0F0F0'
            leftmargin='0'
            topmargin='0'
            marginwidth='0'
            marginheight='0'>

        <table border='0'
            width='100%'
            height='100%'
            cellpadding='0'
            cellspacing='0'>
        <tr>
            <td align='center'
                valign='top'>

            <br>
            
            <table border='0'
                    width='600'
                    cellpadding='0'
                    cellspacing='0'
                    class='container'
                    style='width:600px;
                            max-width:600px'>

                <tr>
                    <td align='left'
                        style='padding-left:24px;'>
                    <p style='text-align:left;
                                font-weight:400;
                                font-size:20px;
                                color:#666666'>$this->_projectTitle</p>
                    </td>
                </tr>

                <tr>
                <td align='left'
                    style='padding-left:24px;
                            padding-right:24px;
                            padding-top:12px;
                            padding-bottom:12px;
                            background-color:#ffffff;
                            border: 1px solid #e3e3e3; '>
                    
                    <p class='title'
                    style='font-size:18px;
                            font-weight:600;
                            color:#374550'>Hello $name.</p>

                    
                    <p style='font-family:Helvetica, Arial, sans-serif;
                                font-size:14px;
                                line-height:20px;
                                text-align:left;
                                color:#333333;
                                line-height:22px;'>You have been invited to <b>$this->_projectTitle</b>. Use your email ($email) to sign in.</p><br>

                    <table border='0'
                            width='180'
                            cellpadding='0'
                            cellspacing='0'
                            style='width:180px;
                                    max-width:180px;
                                    background-color:#EF6C00;
                                    color:#ffffff'>
                        <tr>
                        <td align='left'
                            style='padding-left:24px;
                                    padding-right:24px;
                                    padding-top:12px;
                                    padding-bottom:12px;'>
                            <a href='$this->_projectURL/reset/reset-password.php?action=create&requestID=$requestID'
                            target='_blank'
                            style='color:#ffffff;
                            text-decoration: none;'>Click here to access</a>
                        </td>
                        </tr>

                    </table>

                    <br>

                </td>
                </tr>

                <tr>
                <td align='left'
                    style='padding-left:24px;
                            padding-right:24px;
                            padding-top:12px;
                            padding-bottom:12px;
                            color:#666666;'>
                    <p style='text-align:left;
                            font-size:12px;
                            font-weight:400;
                            line-height:18px;'>
                        <strong>$this->_projectTitle</strong></br>
                        <a href='http://$this->_projectURL' style='color:#555555;'>$this->_projectURL</a>
                    </p>
                </td>
                </tr>

            </table>
            
            <br><br>

            </td>
        </tr>
        </table>

        </body>
        </html>";

        return $compose;
    }

    private function composeRecovery($requestID,$name)
    {

        $compose = "
        <!doctype html>
        <html lang='en'>
        <head>
        <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <meta name='format-detection' content='telephone=no'>
        </head>

        <body style='margin:0;
                    padding:0;
                    font-family:Helvetica, Arial, sans-serif;
                    font-size:14px;
                    font-weight:400;
                    color:#374550;
                    text-align:left;'
            bgcolor='#F0F0F0'
            leftmargin='0'
            topmargin='0'
            marginwidth='0'
            marginheight='0'>

        <table border='0'
            width='100%'
            height='100%'
            cellpadding='0'
            cellspacing='0'>
        <tr>
            <td align='center'
                valign='top'>

            <br>
            
            <table border='0'
                    width='600'
                    cellpadding='0'
                    cellspacing='0'
                    class='container'
                    style='width:600px;
                            max-width:600px'>

                <tr>
                    <td align='left'
                        style='padding-left:24px;'>
                    <p style='text-align:left;
                                font-weight:400;
                                font-size:20px;
                                color:#666666'>$this->_projectTitle</p>
                    </td>
                </tr>

                <tr>
                <td align='left'
                    style='padding-left:24px;
                            padding-right:24px;
                            padding-top:12px;
                            padding-bottom:12px;
                            background-color:#ffffff;
                            border: 1px solid #e3e3e3; '>
                    
                    <p class='title'
                    style='font-size:18px;
                            font-weight:600;
                            color:#374550'>Hello $name.</p>

                    <p style='font-family:Helvetica, Arial, sans-serif;
                                font-size:14px;
                                line-height:20px;
                                text-align:left;
                                color:#333333;
                                line-height:22px;'>We've received a request to recover your password to access <b>$this->_projectTitle</b>.
                                If you didn't make the request, just ignore this email. Otherwise you can reset your password using this link:</p><br>

                    <table border='0'
                            width='260'
                            cellpadding='0'
                            cellspacing='0'
                            style='width:260px;
                                    max-width:260px;
                                    background-color:#EF6C00;
                                    color:#ffffff'>
                        <tr>
                        <td align='left'
                            style='padding-left:24px;
                                    padding-right:24px;
                                    padding-top:12px;
                                    padding-bottom:12px;'>
                            <a href='$this->_projectURL/reset/reset-password.php?action=reset&requestID=$requestID'
                            target='_blank'
                            style='color:#ffffff;
                            text-decoration: none;'>Click here to reset your password</a>
                        </td>
                        </tr>

                    </table>

                    <br>

                </td>
                </tr>

                <tr>
                <td align='left'
                    style='padding-left:24px;
                            padding-right:24px;
                            padding-top:12px;
                            padding-bottom:12px;
                            color:#666666;'>
                    <p style='text-align:left;
                            font-size:12px;
                            font-weight:400;
                            line-height:18px;'>
                        <strong>$this->_projectTitle</strong></br>
                        <a href='http://$this->_projectURL' style='color:#555555;'>$this->_projectURL</a>
                    </p>
                </td>
                </tr>

            </table>
            
            <br><br>

            </td>
        </tr>
        </table>

        </body>
        </html>";

        return $compose;
    }
}

?>
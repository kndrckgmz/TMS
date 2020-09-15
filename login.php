<?php
    $user=$_POST['user'];
    $pass=$_POST['pass'];
    if(!empty($user)){
        $host="eu-cdbr-west-03.cleardb.net";
        $username="b92d8970ef082a"; 
        $password="6f135d2ec9692e9";
        $dbname="heroku_c9abff63969fc23";

        $conn= new mysqli($host, $username, $password, $dbname);

        if(mysqli_connect_error()){
            die('Connection Error('. mysqli_connect_error().')');
        }else{
            $stmt=$conn->prepare("select * from login where username = ?");
            $stmt->bind_param("s", $user);
            $stmt->execute();
            $stmt_result=$stmt->get_result();
            if($stmt_result->num_rows > 0){
                $data=$stmt_result->fetch_assoc();
                if($data['password']===$pass){
                    include_once ("homepage.html");
                }else{
                    include_once ("login2.html");
                    $conn->close();
                }
            }else{
                include_once ("login2.html");
                $conn->close();
            }     
        }

    }else{
        die();
    }
?>
<?php
    $email=$_POST['mail'];

    if(!empty($email)){
        $host="eu-cdbr-west-03.cleardb.net";
        $username="b92d8970ef082a"; 
        $password="6f135d2ec9692e9";
        $dbname="heroku_c9abff63969fc23";

        $conn= new mysqli($host, $username, $password, $dbname);

        if(mysqli_connect_error()){
            die('Connection Error('. mysqli_connect_error().')'. mysqli_connect_error());
        }else{
            $insert="insert into emailtab (email) values (?)";

            $stmt=$conn->prepare($insert);
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $conn->close();
            include_once ("emailsubmit.html");
        }

    }else{
        die();
    }
?>
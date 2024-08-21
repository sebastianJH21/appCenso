<?php 
$server = "localhost";
$user = "root";
$passWord = "2108";
$nameDB = "appcenso";
$dataBase = mysqli_connect($server,$user,$passWord,$nameDB);
if(!$dataBase){
    echo("Error connection at data base");
    exit;
}
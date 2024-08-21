<?php 
if($_SERVER['REQUEST_METHOD'] === 'POST'){
        switch ($_POST['function']) {
            case 1:
                $dni = $_POST['dni'];
                $name = $_POST['name'];
                $dateBirth = $_POST['dateBirth'];
                $address = $_POST['address'];
                $phone = $_POST['phone'];
                $date = $_POST['date'];
                $time = $_POST['time'];
                $columnsPeople = 'dni,name,dateBirth,address,phone';
                $valuesPeople = "'$dni','$name','$dateBirth','$address','$phone'";
                $columnsAppo = 'dateAppo,timeAppo,dni';
                $valuesAppo = "'$date','$time','$dni'";
                $savePeople = saveInformation("people",$columnsPeople,$valuesPeople);
                $saveAppo = saveInformation("appointments",$columnsAppo,$valuesAppo);
                $answer = $saveAppo && $savePeople ? true : false;
                convertToJson($answer);
                break;
            case 2:
                $dni = $_POST['dni'];
                $name = $_POST['name'];
                $dateBirth = $_POST['dateBirth'];
                $address = $_POST['address'];
                $phone = $_POST['phone'];
                $date = $_POST['date'];
                $time = $_POST['time'];
                $columValuesPeople = "dni='$dni',name='$name',dateBirth='$dateBirth',address='$address',phone='$phone'";
                $columValuesAppo = "dateAppo='$date',timeAppo='$time',dni='$dni'";
                $savePeople = editInformation("people",$columValuesPeople,$dni);
                $saveAppo = editInformation("appointments",$columValuesAppo,$dni);
                $answer = $saveAppo && $savePeople ? true : false;
                convertToJson($answer);
                break;
            case 3:
                $dni = $_POST['dni'];
                $deleteAppo = deleteInformation("appointments",$dni);
                $deletePeople = deleteInformation("people",$dni);
                $answer = $deletePeople && $deleteAppo ? true : false;
                convertToJson($answer);
                break;
            case 4:
                $filter =$_POST["filter"];
                $textFilter = $_POST["textFilter"];
                $search = searchInformation($filter,$textFilter);
                convertToJson($search);
                break;
            case 5:
                $date = $_POST['date'];
                $time = $_POST['time'];
                $find = findHours($date,$time);
                convertToJson($find);
                break;
        }
    
}
function connection(){
    $dataBase = 'dataBase.php';
    return $dataBase;
}
function convertToJson($js){
    $json = json_encode($js);
    echo $json;
}
function saveInformation($table,$columns,$values){
    try {
        require connection();
        $sql = "INSERT INTO $table ($columns) VALUES ($values);";
        $query = mysqli_query($dataBase,$sql);
        $answer = $query ? true : false;
        return $answer;
    } catch (\Throwable $th) {
        echo "<pre>";
        var_dump($th);
        echo "</pre>";
    }
}
function editInformation($table,$colmValues,$dni){
    try {
        require connection();
        $sql = "UPDATE $table SET $colmValues WHERE dni = $dni;";
        $query = mysqli_query($dataBase,$sql);
        $answer = $query ? true : false;
        return $answer;
    } catch (\Throwable $th) {
        echo "<pre>";
        var_dump($th);
        echo "</pre>";
    }
}
function deleteInformation($table,$dni){
    try {
        require connection();
        $sql = "DELETE FROM $table WHERE dni = '$dni'";
        $query = mysqli_query($dataBase,$sql);
        $answer = $query ? true : false;
        return $answer;
    } catch (\Throwable $th) {
        echo "<pre>";
        var_dump($th);
        echo "</pre>";
    }
}
function searchInformation($filter,$textFilter){
    try {
        require connection();
        $sql = "SELECT * FROM people
            INNER JOIN appointments ON people.dni = appointments.dni
            WHERE people.$filter LIKE '%$textFilter%';";
        $query = mysqli_query($dataBase,$sql);
        if($query -> num_rows > 0){
            $rows[] = true;
            while($row = mysqli_fetch_assoc($query)){
                $rows [] = $row;
            }
        }else{
            $rows[] = false;
        }
        return $rows;
    } catch (\Throwable $th) {
        echo "<pre>";
        var_dump($th);
        echo "</pre>";
    }
}
function findHours($date,$hour){
    try {
        require connection();
        $sql = "SELECT timeAppo FROM appointments WHERE dateAppo = '$date' AND timeAppo = '$hour';";
        $query = mysqli_query($dataBase,$sql);
        $answer = $query -> num_rows > 0 ? true : false;
        return $answer;
    } catch (\Throwable $th) {
        echo "<pre>";
        var_dump($th);
        echo "</pre>";
    }
}



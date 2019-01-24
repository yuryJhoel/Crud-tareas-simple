<?php
    require("models/Crud.php");
    $todo = $_POST['todo'];
    $crudGetId = new Crud();
    $getId = $crudGetId->getId($todo);
    echo $getId;
?>
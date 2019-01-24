<?php
require("models/Crud.php");
$todoUI = $_POST['todo'];
$descriptionUI = $_POST['description'];

$crudCreate = new Crud();
$crudCreate->create($todoUI, $descriptionUI, false);
?>
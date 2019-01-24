<?php
require('models/Crud.php');
$todo = $_POST['todo'];
$description = $_POST['description'];
$action =$_POST['action'];
$id = $_POST['id'];
$update = new Crud();
$update->updatei($todo, $description, $action, $id);
?>
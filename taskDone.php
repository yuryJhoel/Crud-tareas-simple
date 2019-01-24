<?php
require('models/Crud.php');
$id = $_POST['id'];
$crudTaskDone = new Crud();
$crudTaskDone->taskDone($id);
echo "Tarea realizada";


?>
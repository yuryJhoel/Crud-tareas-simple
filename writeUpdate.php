<?php
require('models/Crud.php');
$id = $_POST['id'];
$crudWriteUpdate = new Crud();
$data = $crudWriteUpdate->crudWriteUpdate($id);
$dataString = json_encode($data);
echo $dataString;
?>
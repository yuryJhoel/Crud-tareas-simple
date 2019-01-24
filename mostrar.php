<?php
require('models/Crud.php');
$crudShow = new Crud();
$data = $crudShow->read();
$dataString = json_encode($data);
echo $dataString;
?>
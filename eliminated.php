<?php
require("models/Crud.php");
$id = $_POST['id'];
$crudDeleted = new Crud();
$crudDeleted->delete($id);
echo "Se elimino correctamente";
?>
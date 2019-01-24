<?php
    class Crud {
        // private $todoUI;
        // private $descriptionUI;
        function __construct(){

        }
        function connect(){
            $connectDB = new mysqli("localhost","root","","crudsimple");
            if(mysqli_connect_error()){
                printf("Error al conectarse a la base de datos %s\n" , mysqli_connect_error());
                exit();
            }
            return $connectDB;
        }
        function create($todo, $description, $action=false){
            if(!empty($todo) and !empty($description)) {
                $connectDB = $this->connect();
                $connectDB->query("INSERT INTO todos(todo, description, action) VALUES('$todo', '$description', '$action')");
            }
        }
        function read(){
            $connectDB = $this->connect();
            $data = array();
            $results = $connectDB->query("SELECT * FROM todos");
            $data = array();
            while($row = $results->fetch_row()){
                $data[] = $row;
            }
            return $data;
        }
        function crudWriteUpdate($id){
            $connectDB = $this->connect();
            $data = array();
            $data = $connectDB->query("SELECT * FROM todos WHERE id = $id");
            $row = $data->fetch_array();
            return $row;
        }
        function updatei($todo, $description,$action, $id){
            $connectDB = $this->connect();
            $connectDB->query("UPDATE todos SET todo = '$todo', description = '$description', action = '$action' WHERE id = $id");
        }
        function delete($id){
            $connectDB = $this->connect();
            $connectDB->query("DELETE FROM todos WHERE id='$id'");
        }
        function taskDone($id){
            $connectDB = $this->connect();
            $connectDB->query("UPDATE todos SET action = true WHERE id = $id");
        }
        function getId($todo){
            $connectDB = $this->connect();
            $data = $connectDB->query("SELECT * FROM todos WHERE todo = '$todo'");
            $row = $data->fetch_array();
            return $row[0];
        }
    }




?>
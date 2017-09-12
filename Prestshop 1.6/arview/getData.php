<?php
require_once(dirname(__FILE__).'../../../config/config.inc.php');
require_once(dirname(__FILE__).'../../../init.php');
require_once(dirname(__FILE__).'/controllers/admin/AdminFileProcess.php');
require_once(dirname(__FILE__).'/controllers/admin/AdminArViewModel.php');

if(Tools::getValue('arViewtId')){
    $arViewtId = (int)Tools::getValue('arViewtId');
    $productid = (int)Tools::getValue('productid');
    $model = mysql_real_escape_string(Tools::getValue('model'));
    echo json_encode(AdminFileProcess::deleteModel($arViewtId, $productid, $model));
} elseif(isset($_FILES['arfile']['name'])){
    $fileName = $_FILES['arfile']['name'];
    $fileSize = $_FILES['arfile']['size'];
    $fileTmpName  = $_FILES['arfile']['tmp_name'];
    $fileType = $_FILES['arfile']['type'];
    $id_product = Tools::getValue('productid');
    $productId = AdminArViewModel::checkProduct($id_product);
    if(count($productId) > 0){
        $data = ['status' => 0, 'message' => 'Select Different Product']; 
        echo json_encode($data); 
    } else if(count($productId) == 0){  
        echo json_encode(AdminFileProcess::processFile($fileName, $fileTmpName, $fileType, $id_product));
    }
} else if(!empty($_POST['column0']) || !empty($_POST['column1']) ){
    AdminArViewModel::getData(mysql_real_escape_string($_POST['column0']), mysql_real_escape_string($_POST['column1']));
} else {
    AdminArViewModel::getData();
}    
    
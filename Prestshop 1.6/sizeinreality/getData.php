<?php
require_once(dirname(__FILE__).'../../../config/config.inc.php');
require_once(dirname(__FILE__).'../../../init.php');
require_once(dirname(__FILE__).'/controllers/admin/AdminFileProcess.php');
require_once(dirname(__FILE__).'/controllers/admin/AdminSizeInRealityModel.php');

if(Tools::getValue('sizeInRealitytId')){
   
    $sizeInRealitytId = (int)Tools::getValue('sizeInRealitytId');
    $productid = (int)Tools::getValue('productid');
    $model = (string)Tools::getValue('model');
    echo json_encode(AdminFileProcess::deleteModel($sizeInRealitytId, $productid, $model));
} elseif(isset($_FILES['arfile']['name'])){
    $fileName = $_FILES['arfile']['name'];
    $fileSize = $_FILES['arfile']['size'];
    $fileTmpName  = $_FILES['arfile']['tmp_name'];
    $fileType = $_FILES['arfile']['type'];
    $id_product = Tools::getValue('productid');
    $productId = AdminSizeinrealityModel::checkProduct($id_product);
    if(count($productId) > 0){
        $data = ['status' => 0, 'message' => 'Select Different Product']; 
        echo json_encode($data); 
    } else if(count($productId) == 0){  
        echo json_encode(AdminFileProcess::processFile($fileName, $fileTmpName, $fileType, $id_product));
    }
} else if(!empty($_POST['column0']) || !empty($_POST['column1']) ){
    AdminSizeinrealityModel::getData($_POST['column0'], $_POST['column1']);
} else if(Tools::getValue('buttonSettings')) {
    $data = ['buttontext' => Tools::getValue('buttontext'), 'buttonfontsize' => Tools::getValue('buttonfontsize'),
            'buttonfontcolor' => Tools::getValue('buttonfontcolor'), 'buttonbackgroundcolor' => Tools::getValue('buttonbackgroundcolor'),
            'buttonbordercolor' => Tools::getValue('buttonbordercolor'), 'buttonverticalsize' => Tools::getValue('buttonverticalsize'),
            'buttonhorizontalsize' => Tools::getValue('buttonhorizontalsize'), 'buttonbordersize' => Tools::getValue('buttonbordersize'),
            'buttonborderradius' => Tools::getValue('buttonborderradius'), 'buttonfontweight' => Tools::getValue('buttonfontweight')];
    echo AdminSizeinrealityModel::saveButtonSettings($data);
 
} else {
    AdminSizeinrealityModel::getData();
}   
    
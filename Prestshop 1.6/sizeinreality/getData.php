<?php
require_once(dirname(__FILE__).'../../../config/config.inc.php');
require_once(dirname(__FILE__).'../../../init.php');
require_once(dirname(__FILE__).'/controllers/admin/AdminFileProcess.php');
require_once(dirname(__FILE__).'/controllers/admin/AdminSizeInRealityModel.php');

$headers = apache_request_headers();
if(AdminSizeinrealityModel::isToken() != $headers['sirToken']){
    $html = '<div style="color: #a94442;background-color: #f2dede;border-color: #ebccd1;padding: 15px;">';
    $html .= 'Token is not valid, hack stop !';
    $html .= '</div>';
    echo $html;
    die;
}

if(Tools::getValue('sizeInRealitytId')){
    $sizeInRealitytId = (int)Tools::getValue('sizeInRealitytId');
    $productid = (int)Tools::getValue('productid');
    $model = (string)Tools::getValue('model');
    echo json_encode(AdminFileProcess::deleteModel($sizeInRealitytId, $model));
} elseif(isset($_FILES['arfile']['name'])){
    $fileName = $_FILES['arfile']['name'];
    $fileSize = $_FILES['arfile']['size'];
    $fileTmpName  = $_FILES['arfile']['tmp_name'];
    $fileType = $_FILES['arfile']['type'];
    $id_product = Tools::getValue('productid');
    $productId = AdminSizeinrealityModel::checkProduct($id_product);
    if(!empty($productId)){
        echo json_encode(array('status' => 0, 'message' => 'Select Different Product')); 
    } else if(empty($productId)){  
        echo json_encode(AdminFileProcess::processFile($fileName, $fileTmpName, $id_product));
    }
} else if(!empty(Tools::getValue('column0')) || !empty(Tools::getValue('column1')) ){
    AdminSizeinrealityModel::getData(Tools::getValue('column0'), Tools::getValue('column1'));
} else if(Tools::getValue('buttonSettings')) {
    $data = array('buttontext' => Tools::getValue('buttontext'), 'buttonfontsize' => Tools::getValue('buttonfontsize'),
            'buttonfontcolor' => Tools::getValue('buttonfontcolor'), 'buttonbackgroundcolor' => Tools::getValue('buttonbackgroundcolor'),
            'buttonbordercolor' => Tools::getValue('buttonbordercolor'), 'buttonverticalsize' => Tools::getValue('buttonverticalsize'),
            'buttonhorizontalsize' => Tools::getValue('buttonhorizontalsize'), 'buttonbordersize' => Tools::getValue('buttonbordersize'),
            'buttonborderradius' => Tools::getValue('buttonborderradius'), 'buttonfontweight' => Tools::getValue('buttonfontweight'));
    echo AdminSizeinrealityModel::saveButtonSettings($data);
} else {
    AdminSizeinrealityModel::getData();
}   
  
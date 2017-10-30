<?php
require_once 'AdminSizeInRealityModel.php';
class AdminFileProcess 
{ 
    /**
     * Method to create models
     * and insert details in database
     * @param int $id_product
     * @param string $fileName
     * @param $fileTmpName
     * @param $fileType
     * @return array
     */    
    public static function processFile($fileName, $fileTmpName, $id_product)
    {
        try {
            $fileTmpPath = realpath(dirname(__FILE__).'/../../../..').'/upload/';
            $fileSavePath = realpath(dirname(__FILE__).'/../..').'/ar/models/';
            $compressedFile = $fileTmpPath.$fileName;
            $fileInfo = pathinfo($fileName);
            $modelName = $fileInfo['filename'];
            $modelPath = $fileSavePath.$modelName;
            if (!file_exists($modelPath)) {
                move_uploaded_file($fileTmpName, $compressedFile);
                $zip = new ZipArchive();
                $x = $zip->open($compressedFile);
                if ($x === true) {
                        $zip->extractTo($fileSavePath);
                        chmod($fileSavePath.$modelName, 0777);
                        $zip->close();
                        unlink($compressedFile);
                }
                if (file_exists($modelPath)) {
                    if($dh = opendir($modelPath)){
                        $count = 0;
                        while (($file = readdir($dh)) !== false) {
                            if ($file != '.' && $file != '..') {
                                $ext = Tools::strtolower(Tools::substr($file, strpos($file, '.') + 1));
                                if ($ext == 'obj') {
                                    $count = $count + 1;
                                }
                                if ($ext == 'mtl') {
                                    $count = $count + 2;
                                }                        
                            }   
                        }
                        closedir($dh);
                    }
                }
                if ($count == 1) {
                    self::removeFiles($modelPath);
                    return array('status' => 0, 'message' => 'No Mtl file. Please reupload');
                }
                if ($count == 2) {
                    self::removeFiles($modelPath);
                    return array('status' => 0, 'message' => 'No Obj file. Please reupload');
                }        

                if ($count != 3 && $count != 1 && $count != 2 && $count == 0) {
                    self::removeFiles($modelPath);
                    return array('status' => 0, 'message' => 'Currently we only accept .obj models.');
                }

                if ($count == 3){
                    AdminSizeInRealityModel::insertDetails($id_product, $modelName); 
                    if(isset($id_product) && isset($modelName)){
                          $sqldata = AdminSizeInRealityModel::getDataById($id_product);  
                    } 
                    $data = array('sizeinrealityid' => $sqldata['sizeinrealityid'], 'id_product' => $sqldata['productid'],
                            'productname' => $sqldata['productname'], 'file' => $sqldata['file']);
                    return array('status' => 1, 'delete' => 0, 'message' => 'Model Uploaded Sucessfully........', 'data' => $data);
                }
            } else {
                return array('status' => 0, 'message' => 'Model is already exists');
            }
        } catch (Exception $e) {
            return array('status' => 0, 'message' => $e->getMessage());    
        }
    } 
    /**
     * Method to remove files and directories
     * @param string $getmodel
     */  
    public static function removeFiles($getmodel)
    {
        if (file_exists($getmodel)) {
            if ($dh = opendir($getmodel)) {
                while (($file = readdir($dh)) !== false) {
                    if ($file != '.' && $file != '..') {
                        $dir = $getmodel.'/'.$file;
                        if (is_dir($dir)) {
                            $dir = $getmodel.'/'.$file;
                            self::removeFiles($dir);
                        } else {
                            $file = $getmodel.'/'.$file;
                            unlink($file);
                        }
                    }   
                }
                rmdir($getmodel);
                closedir($dh);
            }
        }    

    }
    /**
     * Method to remove all files and directories inside model
     * 
     * @param string $getmodel
     * 
     */  
    public static function removeAllFiles($dir = null)
    {
        if ($dir == null) {
            $getmodel = realpath(dirname(__FILE__).'/../..').'/ar/models';
            $model = $getmodel;
        } else {
            $getmodel = $dir;
        }    
        if (file_exists($getmodel)) {
            if ($dh = opendir($getmodel)) {
                while (($file = readdir($dh)) !== false) {
                    if ($file != '.' && $file != '..') {
                        $dir = $getmodel.'/'.$file;
                        if (is_dir($dir)) {
                            $dir = $getmodel.'/'.$file;
                            self::removeAllFiles($dir);
                        } else {
                            $file = $getmodel.'/'.$file;
                            unlink($file);
                        }
                    }   
                }
                if($getmodel != $model)
                    rmdir($getmodel);
                closedir($dh);
            }
        }    
    }    
    /**
     * Method to remove model files and directories inside model
     * @param int $sizeInRealitytId
     * @param int $productid
     * @param string $model
     * @return json data
     */ 
    public function deleteModel($sizeInRealitytId, $model)
    {
        if (!AdminSizeInRealityModel::deleteData($sizeInRealitytId))
            return array('status' => 0, 'message' => 'Oops Something went wrong!');            
        $filePath = realpath(dirname(__FILE__).'/../..').'/ar/models/'.$model;
        self::removeFiles($filePath);
        return array('status' => 1, 'delete' => 1, 'message' => 'File removed Successfully.......', 'data' => null);
    }    
} 
// End Of AdminFileProcess class
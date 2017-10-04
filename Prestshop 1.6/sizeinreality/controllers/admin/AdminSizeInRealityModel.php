<?php

class AdminSizeInRealityModel 
{
    /**
     * Method to insert sizeinreality details.
     *
     * @param int $id_product
     * @param string $modelName
     * 
     * @return true
     */     
    public static function insertDetails($id_product, $modelName)
    {
        Db::getInstance()->execute("INSERT INTO "._DB_PREFIX_."sizeinreality VALUES(null, '".(int)$id_product."', '".pSQL($modelName)."', now())");
    }
    
    
    /**
     * Method to list all products.
     *
     * @return array
     */     
    public static function getAllProducts()
    {
        $sql = 'SELECT id_product, name FROM '._DB_PREFIX_.'product_lang ORDER BY id_product ASC';
        return  $sqldata = Db::getInstance()->executeS($sql);
    }
    
    /**
     * Method to list sizeinreality details.
     *
     * @param string $search0
     * @param string $search1
     * 
     * @return Json Response
     */    
    public static function getData($search0 = null, $search1 = null)
    {
        $sql = "SELECT '' as SNo, ar.id_sizeinreality as sizeinrealityid, ar.id_product as productid, pro.name as productname,";
        $sql .= "ar.file as model FROM "._DB_PREFIX_."sizeinreality as ar JOIN "._DB_PREFIX_."product_lang as pro on ar.id_product = pro.id_product";
        $sql .= " WHERE 1 = 1";
        if(!empty($search0)){
            $sql .= " AND pro.name LIKE'%".pSQL($search0)."%'";
        }
        if(!empty($search1)){
            $sql .= " AND ar.file LIKE'%".pSQL($search1)."%'";
        }    
//echo $sql;die;
        $sqldata = Db::getInstance()->executeS($sql); 
        $total = count($sqldata);
        $i = 0;
        foreach($sqldata as $key => $val){
            $sqldata[$key]['SNo'] =  ++$i;
            $actions = '';
            $actions .= "<span style='padding: 0px 6px;'></span>";
            $actions .= "<button class='btn btn-danger btn-xs deleteProd' title='Delete'><i class='fa fa-trash' aria-hidden='true' style='font-size:22px'></i></button>";        
            $sqldata[$key]['actions'] =  $actions;       
        }    
        $json_data = [
                    "draw"            => 1,
                    "recordsTotal"    => intval( $total ),  
                    "recordsFiltered" => intval( $total ),
                    "data"            => $sqldata   
                ];

        echo json_encode($json_data);     
    } 
    
    /**
     * Method to return sizeinreality details by id.
     *
     * @param int $id_product
     * 
     * @return array
     */        
    public static function getDataById($id_product)
    {
        $sql = "SELECT ar.id_sizeinreality as sizeinrealityid, ar.id_product as productid, pro.name as productname,";
        $sql .= "ar.file FROM "._DB_PREFIX_."sizeinreality as ar JOIN "._DB_PREFIX_."product_lang as pro on ar.id_product = pro.id_product";
        $sql .= " WHERE ar.id_product =". (int)$id_product;
        $sqldata = Db::getInstance()->executeS($sql);
        return $sqldata[0];
    }
    
    /**
     * Method to check product exist in arvie table
     *
     * @param int $id_product
     * 
     * @return array
     */ 
    public static function getProductModel($id_product)
    {
        return Db::getInstance()->executeS('SELECT * FROM '._DB_PREFIX_.'sizeinreality WHERE id_product = '.(int)$id_product);
    }
    
    
    /**
     * Method to check product exist in arvie table
     *
     * @param int $id_product
     * 
     * @return array
     */ 
    public static function checkProduct($id_product)
    {
        return Db::getInstance()->executeS("SELECT id_product FROM ps_sizeinreality WHERE id_product = ".(int)$id_product);
    } 
    
    /**
     * Method to delete sizeinreality details by id
     * and remove corresponding files.
     * 
     * @param int $id_product
     * @param int $sizeinrealitytId
     * @param string $model
     * 
     * @return array
     */     
    public static function deleteData($sizeinrealitytId, $productid, $model)
    {
        $sql = 'DELETE FROM '._DB_PREFIX_.'sizeinreality where id_sizeinreality ='.(int)$sizeinrealitytId;
        if(!Db::getInstance()->execute($sql))
            return false;
        return true;
    }
    
    public function getButtonSettings()
    {
        $data =  Db::getInstance()->executeS("SELECT value FROM "._DB_PREFIX_."configuration WHERE name = 'SIR_BUTTON_SETTINGS' ");
        $data = json_decode($data[0]['value'], true);
      //  echo "<pre>";print_r($data);die;
        return $data;
    }
    
    public function saveButtonSettings($data)
    {
        $data = json_encode($data);
        $sql = "UPDATE "._DB_PREFIX_."configuration SET value = '". $data ."' WHERE name = 'SIR_BUTTON_SETTINGS' ";
        //echo $sql;die;
        if(!Db::getInstance()->execute($sql))
            return false;
        return true;        
    }
    
} // End Of AdminArViewModel class


<?php

class AdminArViewModel 
{
    /**
     * Method to insert arview details.
     *
     * @param int $id_product
     * @param string $modelName
     * 
     * @return true
     */     
    public static function insertDetails($id_product, $modelName)
    {
        Db::getInstance()->execute("INSERT INTO "._DB_PREFIX_."arview VALUES(null, '".(int)$id_product."', '".pSQL($modelName)."', now())");
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
     * Method to list arview details.
     *
     * @param string $search0
     * @param string $search1
     * 
     * @return Json Response
     */    
    public static function getData($search0 = null, $search1 = null)
    {
        $sql = "SELECT '' as SNo, ar.id_arview as arviewid, ar.id_product as productid, pro.name as productname,";
        $sql .= "ar.file as model FROM "._DB_PREFIX_."arview as ar JOIN "._DB_PREFIX_."product_lang as pro on ar.id_product = pro.id_product";
        $sql .= " WHERE 1 = 1";
        if(!empty($search0)){
            $sql .= " AND pro.name LIKE'".$search0."%'";
        }
        if(!empty($search1)){
            $sql .= " AND ar.file LIKE'".$search1."%'";
        }    

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
     * Method to return arview details by id.
     *
     * @param int $id_product
     * 
     * @return array
     */        
    public static function getDataById($id_product)
    {
        $sql = "SELECT ar.id_arview as arviewid, ar.id_product as productid, pro.name as productname,";
        $sql .= "ar.file FROM "._DB_PREFIX_."arview as ar JOIN "._DB_PREFIX_."product_lang as pro on ar.id_product = pro.id_product";
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
        return Db::getInstance()->executeS('SELECT * FROM '._DB_PREFIX_.'arview WHERE id_product = '.(int)$id_product);
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
        return Db::getInstance()->executeS("SELECT id_product FROM ps_arview WHERE id_product = ".(int)$id_product);
    } 
    
    /**
     * Method to delete arview details by id
     * and remove corresponding files.
     * 
     * @param int $id_product
     * @param int $arViewtId
     * @param string $model
     * 
     * @return array
     */     
    public static function deleteData($arViewtId, $productid, $model){
        $sql = 'DELETE FROM '._DB_PREFIX_.'arview where id_arview ='.(int)$arViewtId;
        if(!Db::getInstance()->execute($sql))
            return false;
        return true;
    }
    
} // End Of AdminArViewModel class


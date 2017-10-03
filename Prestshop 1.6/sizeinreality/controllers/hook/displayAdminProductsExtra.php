<?php

class arviewDisplayAdminProductsExtraController 
{
    
    
    public function assign($module, $file, $path)
    {
        $this->file = $file;
        $this->module = $module;
        $this->context = Context::getContext();
        $this->_path = $path;  
        
    }
    
    
    
    public function run($this, $file)
    {
       // $id_product = (int)Tools::getValue('id_product'); 
       $this->module = $this;
        return $this->module->display($file, 'product_properties.tpl');
    }
    
    
}


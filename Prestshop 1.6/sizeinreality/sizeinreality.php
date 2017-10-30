<?php

/**
 * NOTICE OF LICENSE
 * Read in the module
 * DISCLAIMER
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 * PHP version 5.6
 * 
 * @category  AugmentedReality
 * @package   SizeInReality
 * @author    Enqos <support@enqos.com>
 * @copyright 2017-2018 Enqos
 * @license   define in the module
 * @link      http://enqos.com/
 */
require_once dirname(__FILE__).'/controllers/admin/AdminFileProcess.php';
require_once dirname(__FILE__).'/controllers/admin/AdminSizeInRealityModel.php';
// Security
if (!defined('_PS_VERSION_')) { 
    exit;
}

class SizeInReality extends Module
{
    /**
     * SizeInReality Module specification
     * 
     * @brief Constructor
     * 
     */  
    
    public function __construct()
    {
        $this->name = 'sizeinreality';
        $this->tab = 'front_office_features';
        $this->version = '1.0.0';
        $this->author = 'Enqos';
        $this->need_instance = 0;
        
        $this->ps_versions_compliancy = array('min' => '1.6', 
        'max' => _PS_VERSION_); 
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('SizeInReality');
        $this->description = $this->l('Module to place 3d objects in real world.');
        $this->confirmUninstall = $this->l('Are you sure you want to uninstall?');
    }
    
    /**
     * Method to register module inside hook and create new db table
     * 
     * @brief Installation method
     * 
     */
    
    public function install()
    {
        if (!parent::install())
            return false;
        if (!$this->registerHook('displayBackOfficeHeader') ||
	    !$this->registerHook('displayAdminCustomers') ||
            !$this->registerHook('header') ||                        
            !$this->registerHook('displayRightColumnProduct') ||
            !$this->registerHook('ModuleRoutes') ||
            !$this->registerHook('actionAdminControllerSetMedia') ||    
            !$this->registerHook('displayBackOfficeHeader') ||     
            !$this->registerHook('displayAdminProductsExtra') )
            return false;
        if (!$this->installTab('AdminSizeInReality', 'SizeInReality'))
            return false; 
        $sql_file = dirname(__FILE__).'/install/install.sql';
        if (!$this->loadSQLFile($sql_file))
            return false;        
        if (!AdminSizeinrealityModel::insertButtonSettings())
            return false;
        return true;
    }
    
    /**
     * Method to remove register module inside hook and remove db table
     * 
     * @brief Uninstallation method
     * 
     */    
    public function uninstall()
    {
        if (!parent::uninstall())
            return false;
        
        if (!$this->uninstallTab('AdminSizeInReality'))
            return false;
        
        $sql_file = dirname(__FILE__).'/install/uninstall.sql';
        if (!$this->loadSQLFile($sql_file))
            return false;
        
        if (!AdminSizeinrealityModel::removeButtonSettings())
            return false;
        
        AdminFileProcess::removeAllFiles();
        
        return true;
    }

    /**
     * Method for create menu
     * 
     * @brief Installation Tab method
     * 
     */
    public function installTab($class_name, $name)
    {
        $tab = new Tab();
        $tab->name = array();
        foreach (Language::getLanguages(true) as $lang)
                $tab->name[$lang['id_lang']] = $name;
        $tab->module = $this->name;
        $tab->id_parent = 0;
        $tab->class_name = $class_name;
        $tab->active = 1;
        return $tab->add();
    }
    
    /**
     * Method to remove menu
     * 
     * @brief Uninstallation Tab method
     * 
     */
    public function uninstallTab($class_name)
    {
        $id_tab = (int)Tab::getIdFromClassName($class_name);
        $tab = new Tab((int)$id_tab);
        return $tab->delete();
    }
    
    /**
     * Method to locate sql file and create table
     * 
     * @brief method for load sql file
     * 
     */
    public function loadSQLFile($sql_file)
    {
        $sql_content = Tools::file_get_contents($sql_file);
        $sql_content = str_replace('PREFIX_', _DB_PREFIX_, $sql_content);
        $sql_requests = preg_split("/;\s*[\r\n]+/", $sql_content);
        $result = true;
        foreach($sql_requests AS $request)
            if (!empty($request))
                $result &= Db::getInstance()->execute(trim($request));
        return $result;
    }

    /**
     * Confirm whether remove module or not
     * 
     * @brief prompt method
     * 
     */    
    public function onClickOption($type)
    {
        $confirm_reset = $this->l('Reseting this module will delete all files and data from your database, are you sure you want to reset it ?');
        $reset_callback = "return sizeinreality_reset('".addslashes($confirm_reset)."');";
        $matchType = array('reset' => $reset_callback, 'delete' => "return confirm('Confirm delete?')");
        if (isset($matchType[$type]))
            return $matchType[$type];
        return '';
    }
    
    /**
     *
     * Hook to add  js on back office header
     * Method for prompt window
     * 
     */ 
    public function hookDisplayBackOfficeHeader($params)
    {
        if (Tools::getValue('controller') != 'AdminModules'){
            return '';
        }    
        $this->context->controller->addJS($this->_path.'views/js/sizeInReality-backoffice.js');
    }    
    
    /**
     * Hook to add css and js on front office header
     * Method allow to include css and js only on product page
     * 
     */     
    public function hookHeader($params)
    {
        if(Tools::getValue('controller') == 'product'){
            $this->context->controller->addJS('https://www.incensesticks.com/sir/sir.min.js');            
            $this->context->controller->addCSS($this->_path.'views/css/sizeInReality.css');
            $this->context->controller->addJS($this->_path.'views/js/sizeInReality.js');   
        }    
    } 

    /**
     * Hook to add css and js on back office
     * Method allow to include css and js only on admin product page
     * 
     */    
    public function hookActionAdminControllerSetMedia($params)
    {
        if ($this->context->controller->controller_name == 'AdminProducts' && Tools::getValue('id_product')) {
            $this->context->controller->addJS($this->_path.'views/js/adminSizeInReality.js');
            $this->context->controller->addJS($this->_path.'views/js/jquery.dataTables.js');
            $this->context->controller->addJS($this->_path.'views/js/sweetalert2.min.js');
            $this->context->controller->addJS($this->_path.'views/js/bootstrap-select.min.js');
            $this->context->controller->addJS(_MODULE_DIR_.'sizeinreality/views/js/jquery.wheelcolorpicker.js');
            $this->context->controller->addCSS($this->_path.'views/css/jquery.dataTables.css');
            $this->context->controller->addCSS($this->_path.'views/css/font-awesome.min.css');
            $this->context->controller->addCSS($this->_path.'views/css/bootstrap-select.min.css');
            $this->context->controller->addCSS($this->_path.'views/css/sweetalert2.min.css');            
        }
    } 
    
    /**
     * Method to render content after click configure button under sizeinreality module
     * 
     * @access public
     * @return void
     *  
     */ 
    public function getContent()
    {
        return $this->display(__FILE__, 'getContent.tpl');
    } 
    
    /**
     * Hook to display sizeinreality button on product page
     * 
     * @access public
     * @param mixed $param
     * @return void
     * 
     */     
    public function hookDisplayRightColumnProduct($params)
    {
        $protocol = isset($_SERVER["HTTPS"]) ? 'https://' : 'http://';     
        $url = $protocol.$_SERVER['HTTP_HOST']._MODULE_DIR_.'sizeinreality/ar/models';
        $imgUrl = _MODULE_DIR_.'sizeinreality/views/img/ar.png';
        $ardata = AdminSizeInRealityModel::getProductModel((int)Tools::getValue('id_product'));
//        $buttonSettings = AdminSizeInRealityModel::getButtonSettings();
//        $btn = count($ardata) > 0 ? '<a id="sizeinreality" data-filepath = "'.$url.'" data-file="'.$ardata[0]['file'].'" '
//                . ' data-filepath = "'.$url.'" data-file="Diffuser_Bamboo"'
//                . ' style="font-size: '.$buttonSettings['buttonfontsize'].'px; color: #'.$buttonSettings['buttonfontcolor'].'; '
//                . 'font-weight: '.$buttonSettings['buttonfontweight'].'; background-color: #'.$buttonSettings['buttonbackgroundcolor'].'; '
//                . 'padding: '.$buttonSettings['buttonverticalsize'].'px '.$buttonSettings['buttonfontsize'].'px; '
//                . 'border: '.$buttonSettings['buttonbordersize'].'px solid #'.$buttonSettings['buttonbordercolor'].'; '
//                . '-webkit-border-radius:'.$buttonSettings['buttonborderradius'].'px; '
//                . '-moz-border-radius:'.$buttonSettings['buttonborderradius'].'px; '
//                . 'border-radius:'.$buttonSettings['buttonborderradius'].'px;cursor: pointer; "                '
//                . '>'.$buttonSettings['buttontext'] .'</a>' : NULL;
        
        //$this->context->smarty->assign('btn', $btn);
        $icon = count($ardata) > 0 ? '<img id="sizeinreality" style="display:none;z-index:6000;width:32px;position:relative;top:0px;left:-5px;opacity:.3;float:right;cursor:pointer;" data-filepath = "'.$url.'" data-file="'.$ardata[0]['file'].'" src="'.$imgUrl.'" title="sizeinreality" />' : NULL;
        $this->context->smarty->assign('icon', $icon);
        return $this->display(__FILE__, 'displayRightColumnProduct.tpl');
    } 
   
    
    /**
     * method to get Arview model details from database
     * 
     */     
    public function assignProductTabConfiguration($id_product)
    {
        $sqldata = AdminSizeInRealityModel::getDataById($id_product);
        $this->context->smarty->assign('count', count($sqldata));
        $this->context->smarty->assign('sqldata', $sqldata);
    }  

    /**
     * Hook to display extra sizeinreality tab button on admin product page
     * 
     * @access public
     * @param mixed $param
     * @return void
     * 
     */       
    public function hookDisplayAdminProductsExtra($params)
    {
        $token = AdminSizeInRealityModel::getToken();
        $id_product = (int)Tools::getValue('id_product');
        if ($id_product == 0 || $id_product == null) {
            $html = '';
            $html .= '<div class="alert alert-warning">';
            $html .= '<button type="button" class="close" data-dismiss="alert">×</button>';
            $html .= 'There is 1 warning.';
            $html .= '<ul style="display:block;" id="seeMore">';
            $html .= '<li>You must save this product before adding Sizeinreality models.</li>';
            $html .= '</ul>';
            $html .= '</div>';                    
            return $html;
        } else {
            $this->assignProductTabConfiguration($id_product);
            $protocol = isset($_SERVER["HTTPS"]) ? 'https://' : 'http://';
            $url = $protocol.$_SERVER['HTTP_HOST']._MODULE_DIR_.'sizeinreality/getData.php';
            $id_product = (int)Tools::getValue('id_product');
            $this->context->smarty->assign('url', $url);
            $this->context->smarty->assign('id_product', $id_product);
            $this->context->smarty->assign('token', $token);
            return $this->display(__FILE__, 'product_properties.tpl');
        }    
    }    
    
}    

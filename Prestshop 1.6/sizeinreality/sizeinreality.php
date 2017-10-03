<?php

/**
 * NOTICE OF LICENSE
 *
 * Read in the module
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * PHP version 5.6
 *
 * @category  AugmentedReality
 * @package   SizeInReality
 * @author    Enqos <support@enqos.com>
 * @copyright 2017-2018 Enqos
 * @license   define in the module
 * @link      http://enqos.com/
 */
require_once (dirname(__FILE__).'/controllers/admin/AdminFileProcess.php');
require_once (dirname(__FILE__).'/controllers/admin/AdminSizeInRealityModel.php');
// Security
if (!defined('_PS_VERSION_')) { 
    exit;
}
class SizeInReality extends Module
{
    /**
     * @brief Constructor
     * 
     */    
    public function __construct()
    {
        $this->name = 'sizeinreality';
        $this->tab = 'front_office_features';
        $this->version = '1.0';
        $this->author = 'Enqos';
        $this->need_instance = 0;
        
        $this->ps_versions_compliancy = array('min' => '1.6', 'max' => _PS_VERSION_); 
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('SizeInReality');
        $this->description = $this->l('Module to place 3d objects in real world.');
        $this->confirmUninstall = $this->l('Are you sure you want to uninstall?');
    } 
    
    /**
     * @brief Installation method
     * 
     */
    public function install()
    {
        // Call install parent method
        if (!parent::install())
           return false;
        
        // Register hooks
	if (!$this->registerHook('displayBackOfficeHeader') ||
	    !$this->registerHook('displayAdminCustomers') ||
            !$this->registerHook('header') ||                        
            !$this->registerHook('displayRightColumnProduct') ||
            !$this->registerHook('ModuleRoutes') ||
            !$this->registerHook('actionAdminControllerSetMedia') ||    
            !$this->registerHook('displayBackOfficeHeader') ||     
            !$this->registerHook('displayAdminProductsExtra') )
            return false;
                
        // Install admin tab
        if (!$this->installTab('AdminSizeInReality', 'SizeInReality'))
                return false; 
        
        $sql_file = dirname(__FILE__).'/install/install.sql';
        if (!$this->loadSQLFile($sql_file))
                return false;        

        return true;
    }
    public function uninstall()
    {
        if (!parent::uninstall())
            return false;
        
        if (!$this->uninstallTab('AdminSizeInReality'))
            return false;
        
        $sql_file = dirname(__FILE__).'/install/uninstall.sql';
        if (!$this->loadSQLFile($sql_file))
            return false;
        
        AdminFileProcess::removeAllFiles();
        
        return true;
    }

    /**
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

    public function uninstallTab($class_name)
    {
        $id_tab = (int)Tab::getIdFromClassName($class_name);
        $tab = new Tab((int)$id_tab);
        return $tab->delete();
    }

    public function loadSQLFile($sql_file)
    {
        $sql_content = file_get_contents($sql_file);
        $sql_content = str_replace('PREFIX_', _DB_PREFIX_, $sql_content);
        $sql_requests = preg_split("/;\s*[\r\n]+/", $sql_content);
        $result = true;
        foreach($sql_requests AS $request)
                if (!empty($request))
                        $result &= Db::getInstance()->execute(trim($request));
        return $result;
    }
    
    public function onClickOption($type, $href = false)
    {
        $confirm_reset = $this->l('Reseting this module will delete all files and data from your database, are you sure you want to reset it ?');
        $reset_callback = "return sizeinreality_reset('".addslashes($confirm_reset)."');";
        $matchType = ['reset' => $reset_callback, 'delete' => "return confirm('Confirm delete?')"];
        if (isset($matchType[$type]))
            return $matchType[$type];
        return '';
    }

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
    public function hookHeader()
    {
        
        //$this->context->controller->addJS('http://localhost/sir/dist/sizeinreality.js');
        if(Tools::getValue('controller') == 'product'){
            $this->context->controller->addJS('http://localhost/sir/dist/sir.bundle.js');
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
        if($this->context->controller->controller_name == 'AdminProducts' && Tools::getValue('id_product')) {
            
            $this->context->controller->addJS($this->_path.'views/js/adminSizeInReality.js');
            $this->context->controller->addJS($this->_path.'views/js/jquery.dataTables.js');
            $this->context->controller->addJS($this->_path.'views/js/sweetalert2.min.js');
            $this->context->controller->addJS($this->_path.'views/js/bootstrap-select.min.js');
//            $this->context->controller->addCSS($this->_path.'views/js/adminSizeInRealityTab.css');
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
        $url = $protocol.$_SERVER['HTTP_HOST']._MODULE_DIR_.'sizeinreality/ar/models/';
        $ardata = AdminSizeInRealityModel::getProductModel((int)Tools::getValue('id_product'));
        $btn = count($ardata) > 0 ? '<a class="btn btn-success btn-md" btn-lg" id="sizeinreality" data-filepath = "'.$url.'" data-file="Diffuser_Bamboo" > AR View </a>' : NULL;
        $this->context->smarty->assign('btn', $btn);
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
        $id_product = (int)Tools::getValue('id_product');
        if($id_product == 0 || $id_product == null){
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
            return $this->display(__FILE__, 'product_properties.tpl');
        }    
    }    
    
}    

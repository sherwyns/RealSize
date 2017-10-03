<?php
require_once 'AdminSizeInRealityModel.php';

class AdminSizeInRealityController extends ModuleAdminController
{
    /**
     * @brief Constructor
     * Method to initialise the back office separate page
     * 
     */  
    public function __construct()
    {
       $this->bootstrap = true;
       $this->lang = (!isset($this->context->cookie) || !is_object($this->context->cookie)) ? intval(Configuration::get('PS_LANG_DEFAULT')) : intval($this->context->cookie->id_lang);
       $this->path =  _PS_MODULE_DIR_.$this->module.'/';
       parent::__construct();
    }

    /**
     * Method allow to include css and js on Admin Arview page
     * 
     */     
    public function initContent()
    {
        $this->context->controller->addJS(_MODULE_DIR_.'sizeinreality/views/js/adminSizeInReality.js');
        $this->context->controller->addJS(_MODULE_DIR_.'sizeinreality/views/js/jquery.dataTables.js');
        $this->context->controller->addJS(_MODULE_DIR_.'sizeinreality/views/js/sweetalert2.min.js');
        $this->context->controller->addJS(_MODULE_DIR_.'sizeinreality/views/js/bootstrap-select.min.js');
        $this->context->controller->addCSS(_MODULE_DIR_.'sizeinreality/views/css/adminSizeInReality.css');
        $this->context->controller->addCSS(_MODULE_DIR_.'sizeinreality/views/css/jquery.dataTables.css');
        $this->context->controller->addCSS(_MODULE_DIR_.'sizeinreality/views/css/font-awesome.min.css');
        $this->context->controller->addCSS(_MODULE_DIR_.'sizeinreality/views/css/bootstrap-select.min.css');
        $this->context->controller->addCSS(_MODULE_DIR_.'sizeinreality/views/css/sweetalert2.min.css');
        $this->show_toolbar = true;
        $this->display = 'list'; //set view than renderView and list than renderList

        $this->meta_title = $this->l('Size In Reality');
        parent::initContent();
    } 

    /**
     * Method to render content after click Arview button under admin menu
     * 
     * @access public
     * @return void
     *  
     */     
    public function renderlist()
    {

        $protocol = isset($_SERVER["HTTPS"]) ? 'https://' : 'http://';     
        $url = $protocol.$_SERVER['HTTP_HOST']._MODULE_DIR_.'sizeinreality/getData.php';
        $getAllProducts = AdminSizeInRealityModel::getAllProducts();
        $tpl = $this->context->smarty->createTemplate(dirname(__FILE__). '/../../views/templates/admin/admin.tpl');
        $tpl->assign('url', $url);
        $tpl->assign('page', 'sizeinreality');
        $tpl->assign('getAllProducts', $getAllProducts);
        return $tpl->fetch();               
    }

    
}// End Of AdminArViewController class

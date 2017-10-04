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
        $buttonSettings = AdminSizeInRealityModel::getButtonSettings();
        $tpl = $this->context->smarty->createTemplate(dirname(__FILE__). '/../../views/templates/admin/admin.tpl');
        
        $panel = '<div class="panel" >';
        $panel .= '<div class="panel-heading"><i class="icon-cogs"></i>Button Style</div>';

        $panel .= '<div class="row">';
        $panel .= '<div class="form-group">';
        $panel .= '<label class="control-label col-lg-3"> Text:</label>';
        $panel .= '<div class="col-lg-9">';
        $panel .= '<div class="input-group fixed-width-lg">';
        $panel .= '<input type="text" name="buttontext" id="buttontext" value="'.$buttonSettings['buttontext'].'" min="2">';
        $panel .= '</div>';
        $panel .= '</div>';
        $panel .= '</div>';        
        $panel .= '</div>';
        $panel .= '<br/>';

        $panel .= '<div class="row">';
        $panel .= '<div class="form-group">';
        $panel .= '<label class="control-label col-lg-3"> font-size:</label>';
        $panel .= '<div class="col-lg-9">';
        $panel .= '<div class="input-group fixed-width-lg">';
        $panel .= '<span class="input-group-addon">px</span><input type="text" name="buttonfontsize" id="buttonfontsize" value="'.$buttonSettings['buttonfontsize'].'" min="2">';
        $panel .= '</div>';
        $panel .= '</div>';
        $panel .= '</div>';        
        $panel .= '</div>';
        $panel .= '<br/>'; 
        
        $panel .= '<div class="row">';
        $panel .= '<div class="form-group">';
        $panel .= '<label class="control-label col-lg-3"> font-weight:</label>';
        $panel .= '<div class="col-lg-9">';
        $panel .= '<div class="input-group fixed-width-lg">';
        $panel .= '<input type="text" name="buttonfontweight" id="buttonfontweight" value="'.$buttonSettings['buttonfontweight'].'" min="2">';
        
        
        $panel .= '</div>';
        $panel .= '</div>';
        $panel .= '</div>';        
        $panel .= '</div>';
        $panel .= '<br/>';          

        $panel .= '<div class="row">';
        $panel .= '<div class="form-group">';
        $panel .= '<label class="control-label col-lg-3"> font-color:</label>';
        $panel .= '<div class="col-lg-9">';
        $panel .= '<div class="input-group fixed-width-lg">';
        $panel .= '<input type="text" name="buttonfontcolor" id="buttonfontcolor" value="'.$buttonSettings['buttonfontcolor'].'" min="2">';
        $panel .= '</div>';
        $panel .= '</div>';
        $panel .= '</div>';        
        $panel .= '</div>';
        $panel .= '<br/>';
        
        $panel .= '<div class="row">';
        $panel .= '<div class="form-group">';
        $panel .= '<label class="control-label col-lg-3"> Background color:</label>';
        $panel .= '<div class="col-lg-9">';
        $panel .= '<div class="input-group fixed-width-lg">';
        $panel .= '<input type="text" name="buttonbackgroundcolor" id="buttonbackgroundcolor" value="'.$buttonSettings['buttonbackgroundcolor'].'" min="2">';
        $panel .= '</div>';
        $panel .= '</div>';
        $panel .= '</div>';        
        $panel .= '</div>';
        $panel .= '<br/>'; 

        $panel .= '<div class="row">';
        $panel .= '<div class="form-group">';
        $panel .= '<label class="control-label col-lg-3"> Border color:</label>';
        $panel .= '<div class="col-lg-9">';
        $panel .= '<div class="input-group fixed-width-lg">';
        $panel .= '<input type="text" name="buttonbordercolor" id="buttonbordercolor" value="'.$buttonSettings['buttonbordercolor'].'" min="2">';
        $panel .= '</div>';
        $panel .= '</div>';
        $panel .= '</div>';        
        $panel .= '</div>';
        $panel .= '<br/>';         


        $panel .= '<div class="row">';
        $panel .= '<div class="form-group">';
        $panel .= '<label class="control-label col-lg-3"> vertical Size:</label>';
        $panel .= '<div class="col-lg-9">';
        $panel .= '<div class="input-group fixed-width-lg">';
        $panel .= '<span class="input-group-addon">px</span><input type="text" name="buttonverticalsize" id="buttonverticalsize" value="'.$buttonSettings['buttonverticalsize'].'" min="2">';
        $panel .= '</div>';
        $panel .= '<p class="help-block">This option is used to adjust Padding top and bottom.</p>';
        $panel .= '</div>';
        $panel .= '</div>';        
        $panel .= '</div>';
        $panel .= '<br/>';

        $panel .= '<div class="row">';
        $panel .= '<div class="form-group">';
        $panel .= '<label class="control-label col-lg-3"> Horizontal Size:</label>';
        $panel .= '<div class="col-lg-9">';
        $panel .= '<div class="input-group fixed-width-lg">';
        $panel .= '<span class="input-group-addon">px</span><input type="text" name="buttonhorizontalsize" id="buttonhorizontalsize" value="'.$buttonSettings['buttonhorizontalsize'].'" min="2">';
        $panel .= '</div>';
        $panel .= '<p class="help-block">This option is used to adjust Padding right and left.</p>';
        $panel .= '</div>';
        $panel .= '</div>';        
        $panel .= '</div>';
        $panel .= '<br/>';        
        
        
        $panel .= '<div class="row">';
        $panel .= '<div class="form-group">';
        $panel .= '<label class="control-label col-lg-3"> Border size:</label>';
        $panel .= '<div class="col-lg-9">';
        $panel .= '<div class="input-group fixed-width-lg">';
        $panel .= '<span class="input-group-addon">px</span><input type="text" name="buttonbordersize" id="buttonbordersize" value="'.$buttonSettings['buttonbordersize'].'" min="2">';
        $panel .= '</div>';
        $panel .= '</div>';
        $panel .= '</div>';        
        $panel .= '</div>';
        $panel .= '<br/>';        
        
        $panel .= '<div class="row">';
        $panel .= '<div class="form-group">';
        $panel .= '<label class="control-label col-lg-3"> Border Radius:</label>';
        $panel .= '<div class="col-lg-9">';
        $panel .= '<div class="input-group fixed-width-lg">';
        $panel .= '<span class="input-group-addon">px</span><input type="text" name="buttonborderradius" id="buttonborderradius" value="'.$buttonSettings['buttonborderradius'].'" min="2">';
        $panel .= '</div>';
        $panel .= '</div>';
        $panel .= '</div>';        
        $panel .= '</div>';        
        
        $panel .= '<div class="panel-footer">';
        $panel .= '<button type="button" class="btn btn-default pull-right" id="buttonSettings" ><i class="process-icon-save"></i> Save</button>';
        $panel .= '</div>';
        $panel .= '</div>';         
        
        $tpl->assign('url', $url);
        $tpl->assign('page', 'sizeinreality');
        $tpl->assign('getAllProducts', $getAllProducts);
        $tpl->assign('panel', $panel);
        return $tpl->fetch();               
    }

    
}// End Of AdminArViewController class

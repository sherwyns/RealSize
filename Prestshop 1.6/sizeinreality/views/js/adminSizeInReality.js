$( document ).ready(function() {
    window.adminSizeInReality = new AdminSizeInReality();
});

var AdminSizeInReality = function(){
    this.init();
}

AdminSizeInReality.prototype = {
    file:null,
    page:null,
    getUrl:null,
    inputTemp:null,
    sizeInRealityTable:null,
    sirToken:null,
    btselclass:'.arFormGrp .dropdown-toggle',
    btfileclass:'fileUploadLabel',
    init: function(){
        var self = this;
        self.getUrl = $('#getUrl').val();
        self.page = $('#getPage').val();
        self.sirToken = $('#sirToken').val();
        $('#buttonfontcolor').wheelColorPicker();
        $('#buttonbackgroundcolor').wheelColorPicker();
        $('#buttonbordercolor').wheelColorPicker();
        
        if(self.page == 'sizeinreality'){
            self.dataTable();
        }
        
        $('.ColorValues').on('blur', function(){
            $(this).css('background-color', '#'+$(this).val());
        })

        $('#fileInput').live('change', function(){
           var file = document.getElementById("fileInput").files[0].name;
           self.file = file;
           $('.fileInfo').html(file).removeClass('errorTxt');
        });

        $('#uploadFileButton').on('click', function(){
            self.resetForm();
        });
        
        $('#buttonSettings').on('click', function(){self.saveButtonSettings(self.getUrl);});
        
        
        $('#sizeInRealitysubmit').on('click', function(){
            var productid = $('#product').val();
            var prod = self.validateProduct(productid);
            var file = self.validateFile(self.file);
            
            prod == 0 ? self.fieldRequired('Product', self.btselclass) : self.clearError('Product', self.btselclass) ;

            if(file == 0){
                self.fieldRequired('file', self.btfileclass);
            } else {
                if(file == 2){
                    self.selCompressFile();    
                } else {
                    self.clearError('file', self.btfileclass);
                    $('.fileInfo').html(self.file);
                }
            }
            if(prod == 0 || file == 0 || file == 2){ return false;}
            var fileSelect = document.getElementById('fileInput');
            var files = fileSelect.files;        
            var formData = new FormData();        
            var file = files[0]; 
            formData.append('arfile', file, file.name);
            formData.append('productid', productid);
            self.uploadFile(formData);            
        });
        //--------------------------------------------------------------------------------------- End Of sizeInRealitysubmit
        $('#sizeInRealityupload').live('click', function(){ 
            self.sirToken = $('#sirToken').val();
            var file = self.validateFile(self.file);
            if(file == 0){
                self.fieldRequired('file', self.btfileclass);
            } else {
                if(file == 2){
                    self.selCompressFile();     
                } else {
                    self.clearError('file', self.btfileclass);
                    $('.fileInfo').html(file);
                }
            }        

            if(file == 0 || file == 2){ return false;}
            var url = $('#getUrl').val();
            var id_product = $('#getUrl').data('id');
            var fileSelect = document.getElementById('fileInput');
            var files = fileSelect.files;        
            var formData = new FormData();        
            var file = files[0]; 
            formData.append('arfile', file, file.name);
            formData.append('productid', id_product);
            self.uploadFile(formData);
        });   
        
        
        //--------------------------------------------------------------------------------------- End Of sizeInRealityupload    
        $('#deleteAr').live('click', function(){
            self.sirToken = $('#sirToken').val();
            var sizeInRealitytId = $(this).data('id');
            var productid = $(this).data('productid');
            var model = $(this).data('model');
            self.deleteFile (sizeInRealitytId, productid, model);
        });
        //--------------------------------------------------------------------------------------- End Of sizeInRealitydelete   
        $('.search-input-text').on( 'blur', function () {   // for text boxes

                var column0 = $('.column0').val();
                var column1 = $('.column1').val();
               // if(column0 != '' || column1 != ''){
                    self.dataTable(column0, column1);
               // }    
        });

    },
    
    
    saveButtonSettings: function(getUrl){
        var self = this;
        var postData = { buttonSettings:true, buttontext: $('#buttontext').val(),  buttonfontsize: $('#buttonfontsize').val(),
            buttonfontcolor: $('#buttonfontcolor').val(), buttonbackgroundcolor: $('#buttonbackgroundcolor').val(), 
            buttonbordercolor: $('#buttonbordercolor').val(), buttonverticalsize: $('#buttonverticalsize').val(),
            buttonhorizontalsize: $('#buttonhorizontalsize').val(), buttonbordersize: $('#buttonbordersize').val(),
            buttonborderradius: $('#buttonborderradius').val(), buttonfontweight: $('#buttonfontweight').val()}         
        self.buttonAjax(getUrl, postData);
    },
    
    buttonAjax: function(getUrl,postData){
        var self = this;
        $.ajaxSetup({
            headers: { 'sirToken': self.sirToken }
        });
        $.ajax({
                method: "POST",
                url: getUrl,
                data: postData
        }).done(function( res ) {
            var msg = JSON.parse(res)
            if(msg.status == 1){
                swal('', msg.message, 'success');
            } else if(msg.status == 0){
                swal('', msg.message, 'error');
            }    
            
        }).fail(function(err){
            swal('', 'Oops Someting went wrong!', 'error');
        });
    },
    
    dataTable: function(column0 = null, column1 = null){
        var self = this;
        var getUrl = $('#getUrl').val();
        var arTable = $('#sizeInRealityTable').DataTable({
            "destroy": true,
            "processing": true,
            "serverSide": true,
            "ajax":{
                url : getUrl, 
                type: "post",
                headers: { sirToken: self.sirToken},
                data:{'column0':column0, 'column1':column1, 'sirToken': self.sirToken},
                error: function(){ 
                    $(".sizeInRealityTableError").html("");
                    $("#sizeInRealityTable").append('<tbody class="sizeInRealityTableError"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
                }
            },
                columnDefs: [
            { targets: [1, 2], visible: false}

        ],            
            "columns": [
                {data: 'SNo'},
                {data: 'sizeinrealityid'},
                {data: 'productid'},
                {data: 'productname'},
                {data: 'model'},
                {data: 'actions'},
            ],

        fnRowCallback: function  (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(3) .deleteProd', nRow).on('click', function () {
                    self.deleteFile(aData.sizeinrealityid, aData.productid, aData.model);
                });            
            },
        });
    },
    deleteFile: function(sizeInRealitytId, productid, model){
        var self = this;
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#72C279',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function () {
                var formData = new FormData();        
                formData.append('sizeInRealitytId', sizeInRealitytId);
                formData.append('productid', productid);
                formData.append('model', model);
                self.uploadFile(formData);    
        });     
    } ,    
    uploadFile: function(formData){
        var self = this;
        var url = $('#getUrl').val(); 
        var xhr = new XMLHttpRequest();        
        xhr.open('POST', url, true);
        xhr.setRequestHeader("sirToken", self.sirToken);
        xhr.onload = function () {
          if (xhr.readyState == 4 && xhr.status === 200) {
                $('.fileInfo').html('');
                var res = JSON.parse(xhr.responseText);
                if(res.status == 1){
                    var data = res.data;
                    if(data != null){
                        if(self.page == 'sizeinreality'){
                            //self.sizeInRealityTable.ajax.reload();
                            self.resetForm();
                            $('#fileModal').modal('hide');
                            self.dataTable();
                            swal('', res.message, 'success');
                        }
                        self.buildInfo(data);
                    } else if(data == null){
                        $('#drawtable').html('');
                        self.dataTable();
                    }
                    
                } else if(res.status == 0) {
                    $('.fileInfo').html('');
                    swal('', res.message, 'error');
                }
          } else {
                swal('', 'An error occurred while processing file. Try again', 'error');
          }
        };        
        xhr.send(formData);        
    },
    buildInfo: function(data){
        var table = '';
        table += '<table class="table">';
        table += '<thead>';
        table += '<tr>';
        table += '<th>Product</th>';
        table += '<th>Model</th>';
        table += '<th>Action</th>';
        table += '</tr>';
        table += '</thead>';
        table += '<tbody >';
        table += '<tr>';
        table += '<td style="text-transform: capitalize;" >'+ data.productname + '</td>';
        table += '<td style="text-transform: capitalize;" >'+ data.file + '</td>';
        table += '<td> <a style="cursor:pointer;" data-id="'+ data.sizeInRealityid +'" data-model="' + data.file +  '" data-productid="'+ data.id_product +'" id="deleteAr">';
        table += '<i class="icon-trash"></i> Delete this file</a> </td>';
        table += '</tr>';
        table += '</tbody>';
        table += '</table>';        
        $('#drawtable').html(table);
    },
    resetForm: function(){
        var self = this;
        $('#product').val('').selectpicker('refresh');
        self.file = null;
        var file = $('#fileInput');
        file.wrap('<form>').closest('form').get(0).reset();
        file.unwrap();
        $('.fileInfo').html('');
        $('.errorTxt').html('');
    },
    reloadWindow: function(product){
        location.reload(); // without url parameter
        //window.location.reload(true); // with url parameter   
    },
    validateProduct: function(product){
        if(product == '' || product == null){
            return 0; //empty
        } else {
            return product;
        }
    },
    validateFile: function(file){
        if(file == '' || file == null){
            return 0; //empty
        } else {
            var re = /(?:\.([^.]+))?$/;
            var fileext = re.exec(file);
            if(fileext[0] != '.zip'){
                return 2; //file ext error
            } else {
                return file;
            }
        }        
    },
    fieldRequired: function(name, selector) {
        $(selector).addClass('error');
        var sel = name+'Info';
        $('.'+sel).addClass('errorTxt').text(name.toUpperCase() + ' field is Required');
    },
    clearError: function(name, selector) {
        $(selector).removeClass('error');
        var sel = name+'Info';
        $('.'+sel).removeClass('errorTxt').text('');        
    },
    selCompressFile: function(){
        var self = this;
        $('.fileInfo').html(self.file + ', Upload Zip Only..').addClass('errorTxt');
    },
    
    applyInputBoxBgColor: function(buttonbackgroundcolor){
//        $('#buttonfontcolor').css('background-color': '#'+buttonbackgroundcolor);
//        $('#buttonbackgroundcolor').css('background-color': '#'+buttonbackgroundcolor);
//        $('#buttonbordercolor').css('background-color': '#'+buttonbackgroundcolor);
    }
    
}




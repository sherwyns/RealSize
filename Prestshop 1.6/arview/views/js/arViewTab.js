$( document ).ready(function() {
    
    
    $('#fileInput').live('change', function(){
       var file = document.getElementById("fileInput").files[0].name;
       $('.fileInfo').html(file).removeClass('errorTxt');
    });      
    
    $('#arviewsubmit').live('click', function(){   
        var file = $('.fileInfo').html();
        var resfile = validateFile(file);
        var btfileclass = 'fileUploadLabel';   
        console.log(resfile);
        if(resfile == 0){
            fieldRequired('file', btfileclass);
        } else {
            if(resfile == 2){
                selCompressFile(file);    
            } else {
                clearError('file', btfileclass);
                $('.fileInfo').html(file);
            }
        }        

        if(resfile == 0 || resfile == 2){ return false;}
        
     //   $('.fileInfo').html('Uploading....');
        var url = $('#getUrl').val();
        var id_product = $('#getUrl').data('id');
        var fileSelect = document.getElementById('fileInput');
        // Get the files from the input
        var files = fileSelect.files;        
        // Create a new FormData object.
        var formData = new FormData();        
        var file = files[0]; 
         // Add the file to the request.
        formData.append('arfile', file, file.name);
        formData.append('productid', id_product);
        // Set up the AJAX request.
        var xhr = new XMLHttpRequest();        
        // Open the connection.
        xhr.open('POST', url, true);
        // Set up a handler for when the request finishes.
        xhr.onload = function () {
          if (xhr.readyState == 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                if(data.status == 1){
                    console.log(data.message);  
                    swal('', data.message, 'success');
                } else if(data.status == 0) {
                    console.log(data.message);  
                    swal('', data.message, 'error');
                }
          } else {
                swal('', 'An error occurred while uploading the file. Try again', 'error');
          }
        };        
        // Send the Data.
        xhr.send(formData);         

    });
    
    
    
    $('#deleteAr').live('click', function(){
        
        var arViewtId = $(this).data('id');
        var productid = $(this).data('productid');
        var model = $(this).data('model');
        
        deleteProd (arViewtId, productid, model);
    });
    
    
   
    
});


function deleteProd(arViewtId, productid, model){
    var url = $('#getUrl').val();
    console.log(url);
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
            formData.append('arViewtId', arViewtId);
            formData.append('productid', productid);
            formData.append('model', model);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.onload = function () {
          //  var data = "arViewtId=arViewtId&productid=productid&model=model";    
              if (xhr.readyState == 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                //console.log(data);
                if(data.status == 1){
                    //console.log(data.message);  
                    swal('', data.message, 'success');
                } else if(data.status == 0) {
                    //console.log(data.message);  
                    swal('', data.message, 'error');
                }
              } else {
                    swal('', 'An error occurred while remove file. Try again', 'error');
              }
            };        
            // Send the Data.
            xhr.send(formData);     
    });     
          
    

} 

function validateFile(file){
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
 }


function fieldRequired(name, selector) {
    $(selector).addClass('error');
    var sel = name+'Info';
    $('.'+sel).addClass('errorTxt').text(name.toUpperCase()  + ' field is Required');   
}

function selCompressFile(file) {
    $('.fileInfo').html(file + ', Upload Zip Only..').addClass('errorTxt');
}

function clearError (name, selector) {
     $(selector).removeClass('error');
     var sel = name+'Info';
     $('.'+sel).removeClass('errorTxt').text('');        
}



window.onload = function(){
    
    var sirScript = (function(){

        //cacheData
        var sizeInRealityBut = $('#sizeinreality');
        var myModalWindow = $('#myModal');
        var myModalWindowClose = $('#myModalClose');

        //Events
        sizeInRealityBut.on('click', openSizeInReality);   
        myModalWindowClose.on('click', closeSizeInReality);
        
        //Invoke Function onInit
//        function getButtonSettings(){
//            var borderRadius = $('#getButtonSettings').data('borderradius')
//            
//            sizeInRealityBut.css({"border-radius": borderRadius+'px', "font-size": "200%"});; 
//        };

        function checkCompatibility(){
            if(!sir.mobileCompat()){
                sizeInRealityBut.hide();
            }   
        };

        function openSizeInReality(){
            myModalWindow.css('display', 'block');
            render(sizeInRealityBut.data('filepath'), sizeInRealityBut.data('file')).then(function(res){
                setTimeout(function(){
                    $('#arobj').contents().find('body').append(res);
                }, 1000); 
            }, function(errorRes){ 
               console.log(errorRes); 
            });
        };

        function render(filepath, file){
            return new Promise(function(resolve, reject) {
                var render = sir.render(filepath, file);
                if(render){
                    $("#modalContent").html("<iframe id='arobj' src='http://localhost/sir/index.html' style='width:100%;height:100%;'></iframe>");   
                    resolve(render)
                }  else {
                    reject(false)
                }
            });
        };

        function closeSizeInReality(){
            myModalWindow.css('display', 'none');
            window.location.reload(true);        
        }

        return {
            getButtonSettings: getButtonSettings,
            checkCompatibility: checkCompatibility
            
        }

    })();
    
   // sirScript.getButtonSettings();
    sirScript.checkCompatibility();
    
};





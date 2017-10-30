window.onload = function(){
    
    var sirScript = (function(){
        //Step1: caching
        
        var screenWidth = $(window).width();
        var screenHeight = $(window).height();
        var canvas = $('canvas');
        var sizeInRealityBut = $('#sizeinreality');
        var myModalWindow = $('#myModal');
        var myModalWindowClose = $('#myModalClose');

        
        var height =  (($('#image-block').outerHeight(true) - $('#image-block').height()) + sizeInRealityBut.outerHeight(true)) * -1;
        console.log(height);
        $('#image-block').after(sizeInRealityBut);
        sizeInRealityBut.css('top', height);
        sizeInRealityBut.css('display', 'block');
        
        //Events
        sizeInRealityBut.on('click', openSizeInReality);   
        myModalWindowClose.on('click', closeSizeInReality);

        myModalWindow.css({'width': screenWidth, 'height': screenHeight});
        
        //Step2: Private Method
        function checkCompatibility(){
            if(!sir.isARCompatible()){
                sizeInRealityBut.hide();
            }   
        };
        
        function openSizeInReality(){
            myModalWindow.css('display', 'block');
            sir.Render({containerId: 'modalContent', objectUrl: sizeInRealityBut.data('filepath'), modelName: sizeInRealityBut.data('file')});
            setTimeout(function(){
                $('canvas').css('display', 'block');
            }, 2000);             
        };


        function closeSizeInReality(){
            myModalWindow.css('display', 'none');
            window.location.reload(true); 
//            sir.closeArView('modalContent');
        }

        //Step3: Public Method
        return {
            checkCompatibility: checkCompatibility
        }

    })();
    
    sirScript.checkCompatibility();
    
};









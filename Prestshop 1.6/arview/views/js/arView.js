window.onload = function(){
    window.arview = new arView();
}

var arView = function () {
    this.init();
}

arView.prototype = {
    domain: location.protocol + '//' + location.host,
    init: function(){
         var self = this;
         $('#arview').on('click', self.openArView);   
         $('.myModalClose').on('click', self.closeArView);   
    },
    
    openArView: function(){
       
        var model = $(this).data('file');
          var domain = location.protocol + '//' + location.host;
          $('#myModal').css('display', 'block');
            var file = $('#arview').data('file');
            var obj = domain+'/arshop6/modules/arview/AR/model/'+file+'/'+file+'.obj';
            var mtl = domain+'/arshop6/modules/arview/AR/model/'+file+'/'+file+'.mtl';
            
            if(file == 'Diffuser_Bamboo'){
                var position = "0 0 0";
            } else {
                var position = "-0.8 3.5 -2";    
            }
            
            var scale = '0.01 0.01 0.01';
            var content = '';

            content += "<a-scene id='scene' embedded artoolkit='sourceType: webcam;'>";
            content += "<a-assets>";
            content += "<a-asset-item id='car-obj' src='"+obj+"'></a-asset-item>";
            content += "<a-asset-item id='car-mtl' src='"+mtl+"'></a-asset-item>";
            content += "</a-assets>";
            content += "<a-obj-model  src='#car-obj' mtl='#car-mtl' position='"+position+"' scale='"+scale+"' look-controls='reverseMouseDrag:true'>	</a-obj-model>";		
            content += "<a-marker-camera preset='hiro'></a-marker-camera>"; 
            content += "</a-scene>";

            $("#modalContent").html("<iframe id='arobj' src='modules/arview/AR/index.html' style='width:100%;height:100%;'></iframe>");
            setTimeout(function(){
                $('#arobj').contents().find('#scene').html(content);
            }, 1000);
    },
    closeArView: function(){
        $('#myModal').css('display', 'none');
        window.location.reload(true);
    }
    
    
}







class Sir{
    
    constructor(){

    }      
    render(path,file) {
        var content:string = '';
        content += "<a-scene id='scene' embedded artoolkit='sourceType: webcam;'>";
        content += "<a-entity camera position='0 1.6 10'></a-entity>";
        content += "<a-assets>";
        content += "<a-asset-item id='car-obj' src='" + path + "/" + file + "/" + file +".obj'></a-asset-item>";
        content += "<a-asset-item id='car-mtl' src='" + path + "/" + file + "/" + file +".mtl'></a-asset-item>";
        content += "</a-assets>";
        content += "<a-entity look-controls='reverseMouseDrag:true'>";
        content += "<a-obj-model  src='#car-obj' mtl='#car-mtl' position='0 1 0' scale='0.3 0.3 0.3'>	</a-obj-model>";
        content += "</a-entity>";		
        content += "</a-scene>";
        return content;
    } 
    
    markerrender(path,file){
        var content:string = '';
        content += "<a-scene id='scene' embedded artoolkit='sourceType: webcam;'>";
        content += "<a-assets>";
        content += "<a-asset-item id='car-obj' src='" + path + "/" + file + "/" + file +".obj'></a-asset-item>";
        content += "<a-asset-item id='car-mtl' src='" + path + "/" + file + "/" + file +".mtl'></a-asset-item>";
        content += "</a-assets>";
        content += "<a-entity look-controls='reverseMouseDrag:true'>";
        content += "<a-obj-model  src='#car-obj' mtl='#car-mtl' position='0 0 0' scale='0.3 0.3 0.3'>	</a-obj-model>";
        content += "</a-entity>";		
        content += "<a-marker-camera preset='hiro' markersAreaEnabled='false'></a-marker-camera>";
        content += "</a-scene>";
         content += "<div id='btn' style='padding: 50px;position: absolute;bottom: 0;'> <button id='markerlessbtn' style='padding: 8px;opacity: 0.8;cursor:pointer;'>Markerless-based AR</button></div>   ";
        return content;
    }

   

    public hasUserMedia(){
        return !!(navigator.getUserMedia);       
    }

    mobileCompat(){
        if(this.hasUserMedia()){
                 return true;
        }
        else{
                return false;
        }
    }

}

var sirobj = new Sir();
(<any>window).sir = sirobj;
var path ="http://localhost/arshop6/modules/arview/ar/models/";
var file ="Rayman3";
document.getElementById("sircontent").innerHTML = sirobj.render(path, file);





window.onload = () =>
{
    
    sirobj.mobileCompat();

     

     var markerclick = <HTMLButtonElement>document.getElementById("markerbtn");
     markerclick.onclick = function (){
       document.getElementById("sircontent").innerHTML = sirobj.markerrender(path,file);
       
        var markerlessclick = <HTMLButtonElement>document.getElementById("markerlessbtn");
      //  console.log(markerlessclick);
        
        markerlessclick.onclick = function (){
            location.reload();
        }
       
       
     } 
     
};


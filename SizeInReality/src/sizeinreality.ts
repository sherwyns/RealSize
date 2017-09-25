class Sir{
    
    constructor(){

    }      
    render() {
        var content:string = '';
        content += "<a-scene id='scene' embedded artoolkit='sourceType: webcam;'>";
        content += "<a-entity camera position='0 1.6 10'></a-entity>";
        content += "<a-assets>";
        content += "<a-asset-item id='car-obj' src='./model/Rayman3/Rayman3.obj'></a-asset-item>";
        content += "<a-asset-item id='car-mtl' src='./model/Rayman3/Rayman3.mtl'></a-asset-item>";
        content += "</a-assets>";
        content += "<a-entity look-controls='reverseMouseDrag:true'>";
        content += "<a-obj-model  src='#car-obj' mtl='#car-mtl' position='0 1 0' scale='0.3 0.3 0.3'>	</a-obj-model>";
        content += "</a-entity>";		
        content += "</a-scene>";
        return content;
    } 

    onclick(btnclick){
           btnclick.style.display = "none";
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
document.body.innerHTML = sirobj.render();

sirobj.mobileCompat();

window.onload = () =>
{
    var obj =new Sir();
    var btnclick = <HTMLButtonElement>document.getElementsByTagName("BODY")[0];
    btnclick.onclick = function (){
        obj.onclick(btnclick);
    }
};
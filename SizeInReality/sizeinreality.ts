
class sir{
    render(){
        var content:string = '';
        content += "<a-scene id='scene' embedded artoolkit='sourceType: webcam;'>";
        content += "<a-entity position='0 1.6 10'></a-entity>";
        content += "<a-assets>";
        content += "<a-asset-item id='car-obj' src='https://www.incensesticks.com/modules/arview/AR/model/Rayman3/Rayman3.obj'></a-asset-item>";
        content += "<a-asset-item id='car-mtl' src='https://www.incensesticks.com/modules/arview/AR/model/Rayman3/Rayman3.mtl'></a-asset-item>";
        content += "</a-assets>";
        content += "<a-obj-model  src='#car-obj' mtl='#car-mtl' position='0 1 0' scale='0.3 0.3 0.3' look-controls='reverseMouseDrag:true'>	</a-obj-model>";		
        content += "</a-scene>";

    }
}
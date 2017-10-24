var Sir = /** @class */ (function () {
    /**
     * Used to set the value of the _isARCompatible variable based on the browser's capability to render AR models.
     */
    function Sir() {
        this.cameraPosition = "0 0 15";
        this.modelPosition = "0 0 0";
        this.modelScale = "0.5 0.5 0.5";
    }
    Sir.prototype.isARCompatible = function () {
        return this.hasUserMedia();
    };
    /**
         * Input Parameter: inputJsonObject
         * Properties
         * containerId: string - The 'id' value of the dom element in which the AR View has to be appended. Eg: sirContentPane
         * objectUrl: string - The path in which the Object(.obj) file of the object being rendered is placed. Eg: model/Rayman3/Rayman3.obj
         * materialUrl: string - The path in which the Material(.mtl) file of the object being rendered is placed. Eg: model/Rayman3/Rayman3.mtl
         * modelName: string - The asset id name that will be given for the object being rendered. When it is not given, a default value will be given. Eg: Rayman
         * cameraPosition: string - The position of the camera when the scene is rendered. It is a X Y Z value. Eg: 0 0 10. This example, the camera is placed at X = 0, Y = 0 and Z = 10
         * modelPosition: string - The position of the model when the scene is rendered. It is a X Y Z value. Eg: 0 0 0. This example, the model is placed at X = 0, Y = 0 and Z = 0
         * modelScale: string - The scale of the model when the scene is rendered. It is a X Y Z value. Eg: 1 1 1. This example, the object is at the normal scale at X = 1, Y = 1 and Z = 1
         * marker: string - If the object has to be rendered on a marker, the value should denote the marker name. Eg: hiro
         */
    Sir.prototype.Render = function (inputJsonObject) {
        var container = document.getElementById(inputJsonObject.containerId);
        if (container === undefined) {
            console.log('SIR Log: DOM Object not found. Cannot attach the render to a non existing dom.');
            return;
        }
        if (inputJsonObject.objectUrl === undefined) {
            console.log('SIR Log: No object URL passed. Cannot attach the render without object URL.');
            return;
        }
        // ObjURL and MtlURL file check verification needs to be done.
        if (inputJsonObject.modelName === undefined) {
            console.log('SIR Log: No model name specified. Using the default model name - Object.');
            inputJsonObject.modelName = 'SIR';
        }
        if (inputJsonObject.cameraPosition === undefined)
            inputJsonObject.cameraPosition = this.cameraPosition;
        if (inputJsonObject.modelPosition === undefined)
            inputJsonObject.modelPosition = this.modelPosition;
        if (inputJsonObject.modelScale === undefined)
            inputJsonObject.modelScale = this.modelScale;
        var content = '';
        content += "<a-scene id='scene' embedded artoolkit='sourceType: webcam;'>";
        content += "<a-entity camera position='" + inputJsonObject.cameraPosition + "'></a-entity>";
        content += "<a-assets>";
        content += "<a-asset-item id='" + inputJsonObject.modelName + "-obj' src='" + inputJsonObject.objectUrl + "/" + inputJsonObject.modelName + "/" + inputJsonObject.modelName + ".obj'></a-asset-item>";
        content += "<a-asset-item id='" + inputJsonObject.modelName + "-mtl' src='" + inputJsonObject.objectUrl + "/" + inputJsonObject.modelName + "/" + inputJsonObject.modelName + ".mtl'></a-asset-item>";
        content += "</a-assets>";
        content += "<a-entity look-controls='reverseMouseDrag:true'>";
        content += "<a-obj-model  src='#" + inputJsonObject.modelName + "-obj' mtl='#" + inputJsonObject.modelName + "-mtl' position='" + inputJsonObject.modelPosition + "' scale='" + inputJsonObject.modelScale + "'>";
        content += "</a-obj-model>";
        content += "</a-entity>";
        if (inputJsonObject.marker !== undefined) {
            content += "<a-marker-camera preset='" + inputJsonObject.marker + "' markersAreaEnabled='false'></a-marker-camera>";
        }
        content += "</a-scene>";
        container.innerHTML = content;
    };
    Sir.prototype.closeArView = function (containerId) {
        var container = document.getElementById(containerId);
        if (container === undefined) {
            console.log('SIR Log: DOM Object not found. Cannot dettach camera and object from a non existing dom.');
            return;
        }
        // remove the object and scene
        container.removeChild(container.children[0]);
        // remove the camera render
        document.getElementsByTagName('video')[0].remove();
        // set dom object to empty
        container.innerHTML = '';
    };
    Sir.prototype.hasUserMedia = function () {
        return !!(navigator.getUserMedia);
    };
    return Sir;
}());
window.sir = new Sir();

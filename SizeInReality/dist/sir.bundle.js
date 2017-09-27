/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./src/sizeinreality.js ***!
  \******************************/
/***/ (function(module, exports) {

eval("var Sir = /** @class */ (function () {\r\n    function Sir() {\r\n    }\r\n    Sir.prototype.render = function (path, file) {\r\n        var content = '';\r\n        content += \"<a-scene id='scene' embedded artoolkit='sourceType: webcam;'>\";\r\n        content += \"<a-entity camera position='0 1.6 10'></a-entity>\";\r\n        content += \"<a-assets>\";\r\n        content += \"<a-asset-item id='car-obj' src='\" + path + \"/\" + file + \"/\" + file + \".obj'></a-asset-item>\";\r\n        content += \"<a-asset-item id='car-mtl' src='\" + path + \"/\" + file + \"/\" + file + \".mtl'></a-asset-item>\";\r\n        content += \"</a-assets>\";\r\n        content += \"<a-entity look-controls='reverseMouseDrag:true'>\";\r\n        content += \"<a-obj-model  src='#car-obj' mtl='#car-mtl' position='0 1 0' scale='0.3 0.3 0.3'>\t</a-obj-model>\";\r\n        content += \"</a-entity>\";\r\n        content += \"</a-scene>\";\r\n        return content;\r\n    };\r\n    Sir.prototype.markerrender = function (path, file) {\r\n        var content = '';\r\n        content += \"<a-scene id='scene' embedded artoolkit='sourceType: webcam;'>\";\r\n        content += \"<a-assets>\";\r\n        content += \"<a-asset-item id='car-obj' src='\" + path + \"/\" + file + \"/\" + file + \".obj'></a-asset-item>\";\r\n        content += \"<a-asset-item id='car-mtl' src='\" + path + \"/\" + file + \"/\" + file + \".mtl'></a-asset-item>\";\r\n        content += \"</a-assets>\";\r\n        content += \"<a-entity look-controls='reverseMouseDrag:true'>\";\r\n        content += \"<a-obj-model  src='#car-obj' mtl='#car-mtl' position='0 0 0' scale='0.3 0.3 0.3'>\t</a-obj-model>\";\r\n        content += \"</a-entity>\";\r\n        content += \"<a-marker-camera preset='hiro' markersAreaEnabled='false'></a-marker-camera>\";\r\n        content += \"</a-scene>\";\r\n        content += \"<div id='btn' style='padding: 50px;position: absolute;bottom: 0;'> <button id='markerlessbtn' style='padding: 8px;opacity: 0.8;cursor:pointer;'>Markerless-based AR</button></div>   \";\r\n        return content;\r\n    };\r\n    Sir.prototype.hasUserMedia = function () {\r\n        return !!(navigator.getUserMedia);\r\n    };\r\n    Sir.prototype.mobileCompat = function () {\r\n        if (this.hasUserMedia()) {\r\n            return true;\r\n        }\r\n        else {\r\n            return false;\r\n        }\r\n    };\r\n    return Sir;\r\n}());\r\nvar sirobj = new Sir();\r\nwindow.sir = sirobj;\r\nvar path = \"http://localhost/arshop6/modules/arview/ar/models/\";\r\nvar file = \"Rayman3\";\r\ndocument.getElementById(\"sircontent\").innerHTML = sirobj.render(path, file);\r\nwindow.onload = function () {\r\n    sirobj.mobileCompat();\r\n    var markerclick = document.getElementById(\"markerbtn\");\r\n    markerclick.onclick = function () {\r\n        document.getElementById(\"sircontent\").innerHTML = sirobj.markerrender(path, file);\r\n        var markerlessclick = document.getElementById(\"markerlessbtn\");\r\n        //  console.log(markerlessclick);\r\n        markerlessclick.onclick = function () {\r\n            location.reload();\r\n        };\r\n    };\r\n};\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zaXplaW5yZWFsaXR5LmpzP2Y0ZDQiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIFNpciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFNpcigpIHtcclxuICAgIH1cclxuICAgIFNpci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHBhdGgsIGZpbGUpIHtcclxuICAgICAgICB2YXIgY29udGVudCA9ICcnO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCI8YS1zY2VuZSBpZD0nc2NlbmUnIGVtYmVkZGVkIGFydG9vbGtpdD0nc291cmNlVHlwZTogd2ViY2FtOyc+XCI7XHJcbiAgICAgICAgY29udGVudCArPSBcIjxhLWVudGl0eSBjYW1lcmEgcG9zaXRpb249JzAgMS42IDEwJz48L2EtZW50aXR5PlwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCI8YS1hc3NldHM+XCI7XHJcbiAgICAgICAgY29udGVudCArPSBcIjxhLWFzc2V0LWl0ZW0gaWQ9J2Nhci1vYmonIHNyYz0nXCIgKyBwYXRoICsgXCIvXCIgKyBmaWxlICsgXCIvXCIgKyBmaWxlICsgXCIub2JqJz48L2EtYXNzZXQtaXRlbT5cIjtcclxuICAgICAgICBjb250ZW50ICs9IFwiPGEtYXNzZXQtaXRlbSBpZD0nY2FyLW10bCcgc3JjPSdcIiArIHBhdGggKyBcIi9cIiArIGZpbGUgKyBcIi9cIiArIGZpbGUgKyBcIi5tdGwnPjwvYS1hc3NldC1pdGVtPlwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCI8L2EtYXNzZXRzPlwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCI8YS1lbnRpdHkgbG9vay1jb250cm9scz0ncmV2ZXJzZU1vdXNlRHJhZzp0cnVlJz5cIjtcclxuICAgICAgICBjb250ZW50ICs9IFwiPGEtb2JqLW1vZGVsICBzcmM9JyNjYXItb2JqJyBtdGw9JyNjYXItbXRsJyBwb3NpdGlvbj0nMCAxIDAnIHNjYWxlPScwLjMgMC4zIDAuMyc+XHQ8L2Etb2JqLW1vZGVsPlwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCI8L2EtZW50aXR5PlwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCI8L2Etc2NlbmU+XCI7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICB9O1xyXG4gICAgU2lyLnByb3RvdHlwZS5tYXJrZXJyZW5kZXIgPSBmdW5jdGlvbiAocGF0aCwgZmlsZSkge1xyXG4gICAgICAgIHZhciBjb250ZW50ID0gJyc7XHJcbiAgICAgICAgY29udGVudCArPSBcIjxhLXNjZW5lIGlkPSdzY2VuZScgZW1iZWRkZWQgYXJ0b29sa2l0PSdzb3VyY2VUeXBlOiB3ZWJjYW07Jz5cIjtcclxuICAgICAgICBjb250ZW50ICs9IFwiPGEtYXNzZXRzPlwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCI8YS1hc3NldC1pdGVtIGlkPSdjYXItb2JqJyBzcmM9J1wiICsgcGF0aCArIFwiL1wiICsgZmlsZSArIFwiL1wiICsgZmlsZSArIFwiLm9iaic+PC9hLWFzc2V0LWl0ZW0+XCI7XHJcbiAgICAgICAgY29udGVudCArPSBcIjxhLWFzc2V0LWl0ZW0gaWQ9J2Nhci1tdGwnIHNyYz0nXCIgKyBwYXRoICsgXCIvXCIgKyBmaWxlICsgXCIvXCIgKyBmaWxlICsgXCIubXRsJz48L2EtYXNzZXQtaXRlbT5cIjtcclxuICAgICAgICBjb250ZW50ICs9IFwiPC9hLWFzc2V0cz5cIjtcclxuICAgICAgICBjb250ZW50ICs9IFwiPGEtZW50aXR5IGxvb2stY29udHJvbHM9J3JldmVyc2VNb3VzZURyYWc6dHJ1ZSc+XCI7XHJcbiAgICAgICAgY29udGVudCArPSBcIjxhLW9iai1tb2RlbCAgc3JjPScjY2FyLW9iaicgbXRsPScjY2FyLW10bCcgcG9zaXRpb249JzAgMCAwJyBzY2FsZT0nMC4zIDAuMyAwLjMnPlx0PC9hLW9iai1tb2RlbD5cIjtcclxuICAgICAgICBjb250ZW50ICs9IFwiPC9hLWVudGl0eT5cIjtcclxuICAgICAgICBjb250ZW50ICs9IFwiPGEtbWFya2VyLWNhbWVyYSBwcmVzZXQ9J2hpcm8nIG1hcmtlcnNBcmVhRW5hYmxlZD0nZmFsc2UnPjwvYS1tYXJrZXItY2FtZXJhPlwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCI8L2Etc2NlbmU+XCI7XHJcbiAgICAgICAgY29udGVudCArPSBcIjxkaXYgaWQ9J2J0bicgc3R5bGU9J3BhZGRpbmc6IDUwcHg7cG9zaXRpb246IGFic29sdXRlO2JvdHRvbTogMDsnPiA8YnV0dG9uIGlkPSdtYXJrZXJsZXNzYnRuJyBzdHlsZT0ncGFkZGluZzogOHB4O29wYWNpdHk6IDAuODtjdXJzb3I6cG9pbnRlcjsnPk1hcmtlcmxlc3MtYmFzZWQgQVI8L2J1dHRvbj48L2Rpdj4gICBcIjtcclxuICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH07XHJcbiAgICBTaXIucHJvdG90eXBlLmhhc1VzZXJNZWRpYSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gISEobmF2aWdhdG9yLmdldFVzZXJNZWRpYSk7XHJcbiAgICB9O1xyXG4gICAgU2lyLnByb3RvdHlwZS5tb2JpbGVDb21wYXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzVXNlck1lZGlhKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBTaXI7XHJcbn0oKSk7XHJcbnZhciBzaXJvYmogPSBuZXcgU2lyKCk7XHJcbndpbmRvdy5zaXIgPSBzaXJvYmo7XHJcbnZhciBwYXRoID0gXCJodHRwOi8vbG9jYWxob3N0L2Fyc2hvcDYvbW9kdWxlcy9hcnZpZXcvYXIvbW9kZWxzL1wiO1xyXG52YXIgZmlsZSA9IFwiUmF5bWFuM1wiO1xyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpcmNvbnRlbnRcIikuaW5uZXJIVE1MID0gc2lyb2JqLnJlbmRlcihwYXRoLCBmaWxlKTtcclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHNpcm9iai5tb2JpbGVDb21wYXQoKTtcclxuICAgIHZhciBtYXJrZXJjbGljayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFya2VyYnRuXCIpO1xyXG4gICAgbWFya2VyY2xpY2sub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpcmNvbnRlbnRcIikuaW5uZXJIVE1MID0gc2lyb2JqLm1hcmtlcnJlbmRlcihwYXRoLCBmaWxlKTtcclxuICAgICAgICB2YXIgbWFya2VybGVzc2NsaWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXJrZXJsZXNzYnRuXCIpO1xyXG4gICAgICAgIC8vICBjb25zb2xlLmxvZyhtYXJrZXJsZXNzY2xpY2spO1xyXG4gICAgICAgIG1hcmtlcmxlc3NjbGljay5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2l6ZWlucmVhbGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ })
/******/ ]);
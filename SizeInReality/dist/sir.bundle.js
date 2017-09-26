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

eval("var Sir = /** @class */ (function () {\r\n    function Sir() {\r\n    }\r\n    Sir.prototype.render = function () {\r\n        var content = '';\r\n        content += \"<a-scene id='scene' embedded artoolkit='sourceType: webcam;'>\";\r\n        content += \"<a-entity camera position='0 1.6 10'></a-entity>\";\r\n        content += \"<a-assets>\";\r\n        content += \"<a-asset-item id='car-obj' src='./model/Rayman3/Rayman3.obj'></a-asset-item>\";\r\n        content += \"<a-asset-item id='car-mtl' src='./model/Rayman3/Rayman3.mtl'></a-asset-item>\";\r\n        content += \"</a-assets>\";\r\n        content += \"<a-entity look-controls='reverseMouseDrag:true'>\";\r\n        content += \"<a-obj-model  src='#car-obj' mtl='#car-mtl' position='0 1 0' scale='0.3 0.3 0.3'>\t</a-obj-model>\";\r\n        content += \"</a-entity>\";\r\n        content += \"</a-scene>\";\r\n        return content;\r\n    };\r\n    Sir.prototype.markerrender = function (domain, file) {\r\n        var content = '';\r\n        content += \"<a-scene id='scene' embedded artoolkit='sourceType: webcam;'>\";\r\n        content += \"<a-assets>\";\r\n        content += \"<a-asset-item id='car-obj' src='\" + domain + \"/model/\" + file + \"/\" + file + \".obj'></a-asset-item>\";\r\n        content += \"<a-asset-item id='car-mtl' src='\" + domain + \"/model/\" + file + \"/\" + file + \".mtl'></a-asset-item>\";\r\n        content += \"</a-assets>\";\r\n        content += \"<a-entity look-controls='reverseMouseDrag:true'>\";\r\n        content += \"<a-obj-model  src='#car-obj' mtl='#car-mtl' position='0 0 0' scale='0.3 0.3 0.3'>\t</a-obj-model>\";\r\n        content += \"</a-entity>\";\r\n        content += \"<a-marker-camera preset='hiro' markersAreaEnabled='false'></a-marker-camera>\";\r\n        content += \"</a-scene>\";\r\n        return content;\r\n    };\r\n    Sir.prototype.onclick = function (close) {\r\n        //  close.style.display = \"none\";\r\n        location.reload();\r\n    };\r\n    Sir.prototype.hasUserMedia = function () {\r\n        return !!(navigator.getUserMedia);\r\n    };\r\n    Sir.prototype.mobileCompat = function () {\r\n        if (this.hasUserMedia()) {\r\n            return true;\r\n        }\r\n        else {\r\n            return false;\r\n        }\r\n    };\r\n    return Sir;\r\n}());\r\nvar sirobj = new Sir();\r\ndocument.body.innerHTML = sirobj.render();\r\nsirobj.mobileCompat();\r\nwindow.onload = function () {\r\n    var obj = new Sir();\r\n    var close = document.getElementsByTagName(\"BODY\")[0];\r\n    var btnclick = document.getElementById(\"close\");\r\n    btnclick.onclick = function () {\r\n        obj.onclick(close);\r\n    };\r\n    var markerclick = document.getElementById(\"btn\");\r\n    markerclick.onclick = function () {\r\n        document.body.innerHTML = sirobj.markerrender(\"http://localhost/SizeInReality\", \"Rayman3\");\r\n        //obj.markerrender(\"http://localhost/SizeInReality\",\"Rayman3\");\r\n    };\r\n};\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zaXplaW5yZWFsaXR5LmpzP2Y0ZDQiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIFNpciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFNpcigpIHtcclxuICAgIH1cclxuICAgIFNpci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjb250ZW50ID0gJyc7XHJcbiAgICAgICAgY29udGVudCArPSBcIjxhLXNjZW5lIGlkPSdzY2VuZScgZW1iZWRkZWQgYXJ0b29sa2l0PSdzb3VyY2VUeXBlOiB3ZWJjYW07Jz5cIjtcclxuICAgICAgICBjb250ZW50ICs9IFwiPGEtZW50aXR5IGNhbWVyYSBwb3NpdGlvbj0nMCAxLjYgMTAnPjwvYS1lbnRpdHk+XCI7XHJcbiAgICAgICAgY29udGVudCArPSBcIjxhLWFzc2V0cz5cIjtcclxuICAgICAgICBjb250ZW50ICs9IFwiPGEtYXNzZXQtaXRlbSBpZD0nY2FyLW9iaicgc3JjPScuL21vZGVsL1JheW1hbjMvUmF5bWFuMy5vYmonPjwvYS1hc3NldC1pdGVtPlwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCI8YS1hc3NldC1pdGVtIGlkPSdjYXItbXRsJyBzcmM9Jy4vbW9kZWwvUmF5bWFuMy9SYXltYW4zLm10bCc+PC9hLWFzc2V0LWl0ZW0+XCI7XHJcbiAgICAgICAgY29udGVudCArPSBcIjwvYS1hc3NldHM+XCI7XHJcbiAgICAgICAgY29udGVudCArPSBcIjxhLWVudGl0eSBsb29rLWNvbnRyb2xzPSdyZXZlcnNlTW91c2VEcmFnOnRydWUnPlwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCI8YS1vYmotbW9kZWwgIHNyYz0nI2Nhci1vYmonIG10bD0nI2Nhci1tdGwnIHBvc2l0aW9uPScwIDEgMCcgc2NhbGU9JzAuMyAwLjMgMC4zJz5cdDwvYS1vYmotbW9kZWw+XCI7XHJcbiAgICAgICAgY29udGVudCArPSBcIjwvYS1lbnRpdHk+XCI7XHJcbiAgICAgICAgY29udGVudCArPSBcIjwvYS1zY2VuZT5cIjtcclxuICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH07XHJcbiAgICBTaXIucHJvdG90eXBlLm1hcmtlcnJlbmRlciA9IGZ1bmN0aW9uIChkb21haW4sIGZpbGUpIHtcclxuICAgICAgICB2YXIgY29udGVudCA9ICcnO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCI8YS1zY2VuZSBpZD0nc2NlbmUnIGVtYmVkZGVkIGFydG9vbGtpdD0nc291cmNlVHlwZTogd2ViY2FtOyc+XCI7XHJcbiAgICAgICAgY29udGVudCArPSBcIjxhLWFzc2V0cz5cIjtcclxuICAgICAgICBjb250ZW50ICs9IFwiPGEtYXNzZXQtaXRlbSBpZD0nY2FyLW9iaicgc3JjPSdcIiArIGRvbWFpbiArIFwiL21vZGVsL1wiICsgZmlsZSArIFwiL1wiICsgZmlsZSArIFwiLm9iaic+PC9hLWFzc2V0LWl0ZW0+XCI7XHJcbiAgICAgICAgY29udGVudCArPSBcIjxhLWFzc2V0LWl0ZW0gaWQ9J2Nhci1tdGwnIHNyYz0nXCIgKyBkb21haW4gKyBcIi9tb2RlbC9cIiArIGZpbGUgKyBcIi9cIiArIGZpbGUgKyBcIi5tdGwnPjwvYS1hc3NldC1pdGVtPlwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCI8L2EtYXNzZXRzPlwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCI8YS1lbnRpdHkgbG9vay1jb250cm9scz0ncmV2ZXJzZU1vdXNlRHJhZzp0cnVlJz5cIjtcclxuICAgICAgICBjb250ZW50ICs9IFwiPGEtb2JqLW1vZGVsICBzcmM9JyNjYXItb2JqJyBtdGw9JyNjYXItbXRsJyBwb3NpdGlvbj0nMCAwIDAnIHNjYWxlPScwLjMgMC4zIDAuMyc+XHQ8L2Etb2JqLW1vZGVsPlwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCI8L2EtZW50aXR5PlwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCI8YS1tYXJrZXItY2FtZXJhIHByZXNldD0naGlybycgbWFya2Vyc0FyZWFFbmFibGVkPSdmYWxzZSc+PC9hLW1hcmtlci1jYW1lcmE+XCI7XHJcbiAgICAgICAgY29udGVudCArPSBcIjwvYS1zY2VuZT5cIjtcclxuICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH07XHJcbiAgICBTaXIucHJvdG90eXBlLm9uY2xpY2sgPSBmdW5jdGlvbiAoY2xvc2UpIHtcclxuICAgICAgICAvLyAgY2xvc2Uuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgfTtcclxuICAgIFNpci5wcm90b3R5cGUuaGFzVXNlck1lZGlhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAhIShuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKTtcclxuICAgIH07XHJcbiAgICBTaXIucHJvdG90eXBlLm1vYmlsZUNvbXBhdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNVc2VyTWVkaWEoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFNpcjtcclxufSgpKTtcclxudmFyIHNpcm9iaiA9IG5ldyBTaXIoKTtcclxuZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBzaXJvYmoucmVuZGVyKCk7XHJcbnNpcm9iai5tb2JpbGVDb21wYXQoKTtcclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBvYmogPSBuZXcgU2lyKCk7XHJcbiAgICB2YXIgY2xvc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkJPRFlcIilbMF07XHJcbiAgICB2YXIgYnRuY2xpY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlXCIpO1xyXG4gICAgYnRuY2xpY2sub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBvYmoub25jbGljayhjbG9zZSk7XHJcbiAgICB9O1xyXG4gICAgdmFyIG1hcmtlcmNsaWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5cIik7XHJcbiAgICBtYXJrZXJjbGljay5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gc2lyb2JqLm1hcmtlcnJlbmRlcihcImh0dHA6Ly9sb2NhbGhvc3QvU2l6ZUluUmVhbGl0eVwiLCBcIlJheW1hbjNcIik7XHJcbiAgICAgICAgLy9vYmoubWFya2VycmVuZGVyKFwiaHR0cDovL2xvY2FsaG9zdC9TaXplSW5SZWFsaXR5XCIsXCJSYXltYW4zXCIpO1xyXG4gICAgfTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2l6ZWlucmVhbGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ })
/******/ ]);
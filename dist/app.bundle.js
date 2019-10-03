/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/AppConfig.js","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/AppConfig.js":
/*!**************************!*\
  !*** ./src/AppConfig.js ***!
  \**************************/
/*! exports provided: app, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "app", function() { return app; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppCtrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppCtrl */ "./src/AppCtrl.js");


__webpack_require__(/*! angular-animate */ "./node_modules/angular-animate/index.js");
__webpack_require__(/*! angular-material */ "./node_modules/angular-material/index.js");
__webpack_require__(/*! angular-messages */ "./node_modules/angular-messages/index.js");
__webpack_require__(/*! angular-resource */ "./node_modules/angular-resource/index.js");
__webpack_require__(/*! angular-sanitize */ "./node_modules/angular-sanitize/index.js");
// require('ng-device-detector');
__webpack_require__(/*! v-accordion */ "./node_modules/v-accordion/index.js");

__webpack_require__(/*! angular-material/angular-material.min.css */ "./node_modules/angular-material/angular-material.min.css");
__webpack_require__(/*! v-accordion/dist/v-accordion.min.css */ "./node_modules/v-accordion/dist/v-accordion.min.css");

__webpack_require__(/*! ./style.css */ "./src/style.css");



const app = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('app', [
	'ngMaterial',
	'ngAnimate',
	'ngMessages',
	'vAccordion',
	'ngResource',
	'ngSanitize',
	// 'ng.deviceDetector'
]);

app.config($mdThemingProvider => {
	$mdThemingProvider.theme('appTheme')
		.primaryPalette('grey', {
			'default': '800'
		})
		.accentPalette('blue')
		.warnPalette('orange', {
			'default': '800'
		});
});

app.directive('customChip', () => {
	return {
		restrict: 'EA',
		link: function (scope, elem, attrs) {
			// const chipTemplateClass = attrs.class;
			const mdChip = elem.parent().parent();
			mdChip.addClass(attrs.customChip);
		}
	};
});

_AppCtrl__WEBPACK_IMPORTED_MODULE_1__["default"].init();

/* harmony default export */ __webpack_exports__["default"] = ({
	app
});

/***/ }),

/***/ "./src/AppCtrl.js":
/*!************************!*\
  !*** ./src/AppCtrl.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! luxon */ "./node_modules/luxon/build/cjs-browser/luxon.js");
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var _AppConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppConfig */ "./src/AppConfig.js");
/* harmony import */ var _components_login_LoginCtrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/login/LoginCtrl */ "./src/components/login/LoginCtrl.js");
/* harmony import */ var _components_tag_TagsCtrl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/tag/TagsCtrl */ "./src/components/tag/TagsCtrl.js");
/* harmony import */ var _components_network_NetworkCtrl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/network/NetworkCtrl */ "./src/components/network/NetworkCtrl.js");
/* harmony import */ var _components_export_ExportCtrl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/export/ExportCtrl */ "./src/components/export/ExportCtrl.js");
/* harmony import */ var _components_import_ImportCtrl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/import/ImportCtrl */ "./src/components/import/ImportCtrl.js");
/* harmony import */ var _components_settings_SettingsCtrl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/settings/SettingsCtrl */ "./src/components/settings/SettingsCtrl.js");













const init = () => {

	_components_tag_TagsCtrl__WEBPACK_IMPORTED_MODULE_4__["default"].init();
	_components_network_NetworkCtrl__WEBPACK_IMPORTED_MODULE_5__["default"].init();
	_components_export_ExportCtrl__WEBPACK_IMPORTED_MODULE_6__["default"].init();
	_components_import_ImportCtrl__WEBPACK_IMPORTED_MODULE_7__["default"].init();
	_components_settings_SettingsCtrl__WEBPACK_IMPORTED_MODULE_8__["default"].init();
	_components_login_LoginCtrl__WEBPACK_IMPORTED_MODULE_3__["default"].init();

	_AppConfig__WEBPACK_IMPORTED_MODULE_2__["app"].controller('AppCtrl', ($rootScope, $scope, $http, $mdPanel) => {

		$scope.theme = 'appTheme'; //them color

		//................

		$scope.user = {
			id: 'guest',
			logged: false,
			credentials: null,
			level: 2
		};

		//................

		$scope.delayTooltip = 1000; // Tooltip delay

		$scope.darkTheme = false;
		$scope.sideBarOpen = true;
		$scope.infoPanel = null;

		$scope.tabSelected = 0;
		// $scope.tabTagsActive = false;

		$scope.dataNodes = [];
		$scope.tagsSelected = [];
		$scope.tagsVisible = [];

		$scope.netVis = {
			select: false,
			researchers: [],
			links: [],
			nodes: $scope.tagsSelected
		};

		$scope.netVisLayout = {
			display: 'network',					// 'network' || 'cluster'
			cluster: 'type',					// 'type' || 'community'
			gravity: 1,							// 0 - 10
			charge: -70,						// -12 -60
			distance: 100,						// 0 - 200
			friction: 0.9,						// 0.9
			collision: false,					// false || true
			communityDetection: false,			// false || true
			showNodes: true,					// false || true
			nodeSize: 'weight', 				// 'default' || 'weight'
			nodeScale: 3,						// 1 - 10
			nodeColor: 'type',					// 'default' || 'type' || 'community'
			showTitles: true,					// false || true
			titleScale: false,					// false || true
			titleInheritColor: false,			// false || true
			showLinks: true,					// false || true
			linkThickness: 'default',			// 'default' || 'weight'
			linkColor: 'default',				// 'default' || 'community'
			linkStrenght: 'min',				// 'min' || 'max'
			gooeyFX: false						// false || true
		};
		
		$scope.emptyCanvas = {
			message: 'Select a tag to start'
		};

		//................

		//TEST IF DB CONENCTION IS WORKING
		$http.get('api/shared/test_db.php').then( res => {
			if (res.status !== 200) {
				window.location.assign(`${window.location}install/install.html`);
			}
		}, res => {
			window.location.assign(`${window.location}install/install.html`);
		});

		//get meta -- define title
		$http.get('api/meta/read.php').then( res => {
			if (res.status !== 200) {
				$rootScope.project.title = 'Network Visualization';
			}
			
			$rootScope.project = res.data.project;
			document.title = $rootScope.project.title;

		}, res => {
			$rootScope.project.title = 'Network Visualization';
		});

		//................

		$scope.init = () => {
			$scope.guestLogin();
		};
		
		//guest login
		$scope.guestLogin = () => {
			$scope.user = {
				id: 'guest',
				logged: false,
				credentials: null,
				level: 2,
			};

			loadNodesData();

			$rootScope.$broadcast('userSigned', $scope.user);
		};

		$scope.login = async () => {

			if ($scope.infoPanel) await $scope.infoPanel.close();

			//positions
			const position = $mdPanel.newPanelPosition()
				.absolute()
				.center();

			//animation
			const animation = $mdPanel.newPanelAnimation()
				.withAnimation({
					open: 'dialog-custom-animation-open',
					close: 'dialog-custom-animation-close'
				});

			//configurations
			const config = {
				id: 0,
				animation: animation,
				attachTo: document.querySelector('body'),
				controller: 'LoginCtrl',
				templateUrl: 'components/login/login.html',
				panelClass: 'login-panel',
				position: position,
				trapFocus: false,
				zIndex: 150,
				clickOutsideToClose: true,
				clickEscapeToClose: true,
				hasBackdrop: true
			};

			$scope.infoPanel = $mdPanel.create(config);
			$scope.infoPanel.open();
			
		};

		$scope.$on('CloseLoginPanel', () => {
			$scope.infoPanel.close();
			$scope.infoPanel = null;
		});

		//user login
		$scope.$on('credentials_accepted', (event, data) => {

			if ($scope.infoPanel) $scope.infoPanel.close();

			$scope.user = {
				id: data.id,
				logged: true,
				credentials: data,
				level: data.level
			};

			if ($scope.dataNodes.length == 0) loadNodesData();

			// $rootScope.$emit('userSigned', $scope.user);
			$rootScope.$broadcast('userSigned', $scope.user);

		});

		$scope.logout = () => {
			$scope.user = {
				id: 'guest',
				logged: false,
				credentials: null,
				level: 2,
			};

			$rootScope.$broadcast('userSigned', $scope.user);
		};

		/* Check user Level
			level: 0 - Super
			1 - Editor
			2 - User
		*/
		$scope.checkUserLevel = value => ($scope.user.level <= value) ? true : false;

		//................

		$scope.toggleSideBar = () => {

			const side = document.querySelector('#side');

			if ($scope.sideBarOpen) {

				gsap__WEBPACK_IMPORTED_MODULE_1__["TweenLite"].to(side, 0.4, {
					x: '300px',
					onComplete: () => {
						$scope.sideBarOpen = false;
						if (!$scope.$root.$$phase) $scope.$digest();
						$rootScope.$broadcast('networkLayoutChange', 'sideBar');
					}
				});

			} else {

				$scope.sideBarOpen = true;
				$rootScope.$broadcast('networkLayoutChange', 'sideBar');
				gsap__WEBPACK_IMPORTED_MODULE_1__["TweenLite"].to(side, 0.4, {x: '0px'});

			}

		};

		$scope.triggerLayoutUpdate = source => $rootScope.$broadcast('networkLayoutChange', source);

		//................

		const loadNodesData = () => {
			$http.get('api/node/read.php').then( res => {
	
				if (res.status !== 200) {
					// console.log(res);
					$scope.emptyCanvas.message = 'No tags available';
					if ($scope.checkUserLevel(1)) $scope.emptyCanvas.message += '<br/> Add one to start';
					return [];
				}

				$scope.dataNodes = res.data;

				const now = luxon__WEBPACK_IMPORTED_MODULE_0__["DateTime"].utc();

				//transform and add data
				for (const node of $scope.dataNodes) {
					node.weight = 0;
					node.selected = false;

					const nodeDate = luxon__WEBPACK_IMPORTED_MODULE_0__["DateTime"].fromSQL(node.date);
					
					//check modified time/date. Less than 5 minutes mark as new
					const diff = now.diff(nodeDate, 'minute');
					if (diff.values.minutes - nodeDate.offset < 5) node.new = true;
				}

				$scope.netVis.researchers = $scope.dataNodes;
				$scope.emptyCanvas.message = 'Select a tag to start';

				$rootScope.$broadcast('dataLoaded');

			}, res => {
				console.log(res);
			});
		};


		$scope.initSettings = () => {
			$rootScope.$broadcast('loadSettings', $scope.user);
		};

		$scope.changeTabSelection = elem => {
			$scope.tabTagsActive = false;
		};

		$scope.$on('importData', event => {
			$scope.netVis = {
				select: false,
				researchers: [],
				links: [],
				nodes: []
			};
			loadNodesData();

			$scope.tabTagsActive = true;
			if (!$scope.$root.$$phase) $scope.$digest();
		});

	});
};

/* harmony default export */ __webpack_exports__["default"] = ({
	init
});

/***/ }),

/***/ "./src/components/export/ExportCtrl.js":
/*!*********************************************!*\
  !*** ./src/components/export/ExportCtrl.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jszip */ "./node_modules/jszip/lib/index.js");
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jszip__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! papaparse */ "./node_modules/papaparse/papaparse.min.js");
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var save_svg_as_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! save-svg-as-png */ "./node_modules/save-svg-as-png/lib/saveSvgAsPng.js");
/* harmony import */ var save_svg_as_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(save_svg_as_png__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _AppConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../AppConfig */ "./src/AppConfig.js");









const init = () => {

	_AppConfig__WEBPACK_IMPORTED_MODULE_4__["app"].controller('ExportCtrl', (
		$scope,
		$rootScope) => {

		$scope.dataFileSelectionOptions = ['selected', 'all'];
		$scope.dataFileSelection = 'selected';

		$scope.dataFileTypeOptions = ['csv', 'json'];
		$scope.dataFileType = 'csv';

		$scope.graphFileTypeOptions = ['svg', 'png'];
		$scope.graphFileType = 'png';

		$scope.zipFiles = false;


		$scope.disabled = () => ($scope.netVis.nodes.length > 0) ? false : true;

		$scope.exportData = () => {
			if ($scope.netVis.nodes.length > 0 && $scope.checkUserLevel(1)) {
				if ($scope.dataFileType === 'csv') {
					exportCSV();
				} else if ($scope.dataFileType === 'json') {
					exportJson();
				}
			}
		};

		const exportCSV = () => {

			//collections
			const nodesToExport = [];
			const linksToExport = [];

			//list nodes
			for (const n of $scope.netVis.nodes) {
				nodesToExport.push({
					id: n.id,
					name: n.name,
					type: n.type
				})

				//list edges
				if (n.relations) {
					for (const e of n.relations) {
						linksToExport.push({
							source: n.name,
							target: e.name,
							sourceType: n.type,
							targetType: e.type
						})
					}
				}

			};

			//parser
			const nodesCSV = papaparse__WEBPACK_IMPORTED_MODULE_2___default.a.unparse(nodesToExport);
			const linksCSV = papaparse__WEBPACK_IMPORTED_MODULE_2___default.a.unparse(linksToExport);

			const data = [
				{
					data: nodesCSV,
					name: 'nodes',
					dataType: 'csv'
				},
				{
					data: linksCSV,
					name: 'links',
					dataType: 'csv'
				}
			];

			deliverDataset(data);

		}

		const exportJson = () => {
			
			//collection
			const networkToExport = [];

			for (const n of $scope.netVis.nodes) {
				networkToExport.push({
					id: n.id,
					name: n.name,
					type: n.type,
					edges: n.relations
				})
			};

			//parser
			const nodesJson = JSON.stringify(networkToExport, null, ' ');

			const data = [
				{
					data: nodesJson,
					name: 'nodes',
					dataType: 'json'
				}
			];

			deliverDataset(data);

		}

		const deliverDataset = exportCollection => {
			
			//if zip
			if ($scope.zipFiles) {

				const zip = new jszip__WEBPACK_IMPORTED_MODULE_1___default.a();

				for (const file of exportCollection) {
					zip.file(file.name, file.data);
				}

				zip.generateAsync({
					type: 'blob'
				}).then(blob => {
					Object(file_saver__WEBPACK_IMPORTED_MODULE_0__["saveAs"])(blob, 'network.zip');
				});

			} else {

				//separated files
				for (const {name, dataType, data} of exportCollection) {
					const fileBlob = new Blob([data], {
						type: `text/${dataType}`
					});

					Object(file_saver__WEBPACK_IMPORTED_MODULE_0__["saveAs"])(fileBlob, `${name}.${dataType}`);
				}

			}
		}

		//************* */

		$scope.exportGraph = () => {
			if ($scope.netVis.nodes.length > 0) {
				if ($scope.graphFileType === 'svg') {
					exportSVG();
				} else if ($scope.graphFileType === 'png') {
					exportPNG();
				}
			}
		};

		const exportPNG = () => {
			
			//remove gooey
			if ($scope.netVisLayout.gooeyFX) {
				$scope.netVisLayout.gooeyFX = false;
				$scope.triggerLayoutUpdate('gooeyFX');
			}

			//get graph
			$rootScope.$broadcast('exportGraph', $scope.graphFileType);

			const graph = document.getElementById('d3-net-vis');

			//This library cut the SVG graph using the view port. 
			//To avoid this cut, a new set of boundaries is need to be pass to the library.

			const margin = 50;

			let graphLeft = 0;
			let graphTop = 0;
			let graphRight = document.getElementById('graph').offsetWidth;
			let graphBottom = document.getElementById('graph').offsetHeight;

			for (const node of $scope.netVis.nodes) {
				//test each boundary
				if (node.x < graphLeft) graphLeft = node.x;
				if (node.y < graphTop) graphTop = node.y;
				if (node.x > graphRight) graphRight = node.x;
				if (node.y > graphBottom) graphBottom = node.y;

			};

			graphLeft = graphLeft - margin;
			graphTop = graphTop - margin;
			const graphWidth = (graphLeft * Math.sign(graphLeft)) + graphRight + margin;
			const graphHeight = (graphTop * Math.sign(graphTop)) + graphBottom + margin;

			const pngConfig = {
				left: graphLeft,
				top: graphTop,
				width: graphWidth,
				height: graphHeight,
				scale: 2
			};

			//function to trabsform the PNG Uri to a BLOB
			//https://gist.github.com/davoclavo/4424731
			const dataURItoBlob = dataURI => {
				// convert base64 to raw binary data held in a string
				const byteString = atob(dataURI.split(',')[1]);

				// separate out the mime component
				const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

				// write the bytes of the string to an ArrayBuffer
				const arrayBuffer = new ArrayBuffer(byteString.length);
				const _ia = new Uint8Array(arrayBuffer);
				for (let i = 0; i < byteString.length; i++) {
					_ia[i] = byteString.charCodeAt(i);
				}

				const dataView = new DataView(arrayBuffer);
				const blob = new Blob([dataView], {
					type: mimeString
				});
				return blob;
			};

			const dowloadFile = blob => {
				if ($scope.zipFiles) {

					const zip = new jszip__WEBPACK_IMPORTED_MODULE_1___default.a();
					zip.file('network.png', blob);
					zip.generateAsync({
						type: 'blob'
					}).then(blob => {
						Object(file_saver__WEBPACK_IMPORTED_MODULE_0__["saveAs"])(blob, 'network.zip');
					});

				} else {
					//png
					Object(file_saver__WEBPACK_IMPORTED_MODULE_0__["saveAs"])(blob, 'network.png');
				}
			};

			//save as PNG
			Object(save_svg_as_png__WEBPACK_IMPORTED_MODULE_3__["svgAsPngUri"])(graph, pngConfig, uri => {
				const blob = dataURItoBlob(uri);
				dowloadFile(blob);
			});

			//restore gooey
			if ($scope.netVisLayout.gooeyFX) {
				$scope.netVisLayout.gooeyFX = true;
				$scope.triggerLayoutUpdate('gooeyFX');
				$rootScope.$broadcast('exportGraph', $scope.graphFileType);
			}
		}

		const exportSVG = () => {

			//stop graph
			$rootScope.$broadcast('exportGraph', $scope.graphFileType);

			//get canvas
			const graph = document.getElementById('d3-net-vis');

			//serilize
			const svgXML = new XMLSerializer().serializeToString(graph);

			//deliver
			if ($scope.zipFiles) {

				const zip = new jszip__WEBPACK_IMPORTED_MODULE_1___default.a();
				zip.file('network.svg', svgXML);
				zip.generateAsync({
					type: 'blob'
				}).then(blob => {
					Object(file_saver__WEBPACK_IMPORTED_MODULE_0__["saveAs"])(blob, 'network.zip');
				});

			} else {

				//svg
				const blob = new Blob([svgXML], {
					type: 'image/svg+xml'
				});
				Object(file_saver__WEBPACK_IMPORTED_MODULE_0__["saveAs"])(blob, 'network.svg');
			}
		}

	});

};

/* harmony default export */ __webpack_exports__["default"] = ({
	init
});

/***/ }),

/***/ "./src/components/import/ImportCtrl.js":
/*!*********************************************!*\
  !*** ./src/components/import/ImportCtrl.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! papaparse */ "./node_modules/papaparse/papaparse.min.js");
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AppConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../AppConfig */ "./src/AppConfig.js");






const init = () => {
	_AppConfig__WEBPACK_IMPORTED_MODULE_2__["app"].controller('ImportCtrl', ($scope, $rootScope, $http, $mdToast) => {

		// html
		$scope.fileExtensionOptions  = ['json','csv'];
		$scope.fileExtension = $scope.fileExtensionOptions[0];

		$scope.csvDataStructureOptions = ['node','edge'];
		$scope.csvDataStructure = $scope.csvDataStructureOptions[0];

		$scope.changeCSVDataStructure = value => $scope.csvDataStructure = value;

		let file;
		$scope.fileName;
		$scope.importResults;
		
		//file
		$scope.selectFile = () => {

			const fileInput = document.getElementById('file-input');

			fileInput.click();

			fileInput.onchange = e => {
				file = e.target.files[0];
				$scope.fileName = file.name;
				fileInput.value = '';

				$scope.$digest();
				importData();
			};
		};

		const importData = () => {

			$scope.importResults = null;

			if (!file) return;

			if (file.type === 'text/csv') {

				papaparse__WEBPACK_IMPORTED_MODULE_1___default.a.parse(file, {
					header: true,
					dynamicTyping: true,
					complete:  res => {
						if (res.data.length > 0) {
							submitData({
								data: res.data,
								dataType: file.type,
								csvData: $scope.csvDataStructure
							});
						} else {
							$scope.importResults = {error: true};
							$scope.showSimpleToastTag('An error occurred!');
							$scope.$digest();
						}
					},
					error: res => {
						console.log(log);
						$scope.showSimpleToastTag('An error occurred!');
						$scope.$digest();
					}
				});

			} else if (file.type === 'application/json') {

				const reader = new FileReader();
				reader.readAsText(file, 'UTF-8');

				reader.onload = res => {
					const content = res.target.result; // this is the content!
					const data = JSON.parse(content);
					submitData({
						data,
						dataType: file.type
					});
				};

				reader.onerror = res => {
					console.log(res);
					$scope.showSimpleToastTag('An error occurred!');
				};

				reader.onprogress = res => {
					// console.log(res);
				};

			}

		};

		const submitData = payload => {

			const req = {
				method: 'POST',
				url: 'api/node/create_many.php',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				data: payload
			};

			$http(req).then( res => {

				file = null;
				
				if (!res.data) return;
				
				$scope.importResults = res.data;
				$rootScope.$broadcast('importData');
				$scope.showSimpleToastTag('Import succeded.');

			}, res => {
				console.log(res);
				$scope.showSimpleToastTag('An error occurred!');
				file = null;
			});

		};

		$scope.showSimpleToastTag = msg => {
			$mdToast.show(
				$mdToast.simple()
					.textContent(msg)
					.position('top center')
					.hideDelay(3000)
					.toastClass('toast-custom')
					.parent(angular__WEBPACK_IMPORTED_MODULE_0___default.a.element(document.querySelector('#viz-port')))
			);

		};

	});
};

/* harmony default export */ __webpack_exports__["default"] = ({
	init
});

/***/ }),

/***/ "./src/components/login/LoginCtrl.js":
/*!*******************************************!*\
  !*** ./src/components/login/LoginCtrl.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AppConfig */ "./src/AppConfig.js");


const init = () => {
	_AppConfig__WEBPACK_IMPORTED_MODULE_0__["app"].controller('LoginCtrl', ($rootScope, $scope, $http, $mdColors) => {

		$scope.credentials = {
			email: '',
			password: ''
		};

		$scope.forgotPass = false;
		$scope.forgot = {};

		$scope.infoPanel = null;

		$scope.user = {
			id: 'guest',
			logged: false,
			credentials: null,
			level: 2
		}

		$scope.login = async () => {

			$scope.credentials.action = 'checkCredentials';

			const req = {
				method: 'POST',
				url: 'api/user/login.php',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				data: $scope.credentials
			}

			$http(req).then( res => {

				if (!res.data) return;
				if (res.data.error)  {
					$scope.credentials.error = res.data.error;
					return;
				}

				$scope.credentials = res.data;
				$rootScope.$broadcast('credentials_accepted', res.data);

			}, res => {
				if (res.data.error)  {
					$scope.credentials.error = res.data.error;
				}
			});

		}

		$scope.submitEmail = async () => {

			$scope.forgot.action = 'reset';

			const req = {
				method: 'POST',
				url: 'api/user/recover_password.php',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				data: $scope.forgot
			}

			$http(req).then( res => {

				if (!res.data) {
					$scope.forgot.error = 'Unable to process your request';
					return;
				}

				if (res.data.error)  {
					$scope.forgot.error = res.data.error;
					return;
				}

				$scope.forgot.error = null;
				$scope.forgot.success = true;
				$scope.forgot.msg = res.data.message;
				$scope.forgotPassword(false);

			}, res => {
				console.log(res);
				$scope.forgot.success = false;
				if (res.data && res.data.error)  {
					$scope.forgot.error = res.data.error;
					return;
				}
				$scope.forgot.error = 'Unable to process your request';
			});

		};

		$scope.forgotPassword = value => $scope.forgotPass = value;

		$scope.closeDialog = () => $rootScope.$broadcast('CloseLoginPanel');

	});
};

/* harmony default export */ __webpack_exports__["default"] = ({
	init
});

/***/ }),

/***/ "./src/components/network/NetworkCtrl.js":
/*!***********************************************!*\
  !*** ./src/components/network/NetworkCtrl.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jlouvain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jlouvain */ "./node_modules/jlouvain/lib/index.js");
/* harmony import */ var jlouvain__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jlouvain__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
/* harmony import */ var _AppConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../AppConfig */ "./src/AppConfig.js");
// import {select, selectAll, event} from 'd3-selection';
// import {nest, entries} from 'd3-collection';
// import {scaleOrdinal, scaleLinear} from 'd3-scale';
// import {range, max} from 'd3-array';
// import {rgb} from 'd3-color';
// import {schemeCategory10} from 'd3-scale-chromatic';
// import {forceSimulation, forceLink, forceManyBody, forceCenter, forceX, forceY, forceCollide} from 'd3-force';
// import {timer} from 'd3-timer';
// import {drag} from 'd3-drag';





__webpack_require__(/*! ./network.css */ "./src/components/network/network.css");



const init = () => {

	_AppConfig__WEBPACK_IMPORTED_MODULE_3__["app"].controller('NetworkCtrl', ($rootScope, $scope, $mdColors, $http, $window) => {

		let nodesData = [];
		let linksData = [];

		let simulation;
		let node;
		let link;

		//size
		let networkContainerWidth;
		let networkContainerHeight;
		let svg;

		let graphInfo;

		const defaultSize = 1;
		const minRadius = 1;
		const maxRadius = 10;

		const defaultLinkWidth = 1;
		const minLinkWidth = 1;
		const maxLinkWidth = 25;

		let max_community_number = 4;

		$scope.clusterNest = [];

		let communityColors;

		//load data
		// $scope.$on('dataLoaded', event => {
		const startSimulation = () => {

			// console.log(d3.select('#side').node().getBoundingClientRect().width);
			// console.log(d3.select('#stage').node().getBoundingClientRect());
			// networkContainerWidth = window.innerWidth - d3.select('#side').node().getBoundingClientRect().width; // full window (-)side panel

			networkContainerWidth = d3__WEBPACK_IMPORTED_MODULE_2__["select"]('#stage').node().getBoundingClientRect().width; // full window (-)side panel
			networkContainerHeight = window.innerHeight - d3__WEBPACK_IMPORTED_MODULE_2__["select"]('#title').node().getBoundingClientRect().height - 5; // full height (-) title height

			// define svg
			svg = d3__WEBPACK_IMPORTED_MODULE_2__["select"]('#graph').append('svg')
				.attr('id', 'd3-net-vis')
				.attr('width', networkContainerWidth)
				.attr('height', networkContainerHeight);

			if ($scope.darkTheme) svg.style('background-color', '#000000');

			//prevent right click default
			svg.on('contextmenu', () => {
				d3__WEBPACK_IMPORTED_MODULE_2__["event"].preventDefault();
			});

			graphInfo = d3__WEBPACK_IMPORTED_MODULE_2__["select"]('#graphInfo'); // TO IMPLEMENT

			// define force layout
			simulation = d3__WEBPACK_IMPORTED_MODULE_2__["forceSimulation"]()
				.force('link', d3__WEBPACK_IMPORTED_MODULE_2__["forceLink"]().id(d => d.id).distance($scope.netVisLayout.distance))
				.force('charge', d3__WEBPACK_IMPORTED_MODULE_2__["forceManyBody"]().strength($scope.netVisLayout.charge))
				.force('center', d3__WEBPACK_IMPORTED_MODULE_2__["forceCenter"](networkContainerWidth / 2, networkContainerHeight / 2));
			// .force('x', d3.forceX(networkContainerWidth / 2).strength($scope.netVisLayout.gravity * 0.1))
			// .force('y', d3.forceY(networkContainerHeight / 2).strength($scope.netVisLayout.gravity * 0.1));

		};

		$scope.$on('updatedTagList', (event, tag, action) => {
			if (simulation && $scope.netVis.nodes.length > 0) updateSimulation(tag, action);
		});

		$scope.$on('listTagSelected', (event, tag, action) => {
			updateSimulation(tag, action);
		});

		const updateSimulation = (tag, action) => {

			if (!simulation) startSimulation();
			
			simulation.stop();

			//Add tag node if it is not already added.
			const _node = getNodeById(tag.id);
			if (!_node) {
			// if ($scope.netVis.nodes.indexOf(tag) === -1) {
				tag.weight = 0;
				$scope.netVis.nodes.push(tag);
			}

			if (_node && action === 'update' && tag.linksRemoved) {
				// angular.forEach(tag.linksRemoved, nodeRelation => {
				for (const nodeRelation of tag.linksRemoved) {
					changeNodeWeight(tag.id, nodeRelation, -1);
					_node.weight--;
				};
			}

			//load data
			// if (!_node || tag.linksAdded) {
			$http.get(`api/node/read_one.php?id=${tag.id}`).then( res => {

				if (res.status === 204) return [];

				if (res.data && res.data.relations) {

					//add metada - relation to node;
					tag.relations = res.data.relations;

					console.log(res);

					for (const relation of tag.relations) {
	
						let index;
						let endobj = relation;
	
						//add to relatoon 
						index = $scope.testInById(relation.id, $scope.netVis.researchers);
						if (index > -1) endobj = $scope.netVis.researchers[index];
	
						index = $scope.testInById(relation.id, $scope.netVis.nodes);
						if (index > -1) endobj = $scope.netVis.nodes[index];
	
						const nodeRelated = getNodeById(endobj.id);
						if (!nodeRelated) {
						// if ($scope.netVis.nodes.indexOf(endobj) === -1) {
							endobj.weight = 0;
							$scope.netVis.nodes.push(endobj);
							if (_node) _node.weight++;
						}
	
						///add link
						$scope.addLink(tag, endobj);
	
					}
				}
				
				$scope.updateForceLayout();

				
			}, res => {
				console.log(res);
				return false;
			});
			// } else {
			// 	$scope.updateForceLayout();
			// }

		};

		$scope.testInById = (id_needle, haystack) => {
			const ids = haystack.map(d => d.id);
			const index = ids.indexOf(id_needle);
			return index;
		};

		const getNodeById = tagID => $scope.netVis.nodes.find( node => node.id === tagID);

		$scope.addLink = (start, end) => {

			//Test if link already exists.
			let x;

			for (let i = 0; i < $scope.netVis.links.length; i++) {
				x = $scope.netVis.links[i];
				if (x.source.id === start.id && x.target.id === end.id) return x;
				if (x.source.id === end.id && x.target.id === start.id) return x;
			}

			//Else create new link.
			const newLink = {
				source: start,
				target: end,
				weight: 1
			};

			//add weight to the end pooints (source and target)
			start.weight++;
			end.weight++;

			//add the new link to the collection
			$scope.netVis.links.push(newLink);

			return newLink;
		};

		const simulationLayout = () => {

			//initial
			simulation = d3__WEBPACK_IMPORTED_MODULE_2__["forceSimulation"]()
				.nodes(nodesData)
				.force('center', d3__WEBPACK_IMPORTED_MODULE_2__["forceCenter"](networkContainerWidth / 2, networkContainerHeight / 2))
				.force('x', d3__WEBPACK_IMPORTED_MODULE_2__["forceX"](networkContainerWidth / 2).strength($scope.netVisLayout.gravity * 0.1))
				.force('y', d3__WEBPACK_IMPORTED_MODULE_2__["forceY"](networkContainerHeight / 2).strength($scope.netVisLayout.gravity * 0.1))
				.on('tick', simulationTick); //!important

			//conditional: Network / Cluster
			if ($scope.netVisLayout.display === 'network') {

				simulation.force('link', d3__WEBPACK_IMPORTED_MODULE_2__["forceLink"](linksData)
					.id(d => d.id)
					.distance($scope.netVisLayout.distance)
					.strength(link => {
						if ($scope.netVisLayout.linkStrenght === 'min') {
							return 1 / Math.min(link.source.weight, link.target.weight);
						} else if ($scope.netVisLayout.linkStrenght === 'max') {
							return 1 / Math.max(link.source.weight, link.target.weight);
						}
					}));

				simulation.force('charge', d3__WEBPACK_IMPORTED_MODULE_2__["forceManyBody"]().strength($scope.netVisLayout.charge));

				//collission
				if ($scope.netVisLayout.collision) {
					simulation.force('collide', d3__WEBPACK_IMPORTED_MODULE_2__["forceCollide"](d => d.radius + 2).iterations(16));
				}

			} else if ($scope.netVisLayout.display === 'cluster') {

				simulation.force('collide', d3__WEBPACK_IMPORTED_MODULE_2__["forceCollide"](d => d.radius + 2).iterations(16));

				//Conditional: Type / Community
				if ($scope.netVisLayout.cluster === 'type') {

					//set cluster: by type
					$scope.clusterNest = d3__WEBPACK_IMPORTED_MODULE_2__["nest"]()
						.key(d => d.type)
						.entries(nodesData);

					//map type to a number
					$scope.clusterNest.forEach(d => {
						switch (d.key) {
						case 'Interest':
							d.keyNum = 1;
							break;
						case 'Researcher':
							d.keyNum = 2;
							break;
						case 'Department':
							d.keyNum = 3;
							break;
						default:
							d.keyNum = 0;
							break;
						}
					});

				} else if ($scope.netVisLayout.cluster === 'community') {

					//set cluster: by community
					$scope.clusterNest = d3__WEBPACK_IMPORTED_MODULE_2__["nest"]()
						.key(d => d.community)
						.entries(nodesData);
				}

			}

		};

		function simulationTick() {

			//conditional: Netowrk / Cluster
			if ($scope.netVisLayout.display === 'network') {

				if ($scope.netVisLayout.showLinks) {
					svg.selectAll('.link')
						.attr('x1', d => d.source.x)
						.attr('y1', d => d.source.y)
						.attr('x2', d => d.target.x)
						.attr('y2', d => d.target.y);
				}

				if ($scope.netVisLayout.showNodes) {
					svg.selectAll('.circle')
						.attr('cx', d => d.x)
						.attr('cy', d => d.y);
				}

				//title position // dy - displace to show just below the node
				if ($scope.netVisLayout.showTitles) {

					// const title = node.selectAll('.nodeTitle')
					const title = svg.selectAll('.nodeTitle')
						.attr('x', d => d.x)
						.attr('y', d => d.y);

					if ($scope.netVisLayout.showNodes) {
						title.attr('dy', function () {
							const node = d3__WEBPACK_IMPORTED_MODULE_2__["select"](this.parentNode);
							const r = node.select('.circle').attr('r');
							return Number(r) + 8;
						});
					}

				}



			} else if ($scope.netVisLayout.display === 'cluster') {

				//for multi foci -- group separation
				// Push different nodes in different directions for clustering.

				const c = ($scope.netVisLayout.cluster === 'type') ? 10 : 2;
				const k = $scope.clusterNest.length * c * this.alpha();

				nodesData.forEach( o => {

					for (let n = 0; n < $scope.clusterNest.length; n++) {

						//condtional: Type / Community
						if ($scope.netVisLayout.cluster === 'type') {

							if (o.type === $scope.clusterNest[n].key) {
								o.x += k * Math.cos(Number($scope.clusterNest[n].keyNum));
								o.y += k * Math.sin(Number($scope.clusterNest[n].keyNum));
								break;
							}

						} else if ($scope.netVisLayout.cluster === 'community') {

							if (o.community === $scope.clusterNest[n].key) {
								o.x += k * Math.cos(Number($scope.clusterNest[n].key));
								o.y += k * Math.sin(Number($scope.clusterNest[n].key));
								break;
							}
						}
					}

				});

				if ($scope.netVisLayout.showNodes) {
					svg.selectAll('.circle')
						.attr('cx', d => d.x)
						.attr('cy', d => d.y);
				}

				//title position // dy - displace to show just below the node
				if ($scope.netVisLayout.showTitles) {

					const title = svg.selectAll('.nodeTitle')
						.attr('x', d => d.x)
						.attr('y', d => d.y);

					if ($scope.netVisLayout.showNodes) {
						title.attr('dy', function () {
							const node = d3__WEBPACK_IMPORTED_MODULE_2__["select"](this.parentNode);
							const r = node.select('.circle').attr('r');
							return Number(r) + 8;
						});
					}

				}

			}

		}

		const communityDetection = () => {

			// if (nodesData.length > 0 && $scope.netVisLayout.communityDetection) {
			if (nodesData.length > 0) {

				// const original_node_data = d3.entries($scope.netVis.nodes);

				const nodesIndex = [];
				nodesData.forEach(d => {
					nodesIndex.push(d.index);
				});

				const edgesData = [];
				linksData.forEach(d => {
					const edge = {
						source: d.source.index,
						target: d.target.index,
						weight: d.weight
					};
					edgesData.push(edge);
				});

				// const partition = {};
				// nodesData.forEach(d => {
				// 	partition[d.index] = d.attributes.modularityClass;
				// });

				const community = Object(jlouvain__WEBPACK_IMPORTED_MODULE_1__["jLouvain"])().nodes(nodesIndex).edges(edgesData);

				const community_assignment_result = community();
				// const node_ids = Object.keys(community_assignment_result);

				max_community_number = 0;

				nodesData.forEach(d => {

					// if (community_assignment_result[d.index]) {
					d.community = community_assignment_result[d.index];
					max_community_number = max_community_number < community_assignment_result[d.index] ? community_assignment_result[d.index] : max_community_number;
					// }

				});

				// }

				// } else {

				// 	// nodesData.forEach(function(d) {
				// 	// 	d.community = d.attributes.modularityClass;
				// 	// });

			}

		};

		$scope.updateForceLayout = () => {

			/// save data
			nodesData = $scope.netVis.nodes;
			linksData = $scope.netVis.links;

			graphInfo.text('nodes: ' + nodesData.length + ' | ' + 'links:' + linksData.length);

			if (linksData.length > 0) communityDetection();

			//links first: lower layer
			displayLinks();
			displayNodes();

			//define simulation parameters based on the display option: Network / Cluster
			simulationLayout();

		};

		const displayLinks = () => {

			if ($scope.netVisLayout.showLinks) {

				// --- remove all !important

				nodesData = [];

				link = svg.selectAll('.link')
					.data(nodesData);

				link.exit().remove();

				linksData = $scope.netVis.links;

				//select
				link = svg.selectAll('.link')
					.data(linksData);

				//remove
				link.exit().remove();

				//add-update: draw line, add class, define stroke-linecap (end of the line)
				link.enter().append('line')
					.attr('class', 'link')
					.attr('stroke-linecap', 'round');

				//define color
				$scope.updateLinkColor();
				//define thickness
				$scope.updateLinkThickness();

			} else {

				//remove all
				const linkData = [];

				link = svg.selectAll('.link')
					.data(linkData);

				link.exit().remove();

			}

		};

		$scope.updateLinkColor = transition => {

			if ($scope.netVisLayout.showLinks) {
				//select
				const links = svg.selectAll('.link');

				//style for all
				links.style('stroke-opacity', 0.2);
				if ($scope.darkTheme) links.style('stroke-opacity', 0.2);

				//if transition
				if (transition) links.transition().duration(1000);

				//condition: Default / Community
				if ($scope.netVisLayout.linkColor === 'default') {

					//same color to all
					links.style('stroke', '#999');
					if ($scope.darkTheme) links.style('stroke', '#EEE');

				} else if ($scope.netVisLayout.linkColor === 'community') {

					if (!communityColors) communityColors = d3__WEBPACK_IMPORTED_MODULE_2__["scaleOrdinal"](d3__WEBPACK_IMPORTED_MODULE_2__["schemeCategory10"]).domain(d3__WEBPACK_IMPORTED_MODULE_2__["range"]([0, max_community_number]));
					links.style('stroke', d => communityColors(d.source.community));

				}
			}

		};

		$scope.updateLinkThickness = transition => {

			if ($scope.netVisLayout.showLinks) {

				//select
				const links = svg.selectAll('.link');

				//if transition
				if (transition) links.transition().duration(1000);

				//condition: defaul / community
				if ($scope.netVisLayout.linkThickness === 'default') {

					//same width for all
					links.style('stroke-width', defaultLinkWidth);

				} else if ($scope.netVisLayout.linkThickness === 'weight') {

					// if there attribute wight is defined ------- 
					// const scale = d3.scaleLinear()
					// 	.domain([0, d3.max(linksData, d => { console.log(d); return d.weight; })])
					// 	.range([minLinkWidth, maxLinkWidth]);

					// link.style('stroke-width', d => scale(d.weight) )

					//scale based on pre-defined min and max values mapped to the min and max weight in the visualiation
					const scale = d3__WEBPACK_IMPORTED_MODULE_2__["scaleLinear"]()
						.domain([0, d3__WEBPACK_IMPORTED_MODULE_2__["max"](linksData, d => d.source.weight + d.target.weight)])
						.range([minLinkWidth, maxLinkWidth]);

					links.style('stroke-width', d => scale(d.source.weight + d.target.weight));
				}
			}

		};

		const displayNodes = () => {

			// --- remove all !important

			nodesData = [];

			let node = svg.selectAll('.node')
				.data(nodesData);

			node.exit().remove();

			//put all
			nodesData = $scope.netVis.nodes;
			// simulation.nodes(nodesData)

			node = svg.selectAll('.node')
				.data(nodesData);

			node.enter().append('g')
				.attr('class', 'node');

			//CIRCLES
			//The condition comes later in the process so the nodes can show
			//titles even when user select to not show the nodes (circles)
			if ($scope.netVisLayout.showNodes) {

				//select
				node = svg.selectAll('.node');

				//Add circles
				const circle = node.append('circle')
					.attr('class', 'circle')
					.on('mouseover', function () {
						const nodeDatum = d3__WEBPACK_IMPORTED_MODULE_2__["select"](this).datum();
						highlightEgo(nodeDatum.index);
					})
					.on('mouseout', () => {
						highlightEgo(-1);
					});

				//CLICKS
				const timer = d3__WEBPACK_IMPORTED_MODULE_2__["timer"](elapsed => {
					if (elapsed > 50) timer.stop();
				});

				timer.stop();

				//CLICK: Get info
				circle.on('click', d => {
					timer.restart(elapsed => {
						if (elapsed > 250) {
							timer.stop();
							$scope.netVis.select = d;
							$rootScope.$broadcast('visTagInfoPanel', d);
							// $scope.showTagInfoPanel(d, 'view');
						}
					}, 250);
				});

				//DOUBLE-CLICK: expand relations
				circle.on('dblclick', d => {
					timer.stop();
					$rootScope.$broadcast('visTagSelected', d);
				});

				//RIGHT CLICK: 
				circle.on('contextmenu', d => {
					$scope.deselect(d);
				});

				//----drag
				const dragstarted = d => {
					if (!d3__WEBPACK_IMPORTED_MODULE_2__["event"].active) simulation.alphaTarget(0.3).restart();
					d.fx = d.x;
					d.fy = d.y;
				};

				const dragged = d => {
					d.fx = d3__WEBPACK_IMPORTED_MODULE_2__["event"].x;
					d.fy = d3__WEBPACK_IMPORTED_MODULE_2__["event"].y;
				};

				const dragended = d => {
					if (!d3__WEBPACK_IMPORTED_MODULE_2__["event"].active) simulation.alphaTarget(0);
					d.fx = null;
					d.fy = null;
				};

				circle.call(d3__WEBPACK_IMPORTED_MODULE_2__["drag"]()
					.on('start', dragstarted)
					.on('drag', dragged)
					.on('end', dragended));

				updateNodeSize();
				$scope.updateNodeColor();

			}

			//TITLES
			if ($scope.netVisLayout.showTitles) {

				//select
				node = svg.selectAll('.node');

				//add text
				node.append('text')
					.attr('class', 'nodeTitle')
					.attr('text-anchor', 'middle')
					.text(d => d.name);

				//confugure
				$scope.updateNodeTitleSize();
				$scope.updateNodeTitleColor();
			}

			//remove garbage 
			node.exit().remove();

			//add mouse over accecibility
			node.append('title')
				.text(d => d.name);

		};

		const updateNodeSize = transition => {

			//select
			let nodes = svg.selectAll('.circle');

			//transition
			if (transition) nodes = nodes.transition().duration(1000);

			//Condition: Default/Weight
			if ($scope.netVisLayout.nodeSize === 'default') {

				//Same size to all
				nodes.attr('r', d => {
					d.radius = defaultSize * $scope.netVisLayout.nodeScale;
					return d.radius;
				});


			} else if ($scope.netVisLayout.nodeSize === 'weight') {

				//Scale weight based on the min and max in the current
				//visualization mapped to min and max predefined sizes
				const scale = d3__WEBPACK_IMPORTED_MODULE_2__["scaleLinear"]()
					.domain([0, d3__WEBPACK_IMPORTED_MODULE_2__["max"](nodesData, d => d.weight)])
					.range([minRadius, maxRadius]);

				nodes.attr('r', d => {
					d.radius = scale(d.weight * $scope.netVisLayout.nodeScale);
					return scale(d.weight * $scope.netVisLayout.nodeScale);
				});
			}

			//may affect titles
			if ($scope.netVisLayout.showTitles && $scope.netVisLayout.titleScale) {
				$scope.updateNodeTitleSize(true);
			}

		};

		$scope.updateNodeColor = transition => {

			//select
			let nodes = svg.selectAll('.node');

			//transition
			if (transition) nodes = nodes.transition().duration(1000);


			//conditions: Default / Type / Community (Calculated)
			if ($scope.netVisLayout.nodeColor === 'default') {

				//same color and stroke color to all
				nodes.style('fill', d3__WEBPACK_IMPORTED_MODULE_2__["rgb"]('#333').darker(0.4));
				nodes.style('stroke', d3__WEBPACK_IMPORTED_MODULE_2__["rgb"]('#333').darker(0.4));

				if ($scope.darkTheme) nodes.style('fill', d3__WEBPACK_IMPORTED_MODULE_2__["rgb"]('#EEE'));
				if ($scope.darkTheme) nodes.style('stroke', d3__WEBPACK_IMPORTED_MODULE_2__["rgb"]('#EEE'));

			} else if ($scope.netVisLayout.nodeColor === 'community') {

				communityColors = d3__WEBPACK_IMPORTED_MODULE_2__["scaleOrdinal"](d3__WEBPACK_IMPORTED_MODULE_2__["schemeCategory10"]).domain(d3__WEBPACK_IMPORTED_MODULE_2__["range"]([0, max_community_number]));
				nodes.style('fill', d => communityColors(d.community));
				nodes.style('stroke', d => d3__WEBPACK_IMPORTED_MODULE_2__["rgb"](communityColors(d.community)).darker(0.4));
				//$scope.updateLinkColor(true);


			} else if ($scope.netVisLayout.nodeColor === 'type') {

				//Color according node type
				nodes.style('fill', d => {
					if (d.type === 'Department') {
						return $mdColors.getThemeColor('appTheme-warn-hue-1');
					} else if (d.type === 'Interest') {
						if ($scope.darkTheme) d3__WEBPACK_IMPORTED_MODULE_2__["rgb"]('#EEE');
						return $mdColors.getThemeColor('appTheme-primary-hue-2');
					} else if (d.type === 'Researcher') {
						return $mdColors.getThemeColor('appTheme-accent-hue-1');
					}

				});

				nodes.style('stroke', d => {
					if (d.type === 'Department') {
						return $mdColors.getThemeColor('appTheme-warn-hue-1');
					} else if (d.type === 'Interest') {
						if ($scope.darkTheme) d3__WEBPACK_IMPORTED_MODULE_2__["rgb"]('#EEE');
						return $mdColors.getThemeColor('appTheme-primary-hue-2');
					} else if (d.type === 'Researcher') {
						return $mdColors.getThemeColor('appTheme-accent-hue-1');
					}

				});


			}

		};

		$scope.updateNodeTitleSize = transition => {

			if ($scope.netVisLayout.showTitles) {

				//select
				let nodes = svg.selectAll('.node');

				//transition
				if (transition) nodes = nodes.transition().duration(1000);

				//condition: False / True
				if (!$scope.netVisLayout.titleScale) {

					//default size
					nodes.attr('font-size', '0.5em');

				} else {

					//scale size using node radius
					const scale = d3__WEBPACK_IMPORTED_MODULE_2__["scaleLinear"]()
						.domain([0.5, d3__WEBPACK_IMPORTED_MODULE_2__["max"](nodesData, d => d.radius)])
						.range([minRadius, maxRadius]);

					nodes.attr('font-size', d => (scale(d.radius) * $scope.netVisLayout.nodeScale) * 0.02 + 'em');
				}

			}

		};

		$scope.updateNodeTitleColor = transition => {

			if ($scope.netVisLayout.showTitles) {

				//selection
				// let titles = node.selectAll('.nodeTitle');
				let titles = d3__WEBPACK_IMPORTED_MODULE_2__["selectAll"]('.nodeTitle');

				//transition
				if (transition) titles = titles.transition().duration(1000);

				titles.style('stroke', 'none');
				titles.style('stroke-width', '0px');

				//Condition: False / true
				if (!$scope.netVisLayout.titleInheritColor) {
					//same color to all
					titles.style('fill', '#333');
					if ($scope.darkTheme) titles.style('fill', '#EEE');

				} else if ($scope.netVisLayout.titleInheritColor) {
					//inherit color from node
					titles.style('fill', 'inherit');

				}

			}

		};

		const highlightEgo = nodeIndex => {

			//coonditional Out / Over
			if (nodeIndex === -1) {

				//back to normal
				svg.selectAll('.node')
					.style('opacity', 1);

				svg.selectAll('.link')
					.style('stroke-opacity', 0.2);

			} else {

				const adjacentNodes = [];

				//Links
				svg.selectAll('.link')
					.style('stroke-opacity', d => {
						//change opacity
						if (d.source.index === nodeIndex || d.target.index === nodeIndex) {
							return 0.6;
						} else {
							return 0.05;
						}
					})
					.each(d => {
						//save adjacent nodes
						if (d.source.index === nodeIndex || d.target.index === nodeIndex) {
							adjacentNodes.push(d.target.index);
						}

					});

				//nodes
				svg.selectAll('.node')
					.style('opacity', d => {
						if (d.index === nodeIndex) {
							return 1;

						} else {

							let nodeOpacity = 0.1;

							for (let a = 0; a < adjacentNodes.length; a++) {
								if (d.index === adjacentNodes[a]) {
									nodeOpacity = 0.6;
									break;
								}
							}

							return nodeOpacity;

						}
					});

			}

		};

		const gooeyFX = () => {

			//Condition True / False
			if ($scope.netVisLayout.gooeyFX) {

				//Add FX

				//svg.style('filter', 'url('#gooey')') //Set the filter on the container svg
				svg.style('filter', 'url(#gooey)'); //Set the filter on the container svg

				const defs = svg.append('defs');
				const filter = defs.append('filter').attr('id', 'gooey');

				filter.append('feGaussianBlur')
					.attr('in', 'SourceGraphic')
					.attr('stdDeviation', '3')
					.attr('color-interpolation-filters', 'sRGB')
					.attr('result', 'blur');
				filter.append('feColorMatrix')
					.attr('in', 'blur')
					.attr('mode', 'matrix')
					.attr('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7')
					.attr('result', 'gooey');

				// --- Duplicate origina image on top to make a crisp image
				// filter.append('feBlend')
				// 	.attr('in','SourceGraphic')
				// 	.attr('in2','gooey')



			} else {
				//remove FX
				svg.select('defs').remove();
				svg.style('filter', null);

			}
		};

		//Listener: Layout Change
		$scope.$on('networkLayoutChange', (event, source) => {

			if(!simulation) startSimulation();

			simulation.stop();

			switch (source) {

			case 'display':

				if ($scope.netVisLayout.display === 'network') {
					$scope.netVisLayout.showLinks = true;

				} else if ($scope.netVisLayout.display === 'cluster') {
					$scope.netVisLayout.collision = true;
					$scope.netVisLayout.showLinks = false;

				}

				$scope.updateForceLayout();
				break;

			case 'cluster':
				$scope.updateForceLayout();
				break;

			case 'gravity':
				simulation.force('x', d3__WEBPACK_IMPORTED_MODULE_2__["forceX"](networkContainerWidth / 2).strength($scope.netVisLayout.gravity * 0.1))
					.force('y', d3__WEBPACK_IMPORTED_MODULE_2__["forceY"](networkContainerHeight / 2).strength($scope.netVisLayout.gravity * 0.1))
					.alpha(1)
					.restart();
				break;

			case 'charge':
				simulation.force('charge', d3__WEBPACK_IMPORTED_MODULE_2__["forceManyBody"]()
					.strength($scope.netVisLayout.charge))
					.alpha(1)
					.restart();
				break;

			case 'distance':
				simulation.force('link', d3__WEBPACK_IMPORTED_MODULE_2__["forceLink"](linksData)
					.id(d => d.id)
					.distance($scope.netVisLayout.distance))
					.alpha(1)
					.restart();
				break;

			case 'colission':
				$scope.updateForceLayout();
				break;

			case 'showNode':
				$scope.updateForceLayout();
				break;

			case 'nodeScale':
				updateNodeSize(true);
				$scope.updateForceLayout();
				break;

			case 'nodeSize':
				updateNodeSize(true);
				$scope.updateForceLayout();
				break;

			case 'nodeColor':
				$scope.updateNodeColor(true);
				simulation.alpha(0.3).restart();
				break;

			case 'showTitles':
				$scope.updateForceLayout();
				break;

			case 'titleScale':
				$scope.updateNodeTitleSize(true);
				simulation.alpha(0.3)
					.restart();
				break;

			case 'titleInheritColor':
				$scope.updateNodeTitleColor(true);
				simulation.alpha(0.3)
					.restart();
				break;

			case 'showLinks':
				$scope.updateForceLayout();
				break;

			case 'linkThickness':
				$scope.updateLinkThickness();
				simulation.alpha(0.3)
					.restart();
				break;

			case 'linkColor':
				$scope.updateLinkColor(true);
				simulation.alpha(0.3)
					.restart();
				break;

			case 'linkStrenght':
				simulation.force('link', d3__WEBPACK_IMPORTED_MODULE_2__["forceLink"](linksData)
					.id(d => d.id)
					.distance($scope.netVisLayout.distance)
					.strength(link => {
						if ($scope.netVisLayout.linkStrenght === 'max') {
							return 1 / Math.max(link.source.weight, link.target.weight);
						} else {
							return 1 / Math.min(link.source.weight, link.target.weight);
						}
					}))
					.alpha(1)
					.restart();

				break;

			case 'gooeyFX':
				gooeyFX();
				simulation.alpha(0.3)
					.restart();
				break;

			case 'changeColorTheme':
				$scope.darkTheme = !$scope.darkTheme;
				if ($scope.darkTheme) {
					svg.style('background-color', '#000000');
				} else {
					svg.style('background-color', 'transparent');
				}
				$scope.updateNodeColor(true);
				$scope.updateLinkColor(true);
				$scope.updateNodeTitleColor(true);
				simulation.alpha(0.1)
					.restart();
				break;

			case 'sideBar':
				$scope.eventResize();
				// simulation.alpha(0.3).restart();
				break;

			default:
				break;
			}

		});


		/***** UPDATE FUNCTIONS *****/
		const changeNodeWeight = (sourceTagID, targetTagID, value) => {

			const sourceTag = getNodeById(sourceTagID);
			const targetTag = getNodeById(targetTagID);

			//reduce weight
			// console.log(targetTag)
			if (sourceTag && targetTag) {
				
				targetTag.weight += value;

				//remove link
				// angular.forEach($scope.netVis.links, link => {
				for (const link of $scope.netVis.links) {
					// let check = false;
					if (link.source === sourceTag && link.target === targetTag ||
						link.source === targetTag && link.target === sourceTag) {
						const linkIndex = $scope.netVis.links.indexOf(link);
						$scope.netVis.links.splice(linkIndex, 1);
					}
				};

				//test remove orphaned nodes
				if (sourceTag.weight <= 0) $scope.eventRemove(sourceTag, 'cluster');
				if (targetTag.weight <= 0) $scope.eventRemove(targetTag, 'cluster');
			}
		};

		/***** REMOVE FUNCTIONS *****/
		/** 
		 *  Listen the side bar for deselections
		 *
		 */
		$scope.$on('listTagDeselected', (event, tag) => {
			$scope.eventRemove(tag);
			$rootScope.$broadcast('visTagDeselected', tag, 'menu');
		});

		/** 
		 *  Deselection from the visualzation
		 *  Dispatch event to deselect in the side bar
		 */
		$scope.deselect = tag => {
			$scope.eventRemove(tag);
			$rootScope.$broadcast('visTagDeselected', tag, 'vis');
		};

		/** 
		 *  Remove node and its connection from visualization
		 *  
		 */
		$scope.eventRemove = (tag, source) => {

			// const nodesToRemove = [];

			if (tag === $scope.netVis.select) {
				$scope.netVis.select = false;
			}

			// Remove edges from clicked node.
			$scope.netVis.links = $scope.netVis.links.filter(link => {
				if (link.source !== tag && link.target !== tag) {
					return true;
				} else {
					//reduce weight of the remaining nodes (which can produce orphaned Nodes)
					// angular.forEach($scope.netVis.nodes, node => {
					for (const node of $scope.netVis.nodes) {
						if (node === link.source || node === link.target) node.weight--;
					};

				}
			});

			// // Remove orphaned Nodes.
			removeOrphanedNodes();

			if (source !== 'cluster') $scope.updateForceLayout();
		};

		function removeOrphanedNodes() {
			$scope.netVis.nodes = $scope.netVis.nodes.filter(node => {
				if (node.weight > 0) return true;
			});
		}

		/*
		* Clear visualization
		*
		*/
		$scope.$on('clearTagSelection', event => {

			$scope.netVis.select = false;
			$scope.netVis.links.splice(0, $scope.netVis.links.length);
			$scope.netVis.nodes.splice(0, $scope.netVis.nodes.length);

			$scope.updateForceLayout();
		});

		$scope.$on('exportGraph', event => {
			if (simulation) simulation.stop();
		});

		$scope.$on('importData', event => {
			if (simulation) {
				$scope.netVis.select = false;
				$scope.updateForceLayout();
				if(simulation) simulation.stop();
			}
		});



		//*********** RESIZE   
		$scope.eventResize = () => {

			if ($scope.sideBarOpen) {
				// networkContainerWidth = window.innerWidth - d3.select('#side').node().getBoundingClientRect().width; // full window (-)
				networkContainerWidth = window.innerWidth - 300; // hack 
			} else {
				networkContainerWidth = window.innerWidth;
			}

			networkContainerHeight = window.innerHeight - d3__WEBPACK_IMPORTED_MODULE_2__["select"]('#title').node().getBoundingClientRect().height - 5; // full height (-) title height

			if (svg) svg.attr('width', networkContainerWidth).attr('height', networkContainerHeight);

			if (simulation) {
				simulation.force('center', d3__WEBPACK_IMPORTED_MODULE_2__["forceCenter"](networkContainerWidth / 2, networkContainerHeight / 2))
					.force('x', d3__WEBPACK_IMPORTED_MODULE_2__["forceX"](networkContainerWidth / 2).strength($scope.netVisLayout.gravity * 0.1))
					.force('y', d3__WEBPACK_IMPORTED_MODULE_2__["forceY"](networkContainerHeight / 2).strength($scope.netVisLayout.gravity * 0.1))
					.alpha(0.3)
					.restart();
			}
		};

		//*********** initials 
		$window.addEventListener('resize', $scope.eventResize);
		$scope.eventResize();

	});
};

/* harmony default export */ __webpack_exports__["default"] = ({
	init
});

/***/ }),

/***/ "./src/components/network/network.css":
/*!********************************************!*\
  !*** ./src/components/network/network.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/settings/SettingsCtrl.js":
/*!*************************************************!*\
  !*** ./src/components/settings/SettingsCtrl.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AppConfig */ "./src/AppConfig.js");
/* harmony import */ var _settings_user_UserInfoEditCtrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../settings/user/UserInfoEditCtrl */ "./src/components/settings/user/UserInfoEditCtrl.js");




const init = () => {

	_settings_user_UserInfoEditCtrl__WEBPACK_IMPORTED_MODULE_1__["default"].init();

	_AppConfig__WEBPACK_IMPORTED_MODULE_0__["app"].controller('SettingsCtrl', ($rootScope, $scope, $http, $mdPanel, $mdToast) => {

		$scope.usersAccountData = [];
		$scope.accountListItemOver = '';
		$scope.accountEditing = false;

		$scope.infoPanel = null;
		$scope.currentUser = null;

		let originalTitle = $scope.project.title;
		$scope.sendgridAPI = null;

		$scope.showEditUserPanel = user => {

			let action;

			//action
			if (!user) {
				user = {
					id: '-1'
				};
				action = 'create';
			} else {
				action = 'update';
			}

			//close opened panes
			if ($scope.infoPanel) $scope.infoPanel.close();

			//variables
			const locals = {
				action: action,
				user,
				currentUser: {
					level: $scope.currentUser.level
				},
				dataBaseReference: $scope.usersAccountData
			};

			//positions
			const position = $mdPanel.newPanelPosition()
				.relativeTo(document.querySelector('#main'))
				.addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.ALIGN_BOTTOMS);

			//animation
			const animation = $mdPanel.newPanelAnimation()
				.withAnimation({
					open: 'dialog-custom-animation-open',
					close: 'dialog-custom-animation-close'
				});

			//configurations
			const config = {
				id: user.id,
				animation: animation,
				attachTo: document.querySelector('#viz-port'),
				controller: 'UserInfoEditCtrl',
				templateUrl: 'components/settings/user/user.info.edit.html',
				locals: locals,
				panelClass: 'tag-info',
				position: position,
				trapFocus: false,
				zIndex: 80,
				hasBackdrop: true
			};

			//create and launch
			$scope.infoPanel = $mdPanel.create(config);
			$scope.infoPanel.open();

		};

		// ************ //

		$scope.showEditAccountButton = (itemID, value) => {
			$scope.accountListItemOver = (value ? itemID : undefined);
		};

		$scope.editAccountButtonVisibility = itemID => {
			return (itemID === $scope.accountListItemOver ? true : false);
		};

		$scope.getUserById = userID => {
			for (let i = 0; i < $scope.usersAccountData.length; i++) {
				if ($scope.usersAccountData[i].id === userID) return $scope.usersAccountData[i];
			}
			return null;
		};

		// ************ //

		$scope.$on('loadSettings', (event,user) => {

			//re-define user
			$scope.currentUser = user;

			//events
			$scope.$on('userSigned', user => $scope.currentUser = user);

			//
			const titleField = document.getElementById('title-input');
			const sendgridField = document.getElementById('sendgrid-input');
			titleField.addEventListener("focusout", titleChange);
			sendgridField.addEventListener("focusout", sendgridChange);

			//load data;
			if ($scope.usersAccountData.length === 0) loadUsers();
			if ($scope.sendgridAPI === null) loadsendgridAPI();

		});

		const titleChange = e => {
			if ($scope.project.title !== originalTitle) {
				originalTitle = $scope.project.title;
				updateMeta({title: $scope.project.title})
			}
		}

		const sendgridChange = e => {
			if ($scope.sendgridAPI !== e.target.value) {
				$scope.sendgridAPI = e.target.value;
				updateMeta({sendgridAPI: $scope.sendgridAPI})
			}
		}

		const updateMeta = data => {
			const req = {
				method: 'POST',
				url: `api/meta/update.php`,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				data
			}

			$http(req).then( res => {

				if (res.status === 503) return false;

				if (!res.data) {
					$scope.showSimpleToastTag('An error occurred!');
					return;
				}

				if (res.data.action === 'updated') {
					$scope.showSimpleToastTag("Updated.");
				}
				

			}, res => {
				$scope.showSimpleToastTag('An error occurred!');
			});
		}

		const loadUsers = () => {
			$http.get('api/user/read.php').then( res => {
				if (res.status !== 200) return [];
				$scope.usersAccountData = res.data;
			}, res => {
				// console.log(res);
			});
		}

		const loadsendgridAPI = () => {
			$http.get('api/meta/read_sendgrid.php').then( res => {
				if (res.status !== 200) return;
				$scope.sendgridAPI = res.data.sendgridAPI;
			}, res => {
				// console.log(res);
			});
		} 

		$scope.$on('userAction', (event,userData) => {
			
			$scope.infoPanel = null;
			
			if (userData.action === 'created') {

				userData.new = true;
				$scope.usersAccountData.push(userData);

			} else if (userData.action === 'updated') {

				const user = $scope.getUserById(userData.id);

				if (user !== null) {
					if (userData.level !== null) user.level = userData.level;
					if (userData.email !== null) user.email = userData.email;
					if (userData.first !== null) user.first = userData.first;
					if (userData.last !== null) user.last = userData.last;
					user.new = true;
				}

			} if (userData.action === 'deleted') {

				const user = $scope.getUserById(userData.id);

				if (user !== null) {
					const index = $scope.usersAccountData.indexOf(user);
					$scope.usersAccountData.splice(index, 1);
				}

			}
		});

		$scope.showSimpleToastTag = msg => {
			$mdToast.show(
				$mdToast.simple()
					.textContent(msg)
					.position('top center')
					.hideDelay(3000)
					.toastClass('toast-custom')
					.parent(angular.element(document.querySelector('#viz-port')))
			);

		};

	});
};

/* harmony default export */ __webpack_exports__["default"] = ({
	init
});

/***/ }),

/***/ "./src/components/settings/user/UserInfoEditCtrl.js":
/*!**********************************************************!*\
  !*** ./src/components/settings/user/UserInfoEditCtrl.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var password_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! password-generator */ "./node_modules/password-generator/index.js");
/* harmony import */ var password_generator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(password_generator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AppConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../AppConfig */ "./src/AppConfig.js");






const init = () => {

	_AppConfig__WEBPACK_IMPORTED_MODULE_2__["app"].controller('UserInfoEditCtrl', function (
		$rootScope,
		$scope,
		$mdPanel,
		$mdToast,
		$mdBottomSheet,
		$window,
		$http,
		mdPanelRef) {

		$scope.mdPanelRef = mdPanelRef;
		$scope.mdBottomSheet;

		$scope.action = this.action;
		$scope.currentUserLevel = this.user.level;

		const dataBaseReference = this.dataBaseReference;

		$scope.payload;

		if ($scope.action === 'create') {
			this.user.level = 2;
			this.user.emailInvitation = true;
		} else {
			this.user.emailInvitation = false;
		}

		//copy
		$scope.user = angular__WEBPACK_IMPORTED_MODULE_0___default.a.copy(this.user);
		$scope.originalUser = angular__WEBPACK_IMPORTED_MODULE_0___default.a.copy(this.user);


		//---------    

		$scope.saveDisable = () => {
			let value = true;
			if (!angular__WEBPACK_IMPORTED_MODULE_0___default.a.equals($scope.originalUser, $scope.user)) value = false;
			return value;
		};

		$scope.generatePassword = () => {
			$scope.user.password = password_generator__WEBPACK_IMPORTED_MODULE_1___default()(12, false); //https://github.com/bermi/password-generator
		};

		//---------- Save // Delete
		$scope.saveUser = () => {
			if (!$scope.saveDisable() && $scope.user.level !== undefined) {

				$scope.payload = checkChanges();

				$scope.payload.action = $scope.action;
				$scope.payload.invitation = $scope.user.emailInvitation;

				const duplicated = checkForDuplication($scope.payload);

				if (duplicated) {
					$scope.showSimpleToastTag(`The ${$scope.payload.email} is aready  being used!`);
					return;
				}

				//PASSWORD
				if ($scope.action === 'create') {
					if (!$scope.user.password) {
						$scope.payload.password = password_generator__WEBPACK_IMPORTED_MODULE_1___default()(12, false);
					} else {
						$scope.payload.password = $scope.user.password;
					}
				} else if ($scope.action === 'update') {
					if (!$scope.user.password) $scope.payload.password = $scope.user.password;
				}

				submitData($scope.payload);

			}

		};

		const checkForDuplication = payload => {

			let check = false;
			if ($scope.action === 'create') check = true;
			if (payload.email !== undefined) check = true;

			if (check) {
				for (let i = 0; i < dataBaseReference.length; i++) {
					if (dataBaseReference[i].email.toLowerCase() === payload.email.toLowerCase()) {
						return true;
					}
				}
			}

			return false;
		};

		const checkChanges = () => {

			const PL = {
				id: $scope.user.id
			};

			// --- checks

			PL.level = $scope.user.level;
			if ($scope.user.email !== $scope.originalUser.email) PL.email = $scope.user.email;

			if ($scope.user.first !== $scope.originalUser.first) PL.first = $scope.user.first;
			if ($scope.user.last !== $scope.originalUser.last) PL.last = $scope.user.last;

			return PL;

		};

		$scope.showSimpleToastTag = msg => {
			$mdToast.show(
				$mdToast.simple()
					.textContent(msg)
					.position('top center')
					.hideDelay(3000)
					.toastClass('toast-custom')
					.parent(angular__WEBPACK_IMPORTED_MODULE_0___default.a.element(document.querySelector('#viz-port')))
			);

		};

		$scope.deleteUser = ev => {
			$scope.alert = '';
			$mdBottomSheet.show({
				templateUrl: 'components/dialog/bottom-sheet-confirm-delete-dialog.html',
				scope: $scope,
				preserveScope: true,
				// controller: 'TagInfoEditCtrl',
				clickOutsideToClose: false,
				parent: angular__WEBPACK_IMPORTED_MODULE_0___default.a.element(document.querySelector('#tag-card-editing'))
			});
		};

		$scope.confirmDeleteTag = () => {

			// Action
			$mdBottomSheet.cancel();

			$scope.payload = {
				id: $scope.user.id,
				action: 'delete'
			};

			submitData($scope.payload);

		};

		$scope.cancelDialog = () => {
			// Action
			$mdBottomSheet.cancel();
		};

		const submitData = payload => {

			const req = {
				method: 'POST',
				url: `api/user/${payload.action}.php`,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				data: payload
			}

			$http(req).then( res => {

				if (res.status === 503) return false;

				if (!res.data) {
					$scope.showSimpleToastTag('An error occurred!');
					return;
				}

				let msg;

				if ($scope.payload.action === 'delete') {
					msg = 'User removed.';
				} else if ($scope.payload.action === 'create') {
					msg = 'User added.';
					if ($scope.payload.invitation) msg += ' An invitation was sent by email.';
				} else {
					msg = 'User updated.';
				}

				$scope.showSimpleToastTag(msg);
				
				$scope.mdPanelRef.close();
				$rootScope.$broadcast('userAction', res.data);
				

			}, res => {
				$scope.showSimpleToastTag('An error occurred!');
			});
		};

		//---------- Close

		$scope.closeDialog = data => {
			$scope.mdPanelRef.close();
		};

		//---------- Resize

		$scope.eventResize = () => {
			$scope.updatePosition();
		};

		$scope.updatePosition = () => {
			const position = $mdPanel.newPanelPosition()
				.relativeTo(document.querySelector('#main'))
				.addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.ALIGN_BOTTOMS);

			$scope.mdPanelRef.updatePosition(position);
		};

		$window.addEventListener('resize', $scope.eventResize);

	});

};

/* harmony default export */ __webpack_exports__["default"] = ({
	init
});

/***/ }),

/***/ "./src/components/tag/TagInfoCtrl.js":
/*!*******************************************!*\
  !*** ./src/components/tag/TagInfoCtrl.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AppConfig */ "./src/AppConfig.js");


const init = () => {
	_AppConfig__WEBPACK_IMPORTED_MODULE_0__["app"].controller('TagInfoCtrl', function (
		$rootScope,
		$scope,
		$window,
		$mdPanel,
		mdPanelRef) {

		$scope.mdPanelRef = mdPanelRef;

		$scope.userLevel = this.user.level;
		$scope.tag = this.node;
		$scope.relations = this.node.relations;

		$scope.tagLinkColoredChip = false;

		$scope.departments = [];
		$scope.researchers = [];
		$scope.interests = [];

		//correct info
		$scope.showCorrectInfo = true;
		$scope.correctInfo = this.correctInfoButton;

		//check user
		// level: 0 - Super
		//        1 - Editor
		//        2 - User
		$scope.checkUserLevel = value => ($scope.userLevel <= value) ? true : false;

		//separete relations
		if ($scope.relations) {
			for (const relation of $scope.relations) {
				if (relation.type === 'Department') $scope.departments.push(relation);
				if (relation.type === 'Researcher') $scope.researchers.push(relation);
				if (relation.type === 'Interest') $scope.interests.push(relation);
			};
		}

		$scope.tagRelationChipTypeStyle = ({type}) => {
			
			//  console.log($mdColors.getThemeColor('accent'));
			if ($scope.tagLinkColoredChip) {

				switch (type) {

				case 'Department':
					return 'chipAccent';

				case 'Interest':
					return 'chipPrimary';

				case 'Researcher':
					return 'chipWarn';

				default:
					return null;
				}

			} else {
				return 'custom-chip-style';
			}

		};

		$scope.startEditingTag = tag => {
			$rootScope.$broadcast('tagEdition', tag);
			$scope.closeDialog();
		};

		$scope.closeDialog = () => {
			$scope.mdPanelRef.close();
			$rootScope.$broadcast('CloseTagInfoPanel');
		};

		$scope.eventResize = () => $scope.updatePosition();

		$scope.updatePosition = () => {
			
			const position = $mdPanel.newPanelPosition()
				.relativeTo(document.querySelector('#main'))
				.addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.ALIGN_BOTTOMS);

			$scope.mdPanelRef.updatePosition(position);

		};

		$window.addEventListener('resize', $scope.eventResize);

	});
};

/* harmony default export */ __webpack_exports__["default"] = ({
	init
});

/***/ }),

/***/ "./src/components/tag/TagInfoEditCtrl.js":
/*!***********************************************!*\
  !*** ./src/components/tag/TagInfoEditCtrl.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../AppConfig */ "./src/AppConfig.js");




const init = () => {

	_AppConfig__WEBPACK_IMPORTED_MODULE_1__["app"].controller('TagInfoEditCtrl', function (
		$rootScope,
		$scope,
		$mdPanel,
		$mdToast,
		$mdBottomSheet,
		$window,
		$http,
		mdPanelRef) {

		$scope.action = this.action;

		$scope.mdPanelRef = mdPanelRef;
		$scope.userType = this.user.type;
		$scope.tag = angular__WEBPACK_IMPORTED_MODULE_0___default.a.copy(this.tag);
		$scope.originalTag = angular__WEBPACK_IMPORTED_MODULE_0___default.a.copy(this.tag);
		$scope.relations = this.tag.relations;

		$scope.payload;

		const dataBaseReference = this.dataBaseReference;

		$scope.tagLinkColoredChip = false;

		$scope.departments = [];
		$scope.researchers = [];
		$scope.interests = [];

		$scope.mdBottomSheet;

		$scope.relationToDelete = [];
		$scope.relationToAdd = [];

		//separate relations
		// angular.forEach($scope.relations, relation => {
		if ($scope.relations) {
			for (const relation of $scope.relations) {
			
				if (relation.type === 'Department') $scope.departments.push(relation);
				if (relation.type === 'Researcher') $scope.researchers.push(relation);
				if (relation.type === 'Interest') $scope.interests.push(relation);
			}
		}

		$scope.tagRelationChipTypeStyle = ({type}) => {
			//  console.log($mdColors.getThemeColor('accent'));
			if ($scope.tagLinkColoredChip) {

				switch (type) {
				case 'Department':
					return 'chipAccent';

				case 'Interest':
					return 'chipPrimary';

				case 'Researcher':
					return 'chipWarn';

				default:
					return null;
				}

			} else {
				return 'custom-chip-style';
			}

		};

		$scope.saveDisable = () => {
			let value = true;
			if (!angular__WEBPACK_IMPORTED_MODULE_0___default.a.equals($scope.originalTag, $scope.tag)) value = false;
			if ($scope.relationToDelete.length > 0 || $scope.relationToAdd.length > 0 && value) value = false;
			return value;
		};

		//--------- chips

		const tagsLowercase = () => {
			let tags = _tagDatabase;

			return tags.map(tag => {
				tag._lowername = tag.name.toLowerCase();
				tag._lowertype = tag.type.toLowerCase();
				return tag;
			});

		};

		$scope.selectedTagRelation = null;
		const _tagDatabase = this.dataTag;
		$scope.tagDatabase = tagsLowercase();

		const createFilterFor = (query, type) => {
			const lowercaseQuery = query.toLowerCase();

			return tag => {
				if (tag.type === type) {
					return (tag._lowername.indexOf(lowercaseQuery) === 0) ||
						(tag._lowertype.indexOf(lowercaseQuery) === 0);
				}
			};

		};

		$scope.queryTagRelation = (query, type) => {
			const results = query ? $scope.tagDatabase.filter(createFilterFor(query, type)) : [];
			return results;
		};

		$scope.addNewRelation = (chip, source) => {
			let repeated = false;
			// angular.forEach($scope.relations, function(relation) {
			angular__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(source, relation => {
				if (chip.id === relation.id) repeated = true;
			});

			if (repeated) return null;

			$scope.relationToAdd.push(chip);
			$scope.updatePosition();
		};


		//---------- Save // Delete

		const checkForDuplication = payload => {

			let check = false;
			if ($scope.action === 'add') check = true;
			if (payload.name !== undefined) check = true;

			if (check) {
				for (let i = 0; i < dataBaseReference.length; i++) {
					if (dataBaseReference[i].name.toLowerCase() === payload.name.toLowerCase() &&
						dataBaseReference[i].type.toLowerCase() === payload.type.toLowerCase()) {
						return true;
					}
				}
			}

			return false;
		};

		const checkChanges = () => {

			const PL = {
				id: $scope.tag.id,
				type: $scope.tag.type
			};

			// --- checks

			if ($scope.tag.type === 'Researcher') {

				//first & last Name
				if ($scope.tag.first !== $scope.originalTag.first) PL.first = $scope.tag.first;
				if ($scope.tag.last !== $scope.originalTag.last) PL.last = $scope.tag.last;

				//Name
				if ($scope.tag.first !== $scope.originalTag.first ||
					$scope.tag.last !== $scope.originalTag.last) {

					if ($scope.tag.first !== undefined) PL.name = $scope.tag.first;

					if ($scope.tag.last !== undefined) {
						if (PL.name !== undefined) {
							PL.name += ' ' + $scope.tag.last;
						} else {
							PL.name = $scope.tag.last;
						}
					}
					if (PL.name === undefined) PL.name = undefined;
				}


			} else {
				//Name
				if ($scope.tag.name !== $scope.originalTag.name) PL.name = $scope.tag.name;
				PL.first = '';
				PL.last = '';
			}

			//website
			if ($scope.tag.type === 'Researcher') {
				if ($scope.tag.website !== $scope.originalTag.website) PL.website = $scope.tag.website;
			} else {
				PL.website = '';
			}

			//weight
			if ($scope.tag.weight !== $scope.originalTag.weight) PL.weight = $scope.tag.weight;


			///relation to delete
			if ($scope.relationToDelete.length > 0) {
				if (PL.relationToDelete === undefined) PL.relationToDelete = [];
				angular__WEBPACK_IMPORTED_MODULE_0___default.a.forEach($scope.relationToDelete, rel => {
					PL.relationToDelete.push(rel.id);
				});
			}

			if ($scope.tag.type !== $scope.originalTag.type) {
				if ($scope.tag.type === 'Researcher') {
					angular__WEBPACK_IMPORTED_MODULE_0___default.a.forEach($scope.originalTag.relations, rel => {

						if (rel.type === 'Researcher') {
							if (PL.relationToDelete === undefined) {
								PL.relationToDelete = [];
								PL.relationToDelete.push(rel.id);

							} else {

								for (let i = 0; i < PL.relationToDelete.length; i++) {

									if (rel.id === PL.relationToDelete[i]) {
										break;
									} else {
										PL.relationToDelete.push(rel.id);
									}
								}
							}
						}
					});


				} else {
					angular__WEBPACK_IMPORTED_MODULE_0___default.a.forEach($scope.originalTag.relations, rel => {

						if (rel.type === 'Department' || rel.type === 'Interest') {
							if (PL.relationToDelete === undefined) {
								PL.relationToDelete = [];
								PL.relationToDelete.push(rel.id);

							} else {

								for (let i = 0; i < PL.relationToDelete.length; i++) {

									if (rel.id === PL.relationToDelete[i]) {
										break;
									} else {
										PL.relationToDelete.push(rel.id);
									}
								}
							}

						}
					});

				}

			}

			//relation to add
			if ($scope.tag.type === 'Researcher') {

				if ($scope.relationToAdd.length > 0) {
					angular__WEBPACK_IMPORTED_MODULE_0___default.a.forEach($scope.relationToAdd, rel => {
						if (rel.type === 'Department' || rel.type === 'Interest') {
							if (PL.relationToAdd === undefined) PL.relationToAdd = [];
							PL.relationToAdd.push(rel.id);
						}
					});
				}

			} else {

				if ($scope.relationToAdd.length > 0) {
					angular__WEBPACK_IMPORTED_MODULE_0___default.a.forEach($scope.relationToAdd, rel => {
						if (rel.type === 'Researcher') {
							if (PL.relationToAdd === undefined) PL.relationToAdd = [];
							PL.relationToAdd.push(rel.id);
						}
					});
				}

			}

			return PL;

		};

		$scope.saveTag = () => {

			if (!$scope.saveDisable() && $scope.tag.type !== undefined) {

				$scope.payload = checkChanges();
				$scope.payload.action = $scope.action;

				const duplicated = checkForDuplication($scope.payload);

				if (duplicated) {
					if ($scope.payload.type === 'Researcher') {
						$scope.duplicateTag();
					} else {
						$scope.showSimpleToastTag(`The ${$scope.payload.type} ${$scope.payload.name} is aready in the database!`);
					}

				} else {
					submitData($scope.payload);
				}

			}

		};

		$scope.deleteRelation = chip => {
			if ($scope.relationToDelete.length > 0) {
				for (let i = 0; i < $scope.relationToDelete.length; i++) {
					if ($scope.relationToDelete[i] === chip) {
						break;
					} else {
						$scope.relationToDelete.push(chip);
					}
				}
			} else {
				$scope.relationToDelete.push(chip);
			}
		};

		$scope.showSimpleToastTag = msg => {
			$mdToast.show(
				$mdToast.simple()
					.textContent(msg)
					.position('top center')
					.hideDelay(3000)
					.toastClass('toast-custom')
					.parent(angular__WEBPACK_IMPORTED_MODULE_0___default.a.element(document.querySelector('#viz-port')))
			);

		};

		$scope.duplicateTag = () => {
			$scope.alert = '';
			$mdBottomSheet.show({
				templateUrl: 'components/dialog/bottom-sheet-confirm-duplicate-dialog.html',
				scope: $scope,
				preserveScope: true,
				// controller: 'TagInfoEditCtrl',
				clickOutsideToClose: false,
				parent: angular__WEBPACK_IMPORTED_MODULE_0___default.a.element(document.querySelector('#tag-card-editing'))
			});
		};

		$scope.deleteTag = () => {
			$scope.alert = '';
			$mdBottomSheet.show({
				templateUrl: 'components/dialog/bottom-sheet-confirm-delete-dialog.html',
				scope: $scope,
				preserveScope: true,
				// controller: 'TagInfoEditCtrl',
				clickOutsideToClose: false,
				parent: angular__WEBPACK_IMPORTED_MODULE_0___default.a.element(document.querySelector('#tag-card-editing'))
			});
		};

		$scope.confirmDuplicate = () => {
			// Action
			submitData($scope.payload);
			$mdBottomSheet.cancel();
		};

		const submitData = payload => {

			let APIEndPoint;

			if (payload.action === 'add') {
				APIEndPoint = 'create.php';
			} else if (payload.action === 'update') {
				APIEndPoint = 'update.php';
			} else if (payload.action === 'remove') {
				APIEndPoint = 'delete.php';
			}

			const req = {
				method: 'POST',
				url: `api/node/${APIEndPoint}`,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				data: payload
			}

			$http(req).then( res => {

				if (res.status === 503) return false;

				if (!res.data) {
					$scope.showSimpleToastTag('An error occurred!');
					return;
				}

				const msg = (payload.action === 'remove') ? 'Entry deleted!' : 'Saved!';
				$scope.showSimpleToastTag(msg);

				$scope.closeDialog(res.data);

			}, res => {
				console.log(res);
			});

		};

		$scope.confirmDeleteTag = () => {

			// Action
			$mdBottomSheet.cancel();

			$scope.payload = {
				id: $scope.tag.id,
				action: 'remove'
			};

			submitData($scope.payload);

		};

		$scope.cancelDialog = () => {
			// Action
			$mdBottomSheet.cancel();
		};

		//---------- Close

		$scope.closeDialog = data => {
			$scope.mdPanelRef.close();
			$rootScope.$broadcast('CloseTagInfoEditPanel', data);
		};

		//---------- Resize

		$scope.eventResize = () => {
			$scope.updatePosition();
		};

		$scope.updatePosition = () => {
			const position = $mdPanel.newPanelPosition()
				.relativeTo(document.querySelector('#main'))
				.addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.ALIGN_BOTTOMS);

			$scope.mdPanelRef.updatePosition(position);
		};

		$window.addEventListener('resize', $scope.eventResize);

	});

};

/* harmony default export */ __webpack_exports__["default"] = ({
	init
});

/***/ }),

/***/ "./src/components/tag/TagsCtrl.js":
/*!****************************************!*\
  !*** ./src/components/tag/TagsCtrl.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AppConfig */ "./src/AppConfig.js");
/* harmony import */ var _TagInfoCtrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TagInfoCtrl */ "./src/components/tag/TagInfoCtrl.js");
/* harmony import */ var _TagInfoEditCtrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TagInfoEditCtrl */ "./src/components/tag/TagInfoEditCtrl.js");
// import angular from 'angular';






const init = () => {

	_TagInfoCtrl__WEBPACK_IMPORTED_MODULE_1__["default"].init();
	_TagInfoEditCtrl__WEBPACK_IMPORTED_MODULE_2__["default"].init();

	_AppConfig__WEBPACK_IMPORTED_MODULE_0__["app"].controller('TagsCtrl', ($rootScope, $scope, $http, $mdPanel, $window, $mdColors) => {

		$scope.itemTagOver = '';
		$scope.tagEditing = false;

		$scope.searchBoxVisibility = false;
		$scope.searchQuery = {
			name: '',
			selected: undefined
		};
		$scope.filtered = false;

		$scope.correctInfoButton = {
			email: $rootScope.project.email,
			subject: $rootScope.project.title
		};

		$scope.tagListHeightOffset = 42 + 1 + 48 + 135; // top bar + adjust + bottom menu + sub headings categories

		$scope.tagListHeight = () => {
			return {
				height: ($window.innerHeight - $scope.tagListHeightOffset) + 'px'
			};
		};

		$scope.showTagSearchBox = value => {

			$scope.searchBoxVisibility = value;
			$scope.searchQuery.name = '';

			//update virtual repeater container style:height
			const searchBoxHeight = 58;

			if ($scope.searchBoxVisibility) {
				$scope.tagListHeightOffset += searchBoxHeight;
			} else {
				$scope.tagListHeightOffset -= searchBoxHeight;
			}

			if (!$scope.$root.$$phase) $scope.$digest();

		};

		$scope.filterTagByType = value => {

			$scope.filtered = value;

			if ($scope.filtered) {
				$scope.searchQuery.selected = true;
			} else {
				$scope.searchQuery.selected = undefined;
			}

		};

		$scope.tagChecked = ({selected, weight}) => (selected || weight > 0) ? true : false;

		$scope.highlightTags = ({selected}) => {
			let color;

			if (selected) {
				color = $mdColors.getThemeColor('appTheme-warn');
			} else {
				color = $mdColors.getThemeColor('appTheme-primary');
			}

			return {
				color
			};
		};

		$scope.showTagEditButton = (tagID, value) => {
			$scope.itemTagOver = (value ? tagID : undefined);
		};

		const selectTag = tag => {
			tag.selected = true;
			// $scope.netVis.nodes.push(tag);
			$rootScope.$broadcast('listTagSelected', tag);
		};

		const deselectTag = tag => {

			tag.selected = false;

			if ($scope.netVis.nodes.length === 0) {
				$scope.filterTagByType(false);
			}

			if (tag === tag.selected) tag.selected = false;

			const idx = $scope.netVis.nodes.indexOf(tag);
			if (idx > -1) {
				$scope.netVis.nodes.splice(idx, 1);
				if (!$scope.$root.$$phase) $scope.$digest();
				
			}
			if (!$scope.$root.$$phase) $scope.$digest();
		};

		$scope.tagPrimaryAction = tag => {

			const idx = $scope.netVis.nodes.indexOf(tag);
			if (idx > -1) {
				$rootScope.$broadcast('listTagDeselected', tag);
			} else {
				selectTag(tag);
			}

		};

		$scope.$on('visTagSelected', (event, tag) => {
			selectTag(tag);
			if (!$scope.$root.$$phase) $scope.$digest();
		});

		$scope.$on('visTagDeselected', (event, tag) => {
			deselectTag(tag);
		});
		
		$scope.clearTagSelection = () => {
			$scope.netVis.nodes = [];

			// angular.forEach($scope.dataNodes, tag => {
			for (const tag of $scope.dataNodes) {
				tag.selected = false;
				tag.weight = 0;
			};

			if ($scope.searchQuery.selected === true) $scope.filterTagByType(false);

			//broadcast to clear visualization
			$rootScope.$broadcast('clearTagSelection');
		};

		$scope.startEditingTag = tag => {
			$scope.tagBeenEdited = tag;
			$scope.tagEditing = true;
			$scope.tagDatabase = $scope.loadTagsDatabase();
			$scope.tagRelations = $scope.loadTagRelations($scope.tagBeenEdited.id);
		};

		$scope.addTag = () => {
			$scope.tagBeenEdited = {};
			$scope.tagEditing = true;
			$scope.tagDatabase = $scope.loadTagsDatabase();
			$scope.tagRelations = [];
		};

		$scope.$on('tagEdition', (event, tag) => $scope.showEditTagPanel({tag}));

		$scope.$on('visTagInfoPanel', (event,tag) => $scope.showTagInfoPanel(tag));

		// ***********************

		$scope.showTagInfoPanel = ({id}) => {

			//do nothing if it is the same panel;
			if ($scope.infoPanel && $scope.infoPanel.id === id) return;

			loadInfoTag(id);

		};

		const loadInfoTag = id => {

			$http.get(`api/node/read_one.php?id=${id}`).then( res => {

				if (res.status !== 200) {
					console.log(data);
					return false;
				}

				const node = res.data;
				showTagInfoPanelWithData(node);

			}, res => {
				console.log(res);
			});
		};

		const showTagInfoPanelWithData = node => {
			//positions
			const position = $mdPanel.newPanelPosition()
				.relativeTo(document.querySelector('#stage'))
				.addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.ALIGN_BOTTOMS);

			//animation
			const animation = $mdPanel.newPanelAnimation()
				.withAnimation({
					open: 'dialog-custom-animation-open',
					close: 'dialog-custom-animation-close'
				});

			//configurations
			const config = {
				id: node.id,
				animation: animation,
				attachTo: document.querySelector('#viz-port'),
				controller: 'TagInfoCtrl',
				templateUrl: 'components/tag/tag.info.html',
				locals: {
					node,
					user: {
						level: $scope.user.level
					},
					dataTag: $scope.dataNodes,
					correctInfoButton: $scope.correctInfoButton
				},
				panelClass: 'tag-info',
				position: position,
				trapFocus: false,
				zIndex: 80,
				hasBackdrop: false
			};

			const launchTagPanel = () => {
				//Create and launch
				$scope.infoPanel = $mdPanel.create(config);
				$scope.infoPanel.open().then( () => {
					const wrapper = angular.element(document.querySelector('.md-panel-outer-wrapper'));
					wrapper.addClass('md-panel-outer-wrapper-custom');
				});

			};

			//close opened panes
			if ($scope.infoPanel) {
				$scope.infoPanel.close().then( () => {
					$scope.infoPanel = null;
					launchTagPanel();
				});
			} else {
				launchTagPanel();
			}
		};

		$scope.$on('CloseTagInfoPanel', () => $scope.infoPanel = null);

		// ***********************

		$scope.showEditTagPanel = ({action, tag}) => {

			//action
			if (tag) {
				action = 'update';
			} else {
				tag = {id: -1};
			}

			//variables
			const locals = {
				action,
				tag,
				user: {
					level: $scope.user.level
				},
				dataTag: $scope.dataNodes,
				dataBaseReference: $scope.dataNodes
			};
			
			//positions
			const position = $mdPanel.newPanelPosition()
				.relativeTo(document.querySelector('#stage'))
				.addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.ALIGN_BOTTOMS);

			//animation
			const animation = $mdPanel.newPanelAnimation()
				.withAnimation({
					open: 'dialog-custom-animation-open',
					close: 'dialog-custom-animation-close'
				});

			// //configurations
			const config = {
				id: `edit-${tag.id})`,
				animation: animation,
				attachTo: document.querySelector('#viz-port'),
				controller: 'TagInfoEditCtrl',
				templateUrl: 'components/tag/tag.info.edit.html',
				locals: locals,
				panelClass: 'tag-info',
				position: position,
				trapFocus: false,
				zIndex: 80,
				hasBackdrop: true
			};

			const launchTagPanel = () => {
				// //create and launch
				$scope.infoPanel = $mdPanel.create(config);
				$scope.infoPanel.open();
			};

			//close opened panes
			if ($scope.infoPanel) {
				$scope.infoPanel.close().then( () => {
					$scope.infoPanel = null;
					launchTagPanel();
				});
			} else {
				launchTagPanel();
			}

			// $scope.infoPanel = $mdPanel.create(config);
			// $scope.infoPanel.open()

		};

		// ***********************

		$scope.$on('CloseTagInfoEditPanel', (event, data) => {

			$scope.infoPanel = null;

			if (data !== undefined) {

				//update views
				if (data.action === 'created') {
					addTagToList(data);
				} else if (data.action === 'updated') {
					updateTagOnList(data);
				} else if (data.action === 'deleted') {
					deleteTagOnList(data);
				}
			}

		});

		const addTagToList = data => {

			//add data to collection
			data.weight = 0;
			data.selected = false;
			data.new = true;

			$scope.dataNodes.push(data);

			$scope.showTagInfoPanel(data);

		};

		const updateTagOnList = data => {

			const tag = getTagById(data.id);

			if (tag !== null) {
				if (data.type && data.type !== null && data.type !== '') tag.type = data.type;
				if (data.name && data.name !== null && data.name !== '') tag.name = data.name;
				if (data.first && data.first !== null && data.first !== '') tag.first = data.first;
				if (data.last && data.last !== null && data.last !== '') tag.last = data.last;
				if (data.website && data.website !== null && data.website !== '') tag.website = data.website;
				if (data.relationToAdd !== null) tag.linksAdded = data.relationToAdd;
				if (data.relationToDelete !== null) tag.linksRemoved = data.relationToDelete;

				//add label
				tag.new = true;

				//correct weight
				if (isNaN(tag.weight)) tag.weight = 0;

				$scope.showTagInfoPanel(tag);

				// $rootScope.$broadcast('listTagSelected', tag, 'update');
				$rootScope.$broadcast('updatedTagList', tag, 'update');
			}

		};

		const deleteTagOnList = ({id}) => {

			const tag = getTagById(id);
			const index = $scope.dataNodes.indexOf(tag);
			$rootScope.$broadcast('listTagDeselected', tag);
			$scope.dataNodes.splice(index, 1);

		};

		const getTagById = tagID => $scope.dataNodes.find( node => node.id === tagID);

	});
};

/* harmony default export */ __webpack_exports__["default"] = ({
	init
});

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
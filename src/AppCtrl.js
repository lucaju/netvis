import {DateTime} from 'luxon';
import gsap from 'gsap';

import {app} from './AppConfig';

import LoginCtrl from './components/login/LoginCtrl';
import TagsCtrl from './components/tag/TagsCtrl';
import NetworkCtrl from './components/network/NetworkCtrl';
import ExportCtrl from './components/export/ExportCtrl';
import ImportCtrl from './components/import/ImportCtrl';
import SettingsCtrl from './components/settings/SettingsCtrl';


const init = () => {

	TagsCtrl.init();
	NetworkCtrl.init();
	ExportCtrl.init();
	ImportCtrl.init();
	SettingsCtrl.init();
	LoginCtrl.init();

	app.controller('AppCtrl', ($rootScope, $scope, $http, $mdPanel) => {

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

				gsap.to(side, {
					duration: 0.4,
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
				gsap.to(side, {
					duration: 0.4,
					x: '0px'
				});

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

				const now = DateTime.utc();

				//transform and add data
				for (const node of $scope.dataNodes) {
					node.weight = 0;
					node.selected = false;

					const nodeDate = DateTime.fromSQL(node.date);
					
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

export default {
	init
};
<!doctype html>
<html ng-app="app">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Net Viz App</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link href="vendors~main.css" rel="stylesheet"><link href="main.css" rel="stylesheet"><script type="text/javascript" src="vendors~main.app.bundle.js"></script><script type="text/javascript" src="app.bundle.js"></script></head>
<body ng-controller="AppCtrl as appCtrl" md-theme="appTheme" ng-init="init()">
        <div ng-include="'app.html'"></div>
</body>

</html>
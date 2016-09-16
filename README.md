# ng-account-kit

An angular JS implementation for authentication library **"Account Kit"** from Facebook.

### Version
1.0.0

### DEMO

Click [http://l.sgoyal.net/accountkit](http://l.sgoyal.net/accountkit "account-kit demo implementation") to see running demo.

### Features

  - Automatically loads account kit sdk and handles its callback.
  - Support Promises
  - login with sms
  - login with email
 
### Installation

```sh
npm install ng-account-kit
```
OR

```sh
bower install ng-account-kit
```
### Usages

**Step 1** Include script into your index.html file.
```html
<script src="node_modules/ng-account-kit/dist/ng-account-kit.min.js"></script>
```
OR
```html
<script src="bower_component/ng-account-kit/dist/ng-account-kit.min.js"></script>
```
**Step 2** Add dependency to you app module
```javascript
angular.module ("net.sgoyal.sample",['ngAccountKit'])
```
**Step 3** Configure account kit using accountKitProvider
```javascript
angular.module ("net.sgoyal.sample",['ngAccountKit'])
.config (function(accountKitProvider){
    accountKitProvider.configure("YOUR_APP_ID", "VERSION_INFO(v1.0)", "RANDOM_NON_GUESSABLE_STRING_FOR_CSRF_SAFE_CHECK", "CALLBACK_URL");
});

// Callback url will be posted with response received from account kit request. You may want to handle this at your server side code.
```
**Step 4** Use it
```javascript
.controller("AppCtrl", function($scope, $accountKit) {
    $scope.loginWithSMS = function() {
		$accountKit.loginWithSMS()
			.then(function(res) {
				console.log(res)
			});
	};
	$scope.loginWithEmail = function() {
		$accountKit.loginWithEmail()
			.then(function(res) {
				console.log(res)
			}, function(err) {
				console.log(err);
			});
	};
});
```

### $accountKit Methods

* loginWithSMS (countryCode, phoneNumber)
* loginWithEmail (emailAddress)

### Contribute

Do you want to improve it? Sounds cool. Please drop me a line at <mail.goyalshubham@gmail.com>


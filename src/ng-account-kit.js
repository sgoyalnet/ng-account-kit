//loading sdk
var fileref = document.createElement('script');
fileref.setAttribute("type", "text/javascript");
fileref.setAttribute("src", "https://sdk.accountkit.com/en_US/sdk.js");
if (typeof fileref != "undefined")
	document.getElementsByTagName("head")[0].appendChild(fileref);

//adding hidden Field

//creating form
var form = document.createElement('form');
form.setAttribute("method", "post");
form.setAttribute("id", "accountKitForm");
form.setAttribute("name", "accountKitForm");
form.setAttribute("style", "display:none;");
document.getElementsByTagName("body")[0].appendChild(form);

// creating fields
var codeInput = document.createElement('input');
codeInput.setAttribute('type', 'text');
codeInput.setAttribute('name', 'accountKitCode');
codeInput.setAttribute('id', 'accountKitCode');

var stateInput = document.createElement('input');
stateInput.setAttribute('type', 'text');
stateInput.setAttribute('name', 'accountKitState');
stateInput.setAttribute('id', 'accountKitState');

var submitInput = document.createElement('input');
submitInput.setAttribute('type', 'submit');
submitInput.setAttribute('value', 'Submit');

document.getElementById("accountKitForm").appendChild(codeInput);
document.getElementById("accountKitForm").appendChild(stateInput);
document.getElementById("accountKitForm").appendChild(submitInput);

AccountKit_OnInteractive = function() {
	angular.element(document.body).injector().get("$accountKit").init();
};

(function() {
	angular.module('ngAccountKit', [])
		.service('$accountKit', $AccountKit)
		.provider("accountKit", AccountKitProvider);

	$AccountKit.$inject = ['accountKit', '$q'];
	AccountKitProvider.$inject = [];

	function $AccountKit(accountKit, $q) {
		var deferred = $q.defer();
		this.init = function() {
			AccountKit.init({
				appId: accountKit.app_id,
				state: accountKit.state,
				version: accountKit.api_version
			});
			console.log("sdk loaded");
		}

		this.loginWithSMS = function(countryCode, phoneNumber) {
			var params = {};
			if (countryCode)
				params.countryCode = countryCode;
			if (phoneNumber)
				params.phoneNumber = phoneNumber;
			AccountKit.login("PHONE", params, this.loginCallback);
			return deferred.promise;
		};

		this.loginWithEmail = function(emailAddress) {
			var params = {};
			if (emailAddress)
				params.emailAddress = emailAddress;
			AccountKit.login("EMAIL", params, this.loginCallback);
			return deferred.promise;
		};

		this.loginCallback = function(response) {
			if (response.status === "PARTIALLY_AUTHENTICATED") {
				deferred.resolve(response);
				document.getElementById("accountKitCode").value = response.code;
				document.getElementById("accountKitState").value = response.state;
				document.getElementById("accountKitForm").setAttribute("action", accountKit.callbackUrl);
				document.getElementById("accountKitForm").submit();
			} else if (response.status === "NOT_AUTHENTICATED") {
				deferred.reject("Authenticatio Failed");
			} else if (response.status === "BAD_PARAMS") {
				deferred.reject("Bad parameters to login function");
			}
		};
	}

	function AccountKitProvider() {
		var app_id, api_version, state, callbackUrl;
		return {
			configure: function(_app_id, _api_version, _state, _callbackUrl) {
				app_id = _app_id;
				api_version = _api_version;
				state = _state;
				callbackUrl = _callbackUrl;
			},
			$get: function() {
				return {
					app_id: app_id,
					api_version: api_version,
					state: state,
					callbackUrl: callbackUrl
				}
			}
		}
	}
})();
// ==UserScript==
// @name schockGag Loader
// @namespace https://www.bondageprojects.com/
// @version 1.0.0
// @description enhancements for the bondage club
// @author Yui
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match http://localhost:*/*
// @icon data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant none
// @run-at document-end
// ==/UserScript==

(function () {
	"use strict";

	const script = document.createElement("script");
	script.src = "https://github.com/missyui/shockScript/blob/main/schockGag.js";
	document.head.appendChild(script);
})();

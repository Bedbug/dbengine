var global = this;

////////////////////////////////////////////////////////////////////////////////////////////////////
function __delete__(o,a)
{
	if(!o) return;

	if(a)
	{
		for(var i=o.length;i--;)
		{
			o[i] = __delete__(o[i]);
		}
	}

	if(o.hasOwnProperty('Destructor') || ('Destructor' in o))
	{
		o.Destructor();
	}

	delete o;
	o=null;

	return null;
}

(function()
{

	// ==================================================================================================================================
	//	    __  _______  ______
	//	   /  |/  / __ \/ ____/
	//	  / /|_/ / / / /___ \
	//	 / /  / / /_/ /___/ /
	//	/_/  /_/_____/_____/
	//
	// ==================================================================================================================================

    /*
    * Add integers, wrapping at 2^32. This uses 16-bit operations internally
    * to work around bugs in some JS interpreters.
    */
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
    * Bitwise rotate a 32-bit number to the left.
    */
    function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    /*
    * These functions implement the four basic operations the algorithm uses.
    */
    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
    * Calculate the MD5 of an array of little-endian words, and a bit length.
    */
    function binl_md5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << (len % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var i, olda, oldb, oldc, oldd,
            a =  1732584193,
            b = -271733879,
            c = -1732584194,
            d =  271733878;

        for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;

            a = md5_ff(a, b, c, d, x[i],       7, -680876936);
            d = md5_ff(d, a, b, c, x[i +  1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i +  2], 17,  606105819);
            b = md5_ff(b, c, d, a, x[i +  3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i +  4],  7, -176418897);
            d = md5_ff(d, a, b, c, x[i +  5], 12,  1200080426);
            c = md5_ff(c, d, a, b, x[i +  6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i +  7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i +  8],  7,  1770035416);
            d = md5_ff(d, a, b, c, x[i +  9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12],  7,  1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22,  1236535329);

            a = md5_gg(a, b, c, d, x[i +  1],  5, -165796510);
            d = md5_gg(d, a, b, c, x[i +  6],  9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14,  643717713);
            b = md5_gg(b, c, d, a, x[i],      20, -373897302);
            a = md5_gg(a, b, c, d, x[i +  5],  5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10],  9,  38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i +  4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i +  9],  5,  568446438);
            d = md5_gg(d, a, b, c, x[i + 14],  9, -1019803690);
            c = md5_gg(c, d, a, b, x[i +  3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i +  8], 20,  1163531501);
            a = md5_gg(a, b, c, d, x[i + 13],  5, -1444681467);
            d = md5_gg(d, a, b, c, x[i +  2],  9, -51403784);
            c = md5_gg(c, d, a, b, x[i +  7], 14,  1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i +  5],  4, -378558);
            d = md5_hh(d, a, b, c, x[i +  8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16,  1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i +  1],  4, -1530992060);
            d = md5_hh(d, a, b, c, x[i +  4], 11,  1272893353);
            c = md5_hh(c, d, a, b, x[i +  7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13],  4,  681279174);
            d = md5_hh(d, a, b, c, x[i],      11, -358537222);
            c = md5_hh(c, d, a, b, x[i +  3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i +  6], 23,  76029189);
            a = md5_hh(a, b, c, d, x[i +  9],  4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16,  530742520);
            b = md5_hh(b, c, d, a, x[i +  2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i],       6, -198630844);
            d = md5_ii(d, a, b, c, x[i +  7], 10,  1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i +  5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12],  6,  1700485571);
            d = md5_ii(d, a, b, c, x[i +  3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i +  1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i +  8],  6,  1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i +  6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21,  1309151649);
            a = md5_ii(a, b, c, d, x[i +  4],  6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i +  2], 15,  718787259);
            b = md5_ii(b, c, d, a, x[i +  9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return [a, b, c, d];
    }

    /*
    * Convert an array of little-endian words to a string
    */
    function binl2rstr(input) {
        var i,
            output = '';
        for (i = 0; i < input.length * 32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        }
        return output;
    }

    /*
    * Convert a raw string to an array of little-endian words
    * Characters >255 have their high-byte silently ignored.
    */
    function rstr2binl(input) {
        var i,
            output = [];
        output[(input.length >> 2) - 1] = undefined;
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0;
        }
        for (i = 0; i < input.length * 8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        }
        return output;
    }

    /*
    * Calculate the MD5 of a raw string
    */
    function rstr_md5(s) {
        return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    }

    /*
    * Calculate the HMAC-MD5, of a key and some data (raw strings)
    */
    function rstr_hmac_md5(key, data) {
        var i,
            bkey = rstr2binl(key),
            ipad = [],
            opad = [],
            hash;
        ipad[15] = opad[15] = undefined;
        if (bkey.length > 16) {
            bkey = binl_md5(bkey, key.length * 8);
        }
        for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
    }

    /*
    * Convert a raw string to a hex string
    */
    function rstr2hex(input) {
        var hex_tab = '0123456789abcdef',
            output = '',
            x,
            i;
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F) +
                hex_tab.charAt(x & 0x0F);
        }
        return output;
    }

    /*
    * Encode a string as utf-8
    */
    function str2rstr_utf8(input) {
        return unescape(encodeURIComponent(input));
    }

    /*
    * Take string arguments and return either raw or hex encoded strings
    */
    function raw_md5(s) {
        return rstr_md5(str2rstr_utf8(s));
    }
    function hex_md5(s) {
        return rstr2hex(raw_md5(s));
    }
    function raw_hmac_md5(k, d) {
        return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
    }
    function hex_hmac_md5(k, d) {
        return rstr2hex(raw_hmac_md5(k, d));
    }

    global.md5 = function(string, key, raw)
    {
        if (!key)
        {
            if (!raw)
            {
                return hex_md5(string);
            }
            return raw_md5(string);
        }
        if (!raw)
        {
            return hex_hmac_md5(key, string);
        }
        return raw_hmac_md5(key, string);
    }
})();

var LOBBY_MESSAGES_ENUM =
{
	LOBBY_MESSAGE_SPLASH_SCREEN_LOADED: 0,
	LOBBY_MESSAGE_GAME_ERROR: 1,
	LOBBY_MESSAGE_REFRESH_BALANCE: 2,
	LOBBY_MESSAGE_GO_HOME: 3,
	LOBBY_MESSAGE_GO_BACK: 4,
	LOBBY_MESSAGE_LOST_FOCUS: 5,
	LOBBY_MESSAGE_GOT_FOCUS: 6,
	LOBBY_MESSAGE_TICKET_REQUEST: 7,
	LOBBY_MESSAGE_TICKET_RESPONSE: 13,
	LOBBY_MESSAGE_STATE_FATAL_ERROR: 1000,
	LOBBY_MESSAGE_STATE_SHOW_ERROR_MESSAGE: 1001,
	LOBBY_MESSAGE_STATE_START_GAME: 1100,
	LOBBY_MESSAGE_STATE_WAIT_FOR_BET: 1111,
	LOBBY_MESSAGE_STATE_NEXT_AUTO_PLAY: 1112,
	LOBBY_MESSAGE_STATE_ACTIONS_BEGIN: 1200,
	LOBBY_MESSAGE_STATE_ACTIONS_NEXT: 1210,
	LOBBY_MESSAGE_STATE_ACTIONS_FINISH: 1220,
	LOBBY_MESSAGE_STATE_ACTION_BEGIN: 1510,
	LOBBY_MESSAGE_STATE_ACTION_CHECK_FREE_SPIN: 1520,
	LOBBY_MESSAGE_STATE_ACTION_DISPLAY_EXIT_FREE_SPIN_TRANSITION: 1530,
	LOBBY_MESSAGE_STATE_ACTION_DISPLAY_TOTAL_WIN_LINES: 1540,
	LOBBY_MESSAGE_STATE_ACTION_DISPLAY_WIN_LINES: 1550,
	LOBBY_MESSAGE_STATE_ACTION_ENTER_INNER_FREE_SPIN: 1560,
	LOBBY_MESSAGE_STATE_ACTION_ENTER_OUTER_FREE_SPIN: 1570,
	LOBBY_MESSAGE_STATE_ACTION_EXIT_INNER_FREE_SPIN: 1580,
	LOBBY_MESSAGE_STATE_ACTION_EXIT_OUTER_FREE_SPIN: 1590,
	LOBBY_MESSAGE_STATE_ACTION_SET_STOPS: 1600,
	LOBBY_MESSAGE_STATE_ACTION_SHOW_WIN_MESSAGE: 1610,
	LOBBY_MESSAGE_STATE_ACTION_UPDATE_BALANCE: 1620,
	LOBBY_MESSAGE_STATE_ACTION_WAIT_TO_STOP_SPINNING: 1630,
	LOBBY_MESSAGE_STATE_DISPLAY_INTRO: 2000,
	LOBBY_MESSAGE_STATE_DISPLAY_PAYTABLE_PANEL: 2010,
	LOBBY_MESSAGE_STATE_DISPLAY_REALITY_CHECK_MESSAGE: 2020,
	LOBBY_MESSAGE_STATE_DISPLAY_SESSION_TIMEOUT_MESSAGE: 2030,
	LOBBY_MESSAGE_STATE_DOWNLOAD_GAME_CONFIG: 5000,
	LOBBY_MESSAGE_STATE_NETWORK_CLOSE_ACTION: 5100,
	LOBBY_MESSAGE_STATE_NETWORK_GET_TICKET: 5200
};

var LOBBY_MESSAGE_SPLASH_SCREEN_LOADED = 0;
var LOBBY_MESSAGE_GAME_ERROR = 1;
var LOBBY_MESSAGE_REFRESH_BALANCE = 2;
var LOBBY_MESSAGE_GO_HOME = 3;
var LOBBY_MESSAGE_GO_BACK = 4;
var LOBBY_MESSAGE_LOST_FOCUS = 5;
var LOBBY_MESSAGE_GOT_FOCUS = 6;
var LOBBY_MESSAGE_TICKET_REQUEST = 7;
var LOBBY_MESSAGE_TICKET_RESPONSE = 13;
var LOBBY_MESSAGE_STATE_FATAL_ERROR = 1000;
var LOBBY_MESSAGE_STATE_SHOW_ERROR_MESSAGE = 1001;
var LOBBY_MESSAGE_STATE_START_GAME = 1100;
var LOBBY_MESSAGE_STATE_WAIT_FOR_BET = 1111;
var LOBBY_MESSAGE_STATE_NEXT_AUTO_PLAY = 1112;
var LOBBY_MESSAGE_STATE_ACTIONS_BEGIN = 1200;
var LOBBY_MESSAGE_STATE_ACTIONS_NEXT = 1210;
var LOBBY_MESSAGE_STATE_ACTIONS_FINISH = 1220;
var LOBBY_MESSAGE_STATE_ACTION_BEGIN = 1510;
var LOBBY_MESSAGE_STATE_ACTION_CHECK_FREE_SPIN = 1520;
var LOBBY_MESSAGE_STATE_ACTION_DISPLAY_EXIT_FREE_SPIN_TRANSITION = 1530;
var LOBBY_MESSAGE_STATE_ACTION_DISPLAY_TOTAL_WIN_LINES = 1540;
var LOBBY_MESSAGE_STATE_ACTION_DISPLAY_WIN_LINES = 1550;
var LOBBY_MESSAGE_STATE_ACTION_ENTER_INNER_FREE_SPIN = 1560;
var LOBBY_MESSAGE_STATE_ACTION_ENTER_OUTER_FREE_SPIN = 1570;
var LOBBY_MESSAGE_STATE_ACTION_EXIT_INNER_FREE_SPIN = 1580;
var LOBBY_MESSAGE_STATE_ACTION_EXIT_OUTER_FREE_SPIN = 1590;
var LOBBY_MESSAGE_STATE_ACTION_SET_STOPS = 1600;
var LOBBY_MESSAGE_STATE_ACTION_SHOW_WIN_MESSAGE = 1610;
var LOBBY_MESSAGE_STATE_ACTION_UPDATE_BALANCE = 1620;
var LOBBY_MESSAGE_STATE_ACTION_WAIT_TO_STOP_SPINNING = 1630;
var LOBBY_MESSAGE_STATE_DISPLAY_INTRO = 2000;
var LOBBY_MESSAGE_STATE_DISPLAY_PAYTABLE_PANEL = 2010;
var LOBBY_MESSAGE_STATE_DISPLAY_REALITY_CHECK_MESSAGE = 2020;
var LOBBY_MESSAGE_STATE_DISPLAY_SESSION_TIMEOUT_MESSAGE = 2030;
var LOBBY_MESSAGE_STATE_DOWNLOAD_GAME_CONFIG = 5000;
var LOBBY_MESSAGE_STATE_NETWORK_CLOSE_ACTION = 5100;
var LOBBY_MESSAGE_STATE_NETWORK_GET_TICKET = 5200;

var LOBBY_DATA_TRANSFER =
{
	method: null,
	data: null
};

function CanvasLobby(__CLASS__CANVASLOBBY__$LobbyProvider__, __CLASS__CANVASLOBBY__$LobbyDomain__)
{
	var __BASE__ = null;

	function __CanvasLobby(__CLASS__CANVASLOBBY__$LobbyProvider__, __CLASS__CANVASLOBBY__$LobbyDomain__)
	{
		var __PDEFINE__ = Object.defineProperty;
		var __NOENUM__ = {enumerable:false};
		var __CLASS__CANVASLOBBY__ = this.__CLASS__CANVASLOBBY__ = this;
		var __THIS__ = this;
		this.toString = function ()
		{
			return 'CanvasLobby';
		};
		__PDEFINE__(this, '__THIS__', { enumerable: false, get: function () { return __THIS__; }, set: function (v) { __THIS__ = v; } });
		var __VIRTUAL__ = this.__VIRTUAL__ =
		{
			__PROTECTED__: {}
		};
		var __PRIVATE__ = this.__PRIVATE__ = {};
		var __PROTECTED__ = this.__PROTECTED__ = {};
		__PDEFINE__(this, '__PRIVATE__', __NOENUM__);
		__PDEFINE__(this, '__PROTECTED__', __NOENUM__);
		
		this.__className = "CanvasLobby";
		
		__PRIVATE__.LobbyDomain = "";
		
		this.SendMessage = function (cmd, json)
		{
			
			var transfer =
			{
				"method": "",
				"data": null
			};
			
			transfer.data = json ? JSON.parse(json) : null;
			
			switch (cmd)
			{
				
			case LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_SPLASH_SCREEN_LOADED:
				
				transfer.method = "splashLoaded";
				
				break;
				
			case LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_GAME_ERROR:
				
				transfer.method = "gameError";
				
				break;
				
			case LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_REFRESH_BALANCE:
				
				transfer.method = "refreshBalance";
				
				break;
				
			case LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_GO_HOME:
				
				transfer.method = "goToLobby";
				
				break;
				
			case LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_GO_BACK:
				
				transfer.method = "goToLobby";
				
				break;
				
			case LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_LOST_FOCUS:
				
				transfer.method = "lostFocus";
				
				break;
				
			case LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_GOT_FOCUS:
				
				transfer.method = "gotFocus";
				
				break;
				
			case LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_TICKET_REQUEST:
				
				transfer.method = "placingBet";
				
				break;
				
			case LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_TICKET_RESPONSE:
				
				transfer.method = "placedBet";
				
				break;
			}
			
			window.parent.postMessage(transfer, __CLASS__CANVASLOBBY__.__PRIVATE__.LobbyDomain);
			
			transfer = __delete__(transfer, undefined);
			
			return true;
			
		};
		
		this.ReceiveLobby = function (e)
		{
			
		};
		
		this.Destructor = function ()
		{
			{
				
				window.removeEventListener("message", __CLASS__CANVASLOBBY__.ReceiveLobby);
				
			}
			{}
			return true;
		};
		
		this.Constructor = function (LobbyProvider, LobbyDomain)
		{
			
			__CLASS__CANVASLOBBY__.__PRIVATE__.LobbyDomain = LobbyDomain;
			
			window.addEventListener("message", __CLASS__CANVASLOBBY__.ReceiveLobby, false);
			
		};
		__PDEFINE__(this, 'Constructor', __NOENUM__);
		this.Constructor(__CLASS__CANVASLOBBY__$LobbyProvider__, __CLASS__CANVASLOBBY__$LobbyDomain__);
		return this;
	}
	__CanvasLobby.prototype.constructor = __CanvasLobby;
	return Object.preventExtensions(new __CanvasLobby(__CLASS__CANVASLOBBY__$LobbyProvider__, __CLASS__CANVASLOBBY__$LobbyDomain__));
}
CanvasLobby.__PRIVATE__ = {};
CanvasLobby.__PROTECTED__ = {};


// ==================================================================================================================================
//	   _________    __  _________    _____ __________ _    ____________      __________  _   __________________
//	  / ____/   |  /  |/  / ____/   / ___// ____/ __ \ |  / / ____/ __ \    / ____/ __ \/ | / / ____/  _/ ____/
//	 / / __/ /| | / /|_/ / __/      \__ \/ __/ / /_/ / | / / __/ / /_/ /   / /   / / / /  |/ / /_   / // / __  
//	/ /_/ / ___ |/ /  / / /___     ___/ / /___/ _, _/| |/ / /___/ _, _/   / /___/ /_/ / /|  / __/ _/ // /_/ /  
//	\____/_/  |_/_/  /_/_____/____/____/_____/_/ |_| |___/_____/_/ |_|____\____/\____/_/ |_/_/   /___/\____/   
//	                        /_____/                                 /_____/                                    
// ==================================================================================================================================

var GAME_SERVER_CONFIG =
{
	GameID: null,
	OperatorID: null,
	LobbyID: null,
	LobbyDomain: null,
	Host: null,
	Port: null,
	UserToken: null,
	APIVersionID: null,
	GameLocaleID: null,
	GameMode: null
};

// ==================================================================================================================================
//	    __          __    __          ____                       
//	   / /   ____  / /_  / /_  __  __/ __ \_________  _  ____  __
//	  / /   / __ \/ __ \/ __ \/ / / / /_/ / ___/ __ \| |/_/ / / /
//	 / /___/ /_/ / /_/ / /_/ / /_/ / ____/ /  / /_/ />  </ /_/ / 
//	/_____/\____/_.___/_.___/\__, /_/   /_/   \____/_/|_|\__, /  
//	                        /____/                      /____/   
// ==================================================================================================================================

function LobbyProxy(__CLASS__LOBBYPROXY__$SERVER_CONFIG__)
{
	var __BASE__ = null;

	function __LobbyProxy(__CLASS__LOBBYPROXY__$SERVER_CONFIG__)
	{
		var __PDEFINE__ = Object.defineProperty;
		var __NOENUM__ = {enumerable:false};
		var __CLASS__LOBBYPROXY__ = this.__CLASS__LOBBYPROXY__ = this;
		var __THIS__ = this;
		this.toString = function ()
		{
			return 'LobbyProxy';
		};
		__PDEFINE__(this, '__THIS__', { enumerable: false, get: function () { return __THIS__; }, set: function (v) { __THIS__ = v; } });
		var __VIRTUAL__ = this.__VIRTUAL__ =
		{
			__PROTECTED__: {}
		};
		var __PRIVATE__ = this.__PRIVATE__ = {};
		var __PROTECTED__ = this.__PROTECTED__ = {};
		__PDEFINE__(this, '__PRIVATE__', __NOENUM__);
		__PDEFINE__(this, '__PROTECTED__', __NOENUM__);
		
		this.__className = "LobbyProxy";
		
		__PRIVATE__.lobby = null;
		
		this.SERVER_CONFIG = null;
		
		this.SendMessage = function (cmd, json)
		{			
			return __CLASS__LOBBYPROXY__.__PRIVATE__.lobby.SendMessage(cmd, json);			
		};
		
		this.__PRIVATE__.getUserToken = function ()
		{			
			return __CLASS__LOBBYPROXY__.__PRIVATE__.getUrlSettingByName("UserToken", __CLASS__LOBBYPROXY__.SERVER_CONFIG.UserToken);			
		};
		
		this.getLocale = function ()
		{			
			return __CLASS__LOBBYPROXY__.SERVER_CONFIG.GameLocaleID;			
		};
		
		this.SetHeader = function (Header)
		{			
			Header.APIVersionID = 1;			
			Header.GameID = __CLASS__LOBBYPROXY__.SERVER_CONFIG.GameID;			
			Header.RequestID = md5(String(Date.now()));			
			Header.GameLocaleID = __CLASS__LOBBYPROXY__.__PRIVATE__.getUrlSettingByName("GameLocaleId", __CLASS__LOBBYPROXY__.SERVER_CONFIG.GameLocaleID);			
			Header.OperatorID = __CLASS__LOBBYPROXY__.SERVER_CONFIG.OperatorID;			
			Header.UserToken = __CLASS__LOBBYPROXY__.__PRIVATE__.getUserToken();			
			Header.AuthToken = __CLASS__LOBBYPROXY__.__PRIVATE__.getUrlSettingByName("authentication_token", "AC4D47E8-329B-4806-9406-4D8F6677F413");			
			Header.GameMode = __CLASS__LOBBYPROXY__.SERVER_CONFIG.GameMode;			
		};
		
		this.__PRIVATE__.getUrlSettingByName = function (Key, Default)
		{			
			var qs = window.location.search.substr(1);			
			var v = qs.split("&");			
			var p = null;			
			var result = Default;
			
			for (var i = v.length - 1; i >= 0; i--)			
			{				
				p = v[i].split("=");				
				if (p[0].toLowerCase() == Key.toLowerCase())				
				{					
					result = p[1];					
					p = __delete__(p, undefined);					
					break;					
				}				
				p = __delete__(p, undefined);				
			}			
			v = __delete__(v, undefined);			
			return result;			
		};
		
		this.Destructor = function ()
		{
			{				
				__CLASS__LOBBYPROXY__.__PRIVATE__.lobby = __delete__(__CLASS__LOBBYPROXY__.__PRIVATE__.lobby, undefined);				
			}
			{
				__CLASS__LOBBYPROXY__.__PRIVATE__.lobby = null;
				__CLASS__LOBBYPROXY__.SERVER_CONFIG = null;
			}
			return true;
		};
		
		this.Constructor = function (SERVER_CONFIG)
		{			
			__CLASS__LOBBYPROXY__.__PRIVATE__.lobby = null;			
			__CLASS__LOBBYPROXY__.SERVER_CONFIG = SERVER_CONFIG;
			
			var LobbyProvider = SERVER_CONFIG.LobbyID;			
			var LobbyDomain = SERVER_CONFIG.LobbyDomain;
			
			if (!LobbyProvider)			
				LobbyProvider = "CANVAS";
			
			if (!LobbyDomain)			
				LobbyDomain = "*";
			
			if (LobbyProvider == "CANVAS")			
				__CLASS__LOBBYPROXY__.__PRIVATE__.lobby = new CanvasLobby(LobbyDomain, "*");
			
		};
		__PDEFINE__(this, 'Constructor', __NOENUM__);
		this.Constructor(__CLASS__LOBBYPROXY__$SERVER_CONFIG__);
		return this;
	}
	__LobbyProxy.prototype.constructor = __LobbyProxy;
	return Object.preventExtensions(new __LobbyProxy(__CLASS__LOBBYPROXY__$SERVER_CONFIG__));
}
LobbyProxy.__PRIVATE__ = {};
LobbyProxy.__PROTECTED__ = {};

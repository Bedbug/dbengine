    IntralotServer = {};

    // The Lobby proxy for bi-directional operation between Lobby and Game
    LOBBY_PROXY = null;

    IntralotServer.betCount = 0;

    IntralotServer.config = {
        RGS_HOST: "",
        RGS_PORT: "",
        RGS_GAME_ID: ""
    }

    IntralotServer.headers = {
        "APIVersionID": null,
        "RequestID": null,
        "ResponseID": null,
        "ResponseCode": null,
        "ResponseMessage": null,
        "GameID": null,
        "GameLocaleID": null,
        "OperatorID": null,
        "UserToken": null,
        "AuthToken": null,
        "GameMode": null,
        "CData": null
    }

    IntralotServer.device = {
        "DeviceClass": "Windows 7",
        "DeviceModel": "intel corei7",
        "DeviceSDKVersion": "7",
        "DeviceMobileBrowserName": "App4lication",
        "DeviceScreenWidth": "1280",
        "DeviceScreenHeight": "720",
        "DevicePixelRatio": "1.5",
        "CData": null
    }

    IntralotServer.PayTableID = "";



    IntralotServer.init = function(cbk) {
        this.updateDeviceInfo();
        this.updateServerSettings();

        // Setup Lobby Proxy
        this.CREATE_LOBBY_PROXY();

        return this.GET_GAME_SETTINGS(cbk);
    }

    IntralotServer.updateServerSettings = function() {
        // Setting the host settings from the config.json
        if (bedbugGameCore.config.Host && bedbugGameCore.config.Port) {
            this.config.RGS_HOST = bedbugGameCore.config.Host;
            this.config.RGS_PORT = bedbugGameCore.config.Port;
            this.config.RGS_GAME_ID = bedbugGameCore.config.GameID;
        }
        else {
            // open error box
            // Get the Intralot specific error message
            error_message = IntralotErrorHandler.getErrorMessage(1000);

            // Produce the eror popup to the user
            MessageTools.error(bedbugGameCore.game, "Error: " + error.status, error_message, "Exit to Lobbby", "", function() {
                    console.log("Lobby!");
                },
                function() {})
        }


        // Merge configurable settings in headers
        var mergeableSettings = _.pick(bedbugGameCore.config, ["APIVersionID", "OperatorID", "OperatorGameID", "GameID", "GameLocaleID"]);
        _.merge(this.headers, mergeableSettings);

        // this.headers.GameID = bedbugGameCore.configuration.server_settings.Game.Configuration.GameID;

        // Assign the first random Request GUID
        this.headers.RequestID = bedbugGameCore.getGuid();

        // Setup the language
        bedbugGameCore.configuration.default_language = bedbugGameCore.config.GameLocaleID;
    }

    IntralotServer.updateDeviceInfo = function() {
        this.device.DeviceClass = platform.os.family;
        this.device.DeviceSDKVersion = platform.os.version || "10";
        this.device.DeviceModel = platform.product || "intel corei7";
        this.device.DeviceMobileBrowserName = platform.name;
        this.device.DeviceScreenWidth = window.screen.width;
        this.device.DeviceScreenHeight = window.screen.height;
        this.device.DevicePixelRatio = window.devicePixelRatio > 0 ? window.devicePixelRatio : 1;
        //  console.log(IntralotServer.device);
    }

    IntralotServer.Play = function(_betAmount, _coinValue, _betLevel, _betLines, cbk) {
        this.GET_TICKET(IntralotServer.betCount, _betAmount, _coinValue, _betLevel, _betLines, function(serverData, error) {

            if (!error) {
                ServerParser.TranslatePlayData(serverData, function(ResultObject, BestSymbol, SpinsQueue) {

                    if (SpinsQueue) {
                        // Create the spin queue
                        bedbugGameCore.spins_queue = SpinsQueue;
                        // Hold a reference to the number of total free spins
                        bedbugGameCore.bonus_total_free_spins = SpinsQueue.length;

                    }

                    if (cbk)
                        cbk(ResultObject, BestSymbol);
                });
            }
            else {
                console.log(error);
            }


        });
    }

    IntralotServer.FinishAction = function(_action, cbk) {
        this.UPDATE_TICKET(_action.TicketID, _action.ActionID, function() {
            if (cbk) {
                cbk();
            }
        });
    }

    IntralotServer.FreePlay = function(cbk) {
        var play = bedbugGameCore.spins_queue.shift();
        cbk(play);
    }

    IntralotServer.UpdateThemeSpecs = function() {
        // Replace ids of winning lines cause Intarlot server changes them constantly
        if (bedbugGameCore.configuration.server_settings.Game.WinLines)
            _.each(bedbugGameCore.configuration.server_settings.Game.WinLines, function(winline) {
                _.find(bedbugGameCore.game_specs.lines, {
                    id: winline.WinLineCaption
                }).winlineid = winline.WinLineID;
            })

        // Set the number of bet lines for the theme as supplied by the RGS
        if (bedbugGameCore.configuration.server_settings.Game.WagerSettings.BetLines)
            bedbugGameCore.game_specs.config.bet_lines = bedbugGameCore.configuration.server_settings.Game.WagerSettings.BetLines[0];


        bedbugGameCore.coin_value = parseFloat(bedbugGameCore.configuration.server_settings.Game.WagerSettings.CoinValues[bedbugGameCore.coin_value_current] * 0.01);

        bedbugGameCore.bet_levels = bedbugGameCore.configuration.server_settings.Game.WagerSettings.BetLevels;

        bedbugGameCore.bet_level = bedbugGameCore.bet_levels[0];

        bedbugGameCore.log("Updated theme according to server specs", true);
    }


    // Request to receive settings from server
    IntralotServer.GET_GAME_SETTINGS = function(cbk) {
        var that = this;
        $.support.cors = true;

        // LOBBY PROXY - SET HEADERS
        LOBBY_PROXY.SetHeader(IntralotServer.headers);

        var host_uri = IntralotServer.config.RGS_HOST + ":" + IntralotServer.config.RGS_PORT + "/api/slot/v" + IntralotServer.headers.APIVersionID + "/game/";
        var game_id = IntralotServer.config.RGS_GAME_ID;
        var data = JSON.stringify({
            Header: IntralotServer.headers,
            Device: IntralotServer.device
        })



        var settings = {
            "async": true,
            "crossDomain": true,
            "url": host_uri + game_id,
            "method": "POST",
            "data": data,
            success: function(response) {

                if (response.Header.ResponseCode == "200") {
                    if (response.Header)
                        IntralotServer.headers = response.Header;

                    // Set the PayTableID
                    IntralotServer.PayTableID = response.Game.PayTables[0].PayTableID;


                    if (cbk)
                        cbk(response);
                }
                else {
                    error = {
                        code: response.Header.ResponseCode,
                        message: IntralotErrorHandler.getErrorMessage(response.Header.ResponseCode)
                    };

                    // Produce the eror popup to the user
                    MessageTools.error(bedbugGameCore.game, "Error: " + error.status, error.message, "Exit to Lobbby", "Retry", function() {
                            console.log("Lobby!");
                            bedbugGameCore.GoHome();
                        },
                        function() {
                            that.GET_GAME_SETTINGS(cbk);
                        })
                }
            },
            error: function(error, textStatus, errorThrown) {
                bedbugGameCore.log("Server settings received", false);

                // Get the Intralot specific error message
                error_message = IntralotErrorHandler.getErrorMessage(error.status);

                // Produce the eror popup to the user
                MessageTools.error(bedbugGameCore.game, "Error: " + error.status, error_message, "Exit to Lobbby", "Retry", function() {
                        console.log("Lobby!");
                        bedbugGameCore.GoHome();
                    },
                    function() {
                        that.GET_GAME_SETTINGS(cbk);
                    })
            }
        }
        $.ajax(settings);
    }

    IntralotServer.GET_TICKET = function(_betid, _betAmount, _coinValue, _betLevel, _betLines, cbk) {
        var that = this;
        // Notify Lobby that the game has requested a Ticket
        if (LOBBY_PROXY)
            LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_TICKET_REQUEST);

        IntralotServer.headers.RequestID = bedbugGameCore.getGuid();

        var loaderTimeout = setTimeout(displayLoader, 3000);

        function displayLoader() {
            MessageTools.showLoader();
        }
        
        // Enforce Timout
        // return;

        var host_uri = IntralotServer.config.RGS_HOST + ":" + IntralotServer.config.RGS_PORT + "/api/slot/v" + IntralotServer.headers.APIVersionID + "/game/";
        var game_id = IntralotServer.config.RGS_GAME_ID;
        var data = JSON.stringify({
            Header: IntralotServer.headers,
            Wager: {
                "WagerID": IntralotServer.betCount,
                "PayTableID": IntralotServer.PayTableID,
                "Amount": _betAmount,
                "CoinValue": _coinValue,
                "BetLevel": _betLevel,
                "BetLines": _betLines,
                // "CData": ""

            }
        })
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": host_uri + game_id + "/ticket",
            "method": "POST",
            "data": data,
            success: function(response) {

                clearTimeout(loaderTimeout);
                MessageTools.hideLoader();

                bedbugGameCore.log("Play ticket received", true);

                var error = null;

                if (response.Header.ResponseCode == "200") {
                    if (response.Header)
                        IntralotServer.headers = response.Header;

                    // Notify Lobby that the game has received a Ticket
                    if (LOBBY_PROXY)
                        LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_TICKET_RESPONSE);

                    // Notify Lobby that the balance of the user has changed
                    if (LOBBY_PROXY)
                        LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_REFRESH_BALANCE);

                    // Notify Lobby that we received Ticket
                    if (LOBBY_PROXY)
                        LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_STATE_NETWORK_GET_TICKET);
                }
                else {
                    error = {
                        code: response.Header.ResponseCode,
                        message: IntralotErrorHandler.getErrorMessage(response.Header.ResponseCode)
                    };

                    clearTimeout(loaderTimeout);
                    MessageTools.hideLoader();

                    // Produce the eror popup to the user
                    MessageTools.error(bedbugGameCore.game, "Error: " + error.code, error.message, bedbugGameCore.getLocalizedText("BTN_TXT_EXIT_TO_LOBBY_LABEL"), null, function() {
                            bedbugGameCore.GO_HOME();
                        },
                        function() {
                            bedbugGameCore.controls_enabled = true;
                            Controls.showPlay();
                            Controls.setCountText('');
                        }
                    );
                }

                if (cbk)
                    cbk(response, error);
            },
            error: function(error, textStatus, errorThrown) {
                bedbugGameCore.log("Play ticket received", false);

                // Get the Intralot specific error message
                error_message = IntralotErrorHandler.getErrorMessage(error.status);

                clearTimeout(loaderTimeout);
                MessageTools.hideLoader();

                // Produce the eror popup to the user
                MessageTools.error(bedbugGameCore.game, "Error: " + error.status, error_message, bedbugGameCore.getLocalizedText("BTN_TXT_EXIT_TO_LOBBY_LABEL"), null, function() {
                        console.log("Lobby!");
                        bedbugGameCore.GO_HOME();
                    },
                    function() {
                        that.GET_TICKET(_betid, _betAmount, _coinValue, _betLevel, _betLines, cbk);
                    })
            }
        }
        $.ajax(settings);
    }

    IntralotServer.UPDATE_TICKET = function(_ticketid, _actionid, cbk) {
        var host_uri = IntralotServer.config.RGS_HOST + ":" + Server.config.RGS_PORT + "/api/slot/v" + IntralotServer.headers.APIVersionID + "/ticket/" + _ticketid;
        var game_id = IntralotServer.config.RGS_GAME_ID;

        // IntralotServer.headers.RequestID = bedbugGameCore.getGuid();
        if (cbk)
            cbk(null, null);

        var data = JSON.stringify({
            Header: IntralotServer.headers,
            Ticket: {
                "TicketID": _ticketid,
                "ActionID": _actionid,
                "ActionStatus": 0
            }
        })
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": host_uri, //+ game_id + "/ticket"
            "method": "POST",
            "data": data,
            success: function(response) {
                bedbugGameCore.log("Action finalized", true);

                var error = null;

                if (response.Header.ResponseCode == "200") {
                    // if (response.Header)
                    //     IntralotServer.headers = response.Header;

                    // Notify Lobby that we received Ticket
                    if (LOBBY_PROXY)
                        LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_STATE_NETWORK_CLOSE_ACTION);
                }
                else {
                    error = {
                        code: response.Header.ResponseCode,
                        message: IntralotErrorHandler.getErrorMessage(response.Header.ResponseCode)
                    };

                    // Produce the eror popup to the user
                    MessageTools.error(bedbugGameCore.game, "Error: " + error.code, error.message, "Exit to Lobbby", "Close", function() {
                            bedbugGameCore.GO_HOME();
                        },
                        function() {}
                    );
                }

                // if (cbk)
                //     cbk(response, error);
            },
            error: function(error, textStatus, errorThrown) {
                // bedbugGameCore.log("Action finalized failed", false);

                // // Get the Intralot specific error message
                // error_message = IntralotErrorHandler.getErrorMessage(error.status);

                // // Produce the eror popup to the user
                // MessageTools.error(bedbugGameCore.game, "Error: " + error.status, error_message, "Exit to Lobbby", "Retry", function() {
                //         console.log("Lobby!");
                //     },
                //     function() {
                //         UPDATE_TICKET(_ticketid, _actionid, cbk);
                //     })
            }
        }
        $.ajax(settings);
    }

    IntralotServer.CREATE_LOBBY_PROXY = function() {
        // Create Lobby Proxy
        if (!bedbugGameCore.config.LobbyID) bedbugGameCore.config.LobbyID = "CANVAS";
        if (!bedbugGameCore.config.LobbyDomain) bedbugGameCore.config.LobbyDomain = "*";

        LOBBY_PROXY = new LobbyProxy(bedbugGameCore.config);

        // Notify Lobby that game has loaded
        if (LOBBY_PROXY)
            LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_SPLASH_SCREEN_LOADED);

    }


    IntralotErrorHandler = {
        getErrorMessage: function(statusCode) {

            // Notify Lobby that there was an error
            if (LOBBY_PROXY)
                LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_GAME_ERROR);

            if (this.errorMessages[statusCode]) {
                if (statusCode == "1015")
                    return bedbugGameCore.getLocalizedText(this.errorMessages[statusCode]);

                return this.errorMessages[statusCode];
            }
            else
                return this.errorMessages[0];
        },
        errorMessages: {
            "0": "Game failed to connect to server",
            "400": "Bad Request",
            "401": "Unauthorized",
            "402": "Payment required",
            "403": "Access forbidden",
            "404": "Not found",
            "405": "Method not allowed",
            "406": "Request not acceptable",
            "407": "Proxy authentication required",
            "408": "Request timeout",
            "409": "Conflict",
            "410": "Gone",
            "411": "Certain length required",
            "412": "Precondition failed",
            "413": "Payload too large",
            "414": "URI too long",
            "415": "Unsupported media type",
            "416": "Range not satisfiable",
            "417": "Expectation failed",
            "418": "I’m a teapot",
            "419": "Authentication timeout",
            "421": "Misdirected request",
            "422": "Unprocessable entity",
            "423": "Locked",
            "424": "Failed dependency",
            "426": "Upgrade required",
            "428": "Precondition required",
            "429": "Too many requests",
            "431": "Request header fields too large",
            "451": "Unavailable for legal reasons",
            "452": "Invalid ticket request",
            "460": "Wallet debit failed",
            "461": "Wallet credit failed",
            "462": "Wallet refund failed",
            "463": "Wallet balance failed",
            "470": "RNG failed",
            "471": "Rollback failed",
            "1000": "Host is not defined in the configuration file",
            "1015": "MSG_OUT_OF_BALANCE_TOTAL",
            "1999": "Wallet unknown error"

        }

    }
    
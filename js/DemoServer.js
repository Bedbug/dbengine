    DemoServer = {};

    DemoServer.betCount = 0;

    DemoServer.config = {
        RGS_HOST: "10.70.6.246",
        RGS_PORT: "8080",
        RGS_GAME_ID: "0F29B507-7EB2-438B-A989-6F884BB989B2"
    }

    DemoServer.headers = {
        "APIVersionID": "1",
        "RequestID": "6880E573-A5FF-4C13-A667-79BE2A063F7A",
        "ResponseID": null,
        "ResponseCode": null,
        "ResponseMessage": null,
        "GameID": "0F29B507-7EB2-438B-A989-6F884BB989B2",
        "GameLocaleID": "en-GB",
        "OperatorID": "00000000-0000-0000-0000-000000000001",
        "UserToken": "219a0febd0484d28928519df6ceeda58",
        "AuthToken": "AC4D47E8-329B-4806-9406-4D8F6677F413",
        "GameMode": 0,
        "CData": null

    }

    DemoServer.device = {
        "DeviceClass": "Windows 7",
        "DeviceModel": "intel corei7",
        "DeviceSDKVersion": "7",
        "DeviceMobileBrowserName": "App4lication",
        "DeviceScreenWidth": "1280",
        "DeviceScreenHeight": "720",
        "DevicePixelRatio": "1.5",
        "CData": null
    }

    DemoServer.PayTableID = "";



    DemoServer.init = function(cbk) {

        return GET_GAME_SETTINGS(cbk);
    }

    DemoServer.Play = function(_betAmount, _coinValue, _betLevel, _betLines, cbk) {

        this.GET_TICKET(DemoServer.betCount, _betAmount, _coinValue, _betLevel, _betLines, function(serverData) {

            ServerParser.TranslatePlayData(serverData, function(ResultObject, BestSymbol, SpinsQueue) {


                if (SpinsQueue){
                    bedbugGameCore.spins_queue = SpinsQueue;
                    bedbugGameCore.bonus_total_free_spins = SpinsQueue.length;
                }

                if (cbk)
                    cbk(ResultObject, BestSymbol);
            });


        });
    }

    DemoServer.FreePlay = function(cbk) {
        var play = bedbugGameCore.spins_queue.shift();
        cbk(play);
    }

    DemoServer.FinishAction = function(_action, cbk) {
        if (cbk)
            cbk();
    }


    DemoServer.UpdateThemeSpecs = function() {
        var ind =0;
        // Replace ids of winning lines cause Intarlot server changes them constantly
        _.each(bedbugGameCore.configuration.server_settings.Game.WinLines, function(winline) {
            // console.log(ind+":"+winline.WinLineID);
            ind++;
            
            _.find(bedbugGameCore.game_specs.lines,{id:winline.WinLineCaption}).winlineid = winline.WinLineID;
        })

        // Set the number of bet lines for the theme as supplied by the RGS
        if (bedbugGameCore.configuration.server_settings.Game.WagerSettings.BetLines)
            bedbugGameCore.game_specs.config.bet_lines = bedbugGameCore.configuration.server_settings.Game.WagerSettings.BetLines[0];
        
         bedbugGameCore.coin_value = parseFloat(bedbugGameCore.configuration.server_settings.Game.WagerSettings.CoinValues[bedbugGameCore.coin_value_current] * 0.01);
        
        bedbugGameCore.log("Updated theme according to server specs", true);
    }


    // Request to receive settings from server
    // var GET_GAME_SETTINGS = function(cbk) {

    //     $.support.cors = true;

    //     var host_uri = "http://" + DemoServer.config.RGS_HOST + ":" + DemoServer.config.RGS_PORT + "/api/slot/v1/game/";
    //     var game_id = DemoServer.config.RGS_GAME_ID;
    //     var data = JSON.stringify({
    //         Header: DemoServer.headers,
    //         Device: DemoServer.device
    //     })
    //     var settings = {
    //         "async": true,
    //         "crossDomain": true,
    //         "url": host_uri + game_id,
    //         "method": "POST",
    //         "data": data,
    //         success: function(response) {

    //             // Set the PayTableID
    //             DemoServer.PayTableID = response.Game.PayTables[0].PayTableID;

    //             if (cbk)
    //                 cbk(response);
    //         },
    //         error: function(error, textStatus, errorThrown) {
    //             bedbugGameCore.log("Server settings received", false);
    //             MessageTools.error(bedbugGameCore.game, "Error: " + error.status, errorThrown || "Game failed to connect to server.", "Exit to Lobbby", "Reload", function() {
    //                     console.log("Lobby!");
    //                 },
    //                 function() {
    //                     console.log("Reload!");
    //                 })
    //         }
    //     }
    //     $.ajax(settings);
    // }

    DemoServer.GET_TICKET = function(_betid, _betAmount, _coinValue, _betLevel, _betLines, cbk) {
        if (!DemoResponses[DemoServer.betCount])
            DemoServer.betCount = 0;

        if (bedbugGameCore.urlSettings.test)
            DemoServer.betCount = bedbugGameCore.urlSettings.test

        if (cbk)
            cbk(DemoResponses[DemoServer.betCount]);

        DemoServer.betCount++
    }
    
// INTRALOT to BEDBUG_GAME_ENGINE Parser
var ServerParser = {};


// Translates the data received from intralot GET TICKET request
// to a usable format.
ServerParser.TranslatePlayData = function(serverData, cbk) {
    
    var FreeSpins = [];

    var parsedPlayData = createPlayFromAction(serverData.Ticket.Actions[0],serverData.Ticket.TicketID);
    
    if(parsedPlayData.UpgradeBonusGame) {
        parsedPlayData.NextActionMultiplier = 2;
        bedbugGameCore.bonus_multiplier ++;
    }

    if (_.size(serverData.Ticket.Actions) > 1) {
        
        _.times(serverData.Ticket.Actions.length, function(i) {
            if (i > 0){
                var Action = createPlayFromAction(serverData.Ticket.Actions[i], serverData.Ticket.TicketID);
                // if(serverData.Ticket.Action[i] && Action.spinMultiplier < serverData.Ticket.Actions[i+1].ActionMultiplier){
                //     Action.UpgradeBonusGame = serverData.Ticket.Actions[i+1].ActionMultiplier;
                // }
                 if(Action.UpgradeBonusGame){ 
                     bedbugGameCore.bonus_multiplier ++;
                     Action.NextActionMultiplier = bedbugGameCore.bonus_multiplier;
                 }
                FreeSpins.push(Action);
            }
        })
    }

    var bestSymbol = countSymbols(parsedPlayData.Table);

    if (cbk)
        cbk(parsedPlayData, bestSymbol, FreeSpins)
    else
        return parsedPlayData;
}


/**
 ** Basic Function to parse Intralot Actions
 */
function createPlayFromAction(Action, _ticketID) {
    
    var parsedAction = {
        TicketID: _ticketID,
        // Used to inform server that action was served
        ActionID: Action.ActionID,
        
        ActionLevel: Action.ActionLevel,
        
        // The Win type
        WinLevel: Action.WinLevel,
        
        UpgradeBonusGame: Action.ActionAward === "3" || Action.ActionAward === "2",
        
        NextActionMultiplier: 1,
        
        FreeSpinsLeft: Action.FreeSpinsLeft,
        
        spinMultiplier: Action.ActionMultiplier,
        // The cash amount won in the current Action
        WinAmount: Action.WinAmount,
        // The coins won in the current Action
        WinCoins: Action.WinCoins,
        // The user balance before the action
        InitialBalance: Action.InitialBalance,
        // The user balance after the action
        FinalBalance: Action.FinalBalance,
        // The progressive cash amount won in consecutive actions
        ProgressiveTotalWinAmount: Action.ProgressiveTotalWinAmount,
        // The progressive coins amount won in consecutive actions
        ProgressiveTotalWinCoins: Action.ProgressiveTotalWinCoins,
        // The progressive coins amount won in consecutive actions
        BonusTotalWinCoins: Action.FreeSpinsTotalWinCoins,
        BonusTotalWinCash: Action.FreeSpinsTotalWinAmount,
        // Distribution of symbols
        Table: [],
        // WinLines of the action
        WinLines: [],
        // Special conditions for the reel animation
        ReelPlayType: [],
        // The index of the reel anticipation. Used to time animation of Reels
        ReelAnticipationIndex: [],
    }
    
    // console.log(parsedAction.UpgradeBonusGame);
    /**
     ** Create Translated Symbols Table
     **/
    var index = 0;
    var totalScattersCount = 0;
    var anticipationModeOn = 0;
    var symbols = Action.SymbolDistributions[0].Symbols;

    var reelHasScatter = [];
    var anticipationIndex = [];
    _.times(bedbugGameCore.game_specs.grid.columns, function() {
        reelHasScatter.push(0);
        parsedAction.ReelAnticipationIndex.push(0);
    })


    _.times(symbols.length, function(i) {

        if (i % bedbugGameCore.game_specs.grid.columns == 0) {
            index = 0;
        }

        if (!parsedAction.Table[index]) {
            // Push a new columns
            parsedAction.Table.push([]);
            parsedAction.ReelPlayType.push(1);
        }

        var symbolID = symbols[i].SymbolID;
        
        if (symbolID == bedbugGameCore.game_specs.slots.scatterSymbolID) {
            // console.log("-- Reel has scatter.")
            reelHasScatter[index] = 1;
        }

        parsedAction.Table[index].push(symbolID);
        index++;
    });


    /**
     ** Create the Reel Animation Types 
     */
    _.times(reelHasScatter.length, function(i) {
        if (reelHasScatter[i] == 1) {
            totalScattersCount++;

            // If scatter count is less than 2 set this Reel to Scatter Appear Mode
            if (totalScattersCount < 3)
                parsedAction.ReelPlayType[i] = 2;

            // If scatter count is more than 2 we have a win so we Reel to Scatter Win with Anticipation Mode
            if (totalScattersCount > 2)
                parsedAction.ReelPlayType[i] = !bedbugGameCore.settings.fast_spins?4:2; // If fast spins do not show anticipation

            //  Since 2 scatters have appeared, let'set all other Reels default mode to Anticipation;
            if (totalScattersCount == 2)
                anticipationModeOn = i;
        }
        // We have Anticipation Mode enabled and our Reel is still in Normal Mode. Let's change that.
        if (anticipationModeOn > 0 && parsedAction.ReelPlayType[i] == 1)
            parsedAction.ReelPlayType[i] = !bedbugGameCore.settings.fast_spins?3:1; // If fast spins do not show anticipation;

        if (anticipationModeOn > 0)
            parsedAction.ReelAnticipationIndex[i] = i - anticipationModeOn;
    })



    /**
     ** Create Translated WinLines
     **/
    var paylines = Action.PayLines;

    _.each(paylines, function(payline) {

        // if (payline.WinLineID != "") {
            var translatedPayline = TranslatePayline(payline);
            parsedAction.WinLines.push(translatedPayline);
        // }
    })
    
    return parsedAction;

}

function TranslatePayline(payline) {
    var translatedPayline = {};
    translatedPayline.line = payline.WinLineID;
    translatedPayline.amount = payline.WinCoins;
    translatedPayline.symbols = convertIndexToXYPositions(payline.PayLineLayout);
    return translatedPayline;
}

function convertIndexToXYPositions(symbolsIndex) {
    
    
    var XYpos = [];
    _.times(symbolsIndex.length, function(i) {
        // var pos = [i, Math.floor(symbolsIndex[i] / bedbugGameCore.game_specs.grid.columns)];
        XYpos.push(ServerParser.SymbolDistributionMap[symbolsIndex[i]]);
    })
    return XYpos;
}

ServerParser.SymbolDistributionMap = {
    "0":[0,0],
    "1":[1,0],
    "2":[2,0],
    "3":[3,0],
    "4":[4,0],
    "5":[0,1],
    "6":[1,1],
    "7":[2,1],
    "8":[3,1],
    "9":[4,1],
    "10":[0,2],
    "11":[1,2],
    "12":[2,2],
    "13":[3,2],
    "14":[4,2],
}


/**
 * Method to calculate the best symbol in order to change the weather stage.
*/
function countSymbols(table) {
    var allsymbols = _
        .chain(table)
        .flatten()
        .countBy()
        .value();

    allsymbols = _.omit(allsymbols, [bedbugGameCore.symbolNameToID('Q'), bedbugGameCore.symbolNameToID('K'), bedbugGameCore.symbolNameToID('J'), bedbugGameCore.symbolNameToID('A'), bedbugGameCore.symbolNameToID('TEN'), bedbugGameCore.symbolNameToID('WILD'), bedbugGameCore.symbolNameToID('SCATTER')]);

    var best = {
        value: 0,
        key: null
    };

    _.each(allsymbols, function(value, key) {
        // console.log(key);
        if (best.value < value)
            best = {
                "key": key,
                "value": value
            };
    })
    
    // Return best symbol if it exceeds the change_weather_special_count in settings
    if (best.value > bedbugGameCore.configuration.change_weather_special_count)
        return best.key;
    else
        return null;
}

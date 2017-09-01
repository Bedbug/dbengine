NumericInput = {
    _defaults: {
        isMoney: false,
        isTime: false,
        initialValue: 0,
        min: 12,
        max: 24,
        description: "",
        inputWidth: 800,
        inputHeight: 80,
        inputY: 250,
        keyboardInitHeight: 150,
        textStyle: {
            font: "50px Arial"
        },
        buttonStyle: {
            font: "bold 45px Arial"
        },
         submitButtonStyle: {
            font: "bold 55px Arial"
        }
    },
    create: function(context, options, callback) {

        var that = this;

        options = _.merge(_.cloneDeep(this._defaults), options);

        // Create the blocking background
        this.Bg = context.add.graphics(0, 0);
        this.Bg.beginFill(0x000000, .9);
        this.Bg.drawRect(0, 0, bedbugGameCore.game.width, bedbugGameCore.game.height);
        this.Bg.endFill();
        this.Bg.inputEnabled = true;

        // Create the input group
        this.numericInput = context.add.group();

        var inputWhiteBg = context.add.graphics(0, 0);
        inputWhiteBg.beginFill(0xffffff, 1);
        inputWhiteBg.drawRoundedRect(0, 0, options.inputWidth, options.inputHeight, 10);
        inputWhiteBg.endFill();

        var descriptionText = context.add.text(15, inputWhiteBg.y - 30, options.description, {
            font: options.textStyle.font,
            fill: "white"
        })
        descriptionText.anchor.setTo(0, 0.5);

        var inputValue = context.add.text(15, options.inputHeight / 2 + 5, "", {
            font: options.textStyle.font,
            fill: "black"
        })
        inputValue.anchor.setTo(0, 0.5);

        if (options.isTime) {
            var helpText = context.add.text(inputWhiteBg.x + inputWhiteBg.width, options.inputHeight / 2 + 5, "hh:mm ", {
                font: options.textStyle.font,
                fill: "grey"
            })
            helpText.anchor.setTo(1, 0.5);
        }

        if (options.isMoney && !options.isTime) {
            this.value = options.initialValue.toString();
            formatValue(options.initialValue);
        }
        else {
            that.value = "";
            formatValue();
        }

        var btnSpace = 20;
        var keyboardInitHeight = options.keyboardInitHeight;
        var btnSize = (inputWhiteBg.width - (btnSpace * 5)) / 6;
        var btnStyle = {
            font: options.buttonStyle.font,
            bgColor: 0x535353,
            backgroundAlpha: 1
        };
        var delimeterSymbol = bedbugGameCore.configuration.server_settings.Game.Configuration.LocalizedDecimalSeparator;

        var num1 = new CustomButton(context, "1", btnSize / 2 + ((btnSize + btnSpace) * 0), keyboardInitHeight + ((btnSize + btnSpace) * 0), btnSize, btnSize, addValue, null, false, btnStyle, false, true, 1);
        var num2 = new CustomButton(context, "2", btnSize / 2 + ((btnSize + btnSpace) * 1), keyboardInitHeight + ((btnSize + btnSpace) * 0), btnSize, btnSize, addValue, null, false, btnStyle, false, true, 2);
        var num3 = new CustomButton(context, "3", btnSize / 2 + ((btnSize + btnSpace) * 2), keyboardInitHeight + ((btnSize + btnSpace) * 0), btnSize, btnSize, addValue, null, false, btnStyle, false, true, 3);
        var num4 = new CustomButton(context, "4", btnSize / 2 + ((btnSize + btnSpace) * 3), keyboardInitHeight + ((btnSize + btnSpace) * 0), btnSize, btnSize, addValue, null, false, btnStyle, false, true, 4);
        var num5 = new CustomButton(context, "5", btnSize / 2 + ((btnSize + btnSpace) * 4), keyboardInitHeight + ((btnSize + btnSpace) * 0), btnSize, btnSize, addValue, null, false, btnStyle, false, true, 5);
        var backspace = new CustomButton(context, "⇤", btnSize / 2 + ((btnSize + btnSpace) * 5), keyboardInitHeight + ((btnSize + btnSpace) * 0), btnSize, btnSize, backspaceClick, null, false, btnStyle, false, true);
        var num6 = new CustomButton(context, "6", btnSize / 2 + ((btnSize + btnSpace) * 0), keyboardInitHeight + ((btnSize + btnSpace) * 1), btnSize, btnSize, addValue, null, false, btnStyle, false, true, 6);
        var num7 = new CustomButton(context, "7", btnSize / 2 + ((btnSize + btnSpace) * 1), keyboardInitHeight + ((btnSize + btnSpace) * 1), btnSize, btnSize, addValue, null, false, btnStyle, false, true, 7);
        var num8 = new CustomButton(context, "8", btnSize / 2 + ((btnSize + btnSpace) * 2), keyboardInitHeight + ((btnSize + btnSpace) * 1), btnSize, btnSize, addValue, null, false, btnStyle, false, true, 8);
        var num9 = new CustomButton(context, "9", btnSize / 2 + ((btnSize + btnSpace) * 3), keyboardInitHeight + ((btnSize + btnSpace) * 1), btnSize, btnSize, addValue, null, false, btnStyle, false, true, 9);
        var num0 = new CustomButton(context, "0", btnSize / 2 + ((btnSize + btnSpace) * 4), keyboardInitHeight + ((btnSize + btnSpace) * 1), btnSize, btnSize, addValue, null, false, btnStyle, false, true, 0);

        // if (!options.isTime)
        var delimeter = new CustomButton(context, delimeterSymbol, btnSize / 2 + ((btnSize + btnSpace) * 5), keyboardInitHeight + ((btnSize + btnSpace) * 1), btnSize, btnSize, addDelimeter, null, false, (options.isMoney && !options.isTime) ? btnStyle : _.merge(btnStyle, {
            backgroundAlpha: 0.5,
            fill: 'grey'
        }), false, true);
        // else
        //     var dots = new CustomButton(context, ":", btnSize / 2 + ((btnSize + btnSpace) * 5), keyboardInitHeight + ((btnSize + btnSpace) * 1), btnSize, btnSize, addDots, null, false, btnStyle, false, true);

        var bigButtonsWidth = (inputWhiteBg.width / 2) - (btnSpace / 2);
        var cancelBtn = new CustomButton(context, "X", bigButtonsWidth / 2 + ((btnSpace + bigButtonsWidth) * 0), keyboardInitHeight + ((btnSize + btnSpace) * 2), bigButtonsWidth, btnSize, cancel, null, false, {
            font: options.submitButtonStyle.font,
            bgColor: 0x3F3F3F,
            fill: "red",
            backgroundAlpha: 1
        }, false, true, 1);

        var commitBtn = new CustomButton(context, "↵", bigButtonsWidth / 2 + ((btnSpace + bigButtonsWidth) * 1), keyboardInitHeight + ((btnSize + btnSpace) * 2), bigButtonsWidth, btnSize, returnValueAndClose, null, false, {
            font: options.submitButtonStyle.font,
            bgColor: 0x158826,
            fill: "white",
            backgroundAlpha: 1
        }, false, true, 1);

        commitBtn.alpha = 0.2;

        function returnValueAndClose() {
            // Reject if not valid;
            if (commitBtn.aplha < 1) return;

            var finalValue = null;
            if (options.isTime)
                finalValue = that.value.split(":");
            else
                finalValue = parseFloat(that.value.replace(delimeterSymbol, '.'));
            // console.log("Returned Value: " + finalValue);
            if (callback)
                callback(finalValue);
            closeAndDestroy();
        }

        function cancel() {
            closeAndDestroy();
        }

        function closeAndDestroy() {
            context.add.tween(that.numericInput).to({
                alpha: 0
            }, 500, Phaser.Easing.Exponential.In, true, 0, 0, false);
            this.closeTween = context.add.tween(that.numericInput).to({
                y: (bedbugGameCore.game.height / 2 - options.inputY) + 200
            }, 500, Phaser.Easing.Back.In, true, 100, 0, false);

            this.closeTween.onComplete.add(function() {
                that.numericInput.destroy();
                that.Bg.destroy();
            });
        }

        function addValue(context, num) {
            if (options.isTime && that.value.length > 4) return;
            that.value = that.value.toString() + num;
            if (options.isTime && that.value.length == 2 && that.value.indexOf(":") == -1) {
                that.value += ":";
            }
            formatValue();
            // inputValue.setText(formatValue(that.value));
        }

        function backspaceClick() {
            if (options.isTime) {
                if (that.value.length == 3)
                    that.value = that.value.toString().slice(0, -2);
                else
                    that.value = that.value.toString().slice(0, -1);
            }
            else
                that.value = that.value.toString().slice(0, -1);
            formatValue();
            // inputValue.setText(formatValue(that.value));
        }



        function addDelimeter() {
            if (!options.isMoney) return;

            that.value = that.value.toString() + delimeterSymbol;

            formatValue();
            // inputValue.setText(formatValue(that.value));
        }

        // function addDots() {
        //     if (!options.isTime || this.value.indeOf(":")>-1 || this.value.length < 2) return;

        //     that.value = that.value.toString() + ":";

        //     formatValue();
        //     // inputValue.setText(formatValue(that.value));
        // }

        function formatValue() {

            if (options.isTime) {
                inputValue.setText(that.value);
                validate();
            }
            else {
                if (that.value == "" || that.value == undefined) that.value = "0";

                var val = Math.min(Math.max(parseFloat(that.value), options.min), options.max);

                var delimeterIndex = that.value.indexOf(delimeterSymbol);
                var i = String(delimeterIndex > -1 ? parseInt(that.value.slice(0, that.value.indexOf(delimeterSymbol))) : parseInt(that.value));
                // var i = that.value.slice(0,that.value.indexOf(delimeterSymbol)+1),
                var j = (j = i.length) > 3 ? j % 3 : 0;
                var t = bedbugGameCore.configuration.server_settings.Game.Configuration.LocalizedThousandsSeparator;

                var thousand = (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)

                val = delimeterIndex > -1 ? (thousand + that.value.substr(that.value.indexOf(delimeterSymbol), that.value.length)) : thousand;
                var formatedValue = options.isMoney ?
                    (bedbugGameCore.configuration.server_settings.Game.Configuration.CurrencySymbolPosition == 0 || bedbugGameCore.configuration.server_settings.Game.Configuration.CurrencySymbolPosition == 2) ?
                    bedbugGameCore.configuration.server_settings.Game.Configuration.LocalizedCurrencySymbol + val :
                    val + bedbugGameCore.configuration.server_settings.Game.Configuration.LocalizedCurrencySymbol :
                    val;

                inputValue.setText(formatedValue);
                validate();
            }

        }

        function validate() {
            if (options.isTime) {
                var time = that.value.split(":");
                if (time.length != 2 || time[1] == "" || time[1].length == 1)
                    return failTime();
                if (parseInt(time[0]) > 24)
                    return failTime();
                if (parseInt(time[0]) == 24 && parseInt(time[1]) > 0)
                    return failTime();
                if (time[1] > 60)
                    return failTime();

                return succeedTime();
            }
            else {
                if (that.value.length == 0)
                    return fail();
                if (that.value.length == 1 && that.value == "0")
                    return fail();

                return succeed();
            }

        }

        function fail() {
            if (commitBtn)
                commitBtn.alpha = 0.2;
        }

        function succeed() {
            if (commitBtn)
                commitBtn.alpha = 1;
        }

        function failTime() {
            if (commitBtn)
                commitBtn.alpha = 0.2;
            if (helpText)
                helpText.setStyle({
                    font: options.textStyle.font,
                    fill: "red"
                });
        }

        function succeedTime() {
            if (commitBtn)
                commitBtn.alpha = 1;
            if (helpText)
                helpText.setStyle({
                    font: options.textStyle.font,
                    fill: "green"
                });
        }

        this.numericInput.addChild(inputWhiteBg);
        this.numericInput.addChild(descriptionText);
        this.numericInput.addChild(num1);
        this.numericInput.addChild(num2);
        this.numericInput.addChild(num3);
        this.numericInput.addChild(num4);
        this.numericInput.addChild(num5);
        this.numericInput.addChild(backspace);
        this.numericInput.addChild(num6);
        this.numericInput.addChild(num7);
        this.numericInput.addChild(num8);
        this.numericInput.addChild(num9);
        this.numericInput.addChild(num0);

        // if (!options.isTime)
        this.numericInput.addChild(delimeter);
        // else{
        //     this.numericInput.addChild(dots);
        if (options.isTime)
            this.numericInput.addChild(helpText);
        // }

        this.numericInput.addChild(cancelBtn);
        this.numericInput.addChild(commitBtn);

        this.numericInput.addChild(inputValue);

        this.numericInput.x = bedbugGameCore.game.width / 2 - inputWhiteBg.width / 2;
        this.numericInput.y = bedbugGameCore.game.height / 2 - options.inputY;

        this.numericInput.alpha = 0;

        // Now display the widget
        context.add.tween(this.numericInput).to({
            alpha: 1
        }, 500, Phaser.Easing.Exponential.Out, true, 500, 0, false);
        context.add.tween(this.numericInput).from({
            y: (bedbugGameCore.game.height / 2 - options.inputY) + 200
        }, 500, Phaser.Easing.Back.Out, true, 500, 0, false);
    }
}

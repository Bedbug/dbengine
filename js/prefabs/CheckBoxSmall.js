var CheckΒoxSmall = function(x, y, game, text, hasLabel, checked, prestyle, callback, bitmap, bitmapAtlas, bitmapFrameName, inputStyle) {

    Phaser.Group.call(this, game, null);

    var that = this;
    this.checked = checked;
    this.callback = callback;
    this.bitmap = bitmap;
    this.bitmapAtlas = bitmapAtlas;
    this.bitmapFrameName = bitmapFrameName;

    var style = {
        font: "bold 25px Arial",
        checkBoxLine: 0.1,
        checkBoxSize: 15,
        color: 0xffffff,
        dotColor: '#2b2b2b',
        wordWrap: true,
        wordWrapWidth: 300,
        textWidth: 300

    }

    var defInputStyle = {
        font: '14px Arial',
        fill: '#000',
        fillAlpha: 1,
        fontWeight: 'bold',
        width: 50,
        height: 10,
        max: 9999,
        min: 0,
        padding: 5,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: '',
        value: hasLabel,
        textAlign: 'center',
        type: Fabrique.InputType.number,
        zoom: false
    }

    if (hasLabel) {
        var defTimeInput1 = {
            font: '14px Arial',
            fill: '#000',
            fillAlpha: .5,
            fontWeight: 'bold',
            width: 20,
            max: 24,
            min: 00,
            padding: 5,
            borderWidth: 0,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: '',
            textAlign: 'center',
            value: hasLabel[0],
            type: Fabrique.InputType.number,
            zoom: false
        }

        var defTimeInput2 = {
            font: '14px Arial',
            fill: '#000',
            fillAlpha: .5,
            fontWeight: 'bold',
            width: 20,
            max: 59,
            min: 0,
            padding: 5,
            borderWidth: 0,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: '',
            textAlign: 'center',
            value: hasLabel[1],
            type: Fabrique.InputType.number,
            zoom: false
        }
        defTimeInput1 = _.merge(defTimeInput1, inputStyle);
        defTimeInput2 = _.merge(defTimeInput2, inputStyle);
    }

    this.x = x;
    this.y = y;

    style = _.merge(style, prestyle);
    defInputStyle = _.merge(defInputStyle, inputStyle);


    // CHECKBOX
    if (!bitmap) {
        var checkbox = game.add.graphics(0, 0);
        checkbox.lineStyle(style.checkBoxLine, style.color);
        checkbox.beginFill(style.dotColor, 0.01);
        checkbox.drawRect(0, 0, style.checkBoxSize, style.checkBoxSize);
        checkbox.endFill();

        this.dot = game.add.sprite(checkbox.width / 2, (checkbox.height / 2) - 3, "vcheck");
        this.dot.tint = 0x91b78b;
        this.dot.width = this.dot.height = 20;
        this.dot.anchor.setTo(0.5, 0.5);
    }
    else {
        if (bitmapAtlas != "screens2") {
            var checkbox = game.add.sprite(0, 0, bitmapAtlas);
            checkbox.frameName = bitmapFrameName + "_off.png"
            checkbox.anchor.setTo(0.5, 0.5);
            var offLabel = game.add.text(0, -18, bedbugGameCore.getLocalizedText("OFF"), {
                font: '30px Arial',
                fill: '#fff',
                align: 'center',
                // fontWeight: "bold"
            });
            offLabel.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
            checkbox.addChild(offLabel);

            this.dot = game.add.sprite(0, 0, bitmapAtlas);
            this.dot.frameName = bitmapFrameName + "_on.png"
            // this.dot.width = this.dot.height = 60;
            this.dot.anchor.setTo(0.5, 0.5);

            var onLabel = game.add.text(-50, -18, bedbugGameCore.getLocalizedText("ON"), {
                font: '30px Arial',
                fill: '#fff',
                align: 'center',
                // fontWeight: "bold"
            });
            onLabel.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
            this.dot.addChild(onLabel);
        }
        else {
            var checkbox = game.add.sprite(0, 0, bitmapAtlas);
            checkbox.frameName = bitmapFrameName + "_off.png"
            checkbox.anchor.setTo(0.2, 0.2);

            this.dot = game.add.sprite(0, 0, bitmapAtlas);
            this.dot.frameName = bitmapFrameName + "_on.png"
            this.dot.anchor.setTo(0.2, 0.2);
        }
    }

    // this.dot = game.add.graphics(0, 0);
    // this.dot.beginFill(style.dotColor, 1);
    // this.dot.drawCircle(checkbox.width / 2, checkbox.height / 2, checkbox.width / 1.4);
    // this.dot.endFill();


    this.add(checkbox);
    this.add(this.dot);
    this.updateState();



    var checkbox_text = game.add.text(checkbox.width + 20, checkbox.y + 5, text, style);
    this.add(checkbox_text);


    if (hasLabel) {
        if (hasLabel instanceof Array) {
            if (!bitmap) {
                this.inputField = game.add.inputField(159 + style.wordWrapWidth, -3, defTimeInput1);
                this.inputField2 = game.add.inputField(193 + style.wordWrapWidth, -3, defTimeInput2);
            }
            else {
                if (bitmapAtlas != "screens2") {
                    this.inputBox = game.add.sprite(250 + style.wordWrapWidth, 0, bitmapAtlas);
                    this.inputBox.frameName = "TextBox2.png";
                    this.inputBox.anchor.setTo(.5, .5);
                    this.add(this.inputBox);
                    this.inputField = game.add.inputField(160 + style.wordWrapWidth, -27, {
                        font: '14px Arial',
                        fill: '#fff',
                        fillAlpha: 0,
                        fontWeight: 'bold',
                        width: 35,
                        max: 24,
                        min: 0,
                        padding: 5,
                        borderWidth: 1,
                        borderColor: '#000',
                        borderRadius: 6,
                        placeHolder: '',
                        textAlign: 'center',
                        value: hasLabel[0],
                        type: Fabrique.InputType.number,
                        zoom: false
                    });
                    this.inputField2 = game.add.inputField(180 + style.wordWrapWidth, -27, {
                        font: '14px Arial',
                        fill: '#fff',
                        fillAlpha: 0,
                        fontWeight: 'bold',
                        width: 35,
                        max: 59,
                        min: 0,
                        padding: 5,
                        borderWidth: 1,
                        borderColor: '#000',
                        borderRadius: 6,
                        placeHolder: '',
                        value: hasLabel[1],
                        textAlign: 'center',
                        type: Fabrique.InputType.number,
                        zoom: false
                    });
                }
                else {
                    this.inputBox = game.add.sprite(177 + style.wordWrapWidth, 10, bitmapAtlas);
                    this.inputBox.frameName = "inputSmall.png";
                    this.inputBox.anchor.setTo(.5, .5);
                    this.add(this.inputBox);
                    this.inputBox2 = game.add.sprite(203 + style.wordWrapWidth, 10, bitmapAtlas);
                    this.inputBox2.frameName = "inputSmall.png";
                    this.inputBox2.anchor.setTo(.5, .5);
                    this.add(this.inputBox2);
                    this.inputField = game.add.inputField(154 + style.wordWrapWidth, -3, {
                        font: '14px Arial',
                        fill: '#fff',
                        fillAlpha: 0,
                        fontWeight: 'bold',
                        width: 35,
                        max: 24,
                        min: 0,
                        padding: 5,
                        borderWidth: 1,
                        borderColor: '#000',
                        borderRadius: 6,
                        placeHolder: '',
                        textAlign: 'center',
                        value: hasLabel[0],
                        type: Fabrique.InputType.number,
                        zoom: false
                    });
                    this.inputField2 = game.add.inputField(180 + style.wordWrapWidth, -3, {
                        font: '14px Arial',
                        fill: '#fff',
                        fillAlpha: 0,
                        fontWeight: 'bold',
                        width: 35,
                        max: 59,
                        min: 0,
                        padding: 5,
                        borderWidth: 1,
                        borderColor: '#000',
                        borderRadius: 6,
                        placeHolder: '',
                        value: hasLabel[1],
                        textAlign: 'center',
                        type: Fabrique.InputType.number,
                        zoom: false
                    });

                }

                // this.inputField2.inputEnabled = true;
                // this.inputField2.input.enableDrag();
                // this.inputField2.events.onDragStop.add(onDragStop, this);
            }
            this.inputField.setText(hasLabel[0]);
            this.inputField.blockInput = true;

            this.inputField.domElement.focusOut.add(function() {
                that.inputField.setText(parseFloat(that.inputField.value || hasLabel[0]).toString());
                if (that.inputField.value == "0") that.inputField.setText("00");
                if (that.inputField.value == "24") that.inputField.setText("00");
                if (that.inputField.value)
                    that.setToTrue();
            });
            this.inputField2.domElement.focusOut.add(function() {
                that.inputField2.setText(parseFloat(that.inputField2.value || hasLabel[1]).toString());
                if (that.inputField2.value == "0") that.inputField2.setText("00");
                if (that.inputField.value)
                    that.setToTrue();
            })
            //this.inputField2 = game.add.inputField(checkbox_text.x + checkbox_text.wordWrapWidth + 25, 0, {
            //     font: '22px Arial',
            //     fill: '#000',
            //     fillAlpha: 1,
            //     fontWeight: 'bold',
            //     width: 35,
            //     max: 59,
            //     min:0,
            //     padding: 8,
            //     borderWidth: 1,
            //     borderColor: '#000',
            //     borderRadius: 6,
            //     placeHolder: '',
            //     textAlign: 'center',
            //     type: Fabrique.InputType.number,
            //     zoom: false
            // });
            this.inputField2.setText(hasLabel[1]);
            this.inputField2.blockInput = true;

            this.add(this.inputField);
            this.add(this.inputField2);
        }
        else {
            if (!bitmap) {
                // console.log("here");
                this.inputField = game.add.inputField(160 + style.wordWrapWidth, -3, defInputStyle);
                this.inputField.setText(hasLabel);
                // this.inputField.domElement.focusOut.add(function() {
                //     that.updateState();
                // })
                this.add(this.inputField);
            }
            else {
                // console.log("here");
                if (bitmapAtlas != "screens2") {
                    this.inputBox = game.add.sprite(250 + style.wordWrapWidth, -10, bitmapAtlas);
                    this.inputBox.frameName = "TextBox2.png";
                    this.inputBox.anchor.setTo(.5, .5);
                    // this.add(this.inputBox);
                    this.inputField = game.add.inputField(197, -27, {
                        font: '30px Arial',
                        fill: '#fff',
                        fillAlpha: 0,
                        fontWeight: 'bold',
                        width: 90,
                        max: 9999,
                        min: 0,
                        padding: 8,
                        borderWidth: 0,
                        borderColor: '#000',
                        borderRadius: 6,
                        placeHolder: '',
                        value: hasLabel,
                        textAlign: 'center',
                        type: Fabrique.InputType.number,
                        zoom: false
                    });
                }
                else {
                    // console.log("here");
                    this.inputBox = game.add.sprite(190 + style.wordWrapWidth, 10, bitmapAtlas);
                    this.inputBox.frameName = "Input.png";
                    this.inputBox.anchor.set(.5);

                    this.inputField = game.add.inputField(200, -6, {
                        font: '14px Arial',
                        fill: '#fff',
                        fillAlpha: 0,
                        fontWeight: 'bold',
                        width: 90,
                        max: 9999,
                        min: 0,
                        padding: 8,
                        borderWidth: 0,
                        borderColor: '#000',
                        borderRadius: 6,
                        placeHolder: '',
                        value: hasLabel,
                        textAlign: 'center',
                        type: Fabrique.InputType.number,
                        zoom: false
                    });
                }
                //this.inputField.addChild(this.inputField);
                ///////////// DRAG INFO
                this.inputField.setText(hasLabel);
                this.add(this.inputBox);
                this.add(this.inputField);

                // this.inputField.inputEnabled = true;
                // this.inputField.input.enableDrag();
                // this.inputField.events.onDragStop.add(onDragStop, this);
                // this.inputField.domElement.focusOut.add(function() {
                //     that.updateState();
                // })
                // // 
                // function onDragStop(sprite, pointer) {
                //     console.log(sprite.key + " dropped at x:" + sprite.x + " y: " + sprite.y);
                // }

            }

            this.inputField.domElement.focusOut.add(function() {
                that.inputField.setText(parseFloat(that.inputField.value || hasLabel ).toString() );
                that.updateState();
                if (that.inputField.value)
                    that.setToTrue();
            });


        }
    }

    game.add.existing(this);

    checkbox.inputEnabled = true;
    // checkbox_text.inputEnabled = true;


    checkbox.events.onInputDown.add(function(btn) {
        bedbugEventsSystem.emitEvent('ON_BUTTON_TOGGLE');
        this.toggle();
    }, this);

};

CheckΒoxSmall.prototype = Object.create(Phaser.Group.prototype);

CheckΒoxSmall.prototype.constructor = CheckΒoxSmall;
CheckΒoxSmall.prototype.setLabel = function(label) {
    this.button_label.setText(label);
};

CheckΒoxSmall.prototype.setToTrue = function() {
    this.checked = true;
    this.updateState();
};

CheckΒoxSmall.prototype.setToFalse = function() {
    this.checked = false;
    this.updateState();
};

CheckΒoxSmall.prototype.toggle = function() {
    this.checked = !this.checked;
    this.updateState();
};

CheckΒoxSmall.prototype.verifyState = function() {
    var that = this;
    if (that.checked == true && that.inputField && (that.inputField.value == undefined || that.inputField.value == "")) {
        that.checked = false;
        that.dot.visible = that.checked;

        if (that.callback)
            that.callback(that.checked, that.inputField ? parseFloat(that.inputField.value) : null, that.inputField2 ? parseFloat(that.inputField2.value) : null);
    }
}

CheckΒoxSmall.prototype.updateState = function() {
    var that = this;
    // setTimeout(function() {
    // console.log("verifying");
    // if (that.checked == true && that.inputField) {
    //     console.log(that.inputField.value);
    //     that.inputField.value = parseFloat(that.inputField.value).toString();
    //     console.log(that.inputField.value);

    // }
    //     if (that.checked == true && that.inputField && (that.inputField.value == undefined || that.inputField.value == "")) {
    //         that.checked = false;
    //         that.dot.visible = that.checked;

    //         if (that.callback)
    //             that.callback(that.checked, that.inputField ? parseFloat(that.inputField.value) : null, that.inputField2 ? parseFloat(that.inputField2.value) : null);
    //     }
    // }, 5000)


    this.dot.visible = this.checked;

    if (this.callback)
        this.callback(this.checked, this.inputField ? parseFloat(this.inputField.value) : null, this.inputField2 ? parseFloat(this.inputField2.value) : null);
};

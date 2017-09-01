var CheckΒox = function(x, y, game, text, hasLabel, checked, prestyle, callback, bitmap, bitmapAtlas, bitmapFrameName) {

    Phaser.Group.call(this, game, null);

    var that = this;
    this.checked = checked;
    this.callback = callback;
    this.widgetValue = null;
    this.widgetValue2 = null;
    this.bitmap = bitmap;
    this.bitmapAtlas = bitmapAtlas;
    this.bitmapFrameName = bitmapFrameName;

    var style = {
        font: "bold 22px Arial",
        checkBoxLine: 3,
        checkBoxSize: 40,
        color: 0xffffff,
        dotColor: 0xffffff,
        wordWrap: true,
        wordWrapWidth: 300,
        textWidth: 300,
        isMoney: false,
        useDelimeter: true
    }

    this.x = x;
    this.y = y;

    style = _.merge(style, prestyle);

    // CHECKBOX
    if (!bitmap) {
        var checkbox = game.add.graphics(0, 0);
        checkbox.lineStyle(style.checkBoxLine, style.color);
        checkbox.beginFill(style.dotColor, 0.01);
        checkbox.drawRect(0, 0, style.checkBoxSize, style.checkBoxSize);
        checkbox.endFill();

        this.dot = game.add.sprite(checkbox.width / 2, checkbox.height / 2, "vcheck");
        // this.dot.width = this.dot.height = 60;
        this.dot.anchor.setTo(0.5, 0.5);
    }
    else {
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

    // this.dot = game.add.graphics(0, 0);
    // this.dot.beginFill(style.dotColor, 1);
    // this.dot.drawCircle(checkbox.width / 2, checkbox.height / 2, checkbox.width / 1.4);
    // this.dot.endFill();


    this.add(checkbox);
    this.add(this.dot);




    var checkbox_text = game.add.text(checkbox.width + 20, checkbox.y + 5, text, style);
    this.add(checkbox_text);


    if (hasLabel || hasLabel == 0) {
        if (hasLabel instanceof Array) {
            if (!bitmap) {

                if (game.device.desktop) {
                    this.inputField = game.add.inputField(checkbox_text.x + checkbox_text.wordWrapWidth + 10, 0, {
                        font: style.inputDoubleFont || '22px Arial',
                        fill: '#000',
                        fillAlpha: 1,
                        fontWeight: 'bold',
                        width: 35,
                        max: 24,
                        min: 00,
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#000',
                        borderRadius: 6,
                        placeHolder: '',
                        textAlign: 'center',
                        value: hasLabel[0] || "12",
                        type: Fabrique.InputType.number,
                        zoom: false
                    });
                    this.inputField2 = game.add.inputField(checkbox_text.x + checkbox_text.wordWrapWidth + 65, 0, {
                        font: style.inputDoubleFont || '22px Arial',
                        fill: '#000',
                        fillAlpha: 1,
                        fontWeight: 'bold',
                        width: 35,
                        max: 59,
                        min: 0,
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#000',
                        borderRadius: 6,
                        value: hasLabel[1] || "00",
                        placeHolder: '',
                        textAlign: 'center',
                        type: Fabrique.InputType.number,
                        zoom: false
                    });

                    // this.inputField.setText(hasLabel[0] || "12");
                    // this.inputField2.setText(hasLabel[1] || "00");
                    this.inputField.setText(hasLabel[0]);
                    this.inputField.blockInput = true;

                    this.inputField.domElement.focusOut.add(function() {
                        if (that.inputField.value == "24") that.inputField2.value = 00;
                        if (that.inputField.value)
                            that.setToTrue();
                            
                         that.updateState();
                    })
                    this.inputField2.setText(hasLabel[1]);
                    this.inputField2.blockInput = true;

                    this.inputField2.domElement.focusOut.add(function() {
                        if (that.inputField.value == "24") that.inputField2.value = 00;
                        if (that.inputField2.value)
                            that.setToTrue();

                        that.updateState();

                    })

                }
                else {

                    this.inputBox = new CustomLabel(game, hasLabel[0] + ":" + hasLabel[1], checkbox_text.x + checkbox_text.wordWrapWidth + 80, 25, 100, 50, null, {
                        bgColor: 0xffffff,
                        fill: 'black',
                        backgroundAlpha: 1,
                        noShadow: true
                    }, function() {
                        NumericInput.create(game, {
                            isTime: style.isTime,
                            isMoney: style.isMoney,
                            useDelimeter: style.useDelimeter,
                            description: style.description
                        }, function(value) {
                            if (value) {
                                that.widgetValue = value[0];
                                that.widgetValue2 = value[1];
                                that.inputBox.setLabel(value[0] + ":" + value[1]);
                            }
                            if (value)
                                that.setToTrue();
                            that.updateState();
                        })
                    });

                    // this.inputBox.anchor.setTo(.5, .5);
                    this.add(this.inputBox);
                }
            }
            else {
                // this.inputBox = game.add.sprite(250, 0, bitmapAtlas);
                // this.inputBox.frameName = "TextBox2.png";
                // this.inputBox.anchor.setTo(.5, .5);
                // this.add(this.inputBox);

                this.inputBox = game.add.sprite(250, 0, bitmapAtlas);
                this.inputBox.frameName = "TextBox2.png";
                this.inputBox.anchor.setTo(.5, .5);
                this.add(this.inputBox);
                if (!game.device.desktop) {
                    this.inputBox.inputEnabled = true;
                    this.inputBox.events.onInputDown.add(function(e, pointer) {
                        NumericInput.create(game, {
                            isTime: true,
                            useDelimeter: style.useDelimeter,
                            description: style.description
                        }, function(value) {
                            if (value) {
                                that.widgetValue = value[0];
                                that.widgetValue2 = value[1];
                                that.valueText.setText(value[0] + ":" + value[1]);
                            }
                            if (value) {
                                that.setToTrue();
                            }
                            that.updateState();
                        })
                    })

                    this.valueText = game.add.text(250, 0, hasLabel[0] + ":" + hasLabel[1], {
                        font: 'bold 30px Arial',
                        fill: 'white'
                    });
                    this.valueText.anchor.setTo(0.5, 0.5);
                    this.add(this.valueText);
                }
                else {
                    this.inputField = game.add.inputField(205, -27, {
                        font: '30px Arial',
                        fill: '#fff',
                        fillAlpha: 0,
                        fontWeight: 'bold',
                        width: 35,
                        max: 24,
                        min: 00,
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#000',
                        borderRadius: 6,
                        placeHolder: '',
                        textAlign: 'center',
                        value: hasLabel[0],
                        type: Fabrique.InputType.number,
                        zoom: false
                    });
                    this.inputField2 = game.add.inputField(245, -27, {
                        font: '30px Arial',
                        fill: '#fff',
                        fillAlpha: 0,
                        fontWeight: 'bold',
                        width: 35,
                        max: 59,
                        min: 0,
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#000',
                        borderRadius: 6,
                        placeHolder: '',
                        textAlign: 'center',
                        value: hasLabel[1],
                        type: Fabrique.InputType.number,
                        zoom: false
                    });
                    // this.inputField2.inputEnabled = true;
                    // this.inputField2.input.enableDrag();
                    // this.inputField2.events.onDragStop.add(onDragStop, this);
                    this.inputField.setText(hasLabel[0]);
                    this.inputField.blockInput = true;

                    this.inputField.domElement.focusOut.add(function() {
                        if (that.inputField.value == "24") that.inputField2.value = 00;
                        if (that.inputField.value)
                            that.setToTrue();
                            
                         that.updateState();
                    })
                    this.inputField2.setText(hasLabel[1]);
                    this.inputField2.blockInput = true;

                    this.inputField2.domElement.focusOut.add(function() {
                        if (that.inputField.value == "24") that.inputField2.value = 00;
                        if (that.inputField2.value)
                            that.setToTrue();

                        that.updateState();

                    })
                }

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

            }
            if (this.inputField) {
                this.add(this.inputField);
                this.add(this.inputField2);
            }
        }
        else {
            if (!bitmap) {

                if (game.device.desktop) {
                    this.inputField = game.add.inputField(checkbox_text.x + checkbox_text.wordWrapWidth + 10, 0, {
                        font: style.inputFont || '13px Arial',
                        fill: '#000',
                        fillAlpha: 1,
                        fontWeight: 'bold',
                        width: style.inputWidth || 90,
                        max: 9999,
                        min: 0,
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#000',
                        borderRadius: 6,
                        placeHolder: '',
                        textAlign: 'center',
                        type: Fabrique.InputType.number,
                        value: hasLabel || "0",
                        zoom: false
                    });
                    this.inputField.setText(hasLabel);
                    this.inputField.domElement.focusOut.add(function() {
                        that.updateState();
                    })
                }
                else {

                    this.inputBox = new CustomLabel(game, hasLabel, checkbox_text.x + checkbox_text.wordWrapWidth + 80, 25, 100, 50, null, {
                        bgColor: 0xffffff,
                        fill: 'black',
                        backgroundAlpha: 1,
                        noShadow: true
                    }, function() {
                        NumericInput.create(game, {
                            isTime: style.isTime,
                            isMoney: style.isMoney,
                            useDelimeter: style.useDelimeter,
                            description: style.description
                        }, function(value) {
                            if (value) {
                                that.widgetValue = value;
                                that.inputBox.setLabel(value);
                            }
                            if (value)
                                that.setToTrue();
                            that.updateState();
                        })
                    });

                    // this.inputBox.anchor.setTo(.5, .5);
                    this.add(this.inputBox);
                    // this.inputBox.inputEnabled = true;
                    // this.inputBox.events.onInputDown.add(function(e, pointer) {
                    //     NumericInput.create(game, {
                    //         isMoney: style.isMoney,
                    //         useDelimeter: style.useDelimeter,
                    //         description: style.description
                    //     }, function(value) {
                    //         that.widgetValue = value;
                    //         that.inputBox.setText(value);
                    //         if (value)
                    //             that.setToTrue();
                    //         that.updateState();
                    //     })
                    // })

                    // this.valueText = game.add.text(250, 0, "", {
                    //     font: 'bold 30px Arial',
                    //     fill: 'white'
                    // });
                    // this.valueText.anchor.setTo(0.5, 0.5);
                    // this.add(this.valueText);
                }
            }
            else {

                this.inputBox = game.add.sprite(250, 0, bitmapAtlas);
                this.inputBox.frameName = "TextBox2.png";
                this.inputBox.anchor.setTo(.5, .5);
                this.add(this.inputBox);
                if (!game.device.desktop) {
                    this.inputBox.inputEnabled = true;
                    this.inputBox.events.onInputDown.add(function(e, pointer) {
                        NumericInput.create(game, {
                            isMoney: style.isMoney,
                            useDelimeter: style.useDelimeter,
                            description: style.description
                        }, function(value) {
                            if (value) {
                                that.widgetValue = value;
                                that.valueText.setText(value);
                            }
                            if (value)
                                that.setToTrue();
                            that.updateState();
                        })
                    })

                    this.valueText = game.add.text(250, 0, hasLabel, {
                        font: 'bold 30px Arial',
                        fill: 'white'
                    });
                    this.valueText.anchor.setTo(0.5, 0.5);
                    this.add(this.valueText);
                }
                else {
                    this.inputField = game.add.inputField(197, -27, {
                        font: '30px Arial',
                        fill: '#fff',
                        fillAlpha: 0,
                        fontWeight: 'bold',
                        width: 90,
                        max: 9999,
                        min: 0,
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#000',
                        borderRadius: 6,
                        placeHolder: '',
                        textAlign: 'center',
                        value: hasLabel,
                        type: Fabrique.InputType.number,
                        zoom: false
                    });

                    this.inputField.setText(hasLabel);
                    this.inputField.domElement.focusOut.add(function() {
                        that.updateState();
                        if (that.inputField.value)
                            that.setToTrue();
                    })

                    //this.inputField.addChild(this.inputField);
                    ///////////// DRAG INFO
                    this.inputField.inputEnabled = true;
                    this.inputField.input.enableDrag();
                    this.inputField.events.onDragStop.add(onDragStop, this);

                    function onDragStop(sprite, pointer) {
                        // console.log(sprite.key + " dropped at x:" + sprite.x + " y: " + sprite.y);
                    }
                }

            }


            if (this.inputField)
                this.add(this.inputField);
        }
    }

    game.add.existing(this);
    this.updateState();
    checkbox.inputEnabled = true;
    // checkbox_text.inputEnabled = true;


    checkbox.events.onInputDown.add(function(btn) {
        bedbugEventsSystem.emitEvent('ON_BUTTON_TOGGLE');
        this.toggle();
    }, this);

};

CheckΒox.prototype = Object.create(Phaser.Group.prototype);

CheckΒox.prototype.constructor = CheckΒox;
CheckΒox.prototype.setLabel = function(label) {
    this.button_label.setText(label);
};

CheckΒox.prototype.setToTrue = function() {
    this.checked = true;
    this.updateState();
};

CheckΒox.prototype.setToFalse = function() {
    this.checked = false;
    this.updateState();
};

CheckΒox.prototype.toggle = function() {
    this.checked = !this.checked;
    this.updateState();
};

CheckΒox.prototype.verifyState = function() {
    var that = this;

    if (that.checked == true && that.inputField && (that.inputField.value == undefined || that.inputField.value == "")) {
        that.checked = false;
        that.dot.visible = that.checked;

        if (that.callback)
            that.callback(that.checked, that.inputField ? parseFloat(that.inputField.value) : null, that.inputField2 ? parseFloat(that.inputField2.value) : null);
    }
}

CheckΒox.prototype.updateState = function() {

    if (this.inputField && (this.inputField.value == 0 || this.inputField.value == undefined)) {
        this.dot.visible = false;
    }

    this.dot.visible = this.checked;

    if (this.callback) {
        if (this.inputField)
            this.callback(this.checked, this.inputField ? parseFloat(this.inputField.value) : null, this.inputField2 ? parseFloat(this.inputField2.value) : null);
        else {
            this.callback(this.checked, this.widgetValue ? this.widgetValue : null, this.widgetValue2 ? this.widgetValue2 : null);
        }

    }
};

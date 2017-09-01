Responsible_Gaming = {
    game: null,
    // The game time events
    timers: {
        // session: null,
        interval: null,
    },
    // The class values
    values: {
        max_time_session: 0,
        reality_check_interval: 0,
        reality_check_count: 0,
        max_session_active: false,
        reality_check_active: false,
        notDisplayingMessage: true,
        responsible_messages_queue: [],
        style:{
            bgColor: "0x000000",
            bevel: false
        }
    },
    startSession: function(context) {
        this.game = context.game;
        this.timers.interval = context.game.time.create(false);
        this.timers.interval.loop(1000, this.checkResponsibleStatus, this);
        this.timers.interval.start();
    },
    checkResponsibleStatus: function() {

        //  if(this.values.max_time_session == 0 && this.values.reality_check_interval == 0) return;
        if (this.values.reality_check_interval > 0 && this.values.reality_check_active) {
            this.values.reality_check_count++
                if (this.values.reality_check_count >= this.values.reality_check_interval) {
                    this.values.reality_check_count = 0;
                    this.values.responsible_messages_queue.push({
                        type: "reality_check"
                    });
                }
        }

        if (this.values.max_time_session > 0 && this.values.max_session_active) {
            var elapsed = Math.ceil(this.game.time.totalElapsedSeconds());
            if (elapsed > this.values.max_time_session) {
                this.values.responsible_messages_queue.push({
                    type: "session_ended"
                });
                this.values.max_time_session = 0;
            }
        }
        this.checkResponsibleQueue();

    },
    checkResponsibleQueue: function() {
        var that = this;
         var elapsed = Math.ceil(this.game.time.totalElapsedSeconds());
         
        if (this.values.responsible_messages_queue.length > 0 && bedbugGameCore.game_state == 0 && this.values.notDisplayingMessage) {
            if (this.values.responsible_messages_queue[0].type == "session_ended") {
                this.values.notDisplayingMessage = false;
                that.values.responsible_messages_queue.shift();
                MessageTools.options(bedbugGameCore.game, "", bedbugGameCore.getLocalizedText('MSG_SESSION_TIME_LIMIT_TITLE') + "\n\n" + bedbugGameCore.getLocalizedText('MSG_RESPONSIBLE_SESSION_TIME_LIMIT'), bedbugGameCore.getLocalizedText('MSG_EXIT_TO_LOBBY_LABEL'), bedbugGameCore.getLocalizedText('BTN_TXT_CONTINUE_LABEL'), function() {
                        bedbugGameCore.GoHome();
                    },
                    function() {
                        that.values.notDisplayingMessage = true;
                    }, that.values.style)
            }

            if (this.values.responsible_messages_queue[0].type == "reality_check") {
                this.values.notDisplayingMessage = false;
                that.values.responsible_messages_queue.shift();
               
                MessageTools.options(bedbugGameCore.game, "", bedbugGameCore.getLocalizedText('MGS_RESPONSIBLE_REALITY_CHECK_TITLE') + "\n\n" + bedbugGameCore.getLocalizedText('MSG_REALITY_CHECK_HH_MM').replace("$(1)", that.secondsToHms(elapsed)[0]).replace("$(2)", that.secondsToHms(elapsed)[1]), bedbugGameCore.getLocalizedText('MSG_EXIT_TO_LOBBY_LABEL'), bedbugGameCore.getLocalizedText('BTN_TXT_CONTINUE_LABEL'), function() {
                        bedbugGameCore.GoHome();
                    },
                    function() {
                        that.values.notDisplayingMessage = true;
                        that.values.responsible_messages_queue = _.remove(that.values.responsible_messages_queue, "reality_check");
                        that.values.reality_check_count = 0;
                    }, that.values.style)
            }
        }

    },
    setMaxSession: function(session_time) {
        this.values.max_time_session = session_time;
    },
    setRealityCheck: function(interval_time) {
        this.values.reality_check_interval = interval_time;
        this.values.reality_check_count = 0;
    },
    secondsToHms: function(d, full) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        if (full) {
            return hDisplay + ":" + mDisplay + ":" + sDisplay;
        }
        else
            return [h, m, s];
    }
}

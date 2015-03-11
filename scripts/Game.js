var Game = {
    options: {
        fontFamily: "droid sans mono, monospace",
        spacing: 1.1
    },   
    display: null,
    currentScreen: null,
    player: null,
    map: {},
    treasure: null,
    entities: {},
    player: null,
    engine: null,
    scheduler: null,

    init: function() {
        // use rot.js to make a display object for the game
        this.display = new ROT.Display(this.options);
        // append the display to the page!
        document.body.appendChild(this.display.getContainer());
        
        // initial resize
        this._resize();

        // call resize every time the window is resized
        window.addEventListener("resize", this._resize.bind(this));

        this.bindEventToScreen('keydown');

        this.switchScreen(new startScreen());
    },
    
    _resize: function() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        var size = this.display.computeSize(w, h);
        var fontSize = this.display.computeFontSize(w, h);

        this.display.setOptions({ fontSize:fontSize, width:size[0], height:size[1] });
    },

    switchScreen: function(screen) {
                
        // clear the display
        this.display.clear();

        // update the current screen and notify it we've entered, then render it
        this.currentScreen = screen;
        if (!this.currentScreen != null) {
            this.currentScreen.init();
        }
    },

    bindEventToScreen: function(event) {
        window.addEventListener(event, function(e) {
            if (Game.currentScreen != null) {
                // let each screen handle the input
                Game.currentScreen.handleInput(event, e);
            }
        });
    },

    getWidth: function() {
        var options = this.display.getOptions();
        var width = options['width'];
        return width;
    }

};
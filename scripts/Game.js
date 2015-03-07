var Game = {
    options: {
        fontSize: 28,
        fontFamily: "droid sans mono, monospace",
        spacing: 1.1,
        width: 1,
        height: 1
    },   
    display: null,
    _currentScreen: null,
    player: null,
    map: {},
    treasure: null,
    monster: null,
    player: null,
    engine: null,     

    init: function() {        
        // use rot.js to make a display object for the game
        this.display = new ROT.Display(this.options);
        // append the display to the page!
        document.body.appendChild(this.display.getContainer());        
        
        // initial resize
        this._resize();

        // call resize every time the window is resized
        window.addEventListener("resize", this._resize.bind(this));

        // bind key events
        this.bindEventToScreen('keydown');
        this.bindEventToScreen('keyup');
        this.bindEventToScreen('keypress');

        this.switchScreen(new startScreen());        
    },    
    /* TODO: implement some resizing of the font to make the game fit on smaller screen */
    _resize: function() {        
        var size = this.display.computeSize(window.innerWidth, window.innerHeight);
        this.display.setOptions({width:size[0], height:size[1]});
    },

    switchScreen: function(screen) {
                
        // clear the display
        this.display.clear();

        // update the current screen and notify it we've entered, then render it
        this._currentScreen = screen;
        if (!this._currentScreen != null) {            
            this._currentScreen.render();
        }
    },

    bindEventToScreen: function(event) {
        window.addEventListener(event, function(e) {
            if (Game._currentScreen != null) {
                // let each screen handle the input
                Game._currentScreen.handleInput(event, e);
            }
        });
    }

};  
class Main {
	static MIN_SCROLL_SPEED = 5;
	static MAX_SCROLL_SPEED = 15;
	static SCROLL_ACCELERATION = 0.005;

	constructor() {
		this.stage = new PIXI.Container();
		this.renderer = PIXI.autoDetectRenderer(
			512,
			384,
			{view:document.getElementById("game-canvas")}
		);
	
		this.scrollSpeed = Main.MIN_SCROLL_SPEED;
	
		this.loadSpriteSheet();
	}

	update() {
		this.scroller.moveViewportXBy(this.scrollSpeed);
		this.scrollSpeed += Main.SCROLL_ACCELERATION;
		if (this.scrollSpeed > Main.MAX_SCROLL_SPEED)
		{
			this.scrollSpeed = Main.MAX_SCROLL_SPEED;
		}
	
		this.renderer.render(this.stage);
		requestAnimationFrame(this.update.bind(this));
	};
	
	loadSpriteSheet() {
		var loader = PIXI.loader;
		loader.add("wall", "resources/wall.json");
		loader.add("bg-mid", "resources/bg-mid.png");
		loader.add("bg-far", "resources/bg-far.png");
		loader.once("complete", this.spriteSheetLoaded.bind(this));
		loader.load();
	};
	
	spriteSheetLoaded() {
		this.scroller = new Scroller(this.stage);
		requestAnimationFrame(this.update.bind(this));
	};
}

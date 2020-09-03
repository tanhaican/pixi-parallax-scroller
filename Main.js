class Main {
	static MIN_SCROLL_SPEED = 5;
	static MAX_SCROLL_SPEED = 15;
	static SCROLL_ACCELERATION = 0.005;

	constructor() {
		let app = new PIXI.Application({
			width: 512,
			height: 384,
			backgroundColor: '0xffffff',
			antialias: true, // 抗锯齿，如果效率存在问题可去除
			view: document.getElementById('game-canvas')
		});
		this.renderer = app.renderer;
		this.stage = app.stage;
	
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
		var loader = PIXI.Loader.shared;
		loader.add("wall", "resources/wall.json");
		loader.add("bg-mid", "resources/bg-mid.png");
		loader.add("bg-far", "resources/bg-far.png");
		loader.onComplete.add(this.spriteSheetLoaded.bind(this));
		loader.load();
	};
	
	spriteSheetLoaded() {
		this.scroller = new Scroller(this.stage);
		requestAnimationFrame(this.update.bind(this));
	};
}

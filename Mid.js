class Mid extends PIXI.extras.TilingSprite {
	static DELTA_X = 0.32;

	constructor(texture, width, height) {
		super(texture, width, height);

		this.position.x = 0;
		this.position.y = 128;
		this.tilePosition.x = 0;
		this.tilePosition.y = 0;

		this.viewportX = 0;
	}

	setViewportX(newViewportX) {
		let distanceTravelled = newViewportX - this.viewportX;

		this.viewportX = newViewportX;
		this.tilePosition.x -= (distanceTravelled * Mid.DELTA_X);
	}
}

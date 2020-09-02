class Walls extends PIXI.Container {
	static VIEWPORT_WIDTH = 512;
	static VIEWPORT_NUM_SLICES = Math.ceil(Walls.VIEWPORT_WIDTH / WallSlice.WIDTH) + 1;

	constructor() {
		super();
		this.pool = new WallSpritesPool();
		this.createLookupTables();
	
		this.slices = [];
	
		this.viewportX = 0;
		this.viewportSliceX = 0;
	}

	setViewportX(viewportX) {
		this.viewportX = this.checkViewportXBounds(viewportX);
	
		var prevViewportSliceX = this.viewportSliceX;
		this.viewportSliceX = Math.floor(this.viewportX/WallSlice.WIDTH);
	
		this.removeOldSlices(prevViewportSliceX);
		this.addNewSlices();
	};
	
	removeOldSlices(prevViewportSliceX) {
		var numOldSlices = this.viewportSliceX - prevViewportSliceX;
		if (numOldSlices > Walls.VIEWPORT_NUM_SLICES)
		{
			numOldSlices = Walls.VIEWPORT_NUM_SLICES;
		}
	
		for (var i = prevViewportSliceX; i < prevViewportSliceX + numOldSlices; i++)
		{
			var slice = this.slices[i];
			if (slice.sprite != null)
			{
				this.returnWallSprite(slice.type, slice.sprite);
				this.removeChild(slice.sprite);
				slice.sprite = null;
			}
		}
	};
	
	addSlice(sliceType, y) {
		var slice = new WallSlice(sliceType, y);
		this.slices.push(slice);
	};
	
	checkViewportXBounds(viewportX) {
		var maxViewportX = (this.slices.length - Walls.VIEWPORT_NUM_SLICES) * 
							WallSlice.WIDTH;
		if (viewportX < 0)
		{
			viewportX = 0;
		}
		else if (viewportX > maxViewportX)
		{
			viewportX = maxViewportX;
		}
	
		return viewportX;
	};
	
	addNewSlices() {
		var firstX = -(this.viewportX % WallSlice.WIDTH);
		for (var i = this.viewportSliceX, sliceIndex = 0;
				 i < this.viewportSliceX + Walls.VIEWPORT_NUM_SLICES;
				 i++, sliceIndex++)
		{
			var slice = this.slices[i];
			if (slice.sprite == null && slice.type != SliceType.GAP)
			{
				slice.sprite = this.borrowWallSprite(slice.type);
	
				slice.sprite.position.x = firstX + (sliceIndex * WallSlice.WIDTH);
				slice.sprite.position.y = slice.y;
	
				this.addChild(slice.sprite);
			}
			else if (slice.sprite != null)
			{
				slice.sprite.position.x = firstX + (sliceIndex * WallSlice.WIDTH);
			}
		}
	};
	
	createLookupTables() {
		this.borrowWallSpriteLookup = [];
		this.borrowWallSpriteLookup[SliceType.FRONT] = this.pool.borrowFrontEdge;
		this.borrowWallSpriteLookup[SliceType.BACK] = this.pool.borrowBackEdge;
		this.borrowWallSpriteLookup[SliceType.STEP] = this.pool.borrowStep;
		this.borrowWallSpriteLookup[SliceType.DECORATION] = this.pool.borrowDecoration;
		this.borrowWallSpriteLookup[SliceType.WINDOW] = this.pool.borrowWindow;
	
		this.returnWallSpriteLookup = [];
		this.returnWallSpriteLookup[SliceType.FRONT] = this.pool.returnFrontEdge;
		this.returnWallSpriteLookup[SliceType.BACK] = this.pool.returnBackEdge;
		this.returnWallSpriteLookup[SliceType.STEP] = this.pool.returnStep;
		this.returnWallSpriteLookup[SliceType.DECORATION] = this.pool.returnDecoration;
		this.returnWallSpriteLookup[SliceType.WINDOW] = this.pool.returnWindow;
	};
	
	borrowWallSprite(sliceType) {
		return this.borrowWallSpriteLookup[sliceType].call(this.pool);
	};
	
	returnWallSprite(sliceType, sliceSprite) {
		return this.returnWallSpriteLookup[sliceType].call(this.pool, sliceSprite);
	};
	
}
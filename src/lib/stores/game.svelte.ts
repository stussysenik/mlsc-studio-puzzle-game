import { paintings, getPuzzleUrl, getBackgroundUrl, preloadImage } from '$lib/data/paintings';
import {
	shufflePuzzle,
	moveTile,
	moveTileByIndex,
	isSolved,
	getBlankIndex,
	getRowCol,
	getValidMoveDirections,
	type Direction
} from '$lib/engine/puzzle';

export type ViewMode = 'gallery' | 'puzzle';

class GameState {
	view: ViewMode = $state('gallery');
	currentIndex: number = $state(0);
	gridSize: number = $state(4);
	tiles: number[] = $state([]);
	moveCount: number = $state(0);
	showHint: boolean = $state(false);
	showCelebration: boolean = $state(false);
	imageLoaded: boolean = $state(false);
	hasInteracted: boolean = $state(false);

	solved = $derived(this.tiles.length > 0 && isSolved(this.tiles));

	validDirections = $derived(
		this.tiles.length > 0 ? getValidMoveDirections(this.tiles, this.gridSize) : []
	);

	blankPosition = $derived(
		this.tiles.length > 0
			? getRowCol(getBlankIndex(this.tiles), this.gridSize)
			: { row: 0, col: 0 }
	);

	currentPainting = $derived(paintings[this.currentIndex]);

	puzzleImageUrl = $derived(
		this.currentPainting ? getPuzzleUrl(this.currentPainting) : ''
	);

	backgroundImageUrl = $derived(
		this.currentPainting ? getBackgroundUrl(this.currentPainting) : ''
	);

	selectPainting(index: number) {
		this.currentIndex = index;
		this.view = 'puzzle';
		this.moveCount = 0;
		this.showCelebration = false;
		this.showHint = false;
		this.hasInteracted = false;
		this.imageLoaded = false;
		this.tiles = shufflePuzzle(this.gridSize, this.gridSize === 3 ? 50 : 100);

		preloadImage(getPuzzleUrl(paintings[index])).then(() => {
			this.imageLoaded = true;
		});

		this._preloadAdjacent(index);
	}

	move(direction: Direction) {
		if (this.solved || this.showCelebration) return;
		if (!this.hasInteracted) this.hasInteracted = true;

		const result = moveTile(this.tiles, direction, this.gridSize);
		if (result) {
			this.tiles = result;
			this.moveCount++;
			this._checkSolved();
		}
	}

	clickTile(tileIndex: number) {
		if (this.solved || this.showCelebration) return;
		if (!this.hasInteracted) this.hasInteracted = true;

		const result = moveTileByIndex(this.tiles, tileIndex, this.gridSize);
		if (result) {
			this.tiles = result.tiles;
			this.moveCount++;
			this._checkSolved();
		}
	}

	reset() {
		this.moveCount = 0;
		this.showCelebration = false;
		this.showHint = false;
		this.tiles = shufflePuzzle(this.gridSize, this.gridSize === 3 ? 50 : 100);
	}

	toggleHint() {
		this.showHint = !this.showHint;
	}

	setGridSize(size: number) {
		this.gridSize = size;
		this.reset();
	}

	nextPainting() {
		const next = (this.currentIndex + 1) % paintings.length;
		this.selectPainting(next);
	}

	prevPainting() {
		const prev = (this.currentIndex - 1 + paintings.length) % paintings.length;
		this.selectPainting(prev);
	}

	backToGallery() {
		this.view = 'gallery';
		this.showCelebration = false;
		this.showHint = false;
	}

	private _checkSolved() {
		if (isSolved(this.tiles)) {
			setTimeout(() => {
				this.showCelebration = true;
			}, 300);
		}
	}

	private _preloadAdjacent(index: number) {
		const prev = (index - 1 + paintings.length) % paintings.length;
		const next = (index + 1) % paintings.length;
		preloadImage(getPuzzleUrl(paintings[prev]));
		preloadImage(getPuzzleUrl(paintings[next]));
	}
}

export const game = new GameState();

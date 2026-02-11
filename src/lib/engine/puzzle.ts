export type Direction = 'up' | 'down' | 'left' | 'right';

export function createSolvedState(size: number): number[] {
	const total = size * size;
	return Array.from({ length: total }, (_, i) => i);
}

export function getBlankIndex(tiles: number[]): number {
	return tiles.indexOf(tiles.length - 1);
}

export function getRowCol(index: number, size: number): { row: number; col: number } {
	return { row: Math.floor(index / size), col: index % size };
}

export function getNeighbor(blankIndex: number, direction: Direction, size: number): number | null {
	const { row, col } = getRowCol(blankIndex, size);
	switch (direction) {
		case 'up': return row > 0 ? (row - 1) * size + col : null;
		case 'down': return row < size - 1 ? (row + 1) * size + col : null;
		case 'left': return col > 0 ? row * size + (col - 1) : null;
		case 'right': return col < size - 1 ? row * size + (col + 1) : null;
	}
}

export function getValidMoveDirections(tiles: number[], size: number): Direction[] {
	const blankIdx = getBlankIndex(tiles);
	const dirs: Direction[] = ['up', 'down', 'left', 'right'];
	return dirs.filter((d) => getNeighbor(blankIdx, d, size) !== null);
}

export function moveTile(tiles: number[], direction: Direction, size: number): number[] | null {
	const blankIdx = getBlankIndex(tiles);
	const neighborIdx = getNeighbor(blankIdx, direction, size);
	if (neighborIdx === null) return null;

	const newTiles = [...tiles];
	[newTiles[blankIdx], newTiles[neighborIdx]] = [newTiles[neighborIdx], newTiles[blankIdx]];
	return newTiles;
}

export function moveTileByIndex(tiles: number[], tileIndex: number, size: number): { tiles: number[]; direction: Direction } | null {
	const blankIdx = getBlankIndex(tiles);
	const blankRC = getRowCol(blankIdx, size);
	const tileRC = getRowCol(tileIndex, size);

	const rowDiff = tileRC.row - blankRC.row;
	const colDiff = tileRC.col - blankRC.col;

	if (Math.abs(rowDiff) + Math.abs(colDiff) !== 1) return null;

	let direction: Direction;
	if (rowDiff === -1) direction = 'up';
	else if (rowDiff === 1) direction = 'down';
	else if (colDiff === -1) direction = 'left';
	else direction = 'right';

	const newTiles = [...tiles];
	[newTiles[blankIdx], newTiles[tileIndex]] = [newTiles[tileIndex], newTiles[blankIdx]];
	return { tiles: newTiles, direction };
}

export function isSolved(tiles: number[]): boolean {
	return tiles.every((val, idx) => val === idx);
}

const OPPOSITE: Record<Direction, Direction> = {
	up: 'down',
	down: 'up',
	left: 'right',
	right: 'left'
};

export function shufflePuzzle(size: number, moves: number = 100): number[] {
	let tiles = createSolvedState(size);
	let lastDirection: Direction | null = null;

	for (let i = 0; i < moves; i++) {
		const validDirs = getValidMoveDirections(tiles, size).filter(
			(d) => !lastDirection || d !== OPPOSITE[lastDirection]
		);
		const dir = validDirs[Math.floor(Math.random() * validDirs.length)];
		const result = moveTile(tiles, dir, size);
		if (result) {
			tiles = result;
			lastDirection = dir;
		}
	}

	if (isSolved(tiles)) {
		return shufflePuzzle(size, moves);
	}

	return tiles;
}

export function getDirectionFromKey(key: string): Direction | null {
	switch (key) {
		case 'ArrowUp': return 'up';
		case 'ArrowDown': return 'down';
		case 'ArrowLeft': return 'left';
		case 'ArrowRight': return 'right';
		default: return null;
	}
}

import { test, expect } from '@playwright/test';

test.describe('Gallery View', () => {
	test('loads with all 30 paintings', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('h1')).toContainText('MLSC Studio');
		await expect(page.getByText('Painting Archive')).toBeVisible();

		const cards = page.locator('button').filter({ hasText: /Painting/ });
		await expect(cards).toHaveCount(30);
	});

	test('shows painting thumbnails', async ({ page }) => {
		await page.goto('/');
		const firstImg = page.locator('img[alt="Painting I"]');
		await expect(firstImg).toBeVisible();
	});

	test('shows footer with artist credit', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByText('Millerscottie')).toBeVisible();
	});
});

test.describe('Puzzle View', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'Painting I' }).first().click();
		await page.waitForSelector('[aria-label="Tile 1"]', { timeout: 10000 });
	});

	test('enters puzzle view on painting click', async ({ page }) => {
		await expect(page.getByText('PAINTING I')).toBeVisible();
		await expect(page.getByText('0 moves')).toBeVisible();
	});

	test('shows grid size toggle', async ({ page }) => {
		await expect(page.getByRole('button', { name: '3×3' })).toBeVisible();
		await expect(page.getByRole('button', { name: '4×4' })).toBeVisible();
	});

	test('moves tiles with arrow keys', async ({ page }) => {
		await page.keyboard.press('ArrowUp');
		await expect(page.getByText('1 moves')).toBeVisible();

		await page.keyboard.press('ArrowLeft');
		await expect(page.getByText('2 moves')).toBeVisible();
	});

	test('shows arrow indicators', async ({ page }) => {
		const arrows = page.locator('button[aria-label^="Move"]');
		const count = await arrows.count();
		expect(count).toBeGreaterThan(0);
		expect(count).toBeLessThanOrEqual(4);
	});

	test('returns to gallery on escape', async ({ page }) => {
		await page.keyboard.press('Escape');
		await expect(page.locator('h1')).toContainText('MLSC Studio');
	});

	test('navigates between paintings with brackets', async ({ page }) => {
		await page.keyboard.press(']');
		await expect(page.getByText('PAINTING II')).toBeVisible();
		await expect(page.getByText('2 / 30')).toBeVisible();

		await page.keyboard.press('[');
		await expect(page.getByText('PAINTING I')).toBeVisible();
	});

	test('resets puzzle with R key', async ({ page }) => {
		// Make several moves - some may be invalid depending on blank position
		for (let i = 0; i < 6; i++) {
			await page.keyboard.press(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'][i % 4]);
		}
		// Verify at least some moves registered
		const moveText = await page.locator('.move-counter').textContent();
		const moveCount = parseInt(moveText || '0');
		expect(moveCount).toBeGreaterThan(0);

		await page.keyboard.press('r');
		await expect(page.getByText('0 moves')).toBeVisible();
	});

	test('switches grid size', async ({ page }) => {
		await page.getByRole('button', { name: '3×3' }).click();
		const tiles = page.locator('button[aria-label^="Tile"]');
		await expect(tiles).toHaveCount(8); // 3x3 = 9 - 1 blank = 8

		await page.getByRole('button', { name: '4×4' }).click();
		await expect(tiles).toHaveCount(15); // 4x4 = 16 - 1 blank = 15
	});

	test('clicking tiles moves them', async ({ page }) => {
		// Click directly on a tile adjacent to the blank to move it
		const tiles = page.locator('button[aria-label^="Tile"]');
		const count = await tiles.count();
		// Try clicking each tile until one moves (only adjacent tiles to blank will register)
		for (let i = 0; i < count; i++) {
			await tiles.nth(i).click();
			const text = await page.locator('.move-counter').textContent();
			if (text && parseInt(text) > 0) break;
		}
		const moveText = await page.locator('.move-counter').textContent();
		expect(parseInt(moveText || '0')).toBeGreaterThan(0);
	});
});

test.describe('Navigation', () => {
	test('prev/next buttons cycle paintings', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'Painting I' }).first().click();
		await page.waitForSelector('[aria-label="Tile 1"]', { timeout: 10000 });

		await page.getByRole('button', { name: 'Next painting' }).click();
		await expect(page.getByText('PAINTING II')).toBeVisible();

		await page.getByRole('button', { name: 'Previous painting' }).click();
		await expect(page.getByText('PAINTING I')).toBeVisible();
	});

	test('gallery back button works', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'Painting V' }).first().click();
		await page.waitForSelector('[aria-label="Tile 1"]', { timeout: 10000 });

		await page.getByRole('button', { name: 'Back to gallery' }).click();
		await expect(page.locator('h1')).toContainText('MLSC Studio');
	});
});

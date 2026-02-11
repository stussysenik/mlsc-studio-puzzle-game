export interface Painting {
	id: number;
	hash: string;
	filename: string;
	width: number;
	height: number;
	label: string;
}

const CDN_BASE = 'https://freight.cargo.site';

export function getPuzzleUrl(p: Painting): string {
	return `${CDN_BASE}/w/800/i/${p.hash}/${p.filename}`;
}

export function getThumbUrl(p: Painting): string {
	return `${CDN_BASE}/w/400/i/${p.hash}/${p.filename}`;
}

export function getBackgroundUrl(p: Painting): string {
	return `${CDN_BASE}/w/600/i/${p.hash}/${p.filename}`;
}

export function getOriginalUrl(p: Painting): string {
	return `${CDN_BASE}/t/original/i/${p.hash}/${p.filename}`;
}

function toRoman(n: number): string {
	const vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
	const syms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
	let result = '';
	for (let i = 0; i < vals.length; i++) {
		while (n >= vals[i]) {
			result += syms[i];
			n -= vals[i];
		}
	}
	return result;
}

export const paintings: Painting[] = [
	{ id: 1, hash: 'U2297869164704447450353825630796', filename: 'IMG_1771.JPG', width: 3500, height: 3500, label: '' },
	{ id: 2, hash: 'J2297865483914921958644734380620', filename: 'IMG_1758.JPG', width: 3000, height: 3000, label: '' },
	{ id: 3, hash: 'L2297862485138418360125185477196', filename: 'IMG_1768.JPG', width: 3600, height: 3600, label: '' },
	{ id: 4, hash: 'U2297862485046184639756637719116', filename: 'IMG_1767.JPG', width: 3600, height: 3600, label: '' },
	{ id: 5, hash: 'F2297862485156865104198895028812', filename: 'IMG_1769.JPG', width: 3600, height: 3600, label: '' },
	{ id: 6, hash: 'V2288855909236053106918353685068', filename: 'IMG_1174.JPG', width: 3600, height: 3600, label: '' },
	{ id: 7, hash: 'O2288774895637086928552786807372', filename: 'IMG_1509.JPG', width: 2615, height: 3542, label: '' },
	{ id: 8, hash: 'R2288774895673980416700205910604', filename: 'IMG_1510.JPG', width: 4065, height: 2702, label: '' },
	{ id: 9, hash: 'D2288772460168807108901815601740', filename: 'PIECE-2.JPG', width: 2587, height: 3278, label: '' },
	{ id: 10, hash: 'X2288772460058126644459558292044', filename: 'IMG_4205.JPG', width: 3589, height: 2749, label: '' },
	{ id: 11, hash: 'G2288772460076573388533267843660', filename: 'IMG_4208.JPG', width: 1833, height: 3687, label: '' },
	{ id: 12, hash: 'U2288772460150360364828106050124', filename: 'IMG_4215.JPG', width: 2201, height: 2191, label: '' },
	{ id: 13, hash: 'B2288772460039679900385848740428', filename: 'IMG_4204.JPG', width: 3909, height: 2588, label: '' },
	{ id: 14, hash: 'U2288772460131913620754396498508', filename: 'IMG_4213.JPG', width: 2293, height: 2883, label: '' },
	{ id: 15, hash: 'O2288772460113466876680686946892', filename: 'IMG_4212.JPG', width: 2446, height: 3204, label: '' },
	{ id: 16, hash: 'F2288772460095020132606977395276', filename: 'IMG_4211.JPG', width: 2865, height: 3635, label: '' },
	{ id: 17, hash: 'I2288774895692427160773915462220', filename: 'IMG_4201.JPG', width: 2570, height: 3188, label: '' },
	{ id: 18, hash: 'X2296301956684466548159795317324', filename: '9221A836-485F-49CB-BF37-73C64DBFF77E.jpg', width: 1440, height: 1440, label: '' },
	{ id: 19, hash: 'K2296302042978335324973077776972', filename: 'IMG_3586.jpg', width: 1717, height: 3472, label: '' },
	{ id: 20, hash: 'K2296302043052122301267915983436', filename: 'IMG_3587-2.jpg', width: 3592, height: 2378, label: '' },
	{ id: 21, hash: 'X2297852725113702912991101864524', filename: 'IMG_1759.PNG', width: 2732, height: 2048, label: '' },
	{ id: 22, hash: 'N2290111769161954707526365104716', filename: 'IMG_5751.PNG', width: 2430, height: 3037, label: '' },
	{ id: 23, hash: 'Z2290111769069720987157817346636', filename: 'IMG_5751-3.PNG', width: 2467, height: 3084, label: '' },
	{ id: 24, hash: 'H2290111769051274243084107795020', filename: 'IMG_5751-2.PNG', width: 3016, height: 2413, label: '' },
	{ id: 25, hash: 'D2290111769125061219378946001484', filename: 'IMG_5751-6.PNG', width: 2399, height: 2999, label: '' },
	{ id: 26, hash: 'H2290111769088167731231526898252', filename: 'IMG_5751-4.PNG', width: 2456, height: 3070, label: '' },
	{ id: 27, hash: 'B2290111769106614475305236449868', filename: 'IMG_5751-5.PNG', width: 2410, height: 3013, label: '' },
	{ id: 28, hash: 'G2290111769143507963452655553100', filename: 'IMG_5751-7.PNG', width: 2370, height: 2963, label: '' },
	{ id: 29, hash: 'C2297865176167890576948284770892', filename: 'IMG_0059.JPG', width: 3456, height: 3456, label: '' },
	{ id: 30, hash: 'V2297864651690063073238313224780', filename: 'IMG_1765.JPG', width: 3456, height: 4608, label: '' },
].map((p) => ({ ...p, label: `Painting ${toRoman(p.id)}` }));

export function preloadImage(url: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve();
		img.onerror = reject;
		img.src = url;
	});
}

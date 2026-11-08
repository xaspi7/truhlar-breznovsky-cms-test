/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				serif: ['"Playfair Display"', 'serif'],
				sans: ['"Inter"', 'sans-serif'],
			},
			colors: {
				amber: {
					700: '#B45309', // Tvoje hlavní barva dřeva
					800: '#92400e',
				},
				stone: {
					50: '#fafaf9',  // Pozadí
					900: '#1c1917', // Text a tmavé sekce
				}
			}
		},
	},
	plugins: [],
}

/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
	content: ['./src/**/*.{html,js,jsx}'],
	theme: {
		extend: {
			screens: {
				xs: '475px',
			},
			fontFamily: {
				sdg: ['SF Distant Galaxy', 'sans-serif'],
			},
			colors: {
				c1: '', // 60%
				c2: '', // 30%
				c3: '', // 10%
			},
		},
	},
	plugins: [],
}

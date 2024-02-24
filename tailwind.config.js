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
				dhd: ['Deathshead Halftone', 'sans-serif'],
				pcl: ['M PLUS Code Latin', 'sans-serif'],
				fin: ['Finlandica', 'sans-serif'],
			},
			colors: {
				c1: '#323232', // 60%
				c2: '#B4B4B8', // 30%
				c3: '#C10000', // 10%
				ct: '#EEEEEE', // text
			},
		},
	},
	plugins: [],
}

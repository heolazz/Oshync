/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                pink: {
                    DEFAULT: '#ec4899',
                }
            },
            fontFamily: {
                quicksand: ['Quicksand', 'sans-serif'],
                syne: ['Syne', 'sans-serif'],
            },
            backgroundImage: {
                'pink-gradient': "radial-gradient(circle at 50% 50%, #fdf2f8 0%, #fce7f3 30%, #f3e8ff 70%, #fae8ff 100%)",
            }
        },
    },
    plugins: [],
}

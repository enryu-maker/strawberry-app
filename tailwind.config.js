/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')
module.exports = withMT({
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                Sevillana: 'Bodoni Moda',
                SUSE: 'Bodoni Moda',
                Facinate: 'Bodoni Moda'
            },
            colors: {
                primary: '#bb2823',
                text: '#555555'
            }
        }
    },
    plugins: []
})

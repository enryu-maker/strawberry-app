/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')
module.exports = withMT({
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                Sevillana: 'Sevillana',
                SUSE: 'SUSE',
                Facinate: 'Fascinate Inline'
            },
            colors: {
                primary: '#E85050',
                text: '#555555'
            }
        }
    },
    plugins: []
})

/** @type {import('tailwindcss').Config} */
module.exports = {
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
}

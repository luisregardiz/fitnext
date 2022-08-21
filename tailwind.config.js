/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],

    theme: {
        extend: {
            colors: {
                'dark-900': '#060919',
                'dark-800': '#0e1625',
                'dark-700': '#181d38',
                'dark-600': '#202735',
                'dark-500': '#1b2d4c',
            },
        },
    },
    plugins: [],
};

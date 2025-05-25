/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                header: ["Merriweather", "serif"], // Elegant serif for headers
                body: ["Lato", "sans-serif"],      // Clean and readable for body
            },
            colors: {
                primary: "#4B3F35",        // Deep brown for strong accents
                bg: "#FAF8F1",             // Soft ivory background
                primaryText: "#2E2E2E",    // Charcoal for primary text
                secondary: "#7B6D62",      // Muted taupe for subtitles/UI
                accent: "#A0522D",         // Sienna for buttons/links
                highlight: "#D9B382",      // Muted gold for highlights
                success: "#2E8B57",        // Medium sea green
                error: "#B22222",          // Firebrick for errors
            }
        },
    },
    plugins: [],
};

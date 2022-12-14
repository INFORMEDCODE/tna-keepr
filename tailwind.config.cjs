/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        require("tailwindcss-radix")({
            variantPrefix: "rdx"
        }),
    ],
    mode: "jit",
};

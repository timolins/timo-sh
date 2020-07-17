module.exports = {
  plugins: [
    "tailwindcss",
    "autoprefixer",
    "postcss-nested",
    ...(process.env.NODE_ENV === "production"
      ? [
          [
            "@fullhuman/postcss-purgecss",
            {
              // Specify the paths to all of the template files in your project
              content: [
                "./pages/*.tsx",
                "./pages/**/*.tsx",
                "./components/*.tsx",
                "./components/**/*.tsx",
              ],

              // make sure css reset isnt removed on html and body
              whitelist: ["html", "body"],

              whitelistPatterns: [/react-multi-carousel.*/, /notion.*/],

              // Include any special characters you're using in this regular expression
              defaultExtractor: content =>
                content.match(/[\w-/:]+(?<!:)/g) || [],
            },
          ],
          "cssnano",
        ]
      : []),
  ],
};

module.exports = {
    "plugins": [
        "react"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "modules": true,
            "experimentalObjectRestSpread": true
        }
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true,
        "mocha": true
    },
    "settings": {
        "react": {
          "pragma": "React",
          "version": "16.7.0"
        }
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "rules": {
        "no-unused-vars": 0,
        "singleQuote": true,
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "quotes": [2, "single", "avoid-escape"],
        "no-trailing-spaces": 2,
        "spaced-comment":     [2, "always" ],
        "no-unused-expressions": 1,
        "no-unused-vars":     2,
        "brace-style": [
            1,
            "1tbs",
            { "allowSingleLine": true }
        ],
        "object-curly-spacing": ["error", "never"]
    }
}

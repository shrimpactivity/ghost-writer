module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "commonjs": true,
        "jest/globals": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "prettier"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react", 
        "jest"
    ],
    "rules": {
    }
}

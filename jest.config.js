module.exports = {
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testMatch": [
        "/tests/.*/.*\\.(test|spec)?\\.(ts|tsx|js)$"
    ],
    "testRegex": "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
};
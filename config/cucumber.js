module.exports = {
    default: {
        paths: [
            "src/tests/features"
        ],
        dryRun: false,
        format: [
            "progress-bar",
            "summary",
            "json:reports/cucumber-report.json",
            "html:reports/cucumber-report.html"
        ],
        formatOptions: {
            colorsEnabled : true,
            snippetInterface: "async-await"
        },
        require: [
            "src/tests/stepDefinitions/*.ts", "src/support/hooks.ts"
        ],
        requireModule: [
            "ts-node/register"
        ]
    }
}
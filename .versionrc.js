module.exports = {
  issueUrlFormat: '{{prefix}}{{id}}', // JIRA issue URL format
  issuePrefixes: ['PREFIX'], // JIRA issue prefixes
  types: [
    {
      type: 'feat',
      section: 'Features 🎯',
    },
    {
      type: 'fix',
      section: 'Bug Fixes 🐛',
    },
    {
      type: 'chore',
      section: 'Chores 🧹',
    },
    {
      type: 'docs',
      section: 'Documentation 📖',
    },
    {
      type: 'style',
      section: 'Styles 💅',
    },
    {
      type: 'refactor',
      section: 'Refactor 🔄',
    },
    {
      type: 'perf',
      section: 'Performance 🏎',
    },
    {
      type: 'test',
      section: 'Tests 🧪',
    },
    {
      type: 'build',
      section: 'Build System 🛠',
    },
    {
      type: 'ci',
      section: 'Continuous Integration 🚀',
    },
    {
      type: 'revert',
      section: 'Reverts ⏪',
    },
  ],
};

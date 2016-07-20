'use strict';

module.exports = {
    tasks: {
        options: {
            filter: 'include',
            tasks: [
                'help',
                'build',
                'compile',
                'test',
                'testLoop',
                'ci',
                'serve',
                'default'
            ],
            descriptions: {
                'help': 'Shows available grunt tasks',
                'build': 'Gets your app ready to run for development and testing',
                'compile': 'Gets your app ready for deployment',
                'test': 'Runs all of the unit tests once',
                'testLoop': 'Launches a browser for debugging tests which rerun on file changes',
                'ci': 'For running your continuous build on Jenkins',
                'serve': 'Boots up a local node server & opens your browser to index.html'
            },
            sort: true
        }
    }
};

module.exports = function ({ types }) {
    return {
        name: 'no-require-less',
        visitor: {
            ImportDeclaration(path) {
                const targetPath = path.node.source.value;
                if (targetPath.indexOf('.less') > -1) {
                    path.remove();
                }
            },
        },
    };
};

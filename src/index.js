// eslint-disable-next-line @typescript-eslint/no-var-requires
const { bokmalTilNynorskMap } = require('./ordliste'); // Adjust the path as needed

function translateCasePreserving(originalTerm, translationTerm) {
    return originalTerm.replace(
        new RegExp(`\\b${originalTerm}\\b`, 'gi'),
        match => {
            if (match[0] === match[0].toUpperCase()) {
                return translationTerm.charAt(0).toUpperCase() + translationTerm.slice(1);
            }
            return translationTerm;
        }
    );
}

module.exports = {
    rules: {
        'ikkje-bokmal': {
            meta: {
                type: 'suggestion',
                docs: {
                    description: 'Åtvare om bokmålsord nytta i nynorskomsetjing',
                },
                fixable: 'code',
            },
            create: function (context) {
                return {
                    Property(node) {
                        if (node.key.name === 'nn' && node.value.type === 'ObjectExpression') {
                            node.value.properties.forEach(property => {
                                if (property.value.type === 'Literal') {
                                    const originalTerm = property.value.value;
                                    const recommendedTerm = bokmalTilNynorskMap[originalTerm.toLowerCase()];

                                    if (recommendedTerm) {
                                        const newTerm = translateCasePreserving(originalTerm, recommendedTerm)

                                        context.report({
                                            node: property.value,
                                            message: `"${originalTerm}" er bokmål, og vert ikkje nytta i nynorsk.`,
                                            fix: fixer => fixer.replaceText(property.value, `'${newTerm}'`),
                                        });
                                    }
                                }
                            });
                        }
                    },
                };
            },
        },
    },
};

let dbService = require('../db.service');
let templateGenerator = require('../metadata/template-generator');

let metaDataTemplateCache = [];
fillMetaDataTemplateCache();

function fillMetaDataTemplateCache() {
    dbService.getPosts().then((data) => {
        data.forEach(post => exports.saveMetaData(post));
    }).catch((err) => {
        console.log(err);
    });
}

exports.saveMetaData = function (post) {
    let metaDataTemplate = templateGenerator.assembleTemplate(post);
    metaDataTemplateCache.push({ titleURL: post.titleURL, template: metaDataTemplate });
};

exports.updateMetaData = function (post) {
    let index = metaDataTemplateCache.findIndex((e) => e.titleURL == post.titleURL);
    let metaDataTemplate = templateGenerator.assembleTemplate(post);
    metaDataTemplateCache[index] = { titleURL: post.titleURL, template: metaDataTemplate };
};

exports.getMetaData = function (titleURL) {
    let metaDataTemplateObject = metaDataTemplateCache.find((e) => e.titleURL == titleURL);
    return metaDataTemplateObject === undefined ? false : metaDataTemplateObject.template;
}

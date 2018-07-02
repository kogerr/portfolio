let dbService = require('../db.service');
let templateGenerator = require('../metadata/template-generator');

let metaDataTemplateCache = [];
fillMetaDataTemplateCache();

/**
 * Fills the template cache with templates generated from database on init.
 */
function fillMetaDataTemplateCache() {
    dbService.getPosts().then((data) => {
        data.forEach((post) => exports.saveMetaData(post));
    }).catch((err) => {
        console.log(err);
    });
}

exports.saveMetaData = function(post) {
    let metaDataTemplate = templateGenerator.assembleTemplate(post);
    let metaDataObject = {titleURL: post.titleURL, template: metaDataTemplate};
    metaDataTemplateCache.push(metaDataObject);
};

exports.updateMetaData = function(post) {
    let index = metaDataTemplateCache
        .findIndex((e) => e.titleURL === post.titleURL);
    let metaDataTemplate = templateGenerator.assembleTemplate(post);
    let metaDataObject = {titleURL: post.titleURL, template: metaDataTemplate};
    metaDataTemplateCache[index] = metaDataObject;
};

exports.getMetaData = function(titleURL) {
    let metaDataTemplateObject = metaDataTemplateCache
        .find((e) => e.titleURL === titleURL);
    let template = metaDataTemplateObject.template;
    return metaDataTemplateObject === undefined ? false : template;
};

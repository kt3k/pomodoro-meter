

subclass = require('subclassjs');

mongo = require('../../mongo');

var TomatoFactory = module.exports = subclass(function (pt) {
    'use strict';

    pt.constructor.getInstance = function () {

        return new this();

    };

    /**
     * Creates a tomato model from the object.
     *
     * @param {Object} obj The object
     * @return {Tomato}
     */
    pt.createFromObject = function (obj) {

        var now = new Date().getTime();

        if (!obj.createdAt) {
            obj.createAt = now;
        }

        obj.updatedAt = now;

        if (!obj.startedAt) {
            obj.startedAt = now;
        }

        if (!obj.privacy) {
            obj.privacy = 'friend';
        }

        if (!obj.status) {
            obj.status = 'started';
        }

        if (!obj.accountId) {
            throw new Error('Account id is required for creating tomato object.');
        }

        if (typeof obj.tags === 'string') {
            obj.tags = obj.tags.trim().split(/\s+/);
        }

        return new mongo.Tomato(obj);

    };

});

'use strict';

const Model = require('objection').Model;

class City extends Model {

    static get tableName() {
        return 'device';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./user'),
                join: {
                    from: 'device.fk_user_id',
                    to: 'user.id'
                }
            },
        };
    }

}

module.exports = City;

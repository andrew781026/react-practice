'use strict';

const Model = require('objection').Model;

class ChargeSp extends Model {

    static get tableName() {
        return 'chargeSp';
    }

}

module.exports = ChargeSp;

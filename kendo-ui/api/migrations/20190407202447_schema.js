/**
 * 此檔案建立的 Table :
 fee0404m schema
 */
exports.up = function (knex, Promise) {
    let schema = knex.schema;

    schema.createTableIfNotExists('fee0404m', table => {
        table.increments('id').primary();
        table.integer('diff_day');
        table.string('holiday_mark');
        table.string('date');
    });

    return schema;
};

exports.down = function (knex, Promise) {
};

/**
 * 此檔案建立的 Table :
 group schema
 status schema
 mission_type schema
 chat_room schema
 job schema
 division schema
 hospital schema
 city schema
 region schema
 company schema
 */
exports.up = function (knex, Promise) {
    let schema = knex.schema;

    schema.createTableIfNotExists('region', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('no');
    });

    schema.createTableIfNotExists('city', table => {
        table.increments('id').primary();
        table.string('name');
        table.boolean('is_supported').default(false).notNullable();
        table
            .integer('fk_region_id')
            .unsigned()
            .references('id')
            .inTable('region');
    });

    schema.createTableIfNotExists('hospital', function (table) {
        table.increments('id').primary();
        table
            .integer('fk_city_id')
            .unsigned() // unsigned : 非負數
            .references('id')
            .inTable('city');
        table.string('name');
        table.string('address').notNull();
        table.string('tel_no');
        table.string('website');
        table.string('level');
        table.double('lat').notNull();
        table.double('lng').notNull();
    });

    schema.createTableIfNotExists('division', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('no');
    });

    schema.createTableIfNotExists('job', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('type');
    });

    schema.createTableIfNotExists('chat_room', table => {
        table.increments('id').primary();
        table.string('room_name');
        table.string('total_time');
        table.string('type');
        table.string('session_id');
        table.text('token_cc');
        table.text('token_vip');
        table.text('token_doctor');
        table.datetime('start_time'); // 醫師進入 => 諮詢開始 => 存時間
        table.datetime('end_time'); // VIP結束諮詢 => 諮詢結束 => 存時間
        table.timestamp('update_at', true).defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('create_at', false).default(knex.fn.now());
    });

    schema.createTableIfNotExists('mission_type', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('label');
    });

    schema.createTableIfNotExists('location_type', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('label');
    });

    schema.createTableIfNotExists('location_status', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('label');
    });

    schema.createTableIfNotExists('status', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('label');
        table.string('relate_table');
        table.string('note');
    });

    schema.createTableIfNotExists('company', table => {
        table.increments('id').primary();
        table.string('type');
        table.string('name');
        table.string('no');
        table.boolean('is_use_budget').default(false).notNullable(); // 沒用預算制 , 扣 company 的現有點數
        table.integer('current_point');
    });

    schema.createTableIfNotExists('group_type', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('label');
        table.string('description');
        table.string('short_label');
    });

    schema.createTableIfNotExists('group', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('no');
        table.integer('max_vip_amount').unsigned().default(4);
        table.integer('current_point').default(0);
        table.datetime('join_date'); // 入會時間
        table.datetime('expire_date'); // 到期時間
        table
            .integer('fk_company_id')
            .unsigned()
            .references('id')
            .inTable('company');
        table
            .integer('fk_group_type_id')
            .unsigned()
            .references('id')
            .inTable('group_type');
    });

    return schema;
};

exports.down = function (knex, Promise) {
};

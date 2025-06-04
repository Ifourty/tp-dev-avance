export class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        const filters = {};

        for (const key in queryObj) {
            if (key.includes('[') && key.includes(']')) {
                const field = key.split('[')[0];
                const operator = key.match(/\[(.*)\]/)[1];
                if (!filters[field]) filters[field] = {};
                filters[field][`$${operator}`] = isNaN(queryObj[key])
                    ? queryObj[key]
                    : Number(queryObj[key]);
            } else {
                filters[key] = isNaN(queryObj[key])
                    ? queryObj[key]
                    : Number(queryObj[key]);
            }
        }

        console.log('Parsed Filter:', filters);

        this.query = this.query.find(filters);
        return this;
    }


    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

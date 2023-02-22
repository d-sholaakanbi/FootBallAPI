const Teams = require('../model/team')

const getAllTeams = async (req,res) => {
    //req.query
    // console.log(req.query)
    const {name, location, uclwinner, sort, select, numberFilters } = req.query;
    let queryObject = {};
    let result = Teams.find(queryObject)
    if (name) {
        queryObject.name = {$regex: name, $options: "i"};
    }

    if (location) {
        queryObject.location = {$regex: name, $options: "i"};
     }

     if (uclwinner) {
         queryObject.uclwinner = uclwinner === "true" ? true : false;
     }

     if (numberFilters) {
        // >>= = < < = what we want to do here is rating >4.0 - rating $gt 4.0
        //$gt $gte $lt $eq $lte $
        const operatorMap = {
            ">": '$gt',
            ">=": '$gte',
            "=": '$eq',
            "<": '$lt',
            "<=": '$lte',
        }
        const regEx = /\b(<|>|>=|<=|=)\b/g;
        let filters = numberFilters.replace(regEx, (match)=> `-${operatorMap[match]}-`);
        //ratings-$gte-3.0
        const options = ['rating']
        filters = filters.split(',').forEach((item)=> {
            //ratings-$gte-3.0;= [rating, $gte, 3.0]
            const [search, operator, value] = item.split('-');
            if (options.includes(search)) {
                queryObject[search] =  { [operator]: Number(value) };
            }
        });
     }

     //sorting
     if (sort) {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
     }
     //selecting
     if (select) {
        const selectList = select.split(",").join(" ");
        result = result.select(selectList);
     }


     //limit
     const limit = Number(req.query.limit)
     result = result.limit(limit);

     //Number filters

     result = result.find(queryObject)
     const teams = await result
    res.status(200).json({noOfTeams: teams.length, teams})
}

module.exports = getAllTeams;
const Teams = require('../model/team')

const getAllTeams = async (req,res) => {
    //req.query
    // console.log(req.query)
    const {name, location, ulcwinner,sort,select} = req.query;
    let queryObject = {};
    let result = Teams.find(queryObject)
    if (name) {
        queryObject.name = {$regex: name, $options: 'i'};
    }
    if (location){
        queryObject.location = {$regex: name, $options: 'i'};
    }
    if (ulcwinner) {
        queryObject.ulcwinner = uclwinner === 'true' ? true : false;
    }

    //sorting 
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    //selecting
    if (select) {
        const selectList = select.split(',').join(' ');
        result = result.select(selectList);
    }


    //limit
    const limit = Number(req.query.limit)
    result = result.limit(limit)
    
     result = result.find(queryObject)
     const teams = await result
    res.status(200).json({noOfTeams: teams.length, teams})
}

module.exports = getAllTeams;
const Child = require("../models/Child");

function filterByDay(day){
    Child.find({availabledays: day})
    .then(list => {
        return list;
    })
    .catch(err => console.log(err));
}

module.exports = filterByDay;
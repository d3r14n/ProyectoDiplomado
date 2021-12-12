const { result } = require("lodash");

module.exports = {
    sum: function (req, res) {
        res.json((parseFloat(req.params.num1) + parseFloat(req.params.num2)));
    },

    substract: function (req, res) {
        res.json((parseFloat(req.params.num1) - parseFloat(req.params.num2)));
    },

    multiply: function (req, res) {
        res.json((parseFloat(req.params.num1) * parseFloat(req.params.num2)));
    },

    divide: function (req, res) {
        if(req.params.num2 == 0)
        {
            res.json("inf")
        }
        else
        {
        res.json((parseFloat(req.params.num1) / parseFloat(req.params.num2)));
        }
    }
};

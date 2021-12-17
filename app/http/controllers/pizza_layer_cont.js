const custom = require("../../models/custom");
//using factory functions
function pizza_layer_cont() {
return {
    async pizzaLayers(req, res) {
    const Layers = await custom.find();
    console.log()
    return res.render('custom', { Layers: Layers });
    },
};
}

module.exports = pizza_layer_cont;
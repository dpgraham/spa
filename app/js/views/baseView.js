var BaseView = function(){

};

BaseView.prototype.render = function(ctx){
    ctx = ctx || this;
    var data = !ctx.model ? {} : ctx.model.data;
    ctx.el.innerHTML = ctx.template(data);
};

module.exports = BaseView;
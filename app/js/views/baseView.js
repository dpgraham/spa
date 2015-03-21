var BaseView = function(){

};

BaseView.prototype.render = function(){
    this.el.innerHTML = this.template(this.model.data);
};

module.exports = BaseView;
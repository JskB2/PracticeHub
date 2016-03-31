// ovo moze ici i u self-executing anonymous function: (function(){})();
// i onda postaje dio njenog scopea i skriveno je od drugih stvari 

var PplModule = {
    people: ["Bruce Dickinson", "Rob Halford",
        "Warrel Dane", "Mikael Stanne",
        "Chuck Schuldiner", "Jorn Lande",
        "Russel Allen", "Dan Swano"],
    init: function () {
        this.cacheDom();
        this.bindEvents();
        this.render();
    },
    cacheDom: function () {
        this.$el = $("#pplTemplate");
        this.$ul = this.$el.find("ul");
        this.$input = this.$el.find("input");
        this.$button = this.$el.find("button");
    },
    bindEvents: function () {
        // isto scope, ili ovo ili $.proxy ili ona druga fora
        this.$button.click(this.addPerson.bind(this));
        this.$ul.on("click", "span.glyphicon", this.removePerson.bind(this));
    },
    addPerson: function () {
        this.people.push(this.$input.val());
        this.render();
        this.$input.val("");
    },
    removePerson: function (e) {
        var $li = $(e.target).closest("li");
        var index = this.$ul.find($li).index();

        this.people.splice(index, 1);
        this.render();
    },
    render: function () {
        // 2 nacina kako napraviti jer se mijenja scope u $.each() 
        //var module = this;
        //console.log(module); 
        //$.each(list, function (index, value) {
        //    module.render(value);
        //});
        this.$ul.html("");
        $.each(this.people, $.proxy(function (index, value) {
            this.$ul.append("<li value='" + value + "'><span>" + value + "</span><span class='glyphicon glyphicon-trash'></span></li>");
        }, this));
    }
};

$(function () {
    PplModule.init();
});

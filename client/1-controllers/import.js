Template.import.events({
    "click .import-close" : function(e){
        Router.go("home");
    },
    'click .import-wiki' : function(e){
        e.preventDefault();
        var rows = $(".import-wrapper textarea").val();
        Template.import.parse(rows);
    },
    'click .import-json' : function(e){
        e.preventDefault();
    }
})
Template.import.parse = function(rows){
    
    var itemList = Items.find({},{fields:{_id:true}}).fetch();
    _.each( itemList, function(item){
        Items.remove(item);
    });
    var parser      = new itemParser();
    itemList        = parser.run(rows);
    var itemNames   = [];
    _.each( itemList, function(item){
        // Attempts to insert if not already in 
        if( itemNames.indexOf(item.name) === -1 ){
            itemNames.push(item.name)
            Items.insert(item);
        }
    });
}



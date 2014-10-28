for (var i = 0; i < bushwickPluto.features.length; i++) {
	db.bushwick_pluto.insert( bushwickPluto.features[i]);
}

bushwickPluto.features.forEach( function(feature){
	db.bushwick_pluto.insert(feature);
})


//THESE QUERIES WORK.

db.bushwick_pluto.find( { "properties.Block":  3305 })
	
db.bushwick_pluto.find(
{ 
	"properties.YearBuilt": {
		$lte: 1973
	}, 
	"properties.UnitsRes": { 
		$gte: 6
	} 
});
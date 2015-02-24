var geneticSalesman = function(genes, assessFitness, initiateBloodline, mutate, availableResources){
  var options = {
    numberOfBloodlines: 1,
    offspringPerSurvivor: 50,
  };

// SOLUTION STARTS HERE 
  // var bloodlines = [];
  // for (var i = 0; i < options.numberOfBloodlines; i++) {
  //   bloodlines.push(initiateBloodline(genes));
  // }

  // while(availableResources) {
  //   for (var i = 0; i < bloodlines.length; i++) {
  //     var survivor = bloodlines[i];
  //     var survivorFitness = assessFitness(survivor);
  //     for (var offspring = 0; offspring < options.offspringPerSurvivor; offspring++){
  //       var currentOffspring = mutate(bloodlines[i]);
  //       var currentFitness = assessFitness(currentOffspring);
  //       if (currentFitness < survivorFitness){
  //         survivor = currentOffspring;
  //         survivorFitness = currentFitness;
  //       }
  //     }
  //     bloodlines[i] = survivor;
  //   }
  //   availableResources--;
  // }
  // bloodlines.sort(function(bloodline1, bloodline2){
  //   return assessFitness(bloodline1) - assessFitness(bloodline2);
  // });

  // var optimalRoute = bloodlines[0];
  // return optimalRoute;

// SOLUTION ENDS HERE 
  var alternateRoutes = [];
  for (var i = 0; i < options.offspringPerSurvivor - 1; i++) {
    alternateRoutes.push(mutate(genes));
  }
  var winner = alternateRoutes.reduce(function(route1, route2){
    return (assessFitness(route1) < assessFitness(route2) ? route1 : route2);
  });
  availableResources -= 1;
  return (availableResources > 0 ?  
          geneticSalesman(winner, assessFitness, initiateBloodline, mutate, availableResources) : 
          winner);
}

var createRoute = function(cities){
  var route = cities.slice();
  for(var i = 0; i < route.length; i++){
    var randomIndex = Math.floor(Math.random() * i);
    route[i] = route[randomIndex];
    route[randomIndex] = cities[i];
  }
  return route;
}

var alterRoute = function(route){
  var newRoute = route.slice();
  var firstIndex = Math.floor(Math.random() * route.length);
  var secondIndex = Math.floor(Math.random() * route.length);
  newRoute[firstIndex] = route[secondIndex];
  newRoute[secondIndex] = route[firstIndex];
  return newRoute;
}

var calculateDistance = function(route){
  var distances = route.map(function(city, index, route){
    var nextCity = route[index + 1] || route[0];
    var distance = distanceCalculator(city, nextCity);
    return distance;
  });

  return distances.reduce(function(distance1, distance2){
    return distance1 + distance2;
  });
}


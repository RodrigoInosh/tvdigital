function Zoom(){
	
}

Zoom.prototype.getZoom = function(value) {
	var distancia = value.RADIO_MAXIMO;
	var promedio = 0;
	if(distancia == 0){
		promedio +=value.Zs0+value.Zs20+value.Zs40+value.Zs60+value.Zs80+value.Zs100+value.Zs120+value.Zs140+value.Zs160+
				  value.Zs180+value.Zs200+value.Zs220+value.Zs240+value.Zs260+value.Zs280+value.Zs300+value.Zs320+value.Zs340; 
		distancia = (promedio/18).toFixed(0);						   
	}
	if(distancia >= 0 && distancia <=1) return 15;
	if(distancia > 1 && distancia <2) return 14;
	if(distancia >=2 && distancia <5) return 13;
	if(distancia >=5 && distancia <10) return 12;
	if(distancia >=10 && distancia <15) return 11;
	if(distancia >=15 && distancia <25) return 10;
	if(distancia >=25 && distancia <=60) return 9;
	if(distancia >60 && distancia <120) return 8;
	if(distancia >=120 && distancia <200) return 7;
	return 9;
};

function redondea(num, largo) { 
    var n = Math.pow(10, largo);
    return parseInt(num *n)/n;
}

function ComponeCoordenadaNumero(g, m, s){
	var gn = Math.abs(g);
	var coordenada = gn + m / 60 + s / 3600;
	coordenada = Math.round(coordenada*10000000000000.00)/10000000000000.00;
	return coordenada*-1;
}


function gramise(coordenada) {	
	coordenada = Math.abs(Math.round(coordenada * 1000000.));
	
	var grades = (Math.floor(coordenada / 1000000));
	var minutes = Math.floor(((coordenada / 1000000) - Math.floor(coordenada / 1000000)) * 60);
	var seconds = (Math.floor(((((coordenada / 1000000) - Math.floor(coordenada / 1000000)) * 60) - Math.floor(((coordenada / 1000000) - Math.floor(coordenada / 1000000)) * 60)) * 100000) * 60 / 100000);

	grades = Math.round(grades);
	minutes = Math.round(minutes);
	seconds = Math.round(seconds);
    coordenada_geo = (grades + '° ' + minutes + '\' ' + seconds + '\"');
    
    return coordenada_geo;
}
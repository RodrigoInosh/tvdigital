function interpolar(radialesMap, numeroRadiales) {
	var lobulos = new Array();

	for(var i=0; i< numeroRadiales; i++) {

	}
}

function interpola_8_to_18(radialesMap){
	var lobulos = new Array();
	for(var i=0;i<8;i++){
		lobulos.push(radialesMap["M8PL"+(fortyFive*i)]);
	}
	var resultado = new Array();
	resultado.push(redondea(parseFloat(lobulos[0]) + parseFloat((lobulos[1] - lobulos[0]) * (0 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[0]) + parseFloat((lobulos[1] - lobulos[0]) * (4 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[0]) + parseFloat((lobulos[1] - lobulos[0]) * (8 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[1]) + parseFloat((lobulos[2] - lobulos[1]) * (3 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[1]) + parseFloat((lobulos[2] - lobulos[1]) * (7 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[2]) + parseFloat((lobulos[3] - lobulos[2]) * (2 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[2]) + parseFloat((lobulos[3] - lobulos[2]) * (6 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[3]) + parseFloat((lobulos[4] - lobulos[3]) * (1 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[3]) + parseFloat((lobulos[4] - lobulos[3]) * (5 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[4]) + parseFloat((lobulos[5] - lobulos[4]) * (0 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[4]) + parseFloat((lobulos[5] - lobulos[4]) * (4 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[4]) + parseFloat((lobulos[5] - lobulos[4]) * (8 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[5]) + parseFloat((lobulos[6] - lobulos[5]) * (3 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[5]) + parseFloat((lobulos[6] - lobulos[5]) * (7 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[6]) + parseFloat((lobulos[7] - lobulos[6]) * (2 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[6]) + parseFloat((lobulos[7] - lobulos[6]) * (6 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[7]) + parseFloat((lobulos[0] - lobulos[7]) * (1 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[7]) + parseFloat((lobulos[0] - lobulos[7]) * (5 / 9)),4));
	return resultado;
}

function interpolarA72(radialesMap, radialBase) {
	var lobulos = new Array();
	var degrees = 360 / radialBase;
	
	for(var i=0;i<radialBase;i++){
		lobulos.push(radialesMap["M"+radialBase+"PL"+(radialBase*i)]);
	}

	var resultado = getArray72Radiales(radialBase);

	return resultado;
}

function interpola_8_to_72(radialesMap){
	var lobulos = new Array();
	for(var i=0;i<8;i++){
		lobulos.push(radialesMap["M8PL"+(fortyFive*i)]);
	}

	// var resultado = 

	return resultado;
}

function interpola_18_to_72(radialesMap) {
	var lobulos = new Array();
	
	for(var i=0;i<18;i++){
		lobulos.push(radialesMap["M18PL"+(twenty*i)]);
	}

	var resultado = getArray72Radiales(18)

	return resultado;
}

function getArray72Radiales(radialBase) {
	var resultado = new Array();
	
	if(radialBase == 8) {
		for(var i=0;i<8;i++) {
			for(var yx= 0; yx < 9; yx++) {
				resultado.push(redondea(parseFloat(lobulos[i]) + parseFloat((lobulos[i+1] - lobulos[i]) * (yx / 9)),4));	
			}
		}
	} else if (radialBase == 18){
		for(var i=0;i<18;i++) {
			for(var yx=0; yx < 4; yx++) {
				resultado.push(redondea(parseFloat(lobulos[i]) + parseFloat((lobulos[i+1] - lobulos[i]) * (yx / 4)),4));	
			}
		}
	}

}
	
function interpola_18_to_8(radialesMap){
	var lobulos = new Array();
	for(var i=0;i<18;i++){
		lobulos.push(radialesMap["M18PL"+(twenty*i)]);
	}
	var resultado = new Array();
	resultado.push(redondea(parseFloat(lobulos[0]),4));
	resultado.push(redondea(parseFloat(lobulos[2]) + parseFloat((lobulos[3] - lobulos[2]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[4]) + parseFloat((lobulos[5] - lobulos[4]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[6]) + parseFloat((lobulos[7] - lobulos[6]) * (3 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[9]),4));
	resultado.push(redondea(parseFloat(lobulos[11]) + parseFloat((lobulos[12] - lobulos[11]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[13]) + parseFloat((lobulos[14] - lobulos[13]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[15]) + parseFloat((lobulos[16] - lobulos[15]) * (3 / 4)),4));
	return resultado;
}



function interpolacionInferior(radialesMap, numeroRadiales) {
	var resultado = new Array();
	var degrees = 360 / numeroRadiales;

	for(var i=0; i<numeroRadiales; i++) {
		resultado.push(radialesMap["M72PL"+(i*degrees)]);
	}

	return resultado;
}

function interpola_72_to_8(radialesMap){
	var resultado = new Array();
	resultado.push(radialesMap["M72PL0"]);
	resultado.push(radialesMap["M72PL45"]);
	resultado.push(radialesMap["M72PL90"]);
	resultado.push(radialesMap["M72PL135"]);
	resultado.push(radialesMap["M72PL180"]);
	resultado.push(radialesMap["M72PL225"]);
	resultado.push(radialesMap["M72PL270"]);
	resultado.push(radialesMap["M72PL315"]);
	return resultado;
}

function interpola_72_to_18(radialesMap){
	var resultado = new Array();
	resultado.push(radialesMap["M72PL0"]);
	resultado.push(radialesMap["M72PL20"]);
	resultado.push(radialesMap["M72PL40"]);
	resultado.push(radialesMap["M72PL60"]);
	resultado.push(radialesMap["M72PL80"]);
	resultado.push(radialesMap["M72PL100"]);
	resultado.push(radialesMap["M72PL120"]);
	resultado.push(radialesMap["M72PL140"]);
	resultado.push(radialesMap["M72PL160"]);
	resultado.push(radialesMap["M72PL180"]);
	resultado.push(radialesMap["M72PL200"]);
	resultado.push(radialesMap["M72PL220"]);
	resultado.push(radialesMap["M72PL240"]);
	resultado.push(radialesMap["M72PL260"]);
	resultado.push(radialesMap["M72PL280"]);
	resultado.push(radialesMap["M72PL300"]);
	resultado.push(radialesMap["M72PL320"]);
	resultado.push(radialesMap["M72PL340"]);
	return resultado;
}
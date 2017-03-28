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
function interpola_8_to_72(radialesMap){
	var lobulos = new Array();
	for(var i=0;i<8;i++){
		lobulos.push(radialesMap["M8PL"+(fortyFive*i)]);
	}
	var resultado = new Array();
	//0
	resultado.push(redondea(parseFloat(lobulos[0]) + parseFloat((lobulos[1] - lobulos[0]) * (0 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[0]) + parseFloat((lobulos[1] - lobulos[0]) * (1 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[0]) + parseFloat((lobulos[1] - lobulos[0]) * (2 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[0]) + parseFloat((lobulos[1] - lobulos[0]) * (3 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[0]) + parseFloat((lobulos[1] - lobulos[0]) * (4 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[0]) + parseFloat((lobulos[1] - lobulos[0]) * (5 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[0]) + parseFloat((lobulos[1] - lobulos[0]) * (6 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[0]) + parseFloat((lobulos[1] - lobulos[0]) * (7 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[0]) + parseFloat((lobulos[1] - lobulos[0]) * (8 / 9)),4));
	//45
	resultado.push(redondea(parseFloat(lobulos[1]) + parseFloat((lobulos[2] - lobulos[1]) * (0 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[1]) + parseFloat((lobulos[2] - lobulos[1]) * (1 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[1]) + parseFloat((lobulos[2] - lobulos[1]) * (2 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[1]) + parseFloat((lobulos[2] - lobulos[1]) * (3 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[1]) + parseFloat((lobulos[2] - lobulos[1]) * (4 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[1]) + parseFloat((lobulos[2] - lobulos[1]) * (5 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[1]) + parseFloat((lobulos[2] - lobulos[1]) * (6 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[1]) + parseFloat((lobulos[2] - lobulos[1]) * (7 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[1]) + parseFloat((lobulos[2] - lobulos[1]) * (8 / 9)),4));
	//90
	resultado.push(redondea(parseFloat(lobulos[2]) + parseFloat((lobulos[3] - lobulos[2]) * (0 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[2]) + parseFloat((lobulos[3] - lobulos[2]) * (1 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[2]) + parseFloat((lobulos[3] - lobulos[2]) * (2 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[2]) + parseFloat((lobulos[3] - lobulos[2]) * (3 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[2]) + parseFloat((lobulos[3] - lobulos[2]) * (4 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[2]) + parseFloat((lobulos[3] - lobulos[2]) * (5 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[2]) + parseFloat((lobulos[3] - lobulos[2]) * (6 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[2]) + parseFloat((lobulos[3] - lobulos[2]) * (7 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[2]) + parseFloat((lobulos[3] - lobulos[2]) * (8 / 9)),4));	
	//135
	resultado.push(redondea(parseFloat(lobulos[3]) + parseFloat((lobulos[4] - lobulos[3]) * (0 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[3]) + parseFloat((lobulos[4] - lobulos[3]) * (1 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[3]) + parseFloat((lobulos[4] - lobulos[3]) * (2 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[3]) + parseFloat((lobulos[4] - lobulos[3]) * (3 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[3]) + parseFloat((lobulos[4] - lobulos[3]) * (4 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[3]) + parseFloat((lobulos[4] - lobulos[3]) * (5 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[3]) + parseFloat((lobulos[4] - lobulos[3]) * (6 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[3]) + parseFloat((lobulos[4] - lobulos[3]) * (7 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[3]) + parseFloat((lobulos[4] - lobulos[3]) * (8 / 9)),4));
	//180
	resultado.push(redondea(parseFloat(lobulos[4]) + parseFloat((lobulos[5] - lobulos[4]) * (0 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[4]) + parseFloat((lobulos[5] - lobulos[4]) * (1 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[4]) + parseFloat((lobulos[5] - lobulos[4]) * (2 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[4]) + parseFloat((lobulos[5] - lobulos[4]) * (3 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[4]) + parseFloat((lobulos[5] - lobulos[4]) * (4 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[4]) + parseFloat((lobulos[5] - lobulos[4]) * (5 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[4]) + parseFloat((lobulos[5] - lobulos[4]) * (6 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[4]) + parseFloat((lobulos[5] - lobulos[4]) * (7 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[4]) + parseFloat((lobulos[5] - lobulos[4]) * (8 / 9)),4));
	//225
	resultado.push(redondea(parseFloat(lobulos[5]) + parseFloat((lobulos[6] - lobulos[5]) * (0 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[5]) + parseFloat((lobulos[6] - lobulos[5]) * (1 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[5]) + parseFloat((lobulos[6] - lobulos[5]) * (2 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[5]) + parseFloat((lobulos[6] - lobulos[5]) * (3 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[5]) + parseFloat((lobulos[6] - lobulos[5]) * (4 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[5]) + parseFloat((lobulos[6] - lobulos[5]) * (5 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[5]) + parseFloat((lobulos[6] - lobulos[5]) * (6 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[5]) + parseFloat((lobulos[6] - lobulos[5]) * (7 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[5]) + parseFloat((lobulos[6] - lobulos[5]) * (8 / 9)),4));
	//270
	resultado.push(redondea(parseFloat(lobulos[6]) + parseFloat((lobulos[7] - lobulos[6]) * (0 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[6]) + parseFloat((lobulos[7] - lobulos[6]) * (1 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[6]) + parseFloat((lobulos[7] - lobulos[6]) * (2 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[6]) + parseFloat((lobulos[7] - lobulos[6]) * (3 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[6]) + parseFloat((lobulos[7] - lobulos[6]) * (4 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[6]) + parseFloat((lobulos[7] - lobulos[6]) * (5 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[6]) + parseFloat((lobulos[7] - lobulos[6]) * (6 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[6]) + parseFloat((lobulos[7] - lobulos[6]) * (7 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[6]) + parseFloat((lobulos[7] - lobulos[6]) * (8 / 9)),4));
	//315
	resultado.push(redondea(parseFloat(lobulos[7]) + parseFloat((lobulos[0] - lobulos[7]) * (0 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[7]) + parseFloat((lobulos[0] - lobulos[7]) * (1 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[7]) + parseFloat((lobulos[0] - lobulos[7]) * (2 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[7]) + parseFloat((lobulos[0] - lobulos[7]) * (3 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[7]) + parseFloat((lobulos[0] - lobulos[7]) * (4 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[7]) + parseFloat((lobulos[0] - lobulos[7]) * (5 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[7]) + parseFloat((lobulos[0] - lobulos[7]) * (6 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[7]) + parseFloat((lobulos[0] - lobulos[7]) * (7 / 9)),4));
	resultado.push(redondea(parseFloat(lobulos[7]) + parseFloat((lobulos[0] - lobulos[7]) * (8 / 9)),4));
	return resultado;
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

function interpola_18_to_72(radialesMap){
	var lobulos = new Array();
	for(var i=0;i<18;i++){
		lobulos.push(radialesMap["M18PL"+(twenty*i)]);
	}
	var resultado = new Array();
	//0
	resultado.push(redondea(parseFloat(lobulos[0]) + parseFloat((lobulos[1] - lobulos[0]) * (0 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[0]) + parseFloat((lobulos[1] - lobulos[0]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[0]) + parseFloat((lobulos[1] - lobulos[0]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[0]) + parseFloat((lobulos[1] - lobulos[0]) * (3 / 4)),4));
	//20
	resultado.push(redondea(parseFloat(lobulos[1]) + parseFloat((lobulos[2] - lobulos[1]) * (0 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[1]) + parseFloat((lobulos[2] - lobulos[1]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[1]) + parseFloat((lobulos[2] - lobulos[1]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[1]) + parseFloat((lobulos[2] - lobulos[1]) * (3 / 4)),4));
	//40
	resultado.push(redondea(parseFloat(lobulos[2]) + parseFloat((lobulos[3] - lobulos[2]) * (0 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[2]) + parseFloat((lobulos[3] - lobulos[2]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[2]) + parseFloat((lobulos[3] - lobulos[2]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[2]) + parseFloat((lobulos[3] - lobulos[2]) * (3 / 4)),4));
	//60
	resultado.push(redondea(parseFloat(lobulos[3]) + parseFloat((lobulos[4] - lobulos[3]) * (0 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[3]) + parseFloat((lobulos[4] - lobulos[3]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[3]) + parseFloat((lobulos[4] - lobulos[3]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[3]) + parseFloat((lobulos[4] - lobulos[3]) * (3 / 4)),4));
	//80
	resultado.push(redondea(parseFloat(lobulos[4]) + parseFloat((lobulos[5] - lobulos[4]) * (0 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[4]) + parseFloat((lobulos[5] - lobulos[4]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[4]) + parseFloat((lobulos[5] - lobulos[4]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[4]) + parseFloat((lobulos[5] - lobulos[4]) * (3 / 4)),4));
	//100
	resultado.push(redondea(parseFloat(lobulos[5]) + parseFloat((lobulos[6] - lobulos[5]) * (0 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[5]) + parseFloat((lobulos[6] - lobulos[5]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[5]) + parseFloat((lobulos[6] - lobulos[5]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[5]) + parseFloat((lobulos[6] - lobulos[5]) * (3 / 4)),4));
	//120
	resultado.push(redondea(parseFloat(lobulos[6]) + parseFloat((lobulos[7] - lobulos[6]) * (0 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[6]) + parseFloat((lobulos[7] - lobulos[6]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[6]) + parseFloat((lobulos[7] - lobulos[6]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[6]) + parseFloat((lobulos[7] - lobulos[6]) * (3 / 4)),4));
	//140
	resultado.push(redondea(parseFloat(lobulos[7]) + parseFloat((lobulos[8] - lobulos[7]) * (0 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[7]) + parseFloat((lobulos[8] - lobulos[7]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[7]) + parseFloat((lobulos[8] - lobulos[7]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[7]) + parseFloat((lobulos[8] - lobulos[7]) * (3 / 4)),4));
	//160
	resultado.push(redondea(parseFloat(lobulos[8]) + parseFloat((lobulos[9] - lobulos[8]) * (0 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[8]) + parseFloat((lobulos[9] - lobulos[8]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[8]) + parseFloat((lobulos[9] - lobulos[8]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[8]) + parseFloat((lobulos[9] - lobulos[8]) * (3 / 4)),4));
	//180
	resultado.push(redondea(parseFloat(lobulos[9]) + parseFloat((lobulos[10] - lobulos[9]) * (0 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[9]) + parseFloat((lobulos[10] - lobulos[9]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[9]) + parseFloat((lobulos[10] - lobulos[9]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[9]) + parseFloat((lobulos[10] - lobulos[9]) * (3 / 4)),4));
	//200
	resultado.push(redondea(parseFloat(lobulos[10]) + parseFloat((lobulos[11] - lobulos[10]) * (0 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[10]) + parseFloat((lobulos[11] - lobulos[10]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[10]) + parseFloat((lobulos[11] - lobulos[10]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[10]) + parseFloat((lobulos[11] - lobulos[10]) * (3 / 4)),4));
	//220
	resultado.push(redondea(parseFloat(lobulos[11]) + parseFloat((lobulos[12] - lobulos[11]) * (0 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[11]) + parseFloat((lobulos[12] - lobulos[11]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[11]) + parseFloat((lobulos[12] - lobulos[11]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[11]) + parseFloat((lobulos[12] - lobulos[11]) * (3 / 4)),4));
	//240
	resultado.push(redondea(parseFloat(lobulos[12]) + parseFloat((lobulos[13] - lobulos[12]) * (0 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[12]) + parseFloat((lobulos[13] - lobulos[12]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[12]) + parseFloat((lobulos[13] - lobulos[12]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[12]) + parseFloat((lobulos[13] - lobulos[12]) * (3 / 4)),4));
	//260
	resultado.push(redondea(parseFloat(lobulos[13]) + parseFloat((lobulos[14] - lobulos[13]) * (0 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[13]) + parseFloat((lobulos[14] - lobulos[13]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[13]) + parseFloat((lobulos[14] - lobulos[13]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[13]) + parseFloat((lobulos[14] - lobulos[13]) * (3 / 4)),4));
	//280
	resultado.push(redondea(parseFloat(lobulos[14]) + parseFloat((lobulos[15] - lobulos[14]) * (0 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[14]) + parseFloat((lobulos[15] - lobulos[14]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[14]) + parseFloat((lobulos[15] - lobulos[14]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[14]) + parseFloat((lobulos[15] - lobulos[14]) * (3 / 4)),4));
	//300
	resultado.push(redondea(parseFloat(lobulos[15]) + parseFloat((lobulos[15] - lobulos[15]) * (0 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[15]) + parseFloat((lobulos[16] - lobulos[15]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[15]) + parseFloat((lobulos[16] - lobulos[15]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[15]) + parseFloat((lobulos[16] - lobulos[15]) * (3 / 4)),4));
	//320
	resultado.push(redondea(parseFloat(lobulos[16]) + parseFloat((lobulos[17] - lobulos[16]) * (0 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[16]) + parseFloat((lobulos[17] - lobulos[16]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[16]) + parseFloat((lobulos[17] - lobulos[16]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[16]) + parseFloat((lobulos[17] - lobulos[16]) * (3 / 4)),4));
	//340
	resultado.push(redondea(parseFloat(lobulos[17]) + parseFloat((lobulos[0] - lobulos[17]) * (0 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[17]) + parseFloat((lobulos[0] - lobulos[17]) * (1 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[17]) + parseFloat((lobulos[0] - lobulos[17]) * (2 / 4)),4));
	resultado.push(redondea(parseFloat(lobulos[17]) + parseFloat((lobulos[0] - lobulos[17]) * (3 / 4)),4));
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
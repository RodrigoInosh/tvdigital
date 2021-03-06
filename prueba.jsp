<%@page language="java" contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Subsecretaria de Telecomunicaciones</title>
<link rel="icon" href="../favicon.ico" type="image/x-icon"/>
<link rel="shortcut icon" href="../favicon.ico" type="image/x-icon"/>
<link href="css/main.css" rel="stylesheet" type="text/css">
<link href="css/jquery.dataTables.min.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="https://js.arcgis.com/4.1/esri/css/main.css">
<link href="font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="css/form_pdf.css" rel="stylesheet" type="text/css">

<script src="js/jquery-3.2.0.min.js"></script>
<script src="js/jquery-ui.js"></script>
<script src="js/jquery.dataTables.min.js"></script>
<script src="js/template_kml.js"></script>
<script src="js/pdfmake.min.js"></script>
<script src="js/vfs_fonts.js"></script>
<script src="js/underscore.string.min.js"></script>
<script src="js/underscore-min.js"></script>
<script src="https://js.arcgis.com/4.2/"></script>
<script src="js/main.js?v=<%= System.currentTimeMillis() %>"></script>
<script src="js/geopoint.js"></script>
<script src="js/zoom.js"></script>
<script src="js/pdf_form.js?v=<%= System.currentTimeMillis() %>"></script>
<script src="js/controller.js?v=<%= System.currentTimeMillis() %>"></script>
<script src="js/pdf_export.js?v=<%= System.currentTimeMillis() %>"></script>
<script src="js/interpolacion.js"></script>
<script src="js/concurso_pdf_export.js?v=<%= System.currentTimeMillis() %>"></script>
<script src="js/modificacion_pdf_export.js?v=<%= System.currentTimeMillis() %>"></script>
</head>
<body>
	<div id="loader">
		<div id="curtainloader"></div>
		<div id="loadbox">
			<div id="loadboxcontent">
				<img id="loadboximage" src="images/gif-load.gif" width="40" height="40">
				<div id="loadboxright">
					Calculando Zona de Propagaci&oacute;n. Espere un momento…
				</div>
			</div>
		</div>
	</div>
	<div id="topGobRed">
		<div id="topGobBlue"></div>
	</div>
	<div id="viewDiv">
		<div id="botonHerramientas"><img src="images/terra-globe-icon-png-24.png" width="40" height="40" /></div>
		<div id="caltool">
			<div id="titulocaltool" style="height: 3px;">
				<div style="float: left"><font size=2><u>C&aacute;lculo Predictivo Zona de Servicio TVD</u></font></div>
				<img id="closeImage1" src="images/close-150192_640.png" width="20" height="20" style="position: relative; float: left; cursor: pointer; top: -5px; left: 150px;">
			</div>
			<br>
			<div id="separador" ></div>
			<div id="selectorconmod">
				<ul>
					<li><input type="radio" id="concursoC" name="concursoModificacion" value="concurso">Concurso</input></li>
					<li><input type="radio" id="modificacionM" name="concursoModificacion" value="modificacion">Modificaci&oacute;n</li>
					<li style="padding-top: 5px; font-weight: 100; width: 117px; text-align: right;">Recomendaci&oacute;n: </li>
					<li style="padding-top: 2px; width: 50px;">
						<select name="recomendacion" id="recomendacion" style="width: 65px;">
							<!--option value="370">370</option-->
							<option value="1546" selected="true">1546</option>
							<!--option value="1546+">1546+</option-->
						</select>
					</li>
				</ul>
			</div>
			<div id="tabdatos">
				<ul>
					<li id="pestanaTab1"><a href="#tab1">Bases de Concurso</a></li>
					<li id="pestanaTab2"><a href="#tab2">C&aacute;lculo Zona Digital</a></li>
					<li id="pestanaTab3"><a href="#tab3">Resultado</a></li>
				</ul>
				<div id="separador"></div>
				<div id="tab1">
					<ul>
					<!-- <li><button type="button" style="font-size: 11px;" id="pdfForm">Agregar Info a PDF</button></li> -->
						<li id="concursoLabel"><label style="padding-right: 12px;">Concurso:</label></li>
						<li id="concursoSelect" style="padding-right: 1px;">
							<select name="concursos" id="concursos" style="width: 170px"></select>
						</li>
						<li id="regionesLabel" style="display: none; padding-right: 12px;"><label>Regi&oacute;n: </label></li>
						<li id="regionesSelect" style="display: none; padding-right: 1px;">
							<select name="regiones" id="regiones" style="width: 170px; margin-left: 14px; ">
								<option value="0">Seleccione</option>
								<option value="1">I Regi&oacute;n</option>
								<option value="2">II Regi&oacute;n</option>
								<option value="3">III Regi&oacute;n</option>
								<option value="4">IV Regi&oacute;n</option>
								<option value="5">V Regi&oacute;n</option>
								<option value="6">VI Regi&oacute;n</option>
								<option value="7">VII Regi&oacute;n</option>
								<option value="8">VIII Regi&oacute;n</option>
								<option value="9">IX Regi&oacute;n</option>
								<option value="10">X Regi&oacute;n</option>
								<option value="11">XI Regi&oacute;n</option>
								<option value="12">XII Regi&oacute;n</option>
								<option value="13">XIII Regi&oacute;n Metropolitana</option>
								<option value="14">XIV Regi&oacute;n</option>
								<option value="15">XV Regi&oacute;n</option>
							</select>
						</li>
						<li><label>Tipo servicio:</label></li>
						<li>
							<select name="tipoServicio" id="tipoServicio" style="width: 65px">
								<option value="">...</option>
								<option value="ISDBT">ISDBT</option>
							</select>
						</li>
						<li><label>Identificador:</label></li>
						<li>
							<select name="identificadores" id="identificadores" style="width: 305px"></select>
						</li>
						<li><label style="padding-right: 13px;">Localidad:</label></li>
						<li><input id="localidadC" type="text" value="" style="width: 298px" disabled="disabled" /></li>
						<div id="separador"></div>
						<li><label style="padding-right: 4px;">Frecuencia:</label></li>
						<li><input id="frecuenciaC" type="text" value="" style="width: 40px;" disabled="disabled" /><b>[Mhz]</b></li>
						<li><label>Intensidad de campo:</label></li>
						<li><input id="intensidadCampoC" type="text" value="" style="width: 40px" disabled="disabled" /><b>[dB(uV/m)]</b></li>
						<li><label style="padding-right: 16px;">Pot. Max:</label></li>
						<li><input id="potenciaMaximaC" type="text" value="" style="width: 40px" disabled="disabled" /><b>[W]</b></li>
					</ul>
					<div id="separador" style="height: 2px;"></div>
					<div id="subbox1">
						<div id="subbox1left">
							<ul>
								<li><label><b><u>Zona de Servicio M&aacute;xima</u></b></label></li>
								<li><label><b><u>Coordenadas</u></b></label></li>
								<div id="separador" style="width: 1px;"></div>
								<li><label style="padding-right: 17px;">Latitud:</label></li>
								<li><input type="text" value="" id="latitudC" style="width: 80px;" disabled="disabled" /></li>
								<div id="separador" style="width: 1px;"></div>
								<li><label style="padding-right: 8px;">Longitud:</label></li>
								<li><input type="text" value="" id="longitudC" style="width: 80px" disabled="disabled" /></li>
								<li style="width: 207px;"><button type="button" style="width: 86px; font-size: 11px;" id="verRadiales" disabled="disabled">Ver Radiales</button></li>
							</ul>
						</div>
						<div id="subbox1right">
							<ul>
								<li><label><b><u>Norma T&eacute;cnica</u></b></label></li>
								<div id="separador"></div>
								<li><input type="radio" id ="normaActualM"  name="normaTecnica" value="normaTecnica1546" checked="true">Norma T&eacute;cnica Actual</input></li>
								<div id="separador"></div>
								<li style="display:none"><input type="radio" id ="normaAnteriorM"  name="normaTecnica" value="normaTecnica370" disabled="disabled" >Norma T&eacute;cnica Anterior</input></li>
								<li id="labelRadioCircuferencia"><label>Radio Circunferencia M&aacute;xima:</label>
									<input type="text" value="" id="radioCircunferenciaMaxina" style="width: 40px;" checked="true" disabled="disabled" />
									<b>[km]</b>
								</li>
								<li id="labelInfoRadiales" style="display: none; text-align: center; width: 220px; margin-top; -3px; ">
									<label>(Zona m&aacute;xima corresponde a la zona original m&aacute;s 30% por radial)</label>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div id="tab2">
					<div id="subbox2left">
						<ul>
							<li><label style="padding-right: 0px;">Intensidad de campo:</label></li>
							<li><input type="text" value="" id="intensidadCampoM" style="width: 40px;"/><b>[dB(uV/m)]</b></li>
							<div id="separador"></div>
							<li><label style="padding-right: 16px;">Altura Antena Tx:</label></li>
							<li><input type="text" value="" id="alturaAntenaTransmisoraM" style="width: 40px;"/><b>[m]</b></li>
							<li><label style="padding-right: 39px;">P&eacute;rdidas CC:</label></li>
							<li><input type="text" value="" id="perdidasCablesConectoresM" style="width: 40px;"/><b>[dB]</b></li>
							<div id="separador"></div>
							<li><label style="padding-right: 6px;">Divisor de potencia:</label></li>
							<li><input type="text" value="" id="divisorPotenciaM" style="width: 40px;"/><b>[dB]</b></li>
						</ul>
					</div>
					<div id="subbox2right">
						<ul>
							<li><label style="padding-right: 31px;">Potencia:</label></li>
							<li><input type="text" value="" id="potenciaM" style="width: 40px;" /><b>[W]</b></li>
							<div id="separador"></div>
							<li><label style="padding-right: 26px;">Ganancia:</label></li>
							<li><input type="text" value="" id="gananciaM" style="width: 40px;"/><b>[dBd]</b></li>
							<div id="separador"></div>
							<li><label style="padding-right: 18px;">Frecuencia:</label></li>
							<li><input type="text" value="" id="frecuenciaM" style="width: 40px;"/><b>[Mhz]</b></li>
							<li><label>Otras P&eacute;rdidas:</label></li>
							<li><input type="text" value="" id="otrasPerdidasM" style="width: 40px;"/><b>[dB]</b></li>
						</ul>
					</div>
					<div id="separador"></div>
					<div id="subbox2middle">
						<ul>
							<li><label>Coordenadas de Ubicaci&oacute;n Digital para Planta TxWGS84:</label></li>
							<div id="separador"></div>
							<li><label>Latitud:</label></li>
							<li><input type="text" value="" id="latitudGradosM" style="width: 30px;"/>°</li>
							<li><input type="text" value="" id="latitudMinutosM" style="width: 30px;"/>'</li>
							<li><input type="text" value="" id="latitudSegudosM" style="width: 30px;"/>''</li>
							<li><label>Longitud:</label></li>
							<li><input type="text" value="" id="longitudGradosM" style="width: 30px;"/>°</li>
							<li><input type="text" value="" id="longitudMinutosM" style="width: 30px;"/>'</li>
							<li><input type="text" value="" id="longitudSegundosM" style="width: 30px;"/>''</li>
							<li><button type="button" id="cambioUbicacionM" style="width: 20px; height: 20px; padding-top: 0px; padding-left:4px;" title="Cambiar coordenadas PTx"><i class="fa fa-map-marker fa-lg" aria-hidden="true"></i>
</button></li>
						</ul>
					</div>
					<div id="subbox2bottom1">
						<ul>
							<li><label><b><u>P&eacute;rdidas por L&oacute;bulo</u></b></label></li>
							<div id="separador"></div>
							<li>
								<input type="radio" name="radialesRadio" id="8PerdidasLobulos" value="8" checked="true" disabled>
								<button type="button" id="show8PerdidasLobulos" disabled>8 radiales &nbsp;</button>
							</li>
							<li>
								<input type="radio" name="radialesRadio" id="18PerdidasLobulos" value="18">
								<button type="button" id="show18PerdidasLobulos">18 radiales</button>
							</li>
							<li>
								<input type="radio" name="radialesRadio" id="72PerdidasLobulos" value="72">
								<button type="button" id="show72PerdidasLobulos">72 radiales</button>
							</li>

						</ul>
					</div>
					<div id="separador" style="height: 3px;"></div>
					<div id="subbox2bottom2">
						<ul>
							<li style="width: 170px; text-align: left;" id="opcionesAvanzadasButton"><a href="#">Par&aacute;metros Avanzados</a></li>
							<li style="padding-right:70px;"></li>
							<li><button type="button" id="calculaPoligono" disabled="disabled">Calcular Zona [72 radiales]</button></li>
						</ul>
					</div>
				</div>
				<div id="tab3">
					<div id="subbox3top">
						<div id="subbox3topleft">
							<ul>
								<li><label><b><u>Zona Digital Calculada</u></b></label></li>
								<div id="separador" style="height: 1px;"></div>
								<li><label>Localidad: &nbsp;</label></li>
								<li style="font-weight: bold"><label id="localidadI"></label></li>
								<div id="separador"></div>
								<li><label>Potencia: &nbsp;</label></li>
								<li style="font-weight: bold"><label id="potenciaI"></label><label> Watts</label></li>
								<div id="separador"></div>
							</ul>
						</div>
						<div id="subbox3topright">
							<ul>
								<li style="font-weight: bold"><label id="identificadorI"></label></li>
								<div id="separador"></div>
								<li><label>Frecuencia: &nbsp;</label></li>
								<li style="text-align:left; font-weight: bold"><label id="frecuenciaI"></label><label> Mhz</label></li>
											
							</ul>
						</div>
					</div>
					<div id="separador"></div>
					<div id="subbox3bottom1">
						<ul>
							<li><label><u>Coordenadas de Ubicaci&oacute;n Digital para Planta TxWGS84</u></label></li>
							<div id="separador"></div>
							<li><label>Latitud:</label></li>
							<li><input id="latitudI" type="text" value="" style="width: 100px;" disabled="disabled"/></li>
							<li><label>Longitud:</label></li>
							<li><input id="longitudI" type="text" value="" style="width: 100px;" disabled="disabled"/></li>
						</ul>
					</div>
					<div id="separador"></div>
					<div id="datospostulante">
						<ul>
							<li><label><b><u>Datos Postulante o Concesionario</u></b></label></li>
							<div id="separador"></div>
							<li><label>Raz&oacute;n social:</label></li>
							<li><input type="text" id="iNombreRazon" value="" style="width: 320px" /></li>
							<div id="separador"></div>
							<li style="width: 65px;"><label>R.U.T:</label></li>
							<li><input type="text" id="iRutRazon" value="" style="width: 130px" /></li>
							<li style="width: 30px;"><label>Fono:</label></li>
							<li><input type="text" id="ifono" value="" style="width: 144px" /></li>
							<div id="separador"></div>
							<li style="width: 65px;"><label>Domicilio:</label></li>
							<li><input type="text" id="idomicilio" value="" style="width: 130px" /></li>
							<li><label>E-mail:</label></li>
							<li><input type="text" id="iemail" value="" style="width: 144px" /></li>
						</ul>
					</div>
					<div id="separador" style="height: 9px"></div>
					<div id="subbox3bottom">
						<ul>
							<li><button type="button" style="font-size: 11px;" id="verDistancia">Ver Resultado</button></li>
							<li><button type="button" id="exportarKMZ">Exportar a GoogleEarth</button></li>
							<li><button type="button" id="imprimirCalculo">Generar PDF</button></li>
							<li><a href="#" style="font-size: 11px; top: 2px;" id="pdfForm">Agregar Datos</a></li>
						</ul>
					</div>
				</div>
			</div>
			<div id="curtainCaltool"></div>
			<div id="frame8PerdidasLobulos">
				<img id="closeImage8" src="images/close-150192_640.png" width="20" height="20" style="float: right; cursor: pointer;">
				<ul>
					<li><label><b><u>8 Radiales</u></b></label></li>
					<div id="separador"></div>
					<li>&nbsp; &nbsp;  0°</li>
					<li><input type="text" value="0" id="I8PL0" style="width: 40px" /></li>
					<li>180°</li>
					<li><input type="text" value="0" id="I8PL180" style="width: 40px" /></li>
					<div id="separador"></div>
					<li>&nbsp; 45°</li>
					<li><input type="text" value="0" id="I8PL45" style="width: 40px" /></li>
					<li>225°</li>
					<li><input type="text" value="0" id="I8PL225" style="width: 40px" /></li>
					<div id="separador"></div>
					<li>&nbsp; 90°</li>
					<li><input type="text" value="0" id="I8PL90" style="width: 40px" /></li>
					<li>270°</li>
					<li><input type="text" value="0" id="I8PL270" style="width: 40px" /></li>
					<div id="separador"></div>
					<li>135°</li>
					<li><input type="text" value="0" id="I8PL135" style="width: 40px" /></li>
					<li>315°</li>
					<li><input type="text" value="0" id="I8PL315" style="width: 40px" /></li>
					<div id="separador"></div>
					<li style="width: 163px; text-align: right; padding-top: 10px;">
					<a href="#" id="omni8" align="left" style="padding-right: 100px" title="Todos a Cero">Omni</a>
					<button type="button" style="width: 70px; " id="save8PerdidasLobulosButton">Aceptar</button>
					</li>
				</ul>
			</div>
			<div id="frame18PerdidasLobulos">
				<img id="closeImage18" src="images/close-150192_640.png" width="20" height="20" style="float: right; cursor: pointer;">
				<ul>
					<li><label><b><u>18 Radiales [dB]</u></b></label></li>
					<div id="separador"></div>
					<li>&nbsp; &nbsp; 0°</li>
					<li><input type="text" value="0" id="I18PL0" style="width: 40px" /></li>
					<li>120°</li>
					<li><input type="text" value="0" id="I18PL120" style="width: 40px" /></li>
					<li>240°</li>
					<li><input type="text" value="0" id="I18PL240" style="width: 40px" /></li>
					<div id="separador"></div>
					<li>&nbsp; 20°</li>
					<li><input type="text" value="0" id="I18PL20" style="width: 40px" /></li>
					<li>140°</li>
					<li><input type="text" value="0" id="I18PL140" style="width: 40px" /></li>
					<li>260°</li>
					<li><input type="text" value="0" id="I18PL260" style="width: 40px" /></li>
					<div id="separador"></div>
					<li>&nbsp; 40°</li>
					<li><input type="text" value="0" id="I18PL40" style="width: 40px" /></li>
					<li>160°</li>
					<li><input type="text" value="0" id="I18PL160" style="width: 40px" /></li>
					<li>280°</li>
					<li><input type="text" value="0" id="I18PL280" style="width: 40px" /></li>
					<div id="separador"></div>
					<li>&nbsp; 60°</li>
					<li><input type="text" value="0" id="I18PL60" style="width: 40px" /></li>
					<li>180°</li>
					<li><input type="text" value="0" id="I18PL180" style="width: 40px" /></li>
					<li>300°</li>
					<li><input type="text" value="0" id="I18PL300" style="width: 40px" /></li>
					<div id="separador"></div>
					<li>&nbsp; 80°</li>
					<li><input type="text" value="0" id="I18PL80" style="width: 40px" /></li>
					<li>200°</li>
					<li><input type="text" value="0" id="I18PL200" style="width: 40px" /></li>
					<li>320°</li>
					<li><input type="text" value="0" id="I18PL320" style="width: 40px" /></li>
					<div id="separador"></div>
					<li>100°</li>
					<li><input type="text" value="0" id="I18PL100" style="width: 40px" /></li>
					<li>220°</li>
					<li><input type="text" value="0" id="I18PL220" style="width: 40px" /></li>
					<li>340°</li>
					<li><input type="text" value="0" id="I18PL340" style="width: 40px" /></li>
					<div id="separador"></div>
					<li style="width: 250px; text-align: right; padding-top: 10px;">
					<a href="#" id="omni18" align="left" style="padding-right: 140px" title="Todos a Cero">Omni</a>
					<button type="button" style="width: 70px;" id="save18PerdidasLobulosButton">Aceptar</button>
					</li>
				</ul>
			</div>
			<div id="frame72PerdidasLobulos">
				<img id="closeImage72" src="images/close-150192_640.png" width="20" height="20" style="float: right; cursor: pointer;">
				<ul>
					<li><label><b><u>72 Radiales [dB]</u></b></label></li>
					<div id="separador"></div>
					<li>&nbsp; &nbsp; 0°</li>
					<li><input type="text" value="0" id="I72PL0" style="width: 40px"/></li>
					<li>&nbsp; 60°</li>
					<li><input type="text" value="0" id="I72PL60" style="width: 40px"/></li>
					<li>120°</li>
					<li><input type="text" value="0" id="I72PL120" style="width: 40px"/></li>
					<li>180°</li>
					<li><input type="text" value="0" id="I72PL180" style="width: 40px"/></li>
					<li>240°</li>
					<li><input type="text" value="0" id="I72PL240" style="width: 40px"/></li>
					<li>300°</li>
					<li><input type="text" value="0" id="I72PL300" style="width: 40px"/></li>
					<div id="separador"></div>
					<li>&nbsp; &nbsp; 5°</li>
					<li><input type="text" value="0" id="I72PL5" style="width: 40px"/></li>
					<li>&nbsp; 65°</li>
					<li><input type="text" value="0" id="I72PL65" style="width: 40px"/></li>
					<li>125°</li>
					<li><input type="text" value="0" id="I72PL125" style="width: 40px"/></li>
					<li>185°</li>
					<li><input type="text" value="0" id="I72PL185" style="width: 40px"/></li>
					<li>245°</li>
					<li><input type="text" value="0" id="I72PL245" style="width: 40px"/></li>
					<li>305°</li>
					<li><input type="text" value="0" id="I72PL305" style="width: 40px"/></li>
					<div id="separador"></div>
					<li>&nbsp; 10°</li>
					<li><input type="text" value="0" id="I72PL10" style="width: 40px"/></li>
					<li>&nbsp; 70°</li>
					<li><input type="text" value="0" id="I72PL70" style="width: 40px"/></li>
					<li>130°</li>
					<li><input type="text" value="0" id="I72PL130" style="width: 40px"/></li>
					<li>190°</li>
					<li><input type="text" value="0" id="I72PL190" style="width: 40px"/></li>
					<li>250°</li>
					<li><input type="text" value="0" id="I72PL250" style="width: 40px"/></li>
					<li>310°</li>
					<li><input type="text" value="0" id="I72PL310" style="width: 40px"/></li>
					<div id="separador"></div>
					<li>&nbsp; 15°</li>
					<li><input type="text" value="0" id="I72PL15" style="width: 40px"/></li>
					<li>&nbsp; 75°</li>
					<li><input type="text" value="0" id="I72PL75" style="width: 40px"/></li>
					<li>135°</li>
					<li><input type="text" value="0" id="I72PL135" style="width: 40px"/></li>
					<li>195°</li>
					<li><input type="text" value="0" id="I72PL195" style="width: 40px"/></li>
					<li>255°</li>
					<li><input type="text" value="0" id="I72PL255" style="width: 40px"/></li>
					<li>315°</li>
					<li><input type="text" value="0" id="I72PL315" style="width: 40px"/></li>
					<div id="separador"></div>
					<li>&nbsp; 20°</li>
					<li><input type="text" value="0" id="I72PL20" style="width: 40px"/></li>
					<li>&nbsp; 80°</li>
					<li><input type="text" value="0" id="I72PL80" style="width: 40px"/></li>
					<li>140°</li>
					<li><input type="text" value="0" id="I72PL140" style="width: 40px"/></li>
					<li>200°</li>
					<li><input type="text" value="0" id="I72PL200" style="width: 40px"/></li>
					<li>260°</li>
					<li><input type="text" value="0" id="I72PL260" style="width: 40px"/></li>
					<li>320°</li>
					<li><input type="text" value="0" id="I72PL320" style="width: 40px"/></li>
					<div id="separador"></div>
					<li>&nbsp; 25°</li>
					<li><input type="text" value="0" id="I72PL25" style="width: 40px"/></li>
					<li>&nbsp; 85°</li>
					<li><input type="text" value="0" id="I72PL85" style="width: 40px"/></li>
					<li>145°</li>
					<li><input type="text" value="0" id="I72PL145" style="width: 40px"/></li>
					<li>205°</li>
					<li><input type="text" value="0" id="I72PL205" style="width: 40px"/></li>
					<li>265°</li>
					<li><input type="text" value="0" id="I72PL265" style="width: 40px"/></li>
					<li>325°</li>
					<li><input type="text" value="0" id="I72PL325" style="width: 40px"/></li>
					<div id="separador"></div>
					<li>&nbsp; 30°</li>
					<li><input type="text" value="0" id="I72PL30" style="width: 40px"/></li>
					<li>&nbsp; 90°</li>
					<li><input type="text" value="0" id="I72PL90" style="width: 40px"/></li>
					<li>150°</li>
					<li><input type="text" value="0" id="I72PL150" style="width: 40px"/></li>
					<li>210°</li>
					<li><input type="text" value="0" id="I72PL210" style="width: 40px"/></li>
					<li>270°</li>
					<li><input type="text" value="0" id="I72PL270" style="width: 40px"/></li>
					<li>330°</li>
					<li><input type="text" value="0" id="I72PL330" style="width: 40px"/></li>
					<div id="separador"></div>
					<li>&nbsp; 35°</li>
					<li><input type="text" value="0" id="I72PL35" style="width: 40px"/></li>
					<li>&nbsp; 95°</li>
					<li><input type="text" value="0" id="I72PL95" style="width: 40px"/></li>
					<li>155°</li>
					<li><input type="text" value="0" id="I72PL155" style="width: 40px"/></li>
					<li>215°</li>
					<li><input type="text" value="0" id="I72PL215" style="width: 40px"/></li>
					<li>275°</li>
					<li><input type="text" value="0" id="I72PL275" style="width: 40px"/></li>
					<li>335°</li>
					<li><input type="text" value="0" id="I72PL335" style="width: 40px"/></li>
					<div id="separador"></div>
					<li>&nbsp; 40°</li>
					<li><input type="text" value="0" id="I72PL40" style="width: 40px"/></li>
					<li>100°</li>
					<li><input type="text" value="0" id="I72PL100" style="width: 40px"/></li>
					<li>160°</li>
					<li><input type="text" value="0" id="I72PL160" style="width: 40px"/></li>
					<li>220°</li>
					<li><input type="text" value="0" id="I72PL220" style="width: 40px"/></li>
					<li>280°</li>
					<li><input type="text" value="0" id="I72PL280" style="width: 40px"/></li>
					<li>340°</li>
					<li><input type="text" value="0" id="I72PL340" style="width: 40px"/></li>
					<div id="separador"></div>
					<li>&nbsp; 45°</li>
					<li><input type="text" value="0" id="I72PL45" style="width: 40px"/></li>
					<li>105°</li>
					<li><input type="text" value="0" id="I72PL105" style="width: 40px"/></li>
					<li>165°</li>
					<li><input type="text" value="0" id="I72PL165" style="width: 40px"/></li>
					<li>225°</li>
					<li><input type="text" value="0" id="I72PL225" style="width: 40px"/></li>
					<li>285°</li>
					<li><input type="text" value="0" id="I72PL285" style="width: 40px"/></li>
					<li>345°</li>
					<li><input type="text" value="0" id="I72PL345" style="width: 40px"/></li>
					<div id="separador"></div>
					<li>&nbsp; 50°</li>
					<li><input type="text" value="0" id="I72PL50" style="width: 40px"/></li>
					<li>110°</li>
					<li><input type="text" value="0" id="I72PL110" style="width: 40px"/></li>
					<li>170°</li>
					<li><input type="text" value="0" id="I72PL170" style="width: 40px"/></li>
					<li>230°</li>
					<li><input type="text" value="0" id="I72PL230" style="width: 40px"/></li>
					<li>290°</li>
					<li><input type="text" value="0" id="I72PL290" style="width: 40px"/></li>
					<li>350°</li>
					<li><input type="text" value="0" id="I72PL350" style="width: 40px"/></li>
					<div id="separador"></div>
					<li>&nbsp; 55°</li>
					<li><input type="text" value="0" id="I72PL55" style="width: 40px"/></li>
					<li>115°</li>
					<li><input type="text" value="0" id="I72PL115" style="width: 40px"/></li>
					<li>175°</li>
					<li><input type="text" value="0" id="I72PL175" style="width: 40px"/></li>
					<li>235°</li>
					<li><input type="text" value="0" id="I72PL235" style="width: 40px"/></li>
					<li>295°</li>
					<li><input type="text" value="0" id="I72PL295" style="width: 40px"/></li>
					<li>355°</li>
					<li><input type="text" value="0" id="I72PL355" style="width: 40px"/></li>
					<div id="separador"></div>
					<li style="width: 480px; text-align: right; padding-top: 10px;">
					<a href="#" id="omni72" align="left" style="padding-right: 350px" title="Todos a Cero">Omni</a>
					<button type="button" style="width: 70px;" id="save72PerdidasLobulosButton">Aceptar</button>
					</li>
				</ul>
			</div>
			<div id="frame18Radiales">
				<img id="closeImage18Radiales" src="images/close-150192_640.png" width="20" height="20" style="float: right; cursor: pointer;">
				<ul>
					<li><label><b><u>Distancia M&aacute;xima en Kilometros</u></b></label></li>
					<div id="separador"></div>
					<li>&nbsp; &nbsp; 0°</li>
					<li><input type="text" value="0" id="I18RA0" style="width: 40px" disabled="disabled" /></li>
					<li>120°</li>
					<li><input type="text" value="0" id="I18RA20" style="width: 40px" disabled="disabled" /></li>
					<li>240°</li>
					<li><input type="text" value="0" id="I18RA240" style="width: 40px" disabled="disabled" /></li>
					<div id="separador"></div>
					<li>&nbsp; 20°</li>
					<li><input type="text" value="0" id="I18RA20" style="width: 40px" disabled="disabled" /></li>
					<li>140°</li>
					<li><input type="text" value="0" id="I18RA140" style="width: 40px" disabled="disabled" /></li>
					<li>260°</li>
					<li><input type="text" value="0" id="I18RA260" style="width: 40px" disabled="disabled" /></li>
					<div id="separador"></div>
					<li>&nbsp; 40°</li>
					<li><input type="text" value="0" id="I18RA40" style="width: 40px" disabled="disabled" /></li>
					<li>160°</li>
					<li><input type="text" value="0" id="I18RA160" style="width: 40px" disabled="disabled" /></li>
					<li>280°</li>
					<li><input type="text" value="0" id="I18RA280" style="width: 40px" disabled="disabled" /></li>
					<div id="separador"></div>
					<li>&nbsp; 60°</li>
					<li><input type="text" value="0" id="I18RA60" style="width: 40px" disabled="disabled" /></li>
					<li>180°</li>
					<li><input type="text" value="0" id="I18RA180" style="width: 40px" disabled="disabled" /></li>
					<li>300°</li>
					<li><input type="text" value="0" id="I18RA300" style="width: 40px" disabled="disabled" /></li>
					<div id="separador"></div>
					<li>&nbsp; 80°</li>
					<li><input type="text" value="0" id="I18RA80" style="width: 40px" disabled="disabled" /></li>
					<li>200°</li>
					<li><input type="text" value="0" id="I18RA200" style="width: 40px" disabled="disabled" /></li>
					<li>320°</li>
					<li><input type="text" value="0" id="I18RA320" style="width: 40px" disabled="disabled" /></li>
					<div id="separador"></div>
					<li>100°</li>
					<li><input type="text" value="0" id="I18RA100" style="width: 40px" disabled="disabled" /></li>
					<li>220°</li>
					<li><input type="text" value="0" id="I18RA220" style="width: 40px" disabled="disabled" /></li>
					<li>340°</li>
					<li><input type="text" value="0" id="I18RA340" style="width: 40px" disabled="disabled" /></li>
				</ul>
			</div>
			<div id="frame72Radiales">
				<img id="closeImage72Radiales" src="images/close-150192_640.png" width="20" height="20" style="float: right; cursor: pointer;">
				<ul>
					<li><label><b><u>Distancia en Kilometros</u></b></label></li>
					<div id="separador"></div>
					<li>&nbsp; &nbsp; 0°</li>
					<li><input type="text" value="0" id="I72RA0" style="width: 40px" disabled="disabled"/></li>
					<li>&nbsp; 60°</li>
					<li><input type="text" value="0" id="I72RA60" style="width: 40px" disabled="disabled"/></li>
					<li>120°</li>
					<li><input type="text" value="0" id="I72RA120" style="width: 40px" disabled="disabled"/></li>
					<li>180°</li>
					<li><input type="text" value="0" id="I72RA180" style="width: 40px" disabled="disabled"/></li>
					<li>240°</li>
					<li><input type="text" value="0" id="I72RA240" style="width: 40px" disabled="disabled"/></li>
					<li>300°</li>
					<li><input type="text" value="0" id="I72RA300" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; &nbsp; 5°</li>
					<li><input type="text" value="0" id="I72RA5" style="width: 40px" disabled="disabled"/></li>
					<li>&nbsp; 65°</li>
					<li><input type="text" value="0" id="I72RA65" style="width: 40px" disabled="disabled"/></li>
					<li>125°</li>
					<li><input type="text" value="0" id="I72RA125" style="width: 40px" disabled="disabled"/></li>
					<li>185°</li>
					<li><input type="text" value="0" id="I72RA185" style="width: 40px" disabled="disabled"/></li>
					<li>245°</li>
					<li><input type="text" value="0" id="I72RA245" style="width: 40px" disabled="disabled"/></li>
					<li>305°</li>
					<li><input type="text" value="0" id="I72RA305" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 10°</li>
					<li><input type="text" value="0" id="I72RA10" style="width: 40px" disabled="disabled"/></li>
					<li>&nbsp; 70°</li>
					<li><input type="text" value="0" id="I72RA70" style="width: 40px" disabled="disabled"/></li>
					<li>130°</li>
					<li><input type="text" value="0" id="I72RA130" style="width: 40px" disabled="disabled"/></li>
					<li>190°</li>
					<li><input type="text" value="0" id="I72RA190" style="width: 40px" disabled="disabled"/></li>
					<li>250°</li>
					<li><input type="text" value="0" id="I72RA250" style="width: 40px" disabled="disabled"/></li>
					<li>310°</li>
					<li><input type="text" value="0" id="I72RA310" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 15°</li>
					<li><input type="text" value="0" id="I72RA15" style="width: 40px" disabled="disabled"/></li>
					<li>&nbsp; 75°</li>
					<li><input type="text" value="0" id="I72RA75" style="width: 40px" disabled="disabled"/></li>
					<li>135°</li>
					<li><input type="text" value="0" id="I72RA135" style="width: 40px" disabled="disabled"/></li>
					<li>195°</li>
					<li><input type="text" value="0" id="I72RA195" style="width: 40px" disabled="disabled"/></li>
					<li>255°</li>
					<li><input type="text" value="0" id="I72RA255" style="width: 40px" disabled="disabled"/></li>
					<li>315°</li>
					<li><input type="text" value="0" id="I72RA315" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 20°</li>
					<li><input type="text" value="0" id="I72RA20" style="width: 40px" disabled="disabled"/></li>
					<li>&nbsp; 80°</li>
					<li><input type="text" value="0" id="I72RA80" style="width: 40px" disabled="disabled"/></li>
					<li>140°</li>
					<li><input type="text" value="0" id="I72RA140" style="width: 40px" disabled="disabled"/></li>
					<li>200°</li>
					<li><input type="text" value="0" id="I72RA200" style="width: 40px" disabled="disabled"/></li>
					<li>260°</li>
					<li><input type="text" value="0" id="I72RA260" style="width: 40px" disabled="disabled"/></li>
					<li>320°</li>
					<li><input type="text" value="0" id="I72RA320" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 25°</li>
					<li><input type="text" value="0" id="I72RA25" style="width: 40px" disabled="disabled"/></li>
					<li>&nbsp; 85°</li>
					<li><input type="text" value="0" id="I72RA85" style="width: 40px" disabled="disabled"/></li>
					<li>145°</li>
					<li><input type="text" value="0" id="I72RA145" style="width: 40px" disabled="disabled"/></li>
					<li>205°</li>
					<li><input type="text" value="0" id="I72RA205" style="width: 40px" disabled="disabled"/></li>
					<li>265°</li>
					<li><input type="text" value="0" id="I72RA265" style="width: 40px" disabled="disabled"/></li>
					<li>325°</li>
					<li><input type="text" value="0" id="I72RA325" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 30°</li>
					<li><input type="text" value="0" id="I72RA30" style="width: 40px" disabled="disabled"/></li>
					<li>&nbsp; 90°</li>
					<li><input type="text" value="0" id="I72RA90" style="width: 40px" disabled="disabled"/></li>
					<li>150°</li>
					<li><input type="text" value="0" id="I72RA150" style="width: 40px" disabled="disabled"/></li>
					<li>210°</li>
					<li><input type="text" value="0" id="I72RA210" style="width: 40px" disabled="disabled"/></li>
					<li>270°</li>
					<li><input type="text" value="0" id="I72RA270" style="width: 40px" disabled="disabled"/></li>
					<li>330°</li>
					<li><input type="text" value="0" id="I72RA330" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 35°</li>
					<li><input type="text" value="0" id="I72RA35" style="width: 40px" disabled="disabled"/></li>
					<li>&nbsp; 95°</li>
					<li><input type="text" value="0" id="I72RA95" style="width: 40px" disabled="disabled"/></li>
					<li>155°</li>
					<li><input type="text" value="0" id="I72RA155" style="width: 40px" disabled="disabled"/></li>
					<li>215°</li>
					<li><input type="text" value="0" id="I72RA215" style="width: 40px" disabled="disabled"/></li>
					<li>275°</li>
					<li><input type="text" value="0" id="I72RA275" style="width: 40px" disabled="disabled"/></li>
					<li>335°</li>
					<li><input type="text" value="0" id="I72RA335" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 40°</li>
					<li><input type="text" value="0" id="I72RA40" style="width: 40px" disabled="disabled"/></li>
					<li>100°</li>
					<li><input type="text" value="0" id="I72RA100" style="width: 40px" disabled="disabled"/></li>
					<li>160°</li>
					<li><input type="text" value="0" id="I72RA160" style="width: 40px" disabled="disabled"/></li>
					<li>220°</li>
					<li><input type="text" value="0" id="I72RA220" style="width: 40px" disabled="disabled"/></li>
					<li>280°</li>
					<li><input type="text" value="0" id="I72RA280" style="width: 40px" disabled="disabled"/></li>
					<li>340°</li>
					<li><input type="text" value="0" id="I72RA340" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 45°</li>
					<li><input type="text" value="0" id="I72RA45" style="width: 40px" disabled="disabled"/></li>
					<li>105°</li>
					<li><input type="text" value="0" id="I72RA105" style="width: 40px" disabled="disabled"/></li>
					<li>165°</li>
					<li><input type="text" value="0" id="I72RA165" style="width: 40px" disabled="disabled"/></li>
					<li>225°</li>
					<li><input type="text" value="0" id="I72RA225" style="width: 40px" disabled="disabled"/></li>
					<li>285°</li>
					<li><input type="text" value="0" id="I72RA285" style="width: 40px" disabled="disabled"/></li>
					<li>345°</li>
					<li><input type="text" value="0" id="I72RA345" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 50°</li>
					<li><input type="text" value="0" id="I72RA50" style="width: 40px" disabled="disabled"/></li>
					<li>110°</li>
					<li><input type="text" value="0" id="I72RA110" style="width: 40px" disabled="disabled"/></li>
					<li>170°</li>
					<li><input type="text" value="0" id="I72RA170" style="width: 40px" disabled="disabled"/></li>
					<li>230°</li>
					<li><input type="text" value="0" id="I72RA230" style="width: 40px" disabled="disabled"/></li>
					<li>290°</li>
					<li><input type="text" value="0" id="I72RA290" style="width: 40px" disabled="disabled"/></li>
					<li>350°</li>
					<li><input type="text" value="0" id="I72RA350" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 55°</li>
					<li><input type="text" value="0" id="I72RA55" style="width: 40px" disabled="disabled"/></li>
					<li>115°</li>
					<li><input type="text" value="0" id="I72RA115" style="width: 40px" disabled="disabled"/></li>
					<li>175°</li>
					<li><input type="text" value="0" id="I72RA175" style="width: 40px" disabled="disabled"/></li>
					<li>235°</li>
					<li><input type="text" value="0" id="I72RA235" style="width: 40px" disabled="disabled"/></li>
					<li>295°</li>
					<li><input type="text" value="0" id="I72RA295" style="width: 40px" disabled="disabled"/></li>
					<li>355°</li>
					<li><input type="text" value="0" id="I72RA355" style="width: 40px" disabled="disabled"/></li>
				</ul>
			</div>
			<div id="distanciaKilometro8">
				<img id="closeImageDK8" src="images/close-150192_640.png" width="20" height="20" style="float: right; cursor: pointer;">
				<ul>
					<li><label><b><u>Distancia en Kilometros</u></b></label></li>
					<div id="separador"></div>
					<li>&nbsp; &nbsp;  0°</li>
					<li><input type="text" value="0" id="I8DK0" style="width: 40px" disabled="disabled" /></li>
					<li>180°</li>
					<li><input type="text" value="0" id="I8DK180" style="width: 40px" disabled="disabled" /></li>
					<div id="separador"></div>
					<li>&nbsp; 45°</li>
					<li><input type="text" value="0" id="I8DK45" style="width: 40px" disabled="disabled" /></li>
					<li>225°</li>
					<li><input type="text" value="0" id="I8DK225" style="width: 40px" disabled="disabled" /></li>
					<div id="separador"></div>
					<li>&nbsp; 90°</li>
					<li><input type="text" value="0" id="I8DK90" style="width: 40px" disabled="disabled" /></li>
					<li>270°</li>
					<li><input type="text" value="0" id="I8DK270" style="width: 40px" disabled="disabled" /></li>
					<div id="separador"></div>
					<li>135°</li>
					<li><input type="text" value="0" id="I8DK135" style="width: 40px" disabled="disabled" /></li>
					<li>315°</li>
					<li><input type="text" value="0" id="I8DK315" style="width: 40px" disabled="disabled" /></li>
				</ul>
			</div>
			<div id="distanciaKilometro18">
				<img id="closeImageDK18" src="images/close-150192_640.png" width="20" height="20" style="float: right; cursor: pointer;">
				<ul>
					<li><label><b><u>Distancia en Kilometros</u></b></label></li>
					<div id="separador"></div>
					<li>&nbsp; &nbsp; 0°</li>
					<li><input type="text" value="0" id="I18DK0" style="width: 40px" disabled="disabled" /></li>
					<li>120°</li>
					<li><input type="text" value="0" id="I18DK120" style="width: 40px" disabled="disabled" /></li>
					<li>240°</li>
					<li><input type="text" value="0" id="I18DK240" style="width: 40px" disabled="disabled" /></li>
					<div id="separador"></div>
					<li>&nbsp; 20°</li>
					<li><input type="text" value="0" id="I18DK20" style="width: 40px" disabled="disabled" /></li>
					<li>140°</li>
					<li><input type="text" value="0" id="I18DK140" style="width: 40px" disabled="disabled" /></li>
					<li>260°</li>
					<li><input type="text" value="0" id="I18DK260" style="width: 40px" disabled="disabled" /></li>
					<div id="separador"></div>
					<li>&nbsp; 40°</li>
					<li><input type="text" value="0" id="I18DK40" style="width: 40px" disabled="disabled" /></li>
					<li>160°</li>
					<li><input type="text" value="0" id="I18DK160" style="width: 40px" disabled="disabled" /></li>
					<li>280°</li>
					<li><input type="text" value="0" id="I18DK280" style="width: 40px" disabled="disabled" /></li>
					<div id="separador"></div>
					<li>&nbsp; 60°</li>
					<li><input type="text" value="0" id="I18DK60" style="width: 40px" disabled="disabled" /></li>
					<li>180°</li>
					<li><input type="text" value="0" id="I18DK180" style="width: 40px" disabled="disabled" /></li>
					<li>300°</li>
					<li><input type="text" value="0" id="I18DK300" style="width: 40px" disabled="disabled" /></li>
					<div id="separador"></div>
					<li>&nbsp; 80°</li>
					<li><input type="text" value="0" id="I18DK80" style="width: 40px" disabled="disabled" /></li>
					<li>200°</li>
					<li><input type="text" value="0" id="I18DK200" style="width: 40px" disabled="disabled" /></li>
					<li>320°</li>
					<li><input type="text" value="0" id="I18DK320" style="width: 40px" disabled="disabled" /></li>
					<div id="separador"></div>
					<li>100°</li>
					<li><input type="text" value="0" id="I18DK100" style="width: 40px" disabled="disabled" /></li>
					<li>220°</li>
					<li><input type="text" value="0" id="I18DK220" style="width: 40px" disabled="disabled" /></li>
					<li>340°</li>
					<li><input type="text" value="0" id="I18DK340" style="width: 40px" disabled="disabled" /></li>
				</ul>
			</div>
			<div id="distanciaKilometro72">
				<img id="closeImageDK72" src="images/close-150192_640.png" width="20" height="20" style="float: right; cursor: pointer;">
				<ul>
					<li><label><b><u>Distancia en Kilometros</u></b></label></li>
					<div id="separador"></div>
					<li>&nbsp; &nbsp; 0°</li>
					<li><input type="text" value="0" id="I72DK0" style="width: 40px" disabled="disabled"/></li>
					<li>&nbsp; 60°</li>
					<li><input type="text" value="0" id="I72DK60" style="width: 40px" disabled="disabled"/></li>
					<li>120°</li>
					<li><input type="text" value="0" id="I72DK120" style="width: 40px" disabled="disabled"/></li>
					<li>180°</li>
					<li><input type="text" value="0" id="I72DK180" style="width: 40px" disabled="disabled"/></li>
					<li>240°</li>
					<li><input type="text" value="0" id="I72DK240" style="width: 40px" disabled="disabled"/></li>
					<li>300°</li>
					<li><input type="text" value="0" id="I72DK300" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; &nbsp; 5°</li>
					<li><input type="text" value="0" id="I72DK5" style="width: 40px" disabled="disabled"/></li>
					<li>&nbsp; 65°</li>
					<li><input type="text" value="0" id="I72DK65" style="width: 40px" disabled="disabled"/></li>
					<li>125°</li>
					<li><input type="text" value="0" id="I72DK125" style="width: 40px" disabled="disabled"/></li>
					<li>185°</li>
					<li><input type="text" value="0" id="I72DK185" style="width: 40px" disabled="disabled"/></li>
					<li>245°</li>
					<li><input type="text" value="0" id="I72DK245" style="width: 40px" disabled="disabled"/></li>
					<li>305°</li>
					<li><input type="text" value="0" id="I72DK305" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 10°</li>
					<li><input type="text" value="0" id="I72DK10" style="width: 40px" disabled="disabled"/></li>
					<li>&nbsp; 70°</li>
					<li><input type="text" value="0" id="I72DK70" style="width: 40px" disabled="disabled"/></li>
					<li>130°</li>
					<li><input type="text" value="0" id="I72DK130" style="width: 40px" disabled="disabled"/></li>
					<li>190°</li>
					<li><input type="text" value="0" id="I72DK190" style="width: 40px" disabled="disabled"/></li>
					<li>250°</li>
					<li><input type="text" value="0" id="I72DK250" style="width: 40px" disabled="disabled"/></li>
					<li>310°</li>
					<li><input type="text" value="0" id="I72DK310" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 15°</li>
					<li><input type="text" value="0" id="I72DK15" style="width: 40px" disabled="disabled"/></li>
					<li>&nbsp; 75°</li>
					<li><input type="text" value="0" id="I72DK75" style="width: 40px" disabled="disabled"/></li>
					<li>135°</li>
					<li><input type="text" value="0" id="I72DK135" style="width: 40px" disabled="disabled"/></li>
					<li>195°</li>
					<li><input type="text" value="0" id="I72DK195" style="width: 40px" disabled="disabled"/></li>
					<li>255°</li>
					<li><input type="text" value="0" id="I72DK255" style="width: 40px" disabled="disabled"/></li>
					<li>315°</li>
					<li><input type="text" value="0" id="I72DK315" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 20°</li>
					<li><input type="text" value="0" id="I72DK20" style="width: 40px" disabled="disabled"/></li>
					<li>&nbsp; 80°</li>
					<li><input type="text" value="0" id="I72DK80" style="width: 40px" disabled="disabled"/></li>
					<li>140°</li>
					<li><input type="text" value="0" id="I72DK140" style="width: 40px" disabled="disabled"/></li>
					<li>200°</li>
					<li><input type="text" value="0" id="I72DK200" style="width: 40px" disabled="disabled"/></li>
					<li>260°</li>
					<li><input type="text" value="0" id="I72DK260" style="width: 40px" disabled="disabled"/></li>
					<li>320°</li>
					<li><input type="text" value="0" id="I72DK320" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 25°</li>
					<li><input type="text" value="0" id="I72DK25" style="width: 40px" disabled="disabled"/></li>
					<li>&nbsp; 85°</li>
					<li><input type="text" value="0" id="I72DK85" style="width: 40px" disabled="disabled"/></li>
					<li>145°</li>
					<li><input type="text" value="0" id="I72DK145" style="width: 40px" disabled="disabled"/></li>
					<li>205°</li>
					<li><input type="text" value="0" id="I72DK205" style="width: 40px" disabled="disabled"/></li>
					<li>265°</li>
					<li><input type="text" value="0" id="I72DK265" style="width: 40px" disabled="disabled"/></li>
					<li>325°</li>
					<li><input type="text" value="0" id="I72DK325" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 30°</li>
					<li><input type="text" value="0" id="I72DK30" style="width: 40px" disabled="disabled"/></li>
					<li>&nbsp; 90°</li>
					<li><input type="text" value="0" id="I72DK90" style="width: 40px" disabled="disabled"/></li>
					<li>150°</li>
					<li><input type="text" value="0" id="I72DK150" style="width: 40px" disabled="disabled"/></li>
					<li>210°</li>
					<li><input type="text" value="0" id="I72DK210" style="width: 40px" disabled="disabled"/></li>
					<li>270°</li>
					<li><input type="text" value="0" id="I72DK270" style="width: 40px" disabled="disabled"/></li>
					<li>330°</li>
					<li><input type="text" value="0" id="I72DK330" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 35°</li>
					<li><input type="text" value="0" id="I72DK35" style="width: 40px" disabled="disabled"/></li>
					<li>&nbsp; 95°</li>
					<li><input type="text" value="0" id="I72DK95" style="width: 40px" disabled="disabled"/></li>
					<li>155°</li>
					<li><input type="text" value="0" id="I72DK155" style="width: 40px" disabled="disabled"/></li>
					<li>215°</li>
					<li><input type="text" value="0" id="I72DK215" style="width: 40px" disabled="disabled"/></li>
					<li>275°</li>
					<li><input type="text" value="0" id="I72DK275" style="width: 40px" disabled="disabled"/></li>
					<li>335°</li>
					<li><input type="text" value="0" id="I72DK335" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 40°</li>
					<li><input type="text" value="0" id="I72DK40" style="width: 40px" disabled="disabled"/></li>
					<li>100°</li>
					<li><input type="text" value="0" id="I72DK100" style="width: 40px" disabled="disabled"/></li>
					<li>160°</li>
					<li><input type="text" value="0" id="I72DK160" style="width: 40px" disabled="disabled"/></li>
					<li>220°</li>
					<li><input type="text" value="0" id="I72DK220" style="width: 40px" disabled="disabled"/></li>
					<li>280°</li>
					<li><input type="text" value="0" id="I72DK280" style="width: 40px" disabled="disabled"/></li>
					<li>340°</li>
					<li><input type="text" value="0" id="I72DK340" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 45°</li>
					<li><input type="text" value="0" id="I72DK45" style="width: 40px" disabled="disabled"/></li>
					<li>105°</li>
					<li><input type="text" value="0" id="I72DK105" style="width: 40px" disabled="disabled"/></li>
					<li>165°</li>
					<li><input type="text" value="0" id="I72DK165" style="width: 40px" disabled="disabled"/></li>
					<li>225°</li>
					<li><input type="text" value="0" id="I72DK225" style="width: 40px" disabled="disabled"/></li>
					<li>285°</li>
					<li><input type="text" value="0" id="I72DK285" style="width: 40px" disabled="disabled"/></li>
					<li>345°</li>
					<li><input type="text" value="0" id="I72DK345" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 50°</li>
					<li><input type="text" value="0" id="I72DK50" style="width: 40px" disabled="disabled"/></li>
					<li>110°</li>
					<li><input type="text" value="0" id="I72DK110" style="width: 40px" disabled="disabled"/></li>
					<li>170°</li>
					<li><input type="text" value="0" id="I72DK170" style="width: 40px" disabled="disabled"/></li>
					<li>230°</li>
					<li><input type="text" value="0" id="I72DK230" style="width: 40px" disabled="disabled"/></li>
					<li>290°</li>
					<li><input type="text" value="0" id="I72DK290" style="width: 40px" disabled="disabled"/></li>
					<li>350°</li>
					<li><input type="text" value="0" id="I72DK350" style="width: 40px" disabled="disabled"/></li>
					<div id="separador"></div>
					<li>&nbsp; 55°</li>
					<li><input type="text" value="0" id="I72DK55" style="width: 40px" disabled="disabled"/></li>
					<li>115°</li>
					<li><input type="text" value="0" id="I72DK115" style="width: 40px" disabled="disabled"/></li>
					<li>175°</li>
					<li><input type="text" value="0" id="I72DK175" style="width: 40px" disabled="disabled"/></li>
					<li>235°</li>
					<li><input type="text" value="0" id="I72DK235" style="width: 40px" disabled="disabled"/></li>
					<li>295°</li>
					<li><input type="text" value="0" id="I72DK295" style="width: 40px" disabled="disabled"/></li>
					<li>355°</li>
					<li><input type="text" value="0" id="I72DK355" style="width: 40px" disabled="disabled"/></li>
				</ul>
			</div>
			<div id="opcionesAvanzadas">
				<img id="closeImageOA" src="images/close-150192_640.png" width="20" height="20" style="float: right; cursor: pointer;">
				<ul>
					<li><label><b><u>Par&aacute;metros avanzados</u></b></label></li>
					<div id="separador" style="height: 1px;"></div>
					<li style="width: 143px; text-align: left">Obst&aacute;culos Circundantes Tx:</li>
					<li style="width: 56px;">
						<input type="text" value="20" id="obstaculosCircundantesTx" style="width: 25px" disabled /><b>[m]</b>
					</li>
					<li style="width: 149px; text-align: left">Obst&aacute;culos Circundantes Rx:</li>
					<li><input type="text" value="20" id="obstaculosCircundantesRx" style="width: 25px" disabled /><b>[m]</b></li>
					<div id="separador"></div>
					<li style="width: 143px; text-align: left">Tolerancia zonas de sombra:</li>
					<li><input type="text" value="20" id="toleranciaZonasSombras" style="width: 25px" disabled /><b>[km]</b></li
>					<li style="width: 148px; text-align: left">Resoluci&oacute;n de c&aacute;lculo:</li>
					<li><input type="text" value="500" id="resolucionCalculo" style="width: 25px" disabled /><b>[m]</b></li>
					<div id="separador"></div>
					<li style="width: 144px; text-align: left">Porcentaje de tiempo:</li>
					<li style="width: 56px;">
						<input type="text" value="50" id="porcentajeTiempo" style="width: 25px" disabled /><b>[%]&nbsp;</b>
					</li>
					<li style="width: 148px; text-align: left">Porcentaje de ubicaci&oacute;n:</li>
					<li><input type="text" value="50" id="porcentajeUbicacion" style="width: 25px" disabled /><b>[%]</b></li>
					<div id="separador"></div>
					<li style="width: 143px; text-align: left">Altura Antena Receptora:</li>
					<li><input type="text" value="20" id="alturaAntenaRx" style="width: 25px" disabled /><b>[m]&nbsp;</b></li>
					<li style="width: 75px; float: right;"><button type="button" style="width: 70px;" id="saveParametrosAvanzadosButton">Aceptar</button></li>
				</ul>
			</div>
			<div id="msgbox"><p>Seleccione nueva ubicaci&oacute;n en el mapa</p></div>
		</div>
	</div>
	<div id="openModal" class="modalForm">
	</div>
</div>
</body>
</html>
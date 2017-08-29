<%@page language="java" contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

	<%
		String token = request.getParameter("token");
		String userId = request.getParameter("userId");
		String codigoPostulacion = request.getParameter("codigo");
	%>
	<script src="js/jquery-3.2.0.min.js"></script>
	<script src="js/jquery-ui.js"></script>
	<script src="js/jquery.soap.js"></script>
	<script language="javascript">
		 //   var token ="<%=token%>";
		   var userId ="<%=userId%>";
		   var codigoPostulacion ="<%=codigoPostulacion%>";
		   data = {"usuario_id": parseInt(userId), "token": token, "codigo": codigoPostulacion};
			$.ajax({
				data: data,
				url: "/CalculoTVD/calculoTVD/tvdpage",
				type: 'POST',
				success: function(response) {
					if(response == "NOK") {
						window.location.replace('error_page.jsp');
					}
				},
				error: function(error) {
					window.location.replace('error_page.jsp');
				}
			});
	</script>

<head>
<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Subsecretaria de Telecomunicaciones</title>
<link rel="icon" href="../favicon.ico" type="image/x-icon"/>
<link rel="shortcut icon" href="../favicon.ico" type="image/x-icon"/>
<link href="css/main.css?v=<%= System.currentTimeMillis() %>" rel="stylesheet" type="text/css">
<link href="css/jquery.dataTables.min.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="https://js.arcgis.com/4.1/esri/css/main.css">
<link href="font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="css/form_pdf.css?v=<%= System.currentTimeMillis() %>" rel="stylesheet" type="text/css">
<script src="js/xlsx.full.min.js?v=<%= System.currentTimeMillis() %>"></script>
<script src="js/jquery.dataTables.min.js"></script>
<script src="js/template_kml.js"></script>
<script src="js/pdfmake.min.js"></script>
<script src="js/vfs_fonts.js"></script>
<script src="js/underscore.string.min.js"></script>
<script src="js/underscore-min.js"></script>
<script src="https://js.arcgis.com/4.2/"></script>
<script src="js/main.js?v=<%= System.currentTimeMillis() %>"></script>
<script src="js/geopoint.js"></script>
<script src="js/zoom.js?v=<%= System.currentTimeMillis() %>"></script>
<script src="js/pdf_form.js?v=<%= System.currentTimeMillis() %>"></script>
<script src="js/controller.js?v=<%= System.currentTimeMillis() %>"></script>
<script src="js/pdf_export.js?v=<%= System.currentTimeMillis() %>"></script>
<script src="js/interpolacion.js"></script>
<script src="js/concurso_pdf_export.js?v=<%= System.currentTimeMillis() %>"></script>
<script src="js/modificacion_pdf_export.js?v=<%= System.currentTimeMillis() %>"></script>
<script src="js/jquery.sha1.js"></script>
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
		<div id="pdf" class = "esri-button2 esri-widget-button2 esri-interactive" title="Descarga Manual de Usuario">
			<a class="btn btn-info" href="/CalculoTVD/calculoTVD/userGuide">
	  			<i class="fa fa-file-pdf-o fa-2x" aria-hidden="true"></i>
	  		</a>
  		</div>
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
					<li><input type="radio" disabled="disabled" id="modificacionM" name="concursoModificacion" value="modificacion">Modificaci&oacute;n</li>
					<li style="padding-top: 5px; font-weight: 100; width: 117px; text-align: right;">Recomendaci&oacute;n: </li>
					<li style="padding-top: 2px; width: 50px;">
						<select name="recomendacion" id="recomendacion" style="width: 65px;">
							<option value="1546" selected="true">1546</option>
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
					<!-- <li><button type="button" style="font-size: 11px;" id="saveMongoData">Agregar Info a PDF</button></li> -->
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
								<li><label id="label_zona_max">Zona de Servicio M&aacute;xima</label></li>
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
									<label>(Zona corresponde al 70% por radial de la zona de servicio original)</label>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div id="tab2">
					<div id="divGuardarCalculos">
					<ul>
						<li><label>Historial de C&aacutelculos:</label></li>
						<li style="width: 33%">
							<select name="selectCalculos" id="selectCalculos" style="width: 100%">
								<option value="0">...</option>
							</select>
						</li>
						<li><button type="button" id="saveMongoData">Guardar Datos</button></li>
					</ul>
					</div>
					<div id="subbox2left">
						<ul>
							<li><label style="padding-right: 0px;">Intensidad de campo:</label></li>
							<li>
								<select id="intensidadCampoM" style="width: 45px; height: 18px;">
									<option>40</option>
									<option>48</option>
									<option>66</option>
								</select>
								<b>[dB(uV/m)]</b>
							<!-- <input type="text" value="" id="intensidadCampoM" style="width: 40px;"/><b>[dB(uV/m)]</b> -->
							</li>
							<div id="separador"></div>
							<li><label style="padding-right: 16px;">Altura Antena Tx:</label></li>
							<li><input class="number_input" type="text" value="" id="alturaAntenaTransmisoraM" style="width: 40px;"/><b>[m]</b></li>
							<li><label style="padding-right: 39px;">P&eacute;rdidas CC:</label></li>
							<li><input class="number_input" type="text" value="" id="perdidasCablesConectoresM" style="width: 40px;"/><b>[dB]</b></li>
							<div id="separador"></div>
							<li><label style="padding-right: 6px;">Divisor de potencia:</label></li>
							<li><input class="number_input" type="text" value="" id="divisorPotenciaM" style="width: 40px;"/><b>[dB]</b></li>
						</ul>
					</div>
					<div id="subbox2right">
						<ul>
							<li><label class="number_input" style="padding-right: 31px;">Potencia:</label></li>
							<li><input type="text" value="" id="potenciaM" style="width: 40px;" /><b>[W]</b></li>
							<div id="separador"></div>
							<li><label style="padding-right: 26px;">Ganancia:</label></li>
							<li><input class="number_input" type="text" value="" id="gananciaM" style="width: 40px;"/><b>[dBd]</b></li>
							<div id="separador"></div>
							<li><label style="padding-right: 18px;">Frecuencia:</label></li>
							<li><input class="number_input" type="text" value="" id="frecuenciaM" style="width: 40px;"/><b>[Mhz]</b></li>
							<li><label>Otras P&eacute;rdidas:</label></li>
							<li><input class="number_input" type="text" value="" id="otrasPerdidasM" style="width: 40px;"/><b>[dB]</b></li>
						</ul>
					</div>
					<div id="separador"></div>
					<div id="subbox2middle">
						<ul>
							<li><label>Coordenadas de Ubicaci&oacute;n Digital para Planta TxWGS84:</label></li>
							<div id="separador"></div>
							<li><label>Latitud:</label></li>
							<li><input type="text" value="" id="latitudGradosM" style="width: 30px;" class="number_input"/>&deg</li>
							<li><input type="text" value="" id="latitudMinutosM" style="width: 30px;" class="number_input"/>'</li>
							<li><input type="text" value="" id="latitudSegudosM" style="width: 30px;" class="number_input"/>''</li>
							<li><label>Longitud:</label></li>
							<li><input type="text" value="" id="longitudGradosM" style="width: 30px;" class="number_input"/>&deg</li>
							<li><input type="text" value="" id="longitudMinutosM" style="width: 30px;" class="number_input"/>'</li>
							<li><input type="text" value="" id="longitudSegundosM" style="width: 30px;" class="number_input"/>''</li>
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
					<div id="subbox2bottom2">
						<ul>
							<li style="text-align: left;" id="opcionesAvanzadasButton"><a href="#">Par&aacute;metros Avanzados</a></li>
							<li style="width: 110px; text-align: left;"></li>
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
								<li style="font-weight: bold;"><label id="localidadI"></label></li>
								<div id="separador"></div>
								<li><label>Potencia: &nbsp;</label></li>
								<li style="font-weight: bold"><label id="potenciaI"></label><label> Watts</label></li>
								<div id="separador"></div>
								<li><label>N° de Viviendas: &nbsp;</label></li>
								<li style="font-weight: bold"><label id="viviendasI"></label></li>
							</ul>
						</div>
						<div id="subbox3topright">
							<ul>
								<li><label>Concurso: &nbsp;</label></li>
								<li style="font-weight: bold"><label id="identificadorI"></label></li>
								<div id="separador"></div>
								<li><label>Frecuencia: &nbsp;</label></li>
								<li style="text-align:left; font-weight: bold"><label id="frecuenciaI"></label><label> Mhz</label></li>
							</ul>
						</div>
					</div>
					<div id="subbox3bottom1">
						<ul>
							<li><label><b><u>Coordenadas de Ubicaci&oacute;n Digital para Planta TxWGS84</u></b></label></li>
							<div id="separador"></div>
							<li><label>Latitud:</label></li>
							<li><input id="latitudI" type="text" value="" style="width: 100px;" disabled="disabled"/></li>
							<li><label>Longitud:</label></li>
							<li><input id="longitudI" type="text" value="" style="width: 100px;" disabled="disabled"/></li>
						</ul>
					</div>
					<div id="datospostulante">
						<ul>
							<li><label><b><u>Proyecto T&eacute;cnico</u></b></label></li>
							<div id="separador"></div>
							<li><button type="button" style="font-size: 11px;" id="verDistancia" class="button_info">Ver Resultado</button></li>
							<div id="separador"></div>
							<li><button type="button" id="exportarKMZ">Exportar a GoogleEarth</button></li>
							<li><button type="button" id="pdfForm">Agregar Datos</button></li>
							<li><button type="button" id="imprimirCalculo">Generar PDF</button></li>
							<div id="separador"></div>
							<li><button type="button" id="enviarCalculosCNTV" class="button_info"><b>Enviar a CNTV</b></button></li>
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
					<li>&nbsp; &nbsp;  0&deg</li>
					<li><input type="text" value="0" id="I8PL0" style="width: 40px" /></li>
					<li>180&deg</li>
					<li><input type="text" value="0" id="I8PL180" style="width: 40px" /></li>
					<div id="separador"></div>
					<li>&nbsp; 45&deg</li>
					<li><input type="text" value="0" id="I8PL45" style="width: 40px" /></li>
					<li>225&deg</li>
					<li><input type="text" value="0" id="I8PL225" style="width: 40px" /></li>
					<div id="separador"></div>
					<li>&nbsp; 90&deg</li>
					<li><input type="text" value="0" id="I8PL90" style="width: 40px" /></li>
					<li>270&deg</li>
					<li><input type="text" value="0" id="I8PL270" style="width: 40px" /></li>
					<div id="separador"></div>
					<li>135&deg</li>
					<li><input type="text" value="0" id="I8PL135" style="width: 40px" /></li>
					<li>315&deg</li>
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
					<% for(int ix = 0; ix < 6; ix++) { %>
						<div id="separador"></div>
						<li style="width: 25px;"><%= 0+(20*ix) %>&deg</li>
						<li><input type="text" value="0" id="I18PL<%= 0+(20*ix) %>" style="width: 40px" class="number_input" /></li>
						<li style="width: 25px;"><%= 120+(20*ix) %>&deg</li>
						<li><input type="text" value="0" id="I18PL<%= 120+(20*ix) %>" style="width: 40px" class="number_input"/></li>
						<li style="width: 25px;"><%= 240+(20*ix) %>&deg</li>
						<li><input type="text" value="0" id="I18PL<%= 240+(20*ix) %>" style="width: 40px" class="number_input"/></li>
					<% } %>
					<div id="separador"></div>
					<li style="width: 66%; text-align: left; padding-top: 10px; padding-left: 17px">
						<a href="#" id="omni18" style="padding-right: 5px" title="Todos a Cero">Omni</a>
						<a class="btn btn-info" href="/CalculoTVD/calculoTVD/Plantillas/18">
							<i class="fa fa-file-pdf-o fa-1x" style="padding-right: 5px" aria-hidden="true"></i>
						</a>
						<input id="file18" name="I18PL" style="display: none;" type="file"/>
						<a href="" id="upload18">Carga P&eacute;rdidas</a>
					</li>
					<li style="width: 20%; text-align: right; padding-top: 10px;">
						<button type="button" id="save18PerdidasLobulosButton">Aceptar</button>
					</li>
				</ul>
			</div>
			<div id="frame72PerdidasLobulos">
				<img id="closeImage72" src="images/close-150192_640.png" width="20" height="20" style="float: right; cursor: pointer;">
				<ul>
					<li><label><b><u>72 Radiales [dB]</u></b></label></li>
					<% for(int ix = 0; ix < 12; ix++) { %>
						<div id="separador"></div>
						<li style="width: 25px;"><%= 0+(5*ix) %>&deg</li>
						<li><input type="text" value="0" id="I72PL<%= 0+(5*ix) %>" style="width: 40px" class="number_input" /></li>
						<li style="width: 25px;"><%= 60+(5*ix) %>&deg</li>
						<li><input type="text" value="0" id="I72PL<%= 60+(5*ix) %>" style="width: 40px" class="number_input"/></li>
						<li style="width: 25px;"><%= 120+(5*ix) %>&deg</li>
						<li><input type="text" value="0" id="I72PL<%= 120+(5*ix) %>" style="width: 40px" class="number_input"/></li>
						<li style="width: 25px;"><%= 180+(5*ix) %>&deg</li>
						<li><input type="text" value="0" id="I72PL<%= 180+(5*ix) %>" style="width: 40px" class="number_input" /></li>
						<li style="width: 25px;"><%= 240+(5*ix) %>&deg</li>
						<li><input type="text" value="0" id="I72PL<%= 240+(5*ix) %>" style="width: 40px" class="number_input"/></li>
						<li style="width: 25px;"><%= 300+(5*ix) %>&deg</li>
						<li><input type="text" value="0" id="I72PL<%= 300+(5*ix) %>" style="width: 40px" class="number_input"/></li>
					<% } %>
					<div id="separador"></div>
					<li style="width: 66%; text-align: left; padding-top: 10px; padding-left: 17px">
						<a href=#" id="omni72" style="padding-right: 5px" title="Todos a Cero">Omni</a>
						<a class="btn btn-info" href="/CalculoTVD/calculoTVD/Plantillas/72">
							<i class="fa fa-file-pdf-o fa-1x" style="padding-right: 5px" aria-hidden="true"></i>
						</a>
						<input id="file72" name="I72PL" style="display: none;" type="file"/>
						<a href="" id="upload72">Carga P&eacute;rdidas</a>
					</li>
					<li style="width: 20%; text-align: right; padding-top: 10px;">
						<button type="button" id="save72PerdidasLobulosButton">Aceptar</button>
					</li>
					<!-- <li style="width: 70%; text-align: left; padding-top: 10px; padding-left: 33px">
					<a href="#" id="omni72" style="padding-right: 10px;" title="Todos a Cero">Omni</a>
					<a href="#" id="cargaPerdidas" title="Cargar P&eacute;rdidas por L&oacute;bulo desde un CSV">Carga P&eacute;rdidas (CSV)</a>
					</li>
					<li style="width: 20%; text-align: right; padding-top: 10px;">
					<button type="button" id="save72PerdidasLobulosButton">Aceptar</button>
					</li> -->
				</ul>
			</div>
			<div id="frame18Radiales">
				<img id="closeImage18Radiales" src="images/close-150192_640.png" width="20" height="20" style="float: right; cursor: pointer;">
				<ul>
					<li><label><b><u>Distancia M&iacute;nima en Kilometros</u></b></label></li>
					<% for(int ix = 0; ix < 6; ix++) { %>
						<div id="separador"></div>
						<li style="width: 25px;"><%= 0+(20*ix) %>&deg</li>
						<li><input type="text" value="0" id="I18RA<%= 0+(20*ix) %>" style="width: 40px" disabled="disabled" /></li>
						<li style="width: 25px;"><%= 120+(20*ix) %>&deg</li>
						<li><input type="text" value="0" id="I18RA<%= 120+(20*ix) %>" style="width: 40px" disabled="disabled"/></li>
						<li style="width: 25px;"><%= 240+(20*ix) %>&deg</li>
						<li><input type="text" value="0" id="I18RA<%= 240+(20*ix) %>" style="width: 40px" disabled="disabled"/></li>
					<% } %>
				</ul>
			</div>
			<div id="frame72Radiales">
				<img id="closeImage72Radiales" src="images/close-150192_640.png" width="20" height="20" style="float: right; cursor: pointer;">
				<ul>
					<li><label><b><u>Distancia M&iacute;nima en Kilometros</u></b></label></li>
					<% for(int ix = 0; ix < 12; ix++) { %>
						<div id="separador"></div>
						<li style="width: 25px;"><%= 0+(5*ix) %>&deg</li>
						<li><input type="text" value="0" id="I72RA<%= 0+(5*ix) %>" style="width: 40px" disabled="disabled" /></li>
						<li style="width: 25px;"><%= 60+(5*ix) %>&deg</li>
						<li><input type="text" value="0" id="I72RA<%= 60+(5*ix) %>" style="width: 40px" disabled="disabled"/></li>
						<li style="width: 25px;"><%= 120+(5*ix) %>&deg</li>
						<li><input type="text" value="0" id="I72RA<%= 120+(5*ix) %>" style="width: 40px" disabled="disabled"/></li>
						<li style="width: 25px;"><%= 180+(5*ix) %>&deg</li>
						<li><input type="text" value="0" id="I72RA<%= 180+(5*ix) %>" style="width: 40px" disabled="disabled" /></li>
						<li style="width: 25px;"><%= 240+(5*ix) %>&deg</li>
						<li><input type="text" value="0" id="I72RA<%= 240+(5*ix) %>" style="width: 40px" disabled="disabled"/></li>
						<li style="width: 25px;"><%= 300+(5*ix) %>&deg</li>
						<li><input type="text" value="0" id="I72RA<%= 300+(5*ix) %>" style="width: 40px" disabled="disabled"/></li>
					<% } %>
				</ul>
			</div>
			<div id="distanciaKilometro8">
				<img id="closeImageDK8" src="images/close-150192_640.png" width="20" height="20" style="float: right; cursor: pointer;">
				<ul>
					<li><label><b><u>Distancia en Kilometros</u></b></label></li>
					<div id="separador"></div>
					<li>&nbsp; &nbsp;  0&deg</li>
					<li><input type="text" value="0" id="I8DK0" style="width: 40px" disabled="disabled" /></li>
					<li>180&deg</li>
					<li><input type="text" value="0" id="I8DK180" style="width: 40px" disabled="disabled" /></li>
					<div id="separador"></div>
					<li>&nbsp; 45&deg</li>
					<li><input type="text" value="0" id="I8DK45" style="width: 40px" disabled="disabled" /></li>
					<li>225&deg</li>
					<li><input type="text" value="0" id="I8DK225" style="width: 40px" disabled="disabled" /></li>
					<div id="separador"></div>
					<li>&nbsp; 90&deg</li>
					<li><input type="text" value="0" id="I8DK90" style="width: 40px" disabled="disabled" /></li>
					<li>270&deg</li>
					<li><input type="text" value="0" id="I8DK270" style="width: 40px" disabled="disabled" /></li>
					<div id="separador"></div>
					<li>135&deg</li>
					<li><input type="text" value="0" id="I8DK135" style="width: 40px" disabled="disabled" /></li>
					<li>315&deg</li>
					<li><input type="text" value="0" id="I8DK315" style="width: 40px" disabled="disabled" /></li>
				</ul>
			</div>
			<div id="distanciaKilometro18">
				<img id="closeImageDK18" src="images/close-150192_640.png" width="20" height="20" style="float: right; cursor: pointer;">
				<ul>
					<li><label><b><u>Distancia en Kilometros</u></b></label></li>
					<% for(int ix = 0; ix < 6; ix++) { %>
						<div id="separador"></div>
						<li style="width: 25px;"><%= 0+(20*ix) %>&deg</li>
						<li><input type="text" value="0" id="I18DK<%= 0+(20*ix) %>" style="width: 40px" disabled="disabled" /></li>
						<li style="width: 25px;"><%= 120+(20*ix) %>&deg</li>
						<li><input type="text" value="0" id="I18DK<%= 120+(20*ix) %>" style="width: 40px" disabled="disabled"/></li>
						<li style="width: 25px;"><%= 240+(20*ix) %>&deg</li>
						<li><input type="text" value="0" id="I18DK<%= 240+(20*ix) %>" style="width: 40px" disabled="disabled"/></li>
					<% } %>
				</ul>
			</div>
			<div id="distanciaKilometro72">
				<img id="closeImageDK72" src="images/close-150192_640.png" width="20" height="20" style="float: right; cursor: pointer;">
				<ul>
					<li><label><b><u>Distancia en Kilometros</u></b></label></li>
					<% for(int ix = 0; ix < 12; ix++) { %>
						<div id="separador"></div>
						<li style="width: 25px;"><%= 0+(5*ix) %>&deg</li>
						<li><input type="text" value="0" id="I72DK<%= 0+(5*ix) %>" style="width: 40px" disabled="disabled" /></li>
						<li style="width: 25px;"><%= 60+(5*ix) %>&deg</li>
						<li><input type="text" value="0" id="I72DK<%= 60+(5*ix) %>" style="width: 40px" disabled="disabled"/></li>
						<li style="width: 25px;"><%= 120+(5*ix) %>&deg</li>
						<li><input type="text" value="0" id="I72DK<%= 120+(5*ix) %>" style="width: 40px" disabled="disabled"/></li>
						<li style="width: 25px;"><%= 180+(5*ix) %>&deg</li>
						<li><input type="text" value="0" id="I72DK<%= 180+(5*ix) %>" style="width: 40px" disabled="disabled" /></li>
						<li style="width: 25px;"><%= 240+(5*ix) %>&deg</li>
						<li><input type="text" value="0" id="I72DK<%= 240+(5*ix) %>" style="width: 40px" disabled="disabled"/></li>
						<li style="width: 25px;"><%= 300+(5*ix) %>&deg</li>
						<li><input type="text" value="0" id="I72DK<%= 300+(5*ix) %>" style="width: 40px" disabled="disabled"/></li>
					<% } %>
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
	<div id="info_user" style="display: none;">
		<input type="text" id="id" value='<%=request.getParameter("userId")%>'>
		<input type="text" id="codigo" value='<%=request.getParameter("codigo")%>' text="">
		<input type="text" id="idomicilio" value="" text="">
		<input type="text" id="iemail" value="">
		<input type="text" id="ifono" value="">
		<input type="text" id="inombreRazon" value="">
		<input type="text" id="irutRazon" value=''>
		<input type="text" id="icomuna" value=''>
		<input type="text" id="iregion" value=''>
	</div>
</div>
</body>
</html>
<script src="js/pdf_form.js?v=<%= System.currentTimeMillis() %>">
</script>
<div class="tab">
    <button class="tablinks active" name="subtab" id="tabA">Datos Generales</button>
    <button class="tablinks" name="subtab" id="tabB">Estudio</button>
    <button class="tablinks" name="subtab" id="tabE">Caracter&iacute;sticas del Sistema Radiante</button>
    <button class="tablinks" name="subtab" id="tabF">Arreglos de Antenas</button>
</div>

<div id="divtabA" class="tabcontent" style="display: block">
    <ul id="ul_modificacion" style="display: none;">
        <li>
            <label><b><u>Representante Legal</u></b></label>
        </li>
        <div id="separador" style="height: 1px;"></div>
        <li style="width: 40px; text-align: left">Nombre:</li>
        <li>
            <input type="text" value="" id="nombreRepLegal" />
        </li>
        <li style="width: 40px; text-align: left">RUT:</li>
        <li>
            <input type="text" value="" id="rutRepLegal" />
        </li>
        <div id="separador"></div>
        <li>
            <label><b><u>Resoluci&oacute;n Otorga</u></b></label>
        </li>
        <div id="separador"></div>
        <li style="width: 40px; text-align: left">N&deg:</li>
        <li>
            <input type="text" value="" id="numResOtorga" />
        </li>
        <li style="width: 40px; text-align: left">Fecha:</li>
        <li>
            <input type="text" id="fechaResOtorga" />
        </li>
        <li style="width: 40px; text-align: left">CNTV:</li>
        <li>
            <select id="resOtorgaCNTV">
                <option value="">Seleccione un opci&oacute;n</option>
                <option value="si">S&iacute;</option>
                <option value="no">No</option>
            </select>
        </li>
        <div id="separador"></div>
        <li>
            <label><b><u>Resoluci&oacute;n Modifica</u></b></label>
        </li>
        <div id="separador"></div>
        <li style="width: 40px;">N&deg:</li>
        <li>
            <input type="text" value="" id="numResModifica" />
        </li>
        <li style="width: 40px;">Fecha:</li>
        <li>
            <input type="text" id="fechaResModifica" />
        </li>
        <li style="width: 40px; text-align: left">CNTV:</li>
        <li>
            <select id="resModificaCNTV">
                <option value="">Seleccione un opci&oacute;n</option>
                <option value="si">S&iacute;</option>
                <option value="no">No</option>
            </select>
        </li>
    </ul>
    <ul id="ul_concurso" style="display: none;">
        <li>
            <label>Plazos</label>
        </li>
        <div id="separador"></div>
        <li style="width: 80px;">Inicio de Obras:</li>
        <li>
            <input type="text" value="" id="ini_obras" class="number_input" />
        </li>[d&iacute;as]
        <div id="separador"></div>
        <li style="width: 80px;">T&eacute;rmino de Obras:</li>
        <li>
            <input type="text" value="" id="fin_obras" class="number_input" />
        </li>[d&iacute;as]
        <div id="separador"></div>
        <li style="width: 80px;">Inicio de Servicio:</li>
        <li>
            <input type="text" value="" id="ini_servicio" class="number_input" />
        </li>[d&iacute;as]
        <div id="separador"></div>
        <li>
            <label>Emisi&oacute;n</label>
        </li>
        <div id="separador"></div>
        <li style="width: 80px;">Tipo de Emisi&oacute;n:</li>
        <li>
            <input type="text" value="" id="tipo_emision" />
        </li>
    </ul>
</div>

<div id="divtabB" class="tabcontent">
    <ul>
        <li>
            <label><b><u>Estudio Principal</u></b></label>
        </li>
        <div id="separador" style="height: 1px;"></div>
        <li style="width: 40px; text-align: left">Domicilio:</li>
        <li>
            <input type="text" value="" id="direccionP" />
        </li>
        <li style="width: 40px; text-align: left">Comuna:</li>
        <li>
            <input type="text" value="" id="comunaP" />
        </li>
        <li style="width: 40px; text-align: left">Regi&oacute;n:</li>
        <li>
            <input type="text" value="" id="regionP" />
        </li>
        <div id="separador"></div>
        <li style="width: 60px; text-align: left">Latitud Sur:</li>
        <li>
            <input type="text" style="width: 22px;" id="latGradesP" class="number_input" />
            <span style="font-size: 15px;">&deg</span>
            <input type="text" style="width: 22px;" id="latMinP" class="number_input" />
            <span style="font-size: 15px;">'</span>
            <input type="text" style="width: 22px;" id="latSecP" class="number_input" />
            <span style="font-size: 15px; padding-right: 10px">''</span>
        </li>
        <li style="width: 60px; text-align: left">Longitud Oeste:</li>
        <li>
            <input type="text" style="width: 22px;" id="longGradesP" class="number_input" />
            <span style="font-size: 15px;">&deg</span>
            <input type="text" style="width: 22px;" id="longMinP" class="number_input" />
            <span style="font-size: 15px;">'</span>
            <input type="text" style="width: 22px;" id="longSecP" class="number_input" />
            <span style="font-size: 15px; padding-right: 10px">''</span>
        </li>
        <div id="separador"></div>
        <li>
            <label><b><u>Estudio Alternativo</u></b></label>
        </li>
        <div id="separador" style="height: 1px;"></div>
        <li style="width: 40px; text-align: left">Domicilio:</li>
        <li>
            <input type="text" value="" id="direccionA" />
        </li>
        <li style="width: 40px; text-align: left">Comuna:</li>
        <li>
            <input type="text" value="" id="comunaA" />
        </li>
        <li style="width: 40px; text-align: left">Regi&oacute;n:</li>
        <li>
            <input type="text" value="" id="regionA" />
        </li>
        <div id="separador"></div>
        <li style="width: 60px; text-align: left">Latitud Sur:</li>
        <li>
            <input type="text" style="width: 22px;" id="latGradesA" class="number_input" />
            <span style="font-size: 15px;">&deg</span>
            <input type="text" style="width: 22px;" id="latMinA" class="number_input" />
            <span style="font-size: 15px;">'</span>
            <input type="text" style="width: 22px;" id="latSecA" class="number_input" />
            <span style="font-size: 15px; padding-right: 10px">''</span>
        </li>
        <li style="width: 60px; text-align: left">Longitud Oeste:</li>
        <li>
            <input type="text" style="width: 22px;" id="longGradesA" class="number_input" />
            <span style="font-size: 15px;">&deg</span>
            <input type="text" style="width: 22px;" id="longMinA" class="number_input" />
            <span style="font-size: 15px;">'</span>
            <input type="text" style="width: 22px;" id="longSecA" class="number_input" />
            <span style="font-size: 15px; padding-right: 10px">''</span>
        </li>
    </ul>
</div>

<div id="divtabE" class="tabcontent">
    <ul>
        <li>
            <label><b><u>Sistema Radiante Principal</u></b></label>
        </li>
        <div id="separador" style="height: 1px;"></div>
        <li style="width: 95px; text-align: left">Antena Combinada:</li>
        <li>
            <select id="antCombinada">
                <option value="">Seleccione un opci&oacute;n</option>
                <option value="si">S&iacute;</option>
                <option value="no">No</option>
            </select>
        </li>
        <li style="width: 95px; text-align: left">Tipo de Antena:</li>
        <li>
            <select id="tipoAntena">
                <option value="">Seleccione un opci&oacute;n</option>
                <option value="princ">Panel Dipolos</option>
                <option value="ranura">Ranura</option>
                <option value="supert">Superturnstile</option>
                <option value="yagi">Yagi</option>
                <option value="logP">Log Peri&oacute;dica</option>
                <option value="otro">Otro</option>
            </select>
        </li>
        <li style="width: 95px; text-align: left">N&deg Elementos de Antena:</li>
        <li>
            <input type="text" id="numElem" class="number_input" />
        </li>
        <div id="separador"></div>
        <li style="width: 95px; text-align: left">Ganancia M&aacute;xima (Sin Tilt):</li>
        <li>
            <input type="text" value="" id="gananciaMax" class="number_input" />
        </li>
        <li style="width: 65px; text-align: left">Polarizaci&oacute;n:</li>
        <li>
            Horizontal: <input type="text" value="" id="perc_horizontal" class="number_input" style="width: 30px" /> %
            Vertical: <input type="text" value="" id="perc_vertical" class="number_input" style="width: 30px" /> %
        </li>
        <li style="width: 95px; text-align: left">&Aacute;ngulo de Tilt:</li>
        <li>
            <input type="text" value="" id="anguloTilt" class="number_input" />
        </li>
        <div id="separador"></div>
        <li style="width: 40px; text-align: left">Domicilio:</li>
        <li>
            <input type="text" value="" id="domicilioPTx" />
        </li>
        <li style="width: 40px; text-align: left">Comuna:</li>
        <li>
            <input type="text" value="" id="comunaPTx" />
        </li>
        <li style="width: 40px; text-align: left">Regi&oacute;n:</li>
        <li>
            <input type="text" value="" id="regionPTx" />
        </li>
        <!-- -->
        <div id="div_planta_adicional" style="display: none;">
            <div id="separador"></div>
            <li>
                <label><b><u>Planta Transmisora Adicional</u></b></label>
            </li>
            <div id="separador" style="height: 1px;"></div>
            <li><b><u>Planta Transmisora Adicional 1</u></b></li>
            <div id="separador" style="height: 1px;"></div>
            <li style="width: 40px; text-align: left">Domicilio:</li>
            <li>
                <input type="text" value="" id="direccionPTxAdd1" />
            </li>
            <li style="width: 40px; text-align: left">Comuna:</li>
            <li>
                <input type="text" value="" id="comunaPTxAdd1" />
            </li>
            <li style="width: 40px; text-align: left">Regi&oacute;n:</li>
            <li>
                <input type="text" value="" id="regionPTxAdd1" />
            </li>
            <div id="separador"></div>
            <li style="width: 60px; text-align: left">Latitud Sur:</li>
            <li>
                <input type="text" style="width: 22px;" id="latGradesPTxAdd1" class="number_input" />
                <span style="font-size: 15px;">&deg</span>
                <input type="text" style="width: 22px;" id="latMinPTxAdd1" class="number_input" />
                <span style="font-size: 15px;">'</span>
                <input type="text" style="width: 22px;" id="latSecPTxAdd1" class="number_input" />
                <span style="font-size: 15px; padding-right: 10px;">''</span>
            </li>
            <li style="width: 60px; text-align: left">Longitud Oeste:</li>
            <li>
                <input type="text" style="width: 22px;" id="longGradesPTxAdd1" class="number_input" />
                <span style="font-size: 15px;">&deg</span>
                <input type="text" style="width: 22px;" id="longMinPTxAdd1" class="number_input" />
                <span style="font-size: 15px;">'</span>
                <input type="text" style="width: 22px;" id="longSecPTxAdd1" class="number_input" />
                <span style="font-size: 15px; padding-right: 10px;">''</span>
            </li> class="number_input"
            <div id="separador" style="height: 1px;"></div>
            <li><b><u>Planta Transmisora Adicional 2</u></b></li>
            <div id="separador" style="height: 1px;"></div>
            <li style="width: 40px; text-align: left">Domicilio:</li>
            <li>
                <input type="text" value="" id="direccionPTxAdd2" />
            </li>
            <li style="width: 40px; text-align: left">Comuna:</li>
            <li>
                <input type="text" value="" id="comunaPTxAdd2" />
            </li>
            <li style="width: 40px; text-align: left">Regi&oacute;n:</li>
            <li>
                <input type="text" value="" id="regionPTxAdd2" />
            </li>
            <div id="separador"></div>
            <li style="width: 40px; text-align: left">Latitud Sur:</li>
            <li>
                <input type="text" style="width: 22px;" id="latGradesPTxAdd2" class="number_input" />
                <span style="font-size: 15px;">&deg</span>
                <input type="text" style="width: 22px;" id="latMinPTxAdd2" class="number_input" />
                <span style="font-size: 15px;">'</span>
                <input type="text" style="width: 22px;" id="latSecPTxAdd2" class="number_input" />
                <span style="font-size: 15px;">''</span>
            </li>
            <li style="width: 40px; text-align: left">Longitud Oeste:</li>
            <li>
                <input type="text" style="width: 22px;" id="longGradesPTxAdd2" class="number_input" />
                <span style="font-size: 15px;">&deg</span>
                <input type="text" style="width: 22px;" id="longMinPTxAdd2" class="number_input" />
                <span style="font-size: 15px;">'</span>
                <input type="text" style="width: 22px;" id="longSecPTxAdd2" class="number_input" />
                <span style="font-size: 15px;">''</span>
            </li>
        </div>
    </ul>
</div>
<div id="divtabF" class="tabcontent">
    <table id="example" class="cell-border">
        <thead>
            <tr style="font-size: 11px; width: 11111111px;">
                <th>N&deg</th>
                <th>Altura [m]</th>
                <th>Largo V&aacute;stago [cm]</th>
                <th>Azimut V&aacute;stago [&deg]</th>
                <th>Azimut Antena [&deg]</th>
                <th>Ganancia Antena [dBd]</th>
                <th>Polarizaci&oacute;n</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Fase [&deg]</th>
                <th>% Potencia</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>
<br>
<br>
<div class="buttons">
    <button type="button" id="saveFormPDF">Aceptar</button>
    <button type="button" id="closeFrom">Cancelar</button>
</div>
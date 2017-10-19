
$(document).ready(function() {
    $("#upload18").on('click', function(event) {
        event.preventDefault();
        $("#file18:hidden").trigger('click');
    });

    $("#upload72").on('click', function(event) {
        event.preventDefault();
        $("#file72:hidden").trigger('click');
    });

    $("#file18").change(function(event) {
        var file_extension = $("input#file18").val().split(".").pop().toLowerCase();
        rellenarPerdidasLobulo(event, file_extension, 'I18PL', 'file18');
    });

    $("#file72").change(function(event) {
        var file_extension = $("input#file72").val().split(".").pop().toLowerCase();
        rellenarPerdidasLobulo(event, file_extension, 'I72PL', 'file72');
    });
});

function getDataNube(data) {
    showLoader(false, '');
    var fields = data.value.features;
    var csv_data = ["angulo", "distancia", "Z"];
    var dataString = [];

    fields.forEach(function(value, index) {
        var value_Z = value.attributes.Z.toString().replace(".", ",");
        angulo = value.attributes.angulo === 0 ? 0.0 : value.attributes.angulo;
        distancia = value.attributes.distancia === 0 ? 0.0 : value.attributes.distancia;
        dataString.push({
            "angulo": angulo,
            "distancia": distancia,
            "Z": value_Z
        });
    });

    var filename = prompt("Ingrese Nombre del archivo", "");
    if(filename != "") {
        downloadCSV(dataString, filename);
    } else {
        console.log("empty");
    }
    
}

function convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ';';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);
    result = 'sep=' + columnDelimiter;
    result += lineDelimiter;
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

function downloadCSV(stockData, filename) {
    var data, filename, link;
    var csv = convertArrayOfObjectsToCSV({
        data: stockData
    });

    if (csv == null) return;

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }

    data = encodeURI(csv);
    var encodedUri = encodeURI(csv);
    var downloadLink = document.createElement("a");
    downloadLink.href = encodedUri;

    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    month = month > 9 ? month : '0'+month; 
    var day = date.getDate();
    day = day > 9 ? day : '0'+day; 
    downloadLink.download = filename+".csv";//"Export_Output_" + year+month+day+hour+min + ".csv";

    showLoader(false, '');
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function rellenarPerdidasLobulo(event, file_extension, tabla_perdidas, input_file) {
    if (event.target.files != undefined) {
        var fileInput = document.getElementById(input_file)
        var fileReader = new FileReader();
        var file = fileInput.files[0];

        if (file_extension == 'xlsx') {
            rellenarPerdidasLobuloByXLSX(file, fileReader, tabla_perdidas);
        } else if (file_extension == 'csv') {
            rellenarPerdidasLobuloByCSV(file, fileReader, tabla_perdidas);
        }
    } else {
        console.log("Error obteniendo archivo");
    }
}

function rellenarPerdidasLobuloByXLSX(file, fileReader, tabla_perdidas) {
    fileReader.onload = function(e) {
        var binary = "";
        var bytes = new Uint8Array(e.target.result);
        var length = bytes.byteLength;

        for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        var woorkbook = XLSX.read(binary, {
            type: 'binary',
            cellDates: true,
            cellStyles: true
        });

        woorkbook.SheetNames.forEach(function(sheetName) {
            var xlsx_row_object = XLSX.utils.sheet_to_row_object_array(woorkbook.Sheets[sheetName]);
            xlsx_row_object.forEach(function(row) {
                if (!$.isNumeric(row["P Lóbulo"])) {
                    alert("El valor de P. Lóbulo en el Az°: " + row["Az°"] + " no es un valor numérico.");
                    throw BreakException;
                } else {
                    $("#" + tabla_perdidas + row["Az°"]).val(row["P Lóbulo"]);
                }
            });

            var json_object = JSON.stringify(xlsx_row_object);
        });
    };

    fileReader.readAsArrayBuffer(file);
}

function rellenarPerdidasLobuloByCSV(file, fileReader, tabla_perdidas) {
    fileReader.onload = function() {
        var csv_data = fileReader.result.split("\n");

        csv_data.forEach(function(row) {
            row_data = row.split(";");
            if (!$.isNumeric(row_data[1])) {
                alert("El valor de P. Lóbulo en el Az°: " + row_data[0] + " no es un valor numérico.");
                throw BreakException;
            } else {
                $("#" + tabla_perdidas + row_data[0]).val(row_data[1]);
            }
        });
    };
    fileReader.readAsBinaryString(file);
}

 function getPDFFile() {
    var mapReporte = getParametersReport();
    var form_pdf_data = getFormData(concursoModificacion);
    var pdfDocGenerator;
    if (concursoModificacion == 'Concurso') {
        pdfDocGenerator = getPDFConcurso(mapReporte, form_pdf_data);
    } else {
        pdfDocGenerator = getPDFModificacion(mapReporte, form_pdf_data);
    }
    return pdfDocGenerator;
}

function getPDFBase64File(kml_base64) {
    var pdfDocGenerator = getPDFFile();
    var pdf_base64_file;
    pdfDocGenerator.getBase64(function(data) {
        pdf_base64_file = data;
        sendBase64Files(kml_base64, data);
    })
}

function sendBase64Files(kml_base64, pdf_base64) {
    var files_names = getFileName($("#identificadores").val(), $("#sistRadiante").val(), $("#intensidadCampoM").val());
    var id_tipo_calculo = getIdTipoCalculo($("#intensidadCampoM").val());
    var json_kml = createJSON(files_names + ".kml", kml_base64, id_tipo_calculo);
    var json_pdf = createJSON(files_names + ".pdf", pdf_base64, id_tipo_calculo);
    data = {
        "usuario_id": parseInt(internal_token),
        "codigo_postulacion": codigo,
        "kml": JSON.stringify(json_kml),
        "pdf": JSON.stringify(json_pdf)
    };
    $.ajax({
        data: data,
        url: "/CalculoTVD/calculoTVD/send_file",
        type: 'POST',
        success: function(response) {
            if (response === "OK") {
                alert("Datos Enviados Correctamente");
            } else {
                alert("Error Enviando Datos: " + response);
            }
        },
        error: function(error) {
            console.log("error");
            console.log(error);
        }
    });
}

function generateBase64Files() {
    var kml_base64 = exportKMZClick(false);
    getPDFBase64File(kml_base64);
}
function getTemplateKML ( datos )  {
	var kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
<Folder>
	<name>${datos.general.localidad}_${datos.general.frecuencia}</name>
	<open>1</open>
	<Document>
		<name>${datos.general.nombre}</name>
		<open>1</open>
		<Style id="s_ylw-pushpin_hl">
			<IconStyle>
				<scale>1.3</scale>
				<Icon>
					<href>http://maps.google.com/mapfiles/kml/shapes/placemark_circle.png</href>
				</Icon>
				<hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
			</IconStyle>
		</Style>
		<Style id="failed00">
			<LineStyle>
				<width>2</width>
			</LineStyle>
			<PolyStyle>
				<fill>0</fill>
			</PolyStyle>
		</Style>
		<Style id="failed1">
			<LineStyle>
				<color>ffc26db0</color>
			</LineStyle>
			<PolyStyle>
				<color>7fffaaff</color>
			</PolyStyle>
		</Style>
		<Style id="s_ylw-pushpin">
			<IconStyle>
				<scale>1.1</scale>
				<Icon>
					<href>http://maps.google.com/mapfiles/kml/shapes/placemark_circle.png</href>
				</Icon>
				<hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
			</IconStyle>
		</Style>
		<Style id="failed0">
			<LineStyle>
				<color>ffc26db0</color>
			</LineStyle>
			<PolyStyle>
				<color>7fffaaff</color>
			</PolyStyle>
		</Style>
		<StyleMap id="m_ylw-pushpin">
			<Pair>
				<key>normal</key>
				<styleUrl>#s_ylw-pushpin0</styleUrl>
			</Pair>
			<Pair>
				<key>highlight</key>
				<styleUrl>#s_ylw-pushpin_hl0</styleUrl>
			</Pair>
		</StyleMap>
		<Style id="sh_ylw-pushpin">
			<LineStyle>
				<color>ff000000</color>
			</LineStyle>
			<PolyStyle>
				<color>ff000000</color>
				<fill>0</fill>
			</PolyStyle>
		</Style>
		<StyleMap id="failed2">
			<Pair>
				<key>normal</key>
				<styleUrl>#failed1</styleUrl>
			</Pair>
			<Pair>
				<key>highlight</key>
				<styleUrl>#failed0</styleUrl>
			</Pair>
		</StyleMap>
		<StyleMap id="m_ylw-pushpin0">
			<Pair>
				<key>normal</key>
				<styleUrl>#s_ylw-pushpin</styleUrl>
			</Pair>
			<Pair>
				<key>highlight</key>
				<styleUrl>#s_ylw-pushpin_hl</styleUrl>
			</Pair>
		</StyleMap>
		<StyleMap id="failed">
			<Pair>
				<key>normal</key>
				<styleUrl>#failed100</styleUrl>
			</Pair>
			<Pair>
				<key>highlight</key>
				<styleUrl>#failed00</styleUrl>
			</Pair>
		</StyleMap>
		<StyleMap id="msn_ylw-pushpin">
			<Pair>
				<key>normal</key>
				<styleUrl>#sn_ylw-pushpin</styleUrl>
			</Pair>
			<Pair>
				<key>highlight</key>
				<styleUrl>#sh_ylw-pushpin</styleUrl>
			</Pair>
		</StyleMap>
		<Style id="failed10">
			<LineStyle>
				<color>7f000000</color>
			</LineStyle>
			<PolyStyle>
				<color>b2000000</color>
			</PolyStyle>
		</Style>
		<Style id="s_ylw-pushpin_hl0">
			<IconStyle>
				<scale>1.3</scale>
				<Icon>
					<href>http://maps.google.com/mapfiles/kml/shapes/placemark_circle.png</href>
				</Icon>
				<hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
			</IconStyle>
		</Style>
		<Style id="s_ylw-pushpin0">
			<IconStyle>
				<scale>1.1</scale>
				<Icon>
					<href>http://maps.google.com/mapfiles/kml/shapes/placemark_circle.png</href>
				</Icon>
				<hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
			</IconStyle>
		</Style>
		<StyleMap id="failed3">
			<Pair>
				<key>normal</key>
				<styleUrl>#failed10</styleUrl>
			</Pair>
			<Pair>
				<key>highlight</key>
				<styleUrl>#failed000</styleUrl>
			</Pair>
		</StyleMap>
		<Style id="failed100">
			<LineStyle>
				<width>2</width>
			</LineStyle>
			<PolyStyle>
				<fill>0</fill>
			</PolyStyle>
		</Style>
		<Style id="sn_ylw-pushpin">
			<LineStyle>
				<color>ff000000</color>
				<width>1.9</width>
			</LineStyle>
			<PolyStyle>
				<color>ff000000</color>
				<fill>0</fill>
			</PolyStyle>
		</Style>
		<Style id="failed000">
			<LineStyle>
				<color>7f000000</color>
			</LineStyle>
			<PolyStyle>
				<color>b2000000</color>
			</PolyStyle>
		</Style>
		<Placemark>
			<name>Zona Digital</name>
			<styleUrl>#failed2</styleUrl>
			<Polygon>
				<extrude>1</extrude>
				<gx:drawOrder>4</gx:drawOrder>
				<outerBoundaryIs>
					<LinearRing>
						<coordinates>
							${datos.poligonos.zonaServicio}
						</coordinates>
					</LinearRing>
				</outerBoundaryIs>
			</Polygon>
		</Placemark>`;

kml += getKMLelements(datos);

kml += `</Document>
</Folder>
</kml>`;

return kml;
}

function getKMLelements(datos) {
	var kml_elements = "";
	if (datos.general.concursoModificacion == 'Concurso') {
		kml_elements = kml_elements + getPtxZones(datos) + getMaxZone(datos);
	} else if(datos.general.concursoModificacion == 'Modificacion') {
		kml_elements = kml_elements + getPtxZones(datos) + getServiceZoneRestriction(datos) + getAnalogZonePlus30(datos) + getAnalogZoneMinus30(datos);
	}

	return kml_elements;
} 

function getPtxZones(datos) {
	console.log("generando ptx");
	var ptx_zones = `<Placemark>
			<name>PTx Original</name>
			<LookAt>
				<longitude>${datos.puntos.existente.longitud}</longitude>
				<latitude>${datos.puntos.existente.latitud}</latitude>
				<altitude>0</altitude>
				<heading>-1.368223735090701e-009</heading>
				<tilt>44.99935285717749</tilt>
				<range>123953.7893398549</range>
				<gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode>
			</LookAt>
			<styleUrl>#m_ylw-pushpin</styleUrl>
			<Point>
				<gx:drawOrder>5</gx:drawOrder>
				<coordinates>
					${datos.puntos.existente.longitud},${datos.puntos.existente.latitud},0
				</coordinates>
			</Point>
		</Placemark>
		<Placemark>
			<name>PTx Nueva</name>
			<LookAt>
				<longitude>${datos.puntos.nuevo.longitud}</longitude>
				<latitude>${datos.puntos.nuevo.latitud}</latitude>
				<altitude>0</altitude>
				<heading>-1.368223735090701e-009</heading>
				<tilt>44.99935285717749</tilt>
				<range>123953.7893398549</range>
				<gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode>
			</LookAt>
			<styleUrl>#m_ylw-pushpin0</styleUrl>
			<Point>
				<gx:drawOrder>5</gx:drawOrder>
				<coordinates>${datos.puntos.nuevo.longitud},${datos.puntos.nuevo.latitud},0</coordinates>
			</Point>
		</Placemark>`;

	return ptx_zones;
}

function getServiceZoneRestriction(datos) {
	var restriction_zone = `<Placemark>
			<name>Restriccion 60 km</name>
			<styleUrl>#failed</styleUrl>
			<Polygon>
				<extrude>1</extrude>
				<gx:drawOrder>1</gx:drawOrder>
				<outerBoundaryIs>
					<LinearRing>
						<coordinates>
							${datos.poligonos.zonaRestriccionServicio}
						</coordinates>
					</LinearRing>
				</outerBoundaryIs>
			</Polygon>
		</Placemark>`;

	return restriction_zone;
}

function getAnalogZonePlus30(datos) {
	var analog_zone = `<Placemark>
			<name>Zona Analogica +30%</name>
			<styleUrl>#msn_ylw-pushpin</styleUrl>
			<Polygon>
				<extrude>1</extrude>
				<gx:drawOrder>3</gx:drawOrder>
				<outerBoundaryIs>
					<LinearRing>
						<coordinates>
							${datos.poligonos.zonaMaximaExistenteExtendida}
						</coordinates>
					</LinearRing>
				</outerBoundaryIs>
			</Polygon>
		</Placemark>`;

	return analog_zone;
}

function getAnalogZoneMinus30(datos) {
	var analog_zone = `<Placemark>
			<name>Zona Analogica -30%</name>
			<styleUrl>#failed3</styleUrl>
			<Polygon>
				<extrude>1</extrude>
				<gx:drawOrder>3</gx:drawOrder>
				<outerBoundaryIs>
					<LinearRing>
						<coordinates>
							${datos.poligonos.zonaMaximaExistente}
						</coordinates>
					</LinearRing>
				</outerBoundaryIs>
			</Polygon>
		</Placemark>`;

	return analog_zone;
}

function getMaxZone(datos) {
	var max_zone = `<Placemark>
			<name>Zona Maxima</name>
			<styleUrl>#failed3</styleUrl>
			<Polygon>
				<extrude>1</extrude>
				<gx:drawOrder>3</gx:drawOrder>
				<outerBoundaryIs>
					<LinearRing>
						<coordinates>
							${datos.poligonos.zonaMaxima}
						</coordinates>
					</LinearRing>
				</outerBoundaryIs>
			</Polygon>
		</Placemark>`;

	return max_zone;
}
function getTemplateKML ( datos )  {
console.log(datos);
console.log(datos.general.localidad);
	return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
<Folder>
	<name>Caldera_575</name>
	<open>1</open>
	<Document>
		<name>CalculoZonaServicio</name>
		<open>1</open>
		<Style id="s_ylw-pushpin_hl">
			<IconStyle>
				<scale>1.3</scale>
				<Icon>
					<href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
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
				<color>ffffaaff</color>
			</PolyStyle>
		</Style>
		<Style id="s_ylw-pushpin">
			<IconStyle>
				<scale>1.1</scale>
				<Icon>
					<href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
				</Icon>
				<hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
			</IconStyle>
		</Style>
		<Style id="failed0">
			<LineStyle>
				<color>ffc26db0</color>
			</LineStyle>
			<PolyStyle>
				<color>ffffaaff</color>
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
				<color>00000000</color>
			</LineStyle>
			<PolyStyle>
				<color>00000000</color>
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
				<color>ff000000</color>
			</PolyStyle>
		</Style>
		<Style id="s_ylw-pushpin_hl0">
			<IconStyle>
				<scale>1.3</scale>
				<Icon>
					<href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
				</Icon>
				<hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
			</IconStyle>
		</Style>
		<Style id="s_ylw-pushpin0">
			<IconStyle>
				<scale>1.1</scale>
				<Icon>
					<href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
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
				<color>00000000</color>
			</LineStyle>
			<PolyStyle>
				<color>00000000</color>
				<fill>0</fill>
			</PolyStyle>
		</Style>
		<Style id="failed000">
			<LineStyle>
				<color>7f000000</color>
			</LineStyle>
			<PolyStyle>
				<color>ff000000</color>
			</PolyStyle>
		</Style>
		<Placemark>
			<name>Restriccion Zona de Servicio</name>
			<styleUrl>#failed</styleUrl>
			<Polygon>
				<extrude>1</extrude>
				<gx:drawOrder>1</gx:drawOrder>
				<outerBoundaryIs>
					<LinearRing>
						<coordinates>
							${datos.poligonos.zonaMaximaServicio}
						</coordinates>
					</LinearRing>
				</outerBoundaryIs>
			</Polygon>
		</Placemark>
		<Placemark>
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
		</Placemark>
		<Placemark>
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
		</Placemark>
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
		</Placemark>
		<Placemark>
			<name>PTx Zona Analogica</name>
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
			<name>PTx Zona Digital</name>
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
		</Placemark>
	</Document>
</Folder>
</kml>`;

}

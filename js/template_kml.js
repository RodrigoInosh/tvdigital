function getTemplateKML (coordenadasZonaMaximaServicio, coordenadasZonaServicio, longitud, latitud) {
	return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
<Document>
	<name>El pentágono.kml</name>
	<open>1</open>
	<Style id="failed1">
		<LineStyle>
			<color>ffc26db0</color>
		</LineStyle>
		<PolyStyle>
			<color>7fffaaff</color>
		</PolyStyle>
	</Style>
	<Style id="failed0">
		<LineStyle>
			<color>ffc26db0</color>
		</LineStyle>
		<PolyStyle>
			<color>7fffaaff</color>
		</PolyStyle>
	</Style>
	<Style id="failed10">
		<LineStyle>
			<color>ffc26db0</color>
		</LineStyle>
		<PolyStyle>
			<color>7f000000</color>
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
	<Style id="s_ylw-pushpin_hl">
		<IconStyle>
			<scale>1.3</scale>
			<Icon>
				<href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href>
			</Icon>
			<hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/>
		</IconStyle>
	</Style>
	<StyleMap id="failed">
		<Pair>
			<key>normal</key>
			<styleUrl>#failed10</styleUrl>
		</Pair>
		<Pair>
			<key>highlight</key>
			<styleUrl>#failed00</styleUrl>
		</Pair>
	</StyleMap>
	<Style id="failed00">
		<LineStyle>
			<color>ffc26db0</color>
		</LineStyle>
		<PolyStyle>
			<color>7f000000</color>
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
	<StyleMap id="m_ylw-pushpin">
		<Pair>
			<key>normal</key>
			<styleUrl>#s_ylw-pushpin</styleUrl>
		</Pair>
		<Pair>
			<key>highlight</key>
			<styleUrl>#s_ylw-pushpin_hl</styleUrl>
		</Pair>
	</StyleMap>
	<Placemark>
		<name>ZonaMaxima</name>
		<styleUrl>#failed</styleUrl>
		<Polygon>
			<extrude>1</extrude>
			<gx:drawOrder>1</gx:drawOrder>
			<outerBoundaryIs>
				<LinearRing>
					<coordinates>
						${coordenadasZonaMaximaServicio}
					</coordinates>
				</LinearRing>
			</outerBoundaryIs>
		</Polygon>
	</Placemark>
	<Placemark>
		<name>ZonaServicio</name>
		<styleUrl>#failed2</styleUrl>
		<Polygon>
			<extrude>1</extrude>
			<gx:drawOrder>2</gx:drawOrder>
			<outerBoundaryIs>
				<LinearRing>
					<coordinates>
						${coordenadasZonaServicio}
					</coordinates>
				</LinearRing>
			</outerBoundaryIs>
		</Polygon>
	</Placemark>
	<Placemark>
		<name>Planta</name>
		<LookAt>
			<longitude>${longitud}</longitude>
			<latitude>${latitud}</latitude>
			<altitude>0</altitude>
			<heading>-1.368223735090701e-009</heading>
			<tilt>44.99935285717749</tilt>
			<range>123953.7893398549</range>
			<gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode>
		</LookAt>
		<styleUrl>#m_ylw-pushpin</styleUrl>
		<Point>
			<gx:drawOrder>1</gx:drawOrder>
			<coordinates>${longitud},${latitud},0</coordinates>
		</Point>
	</Placemark>
</Document>
</kml>`;

}
var identificador_lista_concursos = null;
var identificador_modif = null;
var identificar_zonas_modif1 = null;
var identificar_zonas_modif2 = null;

class Identificadores {
	constructor (identif_lista_concurso, identif_modificacion, identificar_zonas_modif1, identificar_zonas_modif2) {
		this.identificador_lista_concursos = identif_lista_concurso;
		this.identificador_modif = identif_modificacion;
		this.identificar_zonas_modif1 = identificar_zonas_modif1;
		this.identificar_zonas_modif2 = identificar_zonas_modif2;
	}

	setIdentificarZonasModif1(identificar_zonas_modif1) {
		this.identificar_zonas_modif1 = identificar_zonas_modif1;
	}

	setIdentificarZonasModif2(identificar_zonas_modif2) {
		this.identificar_zonas_modif2 = identificar_zonas_modif2;
	}
}
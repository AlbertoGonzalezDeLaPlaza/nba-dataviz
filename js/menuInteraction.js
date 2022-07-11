/**
 * Funcion que se ejecuta cuando se selecciona un equipo.
 * Cambia los dos graficos para realizarlo con los datos correspondientes al equipo seleccionado.
 * Cambia el titulo del recuadro superior donde se encuentra el nombre del equipo seleccionado y
 * cambia el fondo con el color principal y secundario del equipo seleccionado.
 *
 * @param {*} team: Equipo seleccionado
 */
function selectTeam(team) {
  // objeto con los colores principales de los equipos
  var color_principal = {
    BOS: "green",
    BRK: "black",
    NYK: "#FF8C00",
    PHI: "#306EFF",
    TOR: "black",
    CHI: "red",
    CLE: "#931314",
    DET: "red",
    IND: "#123456",
    MIL: "#667C26",
    ATL: "red",
    CHO: "#5dc1b9",
    MIA: "#F535AA",
    ORL: "blue",
    WAS: "red",
    DEN: "#151B54",
    MIN: "#00008B",
    OKC: "#3BB9FF",
    POR: "black",
    UTA: "#FF8C00",
    GSW: "#306EFF",
    LAC: "#306EFF",
    LAL: "purple",
    PHO: "#FF5F1F",
    SAC: "#6A5ACD",
    DAL: "#306EFF",
    HOU: "red",
    MEM: "#000080",
    NOP: "#151B54",
    SAS: "#504A4B",
  };
  // objeto con los colores secundarios de los equipos
  var color_secundario = {
    BOS: "grey",
    BRK: "#BCC6CC",
    NYK: "#6495ED",
    PHI: "red",
    TOR: "red",
    CHI: "black",
    CLE: "#123456",
    DET: "blue",
    IND: "yellow",
    MIL: "#FFFFCC",
    ATL: "yellow",
    CHO: "blue",
    MIA: "#0AFFFF",
    ORL: "black",
    WAS: "#00008B",
    DEN: "#F6BE00",
    MIN: "#52D017",
    OKC: "#FF8C00",
    POR: "red",
    UTA: "#FF4500",
    GSW: "yellow",
    LAC: "red",
    LAL: "#FFD700",
    PHO: "purple",
    SAC: "grey",
    DAL: "#4E5180",
    HOU: "#D1D0CE",
    MEM: "#82CAFF",
    NOP: "#FFF380",
    SAS: "black",
  };

  teamSelectedShortName = team.alt;
  TEAM_SELECTED = team.alt;
  teamSelectedCompleteName = team.title;
  // Cambia el nombre del equipo seleccionado donde el recuadro donde aparece el equipo seleccionado
  document.getElementById("teamSelectedNameText").innerHTML =
    teamSelectedCompleteName;
  // Cambia el color del recuadro poniendo el color principal y secundario del equipo seleccionado
  var dom = document.getElementById("teamSelectedName");
  dom.style.backgroundImage =
    "linear-gradient(" +
    "110deg" +
    ", " +
    color_principal[teamSelectedShortName] +
    " 70%" +
    ", " +
    "white" +
    ", " +
    color_secundario[teamSelectedShortName] +
    ")";

  refresh_charts();
}
/**
 * Funcion que se ejecuta cuando se selecciona la temporada 2019-2020
 * Pone en blanco el boton de la temporada 2019-2020  y en azul el de la temporada 2020-21
 * Actualiza los graficos con los datos de la temporada 2019-2020
 *
 */
function selectSeason2019_20() {
  SEASON_SELECTED = 2019;
  // boton de la temporada seleccionada: letras azules, fondo blanco
  var SeasonSelected = document.getElementById("season_2019_20");
  SeasonSelected.style.backgroundColor = "rgb(73, 176, 216) ";
  SeasonSelected.style.color = "white";
  // boton de la temporada no seleccionada: letras blancas, fondo azul
  var SeasonNotSelected = document.getElementById("season_2020_21");
  SeasonNotSelected.style.backgroundColor = "white";
  SeasonNotSelected.style.color = "rgb(73, 176, 216)";
  // Actualiza los graficos
  refresh_charts();
}

/**
 * Funcion que se ejecuta cuando se selecciona la temporada 2020-2021
 * Pone en blanco el boton de la temporada 2020-2021  y en azul el de la temporada 2019-20
 * Actualiza los graficos con los datos de la temporada 2020-2021
 *
 */
function selectSeason2020_21() {
  SEASON_SELECTED = 2020;
  // boton de la temporada seleccionada: letras azules, fondo blanco
  var SeasonSelected = document.getElementById("season_2020_21");
  SeasonSelected.style.backgroundColor = "rgb(73, 176, 216) ";
  SeasonSelected.style.color = "white";
  // boton de la temporada no seleccionada: letras blancas, fondo azul
  var SeasonNotSelected = document.getElementById("season_2019_20");
  SeasonNotSelected.style.backgroundColor = "white";
  SeasonNotSelected.style.color = "rgb(73, 176, 216)";
  // Actualiza los graficos
  refresh_charts();
}


SEASON_SELECTED = 2019;
TEAM_SELECTED = "BOS";
data_donut = {
  2019: "./cleanedData/datos_donut_2019_20.csv",
  2020: "./cleanedData/datos_donut_2020_21.csv",
};
data_heatmap = {
  2019: "./cleanedData/datos_heatmap_2019_20.csv",
  2020: "./cleanedData/datos_heatmap_2020_21.csv",
};
/**
 * Al iniciar el equipo seleccionado serán los Boston Celtics y la temporada la 2019.
 * Crea el heatmap y el donutchart de este equipo y de esta temporada.
 */
function start() {
  SEASON_SELECTED = 2019;
  TEAM_SELECTED = "BOS";
  refresh_charts();
}

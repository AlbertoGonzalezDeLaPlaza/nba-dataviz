/**
 * Actualiza con los datos actualizados los dos graficos
 */
function refresh_charts() {
  refresh_donut();
  refresh_heatmap();
}

/**
 * Actualiza el grafico del donut con la temporada y equipo seleccionado
 */
function refresh_donut() {
  // leemos los datos de la temporada seleccionada
  d3.csv(data_donut[SEASON_SELECTED].toString()).then(function (data) {
    data.forEach(function (d) {
      // indicamos que la variable G (partidos ganados) y P (partidos perdidos) son numericas
      d.G = +d.G;
      d.P = +d.P;
    });
    // Seleccionamos solo los datos del equipo seleccionado
    datos = data.filter(function (d) {
      return d.Tm == TEAM_SELECTED;
    });

    // Selecciono solo los campos(columnas del dataset) G y P del objeto
    var data_donutChart = datos.map(function (d) {
      return { G: d.G, P: d.P };
    });
    // llamo a la funcion que crea el donut y le paso los datos seleccionados
    Donut(data_donutChart);
  });
}

/**
 * Actualiza el grafico del heatmap con la temporada y equipo seleccionado
 */
function refresh_heatmap() {
  // leemos los datos de la temporada seleccionada
  d3.csv(data_heatmap[SEASON_SELECTED]).then(function (data) {
    data.forEach(function (d) {
      d.MP = +d.MP;
      d.FG = +d.FG;
      d.FGP = +d.FGP;
      d.X3P = +d.X3P;
      d.X3PP = +d.X3PP;
      d.FTP = +d.FTP;
      d.AST = +d.AST;
      d.ORB = +d.ORB;
      d.DRB = +d.DRB;
      d.STL = +d.STL;
      d.BLK = +d.BLK;
    });

    // filtramos los datos solo de los jugadores del equipo seleccionado
    datos = data.filter(function (d) {
      return d.Tm == TEAM_SELECTED;
    });
    // los ordeno por minutos de manera decreciente
    datos = datos.sort(function (a, b) {
      return -a.MP - -b.MP;
    });
    // escojo solo los 10 jugadores con mas minutos
    datos = datos.filter(function (d, i) {
      return i < 10;
    });
    // selecciono los valores minimos de cada variable (calculados previamente en R)
    minValues = data.filter(function (d) {
      return (
        (d.Tm == "MINIMUM") & (d.Pos == "MINIMUM") & (d.Player == "MINIMUM")
      );
    });
    // selecciono solo los campos de los cuales van a tener una columna en el heatmap
    var min_heatmap = minValues.map(function (d) {
      return {
        FG: d.FG,
        FGP: d.FGP,
        X3P: d.X3P,
        X3PP: d.X3PP,
        FTP: d.FTP,
        AST: d.AST,
        ORB: d.ORB,
        DRB: d.DRB,
        STL: d.STL,
        BLK: d.BLK,
      };
    });

    // selecciono los valores maximos de cada variable (calculados previamente en R)
    maxValues = data.filter(function (d) {
      return (
        (d.Tm == "MAXIMUM") & (d.Pos == "MAXIMUM") & (d.Player == "MAXIMUM")
      );
    });
    // selecciono solo los campos de los cuales van a tener una columna en el heatmap
    var max_heatmap = maxValues.map(function (d) {
      return {
        FG: d.FG,
        FGP: d.FGP,
        X3P: d.X3P,
        X3PP: d.X3PP,
        FTP: d.FTP,
        AST: d.AST,
        ORB: d.ORB,
        DRB: d.DRB,
        STL: d.STL,
        BLK: d.BLK,
      };
    });

    // selecciono el nombre de las filas(nombre de los jugadores)
    var names = datos.map(function (d) {
      return d.Player;
    });

    // selecciono los campos (columnas del dataset), seran los datos que se mostraran en el heatmap,
    // cada campo sera una columna del heatmap
    var data_heatmap = datos.map(function (d) {
      return {
        FG: d.FG,
        FGP: d.FGP,
        X3P: d.X3P,
        X3PP: d.X3PP,
        FTP: d.FTP,
        AST: d.AST,
        ORB: d.ORB,
        DRB: d.DRB,
        STL: d.STL,
        BLK: d.BLK,
      };
    });
    // selecciono la informacion adicional que aparecera en el tooltip cuando
    //  selecciones en el nombre de un jugador (Posicion y minutos por partido)
    var additionalData = datos.map(function (d) {
      return {
        POS: d.Pos,
        MP: d.MP,
      };
    });
    // Transformo en un array de arrays (una matriz) los datos seleccionados y filtrados
    var data_heatmap = data_heatmap.map(Object.values);
    //Transformo en un array los valores minimos
    var min_heatmap = min_heatmap.map(Object.values)[0];
    // Transformo en un array los valores maximos
    var max_heatmap = max_heatmap.map(Object.values)[0];

    // Nombre de las columnas
    var colnames = [
      "FG",
      "FGP",
      "X3P",
      "X3PP",
      "FTP",
      "AST",
      "ORB",
      "DRB",
      "STL",
      "BLK",
    ];
    // Nombre completo de las columnas
    var colnamesComplete = [
      "Tiros de Campo Anotados",
      "Tiros de Campo(%)",
      "Triples Anotados",
      "Triples(%)",
      "Tiros Libres(%)",
      "Asistencias",
      "Rebotes Ofensivos",
      "Rebotes Defensivos",
      "Robos",
      "Tapones",
    ];

    // Dibujo el heatmap con los datos seleccionados y filtrados.
    Heatmap(
      data_heatmap,
      names,
      colnames,
      colnamesComplete,
      additionalData,
      min_heatmap,
      max_heatmap
    );
  });
}

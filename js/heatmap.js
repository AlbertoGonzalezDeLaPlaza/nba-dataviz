/**
 * Funcion que recibe un array de arrays( matriz de datos) y representa un heatmap.
 * Cada subarray representa los datos de una fila(de un jugador)
 *
 * @param {*} data : matriz de datos en la que en las filas son individuos (jugadores de baloncesto)  y
 *                   en columnas son las estadisticas que se han elegido representar
 * @param {*} rownames : nombre de las filas (nombre de los jugadores del heatmap)
 * @param {*} colnames : nombre corto de las columnas (estadisticas que se van a representar)
 * @param {*} colnamesComplete : nombre completo de las columnas (se representara en el tooltip)
 * @param {*} additionalData : informacion adicional que aparecera en el tooltip cuando
 *                              selecciones en el nombre de un jugador (Posicion y minutos por partido)
 * @param {*} minValue : array con los valores minimos de cada variable
 * @param {*} maxValue : array con los valores maximos de cada variable
 */
function Heatmap(
  data,
  rownames,
  colnames,
  colnamesComplete,
  additionalData,
  minValue,
  maxValue
) {
  // Declaro el tooltip con el tamaño deseado y en que div se encuentra el heatmap
  tooltipHeatmap = d3
    .select("#heatmap_grafico")
    .append("div")
    .style("width", "90px")
    .style("height", "66px")
    .style("opacity", "0.9")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("font-weight","bold")
    .style("box-shadow", "0px 0px 6px #7861A5")
    .style("border","1px solid black")
    .style("padding", "10px");
  toolval = tooltipHeatmap.append("div");
  // Declaro el nombre completo de las posiciones de jugadores de baloncesto(aparecera en el toooltip)
  var positionComplete = {
    SG: "Escolta",
    SF: "Alero",
    PG: "Base",
    C: "Pivot",
    PF: "Ala-Pivot",
  };
  // Declaro en que div estara el heatmap y el tamaño que tendra
  var ele = document.getElementById("heatmap_grafico");
  var width = ele.offsetWidth / 1.5;
  var height = ele.offsetHeight / 1.2;
  // Declaro los margenes
  const margin = { top: 50, right: 50, bottom: 60, left: 200 },
    container = "#heatmap_grafico";

  const numrows = data.length;
  const numcols = data[0].length;

  // Elimino el grafico que hubiera previamente para que no se me solapen diferentes heatmaps
  // cuando selecciono otro equipo o otra temporada
  d3.select(container).select("svg").remove();
  // Creo el SVG container con los tamaños deseados
  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Añade background al SVG
  const background = svg
    .append("rect")
    .style("stroke", "black")
    .attr("width", width)
    .attr("height", height);

  // Construyo las escalas utilizadas
  var x = d3.scaleBand().domain(d3.range(numrows)).range([0, width]);
  var y = d3.scaleBand().domain(d3.range(numcols)).range([0, height]);

  /*
   * Creo un array de paletas de colores, cada elemento es una paleta de color utilizada para cada variable en concreto
   *
   * Es una paleta Verde-Amarilla-Rojo en la que el mayor valor de cada variable representa el color verde y el menor valor el color rojo
   * valores intermedios se representan con color amarillo.
   */
  colorMapVector = [];
  for (var i = 0; i < 10; i++) {
    colorMapVector[i] = d3
      .scaleSequential()
      .domain([minValue[i], maxValue[i]])
      .interpolator(d3.interpolateRdYlGn);
  }

  // Genera las filas y columnas del heatmap
  const row = svg
    .selectAll(".row")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "row")
    .attr("transform", function (d, i) {
      return "translate(0," + y(i) + ")";
    });

  const cell = row
    .selectAll(".cell")
    .data(function (d) {
      return d;
    })
    .enter()
    .append("g")
    .attr("class", "cell")
    .attr("transform", function (d, i) {
      return "translate(" + x(i) + ", 0)";
    });

  cell
    .append("rect")
    // Tamaño de cada rectangulo del heatmap
    .attr("width", x.bandwidth() - 0.3)
    .attr("height", y.bandwidth() - 0.3)
    .attr("id", function (d, i) {
      return i;
    })

    .on("mouseover", function (d, i) {
      // Interactividad: Pone un borde blanco en el rectangulo para que haga el efecto de resaltar
      //el cuadrado en el cual situamos encima el raton
      d3.select(this).style("stroke", "white").style("stroke-width", "5px");
    })
    .on("mousemove", function (event, d, i) {
      // Cuando movemos el raton por encima de un rectangulo hace aparecer el tooltip con el nombre completo de la columna
      // y con el valor de la celda en la cual tenemos el raton encima
      tooltipHeatmap
        .style("visibility", "visible")
        .style("width", "90px")
        .style("top", event.pageY - 30 + "px")
        .style("left", event.pageX + 20 + "px")
        // Mismo color que el rectangulo donde tenemos situado el raton
        .style("background", colorMapVector[event.target.id](d));
      // Ponemos el texto que deseamos que aparezca en el tooltip
      tooltipHeatmap
        .select("div")
        .html(
          "<strong>" +
            colnamesComplete[event.target.id] +
            ": </strong><br/> " +
            +(+d).toFixed(2)
        );
    })
    .on("mouseout", function () {
      // Cuando quitamos el raton del heatmap hacemos desaparecer el borde blanco y quitamos el tooltip
      d3.select(this).style("stroke", "none");
      tooltipHeatmap.style("visibility", "hidden");
    });

  // Damos cada valor a cada rectangulo y le ponemos un color segun que columna sea
  //  y que valor tenga (utilizamos la paleta i siendo i la columna de ese rectangulo en concreto).
  row
    .selectAll(".cell")
    .data(function (d, i) {
      return data[i];
    })
    .style("fill", function (d, i) {
      return colorMapVector[i](d);
    });

  // Ponemos las etiquetas al heatmap
  const labels = svg.append("g").attr("class", "labels");
  // Etiquetas en las columnas (nombre de las estadisticas medidas)
  const columnLabels = labels
    .selectAll(".column-label")
    .data(colnames)
    .enter()
    .append("g")
    .attr("class", "column-label")
    .attr("id", function (d, i) {
      return i;
    })
    .attr("transform", function (d, i) {
      return "translate(" + x(i) + "," + height + ")";
    });

  // Añadimos un pequeño tick (linea que une el ultimo rectangulo con el nombre de la fila)
  columnLabels
    .append("line")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .attr("x1", x.bandwidth() / 2)
    .attr("x2", x.bandwidth() / 2)
    .attr("y1", 0)
    .attr("y2", 7);

  columnLabels
    .append("text")
    .attr("x", 0)
    .attr("y", y.bandwidth() / 2)
    .attr("dy", ".82em")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-60)")
    .text(function (d, i) {
      return d;
    })
    .attr("id", function (d, i) {
      return i;
    })
    .on("mousemove", function (event, d) {
      // Cuando se situa el raton encima de el nombre de una columna aparece un tooltip con el nombre
      // completo de la variable
      tooltipHeatmap
        .style("visibility", "visible")
        .style("background", "white")
        .style("width", "90px")
        .style("top", event.pageY - 30 + "px")
        .style("left", event.pageX + 20 + "px");

      tooltipHeatmap
        .select("div")
        .html(
          "<strong>" + colnamesComplete[event.target.id] + "</strong><br/> " + d
        );
    })
    .on("mouseout", function () {
      // Cuando quitamos el raton del nombre de una columna desaparece el tooltip
      tooltipHeatmap.style("visibility", "hidden");
    });

  // Etiquetas en las filas (nombre de los jugadores)
  const rowLabels = labels
    .selectAll(".row-label")
    .data(rownames)
    .enter()
    .append("g")
    .attr("class", "row-label")
    .attr("transform", function (d, i) {
      return "translate(" + 0 + "," + y(i) + ")";
    });
  // Añadimos un pequeño tick
  rowLabels
    .append("line")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .attr("x1", 0)
    .attr("x2", -5)
    .attr("y1", y.bandwidth() / 2)
    .attr("y2", y.bandwidth() / 2);

  rowLabels
    .append("text")
    .attr("x", -8)
    .attr("y", y.bandwidth() / 2)
    .attr("dy", ".32em")
    .attr("text-anchor", "end")
    .text(function (d, i) {
      return d;
    })
    .attr("id", function (d, i) {
      return i;
    })
    .on("mousemove", function (event, d) {
      // Cuando se situa el raton encima de el nombre de un jugador aparece un tooltip con la posicion
      // del jugador y con los minutos
      tooltipHeatmap
        .style("visibility", "visible")
        .style("background", "white")
        .style("width", "120px")
        .style("top", event.pageY - 30 + "px")
        .style("left", event.pageX + 20 + "px");

      tooltipHeatmap
        .select("div")
        .html(
          "<strong>" +
            positionComplete[additionalData[event.target.id].POS] +
            " (" +
            additionalData[event.target.id].POS +
            ") <br><br>  Minutos: " +
            additionalData[event.target.id].MP +
            "</strong><br/>"
        );
    })
    .on("mouseout", function () {
      // Cuando quitamos el raton del nombre de una columna desaparece el tooltip
      tooltipHeatmap.style("visibility", "hidden");
    });
}

/**
 * Funcion que recibe un objeto con los datos (G: Victorias y P: Derrotas) y crea un donutchart con una imagen
 * del equipo seleccionado en el centro del donutchart
 * @param {*} datos : objeto con dos campos: (G: Victorias y P: Derrotas)
 */
function Donut(datos) {
  // Nombre completo de las variables
  labels = { G: "Victorias", P: "Derrotas" };
  // div donde estara situado el grafico
  var ele = document.getElementById("teamSelectedDonut");
  var width = ele.offsetWidth;
  var height = ele.offsetHeight;
  // tooltip del donutchart
  tooltipDonut = d3
    .select("#teamSelectedDonut")
    .append("div")
    .style("width", "120px")
    .style("height", "60px")
    .style("background", "#D5D8DC")
    .style("font", "17px times")
    .style("opacity", "0.9")
    .style("font-weight","bold")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("box-shadow", "0px 0px 6px #7861A5")
    .style("border","1px solid black")
    .style("padding", "10px");
  toolval = tooltipDonut.append("div");

  // Tamaño del radio del donutchart
  const radius = Math.min(width, height) / 2.4;

  // Elimino el grafico que hubiera previamente para que no se me solapen diferentes donutcharts
  // cuando selecciono otro equipo o otra temporada
  d3.select("#teamSelectedDonut").select("svg").remove();

  // Creo el svg con los tamaños fijados
  const svg = d3
    .select("#teamSelectedDonut")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  // Selecciono los datos
  const data = datos[0];

  // creo la paleta de color: verde para las victorias, rojo para las derrotas
  const color = d3.scaleOrdinal().domain(["G", "P"]).range(["#12AD2B", "red"]);

  // Creo el donutchart
  const pie = d3
    .pie()
    .sort(null) // Do not sort group by size
    .value((d) => d[1]);
  const data_ready = pie(Object.entries(data));

  // Determinamos los tamaños de los radios del donut
  const arc = d3
    .arc()
    .innerRadius(radius * 0.8) // This is the size of the donut hole
    .outerRadius(radius);

  // Determinamos los tamaños de los radios donde estan situadas las etiquetas( este arco es invisible)
  const outerArc = d3
    .arc()
    .innerRadius(radius * 0.8)
    .outerRadius(radius * 1.2);

  // Crea el donutchart
  svg
    .selectAll("allSlices")
    .data(data_ready)
    .join("path")
    .attr("d", arc)
    .attr("fill", function (d) {
      return color(d.data[0]);
    })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

    .on("mouseover", function (d, i) {
      // Interactividad: Pone un borde negro en el sector para que haga el efecto de resaltar
      //el sector en el cual situamos encima el raton
      d3.select(this).style("stroke", "black").style("stroke-width", "3px");
    })

    .on("mousemove", function (event, d, i) {
      // Cuando movemos el raton por encima de un sector hace aparecer el tooltip indicando el porcentaje de ese sector

      tooltipDonut
        .style("visibility", "visible")
        .style("width", "100px")
        .style("height", "50px")
        .style("top", event.pageY - 30 + "px")
        .style("left", event.pageX + 20 + "px")
        .style("background", color(d.data[0]));

      var valueNotSelected = event.srcElement.nextSibling.__data__.data[1];
      var valueSelected = d.data[1];
      var proporcion =
        (valueSelected / (valueNotSelected + valueSelected)) * 100;

      tooltipDonut
        .select("div")
        .html(
          "<strong>" +
            labels[d.data[0]] +
            "(%):" +
            "</strong><br/> " +
            +(+proporcion).toFixed(2)
        );
    })
    .on("mouseout", function () {
      // Cuando quitamos el raton del heatmap hacemos desaparecer el borde blanco y quitamos el tooltip
      d3.select(this).style("stroke", "white");
      tooltipDonut.style("visibility", "hidden");
    });

  // Añade las lineas entre las etiquetas y los sectores correspondientes
  svg
    .selectAll("allPolylines")
    .data(data_ready)
    .join("polyline")
    .attr("stroke", "black")
    .style("fill", "none")
    .attr("stroke-width", 2)
    .attr("points", function (d) {
      const posA = arc.centroid(d);
      const posB = outerArc.centroid(d);
      const posC = outerArc.centroid(d);
      const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
      return [posA, posB, posC];
    });

  svg
    .selectAll("allLabels")
    .data(data_ready)
    .join("text")
    .text((d) => labels[d.data[0]])
    .attr("transform", function (d) {
      const pos = outerArc.centroid(d);
      const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
      return `translate(${pos})`;
    })
    .style("font", "17px times")
    .style("text-anchor", function (d) {
      const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      return midangle < Math.PI ? "start" : "end";
    });

  // Añade la imagen del equipo seleccionado en el centro del donutchart
  image = "images/" + TEAM_SELECTED + ".png";
  svg
    .append("svg:image")
    .attr("id", "figTeamSelected")
    .attr("xlink:href", image)
    .attr("x", -radius + 8)
    .attr("y", -radius + 30)
    .attr("opacity", 1);
}

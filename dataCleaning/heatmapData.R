

clean_data<- function(datos,pathCleanDataset){
  # Escojo las columnas que me interesan del dataset
  colSelected<-c("Player","Tm","Pos","MP","FG","FG.","X3P","X3P.","FT.","AST","ORB","DRB","STL","BLK")
  datosSelected<- datos[,colSelected]
  # Compruebo cuantos NAs tiene
  numeroNA<-apply(datosSelected,2,function(x) sum(is.na(x)));print(numeroNA)
  # Compruebo cuantos jugadores hay por equipo
  numplayersByTeam<- table(datosSelected$Tm);print(numplayersByTeam)
  # Cambio el nombre a las variables que tienen un punto en el nombre
  names(datosSelected)[names(datosSelected) == 'FG.'] <- 'FGP'
  names(datosSelected)[names(datosSelected) == 'X3P.'] <- 'X3PP'
  names(datosSelected)[names(datosSelected) == 'FT.'] <- 'FTP'
  # Las variables que son porcentaje las mutiplico por 100, porque las quiero en %
  datosSelected$FGP <- datosSelected$FGP*100
  datosSelected$X3PP <- datosSelected$X3PP*100
  datosSelected$FTP <- datosSelected$FTP*100
  
  # Viendo los datos he visto que los NA corresponenden a porcentajes en los que no se ha intentado ningun tiro
  # Por tanto tiene sentido cambiar esos NA por un 0
  datosSelected[is.na(datosSelected)] <- 0
  # Calculo los minimos por cada variable numerica
  min<- apply(datosSelected[,sapply(datosSelected,is.numeric)],2,min)
  # Calculo los maximos por cada variable numerica
  max<- apply(datosSelected[,sapply(datosSelected,is.numeric)],2,max)
  
  # Añado al dataset los valores minimos y maximos para poder utilizar varias paletas de colores
  levels(datosSelected[,"Player"])<- c(levels(datosSelected[,"Player"]),"MINIMUM","MAXIMUM")
  levels(datosSelected[,"Tm"])<- c(levels(datosSelected[,"Tm"]),"MINIMUM","MAXIMUM")
  levels(datosSelected[,"Pos"])<- c(levels(datosSelected[,"Pos"]),"MINIMUM","MAXIMUM")
  min<- c("MINIMUM","MINIMUM","MINIMUM",min)
  max<- c("MAXIMUM","MAXIMUM","MAXIMUM",max)
  datosSelected<-rbind(min,max,datosSelected)
  
  # Guardo en un CSV los datos
  write.csv(datosSelected,pathCleanDataset)
  
}

# Datos temporada 2019-2020
datos_2019_20<- read.csv("../originalData/nba_2020_per_game.csv")
clean_data(datos_2019_20,pathCleanDataset="../cleanedData/datos_heatmap_2019_20.csv")

# Datos temporada 2020-2021
datos_2020_21<- read.csv("../originalData/nba2021_per_game.csv")
clean_data(datos_2020_21,pathCleanDataset="../cleanedData/datos_heatmap_2020_21.csv")



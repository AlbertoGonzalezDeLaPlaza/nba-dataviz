# DATOS TEMPORADA 2019-2020

# Conferencia Este
MIL<- c(56,17)
TOR<- c(53,19)
BOS<- c(48,24)
IND<- c(45,28)
MIA<- c(44,29)
PHI<- c(43,30)
BRK<- c(35,37)
ORL<- c(33,40)
WAS<- c(25,47)
NYK <-c(21,45)
CHI<- c(22,43)
DET<- c(20,46)
CLE<- c(19,46)
CHO<- c(23,42)
ATL<- c(20,47)

# Conferencia Oeste
LAL<- c(52,19)
LAC<- c(49,23)
DEN<- c(46,27)
HOU<- c(44,28)
OKC<- c(44,28)
UTA<- c(44,28)
DAL<- c(43,32)
POR<- c(35,39)
MEM<- c(34,39)
PHO<- c(34,39)
SAS<- c(32,39)
SAC<- c(31,41)
NOP<- c(30,42)
MIN<- c(19,45)
GSW<- c(15,50)


datos201920<- data.frame()
datos201920<- rbind(datos201920,MIL,TOR,BOS,IND,MIA,PHI,BRK,ORL,WAS,NYK,CHI,DET,CLE,CHO,ATL,
                    LAL,LAC,DEN,HOU,OKC,UTA,DAL,POR,MEM,PHO,SAS,SAC,NOP,MIN,GSW)
colnames(datos201920)<- c("G","P")
datos201920$Tm<- c("MIL","TOR","BOS","IND","MIA","PHI","BRK","ORL","WAS","NYK","CHI","DET","CLE","CHO","ATL",
                   "LAL","LAC","DEN","HOU","OKC","UTA","DAL","POR","MEM","PHO","SAS","SAC","NOP","MIN","GSW")
# Añadimos el total de partidos jugados por cada equipo
datos201920$Partidos<- datos201920$G+datos201920$P
# Comprobamos si tenemos algun NA
numeroNA<-apply(datos201920,2,function(x) sum(is.na(x)));numeroNA

# Esto lo hago para comprobar si se jugaron el mismo numero de partidos, se confirma que no jugaron el mismo 
# numero de partidos los equipos de la NBA

maxGames<- datos201920[(datos201920$Partidos)== max(datos201920$Partidos),c("Tm","Partidos")];maxGames
minGames<- datos201920[(datos201920$Partidos)== min(datos201920$Partidos),c("Tm","Partidos")];minGames

write.csv(datos201920,"../cleanedData/datos_donut_2019_20.csv")

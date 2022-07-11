# DATOS TEMPORADA 2020-2021

# Conferencia Este
MIL<- c(46,26)
TOR<- c(27,45)
BOS<- c(36,36)
IND<- c(34,38)
MIA<- c(40,32)
PHI<- c(49,23)
BRK<- c(48,24)
ORL<- c(21,51)
WAS<- c(34,38)
NYK <-c(41,31)
CHI<- c(31,41)
DET<- c(20,52)
CLE<- c(22,50)
CHO<- c(33,39)
ATL<- c(41,31)

# Conferencia Oeste
LAL<- c(42,30)
LAC<- c(47,25)
DEN<- c(47,25)
HOU<- c(17,55)
OKC<- c(22,50)
UTA<- c(52,20)
DAL<- c(42,30)
POR<- c(42,30)
MEM<- c(38,34)
PHO<- c(51,21)
SAS<- c(33,39)
SAC<- c(31,41)
NOP<- c(31,41)
MIN<- c(23,49)
GSW<- c(22,50)

datos202021<- data.frame()
datos202021<- rbind(datos202021,MIL,TOR,BOS,IND,MIA,PHI,BRK,ORL,WAS,NYK,CHI,DET,CLE,CHO,ATL,
                    LAL,LAC,DEN,HOU,OKC,UTA,DAL,POR,MEM,PHO,SAS,SAC,NOP,MIN,GSW)
colnames(datos202021)<- c("G","P")
datos202021$Tm<- c("MIL","TOR","BOS","IND","MIA","PHI","BRK","ORL","WAS","NYK","CHI","DET","CLE","CHO","ATL",
                   "LAL","LAC","DEN","HOU","OKC","UTA","DAL","POR","MEM","PHO","SAS","SAC","NOP","MIN","GSW")
# Añadimos el total de partidos jugados por cada equipo
datos202021$Partidos<- datos202021$G+datos202021$P
# Comprobamos si tenemos algun NA
numeroNA<-apply(datos202021,2,function(x) sum(is.na(x)));numeroNA

# Esto lo hago para comprobar si se jugaron el mismo numero de partidos
maxGames<- datos202021[(datos202021$Partidos)== max(datos202021$Partidos),c("Tm","Partidos")];maxGames
minGames<- datos202021[(datos202021$Partidos)== min(datos202021$Partidos),c("Tm","Partidos")];minGames


write.csv(datos202021,"../cleanedData/datos_donut_2020_21.csv")

class Player {
    constructor(nombre, puntuacion = 0, turno = false) {
        this.nombre = nombre;
        this.puntuacion = puntuacion;
        this.turno = turno;
    }
}
  
module.exports = Player;
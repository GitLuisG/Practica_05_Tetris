//Pociciones
var I = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ]
];
//Blue
var J = [
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ]
];
//celeste
var L = [
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ]
];
//Amarillo
var O = [
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ]
];
//Verde
var S = [
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
    ],
    [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]
];
//Morado
var T = [
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]
];
//Roja
var Z = [
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0]
    ]
];
var Canvas = document.getElementById("Tetris");
var Objeto = Canvas.getContext("2d");
var ScoreDiv = document.getElementById("Score");
var Filas = 20;
var Col = 10;
var Columnas = 10;
var TM = 20;
var TamCuadrado = 100;
//width="200" height="400"
var ColorEmpty = "Black"; // Color del los cuadros limpios
// Dibujar un cuadrado
function DibujarCuadro(x, y, color) {
    Objeto.fillStyle = color;
    Objeto.fillRect(x * TM, y * TM, TM, TM);
    Objeto.strokeStyle = "Gray";
    Objeto.strokeRect(x * TM, y * TM, TM, TM);
}
// Crear el tablero
var Tablero = [];
for (var i = 0; i < Filas; i++) {
    Tablero[i] = [];
    for (var j = 0; j < Col; j++) {
        Tablero[i][j] = ColorEmpty;
    }
}
// dibujar el Tablero
function DibujarTablero() {
    for (var i = 0; i < Filas; i++) {
        for (var j = 0; j < Col; j++) {
            DibujarCuadro(j, i, Tablero[i][j]);
        }
    }
}
DibujarTablero();
// Las pieza y su color
var Piezas = [
    [Z, "red"],
    [S, "green"],
    [T, "yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"]
];
// Genera numeros random
function GenerarPiezaRandon() {
    var randomN;
    var r = randomN = Math.floor(Math.random() * Piezas.length); // 0 -> 6
    return new Pieza(Piezas[r][0], Piezas[r][1]);
}
var p = GenerarPiezaRandon();
// La piesas del objeto
function Pieza(Pocicion, color) {
    this.Pocicion = Pocicion;
    this.color = color;
    this.PocicionN = 0; // desde el patron uno
    this.PocicionActiva = this.Pocicion[this.PocicionN];
    //Control para las pizas
    this.x = 3;
    this.y = -1;
}
// Funcion para rellenar
Pieza.prototype.fill = function (color) {
    for (var i = 0; i < this.PocicionActiva.length; i++) {
        for (var j = 0; j < this.PocicionActiva.length; j++) {
            // Dibujamos los cuadros que estan ocupando espacio
            if (this.PocicionActiva[i][j]) {
                DibujarCuadro(this.x + j, this.y + i, color);
            }
        }
    }
};
// Dibujamos lapieza en el tablero
Pieza.prototype.draw = function () {
    this.fill(this.color);
};
// Sacamos una pieza
Pieza.prototype.unDraw = function () {
    this.fill(ColorEmpty);
};
//Mover la pieza hacia abajo
Pieza.prototype.moveDown = function () {
    if (!this.collision(0, 1, this.PocicionActiva)) {
        this.unDraw();
        this.y++;
        this.draw();
        // incrementa el Score
        Score += 2;
    }
    else {
        //Blockeamos la pieza para generar una nueva
        this.lock();
        p = GenerarPiezaRandon();
    }
};
// Mover a la derecha la pieza
Pieza.prototype.moveRight = function () {
    if (!this.collision(1, 0, this.PocicionActiva)) {
        this.unDraw();
        this.x++;
        this.draw();
    }
};
// Mover a la izquierda la pieza
Pieza.prototype.moveLeft = function () {
    if (!this.collision(-1, 0, this.PocicionActiva)) {
        this.unDraw();
        this.x--;
        this.draw();
    }
};
// Rotar la pieza
Pieza.prototype.rotate = function () {
    var SiguientePatron = this.Pocicion[(this.PocicionN + 1) % this.Pocicion.length];
    var Golpear = 0;
    if (this.collision(0, 0, SiguientePatron)) {
        if (this.x > Col / 2) {
            // Pared
            Golpear = -1; // movemos la pieza hacia la izquierda
        }
        else {
            // PARED izquierdo
            Golpear = 1; // mOVEMOS Hacia la derecha
        }
    }
    if (!this.collision(Golpear, 0, SiguientePatron)) {
        this.unDraw();
        this.x += Golpear;
        this.PocicionN = (this.PocicionN + 1) % this.Pocicion.length; // (0+1)%4 => 1
        this.PocicionActiva = this.Pocicion[this.PocicionN];
        this.draw();
    }
};
var Score = 0;
Pieza.prototype.lock = function () {
    for (var i = 0; i < this.PocicionActiva.length; i++) {
        for (var j = 0; j < this.PocicionActiva.length; j++) {
            // Nos saltamos los cuadros de color basio
            if (!this.PocicionActiva[i][j]) {
                continue;
            }
            // Piezas bloqueadasA al terminar el juego
            if (this.y + i < 0) {
                alert("Game Over");
                // detener el cuadro de animacion de solicitud
                FindelJuego = true;
                break;
            }
            // bloqueamos la pieza
            Tablero[this.y + i][this.x + j] = this.color;
        }
    }
    // Remover la fla completa
    for (var i = 0; i < Filas; i++) {
        var EstaFilaVacia = true;
        for (var j = 0; j < Col; j++) {
            EstaFilaVacia = EstaFilaVacia && (Tablero[i][j] != ColorEmpty);
        }
        if (EstaFilaVacia) {
            //Si la fila esta llena se baja las de encima
            for (var y = i; y > 1; y--) {
                for (var j = 0; j < Col; j++) {
                    Tablero[y][j] = Tablero[y - 1][j];
                }
            }
            // La fila en la parte superior no tiene filas encima
            for (var j = 0; j < Col; j++) {
                Tablero[0][j] = ColorEmpty;
            }
            // incrementa el Score
            Score += 10;
        }
    }
    // actualuza el Tablero
    DibujarTablero();
    // Actualiza el Score
    ScoreDiv.innerHTML = Score.toString();
};
// collision fucntion
Pieza.prototype.collision = function (x, y, piece) {
    for (var i = 0; i < piece.length; i++) {
        for (var j = 0; j < piece.length; j++) {
            // Si esta vacio el cuadro la saltamos
            if (!piece[i][j]) {
                continue;
            }
            // Cordenadas de la pieza despues del movimiento
            var newX = this.x + j + x;
            var newY = this.y + i + y;
            // Condicion XD
            if (newX < 0 || newX >= Col || newY >= Filas) {
                return true;
            }
            // 
            if (newY < 0) {
                continue;
            }
            // Checamos que que sea diferente de vasio
            if (Tablero[newY][newX] != ColorEmpty) {
                return true;
            }
        }
    }
    return false;
};
// Controles para la pieza
var EmpezarCaida = Date.now();
var FindelJuego = false;
document.addEventListener("keydown", Controles);
function Controles(event) {
    //alert(event.keyCode);
    if (FindelJuego == false) {
        if (event.keyCode == 37) {
            p.moveLeft();
            EmpezarCaida = Date.now();
        }
        else if (event.keyCode == 38) {
            p.rotate();
            EmpezarCaida = Date.now();
        }
        else if (event.keyCode == 39) {
            p.moveRight();
            EmpezarCaida = Date.now();
        }
        else if (event.keyCode == 40) {
            p.moveDown();
        }
    }
    //Pausa 
    if (event.keyCode == 80) {
        if (FindelJuego == true) {
            alert('Regresamos');
            FindelJuego = false;
            Soltar();
        }
        else {
            alert('Pausa');
            FindelJuego = true;
        }
    }
}
function Soltar() {
    var now = Date.now();
    var delta = now - EmpezarCaida;
    if (delta > 1000) {
        p.moveDown();
        EmpezarCaida = Date.now();
    }
    if (!FindelJuego) {
        requestAnimationFrame(Soltar);
    }
}
// Soltar La pieza cada segundo
Soltar();

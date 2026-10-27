


const boton = document.getElementById("generar");
const entrada = document.getElementById("texto");
const resultado = document.getElementById("resultado");
const qr = document.getElementById("qr");
const mensaje = document.getElementById("mensaje");
const descargar = document.getElementById("descargar");

boton.addEventListener("click", generarQR);

entrada.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        generarQR();
    }
});

function generarQR() {
    const texto = entrada.value.trim();

    qr.innerHTML = "";
    mensaje.textContent = "";
    resultado.classList.add("oculto");

    if (texto === "") {
        mensaje.textContent = "Escribí un texto o enlace.";
        return;
    }

    if (typeof QRCode === "undefined") {
        mensaje.textContent = "No se pudo cargar la librería QR. Revisá tu conexión.";
        return;
    }

    new QRCode(qr, {
        text: texto,
        width: 220,
        height: 220,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    resultado.classList.remove("oculto");

    setTimeout(function() {
        const imagen = qr.querySelector("img");
        const canvas = qr.querySelector("canvas");

        if (imagen && imagen.src) {
            descargar.href = imagen.src;
        } else if (canvas) {
            descargar.href = canvas.toDataURL("image/png");
        }
    }, 300);
}

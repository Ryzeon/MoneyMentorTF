// Evento para calcular los resultados
document.getElementById("calcularButton").addEventListener("click", function () {
    // 1. Obtener los valores de entrada del usuario
    const monto = parseFloat(document.getElementById("monto").value) || 0;
    const tasaInteres = parseFloat(document.getElementById("interes").value) || 0;
    const cuotas = parseInt(document.getElementById("plazo").value) || 1;

    // Validar que los valores sean positivos
    if (monto <= 0) {
        alert("Por favor, ingresa un monto válido mayor a 0.");
        return;
    }
    if (tasaInteres <= 0) {
        alert("Por favor, ingresa una tasa de interés válida mayor a 0.");
        return;
    }
    if (cuotas <= 0 || !Number.isInteger(cuotas)) {
        alert("Por favor, ingresa un número de cuotas válido (entero positivo).");
        return;
    }

    // 2. Realizar cálculos
    const capitalPorCuota = monto / cuotas; // Cálculo de capital por cuota
    const interesPorCuota = (monto * (tasaInteres / 100)) / cuotas; // Cálculo de interés por cuota
    const montoPorCuota = capitalPorCuota + interesPorCuota; // Monto a pagar por cuota

    const interesTotal = monto * (tasaInteres / 100); // Interés total
    const capitalTotal = monto; // Capital total
    const totalPagar = monto + interesTotal; // Monto total a pagar

    // Actualizar los resultados en los campos correspondientes
    document.getElementById("capitalCuota").value = capitalPorCuota.toFixed(2);
    document.getElementById("interesCuota").value = interesPorCuota.toFixed(2);
    document.getElementById("cuotaindividual").value = montoPorCuota.toFixed(2);

    document.getElementById("capitalTotal").value = capitalTotal.toFixed(2);
    document.getElementById("interestotal").value = interesTotal.toFixed(2);
    document.getElementById("totalpagar").value = totalPagar.toFixed(2);

    // Convertir los valores a la moneda seleccionada
    convertCurrency();
});

// Función para convertir los valores a otra moneda
function convertCurrency() {
    const curr1 = document.getElementById("tipoMoneda").value; // Moneda base
    const curr2 = document.getElementById("tipoMonedaDatosCalculados").value; // Moneda objetivo

    const conversionFields = [
        { id: "capitalCuota", value: parseFloat(document.getElementById("capitalCuota").value) },
        { id: "interesCuota", value: parseFloat(document.getElementById("interesCuota").value) },
        { id: "cuotaindividual", value: parseFloat(document.getElementById("cuotaindividual").value) },
        { id: "capitalTotal", value: parseFloat(document.getElementById("capitalTotal").value) },
        { id: "interestotal", value: parseFloat(document.getElementById("interestotal").value) },
        { id: "totalpagar", value: parseFloat(document.getElementById("totalpagar").value) }
    ];

    // Llamar a la API de tipo de cambio
    fetch(`https://v6.exchangerate-api.com/v6/53fc54f1da350fcd30a8868c/latest/${curr1}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.conversion_rates[curr2]; // Obtener la tasa de conversión
            if (!rate) {
                alert("Error al obtener la tasa de cambio.");
                return;
            }

            // Convertir los valores y actualizar los campos
            conversionFields.forEach(field => {
                const convertedValue = field.value * rate;
                document.getElementById(field.id).value = convertedValue.toFixed(2);
            });
        })
        .catch(err => {
            console.error(err);
            alert("Error al obtener las tasas de cambio. Verifica tu conexión o intenta más tarde.");
        });
}

// Evento para limpiar los valores
document.getElementById("limpiarButton").addEventListener("click", function () {
    // Restablecer los valores de los campos de entrada y salida a su estado inicial
    document.getElementById("monto").value = "";
    document.getElementById("interes").value = "";
    document.getElementById("plazo").value = "";

    document.getElementById("capitalCuota").value = "";
    document.getElementById("interesCuota").value = "";
    document.getElementById("cuotaindividual").value = "";

    document.getElementById("capitalTotal").value = "";
    document.getElementById("interestotal").value = "";
    document.getElementById("totalpagar").value = "";
});

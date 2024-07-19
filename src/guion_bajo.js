function registrar(nombre, correo, contraseña, callback) {

    const data = { nombre, correo, contraseña }

    if (typeof nombre !== "string") {
        return callback("no tiene el nombre correcto", nombre, null, "asdasdasd")
    }

    return callback(null, data, "La cuenta ha sido creada", "asdasdasd")

}

registrar("asd", "asdas@asdas.com", "123456", function (error, _, respuesta) {
    if (error) {
        console.log(error)
    } else {
        console.log(respuesta)
    }
    
})

const datos = [5, 9, 8, 6, 4, 4, 9]

const cebra = datos.reduce((result, _, index) => {
    if (index % 2 === 0) {
        result.push('white')
    } else {
        result.push('gray')
    }
    return result
}, [])

console.log(cebra)

console.log(
    datos.map((_, index) => index)
)

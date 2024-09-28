export async function dataFetcher(url) {
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error al hacer fetch: ", error);
    }
}

export async function deleteData(url, id) {
    try {
        const respuesta = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const codigoRespuesta = await respuesta.json();
        console.log(codigoRespuesta);
        return codigoRespuesta;
    } catch (error) {
        console.error("Error al hacer delete: ", error);
    }
}

export async function putData(url, id, task) {
    try {
        const respuesta = await fetch(`${url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const codigoRespuesta = await respuesta.json();
        console.log(codigoRespuesta);
        return codigoRespuesta;
    } catch (error) {
        console.error("Error al hacer delete: ", error);
    }
}

export async function postData( url, dataList ) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(dataList)
        });

        if (!response.ok) {
            throw new Error('Error ' + response.statusText);
        }

        const result = await response.json();
        console.log('Tarea agregada: ', result);
    } catch (error) {
        console.log("No se pudo agregar la tarea: ", error);
    }
}
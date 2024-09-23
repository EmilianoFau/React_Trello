export async function dataFetcher(url) {
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error al hacer fetch: ", error);
    }
}




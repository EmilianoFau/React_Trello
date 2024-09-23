function getSuspender(promise) {
    let status = "pending";
    let response;

    const suspender = promise.then(
        (res) => {
            status = "success";
            response = res;
        },
        (err) => {
            status = "error";
            response = err;
        }
    );

    const read = () => {
        switch(status) {
            case "pending":
                throw suspender;
            case "error":
                throw response;
            default:
                return response;
        }
    }

    return { read };
}

export function fetchData(url) {
    const promise = fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`); // Verificar errores en la respuesta
            }            
            return response.json();
        })
        .then((data) => {
            console.log("Datos obtenidos de la API:", data); // Log para verificar los datos
            return data;

        })
        .catch((error) => {
            console.error("Error al obtener los datos:", error);
        });

    return getSuspender(promise);
}

/*
import { useEffect, useState } from 'react';

const FetchGet = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `url`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let data = await response.json();
        setData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data };
};

export default FetchGet;*/
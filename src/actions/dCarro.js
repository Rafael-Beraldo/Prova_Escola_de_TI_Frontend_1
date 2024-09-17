import api from "./api"

export const ACTION_TYPES = {
    CREATE : 'CREATE',
    UPDATE : 'UPDATE',
    DELETE : 'DELETE',
    FETCH_ALL : 'FETCH_ALL'
}

const formateData = data => ({
    ...data,
    yearManufacture: parseFloat(data.yearManufacture? data.yearManufacture : 0)
})

export const fetchAll = () => dispatch => {
    api.dCarro().fetchAll()
    .then(
        response => {
            console.log(response)
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        }
    )
    .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    data = formateData(data);
    api.dCarro().create(data)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: res.data
        })
        onSuccess();
    })
    .catch(err => console.log(err));
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data);
    api.dCarro().update(id, data)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: { id: id, ...data }
        })
        onSuccess();
    })
    .catch(err => console.log(err));
}

export const Delete = (id, onSuccess) => dispatch => {
    api.dCarro().delete(id)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        })
        onSuccess();
    })
    .catch(err => console.log(err));
}

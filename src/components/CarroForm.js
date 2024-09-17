import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, withStyles } from "@material-ui/core";
import * as actions from "../actions/dCarro";
import { connect } from "react-redux";
import useForm from "./useForm";
import { toast } from 'react-toastify';
import { Delete } from "@material-ui/icons";


const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    smMargin: {
        margin: theme.spacing(1),
    }
});

const initialFieldValues = {
    modelo: '',
    plate: '',
    yearManufacture: '',
    accessory: []  // Inicializa como uma lista vazia
}

const CarroForm = ({ classes, ...props }) => {
    const [accessoryInput, setAccessoryInput] = useState('');

    // Função de validação
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('modelo' in fieldValues)
            temp.modelo = fieldValues.modelo ? "" : "Este campo é obrigatório.";
        if ('plate' in fieldValues)
            temp.plate = fieldValues.plate ? "" : "Este campo é obrigatório.";
        if ('yearManufacture' in fieldValues)
            temp.yearManufacture = fieldValues.yearManufacture ? "" : "Este campo é obrigatório.";
        if ('accessory' in fieldValues)
            temp.accessory = fieldValues.accessory && fieldValues.accessory.length > 0 ? "" : "Este campo é obrigatório.";

        setErrors({ ...temp });

        return Object.values(temp).every(x => x === "");
    };

    // Custom hook para gerenciamento do formulário
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId);

    // Carregar dados do carro para edição
    useEffect(() => {
        if (props.currentId !== 0) {
            const selectedCar = props.dCarroList.find(x => x.id === props.currentId);
            if (selectedCar) {
                setValues({
                    ...selectedCar,
                    accessory: Array.isArray(selectedCar.accessory) ? selectedCar.accessory : []
                });
                setAccessoryInput(''); // Reset accessory input field when editing
            }
        }
        setErrors([]);
    }, [props.currentId, props.dCarroList, setValues, setErrors]);

    // Função para lidar com o submit do formulário
    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            if (props.currentId === 0) {
                // Criar novo carro
                props.createCarro(values, () => {
                    toast.success("Carro Inserido com Sucesso!");
                    resetForm();
                });
            } else {
                // Atualizar carro existente
                props.updateCarro(props.currentId, values, () => {
                    toast.success("Carro Atualizado com Sucesso");
                    resetForm();
                });
            }
        }
    };

    // Função para adicionar um acessório
    const handleAddAccessory = () => {
        if (accessoryInput) {
            setValues(prevValues => ({
                ...prevValues,
                accessory: [...(prevValues.accessory || []), accessoryInput]
            }));
            setAccessoryInput('');
        }
    };

    // Função para remover um acessório
    const handleRemoveAccessory = index => {
        setValues(prevValues => ({
            ...prevValues,
            accessory: prevValues.accessory.filter((_, i) => i !== index)
        }));
    };

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="modelo"
                        variant="outlined"
                        label="Modelo"
                        value={values.modelo}
                        onChange={handleInputChange}
                        {...(errors.modelo && { error: true, helperText: errors.modelo })}
                    />
                    <TextField
                        name="plate"
                        variant="outlined"
                        label="Placa"
                        value={values.plate}
                        onChange={handleInputChange}
                        {...(errors.plate && { error: true, helperText: errors.plate })}
                    />
                    <TextField
                        name="yearManufacture"
                        variant="outlined"
                        label="Ano"
                        value={values.yearManufacture}
                        onChange={handleInputChange}
                        {...(errors.yearManufacture && { error: true, helperText: errors.yearManufacture })}
                    />
                    <div>
                        <TextField
                            variant="outlined"
                            label="Acessório"
                            value={accessoryInput}
                            onChange={e => setAccessoryInput(e.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={handleAddAccessory}>
                            Adicionar
                        </Button>
                    </div>
                    <div>
                        {values.accessory && values.accessory.length > 0 ? (
                            <ul>
                                {values.accessory.map((accessory, index) => (
                                    <li key={index}>
                                        {accessory}
                                        <Button onClick={() => handleRemoveAccessory(index)}><Delete color="secondary"/></Button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Nenhum acessório adicionado.</p>
                        )}
                    </div>
                    <div>
                        <Button className={classes.smMargin} onClicl={handleSubmit} variant="contained" color="primary" type="submit">Submit</Button>
                        <Button className={classes.smMargin} onClick={resetForm} variant="contained" color="secondary">Reset</Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
};

const mapStateToProps = state => ({
    dCarroList: state.dCarro.list
});

const mapActionToProps = {
    createCarro: actions.create,
    updateCarro: actions.update
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CarroForm));

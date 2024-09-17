import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dCarro";
import { Button, ButtonGroup, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from "@material-ui/core";
import CarroForm from "./CarroForm";
import { Edit, Delete } from "@material-ui/icons";
import { toast } from "react-toastify";

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25em",
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
});

const Carro = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        props.fetchAllCarros();
    }, [props.fetchAllCarros]);

    const onDelete = id => {
        if (window.confirm('Você tem certeza que quer Excluir esse registro?')) {
            props.deleteCarro(id, () => { toast.success("Carro Deletado com Sucesso!"); });
        }
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <CarroForm currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Modelo</TableCell>
                                    <TableCell>Placa</TableCell>
                                    <TableCell>Ano</TableCell>
                                    <TableCell>Acessórios</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.dCarroList.map((record, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{record.modelo}</TableCell>
                                        <TableCell>{record.plate}</TableCell>
                                        <TableCell>{record.yearManufacture}</TableCell>
                                        <TableCell>
                                            {Array.isArray(record.accessory) && record.accessory.length > 0 ? record.accessory.join(', ') : 'Nenhum acessório'}
                                        </TableCell>
                                        <TableCell>
                                            <ButtonGroup variant="text">
                                                <Button>
                                                    <Edit color="primary" onClick={() => { setCurrentId(record.id); }} />
                                                </Button>
                                                <Button>
                                                    <Delete color="secondary" onClick={() => onDelete(record.id)} />
                                                </Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    )
}

const mapStateToProps = state => ({
    dCarroList: state.dCarro.list
});

const mapActionToProps = {
    fetchAllCarros: actions.fetchAll,
    deleteCarro: actions.Delete // Certifique-se de que a ação delete está corretamente exportada como 'delete'
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Carro));

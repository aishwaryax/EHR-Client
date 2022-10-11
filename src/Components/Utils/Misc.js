import React from 'react'
import { TextField, FormControl, InputLabel, Select, OutlinedInput, MenuItem, Box, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#107717',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: green[500],
            },
            '&:hover fieldset': {
                borderColor: green[200],
            },
            '&.Mui-focused fieldset': {
                borderColor: green[700],
            },
        },
    },
})(TextField);

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        marginLeft: "5px",
        backgroundColor: '#ddd',
        borderRadius: "5px"
    },
}));

const SelectedListItem = (props) => {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const keyWords = props.keyWords
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index)
        props.onSelectValue(props.options[selectedIndex][keyWords[1]], props.options[selectedIndex][keyWords[0]])
    };
    return (
        <div className={classes.root}>
            <List>
                {props.options !== null ? props.options.map((eachOpt, index) => {
                    return (
                        <ListItem button
                            selected={selectedIndex === index}
                            onClick={event => handleListItemClick(event, index)} key={index}
                            value={eachOpt[keyWords[1]]}
                        >
                            <ListItemText
                                key={index}
                            >{eachOpt[keyWords[1]]}</ListItemText>
                        </ListItem>
                    )
                }) : null}
            </List>
        </div>
    )
}

const FormFields = ({ formdata, id, onChangeForm, valueFromKey, onSelectValue, keyWords }) => {
    const ShowError = () => {
        let ErrorMessage = (
            <Box component="div" style={{
                textAlign: "center",
                fontSize: "16px",
                color: "#fc0505",
            }}>
                {
                    formdata.validation && !formdata.valid ? formdata.validationMessage : null
                }
            </Box>
        )
        return ErrorMessage
    }

    const renderTemplate = () => {
        let formTemplate = null
        switch (formdata.element) {
            case ('input'):
                formTemplate = (
                    <div>
                        <CssTextField
                            id={`${formdata.config.name}`}
                            label={`${formdata.showLabel ?
                                formdata.config.label : null}${formdata.validation.required && formdata.showLabel ? "*" : ''}
                            `}
                            type={formdata.config.type}
                            name={formdata.config.name}
                            autoComplete={formdata.config.type}
                            margin="normal"
                            variant="outlined"
                            value={formdata.value}
                            fullWidth
                            onChange={(event) => {
                                onChangeForm({ event, id })
                            }}
                            className={formdata.className ? formdata.className : ''}
                        />

                        {
                            ShowError()
                        }
                    </div>
                )
                break;
            case ('fetch'):
                formTemplate = (
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <CssTextField
                                id={`${formdata.config.name}`}
                                label={`${formdata.showLabel ?
                                    formdata.config.label : null}${formdata.validation.required && formdata.showLabel ? "*" : ''}
                            `}
                                type={formdata.config.type}
                                name={formdata.config.name}
                                autoComplete={formdata.config.type}
                                margin="normal"
                                variant="outlined"
                                value={formdata.value}
                                fullWidth
                                onChange={(event) => {
                                    onChangeForm({ event, id })
                                }}
                                className={formdata.className ? formdata.className : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box component="div" style={{
                                textAlign: "center",
                                fontSize: "16px",
                                color: "#fc0505",
                            }}>
                                {
                                    formdata.config.optionsError ? formdata.config.optionsError : null
                                }
                            </Box>
                            <SelectedListItem keyWords={keyWords} onSelectValue={onSelectValue} options={formdata.config.options}></SelectedListItem>
                        </Grid>
                        {
                            ShowError()
                        }
                    </Grid>
                )
                break;
            case ('textarea'):
                formTemplate = (
                    <div>
                        <CssTextField
                            id={`${formdata.config.name}`}
                            label={`${formdata.showLabel ?
                                formdata.config.label : null}${formdata.validation.required && formdata.showLabel ? "*" : ''}
                            `}
                            type={formdata.config.type}
                            name={formdata.config.name}
                            autoComplete={formdata.config.type}
                            fullWidth={true}
                            margin="normal"
                            variant="outlined"
                            value={formdata.value}
                            multiline={true}
                            rows={formdata.config.numOfRows}
                            rowsMax={formdata.config.maxnumOfRows}
                            onChange={(event) => {
                                onChangeForm({ event, id })
                            }}
                            className={formdata.className ? formdata.className : ''}
                        />

                        {
                            ShowError()
                        }
                    </div>
                )
                break;
            case ('select'):
                formTemplate = (
                    <div>
                        <FormControl variant="filled" margin="normal" style={{
                            width: "100%",
                            height: "100%"
                        }}>
                            {formdata.showLabel ?
                                <InputLabel htmlFor={`${formdata.config.name}_inputlabel`}>{`${formdata.config.label}${formdata.validation.required && formdata.showLabel ? "*" : ''}`}</InputLabel> : null
                            }
                            <Select
                                id={`${formdata.config.name}_select`}
                                value={formdata.value}
                                onChange={(event) => {
                                    onChangeForm({ event, id })
                                }}
                                input={<OutlinedInput name={formdata.config.name} />}
                            >
                                <MenuItem value="" disabled>
                                    <em>None</em>
                                </MenuItem>
                                {formdata.config.options.map((eachOpt) => {
                                    return (
                                        <MenuItem key={eachOpt.key} value={eachOpt.value}>{eachOpt.key}</MenuItem>
                                    )
                                }
                                )}
                            </Select>
                        </FormControl>
                        {
                            ShowError()
                        }
                    </div>
                )
                break;
            default:
                formTemplate = null
        }
        return formTemplate
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    )
}

const Validator = (element) => {
    let error = [true, '']
    //Checking Email
    if (element.validation.email) {
        const valid = /\S+@\S+\.\S+/.test(element.value)
        const message = `${!valid ? 'Field must be a valid Email' : ''}`
        error = !valid ? [valid, message] : error
    }
    if (element.validation.phone) {
        const valid = /^[+]\d{2,4}-\d{3}\d{3}\d{4}$/.test(element.value)
        const message = `${!valid ? 'Field must be a valid Phone Number' : ''}`
        error = !valid ? [valid, message] : error
    }
    if (element.validation.password) {
        const valid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/.test(element.value)
        const message = `${!valid ? 'Field must be a valid Password between 8 and 32 characters' : ''}`
        error = !valid ? [valid, message] : error
    }
    // Checking required
    if (element.validation.required) {
        const valid = element.value.trim() !== ''
        const message = `${!valid ? 'Field is required' : ''}`
        error = !valid ? [valid, message] : error
    }
    return error
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

export { FormFields, Validator, getKeyByValue }
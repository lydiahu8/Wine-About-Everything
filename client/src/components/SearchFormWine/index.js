import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const divStyle = {
    margin: '15%',
  };

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
});

const countries = [
    {value: '', label: 'None'},
    {value: 'Italy', label: 'Italy'},
    {value: 'France', label: 'France'},
    {value: 'Spain', label: 'Spain'},
    {value: 'Usa', label: 'USA'},
    {value: 'Australia', label: 'Australia'},
    {value: 'Argentina', label: 'Argentina'},
    {value: 'China', label: 'China'},
    {value: 'South Africa', label: 'South Africa'},
    {value: 'Chile', label: 'Chile'},
    {value: 'Germany', label: 'Germany'},
    {value: 'Portugal', label: 'Portugal'},
    {value: 'Russia', label: 'Russia'},
    {value: 'Romania', label: 'Romania'},
    {value: 'Brazil', label: 'Brazil'},
    {value: 'Hungary', label: 'Hungary'},
];

export default class SearchFormWine extends React.Component {

    state = {
        name: '',
        vintage: '',
        country: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onSubmit = () => {
        const { name, vintage, country } = this.state;
        let vintageOpt=null;
        let countryOpt=null;
        if (vintage != '') {
            vintageOpt = '&vintage=' + vintage;
        } else {
            vintageOpt = ''
        }
        if (country != '') {
            countryOpt = '&country=' + country;
        } else {
            countryOpt = ''
        }
       // let countryOpt = '&country=' + country;
        // if input != null, include &vintage= or &country= before the input
        const wineQuery = `${'https://cors-anywhere.herokuapp.com/'}https://api.globalwinescore.com/globalwinescores/latest/?wine=${name}${vintageOpt}${countryOpt}`
        console.log(wineQuery)
        axios.get(wineQuery, {
            headers: {
                'Accept': 'application/json', 
                'Authorization': 'Token a6a9d88e743da91815c06327dfa7ea9c484f70c7',
            }
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render () {
        const { classes } = this.props;

        return (
            <div style={divStyle}>
                {this.state.name}
                {this.state.vintage}
                {this.state.country}
                {'Search Wines'}
                <form>
                    <Grid container spacing={8}>

                        <Grid item xs={12} sm={6}>
                            <TextField 
                                id="standard-password-input"
                                label="Name"
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                type="text"
                                fullWidth
                                autoComplete="current-password"
                                margin="normal"
                            />
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            <TextField 
                                id="standard-password-input"
                                label="Vintage"
                                value={this.state.vintage}
                                onChange={this.handleChange('vintage')}
                                type="text"
                                fullWidth
                                autoComplete="current-password"
                                margin="normal"
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                            fullWidth
                            select
                            label="Country"
                            value={this.state.country}
                            onChange={this.handleChange('country')}
                            margin="normal"
                            >
                            {countries.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={6} sm={10}></Grid>
                        <Grid item xs={6} sm={2}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            style={{float: "right", marginTop: "10px"}}
                            onClick={this.onSubmit}
                        >
                            Search
                        </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}
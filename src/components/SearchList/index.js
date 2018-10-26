import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import InputEvent from 'components/InputEvent';
import Table from 'components/Table';

class Managers extends InputEvent {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.columns !== nextProps.columns) {
      this.setState({ columns: nextProps.columns });
    }
  }

  render() {
    const { columns, label, tables } = this.props;
    return (
      <div>
        <Grid item xs={12}>
          <div className="sub-container">
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>
              <TextField
                className="Text-Field w-50"
                type="text"
                name="search"
                label="Search"
                value={this.state.search}
                onChange={e => this.handleInputChange(e, 'search')}
                required
                margin="normal"
              />
              <Table columns={columns} tables={tables} />
            </FormGroup>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="sub-container align-right">
            <Button variant="fab" color="primary" aria-label="Add">
              <AddIcon />
            </Button>
          </div>
        </Grid>
      </div>
    );
  }
}

Managers.propTypes = {
  tables: PropTypes.array,
  columns: PropTypes.array,
};

Managers.defaultProps = {
  tables: [],
  columns: [],
};

export default Managers;

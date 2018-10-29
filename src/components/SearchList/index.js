import PropTypes from 'prop-types';

import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

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
      <Grid container>
        <Grid item xs={12}>
          <FormLabel component="legend" classname="mt-block">{label}</FormLabel>
          <FormGroup>
            {this.subrender('search', 'Search', this.state.search)}
            <Table columns={columns} tables={tables} />
          </FormGroup>
          <div className="buttons-box mt-block">
            <Tooltip title="Add Users" placement="top">
              <Button
                className="btn-icon-text att-green margin-top margin-left"
                variant="fab"
                aria-label="Add">
                <AddIcon />
              </Button>
            </Tooltip>
          </div>
        </Grid>
      </Grid>
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

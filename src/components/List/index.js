import PropTypes from 'prop-types';

import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import InputEvent from 'components/InputEvent';
import Table from 'components/Table';

class List extends InputEvent {
  render() {
    const {
      tables,
      columns,
      pageSize,
      label,
      addbtn,
      deletebtn,
    } = this.props;
    return (
      <Grid item xs={12}>
        {label !== '' && <FormLabel component="legend" className="mt-block">{label}</FormLabel>}
        <FormGroup>
          <Table tables={tables} columns={columns} pageSize={pageSize} />
        </FormGroup>
        <div className="buttons-box mt-block">
          {addbtn && this.renderButton('Add Users', 'green', this.props.handleAdd, <AddIcon />, 'fab')}
          {deletebtn && this.renderButton('Delete Users', 'blue', this.props.handleDelete, <DeleteIcon />)}
        </div>
      </Grid>
    );
  }
}

List.propTypes = {
  label: PropTypes.string,
  pageSize: PropTypes.number,
  tables: PropTypes.array,
  columns: PropTypes.array,
  addbtn: PropTypes.bool,
  deletebtn: PropTypes.bool,
  handleDelete: PropTypes.func,
  handleAdd: PropTypes.func,
};

List.defaultProps = {
  pageSize: 5,
  tables: [],
  columns: [],
  label: '',
  addbtn: true,
  deletebtn: true,
  handleDelete: () => {},
  handleAdd: () => {},
};

export default List;

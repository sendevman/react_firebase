import PropTypes from 'prop-types';

import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';

import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import InputEvent from 'components/InputEvent';
import Table from 'components/Table';

class TableList extends InputEvent {
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
    const {
      columns,
      label,
      tables,
      addbtnTooltip,
      savebtnTooltip,
      editbtnTooltip,
      deletebtnTooltip,
      addbtn,
      savebtn,
      editbtn,
      deletebtn,
      searchEnable,
      showPagination,
      pageSize,
      updateRowStyle,
    } = this.props;
    return (
      <Grid item xs={12}>
        <FormLabel component="legend" className="mt-block label-products-table select-text">{label}</FormLabel>
        <FormGroup>
          {searchEnable && this.renderText('search', 'Search')}
          <Table columns={columns} tables={tables} showPagination={showPagination} pageSize={pageSize} updateRowStyle={updateRowStyle} />
        </FormGroup>
        <div className="buttons-box mt-block">
          {addbtn && this.renderButton(addbtnTooltip, 'green', this.props.handleAdd, <AddIcon />, 'fab')}
          {savebtn && this.renderButton(savebtnTooltip, 'red', this.props.handleSave, <SaveIcon />)}
          {editbtn && this.renderButton(editbtnTooltip, 'red', this.props.handleEdit, <EditIcon />)}
          {deletebtn && this.renderButton(deletebtnTooltip, 'blue', this.props.handleDelete, <DeleteIcon />)}
        </div>
      </Grid>
    );
  }
}

TableList.propTypes = {
  tables: PropTypes.array,
  columns: PropTypes.array,
  addbtnTooltip: PropTypes.string,
  savebtnTooltip: PropTypes.string,
  editbtnTooltip: PropTypes.string,
  deletebtnTooltip: PropTypes.string,
  showPagination: PropTypes.bool,
  pageSize: PropTypes.number,
  addbtn: PropTypes.bool,
  savebtn: PropTypes.bool,
  editbtn: PropTypes.bool,
  deletebtn: PropTypes.bool,
  searchEnable: PropTypes.bool,
  handleAdd: PropTypes.func,
  handleSave: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  updateRowStyle: PropTypes.func,
};

TableList.defaultProps = {
  tables: [],
  columns: [],
  addbtnTooltip: '',
  savebtnTooltip: '',
  editbtnTooltip: '',
  deletebtnTooltip: '',
  showPagination: false,
  pageSize: 5,
  addbtn: false,
  savebtn: false,
  editbtn: false,
  deletebtn: false,
  searchEnable: false,
  handleAdd: () => {},
  handleSave: () => {},
  handleEdit: () => {},
  handleDelete: () => {},
  updateRowStyle: () => ({}),
};

export default TableList;

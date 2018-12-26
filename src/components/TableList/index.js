/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import PropTypes from 'prop-types';

import InputEvent from 'components/InputEvent';

import Table from 'components/Table';

import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

class TableList extends InputEvent {
  componentWillReceiveProps(nextProps) {
    if (this.props.columns !== nextProps.columns) {
      this.setState({ columns: nextProps.columns });
    }
  }

  render() {
    const {
      columns,
      tables,
      title,
      pageSize,
      searchEnable,
      addbtn,
      addbtnTooltip,
      savebtn,
      savebtnTooltip,
      editbtn,
      editbtnTooltip,
      deletebtn,
      deletebtnTooltip,
    } = this.props;

    return (
      <Grid item xs={12}>
        <Table columns={columns} tables={tables} title={title} pageSize={pageSize} searchEnable={searchEnable} />

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
  columns: PropTypes.array,
  tables: PropTypes.array,
  addbtnTooltip: PropTypes.string,
  savebtnTooltip: PropTypes.string,
  editbtnTooltip: PropTypes.string,
  deletebtnTooltip: PropTypes.string,
  addbtn: PropTypes.bool,
  savebtn: PropTypes.bool,
  editbtn: PropTypes.bool,
  deletebtn: PropTypes.bool,
  handleAdd: PropTypes.func,
  handleSave: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};

TableList.defaultProps = {
  columns: [],
  tables: [],
  addbtnTooltip: '',
  savebtnTooltip: '',
  editbtnTooltip: '',
  deletebtnTooltip: '',
  addbtn: false,
  savebtn: false,
  editbtn: false,
  deletebtn: false,
  handleAdd: () => {},
  handleSave: () => {},
  handleEdit: () => {},
  handleDelete: () => {},
};

export default TableList;

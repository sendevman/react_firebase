/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import PropTypes from 'prop-types';

import classNames from 'classnames';

import InputEvent from 'components/InputEvent';

import MUIDataTable from "mui-datatables";

class Table extends InputEvent {
  handleRowsSelect = (tableState) => {
    const { multiSelectEnable } = this.props;

    if (tableState.curSelectedRows && tableState.curSelectedRows.length === 0) {
      this.props.handleRowsSelected('');
      return false;
    }

    // Depends on what we want to do, we will play with multiselectEnable.
    if (multiSelectEnable) return false;

    this.props.handleSelectedRows({ data: [], lookup: {} });
  };

  render() {
    const {
      columns,
      tables,
      title,
      multiSelectEnable,
      pageSize,
      rowsSelected,
      searchEnable,
      selectableRowsEnable,
      selectedRows } = this.props;

    const options = {
      filterType: 'dropdown',
      responsive: 'scroll',
      rowsPerPageOptions: [5, 10, 20],
      rowsPerPage: pageSize,
      print: false,
      rowsSelected: rowsSelected,
      search: searchEnable,
      selectableRows: selectableRowsEnable,
      selectedRows: selectedRows,
      setRowProps: (row, rowIndex) => {
        // Depends on what we want to do, we will play with multiselectEnable.
        if (multiSelectEnable) return false;

        let isSelected = rowsSelected ? (rowIndex === parseInt(rowsSelected[0])) : false;

        return { className: classNames('table-row', { ['selected']: isSelected }) };
      },
      onRowClick: (rowData, rowMeta) => {
        // Depends on what we want to do, we will play with multiselectEnable.
        if (multiSelectEnable) return false;

        this.props.handleRowsSelected(rowMeta.dataIndex);
      },
      onChangeRowsPerPage: (numberOfRows) => {
        this.props.handlePageSizeSelected(numberOfRows);
      },
      onTableChange: (action, tableState) => {
        switch (action) {
          case 'rowsSelect':
            this.handleRowsSelect(tableState);
            break;
        }
      },
    };

    return (
      <MUIDataTable
        columns={columns}
        data={tables}
        options={options}
        title={title}
      />
    );
  }
}

Table.propTypes = {
  columns: PropTypes.array,
  tables: PropTypes.array,
  title: PropTypes.string,
  pageSize: PropTypes.number,
  rowsSelected: PropTypes.array,
  selectedRows: PropTypes.object,
  multiSelectEnable: PropTypes.bool,
  searchEnable: PropTypes.bool,
  selectableRowsEnable: PropTypes.bool,
};

Table.defaultProps = {
  columns: [],
  tables: [],
  title: '',
  pageSize: 5,
  rowsSelected: [],
  selectedRows: { data: [], lookup: {} },
  multiSelectEnable: false,
  searchEnable: false,
  selectableRowsEnable: false,
};

export default Table;

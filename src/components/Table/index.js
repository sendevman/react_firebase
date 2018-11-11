import PropTypes from 'prop-types';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import InputEvent from 'components/InputEvent';

class Table extends InputEvent {
  render() {
    const { tables, columns, pageSize, showPagination } = this.props;
    return (
      <ReactTable
        className="-striped -highlight"
        data={tables}
        showPagination={showPagination}
        defaultPageSize={pageSize}
        sorted={[{
          id: 'name',
          desc: false,
        }]}
        columns={columns}
      />
    );
  }
}

Table.propTypes = {
  pageSize: PropTypes.number,
  showPagination: PropTypes.bool,
  tables: PropTypes.array,
  columns: PropTypes.array,
};

Table.defaultProps = {
  pageSize: 5,
  showPagination: false,
  tables: [],
  columns: [],
};

export default Table;

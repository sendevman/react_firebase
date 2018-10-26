import PropTypes from 'prop-types';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import InputEvent from 'components/InputEvent';

class Table extends InputEvent {
  render() {
    const { tables, columns, pageSize } = this.props;
    return (
      <ReactTable
        className="-striped -highlight"
        data={tables}
        showPagination={false}
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
  tables: PropTypes.array,
  columns: PropTypes.array,
};

Table.defaultProps = {
  pageSize: 9,
  tables: [],
  columns: [],
};

export default Table;

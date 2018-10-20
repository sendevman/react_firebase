import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import InputEvent from './InputEvent';

class Managers extends InputEvent {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      tables: [],
      columns: [
        {
          Header: () => (
            <div>
              <span>email</span>
            </div>
          ),
          accessor: 'email',
          width: 200,
        },
        {
          Header: () => (
            <div>
              <span>name</span>
            </div>
          ),
          accessor: 'email',
          width: 200,
        },
        {
          Header: () => (
            <div>
              <span>user type</span>
            </div>
          ),
          accessor: 'email',
          width: 200,
        },
      ],
    };
  }

  render() {
    const { tables, columns } = this.state;
    return (
      <Grid item xs={12}>
        <div className="border-shadow">
          <Grid container>
            <Grid item xs={12}>
              <div className="sub-container">
                <FormLabel component="legend">Add Managers / Users to location</FormLabel>
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
                  <ReactTable
                    className="-striped -highlight"
                    data={tables}
                    showPagination={false}
                    defaultPageSize={19}
                    sorted={[{
                      id: 'name',
                      desc: false,
                    }]}
                    columns={columns}
                  />
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
            <Grid item xs={12}>
              <div className="sub-container">
                <FormLabel component="legend">Managers / Users added to location</FormLabel>
                <FormGroup>
                  <ReactTable
                    className="-striped -highlight"
                    data={tables}
                    showPagination={false}
                    defaultPageSize={19}
                    sorted={[{
                      id: 'name',
                      desc: false,
                    }]}
                    columns={columns}
                  />
                </FormGroup>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  }
}

export default Managers;

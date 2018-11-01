import PropTypes from 'prop-types';

import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';

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
    const {
      columns,
      label,
      tables,
      addbtnTooltip,
      savebtnTooltip,
      addbtn,
      savebtn,
    } = this.props;
    return (
      <Grid container>
        <Grid item xs={12}>
          <FormLabel component="legend" className="mt-block">{label}</FormLabel>
          <FormGroup>
            {this.renderText('search', 'Search', this.state.search)}
            <Table columns={columns} tables={tables} />
          </FormGroup>
          <div className="buttons-box mt-block">
            {addbtn && this.renderButton(addbtnTooltip, 'green', this.props.handleAdd, <AddIcon />, 'fab')}
            {savebtn && this.renderButton(savebtnTooltip, 'red', this.props.handleSave, <SaveIcon />)}
          </div>
        </Grid>
      </Grid>
    );
  }
}

Managers.propTypes = {
  tables: PropTypes.array,
  columns: PropTypes.array,
  addbtnTooltip: PropTypes.string,
  savebtnTooltip: PropTypes.string,
  addbtn: PropTypes.bool,
  savebtn: PropTypes.bool,
  handleAdd: PropTypes.func,
  handleSave: PropTypes.func,
};

Managers.defaultProps = {
  tables: [],
  columns: [],
  addbtnTooltip: '',
  savebtnTooltip: '',
  addbtn: true,
  savebtn: true,
  handleAdd: () => {},
  handleSave: () => {},
};

export default Managers;

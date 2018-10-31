import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';

import ArchivelIcon from '@material-ui/icons/Archive';
import SaveIcon from '@material-ui/icons/Save';
import PreviewIcon from '@material-ui/icons/Streetview';
import ImportIcon from '@material-ui/icons/ImportExport';

import InputEvent from 'components/InputEvent';

import imgDefault from 'assets/images/imgDefault.png';

class HomeView extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			footer: '',
			image: '',
			subtitle: '',
			title: '',
			backTitle: '',
		};
	}

	handleInputFileChange = (event) => {
		const target = event.target;
		const file = target.files[0];

		if (file) this.setState({ image: file.name });
		else this.setState({ image: '' });
	}

	render() {
		const { image } = this.state;
		const { activeComponent } = this.props;
		return (
			<Grid item xs={12}>
				<Card>
					<CardContent className="left-border-orange single">
						<div className="label-products-table select-text">{this.props.title}</div>

						<Grid container spacing={24}>
							<Grid item xs={12} sm={6}>
								<CardMedia
									className="homeview-card-media"
									image={imgDefault}
									title="Contemplative Reptile"
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FormGroup>
									{activeComponent.title && this.renderText('title', 'Title')}
									{activeComponent.subtitle && this.renderText('subtitle', 'Subtitle')}
									{activeComponent.footer && this.renderText('footer', 'Footer')}
								</FormGroup>

								{activeComponent.cardImage &&
									<div className="homeview-upload-box">
										<input
											id="flat-button-file"
											className="file-input"
											accept="image/*"
											type="file"
											onChange={this.handleInputFileChange} />

										<label className="flat-button-file" htmlFor="flat-button-file">
											<Button component="span" variant="contained" size="small" className="upload-button">
												Upload
											</Button>
										</label>

										<FormControl className="select-zone-box">
											<TextField
												className="upload-text-field"
												type="text"
												placeholder="Card Image"
												value={image}
												required
												margin="normal"
											/>
										</FormControl>
									</div>}
								{activeComponent.backTitle &&
									<FormGroup>
										{this.renderText('backTitle', 'Background Title')}
									</FormGroup>}
								{activeComponent.backImage &&
									<div className="homeview-upload-box">
										<input
											id="flat-button-file"
											className="file-input"
											accept="image/*"
											type="file"
											onChange={this.handleInputFileChange} />

										<label className="flat-button-file" htmlFor="flat-button-file">
											<Button component="span" variant="contained" size="small" className="upload-button">
												Upload
											</Button>
										</label>

										<FormControl className="select-zone-box">
											<TextField
												className="upload-text-field"
												type="text"
												placeholder="Background Image"
												value={image}
												required
												margin="normal"
											/>
										</FormControl>
									</div>}
							</Grid>
						</Grid>

						<div className="buttons-box">
							{this.renderButton('Preview', 'blue', () => {}, <PreviewIcon />)}
							{this.renderButton('Save', 'red', () => {}, <SaveIcon />)}
							{this.renderButton('Import', 'green', () => {}, <ImportIcon />)}
							{this.renderButton('Archive', 'orange', () => {}, <ArchivelIcon />)}
						</div>
					</CardContent>
				</Card>
			</Grid>
		);
	}
}

HomeView.propTypes = {
	title: PropTypes.string,
	activeComponent: PropTypes.object,
};

HomeView.defaultProps = {
	title: '',
	activeComponent: {},
};

export default HomeView;

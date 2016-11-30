import React from 'react';
import moment from 'moment';
import TextInput from '../UI/TextInput';
import CategoriePicker from '../UI/CategoriePicker';
import TagPicker from '../UI/TagPicker';
import DatePick from '../UI/DatePicker';
import TextArea from '../UI/TextArea';
import LinkListEdit from '../UI/LinkListEdit';
import MediumPicker from '../UI/MediumPicker';
import SupportPicker from '../UI/SupportPicker';
import Button from '../UI/Button';

class EditDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accession_number: this.props._data.accession_number,
      categorie: this.props._data.categorie,
      date: moment(this.props._data.date),
      description: this.props._data.description,
      descriptionFrench: this.props._data.description_fr,
      keywords: this.props._data.keywords,
      links: this.props._data.links,
      medium: this.props._data.medium,
      notes: this.props._data.notes,
      physical_description: this.props._data.physical_description,
      sujet: this.props._data.sujet,
      sujetFrench: this.props._data.sujet_fr,
      support: this.props._data.support,
      title: this.props._data.title,
    };
    this.handleAccession = this.handleAccession.bind(this);
    this.handleCategorie = this.handleCategorie.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleDescriptionFrench = this.handleDescriptionFrench.bind(this);
    this.handleTag = this.handleTag.bind(this);
    this.handleLinksURL = this.handleLinksURL.bind(this);
    this.handleLinksDesc = this.handleLinksDesc.bind(this);
    this.handleAddLink = this.handleAddLink.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.handleSupport = this.handleSupport.bind(this);
    this.handleSujet = this.handleSujet.bind(this);
    this.handleSujetFrench = this.handleSujetFrench.bind(this);
  }

  handleAccession(event) {
    this.setState({ accession_number: event.target.value });
  }

  handleCategorie(event) {
    this.setState({ categorie: event.target.value });
  }

  handleDate(date) {
    this.setState({ date: date });
  }

  handleDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleDescriptionFrench(event) {
    this.setState({ descriptionFrench: event.target.value });
  }

  handleTag(value) {
    this.setState({ keywords: value });
  }

  handleLinksURL(i, event) {
    console.log(this.state.links);
    console.log(i);
    console.log(event.target.value);
    const state = this.state.links;
    state[i].url = event.target.value;
    this.setState({links: state});
  }

  handleLinksDesc(i, event) {
    console.log(this.state.links);
    console.log(i);
    console.log(event.target.value);
    const state = this.state.links;
    state[i].title = event.target.value;
    this.setState({links: state});
  }

  handleAddLink() {
    const state = this.state.links;
    state.push({ url: '', title: '', });
    this.setState({ links: state });
  }

  handleMedium(event) {
    this.setState({ medium: event.target.value });
  }

  handleNotes(event) {
    this.setState({ notes: event.target.value });
  }

  handlePhysDesc(event) {
    this.setState({ physical_description: event.target.value });
  }

  handleSujet(event) {
    this.setState({ sujet: event.target.value });
  }

  handleSujetFrench(event) {
    this.setState({ sujetFrench: event.target.value });
  }

  handleSupport(event) {
    this.setState({ support: event.target.value });
  }

  render() {
    const readlink = `../documents/${this.props._data.accession_number}`;
    // TODO : create keywords db collection and pull from it
    return (<div>
      <Button text="Back" link={readlink} />
      <div>
      Accession Number:
      <TextInput handler={this.handleAccession} text={this.state.accession_number} />
      </div>
      <div>
      categorie: <CategoriePicker handler={this.handleCategorie} value={this.state.categorie} />
      </div>
      <div>
      date:
        <DatePick date={this.state.date} handler={this.handleDate} />
      </div>
      <div className="row">
        <div className="six columns">
          description (english):
          <TextArea handler={this.handleDescription} value={this.state.description || ''} />
        </div>
        <div className="six columns">
          description (français):
          <TextArea handler={this.handleDescriptionFrench} value={this.state.descriptionFrench || ''} />
        </div>
      </div>
      <div>
      keywords:
      <TagPicker keywords={this.state.keywords} handler={this.handleTag} />
      </div>
      <div>
      links:
      <LinkListEdit addhandler={this.handleAddLink} urlhandler={this.handleLinksURL} deschandler={this.handleLinksDesc} links={this.state.links} />
      </div>
      <div>
      medium: <MediumPicker handler={this.handleMedium} value={this.state.medium} />
      </div>
      <div>
      notes: <TextArea handler={this.handleNotes} value={this.state.notes || ''} />
      </div>
      <div>
      physical description: <TextInput handler={this.handlePhysDesc} text={this.state.physical_description} />
      </div>
      <div className="row">
        <div className="six columns">
          sujet (english):
          <TextArea handler={this.handleSujet} value={this.state.sujet || ''} />
        </div>
        <div className="six columns">
          sujet (français):
          <TextArea handler={this.handleSujetFrench} value={this.state.sujetFrench || ''} />
        </div>
      </div>
      <div>
      support: <SupportPicker handler={this.handleSupport} value={this.state.support} />
      </div>
      <div>
      title: {this.props._data.title}
      </div>
    </div>
    );
  }
}

export default EditDocument;
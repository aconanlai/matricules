import React from 'react';
import moment from 'moment';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import TextInput from '../UI/TextInput';
import CategoriePicker from '../UI/CategoriePicker';
import TagPicker from '../UI/TagPicker';
import DatePick from '../UI/DatePicker';
import TextArea from '../UI/TextArea';
import LinkListEdit from '../UI/LinkListEdit';
import MediumPicker from '../UI/MediumPicker';
import SupportPicker from '../UI/SupportPicker';
import ImageList from '..//EditDocument/ImageList';
import AudioList from '..//EditDocument/AudioList';

class AddDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      accession_number: '',
      categorie: '',
      date: moment(),
      description: '',
      descriptionFrench: '',
      keywords: [],
      links: [],
      medium: '',
      notes: '',
      physical_description: '',
      sujet: '',
      sujetFrench: '',
      support: '',
      title: '',
      images: [],
      audio: [],
      video: [],
      keywordsSuggestions: [],
    };
    this.handleAccession = this.handleAccession.bind(this);
    this.handleCategorie = this.handleCategorie.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleDescriptionFrench = this.handleDescriptionFrench.bind(this);
    this.handleTagAdd = this.handleTagAdd.bind(this);
    this.handleTagDelete = this.handleTagDelete.bind(this);
    this.handleLinksURL = this.handleLinksURL.bind(this);
    this.handleLinksDesc = this.handleLinksDesc.bind(this);
    this.handleAddLink = this.handleAddLink.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.handleSupport = this.handleSupport.bind(this);
    this.handleSujet = this.handleSujet.bind(this);
    this.handleMedium = this.handleMedium.bind(this);
    this.handleSujetFrench = this.handleSujetFrench.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMediaAdd = this.handleMediaAdd.bind(this);
    this.handleImgDelete = this.handleImgDelete.bind(this);
    this.handleAudioDelete = this.handleAudioDelete.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    const url = `http://localhost:4000/api/keywords`;
    return new Promise((resolve, reject) => (
        axios.get(url)
          .then(response => (resolve(response.data)))
          .catch(error => (reject(error)))
      ))
      .then(
      (_data) => {
        this.setState({
          keywordsSuggestions: _data
        }) },
      (err) => { console.log(err); });
  }

  onDrop(acceptedFiles, rejectedFiles) {
    const imgsform = new FormData();
    const imgsxhr = new XMLHttpRequest();
    const otherform = new FormData();
    const otherxhr = new XMLHttpRequest();
    const isImg = file => file.type.includes('image');
    const imgs = acceptedFiles.filter(isImg);
    const other = acceptedFiles.filter(file => !isImg(file));

    if (imgs.length > 0) {
      imgs.map(file => imgsform.append('datafile', file));
      imgsxhr.open('POST', `http://localhost:4000/api/document/photos/${this.state.accession_number}`, true);
      imgsxhr.onreadystatechange = () => {
        if (imgsxhr.readyState === 4) {
          if (imgsxhr.status === 200) {
            const files = JSON.parse(imgsxhr.responseText);
            console.log(files);
            files.map(file => this.handleMediaAdd(file));
          } else {
            console.error(imgsxhr.statusText);
          }
        }
      };
      imgsxhr.send(imgsform);
    }

    if (other.length > 0) {
      other.map(file => otherform.append('datafile', file));
      otherxhr.open('POST', `http://localhost:4000/api/document/media/${this.state.accession_number}`, true);
      otherxhr.onreadystatechange = () => {
        if (otherxhr.readyState === 4) {
          if (otherxhr.status === 200) {
            const files = JSON.parse(otherxhr.responseText);
            console.log(files);
            files.map(file => this.handleMediaAdd(file));
          } else {
            console.error(otherxhr.statusText);
          }
        }
      };
      otherxhr.send(otherform);
    }
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

  handleTagAdd(value) {
    const tags = this.state.keywords;
    tags.push(value);
    this.setState({ keywords: tags });
  }

  handleTagDelete(i) {
    let tags = this.state.keywords;
    tags.splice(i, 1);
    this.setState({keywords: tags});
  }

  handleLinksURL(i, event) {
    const state = this.state.links;
    state[i].url = event.target.value;
    this.setState({links: state});
  }

  handleLinksDesc(i, event) {
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

  handleTitle(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit() {
    // in AddDocument, we send post request
    const url = `http://localhost:4000/api/document`;
    axios.post(url, {
      accession_number: this.state.accession_number,
      categorie: this.state.categorie,
      date: this.state.date.toDate(),
      description: this.state.description,
      description_fr: this.state.descriptionFrench,
      keywords: this.state.keywords,
      links: this.state.links,
      medium: this.state.medium,
      notes: this.state.notes,
      physical_description: this.state.physical_description,
      sujet: this.state.sujet,
      sujet_fr: this.state.sujetFrench,
      support: this.state.support,
      title: this.state.title,
      images: this.state.images,
      audio: this.state.audio,
      token: localStorage.token,
    })
    .then((response) => {
      console.log(response);
      const viewurl = `../document/${this.state.accession_number}`;
      this.props.url.push(viewurl);
    })
    .catch((error) => {
      console.log(error);
    });
  }


// this handler is called when XHR returns a response, we use this to update the UI to include the new images
  handleMediaAdd(file) {
    if (file.mimetype.indexOf('image') > -1) {
      const imgs = this.state.images;
      imgs.push(file.originalname);
      this.setState({ images: imgs, });
    } else if (file.mimetype.indexOf('audio') > -1) {
      const audios = this.state.audio;
      audios.push(file.originalname);
      this.setState({ audio: audios, });
    }
// TODO: OTHER
  }

  handleImgDelete(key) {
    console.log('deleting img' + key);
    const imgs = this.state.images;
    imgs.splice(key, 1);
    this.setState({ images: imgs, });
  }

  handleAudioDelete(key) {
    console.log('deleting audio' + key);
    const audios = this.state.audio;
    audios.splice(key, 1);
    this.setState({ audio: audios, });
  }

  render() {
  const mediauploadlink = `http://localhost:4000/api/document/media/${this.state.accession_number}`;
  const uploader = <Dropzone onDrop={this.onDrop}>
      <div>Try dropping some files here, or click to select files to upload.</div>
  </Dropzone>;

    // TODO : create keywords db collection and pull from it
    return (<div>
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
      <TagPicker suggestions={this.state.keywordsSuggestions} language={this.props.language} keywords={this.state.keywords} handleAdd={this.handleTagAdd} handleDelete={this.handleTagDelete} />
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
      title: <TextInput handler={this.handleTitle} text={this.state.title} />
      </div>
      {uploader}
      <div>
        <ImageList handleImgDelete={this.handleImgDelete} accession={this.state.accession_number} images={this.state.images} />
      </div>
      <div>
        {(this.state.audio.length > 0) ? <AudioList handleAudioDelete={this.handleAudioDelete} accession={this.state.accession_number} audio={this.state.audio} />
        : null }
      </div>
      <div>
        <button onClick={this.handleSubmit} className={'button-primary'}>Save</button>
      </div>
      
    </div>
    );
  }
}

export default AddDocument;

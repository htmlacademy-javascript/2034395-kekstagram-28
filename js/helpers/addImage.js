const editImage = () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.querySelector('.img-upload__preview').children[0].src = 'soon';
};

const closeEditor = () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.querySelector('#upload-file').value = null;
};

export {editImage, closeEditor};

import Validator from '../models/Validator.js';

const preview = document.querySelector('.img-upload__preview').children[0];

let isFieldInFocus = false;
let scale = 100;
let filter = 'none';
const filters = {
  'chrome': {
    min: 0,
    max: 1,
    current: 1,
    step: 0.1,
    filter: (value) => `grayscale(${value})`,
  },
  'sepia': {
    min: 0,
    max: 1,
    current: 1,
    step: 0.1,
    filter: (value) => `sepia(${value})`,
  },
  'marvin': {
    min: 0,
    max: 100,
    current: 100,
    step: 1,
    filter: (value) => `invert(${value}%)`,
  },
  'phobos': {
    min: 0,
    max: 3,
    current: 3,
    step: 0.1,
    filter: (value) => `blur(${value}px)`,
  },
  'heat': {
    min: 0,
    max: 3,
    current: 3,
    step: 0.1,
    filter: (value) => `brightness(${value})`,
  },
};

/**
 * Open add image form after image load
 */
const editImage = () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');

  // document.querySelector('.img-upload__preview').children[0].src = 'soon';
};

/**
 * Close add image form
 */
const closeEditor = () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.querySelector('#upload-select-image').reset();
};

/**
 * Scale image
 *
 * @param {?string} type
 */
const scaleImage = (type = null) => {
  switch (type) {
    case 'bigger':
      scale += 25;
      break;
    case 'smaller':
      scale -= 25;
      break;
    default:
      scale = 100;
      break;
  }

  if (scale < 25) {
    scale = 25;
  }

  if (scale > 100) {
    scale = 100;
  }

  preview.style.transform = `scale(${scale / 100})`;
  document.querySelector('.scale__control--value').value = `${scale}%`;
};

/**
 * Toggle Esc close event on focus/blur for hashtags/description fields
 */
const switchFieldsFocus = () => {
  document.querySelector('.text__hashtags').onfocus = () => {
    isFieldInFocus = true;
  };
  document.querySelector('.text__hashtags').onblur = () => {
    isFieldInFocus = false;
  };

  document.querySelector('.text__description').onfocus = () => {
    isFieldInFocus = true;
  };
  document.querySelector('.text__description').onblur = () => {
    isFieldInFocus = false;
  };
};

/**
 * Add and configure noUiSlider
 */
const initSlider = () => {
  const slider = document.querySelector('.effect-level__slider');

  document.querySelector('.effect-level').classList.remove('hidden');

  const filterConfig = filters[filter];

  document.querySelector('.effect-level__value').value = filterConfig.current;

  const sliderOptions = {
    start: filterConfig.current,
    range: {
      'min': filterConfig.min,
      'max': filterConfig.max,
    },
    step: filterConfig.step,
    connect: 'lower',
  };

  if (slider?.noUiSlider) {
    slider.noUiSlider.updateOptions(sliderOptions, true);
  } else {
    noUiSlider.create(slider, sliderOptions);
  }

  slider.noUiSlider.on('update', () => {
    document.querySelector('.effect-level__value').value = slider.noUiSlider.get();

    preview.style.filter = filters[filter].filter(slider.noUiSlider.get());
    filters[filter].current = slider.noUiSlider.get();
  });
};

/**
 * Add event listeners for all filter setters
 */
const initFilters = () => {
  const filterRadios = document.querySelectorAll('.effects__radio');

  filterRadios.forEach((radio) => {
    radio.addEventListener('click', (e) => {
      if (filter) {
        preview.classList.remove(`effects__preview--${filter}`);
      }

      preview.classList.add(`effects__preview--${e.target.value}`);

      filter = e.target.value === 'none' ? null : e.target.value;

      if (filter) {
        initSlider();
      } else {
        document.querySelector('.effect-level').classList.add('hidden');
        preview.style.filter = null;
      }
    });
  });
};

/**
 * Add event listeners for all add/edit image form controls
 */
const initControls = () => {
  const addImageForm = document.querySelector('#upload-select-image');

  const validator = new Validator(Validator.ADD_IMAGE_FORM_VALIDATOR);

  addImageForm.addEventListener('submit', validator.validate);

  document.querySelector('#upload-cancel').addEventListener('click', closeEditor);

  document.querySelector('#upload-file').onchange = () => editImage();

  document
    .querySelector('.scale__control--bigger')
    .addEventListener('click', () => scaleImage('bigger'));
  document
    .querySelector('.scale__control--smaller')
    .addEventListener('click', () => scaleImage('smaller'));
};

/**
 * Add event listeners on add image form && add validation
 */
const initAddImageForm = () => {
  document.querySelector('.effect-level').classList.add('hidden');

  initControls();
  switchFieldsFocus();
  initFilters();
};

export {closeEditor, initAddImageForm, isFieldInFocus};

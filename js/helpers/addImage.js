import Validator from '../models/Validator.js';
import {
  DESCRIPTION_ELEMENT,
  EFFECT_FILTER_RADIOS,
  EFFECT_LEVEL_ELEMENT,
  EFFECT_LEVEL_VALUE_ELEMENT, EFFECT_SCALE_CONTROL_BIGGER_ELEMENT, EFFECT_SCALE_CONTROL_SMALLER_ELEMENT,
  EFFECT_SLIDER_ELEMENT,
  EFFECTS_FILTERS,
  EFFECTS_PREVIEW_ELEMENTS,
  FILE_TYPES,
  HASHTAGS_ELEMENT,
  IMAGE_SCALE_MAX,
  IMAGE_SCALE_MIN,
  IMAGE_SCALE_STEP,
  SCALE_VALUE_ELEMENT, UPLOAD_CANCEL_ELEMENT,
  UPLOAD_FILE_ELEMENT,
  UPLOAD_FORM_ELEMENT,
  UPLOAD_FORM_OVERLAY_ELEMENT, UPLOAD_FORM_PREVIEW_ELEMENT
} from '../utils/const.js';
import {showAlert} from './render.js';
import closeEventListener from '../utils/closeEventListener.js';

const preview = UPLOAD_FORM_PREVIEW_ELEMENT().children[0];

let isFieldInFocus = false;
let scale = IMAGE_SCALE_MAX;
let filter = 'none';

/**
 * Close add image form
 */
const closeEditor = () => {
  UPLOAD_FORM_OVERLAY_ELEMENT().classList.add('hidden');
  document.body.classList.remove('modal-open');

  UPLOAD_FORM_ELEMENT().reset();

  document.removeEventListener('keydown', closeEventListener);
};

/**
 * Open add image form after image load
 */
const editImage = () => {
  document.addEventListener('keydown', closeEventListener);

  UPLOAD_FORM_OVERLAY_ELEMENT().classList.remove('hidden');
  document.body.classList.add('modal-open');

  const file = UPLOAD_FILE_ELEMENT().files[0];

  if (FILE_TYPES.some((ext) => file.name.toLowerCase().endsWith(ext))) {
    preview.src = URL.createObjectURL(file);

    EFFECTS_PREVIEW_ELEMENTS().forEach((el) => {
      el.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  } else {
    showAlert(true, 'Файл не соответствует формату');
    closeEditor();
  }
};

/**
 * Scale image
 *
 * @param {?string} type
 */
const scaleImage = (type = null) => {
  switch (type) {
    case 'bigger':
      scale += IMAGE_SCALE_STEP;
      break;
    case 'smaller':
      scale -= IMAGE_SCALE_STEP;
      break;
    default:
      scale = IMAGE_SCALE_MAX;
      break;
  }

  if (scale < IMAGE_SCALE_MIN) {
    scale = IMAGE_SCALE_MIN;
  }

  if (scale > IMAGE_SCALE_MAX) {
    scale = IMAGE_SCALE_MAX;
  }

  preview.style.transform = `scale(${scale / 100})`;
  SCALE_VALUE_ELEMENT().value = `${scale}%`;
};

/**
 * Toggle Esc close event on focus/blur for hashtags/description fields
 */
const switchFieldsFocus = () => {
  HASHTAGS_ELEMENT().onfocus = () => {
    isFieldInFocus = true;
  };
  HASHTAGS_ELEMENT().onblur = () => {
    isFieldInFocus = false;
  };

  DESCRIPTION_ELEMENT().onfocus = () => {
    isFieldInFocus = true;
  };
  DESCRIPTION_ELEMENT().onblur = () => {
    isFieldInFocus = false;
  };
};

/**
 * Add and configure noUiSlider
 */
const initSlider = () => {
  EFFECT_LEVEL_ELEMENT().classList.remove('hidden');

  const filterConfig = EFFECTS_FILTERS[filter];

  EFFECT_LEVEL_VALUE_ELEMENT().value = filterConfig.current;

  const sliderOptions = {
    start: filterConfig.current,
    range: {
      'min': filterConfig.min,
      'max': filterConfig.max,
    },
    step: filterConfig.step,
    connect: 'lower',
  };

  if (EFFECT_SLIDER_ELEMENT().noUiSlider) {
    EFFECT_SLIDER_ELEMENT().noUiSlider.updateOptions(sliderOptions, true);
  } else {
    noUiSlider.create(EFFECT_SLIDER_ELEMENT(), sliderOptions);
  }

  EFFECT_SLIDER_ELEMENT().noUiSlider.on('update', () => {
    EFFECT_LEVEL_VALUE_ELEMENT().value = EFFECT_SLIDER_ELEMENT().noUiSlider.get();

    preview.style.filter = EFFECTS_FILTERS[filter].filter(EFFECT_SLIDER_ELEMENT().noUiSlider.get());
    EFFECTS_FILTERS[filter].current = EFFECT_SLIDER_ELEMENT().noUiSlider.get();
  });
};

/**
 * Add event listeners for all filter setters
 */
const initFilters = () => {
  EFFECT_FILTER_RADIOS().forEach((radio) => {
    radio.addEventListener('click', (event) => {
      if (filter) {
        preview.classList.remove(`effects__preview--${filter}`);
      }

      preview.classList.add(`effects__preview--${event.target.value}`);

      filter = event.target.value === 'none' ? null : event.target.value;

      if (filter) {
        initSlider();
      } else {
        EFFECT_LEVEL_ELEMENT().classList.add('hidden');
        preview.style.filter = null;
      }
    });
  });
};

/**
 * Add event listeners for all add/edit image form controls
 */
const initControls = () => {
  const validator = new Validator(Validator.ADD_IMAGE_FORM_VALIDATOR);

  UPLOAD_FORM_ELEMENT().addEventListener('submit', validator.validate);

  UPLOAD_CANCEL_ELEMENT().addEventListener('click', closeEditor);

  UPLOAD_FILE_ELEMENT().onchange = () => editImage();

  EFFECT_SCALE_CONTROL_BIGGER_ELEMENT()
    .addEventListener('click', () => scaleImage('bigger'));

  EFFECT_SCALE_CONTROL_SMALLER_ELEMENT()
    .addEventListener('click', () => scaleImage('smaller'));
};

/**
 * Add event listeners on add image form && add validation
 */
const initAddImageForm = () => {
  EFFECT_LEVEL_ELEMENT().classList.add('hidden');

  initControls();
  switchFieldsFocus();
  initFilters();
};

export {closeEditor, initAddImageForm, isFieldInFocus};

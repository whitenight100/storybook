// animation value type definition
export type AnimationValue = number | [number, number] | string | [string, string];

// get animation value from string value
export function getAnimationValue(value: string): AnimationValue | undefined {
  try {
    if (!value || value === '') return;
    const x = value.split(',');
    if (x.length === 1) {
      return x[0].trim();
    } else if (x.length === 2) {
      return [x[0].trim(), x[1].trim()];
    } else {
      console.warn('Invalid animation value: ' + value);
      return;
    }
  } catch (error) {
    console.error('Failed to get animation value: ' + value);
    throw error;
  }
}

// get 0-1 range value from percentage value
export function getValueFromPercentage(value: AnimationValue | undefined): AnimationValue | undefined {
  try {
    if (!value) return;
    if (Array.isArray(value)) {
      if (typeof value[0] === 'string' && typeof value[1] === 'string') {
        return [Number(value[0].replace('%', '')) / 100, Number(value[1].replace('%', '')) / 100];
      } else {
        return [Number(value[0]) / 100, Number(value[1]) / 100];
      }
    } else {
      if (typeof value === 'string') {
        return Number(value.replace('%', '')) / 100;
      } else {
        return Number(value) / 100;
      }
    }
  } catch (error) {
    console.error('Failed to get range value: ' + value);
    throw error;
  }
}

// get scale from percentage
export function getScaleValue(value: AnimationValue | undefined): AnimationValue | undefined {
  if (!value) return;
  value = getValueFromPercentage(value);
  if (Array.isArray(value)) {
    if (Number(value[0]) === 1 && Number(value[1]) === 1) return;
    return [Number(value[0]), Number(value[1])];
  } else {
    if (Number(value) === 1) return;
    return Number(value);
  }
}

// get rotate from number
export function getRotateValue(value: AnimationValue | undefined): AnimationValue | undefined {
  if (!value) return;
  if (Array.isArray(value)) {
    if (Number(value[0]) === 0 && Number(value[1]) === 0) return;
    return [value[0] + 'deg', value[1] + 'deg'];
  } else {
    if (Number(value) === 0) return;
    return value + 'deg';
  }
}

// get opacity from transparency percentage
export function getOpacityValue(value: AnimationValue | undefined): AnimationValue | undefined {
  if (!value) return;
  value = getValueFromPercentage(value);
  if (Array.isArray(value)) {
    if (Number(value[0]) === 0 && Number(value[1]) === 0) return;
    return [1 - Number(value[0]), 1 - Number(value[1])];
  } else {
    if (Number(value) === 0) return;
    return 1 - Number(value);
  }
}

// get blur from percentage
export function getBlurValue(value: AnimationValue | undefined): AnimationValue | undefined {
  if (!value) return;
  value = getValueFromPercentage(value);
  if (Array.isArray(value)) {
    if (Number(value[0]) === 0 && Number(value[1]) === 0) return;
    return [Number(value[0]) * 10, Number(value[1]) * 10];
  } else {
    if (Number(value) === 0) return;
    return Number(value) * 10;
  }
}

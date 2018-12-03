export const useKeyOnly = (val, key) => val && key;

export const BEM = {
  useKeyOnly: (block, val, key) => val && `${block}--${key}`,
  useKeyOrValueAndKey: (block, val, key) =>
    val &&
    (val === true ? `${block}--${key}` : `${block}--${key} ${block}--${val}`),
  useValueAndKey: (block, val, key) =>
    val && val !== true && `${block}--${key} ${block}--${key}--${val}`,
  useVerticalAlignProp: (block, val) =>
    BEM.useValueAndKey(block, val, 'aligned'),
};

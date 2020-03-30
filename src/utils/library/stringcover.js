export const humpToLine = name => {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase();
};

export const lineToHump = name => {
  return name.replace(/\-(\w)/g, function(all, letter) {
    return letter.toUpperCase();
  });
};

export function extractFormData(form /*: HTMLFormElement */) {
  const d = new FormData(form);
  const formData = {};
  for (let [k, v] of d.entries()) {
    formData[k] = v;
  }
  return formData;
}

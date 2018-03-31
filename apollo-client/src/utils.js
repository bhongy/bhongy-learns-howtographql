// @flow strict

export function extractFormData(
  form: HTMLFormElement
): { [k: string]: string } {
  const d = new FormData(form);
  const formData = {};
  for (let [k, v] of d.entries()) {
    if (typeof v === 'string') {
      formData[k] = v;
    }
  }
  return formData;
}

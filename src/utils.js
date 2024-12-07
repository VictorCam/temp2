export let getLastJsonId = (ref) => {
  return ref.length !== 0 ? parseInt(ref[ref.length - 1].id, 10) : 0;
}

export let addItem = (ref, toast) => {
  toast.id = getLastJsonId(ref) + 1;
  ref.push(toast);
};

export let removeItemById = (ref, id) => {
  let index = ref.findIndex((toast) => toast.id === id);
  if (index !== -1) ref.splice(index, 1);
};